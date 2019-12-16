import { Component, OnInit } from '@angular/core';
import { Service } from './Service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthCookie } from '../auth-cookies-handler';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.less']
})
export class ServicesComponent implements OnInit {

  services: Service[] = [];
  servicesView: any = [];

  findText = '';
  lastFindText = '';
  waitTimes = 0
  constructor(private router: Router, private httpClient: HttpClient, private _authCookie: AuthCookie) { }

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  ngOnInit() {
    this.httpClient.post('http://localhost:4201/services', `data=${JSON.stringify({token: this._authCookie.getAuth(), pageName: "category"})}`, this.options).subscribe((result: any) => {
      if (result) {
        this.services = result;
        let categories = [];
        this.services.forEach(service => {
          if (categories.includes(service.category)) return;
          categories.push(service.category);
        });
        categories.forEach(category => {
          this.servicesView.push({
            name:category,
            array:[]
          });
          this.servicesView[this.servicesView.length-1].array[0] = [];
          let servicesByCategory = this.services.filter(x => x.category == category);
          for (let i = 0, j = 0; i * 3 + j < servicesByCategory.length; j++) {
            if (j > 2) {
              j = 0;
              i++;
              this.servicesView[this.servicesView.length-1].array[i] = [];
            }
            this.servicesView[this.servicesView.length-1].array[i][j] = servicesByCategory[i * 3 + j];
          }
        });     
      }
      else {
        this.router.navigate(["/"]);
      }
      
      console.log(this.servicesView);
    });
    setInterval(() => {
      if (this.waitTimes !== 0) {
        this.waitTimes--;
      } else {
        if (this.lastFindText !== this.findText) {
          this.lastFindText = this.findText;
          this.waitTimes = 10;
          this.httpClient.post('http://localhost:4201/services', `data=${JSON.stringify({token: this._authCookie.getAuth(), pageName: "services", data: { findText: this.findText }})}`, this.options).subscribe((result: any) => {
            if (result) {
              this.services = result;
              let category = [];
              this.services.forEach(service => {
                if (category.includes(service.category)) return;
                category.push(service.category);
              });
              this.servicesView = [];
              category.forEach(category => {
                this.servicesView.push({
                  name:category,
                  array:[]
                });
                this.servicesView[this.servicesView.length-1].array[0] = [];
                let photosByCategory = this.services.filter(x => x.category == category);
                for (let i = 0, j = 0; i * 3 + j < photosByCategory.length; j++) {
                  if (j > 2) {
                    j = 0;
                    i++;
                    this.servicesView[this.servicesView.length-1].array[i] = [];
                  }
                  this.servicesView[this.servicesView.length-1].array[i][j] = photosByCategory[i * 3 + j];
                }
              });
            }
            else {
              this.router.navigate(["/"]);
            }
          });
        }
      }
    }, 100);
  }
}