import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar"; 
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "./sidedrawer/angular";
import { RadSideDrawer } from './sidedrawer';

import * as application from "application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";

@Component({
    selector: 'ns-app',
    template: `
<RadSideDrawer tkExampleTitle tkToggleNavButton height="100%">
    <StackLayout tkDrawerContent class="sideStackLayout">
        <basket></basket>
        <Label text="Close basket" color="lightgray" padding="10" style="horizontal-align: center" (tap)="onCloseDrawerTap()"></Label>
    </StackLayout>
    <FlexboxLayout flexDirection="column" tkMainContent>
        <Button text="OPEN basket" (tap)="openDrawer()" class="drawerContentButton"></Button>
        <StackLayout flexGrow="1" flexShrink="1" height="300">
            <router-outlet></router-outlet>
        </StackLayout>
        <tab-navigation height="50" flexShrink="0"></tab-navigation>
    </FlexboxLayout>
</RadSideDrawer>
    `
})
export class AppComponent implements AfterViewInit, OnInit {
    private _mainContentText: string;

    constructor(
        private _changeDetectionRef: ChangeDetectorRef, 
        private router: RouterExtensions
    ) {}

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