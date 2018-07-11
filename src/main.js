//VARIABLES PARA NOMBRAR LA DATA
const urlUsers = "../data/cohorts/lim-2018-03-pre-core-pw/users.json";
const urlProgress = "../data/cohorts/lim-2018-03-pre-core-pw/progress.json";
const urlCohorts = "../data/cohorts.json";

//llamar los elementos del DOM - HTML
let sedes = document.getElementById('sede');
let cohortSelect = document.getElementById('cohort');
let addUsers = document.getElementById('agregar-alumnas');

const searchStudent = document.getElementById('buscar-alumna');

//Funcion que me perimite hacer la petición de la data que está en mi archivo json
const getData = (url, callback) => {
  const llamarUser = new XMLHttpRequest();
  llamarUser.open('GET', url);
  llamarUser.onload = callback;
  llamarUser.onerror = llamadoError;
  llamarUser.send();
};

const llamadoError = () => {
  console.log('se produjo un error')
}


//OBJETO PARA FUNCIÓN 4 -- ARGUMENTOS OBJETO GLOBAL
let options = {
  cohort: [],
  cohortData: {
    users: null,
    progress: null,
  },
  orderBy: 'name', //modificar desde sort (f3)
  orderDirection: 'ASC',
  search: '',
}




//MOSTRAR A LOS USERs
const mostrarUser = (users) => {
  cohortSelect.addEventListener('change', (event) => {
    //console.log(event.target.value)
    const cohort = options.cohorts.find(c => c.id === event.target.value);
    options.cohort = cohort;
    //console.log(options);
    const nuevoUsers = processCohortData(options);
        
    nuevoUsers.forEach(elementUser => {
      //debo comparar el users.signupcohort con el cohort.id (event.target.value)
      // if (elementUser.sing === event.target.value) {
        // console.log(users.elementUser);
        addUsers.innerHTML += `<li id="add-students" type="circle">${'Estudiante: ' + elementUser.name}  
          ${'Percent: ' + elementUser.stats.percent} </li>`;
        //console.log(addUsers);
      // }
    });
  });
}


//FUNCIONES PARA LLAMAR A USER - PROGRESS - COHORTS
const llamadoUser = (event) => {
  //console.log(event.target.responseText);
  const dataUser = JSON.parse(event.target.responseText);
  //console.log(dataUser);
  options.cohortData.users = dataUser;
  mostrarUser(dataUser);
}
  //console.log(options);

 
  const llamadoProgress = () => {
    const dataProgress = JSON.parse(event.target.responseText);
    //console.log(dataProgress);
    options.cohortData.progress = dataProgress;
    //console.log(options);

    const llamadoCohorts = () => {
      const dataCohorts = JSON.parse(event.target.responseText);
      options.cohorts = dataCohorts;
     
      //console.log(dataCohorts);
      // options.cohort = dataCohorts;
      // console.log(options);
      mostrarCohorts(dataCohorts);
    };
    getData(urlCohorts, llamadoCohorts)
  };
  getData(urlProgress, llamadoProgress)


//Llamar a los users
getData(urlUsers, llamadoUser)


//SELECCIONAR SEDE, CREAR OPTIONS EN SEDES Y MOSTRAR COHORTS 
const mostrarCohorts = (cohorts) => {
  sedes.addEventListener('change', (event) => {
    //console.log(event.target.value)
    cohortSelect.innerHTML = ''
    cohorts.forEach(elementCohort => {
      if (elementCohort.id.startsWith(event.target.value)) {
        //console.log(elementCohort.id);
        cohortSelect.innerHTML += `<option value="${elementCohort.id}">${elementCohort.id}</option>`;
      }
    });
  });
}

