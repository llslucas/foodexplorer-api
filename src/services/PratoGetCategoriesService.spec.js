import PratosRepository from "../repositories/PratosRepository";
import PratoGetCategories from "./PratoGetCategoriesService";

describe("PratoGetCategoriesService", () => {
  /** @type PratosRepository */
  let repository = null;

  /** @type PratoGetCategories */
  let service = null;

  beforeAll(async() => {
    repository = new PratosRepository();
    service = new PratoGetCategories(repository);

    await repository.deleteAll();
  });

  beforeEach(async() => {
    var newPrato = {
      name: "Prato Teste", 
      description: "Um prato criado para fins de teste.", 
      category: "Categoria 1", 
      price: 99.99, 
      ingredientes: ["Ingrediente 1", "Ingrediente 2"],
    }

    await repository.create(newPrato);

    var newPrato2 = {
      name: "Teste Pesquisa", 
      description: "Um prato criado para fins de teste.", 
      category: "Categoria 2", 
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
  });

  it("The search should return all categories in a Array", async () => {
    const categories = await service.execute();

    expect(categories).toStrictEqual(["Categoria 1", "Categoria 2"])
  });

});
