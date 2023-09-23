import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import { ChangeEvent, useEffect, useState } from "react";

const maxTextLength = 500; //最大文本长度

interface TextInputProps {
  className?: string;
  onChange?: (text: string) => void;
}

export default function TextInput({
  className = "w-full",
  onChange,
}: TextInputProps) {
  const [text, setText] = useState("");
  const [remainTextsNumber, setRemainTextsNumber] = useState(maxTextLength);

  useEffect(() => {
    setRemainTextsNumber(maxTextLength - text.length);
    if (onChange) {
      onChange(text);
    }
  }, [text, onChange]);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <>
      <Tabs defaultValue="textOnline" className={className}>
        <TabsList>
          <TabsTrigger value="textOnline">在线输入</TabsTrigger>
          <TabsTrigger value="textImport" disabled>
            文本导入
          </TabsTrigger>
        </TabsList>
        <TabsContent value="textOnline">
          <div className="flex flex-col h-full">
            <p className="text-sm text-gray-600 mb-2">
              本次最多可输入 {maxTextLength} 文本，剩余 {remainTextsNumber} 文本可输入。
            </p>
            <Textarea
              rows={22}
              maxLength={maxTextLength}
              placeholder="请输入需要转语音的文本"
              value={text}
              onChange={handleTextChange}
            />
          </div>
        </TabsContent>
        <TabsContent value="textImport">Change your password here.</TabsContent>
      </Tabs>
    </>
  );
}
