import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /*
  * Login form
  */
  public loginForm: any;

  /**
   * constructor.
   * @param formBuilder
   * @param router
   * @param http
   */

  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    private http: HttpClient) { 
    this.loginForm = this.formBuilder.group({
      'userName': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  /*
  * OnInit
  */
  ngOnInit() {
  }

  /*
  * Login button
  */
  public login() {
    this.http.post('http://localhost:3000/login', this.loginForm.value).subscribe(
      (data: any) =>  {
        if (data.message === 'success') {
          this.router.navigate(['attempt']);
        } else {
          alert('username and password incorrect');
        }
      }
    )
  }
}
