import { Injectable } from '@angular/core';
import { getString, setString } from "application-settings";
import { AuthService } from "../auth/auth.service";
import {ProductModel} from "../pages/products/product.model";
import { Observable as RxObservable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

const basketKeyPrefix = "basket";

@Injectable()
export class BasketService {
    currentBasket: ProductModel[] = [];
    constructor(private authService: AuthService) {
      this.getBasket().subscribe();
    }

    public getBasket(): RxObservable<ProductModel> {
        return this.authService.getCurrentUser().map(user => {
          let basketKey = `${basketKeyPrefix}-${user.uid}`;
          let basket = JSON.parse(getString(basketKey));
          this.currentBasket = basket;
          return basket;
        });
    }
    
    private updateBasket():void {
      this.authService.getCurrentUser().subscribe(user => {
        let basketKey = `${basketKeyPrefix}-${user.uid}`;
        return setString(basketKey, JSON.stringify(this.currentBasket));
      })
        
    }

    public addToBasket(product:ProductModel) {
        this.currentBasket.push(product);
        this.updateBasket();
    }
    
    public removeFromBasket(){
      
    }
}

export class BasketModel {
  userId: string;
  products: ProductModel[];
}