import '~jsbrowserpackageraw.js';

export class SpeechSynthesizerSingleton {
    private static instance: object;

    private constructor() { }

    public static getInstance() {
        if (!SpeechSynthesizerSingleton.instance) {
            const sdk = window.SpeechSDK;
            const subscriptionKey = process.env.PLASMO_PUBLIC_TTS_API_KEY;
            const location = process.env.PLASMO_PUBLIC_TTS_LOCATION;        

            if (sdk && subscriptionKey && location) {
                const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, location);
                SpeechSynthesizerSingleton.instance = new sdk.SpeechSynthesizer(speechConfig);
            } else {
                throw new Error("Failed to initialize the speech SDK or environment variables are not set");
            }
        }
        return SpeechSynthesizerSingleton.instance;
    }
}

export function speakText(text) {
    const synthesizer = SpeechSynthesizerSingleton.getInstance();

    synthesizer.speakTextAsync(
        text,
        result => {
            if (SpeechSDK && result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
                console.log("Synthesis finished.");
            } else {
                console.error("Speech synthesis canceled: " + result.errorDetails);
            }
        },
        error => {
            console.error(error);
        }
    );
}
