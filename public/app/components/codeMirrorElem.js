import yo from '../externals/yo-yo.js';
import CodeMirror from '../externals/CodeMirror.js';
import debounce from '/vendor/lodash-es/debounce.js';
import styled from '../externals/styled-elements.js';

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
  const yoDiv = styled(yo`<div onload=${initCodeMirror}></div>`)`
    width: 100%;
  `;
  function initCodeMirror(){
    const controller = CodeMirror(yoDiv, {
      mode: 'markdown',
      keyMap: 'vim',
      value: defaultContents,
    });
    controller.on('change', debounce(onChange, 100));
  }
  CodeMirror.commands.save = onSave;
  return yoDiv;
};