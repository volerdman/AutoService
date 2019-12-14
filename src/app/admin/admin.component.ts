import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Service } from '../services/Service';
import { AuthCookie } from '../auth-cookies-handler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  services: Service[] = [];

  isUpdate: boolean = false;
  service: Service = new Service();

  constructor(private router: Router, private httpClient: HttpClient, private _authCookie: AuthCookie) { }
  way = "http://localhost:4201";
  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  ngOnInit() {
    if (!this._authCookie.getAuth()) {
      return this.router.navigate(["/"]);
    }
    this.httpClient.post(`${this.way}/services`, `data=${JSON.stringify({ token: this._authCookie.getAuth(), pageName: "admin" })}`, this.options).subscribe((result: any) => {
      if (result) {
        this.services = result;
      }
      else {
        this.router.navigate(["/"]);
      }
    });
  }

  buttonCreateUpdateClick() {
    if (this.isUpdate) {
      this.Update();
    }
    else {
      this.Create();
    }
  }

  Create() {
    console.log(this.service);
    this.httpClient.post(`http://localhost:4201/services/create`, `data=${JSON.stringify({ token: this._authCookie.getAuth(), data: this.service })}`, this.options).subscribe((result: any) => {
      console.log(result);

      if (!result) return;
      this.services.push({ id: result.id, name: result.name, category: result.category, url: result.url, description: result.description, price: result.price });
    });
  }

  buttonLoadUpdateClick(id: string) {
    this.service = JSON.parse(JSON.stringify(this.services.find(x => x.id == parseInt(id))));
    this.isUpdate = true;
  }

  Update() {
    this.httpClient.post(`${this.way}/services/update`, `data=${JSON.stringify({ token: this._authCookie.getAuth(), data: this.service })}`, this.options).subscribe((result: any) => {
      if (!result) return;
      let servicesIndex = this.services.findIndex(x => x.id == result.id);
      if (servicesIndex == -1) return;
      this.services[servicesIndex] = result;
      this.service = new Service();
    });
    this.isUpdate = false;
  }

  buttonDeleteClick(id: number) {
    this.httpClient.post(`${this.way}/services/delete`, `data=${JSON.stringify({
      token: this._authCookie.getAuth(), data: {
        id: id
      }
    })}`, this.options).subscribe((result: any) => {
      if (result) {
        let servicesIndex = this.services.findIndex(x => x.id == id);
        if (servicesIndex == -1) return;
        this.services.splice(servicesIndex, 1);
      }
    });
  }
}