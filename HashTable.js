class HT{
    constructor() {
        this.size = 1000;
        // 👇 这个size应该和下面的对应 这样的话取余才能不空指针
        this.buckets = Array(1000).fill(null)
    }
    hash(key){
        let hash = 0;
        for (const keyElement of key) {
            hash+=keyElement.charCodeAt(0)
                             // 👆 获取的是asc码
        }
        return hash%this.size
    //     他这么写会得到很多的重复 因为 会有很多1、2、3、4、5的重复
    }
    set(key,value){
        const keyHash = this.hash(key)
        this.buckets[keyHash] = value
    }
    get(key){
        const keyHash = this.hash(key)
        return this.buckets[keyHash]
    }

}

const abc = "asderescgd";
function du(arr){
    const tab = new HT()
    const newA = []
    for (const tabElement of arr) {

        if(tab.get(tabElement)){

            newA.push(tabElement)
        }
        tab.set(tabElement,1)

    }
    // console.log(tab)
    console.log(newA)
}

du(abc)