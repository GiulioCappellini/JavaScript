function multar(velocidade) {
    if (velocidade > 50) {
        return false;
    } else {
        return true;
    }
};
var valor = multar(51)
if (!valor) {
    console.log("Você ultrapassou o limite permitido. MULTADO!")
} else {
    console.log("Continue dirigindo com seurança!")
}
// O jeito a seguir retornará "undefined"
// console.log(multar(52))
// isso acontece porque o console.log espera um valor boleano(true or false) e utilizar-lo assim não cumpre seu requisito, o correto é atribuir um valor boleano a uma variavel e executar o comando dependendo do valor.
