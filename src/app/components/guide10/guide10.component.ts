import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { GuideService } from 'src/app/services/guide.service';
import { Guide7_2Service } from '../guide7_2/guide7_2.service';

@Component({
  selector: 'app-guide10',
  templateUrl: './guide10.component.html',
  styleUrls: ['./guide10.component.css']
})
export class Guide10Component implements OnInit, OnDestroy {

  vnumberComponent = '1';
  @Input() numberComponent: number;
  @Input() titleMethodComponent = '';
  @Output() methodResultat = new EventEmitter<{}>();

  @Input() set checkArray(value) {

    if (value && 'checkArray' in value) {
      const arr: [] = value['checkArray'];
      arr.forEach((element, ind) => {
        const sname = this.numberComponent.toString() + 'comp10aggregateCheck' + element;
        if (this.component10Form.controls[sname]) {
          this.component10Form.controls[sname].setValue(true);
        }
      });
      this._checkArray = value;
    }
  }

  get checkArray() {
    return this._checkArray;
  }
  _checkArray  = {};


  component10Form: FormGroup;
  message: any;
  subscription: Subscription;
  methodAggegateList: any;
  listBasicLearningActions: any;
  messageEmitter = new Subject<String>();


  constructor(private gs: GuideService, private g7_2s: Guide7_2Service) {

    const a = new FormControl('');

    this.component10Form = new FormGroup({ });
  }

  ngOnInit(): void {
    this.component10Form.addControl(this.numberComponent + 'FamStu', new FormControl(''));
    this.subscription = this.g7_2s.getMessage().subscribe(message => {
      this.message = message;

      if (message.i.toString() === this.numberComponent.toString() && message.message.toString() === 'guide10') {
        this.loadValue();
      }

    });

    this.messageEmitter.subscribe(msg => {
      if (msg === 'listBasicLearningActions') {
        this.loadCheckBox();
        this.loadMethodCollection();
      }
    });

     this.LoadCollection('classBasicLearningActions', 'listBasicLearningActions');
     this.LoadCollection('classGroupLearningActions', 'listGroupLearningActions');

  }

  loadCheckBox() {
    // console.log('компонент =>', this.numberComponent.toString());
    this.listBasicLearningActions.forEach( element => {
      this.component10Form.addControl(this.numberComponent.toString() + 'comp10aggregateCheck' +
                                                        element.id.toString(), new FormControl(''));
    });


    if ('checkArray' in this.checkArray) {
      const arr: [] = this.checkArray['checkArray'];

      arr.forEach((element, ind) => {
        const sname = this.numberComponent.toString() + 'comp10aggregateCheck' + element;
        if (this.component10Form.controls[sname]) {
          this.component10Form.controls[sname].setValue(true);
        }
      });
    }

    if ('text' in this.checkArray) {
      const sname = this.numberComponent.toString() + 'FamStu';
      if (this.component10Form.controls[sname]) {
        this.component10Form.controls[sname].setValue(this.checkArray['text']);
      }
    }

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

loadMethodCollection() {
  this.gs.selectLearningActions().subscribe(methodList => {
    this.methodAggegateList = methodList;
    // console.log(this.methodAggegateList);
  });
}

loadValue() {

  const res: any = [];

   this.listBasicLearningActions.forEach( element => {
     if (this.component10Form.controls[this.numberComponent.toString() + 'comp10aggregateCheck' + element.id.toString()].value) {
       res.push(element.id);
     }
   });

   const text = this.component10Form.controls[this.numberComponent.toString() + 'FamStu'].value
   const resObj = {text: text, checkArray: res};
   this.methodResultat.emit(resObj);


 }


}
