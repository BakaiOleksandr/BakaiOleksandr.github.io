const englishWords = [
  "go", "come", "eat", "drink", "sleep", "run", "walk", "talk", "listen", "read",
  "write", "see", "hear", "open", "close", "sit", "stand", "live", "work", "play",
  "help", "call", "wait", "start", "stop", "buy", "sell", "cook", "clean", "watch",
  "use", "like", "love", "hate", "need", "want", "take", "give", "know", "learn",
  "understand", "ask", "answer", "make", "move", "try", "choose", "change", "show", "find",
  "think", "remember", "forget", "begin", "believe", "stay", "push", "pull", "pay", "carry",
  "drive", "ride", "study", "grow", "wash", "build", "travel", "jump", "teach", "draw",
  "sing", "dance", "smile", "laugh", "cry", "open", "close", "cut", "throw", "catch",
  "fix", "break", "count", "touch", "fall", "win", "lose", "invite", "plan", "enjoy",
  "look", "follow", "arrive", "leave", "share", "check", "join", "save", "create", "compare"
];

  const dutchWords = [
  "gaan", "komen", "eten", "drinken", "slapen", "rennen", "lopen", "praten", "luisteren", "lezen",
  "schrijven", "zien", "horen", "openen", "sluiten", "zitten", "staan", "wonen", "werken", "spelen",
  "helpen", "bellen", "wachten", "beginnen", "stoppen", "kopen", "verkopen", "koken", "poetsen", "kijken",
  "gebruiken", "leuk vinden", "houden van", "haten", "nodig hebben", "willen", "nemen", "geven", "weten", "leren",
  "begrijpen", "vragen", "antwoorden", "maken", "bewegen", "proberen", "kiezen", "veranderen", "tonen", "vinden",
  "denken", "herinneren", "vergeten", "beginnen", "geloven", "blijven", "duwen", "trekken", "betalen", "dragen",
  "rijden", "fietsen", "studeren", "groeien", "wassen", "bouwen", "reizen", "springen", "onderwijzen", "tekenen",
  "zingen", "dansen", "glimlachen", "lachen", "huilen", "openen", "sluiten", "knippen", "gooien", "vangen",
  "repareren", "breken", "tellen", "aanraken", "vallen", "winnen", "verliezen", "uitnodigen", "plannen", "genieten",
  "kijken", "volgen", "aankomen", "vertrekken", "delen", "controleren", "meedoen", "opslaan", "creëren", "vergelijken"
];


const spanishWords = [
  "ir", "venir", "comer", "beber", "dormir", "correr", "caminar", "hablar", "escuchar", "leer",
  "escribir", "ver", "oír", "abrir", "cerrar", "sentarse", "estar de pie", "vivir", "trabajar", "jugar",
  "ayudar", "llamar", "esperar", "empezar", "parar", "comprar", "vender", "cocinar", "limpiar", "mirar",
  "usar", "gustar", "amar", "odiar", "necesitar", "querer", "tomar", "dar", "saber", "aprender",
  "entender", "preguntar", "responder", "hacer", "mover", "intentar", "elegir", "cambiar", "mostrar", "encontrar",
  "pensar", "recordar", "olvidar", "comenzar", "creer", "quedarse", "empujar", "tirar", "pagar", "llevar",
  "conducir", "andar en bici", "estudiar", "crecer", "lavar", "construir", "viajar", "saltar", "enseñar", "dibujar",
  "cantar", "bailar", "sonreír", "reír", "llorar", "abrir", "cerrar", "cortar", "lanzar", "atrapar",
  "arreglar", "romper", "contar", "tocar", "caer", "ganar", "perder", "invitar", "planear", "disfrutar",
  "ver", "seguir", "llegar", "salir", "compartir", "revisar", "unirse", "guardar", "crear", "comparar"
];

