import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

var http = require("http");

@Injectable()
export class BasketService {
   
    public products: RxObservable<Array<any>>;
    public serverHost:string = 'https://bogogide.godkend.dk/scom/jsonapi/filterservice/search?PageIndex=0&forlag=&pageId=search&PageSize=5&Search=krimi';
  
    constructor(private http:Http) {
        //this.serverHost = 'https://qa.remoteiv.dk/webapi/MMfxOfu9-sGCu1Om9/2017071317-60-1140/4/0/Products/GetByProductGroupId?productGroupId=';
    }

    public getProducts(id:string) {
        if(id !== undefined && id !== null) {
        let headers = this.createRequestHeader();
        let d = this.http.get(this.serverHost + id, { headers: headers }).map(res => res.json().Products);
            this.products = d;
            return d;
            
        } else {
        return RxObservable.of([]);
        }
    }

    private createRequestHeader() {
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append('Referer','https://bogogide.godkend.dk/');
        //headers.append('Referer','https://qa.remoteiv.dk');

        return headers;
    }
}