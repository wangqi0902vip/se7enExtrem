import {Container, DisplayObject, id, setID, Stage} from "../core";
import {ResourceManager} from "../resourceManager/ResourceManager";
import {COMP_TYPE} from "../config/dataConfig";
import {AnimationManager} from "../animation/AnimationManager";
import {ActionManager} from "../action/ActionManager";
import {defaultStyle,commonStyle} from "../domRender/defaultStyle.json";

let stage = null;

export function stageDataTransform(data) {
  let resource = new ResourceManager(data.resource);
  return {main: componentData(data.main.pages[0]), resource: resource};
}

export function componentData(data, parent = null) {
  let exports = {Container: Container, DisplayObject: DisplayObject,Stage:Stage};
  let comp = null;
  data.texture.style = Object.assign({},commonStyle,defaultStyle[data.texture.type],data.texture.style);
  let cls = COMP_TYPE[data.type];
  comp = new exports[cls](data);
  comp.children = [];
  if (id <= comp.id) setID(comp.id+1);
  if (data.children === undefined) data.children = [];
  data.children.map(value => {
    comp.children.push(componentData(value, comp));
  });
  if (COMP_TYPE[data.type] === "Stage") {
    stage = comp;
    comp.actionManager = new ActionManager(data.actionList);
    comp.animationManager = new AnimationManager(data.animationList);
  }
  comp.parent = parent;
  comp.stage = stage;
  return comp;
}


