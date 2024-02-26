import * as kokomi from "kokomi.js";
import * as THREE from "three";


  export default class TestObject extends kokomi.Component {
    constructor(base) {
      super(base);
      //搞一个球
      const geometry = new THREE.SphereGeometry(2, 64, 64);
      // const geometry = new THREE.PlaneGeometry(4, 4);
      //对应的材质
      const material = new THREE.ShaderMaterial({
        vertexShader: /* glsl */ `
        uniform float iTime;
        uniform vec3 iResolution;
        uniform vec4 iMouse;
            
        varying vec2 vUv;
            
        void main(){
            vec3 p=position;
            gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
            
            vUv=uv;
        }
          `,
                        fragmentShader: /* glsl */ `
        uniform float iTime;
        uniform vec3 iResolution;
        uniform vec4 iMouse;
        
        varying vec2 vUv;
        
        void main(){
            vec2 uv=vUv;
            gl_FragColor=vec4(uv,0.,1.);
        }
  `,
      });
      this.material = material;
      //   合并成mesh
      const mesh = new THREE.Mesh(geometry, material);
      this.mesh = mesh;
      //
      const uj = new kokomi.UniformInjector(this.base);
      this.uj = uj;
      material.uniforms = {
        ...material.uniforms,
        ...uj.shadertoyUniforms,
      };
      
    }
    addExisting() {
        this.container.add(this.mesh);
      }
    update() {
        this.uj.injectShadertoyUniforms(this.material.uniforms);
      }
  }
  