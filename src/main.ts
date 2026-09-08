import './style.css'
import { ConvexClient } from "convex/browser";
import { api } from "../convex/_generated/api";

const convex = new ConvexClient(import.meta.env.VITE_CONVEX_URL);

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

const nameInput = document.querySelector<HTMLInputElement>('#name-input')!;
const startButton = document.querySelector<HTMLButtonElement>('#start-button')!;

startButton.addEventListener('click', async () => {
  const name = nameInput.value;
  const startTime = Date.now();
  const x = Math.random() * 100;
  const y = Math.random() * 100;

  const visitorId = await convex.mutation(api.visitors.createVisitor, {
    name,
    startTime,
    x,
    y,
  });

  console.log(visitorId);
});