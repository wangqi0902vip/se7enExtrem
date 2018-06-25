class AnimationUnit {

  constructor({targetId: targetId, animationType: animationType, delayTime: delayTime = null, runTime: runTime = null, animationName: animationName = null, name: name = null}) {
    this.targetId = targetId;
    this.animationType = animationType;
    this.delayTime = delayTime;
    this.runTime = runTime;
    this.animationName = animationName;
    this.name = name;
  }

  change({targetId:targetId,animationType:animationType,delayTime:delayTime,runTime:runTime,animationName:animationName,name:name}){
    this.targetId = targetId||this.targetId;
    this.animationType = animationType || this.animationType;
    this.delayTime = delayTime || this.delayTime ;
    this.runTime = runTime || this.runTime ;
    this.animationName = animationName || this.animationName ;
    this.name = name || this.name ;
  }

  equal(obj) {
    return obj.targetId === this.targetId &&
      obj.animationType === this.animationType &&
      obj.delayTime === this.delayTime &&
      obj.runTime === this.runTime &&
      obj.animationName === this.animationName
  }

  toJson() {
    return Object.assign({}, {
      targetId: this.targetId,
      animationType: this.animationType,
      delayTime: this.delayTime,
      runTime: this.runTime,
      animationName: this.animationName
    })
  }


}

export {AnimationUnit}
