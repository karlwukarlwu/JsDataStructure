class qu{
    constructor() {
        this.arr = [];
        this.head=-1;
        this.tail =0;
    }
    enqueue(value){
        this.arr[this.tail++]=value
    }
    dequeue(){
        if(this.head===(this.tail+1)){
            return null
        }
        return this.arr[++this.head]
    }
    toArray(){
        return this.arr.slice(this.head+1,this.tail+1)
    }
}
let qu1 = new qu;
qu1.enqueue(1)
qu1.enqueue(2)
qu1.enqueue(3)
let dequeue = qu1.dequeue();
console.log(dequeue)
console.log(qu1.toArray())