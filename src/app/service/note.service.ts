import { Injectable } from '@angular/core';
import {Note as NoteDTO} from "../dto/note";

@Injectable()
export class NoteService {

  private notes:Array<NoteDTO> =[];

  constructor() { }

}
