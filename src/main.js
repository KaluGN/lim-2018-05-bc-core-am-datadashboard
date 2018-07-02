//Codigo a Ejecutar al Cargar la Pagina
function myOnLoad() {
 cargarSedes();
}

// funcion para Cargar sedes al campo <select>
function cargarSedes() {
 
  var array = ["Lima", "Santiago", "Mexico", "Brasil"];

 // Ordena el Array Alfabeticamente
 array.sort();

 addOptions("cboSede", array);
}

// agregar opciones a un <select>
function addOptions(domElement, array) {
 var select = document.getElementsByName(domElement)[0];
//console.log(select);
 for (value in array) {
  var option = document.createElement("option");
  option.text = array[value];
  select.add(option);
 }
}

let cboUsers = document.getElementById('cboUsers');
cboUsers.addEventListener("change", function () {
    getProgress();
});

getCohort();
function cursos(){
  let selectv = document.getElementById("cboCohorts");
    if(selectv.options[selectv.selectedIndex].value ==="lim-2018-03-pre-core-pw"){
    computeUsersStats();
    }else{
      document.getElementById("cboUsers").innerText = null;
    }
}

 
function getCohort() {
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
		let cont=0;
        if (xhttp.readyState === 4 && xhttp.status === 200) {
                                                                  
            let arrayProgress = JSON.parse(xhttp.responseText);
            let arrayUnits = arrayProgress[select.value]['intro']['units'];
            document.getElementById("progressTable").innerText = null;

            for (let key in arrayProgress){
              if (arrayProgress[select.value]['intro']['units']['02-variables-and-data-types']['parts']['06-exercises']['exercises']['01-coin-convert']['completed'] == 1 && arrayProgress[select.value]['intro']['units']['02-variables-and-data-types']['parts']['06-exercises']['exercises']['02-restaurant-bill']['completed'] == 1){
                cont++;
              }
            }
            for (let i in arrayUnits) {

                console.log(i);
                let fila = "<tr><td>" + i + "</td><td>" + arrayUnits[i].completedParts + "</td></tr>";
                let btn = document.createElement("TR");
                btn.innerHTML = fila;
                document.getElementById("progressTable").appendChild(btn);
			}

			let fila2 = "<tr><td>Total de Alumnas que realizarón los ejercicios : </td><td>" + cont + "</td></tr>";
			let btn2 = document.createElement("TR");
			btn2.innerHTML = fila2;
			document.getElementById("progressTable").appendChild(btn2);
			
        }
    };
    xhttp.open("GET", "../data/cohorts/lim-2018-03-pre-core-pw/progress.json", true);
    xhttp.send();
};
