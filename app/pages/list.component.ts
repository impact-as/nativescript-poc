import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { ListViewEventData, RadListView } from "nativescript-telerik-ui-pro/listview";
import { RadListViewComponent } from "nativescript-telerik-ui-pro/listview/angular";
import { FilterService, FilterOutputViewModel, FacetOutputViewModel } from "../services/filter.service";
import { ProductModel } from "./products/product.model";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { BasketService } from "../services/basket.service";
// <Image class="list-to-basket" (tap)="addtobasket(product.Id)" src="~/images/cart.png" width="20" height="20"></Image>

        
@Component({
  selector: "list",
  template: `
     <GridLayout rows="200, *" tkExampleTitle tkToggleNavButton>    
        <RadListView row="0" [items]="facetResult" 
                    selectionBehavior="Press" 
                    multipleSelection="true"
                    (itemSelected)="updateQuery($event)"
                    (itemDeselected)="updateQuery($event)">
            <ng-template tkListItemTemplate let-item="item" let-i="index" let-odd="odd" let-even="even">
                <StackLayout ios:class="iosListItemStackLayout" android:class="androidListItemStackLayout">
                    <Label ios:class="iosNameLabel" android:class="androidNameLabel" [text]="item.Query.Name + ' (' + item.Count + ')'"></Label>
                </StackLayout>
            </ng-template>
        </RadListView>

        <ListView row="1" [items]="products" (itemTap)="onItemTap($event)" class="list-group">
            <ng-template let-product="item" let-i="index" let-odd="odd" let-even="even">
                <GridLayout width="100%" columns="60, *, 80" rows="25,20,20" style="padding:0px;" [class.even]="even">
                    <Image width="80" rowSpan="3" row="0" col="0" [src]="'https://bogogide.godkend.dk' + product.PrimaryImageUrl + '&width=100&height=100'" class="image" width="50" height="50"></Image>
                    <Label row="0" col="1" [text]="product.Name" class="label"></Label>
                    <Label row="1" col="1" [text]="product.ItemDistributor + '/' + product.ItemPublisher" class="label mini"></Label>
                    <Label row="2" col="1" [text]="product.PricesSanitized.RetailPriceLabel" class="label mini"></Label>
                    <Label row="0" col="2" [text]="product.PricesSanitized.ActualPriceAmount" class="label price"></Label>

                    <Label class="button" height="50" width="40" (tap)="addToBasket($event, product)" text="+" col="2" row="1"></Label>

                </GridLayout>
            </ng-template>
        </ListView>
        <ActivityIndicator [busy]="isLoading" [visibility]="isLoading ? 'visible' : 'collapse'" row="1" horizontalAlignment="center" verticalAlignment="center"></ActivityIndicator>
    </GridLayout>
  `
})
export class ListComponent {
    // public filter: Observable<FilterOutputViewModel> = null;
    public products: ProductModel[]= null;
    public facets: FacetOutputViewModel[] = null;
    public facetResult: any;
    public filter: Observable<FilterOutputViewModel>;
    public isLoading = false;       
    private categoryId: string;
    constructor(
        private http: Http, 
        private routerExtensions: RouterExtensions, 
        private pageRoute: ActivatedRoute, 
        private basketService:BasketService,
        private filterService: FilterService) { 
        this.isLoading = true;

        this.pageRoute.params.subscribe( params => {
            this.categoryId = params['id'];
            this.filter = this.filterService.getCategoryFilter(this.categoryId);

            this.filter.subscribe(data => {
                this.products = data.Products;

                this.facets = data.Facets.filter(data => {
                    return data.Control === 'Dropdown' && data.Key !== 'ItemGroup';
                });
                this.isLoading = false;

                
                this.facetResult = this.facets[1].FacetResults.filter(data => {
                    return data.Count > 0;
                });
            });
        });
    }

    public addToBasket(evn, product:any){        
        this.basketService.addToBasket(product);
        var button = evn.object;
        button.text = "-";
    }
 
    public getProductsByFormat(format: string = "") {
        this.isLoading = true;
        return this.filterService.getCategoryFilter(this.categoryId, format ? {ItemBinding: format}: {})
                            .map(filter => filter.Products)
                            .finally(() => this.isLoading = false);
    }

    public getFacets() {
        this.isLoading = true;
        return this.filterService.getCategoryFilter(this.categoryId, {})
                            .map(filter => {
                                console.log('filter', filter);
                                return filter.Facets;
                            })    
                            .finally(() => this.isLoading = false);
    }

    public onItemTap(args) {
        let product = null;
        product = this.products[args.index];
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
    }

    public onItemSelected(args: ListViewEventData) {
        let listview = args.object as RadListView;
        // console.log('onItemSelected', listview.getSelectedItems());
    }

    public onItemDeselected(args: ListViewEventData) {
        let listview = args.object as RadListView;
        // console.log('onItemDeselected', listview.getSelectedItems());
    }

    public updateQuery(args: ListViewEventData) {
        const listview = args.object as RadListView;
        let query = {
            ItemBinding: listview.getSelectedItems().map(data => data.Query.Value)
        }
        this.updateProductList(query);
    }

    public updateProductList(query: any) {
        this.isLoading = true;
        // console.log('query', query);

        this.filter = this.filterService.getCategoryFilter(this.categoryId, query);

        this.filter.subscribe(data => {
            // console.log('data', data);
            this.products = data.Products;

            this.facets = data.Facets.filter(data => {
                return data.Control === 'Dropdown' && data.Key !== 'ItemGroup';
            });
            this.isLoading = false;
        });
    }

}