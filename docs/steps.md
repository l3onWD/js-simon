# Simon Say

<br>

## Steps:

- Recupero gli elementi della pagina
- **QUANDO** _Premo sul tasto Gioca_
    - Genero 5 numeri casuali unici
    - Aggiungo i numeri dinamicamente in pagina
    - Inizio a contare
    - Nascondo il bottone gioca
    - Aggiorno il messaggio
    - Mostro il conteggio di partenza
    - Mostro i numeri
    - **QUANDO** _ad ogni secondo_
        - Riduco il conteggio di 1
        - Mostro il conteggio in pagina
        - **SE** _il conteggio è arrivato a 0_
            - Smetto di contare
            - Nascondo il conteggio
            - Nascondo i numeri
            - Mostro i campi
            - Mostro il bottone d'invio
            - Aggiorno il messaggio per inserire i 5 numeri precedenti
- **QUANDO** _Premo sul tasto Invia_
    - Raccolgo i 5 numeri inseriti
    - **FINCHE** _ho numeri dell'utente da controllare_
        - Prendo il numero corrente
        - **SE** _è uno dei numeri corretti_ **E** _non è stato già controllato_
            - Aumento il numero di numeri indovinati
    - Nascondo il tasto invio
    - Nascondo i numeri inseriti
    - Aggiorno il messaggio con il punteggio e i numeri indovinati
