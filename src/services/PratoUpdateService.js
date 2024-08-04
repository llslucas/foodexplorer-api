import AppError from "../utils/AppError.js";
import PratosRepository from "../repositories/PratosRepository.js";

export default class PratoUpdateService{
  constructor(pratosRepository){
    /** @type PratosRepository */
    this.repository = pratosRepository;
  }

  /**
   * 
   * @param {{id: number, name: String, description: String, category:String, price: number, img: String, ingredientes: [String]}} new_prato 
   * @returns {Promise<number>} updated_itens
   */
  async execute({id, name, description, category, price, ingredientes}){    
    const prato = await this.repository.getById({id});    
    
    if(!prato){
      throw new AppError("O Prato não existe.");
    }

    name = name ?? prato.name;
    description = description ?? prato.description;
    category = category ?? prato.category;
    price = price ?? prato.price;

    const updated_itens = await this.repository.update({id, name, description, category, price, ingredientes});

    return updated_itens;
  }
}