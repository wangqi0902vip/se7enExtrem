class Style {

  constructor() {
    this.transform = null;
    this.rectangle = null;
    this.texture = {};
  }

  isDigit(value) {
    let patrn = /^[0-9]*$/;
    value = value.replace('.','');
    if (patrn.exec(value) === null || value === "") {
      return false
    } else {
      return true
    }
  }

  toStyle(obj) {
    [this.transform, this.rectangle, this.texture] = [obj.transform, obj.rectangle, obj.texture];
    let temp = {};
    temp.left = this.rectangle.x;
    temp.top = this.rectangle.y;
    temp.width = this.rectangle.width;
    temp.height = this.rectangle.height;
    // temp.transform = "matrix(" + this.transform.localTransform.toCssArray() +")";
    Object.assign(temp,this.texture.style);
    let self = this;
    return new Proxy(temp,{
      get(target, key){
        return target[key];
      },
      set(target,key,value){
        if(self.isDigit(value)){
          self.texture.style[key] = parseFloat(value)
        }else {
          self.texture.style[key] = value
        }
        return true;
      }
    });
  }

  toTransfrom(obj){
    let temp = {};
    temp.transform = "matrix(" + obj.transform.localTransform.toCssArray() +")";
    return temp;
  }

  toJson(obj){
  }

}
export {Style}
