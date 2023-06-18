// for revision see JS[Series of Mini Projects] - 1   --->  Mini Projects - Class 1   ---> 02:37:20 onwards
// used to fetch the custom atribute from thml file

const inputSlider = document.querySelector("[data-lengthSlider]");   // [ ] --> syntax used to fetch data which has the specified custom attribute

// fetch password length selector
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");    // # ---> syntax used to fetch data which has the specified id
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");  // . ---> syntax used to fetch data which has the specified class
const allCheckBox = document.querySelectorAll("input[type=checkbox]");  // used to fetch which all are of the type checkbox in html file
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


//initially
// set all default values for all if not changed by the user
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
//ste strength circle color to grey
setIndicator("#ccc");


//set passwordLength according to the slider changes  -- it updates sliderValue & lengthDisplay
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max-min)) + "%100";
}


//set indicator
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}


// random integer
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
    /*
    1- Math.random will generate a random number b/w 0 - 1, is 0.5
    2- miltiply Math.random with [max-min], and suppose min=1 & max=9
    3- Math.random * [max-min] = 0.5 * 8 = 4
    4- Will get the answer of Math.random*[max-min] always in the range of (0, [max-min]), ie 4 is in range of (0, [9,1])
    5- Math.floor is used to foundOff any decimal values
    6- min is added at the last because the range was from (0, [max-min]) but if we need to make 0 as ans we need to add min to the ans then the range will become [min,max]
       0 -> (max-min)
       0 + min -> max - min + min
       min -> max
    */
}


//generate number
function generateRandomNumber() {
    return getRndInteger(0,9);
}


//generate lowercase - using ASCII values
function generateLowerCase() {  
       return String.fromCharCode(getRndInteger(97,123))
}


//generate uppercase - using ASCII values
function generateUpperCase() {  
    return String.fromCharCode(getRndInteger(65,91))
}


// generate symbols - using string lenght we'll generate a randomNumber & print the symbol at that index
function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}





// calculate Strength - decide color of pwd strength on how many checkboxes are checked & pwdlength
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}






// display & copy password
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);   //used to copy password displayed, await is used sothat it should wait untill the password is copied
        copyMsg.innerText = "copied";                  // after copied
    }
    catch(e) {
        copyMsg.innerText = "Failed";                  //if the password is not coppied
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    //to make the password invisible after 2 sec
    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}





function shufflePassword(array) {
    //Fisher Yates Method - used to apply on array & shuffle the elements in that arrray
    /*
    1 - 
    */
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}



// used when below event listener calls it to handle any changes made in any of the check box's
function handleCheckBoxChange() {
    checkCount = 0;
    // using foreach loop check if any ckeck box is ckecked if yes then update the checkCount by 1 every time handleCheckBoxChange() is called
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    //special condition - if the passwordLength is less than checkCount then make passwordLength == checkcount & call handleSlider() to update the password length
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}


// event listner - applied on allCheckBox
// when any change is done in any check box it will call handleCheckBoxChange()
allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


// eventLength - applied on slider & number
// whenever any change is done in the slider then the changes should be made in passwordLength & handleSlider()- update sliderValue & lengthDisplay
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})


// eventlistner - applied on copy button
// copyContent is done only if there is some content present in the Password else the copy operation will not work
copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();                     // copy operation --> copyContent() is a funciton
})








// eventListner - applied on generate password button
generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkCount == 0) 
        return;

    //if pwdlength less than ckeckCount then make pwdLength == checkCount
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes

    //if the checkBox is ckecked then add that to the password
    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    //create a array to push the password
    //if that checBox is ckecked add that to the array
    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition - ie all the boxes that are checked they should compulsorily be in the array if not there then add then first
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition - after compulsory addition if space is remaining in the array then find the remaining space & add that many remaining randomly element by random
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");


    //shuffle the password - the elements are in order to checkBoxes shuffal them by calling shufflePassword(array)
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    
    
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    
    
    //calculate strength- used to update the strength color by calling calcStrength()
    calcStrength();
});