import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

import { FilterService } from "../services/filter.service";
import { ProductModel } from "./products/product.model";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";


@Component({
  selector: "list",
  template: `
    <StackLayout orientation="vertical">
        <Button [text]="'ALL'" class="submit-button" (tap)="everything()"></Button>
        <Button [text]="'HARDBACK'" class="submit-button" (tap)="hardbackOnly()"></Button>
        <Button [text]="'INDBUNDET'" (tap)="indbundetOnly()"></Button>
        
        <ListView [items]="products | async" (itemTap)="onItemTap($event)" class="list-group">
            <ng-template let-product="item" let-i="index" let-odd="odd" let-even="even">
                <GridLayout width="100%" columns="60, *, 80" rows="25,20,20" style="padding:0px;">
                    <Image width="80" rowSpan="3" row="0" col="0" [src]="'https://bogogide.godkend.dk' + product.PrimaryImageUrl + '&width=100&height=100'" class="image" width="50" height="50"></Image>
                    <Label row="0" col="1" [text]="product.Name" class="label"></Label>
                    <Label row="1" col="1" [text]="product.ItemDistributor + '/' + product.ItemPublisher" class="label mini"></Label>
                    <Label row="2" col="1" [text]="product.PricesSanitized.RetailPriceLabel" class="label mini"></Label>
                    <Label row="0" col="2" [text]="product.PricesSanitized.ActualPriceAmount" class="label price"></Label>
                    <Button row="2" col="2">
                        <Image src="~/images/cart.png" width="20" height="20"></Image>
                    </Button>
                </GridLayout>
            </ng-template>
        </ListView>
    <ActivityIndicator [busy]="isLoading" [visibility]="isLoading ? 'visible' : 'collapse'" row="1" horizontalAlignment="center" verticalAlignment="center"></ActivityIndicator>
    </StackLayout>
  `
})
export class ListComponent {
    // public filter: Observable<FilterOutputViewModel> = null;
    public products: Observable<ProductModel[]> = null;
    public isLoading = false;       
    private categoryId: string;
    constructor(
        private http: Http, 
        private routerExtensions: RouterExtensions, 
        private pageRoute: ActivatedRoute, 
        private filterService: FilterService) { 
        this.isLoading = true;

        this.pageRoute.params.subscribe( params => {
            this.categoryId = params['id'];
            this.products = this.filterService.getCategoryProducts(this.categoryId)
                                              .finally(() => this.isLoading = false);
        });
    }

    public everything() {
        this.products = this.getProductsByFormat(); 
    }

    public hardbackOnly() {
        this.products = this.getProductsByFormat("HARDBACK"); 
    }

    public indbundetOnly() {
        this.products = this.getProductsByFormat("INDBUNDET"); 
    }    

    public getProductsByFormat(format: string = "") {
        this.isLoading = true;
        return this.filterService.getCategoryFilter(this.categoryId, format ? {ItemBinding: format}: {})
                            .map(filter => filter.Products)
                            .finally(() => this.isLoading = false);
    }

    public onItemTap(args) {
        let product = null;
        this.products.subscribe(items=> {
            product = items[args.index];
            this.routerExtensions.navigate(["/detail", 
                this.categoryId,
                product.Id
            ], {
                transition: {
                    name: "slide",
                    duration: 300,
                    curve: "linear"
                }
            });
        });
    }
}
