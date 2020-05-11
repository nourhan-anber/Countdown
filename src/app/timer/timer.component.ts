import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor() { }
  event = JSON.parse(localStorage.getItem("Event"));
  duration = 0;

  countdown

  intervalID

  @Output() nullEmit = new EventEmitter<any>();
  ngOnInit(): void {
    
  this.updateCountdown();
    this.intervalID = setInterval(() => {
        this.updateCountdown();
    }, 400);
  }

  addEvent() {
    this.nullEmit.emit(null);
  }

  updateCountdown() {
    this.duration = moment(`${this.event.date.year}-${this.event.date.month}-${this.event.date.day} ${this.event.time.hour}:${this.event.time.minute}`, "YYYY-MM-DD HH:mm").diff(moment());
    const diffDuration = moment.duration(this.duration);
    console.log(diffDuration);
    if(diffDuration.days() > 0 || diffDuration.hours() > 0 || diffDuration.minutes() > 0 || diffDuration.seconds() > 0){
      this.countdown = `${diffDuration.days()}  days, ${diffDuration.hours()} hours: ${diffDuration.minutes()} minutes: ${diffDuration.seconds()} seconds`;
    }
    else{
      this.countdown = ' 00 days, 00 hours: 00 minutes: 00 seconds';
      this.notifyMe();
    }

  }

  notifyMe() {
    clearInterval(this.intervalID);
    if (Notification.permission !== 'granted')
     Notification.requestPermission();
    else {
     var notification = new Notification( this.event.title, {
      icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      body: 'Your Event is here!',
     });
     notification.onclick = function() {
      window.open('http://stackoverflow.com/a/13328397/1269037');
     };
    }
   }

}
