import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Trash2, StopCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AudioRemarksInput = ({ value, onChange, audioData, onAudioChange }) => {
    const { language, t } = useLanguage();
    const [isListening, setIsListening] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const recognitionRef = useRef(null);
    const timerRef = useRef(null);

    // Initialize Speech Recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
        }
    }, []);

    const startListening = () => {
        if (!recognitionRef.current) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        // precise language code mapping
        let langCode = 'en-US';
        if (language === 'ta') langCode = 'ta-IN';
        if (language === 'hi') langCode = 'hi-IN';

        recognitionRef.current.lang = langCode;

        recognitionRef.current.onstart = () => setIsListening(true);
        recognitionRef.current.onend = () => setIsListening(false);
        recognitionRef.current.onerror = (event) => {
            console.error("Speech error", event.error);
            setIsListening(false);
        };
        recognitionRef.current.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            // Append to existing text
            const newValue = value ? `${value} ${transcript}` : transcript;
            onChange(newValue);
        };

        recognitionRef.current.start();
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    onAudioChange(reader.result); // Base64 string
                };

                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingTime(0);
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Could not access microphone.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(timerRef.current);
        }
    };

    const deleteAudio = () => {
        if (confirm("Delete recorded audio?")) {
            onAudioChange(null);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {/* Text Input Row */}
            <div style={{ display: 'flex', gap: '5px' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder={t('speakToText')}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        fontSize: '0.9rem',
                        flex: 1
                    }}
                />

                {/* Speech to Text Button */}
                <button
                    type="button"
                    onClick={startListening}
                    style={{
                        background: isListening ? '#e94560' : '#f0f0f0',
                        color: isListening ? 'white' : '#333',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    title={t('speakToText')}
                >
                    <Mic size={18} />
                </button>
            </div>

            {/* Audio Recording Control Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                {!isRecording && !audioData && (
                    <button
                        type="button"
                        onClick={startRecording}
                        className="btn-sm"
                        style={{
                            background: 'none',
                            border: '1px solid #0056b3',
                            color: '#0056b3',
                            borderRadius: '15px',
                            padding: '4px 10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}
                    >
                        <div style={{ width: '8px', height: '8px', background: 'red', borderRadius: '50%' }}></div>
                        {t('recordAudio')}
                    </button>
                )}

                {isRecording && (
                    <button
                        type="button"
                        onClick={stopRecording}
                        style={{
                            background: '#ffe6e6',
                            border: '1px solid red',
                            color: 'red',
                            borderRadius: '15px',
                            padding: '4px 10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            animation: 'pulse 1.5s infinite'
                        }}
                    >
                        <StopCircle size={14} />
                        {formatTime(recordingTime)} - {t('stopRecording')}
                    </button>
                )}

                {audioData && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#e8f5e9', padding: '4px 8px', borderRadius: '15px', border: '1px solid #c8e6c9' }}>
                        <span style={{ color: '#2e7d32', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Play size={12} fill="#2e7d32" /> {t('audioRecorded')}
                        </span>
                        <audio src={audioData} controls style={{ height: '20px', width: '100px', display: 'none' }} />
                        {/* Custom Play Button or use default? Default audio tag is bulky. Let's just allow playback via a mini player or just show 'Recorded' 
                            Actually, viewing/playing might be needed. Let's do a simple play logic using new Audio().
                         */}
                        <button
                            type="button"
                            onClick={() => new Audio(audioData).play()}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2e7d32' }}
                            title="Play"
                        >
                            <Play size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={deleteAudio}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d32f2f' }}
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                )}
            </div>
            <style>{`
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.4); }
                    70% { box-shadow: 0 0 0 6px rgba(255, 0, 0, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
                }
            `}</style>
        </div>
    );
};

export default AudioRemarksInput;
