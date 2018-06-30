//Define Global Variables
var guessedLetters = [];
var triesRemaining = 10;
var wins = 0;
var losses = 0;

//Function to generate a random number based on array length
function Random(){
    var length = words.length;
    var rand = (Math.floor(Math.random() * length));
    return rand;
};

//Define the array
var words = [
    "The Breakfast Club", 
    "Ferris Beuller's Day Off", 
    "Top Gun", 
    "Dirty Dancing", 
    "Better Off Dead", 
    "E.T. the Extra Terrestrial", 
    "The Goonies", 
    "Ghostbusters", 
    "Back To The Future", 
    "Sixteen Candles", 
    "Stand By Me", 
    "Raiders Of The Lost Ark", 
    "Gremlins", 
    "The Karate Kid", 
    "The Princess Bride", 
    "Die Hard", 
    "The Terminator", 
    "Beetlejuice", 
    "Footloose", 
    "Demo Man", 
    "Pretty In Pink", 
    "Weird Science", 
    "The Empire Strikes Back", 
    "Who Framed Roger Rabbit", 
    "The Lost Boys", 
    "Blade Runner", 
    "Return Of The Jedi", 
    "Beverly Hills Cop", 
    "Caddyshack", 
    "The Shining", 
    "A Nightmare On Elm Street", 
    "Bill & Ted's Excellent Adventure", 
    "Aliens", 
    "Airplane", 
    "The Thing", 
    "Spaceballs", 
    "Full Metal Jacket", 
    "Risky Business", 
    "Big", 
    "Weekend at Bernie's", 
    ];

//Function generates a random number, and uses it to randomly
//pick a word out of the array, returns word.
function pickAword(){
    var index = Random();
    index.toString;
    var word = words[index];
    return word;
};

function blankizer(){
    //Calls the pickAword function and stores the returned word in a variable
    var word =  pickAword();

    //Converts the word to all lowercase, for comparison purposes
    word = word.toLowerCase();

    //Converts the string into an array of sub-strings, including spaces.
    wordArray = word.split("");

    //Clones wordArray into new blankArray
    blankArray = wordArray.slice();
    
    //Loops through blankArray and converts all letter characters to
    //underscores, while preserving any punctuation
    $.each(blankArray, function(index, value){
        if (value === " " || value === "'" || value === "&" || value === "."){

        }
        else{
            blankArray[index] = "_";
        };
    });
    
    //Creates a string from blankArray to be displayed in the browser
    displayArray = blankArray.join("");

    //Updates the browser with the new text
    $(".text-goes-here").text(displayArray);

};

//This function is passed the key from a onkeyup event
function guesser(key){
    //the key is stored in a letter variable which holds the string,
    //and another that holds the key code of the key pressed.
    var keyLetter = key.key;
    var keyCode = key.keyCode;

    //converts the key string to lowercase incase of capslock or shift
    keyLetter = keyLetter.toLowerCase();

    //defines an index that will hold the indexes of correctly guessed letters
    indexOfCorrectLetter = [];

    //Runs if the key pressed is between a-z only, so it does not waste time with control, backspace, numbers etc.
    if ((65 <= keyCode) && (keyCode <= 90)) {
        
        //Loops through wordArray, and compares the values at each index
        //to the key pressed. If it matches, the index number is added
        //to the indexOfCorrectLetter array for future use.
        $.each(wordArray, function(index, value){
            if (keyLetter === value){
                indexOfCorrectLetter.push(index);
            };
        });
        
        //If indexOfCorrectLetter is empty at the end of the previous loop
        //it means that the letter pressed did not match any letters in the
        //word, so it was incorrect, and deducts a try from the player,
        //Then updates the screen
        if (indexOfCorrectLetter.length === 0){
            triesRemaining--;
            $("#counter").text("Tries Remaining: " + triesRemaining);
            
            //Adds incorrect letters to the bank at the bottom.
            $.each(guessedLetters, function(index, value){
                if (value === keyLetter);
                });
    
            guessedLetters.push(keyLetter);
        };


        //Function taken from Stack Overflow that uses the .filter
        //method to remove duplicates from the guessed letters array.
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        };

        var guessedLettersUnique = guessedLetters.filter(onlyUnique);

        //Goes through the blank array and changes the corresponding
        //indexes to the guessed letter, if correct.
        $.each(indexOfCorrectLetter, function(index, value){
            blankArray[value] = keyLetter;
        });

        //Updates the array with the correctly guessed letters displayed
        displayArray = blankArray.join("");

        //Updates the html elements on screen
        $(".guessed-letters").text(guessedLettersUnique);
        $(".text-goes-here").text(displayArray);
        
        //If the user runs out of tries, it is alerted, losses is incremented by 1, and the reset function is called.
        if (triesRemaining <= 0){
        alert("You have lost!");
        losses++;
        reset();    
        };

        //Checks if the blank array has any blanks left, if not (all letters have been correctly guessed), the the user wins, wins is incremented, and reset is called.
        if (!(blankArray.includes("_"))){
            alert("You have won!");
            wins++;
            reset();
        };
    };    
};

//Resets the game and updates html elements, while keeping the number of wins and losses.
function reset(){
    blankizer();
    guessedLetters = [];
    triesRemaining = 10;
    $(".guessed-letters").text(guessedLetters);
    $("#counter").text("Tries Remaining: " + triesRemaining);
    $(".wins").text("Wins: " + wins);
    $(".losses").text("Losses: " + losses);
};