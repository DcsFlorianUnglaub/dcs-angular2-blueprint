import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { HmrState } from 'angular2-hmr';

@Component({
  selector: 'dcs-app',
  templateUrl: './App.tpl.html',
  styleUrls: ['./App.css']
})
export class AppComponent implements OnInit {

  @HmrState() state: any = {
    company: 'DCS'
  };

  ngOnInit() {
    console.log('App init!');
  }

}
