let mediaRecorder;
const availableSize = document.getElementById("available-size");
const MEDIA_RECORDER_TIME_SLICE = 1000; // 1 second

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        let bufferedChunks = [];
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = function(event) {
            console.log("Data available:", event.data);
            availableSize.textContent = event.data.size;

            if (event.data.size > 0) {
                bufferedChunks.push(event.data);
            }
        };
        mediaRecorder.onstop = function() {
            console.log("Recording stopped");
            const audioBlob = new Blob(bufferedChunks, { type: mediaRecorder.mimeType });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioElement = document.getElementById("recordedAudio");
            audioElement.src = audioUrl;
            bufferedChunks = []; // Clear the buffer for the next recording
        };
        console.log("Recording started");
        mediaRecorder?.start(MEDIA_RECORDER_TIME_SLICE);
    } catch (error) {
        console.error("Error accessing media devices.", error);
    }
}

document.getElementById("playStartButton").addEventListener("click", function() {
    const audioElement = document.getElementById("sampleAudio");
    audioElement.onended = function() {
        startRecording();
    };
    audioElement.play().catch(error => {
        console.error("Error playing audio:", error);
    });
});

document.getElementById("playButton").addEventListener("click", function() {
        const audioElement = document.getElementById("sampleAudio");
    audioElement.onended = function() {
    };
    audioElement.play().catch(error => {
        console.error("Error playing audio:", error);
    });
});

document.getElementById("startButton").addEventListener("click", function() {
    startRecording();
});

document.getElementById("stopButton").addEventListener("click", function() {
    mediaRecorder?.stop();
});