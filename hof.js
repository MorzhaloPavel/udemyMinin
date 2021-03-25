const numbers = [1, 2, 3, 4, 5]

function qwqw(n) {
  return function(aaa) {
    return aaa.map( d => d += n)
  }
}

const addA = qwqw(1)
const addF = qwqw(5)

console.log(addA(numbers))
console.log(addF(numbers))
