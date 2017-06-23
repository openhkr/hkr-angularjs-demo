import {Component, OnInit,ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {trigger, state, style, animate, transition} from '@angular/animations';
import {Router} from "@angular/router";
import {OperationVehicleMapsComponent} from "./vehicle/operation.vehicle.maps.component";
@Component({
  template: `
      <div class="opTitle">
          <button type="button" (click)="toggle()" class="btn toggleBtn">
                <em style="color:white;" class="fa fa-list" aria-hidden="true"></em>
          </button>
          我的坦克在哪了
           <a routerLink="/login" routerLinkActive="active" class="titleSpan logout"> 退出</a>
      </div>
      <div class="router" [ngStyle]="{'height':winHeight}">
       <router-outlet></router-outlet>
       </div>
      <div class="opBottom">   
         <div class="opBottomBlock" [ngClass]="{'opBottomBlock_active':activeFlag === 0}" (click)="change(0)">
         <i class="fa fa-car" aria-hidden="true"></i>
         坦克查询
         </div>
         
      </div>
    `,
  styles: [`
.router{
  overflow-y: scroll;
}
.opTitle{
  width: 100%;
  height: 50px;
   font-size: 18px;
    line-height: 50px;
    text-align: center;
    background-color: #0F67A7;
     color: white;
}
.btn{
 background-color: #0F67A7;
    position: absolute;
    top:0;
    height: 50px;
    border: none;
    color:white;
}
.toggleBtn{
    left:5px;
}
.titleSpan{
    position: absolute;
    top:0;
    font-size:14px;
    color: white;
}
.city{
    right:50px;
}
.logout{
    right:10px;
}
.opBottom{
 width: 100%;
 height: 50px;
 position: fixed;
 left: 0;
 bottom: 0;
 background-color: #0F67A7;
 color: white;
 line-height: 50px;
 text-align: center;
 border-top: 1px solid grey;
}
.opBottomBlock{
float: left;
width: 100%;
cursor: pointer;
}

.opBottomBlock_active{
 background-color: #0499E8;
}
`]
})
export class OperationFrameComponent implements OnInit {
  winHeight:string;
  activeFlag : number = 0;

  // @ViewChild(RentalshopList)
  // rentalshopList:RentalshopList;

  displayRentalshop:boolean = false;

  showLeft:boolean = true;
  showMask:boolean = false;
  public state = 'out';

  // msgs: Message[] = [];
  display: boolean = false;
  Citydisplay: boolean = false;
  arr: any = [];
  CityArr: any = [];
  city: string;
  userName: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    // 获取窗口高度自适应路由面页高度
    if (window.innerHeight){
      this.winHeight = (window.innerHeight-100)+'px';
    }else if ((document.body) && (document.body.clientHeight)){
      this.winHeight =(document.body.clientHeight-100)+'px';
    }

  }
  change(flag:number){
    this.activeFlag = flag;
    if(flag === 0){
      this.router.navigate(["/OperationTool/overview/vehicle"]);
    }
  }
}
