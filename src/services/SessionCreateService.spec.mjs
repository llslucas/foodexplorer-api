import UserRepository from "../repositories/UserRepository.js";
import SessionCreateService from "../services/SessionCreateService.js";
import AppError from "../utils/AppError.js";

import bcryptjs from 'bcryptjs';
const { hash } = bcryptjs;

describe("SessionCreateService", () =>{
  /** @type {UserRepository} */
  let repository = null;

  /** @type {SessionCreateService} */
  let sessionCreateService = null;

  beforeAll( async() => {
    repository = new UserRepository();        
    sessionCreateService = new SessionCreateService(repository); 
    await repository.deleteAll();
  });  

  beforeEach( async() => {
    await repository.create({name: 'User Test 1', email: "test@user.com", role:"user", password: await hash("1234", 8)});    
  });

  afterEach( async() => {
    await repository.deleteAll(); 
  });

  afterAll( async () => { 
    await repository.disconnect();
  });

  it("The session should be created if email and password are correct.", async () => {
    const userLogin = {
      email: "test@user.com",
      password: "1234"
    }

    const sessionData = await sessionCreateService.execute(userLogin);

    expect(sessionData).toBeDefined();    
  });

  it("Creation of a session with wrong email should return an AppError", async () => {
    const userLogin = {
      email: "wrong@user.com",
      password: "1234"
    }    

    await expect(sessionCreateService.execute(userLogin)).rejects.toEqual(new AppError("Usuário e/ou senha incorreta", 401));    
  });

  it("Creation of a session with wrong password should return an AppError", async () => {
    const userLogin = {
      email: "test@user.com",
      password: "wrong"
    }    

    await expect(sessionCreateService.execute(userLogin)).rejects.toEqual(new AppError("Usuário e/ou senha incorreta", 401));    
  });

});