import html from '../externals/choo-html.js';
import flexbox from '../components/flexbox.js'
import showdown from '../externals/showdown.js';
import codeMirrorElem from '../components/codeMirrorElem.js';
var converter = new showdown.Converter();

const prefix = 'editor';
const changeEvent = `${prefix}:change`;
const saveEvent = `${prefix}:save`;

export function editorStore(state, emitter){
  console.log("state",JSON.stringify(state.events.RENDER));
  console.log("state.nav",state.events.NAVIGATE);
  emitter.on(changeEvent, function(data){
    console.log(changeEvent, data);
  });
  emitter.on(saveEvent, function(data){
    console.log(saveEvent, data);
    console.log("state.events",state.events);
    console.log("state.events.RENDER",state.events.RENDER);
    emitter.emit(state.events.RENDER);
  });
}

export default function (state, emit){
  console.log("state.events",state.events);
  return html`
    ${flexbox({flexDirection: 'column'},
      flexbox(
        flexbox({ flexGrow: 1 },
          codeMirrorElem({onChange, onSave})
        ),
        flexbox({ flexGrow: 1 },
          html`<div id="preview"></div>`
        )
      )
    )}
  `;

  function onChange(instance) {
    console.log('CHANGE');
    emit(changeEvent, instance.doc.getValue());
    document.getElementById("preview").innerHTML = converter.makeHtml(instance.doc.getValue());
  };

  function onSave(instance){
    console.log('SAVE');
    emit(saveEvent, instance.doc.getValue());
  }
}