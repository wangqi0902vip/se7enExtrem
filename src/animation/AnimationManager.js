import {Animation} from "./Animation";
import {PlayList} from "./PlayList";

class AnimationManager {

    constructor(animations = []) {
        this.animationList = [];
        animations.map((value) => {
            this.add(value);
        });
        this._playList = new PlayList();
    }

    add(obj) {
        let temp = this.pack(obj);
        this.animationList.push(temp);
        return temp;
    }

    getPlayList(obj) {
        let actions = this.getAnimation(obj);
        if (actions !== null) {
            this._playList.update(actions);
            return this._playList;
        } else {
            return false;
        }
    }

    pack(obj) {
        return new Animation(obj)
    }

    getAnimationBySourceId(arr, id) {
        return arr.filter((value) => {
            return value.sourceId === id;
        })
    }

    getAnimationByEventType(arr, type) {
        return arr.filter((value) => {
            return value.eventType === type;
        })
    }

    remove(obj) {
        this.animationList.map(value => {
            if (value.equal(obj)) {
                this._delete(value);
            }
        })
    }

    getIndex(animationUnit) {
        return this.animationList.indexOf(animationUnit);
    }

    _delete(animationUnit) {
        this.animationList.splice(this.getIndex(animationUnit), 1);
    }

    getAnimation({sourceId: sourceId, eventType: eventType}) {
        let temp = [...this.animationList];
        temp = this.getAnimationBySourceId(temp, sourceId);
        temp = this.getAnimationByEventType(temp, eventType);
        return temp;
    }

    toJson() {
        let temp = [];
        this.animationList.map(value => {
            temp.push(value.toJson())
        });
        return temp;
    }

}

export {AnimationManager}
