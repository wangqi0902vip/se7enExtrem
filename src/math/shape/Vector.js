/**
 * Author se7en.
 */
/**
 *
 * 向量类
 */
class Vector {

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * 返回法向量
   * @returns {Vector}
   */
  getNormal() {
    return new Vector(this.y, -this.x);
  }

  /**
   * 向量点乘
   * @param vector:{Vector}
   * @returns {number}
   */
  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  /**
   * 返回向量的模
   * @returns {number}
   */
  getNorm() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * 返回单位向量
   * @returns {Vector}
   */
  getUnit() {
    return new Vector(this.x / this.getNorm(), this.y / this.getNorm());
  }

  /**
   * 返回向量旋转角度
   * @param vector
   * @returns {number}
   */
  angleWith(vector) {
    return Math.acos(this.dot(vector) / (this.getNorm() * vector.getNorm()));
  }


}

export {Vector}
