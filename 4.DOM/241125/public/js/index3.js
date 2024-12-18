// 데이터 구조(배열,객체) 특정한 값을 찾기 위해서
// 처음부터 끝까지 차례대로 하나씩 확인하는 탐색 알고리즘
// 가장 간단한 탐색 알고리즘 중 하나.

function linearSearch(array, target) {
    for(let i = 0; i < array.length; i++){    
        if(array[i] === target){
            // 21숫자를 찾았으면 해당 인덱스를 리턴
            return i;
        }
    }
    // 못찾았으면 음수 => -1
    return -1;
}

const search1 = linearSearch([10, 6, 3, 8, 21, 4, 5, 14], 14);
console.log(search1);