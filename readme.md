# project1-hangman

## Description Features

> This was my first project completed in week 3 of the course. I created a simple player vs computer game of hangman. Includes a home screen that logs the players high-scores and links to the game. Game includes 7 rounds of increasing difficulty. A winner is determined at the end of the 7 rounds.

## Deployment Link

> <a href="https://github.com/ellieeadington/hangman">Here</a>

## Getting Stated/Code Installation

> N/A

## Timeframe & Working Team

>This project was completed over 1 week, and I was the sole contributor to the game.

## Technologies used

> - CSS
> - HTML
> - JS
> - JQuery


## Brief

>The brief was to create a game utilising the tools and technologies we learned during the first 2 weeks. The timeframe for the project was 1 week, and it was a solo project.

## Technical requirements:

> - Include separate HTML / CSS / JavaScript files
> - Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
> - Use JavaScript and/or jQuery for DOM manipulation
> - Deploy your online, where the rest of the world can access it
> - Use semantic markup for HTML and CSS (adhere to best practices)
> - Have well-formatted, and well-commented code


## Necessary deliverables:

> - A working website, built by myself
> - A link to my hosted working website in the URL section of my Github repository
> - A git repository hosted on Github, with a link to my hosted website, and frequent commits dating back to the very beginning of the project.
> - A README.md file with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, any other useful information etc.


## Planning

> The first stage in my planning was to create a wireframe using Figma. In this document, I drew the initial wireframe of the game, and noted key features that I would like my game to include <a href ="https://www.figma.com/file/n33FCJ6FcWIYjeCRN3ccB6/Project-1-Ideation---Hangman?node-id=0%3A1">linked here</a>

<img src="images\firstwireframe.PNG">

>Next, I created my wireframe using HTML and CSS, which you can view in the document, dated 19/08/2022.

<img src="images\SEI-66 Project 1 Wireframe.PNG">

## Build/Code Process

### Creating my word arrays:
>First I decided to start by building 4 arrays of words, and a function to randomly generate a word from each array. I didn't know exactly what conditions I wanted the words to meet for each round, so I built 4 arrays of five, six, seven and eight letter words. This would be more than enough to get me started.

### Random word generator functions:

```javascript 
let randomSix = () => {return sixLetters[Math.floor(Math.random() * sixLetters.length)]}
let randomSeven = () => {return sevenLetters[Math.floor(Math.random() * sevenLetters.length)]}
let randomEight = () => {return eightLetters[Math.floor(Math.random() * eightLetters.length)]}
```

### The wireframe
> After messing around with my wireframe and brainstorming, I decided that I wanted my game to display differently. I wanted my game to include 5 main sections:

### Choose Letters Zone
> - Hangman
> - Word Zone
> - Discard Zone

I knew that I needed to build a home page so that the exit functionality worked, and it would allow for the possibility of allowing 2 people to play the game. As I thought it more important to get the game working first, I left this out for now.

I felt that a sensible place to start was to create my logic for how the game will know when the player has made a correct guess or an incorrect guess once the word for the round has been generated.

The player must pick a letter, so I created an event listener so that when the player clicks a letter, the code iterates through the word to check for a match(es), then moves the letter to the correct position (positions) or moves it to the discard pile. To do this, the code:

> - First gets the class of the letter that the player clicks - e.g. (a)
> - Iterates through the word to check where there is a match.
> - If match - populate the correct letter div in the 'word zone' with the letter
> - If no match - populate the next empty letter div in the 'discard zone' with the letter.
> - Then, hide the letter div in the 'choose letter' zone.

### My first function:

