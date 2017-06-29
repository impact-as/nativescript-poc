import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { AuthGuard } from "./auth/auth-guard.service"

import { HomeComponent, LoginComponent, SearchComponent, CategoryComponent, FindComponent, ListComponent, DetailComponent } from './pages';

const routes: Routes = [
    { path: "", component: HomeComponent, canActivate:[ ]},
    { path: "login", component: LoginComponent },
    { path: "search", component: SearchComponent },
    { path: "category", component: CategoryComponent },
    { path: "find", component: FindComponent },
    { path: "list/:id", component: ListComponent },
    { path: "detail/:categoryId/:productId", component: DetailComponent }     
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }