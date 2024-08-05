import PratosRepository from '../repositories/PratosRepository.js';

import PratoCreateService from '../services/PratoCreateService.js';
import PratoUpdateService from '../services/PratoUpdateService.js';
import PratoDeleteService from '../services/PratoDeleteService.js';
import PratoSearchService from '../services/PratoSearchService.js';
import PratoGetCategoriesService from '../services/PratoGetCategoriesService.js';

import FavoritesRepository from '../repositories/FavoritesRepository.js';
import FavoritesListService from '../services/FavoritesListService.js';

export default class PratosController{
  async create(request, response){
    const { name, description, category, price, ingredientes } = request.body;

    const repository = new PratosRepository();
    const pratoCreateService = new PratoCreateService(repository);

    const prato_id = await pratoCreateService.execute({ name, description, category, price, ingredientes });

    return response.status(201).json({message: "Prato criado com sucesso!", id: prato_id});
  }

  async update(request, response){
    const { id } = request.params;
    const { name, description, category, price, ingredientes } = request.body;

    const repository = new PratosRepository();
    const pratoUpdateService = new PratoUpdateService(repository);    

    await pratoUpdateService.execute({id, name, description, category, price, ingredientes});

    return response.json("Prato atualizado com sucesso!");
  }

  async delete(request, response){
    const { id } = request.params;

    const repository = new PratosRepository();
    const pratoDeleteService = new PratoDeleteService(repository);  

    await pratoDeleteService.execute({id});

    return response.json("Prato excluído com sucesso!");
  }

  async index(request, response){
    const { search } = request.query;
    const user_id = request.user.id;

    const searchParameter = search ?? '';   

    const repository = new PratosRepository();
    const pratoSearchService = new PratoSearchService(repository);  

    const pratos = await pratoSearchService.execute({ searchParameter });    

    const favoritesRepository = new FavoritesRepository();
    const favoritesListService = new FavoritesListService(favoritesRepository);
    const favoritos = await favoritesListService.execute({user_id});       

    const pratosWithFavorites = pratos.map(prato => {
      return {
        ...prato,
        isFavorite: favoritos.includes(prato.id)
      }
    })   

    return response.json(pratosWithFavorites);
  }

  async getCategories(request, response){
    const repository = new PratosRepository();
    const getCategoriesService = new PratoGetCategoriesService(repository);

    const categories = await getCategoriesService.execute();

    return response.status(200).json(categories);
  }

  async get(request, response){
    const { id } = request.params;
    const user_id = request.user.id;

    const repository = new PratosRepository();

    const prato = await repository.getById({id});

    const favoritesRepository = new FavoritesRepository();
    const favoritesListService = new FavoritesListService(favoritesRepository);
    const favoritos = await favoritesListService.execute({user_id});
    
    const isFavorite = favoritos.includes(prato.id);

    return response.json({...prato, isFavorite});
  }
  
}