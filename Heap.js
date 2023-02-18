//     确实是应该学完树再学堆排序 妈的现在我就是堆排序
// 他那个基于优先级就是把value 和这里的value封装成一个对象 用的时候调一下属性就行

class MaxHeap {
    constructor() {
        this.heapElements = []
    }

    // 这个实际上就是另外一种堆排序，我可以读取一个数组 然后按照数组顺序插入 就是堆排序了
    // 实际上堆排序不要看堆 看数组 数组排序是最好想明白的
    insert(value) {
        this.heapElements.push(value);
        let currentElementIndex = this.heapElements.length - 1
        //     👆 拿到刚刚放进去的元素的坐标
        let parentElementIndex = Math.floor((currentElementIndex + 1) / 2) - 1 //等于0的时候是跟根节点并比较 当成为根节点之后再进行交换就会出现-1 这个时候while就退出
        // 他要写顶堆 循环的条件 也就是交换的条件 要么子类大于父类 要么子类不是根节点 当他是根节点的时候他的父类角标就变成-1 了（(0+1)/2）-1
        while (parentElementIndex >= 0 &&
        (this.heapElements[currentElementIndex] >
            this.heapElements[parentElementIndex])) {

            const parentElement = this.heapElements[parentElementIndex];
            this.heapElements[parentElementIndex] = value;
            this.heapElements[currentElementIndex] = parentElement;
            currentElementIndex = parentElementIndex;
            parentElementIndex = Math.floor((currentElementIndex + 1) / 2) - 1 // 当成为根节点之后再进行交换就会出现-1 这个时候while就退出 在这里

        }

    }

    process() {
        if (this.heapElements.length === 0) {
            return null
        }
        if (this.heapElements.length === 1) {
            return this.heapElements.pop()
        }
        const topElement = this.heapElements[0];
        // 当我们return [0] 之前 我们要确保[1]是第二大/小的元素 因此我们要进行重拍
        // pop方法 移除最后一个元素 并返回
        this.heapElements[0] = this.heapElements.pop();
        // 他这里有点类似于堆排序的第二步 就是形成了大顶堆以后开始不断移除大顶堆的元素
        let currentElementIndex = 0;
        let leftChildIndex = 2 * currentElementIndex + 1;
        let rightChildIndex = 2 * currentElementIndex + 2;
        // 很诡异的写法 反正逻辑是 右存在且右大于左 返回右 不然就是返回左
        let childElementIndex =
            this.heapElements[rightChildIndex] &&
            this.heapElements[rightChildIndex] >= this.heapElements[leftChildIndex] //2>null => true
                ? rightChildIndex
                : leftChildIndex
        // 他这里的循环不对 应该是更新坐标 然后一直循环到底 当 出现四层的堆以后他的代码会有问题 这样每次才是一个合格的堆
        while (this.heapElements[childElementIndex] && this.heapElements[currentElementIndex] <= this.heapElements[childElementIndex]) {
            const currentNode = this.heapElements[currentElementIndex];
            const currentChildNode = this.heapElements[childElementIndex];
            this.heapElements[childElementIndex] = currentNode;
            this.heapElements[currentElementIndex] = currentChildNode
            // 更新
            currentElementIndex = childElementIndex
            leftChildIndex = 2 * currentElementIndex + 1
            rightChildIndex = 2 * currentElementIndex + 2
            childElementIndex =
                this.heapElements[rightChildIndex] &&
                this.heapElements[rightChildIndex] >= this.heapElements[leftChildIndex]
                    ? rightChildIndex
                    : leftChildIndex
            //     这里应该是不断的更新坐标
        }
        return topElement;
    }
}

const heap = new MaxHeap();
heap.insert(40)
heap.insert(101)
heap.insert(197)
heap.insert(132)
heap.insert(15)
heap.insert(85)
heap.insert(250)
heap.insert(12)
heap.insert(35)
heap.insert(54)
heap.insert(3453)
heap.insert(43)
heap.insert(223)
heap.process()
heap.process()
heap.process()
heap.process()
console.log(heap)
