import yo from '../externals/yo-yo.js';
import CodeMirror from '../externals/CodeMirror.js';
import debounce from '/vendor/lodash-es/debounce.js';
import styled from '../externals/styled-elements.js';

export default ({onSave, onChange, value}) => {
  const yoDiv = styled(yo`<div onload=${initCodeMirror}></div>`)`
    width: 100%;
  `;
  function initCodeMirror(){
    const controller = CodeMirror(yoDiv, {
      mode: 'markdown',
      keyMap: 'vim',
      value,
    });
    controller.on('change', debounce(onChange, 100));
  }
  CodeMirror.commands.save = onSave;
  yoDiv.isSameNode = () => true;
  return yoDiv;
};