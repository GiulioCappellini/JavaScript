const form = document.getElementById("form");


function showplayers() {
    let njoga = "";
    form.querySelectorAll("#num-jogadores input").forEach(inpu => {if (inpu.checked) {njoga = inpu.value}});

    for (let inputs = 1; inputs <= 4; inputs++) {
        if (inputs <= njoga) {form.querySelector(`#jogador${inputs}`).classList.remove("hide");}
        else {form.querySelector(`#jogador${inputs}`).classList.add("hide");}
    };

    form.querySelector(".start").classList.remove("hide");
};

function start(event) {
    event.preventDefault();
    
    let njoga = "";
    form.querySelectorAll("#num-jogadores input").forEach(inpu => {if (inpu.checked) {njoga = inpu.value}});
    if (njoga > "4" || njoga < "2") {window.alert("É necessario selecionar a quantidade de jogadores!"); return}

    function touppercase(str) {return str.charAt(0).toUpperCase() + str.slice(1);};

    document.querySelector("#title").innerHTML="Burraco";

    
    form.classList.add("vanish");
    
    const container_cards = document.querySelector(".container-cards");

    container_cards.querySelector("#card1 h2").innerHTML=touppercase(form.querySelector("#jogador1").value);
    container_cards.querySelector("#card2 h2").innerHTML=touppercase(form.querySelector("#jogador2").value);
    container_cards.querySelector("#card3 h2").innerHTML=touppercase(form.querySelector("#jogador3").value);
    container_cards.querySelector("#card4 h2").innerHTML=touppercase(form.querySelector("#jogador4").value);

    container_cards.classList.remove("hide")
    if (njoga == 3) {
        container_cards.querySelector("#card3").style.left="30%";
        container_cards.querySelectorAll(".card").forEach(c => {
            c.style.borderColor="white";
            c.addEventListener("click", () => {
                container_cards.querySelectorAll(".card").forEach(c2 => {c2.classList.remove("red-border")})
                c.classList.add("red-border")
            })
        })
    } else if (njoga == 2) {
        container_cards.querySelectorAll("#card1, #card2").forEach(c => {c.style.marginBlock="35%"})
    }
    for (let cards = 1; cards <= 4; cards++) {
        if (cards <= njoga) {container_cards.querySelector(`#card${cards}`).classList.remove("hide")}
        else {container_cards.querySelector(`#card${cards}`).classList.add("hide")}
    };

    container_cards.querySelectorAll(".card").forEach((c, index) => {
        c.classList.add(`card-shape-${index + 1}`)
    })

    container_cards.classList.add("appear-cards")

    const button2 = document.createElement("button")
    button2.classList.add("start")
    button2.classList.add("position-button2")
    container_cards.appendChild(button2)

    const input_c1 = container_cards.querySelector("#card1 input");
    const input_c2 = container_cards.querySelector("#card2 input");
    const input_c3 = container_cards.querySelector("#card3 input");
    const input_c4 = container_cards.querySelector("#card4 input");

    var totpoints = [];
    button2.addEventListener("click", () => {
        let points = [];
        points.push(input_c1.value, input_c2.value);
        if (njoga == 3) {points.push(input_c3.value)}
        else if (njoga == 4) {points.push(input_c3.value, input_c4.value)}

        totpoints = points.map((va, index) => {
            let value = va === "" ? 0 : +va;
            return totpoints[index] ? totpoints[index] + value : value;
        });

        container_cards.querySelector("#card1 p").innerHTML=totpoints[0];
        container_cards.querySelector("#card2 p").innerHTML=totpoints[1];
        container_cards.querySelector("#card3 p").innerHTML=totpoints[2];
        container_cards.querySelector("#card4 p").innerHTML=totpoints[3];

        container_cards.querySelectorAll(".card input").forEach(inp => {inp.value=""});

        var winners = [0, 0, 0, 0]
        totpoints.map((va, index) => {
            if (va >= 2005) {winners.splice(index, 1, va); win(winners)}
        })
    });
};

function win(winners) {
    let winner = 0;
    winners.forEach((va, index) => {if (va > winner) {winner = index + 1}});

    winner = document.querySelector(`#card${winner}`);

    winner.classList.add("winner")
    document.querySelectorAll(`.card:not(.winner)`).forEach(c => {c.classList.add("hide")});
    winner.querySelector(".input-pontos").classList.add("hide")
    winner.querySelector("p").style.marginBottom="20px";

};


// falta fazer a função de sortear equipes, compartilhar e dividir os pontos e mudar a gameplay dependendo da quantidade de jogadores
// PRIORIDADE: terminar a personalização do player que ganhou!