import { ILogin } from "../interfaces";

export default class LoginService {
  async login(login: ILogin) {
    if (login) {
      return { status: 200, message: 'random Token' }
    }
    return {status: 404, message: 'error'}
  }
}