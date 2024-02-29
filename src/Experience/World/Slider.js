import * as kokomi from "kokomi.js";
import sliderVertexShader from "../Shaders/Slider/vert.glsl";
import sliderFragmentShader from "../Shaders/Slider/frag.glsl";
export default class Slider extends kokomi.Component {
    constructor(base) {
      super(base);
  
      this.ig = new kokomi.InfiniteGallery(this.base, { //使用了kokomi中无限画廊的一个类来创建
        elList: [...document.querySelectorAll(".gallery-item")],//图片元素
        direction: "horizontal",//水平方向
        gap: 128,//图片间距
        vertexShader: sliderVertexShader,
        fragmentShader: sliderFragmentShader,
        materialParams: {
          transparent: true,
        },
        uniforms: {
            uVelocity: {//接收解构得到的滚动速度
              value: 0,
            },
            uOpacity: {//接受渐变的透明度
              value: 1,
            },
            uProgress: {//接收放大比例的代码
              value: 0,
            },
          },
      });
      this.ws = new kokomi.WheelScroller();
      this.ws.listenForScroll();
    }
    async addExisting() {
      this.ig.addExisting();
      await this.ig.checkImagesLoaded();
    }
    update() {
        this.ws.syncScroll();
        // const { current } = this.ws.scroll;
        //把当前滑动量和滑动速度解构出来
        const { current, delta } = this.ws.scroll;
        // console.log(current,'current')
        //将滚轮滚动的距离current通过sync方法传递给画廊ig
        this.ig.sync(current*5);

        this.ig.iterate((maku) => {
            //将速度赋值给uniform变量uVelocity
            maku.mesh.material.uniforms.uVelocity.value = delta;
          });
    }
  }
  