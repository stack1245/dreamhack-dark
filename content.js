// Dreamhack Dark Mode Content Script
// 페이지 로드 시 다크모드가 올바르게 적용되도록 보조하는 스크립트

(function() {
  'use strict';

  // 다크모드 적용 확인 메시지
  console.log('Dreamhack Dark Mode가 적용되었습니다.');

  // 동적으로 추가되는 요소에도 다크모드 적용
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1) { // Element 노드인 경우
          // 흰색 배경을 가진 요소 처리
          if (node.style && node.style.backgroundColor) {
            const bgColor = node.style.backgroundColor.toLowerCase();
            if (bgColor === 'white' || bgColor === '#fff' || bgColor === '#ffffff' || bgColor === 'rgb(255, 255, 255)') {
              node.style.backgroundColor = '#252525';
            }
          }
          
          // 검은색 텍스트를 가진 요소 처리
          if (node.style && node.style.color) {
            const color = node.style.color.toLowerCase();
            if (color === 'black' || color === '#000' || color === '#000000' || color === 'rgb(0, 0, 0)') {
              node.style.color = '#e0e0e0';
            }
          }
        }
      });
    });
  });

  // body가 로드되면 observer 시작
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  // 페이지 로드 완료 후 추가 처리
  window.addEventListener('load', function() {
    // 인라인 스타일로 흰색 배경이 설정된 요소 찾기
    document.querySelectorAll('*').forEach(function(element) {
      const computed = window.getComputedStyle(element);
      
      // 배경색이 너무 밝은 요소 처리
      if (computed.backgroundColor) {
        const rgb = computed.backgroundColor.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
          const brightness = (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3;
          if (brightness > 200) {
            element.style.backgroundColor = '#252525';
          }
        }
      }
      
      // 텍스트 색이 너무 어두운 요소 처리
      if (computed.color) {
        const rgb = computed.color.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
          const brightness = (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3;
          if (brightness < 100) {
            element.style.color = '#e0e0e0';
          }
        }
      }
    });
  });

})();
