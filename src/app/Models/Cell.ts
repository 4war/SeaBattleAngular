import {States} from "./States";
import {Sides} from "./Sides";

export class Cell {
  public x:number = 0;
  public y:number = 0;
  public state: States = States.Clear;
  public side: Sides = Sides.User;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
