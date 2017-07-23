import yo from './globals/yo-yo.js';
import CodeMirror from './globals/CodeMirror.js';

const defaultContents = `
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
const yoDiv = yo`<div onload=${initCodeMirror}></div>`;
function initCodeMirror(){
  CodeMirror(yoDiv, {
    mode: 'markdown',
    keyMap: 'vim',
    value: defaultContents,
  });
}

export default ({onSave}) => {
  CodeMirror.commands.save = onSave;
  return yoDiv;
};