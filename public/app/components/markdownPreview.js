import showdown from '../externals/showdown.js';
import html from '../externals/choo-html.js';
var converter = new showdown.Converter();

export default function (rawMd){
  const preview = html`<div></div>`;
  preview.innerHTML = converter.makeHtml(rawMd);
  return preview;
}