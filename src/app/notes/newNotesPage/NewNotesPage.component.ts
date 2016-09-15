import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux, select } from 'ng2-redux';
import { Map } from 'immutable';
import { Observable, Subscription } from 'rxjs';

import { ContainerComponent } from '../../shared/component/ContainerComponent';
import { NotesActions } from '../backend/Notes.actions';

@Component({
  selector: 'dcs-new-notes-page',
  templateUrl: './NewNotesPage.tpl.html'
})
export class NewNotesPageComponent extends ContainerComponent {

  @select(['notes', 'loading']) loading$: Observable<boolean>;

  constructor(private store: NgRedux<any>,
              private notesActions: NotesActions,
              private router: Router) {
    super();
  }

  saveNote(note: Map<string, any>): void {
    this.store.dispatch(this.notesActions.create(note));

    let subscription: Subscription = this.loading$
      .subscribe((loading: boolean) => {
        console.log('subscription loading', loading);
        if (!loading) {
          this.router.navigate(['/notes']);
        }
      });

    this.subscriptions.push(subscription);
  }
}
