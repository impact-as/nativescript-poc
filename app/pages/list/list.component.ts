import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { ListViewEventData, RadListView } from "nativescript-telerik-ui-pro/listview";
import { RadListViewComponent } from "nativescript-telerik-ui-pro/listview/angular";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";

import { FilterService, FilterOutputViewModel, FacetOutputViewModel } from "../../services/filter.service";
import { ProductModel } from "../products/product.model";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { BasketService } from "../../services/basket.service";

@Component({
    moduleId: module.id,
    selector: 'list',
    templateUrl: './list.component.html'
})
export class ListComponent {
    public tabItems: Array<SegmentedBarItem>;
    public selectedIndex = 0;
    public filterList: RadListView;
    public visibility1: boolean;
    public visibility2: boolean;
    public products: ProductModel[] = null;
    public facets: FacetOutputViewModel[] = null;
    public facetResult: any;
    public filter: Observable<FilterOutputViewModel>;
    public isLoading = false;
    private categoryId: string;

    constructor(
        private http: Http,
        private routerExtensions: RouterExtensions,
        private pageRoute: ActivatedRoute,
        private basketService: BasketService,
        private filterService: FilterService) { }

    public ngOnInit() {
        this.isLoading = true;
        this.visibility1 = true;
        this.visibility2 = false
        ;
        this.createTabs();

        this.pageRoute.params.subscribe(params => {
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

    public createTabs() {
        const tabList = [
            { title: 'Produktliste' },
            { title: 'Filtrering' }
        ];

        this.tabItems = [];
        this.selectedIndex = 0;

        tabList.forEach(tab => {
            let newBarItem = <SegmentedBarItem>new SegmentedBarItem();
            newBarItem.title = tab.title;
            this.tabItems.push(newBarItem);
        });
    }

    public addToBasket(evn, product: any) {
        this.basketService.addToBasket(product);
        var button = evn.object;
        button.text = "-";
    }

    public getProductsByFormat(format: string = "") {
        this.isLoading = true;
        return this.filterService.getCategoryFilter(this.categoryId, format ? { ItemBinding: format } : {})
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
        ],
            {
                transition: {
                    name: "slide",
                    duration: 300,
                    curve: "linear"
                }
            });
    }

    public onItemLoading(args: ListViewEventData) {
        this.filterList = args.object as RadListView;
    }

    public onItemSelected(args: ListViewEventData) {
        this.updateSelect();
    }

    public onItemDeselected(args: ListViewEventData) {
        this.updateSelect();
    }

    public updateSelect() {
        let query = { ItemBinding: this.filterList.getSelectedItems().map(data => data.Query.Value) };
        this.updateProductList(query);
    }

    public updateProductList(query: any) {
        this.isLoading = true;

        this.filter = this.filterService.getCategoryFilter(this.categoryId, query);

        this.filter.subscribe(data => {
            this.products = data.Products;

            this.facets = data.Facets.filter(data => {
                return data.Control === 'Dropdown' && data.Key !== 'ItemGroup';
            });
            this.isLoading = false;
        });
    }

    public onSelectedIndexChange(args) {
        let segmetedBar = <SegmentedBar>args.object;
        this.selectedIndex = segmetedBar.selectedIndex;

        switch (this.selectedIndex) {
            case 0:
                this.visibility1 = true;
                this.visibility2 = false;
                break;
            case 1:
                this.visibility1 = false;
                this.visibility2 = true;
                break;
        }
    }
}