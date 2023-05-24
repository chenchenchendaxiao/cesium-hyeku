attribute vec3 position3DHigh;
attribute vec3 position3DLow;
attribute float batchId;
attribute vec3 position;
void main(){
    gl_Position = czm_projection * czm_modelView * vec4(position,1.0 );
}