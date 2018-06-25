class Action {
  constructor({targetId: targetId, actionType: actionType, actionProps: actionProps}) {
    [this.targetId, this.actionType, this.actionProps] = [targetId, actionType, actionProps];
  }

  equal(obj) {
    return this.targetId === obj.targetId &&
      this.actionType === obj.actionType &&
      this.actionProps === obj.actionProps;
  }

  toJson(){
    return {
      targetId:this.targetId,
      actionType:this.actionType,
      actionProps:this.actionProps
    }
  }
}

export {Action}
