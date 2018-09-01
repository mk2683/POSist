let Node = require('./models/node')
let Transaction = require('./models/transaction')
let Nodechain = require('./models/nodechain')

// create genesis node
let genesisNode = new Node()
let nodechain = new Nodechain(genesisNode)

// create a transaction
let transaction = new Transaction('Mary','John',100)
let node = nodechain.getNextNode([transaction])
nodechain.addNode(node)

let anotherTransaction = new Transaction("Azam","Jerry",10)
let node1 = nodechain.getNextNode([anotherTransaction,transaction])
nodechain.addNode(node1)

console.log(nodechain)