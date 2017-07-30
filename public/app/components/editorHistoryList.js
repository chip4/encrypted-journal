import html from '../externals/choo-html.js';
export default function({history, handleClick}){
  function createLi(entry){
    function onclick(){
      console.log("onclick", entry);
      handleClick(entry);
    }
    return html`
      <li onclick=${onclick}><a>${entry.timestamp}</a></li>
    `;
  }
  return html`
    <div>
      <ul class="w3-ul w3-hoverable">
        ${history.map(createLi)}
      </ul>
    </div>
  `;
}