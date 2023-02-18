class Node{
    constructor(val,par = null) {
        this.parent = par;
        this.childern = []
        this.value = val
    }
    add(val){
        let nod = new Node(val,this)
        this.childern.push(nod)
        // 因为这里nod 是添加的this的数组中 this 是父节点 每一次是添加到最后
        return {nod:nod,index:this.childern.length-1}
    }
    remove(po){
        return this.childern.splice(po,1)
    }
}

class Tr{
    constructor(val) {
        this.root = new Node(val)
    }
//     剩下的时候 想要添加删改直接调用那个节点 再调方法 就行了

}


const tr = new Tr(1)
const nod2 = tr.root.add(2);
const nod3 = tr.root.add(3);
// 不能直接调用 因为上面返回的是封装过的node
const nod4 = nod2.nod.add(4);
const nod5 = nod2.nod.add(5);
console.log(tr.root)

