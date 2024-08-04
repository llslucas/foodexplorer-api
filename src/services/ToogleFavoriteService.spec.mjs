import UserRepository from "../repositories/UserRepository";
import PratosRepository from "../repositories/PratosRepository";
import FavoritesRepository from "../repositories/FavoritesRepository";
import ToogleFavoriteService from "./ToogleFavoriteService";
import AppError from "../utils/AppError";
import PratoCreateService from "./PratoCreateService";

describe("ToogleFavoriteService", () => {
  /** @type UserRepository */
  let userRepository = null;

  /** @type PratosRepository */
  let pratosRepository = null;

  /** @type FavoritesRepository */
  let favoritesRepository = null;

  /** @type ToogleFavoriteService */
  let toogleFavoriteService = null;

  let user_id = null;
  let prato_id = null;

  beforeAll(async () => {
    userRepository = new UserRepository();
    pratosRepository = new PratosRepository();
    favoritesRepository = new FavoritesRepository();
    toogleFavoriteService = new ToogleFavoriteService(favoritesRepository);   
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

  it("If the Prato doesn't exist an AppError should be throwed.", async() => {
    await expect(toogleFavoriteService.execute({user_id, prato_id: 0})).rejects.toEqual(new AppError("O prato não existe."));
  });

  it("The first execution should return true.", async() => {
    const result = await toogleFavoriteService.execute({user_id, prato_id});

    expect(result).toBe(true);
  });

  it("The second execution should return false.", async() => {
    await toogleFavoriteService.execute({user_id, prato_id});
    const result = await toogleFavoriteService.execute({user_id, prato_id});

    expect(result).toBe(false);
  });
});