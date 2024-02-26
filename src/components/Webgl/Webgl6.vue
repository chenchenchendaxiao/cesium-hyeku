<template>
    <div>
        <canvas id="webgl6" width="300" height="300"  style="left:1500px;background-color: rgb(165, 80, 41);position: absolute;z-index: 999;top:0px;"></canvas>
    </div>
</template>
<script>
export default {
    methods:{
        webGlInit() {
            var canvas=document.getElementById('webgl6');
            var gl=canvas.getContext('webgl');
            //给内置变量gl_PointSize赋值像素大小 attribute声明vec4类型变量apos
            //attribute 关键字 声明顶点相关的数据的时候就会用到 生声明了之后就可以让这个变量从JavaScript中去读取数据
            let vertexShaderSource= 
            "//attribute声明vec4类型变量apos \n\
            attribute vec4 apos;\n\
            void main() {\n\
            //设置几何体轴旋转角度为30度，并把角度值转化为弧度值\n\
            float radian = radians(45.0);\n\
            //求解旋转角度余弦值\n\
            float cos = cos(radian);\n\
            //求解旋转角度正弦值\n\
            float sin = sin(radian);\n\
            //绕x轴旋转30°的旋转矩阵\n\
            mat4 mx = mat4(1,0,0,0,  0,cos,-sin,0,  0,sin,cos,0,  0,0,0,1);\n\
            //绕y轴旋转30°的旋转矩阵\n\
            mat4 my = mat4(cos,0,-sin,0,  0,1,0,0,  sin,0,cos,0,  0,0,0,1); \n\
            //遍历每一个点，每个点都用两个旋转矩阵来旋转，可以两个矩阵先乘一下再和顶点的列向量相乘\n\
            gl_Position = mx*my*apos;}\n\
            "
            ;
            //片元着色器源码 //定义片元颜色
            var fragShaderSource =
            'void main(){gl_FragColor = vec4(0.5,0.0,0.0,1.0);}' 
            //初始化着色器 
            var program = initShader(gl,vertexShaderSource,fragShaderSource);
            //获取顶点着色器的位置变量apos，即aposLocation指向apos变量。
            var aposLocation = gl.getAttribLocation(program,'apos');

            // webgl默认的投影方向是z轴方向  默认的坐标系是类似平面的x左右y上下z垂直屏幕向外
           //        8个顶点坐标数组
            var data=new Float32Array([
                0.5,  0.5,  0.5,//顶点0
                -0.5,  0.5,  0.5,//顶点1
                -0.5, -0.5,  0.5,//顶点2
                0.5, -0.5,  0.5,//顶点3
                0.5,  0.5, -0.5,//顶点4
                -0.5,  0.5, -0.5,//顶点5
                -0.5, -0.5, -0.5,//顶点6
                0.5, -0.5, -0.5,//顶点7
            ]);
         //        顶点索引数组
            var indexes = new Uint8Array([
         //        前四个点
                0,1,2,3,
         //        后四个顶点
                4,5,6,7,
         //        前后对应点
                0,4,
                1,5,
                2,6,
                3,7
            ]);
            //创建缓冲区对象
            var indexesBuffer=gl.createBuffer();
            //把缓冲区对象绑定到glwebgl上下文里面
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexesBuffer);
            //索引数组indexes数据传入缓冲区 这里用的参数是gl.ELEMENT_ARRAY_BUFFER 代表传入的是索引 这里和传入顶点数据的时候不同
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indexes,gl.STATIC_DRAW);

            //内存中顶点数据输入显存 提高图形的处理效率

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
            //前面四个点连成一个loop
            gl.drawElements(gl.LINE_LOOP,4,gl.UNSIGNED_BYTE,0);
            //LINE_LOOP模式从第五个点开始绘制四个点
            //第五个点开始的四个点绘制一个loop
            gl.drawElements(gl.LINE_LOOP,4,gl.UNSIGNED_BYTE,4);
            //LINES模式绘制后8个点 前后前后前后前后连线 形成完整的线框多边形
            gl.drawElements(gl.LINES, 8, gl.UNSIGNED_BYTE, 8);

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