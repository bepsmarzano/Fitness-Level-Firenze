# Fitness Levels — Guida al Deploy

## Struttura del progetto

```
fitness-levels/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          ← Componente principale
│   ├── firebase.js      ← Configurazione Firebase
│   ├── useFirestore.js  ← Hook per leggere/scrivere su Firestore
│   └── main.jsx         ← Entry point React
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── .gitignore
└── README.md
```

---

## 1 · Crea il progetto Firebase (5 minuti)

1. Vai su [console.firebase.google.com](https://console.firebase.google.com)
2. Clicca **"Aggiungi progetto"** → scegli un nome (es. `fitness-levels`)
3. Disabilita Google Analytics (non serve) → **Crea progetto**
4. Nel progetto, clicca l'icona **Web** (`</>`) per aggiungere un'app web
5. Dai un nome (es. `fitness-levels-web`) → **Registra app**
6. Copia i valori di `firebaseConfig` che ti vengono mostrati

### Abilita Firestore

1. Nel menu laterale vai su **Firestore Database**
2. Clicca **"Crea database"**
3. Scegli **Modalità produzione**
4. Seleziona la region più vicina (es. `europe-west1`)
5. Vai nella tab **Regole** e incolla queste regole temporanee:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

> ⚠️ Queste regole permettono accesso a tutti. Più avanti puoi aggiungere
> autenticazione Firebase per proteggere i dati.

---

## 2 · Configura il progetto locale

```bash
# Clona o copia la cartella del progetto
cd fitness-levels

# Installa le dipendenze
npm install

# Crea il file di configurazione
cp .env.example .env.local
```

Apri `.env.local` e inserisci i valori copiati dalla console Firebase:

```
VITE_FB_API_KEY=AIzaSy...
VITE_FB_AUTH_DOMAIN=fitness-levels-xxxxx.firebaseapp.com
VITE_FB_PROJECT_ID=fitness-levels-xxxxx
VITE_FB_STORAGE_BUCKET=fitness-levels-xxxxx.appspot.com
VITE_FB_MESSAGING_ID=123456789012
VITE_FB_APP_ID=1:123456789012:web:abcdef123456
```

### Testa in locale

```bash
npm run dev
```

Apri `http://localhost:5173` — l'app dovrebbe funzionare e salvare i dati su Firestore.

---

## 3 · Deploy su Vercel (3 minuti)

### Opzione A — Da GitHub (consigliata)

1. Crea un repository su GitHub e fai push del progetto:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TUO_USER/fitness-levels.git
git push -u origin main
```

2. Vai su [vercel.com](https://vercel.com) → **Add New Project**
3. Importa il repository da GitHub
4. In **Environment Variables** aggiungi le stesse variabili di `.env.local`:
   - `VITE_FB_API_KEY`
   - `VITE_FB_AUTH_DOMAIN`
   - `VITE_FB_PROJECT_ID`
   - `VITE_FB_STORAGE_BUCKET`
   - `VITE_FB_MESSAGING_ID`
   - `VITE_FB_APP_ID`
5. Clicca **Deploy**

Vercel rileverà automaticamente Vite e farà il build. In ~30 secondi avrai un URL tipo `fitness-levels.vercel.app`.

### Opzione B — Da CLI

```bash
npm i -g vercel
vercel          # segui le istruzioni interattive
vercel --prod   # deploy in produzione
```

---

## 4 · Dominio personalizzato (opzionale)

In Vercel → **Settings** → **Domains** puoi aggiungere un dominio custom (es. `levels.tuobox.it`). Vercel gestisce automaticamente HTTPS.

---

## Note

- **I dati sono in tempo reale**: se due trainer usano l'app contemporaneamente, vedono gli aggiornamenti istantaneamente grazie a Firestore `onSnapshot`.
- **Firebase gratuito**: il piano Spark include 1GB di storage e 50K letture/giorno — più che sufficiente per una palestra.
- **Sicurezza**: per produzione seria, abilita Firebase Authentication e aggiorna le regole Firestore per richiedere login.