```javascript 
let sixLetterWord = randomSix().toUpperCase();
console.log(sixLetterWord);

$('.choice').click(function() {

    let letter = $(this).text();

    for (i = 0; i < sixLetterWord.length; i++) {
        if(sixLetterWord[i] == letter) {
            $(`.word-${i+1}`).text(letter);
            $(this).text("");
        }
    }

    console.log("success");
    console.log(letter);

    if ($(this).text() == "") {
    }   else {
            $('.discarded-letters div').each(function() {
                if($(this).text() == "") {
                $($(this)).text(letter);
                return false;
                } 
            })
        }
}); 
```
### Building the Hangman
> First I tried building the individual components of the hangman using CSS which I found to be difficult. I then decided to read up on using JS functions working with an HTML Canvas, which so far has been difficult! I have managed to successfully create one line but the x, y coordinates did not seem to be doing what I wanted them to do. but I got there in the end!

> I wanted to avoid repetition of some of the statements so I tried to build a function to make the code more DRY that could create each line / head of my hangman by taking in x,y coordinates.

``` javascript     
    function draw(mtX,mtY, ltX, ltY ) {
    canvas = document.querySelector('#hangman-drawing');
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(mtX, mtY);
    ctx.lineTo(ltX, ltY);
    ctx.stroke();
    }

let gallowsPole = () => {draw(0,600,0,40)}
let gallowsTop = () => {draw(0,40,400,40)}
let gallowsBottom = () => {draw(0,600,200,600)}
let gallowsSupport = () => {draw(0,120,80,40)}
let rope = () => {draw(400,100,400,40)}
let neck = () => {draw(400,200,400,240)}
let leftArm = () => {draw(400,240,300,200)}
let rightArm = () => {draw(draw(400,240,500,200))}
let body = () => {draw(400,350,400,240)}
let leftLeg = () => {draw(400,350,300,450)}
let rightLeg = () => {draw(400,350,500,450)}
```


``` javascript 
    function head() {
    canvas = document.querySelector('#hangman-drawing');
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(400,150,50,0,Math.PI*2,true);
    ctx.stroke();
}
```

### Adding lines when an incorrect guess was made

> In order to build my hangman sequentially as each incorrect guess was made, I created an array of each function so that it could be iterated through and called appropriately.

``` javascript 
const hangman = [gallowsBottom,gallowsPole,gallowsTop, gallowsSupport, rope,head,neck,body,leftArm, rightArm,leftLeg, rightLeg];
```

> Next I created an index that would increase by 1 for every incorrect guess, and would be used to draw the line at that index whenever an incorrect guess was made:

``` javascript
let sixLetterWord = randomSix().toUpperCase();
let incorrectGuesses = -1; // <---------- index var

console.log(sixLetterWord);

$('.choice').click(function() {

    let letter = $(this).text();

    for (i = 0; i < sixLetterWord.length; i++) {

        if(sixLetterWord[i] == letter) {
            $(`.word-${i+1}`).text(letter);
            $(this).text("");
        }
    }  else {
            incorrectGuesses +=1;  // <---------- index + 1
            hangman[incorrectGuesses](); // <---------- part of hangman to draw
            return false;
        } 
    });     
```
### Decreasing the player's lives for the round

> Next I decided to make the lives decrease with every incorrect guess. First I created the array, and then displayed it without the commas to the user.

``` javascript
let lives = ['❤️','❤️','❤️','❤️','❤️','❤️','❤️','❤️','❤️','❤️','❤️'];
$('.display-lives').text(lives.join(''));
```

> Next I uncluded a function to remove a life for each incorrect guess made.

``` js
lives.pop();
$('.display-lives').text(lives.join(''));
```

### Ending the round once the player has won or lost
> First I needed to include a function that checked if the word had been guessed with each letter choice. I set the player and computer score variables to 0 at the start of the game. Then ran the following function each time a guess was made.

``` js
let playerScore = 0;
let computerScore = 0;

    if (lettersGuessed == sixLetterWord.length) {
        playerScore += 1;
        $('.playerScore').text(playerScore);
    } else if (lives.length == 0) {
        computerScore += 1;
        $('.computerScore').text(computerScore);
    } else {}
```    
> I was encountering problems with this code running before the last letter was placed in the word zone, so I decided to come back to this later.

