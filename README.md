# Impression Analytics Dashboard

Questo progetto è una soluzione full-stack per l'analisi e la visualizzazione di un set di dati di circa 100.000+ righe composto da impressions(gerco publicitario) visualizzazione utente di pubblicià.

È composto da un backend API e un frontend dashboard interattivo.

Il backend carica i dati in memoria all'avvio per query istantanee, e il frontend utilizza React Query e Styled-Components per un'esperienza utente moderna.

-----

## Stack Tecnologico

* **Backend:** Node.js, Fastify, TypeScript, CSV-Parser, @turf/turf
* **Frontend:** React, Vite, TypeScript, React Query (TanStack Query), Styled-Components, Chart.js
* **Testing & Mocking:** Vitest, Supertest, MSW (Mock Service Worker)

-----

## Backend

Il backend è un server API Node.js costruito con **Fastify** per massimizzare le prestazioni.

### Cosa Fa

A differenza di un approccio tradizionale con database, questo backend adotta una strategia **in-memory** per garantire la massima velocità di risposta:

1.  **FASE di Avvio (ETL):** All'avvio, il server legge l'intero file `data.csv` e lo carica in Memoria.
2.  **Arricchimento Dati:** Durante il caricamento, ogni riga viene processata e arricchita:
    * **Geocodifica:** Utilizzando `map.json` e `@turf/turf`, ogni punto (`lat`, `lng`) viene classificato come `USA` (con stato), `no-usa` o `not-found` (dati sporchi).
    * **Conversione:** I timestamp vengono convertiti per l'elaborazione.
3.  **Servizio API:** Il server espone un set di API REST che interrogano questo array in memoria, permettendo aggregazioni e filtri in pochi millisecondi.

### Endpoint API Esposti

* `/api/impressions`: Fornisce i dati grezzi con supporto completo per **filtri** (`country`), **ordinamento** (lato server) e **paginazione**.
* `/api/stats/*`: Una serie di endpoint di aggregazione che rispondono a specifici requisiti
    * `.../by-device`: Conteggio per dispositivo.
    * `.../by-hour`: Conteggio per ora del giorno.
    * `.../by-dow`: Conteggio per giorno della settimana.
    * `.../by-month`: Conteggio per mese.
    * `.../by-state`: Conteggio per stato USA.
    * `.../black-friday`: Trend annuale del Black Friday.
    * Extra API (Creata in ultimo anche fornire dati % )
    * `.../kpi`: Calcola e restituisce KPI aggregati (es. % variazione giornaliera/settimanale, top device).

-----

### Documentazione API (Swagger/OpenAPI)

Per facilitare l'esplorazione e il test delle API, è stata integrata la documentazione interattiva **Swagger UI**.

Una volta avviato il backend:

1.  Apri il browser e vai a: `http://localhost:3001/docimpression`
2.  Vedrai una pagina web che elenca tutti gli endpoint disponibili.
3.  Puoi espandere ogni endpoint per vedere i parametri richiesti (`country`, `sortBy`, `page`, ecc.), gli schemi di risposta attesi e 
4.  Puoi anche **eseguire richieste di prova** direttamente dal browser cliccando su "Try it out" -> "Execute".

## Frontend

Il frontend è un'applicazione React (creata con Vite) focalizzata sulla **qualità del codice**, la **manutenibilità** e un'architettura **component-based**.

### Cosa Fa

Consuma le API del backend per presentare i dati in una dashboard interattiva e professionale.

### Architettura e Feature

* **State Management (Data Fetching):** Utilizza **React Query (TanStack Query)** per gestire l'intero ciclo di vita dei dati (fetching, caching, stati di caricamento ed errore).
* Questo garantisce che i filtri siano performanti (grazie alla cache) e che l'UI sia sempre reattiva.
* **Styling:** Utilizza **Styled-Components** con un'architettura "Component Folder Pattern". 
* Ogni componente vive nella sua cartella con i suoi file `index.ts`, `Nome.tsx` (logica) e `Nome.style.ts` (stile), garantendo una perfetta separazione delle competenze (SoC).
* **Routing:** Utilizza `react-router-dom` per creare un'esperienza multi-pagina:
    * **`/` (Dashboard):** Una vista di alto livello con i **KPI** più importanti e i grafici di riepilogo.
    * **`/devices`, `/time`, `/geo` (Pagine Dettaglio):** Viste dedicate che mostrano analisi più approfondite e visualizzazioni multiple per una singola metrica.
    * **`/explorer` (Esplora Dati):** Una tabella personalizzata che utilizza l'endpoint `/api/impressions` per mostrare i dati grezzi, con paginazione e ordinamento lato server.
* **Mocking (Isolamento):** L'applicazione può essere eseguita in modalità "mock" (solo in sviluppo). Utilizzando **MSW (Mock Service Worker)**, intercetta tutte le chiamate API e 
* restituisce dati falsi, permettendo lo sviluppo e il test dell'UI senza avviare il backend, utilizzata durante la fase di sviluppo separato e prima dell'integrazione finale.

-----

## Utilizzo in Locale

Per eseguire l'intero progetto, bisogna avviare il Backend e il Frontend in **due terminali separati**.

### Prerequisiti

* Node.js (v18 o superiore)
* `npm` (o `yarn`/`pnpm`)

### 1\. Avviare il Backend

Il backend deve essere in esecuzione per fornire i dati reali.

1.  Posizionati nella cartella `backend`:
    ```bash
    cd backend
    ```
2.  **Importante:** Copia i tuoi file `data.csv` (o il nome che hai usato) e `map.json` nella root della cartella `backend/data`.
3.  Installa le dipendenze:
    ```bash
    npm install
    ```
4.  Avvia il server (in modalità sviluppo con `ts-node`):
    ```bash
    npm start
    ```
    Il server si avvierà, caricherà il CSV (potrebbe richiedere alcuni secondi) e si metterà in ascolto su `http://localhost:3001`.

### 2\. Avviare il Frontend

1.  Apri un **nuovo terminale** e posizionati nella cartella `frontend`:
    ```bash
    cd frontend
    ```
2.  Installa le dipendenze:
    ```bash
    npm install
    ```
3.  Avvia il server di sviluppo Vite:
    ```bash
    npm run dev
    ```
    Il frontend sarà accessibile (di solito) su `http://localhost:5173`.

### 3\. Modalità di Utilizzo

Una volta aperta l'app nel browser, hai due modalità:

#### Modalità Reale (Default)

* Assicurati che l'interruttore "API Mock" nell'header sia **spento**.
* L'app chiamerà il tuo backend reale su `localhost:3001` e visualizzerà i dati del CSV.
* Questa modalità testa l'integrazione completa.

#### Modalità Mock (Sviluppo UI)

* Attiva l'interruttore "API Mock" nell'header.
* L'applicazione si ricaricherà.
* Tutte le chiamate API verranno intercettate da MSW. Ora puoi **spegnere il backend** (il terminale di `npm start`) e 
* il frontend continuerà a funzionare con i dati falsi definiti in `frontend/src/mocks/`.
* 