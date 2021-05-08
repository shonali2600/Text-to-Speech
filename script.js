const synth = window.speechSynthesis;

const form = document.getElementsByTagName('form')[0];
const text = document.getElementById('text');
const rate = document.getElementById('rate');
const rateValue = document.getElementById('rate-value');
const pitch = document.getElementById('pitch');
const pitchValue = document.getElementById('pitch-value');
const voiceOption = document.getElementById('voice-option');

let voices = [];

const getDiffVoices = () => {
    voices = synth.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name + '(' + voice.lang + ')';
        option.setAttribute('data-name', voice.name);
        option.setAttribute('data-lang', voice.lang);
        voiceOption.appendChild(option);
    });
}

getDiffVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getDiffVoices;
}

const speak = () => {
    if (synth.speaking) {
        return;
    }
    if (text.value !== '') {
        const speakText = new SpeechSynthesisUtterance(text.value);

        const selectedVoice = voiceOption.selectedOptions[0].getAttribute('data-name')

        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        synth.speak(speakText);
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    speak();
});

voiceOption.addEventListener('change', () => speak());

rate.addEventListener('change', () => rateValue.textContent = rate.value);
pitch.addEventListener('change', () => pitchValue.textContent = pitch.value);
