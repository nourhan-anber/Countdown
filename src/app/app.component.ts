import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Countdown';
  event = JSON.parse(localStorage.getItem('Event'));


  ngOnInit(){
    if (!Notification) {
      alert('Desktop notifications not available in your browser. Try Chromium.');
      return;
     }
    
     if (Notification.permission !== 'granted')
      Notification.requestPermission();
  }

  saveEvent(e){
    this.event = e;
    localStorage.setItem("Event", JSON.stringify(e));
  }
}
