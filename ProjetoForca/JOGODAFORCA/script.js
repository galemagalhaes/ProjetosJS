const categoria = document.querySelector("#category");
const letrasErradas = document.querySelector(".wrongLetters");
const palavraInterface = document.querySelector(".dashes");
const olhos = Array.from(document.querySelectorAll(".eyes"));
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
let palavraProposta;
let letrasErradasArray = [];
let indiceBoneco;
const numTentativas = 7;
const opacidadeOlhos = 0.3;

const categorias = {
    frutas: ["banana", "maça", "mamao", "limao", "uva", "melancia", "caju", "jaca", "melao", "abacaxi"],
    profissões: ["engenheiro", "advogado", "medico", "professor", "pescador", "programador", "gamer", "confeiteiro"],
    animais: ["leao", "galinha", "tubarao", "gaivota", "cachorro", "gato", "porco", "guaxinim"],
    cores: ["verde", "azul", "vermelho", "amarelo", "marrom", "preto", "branco"]
};

function retornaArrayCategoria(){
    return Object.keys(categorias);
}

function retornaCategoria(){
    const arrayCategoria = retornaArrayCategoria();
    let indiceCategoria = retornaNumAleatorio(arrayCategoria.length);
    return arrayCategoria[indiceCategoria];
}

function exibeCategoria(){
    categoria.innerHTML = retornaCategoria();
}

function retornaNumAleatorio(max){
    return Math.floor(Math.random() * max);
}

function definePalavraProposta(){
    const arrayPalavras = categorias[categoria.innerHTML];
    let indicePalavra = retornaNumAleatorio(arrayPalavras.length);
    palavraProposta = arrayPalavras[indicePalavra];
    ocultaPalavra();
}

function ocultaPalavra(){
    let palavraOcultada = "";
    for(let i = 0; i < palavraProposta.length; i++) {
        palavraOcultada += "-";
    }
    exibePalavraInterface(palavraOcultada);
}

function exibePalavraInterface(palavra){
    palavraInterface.innerHTML = palavra;
}

function tentativa(letra){
    if(palavraProposta.includes(letra)){
        atualizaPalavraInterface(letra);
    } else {
        letrasErradasArray.push(letra);
        letrasErradas.innerHTML = "Letras erradas: " + letrasErradasArray;
        if(partesBoneco.length > indiceBoneco){
            desenhaBoneco();
        }
    }
    verificaFimDeJogo();
}

function verificaFimDeJogo(){
    if(!palavraInterface.innerHTML.includes("-")){
        exibePalavraInterface("Você venceu!!");
        window.removeEventListener("keypress", retornaLetra);
    } else if(letrasErradasArray.length >= numTentativas) {
        desenhaOlhos();
        exibePalavraInterface("Você perdeu!!");
        window.removeEventListener("keypress", retornaLetra);
    }
}

function atualizaPalavraInterface(letra){
    let palavraAux = "";
    for(let i = 0; i < palavraProposta.length; i++){
        if(palavraProposta[i] === letra){
            palavraAux += letra;
        } else if(palavraInterface.innerHTML[i] != "-") {
            palavraAux += palavraInterface.innerHTML[i]
        } else {
            palavraAux += "-";
        }
    }
    exibePalavraInterface(palavraAux);
}

/*
Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa
*/
function retornaLetra(e){ 
    tentativa(e.key);
}

/*
Desenha a parte do corpo corrente
*/
function desenhaBoneco(){
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++; 
}

/* 
Desenha os olhos do personagem
*/
function desenhaOlhos(){
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}

/*
Oculta as partes do corpo do personagem
*/
function ocultaBoneco(){
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos; 
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}

function iniciaJogo(){
    indiceBoneco = 0;
    letrasErradasArray = [];
    ocultaBoneco();
    exibeCategoria();
    definePalavraProposta();
    letrasErradas.innerHTML = "Letras erradas: ";    
    window.addEventListener("keypress", retornaLetra);
}

window.addEventListener("load", iniciaJogo);
