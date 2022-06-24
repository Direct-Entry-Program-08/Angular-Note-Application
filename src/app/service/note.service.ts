import {Inject, Injectable} from '@angular/core';
import {Note as NoteDTO} from "../dto/note";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable()
export class NoteService {

  private readonly USER_ID = "7bc90fbf-f40b-48f3-aed0-a06d9a9c50c6";
  private readonly NOTE_API_ENDPOINT = `http://localhost:8080/notes/api/v1/users/${this.USER_ID}/notes`
  private notes:Array<NoteDTO> =[];

  constructor(@Inject(HttpClient)private httpService: HttpClient) { }


  getAllNotes():Observable<Array<NoteDTO>>{
    return this.httpService.get<Array<NoteDTO>>(this.NOTE_API_ENDPOINT).pipe(map(notes=>(this.notes = notes)));
  }

  saveNote(note:NoteDTO):Observable<Array<NoteDTO>>{
    return this.httpService.post<NoteDTO>(this.NOTE_API_ENDPOINT, note).
    pipe(map(n=>{
      this.notes.push(n);
      return this.notes;
    }))
  };


  deleteNote(note:NoteDTO):Observable<Array<NoteDTO>>{
    return this.httpService.delete(`${this.NOTE_API_ENDPOINT}/${note.id}`).pipe(map(n=>{
      const index = this.notes.indexOf(note);
      this.notes.splice(index, 1);
      return this.notes;
    }))
  }

}
