import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui/sidedrawer/angular";

import { AuthModule } from "./auth/auth.module";

import { DrawerComponent } from './drawer.component';

import { HomeComponent, LoginComponent, BasketComponent, CategoryComponent, SearchComponent, FindComponent } from './pages';

import { CategoryService } from "./services/category.service";
import { FilterService } from "./services/filter.service";

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
        NativeScriptUISideDrawerModule,
        AuthModule
    ],
    declarations: [
        AppComponent,
        HomeComponent, 
        LoginComponent, 
        BasketComponent, 
        CategoryComponent, 
        SearchComponent,
        TabNavigationComponent,
        DrawerComponent,
        FindComponent
    ],
    entryComponents:[
        HomeComponent, 
        LoginComponent, 
        BasketComponent, 
        CategoryComponent, 
        SearchComponent,
        FindComponent
    ],
    providers: [
        CategoryService,
        FilterService
    ],      
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
