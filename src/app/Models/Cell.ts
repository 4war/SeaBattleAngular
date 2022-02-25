import {States} from "./States";
import {Sides} from "./Sides";

export class Cell {
  public X:number = 0;
  public Y:number = 0;
  public State: States = States.Clear;
  public Side: Sides = Sides.User;
}
