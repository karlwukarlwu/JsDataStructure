class TrieNode {
    constructor() {
        this.value = null
        this.children = Array(26).fill(null)
    }
}

// 只能说大差不差 和我想象中的还是有区别 但是逻辑是一样的
// 那个和这个trie不一样 但是逻辑是一样的


// 逻辑是这样的 根节点不放值 只放一个数组 数组存折每次插入的值的头一位字母
// 比如插入 ad 则应该有 root->a->d 然后在d 位置放入value
// 数组里面 没有对应位置节点 就创造  有就直接从节点上走 重复了覆盖
// 除了根节点value 规定是null 其他的节点都是value 和数组 数组指向下一个节点（如果有）
class Trie {
    constructor() {
        this.root = new TrieNode()
    }

    insert(key, value) {
        let node = this.root;
        for (let i = 0; i < key.length; i++) {
            const alphabetIndex = key[i].charCodeAt(0) - 97;
            if (!node.children[alphabetIndex]) {
                // 如果算出来的位置 没有 就手动创造
                const newNode = new TrieNode(null);
                node.children[alphabetIndex] = newNode
            }
            // 将找到或者创造出来的 给循环node
            node = node.children[alphabetIndex]
        }
        // 当到达key 重点以后 给value付过去
        node.value = value;
    }

    find(key) {
        //这一行很重要 因为this 指的是trie 我们需要把trie转换成为 root这种节点
        let temp = this.root
        for (let i = 0; i < key.length; i++) {
            const alphabetIndex = key[i].charCodeAt(0) - 97;
            if (!temp.children[alphabetIndex]) {
                return null
            }
            temp = temp.children[alphabetIndex]
        }
        return temp.value
    }

    remove(key, node) {
        // const findN = this.find(key)
        // findN.value =null
        //理论上你应该递归把上面为空的都删了
        let temp = node
        if (key.length === 0) {
            return null
        }
        const alphabetIndex = key[0].charCodeAt(0) - 97;
        if (node.children[alphabetIndex] === null) {
            return
        }
        // 如果是我手动给的null return true
        if (key.length === 1) {
            node.children[alphabetIndex].value = null
            return true
        }
        // 上面的是递归的操作 下面的是递归结束开始返回的操作
        const delSig = this.remove(key.slice(1, key.length), temp.children[alphabetIndex]);
        // 还要考虑如果是 c c b d 和 c c b a 的删除 实际上只能删除 a 但b 节点是 null
        const lengthS= new Set([...temp.children]);

        // 如果是跟随我 手动删除的 且值是null return true 一旦下面开始return false 这个链条就会一直return false
        if (temp.children[alphabetIndex].value === null && delSig &&(lengthS.size<=2)) {
            // 最后一个就是考虑是否会null 点 但是连着别的链
            temp.children[alphabetIndex] = null
            return true
        //     如果遇到了有值的 这个链条断裂 return false
        }else {
            return false
        }
    }
}

const trie = new Trie()

trie.insert("aabc", 31)
trie.insert("aacd", 12)
trie.insert("name", "max")
trie.insert("names", "te")
// trie.insert("a", "teeee")
console.log(trie)
trie.remove("aabc", trie.root)
// console.log(trie.find("names"))
// console.log(trie.find("naes"))
