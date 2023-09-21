import { useState } from "react";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { SliderProps } from "@radix-ui/react-slider";

interface VolumeSelectorProps {
  defaultValue: SliderProps["defaultValue"];
  onChange?: (value: number[]) => void;
}

export default function VolumeSelector({ defaultValue, onChange }: VolumeSelectorProps) {

  const [value, setValue] = useState<number[]>(defaultValue || [0]);

  const maxVolumeValue = 50;
  const minVolumeValue = -50;

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="volume" className="text-base">
            音量（dB）
          </Label>
          <Input
            disabled
            value={value ? value[0] : ""}
            onChange={(e) => {
              const num = Math.min(maxVolumeValue, Math.max(minVolumeValue, Number(e.target.value)));
              setValue(isNaN(num) ? [minVolumeValue] : [num]);
            }}
            className="text-gray-400 w-12 rounded-md px-2 py-0.5 text-right text-sm border border-transparent hover:border hover:border-gray-200 focus:text-gray-700"
          />
        </div>
        <Slider
          id="volume"
          max={maxVolumeValue}
          value={value}
          min={minVolumeValue}
          defaultValue={value}
          step={1}
          onValueChange={handleValueChange}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          aria-label="音量"
        />
      </div>
    </>
  );
}
