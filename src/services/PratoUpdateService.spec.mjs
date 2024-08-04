import PratosRepository from "../repositories/PratosRepository.js";
import PratoUpdateService from "./PratoUpdateService.js";
import AppError from "../utils/AppError.js";

describe("PratoUpdateService", () => {
  /** @type {PratosRepository} */
  let repository = null;

  /** @type {PratoUpdateService} */
  let pratoUpdateService = null;

  beforeAll(async () => {
    repository = new PratosRepository();
    pratoUpdateService = new PratoUpdateService(repository);

    await repository.deleteAll();
  });

  beforeEach(async () => {
    var newPrato = {
      name: "Prato Teste", 
      description: "Um prato criado para fins de teste.", 
      category: "Teste", 
      price: 99.99, 
      ingredientes: ["Ingrediente 1", "Ingrediente 2", "Ingrediente 3", "Ingrediente 4"],
    }

    repository.create(newPrato);
  })

  afterEach( async () => {
    await repository.deleteAll();
  })

  afterAll( async () => {
    await repository.disconnect();
  })

  it("The Prato should be updated with the designed information.", async () => {
    var updatedPrato = {
      name: "Prato atualizado", 
      description: "Um prato atualizado para fins de teste.", 
      category: "Atualizado", 
      price: 55.55, 
      ingredientes: ["Ingrediente 5", "Ingrediente 6", "Ingrediente 7", "Ingrediente 8"],
    }

    const prato = await repository.getByName({name: "Prato Teste"});
    updatedPrato.id = prato.id;

    await pratoUpdateService.execute(updatedPrato);

    const {id, name, description, category, price, ingredientes} = await repository.getById({id: prato.id});  
        
    expect(updatedPrato).toStrictEqual({id, name, description, category, price, ingredientes});    
  });

  it("An attempt to update a Prato that doesn't exist should return an AppError", async() => {
    var unknownPrato = {
      id: 0,
      name: "Um prato que não existe", 
      description: "Um prato inexistente para fins de teste.", 
      category: "Atualizado", 
      price: 55.55, 
      ingredientes: ["Ingrediente 5", "Ingrediente 6", "Ingrediente 7", "Ingrediente 8"],
    }

    await expect(pratoUpdateService.execute(unknownPrato)).rejects.toEqual(new AppError("O Prato não existe."));    
  });

});