const form = document.getElementById("form");
let flag = true;
let canclick = false;

function showplayers() {
    let njoga = "";
    form.querySelectorAll("#num-jogadores input").forEach(inpu => { if (inpu.checked) { njoga = inpu.value } });

    for (let inputs = 1; inputs <= 4; inputs++) {
        if (inputs <= njoga) { form.querySelector(`#jogador${inputs}`).classList.remove("hide"); }
        else { form.querySelector(`#jogador${inputs}`).classList.add("hide"); }
    };

    form.querySelector(".start").classList.remove("hide");
};

function touppercase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
};

function calcular(inppagar, inpburracos, inppoints) {
    points1 = inppoints[0] + inpburracos[0] - inppagar[0];
    points2 = inppoints[1] + inpburracos[1] - inppagar[1];
    points3 = inppoints[2] + inpburracos[2] - inppagar[2];

    points = [points1, points2, points3];

    return points;
};

function dividPoints(points) {
    const solo = document.querySelector(".black-border");
    const idsolo = parseInt(solo.id.charAt(4));

    let psolo = points.splice(idsolo - 1, 1)[0];
    if (psolo == 0) { psolo = 0 }
    else if (psolo % 10 != 5 & psolo % 10 != 0) {
        let n = psolo % 10;
        if (n < 5) { psolo -= n }
        else { psolo += (10 - n) };
    };

    let pteam = points[0];
    if (pteam == 0) { pteam = 0 }
    else if (pteam % 10 != 5 & pteam % 10 != 0) {
        let n = pteam % 10;
        if (n < 5) { pteam -= n }
        else { pteam += (10 - n) };
    } else if (pteam % 10 == 5) { pteam += 5 };

    points = [];
    if (pteam != 0) { pteam = pteam / 2 };

    points.push(pteam, pteam);
    points.splice(idsolo - 1, 0, psolo);

    return points;
};

