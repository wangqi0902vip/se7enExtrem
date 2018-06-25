import {stageDataTransform,componentData} from "./utils/dataFunc";
import {DisplayObject, Container, Texture, Stage,Bounds} from './core'
import {SAT} from "./math/arithmetic/SAT";
import {TransformStatic} from "./math/dataType/TransformStatic";

class DataBox {
    constructor() {
        this.stageDataTransform = stageDataTransform;
        this.DisplayObject = DisplayObject;
        this.Container = Container;
        this.Texture = Texture;
        this.Stage = Stage;
        this.SAT = SAT;
        this.componentData = componentData;
        this.Bounds = Bounds;
        this.transform = TransformStatic
    }
}

let dataBox = new DataBox();
export {dataBox}
