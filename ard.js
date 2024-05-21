
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;
// const host = "192.168.137.12";

// Replace with the actual IP address of your NodeMCU ESP32
const esp32IP = '192.168.252.197';

async function onled(){
    await axios.get(`http://${esp32IP}/switch-on`).then((res) => {
      return true;
    }).catch((err) => {
      console.error('Error:+++', err.message);
      onled();
    });

}

async function offled(){
  try{
    await axios.get(`http://${esp32IP}/switch-off`);
    return true;

  }catch(error){
    console.error('Error---:', error.message);
    offled();
  }

}

// API endpoint to switch on the LED
app.get('/switch-on', async (req, res) => {
    var c = onled();
    if(c){
      res.send('LED switched on!');
    }else{
      res.send('LED not switched on!');
    }
});

app.get('/switch-off', async (req, res) => {
    var v = offled();
    // await axios.get(`http://${esp32IP}/switch-on`);
    // res.send('LED switched off!');
    if(v){
      res.send('LED switched off!');
    }else{
      res.send('LED not switched off!');
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
