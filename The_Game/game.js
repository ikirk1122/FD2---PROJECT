"use strict";
var firstStart=true;
var screen=false;
var fontSize=90;
var t;
var g;
var playerName={};
var dateS;//system variables
var playerTime;//system variables
var winTime;
var resultAjax;
var documentHeight;
var documentWidth;
var endOfView;
var horizon;
var changeV=0;
var changeW=false;
var portraitOrientation=false;
var timer=0;
var speed=0;
var move=0;
var currentlane=5;
var moving=false;
var shakeCoeff=2;
var pause=true;
var gear=0;
var accel=0;
var idleRPM=15;
var globalEndOfView;
var tempEngine=0;
var noAccel=false;
var shiftProblem=false;
var meters=0;
var oppositeMeters=0;
var timerOut=800;
var winmeters=400;
var maxmeters=1600;
var currentObject1=2; 
var currentObject2=6; 
var currentObject3=8; 
var currentObject4=5;
var currentObjectPosition1=5; 
var currentObjectPosition2=9; 
var currentObjectPosition3=11; 
var currentObjectPosition4=8;
var currentObjectY1; 
var currentObjectY2; 
var currentObjectY3; 
var currentObjectY4;
var LB1;
var RB2;
var hittedObj=0;
var sY;
var sX;
var tXtemp;
var tYtemp;
var touchID;
var dustY=false;
var flameY=false;
var oneChoose=false;
var twoChoose=false;
var threeChoose=false;
var scoreView=false;
var rulesView=false;
var len;
var opponentSpeed=90;


var position=[-0.08, -0.06,-0.04, -0.02, 0, 0.02, 0.04, 0.06, 0.08];
var accelValue=[0, 0.45, 0.4, 0.35, 0.3, 0.28, 0.25];
var gearRatio=[0, 3.5,2.6, 2.1, 1.7, 1.3, 1.1];


var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;
var stringName='SHVED_NFS_GAME';
var test=[{"name":"Ktt", "time":99},{"name":"AA", "time":129}];
var newV={"name":"BBB", "time":55};
var temp;
var info;



/*-------------------------------game events-----------------------------*/
var GameEvents=function(){//just a little piece of objective oriented programming
this.pause=function(){
    context.fillText("Pause",sss.width/2,endOfView*0.4);
};
this.engineBlow=function(){
    context.fillStyle='#ff0000';
    context.fillText("GAME OVER!!!",sss.width/2,endOfView*0.4);
    context.fillStyle='#ffffff';
    context.fillText("You broke down engine - temperature's too hight!!!",sss.width/2,endOfView*0.5);   
    this.newgame();  
};
this.shiftProblem=function(){
    context.fillStyle='#ff0000';
    context.fillText("Can't shift gear",sss.width/2,endOfView*0.05);  
};
this.hitObject=function(){
    context.fillStyle='#ff0000';
    context.fillText("GAME OVER!!!",sss.width/2,endOfView*0.4);
    context.fillStyle='#ffff00';
    context.fillText("You broke your ride!!!",sss.width/2,endOfView*0.5);  
    this.newgame(); 
};
this.lose=function(){
    context.fillStyle='#ff0000';
    context.fillText("GAME OVER!!!",sss.width/2,endOfView*0.4);
    context.fillStyle='#ffffff';
    context.fillText("You failed the Race!!!",sss.width/2,endOfView*0.5);
    this.newgame();
};
this.win=function(){
    context.fillStyle='#ff00ff';
    context.fillText("CONGRATULATIONS!!!",sss.width/2,endOfView*0.4);
    context.fillStyle='#00ff00';
    context.fillText("You WON!!!",sss.width/2,endOfView*0.5);  
    this.won();
};
this.won=function(){
    
    playerName=prompt("Enter Here Your Name To Save The Record!")+"";
    console.log(playerName);
    playerTime= new Date; 
    winTime=(playerTime-dateS)/1000;
    storeInfo();
    context.fillText("Your time - "+winTime,sss.width/2,endOfView*0.55); 
    this.newgame(); 
};
this.newgame=function(){
setTimeout(switchToMenuPage,2000);
};

this.newgameHash=function(){

screen=false; fontSize=80; changeV=0; changeW=false; portraitOrientation=false; timer=0; speed=0; move=0; currentlane=5; moving=false; shakeCoeff=2;
pause=true; gear=0; accel=0; idleRPM=15; tempEngine=0; noAccel=false; shiftProblem=false; meters=0; oppositeMeters=0; timerOut=800; currentObject1=2;  currentObject2=6;  currentObject3=8;  currentObject4=5;
currentObjectPosition1=5;  currentObjectPosition2=9;  currentObjectPosition3=11;  currentObjectPosition4=8; hittedObj=0;
documentHeight=document.body.getBoundingClientRect().height;
sss.height=documentHeight;
documentWidth=document.body.getBoundingClientRect().height*1.3; 
sss.width=documentWidth;
endOfView=sss.height; globalEndOfView=endOfView; horizon=sss.height/1.4;  portraitOrientation=false;dustY=false;
 flameY=false;
 oneChoose=false;
 twoChoose=false;
 threeChoose=false;
 scoreView=false;
 rulesView=false;
window.cancelAnimationFrame(g);setTimeout(loadMenu,200); if (firstStart===false){play("menu")}; stop("game");
};
};

