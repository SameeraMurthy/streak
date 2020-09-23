function compile(code) {
  let args = code.split(" ").map(s => s.trim()).filter(s => s.length)
  let filter = args.shift()
  return parse(args, filter)
}

const memory = {}
memory.vars = {}
memory.funs = {}

const errors = {
  datatype: "Uncaught Reference Error: Unknown Datatype or Function"
}

function secondPart(str) {
    return str.split(':')[1];
}

function firstPart(str) {
  return str.split(":")[0];
}

function say(d) {
  if (d.join(" ").startsWith("\"") === true && d.join(" ").endsWith("\"") === true) {
    return d.join(" ")
  } else if (d.join(" ").includes(":") && memory.vars[firstPart(d.join(" "))]){
    return getArrayValue(d.join(" "));
  } else if (memory.vars[d.join(" ")]) {
    let value = JSON.stringify(memory.vars[d.join(" ")])
    if (value.startsWith("[") === true && value.endsWith("]") === true || value.startsWith("{") === true && value.endsWith("}") === true ){   
      return value;
    } else {
      return memory.vars[d.join(" ")]
    }
  } else {
    console.error(errors.datatype)
  }
}

function setVar(a, b) {
  if (b.startsWith("[") === true && b.endsWith("]") === true || b.startsWith("{") === true && b.endsWith("}") === true ){
    memory.vars[a] = JSON.parse(b)
  } else {
    memory.vars[a] = b;
  }
}

function getArrayValue(data) {
  if (data.includes(":")) {
    let index = String(secondPart(data))
    let variable = firstPart(data)
    let arr = memory.vars[variable]
    let value = arr[index]
    return value;
  } else {
    return data;
  }
}

function add(a, b) {
  if (memory.vars[a] && memory.vars[b]) {
    return parseFloat(memory.vars[a]) + parseFloat(memory.vars[b]);
  } else if (memory.vars[a]){
    return parseFloat(memory.vars[a]) + parseFloat(b);
  } else if (memory.vars[b]) {
    return parseFloat(a) + parseFloat(memory.vars[b]);
  } else {
    return parseFloat(a) + parseFloat(b);
  }
}

function sub(a, b) {
  if (memory.vars[a] && memory.vars[b]) {
    return parseFloat(memory.vars[a]) - parseFloat(memory.vars[b]);
  } else if (memory.vars[a]){
    return parseFloat(memory.vars[a]) - parseFloat(b);
  } else if (memory.vars[b]) {
    return parseFloat(a) - parseFloat(memory.vars[b]);
  } else {
    return parseFloat(a) - parseFloat(b);
  }
}

function mul(a, b) {
  if (memory.vars[a] && memory.vars[b]) {
    return parseFloat(memory.vars[a]) * parseFloat(memory.vars[b]);
  } else if (memory.vars[a]){
    return parseFloat(memory.vars[a]) * parseFloat(b);
  } else if (memory.vars[b]) {
    return parseFloat(a) * parseFloat(memory.vars[b]);
  } else {
    return parseFloat(a) * parseFloat(b);
  }
}

function div(a, b) {
  if (memory.vars[a] && memory.vars[b]) {
    return parseFloat(memory.vars[a]) / parseFloat(memory.vars[b]);
  } else if (memory.vars[a]){
    return parseFloat(memory.vars[a]) / parseFloat(b);
  } else if (memory.vars[b]) {
    return parseFloat(a) / parseFloat(memory.vars[b]);
  } else {
    return parseFloat(a) / parseFloat(b);
  }
}
function randInt(min, max) {
  min = Math.ceil (min); 
  max = Math.floor (max); 
  return Math.floor (Math.random () * (max - min + 1)) + min;
}

function random(a, b) {
  return randInt(a,b);
}

function setFunc(a, b) {
  if(b.includes(":")) {
    let x = firstPart(b);
    let y = secondPart(b);
    memory.funs[a] = new Function(x, "return " + y);
  }
}

let parse = (data, fname) => {
  switch (fname.trim().toLowerCase()) {
    case "add":
      return data.reduce(add);
      break;
    case "sub":
      return data.reduce(sub);
      break;
    case "mul":
      return data.reduce(mul);
      break;
    case "div":
      return data.reduce(div);
      break;
    case "sqrt":
      return Math.sqrt(parseFloat(data));
      break;
    case "say":
      return say(data);
      break;
    case "random":
      return data.reduce(random)
      break;
    case "let":
      return data.reduce(setVar);
      break;
    case "function":
      return data.reduce(setFunc);
      break;
    default:
      return console.error("Uncaught Reference Error: " + fname + " is not defined. ErrCode 404");
  }
};