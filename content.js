// dynamic content handler
(function() {
  'use strict';

  console.log('dark mode applied');

  const obs = new MutationObserver(function(muts) {
    muts.forEach(function(mut) {
      mut.addedNodes.forEach(function(node) {
        if (node.nodeType === 1) {
          if (node.style && node.style.backgroundColor) {
            let bg = node.style.backgroundColor.toLowerCase();
            if (bg === 'white' || bg === '#fff' || bg === '#ffffff' || bg.includes('255, 255, 255')) {
              node.style.backgroundColor = '#252525';
            }
          }
          if (node.style && node.style.color) {
            let c = node.style.color.toLowerCase();
            if (c === 'black' || c === '#000' || c === '#000000' || c.includes('0, 0, 0')) {
              node.style.color = '#e0e0e0';
            }
          }
        }
      });
    });
  });

  if (document.body) {
    obs.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      obs.observe(document.body, { childList: true, subtree: true });
    });
  }

  // fix bright elements
  window.addEventListener('load', function() {
    document.querySelectorAll('*').forEach(function(el) {
      let comp = window.getComputedStyle(el);
      
      if (comp.backgroundColor) {
        let rgb = comp.backgroundColor.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
          let br = (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3;
          if (br > 200) el.style.backgroundColor = '#252525';
        }
      }
      
      if (comp.color) {
        let rgb = comp.color.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
          let br = (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3;
          if (br < 100) el.style.color = '#e0e0e0';
        }
      }
    });
  });

})();
