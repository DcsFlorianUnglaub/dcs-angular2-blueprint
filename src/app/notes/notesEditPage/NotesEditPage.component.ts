import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRedux, select } from 'ng2-redux';

import { IState } from '../../shared/interfaces';

import { Observable, Subscription } from 'rxjs';
import { Map } from 'immutable';

import { ContainerComponent } from '../../shared/component/ContainerComponent';
import { NotesActions } from '../backend/Notes.actions';
import { UsersActions } from '../../users/backend/Users.actions';

@Component({
  selector: 'dcs-notes-edit-page',
  templateUrl: './NotesEditPage.tpl.html'
})
export class NotesEditPageComponent extends ContainerComponent implements OnInit {
  @select(['notes', 'currentEntity']) note$: Observable<Map<string, any>>;
  @select(['notes', 'loading']) loading$: Observable<Map<string, any>>;

  noteId: number;

  constructor(
    private store: NgRedux<IState>,
    private route: ActivatedRoute,
    private router: Router,
    private actions: NotesActions,
    private usersActions: UsersActions,
    private notesActions: NotesActions
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.noteId = +params['id'];
      this.store.dispatch(this.actions.fetchOne(this.noteId));
    }));
  }

  updateFormData({ formData, dirty }: { formData: any, dirty: boolean }): void {
    this.store.dispatch(this.usersActions.updateFormData(formData, dirty));
  }

  save(note: Map<string, any>): void {
    // TODO: Suboptimal.
    this.updateFormData({ formData: note, dirty: false });
    this.store.dispatch(this.notesActions.update(this.noteId, note));

    let subscription: Subscription = this.loading$
      .subscribe(loading => {
        if (!loading) {
          subscription.unsubscribe();
          this.router.navigate(['/notes']);
        }
      });

    this.subscriptions.push(subscription);
  }
}
