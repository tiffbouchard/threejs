//Variables for setup

let container;
let camera;
let renderer;
let scene;
let house;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 5, 10);

  const ambient = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(60, 50, 30);
  scene.add(light);
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("./adamHead/adamHead.gltf", function(gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  house.rotation.y += 0.005;
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
