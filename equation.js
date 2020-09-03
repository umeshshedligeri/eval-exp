
const fs = require('fs');

// Non-blocking example with fs.readFile
const fileNames = process.argv.splice(2);

// fileNames.forEach(fileName => {
//     fs.readFile(fileName, 'utf-8', (error, data) => {
//         if (error) throw error;
//         console.log(fileName, data);
//   });
// });

// Blocking example with fs.readFileSync
const fileName = fileNames[0];
// console.log(fileName, fs.readFileSync(fileName, 'utf-8'));

let data = fs.readFileSync(fileName, 'utf-8')
let fetchedData = JSON.parse(data)
console.log("data :",typeof(JSON.parse(data))) ;

function traverse(fetchedData) {

    if (fetchedData !== null && typeof fetchedData == "object") {
        var z;
        var op1;
        var staticVal;
        var op2;
        var y;
        var topOp;
        Object.entries(fetchedData).forEach(([key, value]) => {
            // key is either an array index or object key
            // traverse(value);

            if (key === "op") {
                topOp = value
            }
            if (key = "rhs") {
                z = value
            }

            if (typeof (value) === "object") {
                Object.entries(value).forEach(([key2, value2]) => {
                    // key is either an array index or object key
                    // traverse(value);


                    if (key2 === "op") {
                        op1 = value2
                    }
                    if (key2 === "lhs") {
                        staticVal = value2
                    }

                    if (typeof (value2) === "object") {
                        Object.entries(value2).forEach(([key3, value3]) => {
                            // key is either an array index or object key
                            // traverse(value);

                            if (key3 === "op") {
                                op2 = value3
                            }
                            if (key3 === "rhs") {
                                y = value3
                            }

                        });
                    }
                });
            }

        });

        var temp1;
        if (op1 === "add") {
            temp1 = "-"
        }
        if (op1 === "subtract") {
            temp1 = "+"
        }

        if (topOp === "equal") {
            topOp = "="
        }

        if (op1 === "add") {
            op1 = "+"
        }
        if (op1 === "multiply") {
            op1 = "*"
        }
        if (op1 === "subtract") {
            op1 = "-"
        }
        if (op1 === "divide") {
            op1 = "/"
        }
        if (op1 === "equal") {
            op1 = "="
        }
        if (op2 === "add") {
            op2 = "+";
        }
        if (op2 === "multiply") {
            op2 = "*"
        }
        if (op2 === "subtract") {
            op2 = "-"
        }
        if (op2 === "divide") {
            op2 = "/"
        }
        if (op2 === "equal") {
            op2 = "="
        }

        console.log("z :", z, "op1 :", op1, "staticVal :", staticVal, "op2 :", op2, "y :", y)

        var operations = {
            "+": function (operand1, operand2) {
                return operand1 + operand2;
            },
            "-": function (operand1, operand2) {
                return operand1 - operand2;
            },
            "*": function (operand1, operand2) {
                return operand1 * operand2;
            },
            "/": function (operand1, operand2) {
                return operand1 / operand2;
            },
            "=": function (operand1, operand2) {
                return operand1 = operand2;
            },

        };

        function accumulate(list, operator) {
            return list.reduce(operations[operator]);
        }

        var x = (z - staticVal) / y
        console.log("x :", x);


        console.log("temp1 :", temp1);
        let temp1Res = accumulate([z, staticVal], temp1)
        var x = accumulate([temp1Res, y], '/')

        let fstRes = accumulate([x, y], op2)
        let finalVal = accumulate([staticVal, fstRes], op1)

        console.log("Expression :", staticVal, op1, '(', "x", op2, y, ')', topOp, z);
        console.log("Transformed Expression :", "x", topOp, '(', z, temp1, staticVal, ')', "/", y);
        console.log("Value of x is  :", x);
        console.log("Final result :", finalVal);

    }
    else {
        // fetchedDataObj is a number or string
    }
}

traverse(fetchedData)