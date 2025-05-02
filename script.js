document.addEventListener("DOMContentLoaded", function() {
    // Get DOM elements (renamed from "cookie" to "stimulation")
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

    // State variables
    let totalBurned = 0;
    let phoneScreenActive = false;

    let lastExplosionTime = 0;
    const explosionCooldown = 1000; // 1 second cooldown
    const backgrounds = ['https://www.collegegridirons.com/wp-content/uploads/2017/05/calmemorial17950.jpg', 'https://shopcollegewear.com/cdn/shop/products/R220064-7146.png?v=1647067627', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Sather-Gate.jpg', 'https://www.tclf.org/sites/default/files/thumbnails/image/CA_Berkeley_UniversityOfCaliforniaAtBerkeley_byCharlieNguyen-Flickr_2008_001_Sig.jpg']; //cycle through background images

    // Play burp sound
    function playBurpSound() {
        const burpAudio = document.getElementById("burpSound");
        if (burpAudio) {
            burpAudio.currentTime = 0;
            burpAudio.play();
        }
    }

    // Make button run away when hovered
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

    // Play click sound effect
    function playClickSound() {
        document.getElementById("clickSound").play();
    }

    // Display an exploding gif randomly chosen from "berkeley" or "oski"
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

    // Shake screen animation
    function shakeScreen() {
        document.body.classList.add("shake");
        setTimeout(() => document.body.classList.remove("shake"), 300);
    }

    const API_KEY = "Qg9QbwdR7qgY065viFNaQvYNFHcbBcl7";  // Your Giphy API key

    // Show one large Berkeley or Oski-themed GIF
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

    // Increase stimulation count by 1
    function addStim() {
        let stim = parseInt(stimulationLevel.innerText.trim()) + 1;
        stimulationLevel.innerText = stim;

        checkOverstim();
        playClickSound();
        showExplodingGif(stim);

        stim = parseInt(stimulationLevel.innerText.trim()); // re-check after updating

        // Show big gif every 100 stim only once
        if (stim % 100 === 0 && stim !== 0 && stim !== lastGifStim) {
            showRandomGif();
            lastGifStim = stim;
        }

        // Shake screen every 20 stim
        if (stim % 20 === 0) {
            shakeScreen();
        }


        // Unlock phone screen mode after 50 stim
        if (stim >= 50) {
            addPhoneScreenButton.disabled = false;
            unlockMessage.innerText = "You have unlocked 'Cat Video Mode'!";
        }

        // Start button runaway after 50 stim
        if (stim >= 50 && !buttonRunning) {
            makeButtonRunAway(addPhoneScreenButton);
            buttonRunning = true;
        }

        //cycle through each background image every 25 clicks
        if (stim % 25 === 0) {
            //=== means strict equality (value and type is same)
            const index = (Math.floor(stim / 25) - 1) % backgrounds.length;
            document.body.style.backgroundImage = `url('${backgrounds[index]}')`;
        }

        //every 100 clicks have the 10 min study timer 
        if (stim % 100 === 0) {
            document.getElementById('myvideopopup').style.display = 'block';
            //allows us to actually see the youtube pop up screen
        }
    }

    // Show popup every 20 stim
    function checkOverstim() {
        let stim = parseInt(stimulationLevel.innerText.trim());
        if (stim % 20 === 0 && stim > 0) {
            overstimPopup.style.display = "block";
        }
    }

    // Close popup
    function closePopup() {
        overstimPopup.style.display = "none";
    }

    // Burn 5 stim
    burnButton.addEventListener("click", function() {
        if (parseInt(stimulationLevel.innerText.trim()) >= 5) {
            stimulationLevel.innerText = parseInt(stimulationLevel.innerText.trim()) - 5;
            totalBurned += 5;
            energyBurned.innerText = totalBurned;

            playBurpSound(); // Play burp on burn

            if (totalBurned >= 50) {
                addPhoneScreenButton.disabled = false;
                unlockMessage.innerText = "You have unlocked 'Phone Screen'!";
            }
        } else {
            alert("Not Enough Stimulations!!");
        }
    });

    // Start auto stimulation when Phone Screen is unlocked
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

// Flash background color every 0.5 seconds
function flashBackground() {
    const colors = ["#ffcccb", "#c1f0f6", "#f7e1ff", "#fff176", "#dcedc8"];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}

//close the study timer popup
function closeYoutubePopup() {
    document.getElementById('myvideopopup').style.display = 'none';
}
setInterval(flashBackground, 500);
