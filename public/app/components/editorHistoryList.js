import html from '../externals/choo-html.js';
import styled from '../externals/styled-elements.js';
import JsDiff from '../externals/diff.js';

const greenPlus = () => styled(html`<span>+</span>`)`
  color: green;
`;

const redMinus = () => styled(html`<span>-</span>`)`
  color: red;
`;

export default function({history, handleClick}){
  function createLi(entry, i){
    function onclick(){
      console.log("onclick", entry);
      handleClick(entry);
    }
    const linesChanged = JsDiff.diffLines(history[Math.max(i-1, 0)].fileContents, entry.fileContents)
      .filter((changeObj) => changeObj.added || changeObj.removed)
      .map((change) => {
        if(change.added){
          return greenPlus();
        }
        if(change.removed){
          return redMinus();
        }
      });
    return html`
      <li onclick=${onclick}>
        ${entry.timestamp}<br>${linesChanged}
      </li>
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