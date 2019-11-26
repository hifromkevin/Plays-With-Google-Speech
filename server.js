const express = require('express');
const speech = require('@google-cloud/speech');
const fs = require('fs');

const app = express();
const port = 2337;

app.use(express.static(__dirname + '/client/dist'));

app.get('/googz', (req, res) => {

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
  
  main().then(x => res.json(x))
});

app.listen(port, () => console.log( `Listening on ${port}`))