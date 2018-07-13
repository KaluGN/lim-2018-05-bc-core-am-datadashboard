const resultdiv = (a,b) => {
  if (a!=0 && b!=0){
    return a/b
  }else{return 0}
}

//////AQUI VA LO DE DATA
window.computeUsersStats = (recorrerUserStats, progress, courses) => {
  // console.log(users,progress,courses);

  // console.log(recorrerUserStats);

// const userWithStats =[];

  //Función para obtener progreso y demás datos de 'exercises'
  const percentUsers = (recorrerUserStats) => {
    let contador = 0;
    courses.forEach(course1 => {

      const progressUsers = progress[recorrerUserStats.id];
      if (progressUsers && Object.keys(progressUsers).length > 0 && !Array.isArray(progressUsers)) {
        contador += progressUsers[course1].percent;
      }
    });
    return (contador / courses.length)
  }

 
  const objectExercise = (recorrerUserStats) => {
    let contadorTotal = 0;
    let contadorCompleted = 0;
    courses.forEach(course1 => {
      const progressUsers = progress[recorrerUserStats.id];
      if (progressUsers && Object.keys(progressUsers).length > 0 && !Array.isArray(progressUsers)) {
        const units = Object.values(progressUsers[course1].units)
        units.forEach(partsUnits => {
          const parts = Object.values(partsUnits.parts)
          for (let part in parts) {
            for (let element in parts[part]) {
              if (element === "exercises") {
                const exercises = (parts[part][element]);
                for (exercise in exercises) {
                  contadorTotal++
                  if (exercises[exercise].completed === 1) {
                    contadorCompleted++
                  }
                }
              }
            }
          }
        });
      }
    });
    //creación del objeto exercises para mostrar en función global
    const exercises = new Object();
    exercises.total = contadorTotal
    exercises.completed = contadorCompleted
    exercises.percent = resultdiv(contadorCompleted * 100, contadorTotal)
    return exercises
  }

  
  const objectReads = (recorrerUserStats) => {
    let contadorTotal = 0;
    let contadorCompleted = 0
    courses.forEach(course1 => {
      const progressUsers = progress[recorrerUserStats.id];
      if (progressUsers && Object.keys(progressUsers).length > 0 && !Array.isArray(progressUsers)) {
        const units = Object.values(progressUsers[course1].units)
        units.forEach(partsUnits => {
          const parts = Object.values(partsUnits.parts)
          for (let part in parts) {
            // console.log(parts[part]['type']);
            if (parts[part]['type'] === "read") {
              contadorTotal++
              if (parts[part]['completed'] === 1) {
                contadorCompleted++
              }
            }
          }
        });
      }
    });
    const read = new Object();
    read.total = contadorTotal;
    read.completed = contadorCompleted;
    read.percent = Math.round(resultdiv(contadorCompleted * 100,contadorTotal));
    return read
  }
  const objectQuizz = (recorrerUserStats) => {
    let contadorTotal = 0;
    let contadorCompleted = 0;
    let sumaScore = 0;
    courses.forEach(course1 => {
      const progressUsers = progress[recorrerUserStats.id]; //segun test aquí hay un error
      if (progressUsers && Object.keys(progressUsers).length > 0 && !Array.isArray(progressUsers)) {
        const units = Object.values(progressUsers[course1].units)
        units.forEach(partsUnits => {
          const parts = Object.values(partsUnits.parts)
          for (let part in parts) {
            // console.log(parts[part]['type']);
            if (parts[part]['type'] === "quizzes") {
              contadorTotal++
              if (parts[part]['completed'] === 1) {
                contadorCompleted++
              }
              if (parts[part].hasOwnProperty('score')) {
                sumaScore += parts[part].score;
              }
            }
          }
        });
      }
    });
    const quiz = new Object();
    quiz.total = contadorTotal,
      quiz.completed = contadorCompleted,
      quiz.percent = Math.round(resultdiv(contadorCompleted * 100, contadorTotal)),
      quiz.scoreSum = sumaScore,
      quiz.scoreAvg = Math.round(sumaScore / contadorCompleted)
    return quiz
  }

  recorrerUserStats = recorrerUserStats.map(objectUser => {
    const userWithStats = {
      name: objectUser.name,
      stats: {
        percent: percentUsers(objectUser),
        exercises: objectExercise(objectUser),
        reads: objectReads(objectUser),
        quizzes: objectQuizz(objectUser)
      }
    }
    // console.log(userWithStats);
    return userWithStats;
  })
  console.log(recorrerUserStats[0]);
// console.log(recorrerUserStats);

  return recorrerUserStats;
};

