import { Injectable } from "@angular/core";
declare var Microgear;

@Injectable({
  providedIn: "root"
})
export class MicrogearService {
  constructor() {}

  public microgear(): any {
    var microgear = Microgear.create({
      key: "oVYwhpHHXgN9hd9",
      secret: "uBLbJmJLUaSnNzHnJZcMyWKql",
      alias: "IONIC4"
    });
    return microgear;
  }
}