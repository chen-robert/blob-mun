import Joi from "joi";

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const loginRoute = (req, res) => {
  const ret = Joi.validate(req.body, userSchema, {allowUnknown: false});
  
  if(ret.error){
    return res.status(400).end(ret.error.toString());
  }
  const data = ret.value;
  Validator.checkLogin(data.username, data.password, (error, data) => {
    if(error){
      return res.status(400).end(error);
    }
    return res.send("Login Successful");
  });
  
}

export default loginRoute;