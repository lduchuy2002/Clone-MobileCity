(()=>{
  const button = document.querySelector('.nav--res');
  button.addEventListener('click',()=>{
    document.querySelector('.nav__taskbar').style.left='0';
  })
})();
 (()=>{
  const button = document.querySelector('#exit--res');
  button.addEventListener('click',()=>{
    document.querySelector('.nav__taskbar').style.left='-100%';
  })
})();