window.sortUsers = (users, orderBy, orderDirection) => {

  const orderName = users.sort(function (a, b) {
    var x = a.name.toUpperCase();
    var y = b.name.toUpperCase();
    if (x > y) { return 1; }
    if (x < y) { return -1; }
    return 0;
  });
  if (orderBy === 'name' && orderDirection === 'asc') {
    // console.log(orderName)
    return orderName
  } else if (orderBy === 'name' && orderDirection === 'dsc') {
    const nuevo = orderName.reverse();
    return nuevo
  } else if (orderBy === 'percent' && orderDirection === 'asc') {
    const orderNew = users.sort(function (a, b) {
      return a.stats.percent - b.stats.percent
    });
    return orderNew;
  } else if (orderBy === 'percent' && orderDirection === 'dsc') {
    const orderNew = users.sort(function (a, b) {
      return b.stats.percent - a.stats.percent
    });
    return orderNew;
  } else if (orderBy === 'exercises' && orderDirection === 'asc') {
    const orderNew = users.sort (function(a, b) {
      return a.stats.exercises.completed - b.stats.exercises.completed
    });
    return orderNew;
  } else if (orderBy === 'exercises' && orderDirection === 'dsc') {
    const orderNew = users.sort (function(a, b){
      return b.stats.exercises.completed - a.stats.exercises.completed
    });
    return orderNew;
  } else if (orderBy === 'reads' && orderDirection === 'asc') {
    const orderNew = users.sort (function(a, b) {
      return a.stats.reads.completed - b.stats.reads.completed
    });
    return orderNew;
  } else if (orderBy === 'reads' && orderDirection === 'dsc') {
    const orderNew = users.sort (function(a, b) {
      return b.stats.reads.completed - a.stats.reads.completed
    });
    return orderNew;
  } else if (orderBy === 'quiz' && orderDirection === 'asc') {
    const orderNew = users.sort (function (a, b) {
      return a.stats.quizzes.completed - b.stats.quizzes.completed
    });
    return orderNew;
  } else if (orderBy === 'quiz' && orderDirection === 'dsc') {
    const orderNew = users.sort (function (a, b) {
      return b.stats.quizzes.completed - a.stats.quizzes.completed
    });
    return orderNew;
  } else if (orderBy === 'quizzesAvg' && orderDirection === 'asc') {
    const orderNew = users.sort (function (a, b) {
      return a.stats.quizzes.scoreAvg - b.stats.quizzes.scoreAvg
    });
    return orderNew;
  } else if (orderBy === 'quizzesAvg' && orderDirection === 'dsc') {
    const orderNew = users.sort (function (a, b) {
      return b.stats.quizzes.scoreAvg - a.stats.quizzes.scoreAvg
    });
    return orderNew;
  }


   return users.sort(); 
}


window.filterUsers = (users, search) => {
  let userFilter = users.filter(user => {
    return user.name.toUpperCase().indexOf(search.toUpperCase()) !== -1;
  });
  return userFilter;
}


window.processCohortData = (options) => {
  //console.log(options);

  const courses = Object.keys(options.cohort.coursesIndex);
  // console.log(courses)
  let estudents = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
  //console.log(estudents);

  estudents = sortUsers(estudents, options.orderBy, options.orderDirection);
  //console.log(estudents);

  if (options.search !== '') {
    estudents = filterUsers(estudents, options.search) //segun test aquí hay un error
  }
  //console.log(estudents); //segun test aquí hay un error

  return estudents; //segun test aquí hay un error
}

