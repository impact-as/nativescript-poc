import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { LoginComponent } from "./login.component";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth-guard.service";

@NgModule({
    imports: [
      NativeScriptModule,
    ],
    declarations: [
      LoginComponent,
    ],
    providers: [
      AuthService,
      AuthGuard
    ]
})

export class AuthModule { }
