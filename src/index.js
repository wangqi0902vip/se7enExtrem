import {stageDataTransform,componentData} from "./utils/dataFunc";
import {Container, DisplayObject, Stage, Texture,Bounds} from './core';
import {SAT} from "./math/arithmetic/SAT";
import {TransformStatic} from "./math/dataType/TransformStatic";

exports.dataBox = {stageDataTransform, componentData,DisplayObject, Container, Texture, Stage,SAT,Bounds,transform:TransformStatic};
