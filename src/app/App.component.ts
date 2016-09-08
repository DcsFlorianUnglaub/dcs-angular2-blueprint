import { Component, ViewEncapsulation, OnInit } from '@angular/core';


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
    console.timeEnd('bootstrap');
    console.log('App init successful');
    // window['app'] = this;
  }

}
