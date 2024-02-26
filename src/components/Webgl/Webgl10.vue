<template>
    <div>
        <canvas id="webgl10" width="300" height="300"  style="left:300px;background-color: rgb(235, 146, 102);position: absolute;z-index: 999;top:300px;"></canvas>
    </div>
</template>
<script>
export default {
    methods:{
        webGlInit() {
            var canvas=document.getElementById('webgl10');
            var gl=canvas.getContext('webgl');
            //给内置变量gl_PointSize赋值像素大小 attribute声明vec4类型变量apos
            //attribute 关键字 声明顶点相关的数据的时候就会用到 生声明了之后就可以让这个变量从JavaScript中去读取数据
            let vertexShaderSource= 
            "//attribute声明vec4类型变量apos \n\
            attribute vec4 apos;\n\
            attribute vec4 a_color;\n\
            //顶点法向量变量\n\
            attribute vec4 a_normal;\n\
            // uniform声明平行光颜色变量 uniform变量也是用于从外部传值进来，用于与顶点无关的变量\n\
            uniform vec3 u_lightColor;\n\
            //点光源位置也要传进来\n\
            uniform vec3 u_lightPosition;\n\
            //varying声明顶点颜色插值后变量\n\
            varying vec4 v_color;\n\
            void main() {\n\
            //设置几何体轴旋转角度为30度，并把角度值转化为弧度值\n\
            float radian = radians(30.0);\n\
            //求解旋转角度余弦值\n\
            float cos = cos(radian);\n\
            //求解旋转角度正弦值\n\
            float sin = sin(radian);\n\
            //绕x轴旋转30°的旋转矩阵\n\
            mat4 mx = mat4(1,0,0,0,  0,cos,-sin,0,  0,sin,cos,0,  0,0,0,1);\n\
            //绕y轴旋转30°的旋转矩阵\n\
            mat4 my = mat4(cos,0,-sin,0,  0,1,0,0,  sin,0,cos,0,  0,0,0,1); \n\
            //遍历每一个点，每个点都用两个旋转矩阵来旋转，可以两个矩阵先乘一下再和顶点的列向量相乘\n\
            gl_Position = mx*my*apos;\n\
            // 顶点法向量进行矩阵变换，然后归一化\n\
            vec3 normal = normalize((mx*my*a_normal).xyz);\n\
            //关于计算一个顶点在光照下的颜色计算 首先计算一个平行光方向向量和顶点法向量的点积 得到一个类似光照强度的概念 dot就是计算点积的 然后顶点当这个值小于零那就是0代表光照没照到 而且rgb也没有负值 最后用环境光的颜色×这个强度*顶点颜色 \n\
            // 计算平行光方向向量和顶点法向量的点积\n\
            vec3 lightDirection = normalize(vec3(gl_Position) - u_lightPosition);\n\
            float dot = max(dot(lightDirection, normal), 0.0);\n\
            // 计算反射后的颜色\n\
            vec3 reflectedLight = u_lightColor * a_color.rgb * dot;\n\
            //顶点颜色插值计算\n\
            v_color = vec4(reflectedLight, a_color.a);\n\
            }\n\
            "
            ;
            //片元着色器源码 //定义片元颜色
             var fragShaderSource =
            "precision lowp float;\n\
            varying vec4 v_color;\n\
            void main() {\n\
                gl_FragColor = v_color;\n\
            }\n\
            "
            //初始化着色器 
            var program = initShader(gl,vertexShaderSource,fragShaderSource);
            //获取顶点着色器的位置变量apos，即aposLocation指向apos变量。
            var aposLocation = gl.getAttribLocation(program,'apos');
            var a_color = gl.getAttribLocation(program,'a_color');
            var a_normal = gl.getAttribLocation(program,'a_normal');
            var u_lightColor = gl.getUniformLocation(program,'u_lightColor');
            var u_lightPosition = gl.getUniformLocation(program,'u_lightPosition');
            /**
             * 给平行光传入颜色和方向数据，RGB(1,1,1),单位向量(x,y,z)
             * 对于简单的数据 可以不用开辟显存缓冲区们直接使用gl.uniform3f(变量地址,x,y,z) 最后那个f代表传的是浮点数
             **/
            gl.uniform3f(u_lightColor, 1.0, 1.0, 1.0);
             //传入点光源的位置
            gl.uniform3f(u_lightPosition,2.0,3.0,4.0);
                        /**
             *顶点法向量数组normalData
             关于顶点法向量为什么是这样的问题？
             正常来说立方体六个面就是六个法向量，但是顶点着色器是逐个顶点进行处理，所以就变成两个三角面形成一个正方形面
             每个三角面有三个顶点，然后法向量和顶点的颜色数据运算，得到顶点颜色，再进行三角形内部插值得到每个像素的光照颜色
             **/
            var normalData = new Float32Array([
                0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,//z轴正方向——面1
                1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,//x轴正方向——面2
                0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,//y轴正方向——面3
                -1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,//x轴负方向——面4
                0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,//y轴负方向——面5
                0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1//z轴负方向——面6
            ]);
            /**
             创建缓冲区normalBuffer，传入顶点法向量数据normalData
             **/
            var normalBuffer=gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER,normalData,gl.STATIC_DRAW);
            gl.vertexAttribPointer(a_normal,3,gl.FLOAT,false,0,0);
            gl.enableVertexAttribArray(a_normal);
            // webgl默认的投影方向是z轴方向  默认的坐标系是类似平面的x左右y上下z垂直屏幕向外
           //        8个顶点坐标数组
           var data=new Float32Array([
            .5,.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,.5,.5,-.5,-.5,.5,.5,-.5,.5,      //面1
            .5,.5,.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,.5,.5,-.5,-.5,.5,.5,-.5,      //面2
            .5,.5,.5,.5,.5,-.5,-.5,.5,-.5,.5,.5,.5,-.5,.5,-.5,-.5,.5,.5,      //面3
            -.5,.5,.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,.5,.5,-.5,-.5,-.5,-.5,-.5,.5,//面4
            -.5,-.5,-.5,.5,-.5,-.5,.5,-.5,.5,-.5,-.5,-.5,.5,-.5,.5,-.5,-.5,.5,//面5
            .5,-.5,-.5,-.5,-.5,-.5,-.5,.5,-.5,.5,-.5,-.5,-.5,.5,-.5,.5,.5,-.5 //面6
           ]);
           var colorData = new Float32Array([
                1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0,//红色——面1
                1,0,0,0,1,0,0,0,1, 0,1,0, 0,1,0, 0,1,0,//绿色——面2
                0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1,//蓝色——面3
                1,1,0, 1,1,0, 1,1,0, 1,1,0, 1,1,0, 1,1,0,//黄色——面4
                0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0,//黑色——面5
                1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1 //白色——面6
            ]);
            //内存中顶点数据输入显存 提高图形的处理效率
            //创建颜色数据的缓冲区 传入cloorData
            var colorBuffer=gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER,colorData,gl.STATIC_DRAW);
            gl.vertexAttribPointer(a_color,3,gl.FLOAT,false,0,0);
            gl.enableVertexAttribArray(a_color);
            //创建顶点缓冲区对象
            var buffer=gl.createBuffer();
            //绑定缓冲区对象,激活buffer
            gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
            //顶点数组data数据传入缓冲区
            gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
            gl.vertexAttribPointer(aposLocation,3,gl.FLOAT,false,0,0);
            //允许数据传递
            gl.enableVertexAttribArray(aposLocation);

            //LINE_LOOP模式绘制前四个点  使用drawElements进行绘制 多了一个参数gl.UNSIGNED_BYTE 
            //drawElements(mode, count, type, offset) count绘制的顶点个数 
            //mode 绘制模式 gl.LINE_LOOP、gl.LINES、gl.TRIANGLES 
            //type 数据类型 	gl.UNSIGNED_BYTE对应Uint8Array，gl.UNSIGNED_SHORT对应Uint16Array
            //offest 从第几个点开始绘制
            //LINES模式绘制后8个点 前后前后前后前后连线 形成完整的线框多边形
            gl.enable(gl.DEPTH_TEST);
            gl.drawArrays(gl.TRIANGLES,0,36);

            //声明初始化着色器函数 可以先当成一个黑盒
            function initShader(gl,vertexShaderSource,fragmentShaderSource){
                //创建顶点着色器对象
                var vertexShader = gl.createShader(gl.VERTEX_SHADER);
                //创建片元着色器对象
                var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
                //引入顶点、片元着色器源代码
                gl.shaderSource(vertexShader,vertexShaderSource);
                gl.shaderSource(fragmentShader,fragmentShaderSource);
                //编译顶点、片元着色器
                gl.compileShader(vertexShader);
                gl.compileShader(fragmentShader);
                //创建程序对象program
                var program = gl.createProgram();
                //附着顶点着色器和片元着色器到program
                gl.attachShader(program,vertexShader);
                gl.attachShader(program,fragmentShader);
                //链接program
                gl.linkProgram(program);
                //使用program
                gl.useProgram(program);
                //返回程序program对象
                return program;
            }
        }
    },
    mounted(){
        this.webGlInit()
    }
}
</script>
<style  scope>
.myWebglWindow2{
    
    
    
    top: 0;
    
}
</style>