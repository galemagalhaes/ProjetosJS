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
    frutas: ["banana", "maçã", "mamão", "limão", "uva", "melancia", "cajú", "jaca", "melão", "abacaxi"],
    profissões: ["engenheiro", "advogado", "médico", "professor", "pescador", "programador", "gamer", "confeiteiro"],
    animais: ["leão", "galinha", "tubarão", "gaivota", "cachorro", "gato", "porco", "guaxinim"],
    cores: ["verde", "azul", "vermelho", "amarelo", "marrom", "preto", "branco"]
};

function retornaArrayCategoria(){
    return Object.keys(categoria);
}
function retornaCategoria(){
    const arrayCategoria = retornaArrayCategoria();
    let indiceCategoria = Math.floor(Math.random()* arrayCategoria.length);
    return arrayCategoria[indiceCategoria];
}
function exibeCategoria(){
    categoria.innerHTML = retornaCategoria();
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

/*
Inicia as configurações do jogo
*/
function iniciaJogo(){
    indiceBoneco = 0;
    letrasErradasArray = [];
    letrasErradas.innerHTML = "Letras erradas: ";
    ocultaBoneco();
    exibeCategoria();
    window.addEventListener("keypress", retornaLetra);
}

window.addEventListener("load", iniciaJogo);
