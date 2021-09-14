"use strict";

window.addEventListener("load",initialize);

let inpInput, txaResult; 
let slcLanguages;
let divFeedback;
let slcHead,slcDetail;
let slcInvites,slcParticipants;
let ckbSports;
let divSports;
let rdbSex;
let divShowSex;
let frmFill;

const detailContents = [["Krokus","Roos","Tulp"], ["Eik","Es","Populier"],["Aap", "Beer","Hond","Schaap"]];


function initialize() {
  //  DOM elementen ophalen
  inpInput = document.getElementById("input");
  txaResult = document.getElementById("result");
  slcLanguages = document.querySelector("#languages");
  slcHead = document.querySelector("#head");
  slcInvites = document.querySelector("#invites");
  slcParticipants = document.querySelector("#participants");
  slcDetail = document.querySelector("#detail");
  divFeedback = document.querySelector("#feedback");
  divSports = document.querySelector("#sports");
  divShowSex = document.querySelector("#show-sex");
  const btnAdd = document.querySelector("#add");
  const btnShowFirst = document.querySelector("#show-first");
  const btnShowSelected = document.querySelector("#show-selected");
  const btnShowQuantity = document.querySelector("#show-number-of");
  const btnBack = document.querySelector("#away");
  const btnAway = document.querySelector("#back");
  const btnShowSex = document.querySelector("#show-sex");
  ckbSports = document.querySelectorAll("input[type='checkbox']");
  rdbSex = document.getElementsByName("sex");
  frmFill = document.querySelector("#fill");
  // Eventlisteners toevoegen
  btnAdd.addEventListener("click", fillTextArea);
  btnShowFirst.addEventListener("click", showFirst);
  btnShowSelected.addEventListener("click", showSelected);
  btnShowQuantity.addEventListener("click", showNumberOfElements);
  btnBack.addEventListener("click",()=> pass(slcInvites, slcParticipants));
  btnAway.addEventListener("click", ()=> pass(slcParticipants, slcInvites));
  btnShowSex.addEventListener("click", showSex);
  slcHead.addEventListener("change", showDetailList);
  slcDetail.addEventListener("dblclick", removeElement);
  
  AddEventListenersToCheckboxes();
}

function check() {
  if(frmFill.lastname.value == "" || frmFill.firstname.value == "") {
    alert("Naam en voornaam invullen aub");
    return false;
  }
  return true;
}

function showSex() {
  let retourString = "Gekozen geslacht : ";
  for (let i=0; i<rdbSex.length; i++) {
    if (rdbSex[i].checked) {
      retourString += rdbSex[i].value;
      break;
    }
  }
  divShowSex.innerHTML = retourString;
}

function AddEventListenersToCheckboxes() {
  for (let i = 0 ; i<ckbSports.length; i++) {
    ckbSports[i].addEventListener("change", fillDivSports);
  }

}

function fillDivSports() {
  let retour = "Je verkoos de sporten : ";
  for (let i = 0 ; i<ckbSports.length; i++) {
    if (ckbSports[i].checked) {
      retour += ckbSports[i].value + " ";
    }    
  }
  divSports.innerHTML = retour;

}

function pass(from,to) {
  let fromLengte = from.length;

  // Geselecteerden toevoegen aan "naar"
  for(let i = 0; i<fromLengte; i++) {
    if(from[i].selected) {
      to[to.length] = new Option(from[i].text, from[i].value);
    }
  }

  // Geselecteerden in "van" verwijderen
  for (let i=(fromLengte-1); i>=0; i--) {
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
  for(let i=0; i< detailContents[selectedItem].length;i++) {
    slcDetail[slcDetail.length]= new Option(detailContents[selectedItem][i]);
  }
  // Eerste item selecteren uit de lijst
  slcDetail[0].selected = true;
}

function removeElement() {
  slcDetail[slcDetail.selectedIndex] = null;
}

function fillTextArea() {
    let input = inpInput.value;
    txaResult.value += input + "\n";
    inpInput.value = "";
}

function showFirst() {
  divFeedback.innerHTML="";
  let firstLanguage = slcLanguages.options[0];
  // OF slcLanguages[0]
  divFeedback.innerHTML = `Eerste taal = ${firstLanguage.text} met value ${firstLanguage.value}`;
}

function showSelected() {
  divFeedback.innerHTML="";
  const selectedLanguage = slcLanguages.options[slcLanguages.selectedIndex]; // OF slcLanguages[slcLanguages.selectedIndex]
  divFeedback.innerHTML = `Gekozen taal = ${selectedLanguage.text} met value ${selectedLanguage.value}`;
}

function showNumberOfElements() {
  divFeedback.innerHTML="";
  divFeedback.innerHTML = `Aantal elementen : ${slcLanguages.length} ` // OF slcLanguages.options.length ;
}