var oop= new GameEvents;
/*------------------------------------SPA--------------------------------*/

window.location.hash="";
window.onhashchange=switchToStateFromURLHash;

function switchToStateFromURLHash() {
  var URLHash=window.location.hash;
  var stateStr=URLHash.substr(1);
  
  switch ( stateStr ) {
    case 'Menu':
    oop.newgameHash();
    break;  
        case '':  
        window.location.hash='Menu';
        break;
            case 'Game':
            screen=true; pause=false; dateS=new Date;  updateFrame(); stop("menu");  play("game");
            break;
  }};

function switchToMenuPage() {
    location.hash='Menu';
}

function switchToGamePage() {
    location.hash='Game';
}
window.onbeforeunload=function befUnload (EO) {
  EO=EO||window.event;
    EO.returnValue='А у вас есть несохранённые изменения!';
};

/*-------------------------textures---------------------------------*/
var arrowR=new Image();arrowR.src='arrowR.png';
var arrowL=new Image();arrowL.src='arrowL.png';
var arrowU=new Image();arrowU.src='arrowU.png';
var arrowD=new Image();arrowD.src='arrowD.png';
var menuB=new Image();menuB.src='menu.jpg';
var logo=new Image();logo.src='logo.png';
var imgk=new Image();imgk.src='ground.jpg';
var car=new Image();car.src='car.png';
var bmwF=new Image();bmwF.src='bmwf.png'; 
var asp=new Image();asp.src='asphalt.jpg';
var sky=new Image(); sky.src='sky.jpg';
var sand=new Image(); sand.src='sand.jpg';
var hill=new Image(); hill.src='hills.png';
var bet=new Image();bet.src='beton.jpg';
var box=new Image();box.src='box.png';
var stopS=new Image(); stopS.src='stopSign.png';
var cactus=new Image(); cactus.src='cactus1.png';
var cactus2=new Image(); cactus2.src='cactus2.png';
var cactus3=new Image(); cactus3.src='cactus3.png'; 
var dust=new Image(); dust.src='dust.png'; 
var flame=new Image(); flame.src='flame.png'; 
var backGr=new Image(); backGr.src='back.png'; 
var cross=new Image(); cross.src='cross.png'; 
/*-------------------------textures---------------------------------*/

document.body.setAttribute('style',`width: 100vw; height: 100vh; margin: 0px; padding: 0px; display: flex; flex-shrink: 1;
background-color: black;   background-image: url('back.png'); background-size:auto; background-repeat: repeat; cursor: crosshair;`)

var sss=document.createElement('canvas');//craete canvas
var context=sss.getContext('2d');
sss.setAttribute("height",(document.body.getBoundingClientRect().height-3));

sss.setAttribute("width",(document.body.getBoundingClientRect().height*1.3-3));
sss.setAttribute("id","sss");
sss.setAttribute("style","margin: 0 auto");
document.body.appendChild(sss);

documentHeight=document.body.getBoundingClientRect().height;
        documentWidth=document.body.getBoundingClientRect().width;
        endOfView=sss.height; globalEndOfView=endOfView;
        horizon=sss.height/1.4;
        portraitOrientation=false;



             
