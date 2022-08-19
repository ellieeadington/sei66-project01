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
> First I tried building the individual components of the hangman using css which I found to be difficult. I then decided to read up on using JS functions working with an HTML Canvas, which so far has been difficult! I have managed to successfully create one line but the x, y coordinates did not seem to be doing what I wanted them to do. For example, it didn't matter whether I put the coordiantes in LineTo() or MoveTo(), it was doing the exact same thing.

> I also wanted to avoid repetition of some of the declarations so I tried to build a function to make the code more DRY, and although the functions run, the line does not show in the canvas. I decided to move on.