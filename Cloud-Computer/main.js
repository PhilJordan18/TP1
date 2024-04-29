
// Définition des cookies
function setCookie(name, value, daysToExpire) {
  var date = new Date();
  date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  var expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Cette fonction me servira essentiellement pour la lecture des cookies
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function checkLastVisit() {
  var lastVisit = getCookie("lastVisit");
  if (lastVisit != null) {
    alert("Votre dernière visite était le " + lastVisit);
  } else {
    alert("Bienvenue pour votre première visite sur notre site !");
  }
  // Mise à jour du cookie avec la date et l'heure actuelles pour cette visite
  var now = new Date();
  setCookie("lastVisit", now.toLocaleString(), 365);
}

// Appel de la fonction au chargement de la page
window.onload = function () {
  checkLastVisit();
}


// Fonction pour gérer le changement de thèmes du site
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('second-theme');
});

// Gestion du temps d'inactivité

let idleTime = 0;
let timer;
let showMessage = false;

function resetTimer() {
  clearTimeout(timer);
  idleTime = 0;
}

function checkIdle() {
  idleTime++;
  if (idleTime > 30 && !showMessage) {
    showMessage = true;
    let confirmation = confirm("Vous êtes inactif depuis plus de 30 secondes. Êtes-vous toujours sur le site ?");
    if (confirmation) {
      idleTime = 0; // Réinitialise le compteur si l'utilisateur confirme qu'il est actif
      showMessage = false; // Réinitialise le flag pour afficher à nouveau le message
    }
  }
}

timer = setInterval(checkIdle, 1000);

document.addEventListener("mousemove", resetTimer);
document.addEventListener("keypress", resetTimer);

// Affichage dynamique

const contenuDynamique = document.getElementById('contenuDynamique');
const boutonAfficher = document.getElementById('boutonAfficher');

const afficherContenuDynamique = () => {
  const nouveauContenu = document.createElement('p');
  nouveauContenu.textContent = "C'EST UN PLAISIR DE VOUS AVOIR SUR NOTRE SITE !!! BONNE VISITE.";
  contenuDynamique.appendChild(nouveauContenu);
};

boutonAfficher.addEventListener('click', afficherContenuDynamique);


// Gestion de la longueur du texte


const paragraphe = document.getElementById('texte');
const bouton = document.getElementById('bouton');

const lignesMax = 3;
let isMinimized = true;

const toggleTexte = () => {
  if (isMinimized) {
    paragraphe.style.maxHeight = 'none';
    bouton.textContent = 'Masquer';
  } else {
    paragraphe.style.maxHeight = '3em'; // 3 lignes
    bouton.textContent = '...';
  }
  isMinimized = !isMinimized;
};

bouton.addEventListener('click', toggleTexte);

window.addEventListener('load', () => {
  const lineHeight = parseFloat(window.getComputedStyle(paragraphe).lineHeight);
  const paragrapheHeight = paragraphe.clientHeight;

  if (paragrapheHeight > lignesMax * lineHeight) {
    bouton.style.display = 'inline';
  }
});
//Je sais pas pourquoi mais j'y arrive pas pourtant je pense avoir bien lié les id