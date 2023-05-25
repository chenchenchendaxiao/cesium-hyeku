attribute vec3 position3DHigh;
attribute vec3 position3DLow;
attribute float batchId;
attribute vec3 position;
uniform vec3 v1;
uniform vec3 v2;
//罗德里格旋转公式是计算三维空间中，一个向量绕旋转轴旋转给定角度以后得到的新向量的计算公式
//v1 v2是两个三维的点 构成一个向量 代表旋转轴 theta代表旋转的角度
mat4 RodriguesRotation(vec3 v1, vec3 v2, float theta){
            float a = v1.x;
            float b = v1.y;
            float c = v1.z;
        
            vec3 _p = v2 - v1;
            vec3 p = normalize(_p);
            float u = p.x;
            float v = p.y;
            float w = p.z;
        
            float uu = u * u;
            float uv = u * v;
            float uw = u * w;
            float vv = v * v;
            float vw = v * w;
            float ww = w * w;
            float au = a * u;
            float av = a * v;
            float aw = a * w;
            float bu = b * u;
            float bv = b * v;
            float bw = b * w;
            float cu = c * u;
            float cv = c * v;
            float cw = c * w;
        
            float costheta = cos(theta);
            float sintheta = sin(theta);

            float _m00 = uu + (vv + ww) * costheta;
            float _m01 = uv * (1.0 - costheta) + w * sintheta;
            float _m02 = uw * (1.0 - costheta) - v * sintheta;
            float _m03 = 0.0;
        
            float _m10 = uv * (1.0 - costheta) - w * sintheta;
            float _m11 = vv + (uu + ww) * costheta;
            float _m12 = vw * (1.0 - costheta) + u * sintheta;
            float _m13 = 0.0;
        
            float _m20 = uw * (1.0 - costheta) + v * sintheta;
            float _m21 = vw * (1.0 - costheta) - u * sintheta;
            float _m22 = ww + (uu + vv) * costheta;
            float _m23 = 0.0;
        
            float _m30 = (a * (vv + ww) - u * (bv + cw)) * (1.0 - costheta) + (bw - cv) * sintheta;
            float _m31 = (b * (uu + ww) - v * (au + cw)) * (1.0 - costheta) + (cu - aw) * sintheta;
            float _m32 = (c * (uu + vv) - w * (au + bv)) * (1.0 - costheta) + (av - bu) * sintheta;
            float _m33 = 1.0;

            return mat4(_m00,_m01,_m02,_m03,_m10,_m11,_m12,_m13,_m20,_m21,_m22,_m23,_m30,_m31,_m32,_m33);
        }

void main(){
    float theta = czm_frameNumber*0.03;
    float ty = abs(cos(czm_frameNumber /30.0))*0.2;
    mat4 translateY = mat4(1,0,0,0,0,1,0,ty,0,0,1,0,0,0,0,1);
    //任意轴
    mat4  rotateAxis= RodriguesRotation(v1,v2,theta);
    vec4  rotationPos = rotateAxis * vec4(position,1.0);
    gl_Position = czm_projection * czm_modelView * rotationPos *translateY ;
}