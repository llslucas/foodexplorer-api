import PratosRepository from "../repositories/PratosRepository.js";
import AppError from "../utils/AppError.js";

export default class PratoDeleteService{
  constructor(pratosRepository){
    /** @type PratosRepository */
    this.pratosRepository = pratosRepository;
  }

  /**
   * 
   * @param {{id: number}} id
   * @returns {Promise<Number>} deleted_itens
   */
  async execute({id}){
    const deleted_itens = await this.pratosRepository.delete({id});   
    
    return deleted_itens;
  }
}