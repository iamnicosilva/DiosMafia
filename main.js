const contenedor = document.querySelector(".js-flex-container");



function start(){
    contenedor.innerHTML = "";
    contenedor.innerHTML += '<form action="" id="formNumero"></form>';
    contenedor.innerHTML += '<h3>Ingrese el numero de integrantes:</h3>';
    contenedor.innerHTML += '<input type="number" id="inParticipantes" placeholder="min: 6"> <br>';
    contenedor.innerHTML += '<button onclick="obtenerNumero()">Aceptar</button>';
    contenedor.innerHTML += '</form>';
};



function obtenerNumero(){
    let nParticipantes = document.getElementById('inParticipantes').value;
    sessionStorage.setItem('nParticipantes',nParticipantes);
    var numero = sessionStorage.getItem('nParticipantes');
    armarFormularioNombres(numero);
};



function consultarStorage(){
    console.log(sessionStorage.getItem('nParticipantes'));
    console.log(sessionStorage.getItem('participantes'));
};



function crearIntegrante(n){
    input = '<input type="text" id=participante'+n+' placeholder="Nombre"><br>';
    return input;
};



function armarFormularioNombres(numero){
    contenedor.innerHTML="";
    contenedor.innerHTML += '<form action="" id="formNombres">';
    contenedor.innerHTML += '<h3>Ingrese los nombres de los integrantes:</h3>';

    for (var i = 1; i <= numero; i++) {
        let participante = crearIntegrante(i);
        contenedor.innerHTML += participante;
    };

    contenedor.innerHTML += '<button onclick="comenzarJuego()" id="botonComenzar">Comenzar</button>';
    contenedor.innerHTML += '</form>';
};




function comenzarJuego(){
    var numero = sessionStorage.getItem('nParticipantes');
    var participantes = [];
    for (var i = 1; i <= numero; i++) {
        nombre = document.getElementById('participante'+i).value;
        participantes.push([nombre,rol=null]);
    };
    sessionStorage.setItem('participantes',JSON.stringify(participantes));
    armarTablero();
}



function armarTablero(){
    contenedor.innerHTML="";
    contenedor.innerHTML += '<h3>Se reparten las cartas</h3>';
    var participantes = sessionStorage.getItem('participantes');
    participantes = JSON.parse(participantes);
    console.log(participantes);
    for (i of participantes) {
        contenedor.innerHTML += '<div class="integrante" id="divIntegrante'+i[0]+'"><p class="textoIntegrante" id="pIntegrante'+i[0]+'">'+i[0]+'</p></div>'
    };
    contenedor.innerHTML += '<button onclick="setRoles()" id="botonRoles">Listo</button>';
    

}



function setRoles(){
    var participantes = sessionStorage.getItem('participantes');
    participantes = JSON.parse(participantes);
    for (i of participantes){
        contenedor.innerHTML = "";
        contenedor.innerHTML += '<h3>Ahora cada integrante se asigna su Rol:</h3>';
        contenedor.innerHTML += '<p class="textoIntegrante" id="pIntegrante'+i[0]+'">'+i[0]+'</p>';
        contenedor.innerHTML += '<select name="roles" id="selectRoles"><option value="">Seleccione Rol</option><option value="policia">Policía - 1 Espada</option><option value="medico">Médico/a - 1 Basto</option><option value="mafia">Mafia - 7</option><option value="pueblo">Civil - 10-11-12</option></select>';
        contenedor.innerHTML += '<button onclick="confirmarRol()" id="botonConfirmarRol">Confirmar</button>';


    }
};

function confirmarRol(){
    var participantes = sessionStorage.getItem('participantes');
    participantes = JSON.parse(participantes);
    rol = document.getElementById('selectRoles').value
    participantes[i][1] = rol;
    return participantes
}



function limpiar(){
    sessionStorage.clear();
};


start();


