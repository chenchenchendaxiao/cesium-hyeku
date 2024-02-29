import * as kokomi from "kokomi.js";
import * as THREE from "three";
//引入着色器代码
import testObjectVertexShader from "../Shaders/TestObject/vert.glsl";
import testObjectFragmentShader from "../Shaders/TestObject/frag.glsl";

  export default class TestObject extends kokomi.Component {
    constructor(base) {
      super(base);
      //搞一个球
      const geometry = new THREE.SphereGeometry(2, 64, 64);
      // const geometry = new THREE.PlaneGeometry(4, 4);
      //对应的材质
      const material = new THREE.ShaderMaterial({
        vertexShader: testObjectVertexShader,
        fragmentShader: testObjectFragmentShader,
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
  