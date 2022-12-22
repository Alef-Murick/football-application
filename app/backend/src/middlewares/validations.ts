import * as bcrypt from 'bcryptjs';

export const validatePassword = async (password: string, loginPassword: string) => {
  const validate = await bcrypt.compare(loginPassword, password)
  
  if (!validate) {
    return {message: 'Incorrect email or password'}
  }
  return {message: 'ok'}
}

// console.log('validate password~~~~~~~~~~~~~', validate);
// console.log('PASSWORD IN VALIDATION~~~~~~~~~~~~~~~~~', password);
// console.log('LOGIN PASSWORD~~~~~~~~~~~~~~~', loginPassword);
