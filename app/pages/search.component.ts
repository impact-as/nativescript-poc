
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { SearchBar } from "ui/search-bar";

import { SearchService } from '../services/search.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


// (textChange)="onTextChanged($event)" (submit)="onSubmit($event)" 

@Component({
  selector: "search",
  template: `
    <StackLayout>
        <SearchBar hint="Søg på produkt" (textChange)="searchFieldChange($event)" style="padding-right:500px"></SearchBar>
                
        <ListView [items]="searchResult" class="list-group">
            <ng-template let-product="item" let-i="index" let-odd="odd" let-even="even">
                <GridLayout width="100%" columns="60, *, 80" rows="25,20,20" style="padding:0px;">
                    <Image width="80" rowSpan="3" row="0" col="0" [src]="'https://bogogide.godkend.dk' + product.PrimaryImageUrl + '&width=100&height=100'" class="image" width="50" height="50"></Image>
                    <Label row="0" col="1" [text]="product.Name" class="label"></Label>
                    <Label row="1" col="1" [text]="product.ItemDistributor + '/' + product.ItemPublisher" class="label mini"></Label>
                    <Label row="2" col="1" [text]="product.PricesSanitized.RetailPriceLabel" class="label mini"></Label>
                    <Label row="0" col="2" [text]="product.PricesSanitized.ActualPriceAmount" class="label price"></Label>
                </GridLayout>
            </ng-template>
        </ListView>
            
    </StackLayout>
  `
})
export class SearchComponent {
	private searchTerms = new Subject<string>();
	public searchResult: any[] = [];
    constructor(private searchService: SearchService) {
        
    }

    public searchFieldChange(args) {
        let searchBar = <SearchBar>args.object;
		this.searchTerms.next(searchBar.text);
	}


	ngOnInit() {
		this.searchTerms
			.debounceTime(250)
			.distinctUntilChanged()
			.switchMap(term => term ? this.searchService.search(term) : Observable.of<any[]>([])).subscribe((body: any) => {

				this.searchResult.splice(0, this.searchResult.length);
                console.log(body);
				if (body !== undefined) {
					body.forEach(item => {
						this.searchResult.push(item);
					});
				}
			});

	}

}
