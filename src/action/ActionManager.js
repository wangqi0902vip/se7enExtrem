import {ActionItem} from "./ActionItem";

class ActionManager {

    constructor(actionList = []) {
        this.actionList = [];
        actionList.map((value) => {
            this.add(value);
        });
    }

    pack(obj) {
        return new ActionItem(obj);
    }

    add(obj) {
        let temp = this.pack(obj);
        this.actionList.push(temp);
        return temp;
    }

    remove(obj) {
        this.actionList.map(value => {
            if (value.equal(obj)) {
                this._delete(value);
            }
        })
    }

    getIndex(actionUnit) {
        return this.actionList.indexOf(actionUnit);
    }

    _delete(actionUnit) {
        this.actionList.splice(this.getIndex(actionUnit), 1);
    }

    removeAllChildren() {
        this.actionList = [];
    }

    getActionBySourceId(arr, id) {
        return arr.filter((value) => {
            return value.sourceId === id;
        })
    }

    getActionByEventType(arr, type) {
        return arr.filter((value) => {
            return value.eventType === type;
        })
    }

    getAction({sourceId: sourceId, eventType: eventType}) {
        let temp = [...this.actionList];
        temp = this.getActionBySourceId(temp, sourceId);
        temp = this.getActionByEventType(temp, eventType);
        return temp;
    }


    toJson() {
        let temp = [];
        this.actionList.map((value) => {
            temp.push(value.toJson());
        })
        return temp;
    }

}

export {ActionManager}
