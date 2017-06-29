import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import * as application from "application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";


@Component({
    selector: "ns-app",
    template: `
    <FlexboxLayout flexDirection="column">
        <StackLayout flexGrow="1" flexShrink="1" height="300">
            <router-outlet></router-outlet>
        </StackLayout>
        <tab-navigation height="50" flexShrink="0"></tab-navigation>
    </FlexboxLayout>
    `
})
export class AppComponent { 
    title = 'IMPACT by NativeScript';

    ngOnInit() {
        //Handling android back-button support 
        if (isAndroid) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                this.router.back();
                data.cancel = true;
            });
        }
    }

    constructor(private router: RouterExtensions) {
        global['router'] = router;
    }
}
