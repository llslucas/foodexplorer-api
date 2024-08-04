import PratosRepository from "../repositories/PratosRepository";
import PratoSearchService from "./PratoSearchService";

describe("PratoSearchService", () => {
  /** @type PratosRepository */
  let repository = null;

  /** @type PratoSearchService */
  let service = null;

  beforeAll(async() => {
    repository = new PratosRepository();
    service = new PratoSearchService(repository);

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

    await repository.create(newPrato);

    var newPrato2 = {
      name: "Teste Pesquisa", 
      description: "Um prato criado para fins de teste.", 
      category: "Teste", 
      price: 99.99, 
      ingredientes: ["Ingrediente 3", "Ingrediente 4"],
    }

    await repository.create(newPrato2);
  })

  afterEach(async() => {
    await repository.deleteAll();
  });

  afterAll(async()=> {
    await repository.disconnect();
  })

  it("The search by name should return a defined single result if a exact match exists.", async () => { 
    const searchName = "Prato Teste";

    const prato = await service.execute({searchParameter: searchName});

    expect(prato).toHaveLength(1);
  });

  it("The search by name should return all results that contais the search term.", async () => {   
    const searchName = "Teste";

    const prato = await service.execute({searchParameter: searchName});

    expect(prato).toHaveLength(2);
  });

  it("The search by name should return a empty result if the search term doesn't match.", async () => {   
    const searchName = "ZZZZZZZZZ";

    const prato = await service.execute({searchParameter: searchName});

    expect(prato).toHaveLength(0);
  });

  it("The search by ingredients should return a result if a exact match exists.", async () => {  
    const searchIngredient = "Ingrediente 1";

    const prato = await service.execute({searchParameter: searchIngredient});

    expect(prato).toHaveLength(1);
  });

  it("The search by ingredients should return all results that contains the search term.", async () => {  
    const searchIngredient = "Ingrediente";

    const prato = await service.execute({searchParameter: searchIngredient});    
    
    expect(prato).toHaveLength(2);
  });

  it("The search by ingredients should return a empty result if the search term doesn't match.", async () => {  
    const searchIngredient = "ZZZZZZZZ";

    const prato = await service.execute({searchParameter: searchIngredient});

    expect(prato).toHaveLength(0);
  });
});