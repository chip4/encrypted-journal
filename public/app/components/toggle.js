//Based off of w3schools How To - Toggle Switch: https://www.w3schools.com/howto/howto_css_switch.asp
import styled from '../externals/styled-elements.js';
import html from '../externals/choo-html.js';

const switchElem = ({scale = 1}, ...children) => styled(html`
<label>
  ${children}
</label>
`)`
  position: relative;
  display: inline-block;
  width: ${scale*60}px;
  height: ${scale*34}px;
`;

const inputElem = ({scale = 1}) => styled(html`
  <input type="checkbox">
`)`
  display:none;
  &:checked + .slider {
    background-color: #2196F3;
  }
  &:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }
  &:checked + .slider:before {
    transform: translateX(${26*scale}px);
  }
`;

const sliderElem = ({scale = 1}) => styled(html`
  <span class="slider round"></span>
`)`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;

  &:before {
    position: absolute;
    content: "";
    height: ${26*scale}px;
    width: ${26*scale}px;
    left: ${4*scale}px;
    bottom: ${4*scale}px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  /* Rounded sliders */
  &.round {
    border-radius: ${34*scale}px;
  }

  &.round:before {
    border-radius: 50%;
  }
`

const squareToggle = html`
  <label class="switch">
    <input type="checkbox">
    <span class="slider"></span>
  </label>
`;
const roundedToggle = ({scale = 1}) => html`
  ${switchElem({scale},
    inputElem({scale}),
    sliderElem({scale}),
  )}
`;

export {
  squareToggle,
  roundedToggle
}

export default roundedToggle;
