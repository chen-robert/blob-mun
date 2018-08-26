import { Client } from "pg";
import bcrypt from "bcrypt";
import { connectionString } from "./config";

const client = new Client({ connectionString });
client.connect();

const handleError = (err, callback) => {
  console.error(err);
  callback("Unknown error");
}
export const addUser = (name, email, password, callback) => {
  client.query(
    "SELECT * FROM users WHERE username = $1",
    [name]
  )
  .then(res => {
    if (res.rows.length > 0) {
      return callback("Username already exists");
    }
    return client.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
  })
  .then(res => {
    if (res.rows.length > 0) {
      return callback("Email already exists");
    }

    return bcrypt.hash(password, 10);
  })
  .then(hash => client.query(
    "INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *",
    [name, email, hash]
  ))
  .then(() => callback())
  .catch(err => handleError(err, callback));
}
export const checkLogin = (name, password, callback) => {
  let data;
  client.query(
    "SELECT * FROM users WHERE username = $1",
    [name]
  )
  .then((res) => {
      if (res.rows.length === 0) {
        return callback("Username does not exist");
      }
      if (res.rows.length !== 1) {
        console.error(`Multiple entries for username ${name}`);
        return callback("Unknown error");
      }
      data = res.rows[0];
      return bcrypt.compare(password, data.password);
  })
  .then(res => {
    if (!res) {
      return callback("Incorrect password");
    }
    return callback(null, { id: data.id });
  })
  .catch(err => handleError(err, callback));
};
export const saveState = (id, data, callback) => {
  client.query("DELETE FROM data WHERE user_id = $1 RETURNING *", [id])
  .then(() =>
    client.query(
      "INSERT INTO data(user_id, data) VALUES($1, $2) RETURNING *",
    [id, data])
  )
  .then(() => callback())
  .catch((err) => handleError(err, callback));
};

export const getSaveData = (id, callback) => {
  client.query("SELECT * FROM data WHERE user_id = $1", [id])
  .then((res) => {
    if (res.rows.length === 0) {
      return callback(null, { data: null });
    }
    const data = res.rows[0];
    return callback(null, { data: data.data });
  })
  .catch(err => handleError(err, callback));
};
