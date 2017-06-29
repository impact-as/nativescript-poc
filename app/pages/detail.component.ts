import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import {ActivatedRoute} from "@angular/router";
import "rxjs/add/operator/switchMap";
import { GestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { FilterService } from "../services/filter.service";

@Component({
  selector: "detail",
  template: `
 <ScrollView>
    <StackLayout orientation="vertical">
        <StackLayout class="container border" orientation="vertical">
            <Image class="image" [src]="'https://bogogide.godkend.dk' + product?.PrimaryImageUrl + '&width=500&height=500'"></Image>
        </StackLayout>

        <StackLayout class="container" orientation="vertical">
            <Label class="price" [text]="product?.PricesSanitized.ActualPrice"></Label>
            <Label class="title" textWrap="true" [text]="product?.Name"></Label>
            
            <button class="button" text="Add to basket"></button>
        </StackLayout>


        <WrapLayout width="100%">
            <StackLayout width="100%" height="80" *ngFor="let product of relatedProducts">
            <GridLayout width="100%" columns="60, *, 80" rows="25, 20, 20" style="padding:0px;" (tap)="onTap($event, product.Id)">
                <Image (tap)="onTap($event, product.id)" width="80" rowSpan="3" row="0" col="0" [src]="'https://bogogide.godkend.dk' + product?.PrimaryImageUrl + '&width=100&height=100'" class="image" width="50" height="50"></Image>
                <Label row="0" col="1" [text]="product.Name" class="label"></Label>
                <Label row="1" col="1" [text]="product.ItemDistributor" class="label mini"></Label>
                <Label row="2" col="1" [text]="product.PricesSanitized.ActualPrice" class="label mini"></Label>
            </GridLayout>
            </StackLayout>
        </WrapLayout>


    </StackLayout>

 </ScrollView>
  `
})
export class DetailComponent {
    product:any;
    relatedProducts:any[] = [];
    id: number;
    constructor(
        private pageRoute: ActivatedRoute, 
        private filterService: FilterService, 
        private routerExtensions: RouterExtensions
    ) {
    }

    ngOnInit() {
        this.pageRoute.params
        .subscribe(params => {
            this.filterService.getCategoryProducts(params['categoryId'])
                .subscribe(products => {
                    this.product = products.find(a => a.Id === params['productId']);
                    products.forEach(item => {
                        this.relatedProducts.push(item);
                    });
                });
        });
   }

    public onTap(args: GestureEventData, id:string) {
        let product = null;
        // this.productService.products.subscribe(items=> {
        //     product = items.find(a => a.Id === id);
        //     this.routerExtensions.navigate(["/detail", product.Id], {
        //         transition: {
        //             name: "slide",
        //             duration: 300,
        //             curve: "linear"
        //         }
        //     });
        // });
    }

}