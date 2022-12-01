//常量定义区

const BA1=0,BA2=1,BA3=2,BA4=3,BA5=4,BA6=5;
const BA7=6,BA8=7;
const FN1=8,FN2=9;
const RED='red',BLUE='blue',GREEN='rgb(0,255,0)',YELLOW='yellow',NUL=null;

let playerOneHold = 10;
let playerTwoHold = 10;
let playerThreeHold = 10;
let playerNowCardList = [];

//循环判断出牌
let timeFlag=0;
intervalRandomJudge = () =>{
    winOrLoseJudge();
    updateLeftCardDisplay();
    updateNowPlayerCardDisplay();
    adjustButtonAvailability();
    updateStatus();
    let rd = [RED,GREEN,YELLOW,BLUE];
    if(timeFlag>=3&&goingPlayer!=0){
        let crush_or_go = Math.random();
        if(crush_or_go>=0.85){
            switch(goingPlayer){
                case 1:
                    playerOneHold=10;
                    playerOneCrushed++;
                    break;
                case 2:
                    playerTwoHold=10;
                    playerTwoCrushed++;
                    break;
                case 3:
                    playerThreeHold=10;
                    playerThreeCrushed++;
                    break;
            }
            goingPlayer++;
            if(goingPlayer>=3){
                goingPlayer=0;
            }
        }
        else{
            let /*diff*/color_or_num = Math.random();
            if(color_or_num<0.5){
                //颜色不变数字变
                lastCard=new BasicCards(lastCard.getcolor(),Math.ceil(Math.random()*10));
            }
            else{
                lastCard= new BasicCards(rd[Math.floor(Math.random()*4)],lastCard.getCount());
            }
            switch(goingPlayer){
                case 1:
                    playerOneHold--;
                    break;
                case 2:
                    playerTwoHold--;
                    break;
                case 3:
                    playerThreeHold--;
                    break;
            }
            goingPlayer++;
        }
        timeFlag=0;
    }
    if(goingPlayer>3){
        goingPlayer=0;
    }
    timeFlag++;
}
let botGoingInterval = setInterval(
    intervalRandomJudge,1000
)

//谁出牌
let goingPlayer=0;
//0:player 1:bot1 2:bot2 ...

let playerOneCrushed = 0;
let playerTwoCrushed = 0;
let playerThreeCrushed = 0;
let playerFourCrushed = 0;
let crushedTimes = 0;
var fn_cards;
$.getJSON("fn-cards.json",(result)=>{
    fn_cards = result;
})

class BasicCards{
    constructor(color,count){
        this.color = color;
        this.count = count;
    }
    getcolor = () => {
        return this.color;
    }
    getCount = () => {
        return this.count;
    }
    setCount = count =>{
        this.count = count
    }
}

let lastCard = NUL;

//为所有列表随机分配牌
giveCard = () => {
    //基础牌
    for(i=0;i<8;i++){
        let color_randomer = Math.ceil(Math.random()*4);
        let number_randomer = Math.ceil(Math.random()*8);
        let color;
        switch(color_randomer){
            case(1):
                color=RED;
                break;
            case(2):
                color=BLUE;
                break;
            case(3):
                color=YELLOW;
                break;
            case(4):
                color=GREEN;
                break;
        }
        playerNowCardList[i]=new BasicCards(color,number_randomer);
    }
    //技能牌
    playerNowCardList[8]='_'+Math.ceil((Math.random()*2)).toString();
    playerNowCardList[9]='_'+Math.ceil((Math.random()*2)).toString();
}

