import { Component, OnInit } from '@angular/core';
import * as GitHub from 'github-api';

@Component({
  selector: 'app-home',
  styleUrls: ['home.component.scss'],
  templateUrl: 'home.component.html'
})

export class HomePageComponent implements OnInit {
  private setAvatar(url: string) {
    document.documentElement.style
      .setProperty('--avatarUrl', `url(${url})`);
  }

  ngOnInit(): void {
    new GitHub()
      .getUser('jackthomsonn')
      .getProfile((err: Error, { avatar_url }) => {
        if (err) { return; }

        this.setAvatar(avatar_url);
      });
  }
}
