import {Client} from "pg";
import async from "async";
import {connectionString} from "./config";

const client = new Client({connectionString});
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