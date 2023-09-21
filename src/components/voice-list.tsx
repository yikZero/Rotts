import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import Choicebox from "./choice-box";
import { Skeleton } from "@/components/ui/skeleton";

interface Voice {
  Name: string;
  Gender: string;
  Description: string;
}

type VoiceNameMapping = {
  [key: string]: string;
};

const voiceNameMapping: VoiceNameMapping = {
  "zh-CN-YunjianNeural": "云健",
  "zh-CN-YunxiNeural": "云希",
  "zh-CN-YunxiaNeural": "云夏",
  "zh-CN-YunyangNeural": "云扬",
  "zh-CN-XiaobeiNeural": "晓贝",
  "zh-CN-XiaoniNeural": "晓妮",
  "zh-CN-XiaoxiaoNeural": "晓晓",
  "zh-CN-XiaoyiNeural": "晓伊",
  "zh-CN-liaoning-XiaobeiNeural": "辽宁晓蓓",
  "zh-CN-shaanxi-XiaoniNeural": "陕西晓妮",
};

interface VoicesListProps {
  onChange?: (selectedVoice: string) => void;
}

export default function VoicesList({ onChange }: VoicesListProps) {
  const [selectedGender, setSelectedGender] = useState("Male");
  const [availableVoices, setAvailableVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const filteredVoices = availableVoices.filter(
    (voice) => voice.Gender === selectedGender
  );

  useEffect(() => {
    fetch("/api/listVoices")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        const updatedVoices = data.listVoices.map((voice: Voice) => {
          return {
            Name: voiceNameMapping[voice.Name] || voice.Name,
            Gender: voice.Gender,
            Description:
              voiceNameMapping[voice.Description] || voice.Description,
          };
        });
        setAvailableVoices(updatedVoices);

        // 默认选中第一个语音
        if (updatedVoices.length > 0) {
          const firstVoice = updatedVoices[0].Name;
          setSelectedVoice(firstVoice);
          const originalVoiceName = Object.keys(voiceNameMapping).find(
            (key) => voiceNameMapping[key] === firstVoice
          );
          if (onChange && originalVoiceName) {
            onChange(originalVoiceName);
          }
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const handleVoiceSelect = (voiceName: string) => {
    setSelectedVoice(voiceName);

    // 反向查找原始名字
    const originalVoiceName = Object.keys(voiceNameMapping).find(
      (key) => voiceNameMapping[key] === voiceName
    );

    if (onChange && originalVoiceName) {
      onChange(originalVoiceName);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center">
          <Label htmlFor="voicesList" className="text-base h-6">
            语音列表
          </Label>
          <div className="flex flex-row gap-2">
            <div
              onClick={() => setSelectedGender("Male")}
              className={`${
                selectedGender === "Male"
                  ? "text-white bg-gray-900"
                  : "text-gray-900 bg-gray-200 hover:bg-gray-300/80"
              } text-[13px] leading-[18px] py-[3px] px-[6px] rounded-md cursor-pointer`}
            >
              男性
            </div>
            <div
              onClick={() => setSelectedGender("Female")}
              className={`${
                selectedGender === "Female"
                  ? "text-white bg-gray-900"
                  : "text-gray-900 bg-gray-200 hover:bg-gray-300/80"
              } text-[13px] leading-[18px] py-[3px] px-[6px] rounded-md cursor-pointer`}
            >
              女性
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {filteredVoices.length > 0 ? (
            filteredVoices.map((voice) => (
              <Choicebox
                key={voice.Name}
                title={voice.Name}
                description={voice.Description}
                isSelected={selectedVoice === voice.Name}
                onSelect={() => handleVoiceSelect(voice.Name)}
              />
            ))
          ) : (
            <>
              {Array.from({ length: filteredVoices.length || 4 }).map(
                (_, index) => (
                  <Skeleton
                    key={index}
                    className="w-full h-[76px] rounded-md"
                  />
                )
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
