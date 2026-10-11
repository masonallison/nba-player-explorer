export type Player = {
    id: number
    name: string
    ppg:number
  }
  

export function PlayerCard({name, ppg}: Player) {
    return (
      <div>
      <h2>Player Name: {name}</h2>
      <p>Points per game: {ppg}</p>
    </div>
    )
  }