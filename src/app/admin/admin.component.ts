import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Service } from '../services/Service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  services: Service[] = [];

  isUpdate: boolean = false;
  service: Service = new Service();

  constructor(private httpClient: HttpClient) { }
  way = "localhost:3002";
  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  ngOnInit() {
    this.httpClient.get(`http://${this.way}/services`).subscribe((result: any) => this.services = result);
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
    this.httpClient.post(`http://${this.way}/services/create`, this.service, this.options).subscribe((result: any) => {
      if (!result) return;
      this.services.push({ id: result.id, name: result.name, category: result.category, url: result.url, description: result.description, price: result.price });
    });
  }

  buttonLoadUpdateClick(id: string) {
    this.service = JSON.parse(JSON.stringify(this.services.find(x => x.id == parseInt(id))));
    this.isUpdate = true;
  }

  Update() {
    this.httpClient.post(`http://${this.way}/services/update`, this.service, this.options).subscribe((result: any) => {
      if (!result) return;
      let servicesIndex = this.services.findIndex(x => x.id == result.id);
      if (servicesIndex == -1) return;
      this.services[servicesIndex] = result;
      this.service = new Service();
    });
    this.isUpdate = false;
  }

  buttonDeleteClick(id: number) {
    this.httpClient.post(`http://${this.way}/services/delete`, {
      id: id
    }, this.options).subscribe((result: any) => {
      if (result) {
        let servicesIndex = this.services.findIndex(x => x.id == id);
        if (servicesIndex == -1) return;
        this.services.splice(servicesIndex, 1);
      }
    });
  }
}