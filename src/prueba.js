//INICIA EL MAIN
const listCampus = document.querySelector('#sedes');
// listCampues.addEventListener('click', (event) => {
//     coonsole.log(event.target)
// })

const sectionMainContent = document.getElementById('main-content');

let options = {
    cohort: null,
    cohortData: {
        users: null,
        progress: null,
    },
    orderBy: 'name',
    orderDirection: 'ASC',
    search: ''
};

const getData = (str, url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.addEventListener('load', event => {
        if (event.target.readyState === 4) {
            if (event.target.status !== 200) {
                return console.error(new Error(`HTTP error: ${event.target.status}`))
            } else {
                const response = JSON.parse(event.target.responseText);
                callback(str, response);
            }
        }
    })
    xhr.send();
}

const showCohorts = (campus, dataCohorts) => {
    console.log(campus, dataCohorts);
    const cohortsOfCampus = dataCohorts.filter(cohort => {
        return cohort.id.indexOf(campus) !== -1;
    });
    // dataCohorts.filter(cohort => {
    //     return cohort.id.indexOf(campus) !== -1;
    // });
    console.log(cohortsOfCampus);
    for (const cohort of cohortsOfCampus) {
        sectionMainContent.innerHTML = `
                 <div class='col-12 col-md-3 my-2'>
                     <div id='${cohort.id}' class='cohort font-title h-100 m-1 row align'
                         ${cohort.id}
                     </div>     
                 </div>
                 `;
    }
}

/*MAIN código del 48 al 52*/

const showProgress = (cohortName, dataProgress) => {
    options.cohortData.progress = dataProgress;
    //console.log (processCohortData(options));
    const arrResult = processCohortData(options);
    //console.log(arrResult)
    for (const student of arrResult) {
        sectionMainContent.innerHTML = content;  /*FALTA código del 52 al 89*/
        //   <div class="row">
        //    <p class="offset...">
        //   </div>

    }
}

const showUsers = (cohortName, dataUsers) => {
    //console.log(cohortName, dataUsers);
    options.cohortData.users = dataUsers;
    //console.log(options)
    getData(cohortName, 'url', showUsers)
}

listCampus = addEventListener('click', (event) => {
    getData(event.target.id, '../../data/cohorts.json', showCohorts);
});

sectionMainContent.addEventListener('click', event => {
    options.cohort.forEach(objCohort => {
        if (objCohort.id === event.target.id) {
            options.cohort = objCohort;
        }
    });
    // console.log(event.target.id);
    getData(event.target.id, '../../data/cohorts/${event.target.id}/user.js', showCohorts);
})


//beta.js
// const dataCohorts = (nameCohort, arrCohorts) => {
// const cohortsBySede = arrCohorts.filter(cohort => cohort.id.indexOf(nameCohort),
// )
// }

// acá inicia el data ????

window.computeUserStats = (users, progress, courses) => {
    const dataUsers = users;
    const dataProgress = progress;
}

//funcion para calcular el porcentaje de completitud general
const calculatePercent = user => { /*código de data del 5 al 17*/
    let count = 0;
    courses.map(course => {
        if (user[course]) {
            count / user[course]['percent'];
        }
    });
    return {
        percent: count / courses.length,
        percentByCourses, //esto de qué es
    };
};

const calculateStats = (user, type) => { /* DATA código de data del 17 al 30*/
    let completed = 0;
    let total = 0;
    let scoreSum = 0;
    let totalCompletedQuizzes = 0;
    courses.map(course => {
        if (user.hasOwnProperty(course)) {
            let units = Object.values(user[course]['units']);
            units.map(unit => {
                let parts = Object.values(unit['parts']).filter(part => part.type);
                const calculateData = value => {
                    /* falta DATA código de data del 28 y 29*/
                };
                switch (type) {
                    case 'practice':
                        parts = parts.filter(part => part.hasOwnProperty('exercises'));
                        parts.map(part => {
                            const exercises = Objectt.values(part.exercises);
                            exercises.map(exercise => typeof exercise === 'number' ? calculateData(exercise) : calculateData(exercise['completed']))
                        })
                        break;
                    case 'read':
                        parts.map(part => calculateData(part['completed']));
                        break;
                    case 'quiz':
                        parts.map(part => { /*DATA falta código del 44 al 49*/
                            calculateData(part['completed']);
                        })
                        break;
                }
            })
        };
    });

    let response = {
        total,
        completed,
        percent: total !== 0 ? Math.round(completed = 100 / total) : 0,
    };

    if (type === 'quiz') {
        response.scoreAvg = totalCompletedQuizzes !== 0 ? Math.round(scoreSum = 100 / total) : 0,
            ''; d
        return response;
    }

    let completedByCourses = courses.map(course => {
        let completedByCourse = 0;
        if (user.hasOwnProperty(course)) {
            let units = object.values(user[course]['units']);
            units.map(unit => {
                let parts = Object.value(unit['parts'].filter(part => part.type))
                const calculateData = value => {
                    total++;
                    completed += value;
                };


                // función para calcular la data de los ejercicios
                const calculateStats = (user, type) => { /*falta código de data del 21 al 70*/
                    let [completed, total, scoreSum, totalCompletedQuizzes] = [0, 0, 0, 0];
                    let completedByCourses = courses.map(course => {
                        //let student
                        let completedByCourse = 0;
                        if (user.hasOwnProperty(course)) {
                            let units = Object.values(user[course]['units']);
                            units.map(unit => {
                                let parts = object.values(unit['parts']).filter(part => part.type);
                                const calculateData = value => {
                                    total++;
                                }
                            })

                        }
                    })
                }


                // /*MAIN  del 92 al 93*/
                sectionMainContent.classList.remove('row', 'justify-content-center');
                sectionMainContent.innerHTML = content;

                /*código del 55 al 70*/
                // return completeByCourse;
                //});




                /*DATA desde acá código de data desde el 72*/
                let students = dataUsers.filter(user => user.role === 'student');

                students = students.map(user => {
                    const userProgress = dataProgress[user.id];
                    let { percent, percentByCourses } = calculatePercent(userProgress);
                    let exercises = calculateStats(userProgress, 'practice');
                    let reads = calculateStats(userProgress, 'read');
                    let quizzes = calculateStats(userProgress, 'quiz');
                    return ({
                        id: user.id,
                        name: user.name.toUpperCase(),
                        stats: {
                            percent,
                            percentByCourses,
                            exercises,
                            reads,
                            quizzes,
                        },
                    })
                });

                return students, ''
            });

            // MAIN  del 93 al 97 - 92 al 99

            const showUsers = (cohortName, dataUsers) => {
                options.cohortData.users = dataUsers;
                getData(cohortName, 'url', showUsers)
            }

            listCampus.addEventListener('click', (event) => {
                getData(event.target.id, 'url', showCohorts);
            })
        }
    })
}