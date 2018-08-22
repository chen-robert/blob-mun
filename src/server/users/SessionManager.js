import crypto from "crypto";

class SessionManager {
  constructor(){
    this.state = {
      sessToId: new Map(),
      idToSess: new Map()
    }
  }
  generateSessId(id) {
    const {sessToId, idToSess} = this.state;
    if(idToSess.has(id))return idToSess.get(id);
    const sessId = this.generateId();
    
    
    idToSess.set(id, sessId);
    sessToId.set(sessId, id);
    
    return sessId;
  }
  getIdFromSess(sessId) {
    return this.state.sessToId.get(sessId);
  }
  generateId(size=32){
    return crypto.randomBytes(size).toString("hex");
  }
}

const sessionManagerInst = new SessionManager();

export default sessionManagerInst;