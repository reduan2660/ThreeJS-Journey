import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import gsap from "gsap";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();
gui.hide();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// Axes helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/8.png");

// Fonts
const fontLoader = new THREE.FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new THREE.TextBufferGeometry("Website Coming soon", {
    font: font,
    size: 1,
    height: 0.2,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0,
    bevelSegments: 4,
  });

  //  Centering
  //   textGeometry.computeBoundingBox();
  //   textGeometry.translate(
  //     -(textGeometry.boundingBox.max.x - 0.02) / 2,
  //     -(textGeometry.boundingBox.max.y - 0.02) / 2,
  //     -(textGeometry.boundingBox.max.z - 0.03) / 2
  //   );
  textGeometry.center();

  const material = new THREE.MeshNormalMaterial();
  //   material.matcap = matcapTexture;

  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);

  console.time("donut");
  const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
  //   const donutMaterial = new THREE.MeshMatcapMaterial({
  //     matcap: matcapTexture,
  //   });

  for (let i = 0; i < 200; i++) {
    const donut = new THREE.Mesh(donutGeometry, material);

    donut.position.x = (Math.random() - 0.5) * 30;
    donut.position.y = (Math.random() - 0.5) * 20;
    donut.position.z = (Math.random() - 0.5) * 20;

    donut.rotation.x = Math.random() * Math.PI * 2;
    donut.rotation.y = Math.random() * Math.PI * 2;

    const scale = Math.random();
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }

  console.timeEnd("donut");
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 4));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = -5;
camera.position.y = -10;
camera.position.z = 10;

// gsap.to(camera.position, { x: 0.3, y: -0.4, z: 9.2 });
const duration = 1;
const delay = 0.4;
gsap.to(camera.position, { x: -1, duration: duration, delay: delay });
gsap.to(camera.position, { y: -0.8, duration: duration, delay: delay });
gsap.to(camera.position, { z: 9.2, duration: duration, delay: delay });

const range = 10;
gui.add(camera.position, "x").min(-range).max(range).step(0.001);
gui.add(camera.position, "y").min(-range).max(range).step(0.001);
gui.add(camera.position, "z").min(-range).max(range).step(0.001);

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
