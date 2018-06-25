/**
 * Author se7en.
 * @type {number}
 */
import {Bounds} from "./Bounds";
import {ObservablePoint} from "../math/dataType/ObservablePoint";

let id = 0;

function getID() {
  return id++;
}

function setID(value) {
  id = value;
}

import {Rectangle} from "../math/shape/Rectangle";
import {TransformStatic} from "../math/dataType/TransformStatic";
import {Matrix} from "../math/dataType/Matrix";
import {Texture} from "./Texture";
import {Style} from "../domRender/Style";
import {COMP_TYPE} from "../config/dataConfig";


/**
 * DisplayObject类
 */
class DisplayObject {

  /**
   * The position of the displayObject on the x axis relative to the local coordinates of the parent.
   * An alias to position.x
   *
   * @member {number}
   */
  get x() {
    return this.rectangle.x;
  }

  set x(value) // eslint-disable-line require-jsdoc
  {
    // this.transform.position.x = value;
    this.rectangle.x = value;
    this.updateTransform();
  }

  /**
   * The position of the displayObject on the y axis relative to the local coordinates of the parent.
   * An alias to position.y
   *
   * @member {number}
   */
  get y() {
    return this.rectangle.y;
  }

  set y(value) // eslint-disable-line require-jsdoc
  {
    // this.transform.position.y = value;

    this.rectangle.y = value;
    this.updateTransform();
  }

  /**
   * The coordinate of the object relative to the local coordinates of the parent.
   * Assignment by value since pixi-v4.
   *
   * @member {PIXI.Point|PIXI.ObservablePoint}
   */
  get position() {
    // this.updateTransform();
    return this.transform.position;
  }

  set position(value) // eslint-disable-line require-jsdoc
  {
    this.transform.position.copy(value);
  }

  /**
   * The scale factor of the object.
   * Assignment by value since pixi-v4.
   *
   * @member {PIXI.Point|PIXI.ObservablePoint}
   */
  get scale() {
    // this.updateTransform();
    return this.transform.scale;
  }

  set scale(value) // eslint-disable-line require-jsdoc
  {
    this.transform.scale.copy(value);
  }

  /**
   * The pivot point of the displayObject that it rotates around
   * Assignment by value since pixi-v4.
   *
   * @member {PIXI.Point|PIXI.ObservablePoint}
   */
  get pivot() {
    // this.updateTransform();
    return this.transform.pivot;
  }

  set pivot(value) // eslint-disable-line require-jsdoc
  {
    this.transform.pivot.copy(value);
  }

  /**
   * The skew factor for the object in radians.
   * Assignment by value since pixi-v4.
   *
   * @member {PIXI.ObservablePoint}
   */
  get skew() {
    // this.updateTransform();
    return this.transform.skew;
  }

  set skew(value) // eslint-disable-line require-jsdoc
  {
    this.transform.skew.copy(value);
  }

  /**
   * The rotation of the object in radians.
   *
   * @member {number}
   */
  get rotation() {
    // this.updateTransform();
    // this.getBounds(false);
    return this.transform.rotation;
  }

  set rotation(value) // eslint-disable-line require-jsdoc
  {
    this.transform.rotation = value;
    this.updateTransform();
  }

  get bounds() {
    return this._bounds;
  }

  set bounds(value) {
    this._bounds = value;
  }

  get stage() {
    return this._stage;
  }

  set stage(value) {
    this._stage = value;
  }

  get type() {
    return COMP_TYPE[this._type];
  }

