
//carousel
let count = 0;
const slideLength = document.querySelectorAll('.slides').length;

const carlNext = ()=>{
    count++;
    if(count===slideLength-1){
      count=0;
    }
  let query= 'translateX('+count*-100+'%)';
  document.querySelector('.slides1').style.transform=query;
  document.querySelector('.slides2').style.transform=query;
  document.querySelector('.slides3').style.transform=query;
  document.querySelector('.slides4').style.transform=query;
}
setInterval(()=>{
  carlNext();
},2500);

