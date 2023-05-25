import PyramidPrimitive from '@/assets/class/pyramidPrimitive'

export const addDanceGeometry=(viewer,DTGlobe)=>{
    // createAnPyramidGeometry()
    // alert('执行')
    viewer.scene.primitives.add(new PyramidPrimitive())
}
