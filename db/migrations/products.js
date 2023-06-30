exports.up = function (knex) {
    return knex.raw(`
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            nome TEXT NOT NULL,
            plantada_no TEXT NOT NULL,
            plantada_na_data DATE NOT NULL
        );

        CREATE TABLE etapas (
            id SERIAL PRIMARY KEY,
            product_id integer REFERENCES products (id),
            descricao TEXT NOT NULL,
            media_url TEXT NOT NULL
        );
    `);
};
