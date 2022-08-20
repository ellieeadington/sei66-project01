# project1-hangman

## Day 01

### Getting Started

> Once deciding what game I was going to build, I created a GitHub repository, a folder for my game within my sei/projects/ directory, which included an html file, and a css and js folder including relevant files.

### Ideation Stage

> I began to brainstorm what the key features of my game would be, the basic logic behind them, and any additional routes I would like to consider to optimise my game once my MVP had been created. I began adding my ideas into this <a href="https://www.figma.com/file/n33FCJ6FcWIYjeCRN3ccB6/Project-1-Ideation---Hangman?node-id=0%3A1"> figma document</a>.

#### **Key Features:**

* Solo player game - my MVP will be a player vs computer game, where the computer generates the word, and the player makes guesses. *Once my game has been completed, I would like to provide an option to play against another person*.

* 6 rounds per game. Each with varying levels of difficulty. This would mean that that as the game progressed, words to guess would get longer, and not include repetition of letters, for example.

* 600 words to guess - this would mean creating 6 arrays of words that will be randomly selected from for each round.

#### **First basic wireframe for the game:**

<img src="images\firstwireframe.PNG">

### Creating my word arrays:
> Next I decided to start by building 4 arrays of words, and a function to randomly generate a word from each array. I didn't know exactly what conditions I wanted the words to meet for each round, so I build 4 arrays of five, six, seven and eight letter words. This would be more than enough to get me started, I can come back and finetune later. *I also did not check if the words are UK or US English, but I have housed them in a spreadsheet so I will come back to this.*

Random word generator functions:

```javascript let randomFive = () => {return fiveLetters[Math.floor(Math.random() * fiveLetters.length)]}
let randomSix = () => {return sixLetters[Math.floor(Math.random() * sixLetters.length)]}
let randomSeven = () => {return sevenLetters[Math.floor(Math.random() * sevenLetters.length)]}
let randomEight = () => {return eightLetters[Math.floor(Math.random() * eightLetters.length)]}
```
### HTML & CSS Wireframe
> I then started on my wireframe in VS Code.

## Day 02

### The wireframe
> After messing around with my wireframe and brainstorming, I decided that I wanted my game to display differently. I wanted my game to include 5 main sections:
* Game Info
* Choose Letters Zone
* Hangman
* Word Zone
* Discard Zone
#### **HTML & CSS Wireframe:**
<img src="images\SEI-66 Project 1 Wireframe.PNG">

> I knew that I needed to be build a home page so that the **exit** functionality worked, and it would allow for the possibility of allowing 2 people to play the game. As I thought it more important to get the game working first, I left this out for now.

### Starting to add some game functionality to my wireframe:
> I felt that a sensible place to start was to create my logic for how the game will know when the player has made a correct guess or an incorrect guess once the word for the round has been generated.

>The player must pick a letter, so I created an event listener so that when the player clicks a letter, the code iterates through the word to check for a match(es), then moves the letter to the correct position (positions) or moves it to the discard pile. To do this, the code:
* gets the class of the letter that the player clicks - e.g. (a)
* iterates through the word to check where there is a match.
* If match - populate the correct letter div in the 'word zone' with the letter
* If no match - populate the next empty letter div in the 'discard zone' with the letter.
* Then, hide the letter div in the 'choose letter' zone.

My first function:

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
> I aim to make this look fancier with animation, but for now, this will do.

### Building the Hangman
> First I tried building the individual components of the hangman using css which I found to be difficult. I then decided to read up on using JS functions working with an HTML Canvas, which so far has been difficult! I have managed to successfully create one line but the x, y coordinates did not seem to be doing what I wanted them to do. but I got there in the end!

> I wanted to avoid repetition of some of the statements so I tried to build a function to make the code more DRY that could create each line / head of my hangman by taking in x,y coordinates.

> In order to make the size of my hangman dynamic, I will replace the coordinates with width/2 height/4 etc once I am happy with my sizing.

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

> Drawing the head needed it's own function which you can find below.

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
    }

    if ($(this).text() == "") {
    }   else {
            $('.discarded-letters div').each(function() {

                if($(this).text() == "") {
                $($(this)).text(letter);
                incorrectGuesses +=1;  // <---------- index + 1
                hangman[incorrectGuesses](); // <---------- part of hangman to draw
                return false;
                } 
            });
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
```

```js
    if (lettersGuessed == sixLetterWord.length) {
        playerScore += 1;
        $('.playerScore').text(playerScore);
    } else if (lives.length == 0) {
        computerScore += 1;
        $('.computerScore').text(computerScore);
    } else {}
```    
