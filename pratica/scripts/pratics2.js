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
    } else if (age == 1) {agetext = "ano"}

    let artigo = "uma"
    if (sex == "Homem") {artigo = "um"}
    const divresult = form.querySelector("#result")
    divresult.innerHTML=`Detectamos ${artigo} ${sex} de ${age} ${agetext}!`;
};