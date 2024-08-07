import PratosRepository from '../repositories/PratosRepository.js';

export default class PratoSearchService{  
  constructor(pratosRepository){
    /** @type PratosRepository */
    this.repository = pratosRepository;
  }

  async execute({ searchParameter }){
    const pratos = await this.repository.search({searchParameter});    

    return pratos;        
  }
}