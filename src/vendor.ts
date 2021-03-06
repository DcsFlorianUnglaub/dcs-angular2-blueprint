import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
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
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
// class operators
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';

import '@angularclass/hmr';
import 'immutable';
import 'ng2-redux';
import * as numeral from 'numeral';

import 'redux';
import 'redux-immutable';
import 'redux-logger';
import 'validator';

if ('production' === ENV) {
  // Production
} else {
  // Development
}

// numeral config
numeral.language('de', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    currency: {
        symbol: '€'
    },
    ordinal : function (num) {
        return '.';
    },
});

// switch between languages
numeral.language('de');
