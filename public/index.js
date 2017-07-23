import flex from './app/flexbox.js';
import styled from './app/globals/styled-elements.js';
import CodeMirrorElem from './app/CodeMirrorElem.js'
import CodeMirror from './app/globals/CodeMirror.js'

const div = styled.default.div``;

document.getElementById("app").appendChild(
  flex(
    flex({ flexGrow: 1 }, CodeMirrorElem(onSave)),
    flex({ flexGrow: 1 }, div({id: 'preview'}))
  )
);

var converter = new showdown.Converter();

function onSave(instance) {
  console.log('SAVE', instance.doc.getValue());
  document.getElementById("preview").innerHTML = converter.makeHtml(instance.doc.getValue());
};

CodeMirror.commands.save = onSave;
