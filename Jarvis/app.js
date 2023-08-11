const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speakOutBtn = document.querySelector("#speak");

//Speech recognition Setup

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

//sr start
recognition.onstart = function () {
  console.log("vr active");
};

//sr continuos
recognition.continuous = true;

//sr result
recognition.onresult = function (event) {
    
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    transcript = transcript.toLowerCase()
    console.log(`my words : ${transcript}`);

    if(transcript.includes("hello dot")) {
        readOut("hello sir");
    }
    if(transcript.includes("open youtube")) {
        readOut("opening youtube sir");
        window.open("https://www.youtube.com/");
    }
    if (transcript.includes("open google")) {
          readOut("opening google sir");
          window.open("https://www.google.com/");
    }

    //google search

    if(transcript.includes("search for")) {
        readOut("here's the result");
        let input = transcript.split("")
        input.splice(0,11);
        input.pop();
        input = input.join("").split("").join("+");
        console.log(input);
        window.open(`https://www.google.com/search?q=${input}`);
    }

    // readOut(transcript)
    // console.log(transcript);
}

//sr stop
recognition.onend = function () {
  console.log("vr deactivate");
};

startBtn.addEventListener("click", () => {
  recognition.start();
});

stopBtn.addEventListener("click", () => {
  recognition.stop();
});

function readOut(message) {
  const speech = new SpeechSynthesisUtterance();
  speech.volume = 1;
  if ("speechSynthesis" in window) {
    // Create a new SpeechSynthesisUtterance instance
    const speech = new SpeechSynthesisUtterance();

    // Set the text you want to be spoken
    const allVoices = speechSynthesis.getVoices()
    speech.text = message;
    // speech.voice = allVoices[13]
    // Speak the text
    window.speechSynthesis.speak(speech);
  } else {
    console.log("Speech synthesis is not supported in this browser.");
  }
  console.log("speaking out");
}

speakOutBtn.addEventListener("click", () => {
  readOut("hi, rubby ki koro");
});
