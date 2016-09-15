import { Component, Input, Output, EventEmitter } from '@angular/core';
import { List } from 'immutable';
import { PresentationalComponent } from '../../shared/component/PresentationalComponent';

@Component({
  selector: 'dcs-notes-list',
  templateUrl: './NotesList.tpl.html'
})
export class NotesListComponent extends PresentationalComponent {

  @Input() notes: List<any>;
  @Input() loading: boolean;
  @Input() error: any;
  @Output() triggerDeleteNote: EventEmitter<any> = new EventEmitter();

  deleteNote(id: string): void {
    this.triggerDeleteNote.next(id);
  }
}
