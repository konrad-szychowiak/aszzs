function sortByFrequency(array) {
    var frequency = {};

    array.forEach(function(value) { frequency[value] = 0; });

    var uniques = array.filter(function(value) {
        return ++frequency[value] == 1;
    });

    return uniques.sort(function(a, b) {
        return frequency[b] - frequency[a];
    });
}

Quagga.init({
    inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#container')
    },
    decoder : {
        readers : ["code_128_reader"]
    }
}, function(err) {
    if (err) {
        console.log(err);
        return
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
});

var results= [];
Quagga.onDetected(function (result){
    var last_code = result.codeResult.code;
    results.push(last_code);
    if(results.length > 10) {
        code = sortByFrequency(results)[0]; //code that we need to recognise products
        results = [];
        Quagga.stop();
        console.log(code);
        document.getElementById("ProductCode").innerHTML = code;
    }

});

let video = document.querySelector("#videoElement");

if(navigator.mediaDevices.getUserMedia()) {
    navigator.mediaDevices.getUserMedia({video: true})
        .then(function (stream){
            video.srcObject = stream;
        })
        .catch(function (error){
            console.log("Something went wrong D:");
        })
}else{
    console.log("getUserMedia not supported");
}
