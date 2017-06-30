import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { HomeComponent, SearchComponent, CategoryComponent, FindComponent, ListComponent, DetailComponent, StoreComponent } from './pages';
import { LoginComponent } from "./auth/login.component";

const routes: Routes = [
    { path: "", component: HomeComponent},
    { path: "login", component: LoginComponent },
    { path: "search", component: SearchComponent },
    { path: "category", component: CategoryComponent },
    { path: "find", component: FindComponent },
    { path: "list/:id", component: ListComponent },
    { path: "detail/:categoryId/:productId", component: DetailComponent }, 
    { path: "store/:id", component: StoreComponent}

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }