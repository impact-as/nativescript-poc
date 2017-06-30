import { Component, OnInit, Input } from "@angular/core";
import { Observable } from 'rxjs/Observable';

@Component({
    selector: "basket-line",
    moduleId: module.id,
    templateUrl: "./basket-line.component.html",
    styleUrls: ["./basket-line.component.css"]    
})
export class BasketLineComponent implements OnInit {
    @Input()
    public products: Observable<Array<any>> = null;   
    constructor () {
        
    }

    ngOnInit(): void {

    }
}