  set type(value) {
    this._type = value;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get rectangle() {
    return this._rectangle;
  }

  get visible() {
    return this._visible;
  }

  set visible(value) {
    this._visible = value;
  }

  get transform() {
    return this._transform;
  }

  constructor({texture: texture=null, visible: visible = true, id: id = getID(), name: name = this._id, rectangle: rectangle = {}, transform: transform, type: type, edit: edit}) {
    this._id = id;
    this._name = name;
    this._visible = visible;
    this._rectangle = new Rectangle({x: rectangle[0], y: rectangle[1], width: rectangle[2], height: rectangle[3]});
    this._transform = new TransformStatic();
    this._transform.setTransformFromArray(transform);
    this._texture = new Texture(texture);
    this._parent = null;
    this._stage = null;
    this._bounds = new Bounds();
    this._type = type;
    this.isMounted = true;
    this.enter = {};
    this.leave = {};
    this._boundsID = 0;
    this._lastBoundsID = -1;
    this._boundsRect = new Rectangle({x: 0, y: 0, width: 0, height: 0});
    this._localBoundsRect = null;
    this.tempDisplayObjectParent = null;
    this._destroyed = false;
    this._anchor = new ObservablePoint(this._onAnchorUpdate, this);
    this.vertexData = new Float32Array(8);
    this._x = 0;
    this._y = 0;
    /**
     * This is used to calculate the bounds of the object IF it is a trimmed sprite
     *
     * @private
     * @member {Float32Array}
     */
    this.vertexTrimmedData = null;

    this._transformID = -1;
    this._textureID = -1;

    this._transformTrimmedID = -1;
    this._textureTrimmedID = -1;
    this.edit = edit || {
      "layer": {
        "lock": false,
        "hide": false
      },
      "control": {
        "permission": [1, 1, 1, 1]
      }
    }
  }

  /**
   * Called when the anchor position updates.
   *
   * @private
   */
  _onAnchorUpdate() {
    this._transformID = -1;
    this._transformTrimmedID = -1;
  }

  /**
   * @private
   * @member {PIXI.DisplayObject}
   */
  get _tempDisplayObjectParent() {
    if (this.tempDisplayObjectParent === null) {
      this.tempDisplayObjectParent = new DisplayObject({texture:{}});
    }

    return this.tempDisplayObjectParent;
  }

  /**
   * Updates the object transform for rendering
   *
   * TODO - Optimization pass!
   */
  updateTransform() {
    this.transform.updateTransform(this.parent.transform);
    // multiply the alphas..
    // this.getBounds(true);
    this._bounds.updateID++;
    this._calculateBounds()
  }

  /**
   * recursively updates transform of all objects from the root to this one
   * internal function for toLocal()
   */
  _recursivePostUpdateTransform() {
    if (this.parent) {
      this.parent._recursivePostUpdateTransform();
      this.transform.updateTransform(this.parent.transform);
    }
    else {
      this.transform.updateTransform(this._tempDisplayObjectParent.transform);
    }
  }


  /**
   * Retrieves the bounds of the displayObject as a rectangle object.
   *
   * @param {boolean} skipUpdate - setting to true will stop the transforms of the scene graph from
   *  being updated. This means the calculation returned MAY be out of date BUT will give you a
   *  nice performance boost
   * @param {Rectangle} rect - Optional rectangle to store the result of the bounds calculation
   * @return {Rectangle} the rectangular bounding area
   */
  getBounds(skipUpdate, rect) {
    if (!skipUpdate) {
      if (!this.parent) {
        this.parent = this._tempDisplayObjectParent;
        this.updateTransform();
        this.parent = null;
      }
      else {
        this._recursivePostUpdateTransform();
        this.updateTransform();
      }
    }
    // if (this._boundsID !== this._lastBoundsID)
    // {
    //   this.calculateBounds();
    // }

    if (!rect) {
      if (!this._boundsRect) {
        this._boundsRect = new Rectangle({x: 0, y: 0, width: 1, height: 1});
      }

      rect = this._boundsRect;

    }
    // this._boundsRect = this._bounds.getRectangle(rect);
    return this._bounds.getRectangle(rect);
  }

  get boundsRect() {
    return this.getBounds(true);
  }

  calculateVertices() {
    // if (this._transformID === this.transform._worldID) {
    //   return;
    // }
    //
    // this._transformID = this.transform._worldID;
    // this._textureID = this._texture._updateID;

    // set the vertex data

    // const texture = this._texture;
    const wt = this.transform.worldTransform;
    const a = wt.a;
    const b = wt.b;
    const c = wt.c;
    const d = wt.d;
    const tx = wt.tx;
    const ty = wt.ty;
    const vertexData = this.vertexData;
    // const trim = texture.trim;
    // const orig = texture.orig;
    const anchor = this._anchor;

    //
    // // if (trim)
    // // {
    // // if the sprite is trimmed and is not a tilingsprite then we need to add the extra
    // // space before transforming the sprite coords.
    // // w1 = trim.x - (anchor._x * orig.width);
    // // w0 = w1 + trim.width;
    // //
    // // h1 = trim.y - (anchor._y * orig.height);
    // // h0 = h1 + trim.height;
    // // }
    // // else
    // // {
    // w1 = -0.5 * this.rectangle.width;
    // w0 = w1 + this.rectangle.width;
    //
    // h1 = -0.5 * this.rectangle.height;
    // h0 = h1 + this.rectangle.height;
    // // }


    // let w0 = -this.rectangle.width/2;
    // let w1 = this.rectangle.width/2;
    // let h0 = -this.rectangle.height/2;
    // let h1 = this.rectangle.height/2;
    let w0 = this.rectangle.x+this.rectangle.width;
    let w1 =this.rectangle.x;
    let h0 = this.rectangle.y+this.rectangle.height;
    let h1 = this.rectangle.y;
    // xy
    vertexData[0] = (a * w1) + (c * h1) + tx;
    vertexData[1] = (d * h1) + (b * w1) + ty;
    // xy
    vertexData[2] = (a * w0) + (c * h1) + tx;
    vertexData[3] = (d * h1) + (b * w0) + ty;

    // xy
    vertexData[4] = (a * w0) + (c * h0) + tx;
    vertexData[5] = (d * h0) + (b * w0) + ty;

    // xy
    vertexData[6] = (a * w1) + (c * h0) + tx;
    vertexData[7] = (d * h0) + (b * w1) + ty;
  }

  /**
   * Updates the bounds of the sprite.
   *
   * @private
   */
  _calculateBounds() {
    this.calculateVertices();
    this._bounds.clear();
    this._bounds.addQuad(this.vertexData);
    console.log(this._bounds)
    // const trim = this._texture.trim;
    // const orig = this._texture.orig;
    //
    // First lets check to see if the current texture has a trim..
    // if (!trim || (trim.width === orig.width && trim.height === orig.height))
    // {
    //   no trim! lets use the usual calculations..
    // this.calculateVertices();
    // this._bounds.addQuad(this.vertexData);
    // }
    // else
    // {
    // lets calculate a special trimmed bounds...
    // this.calculateTrimmedVertices();
    // this._bounds.addQuad(this.vertexTrimmedData);
    // }
  }

  /**
   * Retrieves the local bounds of the displayObject as a rectangle object
   *
   * @param {PIXI.Rectangle} [rect] - Optional rectangle to store the result of the bounds calculation
   * @return {PIXI.Rectangle} the rectangular bounding area
   */
  getLocalBounds(rect) {
    const transformRef = this.transform;
    const parentRef = this.parent;

    this.parent = null;
    this.transform = this._tempDisplayObjectParent.transform;

    if (!rect) {
      if (!this._localBoundsRect) {
        this._localBoundsRect = new Rectangle();
      }

      rect = this._localBoundsRect;
    }

    const bounds = this.getBounds(false, rect);

    this.parent = parentRef;
    this.transform = transformRef;

    return bounds;
  }

  destroy() {
    // this.removeAllListeners();
    if (this.parent) {
      this.parent.removeChild(this);
    }
    // this.transform = null;

    this.parent = null;

    this._bounds = null;
    // this._currentBounds = null;
    // this._mask = null;
    //
    // this.filterArea = null;
    //
    // this.interactive = false;
    // this.interactiveChildren = false;

    this._destroyed = true;
  }

  /**
   * 转换为原始数据
   * @returns {*}
   */
  toJson() {
    return Object.assign({}, {
      id: this.id,
      name: this.name,
      visible: this.visible,
      rectangle: this.rectangle.toJson(),
      transform: this.transform.toJson(),
      texture: this.texture.toJson(),
      type: this._type
    })
  }

  getDescents() {
    return false;
  }

  getAnimationData() {

  }

  get parent() {
    return this._parent;
  }

  set parent(value) {
    this._parent = value;
  }

  get texture() {
    return this._texture;
  }

  set texture(value) {
    this._texture = value;
  }

  get toStyle() {
    return new Style().toStyle(this);
  }

  get toTransform() {
    return new Style().toTransfrom(this);
  }

}

export {DisplayObject, id, setID}
