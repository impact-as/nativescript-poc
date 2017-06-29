
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

var http = require("http");

@Injectable()
export class ProductService {
   
    public products: RxObservable<Array<any>>;
    public serverHost:string = 'https://bogogide.godkend.dk/scom/jsonapi/filterservice/search?PageIndex=0&forlag=&pageId=search&PageSize=300&Search=krimi';
  constructor(private http:Http) {
   this.serverHost = 'https://bogogide.godkend.dk/scom/jsonapi/filterservice/getfilter?ItemGroup=7210&PageSize=200&PageIndex=0&pageId=boeger%2Fkogeboeger';
  }

  public getProducts(id:string) {
    if(id !== undefined && id !== null) {
      let headers = this.createRequestHeader();
      let d = this.http.get(this.serverHost, { headers: headers }).map(res => res.json().Products);
      this.products = d;
      return d;
    } else {
      return RxObservable.of([]);
    }
  }

  private createRequestHeader() {

      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Referer','https://bogogide.godkend.dk/boeger/kogeboeger');
      // headers.append('Referer','https://qa.remoteiv.dk');

      return headers;
  }

}