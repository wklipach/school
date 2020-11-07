import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { GuideService } from 'src/app/services/guide.service';
import { Guide7Service } from '../guide7/guide7.service';

@Component({
  selector: 'app-guide10',
  templateUrl: './guide10.component.html',
  styleUrls: ['./guide10.component.css']
})
export class Guide10Component implements OnInit, OnDestroy {

  @Input() numberComponent: number;
  @Input() titleMethodComponent = '';
  @Output() methodResultat = new EventEmitter<[]>();

  component10Form: FormGroup;
  message: any;
  subscription: Subscription;
  methodAggegateList: any;
  listBasicLearningActions: any;
  messageEmitter = new Subject<String>();


  constructor(private gs: GuideService, private g7s: Guide7Service) { 
    this.component10Form = new FormGroup({});
  }

  ngOnInit(): void {
    this.subscription = this.g7s.getMessage().subscribe(message => {
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
    console.log(this.methodAggegateList);
  });
}

loadValue() {

  const res: any = [];

   this.listBasicLearningActions.forEach( element => {
//      console.log('aggregateCheck' + element.id.toString(), this.list5Form.controls['aggregateCheck' + element.id.toString()].value);
     if (this.component10Form.controls[this.numberComponent.toString() + 'comp10aggregateCheck' + element.id.toString()].value) {
       res.push(element.id);
     }
   });
   this.methodResultat.emit(res);
 }


}
