import express from "express";
import Joi from "joi";
import path from "path";

import Validator from "./db/users";

const PORT = process.env.PORT || 3000;

const app = express();

console.log(`Root at ${global.__rootdir}`);
app.use(express.static(path.join(global.__rootdir, "dist")));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const signUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

app.post("/login", (req, res) => {
  
});

app.post("/signup", (req, res) => {
  const ret = Joi.validate(req.body, signUpSchema, {allowUnknown: false});
  
  if(ret.error){
    return res.status(400).end(ret.error.toString());
  }
  const data = ret.value;
  Validator.addUser(data.username, data.email, data.password, (error, data) => {
    if(error){
      return res.status(400).end(error);
    }
    return res.send("Yay");
  });

});

app.get("/login", (req, res) => {
  res.sendFile(path.join(global.__rootdir, "dist/index.html"));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));