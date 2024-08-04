import AppError from "../utils/AppError.js";
import PratosRepository from "../repositories/PratosRepository.js";

export default class PratoCreateService{
  constructor(pratosRepository){
    /** @type PratosRepository */
    this.repository = pratosRepository;
  }

  /**
   * 
   * @param {{name: String, description: String, category:String, price: number, img: String, ingredientes: [String]}} new_prato 
   * @returns {Promise<number>} prato_id
   */
  async execute({name, description, category, price, ingredientes}){
    const pratoExists = await this.repository.getByName({name});

    if(pratoExists){
      throw new AppError("Já existe um prato com este mesmo nome.");
    }

    const prato_id = await this.repository.create({name, description, category, price, ingredientes});
    return prato_id;
  }
}