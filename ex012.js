var date = new Date()
var hour = date.getHours()
console.log(`Agora são exatamente ${hour} horas`)
if (hour > 0 && hour < 5) {console.log("Boa madurgada!")}
else if (hour < 12) {console.log("Bom dia!")}
else if (hour < 18) {console.log("Boa tarde!")}
else {console.log("Boa noite!")}