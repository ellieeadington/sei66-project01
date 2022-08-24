
// JUST NEED TO FIX THE DATE ARRAY THEN WE GOOD


const scoreArr = [];
const dLIndexArr = [];
let dL = localStorage.getItem("dateTime");
console.log(typeof dL);

console.log(dL);
dL = dL.replaceAll('","',"'");
dL = dL.replaceAll('["',"'");
dL = dL.replaceAll('"]',"'");

console.log(dL);

//'24/08/2022, 10:45:44'24/08/2022, 11:44:42'24/08/2022, 11:45:15'24/08/2022, 11:52:37'


//-----------------------------------------------------------------------------------------------------------------------
function updateScoreBoard() {

  let dLFinal = [];

function nth_ocurrence() {

  for (let i= 0; i <dL.length; i++) {

    if (dL.charAt(i) == "'") {
      dLIndexArr.push(i);   
    }  
  }
}
nth_ocurrence();
console.log(dLIndexArr);

function populateDL() {

  for (let i = 0; i < dLIndexArr.length; i++) {

    let index = dLIndexArr[i];
    console.log(index)
    let datei = dL.substr(index+1,20);
    console.log(datei);
    dLFinal.push(datei);
  }
}


populateDL();
console.log(dLFinal);

dLFinal = dLFinal.filter(item => item != '');
console.log(dLFinal);


//----------------------------------GET SCORE FROM LS AND PUSH INTO SCORE OBJECTS--------------------------------------//
  
  let psL = localStorage.getItem("playerScore");
  let csL = localStorage.getItem("computerScore");
  let gameNum = 0;
  let x = 0;

  for (let i = 0; i < psL.length; i++) {

    if  (parseInt(psL[i]) >= 0) {
      let d = dLFinal[x];
      let pS = parseInt(psL[i]);
      let cS = parseInt(csL[i]);
      let obj = {};
      // obj['game'] = gameNum+1;
      obj['d'] = d;
      obj['ps'] = pS;
      obj['cs'] = cS;

      scoreArr.push(obj);
      x +=1;
    }
  }

//----------------------------------SORT SCORES BY HIGHEST PLAYER SCORE--------------------------------------//

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

//----------------------------------UPDATE HOMEPAGE SCOREBOARD--------------------------------------//

  for (let i = 0; (i < scoreArr.length && i < 10); i++) {
    // let newgameDiv = `<div class="ps">${scoreArr[i].game}`;  
    let newDateDiv = `<div class="ps">${scoreArr[i].d}`;
    let newpsDiv = `<div class="ps">${scoreArr[i].ps}`;
    let newcsDiv = `<div class="cs">${scoreArr[i].cs}`;

    // $('.gameList').append(newgameDiv);
    $('.gameList').append(newDateDiv);
    $('.playerScoreList').append(newpsDiv);
    $('.computerScoreList').append(newcsDiv);
  }
}

updateScoreBoard();


