import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {
    SharedModule,
    ButtonModule,
    ConfirmDialogModule,
    ConfirmationService,
    GrowlModule,
    DialogModule,
    PanelModule,
  DataListModule,
  AccordionModule,
  OverlayPanelModule
} from "primeng/primeng";
import {InputSwitchModule} from "primeng/components/inputswitch/inputswitch";
import { RouterModule, Routes } from '@angular/router';
import {OperationFrameComponent} from "./operation.frame.component";
import {AuthGuard} from "../../config/auth-guard.service";

import {OperationVehicleMapsComponent} from "./vehicle/operation.vehicle.maps.component";


const routes: Routes = [
  {path:'overview',component:OperationFrameComponent,
    canActivateChild: [AuthGuard], children: [
    {path: '', redirectTo: 'maps', pathMatch: 'full'},
    {path: 'maps', component: OperationVehicleMapsComponent}
  ]
  }
];
@NgModule({
    imports: [FormsModule, CommonModule, HttpModule, ReactiveFormsModule,
      SharedModule, ButtonModule, ConfirmDialogModule, GrowlModule, DialogModule,
       PanelModule,  DataListModule, AccordionModule, OverlayPanelModule,InputSwitchModule, RouterModule.forChild(routes)],
    declarations: [OperationFrameComponent,OperationVehicleMapsComponent],
    providers: [ConfirmationService]
})
export class OperationModule {
}
