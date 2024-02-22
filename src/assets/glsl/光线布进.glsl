// 为相机指定一个位置，将光线从相机的位置射出来，光线会不断地行进，
// 每次行进时我们会检测它是否和场景中的物体发生碰撞，如果撞到了的话，
// 就对撞到的物体进行进一步的着色处理（包括赋予颜色、计算光照等步骤），
// 反之没撞到的话，就让光线继续行进，直到整个流程结束为止。
float opSmoothUnion(float d1,float d2,float k){
    float h=clamp(.5+.5*(d2-d1)/k,0.,1.);
    return mix(d2,d1,h)-k*h*(1.-h);
}
float opUnion(float d1,float d2)
{
    return min(d1,d2);
}
vec2 opUnion(vec2 d1,vec2 d2)
{
    return(d1.x<d2.x)?d1:d2;
}

//3D球的SDF函数
float sdSphere(vec3 p,float r)
{
    return length(p)-r;
}
//3D平面的sdf函数
float sdPlane(vec3 p,vec3 n,float h)
{
    return dot(p,n)+h;
}

float map(vec3 p){
    float d=sdSphere(p-vec3(0.,0.,-2.),1.);
    float d2=sdSphere(p-vec3(0.,abs(sin(iTime))+0.8,-2),.5);
    float dPlane = sdPlane(p-vec3(0.,-1.,0.),vec3(0.,1.,0.),.1);
    d=opSmoothUnion(d,d2,.5);
    d=opUnion(d,dPlane);
    return d;
}
//在没有顶点着色器的情况下进行法向量计算
vec3 calcNormal(in vec3 p)
{
    const float h=.0001;
    const vec2 k=vec2(1,-1);
    return normalize(k.xyy*map(p+k.xyy*h)+
    k.yyx*map(p+k.yyx*h)+
    k.yxy*map(p+k.yxy*h)+
    k.xxx*map(p+k.xxx*h));
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fragCoord/iResolution.xy;
    //uv居中处理
    uv=(uv-.5)*2.;
    uv.x*=iResolution.x/iResolution.y;
    vec3 ro=vec3(0.,0.,1.);//定义一个光线起点
    vec3 rd=normalize(vec3(uv,0.)-ro);//计算每一个uv点的光线的方向向量 相当于从起点看整个uv面 每个点的光线向量都不同
    vec3 col=vec3(0.);//初始的颜色
    float depth=0.;
    for(int i=0;i<1280;i++){//总共走64步
        vec3 p=ro+rd*depth;//步进后光线的位置 原点位置加上光线方向向量与行进距离的乘积
        float d=map(p);//计算SDF函数（点在区域边界内部为正，外部为负，位于边界上时为0。）输出的距离d 这个距离d就是前进的距离d
        depth+=d;//当前前进的距离每走一步都要累加
        // float c = step( d,0.01);
        // col=vec3(c);
        if(d<.01){
    // col=vec3(1.);
        col=vec3(0.);
        vec3 normal=calcNormal(p);//计算法向量
        vec3 objectColor=vec3(1.);
        vec3 lightColor=vec3(.875,.286,.333);

        // ambient 环境光
        float ambIntensity=.2;
        vec3 ambient=lightColor*ambIntensity;
        col+=ambient*objectColor;

        // diffuse 漫反射光
        vec3 lightPos=vec3(10.,10.,10.);
        vec3 lightDir=normalize(lightPos-p);
        float diff=dot(normal,lightDir);
        diff=max(diff,0.);
        vec3 diffuse=lightColor*diff;
        col+=diffuse*objectColor;
            break;
            }

        }

fragColor=vec4(col,1.);
    // fragColor=vec4(uv.x,0.,0.,1.);
    // fragColor=vec4(0.,uv.y,0.,1.);
    // fragColor=vec4(uv,0.,1.);
    }