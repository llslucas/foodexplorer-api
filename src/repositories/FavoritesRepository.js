import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";

export default class FavoritesRepository{
  async disconnect(){
    knex.destroy();
  };

  /**
   * 
   * @param {{user_id: number}} user_id
   * @returns {Promise<[]>} favorites
   */
  async getFavorites({ user_id }){
    const favorites = (await knex("favoritos").select("prato_id").where({ user_id }));

    const favoritesIds = favorites.map(fav => fav.prato_id);

    return favoritesIds;
  }

  /**
   * 
   * @param {{user_id: number, prato_id: number}} favorite
   * @returns {Promise<Boolean>} new_state
   */
  async toogleFavorite({ user_id, prato_id }){        
    let favorite;
    
    favorite = await knex("favoritos").where({user_id, prato_id}).first();    

    if(favorite){
      await knex("favoritos").where({user_id, prato_id}).delete();  
      return false;    
    }else{
      await knex("favoritos").insert({user_id, prato_id});
      return true;
    }   
  }
}