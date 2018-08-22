import Joi from "joi";

import {getSaveData} from "server/db";
import SessionManager from "server/users/SessionManager";

const loadSchema = Joi.object({
  sessId: Joi.string().required()
});

const loadRoute = (req, res) => {
  const {sessId} = req.cookies;
  const combined = Object.assign({}, {sessId}, req.body);
  const ret = Joi.validate(combined, loadSchema, {allowUnknown: false});
  
  if(ret.error){
    return res.status(400).end(ret.error.toString());
  }
  const data = ret.value;
  const id = SessionManager.getIdFromSess(data.sessId);

  getSaveData(id, (error, data) => {
    if(error)return res.status(400).end(error);
    
    return res.send(data.data);
  });
      
}

export default loadRoute;