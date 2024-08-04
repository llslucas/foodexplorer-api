import bcryptjs from 'bcryptjs';
const { hash, compare } = bcryptjs;
import AppError from "../utils/AppError.js";

export default class UserUpdateService{

  constructor(UserRepository){
    this.repository = UserRepository;
  }

  async execute({ user_id, name, email, role, password, old_password }){        
    const user = await this.repository.findById(user_id);
    
    if(!user)
      throw new AppError('Usuário não encontrado');        

    if(email){
      const userWithUpdatedEmail = await this.repository.findByEmail(email);
  
      if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id)
        throw new AppError("Este e-mail já está em uso."); 
    }         

    if(role){
      const roleIsValid = ['admin', 'user'].includes(role);

      if(!roleIsValid){
        throw new AppError("Role inválido");
      }
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;   
    user.role = role ?? user.role;     

    if(password && !old_password)
      throw new AppError("Você precisa informar a senha antiga para redefinir a nova senha.");    
    
    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword){
          throw new AppError("A senha antiga não confere.");
      }

      user.password = await hash(password, 8);
    }           
    
    this.repository.update(user);

    const updatedUser = await this.repository.findById(user_id);

    return updatedUser
  }
}