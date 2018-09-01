let Node = require('./node')
let sha256 = require('js-sha256')

class Nodechain {

   constructor(genesisNode) {

     this.nodes = []
     this.addNode(genesisNode)
   }

   addNode(node) {

      if(this.nodes.length == 0) {
        node.previousHash = "0000000000000000"
        node.hash = this.generateHash(node)
      }

      this.nodes.push(node)
   }

   getNextNode(transactions) {

      let node = new Node()

      transactions.forEach(function(transaction){
        node.addTransaction(transaction)
      })

      let previousNode = this.getPreviousNode()
      node.index = this.nodes.length
      node.previousHash = previousNode.hash
      node.hash = this.generateHash(node)
      return node
   }

   generateHash(node) {

     let hash = sha256(node.key)

     while(!hash.startsWith("0000")) {
       node.nonce += 1
       hash = sha256(node.key)
       console.log(hash)
     }

     return hash

   }

   getPreviousNode() {
     return this.nodes[this.nodes.length - 1]
   }

}

module.exports = Nodechain
