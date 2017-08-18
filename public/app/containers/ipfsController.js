import html from '../externals/choo-html.js';
import toggle from '../components/toggle.js';
import styled from '../externals/styled-elements.js';

export function store(state, emitter) {
  console.log("state",state);
}

const newToggle = styled(toggle)`
  color: blue;
`;

console.log("toggle",toggle);//, toggle({scale: 1}), newToggle());

//TODO hook up toggle
export default function render(state, emit){
  return html`
    <button class="w3-button w3-bar-item">
      ${toggle({scale: .6})}
      <img src="/assets/ipfs-logo-vector-white-outline.svg" height="24px" width="24px" />
    </button>
  `;
}
