import { Component } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { AuthService } from "../auth/auth.service";


@Component({
    selector: 'page-welcome',
    template:`
      <StackLayout style.paddingTop="10px">
        <Label [text]="message"></Label>
        <ScrollView> 
          <StackLayout>
            <Button text="Login" 
              [nsRouterLink]="['/login']"></Button>
            <Button text="Continue without logging in"
              [nsRouterLink]="['/home']"></Button>
          </StackLayout>  
        </ScrollView>
      </StackLayout>
    `
})
export class WelcomeComponent {
  
  constructor(private authService:AuthService,
              private router: RouterExtensions) {
    
  }
  
  ngOnInit(){
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    };
    
  }  
 
}