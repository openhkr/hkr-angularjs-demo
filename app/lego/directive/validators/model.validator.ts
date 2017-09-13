import { FormControl} from '@angular/forms';
// import { NG_VALIDATORS} from '@angular/forms';
// import {Directive} from "@angular/core";
//移动电话
export function validateMobile(c: FormControl) {
  let _REGEXP = /^1[0-9]{10,10}$/;
  return _REGEXP.test(c.value) ? null : {
    validateMobile: {valid: false}
  };
}

// @Directive({
//   selector: '[validateMobile][ngModel]',
//   providers: [
//     { provide: NG_VALIDATORS, useValue: validateMobile, multi: false }
//   ]
// })
// export class MobileValidator {}

//email
export function validateEmail(c: FormControl) {
  let _REGEXP = /[\\w]+?@[\\w]+?\\.[a-z]+?/;
  return _REGEXP.test(c.value) ? null : {
    validatePositiveInteger: {valid: false}
  };
}

//正整数
export function validatePositiveInteger(c: FormControl) {
  let _REGEXP = /^[0-9]*[0-9][0-9]*$/;
  return _REGEXP.test(c.value) ? null : {
    validatePositiveInteger: {valid: false}
  };
}

// 非负数,最多两位小数
export function validateTwoDecimalPlaces(c: FormControl) {
  let _REGEXP = /^\d+(.\d{1,2})?$/;
  return _REGEXP.test(c.value) ? null : {
    validateTwoDecimalPlaces: {valid: false}
  };
}

// 经度，整数范围0~180 小数6位 例：(175.123456)
export function validteLongtitude(c: FormControl) {
  let _REGEXP = /^(([0-9]|[1-9][1-9]|1[0-7][0-9])(\.[0-9]{1,6})?|180(\.[0-9]{1,6})?)$/;
  return _REGEXP.test(c.value) ? null : {
    validteLongtitude: {valid: false}
  };
}

//纬度，整数范围0~90 小数6位 例：(82.123456)
export function validteAtitude(c: FormControl) {
  let _REGEXP = /^(([0-9]|[1-8][0-9])(\.[0-9]{1,6})?|90(\.[0-9]{1,6})?)$/;
  return _REGEXP.test(c.value) ? null : {
    validteAtitude: {valid: false}
  };
}
