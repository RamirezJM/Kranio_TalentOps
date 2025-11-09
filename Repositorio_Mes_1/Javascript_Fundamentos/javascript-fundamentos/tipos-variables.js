// Global y hoisting

console.log('========  Global y Hoisting =========');
(() => {
console.log(`hoisting var -->`, globalVar)
try {
    console.log('hoisting let:', globalLet);
} catch (error) {
    console.log(`hoisting let --> ${error}`);
}

try {
    console.log('hoisting const:', globalConst);
} catch (error) {
    console.log(`hoisting const --> ${error}`);
}
})()

var globalVar = 'soy global var'
let globalLet = 'soy global let'
const globalConst = 'soy global const'

console.log('global var:', globalVar)
console.log('global let:', globalLet)
console.log('global const:', globalConst)

// Function Scope

console.log('========== Function Scope =============')
function functionScope(){
  var functionVar = 'soy function var'
  let functionLet = 'soy function let'
  const functionConst = 'soy function const'

  console.log('var dentro de la función:', functionVar)
  console.log('let dentro de la función:', functionLet)
  console.log('const dentro de la función:', functionConst)
}
functionScope()

try {
  console.log('var fuera de la función:', functionVar);
} catch (error) {
  console.log(`var fuera de la función --> ${error}`);
}

try {
  console.log('let fuera de la función:', functionLet);
} catch (error) {
  console.log(`let fuera de la función --> ${error}`);
}

try {
  console.log('const fuera de la función:', functionConst);
} catch (error) {
  console.log(`const fuera de la función --> ${error}`);
}

// Block Scope

console.log('========= Block Scope =========')

{
  var blockVar = 'soy block var'
  let blockLet = 'soy block let'
  const blockConst = 'soy block const'

  console.log('var dentro de block:', blockVar)
  console.log('let dentro de block:', blockLet)
  console.log('const dentro de block:', blockConst)
}

try {
  console.log('var fuera del block:', blockVar);
} catch (error) {
  console.log(`var fuera del block --> ${error}`);
}

try {
  console.log('let fuera del block:', blockLet);
} catch (error) {
  console.log(`let fuera del block --> ${error}`);
}

try {
  console.log('const fuera del block:', blockConst);
} catch (error) {
  console.log(`const fuera del block --> ${error}`);
}





