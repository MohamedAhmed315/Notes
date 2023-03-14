import { Component, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Notes';
  @ViewChild('noteInput') noteInput: any;
  @ViewChild('notesList') notesList: any;
  lastkey: string = '';
  viewClearBtn = false;
  counter = 0;
  notes: string[] = [];
  keys: string[] = [];

  constructor(private renderer: Renderer2) { }

  addnote(e: any) {
    e.preventDefault();
    this.save_note(this.noteInput.nativeElement.value);
    this.noteInput.nativeElement.value = ' ';
    this.counter++;
    this.lastkey = this.lastkey + this.counter
  }

  save_note(note: string): void {
    localStorage.setItem(`${this.notes.length}`, note);
    this.notes.push(note);
    this.view_Clear_btn();
  }

  load_notes(): void {
    for (const [key, value] of Object.entries(localStorage)) {
      this.notes.push(`${value}`);
      this.keys.push(`${key}`);
    }
    this.view_Clear_btn();
  }

  ngOnInit(): void {
    this.load_notes();
  }

  clear_all() {
    localStorage.clear();
    this.notes.length = 0;
    this.view_Clear_btn();
  }

  delete_note(key: number) {
    localStorage.removeItem(this.keys[key]);
    this.notes.splice(key, 1);
    this.view_Clear_btn();
  }

  view_Clear_btn() {
    if (this.notes.length != 0) {
      this.viewClearBtn = true;
    }
    else {
      this.viewClearBtn = false;
    }
  }
}
