import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor(private httpService: HttpService) {
  }

  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  onRegister() {
    this.httpService.post({path: 'registration', data: this.registrationForm.value}).subscribe((data) => {
      console.log(data);
    })
  }

}
