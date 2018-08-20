import Joi from "joi";
import Validator from "server/db/users";

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
  Validator.addUser(data.username, data.email, data.password, (error, data) => {
    if(error){
      return res.status(400).end(error);
    }
    return res.send("Signup Successful");
  });
}

export default signupRoute;