//更新其他玩家剩余卡数量
function updateLeftCardDisplay(){
    $("#player-one-left").text("剩余"+playerOneHold+"张牌\n已崩溃"+playerOneCrushed+"次");
    $("#player-two-left").text("剩余"+playerTwoHold+"张牌\n已崩溃"+playerTwoCrushed+"次");
    $("#player-three-left").text("剩余"+playerThreeHold+"张牌\n已崩溃"+playerThreeCrushed+"次");

    updateNowPlayerCardDisplay();
}
function updateNowPlayerCardDisplay(){
    //更新基础牌显示
    for(i=1;i<=8;i++){
        let ct,cl;
        if(playerNowCardList[i-1]!=NUL){  
            ct = playerNowCardList[i-1].getCount();
            cl = playerNowCardList[i-1].getcolor();
            $("#basic-card-"+i.toString()+"-top").text(ct);
            $("#basic-card-"+i.toString()+"-top").css("color",cl);
        }
        else{
            $("#basic-card-"+i.toString()+"-top").text("空");
            $("#basic-card-"+i.toString()+"-top").css("color","orange");
            $("#basic-card-"+i.toString()+"-title").text("空");
        }
        switch(cl){
            case BLUE:
                $("#basic-card-"+i.toString()+"-title").text("蓝"+ct.toString());
                break;
            case RED:
                $("#basic-card-"+i.toString()+"-title").text("红"+ct.toString());
                break;
            case YELLOW:
                $("#basic-card-"+i.toString()+"-title").text("黄"+ct.toString());
                break;
            case GREEN:
                $("#basic-card-"+i.toString()+"-title").text("绿"+ct.toString());
                break;
                
        }
    }
    //更新技能牌
    for(i=9;i<=10;i++){
        if(playerNowCardList[i-1]!=NUL)
        {
            let this_obj = fn_cards[playerNowCardList[i-1]];
            $("#f-card-"+(i-8).toString()+"-top").attr("src","images/"+this_obj["image"]);
            $("#f-card-"+(i-8).toString()+"-title").text(this_obj["name"]);
            $("#f-card-"+(i-8).toString()+"-text").text(this_obj["description"]);
        }
        else{
            $("#f-card-"+(i-8).toString()+"-top").attr("src","images/blue.jpg");
            $("#f-card-"+(i-8).toString()+"-title").text("空");
            $("#f-card-"+(i-8).toString()+"-text").text(" ");
        }
    }
    //更新上一个出牌
    if(lastCard==NUL){
        $("#last-title").css("color","orange");
        $("#last-text").text("没有上一次出牌");
        $("#last-title").text("空")
    }
    else{
        $("#last-title").css("color",lastCard.getcolor());
        $("#last-title").text(lastCard.getCount())
        let raw_color_text;
        switch(lastCard.getcolor()){
            case RED:  
                raw_color_text="红";
                break;
            case YELLOW:
                raw_color_text="黄";
                break;
            case GREEN:
                raw_color_text='绿';
                break;
            case BLUE:
                raw_color_text='蓝';
                break;
        }
        raw_color_text=raw_color_text+lastCard.getCount();
        $("#last-text").text("上一个出牌的是"+raw_color_text);
    }
}

function go(which){
    if(goingPlayer!=0){
        alert("不是您出牌！");
        return;
    }
    else{
        if(which<=7){
            if(lastCard==NUL){
                lastCard=playerNowCardList[which];
                playerNowCardList[which] = NUL;
                goingPlayer++;
            }
            else if((playerNowCardList[which].getCount()==lastCard.getCount())||(playerNowCardList[which].getcolor()==lastCard.getcolor())){
                lastCard=playerNowCardList[which];
                playerNowCardList[which] = NUL;
                goingPlayer++;
            }
        else{
            alert("您现在不能出这张牌！");
        }
        }
        else if(which==8||which==9){
            if(lastCard!=NUL){
                eval(fn_cards[playerNowCardList[which]]["function"]);  
                playerNowCardList[which]=NUL;
            }
            else{
                alert("您不能首发出技能/干员牌！");
            }
        }
        adjustButtonAvailability();
        updateNowPlayerCardDisplay();
        updateLeftCardDisplay();
    }
}

function adjustButtonAvailability(){
    for(i=1;i<=8;i++){
        if(playerNowCardList[i-1]!=NUL){
            if(goingPlayer!=0){
                $("#basic-card-"+i.toString()+"-btn").attr("disabled",true);
            }
            else{
                $("#basic-card-"+i.toString()+"-btn").attr("disabled",false);
            }
        }
        else{
            $("#basic-card-"+i.toString()+"-btn").attr("disabled",true);
        }
    }
    for(i=1;i<=2;i++){
        if(playerNowCardList[i+7]!=NUL){
            if(goingPlayer!=0){
                $("#f-card-"+i.toString()+"-btn").attr("disabled",true);
            }
            else{
                $("#f-card-"+i.toString()+"-btn").attr("disabled",false);
            }
        }
        else{
            $("#f-card-"+i.toString()+"-btn").attr("disabled",true);
        }
    }
}

function updateStatus(){
    let goingStatus="您的回合";
    if(goingPlayer!=0){
        goingStatus="不是您的回合";
    }
    $("#stats").text(goingStatus+",您已崩溃"+crushedTimes+"次");
}

function playerRequestCrushDown(){
    giveCard();
    crushedTimes++;
    goingPlayer++;
}

function stopNow(){
    window.location.href="checkout.html?pr";
}

function winOrLoseJudge(){
    let playerAllGo = true;
    for(i=0;i<8;i++){
        if(playerNowCardList[i]!=NUL){
            playerAllGo = false;
        }
    }
    if(playerAllGo){
        window.location.href="checkout.html?pag"
    }
    let oneBotAllGo = false;
    if(
        playerOneHold==0||
        playerTwoHold==0||
        playerThreeHold==0
    )   oneBotAllGo = true;
    if(oneBotAllGo){
        window.location.href="checkout.html?obag";
    }
    if(crushedTimes>=17){
        window.location.href="checkout.html?pc"
    }
    if(playerOneCrushed>=17||
       playerTwoCrushed>=17||
       playerThreeCrushed>=17 
    ){
        window.location.href="checkout.html?bc";
    }
}