console.log("CodeMirror",CodeMirror);
CodeMirror.commands.save = function(instance) {
  console.log('SAVE', instance.doc.getValue());
  document.getElementById("preview").innerHTML = markdown.toHTML(instance.doc.getValue());
};

console.log("markdown",markdown);

var myCodeMirror = CodeMirror(document.getElementById("editor"), {
  mode: 'markdown',
  keyMap: 'vim',
});