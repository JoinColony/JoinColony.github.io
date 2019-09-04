/* @flow */

// See https://github.com/JoinColony/JoinColony.github.io/issues/132
// See https://github.com/JoinColony/JoinColony.github.io/pull/133

// const IPFS = require('ipfs');
//
// const { Buffer } = IPFS;
//
// let node;
//
// const waitForIPFS = async () => {
//   node = new IPFS({ start: false });
//   return new Promise((resolve, reject) => {
//     node.on('ready', () => resolve(true));
//     node.on('error', err => reject(err));
//   });
// };
//
// exports.init = async () => {
//   await waitForIPFS();
//   return node.start();
// };
//
// exports.saveHash = async (item: *) => {
//   const data = Buffer.from(JSON.stringify(item));
//   const result = await node.add(data);
//   return result[0].hash;
// };
//
// exports.getHash = async (hash: string) => {
//   const buf = await node.cat(`/ipfs/${hash}`);
//   let item;
//   try {
//     item = JSON.parse(buf.toString());
//   } catch (err) {
//     throw new Error(`Could not get hash ${hash}`);
//   }
//   return item;
// };
//
// exports.stop = () => node.stop();
