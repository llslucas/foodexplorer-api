import FavoritesRepository from "../repositories/FavoritesRepository.js";
import AppError from "../utils/AppError.js";

export default class ToogleFavoriteService{
  constructor(repository){
    /** @type FavoritesRepository */
    this.repository = repository;
  }

  async execute({user_id, prato_id}){ 
    let status;

    try{
      status = await this.repository.toogleFavorite({user_id, prato_id});
    }catch(e){      
      if(e.code = "SQLITE_CONSTRAINT"){
        throw new AppError("O prato não existe.");
      }else{
        throw e;
      }
    }

    return status;
  }
}