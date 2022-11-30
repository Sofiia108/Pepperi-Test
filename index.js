let input = document.getElementById('input');
let output = document.getElementById('output');

let add = document.getElementById('add');
let remove = document.getElementById('remove');

let sortByNameButton = document.getElementById('sortByName');
let sortByValueButton = document.getElementById('sortByValue');

let xml = document.getElementById('xml')
let showXMLButton = document.getElementById('showXML');

let nameValuePairs = [];
let prevState = [];


const iteration = (arr) => {
    return `${arr.reduce((result, el) => {
        return result + `
        <div>
        ${el.name}=${el.value}
        </div>
        `
    }, `<div id='container'>`)} </div>`
}

const filterAlphaNumeric = (str) => {

    const required = Array.from('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
    const arrStr = Array.from(str)
  
    let result = ''
    for (let i = 0; i < arrStr.length; i++) {
  
      let char = arrStr[i]
      let index = required.indexOf(char)
      if (index > -1) {
        result += required[index]
      }
    }
    return result
}

const state = {
    isXMLOpen: false,
};

const toXML = () => {

    if(nameValuePairs.length >= 0) {
        let container = document.getElementById('container'); 
        xml.textContent = container.innerHTML;
    }
}

const showXML = (event) => {
   
    state.isXMLOpen = !state.isXMLOpen;
    toXML()
    xml.style.display === "block" ? xml.style.display = "none" : xml.style.display = "block";
}


const addPair = (event) => {

    event.preventDefault();

    let inputValue = input.value;
    let indexOfEquality = inputValue.indexOf('=');
    
    
    if(!inputValue.includes('=')) {
        alert('The name/value entry format must be: Name=Value')
        return
    } 
    
    let inputName = inputValue.slice(0, indexOfEquality);
    let inputVal = inputValue.slice(indexOfEquality + 1,);

    const name = filterAlphaNumeric(inputName);
    const value = filterAlphaNumeric(inputVal);

    let pair = {
        name,
        value,
    }

    if (nameValuePairs.length !== 0) prevState = JSON.parse(JSON.stringify(nameValuePairs));
    nameValuePairs.push(pair);

    
    output.innerHTML = iteration(nameValuePairs);
    if(state.isXMLOpen) toXML()
}



const deletePair = (event) => {
 
    event.preventDefault();
    
    if (nameValuePairs.length > 0) {
       
        nameValuePairs.pop();
        output.innerHTML = iteration(nameValuePairs);
        
    }
    if(state.isXMLOpen) toXML()

    
}

Array.prototype.sortBy = function(p) {
    return this.slice(0).sort(function(a,b) {
      return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
}


const sortByName = (event) => {

    event.preventDefault();
    let sorted = nameValuePairs.sortBy('name')
    output.innerHTML = iteration(sorted)
    
    if(state.isXMLOpen) toXML()
}

const sortByValue = (event) => {

    event.preventDefault();
    
    let sorted = nameValuePairs.sortBy('value')
    output.innerHTML = iteration(sorted)
    if(state.isXMLOpen) toXML()
}

add.addEventListener('click', addPair);
remove.addEventListener('click', deletePair);
sortByNameButton.addEventListener('click', sortByName);
sortByValueButton.addEventListener('click', sortByValue);
showXMLButton.addEventListener('click', showXML);