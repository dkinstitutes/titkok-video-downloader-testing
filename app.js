// Get DOM elements
const videoUrlInput = document.getElementById('video-url');
const downloadBtn = document.getElementById('download-btn');
const errorMsg = document.getElementById('error-msg');
const videoContainer = document.getElementById('video-container');
const videoPlayer = document.getElementById('video-player');
const downloadLink = document.getElementById('download-link');

// Add event listeners
downloadBtn.addEventListener('click', downloadVideo);

// Download video function
async function downloadVideo() {
  try {
    // Get video URL from input
    const videoUrl = videoUrlInput.value.trim();
    if (!videoUrl) {
      throw new Error('Please enter a TikTok video URL');
    }

    // Send HTTP request to get video data
    const response = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch video data (${response.status} ${response.statusText})`);
    }
    const videoData = await response.json();

    // Get video URL without watermark
    const videoNoWatermarkUrl = videoData.video_url.replace(/https:\/\/.*\.tiktok\.com\//, 'https://api2-16-h2.musical.ly/aweme/v1/play/?video_id=');

    // Set video player source and download link href
    videoPlayer.src = videoNoWatermarkUrl;
    downloadLink.href = videoNoWatermarkUrl;

    // Show video player and download link
    videoContainer.classList.remove('hidden');
    errorMsg.classList.add('hidden');
  } catch (error) {
    // Show error message
    errorMsg.textContent = error.message;
    errorMsg.classList.remove('hidden');
    videoContainer.classList.add('hidden');
  }
}
