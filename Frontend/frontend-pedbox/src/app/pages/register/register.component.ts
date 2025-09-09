import { Component, inject, signal } from '@angular/core';
import { AccessService } from '../../services/access.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, 
            MatInputModule, 
            FormsModule, 
            ReactiveFormsModule, 
            MatIconModule, 
            MatButtonModule,
            MatDividerModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private accessService = inject(AccessService);
  private router = inject(Router)
  public formBuilder = inject(FormBuilder);

  public formRegister: FormGroup = this.formBuilder.group({
    name:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    password:['', Validators.required]
  })

  hide = signal(true);
  clickEvent(event: MouseEvent){
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  register() {
    if(this.formRegister.invalid) return;

    const obj:User = {
      name: this.formRegister.value.name,
      email: this.formRegister.value.email,
      password: this.formRegister.value.password,
    }

    this.accessService.register(obj).subscribe({
      next:(data)=> {
        if(data.isSuccess){
          alert("Usuario registrado con exito")
          this.router.navigate([''])
        } else {
          alert(data.message)
        }
      }, error:(error) => {
        alert(error.error.message)
      }
    })
  }
}
