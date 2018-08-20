class SpeakingStats{
  constructor(rooms){
    this.rooms = rooms;
  }
  initName(dataObj, name) {
    const data = {};
    this.rooms.forEach((room) => data[room] = 0);
    
    dataObj[name] = data;
  }
  applyDelta(dataObj, name, room, delta){
    if(!name)return dataObj;
    if(!dataObj.hasOwnProperty(name))this.initName(dataObj, name);
    
    const newTime = dataObj[name][room] + delta;
    return {...dataObj,
      [name]: {...dataObj[name],
        [room]: newTime
      }
    }
  }
}

export default SpeakingStats;