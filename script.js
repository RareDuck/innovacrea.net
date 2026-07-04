// CHANGES THE HEADER FONT AFTER LOADING
document.addEventListener("DOMContentLoaded", camaleon)
function camaleon() {
  let i = 0
 
  let fams = [
  "timesnew",
  "retro",
  "metal",
  "authoritarian",]
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
}

function fade(evento) {
  evento.preventDefault()
  
  ler interval = setInterval(function() {
    fader(this, '<')
  } , 100)
  window.location.href = this.href
}

function fader(element, character) {
  let string = element.textContent
  for (let i = 0; i < string.length; i++) {
    if (string[i] != character) {
      string[i] = character
      break
    }
  }
  element.textContent = string
}
