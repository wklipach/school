import {Component, Input, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {GuideService} from '../../services/guide.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Guide7Service} from './guide7.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-guide7',
  templateUrl: './guide7.component.html',
  styleUrls: ['./guide7.component.css']
})
export class Guide7Component implements OnInit, OnDestroy {

  @Input() numberComponent: number;
  @Input() titleMethodComponent = '';
  @Output() methodResultat = new EventEmitter<[]>();

  methodAggegateList: any;
  documentComponentMethodList = [];

  methodForm: FormGroup;

  message: any;
  subscription: Subscription;

  constructor(private gs: GuideService, private g7s: Guide7Service) {
    this.methodForm = new FormGroup({});

    this.subscription = this.g7s.getMessage().subscribe(message => {
      this.message = message;


      if (message.i.toString() === this.numberComponent.toString() && message.message.toString() === 'guide7') {
        this.loadValue();
      }

    });
  }

  ngOnInit(): void {
    this.loadMethodCollection();

  }

  loadValue() {
    // делаем список без удаженных значений
    const res: any = this.deleteInfoFromMultiLevelGuide(this.documentComponentMethodList);
    this.methodResultat.emit(res);
  }


  deleteInfoFromMultiLevelGuide(arrayCollection: any[]) {
    let resultCollection = arrayCollection.map(x => Object.assign({}, x));

    resultCollection.forEach( (value, i) => {
      value.text = this.methodForm.controls[this.numberComponent.toString() + 'method' + i.toString()].value;
    });
    resultCollection = resultCollection.filter(obj => obj.delete === 0);
    return resultCollection;
  }

  onMethod(curMethodValue, curGroupValue) {
    const documentMethod = {id: curMethodValue.id, id_group: curMethodValue.id_group,
                            title: curMethodValue.title, group_title: curGroupValue.title,  delete: 0, text: ''};
    const newIndex = this.documentComponentMethodList.push(documentMethod) - 1;
    this.methodForm.addControl(this.numberComponent.toString() + 'method' + newIndex.toString(), new FormControl(''));
    console.log('documentMethod=', documentMethod);
  }

  loadMethodCollection() {
    this.gs.selectGroupInnerMethod().subscribe(methodList => {
      this.methodAggegateList = methodList;
    });
  }

  onClickDeleteMethod(DOL) {
    DOL.delete = 1;
  }

  ngOnDestroy(): void {
    // нужно отписаться чтобы не выгружать память
    this.subscription.unsubscribe();
  }

}
