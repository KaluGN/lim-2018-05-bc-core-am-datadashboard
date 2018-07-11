window.computeUsersStats = (users, progress, courses) => {
    // console.log(users,progress,courses);
    let recorrerUserStats = users.filter(elementUser =>  elementUser.role === 'student');
    //console.log(recorrerUserStats);
    const percentUsers = (recorrerUserStats) => {
      let contador = 0;
      courses.forEach(course1 => {
        
        const progressUsers = progress[recorrerUserStats.id];  
        if (progressUsers && Object.keys(progressUsers).length > 0 && !Array.isArray(progressUsers)){
          contador += progressUsers[course1].percent;
        } 
      });
      return (contador/courses.length)
    }
  
    const totalExercise = (recorrerUserStats) => {
      contador = 0;
      courses.forEach(course1 => {
        const progressUsers = progress[recorrerUserStats.id];
        if(progressUsers && Object.keys(progressUsers).length > 0 && !Array.isArray(progressUsers)){
          contador += progressUsers[course1].percent;
        }
      });
      console.log(contador);
       
    }
  
    recorrerUserStats = recorrerUserStats.map(objectUser => {
      const userWithStats = {
        name : objectUser.name,
        // sing : objectUser.signupCohort,
        stats: {
          percent: percentUsers(objectUser),
          // exercises: {
          //     total: totalExercise(objectUser),
          //     completed: 0,
          //     percent: 0,
          // },
          // reads: {
          //     total: 0,
          //     completed: 0,
          //     percent: 0,
          // },
          // quizzes: {
          //     total: 0,
          //     completed: 0,
          //     percent: 0,
          //     scoreSum: 0,
          //     scoreAvg: 0,
          // }
        }
      }
      //console.log(userWithStats);
      return userWithStats;
    })
    console.log(recorrerUserStats);
    
    return recorrerUserStats;
  };
  
  
  
  // window.sortUsers = (users, orderBy, orderDirection) => {
  
  // }
  
  window.filterUsers = (users, search) => {
    if (search !== '') {
      let userFilter = estudents.filter(user => {
        return user.name.toUpperCase().includes(search.toUpperCase())
     });
      return userFilter;
  }
  return estudents;
  }
  
  
  window.processCohortData = (options) => {
    const courses = Object.keys(options.cohort.coursesIndex);
    // console.log(courses)
    let estudents = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
    // estudents = sortUsers(estudents,options.orderBy, options.orderDirection);
    if(options.search !== ''){
        estudents = filterUsers(estudents, options.search)
    }
      return estudents;
  }
  
  