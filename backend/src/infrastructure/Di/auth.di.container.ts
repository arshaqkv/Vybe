import { GetUsers } from "../../application/use-cases/GetUsers";
import { Login } from "../../application/use-cases/Login";
import { RefreshToken } from "../../application/use-cases/RefreshToken";
import { Signup } from "../../application/use-cases/Signup";
import { DBUserRepository } from "../repositories/db.user.repository";

export class AuthDIContainer {
  static getUserRepository() {
    return new DBUserRepository();
  }

  static getSignupUserUseCase() {
    return new Signup(this.getUserRepository());
  }

  static getLoginUserUseCase() {
    return new Login(this.getUserRepository());
  }

  static getRefreshTokenUseCase() {
    return new RefreshToken(this.getUserRepository());
  }

  static getUsersUseCase() {
    return new GetUsers(this.getUserRepository());
  }
}
