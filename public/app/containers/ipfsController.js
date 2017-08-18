import html from '../externals/choo-html.js';
import toggle from '../components/toggle.js';
import styled from '../externals/styled-elements.js';

export function store(state, emitter) {
  console.log("state",state);
}

const newToggle = styled(toggle)`
  color: blue;
`;

export default function render(state, emit){
  return html`
    <button class="w3-button w3-bar-item">
      ${toggle({scale: .6, handleToggle, value: state.value})}
      <img src="/assets/ipfs-logo-vector-white-outline.svg" height="24px" width="24px" />
    </button>
  `;

  // TODO run this through the store to do ipfs management. Make sure toggle state reflects ipfs status.
  function handleToggle(value){
    state.value = value;
    emit('render');
  }
}
