class HT{
    constructor() {
        this.arr = Array(5).fill(null)
        this.size = 5;
    }
    hash(key){
        return (key.charCodeAt(0)%this.size)
    //     他那里的forof循环是因为他考虑到了 一大长串字符串 我这边没有这种情况

    }
    set(key,val){
        let hashKey = this.hash(key)
        if(!this.arr[hashKey]||this.arr[hashKey].key===key){
            // 没有放入 有的话更新
            this.arr[hashKey]={key:key,value:val}
            return
        }
        while (true){
            if(!this.arr[++hashKey]){
                this.arr[hashKey]={key:key,value:val}
                return;
            }
        }


    }
    get(key){
        let hashKey = this.hash(key)
        if(!this.arr[hashKey]){
            return false
        }
        if(this.arr[hashKey].key===key) {
            return this.arr[hashKey]
        }else {
            while (hashKey+1<this.arr.length){
                //
                if(this.arr[++hashKey].key===key){
                    return this.arr[hashKey]
                }
            }
        }

    }
}

const ht = new HT();
ht.set("1",1)
ht.set("2",1)
ht.set("3",1)
console.log(ht.arr)
console.log(ht.get("5"))