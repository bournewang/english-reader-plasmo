// Import the Azure Speech SDK
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

// Your Azure subscription key and service region
const subscriptionKey = process.env.REACT_APP_TTS_API_KEY;
const serviceRegion = process.env.REACT_APP_TTS_LOCATION; // e.g., 'eastus'

// Function to convert text to speech
export function speakText(text: string) {
    // Create an instance of the speech config with your subscription key and service region
    const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    
    // Create a speech synthesizer using the speech config
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

    // Speak the text
    synthesizer.speakTextAsync(
        text,
        result => {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                console.log('Synthesis finished.');
            } else {
                console.error('Speech synthesis canceled, ' + result.errorDetails);
            }
            synthesizer.close();
        },
        error => {
            console.error('Error: ', error);
            synthesizer.close();
        }
    );
}

// Example usage
// speechText('Hello, this is a text to speech example using Azure Speech SDK.');