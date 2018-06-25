import {DisplayObject} from "./DisplayObject";
import {componentData} from "../utils/dataFunc";

/**
 * 容器类
 */
class Container extends DisplayObject {

  constructor(obj) {
    super(obj);
    this.children = [];
  }

  /**
   * 获取子孙元素
   */
  getDescents() {
    let descents = [...this.children];
    descents.map(value => {
      if (value.getDescents()) {
        descents = [...descents, ...value.getDescents()]
      }
    });
    return [...descents];
  }

  /**
   * 遍历子孙元素 找到id元素
   * @param id
   * @returns {T}
   */
  getDescentById(id) {
    let temp = [...this.getDescents(), this];
    return temp.find(value => {
      return value.id === id
    });
  }

  getDescentsByName(name) {
    return this.getDescents().filter(value => {
      return value.name === name
    })
  }

  /**
   * 添加子元素
   * @param obj
   */
  addChild(obj) {
    let child = obj.isMounted ? obj : componentData(obj, this);
    this.children.push(child);
    return child;
  }

  /**
   * Recalculates the bounds of the container.
   *
   */
  calculateBounds() {
    this._bounds.clear();

    this._calculateBounds();

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];

      if (!child.visible) {
        continue;
      }

      child.calculateBounds();

      // // TODO: filter+mask, need to mask both somehow
      // if (child._mask)
      // {
      //   child._mask.calculateBounds();
      //   this._bounds.addBoundsMask(child._bounds, child._mask._bounds);
      // }
      // else if (child.filterArea)
      // {
      //   this._bounds.addBoundsArea(child._bounds, child.filterArea);
      // }
      // else
      // {
      this._bounds.addBounds(child._bounds);
      // }
    }

    this._lastBoundsID = this._boundsID;
  }

  _calculateBounds() {
    // FILL IN//
  }

  /**
   * 重新排序
   * @param array
   */
  reorder(array) {
    this.children = null;
    this.children = array;
  }

  /**
   * 删除子对象
   * @param displayObject
   */
  removeChild(displayObject) {
    this.children.splice(this.getIndex(displayObject), 1);
  }

  destroyChild(displayObject) {
    displayObject.destroy();
  }

  /**
   * 通过id删除子对象
   * @param id
   */
  removeChildById(id) {
    this.destroyChild(this.getChildById(id));
  }

  /**
   * 删除多个子对象
   * @param arr
   */
  removeChildren(arr) {
    if (arr.length < 0) {
      console.error('No selected components!')
    } else {
      arr.map(value => this.destroyChild(value));
    }
  }

  /**
   * 获取index
   * @param displayObject
   * @returns {number}
   */
  getIndex(displayObject) {
    return this.children.indexOf(displayObject);
  }

  /**
   * 清空子对象
   */
  removeAllChildren() {
    this.children = [];
  }

  /**
   * 通过name获取子对象
   * @param name
   * @returns {Array.<DisplayObject>}
   */
  getChildrenByName(name) {
    return this.children.filter((value) => {
      return value.name === name;
    })
  }

  /**
   * 通过id获取子对象
   * @param id
   * @returns {DisplayObject}
   */
  getChildById(id) {
    return this.children.find((value) => {
      return value.id === id;
    })
  }

  /**
   * 上移一层
   * @param id
   */
  uplevel(id) {
    let index = this.children.indexOf(this.getChildById(id));
    if (index === this.children.length - 1) {
      console.log("It`s always top!!!")
    } else {
      let temp = this.children.splice(index, 1);
      this.children.splice(index + 1, 0, temp[0]);
    }
  }

  toplevel(arr) {
    let temp = [];
    arr.map(value => {
      temp.push({index: this.getIndex(value), value: value});
    });
    temp.sort((a, b) => {
      return b.index - a.index;
    });
    temp.map(value => {
      this.removeChild(value.value);
      this.addChildAt(this.children.length, value.value);
    })
  }

  /**
   * 下移一层
   * @param id
   */
  downlevel(id) {
    let index = this.children.indexOf(this.getChildById(id));
    if (index === 0) {
      console.log("It`s always bottom!!!")
    } else {
      let temp = this.children.splice(index, 1);
      this.children.splice(index - 1, 0, temp[0]);
    }
  }

  bottomlevel(arr) {
    let temp = [];
    arr.map(value => {
      temp.push({index: this.getIndex(value), value: value});
    });
    temp.sort((a, b) => {
      return a.index - b.index;
    });
    temp.map(value => {
      this.removeChild(value.value);
      this.addChildAt(0, value.value);
    })
  }

  /**
   * 在index位置添加子对象
   * @param index
   * @param child
   */
  addChildAt(index, child) {
    this.children.splice(index, 0, child.isMounted ? child : componentData(child, this));
  }

  /**
   * 转换为原始数据
   * @returns {*}
   */
  toJson() {
    let temp = [];
    this.children.map(value => temp.push(value.toJson()));
    return Object.assign({}, super.toJson(), {children: temp})

  }
}

export {Container}
