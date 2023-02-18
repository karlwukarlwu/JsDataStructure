class Graph{
    constructor() {
        this.nodes = {}
        this.edges = {}
    }
    addNode(identifier,value){
        this.nodes[identifier] = value
    }
    addEdge(startNode,endNode){
        if(this.edges[startNode]&&this.edges[startNode].indexOf(endNode)===-1){
            this.edges[startNode].push(endNode); //有就这里push
        }else {
            this.edges[startNode] = [endNode] //这里是 这样的 [startNode]是变量名 [endNode]是变量数组 没有就造一个数组存变量名
        }
    }
}

let graph = new Graph();
graph.addNode(1,"m1")
graph.addNode(2,"m2")
graph.addNode(3,"m3")
graph.addEdge(1,2)
graph.addEdge(1,3)
graph.addEdge(3,2)
console.log(graph)