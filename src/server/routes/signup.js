import Joi from "joi";
import {addUser} from "server/db";

const signUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const signupRoute = (req, res) => {
  const ret = Joi.validate(req.body, signUpSchema, {allowUnknown: false});
  
  if(ret.error){
    return res.status(400).end(ret.error.toString());
  }
  const data = ret.value;
  addUser(data.username, data.email, data.password, (error, data) => {
    if(error){
      return res.status(400).end(error);
    }
    return res.end("Signup Successful");
  });
}

export default signupRoute;