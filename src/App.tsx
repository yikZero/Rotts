import { useState } from "react";

import TextInput from "@/components/text-input";
import VoicesList from "@/components/voice-list";
import VolumeSelector from "@/components/volume-selector";
import RateSelector from "@/components/rate-selector";
import PitchSelector from "@/components/pitch-selector";
import RottsPlayer from "@/components/rotts-player";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Speech, Loader2 } from "lucide-react";

import { productName } from "./metadata";

export default function App() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("");
  const [rate, setRate] = useState(0);
  const [volume, setVolume] = useState(0);
  const [pitch, setPitch] = useState(0);

  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);

  const generateSpeech = async () => {
    if (isGenerating) return;

    setIsGenerating(true);

    const res = await fetch("/api/generateSpeech", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice, rate, volume, pitch }),
    });

    setIsGenerating(false);

    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setShowPlayer(true);
    }
  };

  const downloadAudio = () => {
    if (!audioUrl) return;
    const link = document.createElement("a");
    link.href = audioUrl;

    const now = new Date();
    const datestamp = `${String(now.getFullYear()).slice(-2)}${String(
      now.getMonth() + 1
    ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;

    link.download = `RottsAudio_${datestamp}.mp3`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto justify-center h-screen -mt-12">
        <h1 className="text-2xl font-bold text-gray-900">{productName}</h1>
        <div className="grid grid-cols-12 gap-6">
          <TextInput className="col-span-7 h-full" onChange={setText} />
          <div className="col-span-5 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <VoicesList onChange={setVoice} />
              <VolumeSelector
                defaultValue={[0]}
                onChange={(newValue) => setVolume(newValue[0])}
              />
              <RateSelector
                defaultValue={[0]}
                onChange={(newValue) => setRate(newValue[0])}
              />
              <PitchSelector
                defaultValue={[0]}
                onChange={(newValue) => setPitch(newValue[0])}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div
                className={`transition-all duration-300 ease-in-out transform ${
                  showPlayer
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
              >
                {showPlayer && <RottsPlayer audioUrl={audioUrl} />}
              </div>
              <div className="flex flex-row gap-3">
                <HoverCard>
                  <HoverCardTrigger className="w-full whitespace-nowrap">
                    <Button
                      onClick={generateSpeech}
                      disabled={isGenerating || !text}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                          生成中...
                        </>
                      ) : (
                        <>
                          <Speech className="mr-1 h-4 w-4" />
                          开始转化
                        </>
                      )}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm text-gray-700 p-3">
                    调整配置信息后需再次点击按钮生成语音。
                  </HoverCardContent>
                </HoverCard>
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={downloadAudio}
                  disabled={isGenerating || !audioUrl}
                >
                  下载音频
                </Button>
                <Button className="w-full" variant="secondary" disabled>
                  下载字幕
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