### Changing elements of the game
> I realised that there was no need for the 'discard zone' given that it would be obvious once a letter had been chosen incorrectly, as the tile could be highlighted in red, for example, in the 'choose letter zone'. I decided first to remove the relevant HTML, CSS and JS, and then restructure my game so that I was happy with all of the components and the layout. I got slightly carried away with some of the styling of the game, as it was a nice break from writing the logic - haha! I had to update my canvas JS draw coordinates too. It was very difficult to get the horizontal and vertical lines to appear to be the same width, so I had to create two draw functions, one that drew thicker lines. Code below:

``` js
 function draw(mtX,mtY, ltX, ltY ) {
    canvas = document.querySelector('#hangman-drawing');
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#36414b';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(mtX, mtY);
    ctx.lineTo(ltX, ltY);
    ctx.stroke();
}

function drawThick(mtX,mtY, ltX, ltY ) {
    canvas = document.querySelector('#hangman-drawing');
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#36414b';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(mtX, mtY);
    ctx.lineTo(ltX, ltY);
    ctx.stroke();
    
}
```
>This was the look of my game once I finished:
<img src="images\hangman.png">

### Showing incorrect letter guesses in the 'choose letter zone':
> Now that I no longer have the 'discard zone' I needed to create a way for the user to know that the letters they chose were incorrect. I added this into my code in the case of an incorrect guess being made:
``` js
$('.letters > .letter').click(function() { 

    let letter = $(this).text();
    for (i = 0; i < sixLetterWord.length; i++) {

        if(sixLetterWord[i] == letter) {
            $(`.word-${i+1}`).text(letter);
            console.log($(`.word-${i+1}`).text());
            $(this).text("");
            lettersGuessed += 1;
        }
    }
    if ($(this).text() == "") {
    }   else {
                incorrectGuesses +=1;
                hangman[incorrectGuesses]();
                lives.pop();
                $('.display-lives').text(lives.join(''));
                $(this).css({backgroundColor: "rgb(167, 95, 95)"});
                return false;
                }
             
});
```
### What happens when the round ends?

> Next I determined what I wanted to happen when the round ends:
#### **Guessing the word correctly:**
> 1. word highlights in green.
> 2. A box pops up telling the player they won, and asks them to click button to continue to next round
> 3. Game info updates to reflect the new round with animation, game resets
#### **Guessing the word incorrectly:**
> 1. word highlights in red.
> 2. A box pops up telling the player they lost, reveals the correct word, and asks them to click button to continue to next round.
> 3. Game info updates to reflect the new round with animation, game resets

*I went into more detail in my user stories which I have put in the sheet linked at the top of the readme.*


#### **Fixing my function to test the status of the game**
> First I created a new function which would run just after the first for loop of my game, ensuring that the last correctly guessed letter would be placed in the word zone, and would also end the game if the player had no lives left, then reset the round:

``` js
function checkRoundStatus() {
  
    if (lettersGuessed == sixLetterWord.length) {
        $('.word > .letter').css({backgroundColor: "green"});
        setTimeout(fadeWord,2000);
        playerScore += 1;
        $('.playerScore').text(playerScore);
        setTimeout(function() {newRound();},3000);


    } else if (lives.length == 0) {
        $('.word > .letter').css({backgroundColor: "rgb(154, 78, 78)"});
        setTimeout(fadeWord,2000);
        computerScore += 1;
        $('.computerScore').text(computerScore);
        setTimeout(function() {newRound();},3000);
        return false
    } else return false
            
    }
 ```
 > This set the background of the letter tiles in the word to either red or green when the round ended depending on the result. I used a setTimeout function to fade the letters out of the word zone, update the score, and then move on to a new round. See function below:
 ``` js
 function fadeWord() {
    $('.word > .letter').each(function() {
        $(this).text("");   
     })
    $('.letter').each(function() {
        $(this).css({backgroundColor: "#adb6be"})
    }) 
    }
```    
 > The newRound() function increases the round number by 1, increases the difficulty level and restores the number of lives the player had. I increased the difficulty level by creating an array that would be iterated through on the start of each round:
 ``` js
 const roundLevel = ['beginner','easy','average', 'challenging', 'difficult', 'fiendish'];
```
>Function below:
``` js
function newRound() {
    round +=1;
    $('.round').text(round);
    difficulty += 1;
    $('.difficulty').text(roundLevel[difficulty]);
    lives = [' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ '];
    $('.display-lives').text(lives.join(''));
}
```
> In order to reset all of the letters in the choose zone, I needed to create a ’ for each’ loop that reset each letter, which also required me to add id's to each of my letters. I also needed to create a new word to guess, and reset the 'incorrectGuesses' and 'lettersGuessed variables back so I went ahead and did this.

