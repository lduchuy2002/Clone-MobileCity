
const params =  new URLSearchParams(window.location.search);
const id = params.get('id');
let  coursesAPI='http://localhost:3000/product';
//Get API
let getAPI =(callback)=>{
  fetch(coursesAPI)
  .then((response) =>{
    return response.json();
  })
  .then(callback);
  
};
getAPI((API)=>{
  let productFound = API.find((el)=>{
      return el.id == id;
  })
  console.log(productFound);
})

var info={
      screen: document.querySelector('.screen-right'),
      os: document.querySelector('.Os-right'),
      camera: document.querySelector('.camera-right'),
      CPU: document.querySelector('.CPU-right'),
      RAM: document.querySelector('.RAM-right'),
      ROM: document.querySelector('.ROM-right'),
      SIM: document.querySelector('.SIM-right'),
      PIN: document.querySelector('.PIN-right'),
      design: document.querySelector('.design-right'),
      title: document.querySelector('#title-name'),
      price: document.querySelector('#price'),
      img: document.querySelector('#img')
}
function start(){
  getAPI((API)=>{
    let productFound = API.find((el)=>{
        return el.id == id;
    })
    let phoneName = productFound.name.split(' ');
    document.getElementById('phone-name').textContent=phoneName[2];
    info.screen.textContent=productFound.screen;
    info.os.textContent=productFound.Os;
    info.camera.textContent=productFound.camera;
    info.CPU.textContent=productFound.CPU;
    info.RAM.textContent=productFound.RAM;
    info.ROM.textContent=productFound.ROM;
    info.SIM.textContent=productFound.SIM;
    info.PIN.textContent=productFound.PIN;
    info.design.textContent=productFound.design;
    info.title.textContent=productFound.name;
    info.price.textContent=productFound.price;
    let img = productFound.img;
    let imgSrc=img.split('/');
    info.img.src='./product-img/'+imgSrc[2];
  
  })
}
start();
  

    
    
  
