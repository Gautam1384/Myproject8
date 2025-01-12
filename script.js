let btn = document.querySelector(".microphone-button");
let recognition;
let isMicrophoneOn = false;
let isSpeaking=false;
let lastSpokenText="";

// Initialize Speech Recognition
const initializeRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            console.log("Speech recognition started...");
        };

        recognition.onresult = (e) => {
            if (!isSpeaking && e.results.length > 0) {
                let spokenText = e.results[0][0].transcript.toLowerCase().trim();
                if(spokenText===lastSpokenText.toLowerCase()){
                    console.log("Ignored bot's own voice:",spokenText);
                    return;
                }
                console.log("Recognized Text:", spokenText);
                handleCommands(spokenText);
            }
        };

        recognition.onerror = (err) => {
            console.error("Speech Recognition Error:", err.error);
            if (err.error === "no-speech") {
                speakFunc("I couldn't hear you clearly. Please try again.");
            }
        };

        recognition.onend = () => {
            if (isMicrophoneOn) {
                console.log("Microphone is on. Restarting recognition...");
                recognition.start(); // Restart recognition automatically if mic is on
            } else {
                console.log("Microphone is off.");
            }
        };
    } else {
        alert("Your browser does not support voice input!");
    }
};

// Speak Function
const speakFunc = (input) => {
    isSpeaking=true;
    lastSpokenText=input;
    if(recognition){
        recognition.stop();
        console.log("Microphone turned off during speech.");
    }
    let speakInput = new SpeechSynthesisUtterance(input);
    speakInput.rate = 1;
    speakInput.lang = 'en-IN';
    speakInput.volume = 1.5;
    speakInput.pitch=1.2;
    speakInput.onend=()=>{
        isSpeaking=false;
        console.log("Bot finished speaking.");
        // setTimeout(()=>{
        if(isMicrophoneOn ){
            recognition.start();
            console.log("Microphone turned back on.");
        }
    };
    
    window.speechSynthesis.speak(speakInput);
    console.log("Bot Response:", input);
};

// Greeting Function
const greetingFunc = () => {
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 0 && hour < 12) {
        return "Good Morning Sir!";
    } else if (hour >= 12 && hour < 16) {
        return "Good Afternoon Sir!";
    } else {
        return "Good Evening Sir!";
    }
};

// Handle User Commands
const handleCommands = (command) => {
    console.log("Processing Command:", command);

    const greetings = ["hi", "hello", "hey"];
   if(greetings.some((greet)=>command.includes(greet))){
  let greeting=greetingFunc();
speakFunc(`Hello! ${greeting} How can I help you?`);
    }
else if(command.includes("who are you")||command.includes("developed")){
        speakFunc("I am Virtual Assistant, Developed by K Harish Shankar!");
    }
    else if(command.includes("please open google")||command.includes("google")){
        speakFunc("Opening......google");
        window.open("https://www.google.com");
    }
    else if(command.includes("please open youtube")||command.includes("youtube")){
        speakFunc("Opening......youtube");
        window.open("https://www.youtube.com");
    }
    else if(command.includes("please open facebook")||command.includes("facebook")){
        speakFunc("Opening......facebook");
        window.open("https://www.facebook.com");
    }
    else if(command.includes("please open instagram")||command.includes("instagram")){
        speakFunc("Opening......instagram");
        window.open("https://www.instagram.com");
    }
    else if(command.includes("please open spotify")||command.includes("spotify")){
        speakFunc("Opening......spotify");
        window.open("https://www.spotify.com");
    }
    else if(command.includes("please open flipkart")||command.includes("flipkart")){
        speakFunc("Opening......flipkart");
        window.open("https://www.flipkart.com");
    }
    else if(command.includes("please open amazon")||command.includes("amazon")){
        speakFunc("Opening......amazon");
        window.open("https://www.amazon.com");
    }
    else if(command.includes("please open whatsapp")||command.includes("whatsapp")){
        speakFunc("Opening......whatsApp");
        window.open("https://www.whatsapp.com");
    }
    else if(command.includes("please open netflix")||command.includes("netflix")){
        speakFunc("Opening......Netflix");
        window.open("https://www.netflix.com");
    }
    else if(command.includes("please open amazonprime")||command.includes("prime video")){
        speakFunc("Opening......amazonprime");
        window.open("https://www.primevideo.com");
    }
    else if(command.includes("please open hotstar")||command.includes("hotstar")){
        speakFunc("Opening......hotstar");
        window.open("https://www.hotstar.com");
    }
        else if(command.includes("please open chatgpt")||command.includes("chatgpt")){
            speakFunc("Opening......Chatgpt");
            window.open("https://chat.openai.com");
    }
    else if(command.includes("please open geeks for geeks website")||command.includes("geeks for geeks")){
        speakFunc("Opening......geeks for geeks website");
        window.open("https://www.geeksforgeeks.org");
    }
    else if(command.includes("please open w3 schools website")||command.includes("w3 schools")){
        speakFunc("Opening......w3 Schools website");
        window.open("https://www.w3schools.com");
    }
    else if(command.includes("please open calculator")){
        speakFunc("Opening....... Calculator");
        window.open("calculator://");
    }
    else if(command.includes("tell me what's the time now")||command.includes("tell me time")){
        let time=new Date().toLocaleString(undefined,{hour:'numeric',minute:'numeric'})
        speakFunc(time);
    }
    else if(command.includes("tell me what's the date today")||command.includes("tell me date today")){
        let date=new Date().toLocaleString(undefined,{day:'numeric',month:'long'})
        speakFunc(date);
    }
    else if(command.match(/\bwill you marry me\b/)){
        speakFunc("Sorry!Unfortunately I'm Virtual Assistant so I could not tie a knot with you.But if i were a girl then would have given a second thought about it.");
    }
    else if(command.match(/\bi love you\b/)){
        speakFunc(" I love you too! but Being a Virtual assistant I will always stay loyal to my creator K Harish!");
    }
    else if(command.match(/\bwill you sex with me\b/)){
        speakFunc("I'm Virtual assistant but to be very honest you are a biggest tharkiii, you need to evolve");
    }
    else{
        speakFunc(`This is what, I found on internet regarding ${command}`);
        window.open(`https://www.google.com/search?q=${command}`);
    }
console.log("Unrecognized command:",command);
}

// Start Voice Input
const startVoiceInput = () => {
    if (recognition) {
        recognition.start();
    } else {
        console.error("Speech Recognition not initialized.");
    }
};

// Stop Voice Input
const stopVoiceInput = () => {
    if (recognition) {
        recognition.stop();
        console.log("Speech recognition stopped.");
    }
};

// Button Event Listeners
btn.onmousedown = () => {
    if (!isMicrophoneOn) {
        isMicrophoneOn = true;
        btn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i>';
         speakFunc("Microphone is now on. You can speak.");
        startVoiceInput();
    }
};

btn.onmouseup = () => {
    if (isMicrophoneOn) {
        isMicrophoneOn = false;
        btn.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
         speakFunc("Microphone is now off.");
        stopVoiceInput();
    }
};

// Initialize Speech Recognition on Page Load
window.onload = () => {
    initializeRecognition();
};