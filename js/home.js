function updateScoreBoard() {let psL = localStorage.getItem("playerScore");
let csL = localStorage.getItem("computerScore");
let gameNum = 0;

const scoreArr = [];


for (let i = 0; i < psL.length; i++) {

    if(parseInt(psL[i]) >= 0) {

    let pS = parseInt(psL[i]);
    let cS = parseInt(csL[i]);
    let obj = {};
    obj['game'] = gameNum+1;
    obj['ps'] = pS;
    obj['cs'] = cS;

    scoreArr.push(obj);
    gameNum += 1;
   }
}

function comp( a, b ) {
    if ( a.ps > b.ps ){
      return -1;
    }
    if ( a.ps < b.ps ){
      return 1;
    }
    return 0;
  }
  
scoreArr.sort(comp);


for (let i = 0; (i < scoreArr.length && i < 10); i++) {
let newgameDiv = `<div class="ps">${scoreArr[i].game}`;  
let newpsDiv = `<div class="ps">${scoreArr[i].ps}`;
let newcsDiv = `<div class="cs">${scoreArr[i].cs}`;

$('.gameList').append(newgameDiv);
$('.playerScoreList').append(newpsDiv);
$('.computerScoreList').append(newcsDiv);
}

}

updateScoreBoard() 

