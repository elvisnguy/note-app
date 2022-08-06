import { Injectable } from '@angular/core';
import { NoteModel } from '../../model/note/note.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NoteService {
  notes: Array<NoteModel> = [];
  baseUrl = environment.dataUrl;
  constructor(private http: HttpClient) {}

  getNote(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts`);
  }

  getNoteDetail(noteId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts/${noteId}`);
  }
}
