import {Resource, resourceId, setResourceId} from "./Resource";

class ResourceManager {

  constructor(obj) {
    this.list = [];
    this.version = obj.version||"";
    this._RA = false;
    obj.list.map((value) => {
      setResourceId(resourceId < value.id ? value.id : resourceId+1);
      this.add(value);
    })
  }

  add(obj) {
    let temp = this.pack(obj);
    this.list.push(temp);
    return temp;
  }

  pack(obj) {
    return new Resource(obj, this._RA);
  }

  getIndex(obj) {
    return this.list.indexOf(obj);
  }

  remove(id) {
    this.list.splice(this.getIndex(this.getResourceById(id)), 1);
  }

  getResourceById(id) {
    return this.list.find(value => {
      return value.id === id;
    })
  }

  update(resource) {

  }

  changeStatus(isEditing) {
    this._RA = isEditing;
    this.list.map(value=>{
      value._RA = isEditing;
    })
  }

  toJson() {
    let arr = [];
    this.list.map(value=>{
      arr = [...arr,value.toJson()];
    });
    return Object.assign({},{version:this.version,list:arr});
  }
}

export {ResourceManager}
