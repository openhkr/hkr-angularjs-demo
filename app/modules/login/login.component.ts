import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Config} from "../../config/app.config";
import {Message} from "primeng/components/common/api";
import {EntranceService} from "../common/frame/entrance.service";

@Component(
    {
        selector: 'login-form',
        templateUrl: '/platform/modules/login/login.component.html',
        styles: [`
.dis{
  -webkit-animation-name: fadeIn;
  -webkit-animation-duration: 3s;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-delay: 0s;
}
@-webkit-keyframes fadeIn {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes light {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
}

.col-md-8 {
    text-align: center;
}
.plat_title{
  color: white;
  font-size: 18px;
  white-space: nowrap;
  margin: 10px auto 0;
}
.light_input{
  background-color: rgba(246, 247, 249, 0.26);
  padding: 20px;
      width: 90%;
    margin: 0 auto;
}
.contener
{
  border: 2px solid #01aec5;
  height: 45px;
  background-color: #00bcd4;
  line-height: 45px;
  color: #ffffff;
  font-weight: 300;
  font-family: 'Roboto';
  font-size: 20px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 1px 1px 1px #333333;
}
.contener:hover .circle
{
  -webkit-animation:oblik 0.4s ease-in;
  -webkit-transform-origin: 50% 50%;
  -moz-animation:oblik 0.4s ease-in;
  -moz-transform-origin: 50% 50%;
  -ms-animation:oblik 0.4s ease-in;
  -ms-transform-origin: 50% 50%;
  animation:oblik 0.4s ease-in;
  transform-origin: 50% 50%;
  width: 360px;
  height: 100px;
  border-radius: 70%;
  background-color: #1d1d1d;
}
@-webkit-keyframes oblik {
  0% {opacity:1;-webkit-transform:scale(0);}
  100% {opacity:0;-webkit-transform:scale(5);background-color: #006064;}
}
@-moz-keyframes oblik {
  0% {opacity:1;-moz-transform:scale(0);}
  100% {opacity:0;-moz-transform:scale(5);background-color: #006064;}
}
@-ms-keyframes oblik {
  0% {opacity:1;-ms-transform:scale(0);}
  100% {opacity:0;-ms-transform:scale(5);background-color: #006064;}
}
@keyframes oblik {
  0% {opacity:1;transform:scale(0);}
  100% {opacity:0;transform:scale(5);background-color: #006064;}
}

.input_control{
  width:100%;
  margin:20px auto;
  font-size: 14px;
  margin-left: 14px;
}
`]
    }
)

export class LoginComponent implements OnInit {

    info:any;
    errFlag:boolean;
    errMessage:string;
    msgs: Message[] = [];
    constructor(private router: Router) {
        this.info = {
            'account':'',
            'password':''
        };
        this.errFlag = false;
        this.errMessage = "";
    }
     ngOnInit() {

     }
    onSubmit(formValue) {
                  if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    sessionStorage.setItem('isMobile','true');
                  } else {
                    sessionStorage.setItem('isMobile','false');
                  }
                  this.router.navigate(["OperationTool/overview/maps"]);
    }

}
