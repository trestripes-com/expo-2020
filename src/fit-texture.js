/* Copied from https://github.com/nylki/aframe-fit-texture-component

The MIT License (MIT)

Copyright (c) 2015/2016 Tom Brewe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Fit Texture component for A-Frame.
 */
AFRAME.registerComponent('fit-texture', {
  dependencies: ['geometry', 'material'],
  schema: {
    type: 'boolean',
    default: true
  },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () { },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
   update: function () {
     if (this.data === false) return;

     var el = this.el;
     var self = this;
     if (self.dimensions) {
       // If texture has already been loaded, and `fit-texture` was reset.
       self.applyTransformation();
     } else {
       var textureLoaded = function(e) {

          var w = e.detail.texture.image.videoWidth || e.detail.texture.image.width;

          var h = e.detail.texture.image.videoHeight || e.detail.texture.image.height;

          // Don't apply transformation on incomplete info
          if(h === 0 || w === 0) return;

          // Save dimensions for later updates to `fit-texture`, see above.
          self.dimensions = {w:w, h:h};

          self.applyTransformation();
       }
       el.addEventListener('materialvideoloadeddata', textureLoaded);
       el.addEventListener('materialtextureloaded', textureLoaded);

     }
   },

   applyTransformation: function () {
    var el = this.el;
    var geometry = el.getAttribute('geometry');

    // Use self.dimension data from previous texture/video loaded events
    var widthHeightRatio = this.dimensions.h / this.dimensions.w;

    if (geometry.width && geometry.height) {
      if (widthHeightRatio > 1.0)
        el.setAttribute('width', geometry.height / widthHeightRatio);
      else
        el.setAttribute('height', geometry.width * widthHeightRatio);
    }
    else if (geometry.width) {
      el.setAttribute('height', geometry.width * widthHeightRatio);
    }
    else if (geometry.height) {
      el.setAttribute('width', geometry.height / widthHeightRatio);
    }
    else {
      // Neither width nor height is set.
      var tempWidth = 1.0;
      el.setAttribute('width', '' + tempWidth);
      el.setAttribute('height', tempWidth * widthHeightRatio);
    }
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { },
});
