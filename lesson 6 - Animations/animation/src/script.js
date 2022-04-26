import "./style.css";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Native JS solution
let time = Date.now();

// Animations
const tickN = () => {
  // Time - Native JS
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;
  //   console.log(deltaTime); // lower value for high refresh rate screens

  // Update object
  // mesh.position.x += 0.01;
  mesh.rotation.y += 0.001 * deltaTime;

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tickN);
};

// THREE.js clock
const clock = new THREE.Clock();

// Animations
const tickT = () => {
  // Three js clock
  const elapsedTime = clock.getElapsedTime();

  // Update Object
  //   mesh.rotation.y = elapsedTime * Math.PI * 2; // One revolution per second

  //   mesh.position.y = Math.sin(elapsedTime);
  //   mesh.position.x = Math.cos(elapsedTime);

  camera.position.y = Math.sin(elapsedTime);
  camera.position.x = Math.cos(elapsedTime);
  camera.lookAt(mesh.position);

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tickT);
};

tickT();
