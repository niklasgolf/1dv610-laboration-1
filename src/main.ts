import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="control-bar">
    <div class="controls-left">
      <input
        id="name-input"
        type="text"
        placeholder="Skriv ditt namn"
      />

      <button id="start-button" type="button">
        Start
      </button>

      <button id="stop-button" type="button">
        Stop
      </button>
    </div>

    <div class="status-area">
      <span class="connection-status">● Connected</span>
      <span class="visitor-count">0 visitors online</span>
    </div>
  </header>

  <main class="visitor-area">
    <p>Visitor area</p>
  </main>
`