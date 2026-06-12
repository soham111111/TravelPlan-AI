# ✈️ TravelPlan AI

> A smart travel planning web app built with Machine Learning and Google Gemini AI. Plan trips, discover destinations, track budgets, and explore real-time transport — all in one place.

---

## 🌟 Features

### 🗺️ AI-Powered Destination Recommendations
- ML model (Random Forest + cosine similarity) trained on 100+ global destinations
- Personalized suggestions based on budget, trip duration, and travel preferences
- Smart filtering by continent, climate, and travel style

### 📅 Gemini AI Itinerary Generator
- Day-by-day travel plans with **real place names**, exact venues, and neighbourhoods
- Specific restaurant recommendations with dishes to try
- Practical tips: opening hours, entry fees, local transport guidance
- Falls back to dataset-based planning if AI is unavailable
- ✨ AI-Powered badge on Gemini-generated itineraries

### 🗺️ Live Interactive Transport Map
- Real-time data from **OpenStreetMap Overpass API**
- Correctly classifies: 🔴 Metro/Subway · 🟢 Rail/Train · 🔵 Bus · 🟣 Tram
- All station names displayed as **clickable chips** — click to pan the map to that station
- Expand/collapse for cities with many stops
- Fixes Mumbai suburban trains correctly as Rail (not Metro)

### 💰 Smart Budget & Wallet
- Multi-currency wallet with live exchange rates
- QR code generation for wallet ID
- Budget tracking and travel cost breakdown

### 🌤️ Weather Integration
- Current weather and forecasts for any destination
- Trip-specific packing suggestions based on weather

### 🍽️ Food & Culture Guide
- Local cuisine recommendations per destination
- Cultural etiquette tips and must-try dishes

### 🌐 Language Translator
- Built-in travel phrase translator
- Common phrases for popular travel languages

### 🤖 AI Travel Chatbot
- Floating chatbot powered by Google Gemini
- Answers travel queries, gives local tips, helps with planning

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Python, Flask |
| **ML Models** | scikit-learn (Random Forest, KNN, cosine similarity) |
| **AI / LLM** | Google Gemini API (`gemini-1.5-flash`) |
| **Database** | SQLite via SQLAlchemy |
| **Maps** | Leaflet.js + OpenStreetMap Overpass API |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Auth** | Flask-Login, Flask-WTF (CSRF protection) |
| **Data** | Pandas, NumPy |
| **APIs** | Nominatim (geocoding), OpenWeatherMap, Exchange Rate API |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- pip
- A Google Gemini API key ([get one here](https://makersuite.google.com/app/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/tejashreee29/travellai.git
cd travellai

# Create virtual environment
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt
```

### Environment Setup

Create a `.env` file in the root directory:

```env
SECRET_KEY=your_flask_secret_key
GEMINI_API_KEY=your_gemini_api_key
WEATHER_API_KEY=your_openweathermap_key     # optional
EXCHANGE_RATE_API_KEY=your_exchange_key     # optional
```

### Run the App

```bash
python app.py
```

Open your browser at **http://127.0.0.1:8080**

---

## 📁 Project Structure

```
travellai/
├── app.py                    # Main Flask application & all routes
├── destination_model.py      # ML recommendation engine
├── database.py               # SQLAlchemy models & DB setup
├── requirements.txt          # Python dependencies
│
├── static/
│   ├── style.css             # Global styles
│   └── chatbot.js            # Floating AI chatbot widget
│
├── templates/
│   ├── index.html            # Landing page
│   ├── dashboard.html        # User dashboard
│   ├── destinations.html     # Destination recommendations
│   ├── itinerary.html        # AI itinerary generator
│   ├── transport.html        # Live transport map
│   ├── weather.html          # Weather forecasts
│   ├── food.html             # Food & culture guide
│   ├── currency.html         # Budget & wallet
│   └── translator.html       # Language translator
│
└── data/                     # CSV datasets for ML model
```

---

## 🤖 ML Model Details

- **Algorithm:** Random Forest Classifier + KNN for collaborative filtering
- **Similarity:** Cosine similarity on destination feature vectors
- **Features:** Budget range, trip duration, climate, activities, continent
- **Training Data:** 100+ curated global destinations with metadata
- **Accuracy:** ~87% on destination category prediction

---

## 🔑 API Keys Required

| API | Used For | Free Tier |
|---|---|---|
| [Google Gemini](https://makersuite.google.com/) | Itinerary generation & chatbot | ✅ Yes |
| [OpenWeatherMap](https://openweathermap.org/api) | Weather forecasts | ✅ Yes |
| [ExchangeRate-API](https://www.exchangerate-api.com/) | Currency conversion | ✅ Yes |
| OpenStreetMap Overpass | Live transport data | ✅ Free (no key needed) |

---

## 👩‍💻 Author

**Soham Pandav**  
[GitHub]([https://github.com/tejashreee29](https://github.com/soham111111))

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
