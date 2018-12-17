

console.log(process.argv.length);
console.log(process.argv);

if(process.argv.length > 2){
    console.log("process.argv[2] >>> " + process.argv[2]);
}

process.argv.forEach(function(item, index) {
    console.log(item + " : " + index);
});

//console.log(process.env);
console.log(process.env['OS']);
console.log(process.env['Path']);