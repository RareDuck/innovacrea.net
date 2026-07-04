// CHANGES THE HEADER FONT AFTER LOADING
document.addEventListener("DOMContentLoaded", camaleon)
function camaleon() {
  let i = 0
 
  let fams = [
  "timesnew",
  "retro",
  "metal",
  "authoritarian"]
  fams = fams.concat(fams.concat(fams.concat(["retro"])))

  let intervalo = setInterval(() => {
    document.getElementById("camaleon").style.fontFamily =  fams[i]
    i++
    if (i >= fams.length) {
      clearInterval(intervalo)
    }
  }, 100)
}
// MAKES THE COOL >>>> TRANSITION AFTER CLICKING A LINK
const a_elements = document.getElementsByTagName("a")

for (let i = 0; i < a_elements.length; i++) {
  a_elements[i].addEventListener("click", fade)
  console.log(a_elements[i].textContent)
}

function fade(evento) {
  evento.preventDefault()
  
  console.log("peventdefault se ejecuta")
  let element = this
  let i = 0
  let interval = setInterval(function() {
    fader(element, '>')
    fader(document.getElementById("camaleon"), '<')
    i++
    if (i >= element.textContent.length) {
      window.location.href = element.href
      clearInterval(interval)
    }
  }, 100)
}

function fader(element, character) {
  let string = element.textContent
  let stringcp = ""
  let newchar = false
  for (let i = 0; i < string.length; i++) {
    if (string[i] != character && newchar == false ){
      stringcp += character
      newchar = true
    }
    else {
      stringcp += string[i]
    }
  }
  element.textContent = stringcp
}
