import { Component, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import {ActivatedRoute} from "@angular/router";
import "rxjs/add/operator/switchMap";
import { GestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { FilterService } from "../services/filter.service";
import { BasketService } from "../services/basket.service"

import { Image as ImageElement } from "ui/image";
import { Page } from "ui/page";
import { AnimationCurve } from "ui/enums";
import { AbsoluteLayout } from "ui/layouts/absolute-layout";
import { ScrollView } from "ui/scroll-view";
import { Button } from "ui/button";
import { screen } from "platform";


@Component({
  selector: "detail",
  template: `
 <ScrollView id="scrollWrapper">
    <StackLayout orientation="vertical">
        <StackLayout *ngIf="product" orientation="vertical">
            <StackLayout class="container border" orientation="vertical">
                <AbsoluteLayout width="100%" height="100%" #animationWrapper>
                    <Image width="100%" height="100%" class="main-product-image" top="0" left="0" class="image" [src]="'https://bogogide.godkend.dk' + product?.PrimaryImageUrl + '&width=500&height=500'" id="main-product-image"></Image>
                </AbsoluteLayout>
            </StackLayout>

            <StackLayout class="container" orientation="vertical">
                <Label class="price" [text]="product?.PricesSanitized.ActualPrice"></Label>
                <Label class="title" textWrap="true" [text]="product?.Name"></Label>
                <button id="addToBasket" class="button primary" text="Add to basket" (tap)="addToBasket(product)"></button>
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
    @ViewChild("animationWrapper") animationWrapper: ElementRef;    
    public product:any;
    public relatedProducts:any[] = [];
    public isLoading = false;       
    private categoryId: string;
    private basketTexts = {
        add: "Add to basket",
        added: "Product added to basket"
    };
    

    constructor(
        private pageRoute: ActivatedRoute, 
        private filterService: FilterService, 
        private routerExtensions: RouterExtensions,
        private basketService: BasketService,
        private page: Page
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

    private animateProductImage(){
        let animationWrapper = <AbsoluteLayout>this.animationWrapper.nativeElement; 
        let productImage = this.page.getViewById<ImageElement>("main-product-image");        
        let scrollWrapper = this.page.getViewById<ScrollView>("scrollWrapper");        
        let anitmationImage:ImageElement = new ImageElement();        
        anitmationImage.src = productImage.src;
        anitmationImage.className = productImage.className;
        anitmationImage.top = productImage.top;
        anitmationImage.left = productImage.left;
        anitmationImage.height = productImage.height;
        anitmationImage.width = productImage.width;
        animationWrapper.addChild(anitmationImage);
        
        let scrollY = scrollWrapper.verticalOffset;
        let animation = anitmationImage.createAnimation({
            scale: {x:0, y:0},
            translate: { x: productImage.getMeasuredWidth(), y: 0 - productImage.getMeasuredHeight() + scrollY},
            duration: 1000            
        });
        animation.play().then((e)=>{
            animationWrapper.removeChild(anitmationImage);            
        });
    }

    private flashAddedText(){
        let button = this.page.getViewById<Button>("addToBasket");        
        let i=0;
        let interval = setInterval(()=>{
            i++;
            button.text = this.basketTexts.added.substr(0,i);
            if (i === this.basketTexts.added.length){                
                clearInterval(interval);
                setTimeout(()=>{
                    button.text = this.basketTexts.add;
                }, 2000);
            }
        },10);
    }

    public addToBasket(product:any){        
        this.basketService.addToBasket(product);
        this.animateProductImage();
        this.flashAddedText();
    }
}