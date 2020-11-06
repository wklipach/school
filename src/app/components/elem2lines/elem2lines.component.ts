import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Guide7Service} from '../guide7/guide7.service';
import {GuideService} from '../../services/guide.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-elem2lines',
  templateUrl: './elem2lines.component.html',
  styleUrls: ['./elem2lines.component.css']
})
export class Elem2linesComponent implements OnInit, OnDestroy {

  @Input() numberComponent: number;
  @Input() titleMethodComponent = '';
  @Output() methodResultat = new EventEmitter<[]>();


  elem2Form: FormGroup;
  documentComponentList = [];
  message: any;
  subscription: Subscription;

  constructor(private gs: GuideService, private g7s: Guide7Service) {
    this.elem2Form = new FormGroup({});

    this.subscription = this.g7s.getMessage().subscribe(message => {
      this.message = message;

      if (message.i.toString() === this.numberComponent.toString() && message.message.toString() === 'elem2lines') {
        this.loadValue();
      }

      if (message.i.toString() === this.numberComponent.toString() && message.message.toString() === 'addStudentElem2lines') {
        this.addStudentClick();
      }

    });
  }

  ngOnInit(): void {
  }



  onClickDeleteMethod(DOL) {
    DOL.delete = 1;
  }

  addStudentClick() {
    const documentMethod = {text1: '', text2: '',  delete: 0};
    const newIndex = this.documentComponentList.push(documentMethod) - 1;
    this.elem2Form.addControl(this.numberComponent.toString() + 'text1lines' + newIndex.toString(), new FormControl(''));
    this.elem2Form.addControl(this.numberComponent.toString() + 'text2lines' + newIndex.toString(), new FormControl(''));
  }

  loadValue() {
    // делаем список без удаженных значений
    const res: any = this.deleteInfoFromGuide(this.documentComponentList);
    this.methodResultat.emit(res);
  }

  deleteInfoFromGuide(arrayCollection: any[]) {
    let resultCollection = arrayCollection.map(x => Object.assign({}, x));
    resultCollection.forEach( (value, i) => {
      value.text1 = this.elem2Form.controls[this.numberComponent.toString() + 'text1lines' + i.toString()].value;
      value.text2 = this.elem2Form.controls[this.numberComponent.toString() + 'text2lines' + i.toString()].value;
    });
    resultCollection = resultCollection.filter(obj => obj.delete === 0);
    return resultCollection;
  }

  ngOnDestroy(): void {
    // нужно отписаться чтобы не выгружать память
    this.subscription.unsubscribe();
  }


}
