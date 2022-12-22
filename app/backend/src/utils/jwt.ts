import * as jwt from 'jsonwebtoken';
import { iLogin } from '../interfaces/iLogin';

const jwtSecret = process.env.JWT_SECRET || 'jwt-secret';
export function createToken(data: iLogin) {
  const token = jwt.sign({ data },
    jwtSecret, {
      expiresIn: '1h',
      algorithm: 'HS256',
  });
  return token;
}