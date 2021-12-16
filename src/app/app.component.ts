import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title: string = 'heroes';
  constructor() {
    this.title = 'nuevo titulo';
  }
}
