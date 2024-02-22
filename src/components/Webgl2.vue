<template>
    <div>
        <canvas id="webgl2" width="300" height="300" class="myWebglWindow2"  ></canvas>
    </div>
</template>
<script>
export default {
    methods:{
        webGlInit() {
            var canvas=document.getElementById('webgl2');
            var gl=canvas.getContext('webgl');
            //给内置变量gl_PointSize赋值像素大小 attribute声明vec4类型变量apos
            //attribute 关键字 声明顶点相关的数据的时候就会用到 生声明了之后就可以让这个变量从JavaScript中去读取数据
            var vertexShaderSource = 
            "attribute vec4 apos;\n\
            void main() \n\
            {\n\
                gl_Position = apos; \n\
            }"
            ;
            //片元着色器源码 //定义片元颜色
            var fragShaderSource =
            'void main(){gl_FragColor = vec4(0.5,1.0,0.0,1.0);}' 
            //初始化着色器
            var program = initShader(gl,vertexShaderSource,fragShaderSource);
            //获取顶点着色器的位置变量apos，即aposLocation指向apos变量。
            var aposLocation = gl.getAttribLocation(program,'apos');
            //类型数组构造函数Float32Array创建顶点数组 作为矩形 的顶点
            var data=new Float32Array([0.5,0.5,-0.5,0.5,-0.5,-0.5,0.5,-0.5]);

            //内存中顶点数据输入显存 提高图形的处理效率

            //创建缓冲区对象
            var buffer=gl.createBuffer();
            //绑定缓冲区对象,激活buffer
            gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
            //顶点数组data数据传入缓冲区
            gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
            //缓冲区中的数据按照一定的规律传递给位置变量apos
            //gl.vertexAttribPointer(index, size, type, normalized, stride, offset); index 要修改的顶点属性的索引 就是用gl.getAttribLocation将顶点着色器内部的apos变量映射出来的aposLocation
            //size代表一个顶点读取几个数据 因为这里只控制坐标 所以只用两个数据 可以是1，2，3，4  type数组的数据类型 normalized 布尔类型 是否归一化
            //stride 连续顶点属性开始之间的偏移量 不能大于255 这里配置了0 代表中间没有间隔 上一个顶点的属性结束马上接上下一个 offside 搞不清楚
            gl.vertexAttribPointer(aposLocation,2,gl.FLOAT,false,0,0);
            //允许数据传递
            gl.enableVertexAttribArray(aposLocation);

            //开始绘制图形
            gl.drawArrays(gl.LINE_LOOP,0,4);

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
    position: absolute;
    background-color: rgb(228, 132, 7);
    z-index: 999;
    top: 0;
    left: 300px;
}
</style>