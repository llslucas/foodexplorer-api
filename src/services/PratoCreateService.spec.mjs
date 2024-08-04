import PratosRepository from "../repositories/PratosRepository";
import AppError from "../utils/AppError";
import PratoCreateService from "./PratoCreateService";

describe("PratoCreateService", () => {
  /** @type {PratosRepository} */
  let repository = null;

  /** @type {PratoCreateService} */
  let pratoCreateService = null;

  beforeAll(async () => {
    repository = new PratosRepository();
    pratoCreateService = new PratoCreateService(repository);

    await repository.deleteAll();
  });

  afterEach( async () => {
    await repository.deleteAll();
  })

  afterAll( async () => {
    await repository.disconnect();
  })

  it("The Prato should be created with the designed information.", async () => {
    var newPrato = {
      name: "Prato Teste", 
      description: "Um prato criado para fins de teste.", 
      category: "Teste", 
      price: 99.99, 
      ingredientes: ["Ingrediente 1", "Ingrediente 2", "Ingrediente 3", "Ingrediente 4"],
    }

    const prato_id = await pratoCreateService.execute(newPrato);
    const {name, description, category, price, ingredientes} = await repository.getById({id: prato_id});  

    expect(newPrato).toStrictEqual({name, description, category, price, ingredientes});    
  });

  it("The attempt to create a Prato with a name that already exists shoud trhow an App Error", async () => {
    var prato1 = {
      name: "Prato Teste", 
      description: "Um prato criado para fins de teste.", 
      category: "Teste", 
      price: 99.99, 
      ingredientes: ["Ingrediente 1", "Ingrediente 2", "Ingrediente 3", "Ingrediente 4"],
    }

    var prato2 = {
      name: "Prato Teste", 
      description: "Um segundo prato criado para fins de teste.", 
      category: "Teste 2", 
      price: 22.22, 
      ingredientes: ["Ingrediente 5", "Ingrediente 6", "Ingrediente 7", "Ingrediente 8"],
    }

    await pratoCreateService.execute(prato1);
    await expect(pratoCreateService.execute(prato2)).rejects.toEqual(new AppError("Já existe um prato com este mesmo nome."));    

  })

});