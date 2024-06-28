const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
sectionReiniciar.style.display ='none'

const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnamigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas= document.getElementById('contenedorTarjetas')
const contenedorAtaques =document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')


let jugadorId = null
let enemigoId = null
let moketones = []
let moketonesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMoketones
let inputHipodoge
let inputmascotaJugadorObjeto
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMoketon
let ataquesMoketonEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = '/assets/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 450

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Moketon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMoketon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }

}

let hipodoge = new Moketon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodogeC.png')

let capipepo = new Moketon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepoC.png')

let ratigueya = new Moketon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueyaC.png')

//enemigos

const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)



const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)


const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)


moketones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego() {

    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    moketones.forEach((moketon) => {
        opcionDeMoketones = `
        <input type="radio" name="mascota" id=${moketon.nombre} />
        <label class="tarjeta-de-moketon" for=${moketon.nombre}>
            <p>${moketon.nombre}</p>
            <img src=${moketon.foto} alt=${moketon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMoketones

            inputHipodoge = document.getElementById('Hipodoge')
            inputCapipepo = document.getElementById ('Capipepo')
            inputRatigueya = document.getElementById ('Ratigueya')

    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)


    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()


}

function unirseAlJuego() {
    fetch("http://192.168.20.11:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function(respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })

            }
        })

}
function seleccionarMascotaJugador() {

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }  else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }  else {
        alert('Selecciona tu mascota')
        return
    }  

    sectionSeleccionarMascota.style.display = 'none'

    seleccionarMoketon(mascotaJugador) 

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa() 
}

function seleccionarMoketon(mascotaJugador) {
    fetch(`http://192.168.20.11:8080/moketon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            moketon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques 
    for (let i = 0; i < moketones.length; i++) {
        if (mascotaJugador === moketones[i].nombre) {
            ataques = moketones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataques) => {
        ataquesMoketon = `
        <button id=${ataques.id} class="boton-de-ataque BAtaque">${ataques.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMoketon

    })

     botonFuego = document.getElementById('boton-fuego')
     botonAgua = document.getElementById('boton-agua')
     botonTierra = document.getElementById('boton-tierra')

     botones = document.querySelectorAll('.BAtaque')


}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
           if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
           } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
           } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
           }

           if (ataqueJugador.length === 5) {
                enviarAtaques()

           }
           

        })
    })
}
function enviarAtaques() {
    fetch(`http://192.168.20.11:8080/moketon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.20.11:8080/moketon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })

            }   
        })
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, moketones.length -1)

    spanMascotaEnamigo.innerHTML = moketones[mascotaAleatoria].nombre
    ataquesMoketonEnemigo = moketones[mascotaAleatoria].ataques
    secuenciaAtaque()

}


function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataquesMoketonEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()

}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo [index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE 😂 ");
            } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
        indexAmbosOponentes(index, index);
        crearMensaje("GANASTE");
              victoriasJugador++
              spanVidasJugador.innerHTML = victoriasJugador
    } else if (ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO') {
        indexAmbosOponentes(index, index);
        crearMensaje("GANASTE");
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
    } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
        indexAmbosOponentes(index, index);
        crearMensaje("GANASTE");
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
    } else {
        indexAmbosOponentes(index, index);
        crearMensaje("PERDISTE");
        vidasEnemigo++
        spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("EMPATE ! 😒")
    } else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("GANASTE 🎉👍🙌🔵")
    } else {
        crearMensajeFinal("PERDISTE 🥵👎😒🌬️")
    }
}

function crearMensaje(resultado) {


    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

}


function crearMensajeFinal(resultadoFinal) {

    

    sectionMensajes.innerHTML = resultadoFinal


    sectionReiniciar.style.display ='block'


}

function reiniciarJuego(){
    location.reload() 
}


function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
 // PintarCanvas
function pintarCanvas() {

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height       
    )
    mascotaJugadorObjeto.pintarMoketon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    moketonesEnemigos.forEach(function (moketon) {
            moketon.pintarMoketon()
            revisarColision(moketon)
        })

    }


function enviarPosicion(x, y) {
     fetch(`http://192.168.20.11:8080/moketon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
     .then(function (res) {   
        if (res.ok) {
           res.json()
               .then(function ({ enemigos }) {
                    console.log(enemigos)
                    moketonesEnemigos = enemigos.map(function (enemigo) {
                        let moketonEnemigo = null
                        const moketonNombre = enemigo.moketon.nombre || ""
                        if (moketonNombre === "Hipodoge") {
                            moketonEnemigo = new Moketon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodogeC.png', enemigo.id)
                        } else if (moketonNombre === "Capipepo") {
                            moketonEnemigo = new Moketon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepoC.png', enemigo.id)
                        } else if (moketonNombre === "Ratigueya") {
                            moketonEnemigo = new Moketon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueyaC.png', enemigo.id)
                        }

                            moketonEnemigo.x = enemigo.x
                            moketonEnemigo.y = enemigo.y
    
                            return moketonEnemigo
                        

                    })
                                            
                })               
        }
     })
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0

}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break

        default:
            break;
    }
}

function iniciarMapa() {

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < moketones.length; i++) {
        if (mascotaJugador === moketones[i].nombre) {
            return moketones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = 
    mascotaJugadorObjeto.y
    const abajoMascota = 
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota =
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
    mascotaJugadorObjeto.x
    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
        detenerMovimiento()
        clearInterval(intervalo)
        console.log('Se detecto una colision');


        enemigoId = enemigo.id

        sectionSeleccionarAtaque.style.display = 'flex'
        sectionVerMapa.style.display = 'none'
        seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)
