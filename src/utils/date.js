const DateUtils = {
  testStr: (str) => {
    return str === "" || 
      (/^[:|\d]+$/.test(str) && str.indexOf(":") === str.lastIndexOf(":"))
  },
  parseStr: (str) => {    
    str = str.toString();
    
    if(!DateUtils.testStr(str))return NaN;
    
    if(str === "")return NaN;
    
    if(str.indexOf(":") !== -1){
      let parts = str.split(":");
      parts = parts.map((str) => str === ""? "0": str);
      
      return 60 * Number.parseInt(parts[0]) + Number.parseInt(parts[1]);
    }else{
      return Number.parseInt(str);
    }
  }
}

export default DateUtils;