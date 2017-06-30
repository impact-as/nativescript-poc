
import {Component, ViewChild} from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { isEnabled, enableLocationRequest, getCurrentLocation, watchLocation, distance, clearWatch } from "nativescript-geolocation";
import { RouterExtensions } from "nativescript-angular/router";

import { StoresService } from '../services/stores.service';

// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);


@Component({
  selector: "find",
  template: `
    <GridLayout>
        <MapView #mapView [latitude]="latitude" [longitude]="longitude"
             [zoom]="zoom" 
             (mapReady)="onMapReady($event)"
             (markerSelect)="onMarkerSelect($event)"
             ></MapView>
    </GridLayout>
  `
})
export class FindComponent {

    public latitude:number =  54.86;
    public longitude:number = 10.20;
    public zoom = 10;
    public mapView: MapView;

    private stores = [];

    private updateLocation() {
        getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 2000000, timeout: 20000}).
            then(loc => {
                if (loc) {
                    console.log("Current location is: " + loc.latitude, loc.longitude);
                    this.latitude = Number(loc.latitude);
                    this.longitude = Number(loc.longitude);
                }
            }, function(e){
                console.log("Error: " + e.message);
            });
    }

    onMarkerSelect({marker}) {
        this.routerExtensions.navigateByUrl('/store/'+marker.userData.id);
    }

    //Map events
    onMapReady = (event) => {
        this.mapView = event.object;

        this.stores.forEach(store => {
            const marker = new Marker();
            marker.position = Position.positionFromLatLng(Number(store.lat), Number(store.lng));
            marker.title = store.title;
            marker.userData = store;

            this.mapView.addMarker(marker);
        });
    };

    constructor(
        private storesService: StoresService, 
        private routerExtensions: RouterExtensions
    ) {

        //This should be done in ngOnInit, but because of the map loading sync, thats too late
        this.stores = this.storesService.getStores();
        if (!isEnabled()) {
            enableLocationRequest()
                .then((res) => {
                    this.updateLocation();
                });
        } else {
            this.updateLocation();
        }

    }

}