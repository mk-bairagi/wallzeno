from fastapi import FastAPI

app = FastAPI(title="Wallzeno API", version="0.1.0")

@app.get("/health")
def health():
    return {"status": "ok", "service": "wallzeno-backend"}