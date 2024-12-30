
/*
* the below lines of code upto 16 line number is common code for all volume changer
* go to last to see changing volumes in all when audio volume changed in one of the changers
*/
const audio=new Audio();
audio.volume=0.5;

//well rope
const roundwrwc=document.getElementById('roundwrwc');


const leftrope=document.getElementById('leftrope');
const rightrope=document.getElementById('rightrope');

const leftbox=document.getElementById('leftbox');

const rightbox=document.getElementById('rightbox');
let ltop=0;
let rtop=0;


const round = document.getElementsByClassName("round")[0];//moving here because ChangeAccordingly not working
const abar = document.getElementById("balance_volume");
const volume_indicator = document.getElementById("volume_indicator");
ChangeAccordingly(0.5,-1);
const audio_file=document.getElementById('audio_file');
audio_file.addEventListener('change',()=>{
  audio.src=URL.createObjectURL(audio_file.files[0]);
});
function play(){
    audio.play();
  }
  function pause(){
    audio.pause();
  }

audio.addEventListener('change',()=>{
  console.log(audio.volume); 
})

/*
for well rope
*
*
*/


//moving to top
// const roundwrwc=document.getElementById('roundwrwc');


// const leftrope=document.getElementById('leftrope');
// const rightrope=document.getElementById('rightrope');

// const leftbox=document.getElementById('leftbox');

// const rightbox=document.getElementById('rightbox');

//getBoundingClientRect() to find mid y
let midyrect=leftbox.getBoundingClientRect();
let midy=midyrect.top+ window.screenX +midyrect.height;
    


let mouseDownwrwc=false;



leftbox.addEventListener('mouseenter',(e)=>{
    leftbox.style.cursor="grab";
});

leftbox.addEventListener('mousedown',(e)=>{
    mouseDownwrwc=true;
    leftbox.style.cursor="grabbing";
});
leftbox.addEventListener('mouseleave',(e)=>{
    mouseDownwrwc=false;
});
document.addEventListener('mouseup',(e)=>{
    mouseDownwrwc=false;
    leftbox.style.cursor="grab";
})


let leftintialY=0;
let rightintialY=0;


leftbox.addEventListener('mousemove',(e)=>{
    if(mouseDownwrwc==false)return;
    
    if(leftintialY==0){
        leftintialY=e.clientY;
        return;
    }
    if(leftintialY<e.clientY && (ltop<180))ltop+=1;
    else if(leftintialY>e.clientY && (ltop>-150))ltop-=1;
    else return;

    rtop=-ltop;
    
    //moving box
    leftbox.style.transform='translateY('+ltop+'px)';
    rightbox.style.transform='translateY('+(-ltop)+'px';

    //round rotation
    let rotationwrwc=ltop;
    rotationwrwc=180-(rotationwrwc);
    roundwrwc.style.transform='rotate('+rotationwrwc+'deg)';

    //setting rope height
    leftrope.style.height=(250+ltop)+'px';
    rightrope.style.height=(250-ltop)+'px';
    leftintialY=e.clientY;
    if(rotationwrwc/360<0 || rotationwrwc/360>1)return;
    audio.volume=rotationwrwc/360;
    ChangeAccordingly(audio.volume,-1);
})



//for right box

let mouseDownwrwc2=false;

rightbox.addEventListener('mouseenter',(e)=>{
    rightbox.style.cursor="grab";
});

rightbox.addEventListener('mousedown',(e)=>{
    mouseDownwrwc2=true;
    rightbox.style.cursor="grabbing";
});
rightbox.addEventListener('mouseleave',(e)=>{
    mouseDownwrwc2=false;
});
document.addEventListener('mouseup',(e)=>{
    mouseDownwrwc2=false;
    rightbox.style.cursor="grab";
})


rightbox.addEventListener('mousemove',(e)=>{
    if(mouseDownwrwc2==false)return;
    
    if(rightintialY==0){
        rightintialY=e.clientY;
        return;
    }
    if(rightintialY<e.clientY && (rtop<150))rtop+=1;
    else if(rightintialY>e.clientY && (rtop>-180))rtop-=1;
    else return;
    ltop=-rtop;
    //moving boxes
    rightbox.style.transform='translateY('+rtop+'px)';
    leftbox.style.transform='translateY('+(-rtop)+'px';

    //setting ropes height
    rightrope.style.height=(250+rtop)+'px';
    leftrope.style.height=(250-rtop)+'px';

    //rotate circle

    let rotationforright=180+rtop;
    roundwrwc.style.transform='rotate('+rotationforright+'deg)';
    rightintialY=e.clientY;
    if((rotationforright/360<0) || (rotationforright/360>1))return;
    audio.volume=rotationforright/360;
    ChangeAccordingly(audio.volume,-1);
})



