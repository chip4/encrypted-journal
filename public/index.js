console.log("CodeMirror",CodeMirror);

var converter = new showdown.Converter();

CodeMirror.commands.save = function(instance) {
  console.log('SAVE', instance.doc.getValue());
  document.getElementById("preview").innerHTML = converter.makeHtml(instance.doc.getValue());
};


var myCodeMirror = CodeMirror(document.getElementById("editor"), {
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