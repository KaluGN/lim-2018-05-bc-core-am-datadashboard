//nombrar variables
const urlUsers = "../data/cohorts/lim-2018-03-pre-core-pw/users.json"
const urlProgress = "../data/cohorts/lim-2018-03-pre-core-pw/progress.json"
const urlCohorts = "../data/cohorts.json"

//llamar el HTML
let cohortSelect = document.getElementById('cohort')
let sedes = document.getElementById('sede')

//llamar data con XHR
getData = (url, callback) => {
  const llamarUser = new XMLHttpRequest();
  llamarUser.open('GET', url);
  llamarUser.onload = callback;
  llamarUser.onerror = llamadoError;
  llamarUser.send();
};

const llamadoError = () => {
  console.log('se produjo un error')
}
const mostrarCohorts = (cohorts) => {
  sedes.addEventListener('change', () => {
    //console.log(event.target.value)
    cohortSelect.innerHTML = ''
    cohorts.forEach(elementCohort => {
      if (elementCohort.id.startsWith(event.target.value)) {
      console.log(elementCohort.id);
      cohortSelect.innerHTML += `<option>${elementCohort.id}</option>`;
      }
    });
  });
}
//llamar User
/* const llamadoUser = () => {
  const dataUser = JSON.parse(event.target.responseText);
  //console.log(dataUser);

  //llamar progress
  const llamadoProgress = () => {
      const dataProgress = JSON.parse(event.target.responseText);
      //console.log(dataProgress);
      //llamar cohorts */
const llamadoCohorts = () => {
  const dataCohorts = JSON.parse(event.target.responseText);
  console.log(dataCohorts);
  mostrarCohorts(dataCohorts);
};

  //window.computeUsersStats(dataUser, dataProgress, dataCohorts)
  //console.log(computeUsersStats)


  getData(urlCohorts, llamadoCohorts)
  /* }

  getData(urlProgress, llamadoProgress)
}

getData(urlUsers, llamadoUser) */


/* 
// let users = document.getElementById('cboUsers')
// let progress = document.getElementById('progressTable')

//llamar data con Fetch
function llamarCohorts() {
  fetch('urlCohorts')
    .then(function (coh) {
      return coh.json();
    })
    .then(function(cohortLima){
      let HTML ='';
      cohortLima.forEach(function(estudiante){
        HTML += `
          <li>${estudiante.eslint}</li>
        `;
      })
      document.getElementById('resultado').innerHTML = HTML;
    })
    .catch(function(error){
      console.log(error)
    });
}


 */