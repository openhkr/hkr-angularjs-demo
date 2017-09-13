import {NgModule,Component,ElementRef,OnDestroy,Input,Output,EventEmitter,trigger,state,transition,style,animate} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuItem} from './api';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

export class BasePanelMenuItem {

    constructor(public router: Router) {}

    setSelected(nodes,item){
        nodes.forEach((node) => {
            if(node.label !== item.label){
                if(node.items){
                    this.setSelected(node.items,item);
                }
                node.clicked = false;
            }
        });
    }

    handleClick(event, item) {
        if(item.disabled) {
            event.preventDefault();
            return;
        }

        item.expanded = !item.expanded;

        if(!item.url||item.routerLink) {
            event.preventDefault();
        }

        if(item.command) {
            if(!item.eventEmitter) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }

            item.eventEmitter.emit({
                originalEvent: event,
                item: item
            });
        }

        if(item.routerLink) {
            this.router.navigate(item.routerLink);
        }
    }
}

@Component({
    selector: 'p-panelMenuSub',
    template: `
        <ul class="ui-menu-list ui-helper-reset" [style.display]="expanded ? 'block' : 'none'">
            <li *ngFor="let child of item.items" class="ui-menuitem ui-corner-all" [ngClass]="{'ui-menu-parent':child.items,'selected': child.clicked}">
                <a [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" 
                    [ngClass]="{'ui-menuitem-link-hasicon':child.icon&&child.items,'ui-state-disabled':child.disabled,'selected': child.clicked}" 
                    (click)="handleClick($event,child)">
                    <span class="ui-panelmenu-icon fa fa-fw" [ngClass]="{'fa-caret-right':!child.expanded,'fa-caret-down':child.expanded}" *ngIf="child.items"></span
                    ><span class="ui-menuitem-icon fa fa-fw" [ngClass]="child.icon" *ngIf="child.icon"></span
                    ><span class="ui-menuitem-text">{{child.label}}</span>
                </a>
                <p-panelMenuSub [item]="child" [expanded]="child.expanded" *ngIf="child.items"></p-panelMenuSub>
            </li>
        </ul>
    `
})
export class PanelMenuSub extends BasePanelMenuItem {

    @Input() model: MenuItem[];

    @Input() item: MenuItem;

    @Input() expanded: boolean;

    @Input() ppp: MenuItem[];

    constructor(router: Router) {
        super(router);
    }

    handleClick(event, item) {
        item.clicked = true;
        super.handleClick(event, item);
        if(this.item.items){
            super.setSelected(this.item.items,item);
        }
        if(this.model){
            super.setSelected(this.model,item);
        }
    }
}

@Component({
    selector: 'p-panelMenu',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-panelmenu ui-widget'">
            <div *ngFor="let item of model;let f=first;let l=last;" class="ui-panelmenu-panel">
                <div tabindex="0" [ngClass]="{'ui-widget ui-panelmenu-header ui-state-default':true,'ui-corner-top':f,'ui-corner-bottom':l&&!item.expanded,
                    'ui-state-active':item.expanded,'ui-state-disabled':item.disabled,'selected': item.clicked&&!item.items}">
                    <a [href]="item.url||'#'" [ngClass]="{'ui-panelmenu-headerlink-hasicon':item.icon}" (click)="handleClick($event,item)">
                        <span *ngIf="item.items" class="ui-panelmenu-icon fa" [ngClass]="{'fa-caret-right':!item.expanded,'fa-caret-down':item.expanded}"></span
                        ><span class="ui-menuitem-icon fa" [ngClass]="item.icon" *ngIf="item.icon"></span
                        ><span class="ui-menuitem-text">{{item.label}}</span>
                    </a>
                </div>
                <div *ngIf="item.items" class="ui-panelmenu-content-wrapper" [@rootItem]="item.expanded ? 'visible' : 'hidden'" 
                    [ngClass]="{'ui-panelmenu-content-wrapper-overflown': !item.expanded||animating}">
                    <div class="ui-panelmenu-content ui-widget-content">
                        <p-panelMenuSub [item]="item" [expanded]="true" [model]="model"></p-panelMenuSub>
                    </div>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('rootItem', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class PanelMenu extends BasePanelMenuItem {

    @Input() model: MenuItem[];

    @Output() ppp: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;

    public animating: boolean;

    constructor(router: Router) {
        super(router);
    }

    unsubscribe(item: any) {
        if(item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }

        if(item.items) {
            for(let childItem of item.items) {
                this.unsubscribe(childItem);
            }
        }
    }

    ngOnDestroy() {
        if(this.model) {
            for(let item of this.model) {
                this.unsubscribe(item);
            }
        }
    }

    handleClick(event, item) {
        this.animating = true;
        super.handleClick(event, item);
         item.clicked = true;

        if(this.model){
            super.setSelected(this.model,item);
        }
        setTimeout(() => {
            this.animating = false;
        }, 400);
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [PanelMenu],
    declarations: [PanelMenu,PanelMenuSub]
})
export class PanelMenuModule { }
