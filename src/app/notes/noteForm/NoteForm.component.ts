import { Component, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { fromJS, Map } from 'immutable';

import { PresentationalComponent } from '../../shared/component/PresentationalComponent';

@Component({
  selector: 'dcs-note-form',
  templateUrl: './NoteForm.tpl.html'
})
export class NoteFormComponent extends PresentationalComponent implements OnChanges {
  @Output() triggerSave: EventEmitter<any> = new EventEmitter();
  @Output() updateFormData: EventEmitter<any> = new EventEmitter();

  @Input() note: Map<string, any>;
  @Input() loading: boolean;

  noteForm: FormGroup;
  currentNote: Map<string, any>
  constructor(private fb: FormBuilder) {
    super();

    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.noteForm
      .valueChanges
      .debounceTime(500)
      .map(data => fromJS(data))
      .distinctUntilChanged((oldData, newData): boolean => newData.equals(oldData))
      .subscribe(data => {
        this.currentNote = data;
        this.updateFormData.next({
          formData: data,
          dirty: this.noteForm.dirty
        });
      });
  }

  ngOnChanges() {
    this.noteForm.patchValue(this.note.toJS());
  }

  saveNote(): void {
    if (this.noteForm.valid && this.noteForm.dirty) {
      this.triggerSave.next(this.currentNote);
    }
  }
}
