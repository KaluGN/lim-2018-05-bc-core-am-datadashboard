//VARIABLES PARA NOMBRAR LA DATA
const urlUsers = "../data/cohorts/lim-2018-03-pre-core-pw/users.json";
const urlProgress = "../data/cohorts/lim-2018-03-pre-core-pw/progress.json";
const urlCohorts = "../data/cohorts.json";

//llamar los elementos del DOM - HTML
let sedes = document.getElementById('sede');
let cohortSelect = document.getElementById('cohort');
let addUsers = document.getElementById('agregar-alumnas');
const searchStudent = document.getElementById('buscar-alumna');
const selectOrderBy = document.getElementById('select-ordenar');
const selectOrderTo = document.getElementById('mayor-menor');
const orderButton = document.getElementById('boton-ordenar');


//Funcion que me perimite hacer la petición de la data que está en mi archivo json
const getData = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = callback;
  xhr.onerror = llamadoError;
  xhr.send();
};

const llamadoError = () => {
  console.log('se produjo un error')
}


//ARGUMENTOS OBJETO GLOBAL
let options = {
  cohort: [],
  cohortData: {
    users: null,
    progress: null,
  },
  orderBy: 'name', 
  orderDirection: 'asc',
  search: '',
}


const viewUser = (nuevoUsers) => {
  nuevoUsers.forEach(elementUser => {
    addUsers.innerHTML += `<p id="add-students" class="student-data">${
      elementUser.name +'\n'+  
      'Progreso general: ' + elementUser.stats.percent +'\n'+ 
      '% de ejercicios: ' + elementUser.stats.exercises.percent +'\n'+
      '% de lecturas: ' + elementUser.stats.reads.percent +'\n'+
      '% de quizzes: ' + elementUser.stats.quizzes.percent
    }</p>`;

   
});
}

//MOSTRAR A LOS USERs
  cohortSelect.addEventListener('change', (event) => {
    //console.log(event.target.value)
    const cohort = options.cohorts.find(c => c.id === event.target.value);
    options.cohort = cohort;
    //console.log(options);
    const nuevoUsers = processCohortData(options);
    // console.log(nuevoUsers);
    addUsers.innerHTML = ' '    
   viewUser(nuevoUsers)
  });



//FUNCIONES PARA LLAMAR A USER - PROGRESS - COHORTS
const llamadoUser = (event) => {
  //console.log(event.target.responseText);
  const dataUser = JSON.parse(event.target.responseText);
  //console.log(dataUser);
  let recorrerUserStats = dataUser.filter(elementUser => elementUser.role === 'student');
  options.cohortData.users = recorrerUserStats;

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

//LLAMANDO AL BUSCADOR
searchStudent.addEventListener('keyup', function () {
  options.search = searchStudent.value;
  let data = processCohortData(options);
  //console.log(data);
  
  addUsers.innerHTML = '';
  // console.log(showUser(data));
  viewUser(data);
  // console.log(showUser(data));
  
})

// console.log(event.target.value);
  // console.log(selectOrderBy.value);

//LLAMANDO A SORT
orderButton.addEventListener('click', (event) => {
  options.orderBy = selectOrderBy.value;
  options.orderDirection = selectOrderTo.value; 
  console.log(options);
  
  const newOrder = processCohortData(options);
  addUsers.innerHTML = '';
  viewUser(newOrder);
})
