/**
 * Author se7en.
 */
import {Point} from "./Point";

class Polygon {

  constructor(points = []) {
    this.name = "polygon";
    this.isConcave = false;
    this.points = points.map((value,key)=>{
      points[key] = new Point(value[0],value[1]);
    });
  }

  convexfy(){
    let temp = [];
    return temp;
  }

  // getNextConcaveIndex(p,starindex = 0) {
  //   if(p.length <= 3) return -1;
  //   let curdir = 0;
  //   let nextpos = 0;
  //   let nmax = p.length + starindex;
  //   for(let i = starindex;i < nmax;i++) {
  //     curdir = getMutiPtClockDir(p[(i + p.length) % p.length],p[(i - 1 + p.length) % p.length],p[(i + 1 + p.length) % p.length]);
  //     if(curdir == POLYDIR.ANTICLOCKWISE) return i % p.length;
  //   }
  //   return -1;
  // }
}
export {Polygon}
