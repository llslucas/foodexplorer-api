import PratosRepository from "../repositories/PratosRepository";
import PratoSetImageService from "./PratoSetImageService.js";
import DiskStorage from "../providers/DiskStorage.js";

describe("PratoSearchService", () => {
  /** @type PratosRepository */
  let repository = null;

  /** @type PratoSetImageService */
  let service = null;

  /** @type DiskStorage */
  let diskStorage = null;

  let prato_id = null;  
  const pratoFileName = 'test_img.png';


  beforeAll(async() => {
    repository = new PratosRepository();
    service = new PratoSetImageService(repository);
    diskStorage = new DiskStorage();

    await repository.deleteAll();
  });

  beforeEach(async() => {
    var newPrato = {
      name: "Prato Teste", 
      description: "Um prato criado para fins de teste.", 
      category: "Teste", 
      price: 99.99, 
      ingredientes: ["Ingrediente 1", "Ingrediente 2"],
    }
    prato_id = await repository.create(newPrato);

    try{
      await diskStorage.unsaveFile(pratoFileName);
    }catch(e){
      console.log("A imagem de teste não está na pasta uploads.");
    }
  })

  afterEach(async() => {
    await repository.deleteAll();
  });

  afterAll(async()=> {
    await repository.disconnect();
  });

  it("The prato should be updated.", async () => {    
    const updated_itens = await service.execute({prato_id, pratoFileName});    

    expect(updated_itens).toBe(1);
  });  

  it("The img attribute should have the same name of the image.", async () => {    
    await service.execute({prato_id, pratoFileName});    

    const prato = await repository.getById({id: prato_id});    

    expect(prato.img).toEqual(pratoFileName);
  });  
});