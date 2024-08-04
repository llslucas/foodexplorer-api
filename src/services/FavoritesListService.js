import FavoritesRepository from "../repositories/FavoritesRepository.js";

export default class FavoritesListService{
  constructor(repository){
    /** @type FavoritesRepository */
    this.repository = repository;
  }

  async execute({ user_id }){
    const favorites = this.repository.getFavorites({ user_id });

    return favorites;
  }
}