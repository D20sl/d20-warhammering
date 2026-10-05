export const ErrorMessages = {
  LOGIN_REQUIRED: 'Devi accedere per continuare',
  LOGIN_REQUIRED_FOR_BATTLE: 'Devi accedere per registrare una partita',
  LOGIN_FAILED: 'Accesso non riuscito',
  ADMIN_REQUIRED: 'Non hai i permessi per questa sezione',

  INVALID_DATE: 'Ti sembra una data valida questa?',
  INVALID_IMAGE_TYPE: "L'immagine deve essere in formato JPEG, PNG o WebP",
  IMAGE_TOO_LARGE: (maxMegabytes: number) =>
    `L'immagine supera il limite di ${maxMegabytes} MB`,

  PLAYER_NOT_FOUND: 'Giocatore non trovato',
  PLAYER_DOES_NOT_EXIST: (name: string) => `Il giocatore "${name}" non esiste`,
  PLAYER_NAME_INVALID: 'Nome non valido',
  PLAYER_NAME_TAKEN: (name: string) =>
    `Il nome "${name}" appartiene già a un altro giocatore`,
  PLAYER_NAME_REQUIRED: "Questo sito non supporta l'anonimato",

  FACTION_REQUIRED: 'Si ma mi devi dire la fazione',
  FACTION_INVALID: 'Ma sta fazione mica esiste oh',

  BATTLE_NOT_FOUND: 'Partita non trovata',
  BATTLE_ID_INVALID: 'ID non valido',
  BATTLE_IN_FUTURE: 'Dubito che questa partita si sia svolta nel futuro',
  BATTLE_SAME_PLAYER:
    'Il disturbo di personalità multiple non è contemplato in questo sito',
  POINTS_REQUIRED: 'Bro i punti',
  POINTS_NOT_INTEGER: 'Le virgole le metti altrove, solo numeri interi qui',
  POINTS_BELOW_MIN: 'Meno di zero? Ma che schifo',
  POINTS_ABOVE_MAX: 'Più di 100? È letteralmente impossibile',

  SEASON_NOT_FOUND: 'Stagione non trovata',
  SEASON_NAME_MISSING: 'Nome stagione mancante',
  SEASON_NAME_REQUIRED: 'La stagione deve avere un nome tematico',
  SEASON_DESCRIPTION_REQUIRED:
    'La stagione deve avere una descrizione tematica',
  SEASON_COVER_REQUIRED: "La stagione deve avere un'immagine tematica",
  SEASON_DATE_ORDER:
    "La data di fine deve essere successiva alla data d'inizio",

  FORM_DATA_MISSING: 'Form data mancanti',
  FORM_DATA_FIELD_MISSING: 'Campo "data" mancante',
  FORM_DATA_FIELD_INVALID_JSON: 'Campo "data" non è un JSON valido',
} as const;
