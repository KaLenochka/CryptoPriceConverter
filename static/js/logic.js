//initializing Moralis
Moralis.initialize("ZVfXRVJmKls7QfaIUEn7YAbk47Z0T0WiKO9pEIKJ"); // Application id from moralis.io
Moralis.serverURL = "https://hepecmc0lqab.grandmoralis.com:2053/server"; //Server url from moralis.io

/*Creating a contract object*/
window.web3 = new Web3(window.ethereum);
const Price_ETHAbi = [{"inputs": [], "stateMutability": "nonpayable", "type": "constructor", "name": "constructor"}, {"inputs": [], "name": "getThePrice", "outputs": [{"internalType": "int256", "name": "", "type": "int256"}], "stateMutability": "view", "type": "function"}];
const PriceETH = new window.web3.eth.Contract(Price_ETHAbi,'0xe011b2096e09C48ff6ff5Bd40DE6ceB307543471');

//dApp frontend logic
async function convertEth(){
    PriceETH.methods.getThePrice().call().then(convert_populate);
}

function convert_populate(_value){
    const amountEth = document.getElementById('amountEth').value
    const result = (_value*amountEth)/(10**8);
    document.getElementById("amountUSD").setAttribute("value", result);
}

async function login(){
    document.getElementById('submit').setAttribute("disabled", null);
    document.getElementById('username').setAttribute("disabled", null);
    document.getElementById('useremail').setAttribute("disabled", null);
    Moralis.Web3.authenticate().then(function (user) {
        user.set("name",document.getElementById('username').value);
		user.set("email",document.getElementById('useremail').value);
		user.save();
        document.getElementById("amountEth").removeAttribute("disabled");
        document.getElementById("convert").removeAttribute("disabled");
    })
}
