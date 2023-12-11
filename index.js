let videoTrack;
let currentCamera = 'environment'; // Default to back camera

async function setupCamera() {
    try {
        const constraints = {
            video: { facingMode: currentCamera }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        document.querySelector('a-scene').setAttribute('arjs', 'sourceType: webcam;');

        videoTrack = stream.getVideoTracks()[0];
    } catch (error) {
        console.log("Error accessing the camera:", error);
    }
}

document.getElementById('cameraSwitch').addEventListener('click', function() {
    // Switch the camera mode
    currentCamera = (currentCamera === 'environment') ? 'user' : 'environment';
    setupCamera(); // Re-initialize the camera with the new setting
});

document.getElementById('captureButton').addEventListener('click', function() {
    var scene = document.querySelector('a-scene');
    if (scene) {
        scene.components.screenshot.capture('perspective');
    }
});

setupCamera(); // Initial camera setup
