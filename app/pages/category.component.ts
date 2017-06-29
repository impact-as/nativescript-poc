
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { RouterExtensions } from "nativescript-angular/router";
import { GestureEventData } from "tns-core-modules/ui/gestures/gestures";

import { CategoryService, Category } from "../services/category.service";

@Component({
  selector: "category",
  template: `
 <ScrollView>
    <WrapLayout width="100%">
        <StackLayout width="50%" *ngFor="let element of categories" (tap)="onTap($event, element.id)">
            <Image [src]="'https://bogogide.godkend.dk' + element.image + '&w=300&h=200&mode=crop'"></Image>
            <Label textWrap="true" class="category" textAlignment="center" height="70" [text]="element.title"></Label>
        </StackLayout>
    </WrapLayout>
 </ScrollView>
  `
})
export class CategoryComponent {
    public categories: Category[] = [];
    constructor(
        private routerExtensions: RouterExtensions,
        private categoryService: CategoryService) { 
            
        this.categories = categoryService.getCategories();
    }

    public onTap(args: GestureEventData, id) {
        this.routerExtensions.navigate(["/list", id], {
            transition: {
                name: "slide",
                duration: 300,
                curve: "linear"
            }
        });
    }
}