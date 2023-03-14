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
    console.log(this.notes);
  }

  load_notes(): void {
    for (const [key, value] of Object.entries(localStorage)) {
      this.notes.push(`${value}`);
      this.keys.push(`${key}`);
      // this.lastkey = `${this.notes.length}`;
    }
    // this.lastkey = this.lastkey + this.counter;
    console.log(this.notes.length);
  }

  ngOnInit(): void {
    this.load_notes();
  }

  clear_all() {
    localStorage.clear();
    this.notes.length = 0;
  }

  delete_note(key: number) {
    localStorage.removeItem(this.keys[key]);
    this.notes.splice(key, 1);
  }
}
