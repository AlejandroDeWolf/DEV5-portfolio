import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js";

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
controls.minDistance = 0;
controls.maxDistance = 100;

// add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 2, 2);
scene.add(directionalLight);

// add light helper
const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(lightHelper);

// load brick texture
const textureLoader = new THREE.TextureLoader();
const brickTexture = textureLoader.load("./assets/bricks.jpg");

// walls material
const materialWalls = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});

// map brick texture to walls
materialWalls.map = brickTexture;

// front plane
const geometry = new THREE.PlaneGeometry(6, 3);
const plane = new THREE.Mesh(geometry, materialWalls);
scene.add(plane);

// right side plane
const geometryRight = new THREE.PlaneGeometry(8, 3);
const planeRight = new THREE.Mesh(geometryRight, materialWalls);
planeRight.position.set(3, 0, -4);
planeRight.rotation.y = Math.PI / 2;
scene.add(planeRight);

// left side plane
const geometryLeft = new THREE.PlaneGeometry(8, 3);
const planeLeft = new THREE.Mesh(geometryLeft, materialWalls);
planeLeft.position.set(-3, 0, -4);
planeLeft.rotation.y = Math.PI / 2;
scene.add(planeLeft);

// back plane
const geometryBack = new THREE.PlaneGeometry(6, 3);
const planeBack = new THREE.Mesh(geometryBack, materialWalls);
planeBack.position.set(0, 0, -8);
planeBack.rotation.y = Math.PI;
scene.add(planeBack);

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
const geometryFloor = new THREE.PlaneGeometry(6, 8);
const planeFloor = new THREE.Mesh(geometryFloor, materialFloor);
planeFloor.position.set(0, -1.5, -4);
planeFloor.rotation.x = Math.PI / 2;
scene.add(planeFloor);

// load roof texture
const roofTexture = textureLoader.load("./assets/roof.jpg");

// roof material
const materialRoof = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});

// map roof texture to roof
materialRoof.map = roofTexture;

// roof plane
const geometryRoof = new THREE.PlaneGeometry(6, 8);
const planeRoof = new THREE.Mesh(geometryRoof, materialRoof);
planeRoof.position.set(0, 1.5, -4);
planeRoof.rotation.x = Math.PI / 2;
planeRoof.rotation.y = Math.PI;
scene.add(planeRoof);

// add door
const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
const door = new THREE.Mesh(doorGeometry, materialFloor);
door.position.set(0, -0.5, 0);
scene.add(door);

// door knob
const knobGeometry = new THREE.SphereGeometry(0.08, 32, 32);
const knob = new THREE.Mesh(knobGeometry, materialFloor);
knob.position.set(0.3, -0.5, 0.1);
scene.add(knob);

camera.position.z = 8;

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate();
