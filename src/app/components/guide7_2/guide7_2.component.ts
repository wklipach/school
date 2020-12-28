import {Component, Input, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {GuideService} from '../../services/guide.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Guide7_2Service} from './guide7_2.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-guide7_2',
  templateUrl: './guide7_2.component.html',
  styleUrls: ['./guide7_2.component.css']
})
export class Guide7_2Component implements OnInit, OnDestroy {

  @Input() numberComponent: number;
  @Input() titleMethodComponent = '';

  @Input() set documentComponentMethodList(value: any[]) {
    value.forEach( (element, ind) => {
      const documentMethod = {id: element.id, id_group: element.id_group,
        title: element.title, group_title: element.title,  delete: 0, text: element.text};

        let teacheractivity = '';
        if (element.teacheractivity) {
          teacheractivity = element.teacheractivity;
        }

        let studentactivities = '';
        if (element.studentactivities) {
          studentactivities = element.studentactivities;
        }

      let  reviewerrecommendations = '';
      if (element.reviewerrecommendations) {
        reviewerrecommendations = element.reviewerrecommendations;
      }

      const newIndex = this._documentComponentMethodList.push(documentMethod) - 1;
      this.methodForm.addControl(this.numberComponent.toString() + 'method' + newIndex.toString(), new FormControl(element.text));

      this.methodForm.addControl(this.numberComponent.toString() + 'teacheractivity' + newIndex.toString(), new FormControl(teacheractivity));
      this.methodForm.addControl(this.numberComponent.toString() + 'studentactivities' + newIndex.toString(), new FormControl(studentactivities));
      this.methodForm.addControl(this.numberComponent.toString() + 'reviewerrecommendations' + newIndex.toString(), new FormControl(reviewerrecommendations));
      });
  }
  get documentComponentMethodList(): any[] {
    return this._documentComponentMethodList;
  }

  @Output() methodResultat = new EventEmitter<[]>();

  methodAggegateList: any;
  _documentComponentMethodList = [];


  // documentComponentMethodList = [];

  methodForm: FormGroup;

  message: any;
  subscription: Subscription;

  constructor(private gs: GuideService, private g7_2s: Guide7_2Service) {
    this.methodForm = new FormGroup({});

    this.subscription = this.g7_2s.getMessage().subscribe(message => {
      this.message = message;


      if (message.i.toString() === this.numberComponent.toString() && message.message.toString() === 'guide7_2') {
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
      value.teacheractivity = this.methodForm.controls[this.numberComponent.toString() + 'teacheractivity' + i.toString()].value;
      value.studentactivities = this.methodForm.controls[this.numberComponent.toString() + 'studentactivities' + i.toString()].value;
      value.reviewerrecommendations = this.methodForm.controls[this.numberComponent.toString() + 'reviewerrecommendations' + i.toString()].value;

    });
    resultCollection = resultCollection.filter(obj => obj.delete === 0);
    return resultCollection;
  }

  onMethod(curMethodValue, curGroupValue) {

    const documentMethod = {id: curMethodValue.id, id_group: curMethodValue.id_group,
                            title: curMethodValue.title, group_title: curGroupValue.title,  delete: 0, text: ''};
    const newIndex = this.documentComponentMethodList.push(documentMethod) - 1;
    this.methodForm.addControl(this.numberComponent.toString() + 'method' + newIndex.toString(), new FormControl(''));
    this.methodForm.addControl(this.numberComponent.toString() + 'teacheractivity' + newIndex.toString(), new FormControl(''));
    this.methodForm.addControl(this.numberComponent.toString() + 'studentactivities' + newIndex.toString(), new FormControl(''));
    this.methodForm.addControl(this.numberComponent.toString() + 'reviewerrecommendations' + newIndex.toString(), new FormControl(''));
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