/*------------------------controller------------------------*/
window.addEventListener('click',(EO) => {
    EO=EO||window.event;
    let clickX=Math.round(EO.pageX);
   let clickY=Math.round(EO.pageY);
  
if (screen===false)
   { if (rulesView===false&&scoreView===false)
      { if (clickX>=(sss.width*0.4)&&clickX<=(sss.width*0.6))//first select
  { if (clickY>=(documentHeight*0.35)&&clickY<=(documentHeight*0.45))
      {screen=true; pause=false; dateS=new Date;  switchToGamePage(); firstStart=false; stop("menu");  play("game");
      };
      if (clickY>=(documentHeight*0.55)&&clickY<=(documentHeight*0.65))
      {restoreInfo(); 
      };
      if (clickY>=(documentHeight*0.75)&&clickY<=(documentHeight*0.95))
      {rulesView=true; 
      };    
    };}
    };

    if (screen===false&&scoreView===true)
   {
       if (clickX>=(sss.width*0.1-sss.height/30)&&clickX<=(sss.width*0.1+sss.height/30))//first select
  { if (clickY>=(sss.height*0.35-sss.height/30)&&clickY<=(sss.height*0.35+sss.height/30))
      {scoreView=false;
      };   
    };
    };    

    if (screen===false&&rulesView===true)
   {
       if (clickX>=(sss.width*0.1-sss.height/30)&&clickX<=(sss.width*0.1+sss.height/30))//first select
  { if (clickY>=(sss.height*0.35-sss.height/30)&&clickY<=(sss.height*0.35+sss.height/30))
      {rulesView=false;
      };   
    };
    }; 




if (portraitOrientation===true&&screen===true){

 if (clickX>=(sss.width*3/4)&&clickX<=(sss.width))
{ if (clickY>=(endOfView)&&clickY<=(sss.height))
    { 
     if (currentlane>3&&moving===false) currentlane--;
    }};
    
    if (clickX>=(0)&&clickX<=(sss.width*1/4))
{ if (clickY>=(endOfView)&&clickY<=(sss.height))
    { 
     if (currentlane<9&&moving===false) {currentlane++;}
    }};   

    if (clickX>=(sss.width*1/4)&&clickX<=(sss.width*2/4))
{ if (clickY>=(endOfView)&&clickY<=(sss.height))
    { 
     if (currentlane<9&&moving===false) {if (idleRPM<=220) {shiftProblem=false;
        if (gear>0) gear--;
if (gear===0&&speed>100) gear=6;
else if (gear===0&&speed>50) gear=4;}
if (idleRPM>220) shiftProblem=true;}
    }};  

    if (clickX>=(sss.width*2/4)&&clickX<=(sss.width*3/4))
{ if (clickY>=(endOfView)&&clickY<=(sss.height))
    { 
        if (gear<6) {gear++;shiftProblem=false;}
else if (gear===6){ gear=0;shiftProblem=false;}
    }};    
                                            }

},false);

window.addEventListener('mousemove',(EO) => {
    EO=EO||window.event;
    let clickX=Math.round(EO.pageX);
   let clickY=Math.round(EO.pageY);
  
if (screen===false)
   {if (rulesView===false&&scoreView===false)
            {if (clickX>=(sss.width*0.4)&&clickX<=(sss.width*0.6))
        { if (clickY>=(documentHeight*0.35)&&clickY<=(documentHeight*0.45))
            {document.body.style.cursor="pointer"; oneChoose=true; twoChoose=false; threeChoose=false;
            }

            if (clickY>=(documentHeight*0.55)&&clickY<=(documentHeight*0.65))
            {document.body.style.cursor="pointer"; oneChoose=false; twoChoose=true; threeChoose=false;
            }


            if (clickY>=(documentHeight*0.75)&&clickY<=(documentHeight*0.95))
            {document.body.style.cursor="pointer"; oneChoose=false; twoChoose=false; threeChoose=true;
            }
            //else document.body.style.cursor="crosshair";      
        }else document.body.style.cursor="crosshair";  }
    }


},false);



document.addEventListener('keydown', (EO) => {
    EO=EO||window.event;
if (screen===true)
{    let keyName = EO.keyCode;
if (keyName===37){ //right arrow
if (currentlane<9&&moving===false) currentlane++;
};

if (keyName===39) {//left arrow
if (currentlane>3&&moving===false) currentlane--;
    };


    if (keyName===38){ //up arrow
if (gear<6) {gear++;shiftProblem=false;}
else if (gear===6){ gear=0;shiftProblem=false;}

    };

if (keyName===40) {//down arrow
    if (idleRPM<=220) {shiftProblem=false;
        if (gear>0) gear--;
if (gear===0&&speed>100) gear=6;
else if (gear===0&&speed>50) gear=4;}
if (idleRPM>220) shiftProblem=true;
    };


    if (keyName===17) {//left shift
pause=true;
    };

    if (keyName===16) {//left control
pause=false;  updateFrame();
    };

}
}, false);

document.addEventListener('keyup', (EO) => {//
    EO=EO||window.event;
let keyName = EO.keyCode;
if (keyName===37) {changeV=0}
if (keyName===39) {changeV=0}

}, false);

document.addEventListener('touchstart', (Ev) => {//
    Ev=Ev||window.event;
    touchID=Ev.targetTouches[0].identifier;
 sX=Ev.targetTouches[0].screenX;
 sY=Ev.targetTouches[0].screenY;

}, false);

document.addEventListener('touchmove', (Ev) => {//
    Ev=Ev||window.event;
    if (screen===true){
let tX=Ev.targetTouches[0].screenX;
let tY=Ev.targetTouches[0].screenY;




if (tX>=(sX+100)&&tXtemp!==sX)
{ if (currentlane>3&&moving===false) currentlane--; tXtemp=sX};
   
if (tX<=(sX-100)&&tXtemp!==sX)
{if (currentlane<9&&moving===false) currentlane++; tXtemp=sX};  

if (tY>=(sY+100)&&tYtemp!==sY)
{ if (idleRPM<=220) {shiftProblem=false;
        if (gear>0) gear--;
if (gear===0&&speed>100) gear=6;
else if (gear===0&&speed>50) gear=4; yXtemp=sY}
if (idleRPM>220) shiftProblem=true;};

if (tY<=(sY-100)&&tYtemp!==sY)
{ if (gear<6) {gear++;shiftProblem=false; tYtemp=sY}
else if (gear===6){ gear=0;shiftProblem=false; tYtemp=sY};
}
}}, false);
/*------------------------controller------------------------*/



