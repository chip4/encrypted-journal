import html from '../externals/choo-html.js';
import toggle from '../components/toggle.js';
import styled from '../externals/styled-elements.js';
import * as ipfs from '../utils/ipfs.js';

const prefix = 'ipfsController:';
export const events = {
  ifpsToggle: `${prefix}toggle`
};

export function store(state, emitter) {
  // TODO error handling if ipfs can't go online
  ipfs.registerObserver((event) => emitter.emit(event));
  emitter.on(ipfs.events.stopped, () => emitter.emit('render'));
  emitter.on(ipfs.events.started, () => emitter.emit('render'));
  emitter.on(events.ifpsToggle, (value) => {
    if(value === true){
      ipfs.start()
        .then(() => emitter.emit('render'))
    }else{
      ipfs.stop()
        .then(() => emitter.emit('render'))
    }
  });
}

const newToggle = styled(toggle)`
  color: blue;
`;

export default function render(state, emit){
  return html`
    <button class="w3-button w3-bar-item" onclick=${() => handleToggle(!ipfs.isOnline())}>
      ${toggle({scale: .6, handleToggle, value: ipfs.isOnline()})}
      <img src="/assets/ipfs-logo-vector-white-outline.svg" height="24px" width="24px" />
    </button>
  `;

  function handleToggle(value){
    emit(events.ifpsToggle, value);
  }
}
