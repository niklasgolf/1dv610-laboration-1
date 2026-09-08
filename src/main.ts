import './style.css'
import { ConvexClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import type { Id } from "../convex/_generated/dataModel";

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
const stopButton = document.querySelector<HTMLButtonElement>('#stop-button')!;
const visitorArea = document.querySelector<HTMLElement>('.visitor-area')!;

let currentVisitorId: Id<"visitors"> | null = null;

startButton.addEventListener('click', async () => {

  if (currentVisitorId) {
    return;
  }

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
  
  currentVisitorId = visitorId;

  console.log(visitorId);
});

stopButton.addEventListener('click', async () => {
  if (!currentVisitorId) {
    return;
  }

  await convex.mutation(api.visitors.removeVisitor, {
    id: currentVisitorId,
  });

  currentVisitorId = null;
});

let currentVisitors: any[] = [];

function renderVisitors() {
  visitorArea.innerHTML = '';

  currentVisitors.forEach((visitor) => {
    const visitorDiv = document.createElement('div');

    visitorDiv.className = 'visitor';

    visitorDiv.style.left = `${visitor.x}%`;
    visitorDiv.style.top = `${visitor.y}%`;

    const seconds = Math.floor((Date.now() - visitor.startTime) / 1000);

    visitorDiv.innerHTML = `
      <div>${visitor.name}</div>
      <div>${seconds} s</div>
    `;

    visitorArea.appendChild(visitorDiv);
  });
}

convex.onUpdate(api.visitors.getVisitors, {}, (visitors) => {
  currentVisitors = visitors;
  renderVisitors();
});

setInterval(() => {
  renderVisitors();
}, 1000);