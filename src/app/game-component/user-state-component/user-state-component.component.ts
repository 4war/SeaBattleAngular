import {Component, NgModule, OnInit} from '@angular/core';
import {Game} from "../../Models/Game";

@Component({
  selector: 'app-user-state-component',
  templateUrl: './user-state-component.component.html',
  styleUrls: ['./user-state-component.component.css']
})


export class UserStateComponentComponent implements OnInit {
  message: string = '';
  constructor(private game: Game) { }

  ngOnInit(): void {
  }

  confirm(): void {

  }
}
