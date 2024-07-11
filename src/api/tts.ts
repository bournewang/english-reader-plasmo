// import '../jsbrowserpackageraw.js';
// import { SpeechSynthesizer, SpeechConfig, SpeechSynthesisResult, ResultReason } from 'microsoft-cognitiveservices-speech-sdk';

// export class SpeechSynthesizerSingleton {
//   private static instance: SpeechSynthesizer | null = null;

//   private constructor() {}

//   public static getInstance(): SpeechSynthesizer {
//     if (!SpeechSynthesizerSingleton.instance) {
//       const sdk = (window as any).SpeechSDK;
//       const subscriptionKey = process.env.REACT_APP_TTS_API_KEY || '';
//       const location = process.env.REACT_APP_TTS_LOCATION || '';
//     //   const subscriptionKey = 'f6e22df4e31f4700a7d99201d9a01796'
//     //   const location = 'eastasia' 
//       if (sdk && subscriptionKey && location) {
//         const speechConfig = SpeechConfig.fromSubscription(subscriptionKey, location);
//         SpeechSynthesizerSingleton.instance = new sdk.SpeechSynthesizer(speechConfig);
//       } else {
//         throw new Error('Failed to initialize the speech SDK or environment variables are not set');
//       }
//     }
//     return SpeechSynthesizerSingleton.instance as SpeechSynthesizer; 
//   }
// }

// export function speakText(text: string) {
//   const synthesizer = SpeechSynthesizerSingleton.getInstance();

//   synthesizer.speakTextAsync(
//     text,
//     (result: SpeechSynthesisResult) => {
//       if (window.SpeechSDK && result.reason === ResultReason.SynthesizingAudioCompleted) {
//         console.log('Synthesis finished.');
//       } else {
//         console.error('Speech synthesis canceled: ' + result.errorDetails);
//       }
//     },
//     (error: any) => {
//       console.error(error);
//     }
//   );
// }

export function speakText(text: string) {
    console.log(text)
}