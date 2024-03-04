#iChannel0 "https://s2.loli.net/2023/09/12/ySLGYKhVqH3BtN4.jpg"

#iUniform float scale = 60. in {1., 100.}
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    /// @note 归一化的屏幕坐标(from 0 to 1)
    vec2 uv = fragCoord / iResolution.xy;
    /// @note 划分网格
    vec2 id = floor(uv * scale);

    /// @note 不同网格错开不同的偏移
    vec2 offs = vec2(sin(uv.y * scale + sin(iTime * 3.) * 20. + id.y * 0.1),
                     sin(uv.x * scale + sin(iTime * 3.) * 20. + id.x * 0.1));

    offs *= .01;
    uv.xy += offs ;

    /// @note 采样图像并显示
    vec3 col = texture(iChannel0, uv).rgb;
    fragColor = vec4(col, 1.0);
}
