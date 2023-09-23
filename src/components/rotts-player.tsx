import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface RottsPlayerProps {
  audioUrl: string;
}

export default function RottsPlayer({ audioUrl }: RottsPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    setProgress(playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  // 处理媒体播放器的跳转。当用户改变输入值时，播放器会跳转到指定时间点，并更新进度条
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (playerRef.current) {
      playerRef.current.seekTo(parseFloat(value));
    }
    setProgress(parseFloat(value));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    setIsPlaying(true);
  }, [audioUrl]);

  return (
    <div className="w-full flex flex-row items-center gap-4 p-3 border border-[#EBEBEB] rounded-md">
      <ReactPlayer
        ref={playerRef}
        url={audioUrl}
        playing={isPlaying}
        onEnded={() => setIsPlaying(false)}
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="0"
        height="0"
        className="hidden"
      />
      <Button size="icon" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? (
          <>
            <Pause className="h-4 w-4" />
          </>
        ) : (
          <>
            <Play className="-mr-1 h-4 w-4" />
          </>
        )}
      </Button>
      <div className="flex flex-col flex-grow">
        <div className="flex flex-row justify-between">
          <span className="text-gray-500 text-sm leading-4">
            {formatTime(progress)}
          </span>
          <span className="text-gray-500 text-sm leading-4">
            {formatTime(duration)}
          </span>
        </div>
        <input
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          type="range"
          min={0}
          max={Math.floor(duration)}
          value={Math.floor(progress)}
          onChange={handleSeek}
        />
      </div>
    </div>
  );
}
