function submitKeyword() {
    let keyword = document.getElementById('kind');
    const spawn = require('child_process').spawn;
    const pythonProcess = spawn('python', ['reader.py', keyword]);

    // document.getElementById('result1label').innerHTML = 'hello';

    pythonProcess.stdout.on('data', (data) => {
        for (let i = 0; i < data.length; i++) {
            // document.getElementById('result1').innerHTML = 'test'
        }
    });

    console.log('done');

    return false;
}


