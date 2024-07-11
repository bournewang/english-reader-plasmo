interface Window {
    SpeechSDK: any;
}
// interface Window {
//     SpeechSDK: typeof import("microsoft-cognitiveservices-speech-sdk");
// }
declare var process: {
    env: {
        REACT_APP_API_URL: string;
        REACT_APP_TRANSLATE_API_KEY: string;
        REACT_APP_TRANSLATE_LOCATION: string;
        REACT_APP_TTS_API_KEY: string;
        REACT_APP_TTS_LOCATION: string;
    };
};  

declare const chrome: any;

declare module '*.png' {
    const value: string;
    export default value;
  }
