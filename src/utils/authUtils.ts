import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
require('dotenv').config();

// Function to hash users password
export const hash = async (password: string) => {
  // Generate salt
  const salt = await bcrypt.genSalt(10);
  // Hash the password
  password = await bcrypt.hash(password, salt);
  return password;
}; // Function to compare hashed password's
export const compare = async (hash: string, pass: string) => {
  return bcrypt.compare(hash, pass);
}; // Function to generate tokens
export const generateToken = (id: string) => {
  return sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

export const generatePassword = async (password: string) => {
  const hashedPass = await hash(password);
  return hashedPass;
};
