let resourceId = 0;
function setResourceId(value) {
    resourceId=value;
}
function getResouceId() {
  return resourceId++;
}
class Resource {

  constructor(obj,bool) {
      this.id = obj.id === undefined?getResouceId():obj.id;
      this.ext = obj.ext;
      this.name = obj.name;
      this.host = obj.host;
      this.src = obj.src;
      this._RA = bool;
  }

  getAbsolutePath(){
    return this._RA?this.host + this.src.substr(1):'.'+this.src;
  }

  toJson(){
    return Object.assign({},{id:this.id,ext:this.ext,name:this.name,host:this.host,src:this.src});
  }

  change(obj){
    Object.assign(this,{ext:obj.ext,name:obj.name,host:obj.host,src:obj.src});
  }
}
export {Resource,resourceId,setResourceId}