/*
* for rotate_with_mouse volume changer
*
*/


//getting elements by class name
//const round = document.getElementsByClassName("round")[0]; moving this to front
const regulator = document.getElementsByClassName("regulator")[0];


//declare varibale
let isDraggingrwm = false;
let mouseEnterrwm=false;


regulator.addEventListener('mouseenter',(e)=>{
    mouseEnterrwm=true;
    if(isDraggingrwm)regulator.style.cursor="grabbing";
    else regulator.style.cursor="grab";
});
regulator.addEventListener('mouseleave',(e)=>{
    mouseEnterrwm=false;
})

round.addEventListener("mousedown", (e) => {
  isDraggingrwm = true;
  regulator.style.cursor="grabbing";
});
document.addEventListener("mousemove", (e) => {
  if (isDraggingrwm==true & mouseEnterrwm==true) {
    const rect = round.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    let rotation = currentAngle * (180 / Math.PI);
    if(rotation<0)rotation=360+rotation;
    //-30 stop//approx 0.92 is the volume

    //setting audio volume
    if(rotation>=330)return;
    audio.volume=rotation/360;
    ChangeAccordingly(audio.volume,-1);
  }
});
document.addEventListener("mouseup", () => {
  if(isDraggingrwm)regulator.style.cursor="grab";
  isDraggingrwm = false;
});


/*
*the above two working perfectly fine
*/

/* balancing_volume_changer jariballa type 
*
*/


//moving to top because of ChangeAccordingly function
// const abar = document.getElementById("balance_volume");
// const volume_indicator = document.getElementById("volume_indicator");
const drag1 = document.getElementById("drag1");
const drag2 = document.getElementById("drag2");

let offsetX, offsetY;


let mouseDown = false;
//let currentAngle=0;
//let rotation=0;

//event listener
abar.addEventListener("mouseleave", (e) => {
  mouseDown = false;
});
drag1.addEventListener("mousedown", (e) => {
  mouseDown = true;
  drag1.style.cursor = "pointer";
});
document.addEventListener("mousemove", (e) => {
  if (mouseDown == false) return;

  const rect = abar.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  let currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
  let rotation = currentAngle * (180 / Math.PI);
  if (rotation < 0) rotation = 360 + rotation;
  if (rotation > 140 && rotation < 220) {
    rotation = rotation - 180;
    //abar.style.transform = "rotate(" + rotation + "deg)";
    //volume_indicator.style.width = (0.5 + rotation / 4 / 10 / 2) * 100 + "%";
    audio.volume = 0.5 + rotation / 4 / 10 / 2;
    //TO CHANGE other changers also
    ChangeAccordingly(audio.volume,rotation);
  }
  if ((rotation > 320) | (rotation < 40)) {
    //abar.style.transform = "rotate(" + rotation + "deg)";
    if (rotation <= 360 && rotation > 300) rotation = rotation - 360;
    //volume_indicator.style.width = (0.5 + rotation / 4 / 10 / 2) * 100 + "%";
    audio.volume = 0.5 + rotation / 4 / 10 / 2;
    //TO CHANGE other changers also
    ChangeAccordingly(audio.volume,rotation); 
  }
});

document.addEventListener("mouseup", (e) => {
  mouseDown = false;
});

drag2.addEventListener("mousedown", (e) => {
  mouseDown = true;
  drag2.style.cursor = "pointer";
});







/*to change all changers according to volume change*/


function ChangeAccordingly(vol,rotationchange ){
  if(audio.volume>=0.92)return;
  //changing round type
  round.style.transform='rotate('+(vol*360)+'deg)';

  //changing jari type

  //finding rotationchange from volume if round type is changed
  if(rotationchange===-1){
    if(vol*80<40)rotationchange=-(40-(vol*80));
    else rotationchange=(vol*80)-40;
    abar.style.transform = "rotate(" + rotationchange + "deg)";
    volume_indicator.style.width = (0.5 + rotationchange / 4 / 10 / 2) * 100 + "%";
  }
  else{
    abar.style.transform = "rotate(" + rotationchange + "deg)";
    volume_indicator.style.width = (0.5 + rotationchange / 4 / 10 / 2) * 100 + "%";
  }
  

  //for well rope
  rotationchange=audio.volume*360;
  roundwrwc.style.transform='rotate('+rotationchange+'deg)';
  if(rotationchange<=180){ltop=(180-rotationchange);rtop=-ltop;}
  else{
    ltop=-(rotationchange-180);
    rtop=-ltop;
  }
  leftbox.style.transform='translateY('+ltop+'px)';
  rightbox.style.transform='translateY('+rtop+'px)';

  leftrope.style.height=250+ltop+'px';
  rightrope.style.height=250+rtop+'px';



}





