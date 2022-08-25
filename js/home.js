const scoreArr = [];
const dLIndexArr = [];
let dL = localStorage.getItem("dateTime");
let psL = localStorage.getItem("playerScore");
let csL = localStorage.getItem("computerScore");
let x = 0;
let dLFinal = [];
dL = dL.replaceAll('","',"'").replaceAll('["',"'").replaceAll('"]',"'");


// finds the index of every occurance of the "'" character in my string of datetimes
// that I pulled from the local storage, and transformed to replace any unuseful 
// characters with the "'" character.
function nth_ocurrence() {

  for (let i= 0; i <dL.length; i++) {

    if (dL.charAt(i) == "'") {
      dLIndexArr.push(i);   
    }  
  }
}

// iterates through the string and pulls out the datetimes, and pushes them into a new array.
function populateDL() {

  for (let i = 0; i < dLIndexArr.length; i++) {

    let index = dLIndexArr[i];
    let datei = dL.substr(index+1,20);
    dLFinal.push(datei);
  }

  dLFinal = dLFinal.filter(item => item != '');
}

//----------------------------------UPDATE SCOREBOARD----------------------------------// 
function updateScoreBoard() {

  nth_ocurrence();
  populateDL();

// create objects for each datetime with relative scores and store in an array
  for (let i = 0; i < psL.length; i++) {

    if  (parseInt(psL[i]) >= 0) {
      let d = dLFinal[x];
      let pS = parseInt(psL[i]);
      let cS = parseInt(csL[i]);
      let obj = {};
      obj['d'] = d;
      obj['ps'] = pS;
      obj['cs'] = cS;
      scoreArr.push(obj);
      x +=1;
    }
  }

// the comp() function checks through each players score in each object in the array, 
// and checks if the first score is higher or lower than the second score. As I want 
//to sort by descending order, If a was greater than b, I would give it a value of -1, 
//so it would be shifted to the bottom of the 'list'. Then when this was sorted, it would 
// move to the top.
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

  // creates new elements for each set of datetime & scores and appends to new divs
  for (let i = 0; (i < scoreArr.length && i < 10); i++) {
    let newDateDiv = `<div class="ps">${scoreArr[i].d}`;
    let newpsDiv = `<div class="ps">${scoreArr[i].ps}`;
    let newcsDiv = `<div class="cs">${scoreArr[i].cs}`;

    $('.gameList').append(newDateDiv);
    $('.playerScoreList').append(newpsDiv);
    $('.computerScoreList').append(newcsDiv);
  }
}

