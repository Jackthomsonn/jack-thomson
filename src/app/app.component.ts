import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  public year: string;

  ngOnInit() {
    this.year = new Date()
      .getFullYear()
      .toString();
  }
}
