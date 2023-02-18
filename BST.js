class Node {
    constructor(val, par) {
        this.value = val
        this.left = null;
        this.right = null
        this.parent = par;
    }

    // 假设这里直接放数字了 就不造变量了
    add(val) {
        // 这一步主要是看初始化树的时候有没有给树赋值 因为实际上树的除了根节点其他的用不到这一步
        if (!this.value) {
            this.value = val
            return;
        }
        if (this.value > val) {
            if (!this.left) {
                // 如果是　null 直接赋值
                this.left = new Node(val, this)
                return;
            }
            // 如果不是
            this.left.add(val)
            return;
        }
        if (this.value < val) {
            if (!this.right) {
                this.right = new Node(val, this)
                return;
            }
            this.right.add(val)
        }
    }

    removeOne(val) {
        //     删除单个节点 有子树则重新排列子树
        //     要专门给父节点写一个removeChild的方法
        let findN = this.find(val)
        if (!findN) {
            // 过滤找不到的情况
            return null
        }
        // 考虑到两边都是空的
        if (findN.left === null && findN.right === null) {
            // 找到了 且 找到的是叶子节点
            findN.parent.removeChild(findN)
            findN.parent = null
            return findN
        }
        //     考虑到两边都是不空的
        if (findN.left !== null && findN.right !== null) {
            //     删除可以用删除节点的左子树最右子节点替代 也可以用右子树的最左子节点替代 因为他们有和删除节点最近似的值

            // 我和他的思路不一样 我是直接交换的值 然后把子节点制空 跟下面的换节点是一个思路
            const node = findN.left.findRight()
            findN.value = node.value
            node.parent.removeChild(node)
            node.parent = null

        } else {
            //  考虑到有一边不为空
            //     他那个方法巧妙 我要是按照我的想法 我要重新写一个匹配这个 nod 的方法在进行替换
            let newNod = findN.left || findN.right
            findN.value = newNod.value
            findN.left = newNod.left
            findN.right = newNod.right
            //     他这样删除无法返回值 因为他实际上是删的子节点 只不过把子节点的指针和值都给了父节点
            //     真想返回新建一个就行

        }
    }

    // 这个是给两边都有值的节点找右子树的最左节点使用的 这个要是想找左边的也可以 两种解法
    findRight() {
        if (!this.right) {
            return this
        }
        return this.right.findRight()
    }


    removeChild(node) {
        if (this.left === node) {
            this.left = null
            return
        }
        if (this.right === node) {
            this.right = null
            return;
        }
    }

    find(val) {
        if (this.value === val) {
            return this
        }
        if (this.value > val) {
            if (!this.left) {
                return null
            }
            return this.left.find(val)
        }
        if (this.value < val) {
            if (!this.right) {
                return null
            }
            return this.right.find(val)
        }
    }
}

class Tree {
    constructor(val) {
        this.root = new Node(val, null)
    }

    add(val) {
        this.root.add(val)
    }

    removeOne(val) {
        return this.root.removeOne(val)
    }

    find(val) {
        return this.root.find(val)
    }
}

const tree = new Tree(18);
tree.add(1)
tree.add(23)
tree.add(4)
tree.add(232)
tree.add(232)
tree.add(20)
tree.add(5)
tree.add(12)
tree.add(52)
tree.add(19)
tree.add(21)
console.log(tree)

// console.log(tree.removeOne(52))
// console.log(tree.find(232))
console.log(tree.removeOne(23))
// console.log(tree)
console.log(tree.find(52))
// tree.add(5277)