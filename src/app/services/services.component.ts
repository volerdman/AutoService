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
  constructor(private router: Router, private httpClient: HttpClient, private _authCookie: AuthCookie) { }

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  ngOnInit() {
    this.httpClient.post('http://localhost:4201/services', {token: this._authCookie.getAuth(), pageName: "category"}, this.options).subscribe((result: any) => {
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
  }
}