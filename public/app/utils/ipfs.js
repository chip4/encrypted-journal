import Ipfs from '../externals/ipfs.js';
import Buffer from '../externals/safe-buffer.js';

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

export {
  start,
  stop,
  add,
};