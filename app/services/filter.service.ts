import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { Category } from "./category.service";
import {ProductModel} from "../pages/products/product.model";

import "rxjs/add/operator/map";

@Injectable()
export class FilterService {
    constructor(private http: Http) {}    

    private filterUrl: string = "https://bogogide.godkend.dk/scom/jsonapi/filterservice/getfilter";

	public getCategoryProducts(categoryId: string): Observable<ProductModel[]> {
		return this.getCategoryFilter(categoryId)
				   .map(filter => filter.Products);
	}

	public getCategoryFilter(categoryId: string, searchParams: IFilterUrlParamsModel = {}): Observable<FilterOutputViewModel> {
		return this.getFilter(Object.assign({ItemGroup: categoryId}, searchParams));
	}

	private getFilter(searchParams: IFilterUrlParamsModel): Observable<FilterOutputViewModel> {
        //Isolating params to avoid changing url.
        const params: IFilterUrlParamsModel = Object.assign({}, searchParams) || { PageIndex: 0 };

		//we always get books
        params.PageId = "boeger";

        //Ensure that "PageIndex" is a valid number.
        params.PageIndex = parseInt(params.PageIndex as string) || 0;

        //Include previous pages if "PageIndex" is greater than 0 and this is the first load.
        if (params.PageIndex > 0) {
            params.includePreviousPages = true;
        }

		const headers = this.createRequestHeader();

        //Do request
        return this.http.get(this.filterUrl, {
			params: params,
			headers: headers
		}).map(response => {
            return response.json() as FilterOutputViewModel
        }).catch(error => {
            console.log(JSON.stringify(error.json()));
            return Observable.throw(error);            
        });
	}

	private createRequestHeader() {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Referer','https://bogogide.godkend.dk/boeger');
      return headers;		
	}
}

interface IFilterUrlParamsModel {
	[key: string]: any;
	PageIndex?: string | number;
	PageSize?: string | number;
	Search?: string;
	Sort?: string;
	pid?: string;
	sid?: string;
	pageId?: string;
	includePreviousPages?: boolean;
	silent?: boolean;
}

interface FilterOutputViewModel {
    AvailableSortOrders: SortOrderViewModel[];
    PageIndex: number;
    PageSize: number;
    SearchTerm: string;
    SelectedSortOrder: string;
    Facets: FacetOutputViewModel[];
    HasNextPage: boolean;
    Products: ProductModel[];
    TotalDocumentsFound: number;
    UnFilteredTotalDocumentsFound: number;    
}

interface SortOrderViewModel {
    Key: string;
    Name: string;
}

interface FacetOutputViewModel {
    Control: string;
    CurrentMax: number;
    CurrentMin: number;
    EscapedKey: string;
    FacetResults: FacetResultOutput[];
    Key: string;
    Max: number;
    Min: number;
    Name: string;
}
interface FacetResultOutput {
    Count: number;
    IsSelected: boolean;
    Pivots: Pivot[];
    Query: QueryOutput;
}

interface Pivot {
    ChildPivots: Pivot[];
    Count: number;
    Field: string;
    HasChildPivots: boolean;
    Value: string;
}

interface QueryOutput {
    EscapedValue: string;
    HelpText: string;
    Icon: string;
    Name: string;
    Value: string;
}