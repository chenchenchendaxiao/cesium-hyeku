varying vec2 v_st;
//sampler2D是一个图片源经过webgl处理的像素数据集
uniform sampler2D wenli;
uniform vec2 iResolution;
void main() {
    // gl_FragColor = vec4(1.0,1.0,0.0,1.0);
    //webgl的坐标系范围只是 -1 -  1
    //这一段是把窗口坐标转换成webgl的空间坐标
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    float d = uv.x;
    //通过调整r的大小可以调整速率
    float r = 0.01;
    r = abs(sin(r * czm_frameNumber));
    vec4 wenliColor = texture2D(wenli,v_st);
    //注释代码的效果是窄的单色灯带扫描纯色四棱锥
    // gl_FragColor = vec4(1.0,1.0,0.0,0.1);
    // if(d >= r && d <= r + 0.01){
    //    gl_FragColor = vec4(1.0)
    // }
    // if(smoothstep(r,r+0.003,d)-smoothstep(r+0.006,r+0.09,d)){
    //     gl_FragColor = vec4(1.0);
    // }
    //这是一个用于制作线性插值的比例
    float c = smoothstep(r, r+0.003, d) - smoothstep(r + 0.006,r + 0.009, d);
    //   gl_FragColor = vec4(c);
    //扫描光带中间的颜色
    vec4 originColor = vec4(0,245.0,255.0,1.0);
    vec4 guangdaiColor = vec4(mix(wenliColor,originColor,c));
    // vec4 guangdaiColor = vec4(mix(wenliColor,vec4(c),c));
    gl_FragColor = guangdaiColor;
}
