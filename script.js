import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
      // Step 1: Create a Scene
        const scene = new THREE.Scene();

        // Step 2: Create a Camera
        const camera = new THREE.PerspectiveCamera(
            75, // Field of view
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near clipping plane
            1000 // Far clipping plane
        );
        camera.position.z = 5;

        // Step 3: Create a Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Step 4: Add a simple object (e.g., a cube)
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

          // Step 6: Player Controls (Camera Movement)
    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;

    // Keyboard event listeners
    document.addEventListener('keydown', (event) => {
        switch(event.code) {
            case 'ArrowUp':    // Up arrow
            case 'KeyW':       // W key
                moveForward = true;
                break;
            case 'ArrowDown':  // Down arrow
            case 'KeyS':       // S key
                moveBackward = true;
                break;
            case 'ArrowLeft':  // Left arrow
            case 'KeyA':       // A key
                moveLeft = true;
                break;
            case 'ArrowRight': // Right arrow
            case 'KeyD':       // D key
                moveRight = true;
                break;
        }
    });

    document.addEventListener('keyup', (event) => {
        switch(event.code) {
            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;
        }
    });
    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.autoRotate = false;

    // Update camera position based on player controls
    function updatePlayer() {
        const speed = 0.05;

        if (moveForward) camera.position.z -= speed;
        if (moveBackward) camera.position.z += speed;
        if (moveLeft) camera.position.x -= speed;
        if (moveRight) camera.position.x += speed;
    }

    // Modify the animation loop to include player controls
    function animate() {
        requestAnimationFrame(animate);

        // Update player position
        updatePlayer();

        // Rotate the cube for fun
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // Update controls
        controls.update();

        renderer.render(scene, camera);
    }

    animate();
    