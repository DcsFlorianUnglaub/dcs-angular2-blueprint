import { Component, ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'dcs-app',
  templateUrl: './App.tpl.html',
  styles: [
    require('./App.scss').toString()
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    console.log('App init successful!!!');
    // window['app'] = this;
  }

}
