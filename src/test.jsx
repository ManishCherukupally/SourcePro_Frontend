import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
    const [url, setUrl] = useState(''); // URL of the video
    const [playing, setPlaying] = useState(false); // State to manage playing/paused state
    const [playedSeconds, setPlayedSeconds] = useState(0); // State to store played time
    const playerRef = useRef(null); // Reference to the React Player component

    // Load video URL from local storage if available
    useEffect(() => {
        const storedUrl = localStorage.getItem('videoUrl');
        if (storedUrl) {
            setUrl(storedUrl);
        }
    }, []);

    // Save played time to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('playedSeconds', playedSeconds);
    }, [playedSeconds]);

    // Function to handle playing state changes
    const handlePlay = () => {
        setPlaying(true);
    };

    // Function to handle pausing state changes
    const handlePause = () => {
        setPlaying(false);
        const player = playerRef.current.getInternalPlayer();

    };

    // Function to handle seeking
    const handleSeek = (e) => {
        const player = playerRef.current.getInternalPlayer();
        const seekToTime = parseFloat(e.target.value) * player.getDuration() / 100;
        player.seekTo(seekToTime);
        setPlayedSeconds(seekToTime);
    };

    return (
        <div>
            <input type="text" value={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'} onChange={(e) => setUrl(e.target.value)} />
            <ReactPlayer
                ref={playerRef}
                url={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'}
                playing={playing}
                onPlay={handlePlay}
                onPause={() => console.log(playerRef.current.getCurrentTime())}
                onSeek={(e) => handleSeek(e)}
                controls
            />
            <input
                type="range"
                min={0}
                max={100}
                step="any"
                value={(playedSeconds / playerRef.current?.getDuration()) * 100 || 0}
                onChange={(e) => handleSeek(e)}
            />
        </div>
    );
};

export default VideoPlayer;
