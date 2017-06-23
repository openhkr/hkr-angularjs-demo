import {Component, OnInit, OnDestroy} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {Router, ActivatedRoute} from "@angular/router";
import {Amap} from "../../common/utils/amap/amap";
@Component({
  template: `
<p-growl [value]="msgs"></p-growl>
<p-confirmDialog header="操作确认" icon="fa fa-question-circle" width="250" #cd>
    <p-footer>
        <button type="button" pButton icon="fa-close" label="取消" (click)="cd.reject()"></button>
        <button type="button" pButton icon="fa-check" label="确定" (click)="cd.accept()"></button>
    </p-footer>
</p-confirmDialog>
   <div class="refresh" type="button" pButton icon="fa-car" label="刷新" (click)="refresh()"></div>
 <div id="track_map" style="width: 100%; height:100%;"></div>
    `,
  styles: [`
.refresh{
    margin-left: 10px;
    float: left;
    margin-top: 4px;
    position: absolute;
    left: 100px;
    top: 50px;
    z-index: 1;
}
.refresh1{
    margin-left: 10px;
    float: left;
    margin-top: 4px;
    position: absolute;
    left: 0px;
    top: 50px;
    z-index: 1;
}
`]
  ,
  providers:[Amap]
})
export class OperationVehicleMapsComponent implements OnInit ,OnDestroy{
  vno: string; //车牌号
  id: number; //车辆ID
  msgs: Message[] = [];
  intervalTime: number; //地图定时刷新时间
  intervalStatus: string; //地图是否刷新标志位
  locationTimer: any; //定时器
  autoflag:boolean = true;//是否请求数据标志位
  location : any;//地理位置实体类
  locationCopy: any;//地理位置实体类 副本


  constructor( private confirmationService: ConfirmationService,
              private _router: Router, private route: ActivatedRoute,private _amap: Amap) {
  }
  ngOnInit() {
    this._amap.initMap();
    this._amap.ToolBar();
    this.get();
    this._amap.setFlag(true);
    this.reload();
  }
  ngOnDestroy() {
    if(this.locationTimer){
    clearInterval(this.locationTimer);
    }
  }
  refresh(){
    this.reload();
  }
  get() {
    // 获取缓存中的设置
      if(this.locationTimer){
        clearInterval(this.locationTimer);
      }

      this.autoRefresh(this.intervalTime);
  }
  //自动刷新
  autoRefresh(timer) {
    // 创建自动刷新定时器
      this.locationTimer = setInterval(function() {
        if(this.autoflag){
          this.reload();
        }
      }.bind(this), timer);
  }

  // 用来获取车辆位置信息，手动、自动都调用一个方法……
  reload () {
       this.location = {"vno": "4", "longitude": "123.392893", "latitude": "41.727479", "time": "2016-3-14"};//鹿特丹
        if (!this._amap.checkLocation(this.locationCopy, this.location) || this.locationCopy === undefined) {
          // 位置发生改变
          this._amap.vehicleMarker(this.location);
          this.locationCopy = this.location;
        }


  }

}
