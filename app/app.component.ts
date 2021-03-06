import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar"; 
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui-pro/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-telerik-ui-pro/sidedrawer/';

import * as application from "application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";

@Component({
    selector: 'ns-app',
    template: `
        <RadSideDrawer tkExampleTitle tkToggleNavButton height="100%" [gesturesEnabled]="!hideBasket()">
            <AbsoluteLayout tkDrawerContent class="sideStackLayout" width="100%" height="100%">
                <Image top="10" left="250" src="~/images/close.png" width="20" height="20" (tap)="onCloseDrawerTap()"></Image>
                <basket top="0" left="0"></basket>
            </AbsoluteLayout>
            <FlexboxLayout flexDirection="column" tkMainContent>
                <AbsoluteLayout flexGrow="1" flexShrink="1" height="100">
                    <StackLayout top="0" left="0" height="100%" width="100%">
                        <router-outlet></router-outlet>
                    </StackLayout>
                    <StackLayout top="0" left="290" width="30">
                        <Image *ngIf="!hideBasket()" [class]="'basket-icon ' + pageClass" src="~/images/cart.png" width="25" height="25" (tap)="openDrawer()"></Image>
                    </StackLayout>                    
                </AbsoluteLayout>
                <tab-navigation height="50" flexShrink="0"></tab-navigation>
            </FlexboxLayout>
        </RadSideDrawer>
    `
})
export class AppComponent implements AfterViewInit, OnInit {
    private _mainContentText: string;        

    constructor(
        private _changeDetectionRef: ChangeDetectorRef, 
        private router: RouterExtensions,
        private page: Page
    ) {
        page.actionBarHidden = true;
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit() {
        this.mainContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.";

        if (isAndroid) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                this.router.back();
                data.cancel = true;
            });
        }

    }
    
    hideBasket(): boolean {
      return this.router.router.isActive('', true) || this.router.router.isActive('login', true);
    }

    get pageClass(){
        return this.router.router.url.replace(/\//g,'');
    }

    get mainContentText() {
        return this._mainContentText;
    }

    set mainContentText(value: string) {
        this._mainContentText = value;
    }

    public openDrawer() {
        this.drawer.showDrawer();        
    }

    public onCloseDrawerTap() {
       this.drawer.closeDrawer();
    }
}