const russianWords = [
  "идти", "приходить", "есть", "пить", "спать", "бежать", "ходить", "говорить", "слушать", "читать",
  "писать", "видеть", "слышать", "открывать", "закрывать", "садиться", "стоять", "жить", "работать", "играть",
  "помогать", "звонить", "ждать", "начинать", "останавливаться", "покупать", "продавать", "готовить", "убирать", "смотреть",
  "использовать", "нравиться", "любить", "ненавидеть", "нуждаться", "хотеть", "брать", "давать", "знать", "учить",
  "понимать", "спрашивать", "отвечать", "делать", "двигать", "пытаться", "выбирать", "менять", "показывать", "находить",
  "думать", "помнить", "забывать", "начинать", "верить", "оставаться", "толкать", "тянуть", "платить", "нести",
  "водить", "ехать", "учиться", "расти", "мыть", "строить", "путешествовать", "прыгать", "учить", "рисовать",
  "петь", "танцевать", "улыбаться", "смеяться", "плакать", "открывать", "закрывать", "резать", "бросать", "ловить",
  "чинить", "ломать", "считать", "трогать", "падать", "выигрывать", "проигрывать", "приглашать", "планировать", "наслаждаться",
  "видеть", "следовать", "прибывать", "уходить", "делиться", "проверять", "присоединяться", "сохранять", "создавать", "сравнивать"
];


const ukrainianWords = [
  "йти", "приходити", "їсти", "пити", "спати", "бігти", "ходити", "говорити", "слухати", "читати",
  "писати", "бачити", "чути", "відкривати", "закривати", "сісти", "стояти", "жити", "працювати", "грати",
  "допомагати", "дзвонити", "чекати", "починати", "зупинятися", "купувати", "продавати", "готувати", "прибирати", "дивитися",
  "використовувати", "подобатися", "любити", "ненавидіти", "потребувати", "хотіти", "брати", "давати", "знати", "вчити",
  "розуміти", "питати", "відповідати", "робити", "рухати", "намагатися", "обирати", "змінювати", "показувати", "знаходити",
  "думати", "пам’ятати", "забувати", "починати", "вірити", "залишатися", "штовхати", "тягнути", "платити", "нести",
  "водити", "їхати", "вчитися", "рости", "мити", "будувати", "подорожувати", "стрибати", "навчати", "малювати",
  "співати", "танцювати", "усміхатися", "сміятися", "плакати", "відчиняти", "зачиняти", "різати", "кидати", "ловити",
  "ремонтувати", "ламати", "рахувати", "торкатися", "падати", "вигравати", "програвати", "запрошувати", "планувати", "насолоджуватися",
  "бачити", "слідувати", "прибувати", "йти", "ділитися", "перевіряти", "приєднуватися", "зберігати", "створювати", "порівнювати"
];


const frenchWords = [
  "aller", "venir", "manger", "boire", "dormir", "courir", "marcher", "parler", "écouter", "lire",
  "écrire", "voir", "entendre", "ouvrir", "fermer", "s'asseoir", "se lever", "vivre", "travailler", "jouer",
  "aider", "téléphoner", "attendre", "commencer", "s'arrêter", "acheter", "vendre", "cuisiner", "nettoyer", "regarder",
  "utiliser", "aimer", "adorer", "détester", "avoir besoin", "vouloir", "prendre", "donner", "savoir", "apprendre",
  "comprendre", "demander", "répondre", "faire", "bouger", "essayer", "choisir", "changer", "montrer", "trouver",
  "penser", "se souvenir", "oublier", "démarrer", "croire", "rester", "pousser", "tirer", "payer", "porter",
  "conduire", "aller (en véhicule)", "étudier", "grandir", "laver", "construire", "voyager", "sauter", "enseigner", "dessiner",
  "chanter", "danser", "sourire", "rire", "pleurer", "ouvrir", "fermer", "couper", "jeter", "attraper",
  "réparer", "casser", "compter", "toucher", "tomber", "gagner", "perdre", "inviter", "prévoir", "profiter",
  "voir", "suivre", "arriver", "partir", "partager", "vérifier", "rejoindre", "garder", "créer", "comparer"
];