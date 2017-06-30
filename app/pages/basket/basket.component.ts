import { Component, OnInit, Output } from "@angular/core";
import { BasketLineComponent } from "./basket-line/basket-line.component";

import { ProductModel } from "../products/product.model";

import { BasketService } from "../../services/basket.service";
import { Observable } from 'rxjs/Observable';

import { Http, Headers, Response } from "@angular/http";

@Component({
    selector: "basket",
    moduleId: module.id,
    templateUrl: "./basket.component.html",
    styleUrls: ["./basket.component.css"]    
})
export class BasketComponent implements OnInit {
    public products: Observable<Array<any>> = null;
    public basketTotals: string;
    private id: string = "078e6476-4c0e-4155-8af6-f88652ca15d2"; // hardcoded for testing

    constructor(private http: Http, private productService: BasketService) {
        this.products = this.productService.getProducts(this.id);
       
        this.products.subscribe(res => {
                let basketTotals = res.map(e => e.PricesSanitized.ActualPriceAmount).reduce((p,c) => p+c);
                this.basketTotals = basketTotals.toFixed(2);            
            }
        );
    }

    ngOnInit(): void {

    }
}
