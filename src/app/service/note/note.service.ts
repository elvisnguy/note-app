import { Injectable } from '@angular/core';
import { NoteModel } from '../../model/note/note.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NoteService {
  baseUrl = environment.dataUrl;
  constructor(private http: HttpClient) {}

  getNote(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts`);
  }

  getNoteDetail(noteId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts/${noteId}`);
  }

  createNote(note: NoteModel): Observable<NoteModel> {
    return this.http.post<NoteModel>(`${this.baseUrl}/posts`, note);
  }

  deleteNote(noteId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/posts/${noteId}`);
  }

  updateNote(note: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/posts/${note.id}`, note);
  }
}
