document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements
    const stimulationLevel = document.getElementById("stimulationLevel");
    const extraStim = document.getElementById("extraStim");
    const stimIcon = document.getElementById("stimIcon");
    const burnButton = document.getElementById("burn5");
    const addPhoneScreenButton = document.getElementById("addPhoneScreen");
    const extraStimContainer = document.getElementById("extraStimContainer");
    const energyBurned = document.getElementById("energyBurned");
    const overstimPopup = document.getElementById("crashPopup");
    const unlockMessage = document.getElementById("unlockMessage");
    const closeButton = document.getElementById("closePopupButton");
    const canvas = document.getElementById("dvdCanvas");
    const ctx = canvas.getContext("2d");
    const lofiButton = document.getElementById("lofiButton");
    // const lofiAudio = document.getElementById("lofiAudio");

    let totalBurned = 0;
    let phoneScreenActive = false;
    let buttonRunning = false;
    let lastGifStim = 0;
    let lastExplosionTime = 0;
    let dvds = [];
    let lofiStimInterval = null;

    const explosionCooldown = 1000;
    const API_KEY = "Qg9QbwdR7qgY065viFNaQvYNFHcbBcl7";
    const backgrounds = [
        'https://www.collegegridirons.com/wp-content/uploads/2017/05/calmemorial17950.jpg',
        'https://shopcollegewear.com/cdn/shop/products/R220064-7146.png?v=1647067627',
        'https://upload.wikimedia.org/wikipedia/commons/f/fe/Sather-Gate.jpg',
        'https://www.tclf.org/sites/default/files/thumbnails/image/CA_Berkeley_UniversityOfCaliforniaAtBerkeley_byCharlieNguyen-Flickr_2008_001_Sig.jpg'
    ];

    const dvdImage = new Image();
    dvdImage.src = "https://cdn.vox-cdn.com/thumbor/4rJ7OdYmzECdCYZCms00CyNZyyg=/0x0:5568x3712/1200x0/filters:focal(0x0:5568x3712):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/11816637/usa_today_10376139.jpg";

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function getStim() {
        const val = parseInt(stimulationLevel.innerText.trim());
        return isNaN(val) ? 0 : val;
    }
    
    function setStim(val) {
        stimulationLevel.innerText = val;
    }

    function playBurpSound() {
        const burpAudio = document.getElementById("burpSound");
        if (burpAudio) {
            burpAudio.currentTime = 0;
            burpAudio.play();
        }
    }

    function playClickSound() {
        document.getElementById("clickSound").play();
    }

    function makeButtonRunAway(button) {
        button.addEventListener("mouseenter", () => {
            const maxX = window.innerWidth - button.offsetWidth;
            const maxY = window.innerHeight - button.offsetHeight;
            button.style.position = "absolute";
            button.style.left = `${Math.random() * maxX}px`;
            button.style.top = `${Math.random() * maxY}px`;
        });
    }

    function shakeScreen() {
        document.body.classList.add("shake");
        setTimeout(() => document.body.classList.remove("shake"), 300);
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
                if (!data.data || !data.data.images) return;
                const img = document.createElement("img");
                img.src = data.data.images.original.url;
                img.style.position = "absolute";
                img.style.width = "150px";
                img.style.left = `${Math.random() * window.innerWidth}px`;
                img.style.top = `${Math.random() * window.innerHeight}px`;
                img.style.zIndex = 9999;
                document.body.appendChild(img);
            });
    }

    function showRandomGif() {
        const tags = ["berkeley", "oski"];
        const randomTag = tags[Math.floor(Math.random() * tags.length)];

        fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${randomTag}&rating=pg`)
            .then(response => response.json())
            .then(data => {
                if (!data.data || !data.data.images) return;
                const gifUrl = data.data.images.original.url;
                const newGif = document.createElement("img");
                newGif.src = gifUrl;
                newGif.style.width = "200px";
                newGif.style.margin = "10px";
                newGif.style.borderRadius = "10px";
                document.getElementById("gifContainer").appendChild(newGif);
            });
    }

    function addStim() {
        let stim = getStim() + 1;
        setStim(stim);

        checkOverstim();
        playClickSound();
        showExplodingGif(stim);

        if (stim % 100 === 0 && stim !== lastGifStim) {
            showRandomGif();
            lastGifStim = stim;
        }
        if (stim % 20 === 0) shakeScreen();
        if (stim >= 50) {
            addPhoneScreenButton.disabled = false;
            unlockMessage.innerText = "You have unlocked 'Cat Video Mode'!";
        }
        if (stim >= 50 && !buttonRunning) {
            makeButtonRunAway(addPhoneScreenButton);
            buttonRunning = true;
        }
        if (stim % 25 === 0) {
            const index = (Math.floor(stim / 25) - 1) % backgrounds.length;
            document.body.style.backgroundImage = `url('${backgrounds[index]}')`;
        }
        if (stim % 100 === 0) {
            document.getElementById('myvideopopup').style.display = 'block';
        }
    }

    function checkOverstim() {
        const stim = getStim();
        if (stim % 20 === 0 && stim > 0) {
            overstimPopup.style.display = "block";
        }
    }

    function closePopup() {
        overstimPopup.style.display = "none";
    }

    function addBouncingDVD() {
        const dvdCount = dvds.length;
        const cost = 3 + dvdCount * 2;

        if (!dvdImage.complete) {
            alert("DVD image is still loading. Please wait!");
            return;
        }

        if (getStim() < cost) {
            alert(`You need ${cost} stimulation points to add another DVD!`);
            return;
        }

        setStim(getStim() - cost);
        dvds.push({
            x: Math.random() * (canvas.width - 100),
            y: Math.random() * (canvas.height - 60),
            dx: 2 + Math.random() * 2,
            dy: 2 + Math.random() * 2,
            width: 100,
            height: 60
        });

        updateDvdButtonCost();
    }

    function updateDvdButtonCost() {
        const cost = 3 + dvds.length * 2;
        document.getElementById("addDvd").innerText = `Add Bouncing DVD (Cost: ${cost} Stim)`;
    }

    function animateDVDs() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        dvds.forEach(dvd => {
            dvd.x += dvd.dx;
            dvd.y += dvd.dy;

            let bounced = false;
            if (dvd.x + dvd.width > canvas.width || dvd.x < 0) {
                dvd.dx *= -1;
                bounced = true;
            }
            if (dvd.y + dvd.height > canvas.height || dvd.y < 0) {
                dvd.dy *= -1;
                bounced = true;
            }

            if (bounced) setStim(getStim() + 1);

            if (dvdImage.complete) {
                ctx.drawImage(dvdImage, dvd.x, dvd.y, dvd.width, dvd.height);
            }
        });

        requestAnimationFrame(animateDVDs);
    }

    if (dvdImage.complete) {
        animateDVDs();
    } else {
        dvdImage.onload = animateDVDs;
    }

    burnButton.addEventListener("click", function () {
        if (getStim() >= 5) {
            setStim(getStim() - 5);
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

    addPhoneScreenButton.addEventListener("click", function () {
        extraStimContainer.style.display = "block";
        addPhoneScreenButton.disabled = true;
        phoneScreenActive = true;

        setInterval(function () {
            if (phoneScreenActive) {
                setStim(getStim() + 1);
                extraStim.innerText = parseInt(extraStim.innerText.trim()) + 1;
            }
        }, 1000);
    });

    stimIcon.addEventListener("click", addStim);
    closeButton.addEventListener("click", closePopup);
    document.getElementById("addDvd").addEventListener("click", addBouncingDVD);

    function showLofiGirl() {
        if (document.getElementById("lofiGirl")) return;
    
        const lofiImg = document.createElement("img");
        lofiImg.src = "https://media.tenor.com/adho7VbkF1wAAAAM/lofi-girl.gif";
        lofiImg.id = "lofiGirl";
        lofiImg.style.position = "fixed";
        lofiImg.style.bottom = "10px";
        lofiImg.style.right = "10px";
        lofiImg.style.width = "150px";
        lofiImg.style.zIndex = "1000";
        lofiImg.style.borderRadius = "12px";
        lofiImg.style.boxShadow = "0 0 12px rgba(0,0,0,0.5)";
        document.body.appendChild(lofiImg);
    
        // if (lofiAudio) {
        //     lofiAudio.volume = 0.5;
        //     lofiAudio.play().catch(() => console.warn("Autoplay blocked"));
        // }
    
        if (!lofiStimInterval) {
            lofiStimInterval = setInterval(() => {
                setStim(getStim() + 10);
            }, 1000);
        }
    }


    if (localStorage.getItem("lofiUnlocked") === "true") {
        lofiButton.style.display = "none";
        showLofiGirl();
    } else {
        lofiButton.style.display = "inline-block";
    }

    lofiButton.addEventListener("click", function () {
        const cost = 50;
        if (getStim() < cost) {
            alert("Not enough stim to unlock LoFi Girl!");
            return;
        }
    
        setStim(getStim() - cost);
        lofiButton.style.display = "none";
        localStorage.setItem("lofiUnlocked", "true");
        showLofiGirl();
    });


    updateDvdButtonCost();
    window.addStim = addStim;

});

function flashBackground() {
    const colors = ["#ffcccb", "#c1f0f6", "#f7e1ff", "#fff176", "#dcedc8"];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}
setInterval(flashBackground, 500);

function closeYoutubePopup() {
    document.getElementById('myvideopopup').style.display = 'none';
}
