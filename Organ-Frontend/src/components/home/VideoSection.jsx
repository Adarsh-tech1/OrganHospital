import { useState } from "react";

function VideoSection() {
  const [videoFailed, setVideoFailed] = useState({
    video1: false,
    video2: false,
  });

  const handleVideoError = (videoId) => {
    setVideoFailed((prev) => ({ ...prev, [videoId]: true }));
  };

  const VideoCard = ({ title, subtitle, emoji, videoSrc, videoId }) => (
    <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="bg-gray-800 w-full h-[250px] md:h-[300px] flex items-center justify-center relative group">
        {!videoFailed[videoId] && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            onError={() => handleVideoError(videoId)}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {videoFailed[videoId] && (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white text-center p-4">
            <div>
              <div className="text-4xl mb-2">{emoji}</div>
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-gray-400 mt-2">{subtitle}</p>
              <p className="text-xs text-gray-500 mt-2">Video unavailable</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-10 bg-gradient-to-b from-black to-gray-900 text-center min-h-[500px] flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl font-bold mb-4 text-white">Awareness Videos</h2>
        <p className="text-gray-400 mb-12 text-lg">
          Learn more about organ donation and its impact
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <VideoCard
            videoId="video1"
            videoSrc="/video/awareness1.mp4"
            emoji="🎥"
            title="Donor Stories"
            subtitle="Real stories from organ donors"
          />

          <VideoCard
            videoId="video2"
            videoSrc="/video/awareness2.mp4"
            emoji="❤️"
            title="Medical Process"
            subtitle="How transplants save lives"
          />
        </div>
      </div>
    </div>
  );
}

export default VideoSection;
