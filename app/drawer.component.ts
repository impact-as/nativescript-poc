import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar"; 
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui-pro/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-telerik-ui-pro/sidedrawer/';

@Component({
    selector: "tk-sidedrawer-getting-started",
    template: `
<RadSideDrawer tkExampleTitle tkToggleNavButton height="100%">
    <StackLayout tkDrawerContent class="sideStackLayout">
        <StackLayout class="sideTitleStackLayout">
            <Label text="Navigation Menu"></Label>
        </StackLayout>
        <StackLayout class="sideStackLayout">
            <Label text="Primary" class="sideLabel sideLightGrayLabel"></Label>
            <Label text="Social" class="sideLabel"></Label>
            <Label text="Promotions" class="sideLabel"></Label>
            <Label text="Labels" class="sideLabel sideLightGrayLabel"></Label>
            <Label text="Important" class="sideLabel"></Label>
            <Label text="Starred" class="sideLabel"></Label>
            <Label text="Sent Mail" class="sideLabel"></Label>
            <Label text="Drafts" class="sideLabel"></Label>
        </StackLayout>
        <Label text="Close Drawer" color="lightgray" padding="10" style="horizontal-align: center" (tap)="onCloseDrawerTap()"></Label>
    </StackLayout>
    <StackLayout tkMainContent>
        <Label [text]="mainContentText" textWrap="true" class="drawerContentText"></Label>
        <Button text="OPEN DRAWER" (tap)="openDrawer()" class="drawerContentButton"></Button>
    </StackLayout>
</RadSideDrawer>
    `
})
export class DrawerComponent implements AfterViewInit, OnInit {
    private _mainContentText: string;

    constructor(private _changeDetectionRef: ChangeDetectorRef) {
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit() {
        this.mainContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.";
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