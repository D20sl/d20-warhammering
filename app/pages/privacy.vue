<script setup lang="ts">
useHead({
  title: 'Privacy Policy',
});

const website = useRequestURL().origin;
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
      <p class="text-muted">Ultimo aggiornamento: 1 ottobre 2026</p>
    </header>

    <section class="space-y-2">
      <h2 class="text-lg font-semibold">1. Perché queste informazioni</h2>
      <p>
        La presente informativa è resa, ai sensi dell'art. 13 del Regolamento
        (UE) 2016/679 (di seguito «GDPR»):
      </p>
      <ul class="list-disc list-inside space-y-1 ml-2">
        <li>
          a chi crea o utilizza un account D20 (di seguito, l'«Account»),
          tramite le pagine di registrazione e di accesso;
        </li>
        <li>
          agli utenti del sito D20 Warhammering, raggiungibile all'indirizzo
          <a :href="website" class="underline" target="_blank" rel="noopener">{{
            website
          }}</a>
          (di seguito, il «Sito»).
        </li>
      </ul>
      <p>
        L'informativa descrive le modalità con cui sono trattati i dati
        personali dell'Account e quelli raccolti tramite il Sito. Non si applica
        ad altri siti web eventualmente consultati dall'utente tramite link.
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
        Il trattamento dei dati personali dell'Account e di quelli raccolti
        tramite il Sito si fonda sulle seguenti basi giuridiche, ai sensi
        dell'art. 6 del GDPR:
      </p>
      <ul class="list-disc list-inside space-y-1 ml-2">
        <li>
          <strong
            >Esecuzione di un contratto di cui l'interessato è parte</strong
          >
          (art. 6, par. 1, lett. b, GDPR):
          <ul class="list-[circle] list-inside space-y-1 ml-6 mt-1">
            <li>
              per i dati dell'Account, necessari a fornire all'utente l'accesso
              ai servizi online di D20 che ha richiesto creando l'Account;
            </li>
            <li>
              per i dati delle partite. Accedendo al Sito, l'utente chiede di
              partecipare alla lega: il servizio offerto dal Sito consiste nel
              registrare le partite giocate dai partecipanti, calcolare la
              classifica e mostrarla agli altri utenti registrati;
            </li>
          </ul>
        </li>
        <li>
          <strong>Legittimo interesse</strong> del Titolare (art. 6, par. 1,
          lett. f, GDPR) nella sicurezza tecnica del Sito e del servizio di
          autenticazione, per i dati di navigazione registrati nei log del
          server.
        </li>
      </ul>
      <p>
        La creazione dell'Account e l'inserimento dei dati nel Sito sono
        facoltativi. Il rifiuto di conferirli rende impossibile l'accesso al
        Sito, la registrazione delle partite e l'apparizione del giocatore nella
        classifica, ma non comporta alcuna ulteriore conseguenza. Tutte le
        pagine del Sito, ad eccezione della presente informativa, sono
        accessibili solo agli utenti che hanno effettuato l'accesso.
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
        registrati nei log tecnici del server che ospita il Sito ed il servizio
        di autenticazione (cfr. sez. 5) e trattati per il tempo strettamente
        necessario alla diagnostica ed alla sicurezza del servizio.
      </p>

      <h3 class="font-semibold mt-2">b) Dati dell'Account</h3>
      <p>
        L'Account è unico per tutti i servizi online di D20 ed è necessario per
        accedere al Sito. La creazione dell'Account e l'accesso sono gestiti da
        un servizio di autenticazione (Keycloak) installato sul server del
        Titolare. In fase di registrazione vengono raccolti:
      </p>
      <ul class="list-disc list-inside space-y-1 ml-2">
        <li>indirizzo email;</li>
        <li>nome e cognome;</li>
        <li>nome utente;</li>
        <li>
          password, conservata esclusivamente in forma cifrata (hash) e mai
          leggibile dal Titolare.
        </li>
      </ul>
      <p>
        In alternativa, l'utente può scegliere di accedere con il proprio
        account Google. In tal caso Google comunica al Sito nome, cognome e
        indirizzo email dell'utente, e il trattamento dei dati da parte di
        Google è regolato dalla
        <a
          href="https://policies.google.com/privacy"
          class="underline"
          target="_blank"
          rel="noopener"
          >privacy policy di Google</a
        >.
      </p>
      <p>
        Al primo accesso al Sito, l'utente viene iscritto alla lega come
        giocatore. Da quel momento il Sito conserva nel proprio database il nome
        e cognome dell'utente ed un identificativo tecnico dell'Account. Il nome
        e cognome è utilizzato come nome del giocatore ed è quindi visibile agli
        altri utenti registrati nella classifica (cfr. punto c). Chi crea
        l'Account senza mai accedere al Sito non compare nella classifica.
      </p>
      <p>
        Lo stesso Account consente l'accesso anche agli altri servizi online di
        D20, attuali e futuri, gestiti dal medesimo Titolare. I dati che
        ciascuno di questi servizi raccoglie oltre a quelli dell'Account sono
        descritti nella rispettiva informativa.
      </p>

      <h3 class="font-semibold mt-2">c) Dati delle partite</h3>
      <p>
        Tramite il modulo di registrazione partita, accessibile dalla homepage
        agli utenti che hanno effettuato l'accesso, vengono raccolti i seguenti
        dati:
      </p>
      <ul class="list-disc list-inside space-y-1 ml-2">
        <li>
          nome e cognome dei due giocatori partecipanti alla partita, come
          indicati nei rispettivi account;
        </li>
        <li>fazione utilizzata da ciascun giocatore;</li>
        <li>punteggio finale di ciascun giocatore;</li>
        <li>data della partita;</li>
        <li>budget in punti della partita.</li>
      </ul>
      <p>
        Tali dati sono trattati al solo fine di registrare l'esito della
        partita, calcolare la classifica della lega e mostrare lo storico
        partite e statistiche aggregate dei singoli giocatori. I nomi dei
        giocatori e le statistiche associate sono mostrati nella pagina
        <NuxtLink to="/ranking" class="underline">Classifica</NuxtLink>,
        visibile solo agli utenti registrati del Sito.
      </p>
      <p>
        <strong
          >Informativa ai sensi dell'art. 14 GDPR (dati raccolti presso
          terzi):</strong
        >
        ciascuna partita è registrata da uno dei due giocatori, che inserisce
        anche i dati dell'avversario. L'avversario può essere scelto solo fra
        gli utenti registrati, che hanno quindi ricevuto la presente informativa
        al momento dell'iscrizione. Il giocatore registrato da un altro
        partecipante può richiedere in qualunque momento la rettifica o la
        cancellazione della partita, scrivendo al Titolare ai recapiti indicati
        alla sez. 2.
      </p>

      <h3 class="font-semibold mt-2">
        d) Cookie e altri sistemi di tracciamento
      </h3>
      <p>
        Il Sito non utilizza cookie di profilazione, né strumenti di analisi del
        comportamento degli utenti, né cookie di terze parti.
      </p>
      <p>
        Il Sito utilizza esclusivamente
        <strong>cookie tecnici</strong>, necessari all'accesso degli utenti:
      </p>
      <ul class="list-disc list-inside space-y-1 ml-2">
        <li>
          un cookie di sessione, che mantiene l'utente collegato al Sito per un
          massimo di 24 ore;
        </li>
        <li>
          un cookie temporaneo, che durante l'accesso ricorda la pagina a cui
          riportare l'utente, con durata massima di 10 minuti;
        </li>
        <li>
          i cookie del servizio di autenticazione, che mantengono attiva la
          sessione sull'Account fino alla sua scadenza o al logout.
        </li>
      </ul>
      <p>
        Tali cookie non richiedono consenso preventivo, ai sensi del
        Provvedimento del Garante per la protezione dei dati personali del 10
        giugno 2021 (doc. web n. 9677876).
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
          <strong>OVHcloud</strong>, fornitore del server virtuale su cui il
          Titolare ospita il Sito ed il servizio di autenticazione. Il server si
          trova in Canada. Il trasferimento dei dati verso il Canada avviene
          sulla base della decisione di adeguatezza della Commissione Europea
          (Decisione 2002/2/CE), ai sensi dell'art. 45 GDPR;
        </li>
        <li>
          <strong>Neon Inc.</strong> (database PostgreSQL gestito), con regione
          di archiviazione situata nell'Unione Europea (Francoforte,
          eu-central-1);
        </li>
        <li>
          <strong>Google</strong>, limitatamente agli utenti che scelgono di
          accedere con il proprio account Google (cfr. sez. 4.b).
        </li>
      </ul>
      <p>
        I dati mostrati nella pagina Classifica sono inoltre visibili a tutti
        gli utenti registrati del Sito.
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
        <li>
          <strong>Dati dell'Account:</strong> conservati fino alla cancellazione
          dell'Account, che l'utente può richiedere in qualunque momento al
          Titolare;
        </li>
        <li><strong>Cookie di sessione:</strong> massimo 24 ore;</li>
        <li>
          <strong>Log di navigazione tecnica:</strong> conservati sul server del
          Titolare per il tempo necessario alla diagnostica ed alla sicurezza
          del servizio.
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
        <li>
          diritto di opposizione al trattamento basato sul legittimo interesse
          (art. 21 GDPR).
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
