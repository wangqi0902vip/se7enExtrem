let currentPosition = {x: 210, y: 0};
import defaultStyle from '../../module/defaultStyle.json';

function convertToPage(node, width = 1500) {
  let renderer = document.getElementById('renderer');
  let tempDom = document.createElement('div');
  tempDom.style.width = width + "px";
  let rectangle = {};
  renderer.appendChild(tempDom);
  let po = null;
  switch (node.texture._type) {
    case 0:
      tempDom.innerHTML = node.texture.content;
      let tempStyle = defaultStyle[node.name];
      let temp = {};
      for (let key in tempStyle) {
        if (typeof tempStyle[key] === 'number') {
          temp[key] = tempStyle[key] + "px";
        }
      }
      Object.assign(tempDom.style, defaultStyle[node.name], temp);
      po = layout(node, {width: tempDom.offsetWidth, height: tempDom.offsetHeight});
      if (node.name === "question_num" || node.name === "module_name") {
        rectangle = {x: po.x, y: po.y, width: width / 2, height: tempDom.offsetHeight};
      } else if(node.name === "submit_btn"){
        rectangle = {x: node.stage.rectangle.vertical - 350, y: po.y, width: 700,height: 100};
      }else if(node.name === "background_rect"){
        rectangle = {x: po.x, y: po.y, width: 1640,height: currentPosition.y};
      }else if(node.name === "test_blank"){
        rectangle = {x: po.x, y:po.y,width:po.width,height:po.height}
      }else {
        rectangle = {x: po.x, y: po.y, width: tempDom.offsetWidth, height: tempDom.offsetHeight};
      }
      break;
    case 1:
      break;
    case 2:
      po = layout(node, {width: 700, height: 135});
      rectangle = {x: po.x, y: po.y, width: 700, height: 135};
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
  }
  tempDom.innerHTML = null;
  return {rectangle: rectangle, style: defaultStyle[node.name]};
}

function layout(data, rectangle) {
  let po = {x: 0, y: 0, style: {}};

  switch (data.name) {
    case "background_rect":
      po.x = 140;
      po.y = 150;
      break;
    case "question_num":
      po.x = 210;
      po.y = 65;
      break;
    case "module_name":
      po.x = data.stage.rectangle.width / 2;
      po.y = 65;
      currentPosition.y = 190;
      break;
    case "stem":
      po.x = 210;
      po.y = currentPosition.y;
      currentPosition.y = po.y + 40 + rectangle.height;
      break;
    case "stem_audio":
      po.x = 210;
      po.y = currentPosition.y;
      currentPosition.y = po.y + 20 + rectangle.height;
      break;
    case "material":
      po.x = 210;
      po.y = currentPosition.y;
      currentPosition.y = po.y + 40 + rectangle.height;
      break;
    case "material_audio":
      po.x = 210;
      po.y = currentPosition.y;
      currentPosition.y = po.y + 40 + rectangle.height;
      break;
    case "test_option":
      po.x = 210;
      po.y = currentPosition.y;
      currentPosition.y = po.y + 40 + rectangle.height;
      break;
    case "test_blank":
      po.x = currentPosition.x;
      po.y = currentPosition.y;
      po.width=300;
      po.height=100;
      currentPosition.x = po.x + po.width + 60;
      if(currentPosition.x >= 1300){
        currentPosition.x = 210;
        currentPosition.y = po.y + 40 + po.height;
      }
      break;
    case "element":
      po.x = 210;
      po.y = currentPosition.y;
      currentPosition.y = po.y + 40 + rectangle.height;
      break;
    case "element_audio":
      po.x = 210;
      po.y = currentPosition.y;
      currentPosition.y = po.y + 40 + rectangle.height;
      break;
    case "append_ask":
      po.x = 210;
      po.y = currentPosition.y;
      currentPosition.y = po.y + 40 + rectangle.height;
      break;
    case "submit_btn":
      po.x = data.stage.plane - 350;
      po.y = currentPosition.y;
      currentPosition.y = po.y + 40 + rectangle.height;
      break;
  }
  data.stage.rectangle.height = currentPosition.y+ 40;
  return po;
}

export {convertToPage}
