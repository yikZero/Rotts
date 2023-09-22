from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from io import BytesIO
from edge_tts import Communicate

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://*.vercel.app",
    "https://*.yikzero.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SpeechData(BaseModel):
    text: str
    voice: str
    rate: int
    volume: int
    pitch: int


async def generateSpeech(text, voice, rate, volume, pitch, mp3Data):

    rate_str = f"{rate:+d}%"
    volume_str = f"{volume:+d}%"
    # pitch_str = f"{pitch:+d}Hz"

    communicate = Communicate(text, voice, rate=rate_str, volume=volume_str)
    mp3Data = BytesIO()
    async for message in communicate.stream():
        if message["type"] == "audio":
            mp3Data.write(message["data"])

    mp3Data.seek(0)
    return mp3Data


@app.post("/api/generateSpeech")
async def generateSpeechRoute(data: SpeechData):
    mp3Data = BytesIO()
    mp3Data = await generateSpeech(data.text, data.voice, data.rate, data.volume, data.pitch, mp3Data)

    return StreamingResponse(
        mp3Data,
        headers={
            "Content-Type": "audio/mp3",
            "Content-Disposition": "attachment; filename=generated_speech.mp3"
        }
    )


@app.get("/api/listVoices")
async def listVoices():
    return {
        "listVoices": [
            {
                "Name": "zh-CN-YunjianNeural",
                "Gender": "Male",
                "Description": "体育解说风格",
                "ShortName": "云健"
            },
            {
                "Name": "zh-CN-YunxiNeural",
                "Gender": "Male",
                "Description": "轻松叙述 聊天",
                "ShortName": "云希"
            },
            {
                "Name": "zh-CN-YunxiaNeural",
                "Gender": "Male",
                "Description": "情感比较丰富",
                "ShortName": "云夏"
            },
            {
                "Name": "zh-CN-YunyangNeural",
                "Gender": "Male",
                "Description": "专业性较强",
                "ShortName": "云扬"
            },
            {
                "Name": "zh-CN-XiaoxiaoNeural",
                "Gender": "Female",
                "Description": "暂无数据",
                "ShortName": "晓晓"
            },
            {
                "Name": "zh-CN-XiaoyiNeural",
                "Gender": "Female",
                "Description": "暂无数据",
                "ShortName": "晓伊"
            },
            {
                "Name": "zh-CN-liaoning-XiaobeiNeural",
                "Gender": "Female",
                "Description": "辽宁口音 亲切",
                "ShortName": "辽宁晓蓓"
            },
            {
                "Name": "zh-CN-shaanxi-XiaoniNeural",
                "Gender": "Female",
                "Description": "山西口音",
                "ShortName": "陕西晓妮"
            }
        ]
    }


@app.get("/")
def home():
    return {"message": "Welcome to Rotts!"}
