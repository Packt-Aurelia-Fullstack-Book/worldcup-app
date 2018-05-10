import {ValidationRules} from "aurelia-validation";

export class User {
  username
  password
}

export const SignInRules = ValidationRules
  .ensure('username').displayName('Name').minLength(3).maxLength(50).required()
  .ensure('password').displayName('Password').minLength(3).maxLength(50).required()
  .rules


export const SignUpRules = ValidationRules
  .ensure('username').displayName('Name').minLength(3).maxLength(50).required()
  .ensure('password').displayName('Password').minLength(3).maxLength(50).required()
  .rules
