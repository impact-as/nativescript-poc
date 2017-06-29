import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { NativeScriptUISideDrawerModule } from "./sidedrawer/angular";

import { DrawerComponent } from './drawer.component';

import { HomeComponent, LoginComponent, BasketComponent, CategoryComponent, SearchComponent } from './pages';

import { TabNavigationComponent } from './tab-navigation.component';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        HomeComponent, 
        LoginComponent, 
        BasketComponent, 
        CategoryComponent, 
        SearchComponent,
        TabNavigationComponent,
        DrawerComponent
    ],
    entryComponents:[
       HomeComponent, 
        LoginComponent, 
        BasketComponent, 
        CategoryComponent, 
        SearchComponent
    ],
    providers: [
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
