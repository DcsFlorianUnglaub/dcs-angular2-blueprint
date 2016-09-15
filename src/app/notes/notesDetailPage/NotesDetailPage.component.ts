import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerComponent } from '../../shared/component/ContainerComponent';

import { NgRedux, select } from 'ng2-redux';
import { IState } from '../../shared/interfaces';
import { Map } from 'immutable';
import { Observable, Subscription } from 'rxjs';

import { NotesActions } from '../backend/Notes.actions';

@Component({
  selector: 'dcs-notes-detail-page',
  templateUrl: './NotesDetailPage.tpl.html'
})
export class NotesDetailPageComponent extends ContainerComponent implements OnInit {
  @select(['notes', 'currentEntity']) note$: Observable<Map<string, any>>;
  @select(['notes', 'loading']) loading$: Observable<boolean>;
  @select(['notes', 'error']) error$: Observable<boolean>;

  noteId: number;

  constructor(
    private store: NgRedux<IState>,
    private actions: NotesActions,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.noteId = +params['id'];
      this.store.dispatch(this.actions.fetchOne(this.noteId));
    }));
  }

  delete(): void {
    this.store.dispatch(this.actions.delete(this.noteId));

    let subscription: Subscription = this.loading$
      .subscribe((loading: boolean) => {
        if (!loading) {
          this.router.navigate(['/notes']);
        }
      });

    this.subscriptions.push(subscription);
  }
}
