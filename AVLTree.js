// 基于 二叉树的升级

class Node {
    constructor(val, par) {
        this.value = val
        this.left = null;
        this.right = null
        this.parent = par;
    }


    get leftDepth() {//20  13 10 15
        // 逻辑是什么 这里会递归到 好痛苦 他这个算法真的抽象 我js基础看不懂这种调用 但是他确实是能算出最深深度 用的递归
        if (!this.left) {
            return 0
        }
        return this.left.depth + 1
    }

    get rightDepth() { // 10 13
        if (!this.right) {
            return 0
        }
        return this.right.depth + 1
    }

    get depth() {// 13 10 13 15

        // 这里涉及到了js的引用问题 具体的我要求看那本红书
        const number = Math.max(this.leftDepth, this.rightDepth);
        return number
    }

    get balanceFactor() {// this 20
        return this.leftDepth - this.rightDepth;
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
};

class AVL extends Tree {
    add(val) {
        super.add(val);
        //     这一步是添加完了
        let curNode = this.root.find(val)
        while (curNode) {
            this.balance(curNode)
            // 不断向上找 直到找到根节点都是avl 才结束
            curNode = curNode.parent

        }
    }

    removeOne(val) {
        super.removeOne(val);
        this.balance(this.root)
    }

    // 这个是核心
    balance(node) {
        if (node.balanceFactor < -1) {
            //如果起始阶段是负数 判断是左旋还是右左旋
            if (node.right.balanceFactor < 0) {
                //子节点负数 左旋
                this.rotateLeft(node);
            } else if (node.right.balanceFactor > 0) {

                //     子节点正数 右左旋
                this.rotateRightLeft(node)
            }

        } else if (node.balanceFactor > 1) {
            // 右旋、左右旋逻辑
            if (node.left.balanceFactor > 0) {
                //子节点正数 右旋
                this.rotateRight(node);
            } else if (node.left.balanceFactor < 0) {
                //     子节点负数 左右旋
                this.rotateLeftRight(node)
            }
        }
    }

    // 左旋
    rotateLeft(node) {
        const rightNode = node.right
        node.right = null
        if (node.parent) {
            // 应该是去找具体的node 在哪一侧 他这里有问题
            // node.parent.right =rightNode;

            //这个的逻辑是找到对应的节点 把当前的节点换成拿下的下一个节点 把父子关系给重写一边
            if (node.parent.left === node) {
                node.parent.left = rightNode
                node.parent.left.parent = node.parent
            } else {
                node.parent.right = rightNode
                node.parent.right.parent = node.parent
            }
            // 本质上null 到root节点只有一条线 所以root节点的逻辑不一样
        } else if (node === this.root) {
            this.root = rightNode;
            this.root.parent = null
        }

        // 感觉只有两种情况 要么左空 要么左1
        if (rightNode.left) {
            // 什么时候出现这种情况 13 10 16 15 17 插入19 出现
            // node 13 会从顶点right 指16变成指15
            //逻辑是因为当 right 替代的时候 node本身已经满了 因此要挤掉 最左侧的node 让原本的node 指向
            node.right = rightNode.left
            node.right.parent = node;
        }
        //正常左节点没有值 放入原先的node
        // 因此不用上面的那一步
        // 👇 这两行不管有没有rightNode 的left node 都要执行 这个是对原始节点的操作
        rightNode.left = node;
        rightNode.left.parent = rightNode;
    }

    // 右旋
    rotateRight(node) {
        const newLeft = node.left;
        node.left = null
        if (node.parent) {
            if (node.parent.left === node) {
                node.parent.left = newLeft
                node.parent.left.parent = node.parent
            } else {
                node.parent.right = newLeft
                node.parent.right.parent = node.parent
            }
        //     这个node root 节点一定要更新 因为到时候是输出的树 树绑定的起始节点是root节点
        } else if (this.root === node) {
            this.root = newLeft
            this.root.parent = null
        }
        if (newLeft.right) {
            node.left = newLeft.right
            newLeft.right.parent = node
        }

        newLeft.right = node;
        newLeft.right.parent = newLeft

    }

//     左右旋

    rotateLeftRight(node) {
        const newLR = node.left.right
        const newL = node.left
        node.left.right = null
        node.left = null
        if (!node.parent) {
            newLR.parent = null
            // 这里记住要加一行这个 这样树的根节点才能和你自己造的 节点链 的根节点对上
            this.root = newLR
        } else {
            if (node.parent.left === node) {
                node.parent.left = newLR
                newLR.parent = node.parent
            } else {
                node.parent.right = newLR
                newLR.parent = node.parent
            }
        }

        if (newLR.right) { // 20 8 30 5 10 12 发生这种情况
            node.left = newLR.right
            newLR.right.parent = node
        }
        if (newLR.left) {
            newL.right = newLR.left
            newLR.left.parent = newL.right
        }
        // 他的逻辑和我不一样 我是直接上了 本质上就是把最下面的值拉成中间节点 然后最下面的有靠左的给左边 靠右的给右边
        newLR.left = newL
        newLR.right = node
        newL.parent = newLR
        node.parent = newLR

    }
    //右左旋 小大小 20 10 30 25 35 24重排
    rotateRightLeft(node){
        const newR = node.right;
        const newRL = node.right.left;
        newR.left = null
        node.right= null
        if(node===this.root){
            this.root = newRL
            newRL.parent = null
        }else if(node!==this.root){
            if(node ===node.parent.left){
                newRL.parent = node.parent
                node.parent.left  = newRL
            }else {
                newRL.parent = node.parent
                node.parent.right = newRL
            }
        }
        if(newRL.left){
            node.right = newRL.left
            newRL.left.parent = node
        }
        if(newRL.right){
            newR.left = newRL.right
            newRL.right.parent = newR
        }
        newRL.left = node
        node.parent = newRL
        newRL.right = newR
        newR.parent  = newRL
    }

}

const avl = new AVL(20);
avl.add(10)
avl.add(30)
avl.add(25)
avl.add(35)
avl.add(24)


console.log(avl)

