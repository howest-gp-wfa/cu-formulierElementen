"use strict";

window.addEventListener("load", initialize);

let inpInput, txaResult; 
let slcLanguages;
let divFeedback;
let slcHead, slcDetail;
let slcInvites, slcParticipants;
let ckbSports;
let divSports;
let rdbSex;
let divShowSex;
let frmFill;

const DETAILS = [
  ["Krokus", "Roos", "Tulp"], 
  ["Eik", "Es", "Populier"],
  ["Aap", "Beer", "Hond", "Schaap"]
];


function initialize() {

  inpInput = document.getElementById("input");
  txaResult = document.getElementById("result");
  slcLanguages = document.querySelector("#languages");
  slcHead = document.querySelector("#head");
  slcInvites = document.querySelector("#invites");
  slcParticipants = document.querySelector("#participants");
  slcDetail = document.querySelector("#detail");
  divFeedback = document.querySelector("#feedback");
  divSports = document.querySelector("#sports");
  divShowSex = document.querySelector("#show-sex-result");
  ckbSports = document.querySelectorAll("input[type='checkbox']");
  rdbSex = document.getElementsByName("sex");
  frmFill = document.querySelector("#fill");

  
  const btnAdd = document.querySelector("#add");
  const btnShowFirst = document.querySelector("#show-first");
  const btnShowSelected = document.querySelector("#show-selected");
  const btnShowQuantity = document.querySelector("#show-number-of");
  const btnBack = document.querySelector("#away");
  const btnAway = document.querySelector("#back");
  const btnShowSex = document.querySelector("#show-sex");
  btnAdd.addEventListener("click", fillTextArea);
  btnShowFirst.addEventListener("click", showFirst);
  btnShowSelected.addEventListener("click", showSelected);
  btnShowQuantity.addEventListener("click", showNumberOfElements);
  btnBack.addEventListener("click",() => pass(slcInvites, slcParticipants));
  btnAway.addEventListener("click", () => pass(slcParticipants, slcInvites));
  btnShowSex.addEventListener("click", showSex);
  slcHead.addEventListener("change", showDetailList);
  slcDetail.addEventListener("dblclick", removeElement);
  
  AddEventListenersToCheckboxes();
}

function check() {
  if(frmFill.lastname.value === "" || frmFill.firstname.value === "") {
    alert("Naam en voornaam invullen aub");
    return false;
  }
  return true;
}

function showSex() {
  let message = "Gekozen geslacht: ";
  for (let i = 0; i < rdbSex.length; i++) {
    if (rdbSex[i].checked) {
      message += rdbSex[i].value;
      break;
    }
  }
  divShowSex.textContent = message;
}

function AddEventListenersToCheckboxes() {
  for (let i = 0 ; i < ckbSports.length; i++) {
    ckbSports[i].addEventListener("change", fillDivSports);
  }

}

function fillDivSports() {
  let message = "Je verkoos de sporten: ";
  for (let i = 0 ; i<ckbSports.length; i++) {
    if (ckbSports[i].checked) {
      message += ckbSports[i].value + " ";
    }    
  }
  divSports.textContent = message;

}

function pass(from, to) {
  const fromLength = from.length;

  // Geselecteerden toevoegen aan "naar"
  for(let i = 0; i < fromLength; i++) {
    if(from[i].selected) {
      to[to.length] = new Option(from[i].text, from[i].value);
    }
  }

  // Geselecteerden in "van" verwijderen
  for (let i = (fromLength - 1); i >= 0; i--) {
    if(from[i].selected) {
      from[i] = null;
    }
  }

}

function showDetailList() {
  const selectedItem = slcHead.selectedIndex;
  // Leegmaken van de detailLijst
  slcDetail.length = 0;
  // Opvullen van de detailLijst
  for(let i = 0; i < DETAILS[selectedItem].length; i++) {
    slcDetail[slcDetail.length]= new Option(DETAILS[selectedItem][i]);
  }
  // Eerste item selecteren uit de lijst
  slcDetail[0].selected = true;
}

function removeElement() {
  slcDetail[slcDetail.selectedIndex] = null;
}

function fillTextArea() {
    const input = inpInput.value;
    txaResult.value += input + "\n";
    inpInput.value = "";
}

function showFirst() {
  const firstLanguage = slcLanguages.options[0]; // OF slcLanguages[0]
  divFeedback.textContent = "";
  divFeedback.textContent = `Eerste taal = ${firstLanguage.text} met value ${firstLanguage.value}`;
}

function showSelected() {
  const selectedLanguage = slcLanguages.options[slcLanguages.selectedIndex]; // OF slcLanguages[slcLanguages.selectedIndex];
  divFeedback.textContent= "";
  divFeedback.textContent = `Gekozen taal = ${selectedLanguage.text} met value ${selectedLanguage.value}`;
}

function showNumberOfElements() {
  divFeedback.textContent= "";
  divFeedback.textContent = `Aantal elementen: ${slcLanguages.length} `; // OF slcLanguages.options.length;
}
