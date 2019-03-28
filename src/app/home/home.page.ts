import { MicrogearService } from "./../microgear.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  private microgear: any = null;
  gaugeType = "arch";
  gaugeValue = 10;
  gaugeLabel = "Speed Motor";
  gaugeAppendText = "RPM";
  public pwmstop = 0;
  public pwn = 0;
  public right = 0;
  public left = 0;

  constructor(private netpie: MicrogearService) {}
  ngOnInit(): void {
    this.microgear = this.netpie.microgear();
    this.microgear.connect("ControlMotor1");

    this.microgear.on("connected", () => {
      this.microgear.setAlias("IONIC@4");
      console.log("connected");
      this.microgear.subscribe("/node/+");
    });

    this.microgear.on("message", (topic: any, msg: string) => {
      this.gaugeValue = parseInt(msg);
    });
  }

  public onstop() {
    this.pwn = 0;
    this.microgear.publish(
      "/chat/data",
      this.pwn + ";" + this.left + ";" + this.right + ";"
    );
  }

  public onchangepwn(number) {
    this.pwn = number;
    this.microgear.publish(
      "/chat/data",
      this.pwn + ";" + this.left + ";" + this.right + ";"
    );
  }

  public onright() {
    this.right = 1;
    this.left = 0;
    this.microgear.publish(
      "/chat/data",
      this.pwn + ";" + this.left + ";" + this.right + ";"
    );
  }
  public onleft() {
    this.right = 0;
    this.left = 1;
    this.microgear.publish(
      "/chat/data",
      this.pwn + ";" + this.left + ";" + this.right + ";"
    );
  }
}
