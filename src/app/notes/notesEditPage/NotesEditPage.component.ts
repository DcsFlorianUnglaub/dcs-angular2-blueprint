import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux, select } from 'ng2-redux';

import { IState } from '../../shared/interfaces';

import { Observable } from 'rxjs';
import { Map } from 'immutable';

import { ContainerComponent } from '../../shared/component/ContainerComponent';
import { NotesActions } from '../backend/Notes.actions';

@Component({
  selector: 'dcs-notes-edit-page',
  templateUrl: './NotesEditPage.tpl.html'
})
export class NotesEditPageComponent extends ContainerComponent implements OnInit {
  @select(['notes', 'currentEntity']) note$: Observable<Map<string, any>>;

  noteId: number;

  constructor(
    private store: NgRedux<IState>,
    private route: ActivatedRoute,
    private actions: NotesActions
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.noteId = +params['id'];
      this.store.dispatch(this.actions.fetchOne(this.noteId));
    }));
  }
}
