import flex from './app/flexbox.js';

console.log("flex",flex);
console.log('styled', styled);

const div = styled.default.div``;

document.getElementById("app").appendChild(
  flex(
    flex({ flexGrow: 1 }, div({id: 'editor'})),
    flex({ flexGrow: 1 }, div({id: 'preview'}))
  )
);

var converter = new showdown.Converter();

CodeMirror.commands.save = function(instance) {
  console.log('SAVE', instance.doc.getValue());
  document.getElementById("preview").innerHTML = converter.makeHtml(instance.doc.getValue());
};


CodeMirror(document.getElementById("editor"), {
  mode: 'markdown',
  keyMap: 'vim',
  value: `
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
  `
});