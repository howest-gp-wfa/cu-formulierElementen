"use strict";

window.addEventListener('load',Initieer);

var txtIngave, txaResult; 
var slcTalen;
var divFeedback;
var slcHoofd,slcDetail;
var slcGenodigden,slcDeelnemers;
var cbxSporten;
var divSporten;
var rdbGeslacht;
var divToonGeslacht;
var frmInvul;

const detailInhoud = [['Krokus','Roos','Tulp'], ['Eik','Es','Populier'],['Aap', 'Beer','Hond','Schaap']];


function Initieer(){
  let btnToevoegen;
  let btnToonEerste,btnToonGeselecteerd,btnToonAantal;
  let btnHeen, btnTerug;
  let btnToonGeslacht;
  //  DOM elementen ophalen
  txtIngave = document.getElementById("txtIngave");
  txaResult = document.getElementById("txaResult");
  slcTalen = document.querySelector('#slcTalen');
  slcHoofd = document.querySelector('#slcHoofd');
  slcGenodigden = document.querySelector('#slcGenodigden');
  slcDeelnemers = document.querySelector('#slcDeelnemers');
  slcDetail = document.querySelector('#slcDetail');
  divFeedback = document.querySelector('#divFeedback');
  divSporten = document.querySelector('#divSporten');
  divToonGeslacht = document.querySelector('#divToonGeslacht');
  btnToevoegen = document.querySelector("#btnToevoegen");
  btnToonEerste = document.querySelector('#btnToonEerste');
  btnToonGeselecteerd = document.querySelector('#btnToonGeselecteerd');
  btnToonAantal = document.querySelector('#btnToonAantal');
  btnHeen = document.querySelector('#btnHeen');
  btnTerug = document.querySelector('#btnTerug');
  btnToonGeslacht = document.querySelector('#btnToonGeslacht');
  cbxSporten = document.querySelectorAll('input[type="checkbox"]');
  rdbGeslacht = document.getElementsByName('geslacht');
  frmInvul = document.querySelector('#frmInvul');
  // Eventlisteners toevoegen
  btnToevoegen.addEventListener('click',VulTextArea);
  btnToonEerste.addEventListener('click',ToonEerste);
  btnToonGeselecteerd.addEventListener('click',ToonGeselecteerd);
  btnToonAantal.addEventListener('click',ToonAantal);
  btnHeen.addEventListener('click',()=> Doorgeef(slcGenodigden,slcDeelnemers));
  btnTerug.addEventListener('click', ()=> Doorgeef(slcDeelnemers,slcGenodigden));
  btnToonGeslacht.addEventListener('click',ToonGeslacht);
  slcHoofd.addEventListener('change',ToonDetaillijst);
  slcDetail.addEventListener('dblclick',VerwijderElement);
  

  VoegEventlistenersToeAanCheckboxen();
}

function Controle(){
  if(frmInvul.txtNaam.value == '' || frmInvul.txtVoornaam.value == ''){
    alert('Naam en voornaam invullen aub');
    return false;
  }
  return true;

}

function ToonGeslacht(){
  let retourString = "Gekozen geslacht : ";
  for (let i=0; i<rdbGeslacht.length; i++){
    if (rdbGeslacht[i].checked){
      retourString += rdbGeslacht[i].value;
      break;
    }
  }
  divToonGeslacht.innerHTML = retourString;
}

function VoegEventlistenersToeAanCheckboxen(){
  for (let i = 0 ; i<cbxSporten.length; i++){
    cbxSporten[i].addEventListener('change',VulDivSporten);
  }

}

function VulDivSporten(){
  let retour = 'Je verkoos de sporten : ';
  for (let i = 0 ; i<cbxSporten.length; i++){
    if (cbxSporten[i].checked){
      retour += cbxSporten[i].value + ' ';
    }    
  }
  divSporten.innerHTML = retour;

}

function Doorgeef(van,naar){
  let vanLengte = van.length;

  // Geselecteerden toevoegen aan 'naar'
  for(let i = 0; i<vanLengte; i++){
    if(van[i].selected){
      naar[naar.length] = new Option(van[i].text, van[i].value);
    }
  }

  // Geselecteerden in 'van' verwijderen
  for (let i=(vanLengte-1); i>=0; i--){
    if(van[i].selected){
      van[i] = null;
    }
  }

}

function ToonDetaillijst(){
  let geselecteerdItem = slcHoofd.selectedIndex;
  // Leegmaken van de detailLijst
  slcDetail.length = 0;
  // Opvullen van de detailLijst
  for(let i=0; i< detailInhoud[geselecteerdItem].length;i++){
    slcDetail[slcDetail.length]= new Option(detailInhoud[geselecteerdItem][i]);
  }
  // Eerste item selecteren uit de lijst
  slcDetail[0].selected = true;
}

function VerwijderElement(){
  slcDetail[slcDetail.selectedIndex] = null;
  
}

function VulTextArea(){
    let invoerwaarde = txtIngave.value;
    txaResult.value += invoerwaarde + '\n';
    txtIngave.value = '';
}

function ToonEerste(){
  divFeedback.innerHTML='';
  let eersteTaal = slcTalen.options[0];
  // OF slcTalen[0]
  divFeedback.innerHTML = `Eerste taal = ${eersteTaal.text} met value ${eersteTaal.value}`;
}

function ToonGeselecteerd(){
  divFeedback.innerHTML='';
  let geselecteerdeTaal = slcTalen.options[slcTalen.selectedIndex]; // OF slcTalen[slcTalen.selectedIndex]
  divFeedback.innerHTML = `Gekozen taal = ${geselecteerdeTaal.text} met value ${geselecteerdeTaal.value}`;
}

function ToonAantal(){
  divFeedback.innerHTML='';
  divFeedback.innerHTML = `Aantal elementen : ${slcTalen.length} ` // OF slcTalen.options.length ;
}
