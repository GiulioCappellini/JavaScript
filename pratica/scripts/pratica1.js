var hour = new Date().getHours()

var container = document.querySelector(".container")
var divhorario = container.querySelector("#horario")
var divimg = container.querySelector("#img")

divhorario.innerHTML = `Agora são ${hour} horas!`;

var imgmanha = "url('imagens/imagens_pratica1/manha 180x180.jpg')"
var imgtarde = "url('imagens/imagens_pratica1/tarde 180x180.jpg')"
var imgnoite = "url('imagens/imagens_pratica1/noite 180x180.jpg')"

divimg.classList.add("img_em_div")
if (hour < 12) {
    divimg.style.backgroundImage = imgmanha;
    document.body.style.backgroundColor="#cc941b";
}else if (hour < 18) {
    divimg.style.backgroundImage = imgtarde;
    document.body.style.backgroundColor="#ffd57a";
}else {
    divimg.style.backgroundImage = imgnoite;
    document.body.style.backgroundColor="#050a3b";
    document.body.style.color="white"
}
