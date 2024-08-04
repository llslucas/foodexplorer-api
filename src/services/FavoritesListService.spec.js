import UserRepository from "../repositories/UserRepository.js";
import PratosRepository from "../repositories/PratosRepository.js";
import FavoritesRepository from "../repositories/FavoritesRepository.js";
import FavoritesListService from "./FavoritesListService.js";

describe("FavoritesListService", () => {
  /** @type UserRepository */
  let userRepository = null;

  /** @type PratosRepository */
  let pratosRepository = null;

  /** @type FavoritesRepository */
  let favoritesRepository = null;

  /** @type FavoritesListService */
  let favoritesListService = null;

  let user_id = null;
  let prato_id = null;

  beforeAll(async () => {
    userRepository = new UserRepository();
    pratosRepository = new PratosRepository();
    favoritesRepository = new FavoritesRepository();
    favoritesListService = new FavoritesListService(favoritesRepository);   
    await pratosRepository.deleteAll(); 
    await userRepository.deleteAll();
  });

  beforeEach(async () => {
    const user = {
      name: "User Creation Test",
      email: "creation@test.com",
      password: "1234"
    };      
    user_id = await userRepository.create(user);

    var newPrato = {
      name: "Prato Teste", 
      description: "Um prato criado para fins de teste.", 
      category: "Teste", 
      price: 99.99, 
      ingredientes: ["Ingrediente 1", "Ingrediente 2", "Ingrediente 3", "Ingrediente 4"],
    };

    prato_id = await pratosRepository.create(newPrato);
  })

  afterEach(async () => {
    await pratosRepository.deleteAll(); 
    await userRepository.deleteAll();
  });

  afterAll(async () => {
    await pratosRepository.disconnect();
    await userRepository.disconnect();
    await favoritesRepository.disconnect();
  });

  it("No favorites should be returned before the toogle.", async() => {
    const favorites = await favoritesListService.execute({user_id});

    expect(favorites).toHaveLength(0);
  });

  it("The favorite should be returned after the toogle.", async() => {
    await favoritesRepository.toogleFavorite({user_id, prato_id});

    const favorites = await favoritesListService.execute({user_id});

    expect(favorites).toHaveLength(1);
  });

  it("The favorite ID returned after the toogle should be equal as the toogled prato_id.", async() => {
    await favoritesRepository.toogleFavorite({user_id, prato_id});

    const [favorites] = await favoritesListService.execute({user_id});

    expect(favorites).toBe(prato_id);
  });


})