function loadMenu() {

    documentHeight=document.body.getBoundingClientRect().height;
    endOfView=documentHeight;
        documentWidth=document.body.getBoundingClientRect().width;
        sss.width=documentWidth;
        endOfView=sss.height; globalEndOfView=endOfView;
        horizon=sss.height/1.4;
        portraitOrientation=false; 

    context.drawImage(menuB, 0, 0, sss.width, endOfView);
    context.drawImage(logo, sss.width/4, endOfView*0.1,  sss.width/2,  endOfView/4);

    context.font=80+'px normal serif';

    context.textAlign='center';
    context.textBaseline='middle';
    context.fillStyle='#ffff90';
    if (oneChoose===true) context.fillStyle='#ff9900';
    context.fillText("New Game",sss.width/2,endOfView*0.4);

context.fillStyle='#ffff90'
if (twoChoose===true) context.fillStyle='#ff9900';
    context.fillText("Scores",sss.width/2,endOfView*0.6);

  
    context.fillStyle='#ffff90'
    if (threeChoose===true) context.fillStyle='#ff9900';
    context.fillText("Rules",sss.width/2,endOfView*0.8);


if (scoreView===true){
    let backP=context.createPattern(backGr,'repeat');  
    context.fillStyle=backP;
    context.fillRect(sss.width*0.1,endOfView*0.35,sss.width*0.8,endOfView*0.5);
    context.fillStyle='#ffff90';
    context.font=16+'px normal Arial';
    context.fillText("Names",sss.width*0.35,endOfView*0.4); 
    context.fillText("Best time",sss.width*0.6,endOfView*0.4);
    context.drawImage(cross, sss.width*0.1-sss.height/30,endOfView*0.35-sss.height/30, sss.height/15, sss.height/15);
     len=info.length;
    if (len>10) len=10;
    for (var i=0; i<len; i++)
    {context.fillText(info[i].name,sss.width*0.35,endOfView*0.45+20*(1+i)); 
    context.fillText(info[i].time,sss.width*0.6,endOfView*0.45+20*(1+i));
   };
};

if (rulesView===true){
    let backP=context.createPattern(backGr,'repeat');  
    context.fillStyle=backP;
    context.fillRect(sss.width*0.1,endOfView*0.35,sss.width*0.8,endOfView*0.5);
    context.fillStyle='#ffff90';
    context.font=16+'px normal Arial';
    context.fillText("Rules of the game are simple",sss.width*0.5,endOfView*0.4); 
    context.fillText("Player has to reach one mile distance first",sss.width*0.5,endOfView*0.45); 
    context.fillText("or need to increase the distance between",sss.width*0.5,endOfView*0.5); 
    context.fillText("your virtual opponent to quarter mile",sss.width*0.5,endOfView*0.55); 
    context.fillText("Escape barriers collision",sss.width*0.5,endOfView*0.6); 
    context.fillText("and engine overheating",sss.width*0.5,endOfView*0.65);
    context.fillText("Controls - arrows up down to shift gears",sss.width*0.5,endOfView*0.7);
    context.fillText("and left, right arrows to switch between lanes",sss.width*0.5,endOfView*0.75);
    context.drawImage(cross, sss.width*0.1-sss.height/30,endOfView*0.35-sss.height/30, sss.height/15, sss.height/15);
    
};



if (screen===false) {t=requestAnimationFrame(loadMenu); }
    
};
window.addEventListener('load',switchToStateFromURLHash,false);

    function updateFrame() {
        
        screen=true;
        if (t!==undefined) {window.cancelAnimationFrame(t);}
        documentHeight=document.body.getBoundingClientRect().height;
    documentHeight=endOfView;
        documentWidth=document.body.getBoundingClientRect().width;
        sss.width=documentHeight*1.3;
        if (portraitOrientation===true) sss.width=document.body.getBoundingClientRect().width*0.9;
        endOfView=sss.height; globalEndOfView=endOfView;
        horizon=sss.height/1.4;
        portraitOrientation=false; 
        timerOut=endOfView; 
        documentHeight=document.body.getBoundingClientRect().height;
        documentHeight=endOfView;
       if (changeW=false)
        documentWidth=document.body.getBoundingClientRect().width;
        sss.width=documentWidth;
        endOfView=sss.height; 
        globalEndOfView=endOfView;
        horizon=sss.height/1.4;
        portraitOrientation=false; 
        document.body.style.cursor="crosshair";
             
        var pointOfView=sss.width;
        if (endOfView>pointOfView*0.769)  {endOfView=sss.width/1.5; horizon=endOfView/1.4; portraitOrientation=true}
        
      // if (pointOfView>endOfView/10*16) {changeW=true; sss.width=sss.height/10*16} else {changeW=false; documentWidth=document.body.getBoundingClientRect().width;}

        var horizonV=endOfView/2;  

        var fontSize=documentHeight/60;//scaling fonts
var radSun=sss.width/25
var line1=horizonV;

moving=false;
//car.src='car.png';

if (position[currentlane-1]!==move){
    if (position[currentlane-1]<move) {move=move-0.001; moving=true;}
    if (position[currentlane-1]>move) {move=move+0.001; moving=true;}
};

move=Math.round(move/0.001)*0.001;//rounding to 0.001;

//if (moving===true) car.src="sand.jpg";//change car image while moving between lanes       доделать!!!!!!!!!!!!!!!!

shakeCoeff=2;
dustY=false;

if (currentlane>8||currentlane<4) {shakeCoeff=10; speed--; if (speed<19&&gear!==0) speed=20; dustY=true; vibro(true)}
if (currentlane===6) {shakeCoeff=10; speed--; if (speed<19&&gear!==0) speed=20; dustY=true; vibro(false)}

//-----------------
var line0=endOfView*(0.04+move);//line for signs right
var line1=endOfView*(0.03+move); var line15=endOfView*(0.02+move); var line16=endOfView*(0+move);
var line2=endOfView*(-0.01+move);var line25=endOfView*(-0.02+move);
var line3=endOfView*(-0.03+move);var line35=endOfView*(-0.04+move); var line36=endOfView*(-0.06+move);
var line4=endOfView*(-0.07+move); var line45=endOfView*(-0.08+move);
var line5=endOfView*(-0.09+move);//line for signs left
var laneR=(line1+line2)/2; var laneRR=(line0+line1)/2;
var laneL=(line3+line4)/2; var laneLL=(line5+line4)/2;

var objectsPosition=[{l:line0, ob:cactus, ll: 3},{l:line0, ob:cactus2, ll: 3},{l:line15, ob:box, ll: 4},{l:line16, ob:box, ll: 5},{l:line25, ob:stopS, ll: 6},
{l:line25, ob:cactus2, ll: 6},{l:line35, ob:box, ll: 7},{l:line36, ob:box, ll: 8},{l:line45, ob:cactus, ll: 9},{l:line45, ob:cactus2, ll: 9}];

context.fillStyle="black";
context.fillRect(0,0,sss.width,endOfView);

 
 draw ();
        function draw () {


sss.setAttribute("height",(document.body.getBoundingClientRect().height));
sss.setAttribute("width",(document.body.getBoundingClientRect().height*1.3));
if (portraitOrientation===true) {sss.setAttribute("width",(document.body.getBoundingClientRect().width)); var fontSize=endOfView/40;}
sss.setAttribute("id","sss");

var asph=context.createPattern(asp,'repeat');
var gro=context.createPattern(imgk,'repeat');
var san=context.createPattern(sand,'repeat');
var bett=context.createPattern(bet,'repeat');


context.fillStyle=san;
context.fillRect(0,0,sss.width,endOfView);//redraw canvas
/*-------------------------------------------------------------------------*/
/*road lines maker function*/
linesMaker(line2,line1,asph);/*----------right lane------*/
linesMaker(line4,line3,asph);/*----------left lane------*/
linesMaker(line2,line3,bett);/*----------middle lane------*/
linesMaker(line1,line1,'#e3b017');/*---yellow side lines---*/
linesMaker(line2,line2,'#e3b017');/*---yellow side lines---*/
linesMaker(line3,line3,'#e3b017');/*---yellow side lines---*/
linesMaker(line4,line4,'#e3b017');/*---yellow side lines---*/
/*road lines maker function*/



function linesMaker (left,right,pattern,action){
context.fillStyle=pattern;
context.beginPath();
    context.lineTo((sss.width/2+endOfView*0.001)+left*1.5,(horizon));//left top
    context.moveTo((sss.width/2-endOfView*0.001)+right*1.5,(horizon));//right top
    context.lineTo((sss.width/2+(-endOfView*0.01+right))+right*10,(endOfView));//right bottom
    context.lineTo((sss.width/2+(endOfView*0.01+left))+left*10,(endOfView));//left bottom
    context.lineTo((sss.width/2+endOfView*0.001)+left*1.5,(horizon));//left top
context.fill();
context.closePath();
};


function movinglines (lane, forward){
    let leftT=posLine((sss.width/2-endOfView*0.001)+lane*1.5,(horizon), (sss.width/2+(-endOfView*0.01+lane))+lane*10,(endOfView), forward+timer*0.8);
    let leftB=posLine((sss.width/2-endOfView*0.001)+lane*1.5,(horizon), (sss.width/2+(-endOfView*0.01+lane))+lane*10,(endOfView), (forward+50)+timer*1.1);
    let rightT=posLine((sss.width/2+endOfView*0.001)+lane*1.5,(horizon),(sss.width/2+(endOfView*0.01+lane))+lane*10,(endOfView), forward+timer*0.8);
    let rightB=posLine((sss.width/2+endOfView*0.001)+lane*1.5,(horizon),(sss.width/2+(endOfView*0.01+lane))+lane*10,(endOfView), (forward+50)+timer*1.1);
context.fillStyle='#ffffff';
context.beginPath();
context.moveTo(leftT[0],leftT[1]);//left top
context.lineTo(rightT[0],rightT[1]);//right top
context.lineTo(rightB[0],rightB[1]);//right bottom
context.lineTo(leftB[0],leftB[1]);//left bottom
context.lineTo(leftT[0],leftT[1]);//left top
context.fill();
context.closePath();
};

    movinglines (laneR, 0);
    movinglines (laneR, -300);
    movinglines (laneR, -700);
    movinglines (laneL, 100);
    movinglines (laneL, -200);
    movinglines (laneL, -600);


/*-----------------sky----------------*/
    context.fillStyle='#6688ff';
context.fillRect(0,0,sss.width,horizon);
context.drawImage(sky, 0, 0, sss.width, horizon);

/*-----------------background----------------*/
context.drawImage(hill, -sss.width*0.2+sss.width*move*0.15, 0, sss.width*1.4+sss.width*move*0.15, horizon);

/*--------------sun-----------------*/
context.fillStyle="#ffffa3";//sun
context.strokeStyle='red';
context.beginPath();
context.arc(sss.width*0.9+sss.width*move*0.15,endOfView*0.4, radSun, 0,Math.PI*2, false);
context.fill();


/*-----------------------------objects-----------------------*/ 
 LB1= (endOfView/2+(-endOfView*0.01+line1))+line1*10;//functional variables
 RB2=  (endOfView/2+(endOfView*0.01+line2))+line2*10;//functional variables
objectConstructor (objectsPosition[currentObject1].ob, objectsPosition[currentObject1].l, objectsPosition[currentObject1].ll, 1);
objectConstructor (objectsPosition[currentObject2].ob, objectsPosition[currentObject2].l, objectsPosition[currentObject2].ll, 2);
objectConstructor (objectsPosition[currentObject3].ob, objectsPosition[currentObject3].l, objectsPosition[currentObject3].ll, 3);
objectConstructor (objectsPosition[currentObject4].ob, objectsPosition[currentObject4].l, objectsPosition[currentObject4].ll, 4);

       /*-----------------------------car-----------------------*/  
var carW=Math.abs(LB1-RB2)/2;
var carH=carW*0.55;
var carX=(sss.width/2-carW/2)+Math.random()*speed/200*shakeCoeff;//shake effect
var carY=(endOfView-endOfView/10)+Math.random()*speed/200*shakeCoeff;
var carXdust=(sss.width/2-carW/2)+Math.random()*speed/200*shakeCoeff*5;//shake effect
var carYdust=(endOfView-endOfView/10)+Math.random()*speed/200*shakeCoeff*5;
   context.drawImage(car,carX ,carY ,carW ,carH );

   if (dustY===true) context.drawImage(dust,carXdust ,carYdust ,carW ,carH );
   if  (flameY===true) context.drawImage(flame,carXdust+carW/4 ,carYdust+carH/4 ,carW/2,carH/2 );

    /*-----------------------------portrain orientation---------------------------*/
    if (portraitOrientation===true){
context.beginPath();
context.fillStyle="black";
context.fillRect(0,endOfView,sss.width,sss.height);
context.fill();
context.closePath();

context.fillStyle='#ff5577';
context.drawImage(arrowR,sss.width*3/4,endOfView,sss.width*0.2,sss.height-endOfView);
context.fillText("CHANGE LANE RIGHT" ,sss.width*3/4,endOfView+10); 

context.drawImage(arrowL,0,endOfView,sss.width*0.2,sss.height-endOfView);
context.fillText("CHANGE LANE LEFT" ,0,endOfView+10); 

context.drawImage(arrowD,sss.width*1/4,endOfView,sss.width*0.2,sss.height-endOfView);
context.fillText("SHIFT GEAR DOWN" ,sss.width*1/4,endOfView+10); 

context.drawImage(arrowU,sss.width*2/4,endOfView,sss.width*0.2,sss.height-endOfView);
context.fillText("SHIFT GEAR UP" ,sss.width*2/4,endOfView+10); 
};

/*-----------------------interface-----------------------------*/
if (noAccel===false) accel=accelValue[gear];//speed acce
if (noAccel==true)  accel=(0.001*speed);

speed=speed+accel-(0.001*speed);//tire resistance here!!!
if (speed>300) speed=300;
if (speed<0) speed=0;
timer=timer+speed*0.07;//speed of objects here!!!!
//documentHeight*0.01

idleRPM=speed*gearRatio[gear]; 
if (gear===0) idleRPM=15;
if (idleRPM>=300) noAccel=true; else noAccel=false;


if (timer>timerOut) {timer=0; 
currentObject1=Math.floor(Math.random()*10);
currentObject2=Math.floor(Math.random()*10);  
currentObject3=Math.floor(Math.random()*10);
currentObject4=Math.floor(Math.random()*10);
};
var angleRMP=Math.PI/2+Math.PI/2*idleRPM/100;


flameY=false;
var radTaho=sss.width/20; var radTahoNum=sss.width/25;
context.shadowColor='rgb(00,00,00)';
context.shadowOffsetX=2;
    context.shadowOffsetY=2;
    context.shadowBlur=2;
    context.font=fontSize+'px normal Arial';
    context.strokeStyle='#ffffff';
    if (idleRPM>230) context.strokeStyle='#00ff00';
    if (idleRPM>=250) context.strokeStyle='#ffff00';
    if (idleRPM>=260) context.strokeStyle='#ffaa00';
    if (idleRPM>=270) context.strokeStyle='#ff0000';
    if (idleRPM<=220)context.strokeStyle='#ffffff';
    context.beginPath();
    context.arc(sss.width/2,endOfView*0.2, radTaho, Math.PI/2,angleRMP, false);
    context.stroke();
if (idleRPM>270) {tempEngine++;  
    context.fillStyle='#ffff00';
    context.textAlign='center';
    context.textBaseline='middle';
context.fillText("Overheating!!!",sss.width/2,endOfView*0.45); flameY=true;
}

if (idleRPM<270&&tempEngine>0) tempEngine--;  
if (tempEngine>=399) pause=undefined; 
    var radTemp=sss.width/19; 
    var radTempNum=0+Math.PI/2*tempEngine/100/4;
    context.strokeStyle='#ffaa00';
    context.lineWidth = 4;
    
    context.beginPath();
    context.arc(sss.width/2,endOfView*0.2, radTemp, 0,radTempNum, false);
    context.stroke();    


    context.fillStyle='#ffffff';
    context.textAlign='center';
    context.textBaseline='middle';
    oppositeMeters=oppositeMeters+opponentSpeed/(3.6)/60;//here is the speed of your opponent!
    meters=meters+speed/(3.6)/60;
context.fillText("Your Distance in Meters "+Math.floor(meters) ,sss.width/4*3,endOfView*0.2); 
context.fillText("Opponent Distance in Meters "+Math.floor(oppositeMeters) ,sss.width/4*3,endOfView*0.2+20); 

context.fillStyle='#ffffff';
context.fillText("Damage of Your Vehicle ",sss.width/4*1,endOfView*0.2); 
context.fillStyle='#ff0000';
context.fillText(Math.floor(hittedObj*100)+" %" ,sss.width/4*1,endOfView*0.2+20); 
context.fillStyle='#ffffff';


context.fillText("KM/H "+Math.floor(speed) ,sss.width/2,endOfView*0.2);

var showgearArr=["N","M1","M2","M3","M4","M5","M6"];
var showgear=showgearArr[gear];
context.fillStyle='#ffffff';
    context.textAlign='center';
    context.textBaseline='middle';
context.fillText((showgear) ,sss.width/2,endOfView*0.23);

for (var i=0; i<10; i++) {
    context.fillStyle='white';
    if (i>7) context.fillStyle='red';
    context.fillText(i ,posRPM(i ,sss.width/2,endOfView*0.2,radTahoNum)[0],posRPM( i ,sss.width/2,endOfView*0.2,radTahoNum)[1])
};

if ((currentObjectY1>=endOfView&&currentObjectY1<=(endOfView+100)&&currentObjectPosition1===currentlane&&moving===false)||
(currentObjectY2>=endOfView&&currentObjectY2<=(endOfView+100)&&currentObjectPosition2===currentlane&&moving===false)||
(currentObjectY3>=endOfView&&currentObjectY3<=(endOfView+100)&&currentObjectPosition3===currentlane&&moving===false)||
(currentObjectY4>=endOfView&&currentObjectY4<=(endOfView+100)&&currentObjectPosition4===currentlane&&moving===false))
{hittedObj=hittedObj+0.01; speed=speed*0.5; vibro(true); if (speed<19&&gear!==0) speed=20};
if (hittedObj>1.01) pause="end";

if ((oppositeMeters>=maxmeters&oppositeMeters>meters)||(Math.abs(oppositeMeters-meters)>winmeters&oppositeMeters>meters)) pause="lose";
if ((meters>=maxmeters&oppositeMeters<meters)||(Math.abs(oppositeMeters-meters)>winmeters&oppositeMeters<meters)) pause="win";
/*-----------------------interface-----------------------------*/
};/*-----------end-of-drawing------*/
if (pause===true) 
oop.pause();

if (pause==="end") 
oop.hitObject();

if (pause==="lose") 
oop.lose();

if (pause==="win") 
oop.win();


if (pause==undefined) 
oop.engineBlow();

if (shiftProblem===true) 
oop.shiftProblem();



if (pause===false){
g=requestAnimationFrame(updateFrame);  
}
        };//-------------end of updating frame----------------------

   function posLine(ax,ay,bx,by,nrad) {  /*функция построения разметки на полосах*/ 

var radA=Math.abs(ax-bx);
var radB=Math.abs(by-ay);

var radius=Math.sqrt(radA*radA+radB*radB); 

var redCenterX=ax;
var redCenterY=ay;

var angleCos=(ay-by)/radius;
var angle=Math.acos(angleCos);
if (bx<ax) angle=Math.PI*2-Math.acos(angleCos);
var angleSin=Math.sin(angle);   

var greenCenterX=redCenterX+nrad*Math.sin(angle);
var greenCenterY=redCenterY-nrad*Math.cos(angle);

return [greenCenterX,greenCenterY];
}

        function posRPM(z,cx,cy,r) {
var radius=parseFloat(r);
var angle=parseFloat(210+30*(z-1))/180*Math.PI;

var redCenterX=cx;
var redCenterY=cy;

var greenCenterX=redCenterX+radius*Math.sin(angle);
var greenCenterY=redCenterY-radius*Math.cos(angle);

return [greenCenterX,greenCenterY];
};

function movingObjects (lane, forward){
        let coordinate=posLine((sss.width/2-documentHeight*0.001)+lane*1.5,(horizon), (sss.width/2+lane)+lane*10,(endOfView), forward+timer*1);
return coordinate;
};

function objectConstructor (obj,line,ll,numm){

let objScale=Math.sqrt(timer/timerOut);
let objW=Math.abs(LB1-RB2)/2/2*(0+objScale);
let objH=Math.abs(LB1-RB2)/2/2*(0+objScale);
let objX=(movingObjects(line, 0))[0]-objW/2;
let objY=(movingObjects(line, 0))[1]-objH;
context.drawImage(obj,objX ,objY ,objW ,objH );
if (numm===1)
{currentObjectPosition1=ll;
currentObjectY1=objY+objH*1.5;};
if (numm===2)
{currentObjectPosition2=ll;
currentObjectY2=objY+objH*1.5;};
if (numm===3)
{currentObjectPosition3=ll;
currentObjectY3=objY+objH*1.5;};
if (numm===4)
{currentObjectPosition4=ll;
currentObjectY4=objY+objH*1.5;};
};



function posAngl(a,cx,cy,r) {

var radius=parseFloat(r);
var angle=parseFloat(a)/180*Math.PI;

var redCenterX=cx;
var redCenterY=cy;

var greenCenterX=redCenterX+radius*Math.sin(angle);
var greenCenterY=redCenterY-radius*Math.cos(angle);

return [greenCenterX,greenCenterY];//модернизирована и урезана под работу с canvas
};

