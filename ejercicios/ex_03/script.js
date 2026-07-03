let fams = [
  "timesnew",
  "retro",
  "metal",
  "authoritarian",
]
fams = fams.concat(fams.concat(fams.concat(["timesnew"])))

document.addEventListener("DOMContentLoaded", () => {
  let i = 0
  
  let intervalo = setInterval(() => {
  document.getElementById("camaleon").style.fontFamily =  fams[i]
  i++
  if (i >= fams.length) {
    clearInterval(intervalo)
  }
  }, 100)
})
