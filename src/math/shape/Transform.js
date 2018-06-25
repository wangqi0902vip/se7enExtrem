class Transform {
  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
  }

  get scaleX() {
    return this._scaleX;
  }

  set scaleX(value) {
    this._scaleX = value;
  }

  get scaleY() {
    return this._scaleY;
  }

  set scaleY(value) {
    this._scaleY = value;
  }

  get rotation() {
    return this._rotation;
  }

  set rotation(value) {
    this._rotation = value;
  }

  get skewX() {
    return this._skewX;
  }

  set skewX(value) {
    this._skewX = value;
  }

  get skewY() {
    return this._skewY;
  }

  set skewY(value) {
    this._skewY = value;
  }

  get regX() {
    return this._regX;
  }

  set regX(value) {
    this._regX = value;
  }

  get regY() {
    return this._regY;
  }

  set regY(value) {
    this._regY = value;
  }

  constructor(x = 0, y = 0, scaleX = 0, scaleY = 0, rotation = 0, skewX = 0, skewY = 0, regX = 0, regY = 0) {
    this._x = x;
    this._y = y;
    this._scaleX = scaleX;
    this._scaleY = scaleY;
    this._rotation = rotation;
    this._skewX = skewX;
    this._skewY = skewY;
    this._regX = regX;
    this._regY = regY;
  }

  toJson(){
    return []
  }


}

export {Transform}
