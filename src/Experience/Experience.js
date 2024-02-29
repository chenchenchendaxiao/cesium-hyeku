import * as kokomi from "kokomi.js";
import World from "./World/World";
import Debug from "./Debug";
import resources from "./resources";
import Postprocessing from "./Postprocessing";
export default class Experience extends kokomi.Base {
  constructor(sel = "#sketch") {
    super(sel);
    window.experience = this;
    //初始化调试工具
    this.debug = new Debug();
    //初始化相机工具
    this.camera.position.set(0, 0, 5);
    //初始化由kokomi提供的资源管理对象，传入绑定的base和资源列表
    this.am = new kokomi.AssetManager(this, resources);
    // new kokomi.OrbitControls(this);
    const screenCamera = new kokomi.ScreenCamera(this);
    screenCamera.addExisting();
    this.postprocessing = new Postprocessing(this);
    this.postprocessing.addExisting();
    this.world = new World(this)
    this.update(() => {
      this.postprocessing.ce.customPass.material.uniforms.uRGBShift.value =
        Math.abs(this.world.slider?.ws.scroll.delta) * 0.0004;
    });
  }
  
}
