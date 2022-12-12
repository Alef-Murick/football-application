import UsersModel from "../database/models/usersModel"
import { ILogin } from "../interfaces"


export default class LoginService {
  async login(login: ILogin) {
    const email = await UsersModel.findOne({ where: {email: login.email}})
    console.log('email~~~~~~~~~~~~~~', email);
    
    if (email) {
      // GERAR TOKEN E ENVIAR TOKEN
      return { status: 200, message: 'random Token' }
    }
    return {status: 404, message: 'error'}
  }
}