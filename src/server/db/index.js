import {Client} from "pg";
import bcrypt from "bcrypt";

const connectionString = "postgresql://postgres:nike@localhost:5432/postgres";
const client = new Client({connectionString});
client.connect();

export const addUser = (name, email, password, callback) => {
  client.query("SELECT * FROM users WHERE username = $1", [name], (err, res) => {
    if(err) {
      console.error(err);
      return callback("Unknown error");
    }
    if(res.rows.length > 0){
      return callback("Username already exists");
    }
    
    client.query("SELECT * FROM users WHERE email = $1", [email], (err, res) => {
      if(err) {
        console.error(err);
        return callback("Unknown error");
      }
      if(res.rows.length > 0){
        return callback("Email already exists");
      }
      
      bcrypt.hash(password, 10, (err, hash) => {
        if(err) {
          console.error(err);
          return callback("Unknown error");
        }
        client.query("INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *", [name, email, hash], (err, res) => {
          if(err) {
            console.error(err);
            return callback("Unknown error");
          }
          
          return callback();
        });
      });
    });
  });
  callback();
}
export const checkLogin = (name, password, callback) => {
  client.query("SELECT * FROM users WHERE username = $1", [name], (err, res) => {
    if(err) {
      console.error(err);
      return callback("Unknown error");
    }
    if(res.rows.length === 0){
      return callback("Username does not exist");
    }
    if(res.rows.length !== 1){
      console.error(`Multiple entries for username ${name}`);
      return callback("Unknown error");
    }
    const data = res.rows[0];
    bcrypt.compare(password, data.password, (err, res) => {
      if(err) {
        console.error(err);
        return callback("Unknown error");
      }
      if(!res){
        return callback("Invalid password")
      }
      return callback(null, {id: data.id});
    });
  });
}  
export const saveState = (id, data, callback) => {
  client.query("DELETE FROM data WHERE user_id = $1", [id])
  .then(() => 
    client.query("INSERT INTO data(user_id, data) VALUES($1, $2) RETURNING *", [id, data], (err, res) => {
      if(err) {
        console.error(err);
        return callback("Unknown error");
      }
      return callback();    
    })
  )
}

export const getSaveData = (id, callback) => {
  client.query("SELECT * FROM data WHERE user_id = $1", [id], (err, res) => {
    if(err) {
      console.error(err);
      return callback("Unknown error");
    }
    if(res.rows.length === 0){
      return callback(null, {data: null});
    }
    const data = res.rows[0];
    return callback(null, {data: data.data});    
  });
  
}