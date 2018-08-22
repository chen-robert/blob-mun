const pg = require("pg");
const async = require("async");

const connectionString = "postgresql://postgres:nike@localhost:5432/postgres";
const client = new pg.Client({connectionString});
client.connect();

const queries = [
  "DROP TABLE users",
  "DROP TABLE data",
  "CREATE TABLE users(id SERIAL PRIMARY KEY, username character varying not null, email character varying not null, password character varying not null)",
  "CREATE TABLE data(user_id INTEGER UNIQUE PRIMARY KEY, data character varying not null)"
];

async.each(queries, 
  (query, callback) => {
    client.query(query, (err, res) => {
      console.log(err? err.stack: res.command);
      callback();
    })
  },
  (err) => {
    if(err) console.log(err);
    client.end();
  }
);