console.log("CodeMirror",CodeMirror);
CodeMirror.commands.save = function(instance) {
  console.log('SAVE', instance.doc.getValue());
};

var myCodeMirror = CodeMirror(document.getElementById("editor"), {
  mode: 'markdown',
  keyMap: 'vim',
});