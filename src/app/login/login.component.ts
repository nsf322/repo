import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';



@Component({
    selector: 'login',
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    
    password: string;
    userlogin: string;
    errorMessage: string;

    constructor(public loginService: LoginService, 
                public router: Router){}

    loginForm : FormGroup;

    ngOnInit(){
       this.loginForm = new FormGroup({
           'login': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
           'password': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')
           ])
       })
   }
   login() {
        this.loginService.login(this.userlogin, this.password).subscribe(() => {
            if (this.loginService.isLogged) {
                let redirect = this.loginService.redirectUrl ? this.loginService.redirectUrl : '/courses';
                this.router.navigate([redirect]);
            }
            else
            {
                this.errorMessage = 'Не правильный логин';
            }
        });
    }
   
}