``` js
function newRound() {
    round +=1;
    $('.round').text(round);
    difficulty += 1;
    $('.difficulty').text(roundLevel[difficulty]);
    lives = [' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ '];
    $('.display-lives').text(lives.join(''));
    sixLetterWord = randomSix().toUpperCase();
    incorrectGuesses = -1;
    lettersGuessed = 0;
    $('.letters > .letter').each(function() {
        let thisID = $(this).attr('id');
        $(this).text(thisID);
    })
    console.log(sixLetterWord);
}
```
### Removing and adding a class to the letters in the choose zone to allow users to select a letter when the game is in progress.
> First I had to add a class into the letters, I named this 'choose'.

> Then I updated my event listener to refer to this class of the letters.

> Then I removed the class once the round had stopped in the checkRoundStatus() function, and added it back in in the newRound() function.

### Reset Canvas function
> I added a function to clear the canvas whenever a round ends:

``` js
function resetCanvas() {
var canvas = document.getElementById("hangman-drawing");
var context = canvas.getContext('2d');
context.clearRect(0, 0, 300, 300);
}
```

*I realised that whenever a letter was chosen, my code allowed for the individual to choose the letter again, so I had to remove the 'choose' class whenever a letter was chosen.*

``` js
$('.letters').on('click', '.choose' ,function() { 

    let letter = $(this).text();
    $(this).removeClass("choose"); //<--------- here
    for (i = 0; i < sixLetterWord.length; i++) {

        if(sixLetterWord[i] == letter) {
            $(`.word-${i+1}`).text(letter);
            console.log($(`.word-${i+1}`).text());
            $(this).text("");
            lettersGuessed += 1;
        }
    }
    if ($(this).text() == "" || lives.length == 0) {
        checkRoundStatus();
    }   else {
                incorrectGuesses +=1;
                hangman[incorrectGuesses]();
                lives.pop();
                $('.display-lives').text(lives.join(''));
                $(this).css({backgroundColor: "rgb(167, 95, 95)"});
                checkRoundStatus();
                return false;
                }      
});
```

### Pop Up:
> I now want to include a pop up that tells the user the status of the round, and gives them an option to click a button to continue. After that, I will then update the word arrays, so that each difficulty level has its own array of words to choose from, based on certain conditions. There are other conditions I needed to check for too, such as when the last round has been played, and then decide what happens when the game is over. I created two popups, one for when the user loses and one for when they win. Set z index to -1;

> When the round ended, I switched the z index to 1 for the respective popUps depending on the outcome of the game. created an event listener for the popup so when the user clicks continue, the popup disappears. added a ‘p’ tag with classes of 'wonText' and 'lostText' and updated these in the checkRoundStatus function. E.g.
``` js
 $('.wonText').text(`The word was ${sixLetterWord}`);
        $('.wonRound').css("z-index","1");
```
### Creating my final word arrays:
> I decided I wanted 7 rounds so there would never be a draw, and determined what the conditions the words chosen within each round must meet, so I created my list of words between 5 and 9 letters in a google sheet, used formulas to filter them for each round, used concatenation to push them into arrays and added them into my js file. Sheet linked <a href="https://docs.google.com/spreadsheets/d/1jpsbb1sNimso9Y1-Ci903mLQZCGnRS81w8l61reBdIY/edit?usp=sharing">here</a> to show logic.

