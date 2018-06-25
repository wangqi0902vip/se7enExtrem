/**
 * Author se7en.
 */
/**
 * 非规则多边形碰撞算法SAT
 */
import {Vector} from "../shape/Vector";
import {Point} from "../shape/Point";
import {Circle} from "../shape/Circle";
import {Polygon} from "../shape/Polygon";
import {Rectangle} from "../shape/Rectangle";
import {Matrix} from "../dataType/Matrix";
import {Line} from "../shape/Line";

class SAT {

  constructor() {
    this.point = Point;
    this.vector = Vector;
    this.circle = Circle;
    this.polygon = Polygon;
    this.rectangle = Rectangle;
    this.matrix = Matrix;
    this.line = Line
  }
  /**
   * @param obj1
   * @param obj2
   * @returns {boolean}
   */
  sat(obj1, obj2) {
    let szaxis = [];
    if (obj1.name === "polygon") {
      szaxis = this.getUniqueAxis(obj1.points, szaxis);
    }
    if (obj2.name === "polygon") {
      szaxis = this.getUniqueAxis(obj2.points, szaxis);
    }
    if (obj1.name === "circle"&&obj2.name === "circle"){
      szaxis = [new this.vector(obj2.x-obj1.x,obj2.y-obj1.y).getUnit()];
    }
    let i;
    let extreme1, extreme2;
    for (i = 0; i < szaxis.length; i++) {
      switch (obj1.name){
        case "point":
          extreme1 = this.getPointProjection(obj1,szaxis[i]);
          break;
        case "circle":
          extreme1 = this.getCircleProjection(obj1,szaxis[i]);
          break;
        case "polygon":
          extreme1 = this.getProjection(obj1, szaxis[i]);
      }
      switch (obj2.name){
        case "point":
          extreme2 = this.getPointProjection(obj2,szaxis[i]);
          break;
        case "circle":
          extreme2 = this.getCircleProjection(obj2,szaxis[i]);
          break;
        case "polygon":
          extreme2 = this.getProjection(obj2, szaxis[i]);
      }
      if (!this.overlop(extreme1, extreme2)) return false;
    }
    return true;
  }

  getUniqueAxis(points, curaxis = []) {
    let i, j = 0;
    let b = false;
    let nor = new Vector(0, 0);
    let segment = new this.vector(0, 0);
    for (i = 0; i < points.length; i++) {
      if (i >= points.length - 1) {
        segment.x = points[0].x - points[i].x;
        segment.y = points[0].y - points[i].y;
      } else {
        segment.x = points[i + 1].x - points[i].x;
        segment.y = points[i + 1].y - points[i].y;
      }
      nor = segment.getUnit().getNormal();
      if (nor.x <= 0) {
        if (nor.x === 0) {
          if (nor.y < 0) nor.y *= -1;
        } else {
          nor.x *= -1;
          nor.y *= -1;
        }
      }
      b = true;
      //这里边数比较多可能会有些消耗，可以修改为二分法查找，这里只为演示功能，简单处理
      for (j = 0; j < curaxis.length; j++) {
        if (curaxis[j].x !== nor.x) continue;
        if (curaxis[j].y !== nor.y) continue;
        b = false;
        break;
      }
      if (!b) continue;
      curaxis.push(nor);
    }
    return curaxis;
  }

  /**
   * 获得点在轴的投影最大、最小值
   * @param points
   * @param axis
   * @returns {{min: number, max: number}}
   */
  getProjection(obj, axis) {
    let points = obj.points;
    let projection = {min: 0, max: 0};
    let n, min, max = 0;
    min = new Vector(points[0].x, points[0].y).dot(axis);
    max = min;
    points.map((point) => {
      n = new this.vector(point.x, point.y).dot(axis);
      if (n < min) min = n;
      if (n > max) max = n;
    });
    projection.min = min;
    projection.max = max;
    return projection;
  }

  /**
   * 获得圆在轴的投影最大、最小值
   * @param circle
   * @param axis
   * @returns {{min: number, max: number}}
   */
  getCircleProjection(circle, axis) {
    let centerProjection = new this.vector(circle.x, circle.y).dot(axis);
    return {
      min: centerProjection - circle.r,
      max: centerProjection + circle.r
    }
  }

  /**
   * 获得点在投影轴上的值
   * @param point
   * @param axis
   * @returns {number}
   */
  getPointProjection(point, axis) {
    return new this.vector(point.x, point.y).dot(axis);
  }

  /**
   * 判断是否重叠
   * @param poly1
   * @param poly2
   * @returns {boolean}
   */
  overlop(poly1, poly2) {
    if (poly1.min > poly2.max) return false;
    if (poly1.max < poly2.min) return false;
    if ((poly1.min - poly2.min) * (poly1.max - poly2.max) < 0) return true;
    return true;
  }


}

export {SAT}
