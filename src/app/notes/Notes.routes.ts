import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetupCompletedGuard } from '../shared/guards/SetupCompleted.guard';
import { CancelEditGuard } from '../shared/guards/CancelEdit.guard';

import { NotesPageComponent } from './notesPage/NotesPage.component';
import { NewNotesPageComponent } from './newNotesPage/NewNotesPage.component';
import { NotesDetailPageComponent } from './notesDetailPage/NotesDetailPage.component';
import { NotesEditPageComponent } from './notesEditPage/NotesEditPage.component';

const notesRoutes: Routes = [
  { path: 'notes', component: NotesPageComponent, canActivate: [SetupCompletedGuard] },
  // TODO:
  { path: 'notes/new', component: NewNotesPageComponent, canActivate: [SetupCompletedGuard] },
  { path: 'notes/:id', component: NotesDetailPageComponent, canActivate: [SetupCompletedGuard] },
  { path: 'notes/:id/edit', component: NotesEditPageComponent, canActivate: [SetupCompletedGuard], canDeactivate: [CancelEditGuard] }
];

export const notesRouting: ModuleWithProviders = RouterModule.forChild(notesRoutes);
