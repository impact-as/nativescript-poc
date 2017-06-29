import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as firebase from "nativescript-plugin-firebase";

import { getString, setString } from "application-settings";

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/frompromise';


const tokenKey: string = "fireBaseToken";

@Injectable()
export class AuthService {
  redirectUrl: string = "";

  loginWithPassword(loginOptions: firebase.FirebasePasswordLoginOptions): Observable<firebase.User> {
    return Observable.fromPromise(
      firebase.login({
        type: firebase.LoginType.PASSWORD,
        passwordOptions: loginOptions
      })
    );
  }
  
  loginWithGoogle():void{
    firebase.login({
      type: firebase.LoginType.GOOGLE,
    });
  }

  logout(): Observable<any> {
    return Observable.fromPromise(firebase.logout());
  }
  
  registerUser(newUser: firebase.CreateUserOptions): Observable<firebase.CreateUserResult>{
    return Observable.fromPromise(firebase.createUser(newUser));
  }
  
  getCurrentUser(): Observable<firebase.User> {
    return Observable.fromPromise(firebase.getCurrentUser())
  }
  
  isLoggedIn(): boolean {
    return !!getString(tokenKey);
  }
  
  static get token(): string{
    return getString(tokenKey);
  }
  
  static set token(token: string) {
    setString(tokenKey, token);
  }
}