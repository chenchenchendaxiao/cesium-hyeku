<template>
    <div>
        <canvas id="webgl12"  width="300" height="300"  style="left:900px;background-color: rgb(94, 231, 146);position: absolute;z-index: 999;top:300px;"></canvas>
    </div>
</template>
<script>
export default {
    methods:{
        webGlInit() {
            
            var canvas=document.getElementById('webgl12');
            var gl=canvas.getContext('webgl');
            //给内置变量gl_PointSize赋值像素大小 attribute声明vec4类型变量apos
            //attribute 关键字 声明顶点相关的数据的时候就会用到 声明了之后就可以让这个变量从JavaScript中去读取数据
            var vertexShaderSource = 
            "//声明顶点位置坐标 纹理坐标 插值后纹理坐标 \n\
            attribute vec4 a_Position;\n\
            attribute  vec2 a_TexCoord;\n\
            varying vec2 v_TexCoord;\n\
            void main() {\n\
                gl_Position = a_Position;v_TexCoord = a_TexCoord;\n\
            }\n\
            "
            ;
            //片元着色器源码 //定义片元颜色
             var fragShaderSource =
             //定义着色器中float的精度 接收插值之后的纹理坐标 定义传进来的纹理图片要素数据
            "precision lowp float;\n\
            //接收插值后的纹理坐标 接收纹理图片像素数据 \n\
            varying vec2 v_TexCoord;\n\
            uniform sampler2D u_Sampler;\n\
            void main() {\n\
                // 采集纹素，逐片元赋值像素值\n\
                gl_FragColor = texture2D(u_Sampler,v_TexCoord);\n\
            }\n\
            "
            //初始化着色器
            var program = initShader(gl,vertexShaderSource,fragShaderSource);
            /**
            * 从program对象获取相关的变量
            * attribute变量声明的方法使用getAttribLocation()方法
            * uniform变量声明的方法使用getAttribLocation()方法
            **/
            var a_Position = gl.getAttribLocation(program,'a_Position');
            var a_TexCoord = gl.getAttribLocation(program,'a_TexCoord');
            var u_Sampler = gl.getUniformLocation(program,'u_Sampler');
            //先定义四个顶点的坐标数据 z轴为0 就是定义这个贴图要贴在webgl坐标系中的什么位置
            var data=new Float32Array([
             -0.5, 0.5,//左上角——v0
             -0.5,-0.5,//左下角——v1
             0.5,  0.5,//右上角——v2
             0.5, -0.5 //右下角——v3
            ]);
            //创建UV纹理坐标数据textureData
            //所谓的纹理映射就是把2D的纹理坐标系统映射到webgl的三维坐标体系中
            var textureData = new Float32Array([
                0,1,//左上角——uv0
                0,0,//左下角——uv1
                1,1,//右上角——uv2
                1,0 //右下角——uv3
            ]);


            //内存中顶点数据输入显存 提高图形的处理效率

            //创建缓冲区对象
            var buffer=gl.createBuffer();
            //绑定缓冲区对象,激活buffer
            gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
            //顶点数组data数据传入缓冲区
            gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
            
            gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
            //允许数据传递
            gl.enableVertexAttribArray(a_Position);
            /**
            创建缓冲区textureBuffer，向顶点着色器传入顶点纹理坐标数据textureData
             **/
            var textureBuffer=gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER,textureBuffer);
            gl.bufferData(gl.ARRAY_BUFFER,textureData,gl.STATIC_DRAW);
            gl.vertexAttribPointer(a_TexCoord,2,gl.FLOAT,false,0,0);
            gl.enableVertexAttribArray(a_TexCoord);
            var image = new Image()
            image.src=require('@/assets/imgs/texture.jpg')
            new Promise ((reselve,reject)=>{
                image.onload=function(){
                    console.log(image.width,image.height,'onload')
                    var texture = gl.createTexture();//创建纹理图像缓冲区
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //纹理图片上下反转
                    gl.activeTexture(gl.TEXTURE0);//激活0号纹理单元TEXTURE0
                    gl.bindTexture(gl.TEXTURE_2D, texture);//绑定纹理缓冲区
                    //设置纹理贴图填充方式(纹理贴图像素尺寸大于顶点绘制区域像素尺寸)
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    //设置纹理贴图填充方式(纹理贴图像素尺寸小于顶点绘制区域像素尺寸)
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    //设置纹素格式，jpg格式对应gl.RGB
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
                    gl.uniform1i(u_Sampler, 0);//纹理缓冲区单元TEXTURE0中的颜色数据传入片元着色器
                    // 进行绘制
                    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
                }
            })
            //开始绘制图形
            // gl.drawArrays(gl.TRIANGLES,0,3);

            
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