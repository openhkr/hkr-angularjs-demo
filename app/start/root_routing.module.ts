import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';
import {Config} from "../config/app.config";

@NgModule({
    imports: [RouterModule.forRoot(Config.fatherRoutes)],
    exports: [RouterModule]
})
export class RootRoutingModule {
}
