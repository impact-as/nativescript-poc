import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  template: ` 
  <StackLayout class="container">
    <Label textalignment="center" class="h1" [text]="message"></Label>
    <ScrollView>
      <StackLayout *ngIf="!authService.isLoggedIn()">
        <FlexBoxLayout>
          <Label class="label m-r-15" width="90" text="Email" textWrap="true"></Label>
          <TextField flexGrow="1" hint="E-mail" class="input input-border" [(ngModel)]="email" keyboardType="email" returnKeyType="next"></TextField>
        </FlexBoxLayout>
        <FlexBoxLayout>
          <Label class="label m-r-15" width="90" text="Password" textWrap="true"></Label>
          <TextField flexGrow="1" class="input input-border" hint="password"[(ngModel)]="password" autocorrect="false" secure="true" autocapitalizationType="none" eturnKeyType="send" ></TextField>
        </FlexBoxLayout>
        <Button class="button primary" text="Login" (tap)="loginWithPassword(email, password)"></Button>
        <StackLayout height="80"></StackLayout>
        <Button class="button" text="Login With Google" (tap)="loginWithGoogle()"></Button>
        <Button class="button" text="Sign Up" (tap)="signUp(email, password)"></Button>
      </StackLayout>
      <StackLayout *ngIf="authService.isLoggedIn()">
        <Button class="button" text="Logout" (tap)="logout()"></Button>
      </StackLayout>
    </ScrollView>
  </StackLayout>
  `
})

export class LoginComponent implements OnInit {
  message:string;
  email: string;
  password: string;

  
  constructor(private authService: AuthService, 
              public router: Router){ }
            
  ngOnInit() {
    this.updateMessage();
  }
  
  updateMessage():void {
    this.message = `Logged ${this.authService.isLoggedIn() ? 'in' : 'out' }`;
  }
        
  loginWithPassword(email: string, password: string):void {
    if(!!email && !!password) {
      this.message="Logging In";
      this.authService.loginWithPassword(email, password).subscribe(() => {
        if (this.authService.isLoggedIn()) {
          this.updateMessage();
          this.router.navigate([this.authService.redirectUrl]);
        }
      });
    }
  }
  
  loginWithGoogle():void {
    this.authService.loginWithGoogle().subscribe(() => {
      if (this.authService.isLoggedIn()) {
        this.updateMessage();
        this.router.navigate([this.authService.redirectUrl]);
      }
    });
  }
  
  logout():void {
    this.message = 'Logging Out'
    this.authService.logout().subscribe(() => {
        this.updateMessage();
    });
  }
  
  signUp(email: string, password: string):void {

    if(!!email && !!password) {
      this.message="signing up";
      this.authService.registerUser({email,password}).subscribe(() => {
        if (this.authService.isLoggedIn()) {
          this.updateMessage();
        }
      });
    }
    
  }
}