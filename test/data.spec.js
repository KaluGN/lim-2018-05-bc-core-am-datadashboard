describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = computeUsersStats(users, progress, courses);

      assert.equal(users.length, processed.length);
      // console.log(processed[0]);
      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {

      const processed = computeUsersStats(users, progress, courses);

      it(
        'debería tener propiedad percent con valor 53', () => {
          assert.equal(processed[0].stats.percent, 53);
        });

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreSum: 57,
          scoreAvg: 29,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    });

  });

  describe('sortUsers(users, orderBy, orderDirection)', () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    const arrCheck = users.filter(user => user.role === 'student');
    assert.isOk(arrCheck)
    const processed = computeUsersStats(arrCheck, progress, courses);

    it('debería retornar arreglo de usuarios ordenado por nombre asc', () => {
      const newSort = sortUsers(processed, 'name', 'asc');
      assert.deepEqual(newSort[0], {
        name: 'adriana vizcarra paitán',
        stats: {
          exercises: { total: 2, completed: 2, percent: 100 },
          percent: 100,
          quizzes: { total: 3, completed: 3, percent: 100, scoreSum: 237, scoreAvg: 79 },
          reads: { total: 11, completed: 11, percent: 100 }
        }
      });
      assert.deepEqual(newSort[726], {
        name: 'Zurisadai Rosas Aramburú',
        stats: {
          exercises: { total: 2, completed: 2, percent: 100 },
          percent: 100,
          quizzes: { total: 3, completed: 3, percent: 100, scoreSum: 242, scoreAvg: 81 },
          reads: { total: 11, completed: 11, percent: 100 },
        }
      });
    });

    it('debería retornar arreglo de usuarios ordenado por nombre dsc', () => {
      const newSort = sortUsers(processed, 'name', 'dsc');
      assert.deepEqual(newSort[0], {
        name: 'Zurisadai Rosas Aramburú',
        stats: {
          exercises: { total: 2, completed: 2, percent: 100 },
          percent: 100,
          quizzes: { total: 3, completed: 3, percent: 100, scoreSum: 242, scoreAvg: 81 },
          reads: { total: 11, completed: 11, percent: 100 },
        }
      });
      assert.deepEqual(newSort[726], {
        name: 'adriana vizcarra paitán',
        stats: {
          exercises: { total: 2, completed: 2, percent: 100 },
          percent: 100,
          quizzes: { total: 3, completed: 3, percent: 100, scoreSum: 237, scoreAvg: 79 },
          reads: { total: 11, completed: 11, percent: 100 }
        }
      });
    });

    it('debería retornar arreglo de usuarios ordenado por porcentaje general asc', () => {
      const newSort = sortUsers(processed, 'percent', 'asc');
      assert.deepEqual(newSort[0].stats.percent, 0)
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general dsc', () => {
      const newSort = sortUsers(processed, 'percent', 'dsc');
      assert.deepEqual(newSort[0].stats.percent, 100)
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados asc', () => {
      const newSort = sortUsers(processed, 'exercises', 'asc');
      assert.deepEqual(newSort[0].stats.exercises.completed, 0)
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados dsc', () => {
      const newSort = sortUsers(processed, 'exercises', 'dsc');
      assert.deepEqual(newSort[0].stats.exercises.completed, 2)
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados asc', () => {
      const newSort = sortUsers(processed, 'quiz', 'asc');
      assert.deepEqual(newSort[0].stats.quizzes.completed, 0)
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados dsc', () => {
      const newSort = sortUsers(processed, 'quiz', 'dsc');
      assert.deepEqual(newSort[0].stats.quizzes.completed, 3)
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados asc', () => {
      const newSort = sortUsers(processed, 'quizzesAvg', 'asc');
      assert.deepEqual(newSort[0].stats.quizzes.scoreAvg, 0)
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados dsc', () => {
      const newSort = sortUsers(processed, 'quizzesAvg', 'dsc');
      assert.deepEqual(newSort[0].stats.quizzes.scoreAvg, 100)
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas asc', () => {
      const newSort = sortUsers(processed, 'reads', 'asc');
      assert.deepEqual(newSort[0].stats.reads.completed, 0)
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas dsc', () => {
      const newSort = sortUsers(processed, 'reads', 'dsc');
      assert.deepEqual(newSort[0].stats.reads.completed, 11)
    });

  });

  describe('filterUsers(users, filterBy)', () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    const arrCheck = users.filter(user => user.role === 'student');
    assert.isOk(arrCheck)
    const processed = computeUsersStats(arrCheck, progress, courses);

    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)', () => {
      assert.deepEqual(window.filterUsers (processed, 'adriana').length, 2)
    });

  });

  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', () => {
    let options = {
      cohort: fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw'),
      cohortData: fixtures,
      orderBy: 'name',
      orderDirection: 'asc',
      search: 'adriana'
    }

    
    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter', () => {
      assert.deepEqual(window.processCohortData(options).length, 2);

    });

  });

});
