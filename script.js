document.addEventListener("DOMContentLoaded", function() {
    // 요소 가져오기 (이제 cookie → stimulation으로 네이밍 변경)
    let stimulationLevel = document.getElementById("stimulationLevel");
    let extraStim = document.getElementById("extraStim");
    let stimIcon = document.getElementById("stimIcon");
    let burnButton = document.getElementById("burn5");
    let addPhoneScreenButton = document.getElementById("addPhoneScreen");
    let extraStimContainer = document.getElementById("extraStimContainer");
    let energyBurned = document.getElementById("energyBurned");
    let overstimPopup = document.getElementById("crashPopup");
    let unlockMessage = document.getElementById("unlockMessage");
    let closeButton = document.getElementById("closePopupButton");
    let buttonRunning = false;
    let lastGifStim = 0;

    // 상태 변수
    let totalBurned = 0;
    let phoneScreenActive = false;

    let lastExplosionTime = 0;
    const explosionCooldown = 1000; // 1초

    function playBurpSound() {
        const burpAudio = document.getElementById("burpSound");
        if (burpAudio) {
            burpAudio.currentTime = 0;
            burpAudio.play();
        }
    }   


    function makeButtonRunAway(button) {
        button.addEventListener("mouseenter", () => {
            const maxX = window.innerWidth - button.offsetWidth;
            const maxY = window.innerHeight - button.offsetHeight;
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
    
            button.style.position = "absolute";
            button.style.left = `${randomX}px`;
            button.style.top = `${randomY}px`;
        });
    }    

    function playClickSound() {
        document.getElementById("clickSound").play();
    }    

    function showExplodingGif(stim) {
        const now = Date.now();
        if (stim % 50 !== 0 || now - lastExplosionTime < explosionCooldown) return;
        lastExplosionTime = now;
    
        const tags = ["berkeley", "oski"];
        const randomTag = tags[Math.floor(Math.random() * tags.length)];
    
        fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${randomTag}&rating=pg-13`)
            .then(res => res.json())
            .then(data => {
                if (!data.data || !data.data.images) {
                    console.error("❌ No GIF found for tag:", randomTag);
                    return;
                }
    
                const gifUrl = data.data.images.original.url;
                const img = document.createElement("img");
                img.src = gifUrl;
                img.style.position = "absolute";
                img.style.width = "150px";
                img.style.left = `${Math.random() * window.innerWidth}px`;
                img.style.top = `${Math.random() * window.innerHeight}px`;
                img.style.zIndex = 9999;
                img.alt = randomTag;
                document.body.appendChild(img);
            })
            .catch(error => {
                console.error("❌ Failed to load GIF for tag:", randomTag, error);
            });
    }
 


    function shakeScreen() {
        document.body.classList.add("shake");
        setTimeout(() => document.body.classList.remove("shake"), 300);
    }    

    const API_KEY = "Qg9QbwdR7qgY065viFNaQvYNFHcbBcl7";  // 너의 Giphy API 키로 바꿔줘

    function showRandomGif() {
        const tags = ["berkeley", "oski"];
        const randomTag = tags[Math.floor(Math.random() * tags.length)];
    
        fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${randomTag}&rating=pg`)
            .then(response => response.json())
            .then(data => {
                if (!data.data || !data.data.images) {
                    console.error("No GIF found for tag:", randomTag);
                    return;
                }
    
                const gifUrl = data.data.images.original.url;
    
                const newGif = document.createElement("img");
                newGif.src = gifUrl;
                newGif.style.width = "200px";
                newGif.style.margin = "10px";
                newGif.style.borderRadius = "10px";
                newGif.alt = randomTag;
                document.getElementById("gifContainer").appendChild(newGif);
            })
            .catch(error => {
                console.error("Failed to load GIF for tag:", randomTag, error);
            });
    }
    

    // 자극 1 증가
    function addStim() {
        let stim = parseInt(stimulationLevel.innerText.trim()) + 1;
        stimulationLevel.innerText = stim;
    
        checkOverstim();
        playClickSound();
        showExplodingGif(stim);
    
        stim = parseInt(stimulationLevel.innerText.trim()); // 업데이트 후 다시 확인
    
        // ✅ 버클리 GIF: 100의 배수에서 한 번만 호출
        if (stim % 100 === 0 && stim !== 0 && stim !== lastGifStim) {
            showRandomGif();
            lastGifStim = stim;
        }
    
        if (stim % 20 === 0) {
            shakeScreen();
        }
    
        if (stim >= 50) {
            addPhoneScreenButton.disabled = false;
            unlockMessage.innerText = "You have unlocked 'Cat Video Mode'!";
        }
    
        if (stim >= 50 && !buttonRunning) {
            makeButtonRunAway(addPhoneScreenButton);
            buttonRunning = true;
        }
    }
    

    // 20의 배수마다 팝업
    function checkOverstim() {
        let stim = parseInt(stimulationLevel.innerText.trim());
        if (stim % 20 === 0 && stim > 0) {
            overstimPopup.style.display = "block";
        }
    }

    // 팝업 닫기
    function closePopup() {
        overstimPopup.style.display = "none";
    }

    // 5 stim 소비
    burnButton.addEventListener("click", function() {
        if (parseInt(stimulationLevel.innerText.trim()) >= 5) {
            stimulationLevel.innerText = parseInt(stimulationLevel.innerText.trim()) - 5;
            totalBurned += 5;
            energyBurned.innerText = totalBurned;

            playBurpSound();

            if (totalBurned >= 50) {
                addPhoneScreenButton.disabled = false;
                unlockMessage.innerText = "You have unlocked 'Phone Screen'!";
            }
        } else {
            alert("Not Enough Stimulations!!");
        }
    });

    // Phone Screen 해금 → 자동 자극 생성 시작
    addPhoneScreenButton.addEventListener("click", function() {
        extraStimContainer.style.display = "block";
        addPhoneScreenButton.disabled = true;
        phoneScreenActive = true;

        setInterval(function() {
            if (phoneScreenActive) {
                stimulationLevel.innerText = parseInt(stimulationLevel.innerText.trim()) + 1;
                extraStim.innerText = parseInt(extraStim.innerText.trim()) + 1;
            }
        }, 1000);
    });

    stimIcon.addEventListener("click", addStim);
    closeButton.addEventListener("click", closePopup);
});

function flashBackground() {
    const colors = ["#ffcccb", "#c1f0f6", "#f7e1ff", "#fff176", "#dcedc8"];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}

setInterval(flashBackground, 500);  // 매 0.5초마다 배경색이 무작위로 바뀜
