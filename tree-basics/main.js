import * as THREE from "three"
import "./style.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls" 
import { gsap } from "gsap"


//scene 
const scene = new THREE.Scene()

//crete our scene , blender / three js objects
const geometry = new THREE.SphereGeometry(3, 64, 64) 
// 1. radius 2-3. segments w,h 

//material 
const material = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness: 0.5,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}


//light , x,y,z positon
const light = new THREE.PointLight(0xffffff, 200, 100)
light.position.set(0, 10, 10)

scene.add(light)

//camera 1. field o view - how much can see. 2. aspect ratio
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
// distance of camera
camera.position.z = 20   
scene.add(camera)



//renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(3)
renderer.render(scene,camera)

//controls

 const controls = new OrbitControls(camera,canvas)
 controls.enableDamping = true
 controls.enablePan = false
 controls.enableZoom = false
 controls.autoRotate = true
 controls.autoRotateSpeed = 5


//resize 
window.addEventListener('resize', () => {
    //update sizes
    sizes.width = window.innerWidth 
    sizes.height = window.innerHeight
    //update camera
    camera.updateProjectionMatrix()
    camera.aspect = sizes.width / sizes.height
    renderer.setSize(sizes.width, sizes.height)
})

const loop =  () => {
    controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(loop)
}
loop()




///gsappp , timeline

const tl = gsap.timeline({defaults: {duration: 1}})
tl.fromTo(mesh.scale, {z: 0 , x:0 ,y:0} , {z:1 , x:1, y:1})
tl.fromTo("nav" , { y:"-100%" }, {y: "0%"})
tl.fromTo(".title", {opacity: 0 }, {opacity: 1})


//mouse animation Colorrrr 

let mouseDown = false 
let rgb = []
window.addEventListener("mousedown" , () =>  mouseDown = true)
window.addEventListener("mouseup" , () =>  mouseDown = false)

window.addEventListener("mousemove" , (e) => {
    if (mouseDown) {
        rgb = [
            Math.round((e.pageX / sizes.width) * 255 ),
            Math.round((e.pageY / sizes.height) * 255 ),
            150
        ]
        //animate
        let newColor = new THREE.Color(`rgb(${rgb.join(',')})`)
        gsap.to(mesh.material.color, {r:  newColor.r, g: newColor.g, b: newColor.b}, )
    }
})