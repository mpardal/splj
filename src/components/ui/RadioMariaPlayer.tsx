"use client";
import { useRef, useState } from "react";

const STREAM_URL = "https://dreamsiteradiocp6.com/proxy/rmfrance1?mp=/stream";

export function RadioMariaPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggle = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (playing) {
            audio.pause();
            setPlaying(false);
            return;
        }

        try {
            setLoading(true);
            await audio.play();
            setPlaying(true);
        } catch (err) {
            console.error("Impossible de lancer le flux radio :", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <audio
                ref={audioRef}
                src={STREAM_URL}
                preload="none"
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
                onWaiting={() => setLoading(true)}
                onPlaying={() => setLoading(false)}
            />
            <button
                onClick={toggle}
                aria-label={playing ? "Mettre en pause Radio Maria" : "Écouter Radio Maria"}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white"
            >
                {loading ? (
                    // spinner
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                ) : playing ? (
                    // pause
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="5" width="4" height="14" />
                        <rect x="14" y="5" width="4" height="14" />
                    </svg>
                ) : (
                    // play
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                )}
            </button>
            <span className="text-sm">Radio Maria France</span>
        </div>
    );
}