<template>
    <div>
        <canvas id="webgl5" width="300" height="300"  style="left: 1200px;background-color: rgb(204, 248, 10);position: absolute;z-index: 999;top:0;"></canvas>
    </div>
</template>
<script>
export default {
    methods:{
        webGlInit() {
            var canvas=document.getElementById('webgl5');
            var gl=canvas.getContext('webgl');
            //给内置变量gl_PointSize赋值像素大小 attribute声明vec4类型变量apos
            //attribute 关键字 声明顶点相关的数据的时候就会用到 生声明了之后就可以让这个变量从JavaScript中去读取数据
            let vertexShaderSource= 
            "//attribute声明vec4类型变量apos \n\
            attribute vec4 apos;\n\
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
           //创建立方体的顶点坐标数据
            var data=new Float32Array([
                //z为0.5时，xOy平面上的四个点坐标
                 0.5,  0.5,  0.5,
                -0.5,  0.5,  0.5,
                -0.5, -0.5,  0.5,
                 0.5, -0.5,  0.5,
                //z为-0.5时，xOy平面上的四个点坐标
                 0.5,  0.5, -0.5,
                -0.5,  0.5, -0.5,
                -0.5, -0.5, -0.5,
                 0.5, -0.5, -0.5,
                //上面两组坐标分别对应起来组成一一对
                0.5,  0.5,  0.5,
                0.5,  0.5,  -0.5,

                -0.5,  0.5,  0.5,
                -0.5,  0.5,  -0.5,

                -0.5, -0.5,  0.5,
                -0.5, -0.5,  -0.5,

                0.5, -0.5,  0.5,
                0.5, -0.5,  -0.5,
            ]);
                
            //内存中顶点数据输入显存 提高图形的处理效率

            //创建缓冲区对象
            var buffer=gl.createBuffer();
            //绑定缓冲区对象,激活buffer
            gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
            //顶点数组data数据传入缓冲区
            gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
            gl.vertexAttribPointer(aposLocation,3,gl.FLOAT,false,0,0);
            //允许数据传递
            gl.enableVertexAttribArray(aposLocation);
            //LINE_LOOP模式绘制前四个点
            gl.drawArrays(gl.LINE_LOOP,0,4);
            //LINE_LOOP模式从第五个点开始绘制四个点
            gl.drawArrays(gl.LINE_LOOP,4,4);
            //LINES模式绘制后8个点
            gl.drawArrays(gl.LINES,8,8);

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