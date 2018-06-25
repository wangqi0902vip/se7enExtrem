import {ObservablePoint} from './ObservablePoint';
import TransformBase from './TransformBase';
import {Matrix} from "./Matrix";

/**
 * Transform that takes care about its versions
 *
 * @class
 * @extends TransformBase
 */
export class TransformStatic extends TransformBase {
  /**
   *
   */
  constructor() {
    super();

    /**
     * The coordinate of the object relative to the local coordinates of the parent.
     *
     * @member {ObservablePoint}
     */
    this.position = new ObservablePoint(this.onChange, this, 0, 0);

    /**
     * The scale factor of the object.
     *
     * @member {ObservablePoint}
     */
    this.scale = new ObservablePoint(this.onChange, this, 1, 1);

    /**
     * The pivot point of the displayObject that it rotates around
     *
     * @member {ObservablePoint}
     */
    this.pivot = new ObservablePoint(this.onChange, this, 0, 0);

    /**
     *
     *
     * The skew amount, on the x and y axis.
     *
     * @member {ObservablePoint}
     */
    this.skew = new ObservablePoint(this.updateSkew, this, 0, 0);

    this._rotation = 0;

    this._cx = 1; // cos rotation + skewY;
    this._sx = 0; // sin rotation + skewY;
    this._cy = 0; // cos rotation + Math.PI/2 - skewX;
    this._sy = 1; // sin rotation + Math.PI/2 - skewX;

    this._localID = 0;
    this._currentLocalID = 0;
    this._rotateDeg = 0;
  }

  /**
   * Called when a value changes.
   *
   * @private
   */
  onChange() {
    this._localID++;
    this.updateTransform(this);
  }

  /**
   * Called when skew or rotation changes
   *
   * @private
   */
  updateSkew() {
    this._cx = Math.cos(this._rotation + this.skew._y);
    this._sx = Math.sin(this._rotation + this.skew._y);
    this._cy = -Math.sin(this._rotation - this.skew._x); // cos, added PI/2
    this._sy = Math.cos(this._rotation - this.skew._x); // sin, added PI/2

    this._localID++;
    this.updateTransform(this);
  }

  /**
   * Updates only local matrix
   */
  updateLocalTransform() {
    const lt = this.localTransform;

    if (this._localID !== this._currentLocalID) {
      // get the matrix values of the displayobject based on its transform properties..
      lt.a = this._cx * this.scale._x;
      lt.b = this._sx * this.scale._x;
      lt.c = this._cy * this.scale._y;
      lt.d = this._sy * this.scale._y;

      lt.tx = this.position._x - ((this.pivot._x * lt.a) + (this.pivot._y * lt.c));
      lt.ty = this.position._y - ((this.pivot._x * lt.b) + (this.pivot._y * lt.d));
      this._currentLocalID = this._localID;
      // force an update..
      this._parentID = -1;
    }
  }

  setTransformFromArray(array){
    array = array&&array.length === 9? array:[0,0,1,1,0,0,0,0,0];
    this.setTransform(array[0],array[1],array[2],array[3],array[4],array[5],array[6],array[7],array[8]);
  }

  setTransform(x = 0, y = 0, scaleX = 1, scaleY = 1, rotation = 0, skewX = 0, skewY = 0, pivotX = 0, pivotY = 0)
  {
    this.position.x = x;
    this.position.y = y;
    this.scale.x = !scaleX ? 1 : scaleX;
    this.scale.y = !scaleY ? 1 : scaleY;
    this.rotation = rotation;
    this.skew.x = skewX;
    this.skew.y = skewY;
    this.pivot.x = pivotX;
    this.pivot.y = pivotY;

    return this;
  }

  /**
   * Updates the values of the object and applies the parent's transform.
   *
   * @param {Transform} parentTransform - The transform of the parent of this object
   */
  updateTransform(parentTransform) {
    const lt = this.localTransform;

    if (this._localID !== this._currentLocalID) {
      // get the matrix values of the displayobject based on its transform properties..
      lt.a = this._cx * this.scale._x;
      lt.b = this._sx * this.scale._x;
      lt.c = this._cy * this.scale._y;
      lt.d = this._sy * this.scale._y;

      lt.tx = this.position._x - ((this.pivot._x * lt.a) + (this.pivot._y * lt.c));
      lt.ty = this.position._y - ((this.pivot._x * lt.b) + (this.pivot._y * lt.d));
      this._currentLocalID = this._localID;

      // force an update..
      this._parentID = -1;
    }

    if (this._parentID !== parentTransform._worldID) {
      // concat the parent matrix with the objects transform.
      const pt = parentTransform.worldTransform;
      const wt = this.worldTransform;

      wt.a = (lt.a * pt.a) + (lt.b * pt.c);
      wt.b = (lt.a * pt.b) + (lt.b * pt.d);
      wt.c = (lt.c * pt.a) + (lt.d * pt.c);
      wt.d = (lt.c * pt.b) + (lt.d * pt.d);
      wt.tx = (lt.tx * pt.a) + (lt.ty * pt.c) + pt.tx;
      wt.ty = (lt.tx * pt.b) + (lt.ty * pt.d) + pt.ty;

      this._parentID = parentTransform._worldID;

      // update the id of the transform..
      this._worldID++;
    }
  }

  /**
   * Decomposes a matrix and sets the transforms properties based on it.
   *
   * @param {Matrix} matrix - The matrix to decompose
   */
  setFromMatrix(matrix) {
    matrix.decompose(this);
    this._localID++;
  }

  setFromCssArray(array) {
    let matrix = new Matrix();
    // matrix.fromCssArray(array);
    // let matrix1 = matrix.toArray(false);
    // let matrix2 = new Matrix();
    matrix.fromArray(array);
    this.setFromMatrix(matrix);
    // this.localTransform = matrix;
  }


  /**
   * The rotation of the object in radians.
   *
   * @member {number}
   */
  get rotation() {
    return this._rotateDeg;
  }

  set rotation(value) // eslint-disable-line require-jsdoc
  {
    this._rotateDeg = value;
    this._rotation = value * 2 * Math.PI / 360;
    this.updateSkew();
  }

  toJson() {
    let temp = [];
    temp[0] = this.position.x;
    temp[1] = this.position.y;
    temp[2] = this.scale.x;
    temp[3] = this.scale.y;
    temp[4] = this.rotation;
    temp[5] = this.skew.x;
    temp[6] = this.skew.y;
    temp[7] = this.pivot.x;
    temp[8] = this.pivot.y;
    return temp;
  }
}
