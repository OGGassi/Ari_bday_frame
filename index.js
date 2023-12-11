document.addEventListener('DOMContentLoaded', function() {
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
        currentCamera = (currentCamera === 'environment') ? 'user' : 'environment';
        setupCamera();
    });

    document.getElementById('captureButton').addEventListener('click', function() {
        var scene = document.querySelector('a-scene');
        if (scene) {
            scene.components.screenshot.capture('perspective');
            setTimeout(() => promptDownloadScreenshot(), 500); // Wait for the screenshot to be ready
        }
    });

    function promptDownloadScreenshot() {
        var imgData = document.querySelector('.a-canvas').toDataURL('image/png');
        var a = document.createElement('a');
        a.href = imgData;
        a.download = 'Ari_B_Day.png';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // Setup zoom slider
    setupZoomSlider();

    // Initial camera setup
    setupCamera();
});

// Zoom slider setup
function setupZoomSlider() {
    const zoomSlider = document.getElementById('zoomSlider');
    zoomSlider.addEventListener('input', function() {
        const zoomValue = this.value;
        applyZoom(zoomValue);
    });
}

function applyZoom(zoomValue) {
    const camera = document.querySelector('[camera]');
    if (camera && camera.object3D && camera.object3D.type === 'PerspectiveCamera') {
        camera.object3D.fov = calculateFOV(zoomValue);
        camera.object3D.updateProjectionMatrix();
    }
}

function calculateFOV(zoomValue) {
    return 100 / zoomValue; // Adjust this formula as needed
}
