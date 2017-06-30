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
        <StackLayout *ngIf="product" orientation="vertical">
            <StackLayout class="container border" orientation="vertical">
                <Image class="image" [src]="'https://bogogide.godkend.dk' + product?.PrimaryImageUrl + '&width=500&height=500'"></Image>
            </StackLayout>

            <StackLayout class="container" orientation="vertical">
                <Label class="price" [text]="product?.PricesSanitized.ActualPrice"></Label>
                <Label class="title" textWrap="true" [text]="product?.Name"></Label>
                <button class="button" text="Add to basket"></button>
            </StackLayout>


            <Label text="Relaterede varer" class="label mini"></Label>
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
        <ActivityIndicator [busy]="isLoading" [visibility]="isLoading ? 'visible' : 'collapse'" row="1" horizontalAlignment="center" verticalAlignment="center"></ActivityIndicator>        
    </StackLayout>
 </ScrollView>
  `
})
export class DetailComponent {
    public product:any;
    public relatedProducts:any[] = [];
    public isLoading = false;       
    private categoryId: string;

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
                    products.filter((i, index) => (index < 5)).forEach(item => {
                        this.relatedProducts.push(item);
                    });
                    this.isLoading = false;
                });
        });
   }

    public onTap(args: GestureEventData, id: string) {
        this.routerExtensions.navigate(["/detail", this.categoryId, id], {
            transition: {
                name: "slide",
                duration: 300,
                curve: "linear"
            }
        });        
    }
}