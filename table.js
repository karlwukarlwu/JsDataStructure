const abc = "asderescgd";
function du(arr){
    const tab = {}
    const newA = []
    for (const tabElement of arr) {

        if(tab[tabElement]){
            // 如果有重复这里会触发 然后给数组加上新元素
            newA.push(tabElement)
        }
        // 用元素命名不能重复直接筛选一遍元素
        tab[tabElement]=1
    }
    console.log(tab)
    console.log(newA)
}

du(abc)