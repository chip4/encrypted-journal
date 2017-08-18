import Ipfs from '../externals/ipfs.js';
import Buffer from '../externals/safe-buffer.js';

const observers = [];
const prefix = 'ipfs:';
const events = {
  started: `${prefix}started`,
  stopped: `${prefix}stopped`,
};

const repoPath = 'ipfs-' + Math.random()

// Create an IPFS node
const node = new Ipfs({
  init: false,
  start: false,
  repo: repoPath
})
// Init the node
node.init(handleInit);
function handleInit(err) {
  if (err) {
    throw err
  }
}

function start(){
  return new Promise((resolve, reject) => node.start(() => {
    console.log('Online status: ', node.isOnline() ? 'online' : 'offline')
    console.log("node",node);
    notifyObservers(events.started);
    resolve(node.isOnline);
    // You can write more code here to use it. Use methods like 
    // node.files.add, node.files.get. See the API docs here:
    // https://github.com/ipfs/interface-ipfs-core/tree/master/API
  }));
}

function stop(){
  return new Promise((resolve, reject) => {
    node.stop((err) => {
      if(err){
        reject(err);
      } else {
        resolve(new Date());
        notifyObservers(events.stopped);
      }
    });
  });
}

function add(value){
  return new Promise((resolve, reject) => {
    node.files.add(Buffer.Buffer.from(value), (err, res) => {
      console.log("err",err, "res",res);
      if(err){
        reject(err, res);
      } else {
        resolve(res);
      }
    })
  });
}

function notifyObservers(eventName){
  observers.forEach((cb) => cb(eventName));
}

function registerObserver(callback){
  observers.push(callback);
  return () => observers.splice(observers.indexOf(callback), 1);
}

function isOnline(){
  return node.isOnline();
}

export {
  start,
  stop,
  isOnline,
  add,
  registerObserver,
  events,
};