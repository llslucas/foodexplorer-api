import PratosRepository from "../repositories/PratosRepository.js";
import PratoDeleteService from "./PratoDeleteService.js";
import AppError from "../utils/AppError.js";

describe("PratoUpdateService", () => {
  /** @type {PratosRepository} */
  let repository = null;

  /** @type {PratoDeleteService} */
  let pratoDeleteService = null;

  beforeAll(async () => {
    repository = new PratosRepository();
    pratoDeleteService = new PratoDeleteService(repository);

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

  it("The Prato should be deleted.", async () => {    
    const prato = await repository.getByName({name: "Prato Teste"});

    await repository.delete({id: prato.id});

    const deleted_prato = await repository.getById({id: prato.id});

    expect(deleted_prato).toBeUndefined();    
  });

  it("The number of deleted Pratos should aways be 1", async () => {
    const prato = await repository.getByName({name: "Prato Teste"});

    await expect(repository.delete({id: prato.id})).resolves.toBe(1);  
  })

});