mat2 rotation2d(float angle){
    float s=sin(angle);
    float c=cos(angle);

    return mat2(
        c,-s,
        s,c
    );
}

vec2 rotate(vec2 v,float angle){
    return rotation2d(angle)*v;
}
const float PI=3.14159265359;
float opRound(in float d,in float r)
{
    return d-r;
}

float opOnion(in float d,in float r)
{
    return abs(d)-r;
}

float sdEquilateralTriangle(in vec2 p,in float r)
{
    const float k=sqrt(3.);
    p.x=abs(p.x)-r;
    p.y=p.y+r/k;
    if(p.x+k*p.y>0.)p=vec2(p.x-k*p.y,-k*p.x-p.y)/2.;
    p.x-=clamp(p.x,-2.*r,0.);
    return-length(p)*sign(p.y);
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fragCoord/iResolution.xy;
    //将画布长除以画布宽就能算出画布比例，再将UV的x坐标与比例相乘
    uv.x*=iResolution.x/iResolution.y;
    //fract函数的作用是取小数点的后面那些位，这里的作用是使得画布在横向纵向重复两次
    uv=fract(uv*vec2(2.,2.));
    //uv居中处理 
    uv=(uv-.5)*2.;
    //顺时针旋转90°
    uv=rotate(uv,iTime*PI);


    float d=sdEquilateralTriangle(uv,0.5);
    // d=opRound(d,0.1)
    // d-=.5;
    // c=step(0.,d);
    float c=smoothstep(0.,.02,d);
    
    // fragColor=vec4(vec3(d),1.);
    fragColor=vec4(vec3(c),1.);


    
}
