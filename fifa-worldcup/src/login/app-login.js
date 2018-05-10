import { User, SignInRules} from "../models/User";
import { inject, NewInstance } from 'aurelia-dependency-injection';
import { ValidationController } from 'aurelia-validation';
import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';
import { AuthService } from '../backend/auth-service';

@inject(NewInstance.of(ValidationController), AuthService)
export class AppLogin {

  constructor(signInController, auth) {

    this.user = new User();

    this.signInValidator = signInController
    this.signInValidator.addRenderer(new MaterializeFormValidationRenderer())
    this.signInValidator.addObject(this.user, SignInRules)

    this.login = false;
    this.error = null;

    this.auth = auth;
  }

  signIn() {
    this.error = null
    this.signInValidator.validate()
      .then(result => {
        if (result.valid) {
          this.login = true;
          this.auth.signIn(this.user)
            .then(response => {
              this.onSignInSuccess(response)
            })
            .catch(err => {
              console.log(err)
              this.onSignInError(err)
            })
        } else {
          this.error = "Fix the form issues"
        }
      })
  }

  onSignInSuccess(result) {
    this.login = false
    this.auth.navigate("/#/")
  }

  onSignInError(result) {
    this.login = false
    this.error = "Authentication Failed. Validate your Username and Password."
  }
}
