import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { HomeComponent, LoginComponent, SearchComponent, CategoryComponent, BasketComponent } from './pages';
import { DrawerComponent } from './drawer.component';

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "search", component: SearchComponent },
    { path: "category", component: CategoryComponent },
    { path: "basket", component: BasketComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }