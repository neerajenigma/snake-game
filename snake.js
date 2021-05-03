head=document.getElementById("head");
gamearea=document.getElementById('game_area');
score=document.getElementById('score');
lvl=document.getElementById('level');
lvll=1;
food();
t=0;
l=0;
d=0;
count=0;
count1=0;
pathleft=[0];
pathtop=[0];
flag=0;
document.addEventListener("keydown",function(kd){
    clearInterval(d);
    if(kd.keyCode==37 && (l>-1) && flag!=3){l=l-1;head.style.left=`${l}%`;flag=1;}
    if(kd.keyCode==38 && (t>-1) && flag!=4){t=t-1;head.style.top=`${t}%`;flag=2;}
    if(kd.keyCode==39 && (l<97) && flag!=1){l=l+1;head.style.left=`${l}%`;flag=3;}
    if(kd.keyCode==40 && (t<96) && flag!=2){t=t+1;head.style.top=`${t}%`;flag=4;}
    pathleft.push(l);
    pathtop.push(t);
    for(i=1;i<=count;i=i+1){
        gamearea.childNodes[i+1].style.left=`${pathleft[pathleft.length-i-1]}%`
        gamearea.childNodes[i+1].style.top=`${pathtop[pathleft.length-i-1]}%`
    }
    checkit();
    d=setInterval(move,50-lvll);
});

function move(){
    checkit();
    if(flag==1){l=l-1;head.style.left=`${l}%`;if(l<=-3){gameover();}}
    if(flag==2){t=t-1;head.style.top=`${t}%`;if(t<=-3){gameover();}}
    if(flag==3){l=l+1;head.style.left=`${l}%`;if(l>=98){gameover();}}
    if(flag==4){t=t+1;head.style.top=`${t}%`;if(t>=97){gameover();}}
    pathleft.push(l);
    pathtop.push(t);
    for(i=1;i<=count;i=i+1){
        gamearea.childNodes[i+1].style.left=`${pathleft[pathleft.length-i-1]}%`
        gamearea.childNodes[i+1].style.top=`${pathtop[pathleft.length-i-1]}%`
    }
}

function food(){
    f= document.createElement('div');
    f.setAttribute("class","food");
    rt =Math.floor((Math.random() * 80) + 10);
    rl=Math.floor((Math.random() * 80) + 10);
    f.style.top=`${rt}%`;
    f.style.left=`${rl}%`;
    gamearea.appendChild(f);
}

function gameover(){
    clearInterval(d);
    t=0;
    l=0;
    flag=1;
    head.style.left=`${l}%`;
    head.style.top=`${t}%`;
    gamearea.removeChild(f);
    food();
    location.reload();
    alert("GAME OVER");
}

function checkit(){
    if((l+4>=rl && l<=rl+4) && (t+5>=rt && t<=rt+5)){
        count=count+1;
        count1=count1+lvll;
        score.innerHTML=`SCORE: ${count1}`;
        incr();
        food();
        if(count%10==0){lvll=lvll+1;lvl.innerHTML=`LEVEL: ${lvll}`;clearInterval(d);console.log(50-lvll);d=setInterval(move,50-lvll);}}
}

function incr(){
    f.setAttribute("class","snake");
    f.style.left=`${pathleft[pathleft.length-count-1]}%`
    f.style.top=`${pathtop[pathleft.length-count-1]}%`
}