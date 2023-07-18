import * as THREE from 'three'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import CameraControl from 'camera-controls';
import MyScene from './MyScene';
CameraControl.install({THREE:THREE})
export default class MapShow extends THREE.EventDispatcher {
    constructor(id){
        super()
        this.time=0
        this.initThree(id)
        this.myScene = new MyScene(this)
        this.myScene.setCurArea({value:'浙江省',label:'浙江省',level:1,updateRoute:false})
        // alert('next')
    }
    //初始化three场景中需要用到的各种东西 scene camera renderer css2DRenderer
    initThree(id){
        const canvas = document.getElementById(id)
        //初始化场景
        const scene = new THREE.Scene()
        scene.background=null
        //初始化相机
        const camera = new THREE.PerspectiveCamera(75,canvas.clientWidth/canvas.clientHeight,0.01,10000)
        camera.up.set(0,0,1)
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias:true,
            alpha:true,
            logarithmicDepthBuffer:true
        })
        renderer.setClearColor('#011320',0.0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(canvas.clientWidth,canvas.clientHeight)
        renderer.shadowMap.type=THREE.PCFShadowMap;
        renderer.shadowMap.enabled = true;
        const css2DRender = new CSS2DRenderer()
        css2DRender.setSize(canvas.clientWidth,canvas.clientHeight)
        css2DRender.domElement.style.position='absolute'
        css2DRender.domElement.style.top = 0
        css2DRender.domElement.style.pointerEvents = 'none'
        document.body.appendChild(css2DRender.domElement);
        this.css2DRender = css2DRender
        this.scene = scene;
        this.renderer = renderer;
        this.camera = camera;
        this.canvas = canvas;
        console.log(this.renderer,'this.renderer')
        this.renedr = this.render.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.initControl();
        const clock = new THREE.Clock();
        this.clock = clock;
        console.log(this.clock.getDelta(),'this.clock.getDelta()')
        // console.log(this.clock,'this.clock')
        this.render();
        // alert('success')
        window.addEventListener('resize',this.onWindowResize,false)
        this.canvas.addEventListener('resize',this.onWindowResize);
    }
    setCurArea(options){
        this.myScene.setCurArea(options)
    }
    getCameraPose(){
        const {camera,orbit} = this;
        return{
            position:camera.position.clone(),
            target:orbit.target.clone()
        }
    }
    setCameraPose({position,target},transition = true){
        const {cameraControl} = this;
        return cameraControl.setLookAt(position.x,position.y,position.z,target.x,target.y,target.z,transition);    
    }
    onWindowResize(){
        this.camera.aspect = window.innerWidth/window.innerHeight
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth,window.innerHeight)
        this.css2DRender.setSize(window.innerWidth,window.innerHeight)
    }
    render(){
        if(this){
          const delta = this.clock.getDelta();
          this.cameraControl.update(delta);
          this.renderer.render(this.scene,this.camera);
          this.css2DRender.render(this.scene,this.camera);
          this.myScene &&this.myScene.update();
          this.renderHandler = window.requestAnimationFrame(this.render);  
        //   alert('aaa')
        //   alert('aaa')
        }
        
    }
    cancleRender(){
        cancelAnimationFrame(this.renderHandler)
        console.log('three is stop')
    }
    initControl(){
        const {camera,renderer} = this;
        const cameraControl = new CameraControl(camera,this.renderer.domElement)
        this.cameraControl = cameraControl;
        console.log(this.cameraControl,'this.cameraControl')
    }
    destory(){
        this.cameraControl.dispose();
        this.css2DRender.domElement.remove()
        super.removeEventListener('area_changed')
    }

}