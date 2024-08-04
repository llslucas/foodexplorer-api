import bcryptjs from 'bcryptjs';
const { hash } = bcryptjs;
import AppError from "../utils/AppError.js";

export default class UserCreateService{
  constructor(userRepository){
    this.repository = userRepository;    
  }

  async execute({name, email, password}){  
    const checkUserExists = await this.repository.findByEmail(email);       

    if(checkUserExists)
      throw new AppError("Este e-mail já está em uso.");             

    const hashedPassword = await hash(password, 8);    

    const user_id = await this.repository.create({ name, email, password:hashedPassword });

    return user_id;
  }
}