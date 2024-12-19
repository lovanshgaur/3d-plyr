// Initialize the Panolens viewer
const viewer = new Panolens.Viewer({
    container: document.querySelector('#panolens-container'),
    output: 'panolens-container',
    controlBar: true, // Enables the control bar (VR and fullscreen buttons)
    autoHideControlBar: false, // Shows the control bar by default
    fullscreen: true,
    vr: true, // Enables VR support
    hover: true, // Activates hover effects
    hideLogo: true, // Hides Panolens logo
    cameraFov: 90, // Field of view for the camera
    mobileUI: true, // Ensures mobile support
    animation: true, // Animations for smooth transitions
  });
  
  // Video URL (replace with your own)
  const videoUrl = 'test.mp4';
  
  // Create the 360 video sphere
  const panorama = new Panolens.VideoPanorama(videoUrl);
  
  // Add the panorama to the viewer
  viewer.add(panorama);
  
  // Optional: Add events or more customizations if needed
  panorama.addEventListener('enter-fade', () => {
    console.log('Video has started playing');
  });
  
  panorama.addEventListener('progress', (event) => {
    console.log('Video loading progress:', event.percent);
  });
  