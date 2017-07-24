import html from '../externals/choo-html.js';
import flexbox from '../components/flexbox.js'
import showdown from '../externals/showdown.js';
import codeMirrorElem from '../components/codeMirrorElem.js';
var converter = new showdown.Converter();

export default function (state, emit){
  return html`
    ${flexbox({flexDirection: 'column'},
      flexbox(
        flexbox({ flexGrow: 1 },
          codeMirrorElem({onChange, onSave})
        ),
        flexbox({ flexGrow: 1 },
          html`<div id="preview"></div>`
        )
      )
    )}
  `;

  function onChange(instance) {
    console.log('CHANGE');
    document.getElementById("preview").innerHTML = converter.makeHtml(instance.doc.getValue());
  };

  function onSave(instance){
    console.log('SAVE');
  }
}