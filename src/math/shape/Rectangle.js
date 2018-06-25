/**
 * Author se7en.
 */
import {Point} from "./Point";

/**
 * rect类
 */
class Rectangle {
  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value*1;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value*1;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value*1;
  }

  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value*1;
  }

    constructor({x: x = 0, y: y = 0, width: width = 0, height: height = 0}) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this.name = "polygon"
    }

    /**
     *返回水平中线
     * @returns {*}
     */
    get plane() {
        return this.y + this.height / 2;
    }

    set plane(value) {
        this.y = value - this.height / 2
    }

    /**
     * 返回垂直中线
     * @returns {*}
     */
    get vertical() {
        return this.x + this.width / 2;
    }

    set vertical(value) {
        this.x = value - this.width / 2;
    }

    /**
     * 返回顶点集合
     * @returns {[null,null,null,null]}
     */
    get points() {
        return [
            new Point(this.x, this.y),
            new Point(this.x + this.width, this.y),
            new Point(this.x + this.width, this.y + this.height),
            new Point(this.x, this.y + this.height)
        ]
    }


    set({x: x = 0, y: y = 0, width: width = 0, height: height = 0}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    toJson() {
        return [this.x, this.y, this.width, this.height];
    }
}

export {Rectangle}
