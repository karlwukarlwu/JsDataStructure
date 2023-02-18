//他那个stack太扯了 我直接自己写一个
class St{

    constructor() {
        this.init = [];
        this.pointer = -1;
    //     这种加属性的方法我有点忘了。。。

    }

    push(value){
        this.pointer++;
        this.init[this.pointer]=value;
    }

    pop(){
        if(this.pointer===-1){
            return null
        }
        return this.init[this.pointer--];
    }
    show(){
        return this.init.slice(0,this.pointer+1)
    }
}

let st = new St();
st.push(1)
st.push(2)
st.push(3)
st.push(4)
console.log(st.pop())
console.log(st.show())