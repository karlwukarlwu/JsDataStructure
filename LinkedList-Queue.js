class LL {
    // 这个是单向链表
    // 要在链表中有一个初始化的机会 因此头节点和尾节点是在 constructor中占位的
    constructor() {
        this.head = null
        this.tail = null;
    }
    // find逻辑和删除一样 把改指针那一步删了就行

    append(val) {
        const temp = {value: val, next: null}
        //   👆  封装到对象中,这一步不要省略 不然下面的代码写的生不如死
        if (!this.tail) {
            this.tail = temp;
            this.head = temp;
        } else {
            this.tail.next = temp;
            //尾指针的next指完以后要记得把尾指针移动下一位
            //妈的好久不写我人晕了
            this.tail = temp;
        }
    }

    prepend(val) {
        const temp = {value: val, next: null}
        if (!this.head) {
            this.head = temp;
            this.tail = temp;
        } else {
            //    这里是插在头节点前面 我搞成插头节点后面了
            //     有一种说法是提前写死一个头节点 这里不是用的那个 我搞混了
            temp.next = this.head
            this.head = temp;
        }
    }

    // 这是删除一个
    delObj(val) {
        // 为空返回 false
        if (!this.head) {
            return false
        }
        // 如果只有一个节点
        if (val === this.head.value && this.head.next === null) {
            this.head = null;
            this.tail = null
            return this.head
        }

        // 两个及两个节点以上
        let temp = this.head;
        let tempN = temp.next;
        if (val === temp.value) {
            this.head = this.head.next;
            return temp
        }
        while (tempN) {
            // 如果没有删到最后一个节点
            if (val === tempN.value) {
                temp.next = tempN.next
                return tempN
            } else {
                // 这里不会出现删除最后一个节点空指针的问题
                // 因为最后一个节点已经比较过了然后才挪到这里的
                temp = temp.next
                tempN = temp.next
            }
        }
        return false
    }

    delObjs(val) {
        // 为空返回 false
        if (!this.head) {
            return false
        }
        // 如果只有一个节点
        if (val === this.head.value && this.head.next === null) {
            this.head = null;
            this.tail = null
            return this.head
        }

        // 两个及两个节点以上
        let temp = this.head;
        let tempN = temp.next;
        let temps = [];
        // 👇 我这块解决了如果第一个头节点相同的问题
        if (val === temp.value) {
            this.head = this.head.next;
            temps.push(this.head)
        }
        while (tempN) {
            // 如果没有删到最后一个节点
            if (val === tempN.value) {
                temp.next = tempN.next
                temps.push(tempN)//这里放的是地址
                tempN = temp.next //等于是tempN 指向了新的地址 但是之前地址所在的那个空间存在了原来的地方

            } else {
                // 这里不会出现删除最后一个节点空指针的问题
                // 因为最后一个节点已经比较过了然后才挪到这里的
                temp = temp.next
                tempN = temp.next
            }
        }
        return temps
    }

    insertVal(val, pos) {
        //    我就默认pos 一定合理了，且不头尾插
        //     let toA = this.toArray().length
        const temp = {value: val, next: null}
        let point = this.head
        let count = 1;
        while (true) {
            if (count === pos) {
                temp.next = point.next;
                point.next = temp
                break
            }
            point = point.next
            count++;
        }
    }

    insertVal2(val, val2) {
        let pointer = this.head;
        const temp = {value: val, next: null}
        while (true) {
            if (val2 === pointer.value) {
                temp.next=pointer.next
                pointer.next=temp
                break
            }
            if (pointer === null || pointer.next === null) {
                break
            }
            pointer=pointer.next
        }
    }

    // 关于这里为什么可以直接temp给head 赋值head 然后head 就有了next 因为是弱类型
    // Java中是 子类给父类或者 同类赋值 因此属性大部分一致 可以相互调用相同属性
    toArray() {
        const arr = []
        // 这里要从head开始 我和这个老哥都这里蒙了
        let pointer = this.head
        while (pointer) {
            arr.push(pointer)
            pointer = pointer.next
        }
        return arr
    }
    delHead(){
        let temp;
        if(!this.head){
            return null
        }
        if(!this.head.next){
            temp=this.head;
            this.head=null;
            this.tail=null;
            return temp
        }else {
            temp= this.head;
            this.head=temp.next
            return temp
        }
    }
}

class Lq{
    constructor() {
        this.arr = new LL()
    }
    enquequ(value){
        this.arr.append(value)
    }
    dequeue(){
        this.arr.delHead()
    }

}