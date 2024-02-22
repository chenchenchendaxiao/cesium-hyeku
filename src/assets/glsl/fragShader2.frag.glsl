void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fragCoord/iResolution.xy;
    //将画布长除以画布宽就能算出画布比例，再将UV的x坐标与比例相乘
    uv.x*=iResolution.x/iResolution.y;
    //uv居中处理 
    uv=(uv-.5)*2.;
    float d=length(uv);
    float c=.25/d;
    c=pow(c,1.6);

    // d-=.5;
    //step函数 接收一个分界阈值和对比值 对比值比分界点小就返回0 大就返回1  避免使用if 提高性能
    //smoothstep函数 平滑过度 传入两个边界值和一个对比值 再边界值之间就返回平滑过渡
    // c=step(0.,d);
    // float c=smoothstep(0.,.2,d);
    // fragColor=vec4(vec3(d),1.);
    fragColor=vec4(vec3(c),1.);


    
}
