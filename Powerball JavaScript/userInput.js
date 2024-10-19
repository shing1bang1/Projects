
/*
Function that gets input from the user, it returns an array that contains 5 numbers from 1 to 69,
one powerball number and how many times the user wants to play.
*/

function userInput(){   


    //asking the user to enter 5 numbers from 1 to 69 that will participate in the lottery 
    console.log("You need to enter five different numbers from 1 to 69.\n\n");
    
    //importing the prompt-sync module, which allows to take user input from the console and assigning it to a variable
    const prompt = require('prompt-sync')({sigint: true});    



    //loop to get 5 numbers from the user
    while (true) {

        let input = prompt("Enter your five numbers, separated by spaces: "); 
        var numbers = input.split(" "); 
    
        //checking how many numbers were entered
        if (numbers.length !== 5) {
            console.log("Please enter five numbers, separated by spaces.\n");
            continue;
        }

        //checking if the user entered int numbers from 1 to 69
        try {
            for (let i = 0; i < 5; i++) {
                if (numbers[i].length <= 2){
                    numbers[i] = parseInt(numbers[i], 10);
                    if (isNaN(numbers[i])) {
                        throw new Error();
                    } else {
                        if (numbers[i]>69){
                            throw new Error();
                        } else if (numbers[i]<1){
                            throw new Error();
                        }
                    }
                } else {
                    throw new Error();
                }
            }
        } catch (err) {
            console.log('Please enter valid numbers from 1 to 69.\n');
            continue;
        }

        //checking if all the numbers are unique
        let unique = new Set(numbers);
        if (unique.size !== 5) {
            console.log('Please enter 5 DIFFERENT numbers.\n');
            continue;
        }

        break;

    }





    //loop to get the powerball number
    while (true) {
        var powerball = prompt("Enter your powerball number from 1 to 26: "); 

        //checking if the user entered int number from 1 to 26
        try {
            if (powerball.length <= 2){
                powerball = parseInt(powerball, 10);
                if (isNaN(powerball)) {
                    throw new Error();
                } else {
                    if (powerball>26){
                        throw new Error();
                    } else if (powerball<1){
                        throw new Error();
                    }
                }
            } else {
                throw new Error();
            }
        } catch (err) {
            console.log('Please enter one valid number from 1 to 26.\n');
            continue;
        }
        break;

    }




    //loop to get how many times the user wants to play
    while (true) {
        var playcount = prompt("Enter how many times do you want to play (MAX: 1000): "); 

        //checking if the user entered int number from 1 to 1000
        try {
            if (playcount.includes('.')==false){
                playcount = parseInt(playcount, 10);
                if (isNaN(playcount)) {
                    throw new Error();
                } else {
                    if (playcount>1000){
                        throw new Error();
                    } else if (playcount<1){
                        throw new Error();
                    }
                }
            } else {
                throw new Error();
            }
        } catch (err) {
            console.log('Please enter one valid number from 1 to 1000.\n');
            continue;
        }
        break;

    }
    return Array(numbers, powerball, playcount)  
}

//exporting the module
module.exports = userInput;