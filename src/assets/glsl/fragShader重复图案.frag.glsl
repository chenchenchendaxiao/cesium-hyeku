float opUnion(float d1,float d2)
{
    return min(d1,d2);
}
void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fragCoord/iResolution.xy;
    //将画布长除以画布宽就能算出画布比例，再将UV的x坐标与比例相乘
    uv.x*=iResolution.x/iResolution.y;
    uv=fract(uv*16.);
    vec3 c=vec3(opUnion(step(.1,uv.x),step(.1,uv.y)));
    fragColor=vec4(c,1.);

}
