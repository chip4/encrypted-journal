import html from '../externals/choo-html.js';
import styled from '../externals/styled-elements.js';
import flexbox from '../components/flexbox.js'
import showdown from '../externals/showdown.js';
import CodeMirrorElem from '../components/CodeMirrorElem.js';
import editorHistoryList from '../components/editorHistoryList.js'
var converter = new showdown.Converter();

const prefix = 'editor';
const changeEvent = `${prefix}:change`;
const saveEvent = `${prefix}:save`;

const defaultEditorContents = `
# h1

## h2

* bullet
* bullet

1. number
2. number

\`asdfa\`
\`\`\`
function(){
  var a = 1;
  return a++;
}
\`\`\`
`;


export function editorStore(state, emitter){
  state.rawMd = defaultEditorContents;
  state.editorHistory = [];
  emitter.on(changeEvent, function(data){
    state.rawMd = data;
    emitter.emit('render');
  });
  emitter.on(saveEvent, function(data){
    const lastChange = state.editorHistory[state.editorHistory.length-1];
    if(lastChange && lastChange.fileContents === data){
      console.log("No Changes, Skip Save");
      return;
    }
    state.editorHistory.push({
      timestamp: new Date().toISOString(),
      fileContents: data
    });
    emitter.emit('render');
  });
}

const codeMirror = new CodeMirrorElem();

function preview(rawMd){
  const preview = styled(html`<div></div>`)`
  width: 100%;
  height: 100%;
  overflow: auto;
  `;
  preview.innerHTML = converter.makeHtml(rawMd);
  return preview;
}

const wrapper = styled(flexbox)`
height: 100%;
width: 100%;
overflow:hidden;
`;

export default function (state, emit){
  return wrapper(
    flexbox({ flexBasis: '20%' },
      editorHistoryList({
        history: state.editorHistory,
        handleClick: (entry) => emit(changeEvent, entry.fileContents)
      })
    ),
    flexbox({ flexGrow: 2 },
      codeMirror.render({onChange, onSave, value: state.rawMd})
    ),
    flexbox({ flexGrow: 2 },
      preview(state.rawMd)
    )
  );

  function onChange(instance) {
    emit(changeEvent, instance.doc.getValue());
  };

  function onSave(instance){
    emit(saveEvent, instance.doc.getValue());
  }
}