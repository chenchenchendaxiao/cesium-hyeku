import * as THREE from 'three'
import * as d3 from 'd3-geo'
import * as Maker from './maker';
import Pick from './Pick';
import axios from 'axios';
import * as Constant from './constant'
import { getRotation } from './versor';
export default class MyScene extends THREE.EventDispatcher {
    constructor(mapshow){
        super();
        this.mapshow = mapshow;
        console.log(this,'myscene-this')
        this.lastScene = undefined;
        this.loadPromise = this.init().then(()=>{
            // this.setShow(false)
        })
        this.mapshow.camera.position.set(0,0,800);
        this.pick = new Pick(this.mapshow.camera,this.mapshow.renderer.domElement)
        this.pick.addEventListener('click',(e)=>{
            if(!e) return;
            if(!e.intersects) return
            //取一下最上层的
            let first = e.intersects[0];
            if(!first) return;
            let mesh = first.object;
            if(!(mesh instanceof THREE.Sprite)) return;
            let properties = mesh.userData;
            console.log(properties,'点到的sprite的属性')
        })
    }
    async init(){
        // 1.设置场景的宽高
        this.width=2000;
        this.height=2000;
        // 2.对场景内的Group进行偏移 移动到地图中心点 不然在xy平面的第一象限内
        this.root = new THREE.Group();
        this.mapshow.scene.add(this.root)
        this.root.translateX(-this.width/2)
        this.root.translateY(-this.height/2)
        this.sceneInfos = {};
        let _that = this
        axios.get('static/浙江省full.json')
            .then(response => {
              console.log(response.data.features[0],'读取数据');
              let outlineFeature =response.data.features[0];
              outlineFeature.geometry.type="Polygon"
              outlineFeature.geometry.coordinates=outlineFeature.geometry.coordinates[0]
              console.log(outlineFeature,'outlineFeature',this.width,'this.width',)
              _that.projection = _that.getProjection(outlineFeature,this.width,this.height)
              _that.geopath = d3.geoPath(_that.projection)
              console.log('_that.geopath ',_that.geopath )
            });
    }
    validArea(name,level){
        if(level === 2 && name !== '杭州市'){
            console.error('不支持该区域',name)
            return false
        }
        return true;
    }
    async setCurArea(options,animation = true){
        const {label,value,level,updateRoute} = options
        if(!this.validArea(value,level)){
            return
        }
        let sceneInfo = this.sceneInfos[value];
        if(!sceneInfo){
            const outlineFeature = await this.getOutlineFeature(value,level)
            const geojson = await this.getGeojson(value,level)
            console.log(outlineFeature,'outlineFeature')
            console.log(geojson,'geojson')
            // console.log(this,'this')
            let bounds = this.geopath.bounds(outlineFeature);
            console.log(import.meta.url,'import.meta.url')
            let {width,height,center } = this.getSizeOfBounds(bounds)
            sceneInfo = this.getOrMakeScene({
                id:value,
                show:false,
                level:level+1,
                width,
                height,
                center,
                outlineFeature:outlineFeature,
                areaAndLabel:{
                    featureCollection:geojson,
                    getFeatureFunc:(feature) => Maker.getTexture(feature.properties._name,'市')
                }
            })
        }
    }
    makeBaseMap(root,outlineFeature,projection){
        //可以用来绘制二维平面
        const shape = new THREE.Shape()
        let pointsLonLat=outlineFeature.geometry.coordinates[0][0];
        // console.log(pointsLonLat,'pointsLonLat')
        for (let i = 0;i<pointsLonLat.length;i++){
            let point = pointsLonLat[i]
            console.log(point,projection,'point')
            const [x,y] = projection(point)
            console.log(x,y,'xy')
        }

    }
    getOrMakeScene(options){
        const {show,id,outlineFeature,areaAndLabel,level,poi,wangGe}=options;
        console.log(show,id,outlineFeature,areaAndLabel,level,poi,wangGe,'getOrMakeScene')
        let sceneInfo = this.sceneInfos[id];
        if(!sceneInfo){
            //添加场景根节点
            let sceneRoot = new THREE.Group();
            sceneRoot.visible=false;
            this.root.add(sceneRoot);

            const bounds = this.geopath.bounds(outlineFeature);
            const {width,height,center}=this.getSizeOfBounds(bounds)
            this.rate = Math.max(width,height)/this.width
            Constant.updateConstant(this.rate)

            //生成多层底图
            this.makeBaseMap(sceneRoot,outlineFeature,this.projection);
        }
    }
    getSizeOfBounds(bounds){
        const width = Math.abs(bounds[1][0]-bounds[0][0]);
        const height = Math.abs(bounds[1][1]=bounds[0][1])
        let x = bounds[0][0]+width/2;
        let y = bounds[0][1]+height/2;
        return {width,height,center:[x,y]}
    }
    async getOutlineFeature(value,level){
        //获取外轮廓geojson数据
        console.log(value,'value',level,'level','getOutlineFeature')
        let outlineFeature
        if(level==1){
            //省级数据
            if(value=='浙江省'){
                await axios.get('static/浙江省full.json').then(response=>{
                 outlineFeature =response.data.features[0];
                 
            })   
            }
        }else if(level==2){
            //市级数据
            if(value=='杭州市'){
                await axios.get('static/杭州市full.json').then(response=>{
                     outlineFeature =response.data.features[0];
                     
                })   
            }
        }
        return outlineFeature
    }
    async getGeojson(value,level){
        console.log(value,'value',level,'level','getGeojson')
        let outlineFeature
        if(level==1){
            //省级数据
            if(value=='浙江省'){
            await axios.get('static/浙江省.json').then(response=>{
                 outlineFeature =response.data;
                 
            })   
            }
        }else if(level==2){
            //市级数据
            if(value=='杭州市'){
                await axios.get('static/杭州市.json').then(response=>{
                     outlineFeature =response.data;
                     
                })   
            }
        }
        return outlineFeature
    }
    getProjection(geojson,width,height){
        // console.log(geojson,width,height,'geojson,width,height')
        const rotation = getRotation(geojson)
        // console.log(rotation,'rotation')
        const projection = d3
        .geoOrthographic()
        .reflectY(true)
        .rotate(rotation)
        .fitExtent(
            [0,0],
            [width,height],
            geojson
        );console.log(projection,'getProjection')
        return projection;
        
    }

}