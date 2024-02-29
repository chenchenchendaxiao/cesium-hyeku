import * as kokomi from "kokomi.js";
import TestObject from "./TestObject";
import * as THREE from "three";
import gsap from "gsap";
import Slider from "./Slider";
export default class World extends kokomi.Component {
  constructor(base) {
    super(base);
    //在am对象的ready函数触发后 执行下面的操作
    this.base.am.on("ready",async  () => {
      this.currentActiveMesh = null;
      this.slider = new Slider(this.base);
      await this.slider.addExisting();
      this.slider.ig.iterate((maku) => {
        this.base.interactionManager.add(maku.mesh);
        maku.mesh.addEventListener("click", () => {
          //获取当前点击的实体
          console.log(maku);
          //获取画廊中其他的实体
          const otherMakus = this.slider.ig.makuGroup.makus.filter(
            (item) => item !== maku
          );

          if (!this.currentActiveMesh) {//这个if下的代码只有在currentActiveMesh为null的时候才会执行 也就是当前没有选中的mesh
            console.log(this.slider,'sliderrrr')
              //放大图像实体后禁用滚轮事件
              this.slider.ws.disable();
              // this.slider.dd.disable();
            
            otherMakus.forEach((item) => {
              //把其他实体的uOpacity这个变量逐渐变成0
              gsap.to(item.mesh.material.uniforms.uOpacity, {
                value: 0,
                duration: 0.5,
              });
              
            });
            const that = this;
            gsap.to(maku.mesh.material.uniforms.uProgress, {
              value: 1,
              duration: 1,
              ease: "power2.out",
              delay: 0.5,
              onUpdate() {
                if (this.progress() >= 0.5) {//做一下延迟
                  that.currentActiveMesh = maku.mesh;
                }
              },
            });
          }




        });
      });
      this.base.container.addEventListener("click", () => {
        if (this.currentActiveMesh) {//这个if下的代码只会在当前选中了的时候才执行
          const that = this;
          gsap.to(this.currentActiveMesh.material.uniforms.uProgress, {
            value: 0,
            duration: 1,
            ease: "power2.inOut",
            onUpdate() {
              if (this.progress() >= 0.5) {//代表进程到达一半才执行 重新开启
                that.slider.ws.enable();
                that.currentActiveMesh = null;
              }
            },
          });
          this.slider.ig.iterate((item) => {
            gsap.to(item.mesh.material.uniforms.uOpacity, {//恢复图片
              value: 1,
              delay: 0.5,
              ease: "power2.out",
            });
          });
        }
      })


      document.querySelector(".loader-screen")?.classList.add("hollow");



    });
    
    
  }
}