> - Round1 = 5 letter words - no repeating letters
> -  Round2 = 6 letter words - no repeating letters
> -  Round3 = 7 letter words - repeating letters
> -  Round4 = 7 letter words - no repeating letters
> -  Round5 = 8 letter words - repeating letters
> -  Round6 = 8 letter words - no repeating letters
> -  Round7 = 9 letter words - repeating letters


> I updated the functions to generate the random words, and put them in an array.

``` js
let firstWord = () => {return round1[Math.floor(Math.random() * round1.length)]};
let secondWord = () => {return round2[Math.floor(Math.random() * round2.length)]};
let thirdWord = () => {return round3[Math.floor(Math.random() * round3.length)]};
let fourthWord = () => {return round4[Math.floor(Math.random() * round4.length)]};
let fifthWord = () => {return round5[Math.floor(Math.random() * round5.length)]};
let sixthWord = () => {return round6[Math.floor(Math.random() * round6.length)]};
let seventhWord = () => {return round7[Math.floor(Math.random() * round7.length)]};

const gameWords = [firstWord,secondWord,thirdWord,fourthWord,fifthWord,sixthWord,seventhWord];    
```

> I then set the word for the game to the first item in the array and increased the index every time a round was completed.

> Now, I had to set the length of the number of tiles that appeared in the wordZone for each round. I created a new function to be run every time the round ended:
``` js
function createTiles() {
    $('.word').html('');

    for (i = 1; i < word.length + 1; i++) {
        newDiv =  `<div class="letter word-${i}"></div>`;
      $('.word').append(newDiv);
      console.log("i");
    }
  }
  ```

### I then finalised my user stories:
 <a href="https://docs.google.com/spreadsheets/d/1jpsbb1sNimso9Y1-Ci903mLQZCGnRS81w8l61reBdIY/edit?usp=sharing">Linked here</a>

### Checking if the game has ended:

  > First I created a gameOver popup and gave it a z-index of -1.

  > Next I created a function that would display the popup with the correct info in once a game had ended:

  ``` js
  function gameOver() {
        $('.info-value').text('');
        $('.gameOver').css("z-index","1");
        if(playerScore > computerScore) {
            $('.results').text(`Congratulations! You beat the computer by ${playerScore - computerScore} points.`);
        } else {
            $('.results').text(`Better luck next time! The computer won by ${computerScore - playerScore} points.`);
        }
    } 
```
> In the newRound() function, I added the gameOver function in an if statement (might go back and refractor later as this could maybe be a bit hacky):

``` js
function newRound() {
    resetCanvas();
    round +=1;

    if(round == 8) {
    gameOver(); // <---------added here
    } else {
        $('.round').text(round);
        difficulty += 1;
        $('.difficulty').text(roundLevel[difficulty]);
        lives = [' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ ',' ♥ '];
        $('.display-lives').text(lives.join(''));
        incorrectGuesses = -1;
        lettersGuessed = 0;
        $('.letters > .letter').each(function() {
            let thisID = $(this).attr('id');
            $(this).text(thisID);
            $(this).addClass("choose");
        });
        wordIndex += 1;
        word = gameWords[wordIndex]().toUpperCase();
        console.log(word);
        createTiles();
    }
}
```

### Creating a landing page + linking to exit buttons

> First I created a second HTML and CSS file and added some basic elements with some styling from my original CSS file.

> Next I added a link to the original HTML file in the 'Play Game' button

> I then added links to the exit buttons to return to the homepage which currently looks like:

<img src="images\hangmanHomePage.PNG">

### Created animation for new round values
``` js
function animation() {
    let box2 = $('.info-value');

    for ( i = 30; i >= 20; i-=5) {
        box2.animate({height: `${i}px`},400);
        box2.animate({height: "20px"},400);
    } 
}
```
### Updated round popup info 

