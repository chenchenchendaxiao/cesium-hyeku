import pyramidFrag from '@/assets/glsl/pyramid.frag.glsl'
import pyramidVert from '@/assets/glsl/pyramid.vert.glsl'
export default class PyramidPrimitive {
    constructor(){
        this.drawCommand = null
    }
    //生成一个四棱锥geometry
    createPyramidGeometry(){
        //  处理 顶点数据
        let positions = []
        //顶点索引 用于定义如何连接这些点
        let indices = []
        let st = []
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
                })
            },
            indices: indices,
            boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
        })
        return geometry
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
        frameState.commandList.push(this.drawCommand)
    }
}