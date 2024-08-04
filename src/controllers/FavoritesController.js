import FavoritesRepository from "../repositories/FavoritesRepository.js";
import ToogleFavoriteService from "../services/ToogleFavoriteService.js";

export default class FavoritesController{
  async toogle(request, response){
    const { id } = request.params;
    const user_id = request.user.id;

    const repository = new FavoritesRepository();
    const toogleFavoriteService = new ToogleFavoriteService(repository);    

    const status = await toogleFavoriteService.execute({user_id, prato_id : id});

    response.status(200).json({message: "Favorito atualizado com sucesso!", status});
  }
}