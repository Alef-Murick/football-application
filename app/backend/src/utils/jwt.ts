import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/iUser';


const jwtSecret = process.env.JWT_SECRET || 'jwt-secret';
export function createToken(data: IUser) {
  const token = jwt.sign({ data },
    jwtSecret, {
      expiresIn: '1h',
      algorithm: 'HS256',
  });
  return token;
}

export const validateToken = async (auth: string) => {
  try {
    const validate = jwt.verify(auth, jwtSecret);
    
    if (typeof validate !== 'string') {    
      return { status: 200, message: validate.data.role }
    }
  } catch (err) {
    return { status: 401, message: 'Token must be a valid token'};
  }
}