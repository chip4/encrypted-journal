import choo from './externals/choo.js';
import log from './externals/choo-log.js';
import html from './externals/choo-html.js';
//import mainView from './containers/mainView.js';
import testView from './containers/testView.js';
import mainView from './containers/mainView.js';

var app = choo()
app.use(log())
app.use(countStore)
app.route('/', mainView)
app.route('/test', testView)
document.getElementById("app").appendChild(app.start());

/*
function testView (state, emit) {
  return html`
    <body>
      <h1>count is ${state.count}</h1>
      <button onclick=${onclick}>Increment</button>
    </body>
  `

  function onclick () {
    emit('increment', 1)
  }
}
*/

function countStore (state, emitter) {
  state.count = 0
  emitter.on('increment', function (count) {
    state.count += count
    emitter.emit('render')
  })
}