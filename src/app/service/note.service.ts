import {Inject, Injectable} from '@angular/core';
import {Note as NoteDTO} from "../dto/note";
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject} from "rxjs";


export const USER_ID = "7bc90fbf-f40b-48f3-aed0-a06d9a9c50c6";

@Injectable()
export class NoteService {


  private readonly NOTE_API_ENDPOINT = `http://localhost:8080/notes/api/v1/users/${USER_ID}/notes`
  private notes:Array<NoteDTO> =[];
  private subject = new Subject<Array<NoteDTO>>();

  constructor(@Inject(HttpClient)private httpService: HttpClient) {
    if(this.notes.length ===0){
      this.httpService.get<Array<NoteDTO>>(this.NOTE_API_ENDPOINT).pipe(map(notes=>(this.notes = notes)));
    }
  }


  getAllNotes():Observable<Array<NoteDTO>>{
    // return this.httpService.get<Array<NoteDTO>>(this.NOTE_API_ENDPOINT).pipe(map(notes=>(this.notes = notes)));
    return this.subject.asObservable();
  }

  saveNote(note:NoteDTO):Observable<boolean>{
    return this.httpService.post<NoteDTO>(this.NOTE_API_ENDPOINT, note).
    pipe(map(n=>{
      this.notes.push(n);
      this.subject.next(this.notes);
      return true;
    }))
  };


  deleteNote(note:NoteDTO):Observable<boolean>{
    return this.httpService.delete(`${this.NOTE_API_ENDPOINT}/${note.id}`).pipe(map(n=>{
      const index = this.notes.indexOf(note);
      this.notes.splice(index, 1);
      this.subject.next(this.notes);
      return true;
    }))
  }

}
