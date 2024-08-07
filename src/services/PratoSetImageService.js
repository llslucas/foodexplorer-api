import PratosRepository from "../repositories/PratosRepository.js";
import AppError from "../utils/AppError.js";
import DiskStorage from "../providers/DiskStorage.js";

export default class PratoSetImageService{
  constructor(repository){
    /**@type PratosRepository */
    this.repository = repository;
  }

  async execute({prato_id, pratoFileName}){   
    const diskStorage = new DiskStorage();

    const { img } = await this.repository.getById({id: prato_id});   

    if(img){
        await diskStorage.deleteFile(img);
    }

    const filename = await diskStorage.saveFile(pratoFileName);    

    const updated = await this.repository.updateImg({id: prato_id, img: filename});    

    return updated;    
  }
}