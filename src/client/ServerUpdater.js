import axios from "axios";

class ServerUpdater{
  constructor(){
    this.state = {
      prevState: {}
    }
  }
  updateServer(state){
    if(this.state.prevState !== state){
      axios.post("/save", {
        state: JSON.stringify(state)
      }).catch((error) => console.error(error));
    }
    this.state.prevState = state;
    
  }
}

const serverUpdaterInst = new ServerUpdater();

export default serverUpdaterInst;