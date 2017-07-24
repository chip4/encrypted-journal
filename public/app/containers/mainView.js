import html from '../externals/choo-html.js';
import flexbox from '../components/flexbox.js'
import showdown from '../externals/showdown.js';
import codeMirrorElem from '../components/codeMirrorElem.js';
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
    state.editorHistory.push({
      timestamp: new Date().toISOString(),
      fileContents: data
    });
    emitter.emit('render');
  });
}

export default function (state, emit){
  const preview = html`<div></div>`;
  preview.innerHTML = converter.makeHtml(state.rawMd);
  return html`
    ${flexbox({flexDirection: 'column'},
      flexbox(
        flexbox({ flexGrow: 1 },
          editorHistoryList({
            history: state.editorHistory,
            handleClick: (entry) => console.log('handleclick', entry)
          })
        ),
        flexbox({ flexGrow: 2 },
          codeMirrorElem({onChange, onSave, value: state.rawMd})
        ),
        flexbox({ flexGrow: 2 },
          preview
        )
      )
    )}
  `;

  function onChange(instance) {
    emit(changeEvent, instance.doc.getValue());
  };

  function onSave(instance){
    emit(saveEvent, instance.doc.getValue());
  }
}