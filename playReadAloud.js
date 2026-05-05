let speechInstance = window.speechSynthesis;
let isPaused = false;
let chunks = [];
let currentChunkIndex = 0;

function playReadAloud() {
    // 1. Resume if it was just paused
    if (speechInstance.paused && isPaused) {
        speechInstance.resume();
        isPaused = false;
        return;
    }

    // 2. Fresh start: clear current speech and queue
    stopReadAloud();

    // 3. COLLECT: Grab all elements with the 'read-aloud' class
    const nodes = document.querySelectorAll('.read-aloud');
    let combinedText = "";
    
    nodes.forEach(node => {
        // Add a period after each block to ensure a natural pause between sections
        combinedText += node.innerText.trim() + ". ";
    });

    // 4. CHUNK: Break text into sentences to prevent browser timeout
    // Splits at periods, question marks, and exclamation points
    chunks = combinedText.match(/[^\.!\?]+[\.!\?]+/g) || [combinedText];
    
    if (chunks.length === 0 || combinedText.trim() === "") {
        console.warn("No text found in '.read-aloud' classes.");
        return;
    }

    currentChunkIndex = 0;
    speakNextChunk();
}

function speakNextChunk() {
    if (currentChunkIndex < chunks.length) {
        let utterance = new SpeechSynthesisUtterance(chunks[currentChunkIndex].trim());
        
        // Professional, educational settings
        utterance.rate = 0.9; 
        utterance.pitch = 1.0;
        utterance.lang = 'en-US';

        utterance.onstart = () => {
            // Optional: You could add a 'highlighting' class here to the active text
        };

        utterance.onend = () => {
            if (!isPaused) {
                currentChunkIndex++;
                speakNextChunk();
            }
        };

        utterance.onerror = (event) => {
            console.error("SpeechSynthesis Error:", event);
            currentChunkIndex++;
            speakNextChunk();
        };

        speechInstance.speak(utterance);
    } else {
        stopReadAloud(); // Reset when finished
    }
}

function pauseReadAloud() {
    if (speechInstance.speaking && !isPaused) {
        speechInstance.pause();
        isPaused = true;
    }
}

function stopReadAloud() {
    speechInstance.cancel();
    chunks = [];
    currentChunkIndex = 0;
    isPaused = false;
}