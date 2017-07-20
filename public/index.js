console.log('styled', styled);

const div = styled.default.div``;

//TODO make into own module
const flex = styled.default.div`
  display: flex;
  ${props => (props.alignContent ? `align-content: ${props.alignContent};` : '')}
  ${props => (props.alignSelf ? `align-self: ${props.alignSelf};` : '')}
  ${props => (props.alignItems ? `align-items: ${props.alignItems};` : '')}
  ${props => (props.display ? `display: ${props.display};` : '')}
  ${props => (props.flex ? `flex: ${props.flex};` : '')}
  ${props => (props.flexBasis ? `flex-basis: ${props.flexBasis};` : '')}
  ${props => (props.flexDirection ? `flex-direction: ${props.flexDirection};` : '')}
  ${props => (props.flexGrow ? `flex-grow: ${props.flexGrow};` : '')}
  ${props => (props.flexShrink ? `flex-shrink: ${props.flexShrink};` : '')}
  ${props => (props.flexWrap ? `flex-wrap: ${props.flexWrap};` : '')}
  ${props => (props.height ? `height: ${props.height};` : '')}
  ${props => (props.justifyContent ? `justify-content: ${props.justifyContent};` : '')}
  ${props => (props.margin ? `margin: ${props.margin};` : '')}
  ${props => (props.marginBottom ? `margin-bottom: ${props.marginBottom};` : '')}
  ${props => (props.marginLeft ? `margin-left: ${props.marginLeft};` : '')}
  ${props => (props.marginRight ? `margin-right: ${props.marginRight};` : '')}
  ${props => (props.marginTop ? `margin-top: ${props.marginTop};` : '')}
  ${props => (props.maxHeight ? `max-height: ${props.maxHeight};` : '')}
  ${props => (props.maxWidth ? `max-width: ${props.maxWidth};` : '')}
  ${props => (props.minHeight ? `min-height: ${props.minHeight};` : '')}
  ${props => (props.minWidth ? `min-width: ${props.minWidth};` : '')}
  ${props => (props.order ? `order: ${props.order};` : '')}
  ${props => (props.padding ? `padding: ${props.padding};` : '')}
  ${props => (props.paddingBottom ? `padding-bottom: ${props.paddingBottom};` : '')}
  ${props => (props.paddingLeft ? `padding-left: ${props.paddingLeft};` : '')}
  ${props => (props.paddingRight ? `padding-right: ${props.paddingRight};` : '')}
  ${props => (props.paddingTop ? `padding-top: ${props.paddingTop};` : '')}
  ${props => (props.width ? `width: ${props.width};` : '')}
`;

document.getElementById("app").appendChild(
  flex(
    flex({ flexGrow: 1 }, div({id: 'editor'})),
    flex({ flexGrow: 1 }, div({id: 'preview'}))
  )
);

var converter = new showdown.Converter();

CodeMirror.commands.save = function(instance) {
  console.log('SAVE', instance.doc.getValue());
  document.getElementById("preview").innerHTML = converter.makeHtml(instance.doc.getValue());
};


var myCodeMirror = CodeMirror(document.getElementById("editor"), {
  mode: 'markdown',
  keyMap: 'vim',
  value: `
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
  `
});