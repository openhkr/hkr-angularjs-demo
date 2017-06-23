import {NgModule} from '@angular/core';
import {RootRoutingModule} from "./root_routing.module";
import {RootComponent} from "./root_component";
import {LoginComponent} from "../modules/login/login.component";
import {FormsModule }   from '@angular/forms';
import {CommonModule, APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AuthGuard} from "../config/auth-guard.service";
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserModule, Title} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";




@NgModule({
    imports: [RootRoutingModule,FormsModule,CommonModule,BrowserModule,BrowserAnimationsModule,HttpModule
    ],
    declarations: [RootComponent,LoginComponent,
        ],
    providers: [AuthGuard,Title,
      {provide: APP_BASE_HREF, useValue : '/' },
        {provide: LocationStrategy, useClass: HashLocationStrategy}],
    exports: [RootComponent],
    bootstrap: [RootComponent]
})


export class RootModule {
}
