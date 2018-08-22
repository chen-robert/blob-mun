import Joi from "joi";

import {saveState} from "server/db";
import SessionManager from "server/users/SessionManager";

const saveStateSchema = Joi.object({
  sessId: Joi.string().required(),
  state: Joi.string().required(),
});

const saveStateRoute = (req, res) => {
  const {sessId} = req.cookies;
  const combined = Object.assign({}, {sessId}, req.body);
  const ret = Joi.validate(combined, saveStateSchema, {allowUnknown: false});
  
  if(ret.error){
    return res.status(400).end(ret.error.toString());
  }
  const data = ret.value;
  const id = SessionManager.getIdFromSess(data.sessId);

  saveState(id, data.state, (error, data) => {
    if(error)return res.status(400).end(error);
    
    return res.send("Saved");
  });
      
}

export default saveStateRoute;