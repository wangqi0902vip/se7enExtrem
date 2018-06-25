import {Container} from "./Container";

class Stage extends Container {

  constructor(obj) {
    super(obj);
    this.modelId = obj.modelId||0;
    this.source = {
      id: obj.source === undefined?-1:obj.source.id,
      type: 0
    };
    this.rectangle.set({
      x: 0,
      y: 0,
      width: obj.width === 0 ? 1920 : obj.width,
      height: obj.height === 0 ? 1080 : obj.height
    })
  }

  toJson() {
    let stage = Object.assign({
      width: this.rectangle.width,
      height: this.rectangle.height,
      modelId:this.modelId,
      source:this.source,
      animationList:this.animationManager.toJson(),
      actionList:this.actionManager.toJson(),
    }, super.toJson());
    return {
      "version": "0.0.1",
      "isEdited": true,
      "pages": [
        stage
      ]
    }
  }

  getComponentById(id){
    if(id === this.id) return this;
    return super.getDescentById(id);
  }

}

export {Stage}
