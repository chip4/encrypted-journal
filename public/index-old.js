import flex from './app/flexbox.js';
import styled from './app/globals/styled-elements.js';
import CodeMirrorElem from './app/CodeMirrorElem.js'
import showdown from './app/globals/showdown.js';
import yo from './app/globals/yo-yo.js';

const savedData = ['test'];

var converter = new showdown.Converter();

const div = styled.div``;
function pre(data){
  return yo`<pre>${JSON.stringify(data, null, 2)}</pre>`;
}
let SavedDataEl = pre(savedData);

document.getElementById("app").appendChild(
  flex({flexDirection: 'column'},
    flex(
      flex({ flexGrow: 1 }, CodeMirrorElem({onChange, onSave})),
      flex({ flexGrow: 1 }, div({id: 'preview'}))
    ),
    flex(
      SavedDataEl
    )
  )
);

function onChange(instance) {
  console.log('CHANGE');
  document.getElementById("preview").innerHTML = converter.makeHtml(instance.doc.getValue());
};

function onSave(instance){
  console.log('SAVE');
  savedData.push({
    timestamp: new Date().toISOString(),
    data: instance.doc.getValue()
  })
  console.log("savedData",savedData);
  const newPre = pre(savedData);
  console.log("newPre",newPre);
  yo.update(SavedDataEl, newPre)
}