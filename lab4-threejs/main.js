import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/GLTFLoader.js";

import "./style.css";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 5;
controls.maxDistance = 140;
// limit y rotation partially
controls.maxPolarAngle = Math.PI / 2;
// controls auto rotate
controls.autoRotate = true;
// controls enable damping
controls.enableDamping = true;

// add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

// add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(6, 4, 8);
scene.add(directionalLight);

// add light helper
// const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(lightHelper);

// load brick texture
const textureLoader = new THREE.TextureLoader();
const brickTexture = textureLoader.load("./assets/walls.jpg");

// walls material
const materialWalls = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});

// map brick texture to walls
materialWalls.map = brickTexture;

// front plane
const geometry = new THREE.PlaneGeometry(6, 8);
const plane = new THREE.Mesh(geometry, materialWalls);
scene.add(plane);

// right side plane
const geometryRight = new THREE.PlaneGeometry(6, 8);
const planeRight = new THREE.Mesh(geometryRight, materialWalls);
planeRight.position.set(3, 0, -3);
planeRight.rotation.y = Math.PI / 2;
scene.add(planeRight);

// left side plane
const geometryLeft = new THREE.PlaneGeometry(6, 8);
const planeLeft = new THREE.Mesh(geometryLeft, materialWalls);
planeLeft.position.set(-3, 0, -3);
planeLeft.rotation.y = Math.PI / 2;
scene.add(planeLeft);

// back plane
const geometryBack = new THREE.PlaneGeometry(6, 8);
const planeBack = new THREE.Mesh(geometryBack, materialWalls);
planeBack.position.set(0, 0, -6);
planeBack.rotation.y = Math.PI;
scene.add(planeBack);

// load kame texture
const kameTexture = textureLoader.load("./assets/kame.png");

// kame material
const materialKame = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
  transparent: true,
});

// map kame texture to kame
materialKame.map = kameTexture;

// plane on top of door
const geometryKame = new THREE.PlaneGeometry(2, 2);
const planeKame = new THREE.Mesh(geometryKame, materialKame);
planeKame.position.set(0, 2.3, 0.01);
// rotate planeKame 45 degrees
planeKame.rotation.z = Math.PI / 6;
// make planeKame bigger
planeKame.scale.set(1.8, 1.8, 1.8);
scene.add(planeKame);

// load wood texture
const woodTexture = textureLoader.load("./assets/wood.jpg");

// floor material
const materialFloor = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});

// map wood texture to floor
materialFloor.map = woodTexture;

// floor plane
const geometryFloor = new THREE.PlaneGeometry(6, 4);
const planeFloor = new THREE.Mesh(geometryFloor, materialFloor);
planeFloor.position.set(0, -1.5, -4);
planeFloor.rotation.x = Math.PI / 2;
scene.add(planeFloor);

// load roof texture
const roofTexture = textureLoader.load("./assets/bricks.jpg");

// roof material
const materialRoof = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});

// map roof texture to roof
materialRoof.map = roofTexture;

// cone geometry as roof
const geometryRoof = new THREE.ConeGeometry(4.25, 4, 4);
const roof = new THREE.Mesh(geometryRoof, materialRoof);
roof.position.set(0, 6, -3);
// rotate roof
roof.rotation.y = Math.PI / 4;
scene.add(roof);

// add door
const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
const door = new THREE.Mesh(doorGeometry, materialRoof);
door.position.set(0, -0.5, 0);
scene.add(door);

// door knob
const knobGeometry = new THREE.SphereGeometry(0.08, 32, 32);
const knob = new THREE.Mesh(knobGeometry, materialFloor);
knob.position.set(0.3, -0.5, 0.1);
scene.add(knob);

// load grass texture
const grassTexture = textureLoader.load("./assets/grass.jpg");

// grass material
const materialGrass = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});

// map grass texture to grass
materialGrass.map = grassTexture;
// make grass texture smaller
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(160, 160);

// ground plane as sphere
const geometryGround = new THREE.SphereGeometry(100, 64, 32);
const planeGround = new THREE.Mesh(geometryGround, materialGrass);
planeGround.position.set(0, -101.2, -4);
planeGround.rotation.x = Math.PI / 2;
scene.add(planeGround);

// load clouds texture
const cloudsTexture = textureLoader.load("./assets/scenery.jpg");

// clouds material
const materialClouds = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});

// map clouds texture to clouds
materialClouds.map = cloudsTexture;

// skye
const geometrySphere = new THREE.SphereGeometry(200, 32, 32);
const sphere = new THREE.Mesh(geometrySphere, materialClouds);
sphere.position.set(0, 0, 0);
scene.add(sphere);

// load clouds gltf
const loader = new GLTFLoader();

const addClouds = (x, y, z) => {
  loader.load("./assets/clouds.gltf", (gltf) => {
    const clouds = gltf.scene;
    // position cloud higher
    clouds.position.set(x, y, z);
    // rotate clouds
    clouds.rotation.y = y;
    // make cloud a lot smaller
    clouds.scale.set(0.04, 0.04, 0.04);
    // make cloud light grey
    clouds.traverse((node) => {
      if (node.isMesh) {
        node.material.color.set(0xe1d9d1);
      }
    });
    scene.add(clouds);
  });
};

// add clouds to scene with random positions and rotations behind house
for (let i = 0; i < 20; i++) {
  const x = Math.random() * 400 - 200;
  const y = Math.random() * -50 + 100;
  const z = Math.random() * 400 - 200;
  addClouds(x, y, z);
}

// load tree gltf next to house and make it smaller
loader.load("./assets/tree.glb", (gltf) => {
  const tree = gltf.scene;
  tree.position.set(-6, -2, -3);
  scene.add(tree);
});

camera.position.x = 20;
camera.position.y = 10;
camera.position.z = 40;

function animate() {
  requestAnimationFrame(animate);

  // rotate camera around scene

  controls.update();

  renderer.render(scene, camera);
}

animate();
