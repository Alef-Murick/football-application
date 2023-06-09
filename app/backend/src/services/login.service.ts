import { iLogin } from "../interfaces/iLogin";
import User from "../database/models/User"
import { createToken, validateToken } from "../utils/jwt";
import { validatePassword } from "../middlewares/validations";


export default class LoginService {
  
  async login(login: iLogin): Promise<{ status: number, message: string }> {
    
    if (!login.email || !login.password) {  
      return { status: 400, message: 'All fields must be filled'}
    } 
      const user = await User.findOne({ where: { email: login.email } })
      const password = await user?.dataValues.password;
      
      if (user) {
        const { message } = await validatePassword(password, login.password)
        
        if (message === 'ok') {
          const token = createToken(user.dataValues)
          return { status: 200, message: token }
        }
      }
      return { status: 401, message: 'Incorrect email or password' }
  }

  async validateLogin(authorization: string) {
    const validate = await validateToken(authorization);
    
    if (validate && validate.status === 200) {
      return { status: 200, message: validate.message}
    }
    return { status: 401, message: validate?.message }
  }
}