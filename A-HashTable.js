class HT{
    constructor() {
        this.size = 2;
        // 👇 这个size应该和下面的对应 这样的话取余才能不空指针
        this.buckets = Array(2).fill(null).map(()=>[])
    //     map(()=>[]) 的意思是每到一个元素 不读取他 直接把这个位置变成[] 输出的情况类似这样 [ [], [], [] ]
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
        const bucketA = this.buckets[keyHash];
        const find =bucketA.find((ele)=>{
            return ele.key===key
        //     js 独家写法 条件合适返回ele 都不合适返回undefined
        });
        if(find){
            find.value=value
        }else {
            bucketA.push({key:key,value:value})
        }
    }
    get(key){
        const keyHash = this.hash(key)
        const bucketA = this.buckets[keyHash];
        const find =bucketA.find((ele)=>{
            return ele.key===key
            //     js 独家写法 条件合适返回ele 都不合适返回undefined
        });
        return find
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
    console.log(tab)
    console.log(newA)
}

du(abc)