> I updated the popup to tell the user how many guesses it took for them to guess the word correctly by creating a new 'guess' variable, and adding 1 with every click. I also updated the CSS so it was centred correctly.

### Local storage

> Next I worked on logging the game number, player score and computer score at the end of the game in local storage. I tested it by getting the items and checking that they were pulling correctly into my document. I added this as a nested function within my gameOver() function, so that it would run whenever the game ended

>I then created a separate js file to link to the homepage, to avoid the main js file running when on home, as well as updating my scripts to include 'defer'.

### Scoreboard on my homepage

> I spent a while trying to work out how to transform the resulting strings into arrays, created functions in this separate js file to do so by grabbing data from localStorage and transforming it. As the data were in three string formats, I worked on transforming them into arrays so that I could display them correctly in my homepage.

> I then used a grid layout to create my scoreboard which holds up to 10 scores in highest score order (want to also sort by date second, will see if I can do that).

### Bug checking
> I checked for bugs by playing the game, and noticed that my checkRoundStatus() function needed rearranging, so that the game info did not update and a new word would not be generated until the player pressed continue.

### Displaying datetime played in Scoreboard rather than game number

> I struggled with this initially, but was able to replace game number with the datetime and added this new code into my functions where applicable. As the dates were in string format, I had to create a logic to be able to split the strings where I wanted them to be split, and then create an array of objects for my datetimes, player scores and computer scores to be able to iterate through them and display the correct info side by side in the scoreboard. I also created a function to sort the data by highest player score. I was struggling to parse the datetimes back into valid dates, and so was unable to sort the highest scores by most recent datetime.

### Tidying up my code

> I tidied up my code so that it was well structured and removed any code that was no longer needed.

### Responsive CSS

> I then worked on using media queries to ensure that my game was responsive and could be played on a smaller screen.

> After I changed my css to make it more dynamic as well as responsive, I had to go back and refractor some of my code. For example, the animate round values function:

``` js

function animation() {
    let values = $('.info-value');

    for ( i = 80; i >= 50; i-=15) {
        values.animate({height: `${i}%`},200);
        values.animate({height: "50%"},200);
    };
}
```

## Challengers

### Working through building the game in a logical order
> I found it tempting to flit between steps; building my game before completing my user stories, working on the look of the game before completing all of the logic.

### Working with local storage
> I found the concepts around storing and retrieving data from the local storage difficult at first, but was able to navigate this with support from my instructor. I also struggled to display the data in the homepage, but created functions that transformed the data and stored each instance of datetime, computer score & player score into an array of objects, which I then sorted via another function.

### Drawing the hangman
> Initially I tried creating each part of the hangman as a separate html element, but struggled to get the items to fit together nicely on the page in a responsive way. I then decided to use JS to create functions that drew lines on an HTML5 canvas.

## Wins

> - Logging high scores from the local storage!
> - Improved my knowledge of Javascript & Jquery, and felt very comfortable writing functions, using forEach loops and creating animations.
> - I felt a lot more comfortable positioning elements with CSS, although there is definitely room to improve.

## Key Learnings / Takeaways

### Working through the ideation and build logically saves time
> Really cementing exactly how I want the game to look and function, along with generating user stories  initially will make the build process a lot smoother.

### Comment as you go and analyse
> Commenting through your code as you go and analysing what you have written will help you understand where you have made mistakes / done something illogically. Similarly, it will help you streamline your code as you go. When I began writing up my presentation, I spotted some issues with my code that needed fixing.

## Bugs
> The datetime logs approx 1 min before the game ends, and the function is run to store and access the datetime.

## Future Improvements

> - Making the game 2 player
> - Saving game data in local server in case of accidentally closing down the page.
> - Sorting the scores by datetime as well as highest scores
> - Fix up the CSS!
> - Providing a clue for the user
> - Word categories
> - Improve the animations and interactivity - such as adding a mouseover/mouseleave event > > - listener
