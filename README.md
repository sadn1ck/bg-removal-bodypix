## Check the live demo [here](https://sadn1ck.github.io/bg-removal-bodypix/index.html)

## What is BodyPix?
<details>
  <summary>Answer</summary>

### 👉 Tensorflow Model for segmentation in browser
    This model can be used to segment an image into pixels that are and are not part of a person, and into pixels that belong to each of twenty-four body parts. It works for multiple people in an input image or video.
</details>

## What am I doing here?

*  Used getUserMedia to stream video from webcam
*  Passed the video to a segmentation function from the API exposed by BodyPix
*  Which returns a mask
*  Already set a background on the canvas (the right)
*  Then I use canvas compositing functions to overlay the mask and the video on top of each other, and then stream it to the mask

For further questions and the documentations, go to the [BodyPix Page](https://github.com/tensorflow/tfjs-models/tree/master/body-pix) on GitHub.