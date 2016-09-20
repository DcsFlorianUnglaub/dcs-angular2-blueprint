import { Injectable } from '@angular/core';

import { IAction } from '../../shared/interfaces';
import { RestClient } from '../../shared/services/RestClient';

import { Map } from 'immutable';
import { Observable } from 'rxjs';

export const NOTES_FETCH: string = 'NOTES_FETCH';
export const NOTES_FETCH_START: string = 'NOTES_FETCH_START';
export const NOTES_FETCH_NEXT: string = 'NOTES_FETCH_NEXT';
export const NOTES_FETCH_ERROR: string = 'NOTES_FETCH_ERROR';

export const NOTE_FETCH: string = 'NOTE_FETCH';
export const NOTE_FETCH_START: string = 'NOTE_FETCH_START';
export const NOTE_FETCH_NEXT: string = 'NOTE_FETCH_NEXT';
export const NOTE_FETCH_ERROR: string = 'NOTE_FETCH_ERROR';

export const NOTES_CREATE: string = 'NOTES_CREATE';
export const NOTES_CREATE_START: string = 'NOTES_CREATE_START';
export const NOTES_CREATE_NEXT: string = 'NOTES_CREATE_NEXT';
export const NOTES_CREATE_ERROR: string = 'NOTES_CREATE_ERROR';

export const NOTES_DELETE: string = 'NOTES_DELETE';
export const NOTES_DELETE_START: string = 'NOTES_DELETE_START';
export const NOTES_DELETE_NEXT: string = 'NOTES_DELETE_NEXT';
export const NOTES_DELETE_ERROR: string = 'NOTES_DELETE_ERROR';

export const NOTE_UPDATE: string = 'NOTE_UPDATE';
export const NOTE_UPDATE_START: string = 'NOTE_UPDATE_START';
export const NOTE_UPDATE_NEXT: string = 'NOTE_UPDATE_NEXT';
export const NOTE_UPDATE_ERROR: string = 'NOTE_UPDATE_ERROR';


@Injectable()
export class NotesActions {
  constructor(private restClient: RestClient) { }

  fetch(): IAction {
    return {
      type: NOTES_FETCH,
      payload: this.restClient.get('notes')
    };
  }

  fetchOne(id: number): IAction {
    return {
      type: NOTE_FETCH,
      payload: this.restClient.get(`notes/${id}`)
    };
  }

  create(note: Map<string, any>): IAction {
    let payload: Observable<{}> = this.restClient.post('notes', note);
    return {
      type: NOTES_CREATE,
      payload: payload
    };
  }

  delete(noteId: number): IAction {
    return {
      type: NOTES_DELETE,
      payload: this.restClient.delete(`notes/${noteId}`).map(() => noteId)
    };
  }

  update(noteId: number, data: Map<string, any>): IAction {
    let payload: Observable<{}> = this.restClient.put(`notes/${noteId}`, data);

    return {
      type: NOTE_UPDATE,
      payload: payload
    }
  }
}
