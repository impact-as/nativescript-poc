import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui/sidedrawer/angular";

import { AuthModule } from "./auth/auth.module";

import { DrawerComponent } from './drawer.component';

import { HomeComponent, BasketComponent, BasketLineComponent, CategoryComponent, SearchComponent, FindComponent, ListComponent, DetailComponent } from './pages';

import { CategoryService } from "./services/category.service";
import { FilterService } from "./services/filter.service";
import { SearchService } from "./services/search.service";
import { BasketService } from "./services/basket.service";


import { TabNavigationComponent } from './tab-navigation.component';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule,
        AuthModule
    ],
    declarations: [
        AppComponent,
        HomeComponent, 
        BasketComponent,
        BasketLineComponent,
        CategoryComponent, 
        SearchComponent,
        TabNavigationComponent,
        DrawerComponent,
        FindComponent,
        ListComponent,
        DetailComponent
    ],
    entryComponents:[
        HomeComponent, 
        BasketComponent, 
        CategoryComponent, 
        SearchComponent,
        FindComponent,
        ListComponent,
        DetailComponent
    ],
    providers: [
        CategoryService,
        FilterService,
        SearchService
        BasketService
    ],      
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
