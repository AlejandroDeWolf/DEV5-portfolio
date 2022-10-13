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

const materialWalls = new THREE.MeshPhongMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
});

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

camera.position.z = 8;

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate();
