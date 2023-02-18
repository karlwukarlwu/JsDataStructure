class Node {
    constructor(val, par = null) {
        this.parent = par;
        this.childern = []
        this.value = val
    }

    add(val) {
        const seg = val.split("/")

        // 直接规定都得这么写 (".../...)
        // (...) 这种情况是添加 其他的情况都是寻找
        // 最小长度就是1
        if (seg.length === 1) {     //["val"]
            // 如果直接是当前路径下  直接创建
            let nod = new Node(seg[0], this)
            this.childern.push(nod)
            return {nod: nod, index: this.childern.length - 1}
        }
        // ("a/b") 这种是添加 而且不是本层添加
        //     如果不止一层 开始一层一层找
        const findNod = this.childern.find(e => e.value === seg[0])

        // 如果找到
        if (findNod) {
            // 这里写不写return无所谓 他是用浏览器调试的 因此他不需要return来看返回值 他点开调试界面就行
            // nodejs要返回值不然只能看见两个node
            return findNod.add(seg.slice(1).join("/"))
        } else {
            let nod = new Node(seg[0], this)
            this.childern.push(nod)
            return this.add(seg.join("/"))
        }
    }

    remove(val) {
        const seg = val.split("/")
        if (seg.length === 1) {     //["val"]
            // 如果直接是当前路径下  直接去子类查找
            const valN = this.childern.find(e => e.value === seg[0]);
            if (valN) {
                // 我还是觉得我上面应该用indexOf 刚刚人懵了
                valN.parent =null
                return this.childern.splice(this.childern.indexOf(valN), 1);
                // 找到删除 找不到返回-1
            } else {
                return -1
            }
        }
        const valN = this.childern.find(e => e.value === seg[0]);
        if (valN) {
            return valN.remove(seg.slice(1).join("/"))
        } else {
            return false
        }
    }


    findDeep(val){
        for (const childernElement of this.childern) {
            if(childernElement.value===val){
                return childernElement
            }
            const findDeep = childernElement.findDeep(val);
            // 这个很重要 有值返回 undefined直接跳过 这样可以保证递归的时候可以忽略undefined 而进行下一次循环
            if(findDeep){
                return findDeep
            }
        }
    }
    findBreadth(val){
        console.log(this.value)
        for (const childernElement of this.childern) {
            if (childernElement.value === val) {
                return childernElement
            }
        }
        // 他这个不是传统意义上的广度搜索 他优先的是同一父节点下的兄弟节点 而不是同层兄弟节点
        // 他这一步实际上是可以移到上面取得 本质上还是深度优先
        for (const childernElement of this.childern) {
            const child2 = childernElement.findBreadth(val)
            if(child2){
                return child2
            }
        }
    }
}

class Tr {
    constructor(val) {
        this.root = new Node(val)
    }

    add(path) {
        return this.root.add(path)
    }

    remove(path) {
        return this.root.remove(path)
    }

    findDeep(val){
        return this.root.findDeep(val)
    }

    findBreadth(val){
        return this.root.findBreadth(val)
    }
}

const tr = new Tr("a");
const add2 = tr.add("b");
const add3 = tr.add("c");
const add4 = tr.add("b/d");
const add5 = tr.add("b/e");
const add6 = tr.add("c/f");
const add7 = tr.add("c/g");
const add8 = tr.add("b/d/h");
const add9 = tr.add("b/d/i");
const add10 = tr.add("b/e/j");
const add11 = tr.add("b/e/k");
const add12 = tr.add("c/f/l");
const add13 = tr.add("c/f/m");
const add14 = tr.add("c/g/n");
const add15 = tr.add("c/g/o");

tr.findBreadth("o")

// const findDeep6 = tr.findDeep("6");
// console.log(findDeep6)