function play (i){
    var zvukElem=document.getElementById(i);
    zvukElem.play();
};
function stop (i){
    var zvukElem=document.getElementById(i);
    zvukElem.pause();
    zvukElem.currentTime=0; 
};

function vibro(longFlag) {
        if ( navigator.vibrate ) { 
            if ( !longFlag )
                window.navigator.vibrate(200); 
            else
                window.navigator.vibrate(500); 
        }
    };

/*---------------------------------------------------------AJAX PART------------------------------------------------*/




function storeInfo() {
    updatePassword=Math.random();
    $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : stringName, p : updatePassword },
            success : lockGetReady, error : errorHandler
        }
    );
};

function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
        if ( callresult.result!="" ) {
        info=JSON.parse(callresult.result);
        console.log(info);
        resultAjax={name: playerName, time: winTime};
      console.log(info);
      temp=info; 
      if ((Array.isArray(temp))===true) temp.unshift(resultAjax); 
     if ((Array.isArray(temp))===false) temp=[new Array];
      console.log(temp);
        };
        $.ajax( {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'UPDATE', n : stringName, v : JSON.stringify(temp), p : updatePassword },
                success : updateReady, error : errorHandler
            }
        );
    };
  };

function updateReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
};

function restoreInfo() {
    $.ajax(
        {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : stringName },
            success : readReady, error : errorHandler
        }
    );
};

function readReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else if ( callresult.result!="" ) {
        info=JSON.parse(callresult.result);
        setTimeout( ScoreEn(), 1000);

       // document.getElementById('IName').value=info.name;
        //document.getElementById('IAge').value=info.age;
       // updateStorage();
    }
};

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
};

function ScoreEn(){
    //alert("Score table loaded");
    scoreView=true;
};

/*---------------------------------------------------------AJAX PART------------------------------------------------*/
