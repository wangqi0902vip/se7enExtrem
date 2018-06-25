import {Action} from "./Action";
import {ObservablePoint} from "../math/dataType/ObservablePoint";

class ActionItem {

  constructor({sourceId:sourceId,eventType:eventType,actions:actions=[]}) {
    this.sourceId = sourceId;
    this.eventType = eventType;
    this.actions = [];
    actions.map((value)=>{
      this.add(value);
    })
  }

  pack(obj){
    return new Action(obj);
  }

  add(obj){
    let temp = this.pack(obj);
    this.actions.push(temp);
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
    this.actions.map(value=>{
      if(value.equal(obj)){
        this.actions.splice(this.actions.indexOf(value),1);
      }
    })
  }

  toJson(){
    let temp = [];
    this.actions.map(value=>{
      temp.push(value.toJson());
    });
    return{
      sourceId:this.sourceId,
      eventType:this.eventType,
      actions:temp
    }
  }

}

export {ActionItem}
