import {Point} from "./Point";

class Line {
    get c() {
        return this._c;
    }

    set c(value) {
        this._c = value;
    }

    /**
     * Ax+By+C=0
     */
    constructor() {
      this._a = 0;
      this._b = 0;
      this._c = 0;
      this._x = 0;
      this._y = 0;
    }

    getIntersection(line) {
        if((this.a*line.b - this.b*line.a)!==0){
            let intersect = new Point()
            intersect.x = (line.b*this.c-this.b*line.c)/((this.b*line.a-line.b*this.a)*(this.b*line.a-line.b*this.a))
            this.x = intersect.x;
            intersect.y = this.y;
            return intersect;
        }else {
            return null
        }

    }

    get x() {
        if (this.a === 0) return Infinity
        return -(this.b * this._y + this.c) / this.a
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        if (this.b === 0) return Infinity
        return -(this.a * this.x + this.c) / this.b
    }

    set y(value) {
        this._y = value;
    }

    setFromPoints(arr) {
        if (arr.length <= 0) {
            arr = [{x: 0, y: 0}, {x: 0, y: 0}]
        } else if (arr.length === 1) {
           arr.push({x:0,y:0})
        }
        this._fromTwoPoints(arr)
    }



    _fromTwoPoints(arr) {
        this.a = arr[1].y - arr[0].y;
        this.b = arr[0].x - arr[1].x;
        this.c = arr[1].x*arr[0].y - arr[1].y*arr[0].x;
    }

    get k() {
        return this.a;
    }

    set k(value) {
        this._key = value;
    }

    get a() {
        return this._a;
    }

    set a(value) {
        this._a = value;
    }

    get b() {
        return this._b;
    }

    set b(value) {
        this._b = value;
    }
}

export {Line}