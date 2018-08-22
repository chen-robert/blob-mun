import Joi from "joi";
import SessionManager from "server/users/SessionManager"

const sessIdSchema = Joi.object({
  sessId: Joi.string().required()
});

const requireAuth = (redirect) => (req, res, next) => {
  const ret = Joi.validate(req.cookies, sessIdSchema, {allowUnknown: true});
  
  if(ret.error || !SessionManager.getIdFromSess(ret.value.sessId)){
    if(redirect)return res.redirect("/login");
    return res.status(400).end("Invalid session");
  }
  return next();
}

export default requireAuth;