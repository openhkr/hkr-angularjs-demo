import {EventEmitter,Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

// export {DomHandler} from './domhandler';

export interface SortMeta {
    field: string;
    order: number;
}

export interface LazyLoadEvent {
    first?: number;
    rows?: number;
    sortField?: string;
    sortOrder?: number;
    multiSortMeta?: SortMeta[];
    filters?: {[s: string]: FilterMetadata;};
}

export interface FilterMetadata {
    value?: any;
    matchMode?: string;
}

export interface MenuItem {
    label?: string;
    icon?: string;
    command?: (event?: any) => void;
    url?: string;
    routerLink?: any;
    eventEmitter?: EventEmitter<any>;
    items?: MenuItem[];
    expanded?: boolean;
    disabled?: boolean;
    visible?: boolean;
    target?: string;
    clicked?:boolean;
}

export interface Message {
    severity?: string;
    summary?: string;
    detail?: string;
}

export interface SelectItem {
    label: string;
    value: any;
}

export interface TreeNode {
    label?: string;
    data?: any;
    icon?: any;
    expandedIcon?: any;
    collapsedIcon?: any;
    children?: TreeNode[];
    leaf?: boolean;
    expanded?: boolean;
    type?: string;
    parent?: TreeNode;
    partialSelected?: boolean;
}

export interface Confirmation {
    message: string;
    icon?: string;
    header?: string;
    accept?: Function;
    reject?: Function;
    acceptVisible?: boolean;
    rejectVisible?: boolean;
    acceptEvent?: EventEmitter<any>;
    rejectEvent?: EventEmitter<any>;
}

export interface BlockableUI {
    getBlockableElement(): HTMLElement;
}
