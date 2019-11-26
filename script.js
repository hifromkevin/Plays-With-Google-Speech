const speech = require('@google-cloud/speech');
const fs = require('fs');
// import { speech } from '@google-cloud/speech';
// import fs from 'fs';

async function main() {
  const client = new speech.SpeechClient();
  const fileName = './resources/audio.wav';

  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString('base64');

  const audio = {
    content: audioBytes
  };

  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US'
  };

  const request = {
    audio: audio,
    config: config
  };

  const [response] = await client.recognize(request);
  const transcription = response.results.map(results => results.alternatives[0].transcript).join('\n');
  console.log('T', transcription);
  return transcription;
}

let f = main().then(x => console.log('!',x))

console.log('f gon give it to ya', f);

// document.getElementById('lit').innerHTML = f;