// Initialize scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load 360 video texture
const video = document.createElement('video');
video.src = 'test.mp4'; // Path to your 360 video file
video.loop = true;
video.muted = true;
video.play();

const texture = new THREE.VideoTexture(video);
texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.LinearFilter;
texture.format = THREE.RGBFormat;

// Create a sphere geometry and map the video texture onto it
const geometry = new THREE.SphereGeometry(500, 60, 40);
geometry.scale(-1, 1, 1);  // Invert the sphere to make the video visible inside
const material = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Position the camera in the center of the sphere
camera.position.set(0, 0, 0);

// VR Button functionality
const vrButton = document.getElementById('vrButton');

vrButton.addEventListener('click', () => {
  if (navigator.xr) {
    navigator.xr.requestSession('immersive-vr').then((session) => {
      renderer.xr.enabled = true;
      renderer.xr.setSession(session);
    });
  }
});

// Enable WebXR and set up basic movement handling
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// Optional: Add device orientation to move camera based on device motion
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (event) => {
      const alpha = event.alpha ? THREE.MathUtils.degToRad(event.alpha) : 0;
      const beta = event.beta ? THREE.MathUtils.degToRad(event.beta) : 0;
      const gamma = event.gamma ? THREE.MathUtils.degToRad(event.gamma) : 0;
  
      camera.rotation.set(beta, alpha, gamma);
    });
  }
  