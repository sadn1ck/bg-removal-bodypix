## **Check the live demo [here](https://sadn1ck.github.io/bg-removal-bodypix/index.html)**

> Moderately good PC needed, might hang on mobile since it does the computation on your browser in realtime.

## What is **BodyPix**?
<details>
  <summary>Answer</summary>

### 👉 Tensorflow Model for segmentation in browser
This model can be used to segment an image into pixels that are and are not part of a person, and into pixels that belong to each of twenty-four body parts. It works for multiple people in an input image or video.
</details>

## What is the process?

*  Used *getUserMedia* to stream video from webcam
*  Passed the video to a segmentation function from the API exposed by *BodyPix*
*  Which returns a mask
*  Already set a background on the canvas (on the right)
*  Then I use **canvas compositing** functions to overlay the mask and the video on top of each other, and then stream it to the canvas

For further questions and the documentations, go to the [BodyPix Page](https://github.com/tensorflow/tfjs-models/tree/master/body-pix) on GitHub.

  ### **Pull requests** welcome! If you find any bugs, feel free to file an issue (or even work on that if you want)