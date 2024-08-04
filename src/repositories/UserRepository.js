import knex from "../database/knex/index.js";

export default class UserRepository{
  async disconnect(){
    knex.destroy();
  };

  /**
   * 
   * @param {{name: String, email: String, password: String}} user
   * @returns {Promise<number>} user_id
   */
  async create({ name, email, password }){
    const [user_id] = await knex("usuarios").insert({
      name,
      email,
      password
    });

    return user_id;
  };

  /**
   * 
   * @param {{ id: number, name: String, email: String, password: String, role: String }} updated_user
   * @returns {Promise<number>} updated_users
   */
  async update({ id, name, email, role, password }){   
    const updated = await knex("usuarios").update({
      name,
      email,
      role,
      password
    }).where({id});  
    
    return updated;
  };

  /**
   * 
   * @param {String} email 
   * @returns {Promise<{ id: number, name: String, email: String, password: String, role: String, created_at, updated_at }>} user
   */
  async findByEmail(email){    
    const user = await knex("usuarios").where({email}).first();
    return user;
  };

  /**
   * 
   * @param {number} id 
   * @returns {Promise<{ id: number, name: String, email: String, password: String, role: String, created_at, updated_at }>} user
   */
  async findById(id){    
    const user = await knex("usuarios").where({id}).first();
    return user;
  };
  
  async deleteAll(){
    if(process.env.NODE_ENV === "test"){
       await knex("usuarios").delete();
    }else{
      throw Error("Essa função só pode ser executada em ambiente de testes.");
    }
  };
}