import choo from './externals/choo.js';
import log from './externals/choo-log.js';
import html from './externals/choo-html.js';
import mainView, {editorStore} from './containers/mainView.js';

var app = choo()
app.use(log())
app.use(editorStore)
app.route('/', mainView)
document.getElementById("app").appendChild(app.start());