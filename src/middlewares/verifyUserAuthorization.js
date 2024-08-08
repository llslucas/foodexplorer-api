import AppError from "../utils/AppError.js";

/**
 * 
 * @param  {[]} rolesToVerify 
 * @returns 
 */
export default function verifyUserAuthorization(rolesToVerify){
  return (request, response, next) => {
    const { role } =  request.user;

    if(!rolesToVerify.includes(role)){
      throw new AppError("Unauthorized", 401);
    }

    return next();
  }
}