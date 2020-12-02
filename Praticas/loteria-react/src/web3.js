import web3 from "web3";
// Busca o provider do metamask onde que que esteja
const _web3 = new web3(web3.givenProvider);
window.ethereum.enable();
// console.log(web3.givenProvider);
// _web3.eth.getAccounts().then(console.log);

export default _web3;
