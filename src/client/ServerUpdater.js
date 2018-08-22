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
      })
      .then(() => console.log("Saved"))
      .catch((error) => null);
    }
    this.state.prevState = state; 
  }
  loadData(callback){
    axios.get("/load")
    .then((data) => callback(null, data))
    .catch((error) => callback(error));
  }
}

const serverUpdaterInst = new ServerUpdater();

export default serverUpdaterInst;