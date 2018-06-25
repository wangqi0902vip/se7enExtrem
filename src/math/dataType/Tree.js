/**
 * Author se7en.
 */
class Tree {

  constructor(obj = {}, name = "") {
    this.content = obj;
    this.name = name;
    this.children = [];
    this.parent = null;
    this.depth = 0;
    this.root = this;
  }

  addChild(obj) {
    let temp = new Tree(obj);
    temp.parent = this;
    temp.depth = this.depth + 1;
    temp.root = this.root;
    this.children.push(temp);
  }

  has(treeNode){
    return this.children.find((value)=>{
      return value === treeNode;
    })
  }

  removeChild(treeNode) {
    if(this.children.indexOf(treeNode)!==-1){
      treeNode.parent = null;
      treeNode.root = null;
      this.children.splice(this.children.indexOf(treeNode),1);
    }
  }

  removeAllChild() {
    this.children = [];
  }


}

export {Tree}
