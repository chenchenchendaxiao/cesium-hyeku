import pyramidFrag from '@/assets/glsl/pyramid.frag.glsl'
import pyramidVert from '@/assets/glsl/pyramid.vert.glsl'
export default class PyramidPrimitive {
    constructor(){
        this.drawCommand = null
        this._texture = null
        this._image = null
    }
    //生成一个四棱锥geometry
    createPyramidGeometry(){
        //  处理 顶点数据
        let positions = []
        //顶点索引 用于定义如何连接这些点
        let indices = []
        let st = [
            0.5,0.5,
            0.0,1.0,
            1.0,1.0,
            0.0,0.0,
            1.0,0.0
        ]
        // let st = new Float32Array([
        //     0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
        //     0.0, 1.0, 0.5, 0.5,
        // ])
        //四棱锥底部的高度
        let groundHeight = 10
        // 四棱锥顶部的高度
        let topHeight = 150
        function vector2Add(vec1, vec2) {
            return [vec1[0] + vec2[0], vec1[1] + vec2[1]]
        }

        function transformPos(lonlat, height) {
            let pos = Cesium.Cartesian3.fromDegrees(lonlat[0], lonlat[1], height)
            return [pos.x, pos.y, pos.z]
        }
        let center = [120.154789,30.251754 ]
        let point1 = vector2Add(center, [-0.001, 0.001])
        let point2 = vector2Add(center, [0.001, 0.001])
        let point3 = vector2Add(center, [-0.001, -0.001])
        let point4 = vector2Add(center, [0.001, -0.001])
        // console.log(point1,point2,point3,point4,'points')
        positions.push(...transformPos(center, groundHeight),
         ...transformPos(point1, topHeight),
         ...transformPos(point2, topHeight),
         ...transformPos(point3, topHeight), 
         ...transformPos(point4, topHeight))
        console.log(positions,'pos')
        // this.leftTopPos = new Cesium.Cartesian3(...transformPos(point1,topHeight));
        this.v1= new Cesium.Cartesian3(...transformPos(center,groundHeight))
        this.v2= new Cesium.Cartesian3(...transformPos(center,topHeight))
        indices = [ 
            0,1,2,
            0,1,3,
            0,3,4,
            0,2,4,
            1,2,3,
            2,3,4
        ]
        let geometry = new Cesium.Geometry({
            //  告诉cesium 你需要怎样读 数组里面的内容
            attributes: {
                position: new Cesium.GeometryAttribute({
                    componentDatatype: Cesium.ComponentDatatype.FLOAT,
                    componentsPerAttribute: 3,
                    values: new Float32Array(positions)
                }),
                st: new Cesium.GeometryAttribute({
                    componentDatatype: Cesium.ComponentDatatype.FLOAT,
                    componentsPerAttribute: 2,
                    values: new Float32Array(st)
                })
            },
            indices: indices,
            boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
        })
        return geometry
    }
    //创建纹理的命令
    createTexture(context){
        if(this._image == null){
            this._image = new Image()
            this._image.src = `./static/Dog.jpeg`
            let that = this
            this._image.onload = function(img){
            console.log(this._image)
            let vTexture = new Cesium.Texture({
                context: context,
                source: that._image
            });
            that._texture = vTexture
        }
        }
    }

    //创建绘制命令
    createDrawCommand(context) {

        let geometry = this.createPyramidGeometry()

        let vertexArray = Cesium.VertexArray.fromGeometry({
            context: context,
            geometry: geometry,
            attributeLocations: Cesium.GeometryPipeline.createAttributeLocations(geometry),
        });

        let shaderProgram = Cesium.ShaderProgram.fromCache({
            context: context,
            vertexShaderSource: pyramidVert,
            fragmentShaderSource: pyramidFrag,
            attributeLocations: Cesium.GeometryPipeline.createAttributeLocations(geometry),
        })
        
        let uniformMap = {
            v1: ()=>{
                return this.v1;
            },
            v2:()=>{
                return this.v2;
            },
            wenli: ()=>{
                //由于图片的加载是一个异步的过程，所以可能还没加载到图片，this._texture还是一个null
                //的时候就已经在运行着色器了 这时候会报错 所以要先判断是否已经定义完成 没有的话返回一个默认的纹理
                if(Cesium.defined(this._texture)){
                    return this._texture;
                } else {
                    return context.defaultTexture;
                }
            }
        }

        let renderState = Cesium.RenderState.fromCache({
            depthTest:{
                flat: true,
            }
        })

        this.drawCommand = new Cesium.DrawCommand({
            vertexArray: vertexArray,
            shaderProgram: shaderProgram,
            uniformMap: uniformMap,
            renderState: renderState,
            pass: Cesium.Pass.OPAQUE
        })

    }
    update(frameState){
        //在每一帧更新时检查是否存在新定义的这个drawCommand（绘制命令）,假如不存在就新建一个并加入到命令队列中
        if(this.drawCommand === null){
            this.createDrawCommand(frameState.context)
        }
        if(this._texture === null){
            this.createTexture(frameState.context)
        }
        frameState.commandList.push(this.drawCommand)
    }
}