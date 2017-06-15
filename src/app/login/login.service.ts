import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';


@Injectable()
export class LoginService {
    isLogged: boolean = false;
    redirectUrl: string;

    login(login:string, password:string): Observable<boolean> {
        return Observable
        .of(true)   
        .do(val => { 
        if(login == 'q' && password == 'q')
            this.isLogged = true;
            return this.isLogged;
        });
    }
    logout(): void{
        this.isLogged = false;
    }
}
