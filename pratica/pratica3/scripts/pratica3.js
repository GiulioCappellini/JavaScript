const form = document.getElementById("form");

function showplayers() {
    var njoga = "";
    form.querySelectorAll("#num-jogadores input").forEach(inpu => {if (inpu.checked) {njoga = inpu.value}});

    switch (njoga) {
        case "4":
            form.querySelectorAll("#nome-jogadores input").forEach(inpu => {inpu.classList.remove("hide")});
            break;
        case "3":
            for (let inputs = 1; inputs <= njoga; inputs++) {
                form.querySelector(`#jogador${inputs}`).classList.remove("hide");
                while (inputs >= njoga & inputs < "4") {inputs++; form.querySelector(`#jogador${inputs}`).classList.add("hide")};
            };
            break;
        case "2":
            for (let inputs = 1; inputs <= njoga; inputs++) {
                form.querySelector(`#jogador${inputs}`).classList.remove("hide");
                while (inputs >= njoga & inputs < "4") {inputs++; form.querySelector(`#jogador${inputs}`).classList.add("hide")};
            };
            break;
    };

    form.querySelector("#div-start").classList.remove("hide");
};

function start(event) {
    event.preventDefault();

    form.querySelector(".start").classList.add("vanish")

    function touppercase(str) {return str.charAt(0).toUpperCase() + str.slice(1);}

    var player1 = touppercase(form.querySelector("#jogador1").value);
    var player2 = touppercase(form.querySelector("#jogador2").value);
    var player3 = touppercase(form.querySelector("#jogador3").value);
    var player4 = touppercase(form.querySelector("#jogador4").value);

};
