import UserRepository from '../repositories/UserRepository.js';
import UserCreateService from '../services/UserCreateService.js';
import UserUpdateService from '../services/UserUpdateService.js';

export default class UsersController {
    async create(request, response){
        const { name, email, password } = request.body;      

        const userRepository = new UserRepository();

        const userCreateService = new UserCreateService(userRepository);
        await userCreateService.execute({ name, email, password });
        
        return response.status(201).json();        
    }

    async update(request, response){
        const { name, email, password, old_password } = request.body;
        const user_id = request.user.id;
        
        const userRepository = new UserRepository();

        const userUpdateService = new UserUpdateService(userRepository);
        userUpdateService.execute({ user_id, name, email, password, old_password })

        return response.json("Usuário atualizado com sucesso!");
    }
}
