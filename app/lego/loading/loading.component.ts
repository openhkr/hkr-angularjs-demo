/**
 * Created by Administrator on 2017/4/19.
 * 违章信息管理-待办列表
 */
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'loading-cmp',
  template: `
    <div id="spinner" *ngIf="displaySpinner"></div>
    <div id="mask" *ngIf="displaySpinner"></div>`,
  stylesUrl: [`/platform/lego/loading/loading.scss`],
  providers: []
})

export class LoadingComponent implements OnInit {

  displaySpinner:boolean = false;

  constructor() {

  }


  ngOnInit() {

  }

}






