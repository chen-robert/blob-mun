import Joi from "joi";
import {checkLogin} from "server/db";
import SessionManager from "server/users/SessionManager";

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
  checkLogin(data.username, data.password, (error, data) => {
    if(error){
      return res.status(400).end(error);
    }
    const sessId = SessionManager.generateSessId(data.id);
    
    res.cookie("sessId", sessId, {maxAge: 9e5, httpOnly: true});
    return res.send("Login Successful");
  });
  
}

export default loginRoute;