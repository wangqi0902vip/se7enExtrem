import {AnimationUnit} from "./AnimationUnit";

class Animation {

  constructor({sourceId: sourceId, eventType: eventType, animations: animations}) {
    this.sourceId = sourceId;
    this.eventType = eventType;
    this.animations = this.animationPack(animations);
  }

  animationPack(arr) {
    let temp = [];
    arr.map(value => {
      temp.push(new AnimationUnit(value));
    });
    return temp;
  }

  pack(obj) {
    return new AnimationUnit(obj);
  }

  add(obj) {
    let temp = this.pack(obj);
    this.animations.push(temp);
    return temp;
  }

  equal(obj){
    return this.sourceId === obj.sourceId &&
      this.eventType === obj.eventType;
  }

  remove(obj){
    this._delete(obj);
  }

  _delete(obj){
    this.animations.map(value=>{
      if(value.equal(obj)){
        this.animations.splice(this.animations.indexOf(value),1);
      }
    })
  }

  toJson(){
    let temp = [];
    this.animations.map(value=>{
      temp.push(value.toJson());
    });
    return{
      sourceId:this.sourceId,
      eventType:this.eventType,
      animations:temp
    }
  }
}

export {Animation}
