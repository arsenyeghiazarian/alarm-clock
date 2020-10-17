import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent {
  public inputValue: number;
  public isAlarmActive: boolean;
  public isAlarmSet: boolean;
  public showAlert: boolean;
  private audio = new Audio('../assets/sound.mp3');
  private setTimeoutId: number;

  @ViewChild('alarmInput') alarmInput: ElementRef<any>;

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
    this.isAlarmSet = true;
    this.setTimeoutId = setTimeout(() => {
      this.alarm()
    }, timeDifferenceInMs)
  }

  public cancelAlarm() {
    clearTimeout(this.setTimeoutId)
    this.isAlarmSet = false;
    this.alarmInput.nativeElement.value = '';
  }

  public stopAlarm(state) {
    this.audio.pause()
    this.isAlarmActive = false;
    if(state !== 'snooze') this.alarmInput.nativeElement.value = '';
  }

  public snoozeAlarm() {
    this.stopAlarm('snooze')
    this.setTimeoutId = setTimeout(() => {
      this.alarm()
    }, 5 * 60 * 1000)
  }

  private alarm() {
    this.audio.loop = true;
    this.audio.play();
    this.isAlarmSet = false;
    this.isAlarmActive = true;
  }
}
