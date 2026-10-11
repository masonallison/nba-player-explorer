from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psycopg
from psycopg.rows import dict_row
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class PlayerCreate(BaseModel):
    name: str
    ppg: float


@app.get("/")
def home():
    return  {"message": "Hello from my NBA API"}

@app.get("/players")
def get_players():
    conn = psycopg.connect(
        "dbname=nba_players user=masonallison",
        row_factory=dict_row
    )
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM players")
        rows = cur.fetchall()
    conn.close()
    return rows

@app.post("/players")
def create_player(player: PlayerCreate):
    conn = psycopg.connect(
        "dbname=nba_players user=masonallison",
        row_factory=dict_row
    )
    with conn.cursor() as cur:
        cur.execute(
            "INSERT INTO players (name, ppg) VALUES (%s, %s) RETURNING *",
            (player.name, player.ppg)
        )
        new_player = cur.fetchone()
    conn.commit()
    conn.close()
    return new_player

