import { Component, inject, signal } from '@angular/core';
import { AccessService } from '../../services/access.service';
import { User } from '../../interfaces/user.interface';
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

  hide = signal(true);
  clickEvent(event: MouseEvent){
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
