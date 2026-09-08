import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="control-bar">
    <p>Testar text i headern</p>
  </header>

  <main class="visitor-area">
    <p>Testar text i visitor-området</p>
  </main>
`