import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addNewNote(txtNote: HTMLInputElement):void {
    console.log("Add new Note ", txtNote.value);
    txtNote.value = "";
    txtNote.focus();
  }
}
