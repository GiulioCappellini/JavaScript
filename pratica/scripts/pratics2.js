function verificar(event) {
    event.preventDefault();

    const form = event.target.closest("form")
    const inputyear = form.querySelector("#iyear").value
    let sex = ""
    form.querySelectorAll("#sectionsex input").forEach(se => {if (se.checked) {sex = se.value}});

    const nowyear = new Date().getFullYear()
    const age = nowyear - inputyear

    let agetext = "anos"

    if (age <= 0 || age > 110) {
        window.alert("Digite um ano válido!")   //Verifica se o ano inserido é valido para proseguir
        return false;
    } else if (age == 1) {
        agetext = "ano"
        if (sex === "Homem") {sex = "Menino"} else {sex = "Menina"}
    }

    let artigo = "uma"
    if (sex == "Homem" || sex == "Menino") {artigo = "um"}
    const presult = form.querySelector("#presult")
    presult.innerHTML=`Detectamos ${artigo} ${sex} de ${age} ${agetext}!`;

    const resultimg = form.querySelector("#divresult")
    resultimg.classList.add("result")
    if (age == 1) {
        if (sex === "Menina") {resultimg.style.backgroundImage = "url('imagens/imagens_pratica2/bebe-menina.jpg')";}
        else {resultimg.style.backgroundImage = "url('imagens/imagens_pratica2/bebe-menino.jpg')";}
    } else if (age < 12) {
        if (sex === "Menina") {resultimg.style.backgroundImage = "url('imagens/imagens_pratica2/menina.jpg')";}
        else {resultimg.style.backgroundImage = "url('imagens/imagens_pratica2/menino.jpg')";}
    } else if (age < 60) {
        if (sex === "Mulher") {resultimg.style.backgroundImage = "url('imagens/imagens_pratica2/mulher.jpg')";}
        else {resultimg.style.backgroundImage = "url('imagens/imagens_pratica2/homem.jpg')";}
    } else {
        if (sex === "Mulher") {resultimg.style.backgroundImage = "url('imagens/imagens_pratica2/idosa.jpg')";}
        else {resultimg.style.backgroundImage = "url('imagens/imagens_pratica2/idoso.jpg')";}
    }
};