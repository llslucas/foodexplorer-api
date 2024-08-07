import PratosRepository from "../repositories/PratosRepository.js";

export default class PratoGetCategoriesService{
  constructor(repository){
    /**@type PratosRepository */
    this.repository = repository;
  }

  async execute(){
    const categories = await this.repository.getCategories();    

    return categories;
  }
}