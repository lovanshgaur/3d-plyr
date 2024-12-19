// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 2, 500);
camera.position.set(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the 360 video as a texture
const video = document.createElement('video');
video.src = 'test.mp4'; // Ensure the video file path is correct
video.crossOrigin = 'anonymous';
video.loop = true;
video.muted = true; // Ensure the video is muted to allow autoplay
video.playsInline = true; // Ensure it plays inline on iOS
video.autoplay = true; // Ensure it starts playing automatically

const texture = new THREE.VideoTexture(video);
texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.LinearFilter;
texture.format = THREE.RGBFormat;

const geometry = new THREE.SphereGeometry(500, 60, 40);
geometry.scale(-1, 1, 1);

const material = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Handle resizing of the window
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// VR Button to toggle VR mode
import { VRButton } from 'https://cdn.jsdelivr.net/npm/three@0.137.5/examples/jsm/webxr/VRButton.js';
document.body.appendChild(VRButton.createButton(renderer));

// Handle key events for manual rotation
window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        togglePlayPause();
    } else if (event.code === 'Escape') {
        document.getElementById('playButton').style.display = 'block';
    } else if (event.key === 'ArrowUp') {
        sphere.rotation.x -= 0.05; 
    } else if (event.key === 'ArrowDown') {
        sphere.rotation.x += 0.05; 
    } else if (event.key === 'ArrowLeft') {
        sphere.rotation.y -= 0.05;
    } else if (event.key === 'ArrowRight') {
        sphere.rotation.y += 0.05;
    }
});

// Play/Pause toggle
function togglePlayPause() {
    if (video.paused) {
        video.play().then(() => {
            document.getElementById('playButton').innerText = 'Pause';
        }).catch(err => console.error("Error playing video:", err));
    } else {
        video.pause();
        document.getElementById('playButton').innerText = 'Play';
    }
}

document.getElementById('playButton').addEventListener('click', togglePlayPause);
document.getElementById('volumeControl').addEventListener('input', (event) => {
    video.volume = event.target.value;
});

// Animation loop
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
