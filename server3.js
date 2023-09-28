import express from 'express';
const app= express();
const hostname ='127.0.0.1';
import path from 'path';
import fs from 'fs';
import { isUtf8 } from 'buffer';
const rawData = fs.readFileSync('SteamGames.json');
const gamesData = JSON.parse(rawData);
app.use(express.json());


app.get('/game', (req, res) => {
    res.status(200).json(gamesData);
  });
const port =process.env.PORT || 9090;
app.get('/',(req,res)=>{
res.status(200).json({message : 'hello world! '});
})
app.get('/game/select/:year', (req, res) => {
    const year = parseInt(req.params.year);
    const filteredGames = gamesData.filter((game) => game.Year > year);
    res.status(200).json(filteredGames);
  });
  
  app.get('/game/:name', (req, res) => {
    const gameName = req.params.name;
    const game = gamesData.find((game) => game.Game === gameName);
    if (game) {
      res.status(200).json({ GameLink: game.GameLink });
    } else {
      res.status(404).json({ message: "the "+req.params.name+" game is not avalable " });
    }
  });
  
app.listen(port,hostname,()=>{
    console.log(`server running at http://${hostname}:${port}/`);
})
