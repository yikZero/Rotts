from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from io import BytesIO
import edge_tts
import subprocess

app = FastAPI()

origins = [
    "http://localhost:5173",  # 本地开发环境
    "https://rotts.yikzero.com",  # 线上环境
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

def generateSpeech(text, voice, rate, volume, pitch, mp3Data):
    cmd = ["edge-tts", "--text", text, "--voice", voice]

    if rate != 0:
        cmd.extend([f"--rate={'+' if rate > 0 else ''}{rate}%"])
    if volume != 0:
        cmd.extend([f"--volume={'+' if volume > 0 else ''}{volume}%"])
    if pitch != 0:
        cmd.extend([f"--pitch={'+' if pitch > 0 else ''}{pitch}Hz"])

    result = subprocess.run(cmd, stdout=subprocess.PIPE)
    mp3Data.write(result.stdout)


@app.post("/api/generateSpeech")
async def generateSpeechRoute(data: SpeechData):
    mp3Data = BytesIO()
    generateSpeech(data.text, data.voice, data.rate, data.volume, data.pitch, mp3Data)
    mp3Data.seek(0)
    return StreamingResponse(mp3Data, headers={"Content-Type": "audio/mp3", "Content-Disposition": "attachment; filename=generated_speech.mp3"})

def getDescriptionByName(name):
    descriptions = {
        "zh-CN-YunjianNeural": "体育解说风格",
        "zh-CN-YunxiNeural": "轻松叙述 聊天",
        "zh-CN-YunxiaNeural": "情感比较丰富",
        "zh-CN-YunyangNeural": "专业性较强",
        "zh-CN-XiaobeiNeural": "暂无数据",
        "zh-CN-XiaoniNeural": "暂无数据",
        "zh-CN-XiaoxiaoNeural": "暂无数据",
        "zh-CN-XiaoyiNeural": "暂无数据",
        "zh-CN-liaoning-XiaobeiNeural": "辽宁口音 亲切",
        "zh-CN-shaanxi-XiaoniNeural": "山西口音",
    }
    return descriptions.get(name, "暂无数据")

def parseVoices(lines):
    voices = []
    
    for i in range(0, len(lines), 3):
        name = lines[i].split(": ")[1]
        gender = lines[i + 1].split(": ")[1]
        
        if not name.startswith("zh-CN"):
            continue
        
        description = getDescriptionByName(name)
        voiceInfo = {"Name": name, "Gender": gender, "Description": description}
        voices.append(voiceInfo)
            
    sortedVoices = sorted(voices, key=lambda x: x['Gender'], reverse=True)
            
    return {"listVoices": sortedVoices}

voiceCache = None

@app.get("/api/listVoices")
async def listVoices():
    result = subprocess.run(['edge-tts', '--list-voices'], stdout=subprocess.PIPE)
    voices = result.stdout.decode('utf-8').splitlines()
    voiceData = parseVoices(voices)
    return voiceData

@app.get("/")
def home():
    return {"message": "Welcome to Rotts!"}
