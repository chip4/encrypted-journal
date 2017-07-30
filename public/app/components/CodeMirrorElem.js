import Nanocomponent from '../externals/nanocomponent.js';
import html from '../externals/choo-html.js';
import styled from '../externals/styled-elements.js';
import CodeMirror from '../externals/CodeMirror.js';
import debounce from '/vendor/lodash-es/debounce.js';

export default class Component extends Nanocomponent {
  constructor () {
    super()
  }

  createElement (props) {
    this.props = props;
    if(!this.element){
      return styled(html`<div></div>`)`
        width: 100%;
      `;
    }
    if(this.props.value !==this.controller.doc.getValue()){
      this.controller.doc.setValue(this.props.value);
    }
    return this.element;
  }

  load(elem){
    this.controller = CodeMirror(this.element, {
      mode: 'markdown',
      keyMap: 'vim',
      value: this.props.value,
      viewportMargin: Infinity,
    });
    this.controller.on('change', debounce(this.props.onChange, 100));
    CodeMirror.commands.save = this.props.onSave;
  }

  update (props) {
    return props.value !== this.props.value;
  }
}