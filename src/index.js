require("aframe")
require("aframe-layout-component")
require("aframe-template-component")
require("aframe-event-set-component")
require("aframe-look-at-component")

AFRAME.registerComponent('only-mobile', {
  init: function () {
    if (!AFRAME.utils.device.isMobile())
      this.el.parentNode.removeChild(this.el);
  }
})
