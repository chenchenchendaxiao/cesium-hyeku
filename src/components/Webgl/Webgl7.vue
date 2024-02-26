<template>
    <div>
        <canvas id="webgl7" width="300" height="300"  style="left:1800px;background-color: rgb(31, 179, 142);position: absolute;z-index: 999;top:0px;"></canvas>
    </div>
</template>
<script>
export default {
    methods:{
        webGlInit() {
            var canvas=document.getElementById('webgl7');
            var gl=canvas.getContext('webgl');
            //给内置变量gl_PointSize赋值像素大小 attribute声明vec4类型变量apos
            //attribute 关键字 声明顶点相关的数据的时候就会用到 声明了之后就可以让这个变量从JavaScript中去读取数据
            var vertexShaderSource = 
            "//attribute声明vec4类型变量apos 以及顶点颜色变量a_color 这俩都要从外面传进来的\n\
            attribute vec4 apos;\n\
            attribute vec4 a_color;\n\
            //varying声明顶点颜色插值后变量\n\
            varying vec4 v_color;\n\
            void main() {\n\
                gl_Position = apos;v_color = a_color;\n\
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
            //获取顶点着色器的位置变量apos，即aposLocation指向apos变量。js的a_color变量指向顶点着色器的a_color变量
            var aposLocation = gl.getAttribLocation(program,'apos');
            var a_color = gl.getAttribLocation(program,'a_color');
               /**
            创建顶点位置数据数组data，存储两个顶点(-0.5,0.5、(0.5,0.5)
            创建顶点颜色数组colorData，存储两个顶点对应RGB颜色值(0,0,1)、(1,0,0)
            **/
            var data=new Float32Array([-0.5,0.5,0.5,0.5,0.5,-0.5]);
            var colorData = new Float32Array([1,0,0,0,1,0,0,0,1]);
            //创建颜色数据的缓冲区 传入cloorData
            var colorBuffer=gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER,colorData,gl.STATIC_DRAW);
            gl.vertexAttribPointer(a_color,3,gl.FLOAT,false,0,0);
            gl.enableVertexAttribArray(a_color);

            //内存中顶点数据输入显存 提高图形的处理效率

            //创建缓冲区对象
            var buffer=gl.createBuffer();
            //绑定缓冲区对象,激活buffer
            gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
            //顶点数组data数据传入缓冲区
            gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
            
            gl.vertexAttribPointer(aposLocation,2,gl.FLOAT,false,0,0);
            //允许数据传递
            gl.enableVertexAttribArray(aposLocation);
            //开始绘制图形
            gl.drawArrays(gl.TRIANGLES,0,3);

            
    //声明初始化着色器函数
    function initShader(gl,vertexShaderSource,fragmentShaderSource){
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(vertexShader,vertexShaderSource);
        gl.shaderSource(fragmentShader,fragmentShaderSource);
        gl.compileShader(vertexShader);
        gl.compileShader(fragmentShader);
        var program = gl.createProgram();
        gl.attachShader(program,vertexShader);
        gl.attachShader(program,fragmentShader);
        gl.linkProgram(program);
        // add this for extra debugging
    if ( !gl.getProgramParameter( program, gl.LINK_STATUS) ) {
      var info = gl.getProgramInfoLog(program);
      throw new Error('Could not compile WebGL program. \n\n' + info);
    }

        gl.useProgram(program);
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
    position: absolute;
    background-color: rgb(228, 132, 7);
    z-index: 999;
    top: 0;
    left: 300px;
}
</style>