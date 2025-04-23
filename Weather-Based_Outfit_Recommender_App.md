## 👗 **"What Should I Wear Today?" – Weather-Based Outfit Recommender**

### 💡 **Project Idea Summary**
This is a web application that recommends daily outfits based on **real-time weather data** and **user preferences**. It's both fun and practical, and a great way to showcase creative frontend design with meaningful API integration.

---

### 🔌 **APIs to Use**
- **[OpenWeatherMap API](https://openweathermap.org/api)**: for real-time weather, temperature, humidity, and precipitation data
- **Custom clothing database**: you can create your own or allow users to build a personal "closet" (optional Firebase or MongoDB)

---

### 🌟 Core Features
1. **Outfit Recommendations Based on Weather**
   - Pull current weather data using the OpenWeatherMap API
   - Suggest clothing based on:
     - Temperature (e.g., wear a coat if below 10°C)
     - Precipitation (e.g., suggest an umbrella or waterproof shoes)
     - Wind, humidity, or UV index (optional)

2. **Location-Based Auto Weather Detection**
   - Use browser geolocation to fetch weather for the user’s location

3. **Seasonal Styling Modes**
   - Let users switch between summer and winter wardrobes
   - Adjust styling logic accordingly

4. **Personal Closet System (Optional)**
   - Users can upload their clothes (with tags like "jacket", "light sweater", "boots")
   - App selects from user-uploaded items that match the weather

---

### 🎨 **Bonus UI Ideas**
- Cute illustrated avatars that change clothes based on the weather
- Animated weather effects in the background
- Outfit history log (see what you wore last week!)

---

### 👥 **Team Roles **
| Role | Task |
|------|------|
| Frontend Dev | UI, clothing display, interactivity |
| Backend Dev | Closet database, logic for recommendations |
| API Integration | Weather API, geolocation |
| UX/UI Designer | Illustrations, avatar customization (optional) |

---

## 🚀 Step-by-Step Starter Plan

---

### ✅ **Step 1: Set Up Your Project Folder**

```bash
mkdir weather-outfit-app
cd weather-outfit-app
```

Then inside this folder, create basic files and structure:

```bash
mkdir client
cd client
touch index.html style.css app.js
```

Optional (if you're using Git):

```bash
git init
git remote add origin [your GitHub repo URL]
```

---

### ✅ **Step 2: Build the Basic Webpage**

Open `client/index.html` and start with this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>What Should I Wear Today?</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <main>
    <h1>What Should I Wear Today?</h1>
    <p id="weather">Fetching weather...</p>
    <div id="outfit-suggestion"></div>
  </main>
  <script src="app.js"></script>
</body>
</html>
```

Add basic CSS in `style.css` to make it look nice.

---

### ✅ **Step 3: Get a Weather API Key**

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up (free)
3. Go to "My API keys"
4. Copy your API key

---

### ✅ **Step 4: Add Weather Fetching (JavaScript)**

In `app.js`, add this starter code:

```javascript
const API_KEY = 'YOUR_API_KEY_HERE';

navigator.geolocation.getCurrentPosition(position => {
  const { latitude, longitude } = position.coords;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const temp = data.main.temp;
      document.getElementById('weather').textContent = `It's ${temp}°C right now.`;

      // Simple recommendation logic
      const suggestion = temp < 10
        ? 'Wear a thick coat and scarf!'
        : temp < 20
        ? 'A light jacket should be enough.'
        : 'It’s warm! T-shirt and jeans will do.';
      
      document.getElementById('outfit-suggestion').textContent = suggestion;
    });
});
```

---

### ✅ **Step 5: Test It!**

1. Open `index.html` in your browser.
2. If you're using **Live Server** (VS Code extension), it'll auto-refresh.
3. Allow location access when prompted.

---

## 🧩 What’s Next?
- Design the UI better (add clothing icons, avatars, background animations)
- Add dropdowns for “season” or “activity type” (e.g., work, casual, gym)
- Optional: create a backend to let users save their clothes

---

Would you like me to help you:
- Style the outfit cards?
- Create mockups in Figma?
- Add more weather conditions (rain, snow, UV)?

Just say the word!
