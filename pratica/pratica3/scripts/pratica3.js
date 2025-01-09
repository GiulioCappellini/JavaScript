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

function touppercase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
};

function dividPoints(points) {
    points.map(va => { if (va == "") {va = 0}});
    const solo = document.querySelector(".black-border");
    const idsolo = parseInt(solo.id.charAt(4));

    let psolo = parseInt(points.splice(idsolo - 1, 1)[0]);
    if (psolo == 0) {psolo = 0}
    else if (psolo % 10 != 5 & psolo % 10 != 0) {
        let n = psolo % 10;
        if (n < 5) {psolo -= n}
        else {psolo += (10 - n)};   
    };

    let pteam = parseInt(points[0]);
    if (pteam == 0) {pteam = 0}
    else if (pteam % 10 != 5 & pteam % 10 != 0) {
        let n = pteam % 10;
        if (n < 5) {pteam -= n}
        else {pteam += (10 - n)};
    } else if (pteam % 10 == 5) {pteam += 5};

    points = [];
    if (pteam != 0) {pteam = pteam / 2};
    
    points.push(pteam, pteam);
    points.splice(idsolo - 1, 0, psolo);

    return points;
};

function start(event) {
    event.preventDefault();

    let njoga = "";
    form.querySelectorAll("#num-jogadores input").forEach(inpu => {if (inpu.checked) {njoga = inpu.value}});
    if (njoga < 2 || njoga > 4) {window.alert("É necessario selecionar a quantidade de jogadores!"); return}

    if (njoga == 3) {document.querySelector("#title").innerHTML="Quem joga sozinho?"}
    else {document.querySelector("#title").innerHTML="Adicionar pontos!"};

    form.classList.add("vanish");
    
    const container_cards = document.querySelector(".container-cards");

    let players = [];
    players.push(touppercase(form.querySelector("#jogador1").value));
    players.push(touppercase(form.querySelector("#jogador2").value));
    players.push(touppercase(form.querySelector("#jogador3").value));
    players.push(touppercase(form.querySelector("#jogador4").value));

    players = players.map((va, index) => {return va === "" ? `Player ${index + 1}` : va});

    if (njoga == 4) {
        players = players.sort(() => Math.random() - 0.5);
        let team1 = `${players[0]} e ${players[1]}`;
        let team2 = `${players[2]} e ${players[3]}`;
        container_cards.querySelector("#card2 h2").innerHTML=team1;
        container_cards.querySelector("#card4 h2").innerHTML=team2;
    } else {players.forEach((nom, index) => {container_cards.querySelector(`#card${index + 1} h2`).innerHTML=nom})};
    
    container_cards.classList.remove("hide")

    if (njoga == 4) {
        container_cards.querySelectorAll(".card").forEach(c => {
            if ("13".includes(c.id.charAt(4))) {
                c.style.display="none";
            } else if (c.id.charAt(4) == 2) {
                c.style.width="60%";
                c.style.left="50%";
                c.style.top="5%";
                c.style.transform="translate(-50%, -5%)";
            } else {
                c.style.width="60%";
                c.style.left="50%";
                c.style.top="95%";
                c.style.transform="translate(-50%, -95%)";
            };
        })
    } else if (njoga == 3) {
        const back = document.createElement("button");
        back.classList.add("back");
        back.classList.add("appear-cards");
        container_cards.appendChild(back);
        back.style.opacity="0";
        back.addEventListener("click", () => {
            back.style.opacity="0";
            container_cards.querySelector(".black-border").classList.remove("black-border");
            container_cards.querySelectorAll(".card input").forEach(inp => {inp.style.opacity="1"});
        });
        container_cards.querySelectorAll("input").forEach(inp => {inp.addEventListener("click", (event) => {event.stopPropagation()});
    });
        let input1 = container_cards.querySelector("#ponto-p1");
        let input2 = container_cards.querySelector("#ponto-p2");
        let input3 = container_cards.querySelector("#ponto-p3");
        
        if (njoga == 3) {container_cards.querySelectorAll(".card input").forEach(inpu => {inpu.disabled=true})};

        container_cards.querySelector("#card3").style.left="30%";
        container_cards.querySelectorAll(".card").forEach(c => {
            c.style.borderColor="white";
            c.addEventListener("click", () => {
                if (container_cards.querySelector(".black-border")) {return};

                container_cards.querySelectorAll(".card input").forEach(inpu => {inpu.disabled=false});
                
                back.style.opacity="1";

                document.querySelector("#title").innerHTML="Adicionar pontos!";
                container_cards.querySelectorAll(".card").forEach(c2 => {c2.classList.remove("black-border")});
                c.classList.add("black-border");

                let inputs = [input1, input2, input3];
                inputs.forEach(inp => {inp.style.opacity="1"});
                let id = c.id.charAt(4);
                inputs.splice(id - 1, 1);
                inputs[1].style.opacity="0";
                inputs[1].value="";
            });
        });
    } else {container_cards.querySelectorAll("#card1, #card2").forEach(c => {c.style.marginBlock="35%"})};

    for (let cards = 1; cards <= 4; cards++) {
        if (cards <= njoga) {container_cards.querySelector(`#card${cards}`).classList.remove("hide")}
        else {container_cards.querySelector(`#card${cards}`).classList.add("hide")};
    };
    container_cards.querySelectorAll(".card").forEach((c, index) => {c.classList.add(`card-shape-${index + 1}`)});

    container_cards.classList.add("appear-cards");

    const button2 = document.createElement("button");
    button2.classList.add("start");
    button2.classList.add("position-button2");
    container_cards.appendChild(button2);

    const input_c1 = container_cards.querySelector("#card1 input");
    const input_c2 = container_cards.querySelector("#card2 input");
    const input_c3 = container_cards.querySelector("#card3 input");
    const input_c4 = container_cards.querySelector("#card4 input");

    var totpoints = [];
    button2.addEventListener("click", () => {
        if (njoga == 3) {
            container_cards.querySelectorAll(".card input").forEach(inpu => {inpu.disabled=true});
            document.querySelector(".back").style.opacity="0";
            document.querySelector("#title").innerHTML="Quem joga sozinho?";
            container_cards.querySelectorAll(".card input").forEach(inp => {inp.style.opacity="1"});
        };
        let points = [];
        points.push(input_c1.value, input_c2.value);

        if (njoga == 3) {
            points.push(input_c3.value);
        } else if (njoga == 4) {points.push(input_c3.value, input_c4.value)};

        if (njoga == 3) {points = dividPoints(points);};

        totpoints = points.map((va, index) => {
            let value = va === "" ? 0 : +va;
            return totpoints[index] ? totpoints[index] + value : value;
        });

        container_cards.querySelector("#card1 p").innerHTML=totpoints[0];
        container_cards.querySelector("#card2 p").innerHTML=totpoints[1];
        container_cards.querySelector("#card3 p").innerHTML=totpoints[2];
        container_cards.querySelector("#card4 p").innerHTML=totpoints[3];

        container_cards.querySelectorAll(".card input").forEach(inp => {inp.value=""});

        var winners = [0, 0, 0, 0];
        totpoints.map((va, index) => {if (va >= 2005) {winners[index] = va}});

        let winner = 2004;
        if (winners.forEach(va => {if (va > winner) {winner = va;}}));
        if (winner != 2004) {
            winner = winners.indexOf(winner);
            winner = document.querySelector(`#card${winner + 1}`);
            win(winner, njoga);
            button2.classList.add("hide");
        };
        container_cards.querySelector(".black-border").classList.remove("black-border");
    });
};

function win(winner, njoga) {
    winner.classList.add("winner")
    document.querySelectorAll(".card:not(.winner)").forEach(c => {c.classList.add("hide")});
    winner.querySelector(".input-pontos").classList.add("hide");
    winner.querySelector("h2").style.fontSize="2.5em";

    const winner_text = document.createElement("p");
    if (njoga == 4) {
        winner_text.innerHTML="VENCEDORES";
        winner.querySelector("h2").style.textAlign="center";
    } else {winner_text.innerHTML="VENCEDOR";};
    if (njoga == 2) {document.querySelector("#card1").style.marginBlock="0px"; document.querySelector("#card2").style.marginBlock="0px"};

    document.querySelector("#title").innerHTML="Burraco";

    winner_text.classList.add("winner-text");
    winner_text.style.marginBottom="30px";
    winner_text.style.fontWeight="bold";
    winner.appendChild(winner_text);

    document.querySelector(".start").classList.add("hide");
    setTimeout(() => {location.reload()}, 5000);
};