function start(event) {
    event.preventDefault();

    let njoga = "";
    form.querySelectorAll("#num-jogadores input").forEach(inpu => { if (inpu.checked) { njoga = inpu.value } });
    if (njoga < 2 || njoga > 4) { window.alert("É necessario selecionar a quantidade de jogadores!"); return }

    if (njoga == 3) { document.querySelector("#title").innerHTML = "Quem joga sozinho?" }
    else { document.querySelector("#title").innerHTML = "Adicionar pontos!" };

    form.classList.add("vanish");

    const container_cards = document.querySelector(".container-cards");

    let players = [];
    players.push(form.querySelector("#jogador1").value);
    players.push(form.querySelector("#jogador2").value);
    players.push(form.querySelector("#jogador3").value);
    players.push(form.querySelector("#jogador4").value);

    players = players.map((va, index) => { return va === "" ? `Player ${index + 1}` : touppercase(va) });

    if (njoga == 4) {
        players = players.sort(() => Math.random() - 0.5);
        let team1 = `${players[0]}<br>${players[1]}`;
        let team2 = `${players[2]}<br>${players[3]}`;
        container_cards.querySelector("#card1 h2").innerHTML = team1;
        container_cards.querySelector("#card1 h2").style.textAlign = "center";
        container_cards.querySelector("#card2 h2").innerHTML = team2;
        container_cards.querySelector("#card2 h2").style.textAlign = "center";
    } else { players.forEach((nom, index) => { if (index != 3) { container_cards.querySelector(`#card${index + 1} h2`).innerHTML = nom } }) };

    container_cards.classList.remove("hide");

    if (njoga == 3) {
        const back_border = document.createElement("button");
        back_border.classList.add("back-border");
        back_border.classList.add("appear-cards");
        container_cards.appendChild(back_border);
        back_border.style.opacity = "0";
        back_border.addEventListener("click", () => {
            container_cards.querySelectorAll(".card input").forEach(inpu => { inpu.disabled = true });
            document.querySelector("#title").innerHTML = "Quem joga sozinho?";
            back_border.style.opacity = "0";
            container_cards.querySelector(".black-border").classList.remove("black-border");
            container_cards.querySelectorAll(".card > span").forEach(sp => { sp.style.opacity = "1" });

            container_cards.querySelectorAll("input").forEach(inp => {inp.value = ""});
        });
        container_cards.querySelectorAll("input").forEach(inp => { inp.addEventListener("click", (event) => { event.stopPropagation() }) });
        if (njoga == 3) { container_cards.querySelectorAll(".card input").forEach(inpu => { inpu.disabled = true }) };

        container_cards.querySelector("#card3").style.left = "30%";
        container_cards.querySelectorAll(".card").forEach(c => {
            c.style.borderColor = "white";
            c.addEventListener("click", () => {
                if (container_cards.querySelector(".black-border")) { return };

                container_cards.querySelectorAll(".card input").forEach(inpu => { inpu.disabled = false });

                back_border.style.opacity = "1";

                document.querySelector("#title").innerHTML = "Adicionar pontos!";
                container_cards.querySelectorAll(".card").forEach(c2 => { c2.classList.remove("black-border") });
                c.classList.add("black-border");

                let inps1 = container_cards.querySelector(".inps1");
                let inps2 = container_cards.querySelector(".inps2");
                let inps3 = container_cards.querySelector(".inps3");
                let inps = [inps1, inps2, inps3];
                inps.forEach(inp => { inp.style.opacity = "1" });
                let id = c.id.charAt(4);
                inps.splice(id - 1, 1);
                inps[1].style.opacity = "0";
            });
        });
    } else {
        container_cards.querySelectorAll("#card1, #card2").forEach(c => { c.style.marginBlock = "35%" });
        container_cards.querySelector("#card3").style.display = "none";
    };
    for (let cards = 1; cards < 4; cards++) {
        if (cards <= njoga) { container_cards.querySelector(`#card${cards}`).classList.remove("hide") }
        else { container_cards.querySelector(`#card${cards}`).classList.add("hide") };
    };
    container_cards.querySelectorAll(".card").forEach((c, index) => { c.classList.add(`card-shape-${index + 1}`) });

    container_cards.classList.add("appear-cards");

    const button2 = document.createElement("button");
    button2.classList.add("start");
    button2.classList.add("position-button2");
    container_cards.appendChild(button2);

    var totpoints = [];
    button2.addEventListener("click", () => {
        canclick = true;

        let inppay1 = container_cards.querySelector("#pagar-p1").value;
        let inppay2 = container_cards.querySelector("#pagar-p2").value;
        let inpburraco1 = container_cards.querySelector("#burraco-p1").value;
        let inpburraco2 = container_cards.querySelector("#burraco-p2").value;
        let inpponto1 = container_cards.querySelector("#ponto-p1").value;
        let inpponto2 = container_cards.querySelector("#ponto-p2").value;

        var inppay3 = 0;
        var inpburraco3 = 0;
        var inpponto3 = 0;

        if (njoga == 3) {
            container_cards.querySelectorAll(".card input").forEach(inpu => { inpu.disabled = true });
            document.querySelector("#title").innerHTML = "Quem joga sozinho?";
            container_cards.querySelectorAll(".card > span").forEach(sp => { sp.style.opacity = "1" });

            var inppay3 = container_cards.querySelector("#pagar-p3").value;
            var inpburraco3 = container_cards.querySelector("#burraco-p3").value;
            var inpponto3 = container_cards.querySelector("#ponto-p3").value;
        };
        let inppagar = [inppay1, inppay2, inppay3];
        let inpburracos = [inpburraco1, inpburraco2, inpburraco3];
        let inppoints = [inpponto1, inpponto2, inpponto3];

        inppagar = inppagar.map(va => va === "" ? 0 : parseInt(va) || 0);
        inpburracos = inpburracos.map(va => va === "" ? 0 : parseInt(va) || 0);
        inppoints = inppoints.map(va => va === "" ? 0 : parseInt(va) || 0);
        points = calcular(inppagar, inpburracos, inppoints);

        if (njoga == 3) {points = dividPoints(points)};

        totpoints = points.map((value, index) => { return totpoints[index] ? totpoints[index] + value : value });

        container_cards.querySelector("#card1 p").innerHTML = totpoints[0];
        container_cards.querySelector("#card2 p").innerHTML = totpoints[1];
        container_cards.querySelector("#card3 p").innerHTML = totpoints[2];

        container_cards.querySelectorAll(".card input").forEach(inp => { inp.value = "" });

        var winners = [0, 0, 0];
        totpoints.map((va, index) => { if (va >= 2005) { winners[index] = va } });

        let winner = 2004;
        if (winners.forEach(va => { if (va > winner) { winner = va; } }));
        if (winner != 2004) {
            let descosecond = totpoints.slice();
            descosecond.splice(descosecond.indexOf(Math.max(...descosecond)), 1);
            let diference = Math.max(...descosecond);
            diference = winner - diference;

            winner = winners.indexOf(winner);
            winner = document.querySelector(`#card${winner + 1}`);

            win(winner, diference, njoga);

            button2.classList.add("hide");
        };
        if (njoga == 3) {
            container_cards.querySelector(".black-border").classList.remove("black-border");
            container_cards.querySelector(".back-border").style.opacity = "0";
        };

        const container_back = document.querySelector(".container-back");
        const back = document.createElement("button");
        if (flag) {
            container_back.classList.add("container-back");
            back.classList.add("back");
            container_back.appendChild(back);
            container_back.classList.remove("hide");

            flag = false;
            back.classList.add("appear-back");
        };
        back.addEventListener("click", () => {
            if (canclick) {
                back.classList.remove("appear-back");

                back.classList.add("back-action");
                setTimeout(() => { back.classList.remove("back-action") }, 1000);

                totpoints = totpoints.map((va, index) => va - points[index]);
                container_cards.querySelector("#card1 p").innerHTML = totpoints[0];
                container_cards.querySelector("#card2 p").innerHTML = totpoints[1];
                container_cards.querySelector("#card3 p").innerHTML = totpoints[2];

                canclick = false;
            };
        });
    });
};

function win(winner, diference, njoga) {
    winner.classList.add("winner")
    document.querySelectorAll(".card:not(.winner)").forEach(c => { c.classList.add("hide") });
    winner.querySelector(".input-pontos").classList.add("hide");
    winner.querySelector("h2").style.fontSize = "2.5em";
    winner.querySelector("h2").style.lineHeight = "40px";

    document.querySelector(".winner > span").classList.add("hide");

    const winner_text = document.createElement("p");
    if (njoga == 4) {
        winner_text.innerHTML = "VENCEDORES";
        winner.querySelector("h2").style.textAlign = "center";
        document.querySelector("#title").innerHTML = "VENCEDORES";
    };
    winner_text.innerHTML = `Com vantagem de ${diference} pontos!`;
    document.querySelector("#title").innerHTML = "VENCEDOR";
    document.querySelector("#card1").style.marginBlock = "0px";
    document.querySelector("#card2").style.marginBlock = "0px";

    winner_text.style.width = "100%";
    winner_text.style.fontSize = "1.8em";
    winner_text.style.marginBottom = "30px";
    winner_text.style.fontWeight = "bold";
    winner_text.style.textAlign = "center";
    winner.appendChild(winner_text);

    document.querySelector(".winner .points").style.marginBottom = "135px";

    document.querySelector(".start").classList.add("hide");
    setTimeout(() => {location.reload()}, 6000);
};
