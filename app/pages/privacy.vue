<script setup lang="ts">
useHead({
  title: 'Privacy Policy',
});

const website = location.origin;
</script>

<template>
  <UCard
    class="overflow-auto w-full"
    :ui="{ body: 'space-y-6 text-sm leading-relaxed' }"
  >
    <header class="space-y-1">
      <h1 class="text-2xl font-bold">
        Informativa sul trattamento dei dati personali
      </h1>
      <p class="text-muted">
        Resa ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (GDPR)
      </p>
      <p class="text-muted">Ultimo aggiornamento: 4 maggio 2026</p>
    </header>

    <section class="space-y-2">
      <h2 class="text-lg font-semibold">1. Perché queste informazioni</h2>
      <p>
        La presente informativa è resa, ai sensi dell'art. 13 del Regolamento
        (UE) 2016/679 (di seguito «GDPR»), agli utenti che consultano il sito
        D20 Warhammering, raggiungibile all'indirizzo
        <a :href="website" class="underline" target="_blank" rel="noopener">{{
          website
        }}</a>
        (di seguito, il «Sito»). L'informativa descrive le modalità con cui sono
        trattati i dati personali raccolti tramite il Sito ed è valida
        esclusivamente per esso, e non per altri siti web eventualmente
        consultati dall'utente tramite link.
      </p>
      <p>
        Il Sito è uno strumento amatoriale di registrazione e classifica delle
        partite di una lega di Warhammer 40.000 fra un gruppo ristretto di
        giocatori. Non vengono perseguite finalità commerciali, pubblicitarie o
        di profilazione.
      </p>
    </section>

    <section class="space-y-2">
      <h2 class="text-lg font-semibold">2. Titolare del Trattamento</h2>
      <p>
        Titolare del trattamento dei dati personali è
        <strong>D20 di Matteo Delia</strong>, con sede in
        <strong>Via Moratti 15, Somma Lombardo (VA)</strong>, contattabile
        all'indirizzo email
        <a href="mailto:d20sommalombardo@gmail.com" class="underline">
          d20sommalombardo@gmail.com</a
        >.
      </p>
      <p>
        Per qualunque richiesta relativa al trattamento dei propri dati
        personali e all'esercizio dei diritti riconosciuti dagli articoli 15-22
        del GDPR, l'interessato può rivolgersi direttamente al Titolare ai
        recapiti sopra indicati.
      </p>
    </section>

    <section class="space-y-2">
      <h2 class="text-lg font-semibold">3. Base giuridica del trattamento</h2>
      <p>
        Il trattamento dei dati personali raccolti tramite il Sito si fonda
        sulle seguenti basi giuridiche, ai sensi dell'art. 6 del GDPR:
      </p>
      <ul class="list-disc list-inside space-y-1 ml-2">
        <li>
          <strong>Legittimo interesse</strong> del Titolare (art. 6, par. 1,
          lett. f, GDPR) nella tenuta dello storico delle partite e della
          classifica della lega per i partecipanti al gruppo di gioco, nonché
          nella sicurezza tecnica del Sito;
        </li>
        <li>
          <strong>Consenso</strong> dell'interessato (art. 6, par. 1, lett. a,
          GDPR), prestato in forma libera, specifica, informata e inequivocabile
          al momento dell'inserimento dei propri dati nel modulo di
          registrazione partita.
        </li>
      </ul>
      <p>
        L'inserimento dei dati nel Sito è facoltativo. Il rifiuto di conferirli
        rende impossibile la registrazione della partita e l'apparizione del
        giocatore nella classifica, ma non comporta alcuna ulteriore
        conseguenza.
      </p>
    </section>

    <section class="space-y-2">
      <h2 class="text-lg font-semibold">
        4. Tipi di dati trattati e finalità del trattamento
      </h2>

      <h3 class="font-semibold mt-2">a) Dati di navigazione</h3>
      <p>
        I sistemi informatici e le procedure software preposte al funzionamento
        del Sito acquisiscono, nel corso del loro normale esercizio, alcuni dati
        personali la cui trasmissione è implicita nell'uso dei protocolli di
        comunicazione di Internet. Si tratta di informazioni che non sono
        raccolte per essere associate a interessati identificati, ma che per
        loro stessa natura potrebbero, attraverso elaborazioni ed associazioni
        con dati detenuti da terzi, permettere di identificare gli utenti.
      </p>
      <p>
        In questa categoria rientrano gli indirizzi IP, gli identificativi del
        browser, gli URL delle risorse richieste, l'orario della richiesta, il
        metodo utilizzato nel sottoporre la richiesta al server, la dimensione
        del file ottenuto in risposta ed altri parametri relativi al sistema
        operativo e all'ambiente informatico dell'utente. Tali dati sono
        trattati dal fornitore di hosting (cfr. sez. 5) per il tempo
        strettamente necessario allo scopo.
      </p>

      <h3 class="font-semibold mt-2">b) Dati comunicati dall'utente</h3>
      <p>
        Tramite il modulo di registrazione partita, accessibile dalla homepage,
        vengono raccolti i seguenti dati:
      </p>
      <ul class="list-disc list-inside space-y-1 ml-2">
        <li>nome (o nickname) dei due giocatori partecipanti alla partita;</li>
        <li>fazione utilizzata da ciascun giocatore;</li>
        <li>punteggio finale di ciascun giocatore;</li>
        <li>data della partita;</li>
        <li>budget in punti della partita.</li>
      </ul>
      <p>
        Tali dati sono trattati al solo fine di registrare l'esito della
        partita, calcolare la classifica della lega e mostrare lo storico
        partite e statistiche aggregate dei singoli giocatori. I nomi dei
        giocatori e le statistiche associate sono pubblicati nella pagina
        pubblica
        <NuxtLink to="/ranking" class="underline">Classifica</NuxtLink> ed
        accessibili a chiunque navighi sul Sito.
      </p>
      <p>
        <strong
          >Informativa ai sensi dell'art. 14 GDPR (dati raccolti presso
          terzi):</strong
        >
        qualora un giocatore registri una partita inserendo il nome di un altro
        partecipante, quest'ultimo ha diritto di essere informato del
        trattamento e di richiederne in qualunque momento la rettifica o la
        cancellazione, scrivendo al Titolare ai recapiti indicati alla sez. 2.
      </p>

      <h3 class="font-semibold mt-2">
        c) Cookie e altri sistemi di tracciamento
      </h3>
      <p>
        Il Sito non utilizza cookie di profilazione, né strumenti di analisi del
        comportamento degli utenti, né cookie di terze parti.
      </p>
      <p>
        Il Sito utilizza esclusivamente
        <strong>cookie tecnici di sessione</strong>, finalizzati
        all'autenticazione dell'amministratore nell'area di gestione del Sito.
        Tali cookie hanno una durata massima di 24 ore e non richiedono consenso
        preventivo, ai sensi del Provvedimento del Garante per la protezione dei
        dati personali del 10 giugno 2021 (doc. web n. 9677876).
      </p>
    </section>

    <section class="space-y-2">
      <h2 class="text-lg font-semibold">5. Destinatari dei dati</h2>
      <p>
        I dati personali raccolti tramite il Sito sono trattati dal Titolare e
        dai soggetti da esso nominati come responsabili del trattamento ai sensi
        dell'art. 28 del GDPR. In particolare:
      </p>
      <ul class="list-disc list-inside space-y-1 ml-2">
        <li>
          <strong>Vercel Inc.</strong> (hosting e distribuzione del Sito), con
          sede negli Stati Uniti d'America. L'utilizzo del servizio comporta il
          trasferimento di dati personali (in particolare i dati di navigazione
          di cui alla sez. 4.a) verso un Paese terzo non appartenente all'Unione
          Europea;
        </li>
        <li>
          <strong>Neon Inc.</strong> (database PostgreSQL gestito), con regione
          di archiviazione situata nell'Unione Europea (Francoforte,
          eu-central-1).
        </li>
      </ul>
      <p>
        I dati pubblicati sulla pagina Classifica sono inoltre liberamente
        consultabili da chiunque acceda al Sito.
      </p>
      <p>
        Al di fuori di quanto indicato, i dati non sono comunicati a terzi né
        diffusi.
      </p>
    </section>

    <section class="space-y-2">
      <h2 class="text-lg font-semibold">6. Periodo di conservazione</h2>
      <ul class="list-disc list-inside space-y-1 ml-2">
        <li>
          <strong>Dati delle partite e dei giocatori:</strong> sono conservati
          per tutto il periodo di attività della lega; saranno cancellati su
          richiesta dell'interessato o al termine dell'attività del Sito;
        </li>
        <li><strong>Cookie di sessione amministrativa:</strong> 24 ore;</li>
        <li>
          <strong>Log di navigazione tecnica:</strong> conservati dal fornitore
          di hosting per il tempo necessario alla diagnostica ed alla sicurezza
          del servizio, e comunque non oltre i termini previsti dalla policy del
          fornitore stesso.
        </li>
      </ul>
    </section>

    <section class="space-y-2">
      <h2 class="text-lg font-semibold">7. Diritti degli interessati</h2>
      <p>
        Agli interessati sono riconosciuti, alle condizioni previste dal GDPR, i
        seguenti diritti:
      </p>
      <ul class="list-disc list-inside space-y-1 ml-2">
        <li>diritto di accesso (art. 15 GDPR);</li>
        <li>diritto di rettifica (art. 16 GDPR);</li>
        <li>
          diritto alla cancellazione, c.d. «diritto all'oblio» (art. 17 GDPR);
        </li>
        <li>diritto di limitazione del trattamento (art. 18 GDPR);</li>
        <li>diritto alla portabilità dei dati (art. 20 GDPR);</li>
        <li>diritto di opposizione al trattamento (art. 21 GDPR);</li>
        <li>
          diritto di revocare in qualsiasi momento il consenso eventualmente
          prestato, senza pregiudicare la liceità del trattamento basata sul
          consenso prima della revoca (art. 7, par. 3, GDPR).
        </li>
      </ul>
      <p>
        Le richieste possono essere inoltrate al Titolare scrivendo
        all'indirizzo email indicato alla sez. 2. L'esercizio dei diritti è
        gratuito e il Titolare fornisce riscontro entro un mese dalla ricezione
        della richiesta.
      </p>
    </section>

    <section class="space-y-2">
      <h2 class="text-lg font-semibold">8. Diritto di reclamo</h2>
      <p>
        Qualora l'interessato ritenga che il trattamento dei propri dati
        personali avvenga in violazione del GDPR, ha diritto di proporre reclamo
        all'autorità di controllo competente, che per l'Italia è il
        <strong>Garante per la protezione dei dati personali</strong>
        (Piazza Venezia 11, 00187 Roma —
        <a
          href="https://www.garanteprivacy.it"
          class="underline"
          target="_blank"
          rel="noopener"
          >www.garanteprivacy.it</a
        >), ai sensi dell'art. 77 GDPR, ovvero adire le competenti autorità
        giurisdizionali ai sensi dell'art. 79 GDPR.
      </p>
    </section>

    <section class="space-y-2">
      <h2 class="text-lg font-semibold">9. Modifiche all'informativa</h2>
      <p>
        Il Titolare si riserva il diritto di apportare modifiche alla presente
        informativa in qualsiasi momento, dandone pubblicità agli utenti su
        questa stessa pagina. Si invita pertanto a consultare regolarmente
        questa pagina, facendo riferimento alla data di «Ultimo aggiornamento»
        riportata in apertura.
      </p>
    </section>
  </UCard>
</template>
