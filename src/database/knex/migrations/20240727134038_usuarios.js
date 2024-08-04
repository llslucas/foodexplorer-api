/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("usuarios", table => {
    table.bigIncrements("id");
    table.text("name");
    table.text("email");    
    table.text("password");
    table.enum("role", ["admin", "user"], { useNative: true, enumName: "roles" }).notNullable().defaultTo("user");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("usuarios");
}
