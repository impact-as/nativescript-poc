import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  template: ` 
  <StackLayout class="page">
    <Label textalignment="center" class="h1" [text]="message"></Label>
    <ScrollView>
      <StackLayout *ngIf="!authService.isLoggedIn()">
        <FlexBoxLayout>
          <Label class="label m-r-15" text="Email" textWrap="true"></Label>
          <TextField flexGrow="1" hint="E-mail" [(ngModel)]="email" keyboardType="email" returnKeyType="next"></TextField>
        </FlexBoxLayout>
        <FlexBoxLayout>
          <Label class="label m-r-15" text="Email" textWrap="true"></Label>
          <TextField flexGrow="1" hint="password"[(ngModel)]="password" autocorrect="false" secure="true" autocapitalizationType="none" eturnKeyType="send" ></TextField>
        </FlexBoxLayout>
        <Button class="btn" text="Login" (tap)="loginWithPassword(email, password)"></Button>
        <Button class="btn" text="Login With Google" (tap)="loginWithGoogle()"></Button>
        <Button class="btn" text="Sign Up" (tap)="signUp(email, password)"></Button>
      </StackLayout>
      <StackLayout *ngIf="authService.isLoggedIn()">
        <Button class="btn" text="Logout" (tap)="logout()"></Button>
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