"use strict";

window.addEventListener('load',Initieer);

let txtIngave, txaResult; 
let slcTalen;
let divFeedback;
let slcHoofd,slcDetail;
let slcGenodigden,slcDeelnemers;
let cbxSporten;
let divSporten;
let rdbGeslacht;
let divToonGeslacht;
let frmInvul;

const detailInhoud = [['Krokus','Roos','Tulp'], ['Eik','Es','Populier'],['Aap', 'Beer','Hond','Schaap']];


function Initieer() {
  let btnToevoegen;
  let btnToonEerste,btnToonGeselecteerd,btnToonAantal;
  let btnHeen, btnTerug;
  let btnToonGeslacht;
  //  DOM elementen ophalen
  txtIngave = document.getElementById("ingave");
  txaResult = document.getElementById("result");
  slcTalen = document.querySelector('#talen');
  slcHoofd = document.querySelector('#hoofd');
  slcGenodigden = document.querySelector('#genodigden');
  slcDeelnemers = document.querySelector('#geelnemers');
  slcDetail = document.querySelector('#detail');
  divFeedback = document.querySelector('#feedback');
  divSporten = document.querySelector('#sporten');
  divToonGeslacht = document.querySelector('#toon-geslacht');
  btnToevoegen = document.querySelector("#toevoegen");
  btnToonEerste = document.querySelector('#toon-eerste');
  btnToonGeselecteerd = document.querySelector('#toon-geselecteerd');
  btnToonAantal = document.querySelector('#toon-aantal');
  btnHeen = document.querySelector('#heen');
  btnTerug = document.querySelector('#terug');
  btnToonGeslacht = document.querySelector('#toon-geslacht');
  cbxSporten = document.querySelectorAll('input[type="checkbox"]');
  rdbGeslacht = document.getElementsByName('geslacht');
  frmInvul = document.querySelector('#invul');
  // Eventlisteners toevoegen
  btnToevoegen.addEventListener('click', vulTextArea);
  btnToonEerste.addEventListener('click', toonEerste);
  btnToonGeselecteerd.addEventListener('click', toonGeselecteerd);
  btnToonAantal.addEventListener('click', toonAantal);
  btnHeen.addEventListener('click',()=> doorgeef(genodigden, deelnemers));
  btnTerug.addEventListener('click', ()=> doorgeef(deelnemers, genodigden));
  btnToonGeslacht.addEventListener('click', toonGeslacht);
  slcHoofd.addEventListener('change', toonDetaillijst);
  slcDetail.addEventListener('dblclick', verwijderElement);
  

  voegEventlistenersToeAanCheckboxen();
}

function controle() {
  if(frmInvul.naam.value == '' || frmInvul.voornaam.value == ''){
    alert('Naam en voornaam invullen aub');
    return false;
  }
  return true;

}

function toonGeslacht() {
  let retourString = "Gekozen geslacht : ";
  for (let i=0; i<rdbGeslacht.length; i++) {
    if (rdbGeslacht[i].checked) {
      retourString += rdbGeslacht[i].value;
      break;
    }
  }
  divToonGeslacht.innerHTML = retourString;
}

function voegEventlistenersToeAanCheckboxen() {
  for (let i = 0 ; i<cbxSporten.length; i++) {
    cbxSporten[i].addEventListener('change', vulDivSporten);
  }

}

function vulDivSporten() {
  let retour = 'Je verkoos de sporten : ';
  for (let i = 0 ; i<cbxSporten.length; i++) {
    if (cbxSporten[i].checked) {
      retour += cbxSporten[i].value + ' ';
    }    
  }
  divSporten.innerHTML = retour;

}

function doorgeef(van,naar) {
  let vanLengte = van.length;

  // Geselecteerden toevoegen aan 'naar'
  for(let i = 0; i<vanLengte; i++) {
    if(van[i].selected) {
      naar[naar.length] = new Option(van[i].text, van[i].value);
    }
  }

  // Geselecteerden in 'van' verwijderen
  for (let i=(vanLengte-1); i>=0; i--) {
    if(van[i].selected) {
      van[i] = null;
    }
  }

}

function toonDetaillijst() {
  let geselecteerdItem = slcHoofd.selectedIndex;
  // Leegmaken van de detailLijst
  slcDetail.length = 0;
  // Opvullen van de detailLijst
  for(let i=0; i< detailInhoud[geselecteerdItem].length;i++) {
    slcDetail[slcDetail.length]= new Option(detailInhoud[geselecteerdItem][i]);
  }
  // Eerste item selecteren uit de lijst
  slcDetail[0].selected = true;
}

function verwijderElement() {
  slcDetail[slcDetail.selectedIndex] = null;
}

function vulTextArea() {
    let invoerwaarde = txtIngave.value;
    txaResult.value += invoerwaarde + '\n';
    txtIngave.value = '';
}

function toonEerste() {
  divFeedback.innerHTML='';
  let eersteTaal = slcTalen.options[0];
  // OF slcTalen[0]
  divFeedback.innerHTML = `Eerste taal = ${eersteTaal.text} met value ${eersteTaal.value}`;
}

function toonGeselecteerd() {
  divFeedback.innerHTML='';
  let geselecteerdeTaal = slcTalen.options[slcTalen.selectedIndex]; // OF slcTalen[slcTalen.selectedIndex]
  divFeedback.innerHTML = `Gekozen taal = ${geselecteerdeTaal.text} met value ${geselecteerdeTaal.value}`;
}

function toonAantal() {
  divFeedback.innerHTML='';
  divFeedback.innerHTML = `Aantal elementen : ${slcTalen.length} ` // OF slcTalen.options.length ;
}
