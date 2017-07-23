import yo from './globals/yo-yo.js';
import CodeMirror from './globals/CodeMirror.js';
import debounce from '../vendor/lodash-es/debounce.js'

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

export default ({onSave, onChange}) => {
  const yoDiv = yo`<div onload=${initCodeMirror}></div>`;
  function initCodeMirror(){
    const controller = CodeMirror(yoDiv, {
      mode: 'markdown',
      keyMap: 'vim',
      value: defaultContents,
    });
    console.log("controller",controller);
    controller.on('change', debounce(onChange, 100));
  }
  CodeMirror.commands.save = onSave;
  return yoDiv;
};