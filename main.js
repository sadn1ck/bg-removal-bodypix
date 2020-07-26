
// ! Source to stream from
const video = document.getElementById('video');
// ! Destination to stream to
const canvas = document.getElementById('canvas');
// ! Video Streaming using getUserMedia
if (navigator.mediaDevices) {
    navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
            video.srcObject = stream;
            video.play();
            setInterval(removeBg, 100); // * Call the segmenting fu
            // removeBg();
        });
}
// ! Loading bodyPix

async function removeBg() {
    //  ? Loading BodyPix w/ various parameters
    const net = await bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 2
    });

    // ? Segmentation occurs here, taking video frames as the input
    const segmentation = await net.segmentPerson(video, {
        flipHorizontal: false,
        internalResolution: 'medium',
        segmentationThreshold: 0.5
    });

    // Convert the segmentation into a mask to darken the background.
    const foregroundColor = { r: 0, g: 0, b: 0, a: 255 };
    const backgroundColor = { r: 0, g: 0, b: 0, a: 0 };
    const backgroundDarkeningMask = bodyPix.toMask(segmentation, foregroundColor, backgroundColor, false);

    // const opacity = 0.7;
    // const maskBlurAmount = 3;
    // const flipHorizontal = false;
    compositeFrame(backgroundDarkeningMask);
    // requestAnimationFrame(removeBg);
    // bodyPix.drawMask(canvas, video, backgroundDarkeningMask, opacity, maskBlurAmount, flipHorizontal);
}
async function compositeFrame(backgroundDarkeningMask) {
    if (!backgroundDarkeningMask) return;
    // grab canvas holding the bg image
    var ctx = canvas.getContext('2d');
    // composite the segmentation mask on top
    ctx.globalCompositeOperation = 'destination-over';
    ctx.putImageData(backgroundDarkeningMask, 0, 0);
    // composite the video frame
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(video, 0, 0, 640, 480);
}