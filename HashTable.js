class HT{
    constructor() {
        this.size = 1000;
        // ð è¿ä¸ªsizeåºè¯¥åä¸é¢çå¯¹åº è¿æ ·çè¯åä½æè½ä¸ç©ºæé
        this.buckets = Array(1000).fill(null)
    }
    hash(key){
        let hash = 0;
        for (const keyElement of key) {
            hash+=keyElement.charCodeAt(0)
                             // ð è·åçæ¯ascç 
        }
        return hash%this.size
    //     ä»è¿ä¹åä¼å¾å°å¾å¤çéå¤ å ä¸º ä¼æå¾å¤1ã2ã3ã4ã5çéå¤
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