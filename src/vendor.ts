import '@angular/platform-browser';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

// RxJS, add all used operators in one place
import 'rxjs/Observable';
// instance operators
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
// class operators
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';

if ('production' === ENV) {
  // Production

} else {
  // Development
  require('angular2-hmr');
}
