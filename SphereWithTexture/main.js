import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Loader } from 'three';

const loader =  new THREE.TextureLoader()
// Planet
const texture  = loader.load("texture.jpg")
const formap  = loader.load("Backgroun.jpg")


// EARTH
// const texture  = loader.load("texture.jpg")
// const formap  = loader.load("earth.jpg")


const scene = new THREE.Scene()
// scene.background =loader.load('2k_stars_milky_way.jpg')
scene.background =loader.load('2k_stars_milky_way.jpg')



const camera =new THREE.PerspectiveCamera( 100, window.innerWidth/window.innerHeight,1,1000)



const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#sphere'),
 });
 
 renderer.setPixelRatio( window.devicePixelRatio); //The pixel raion of the screen
 renderer.setSize(window.innerWidth,window.innerHeight); //Screen Size
 camera.position.setZ(10); //How far we want to place the camera.
 
 

// geometry Sphere/Planet
const geometry = new THREE.SphereBufferGeometry(4,32,32)

const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  map:formap,
  displacementMap:texture,
  displacementBias:0.5,
  displacementScale:0.1, 
})

const sphere = new THREE.Mesh(geometry,material)


scene.add(sphere)





// // Geometry Shootig star / Nebula
// const secondaryGeometry  = new THREE.SphereBufferGeometry(1,64,64)

// const secondaryMaterial = new THREE.MeshStandardMaterial({
//   color: 0xffffff,

// })

// const orbit = new THREE.Mesh(secondaryGeometry,secondaryMaterial)


// sphere.add(orbit)
// orbit.position.x =100
// orbit.position.y=50


// scene.add(sphere)













// //  GLTFLoader
// const Gloader1 = new GLTFLoader();


// Gloader1.load( 'scene.gltf', function ( gltf ) {

// let  mesh = gltf.scene;
//                   mesh.position.set(-10,-10,-10);
//                   scene.add(mesh);
// } );


// function loadGLTF(mesh){
//   var Gloader = new GLTFLoader();
      
//       Gloader.load(
//               // resource URL
//               'scene.gltf',
//               // called when the resource is loaded
//               function ( gltf ) {

//                   mesh = gltf.scene;
//                   mesh.position.set(10,10,10);
//                   scene.add(mesh);
//               },
//               // called while loading is progressing
             
//           );

// }


// loadGLTF()



// Light
const pointLight = new THREE.AmbientLight(0xffffff)
pointLight.position.set(200,200,200)
scene.add(pointLight);


const controls = new OrbitControls(camera,renderer.domElement); 



// helpers

// const lightHelper = new THREE.PointLightHelper(pointLight) //Camera position
// const gridHelper = new THREE.GridHelper(200,50) //places grid.
// scene.add(lightHelper,gridHelper)



  



// Camera move

function moveCamera()  {
  const t = document.body.getBoundingClientRect().top //Calculates how far we ade from the top.
  
  
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.002;
  camera.position.y = t * -0.002;
  
  }
  document.body.onscroll = moveCamera;
  




// Mouse move

document.addEventListener("mousemove", animateTerrain)

let mouseX = 0;
let mouseY = 0;
function animateTerrain(ev){ 
mouseX = ev.clientX
mouseY =ev.clientY
}


function animate(){
  requestAnimationFrame(animate);

// Rotating the sphere.
  sphere.rotation.y +=0.0005
  sphere.rotation.x +=0.00005

  // orbit.rotation.x += 0.00005

// Moving planet a little with mouse
  sphere.position.x =  mouseX*0.0001;
  sphere.position.y =  mouseY*0.0001;


  controls.update()


  renderer.render(scene,camera);
}

animate()


