import '@angular/platform-browser';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

// RxJS, add all used operators in one place
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';

if ('production' === ENV) {
  // Production

} else {
  // Development
  require('angular2-hmr');
}
