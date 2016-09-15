import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/Shared.module';

import { NotesPageComponent } from './notesPage/NotesPage.component';
import { NotesListComponent } from './notesList/NotesList.component';
import { NewNotesPageComponent } from './newNotesPage/NewNotesPage.component';
import { NoteFormComponent } from './noteForm/NoteForm.component';
import { NotesDetailPageComponent } from './notesDetailPage/NotesDetailPage.component';
import { NotesEditPageComponent } from './notesEditPage/NotesEditPage.component';
import { NotePreviewComponent } from './notePreview/NotePreview.component';

import { NotesActions } from './backend/Notes.actions';
import { notesRouting } from './Notes.routes';


@NgModule({
  declarations: [
    NotesPageComponent,
    NotesListComponent,
    NewNotesPageComponent,
    NoteFormComponent,
    NotesDetailPageComponent,
    NotesEditPageComponent,
    NotePreviewComponent
  ],
  providers: [
    NotesActions
  ],
  imports: [
    SharedModule,
    notesRouting
  ]
})
export class NotesModule { }
