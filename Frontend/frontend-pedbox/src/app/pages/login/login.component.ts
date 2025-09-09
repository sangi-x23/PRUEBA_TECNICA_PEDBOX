import { Component, inject, signal } from '@angular/core';
import { AccessService } from '../../services/access.service';
import { Login } from '../../interfaces/login.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {merge} from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, 
            MatInputModule, 
            FormsModule, 
            ReactiveFormsModule, 
            MatIconModule, 
            MatButtonModule,
            MatDividerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private accessService = inject(AccessService);
  private router = inject(Router);
  public formBuilder = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuilder.group({
    email:['', Validators.required],
    password:['', Validators.required]
  })

  hide = signal(true);
  clickEvent(event: MouseEvent){
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login() {
    if(this.formLogin.invalid) return;

    const obj:Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    }

    this.accessService.login(obj).subscribe({
      next:(data)=> {
        if(data.isSuccess){
          localStorage.setItem("token", data.token)
          this.router.navigate(['home'])
        }
        else {
          alert(data.message)
        }
      },
      error:(error) => {
        alert("Error en el servidor: " + error.message)
      }
    })
  }

  goRegister(){
    this.router.navigate(['register'])
  }
}
