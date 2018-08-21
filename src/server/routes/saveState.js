import Joi from "joi";

import stateSaver from "server/db/saveState";
import SessionManager from "server/users/SessionManager";

const saveStateSchema = Joi.object({
  sessId: Joi.number().required(),
  state: Joi.string().required(),
});

const saveStateRoute = (req, res) => {
  const combined = Object.assign({}, req.cookies, req.body);
  const ret = Joi.validate(combined, saveStateSchema, {allowUnknown: false});
  
  if(ret.error){
    return res.status(400).end(ret.error.toString());
  }
  const data = ret.value;
  const id = SessionManager.getIdFromSess(data.sessId);
  
  if(id){
    stateSaver.saveState(id, data.state, (error, data) => {
      if(error)return res.status(400).end(error);
      
      return res.send("Signup Successful");
    });
    
  }else{
    return res.status(400).end("Invalid Session");
  }
  
}

export default saveStateRoute;