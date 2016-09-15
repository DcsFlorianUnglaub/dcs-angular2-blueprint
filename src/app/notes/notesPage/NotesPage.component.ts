import { Component } from '@angular/core';
import { ContainerComponent } from '../../shared/component/ContainerComponent';
import { Observable } from 'rxjs/Observable';
import { List, Map } from 'immutable';

import { NgRedux, select } from 'ng2-redux';
import { IState } from '../../shared/interfaces';

import { NotesActions } from '../backend/Notes.actions';

@Component({
  selector: 'dcs-notes-page',
  templateUrl: './NotesPage.tpl.html'
})
export class NotesPageComponent extends ContainerComponent {

  @select(['notes', 'entities']) notes$: Observable<List<Map<string, any>>>;
  @select(['notes', 'loading']) loading$: Observable<boolean>;
  @select(['notes', 'error']) error$: Observable<Error>;

  constructor(private store: NgRedux<IState>, private actions: NotesActions) {
    super();

    if (this.store.getState().getIn(['notes', 'entities']).size === 0) {
      this.store.dispatch(this.actions.fetch());
    }
  }

  clearAllNotes(): void {
    let ids: List<string> = this.store
      .getState()
      .getIn(['notes', 'entities'])
      .map(note => note.get('id'));

    ids.forEach(id => {
      this.store.dispatch(this.actions.delete(+id));
    });
  }

  deleteNote(noteId: string): void {
    this.store.dispatch(this.actions.delete(+noteId));
  }
}
