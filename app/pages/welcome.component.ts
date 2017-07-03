import { Component } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { AuthService } from "../auth/auth.service";


@Component({
    selector: 'page-welcome',
    template:`
      <StackLayout>
        <StackLayout height="30%"></StackLayout>
        <Label text="Login for at se kurv eller fortsæt uden at være logget ind" textWrap="true"></Label>
        <ScrollView> 
          <StackLayout paddingTop="20px">  
            <Button class="button primary" text="Login" 
              [nsRouterLink]="['/login']"></Button>
            <Button class="button" text="Continue without logging in"
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