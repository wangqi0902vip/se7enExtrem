class PlayList {
    get playlist() {
        return this._playlist;
    }

    set playlist(value) {
        this._playlist = value;
    }

    constructor() {
        this._playlist = [];
        this._index = 0;
        this._length = 0;

    }

    update(obj) {
        this._playlist = obj;
        this._length = obj.length;

    }

    changeList(arr) {
        this._playlist = null;
        this._playlist = arr;
    }

    upward(obj) {
        let index = this._playlist.indexOf(obj);
        if (index >= 0 && index < this._playlist.length - 1) {
            let temp = this._playlist.splice(index, 1);
            this._playlist.splice(index - 1, 0, temp[0]);
        } else {
            console.log("Already first index!!!")
        }
    }

    downward(obj) {
        let index = this._playlist.indexOf(obj);
        if (index >= 0 && index < this._playlist.length - 1) {
            let temp = this._playlist.splice(index, 1);
            this._playlist.splice(index + 1, 0, temp[0]);
        } else {
            console.log("Already last index!!!")
        }
    }

    play() {
        if (this._index < this._length) {
            let temp = this._index;
            this._index++;
            return this._playlist[temp];
        } else {
            this._index = 0;
            return this._playlist[this._index];
        }
    }

    playBack(){
        if (this._index > 0) {
            let temp = this._index;
            this._index--;
            return this._playlist[temp];
        } else {
            this._index = this._length;
            return this._playlist[this._index];
        }
    }

    autoPlay() {
        let runTime = this.play();
    }

    _nextTick() {

    }

}
export {PlayList}