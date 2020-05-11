import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {


  constructor(public calendar: NgbCalendar) { }


  eventForm = new FormGroup({
    'title': new FormControl('',[
      Validators.required
    ]),
    'date': new FormControl('',[
      Validators.required,
    ])
    
    })

    checkTime: ValidatorFn = (control : FormControl): ValidationErrors | null =>{
      let t = new Date();
  
      if(control.value && this.calendar.getToday().equals(NgbDate.from(this.eventForm.controls.date.value))){
        if(t.getHours() < control.value.hour){
          return null;
        }
        if(t.getHours() == control.value.hour && t.getMinutes() < control.value.minute){
          return null;
        }
        return {'timeChecked': true};
      }
     
    }

    timeControl =  new FormControl('',{ validators:[
      this.checkTime
    ]})


    @Output() eventEmit = new EventEmitter<any>();
  ngOnInit(): void {
  }
 
  onSubmit() {
  
    Object.keys(this.eventForm.controls).forEach((key)=>{
      this.eventForm.controls[key].markAllAsTouched();
    });
    this.timeControl.markAllAsTouched();
    if(this.eventForm.valid){
      let newEvent = {
        title : this.eventForm.controls.title.value,
        date: this.eventForm.controls.date.value,
        time: this.timeControl.value
      }
      this.eventEmit.emit(newEvent);
    }
  }
}
