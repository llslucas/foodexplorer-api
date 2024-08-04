import AppError from "../utils/AppError.js";
import authConfig from '../configs/auth.js';
import bcryptjs from "bcryptjs";
const { compare } = bcryptjs;
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;

export default class SessionCreateService{

  constructor(userRepository){    
    this.repository = userRepository;
  }

  async execute({email, password}){
    const user = await this.repository.findByEmail(email);

    const passwordMatched = user && await compare(password, user.password);        
  
    if(!user || !passwordMatched){
        throw new AppError("Usuário e/ou senha incorreta", 401);
    }
  
    const { secret, expiresIn } = authConfig.jwt;
  
    const token = sign({ role: user.role }, secret, {
        subject: String(user.id),
        expiresIn
    });

    return {user, token};
  }

}