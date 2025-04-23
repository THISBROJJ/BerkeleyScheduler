# BerkeleyScheduler
Team: Ankita Biyani, Yunji Seo, Liana Zhang

## Project Name
BerkeleyScheduler

## Application Description
BerkeleyScheduler is a comprehensive academic planning tool designed for UC Berkeley students. The platform allows users to create and share both academic and custom schedules, access real-time reviews for professors and courses, and join class-specific group chats for peer collaboration. An integrated GPA calculator computes cumulative GPA and total earned credits based on user-inputted grades and course units.

## Features and Tools
### Features

#### 1. Class Scheduler

  - Add Berkeley classes (auto-complete search)

  - Add custom events (study blocks, clubs, etc.)

  - Visual drag-and-drop interface

  - Save/load schedules

  - Share via link or QR code

#### 2. User Authentication

  - Sign up / Login (OAuth or Berkeley CalNet optional)

  - Store user preferences and saved data securely

#### 3. Professor/Class Ratings

  - Pull in ratings from RateMyProfessor or internal reviews

  - View real-time grade distributions (via BerkeleyTime)

  - Allow in-app user reviews/comments

#### 4. GPA Calculator

  - Input course grades + credits

  - Output cumulative GPA and total credits earned

#### 5. Group Chat for Each Class

  - Join/leave class-specific chatrooms

  - Send messages, links, media (if supported)

#### 6. Google Calendar Integration (Optional)

  - Sync schedules to Google Calendar

  - Set reminders and receive notifications

#### 7. Search & Filter

  - Filter courses by rating, time, department

  - Search for classes by name, code, or professor

---

### Optional Features
- Dark/Light Mode Toggle (nice for UX)

  - Save user preferences

- Works on desktop, tablet, mobile

---

### Database
- SQL (PostgreSQL / MySQL)  

---

### External APIs

- [BerkeleyTime API](https://berkeleytime.com) – Class info & grade distributions  
- [Google Calendar API](https://developers.google.com/calendar) – Schedule sync  
- [RateMyProfessor (unofficial)](https://www.ratemyprofessors.com/) – Professor/class reviews  

---

## Timeline
| Date       | Task                                                                 |
|------------|----------------------------------------------------------------------|
| April 21   | Submit GitHub repo & design mockup                                    |
| April 25   | Set up project on VS Code using React, JavaScript, and HTML; construct layout with pseudocode |
| April 27   | Use APIs and add additional code to build off of                     |
| April 29   | Fix program and add additional features                              |
| May 1      | Finalize project details & ensure demo presentation is done & runs smoothly |
| May 2      | Demo Day - Present                                                   |



Sure! Here's the English explanation for the **"What Should I Wear Today?" – Weather-Based Outfit Recommender App**:

---

## 👗 **"What Should I Wear Today?" – Weather-Based Outfit Recommender**

### 💡 **Project Idea Summary**
This is a web application that recommends daily outfits based on **real-time weather data** and **user preferences**. It's both fun and practical, and a great way to showcase creative frontend design with meaningful API integration.

---

### 🔌 **APIs to Use**
- **[OpenWeatherMap API](https://openweathermap.org/api)**: for real-time weather, temperature, humidity, and precipitation data
- **Custom clothing database**: you can create your own or allow users to build a personal "closet" (optional Firebase or MongoDB)

---

### 🌟 **Core Features**
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

### 👥 **Team Roles (If You Have a Team)**
| Role | Task |
|------|------|
| Frontend Dev | UI, clothing display, interactivity |
| Backend Dev | Closet database, logic for recommendations |
| API Integration | Weather API, geolocation |
| UX/UI Designer | Illustrations, avatar customization (optional) |

---

Would you like help building the initial wireframe, or scaffolding the HTML/CSS/JS files? Or do you want to take it one step further with React or Vue? Let me know how you'd like to start!
