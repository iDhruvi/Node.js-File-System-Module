/*
Node.js program to do the following:
- Create Directory 
- Remove Directory 
- Write File 
- Read File 
- Delete File
- Append data to file
- Update / Replace file with new data
- Rename File
*/

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var fs = require("fs");
var fileName = "";
var data = "";
var dir = "";

var createFile = () => {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("File created Successfully..");
        }
        repeat();
    });
};

var createFileWizard = () => {
    console.log("Welcome to Create File Wizard");
    rl.question("Enter File Name: ", (ans) => {
        fileName = ans + ".txt";
        rl.question("Enter Content of File: ", (ans) => {
            data = ans;
            createFile(); 
        });
    });
    
    
};

var writeFile = () => {
    rl.question("Enter Data : ", (ans) => {
        data = ans;
        fs.writeFile(fileName, data, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Data Written Successfully..");
            }
            repeat();
        });
    });
};

var readFile = () => {
    fs.readFile(fileName, "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Contant of File: " + data.toString());
        }
        repeat(); 
    });
};

var deleteFile = () => {
    fs.unlink(fileName, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("File Deleted Successfully..");
        }
        repeat();
    });
};

var appendData = () => {
    rl.question("Enter Data to Append into File: ", (ans) => {
        data = ans;
        fs.appendFile(fileName, data, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Data Appended into File..");
            }
            repeat();
        });
    });
};

var updateFile = () => {
    rl.question("Enter Data to Update File: ", (ans) => {
        data = ans;
        fs.writeFile(fileName, data, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Data Updated into File..");
            }
            repeat();
        });
    });
};

var renameFile = () => {
    rl.question("Enter File's New Name: ", (ans) => {
        var newfileName = ans + ".txt";
        fs.rename(fileName, newfileName, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File Renamed Successfully..");
                fileName = newfileName;
            }
            repeat();
        });
    });
};

var createDir = () => {
    rl.question("Enter Directory Name: ", (ans) => {
        dir = ans;
        fs.mkdir(dir, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Directory is created..");
            }
            repeat();
        });
    });
};

var removeDir = () => {
    rl.question("Enter Directory Name to Remove: ", (ans) => {
        dir = ans;
        fs.rmdir(dir, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Directory is removed..");
            }
            repeat();
        });
    });
};

var info = () => {
    console.log("\n1. For Create a new File");
    console.log("2. For Write data in a File");
    console.log("3. For Read data from a File");
    console.log("4. For Delete a File");
    console.log("5. For Append data to File");
    console.log("6. For Update File");
    console.log("7. For Rename a File");
    console.log("8. For Create Directory");
    console.log("9. For Remove Directory");
    console.log("10. For Exit");
};

var start = () => {
    rl.question("\nEnter Your Choice: ", (ans) => {
        switch (ans) {
            case "1":
                createFileWizard();
                break;

            case "2":
                writeFile();
                break;
            
            case "3":
                readFile();
                break;

            case "4":
                deleteFile();
                break;

            case "5":
                appendData();
                break;

            case "6":
                updateFile();
                break;

            case "7":
                renameFile();
                break;

            case "8":
                createDir();
                break;

            case "9":
                removeDir();
                break;

            case "10":
                rl.close();
                break;
            
            default:
                console.log("Please Enter Valid Input");
                repeat();
        }
    });
};

var repeat = () => {
    info();
    start();
};

var begin = () => {
    console.log("\n1. Work with Existing File");
    console.log("2. Create a new File");
    rl.question("Enter your choice: ", (ans) => {
        var ch = ans;
        if (ch === "1") {
            rl.question("Enter Name of File: ", (ans) => {
                fileName = ans + ".txt";
                fs.access(fileName, fs.constants.F_OK, (err) => {
                    if (err) {
                        console.log("File does not Exits");
                        begin();
                    } else {
                        repeat();
                    }
                });
            });
        } else {
            createFileWizard();
        }
    });
};

console.log("Welcome..");
begin();