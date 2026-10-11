import { useState } from 'react'
import { useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { PlayerCard, type Player } from "./PlayerCard";




function App() {
  const [players,setPlayers] = useState<Player[]>([])
  const [search, setSearch] = useState("");
  const [sortDesc, setSortDesc] = useState(true);
  const [newName, setNewName] = useState("")
  const [newPPG, setNewPPG] = useState("")
  const filteredPlayers = 
    players
      .filter((player) =>
        player.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a,b) => {
        return sortDesc ? b.ppg - a.ppg : a.ppg - b.ppg});
  useEffect(() => {
    async function getPlayers() {
      const response = await fetch("http://127.0.0.1:8000/players")
      const data = await response.json()
      setPlayers(data)
    }
    getPlayers()
    console.log("Component loaded")
  }, []);

  async function addPlayer() {
    const response = await fetch("http://127.0.0.1:8000/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newName,
        ppg: Number(newPPG)
      })
    });
    if (!response.ok) {
      console.log("Failed to add player");
      return;
    }
    const newPlayer = await response.json();
    setPlayers((currentPlayers) => [...currentPlayers, newPlayer]);
    setNewName("");
    setNewPPG("");
  }

  return (
    <div>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <p>You are searching for: {search}</p>
      <button type="button" onClick={() => setSortDesc((current) => !current)}>
        {sortDesc ? "PPG DESC" : "PPG ASC"}
      </button>
      <h1>NBA Player Explorer</h1>
        {filteredPlayers
          .map((player) => (
            <PlayerCard key={player.id} id={player.id} name={player.name} ppg={player.ppg}/>
          ))}
        {filteredPlayers.length === 0 && <p>No players found.</p>}

      <h2></h2>
      <label>
        Player Name
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}/>
      </label>


      <label>
        Points per game
        <input
          value={newPPG}
          type="number"
          onChange={(event) => setNewPPG(event.target.value)}/>
      </label>

      <button type="button" onClick={addPlayer}>
        Add Player</button>
    </div>
  );
}

export default App
