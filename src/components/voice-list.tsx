import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import Choicebox from "./choice-box";
import { Skeleton } from "@/components/ui/skeleton";

interface Voice {
  Name: string;
  ShortName: string;
  Gender: string;
  Description: string;
}

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
        setAvailableVoices(data.listVoices);

      // 默认选中第一个语音
      if (data.listVoices.length > 0) {
        const firstVoice = data.listVoices[0].Name;
        setSelectedVoice(firstVoice);
        if (onChange) {
          onChange(firstVoice);
        }
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}, []);

const handleVoiceSelect = (voiceName: string) => {
  setSelectedVoice(voiceName);
  if (onChange) {
    onChange(voiceName);
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
                title={voice.ShortName}
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
