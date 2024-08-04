import config from '../../../knexfile.js';
import knex from 'knex';

const connection = {
  development: knex(config.development),
  test: knex(config.test)
}

/** 
 * @returns {knex.Knex} connection
 */
function connect(){
  const env = process.env.NODE_ENV ?? "development";  

  if(!connection.hasOwnProperty(env)){      
    throw Error(`O Ambiente ${env} não existe ou não foi configurado no knex.`);
  }        
  
  return connection[env];
}

export default connect();