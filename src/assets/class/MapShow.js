import * as THREE from 'three'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
export default class MapShow extends THREE.EventDispatcher {
    constructor(id){
        super()
        this.id=id;
        this.container = document.getElementById(this.id);
        this.setScene()
        this.setCamera()
        this.setRenderer()
        this.setController()
        this.setLight()
    }
    setScene(){
        this.scene = new THREE.Scene()
    }
    setCamera() {
        // 第二参数就是 长度和宽度比 默认采用浏览器  返回以像素为单位的窗口的内部宽度和高度
        this.camera = new THREE.PerspectiveCamera(
          75,//摄像机视锥体垂直视野角度
          window.innerWidth / window.innerHeight,//长宽比
          0.1,//近端面距离
          500//远端面
        );
        
        this.camera.position.set(0, -5, 1);  // 0, -5, 1
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));  // 0, 0, 0 this.scene.position
      }
      setRenderer() {
        //初始化两个渲染器 包括webgl的和css的
        this.renderer = new THREE.WebGLRenderer({ 
          antialias: true,
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        // this.renderer.sortObjects = false;  // 是否需要对对象排序
        this.container.appendChild(this.renderer.domElement);
        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize(this.container.clientWidth, this.container.clientHeight);
        
        //Sets device pixel ratio. This is usually used for HiDPI device to prevent blurring(模糊) output canvas.
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = 0;
        this.container.appendChild(this.labelRenderer.domElement);
      }
      setController() {
        this.controller = new OrbitControls(this.camera, this.labelRenderer.domElement);
		this.controller.minDistance = 2;
		this.controller.maxDistance = 5.5  // 5.5
 
        // 阻尼（惯性）
        this.controller.enableDamping = true;
		this.controller.dampingFactor = 0.04;
 
        this.controller.minAzimuthAngle = -Math.PI / 4;
		this.controller.maxAzimuthAngle = Math.PI / 4;
 
        this.controller.minPolarAngle = 1;
				this.controller.maxPolarAngle = Math.PI - 0.1;
 
        // 修改相机的lookAt是不会影响THREE.OrbitControls的target的
        // this.controller.target = new THREE.Vector3(0, -5, 2); 
        
      }
      setLight() {
        const ambientLight = new THREE.AmbientLight(0x404040, 1.2);
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        this.scene.add(directionalLight); 
 
        // 聚光光源 - 照模型
        // const spotLight = new THREE.SpotLight(0xffffff, 0.9);
        // spotLight.position.set(1, -4, 4);
        // spotLight.castShadow = true;
        // this.scene.add(spotLight);
        // 聚光光源辅助线
        // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
        // this.scene.add(spotLightHelper);
 
        // 点光源 - 照模型
        const test = new THREE.PointLight("#ffffff", 1.8, 20);
        test.position.set(1, -7, 7);
        this.scene.add(test);
        const testHelperMap = new THREE.PointLightHelper(test);
        this.scene.add(testHelperMap);
 
        // 点光源 - 蓝色照地球
        const pointLightMap = new THREE.PointLight("#4161ff", 1.4, 20);
        pointLightMap.position.set(0, 7, 3);
        this.scene.add(pointLightMap);
        const spotLightHelperMap = new THREE.PointLightHelper(pointLightMap);
        // this.scene.add(spotLightHelperMap);
      }
}