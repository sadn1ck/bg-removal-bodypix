
//  Source to stream from
const video = document.getElementById('video');
// Destination to stream to
const canvas = document.getElementById('canvas');
/* Video Streaming using getUserMedia */
if (navigator.mediaDevices) {
    navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
            video.srcObject = stream;
            video.play();
            setInterval(removeBg, 250);

        });
}
/* Loading bodyPix */

async function removeBg() {
    const net = await bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 2
    });


    const segmentation = await net.segmentPerson(video, {
        flipHorizontal: false,
        internalResolution: 'medium',
        segmentationThreshold: 0.5
    });

    // Convert the segmentation into a mask to darken the background.
    const foregroundColor = { r: 0, g: 0, b: 0, a: 0 };
    const backgroundColor = { r: 0, g: 0, b: 0, a: 255 };
    const backgroundDarkeningMask = bodyPix.toMask(
        segmentation, foregroundColor, backgroundColor);

    const opacity = 0.7;
    const maskBlurAmount = 3;
    const flipHorizontal = false;
    bodyPix.drawMask(
        canvas, video, backgroundDarkeningMask, opacity, maskBlurAmount, flipHorizontal);
}
