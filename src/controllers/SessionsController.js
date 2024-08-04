import UserRepository from "../repositories/UserRepository.js";
import SessionCreateService from "../services/SessionCreateService.js";

export class SessionsController{
    async create(request, response){
        const { email, password } = request.body;

        const userRepository = new UserRepository();
        const sessionCreateService = new SessionCreateService(userRepository);

        const sessionData = await sessionCreateService.execute({email, password});

        return response.json(sessionData);
    }
}