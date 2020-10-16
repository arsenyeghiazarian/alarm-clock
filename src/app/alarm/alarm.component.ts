import { Component } from '@angular/core';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent {
  public inputValue: number;
  public isAlarmActive: boolean;
  public showAlert: boolean;
  private audio = new Audio('../assets/sound.mp3')
  private setTimeoutId: number;

  constructor() { }

  public onInputChange(e) {
    this.inputValue = e.target.valueAsNumber;
  }

  public setAlarm() {
    this.showAlert = false;
    let alarm = new Date(this.inputValue);
    let alarmTime = new Date(alarm.getUTCFullYear(), alarm.getUTCMonth(), alarm.getUTCDate(),  alarm.getUTCHours(), alarm.getUTCMinutes(), alarm.getUTCSeconds());
    let timeDifferenceInMs = alarmTime.getTime() - (new Date().getTime());
    if(timeDifferenceInMs < 0) {
      this.showAlert = true;
      return
    }
    this.isAlarmActive = true;
    this.setTimeoutId = setTimeout(() => {
      this.audio.play();
    }, timeDifferenceInMs)

  }

  public stopAlarm() {
    this.isAlarmActive = false;
    this.audio.pause()
    clearTimeout(this.setTimeoutId)
  }
}
