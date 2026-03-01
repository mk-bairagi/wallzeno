from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Wallzeno API", version="0.2.0")

# Allow frontend (localhost:3000) to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

dummy_wallpapers = [
    {
        "id": "1",
        "title": "Dark Mountain",
        "slug": "dark-mountain",
        "thumb_url": "https://picsum.photos/400/300",
        "is_premium": False,
    },
    {
        "id": "2",
        "title": "Neon City",
        "slug": "neon-city",
        "thumb_url": "https://picsum.photos/400/301",
        "is_premium": True,
    },
]

@app.get("/health")
def health():
    return {"status": "ok", "service": "wallzeno-backend"}

@app.get("/wallpapers")
def get_wallpapers():
    return {
        "items": dummy_wallpapers,
        "total": len(dummy_wallpapers)
    }