import {TEXTURE_TYPE} from '../config/dataConfig'

class Texture {
  get content() {
    return this._content;
  }

  set content(value) {
    this._content = value;
  }

  get type() {
    return TEXTURE_TYPE[this._type];
  }

  set type(value) {
    this._type = value;
  }

  get style() {
    return this._style;
  }

  set style(value) {
    this._style = value;
  }

  constructor({content: content = {}, type: type = -1, style: style = {}}) {
    this._content = content;
    this._type = type;
    this._style = style;
  }

  toJson() {
    let temp = {};
    for(let [key,value] of Object.entries(this.style)){
    }
    return {content: this.content, type: this._type, style: this.style};
  }
}

export {Texture}
