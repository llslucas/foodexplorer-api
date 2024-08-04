import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken;

import AppError from '../utils/AppError.js';
import authConfig from '../configs/auth.js'

export default function ensureAuthenticated(request, response, next){
    const authHeader = request.headers;

    if(!authHeader.cookie){
        throw new AppError("Token JWT não informado", 401);        
    }
    
    const [, token] = authHeader.cookie.split("token=");  

    try{
        const { role, sub: user_id } = verify(token, authConfig.jwt.secret);        

        request.user = {
            id: Number(user_id),
            role
        };

        return next()
    }catch{
        throw new AppError("Token JWT inválido", 401);
    }
}