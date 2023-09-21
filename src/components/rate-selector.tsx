import { useState } from "react";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { SliderProps } from "@radix-ui/react-slider";

interface RateSelectorProps {
  defaultValue: SliderProps["defaultValue"];
  onChange?: (value: number[]) => void;
}

export default function RateSelector({ defaultValue, onChange }: RateSelectorProps) {

  const [value, setValue] = useState<number[]>(defaultValue || [0]);

  const maxRateValue = 50;
  const minRateValue = -50;

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
          <Label htmlFor="Rate" className="text-base">
            语速（%）
          </Label>
          <Input
            disabled
            value={value ? value[0] : ""}
            onChange={(e) => {
              const num = Math.min(maxRateValue, Math.max(minRateValue, Number(e.target.value)));
              setValue(isNaN(num) ? [minRateValue] : [num]);
            }}
            className="text-gray-400 w-12 rounded-md px-2 py-0.5 text-right text-sm border border-transparent hover:border hover:border-gray-200 focus:text-gray-700"
          />
        </div>
        <Slider
          id="Rate"
          max={maxRateValue}
          value={value}
          min={minRateValue}
          defaultValue={value}
          step={1}
          onValueChange={handleValueChange}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          aria-label="语速"
        />
      </div>
    </>
  );
}
