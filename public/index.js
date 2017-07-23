import flex from './app/flexbox.js';
import styled from './app/globals/styled-elements.js';
import CodeMirrorElem from './app/CodeMirrorElem.js'
import showdown from './app/globals/showdown.js';

var converter = new showdown.Converter();
function onChange(instance) {
  console.log('SAVE', instance.doc.getValue());
  document.getElementById("preview").innerHTML = converter.makeHtml(instance.doc.getValue());
};

const div = styled.default.div``;

document.getElementById("app").appendChild(
  flex(
    flex({ flexGrow: 1 }, CodeMirrorElem({onChange})),
    flex({ flexGrow: 1 }, div({id: 'preview'}))
  )
);
