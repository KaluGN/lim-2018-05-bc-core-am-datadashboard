/* let cboUsers = document.getElementById('cboUsers');
cboUsers.addEventListener("change", function () {
  getProgress();
});

getCohort();
computeUsersStats(); function getCohort() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      let arrayCohorts = JSON.parse(xhttp.responseText);
      // console.log(arrayCohorts);
      let select = document.getElementById("cboCohorts");
      for (let i in arrayCohorts) {
        let option = document.createElement("option");
        select.options.add(option, 0);
        select.options[0].value = arrayCohorts[i].id;
        select.options[0].innerText = arrayCohorts[i].id;
      }
    }
  };

  xhttp.open("GET", "../data/cohorts.json", true);
  xhttp.send();
};
function computeUsersStats() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {

      let arrayUsers = JSON.parse(xhttp.responseText);
      let select = document.getElementById("cboUsers");
      for (let i in arrayUsers) {
        let option = document.createElement("option");
        select.options.add(option, 0);
        select.options[0].value = arrayUsers[i].id;
        select.options[0].innerText = arrayUsers[i].name;
      }
    }
  };
  xhttp.open("GET", "../data/cohorts/lim-2018-03-pre-core-pw/users.json", true);
  xhttp.send();
};

function getProgress() {

  let select = document.getElementById("cboUsers");
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {

      let arrayProgress = JSON.parse(xhttp.responseText);
      let arrayUnits = arrayProgress[select.value]['intro']['units'];
      document.getElementById("progressTable").innerText = null;
      for (let i in arrayUnits) {
        console.log(i);
        let fila = "<tr><td>" + i + "</td><td>" + arrayUnits[i].totalParts + "</td></tr>";
        let btn = document.createElement("TR");
        btn.innerHTML = fila;
        document.getElementById("progressTable").appendChild(btn);
      }
    }
  };
  xhttp.open("GET", "../data/cohorts/lim-2018-03-pre-core-pw/progress.json", true);
  xhttp.send();
};

 */