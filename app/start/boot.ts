/**
 * User: liushk
 * Date: 2017/1/15
 * Time: 16:38
 * Des: 这个文件永远不用修改，知道它是干什么的就行。
 */
// import 'zone.js/dist/zone';
import 'reflect-metadata';
import 'rxjs/add/operator/map';
// import 'core-js/es6';
// import 'core-js/es7/reflect';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {RootModule} from "./root_module";
import {enableProdMode} from '@angular/core';

// if (process.env.ENV === 'production') {
    enableProdMode();
// }

/*浏览器容器模块的方法用来启动根模块，类似整个工程的启动按钮,在gulpfile.js中引燃此按钮*/
platformBrowserDynamic().bootstrapModule(RootModule);
