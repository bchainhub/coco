document.getElementById('reading-direction').addEventListener('input', (e) => {
  document.documentElement.setAttribute('dir', e.target.value);
  localStorage.setItem('coco-reading-direction', e.target.value, 31556926, '/');
}, false);
