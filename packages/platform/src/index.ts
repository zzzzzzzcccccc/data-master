function renderPlatform() {
  const ul = document.createElement('ul')
  const platformConfigurations = [{ label: 'Mac', path: './macos.html' }]

  platformConfigurations.forEach(({ label, path }) => {
    const li = document.createElement('li')
    const a = document.createElement('a')

    a.href = `javascript:void(0);`
    a.innerText = label
    a.onclick = () => {
      window.location.replace(path)
    }

    li.appendChild(a)
    ul.appendChild(li)
  })

  return ul
}

function renderTitle() {
  const h1 = document.createElement('h1')

  h1.innerText = 'Choose your platform'

  return h1
}

function bootstrap() {
  const root = document.getElementById('root')

  if (root) {
    ;[renderTitle(), renderPlatform()].forEach((element) => {
      root.appendChild(element)
    })
  }
}

bootstrap()
