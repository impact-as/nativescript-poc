import { Injectable } from '@angular/core';
import { getString, setString } from "application-settings";
import { AuthService } from "../auth/auth.service";
import {ProductModel} from "../pages/products/product.model";
import { Observable as RxObservable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/flatmap';


const basketKeyPrefix = "basket";

@Injectable()
export class BasketService {
    private _basket: BehaviorSubject<ProductModel[]> = new BehaviorSubject([])
    public readonly currentBasket: RxObservable<ProductModel[]> = this._basket.asObservable();
    constructor(private authService: AuthService) {
      this.getBasket().subscribe();
    }

    public getBasket(): RxObservable<ProductModel[]> {
        return this.authService.getCurrentUser().flatMap(user => {
          let basketKey = `${basketKeyPrefix}-${user.uid}`;
          let basket: ProductModel[] = JSON.parse(getString(basketKey));
          this._basket.next(basket);
          return this.currentBasket;
        });
    }
    
    private updateSavedBasket():void {
      this.authService.getCurrentUser().subscribe(user => {
        let basketKey = `${basketKeyPrefix}-${user.uid}`;
        return setString(basketKey, JSON.stringify(this._basket.getValue()));
      })
        
    }

    public addToBasket(product:ProductModel) {
        let basket = this._basket.getValue();
        basket.push(product);
        this._basket.next(basket);
        this.updateSavedBasket();
    }
    
    public removeFromBasket(){
      
    }
}

export class BasketModel {
  userId: string;
  products: ProductModel[];
}