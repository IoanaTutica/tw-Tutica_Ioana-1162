# Proiect TW - Quote Manager integrat cu Google Translate API

Student: Tutica Ioana
Grupa: 1162

## Descrierea proiectului
Aceasta este o aplicatie web de tip SPA care permite utilizatorilor sa gestioneze o colectie de citate personale. Ideea principala este ca fiecare utilizator sa aiba propriul cont securizat unde isi poate salva citatele preferate si le poate traduce automat folosind un API extern.

## Specificatii tehnice
Am implementat cerintele temei astfel:

  1. **Persistenta datelor:**
    - Folosesc o baza de date SQLite cu doua entitati: Users si Quotes.
    - Relatia este de tip one-to-many (un utilizator poate avea mai multe citate).

  2. **Backend RESTful:**
    - Implementat in Node.js cu Express.
    - Ofera endpoint-uri CRUD.

  3. **Frontend SPA:**
    - Realizat cu React.js.
    - Include autentificare si rutare (accesul la date se face doar dupa login).

  4. **Integrare API extern:**
    - Functionalitate de traducere automata a citatelor (engleza -> romana).

## Ghid de instalare si rulare

Pasii necesari pentru clonarea si pornirea proiectului local:

### 1. Clonare proiect
Se deschide un terminal si se ruleaza comanda:
git clone git@github.com:IoanaTutica/tw-Tutica_Ioana-1162.git

### 2. Backend (Server)
- In folderul `backend` se ruleaza comanda de instalare:
  npm install
- Pornire server:
  npm start

(Serverul va rula pe portul 8080 si va genera automat baza de date)

### 3. Frontend (Client)
- In folderul `frontend` (intr-un terminal nou) se ruleaza comanda:
  npm install
- Pornire aplicatie:
  npm start

Aplicatia se va deschide automat in browser la http://localhost:3000