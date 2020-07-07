import { Component, Input } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';

// declare ga as a function to set and sent the events
declare let ga: Function;

@Component({
  selector: 'nordson-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayLoader:boolean =false;
  constructor(public router: Router) {
    // subscribe to router events and send page views to Google Analytics
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
         ga('send', 'pageview');
      }
    });
  }
  ngOnInit() {


  }
  loaderScreen(event){
    this.displayLoader = event;
    setTimeout(() => {
      console.log('app event', event);

this.displayLoader = false;      
    }, 8000);
  }
}
