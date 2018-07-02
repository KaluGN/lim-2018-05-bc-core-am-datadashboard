//nombrar variables
const urlUsers = "../data/cohorts/lim-2018-03-pre-core-pw/users.json"
const urlProgress = "../data/cohorts/lim-2018-03-pre-core-pw/progress.json"
const urlCohorts = "../data/cohorts.json"

//llamar el HTML
let cohorts = document.getElementById('cohort')
let users = document.getElementById('cboUsers')
let progress = document.getElementById('progressTable')

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

/* 
//llamar data con XHR
getNews = (url, callback) => {
    const llamarUser = new XMLHttpRequest();
    llamarUser.open('GET', url);
    llamarUser.onload = callback;
    llamarUser.onerror = llamadoError;
    llamarUser.send();
};

const llamadoError = () => {
    console.log('se produjo un error')
}

//llamar User
const llamadoUser = () => {
    const dataUser = JSON.parse(event.target.responseText);
    //console.log(dataUser);
    //llamar progress
    const llamadoProgress = () => {
        const dataProgress = JSON.parse(event.target.responseText);
        //console.log(dataProgress);
        //llamar cohorts
        const llamadoCohorts = () => {
            const dataCohorts = JSON.parse(event.target.responseText);
            //console.log(dataCohorts);

            window.computeUsersStats(dataUser, dataProgress, dataCohorts)
            console.log(computeUsersStats)
        }

        getNews(urlCohorts, llamadoCohorts)
    }

    getNews(urlProgress, llamadoProgress)
}

getNews(urlUsers, llamadoUser)




 */