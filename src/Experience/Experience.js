import * as kokomi from "kokomi.js";
import World from "./World/World";
export default class Experience extends kokomi.Base {
  constructor(sel = "#sketch") {
    super(sel);
    window.experience = this;
    this.camera.position.set(0, 0, 5);
    new kokomi.OrbitControls(this);
    this.world = new World(this)
    
  }
}
