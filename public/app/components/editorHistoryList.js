import html from '../externals/choo-html.js';
export default function({history, handleClick}){
  function createLi(entry){
    function onclick(){
      console.log("onclick", entry);
      handleClick(entry);
    }
    return html`
      <li><a onclick=${onclick}>${entry.timestamp}</a></li>
    `;
  }
  return html`
    <div>
      <ul>
        ${history.map(createLi)}
      </ul>
    </div>
  `;
}