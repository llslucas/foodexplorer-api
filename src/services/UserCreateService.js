import bcryptjs from 'bcryptjs';
const { hash } = bcryptjs;
import AppError from "../utils/AppError.js";

export default class UserCreateService{
  constructor(userRepository){
    this.repository = userRepository;    
  }

  async execute({name, email, password}){  
    if(!name || !email || !password)
      throw new AppError("Pelo menos um dos valores passados estão em branco.");     

    const checkUserExists = await this.repository.findByEmail(email);       

    if(checkUserExists)
      throw new AppError("Este e-mail já está em uso.");             

    const hashedPassword = await hash(password, 8);    

    const user_id = await this.repository.create({ name, email, password:hashedPassword });

    return user_id;
  }
}