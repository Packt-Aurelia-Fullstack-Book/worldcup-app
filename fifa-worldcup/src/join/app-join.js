import { SignUpRules, User } from '../models/User';
import { inject, NewInstance } from 'aurelia-dependency-injection';
import { ValidationController } from 'aurelia-validation';
import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';
import { AuthService } from "../backend/auth-service";


@inject(AuthService, NewInstance.of(ValidationController))
export class AppJoin {
  constructor(auth, signUpController,) {
    this.user = new User()

    this.signUpValidator = signUpController
    this.signUpValidator.addRenderer(new MaterializeFormValidationRenderer())
    this.signUpValidator.addObject(this.user, SignUpRules)

    this.auth = auth

    this.registering = false
    this.error = null
    this.validatePassword = "murruer"
  }

  signUp() {
    this.error = null

    if (this.user.password != this.validatePassword) {
      this.error = "Password are different"
      return
    }

    this.signUpValidator.validate()
      .then(result => {
        if (result.valid) {
          this.registering = true
          this.auth.signUp(this.user)
            .then(response => {
              this.onSignUpSuccess(response)
            })
            .catch(err => {
              this.onSignUpError(err)
            })
        } else {
          this.error = "Fix the form issues"
        }
      })
  }

  onSignUpSuccess(result) {
    this.registering = false
    this.auth.navigate("/#/login")
  }


  onSignUpError(result) {
    this.login = false
    this.error = "Registration Failed. Validate The information."
  }
}
