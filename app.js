
        document.addEventListener('DOMContentLoaded', function() {
            const video = document.querySelector('.video');
            const playBtn = document.querySelector('.play-btn');
            const volumeBtn = document.querySelector('.volume-btn');
            const volumeSlider = document.querySelector('.volume-slider');
            const progress = document.querySelector('.progress');
            const progressContainer = document.querySelector('.progress-container');
            const currentTimeEl = document.querySelector('.current-time');
            const durationEl = document.querySelector('.duration');
            const speedBtn = document.querySelector('.speed-btn');
            const fullscreenBtn = document.querySelector('.fullscreen');
            const videoContainer = document.querySelector('.video-container');
            
            // Play/Pause
            playBtn.addEventListener('click', togglePlay);
            video.addEventListener('click', togglePlay);
            
            function togglePlay() {
                if(video.paused) {
                    video.play();
                    videoContainer.classList.add('playing');
                } else {
                    video.pause();
                    videoContainer.classList.remove('playing');
                }
            }
            
            // Volume
            volumeSlider.addEventListener('input', function() {
                video.volume = this.value;
                if(video.volume === '0') {
                    volumeBtn.textContent = '🔇';
                } else {
                    volumeBtn.textContent = '🔊';
                }
            });
            
            volumeBtn.addEventListener('click', function() {
                if(video.volume > 0) {
                    video.volume = 0;
                    volumeSlider.value = 0;
                    volumeBtn.textContent = '🔇';
                } else {
                    video.volume = 1;
                    volumeSlider.value = 1;
                    volumeBtn.textContent = '🔊';
                }
            });
            
            // Progress bar
            video.addEventListener('timeupdate', updateProgress);
            
            function updateProgress() {
                const percent = (video.currentTime / video.duration) * 100;
                progress.style.width = `${percent}%`;
                
                // Update time display
                currentTimeEl.textContent = formatTime(video.currentTime);
            }
            
            function formatTime(seconds) {
                const minutes = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
            }
            
            // Click on progress bar to seek
            progressContainer.addEventListener('click', function(e) {
                const width = this.clientWidth;
                const clickX = e.offsetX;
                const duration = video.duration;
                video.currentTime = (clickX / width) * duration;
            });
            
            // Speed control
            speedBtn.addEventListener('click', function() {
                const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
                const currentSpeed = video.playbackRate;
                const currentIndex = speeds.indexOf(currentSpeed);
                const nextIndex = (currentIndex + 1) % speeds.length;
                video.playbackRate = speeds[nextIndex];
                speedBtn.textContent = `${speeds[nextIndex]}x`;
            });
            
            // Fullscreen
            fullscreenBtn.addEventListener('click', toggleFullscreen);
            
            function toggleFullscreen() {
                if(!document.fullscreenElement) {
                    videoContainer.requestFullscreen().catch(err => {
                        console.error(`Error attempting to enable fullscreen: ${err.message}`);
                    });
                } else {
                    document.exitFullscreen();
                }
            }
            
            // Get duration when metadata is loaded
            video.addEventListener('loadedmetadata', function() {
                durationEl.textContent = formatTime(video.duration);
            });
            
            // Keyboard controls
            document.addEventListener('keydown', function(e) {
                if(e.code === 'Space') {
                    e.preventDefault();
                    togglePlay();
                }
                
                if(e.code === 'ArrowRight') {
                    video.currentTime += 5;
                }
                
                if(e.code === 'ArrowLeft') {
                    video.currentTime -= 5;
                }
                
                if(e.code === 'ArrowUp') {
                    if(video.volume + 0.1 <= 1) {
                        video.volume += 0.1;
                        volumeSlider.value = video.volume;
                    }
                }
                
                if(e.code === 'ArrowDown') {
                    if(video.volume - 0.1 >= 0) {
                        video.volume -= 0.1;
                        volumeSlider.value = video.volume;
                    }
                }
                
                if(e.code === 'KeyM') {
                    if(video.volume > 0) {
                        video.volume = 0;
                        volumeSlider.value = 0;
                        volumeBtn.textContent = '🔇';
                    } else {
                        video.volume = 1;
                        volumeSlider.value = 1;
                        volumeBtn.textContent = '🔊';
                    }
                }
                
                if(e.code === 'KeyF') {
                    toggleFullscreen();
                }
            });
        });
 