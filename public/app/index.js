import choo from './externals/choo.js';
import log from './externals/choo-log.js';
import html from './externals/choo-html.js';
import mainView, {editorStore} from './containers/mainView.js';
import flipView, {store as flipStore} from './containers/flipView.js';

var app = choo()
app.use(log())
app.use(editorStore)
app.route('/', mainView)
app.use(flipStore)
app.route('/flip-view', flipView)
app.use(persistentStore)
document.getElementById("app").appendChild(app.start());

function persistentStore(state, emitter){
  Object.assign(state, JSON.parse(window.localStorage.getItem('data')))
  emitter.on('*', (data) => {
    window.localStorage.setItem('data', JSON.stringify(state));
  });
}