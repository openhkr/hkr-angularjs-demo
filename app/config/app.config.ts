import {PageNotFoundComponent} from "../modules/common/abnormal/pageNotFound.component";
import {Routes} from '@angular/router';
import {AuthGuard} from "./auth-guard.service";
import {LoginComponent} from "../modules/login/login.component";

export class Config  {

    public static topTitle = 'hkr-demo';

    public static version = '@auth liushk 529490448@qq.com';


    public static  fatherRoutes:Routes =    [

      {path: 'login', component:LoginComponent},
      {
        path: 'OperationTool',
        loadChildren: 'es6-promise-loader?,[name]!../modules/operation-tool/operation.module#OperationModule',
      },
        {path: '', redirectTo: 'login', pathMatch: 'full'}
    ];



}
