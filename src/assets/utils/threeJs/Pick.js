import * as THREE from 'three'
export default class Pick extends THREE.EventDispatcher {
    constructor(camera,domElement){
        super()
        // console.log(camera,domElement,'Pick')
        this.camera = camera;
        this.domElement = domElement;
        this.pointer = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.group = null;
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
        this.domElement.addEventListener('mousedown',this.onMouseDown)
        this.domElement.addEventListener('mouseup',this.onMouseUp)
    }
    onMouseDown(event){
        const {x,y} = this.getPointer(event)
        this.pointer.x=x
        this.pointer.y=y
    }
    getPointer(event){
        this.isMouseDown = true;
        event.preventDefault()
        //domElement非全屏切部靠右对齐偏移处理
        const x = ((event.clientX-this.domElement.offsetLeft)/this.domElement.clientWidth)*2 -1
        //omElement.offsetLeft  -- domElement元素距离浏览器左侧的距离   domElement.clientWidth  -- domElement元素宽度
        const y = -((event.clientY -this.domElement.offsetTop )/this.domElement.clientHeight)*2+1
        return {x,y}
    }
    onMouseUp(event){
        this.isMouseDown - false;
        let {x,y}=this.getPointer(event)
        if(Math.abs(x-this.pointer.x)>0.1||Math.abs(y-this.pointer.y)>0.1){
            this.pointer.x=0;
            this.pointer.y=0;
            return
        }
        this.update()
        this.dispatchEvent({type:'click',intersects:this.intersects})
    }
    setObject(obs){
        this.objects = obs;
    }
    update(){
        if(!this.objects) return
        const {raycaster,pointer,camera}=this
        raycaster.setFromCamera(pointer,camera)
        this.intersects = raycaster.intersectObject(this.objects,false)
    }
    destroy(){
        this.camera = null;
        this.domElement.removeEventListener('mouseclick',this.onMouseDown)
        this.domElement.removeEventListener('mouseup',this.onMouseUp)
    }
}