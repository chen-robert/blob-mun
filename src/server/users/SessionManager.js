import crypto from "crypto";

class SessionManager {
  constructor(){
    this.state = {
      sessToId: new Map(),
      idToSess: new Map()
    }
  }
  generateSessId(id) {
    if(idToSess.has(id))return idToSess.get(id);
    const sessId = generateId();
    
    idToSess.set(id, sessId);
    sessToId.set(sessId, id);
  }
  getIdFromSess(sessId) {
    return sessToId.get(sessId);
  }
  generateId(size=256){
    return crypto.randomBytes(size).toString("base64");
  }
}

const sessionManagerInst = new SessionManager();

export default sessionManagerInst;