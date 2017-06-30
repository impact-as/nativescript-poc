import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import { StoresService } from '../services/stores.service';

@Component({
    selector:'store',
    template:`
        <Label [text]="store.title"></Label>
        <Label [text]="store.address.street"></Label>
        <Label [text]="store.address.zip+' '+store.address.city"></Label>

        <Label *ngFor="let line of store.openhours" [text]="line.Title+': '+line.StartTime+' - '+line.EndTime"></Label>
    `
})
export class StoreComponent {

    public store;

    ngOnInit() {
        this.pageRoute.params.subscribe(params => {
            this.store  = this.storesService.getStore(params['id']);
        });
    }

    constructor(
        private storesService: StoresService,
        private pageRoute: ActivatedRoute
    ) {}
}