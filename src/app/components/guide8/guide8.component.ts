import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {GuideService} from '../../services/guide.service';
import {classBasicLearningActivities, classGroupLearningActivities} from '../../class/academicSubject';
import {Guide7Service} from '../guide7/guide7.service';

@Component({
  selector: 'app-guide8',
  templateUrl: './guide8.component.html',
  styleUrls: ['./guide8.component.css']
})
export class Guide8Component implements OnInit, OnDestroy  {

  @Input() numberComponent: number;
  @Input() titleMethodComponent = '';
  @Output() methodResultat = new EventEmitter<[]>();

  @Input() set checkArray(value: any[]) {
    value.forEach( (element, ind) => {
      const sname = this.numberComponent.toString() + 'aggregateCheck' + element.toString();
      if (this.list8Form.controls[sname]) {
        this.list8Form.controls[sname].setValue(true);
      }
    });
    this._checkArray = value;
  }

  get checkArray(): any[] {
    return this._checkArray;
  }
  _checkArray: any[] = [];


  list8Form: FormGroup;
  methodAggegateList: any;
  listBasicLearningActivities: any;
  messageEmitter = new Subject<String>();

  message: any;
  subscription: Subscription;

  constructor( private gs: GuideService, private g7s: Guide7Service) {
    this.list8Form = new FormGroup({});
  }

  ngOnInit(): void {
    this.subscription = this.g7s.getMessage().subscribe(message => {
      this.message = message;

      if (message.i.toString() === this.numberComponent.toString() && message.message.toString() === 'guide8') {
        this.loadValue();
      }

    });

    this.messageEmitter.subscribe(msg => {
      if (msg === 'listBasicLearningActivities') {
        this.loadCheckBox();
        this.loadMethodCollection();
      }
    });

     this.LoadCollection('classBasicLearningActivities', 'listBasicLearningActivities');
     this.LoadCollection('classGroupLearningActivities', 'listGroupLearningActivities');

  }

  loadValue() {

   const res: any = [];

    this.listBasicLearningActivities.forEach( element => {
//      console.log('aggregateCheck' + element.id.toString(), this.list5Form.controls['aggregateCheck' + element.id.toString()].value);
      if (this.list8Form.controls[this.numberComponent.toString() + 'aggregateCheck' + element.id.toString()].value) {
        res.push(element.id);
      }
    });
    this.methodResultat.emit(res);
  }

  loadCheckBox() {
    // console.log('компонент =>', this.numberComponent.toString());
    this.listBasicLearningActivities.forEach( element => {
      this.list8Form.addControl(this.numberComponent.toString() + 'aggregateCheck' + element.id.toString(), new FormControl(''));
    });

    this.checkArray.forEach( (element, ind) => {
      const sname = this.numberComponent.toString() + 'aggregateCheck' + element.toString();
      if (this.list8Form.controls[sname]) {
        this.list8Form.controls[sname].setValue(true);
      }
    });

  }

  loadMethodCollection() {
    this.gs.selectLearningActivities().subscribe(methodList => {
      this.methodAggegateList = methodList;
    });
  }

  LoadCollection(sName, sResult: any) {
        this.gs.selectCollection(sName).subscribe(guideList => {
          this[sResult] = guideList;
          this.messageEmitter.next(sResult);
        });
      }


  ngOnDestroy(): void {
    // нужно отписаться чтобы не выгружать память
    this.subscription.unsubscribe();
  }


}
