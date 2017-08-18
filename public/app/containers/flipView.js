import html from '../externals/choo-html.js';
import styled from '../externals/styled-elements.js';
import flexbox from '../components/flexbox.js'
import CodeMirrorElem from '../components/CodeMirrorElem.js';
import preview from '../components/markdownPreview.js';
import ipfsController, { store as ipfsStore } from '../containers/ipfsController.js';
import * as ipfs from '../utils/ipfs.js';

const codeMirror = new CodeMirrorElem();

const codeMirrorWrap = styled(flexbox)`
  overflow: auto;
`;

const wrap = styled.div`
  width: 100%;
  height: 95vh;
`;

const prefix = 'flip';
const swapEvent = `${prefix}:swap`;
const changeEvent = `${prefix}:change`;

function swapBtn(onclick){
  return html`
  <button class="w3-button w3-bar-item" onclick=${onclick}>
    <i class="material-icons" title="Swap between editor and viewer">swap_horiz</i>
  </button>
  `;
}

export function store(state, emitter){
  state.ipfs = {};
  ipfsStore(state.ipfs, emitter);

  state.editorActive = true;
  state.editorContents = '';
  emitter.on(swapEvent, () => {
    state.editorActive = !state.editorActive;
    emitter.emit('render');
  });
  emitter.on(changeEvent, (data) => {
    state.editorContents = data;
    emitter.emit('render');
  });
}

export default function(state, emit) {
  const lockIcon = html`<i class="material-icons">lock_open</i>`;// TODO toggle
  return html`
  ${wrap(
    html`
    <div class="w3-bar w3-grey">
      ${flexbox(
        html`<button class="w3-button w3-bar-item"><i class="material-icons">menu</i></button>`,
        flexbox({flexGrow:1}),
        ipfsController(state.ipfs, emit),
        html`<button class="w3-button w3-bar-item"><i class="material-icons" title="Publish">cloud_upload</i></button>`,
        html`<button class="w3-button w3-bar-item" title="Unencrypted">${lockIcon}</button>`,
        swapBtn(() => emit(swapEvent))
      )}
    </div>
    `,
    (state.editorActive) ?
      codeMirrorWrap(codeMirror.render({onChange, onSave, value: state.editorContents}))
    :
      preview(state.editorContents)
  )}
  `;

  function onChange(instance) {
    emit(changeEvent, instance.doc.getValue());
  };

  function onSave(instance){
    ipfs.start()
      .then(() => ipfs.add(instance.doc.getValue()))
      .then(ipfs.stop)
      .then((stopTime) => {
        console.log("stopTime",stopTime);
      })
      .catch((err) => {
        console.log("save err", err);
      });
  }
}