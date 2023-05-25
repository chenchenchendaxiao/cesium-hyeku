varying vec2 v_st;
//sampler2D是一个图片源经过webgl处理的像素数据集
uniform sampler2D wenli;
void main() {
    // gl_FragColor = vec4(1.0,1.0,0.0,1.0);
    gl_FragColor = texture2D(wenli,v_st);
}
