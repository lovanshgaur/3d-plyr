// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 0);

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the video element
const video = document.createElement('video');
video.src = 'test.mp4'; // Path to your 360 video
video.setAttribute('playsinline', ''); // For iOS
video.setAttribute('autoplay', '');
video.setAttribute('loop', '');
video.setAttribute('muted', ''); // Video must be muted for autoplay to work

// Load the video texture
const videoTexture = new THREE.VideoTexture(video);
const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });

// Create the sphere geometry (for the 360-degree video)
const geometry = new THREE.SphereGeometry(500, 60, 40);
geometry.scale(-1, 1, 1); // Invert the sphere

// Create the mesh for the sphere and apply the video material
const sphere = new THREE.Mesh(geometry, videoMaterial);
scene.add(sphere);

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Variables to track mouse position
let isMouseDown = false;
let previousMouseX = 0;
let previousMouseY = 0;
let rotationX = 0;
let rotationY = 0;

// Mouse down event to start dragging
window.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
});

// Mouse up event to stop dragging
window.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// Mouse move event to update the rotation if dragging
window.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        // Calculate the difference in mouse movement
        const deltaX = event.clientX - previousMouseX;
        const deltaY = event.clientY - previousMouseY;

        // Update rotation values based on mouse movement
        rotationX += deltaY * 0.005; // Control vertical rotation speed
        rotationY += deltaX * 0.005; // Control horizontal rotation speed

        // Update previous mouse position for next frame
        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    }
});

// Add WebXR manager for VR support
const xrManager = renderer.xr;
xrManager.enabled = true;
xrManager.addEventListener('sessionstart', () => {
    video.pause(); // Pause video when entering VR
});
xrManager.addEventListener('sessionend', () => {
    video.play(); // Resume video when exiting VR
});

// VR button logic
const vrButton = document.getElementById('vr-button');
vrButton.addEventListener('click', () => {
    if (xrManager.isPresenting) {
        xrManager.end(); // Exit VR
    } else {
        navigator.xr.requestSession('immersive-vr').then((session) => {
            xrManager.setSession(session);
            vrButton.innerText = 'Exit VR';
        });
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Apply the calculated rotations to the camera
    camera.rotation.set(rotationX, rotationY, 0);

    // Update the video texture
    videoTexture.needsUpdate = true;

    renderer.render(scene, camera);
}

// Start the video and the animation loop
video.play();
animate();
