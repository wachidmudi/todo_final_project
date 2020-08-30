// Get name
let inputName = document.getElementById('input-name')
let buttonName = document.getElementById('button-name')

buttonName.addEventListener('click', () => {
  if (inputName.value.length) {
    setName(inputName.value)
    window.location.href = 'app.html'
  }
})

inputName.addEventListener('keyup', ({ key }) => {
  if (key === 'Enter') {
    if (inputName.value.length) {
      window.location.href = 'app.html'
    }
  }
})

function setName(name) {
  localStorage.clear();
  localStorage.setItem('name', name)
}
