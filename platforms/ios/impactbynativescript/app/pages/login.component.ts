import { Component } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";

import { Page } from 'ui/page';

@Component({
    selector: 'page-login',
    template:`
        <StackLayout>
            <Button (tap)="goBack()" text="Back"></Button>
            <Label text="login"></Label>

            <TextField hint="E-mail" [(ngModel)]="user" keyboardType="email"></TextField>
            <TextField hint="zipcode" keyboardType="phone"></TextField>
            <TextField hint="password" autocorrect="false"></TextField>

            <Button text="Login" (tap)="onTap()"></Button>
        </StackLayout>
    `
})
export class LoginComponent {

    user:String;

    goBack() {
        this.router.back();
    }

    onTap() {
        console.log('logged in as ', this.user);
        this.router.navigateByUrl('/');
    }

    ngOnInit() {
        console.log('NEW COMPONENT WAS CREATED');
    }
    ngOnDestroy() {
        console.log('OLD COMPONENT WAS DESTROYED');
    }

    constructor(private router: RouterExtensions) {}

}