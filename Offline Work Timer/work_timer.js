const fs = require('fs');
const LOG_FILE = 'work_timer.json';

function loadTimer() {
    if (fs.existsSync(LOG_FILE)) {
        return JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
    }
    return { totalSeconds: 0, lastStart: null };
}

function saveTimer(data) {
    fs.writeFileSync(LOG_FILE, JSON.stringify(data, null, 2));
}

function startTimer() {
    let data = loadTimer();
    if (!data.lastStart) {
        data.lastStart = Date.now();
        saveTimer(data);
        console.log("Timer started!");
    } else {
        console.log("Timer is already running.");
    }
}

function stopTimer() {
    let data = loadTimer();
    if (data.lastStart) {
        let elapsed = (Date.now() - data.lastStart) / 1000;
        data.totalSeconds += elapsed;
        data.lastStart = null;
        saveTimer(data);
        console.log(`Timer stopped. Total time worked: ${(data.totalSeconds / 3600).toFixed(2)} hours`);
    } else {
        console.log("Timer is not running.");
    }
}

function checkTime() {
    let data = loadTimer();
    let totalTime = data.totalSeconds;
    if (data.lastStart) {
        totalTime += (Date.now() - data.lastStart) / 1000;
    }
    console.log(`Total time worked: ${(totalTime / 3600).toFixed(2)} hours`);
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function askCommand() {
    readline.question("Enter command (start/stop/check/exit): ", (command) => {
        command = command.trim().toLowerCase();
        if (command === "start") startTimer();
        else if (command === "stop") stopTimer();
        else if (command === "check") checkTime();
        else if (command === "exit") return readline.close();
        else console.log("Invalid command.");
        askCommand();
    });
}

askCommand();
