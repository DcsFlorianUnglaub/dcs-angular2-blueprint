import { Component, Input } from '@angular/core';
import { Map } from 'immutable';

@Component({
  selector: 'dcs-note-preview',
  templateUrl: './NotePreview.tpl.html'
})
export class NotePreviewComponent {
  @Input() note: Map<string, any>;
}
