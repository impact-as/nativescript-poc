import { Component, OnInit, Input } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { ProductModel } from "../../products/product.model";


@Component({
    selector: "basket-line",
    moduleId: module.id,
    templateUrl: "./basket-line.component.html",
    styleUrls: ["./basket-line.component.css"]    
})
export class BasketLineComponent implements OnInit {
    @Input()
    public products: ProductModel[];
    //public products: Observable<Array<any>> = null;   
    constructor () {
        
    }

    ngOnInit(): void {

    }
}
