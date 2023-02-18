class Node{
    constructor(value,priority) {
        this.value= value
        this.next = null
        this.priority= priority
    }
}

class PriorityQueue{
    constructor() {
        this.first = null
    }
    insert(value,priority){
        const newNode = new Node(value,priority);
        if(!this.first||newNode.priority>this.first.priority){
            newNode.next =this.first
            this.first = newNode
        }else {
            let curNode = this.first
            while (curNode.next){
                if(newNode.priority>curNode.next.priority){
                    newNode.next = curNode.next
                    curNode.next = newNode
                    return
                }
                curNode = curNode.next
            }
            curNode.next = newNode
        }
    }
    returnFirst(){
        const first = this.first;
        first.next = null
        this.first= this.first.next
        return first
    }
}
const queue = new PriorityQueue();

queue.insert(1,1)
queue.insert(3,3)
queue.insert(5,5)
queue.insert(4,2)
console.log(queue.returnFirst())