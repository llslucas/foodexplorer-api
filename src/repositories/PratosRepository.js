import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";

export default class PratosRepository{
  async disconnect(){
    knex.destroy();
  };

  /**
   * 
   * @param {{name: String, description: String, category:String, price: number, ingredientes: String[]}} new_prato 
   * @returns {Promise<number>} prato_id
   */
  async create({ name, description, category, price, ingredientes }){
    const [prato_id] = await knex("pratos").insert({
      name,
      description,
      category,
      price      
    }); 
    
    await this.InsertIngredientes({prato_id, ingredientes});

    return prato_id;
  };

  /**
   * 
   * @param {{id:number, name: String, description: String, category:String, price: number, ingredientes: String[]}} new_prato 
   * @returns {Promise<number>} updated_itens
   */
  async update({id, name, description, category, price, ingredientes}){
    const updated_itens = await knex("pratos").update({
      name,
      description,
      category,
      price
    }).where({id});

    if(ingredientes){      
      await knex("ingredientes").where({prato_id: id}).del();  
      await this.InsertIngredientes({prato_id: id, ingredientes});
    }

    return updated_itens;
  };

  /**
   * 
   * @param {{id:number, img: String}} new_prato 
   * @returns {Promise<number>} updated_itens
   */
  async updateImg({id, img}){
    const updated_itens = await knex("pratos").update({
      img,
    }).where({id}); 

    return updated_itens;
  }

  /**
   * 
   * @param {{id: number}} id
   * @returns {Promise<number>} deleted_itens
   */
  async delete({id}){
    await knex("ingredientes").where({prato_id: id}).delete();

    const deleted_itens = await knex("pratos").where({id}).delete();

    return deleted_itens;
  };  

  /**
   * 
   * @param {{id: number}} id
   * @returns {Promise<{name: String, description: String, category:String, price: number, img: String, created_at: any, updated_at: any, ingredientes: String[]}>}} prato
   */
  async getById({id}){
    const prato = await knex("pratos").where({id}).first();   

    if(!prato){
      return
    }    

    const ingredientes = await knex("ingredientes").select("name").where({prato_id: id});   
    const ingredientesArray = ingredientes.map(ing => ing.name);    

    return {...prato, ingredientes: ingredientesArray};
  }

  /**
   * 
   * @param {{name: String}} name
   * @returns {Promise<{name: String, description: String, category:String, price: number, img: String, created_at: any, updated_at: any, ingredientes: String[]}>}} prato
   */
  async getByName({name}){
    const prato = await knex("pratos").where({name}).first();

    if(!prato){
      return
    }

    const ingredientes = await knex("ingredientes").select("name").where({prato_id: prato.id});   
    const ingredientesArray = ingredientes.map(ing => ing.name);    

    return {...prato, ingredientes: ingredientesArray};
  }

  /**
   * 
   * @param {{name: String, ingredient: String}} name
   * @returns {promise<[]>} pratos
   */
  async search({ searchParameter }){
    const pratos = await knex("pratos")
      .select(["pratos.id", "pratos.name", "pratos.description", "pratos.price", "pratos.img", "pratos.category"])
      .whereLike("pratos.name", `%${searchParameter}%`)
      .orWhereLike("ingredientes.name", `%${searchParameter}%`)      
      .innerJoin("ingredientes", "ingredientes.prato_id", "pratos.id")      
      .groupBy("pratos.id")
      .orderBy(["pratos.category", "pratos.name"])
      
    return pratos;
  }    

  async getCategories(){
    const categories = await knex("pratos")
      .select(["pratos.category"])
      .groupBy("pratos.category");

    return categories;
  }

  /**
   * 
   * @param {{prato_id: number, ingredientes: String[]}} ingredientes 
   */
  async InsertIngredientes({prato_id, ingredientes}){
    const ingredientesInsert = ingredientes.map(ing => {
      return {
        prato_id,
        name: ing
      }
    })

    await knex("ingredientes").insert(ingredientesInsert);
  }

  async deleteAll(){
    if(process.env.NODE_ENV === "test"){
      await knex("ingredientes").delete();
      await knex("favoritos").delete();
      await knex("pratos").delete();
    }else{
      throw Error("Essa função só pode ser executada em ambiente de testes.");
    }
  } 
}