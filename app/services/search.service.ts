
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class SearchService {

  constructor(private http:Http) {

  }
  private createRequestHeader() {

      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Referer','https://bogogide.godkend.dk/search');

      return headers;
  }

  
	public search(term: string): Observable<any[]> {
    let headers = this.createRequestHeader();
		let search = this.http.get(`https://bogogide.godkend.dk/scom/jsonapi/filterservice/search?PageIndex=0&Search=${term}&forlag=&pageId=search`, { headers: headers }).map(response => response.json().Products);
		return search;

	}
}