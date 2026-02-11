import { PrismaClient, Era, Difficulty } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})
const prisma = new PrismaClient({ adapter })

type OptionData = {
  text: string
  isCorrect: boolean
  orderIndex: number
  translations?: { el: { text: string } }
}

type QuestionData = {
  text: string
  explanation: string
  difficulty: Difficulty
  orderIndex: number
  multipleCorrect: boolean
  options: OptionData[]
  translations?: { el: { text: string; explanation: string } }
}

type QuizData = {
  title: string
  description: string
  era: Era
  questions: QuestionData[]
  translations?: { el: { title: string; description: string } }
}

const quizzes: QuizData[] = [
  // ============================================================
  // 1. ANCIENT_WORLD
  // ============================================================
  {
    title: "The Ancient World",
    description:
      "Journey through the earliest civilizations — from Mesopotamia and Egypt to Greece and Rome.",
    era: Era.ANCIENT_WORLD,
    translations: {
      el: {
        title: "Ο Αρχαίος Κόσμος",
        description:
          "Ταξίδεψε στους πρώτους πολιτισμούς — από τη Μεσοποταμία και την Αίγυπτο ως την Ελλάδα και τη Ρώμη.",
      },
    },
    questions: [
      {
        text: "What river valley is widely considered the cradle of Mesopotamian civilization?",
        explanation:
          "The Tigris and Euphrates rivers formed the fertile crescent of Mesopotamia, where Sumer, Akkad, and Babylon flourished.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Ποια κοιλάδα ποταμού θεωρείται ευρέως η κοιτίδα του μεσοποταμιακού πολιτισμού;",
            explanation:
              "Οι ποταμοί Τίγρης και Ευφράτης σχημάτισαν την εύφορη ημισέληνο της Μεσοποταμίας, όπου άκμασαν η Σουμερία, η Ακκαδία και η Βαβυλωνία.",
          },
        },
        options: [
          {
            text: "Nile River Valley",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Κοιλάδα του Νείλου" } },
          },
          {
            text: "Tigris-Euphrates River Valley",
            isCorrect: true,
            orderIndex: 1,
            translations: {
              el: { text: "Κοιλάδα Τίγρη-Ευφράτη" },
            },
          },
          {
            text: "Indus River Valley",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Κοιλάδα του Ινδού" } },
          },
          {
            text: "Yellow River Valley",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Κοιλάδα του Κίτρινου Ποταμού" } },
          },
        ],
      },
      {
        text: "Which ancient Greek city-state is known for its militaristic society and the Battle of Thermopylae?",
        explanation:
          "Sparta was renowned for its warrior culture. In 480 BCE, King Leonidas I led 300 Spartans in a famous last stand against the Persian army at Thermopylae.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Ποια αρχαία ελληνική πόλη-κράτος είναι γνωστή για τη στρατιωτική κοινωνία της και τη Μάχη των Θερμοπυλών;",
            explanation:
              "Η Σπάρτη ήταν φημισμένη για τον πολεμικό πολιτισμό της. Το 480 π.Χ., ο βασιλιάς Λεωνίδας Α΄ οδήγησε 300 Σπαρτιάτες σε μια θρυλική τελευταία αντίσταση εναντίον του περσικού στρατού στις Θερμοπύλες.",
          },
        },
        options: [
          {
            text: "Athens",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Αθήνα" } },
          },
          {
            text: "Corinth",
            isCorrect: false,
            orderIndex: 1,
            translations: { el: { text: "Κόρινθος" } },
          },
          {
            text: "Sparta",
            isCorrect: true,
            orderIndex: 2,
            translations: { el: { text: "Σπάρτη" } },
          },
          {
            text: "Thebes",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Θήβα" } },
          },
        ],
      },
      {
        text: "Which of the following were among the Seven Wonders of the Ancient World?",
        explanation:
          "The Great Pyramid of Giza, the Lighthouse of Alexandria, and the Colossus of Rhodes were all part of the classical Seven Wonders. The Parthenon, though remarkable, was not on the list.",
        difficulty: Difficulty.HARD,
        orderIndex: 2,
        multipleCorrect: true,
        translations: {
          el: {
            text: "Ποια από τα παρακάτω συγκαταλέγονταν στα Επτά Θαύματα του Αρχαίου Κόσμου;",
            explanation:
              "Η Μεγάλη Πυραμίδα της Γκίζας, ο Φάρος της Αλεξάνδρειας και ο Κολοσσός της Ρόδου ανήκαν στα κλασικά Επτά Θαύματα. Ο Παρθενώνας, αν και αξιοσημείωτος, δεν περιλαμβανόταν στον κατάλογο.",
          },
        },
        options: [
          {
            text: "Great Pyramid of Giza",
            isCorrect: true,
            orderIndex: 0,
            translations: { el: { text: "Μεγάλη Πυραμίδα της Γκίζας" } },
          },
          {
            text: "The Parthenon",
            isCorrect: false,
            orderIndex: 1,
            translations: { el: { text: "Ο Παρθενώνας" } },
          },
          {
            text: "Lighthouse of Alexandria",
            isCorrect: true,
            orderIndex: 2,
            translations: { el: { text: "Φάρος της Αλεξάνδρειας" } },
          },
          {
            text: "Colossus of Rhodes",
            isCorrect: true,
            orderIndex: 3,
            translations: { el: { text: "Κολοσσός της Ρόδου" } },
          },
        ],
      },
      {
        text: "The Rosetta Stone, discovered in 1799, contains inscriptions in which three scripts?",
        explanation:
          "The Rosetta Stone bears the same decree in Egyptian hieroglyphics, Demotic script, and Ancient Greek, enabling scholars like Jean-Fran\u00e7ois Champollion to decipher hieroglyphics.",
        difficulty: Difficulty.EXPERT,
        orderIndex: 3,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Η Στήλη της Ροζέτας, που ανακαλύφθηκε το 1799, περιέχει επιγραφές σε ποιες τρεις γραφές;",
            explanation:
              "Η Στήλη της Ροζέτας φέρει το ίδιο διάταγμα σε αιγυπτιακά ιερογλυφικά, δημοτική γραφή και αρχαία ελληνικά, επιτρέποντας σε μελετητές όπως ο Ζαν-Φρανσουά Σαμπολιόν να αποκρυπτογραφήσουν τα ιερογλυφικά.",
          },
        },
        options: [
          {
            text: "Hieroglyphic, Demotic, and Ancient Greek",
            isCorrect: true,
            orderIndex: 0,
            translations: {
              el: { text: "Ιερογλυφικά, Δημοτική γραφή και Αρχαία Ελληνικά" },
            },
          },
          {
            text: "Hieroglyphic, Coptic, and Latin",
            isCorrect: false,
            orderIndex: 1,
            translations: {
              el: { text: "Ιερογλυφικά, Κοπτικά και Λατινικά" },
            },
          },
          {
            text: "Cuneiform, Demotic, and Ancient Greek",
            isCorrect: false,
            orderIndex: 2,
            translations: {
              el: {
                text: "Σφηνοειδής γραφή, Δημοτική γραφή και Αρχαία Ελληνικά",
              },
            },
          },
          {
            text: "Hieroglyphic, Aramaic, and Ancient Greek",
            isCorrect: false,
            orderIndex: 3,
            translations: {
              el: { text: "Ιερογλυφικά, Αραμαϊκά και Αρχαία Ελληνικά" },
            },
          },
        ],
      },
    ],
  },

  // ============================================================
  // 2. MEDIEVAL
  // ============================================================
  {
    title: "The Medieval Era",
    description:
      "Explore the Middle Ages — feudal lords, crusades, plagues, and the foundations of modern Europe.",
    era: Era.MEDIEVAL,
    translations: {
      el: {
        title: "Ο Μεσαίωνας",
        description:
          "Εξερεύνησε τον Μεσαίωνα — φεουδάρχες, σταυροφορίες, πανούκλα και τα θεμέλια της σύγχρονης Ευρώπης.",
      },
    },
    questions: [
      {
        text: "What system of land ownership and loyalty defined much of medieval European society?",
        explanation:
          "Feudalism was a hierarchical system where lords granted land (fiefs) to vassals in exchange for military service and loyalty.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Ποιο σύστημα γαιοκτησίας και πίστης καθόρισε μεγάλο μέρος της μεσαιωνικής ευρωπαϊκής κοινωνίας;",
            explanation:
              "Η φεουδαρχία ήταν ένα ιεραρχικό σύστημα όπου οι φεουδάρχες παραχωρούσαν γη (φέουδα) σε υποτελείς με αντάλλαγμα στρατιωτική υπηρεσία και πίστη.",
          },
        },
        options: [
          {
            text: "Democracy",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Δημοκρατία" } },
          },
          {
            text: "Feudalism",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Φεουδαρχία" } },
          },
          {
            text: "Mercantilism",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Εμποροκρατία" } },
          },
          {
            text: "Communism",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Κομμουνισμός" } },
          },
        ],
      },
      {
        text: "The Magna Carta, signed in 1215, primarily limited the power of which English king?",
        explanation:
          "King John of England was forced by rebellious barons to sign the Magna Carta at Runnymede, establishing that the monarch was subject to law.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Η Μάγκνα Κάρτα, που υπογράφηκε το 1215, περιόρισε κυρίως την εξουσία ποιου Άγγλου βασιλιά;",
            explanation:
              "Ο βασιλιάς Ιωάννης της Αγγλίας αναγκάστηκε από επαναστατημένους βαρόνους να υπογράψει τη Μάγκνα Κάρτα στο Ράνιμιντ, καθιερώνοντας ότι ο μονάρχης υπόκειται στον νόμο.",
          },
        },
        options: [
          {
            text: "Henry II",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Ερρίκος Β΄" } },
          },
          {
            text: "Richard I",
            isCorrect: false,
            orderIndex: 1,
            translations: { el: { text: "Ριχάρδος Α΄" } },
          },
          {
            text: "King John",
            isCorrect: true,
            orderIndex: 2,
            translations: { el: { text: "Βασιλιάς Ιωάννης" } },
          },
          {
            text: "Edward I",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Εδουάρδος Α΄" } },
          },
        ],
      },
      {
        text: "Which of the following were direct consequences of the Black Death in Europe?",
        explanation:
          "The Black Death (1347-1351) killed roughly one-third of Europe's population, leading to severe labor shortages, the collapse of the feudal serf system, and widespread persecution of Jewish communities who were falsely blamed.",
        difficulty: Difficulty.HARD,
        orderIndex: 2,
        multipleCorrect: true,
        translations: {
          el: {
            text: "Ποιες από τις παρακάτω ήταν άμεσες συνέπειες του Μαύρου Θανάτου στην Ευρώπη;",
            explanation:
              "Ο Μαύρος Θάνατος (1347-1351) σκότωσε περίπου το ένα τρίτο του πληθυσμού της Ευρώπης, οδηγώντας σε σοβαρή έλλειψη εργατικού δυναμικού, κατάρρευση του φεουδαρχικού συστήματος δουλοπαροικίας και εκτεταμένο διωγμό εβραϊκών κοινοτήτων που κατηγορήθηκαν ψευδώς.",
          },
        },
        options: [
          {
            text: "Severe labor shortages",
            isCorrect: true,
            orderIndex: 0,
            translations: {
              el: { text: "Σοβαρή έλλειψη εργατικού δυναμικού" },
            },
          },
          {
            text: "Decline of the feudal serf system",
            isCorrect: true,
            orderIndex: 1,
            translations: {
              el: {
                text: "Παρακμή του φεουδαρχικού συστήματος δουλοπαροικίας",
              },
            },
          },
          {
            text: "The start of the Hundred Years' War",
            isCorrect: false,
            orderIndex: 2,
            translations: {
              el: { text: "Η έναρξη του Εκατονταετούς Πολέμου" },
            },
          },
          {
            text: "Persecution of Jewish communities",
            isCorrect: true,
            orderIndex: 3,
            translations: { el: { text: "Διωγμός εβραϊκών κοινοτήτων" } },
          },
        ],
      },
      {
        text: "The Fourth Crusade (1202-1204) controversially ended with the sacking of which Christian city?",
        explanation:
          "Instead of reaching the Holy Land, the Fourth Crusade was diverted and culminated in the siege and sack of Constantinople, the capital of the Byzantine Empire, in 1204.",
        difficulty: Difficulty.EXPERT,
        orderIndex: 3,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Η Τέταρτη Σταυροφορία (1202-1204) ολοκληρώθηκε αμφιλεγόμενα με τη λεηλασία ποιας χριστιανικής πόλης;",
            explanation:
              "Αντί να φτάσει στους Αγίους Τόπους, η Τέταρτη Σταυροφορία εκτράπηκε και κατέληξε στην πολιορκία και λεηλασία της Κωνσταντινούπολης, πρωτεύουσας της Βυζαντινής Αυτοκρατορίας, το 1204.",
          },
        },
        options: [
          {
            text: "Rome",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Ρώμη" } },
          },
          {
            text: "Constantinople",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Κωνσταντινούπολη" } },
          },
          {
            text: "Antioch",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Αντιόχεια" } },
          },
          {
            text: "Alexandria",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Αλεξάνδρεια" } },
          },
        ],
      },
    ],
  },

  // ============================================================
  // 3. RENAISSANCE
  // ============================================================
  {
    title: "The Renaissance",
    description:
      "Discover the rebirth of art, science, and culture that transformed Europe from the 14th to the 17th century.",
    era: Era.RENAISSANCE,
    translations: {
      el: {
        title: "Η Αναγέννηση",
        description:
          "Ανακάλυψε την αναγέννηση της τέχνης, της επιστήμης και του πολιτισμού που μεταμόρφωσε την Ευρώπη από τον 14ο ως τον 17ο αιώνα.",
      },
    },
    questions: [
      {
        text: "Which Italian city is widely considered the birthplace of the Renaissance?",
        explanation:
          "Florence, under the patronage of the Medici family, became the epicenter of the Renaissance, nurturing artists like Leonardo da Vinci and Michelangelo.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Ποια ιταλική πόλη θεωρείται ευρέως η γενέτειρα της Αναγέννησης;",
            explanation:
              "Η Φλωρεντία, υπό την προστασία της οικογένειας των Μεδίκων, έγινε το επίκεντρο της Αναγέννησης, γαλουχώντας καλλιτέχνες όπως ο Λεονάρντο ντα Βίντσι και ο Μιχαήλ Άγγελος.",
          },
        },
        options: [
          {
            text: "Venice",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Βενετία" } },
          },
          {
            text: "Rome",
            isCorrect: false,
            orderIndex: 1,
            translations: { el: { text: "Ρώμη" } },
          },
          {
            text: "Florence",
            isCorrect: true,
            orderIndex: 2,
            translations: { el: { text: "Φλωρεντία" } },
          },
          {
            text: "Milan",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Μιλάνο" } },
          },
        ],
      },
      {
        text: "Who painted the ceiling of the Sistine Chapel?",
        explanation:
          "Michelangelo painted the Sistine Chapel ceiling between 1508 and 1512, commissioned by Pope Julius II. The work includes the iconic scene of the Creation of Adam.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Ποιος ζωγράφισε την οροφή της Καπέλα Σιστίνα;",
            explanation:
              "Ο Μιχαήλ Άγγελος ζωγράφισε την οροφή της Καπέλα Σιστίνα μεταξύ 1508 και 1512, κατόπιν παραγγελίας του Πάπα Ιουλίου Β΄. Το έργο περιλαμβάνει την εμβληματική σκηνή της Δημιουργίας του Αδάμ.",
          },
        },
        options: [
          {
            text: "Leonardo da Vinci",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Λεονάρντο ντα Βίντσι" } },
          },
          {
            text: "Raphael",
            isCorrect: false,
            orderIndex: 1,
            translations: { el: { text: "Ραφαήλ" } },
          },
          {
            text: "Michelangelo",
            isCorrect: true,
            orderIndex: 2,
            translations: { el: { text: "Μιχαήλ Άγγελος" } },
          },
          {
            text: "Botticelli",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Μποτιτσέλι" } },
          },
        ],
      },
      {
        text: "Which of the following innovations are attributed to the Renaissance period?",
        explanation:
          "Gutenberg's printing press (c. 1440), linear perspective in painting (developed by Brunelleschi), and double-entry bookkeeping (formalized by Luca Pacioli) all emerged during the Renaissance. The steam engine was an 18th-century invention.",
        difficulty: Difficulty.HARD,
        orderIndex: 2,
        multipleCorrect: true,
        translations: {
          el: {
            text: "Ποιες από τις παρακάτω καινοτομίες αποδίδονται στην περίοδο της Αναγέννησης;",
            explanation:
              "Η τυπογραφική πρέσα του Γουτεμβέργιου (περ. 1440), η γραμμική προοπτική στη ζωγραφική (αναπτυγμένη από τον Μπρουνελέσκι) και η διπλογραφική λογιστική (κωδικοποιημένη από τον Λούκα Πατσιόλι) εμφανίστηκαν κατά την Αναγέννηση. Η ατμομηχανή ήταν εφεύρεση του 18ου αιώνα.",
          },
        },
        options: [
          {
            text: "Gutenberg's printing press",
            isCorrect: true,
            orderIndex: 0,
            translations: {
              el: { text: "Η τυπογραφική πρέσα του Γουτεμβέργιου" },
            },
          },
          {
            text: "Linear perspective in painting",
            isCorrect: true,
            orderIndex: 1,
            translations: {
              el: { text: "Η γραμμική προοπτική στη ζωγραφική" },
            },
          },
          {
            text: "The steam engine",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Η ατμομηχανή" } },
          },
          {
            text: "Double-entry bookkeeping",
            isCorrect: true,
            orderIndex: 3,
            translations: { el: { text: "Η διπλογραφική λογιστική" } },
          },
        ],
      },
      {
        text: "Niccol\u00f2 Machiavelli's 'The Prince' was dedicated to which member of the Medici family?",
        explanation:
          "Machiavelli dedicated 'The Prince' (1513) to Lorenzo de' Medici, Duke of Urbino (grandson of Lorenzo the Magnificent), hoping to regain political favor after being exiled.",
        difficulty: Difficulty.EXPERT,
        orderIndex: 3,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Το έργο «Ο Ηγεμόνας» του Νικολό Μακιαβέλι ήταν αφιερωμένο σε ποιο μέλος της οικογένειας Μεδίκων;",
            explanation:
              "Ο Μακιαβέλι αφιέρωσε τον «Ηγεμόνα» (1513) στον Λορέντσο των Μεδίκων, Δούκα του Ουρμπίνο (εγγονό του Λορέντσου του Μεγαλοπρεπούς), ελπίζοντας να ανακτήσει πολιτική εύνοια μετά την εξορία του.",
          },
        },
        options: [
          {
            text: "Cosimo de' Medici",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Κόζιμο των Μεδίκων" } },
          },
          {
            text: "Lorenzo the Magnificent",
            isCorrect: false,
            orderIndex: 1,
            translations: {
              el: { text: "Λορέντσος ο Μεγαλοπρεπής" },
            },
          },
          {
            text: "Lorenzo de' Medici, Duke of Urbino",
            isCorrect: true,
            orderIndex: 2,
            translations: {
              el: { text: "Λορέντσο των Μεδίκων, Δούκας του Ουρμπίνο" },
            },
          },
          {
            text: "Giovanni de' Medici (Pope Leo X)",
            isCorrect: false,
            orderIndex: 3,
            translations: {
              el: { text: "Τζοβάνι των Μεδίκων (Πάπας Λέων Ι΄)" },
            },
          },
        ],
      },
    ],
  },

  // ============================================================
  // 4. AGE_OF_EXPLORATION
  // ============================================================
  {
    title: "The Age of Exploration",
    description:
      "Chart the voyages that connected continents — from Columbus and Magellan to the colonization of the Americas.",
    era: Era.AGE_OF_EXPLORATION,
    translations: {
      el: {
        title: "Η Εποχή των Εξερευνήσεων",
        description:
          "Χαρτογράφησε τα ταξίδια που ένωσαν τις ηπείρους — από τον Κολόμβο και τον Μαγγελάνο ως τον αποικισμό της Αμερικής.",
      },
    },
    questions: [
      {
        text: "In 1492, Christopher Columbus sailed across the Atlantic under the flag of which country?",
        explanation:
          "Columbus's expedition was sponsored by King Ferdinand II and Queen Isabella I of Spain. He landed in the Bahamas, believing he had reached Asia.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Το 1492, ο Χριστόφορος Κολόμβος διέσχισε τον Ατλαντικό υπό τη σημαία ποιας χώρας;",
            explanation:
              "Η εξερευνητική αποστολή του Κολόμβου χρηματοδοτήθηκε από τον βασιλιά Φερδινάνδο Β΄ και τη βασίλισσα Ισαβέλλα Α΄ της Ισπανίας. Αποβιβάστηκε στις Μπαχάμες, πιστεύοντας ότι είχε φτάσει στην Ασία.",
          },
        },
        options: [
          {
            text: "Portugal",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Πορτογαλία" } },
          },
          {
            text: "Spain",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Ισπανία" } },
          },
          {
            text: "England",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Αγγλία" } },
          },
          {
            text: "Italy",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Ιταλία" } },
          },
        ],
      },
      {
        text: "Which Portuguese explorer led the first expedition to sail around the southern tip of Africa?",
        explanation:
          "Bartolomeu Dias rounded the Cape of Good Hope in 1488, proving a sea route to the Indian Ocean was possible. Vasco da Gama later completed the voyage to India in 1498.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Ποιος Πορτογάλος εξερευνητής ηγήθηκε της πρώτης αποστολής που έπλευσε γύρω από το νότιο άκρο της Αφρικής;",
            explanation:
              "Ο Βαρθολομαίος Ντίας διέπλευσε το Ακρωτήριο της Καλής Ελπίδας το 1488, αποδεικνύοντας ότι ήταν εφικτή μια θαλάσσια διαδρομή προς τον Ινδικό Ωκεανό. Ο Βάσκο ντα Γκάμα ολοκλήρωσε αργότερα το ταξίδι προς την Ινδία το 1498.",
          },
        },
        options: [
          {
            text: "Vasco da Gama",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Βάσκο ντα Γκάμα" } },
          },
          {
            text: "Bartolomeu Dias",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Βαρθολομαίος Ντίας" } },
          },
          {
            text: "Ferdinand Magellan",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Φερδινάνδος Μαγγελάνος" } },
          },
          {
            text: "Prince Henry",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Πρίγκιπας Ερρίκος" } },
          },
        ],
      },
      {
        text: "Which of the following were provisions of the Treaty of Tordesillas (1494)?",
        explanation:
          "The Treaty of Tordesillas divided newly discovered lands between Spain and Portugal along a meridian roughly 370 leagues west of the Cape Verde islands. It was sanctioned by Pope Alexander VI and gave Portugal claim to Brazil.",
        difficulty: Difficulty.HARD,
        orderIndex: 2,
        multipleCorrect: true,
        translations: {
          el: {
            text: "Ποιες από τις παρακάτω ήταν διατάξεις της Συνθήκης της Τορδεσίγιας (1494);",
            explanation:
              "Η Συνθήκη της Τορδεσίγιας διαίρεσε τα νεοανακαλυφθέντα εδάφη μεταξύ Ισπανίας και Πορτογαλίας κατά μήκος ενός μεσημβρινού περίπου 370 λεύγες δυτικά των νήσων Πράσινου Ακρωτηρίου. Επικυρώθηκε από τον Πάπα Αλέξανδρο ΣΤ΄ και έδωσε στην Πορτογαλία δικαίωμα επί της Βραζιλίας.",
          },
        },
        options: [
          {
            text: "Division of new lands between Spain and Portugal",
            isCorrect: true,
            orderIndex: 0,
            translations: {
              el: {
                text: "Διαίρεση νέων εδαφών μεταξύ Ισπανίας και Πορτογαλίας",
              },
            },
          },
          {
            text: "A demarcation line west of the Cape Verde islands",
            isCorrect: true,
            orderIndex: 1,
            translations: {
              el: {
                text: "Γραμμή οριοθέτησης δυτικά των νήσων Πράσινου Ακρωτηρίου",
              },
            },
          },
          {
            text: "England received rights to North America",
            isCorrect: false,
            orderIndex: 2,
            translations: {
              el: {
                text: "Η Αγγλία έλαβε δικαιώματα επί της Βόρειας Αμερικής",
              },
            },
          },
          {
            text: "Portugal's eventual claim to Brazil",
            isCorrect: true,
            orderIndex: 3,
            translations: {
              el: {
                text: "Η μετέπειτα διεκδίκηση της Βραζιλίας από την Πορτογαλία",
              },
            },
          },
        ],
      },
      {
        text: "Ferdinand Magellan was killed during his circumnavigation voyage in 1521 on which island?",
        explanation:
          "Magellan was killed on April 27, 1521 during the Battle of Mactan in the Philippines, fighting forces led by the chieftain Lapu-Lapu. Juan Sebasti\u00e1n Elcano completed the voyage.",
        difficulty: Difficulty.EXPERT,
        orderIndex: 3,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Ο Φερδινάνδος Μαγγελάνος σκοτώθηκε κατά τη διάρκεια του ταξιδιού περίπλου του το 1521 σε ποιο νησί;",
            explanation:
              "Ο Μαγγελάνος σκοτώθηκε στις 27 Απριλίου 1521 κατά τη Μάχη του Μακτάν στις Φιλιππίνες, πολεμώντας δυνάμεις υπό τον αρχηγό Λαπού-Λαπού. Ο Χουάν Σεμπαστιάν Ελκάνο ολοκλήρωσε το ταξίδι.",
          },
        },
        options: [
          {
            text: "Guam",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Γκουάμ" } },
          },
          {
            text: "Mactan",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Μακτάν" } },
          },
          {
            text: "Cebu",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Σεμπού" } },
          },
          {
            text: "Borneo",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Βόρνεο" } },
          },
        ],
      },
    ],
  },

  // ============================================================
  // 5. INDUSTRIAL_REVOLUTION
  // ============================================================
  {
    title: "The Industrial Revolution",
    description:
      "Witness the transformation of society through mechanization, factories, and innovation from the 18th to the 19th century.",
    era: Era.INDUSTRIAL_REVOLUTION,
    translations: {
      el: {
        title: "Η Βιομηχανική Επανάσταση",
        description:
          "Γίνε μάρτυρας του μετασχηματισμού της κοινωνίας μέσω της μηχανοποίησης, των εργοστασίων και της καινοτομίας από τον 18ο ως τον 19ο αιώνα.",
      },
    },
    questions: [
      {
        text: "In which country did the Industrial Revolution begin?",
        explanation:
          "The Industrial Revolution began in Great Britain in the mid-18th century, driven by innovations in textile manufacturing, steam power, and iron production.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Σε ποια χώρα ξεκίνησε η Βιομηχανική Επανάσταση;",
            explanation:
              "Η Βιομηχανική Επανάσταση ξεκίνησε στη Μεγάλη Βρετανία στα μέσα του 18ου αιώνα, με κινητήρια δύναμη τις καινοτομίες στην κλωστοϋφαντουργία, την ατμοκίνηση και τη σιδηροπαραγωγή.",
          },
        },
        options: [
          {
            text: "France",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Γαλλία" } },
          },
          {
            text: "Germany",
            isCorrect: false,
            orderIndex: 1,
            translations: { el: { text: "Γερμανία" } },
          },
          {
            text: "Great Britain",
            isCorrect: true,
            orderIndex: 2,
            translations: { el: { text: "Μεγάλη Βρετανία" } },
          },
          {
            text: "United States",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Ηνωμένες Πολιτείες" } },
          },
        ],
      },
      {
        text: "Who is credited with significantly improving the steam engine in the 1760s-1770s?",
        explanation:
          "James Watt made critical improvements to the Newcomen steam engine, including a separate condenser that dramatically increased efficiency. His work powered the Industrial Revolution.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Σε ποιον αποδίδεται η σημαντική βελτίωση της ατμομηχανής τις δεκαετίες 1760-1770;",
            explanation:
              "Ο Τζέιμς Γουάτ πραγματοποίησε κρίσιμες βελτιώσεις στην ατμομηχανή του Νιούκομεν, συμπεριλαμβανομένου ενός ξεχωριστού συμπυκνωτή που αύξησε δραματικά την απόδοση. Το έργο του τροφοδότησε τη Βιομηχανική Επανάσταση.",
          },
        },
        options: [
          {
            text: "Thomas Newcomen",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Τόμας Νιούκομεν" } },
          },
          {
            text: "James Watt",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Τζέιμς Γουάτ" } },
          },
          {
            text: "George Stephenson",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Τζορτζ Στέφενσον" } },
          },
          {
            text: "Richard Arkwright",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Ρίτσαρντ Άρκραϊτ" } },
          },
        ],
      },
      {
        text: "Which of the following were key social consequences of the Industrial Revolution?",
        explanation:
          "The Industrial Revolution caused massive urbanization as workers moved to factory cities, gave rise to child labor in factories and mines, and spurred the growth of organized labor movements. The decline of the monarchy was not a direct consequence.",
        difficulty: Difficulty.HARD,
        orderIndex: 2,
        multipleCorrect: true,
        translations: {
          el: {
            text: "Ποιες από τις παρακάτω ήταν βασικές κοινωνικές συνέπειες της Βιομηχανικής Επανάστασης;",
            explanation:
              "Η Βιομηχανική Επανάσταση προκάλεσε μαζική αστικοποίηση καθώς οι εργάτες μετακινούνταν σε βιομηχανικές πόλεις, οδήγησε σε παιδική εργασία σε εργοστάσια και ορυχεία και ενίσχυσε την ανάπτυξη οργανωμένων εργατικών κινημάτων. Η παρακμή της μοναρχίας δεν ήταν άμεση συνέπεια.",
          },
        },
        options: [
          {
            text: "Rapid urbanization",
            isCorrect: true,
            orderIndex: 0,
            translations: { el: { text: "Ραγδαία αστικοποίηση" } },
          },
          {
            text: "Widespread child labor",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Εκτεταμένη παιδική εργασία" } },
          },
          {
            text: "Decline of European monarchies",
            isCorrect: false,
            orderIndex: 2,
            translations: {
              el: { text: "Παρακμή των ευρωπαϊκών μοναρχιών" },
            },
          },
          {
            text: "Growth of labor unions",
            isCorrect: true,
            orderIndex: 3,
            translations: {
              el: { text: "Ανάπτυξη εργατικών συνδικάτων" },
            },
          },
        ],
      },
      {
        text: "The Luddite movement of 1811-1816 in England was primarily directed against what?",
        explanation:
          "The Luddites were textile workers who destroyed labor-saving machinery, particularly stocking frames and power looms, fearing that mechanized manufacturing threatened their livelihoods and craft skills.",
        difficulty: Difficulty.EXPERT,
        orderIndex: 3,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Το κίνημα των Λουδιτών (1811-1816) στην Αγγλία στρεφόταν κυρίως εναντίον τίνος;",
            explanation:
              "Οι Λουδίτες ήταν εργάτες κλωστοϋφαντουργίας που κατέστρεφαν μηχανήματα εξοικονόμησης εργασίας, ιδιαίτερα αργαλειούς και μηχανοκίνητους υφαντικούς αργαλειούς, φοβούμενοι ότι η μηχανοποιημένη παραγωγή απειλούσε τα προς το ζην τους και τις τεχνικές τους δεξιότητες.",
          },
        },
        options: [
          {
            text: "High food prices caused by the Corn Laws",
            isCorrect: false,
            orderIndex: 0,
            translations: {
              el: {
                text: "Υψηλές τιμές τροφίμων λόγω των Νόμων περί Σιτηρών",
              },
            },
          },
          {
            text: "Labor-saving textile machinery",
            isCorrect: true,
            orderIndex: 1,
            translations: {
              el: {
                text: "Υφαντουργικά μηχανήματα εξοικονόμησης εργασίας",
              },
            },
          },
          {
            text: "Railway construction through farmland",
            isCorrect: false,
            orderIndex: 2,
            translations: {
              el: {
                text: "Κατασκευή σιδηροδρόμων μέσα από αγροτική γη",
              },
            },
          },
          {
            text: "The expansion of coal mining",
            isCorrect: false,
            orderIndex: 3,
            translations: {
              el: { text: "Η επέκταση της εξόρυξης άνθρακα" },
            },
          },
        ],
      },
    ],
  },

  // ============================================================
  // 6. WORLD_WAR_1
  // ============================================================
  {
    title: "World War I",
    description:
      "Examine the Great War — the alliances, trenches, and events that reshaped the world from 1914 to 1918.",
    era: Era.WORLD_WAR_1,
    translations: {
      el: {
        title: "Α΄ Παγκόσμιος Πόλεμος",
        description:
          "Εξέτασε τον Μεγάλο Πόλεμο — τις συμμαχίες, τα χαρακώματα και τα γεγονότα που αναδιαμόρφωσαν τον κόσμο από το 1914 ως το 1918.",
      },
    },
    questions: [
      {
        text: "The assassination of which figure in 1914 is widely considered the immediate trigger for World War I?",
        explanation:
          "Archduke Franz Ferdinand of Austria-Hungary was assassinated in Sarajevo on June 28, 1914 by Gavrilo Princip, setting off a chain of alliance activations that led to war.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Η δολοφονία ποιου προσώπου το 1914 θεωρείται ευρέως η άμεση αφορμή του Α΄ Παγκοσμίου Πολέμου;",
            explanation:
              "Ο Αρχιδούκας Φραγκίσκος Φερδινάνδος της Αυστροουγγαρίας δολοφονήθηκε στο Σαράγεβο στις 28 Ιουνίου 1914 από τον Γκαβρίλο Πρίντσιπ, πυροδοτώντας μια αλυσίδα ενεργοποιήσεων συμμαχιών που οδήγησε στον πόλεμο.",
          },
        },
        options: [
          {
            text: "Kaiser Wilhelm II",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Κάιζερ Γουίλχελμ Β΄" } },
          },
          {
            text: "Archduke Franz Ferdinand",
            isCorrect: true,
            orderIndex: 1,
            translations: {
              el: { text: "Αρχιδούκας Φραγκίσκος Φερδινάνδος" },
            },
          },
          {
            text: "Tsar Nicholas II",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Τσάρος Νικόλαος Β΄" } },
          },
          {
            text: "King George V",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Βασιλιάς Γεώργιος Ε΄" } },
          },
        ],
      },
      {
        text: "Which battle in 1916 is considered one of the bloodiest in history, lasting nearly five months on the Western Front?",
        explanation:
          "The Battle of the Somme (July-November 1916) resulted in over one million casualties. On the first day alone, the British suffered approximately 57,000 casualties.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Ποια μάχη του 1916 θεωρείται μία από τις πιο αιματηρές στην ιστορία, διαρκώντας σχεδόν πέντε μήνες στο Δυτικό Μέτωπο;",
            explanation:
              "Η Μάχη του Σομ (Ιούλιος-Νοέμβριος 1916) είχε ως αποτέλεσμα πάνω από ένα εκατομμύριο απώλειες. Μόνο την πρώτη ημέρα, οι Βρετανοί υπέστησαν περίπου 57.000 απώλειες.",
          },
        },
        options: [
          {
            text: "Battle of Verdun",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Μάχη του Βερντέν" } },
          },
          {
            text: "Battle of the Somme",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Μάχη του Σομ" } },
          },
          {
            text: "Battle of Gallipoli",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Μάχη της Καλλίπολης" } },
          },
          {
            text: "Battle of Passchendaele",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Μάχη του Πασενντάελ" } },
          },
        ],
      },
      {
        text: "Which of the following were terms of the Treaty of Versailles (1919)?",
        explanation:
          "The Treaty of Versailles required Germany to accept the war guilt clause (Article 231), pay substantial reparations, and drastically reduce its military. The League of Nations was established by the treaty, but not as a requirement placed on Germany specifically.",
        difficulty: Difficulty.HARD,
        orderIndex: 2,
        multipleCorrect: true,
        translations: {
          el: {
            text: "Ποιοι από τους παρακάτω ήταν όροι της Συνθήκης των Βερσαλλιών (1919);",
            explanation:
              "Η Συνθήκη των Βερσαλλιών απαιτούσε από τη Γερμανία να αποδεχθεί τη ρήτρα πολεμικής ενοχής (Άρθρο 231), να καταβάλει σημαντικές αποζημιώσεις και να μειώσει δραστικά τον στρατό της. Η Κοινωνία των Εθνών ιδρύθηκε με τη συνθήκη, αλλά όχι ως απαίτηση ειδικά προς τη Γερμανία.",
          },
        },
        options: [
          {
            text: "Germany accepted sole war guilt (Article 231)",
            isCorrect: true,
            orderIndex: 0,
            translations: {
              el: {
                text: "Η Γερμανία αποδέχθηκε την αποκλειστική πολεμική ενοχή (Άρθρο 231)",
              },
            },
          },
          {
            text: "Germany paid reparations",
            isCorrect: true,
            orderIndex: 1,
            translations: {
              el: { text: "Η Γερμανία κατέβαλε πολεμικές αποζημιώσεις" },
            },
          },
          {
            text: "Germany was divided into occupation zones",
            isCorrect: false,
            orderIndex: 2,
            translations: {
              el: {
                text: "Η Γερμανία χωρίστηκε σε ζώνες κατοχής",
              },
            },
          },
          {
            text: "Germany's military was severely restricted",
            isCorrect: true,
            orderIndex: 3,
            translations: {
              el: {
                text: "Ο στρατός της Γερμανίας περιορίστηκε αυστηρά",
              },
            },
          },
        ],
      },
      {
        text: "The Sykes-Picot Agreement of 1916 secretly divided the post-war Ottoman territories between which two powers?",
        explanation:
          "The Sykes-Picot Agreement was a secret 1916 treaty between Britain and France (with Russian assent) that defined their proposed spheres of influence in the Middle East after the fall of the Ottoman Empire.",
        difficulty: Difficulty.EXPERT,
        orderIndex: 3,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Η Συμφωνία Σάικς-Πικό του 1916 διαίρεσε μυστικά τα μεταπολεμικά οθωμανικά εδάφη μεταξύ ποιων δύο δυνάμεων;",
            explanation:
              "Η Συμφωνία Σάικς-Πικό ήταν μια μυστική συνθήκη του 1916 μεταξύ Βρετανίας και Γαλλίας (με τη συγκατάθεση της Ρωσίας) που καθόριζε τις προτεινόμενες σφαίρες επιρροής τους στη Μέση Ανατολή μετά την πτώση της Οθωμανικής Αυτοκρατορίας.",
          },
        },
        options: [
          {
            text: "Britain and Russia",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Βρετανία και Ρωσία" } },
          },
          {
            text: "Britain and France",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Βρετανία και Γαλλία" } },
          },
          {
            text: "France and Italy",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Γαλλία και Ιταλία" } },
          },
          {
            text: "Britain and Italy",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Βρετανία και Ιταλία" } },
          },
        ],
      },
    ],
  },

  // ============================================================
  // 7. WORLD_WAR_2
  // ============================================================
  {
    title: "World War II",
    description:
      "Study the largest conflict in human history — from the rise of fascism to the atomic age, 1939-1945.",
    era: Era.WORLD_WAR_2,
    translations: {
      el: {
        title: "Β΄ Παγκόσμιος Πόλεμος",
        description:
          "Μελέτησε τη μεγαλύτερη σύγκρουση στην ανθρώπινη ιστορία — από την άνοδο του φασισμού ως την ατομική εποχή, 1939-1945.",
      },
    },
    questions: [
      {
        text: "Germany's invasion of which country on September 1, 1939 triggered the start of World War II in Europe?",
        explanation:
          "Nazi Germany invaded Poland on September 1, 1939. Britain and France declared war on Germany two days later, beginning World War II in Europe.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Η εισβολή της Γερμανίας σε ποια χώρα την 1η Σεπτεμβρίου 1939 πυροδότησε την έναρξη του Β΄ Παγκοσμίου Πολέμου στην Ευρώπη;",
            explanation:
              "Η Ναζιστική Γερμανία εισέβαλε στην Πολωνία την 1η Σεπτεμβρίου 1939. Η Βρετανία και η Γαλλία κήρυξαν πόλεμο στη Γερμανία δύο ημέρες αργότερα, ξεκινώντας τον Β΄ Παγκόσμιο Πόλεμο στην Ευρώπη.",
          },
        },
        options: [
          {
            text: "Czechoslovakia",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Τσεχοσλοβακία" } },
          },
          {
            text: "Austria",
            isCorrect: false,
            orderIndex: 1,
            translations: { el: { text: "Αυστρία" } },
          },
          {
            text: "Poland",
            isCorrect: true,
            orderIndex: 2,
            translations: { el: { text: "Πολωνία" } },
          },
          {
            text: "France",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Γαλλία" } },
          },
        ],
      },
      {
        text: "What was the codename of the Allied invasion of Normandy on June 6, 1944?",
        explanation:
          "Operation Overlord was the codename for the Battle of Normandy, with D-Day (June 6, 1944) marking the largest seaborne invasion in history. Over 156,000 troops landed on five beaches.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Ποιο ήταν το κωδικό όνομα της συμμαχικής απόβασης στη Νορμανδία στις 6 Ιουνίου 1944;",
            explanation:
              "Η Επιχείρηση Overlord ήταν το κωδικό όνομα για τη Μάχη της Νορμανδίας, με την Ημέρα D (6 Ιουνίου 1944) να σημαδεύει τη μεγαλύτερη αμφίβια απόβαση στην ιστορία. Πάνω από 156.000 στρατιώτες αποβιβάστηκαν σε πέντε παραλίες.",
          },
        },
        options: [
          {
            text: "Operation Barbarossa",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Επιχείρηση Μπαρμπαρόσα" } },
          },
          {
            text: "Operation Overlord",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Επιχείρηση Overlord" } },
          },
          {
            text: "Operation Market Garden",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Επιχείρηση Market Garden" } },
          },
          {
            text: "Operation Torch",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Επιχείρηση Torch" } },
          },
        ],
      },
      {
        text: "Which of the following were major turning-point battles of World War II?",
        explanation:
          "The Battle of Stalingrad (1942-43) halted the German advance into the Soviet Union, the Battle of Midway (1942) shifted naval superiority in the Pacific to the Allies, and El Alamein (1942) marked the turning point in North Africa. The Battle of the Bulge (1944) was a late-war German offensive, not typically classified as a strategic turning point.",
        difficulty: Difficulty.HARD,
        orderIndex: 2,
        multipleCorrect: true,
        translations: {
          el: {
            text: "Ποιες από τις παρακάτω ήταν σημαντικές μάχες-σημεία καμπής του Β΄ Παγκοσμίου Πολέμου;",
            explanation:
              "Η Μάχη του Στάλινγκραντ (1942-43) ανέκοψε τη γερμανική προέλαση στη Σοβιετική Ένωση, η Μάχη του Μίντγουεϊ (1942) μετέφερε τη ναυτική υπεροχή στον Ειρηνικό στους Συμμάχους και η Μάχη του Ελ Αλαμέιν (1942) σημάδεψε το σημείο καμπής στη Βόρεια Αφρική. Η Μάχη των Αρδεννών (1944) ήταν μια γερμανική επίθεση προς το τέλος του πολέμου και δεν ταξινομείται τυπικά ως στρατηγικό σημείο καμπής.",
          },
        },
        options: [
          {
            text: "Battle of Stalingrad",
            isCorrect: true,
            orderIndex: 0,
            translations: { el: { text: "Μάχη του Στάλινγκραντ" } },
          },
          {
            text: "Battle of Midway",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Μάχη του Μίντγουεϊ" } },
          },
          {
            text: "Battle of the Bulge",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Μάχη των Αρδεννών" } },
          },
          {
            text: "Battle of El Alamein",
            isCorrect: true,
            orderIndex: 3,
            translations: { el: { text: "Μάχη του Ελ Αλαμέιν" } },
          },
        ],
      },
      {
        text: "What was the name of the secret Allied project to develop the atomic bomb?",
        explanation:
          "The Manhattan Project was a secret research program begun in 1942 under the direction of J. Robert Oppenheimer. It produced the first nuclear weapons, tested at Trinity in July 1945 and used against Hiroshima and Nagasaki in August 1945.",
        difficulty: Difficulty.EXPERT,
        orderIndex: 3,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Ποιο ήταν το όνομα του μυστικού συμμαχικού προγράμματος για την ανάπτυξη της ατομικής βόμβας;",
            explanation:
              "Το Σχέδιο Μανχάταν ήταν ένα μυστικό ερευνητικό πρόγραμμα που ξεκίνησε το 1942 υπό τη διεύθυνση του Τζ. Ρόμπερτ Οπενχάιμερ. Παρήγαγε τα πρώτα πυρηνικά όπλα, που δοκιμάστηκαν στο Trinity τον Ιούλιο του 1945 και χρησιμοποιήθηκαν εναντίον της Χιροσίμα και του Ναγκασάκι τον Αύγουστο του 1945.",
          },
        },
        options: [
          {
            text: "Operation Tube Alloys",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Επιχείρηση Tube Alloys" } },
          },
          {
            text: "The Manhattan Project",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Το Σχέδιο Μανχάταν" } },
          },
          {
            text: "Project Silverplate",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Σχέδιο Silverplate" } },
          },
          {
            text: "Operation Epsilon",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Επιχείρηση Έψιλον" } },
          },
        ],
      },
    ],
  },

  // ============================================================
  // 8. COLD_WAR
  // ============================================================
  {
    title: "The Cold War",
    description:
      "Navigate the decades-long standoff between the United States and the Soviet Union, from 1947 to 1991.",
    era: Era.COLD_WAR,
    translations: {
      el: {
        title: "Ο Ψυχρός Πόλεμος",
        description:
          "Πλοηγήσου στη δεκαετίες διαρκείας αντιπαράθεση μεταξύ ΗΠΑ και Σοβιετικής Ένωσης, από το 1947 ως το 1991.",
      },
    },
    questions: [
      {
        text: "What physical structure became the most iconic symbol of the Cold War divide in Europe?",
        explanation:
          "The Berlin Wall, built in 1961 by East Germany, physically divided Berlin and became the foremost symbol of the Iron Curtain separating East and West.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Ποια φυσική κατασκευή έγινε το πιο εμβληματικό σύμβολο του διχασμού του Ψυχρού Πολέμου στην Ευρώπη;",
            explanation:
              "Το Τείχος του Βερολίνου, που χτίστηκε το 1961 από την Ανατολική Γερμανία, διαίρεσε φυσικά το Βερολίνο και έγινε το κυρίαρχο σύμβολο του Σιδηρού Παραπετάσματος που χώριζε Ανατολή και Δύση.",
          },
        },
        options: [
          {
            text: "The Iron Curtain fence",
            isCorrect: false,
            orderIndex: 0,
            translations: {
              el: { text: "Ο φράκτης του Σιδηρού Παραπετάσματος" },
            },
          },
          {
            text: "The Berlin Wall",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Το Τείχος του Βερολίνου" } },
          },
          {
            text: "The Maginot Line",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Η Γραμμή Μαζινό" } },
          },
          {
            text: "Checkpoint Charlie",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Σημείο Ελέγχου Τσάρλι" } },
          },
        ],
      },
      {
        text: "The Cuban Missile Crisis of 1962 was resolved when the Soviet Union agreed to remove missiles from Cuba in exchange for what?",
        explanation:
          "The crisis was resolved when the USSR agreed to remove its missiles from Cuba, and the US pledged not to invade Cuba. Secretly, the US also agreed to remove Jupiter missiles from Turkey.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Η Κρίση των Πυραύλων της Κούβας το 1962 επιλύθηκε όταν η Σοβιετική Ένωση συμφώνησε να απομακρύνει πυραύλους από την Κούβα με αντάλλαγμα τι;",
            explanation:
              "Η κρίση επιλύθηκε όταν η ΕΣΣΔ συμφώνησε να απομακρύνει τους πυραύλους της από την Κούβα και οι ΗΠΑ δεσμεύτηκαν να μην εισβάλουν στην Κούβα. Μυστικά, οι ΗΠΑ συμφώνησαν επίσης να απομακρύνουν πυραύλους Jupiter από την Τουρκία.",
          },
        },
        options: [
          {
            text: "The US pledged not to invade Cuba",
            isCorrect: true,
            orderIndex: 0,
            translations: {
              el: {
                text: "Οι ΗΠΑ δεσμεύτηκαν να μην εισβάλουν στην Κούβα",
              },
            },
          },
          {
            text: "The US gave up West Berlin",
            isCorrect: false,
            orderIndex: 1,
            translations: {
              el: { text: "Οι ΗΠΑ παραχώρησαν το Δυτικό Βερολίνο" },
            },
          },
          {
            text: "The US ended the Korean War",
            isCorrect: false,
            orderIndex: 2,
            translations: {
              el: { text: "Οι ΗΠΑ τερμάτισαν τον Πόλεμο της Κορέας" },
            },
          },
          {
            text: "The US recognized Castro's government",
            isCorrect: false,
            orderIndex: 3,
            translations: {
              el: {
                text: "Οι ΗΠΑ αναγνώρισαν την κυβέρνηση του Κάστρο",
              },
            },
          },
        ],
      },
      {
        text: "Which of the following were proxy conflicts during the Cold War?",
        explanation:
          "The Korean War (1950-53), the Vietnam War (1955-75), and the Soviet-Afghan War (1979-89) were all proxy conflicts where the US and USSR supported opposing sides. The Falklands War (1982) was between Britain and Argentina without significant superpower proxy dynamics.",
        difficulty: Difficulty.HARD,
        orderIndex: 2,
        multipleCorrect: true,
        translations: {
          el: {
            text: "Ποιες από τις παρακάτω ήταν πόλεμοι δι' αντιπροσώπων κατά τη διάρκεια του Ψυχρού Πολέμου;",
            explanation:
              "Ο Πόλεμος της Κορέας (1950-53), ο Πόλεμος του Βιετνάμ (1955-75) και ο Σοβιετο-αφγανικός Πόλεμος (1979-89) ήταν όλοι πόλεμοι δι' αντιπροσώπων όπου ΗΠΑ και ΕΣΣΔ υποστήριζαν αντίπαλες πλευρές. Ο Πόλεμος των Φώκλαντ (1982) ήταν μεταξύ Βρετανίας και Αργεντινής χωρίς σημαντική δυναμική αντιπροσώπευσης υπερδυνάμεων.",
          },
        },
        options: [
          {
            text: "Korean War",
            isCorrect: true,
            orderIndex: 0,
            translations: { el: { text: "Πόλεμος της Κορέας" } },
          },
          {
            text: "Vietnam War",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Πόλεμος του Βιετνάμ" } },
          },
          {
            text: "Falklands War",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Πόλεμος των Φώκλαντ" } },
          },
          {
            text: "Soviet-Afghan War",
            isCorrect: true,
            orderIndex: 3,
            translations: { el: { text: "Σοβιετο-αφγανικός Πόλεμος" } },
          },
        ],
      },
      {
        text: "What was the name of the US policy doctrine announced in 1947 that pledged support for countries resisting communist expansion?",
        explanation:
          "The Truman Doctrine, announced by President Harry S. Truman on March 12, 1947, pledged American support for free peoples resisting subjugation. It was initially applied to aid Greece and Turkey.",
        difficulty: Difficulty.EXPERT,
        orderIndex: 3,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Ποιο ήταν το όνομα του αμερικανικού πολιτικού δόγματος που ανακοινώθηκε το 1947 και υποσχέθηκε υποστήριξη σε χώρες που αντιστέκονταν στην κομμουνιστική επέκταση;",
            explanation:
              "Το Δόγμα Τρούμαν, που ανακοινώθηκε από τον Πρόεδρο Χάρι Σ. Τρούμαν στις 12 Μαρτίου 1947, υποσχέθηκε αμερικανική υποστήριξη προς τους ελεύθερους λαούς που αντιστέκονταν στην υποδούλωση. Εφαρμόστηκε αρχικά για βοήθεια στην Ελλάδα και την Τουρκία.",
          },
        },
        options: [
          {
            text: "The Marshall Plan",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Το Σχέδιο Μάρσαλ" } },
          },
          {
            text: "The Truman Doctrine",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Το Δόγμα Τρούμαν" } },
          },
          {
            text: "The Eisenhower Doctrine",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Το Δόγμα Αϊζενχάουερ" } },
          },
          {
            text: "Containment Policy",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Πολιτική Ανάσχεσης" } },
          },
        ],
      },
    ],
  },

  // ============================================================
  // 9. MODERN_HISTORY
  // ============================================================
  {
    title: "Modern History",
    description:
      "Examine the events that shaped the late 20th and early 21st centuries, from the fall of the Berlin Wall to the digital age.",
    era: Era.MODERN_HISTORY,
    translations: {
      el: {
        title: "Σύγχρονη Ιστορία",
        description:
          "Εξέτασε τα γεγονότα που διαμόρφωσαν τα τέλη του 20ού και τις αρχές του 21ου αιώνα, από την πτώση του Τείχους του Βερολίνου ως την ψηφιακή εποχή.",
      },
    },
    questions: [
      {
        text: "In what year did the Berlin Wall fall, symbolizing the end of the Cold War era?",
        explanation:
          "The Berlin Wall fell on November 9, 1989, when the East German government opened the borders. Crowds of citizens dismantled the wall, paving the way for German reunification in 1990.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Ποιο έτος έπεσε το Τείχος του Βερολίνου, συμβολίζοντας το τέλος της εποχής του Ψυχρού Πολέμου;",
            explanation:
              "Το Τείχος του Βερολίνου έπεσε στις 9 Νοεμβρίου 1989, όταν η κυβέρνηση της Ανατολικής Γερμανίας άνοιξε τα σύνορα. Πλήθη πολιτών αποσυναρμολόγησαν το τείχος, ανοίγοντας τον δρόμο για τη γερμανική επανένωση το 1990.",
          },
        },
        options: [
          {
            text: "1987",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "1987" } },
          },
          {
            text: "1989",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "1989" } },
          },
          {
            text: "1991",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "1991" } },
          },
          {
            text: "1993",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "1993" } },
          },
        ],
      },
      {
        text: "Which international agreement, adopted in 1992, aimed to combat climate change by stabilizing greenhouse gas emissions?",
        explanation:
          "The United Nations Framework Convention on Climate Change (UNFCCC) was adopted at the Earth Summit in Rio de Janeiro in 1992. It laid the foundation for later agreements like the Kyoto Protocol and the Paris Agreement.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Ποια διεθνής συμφωνία, που υιοθετήθηκε το 1992, στόχευε στην καταπολέμηση της κλιματικής αλλαγής μέσω σταθεροποίησης των εκπομπών αερίων θερμοκηπίου;",
            explanation:
              "Η Σύμβαση-Πλαίσιο των Ηνωμένων Εθνών για την Κλιματική Αλλαγή (UNFCCC) υιοθετήθηκε στη Σύνοδο Κορυφής για τη Γη στο Ρίο ντε Τζανέιρο το 1992. Έθεσε τις βάσεις για μεταγενέστερες συμφωνίες όπως το Πρωτόκολλο του Κιότο και η Συμφωνία του Παρισιού.",
          },
        },
        options: [
          {
            text: "Kyoto Protocol",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Πρωτόκολλο του Κιότο" } },
          },
          {
            text: "Paris Agreement",
            isCorrect: false,
            orderIndex: 1,
            translations: { el: { text: "Συμφωνία του Παρισιού" } },
          },
          {
            text: "UN Framework Convention on Climate Change",
            isCorrect: true,
            orderIndex: 2,
            translations: {
              el: {
                text: "Σύμβαση-Πλαίσιο του ΟΗΕ για την Κλιματική Αλλαγή",
              },
            },
          },
          {
            text: "Montreal Protocol",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Πρωτόκολλο του Μόντρεαλ" } },
          },
        ],
      },
      {
        text: "Which of the following events occurred during the dissolution of the Soviet Union in 1991?",
        explanation:
          "The dissolution of the USSR involved the failed August Coup against Gorbachev, declarations of independence by former Soviet republics (including Ukraine, the Baltic states, and others), and the formal creation of the Commonwealth of Independent States. The Chernobyl disaster occurred in 1986.",
        difficulty: Difficulty.HARD,
        orderIndex: 2,
        multipleCorrect: true,
        translations: {
          el: {
            text: "Ποια από τα παρακάτω γεγονότα συνέβησαν κατά τη διάλυση της Σοβιετικής Ένωσης το 1991;",
            explanation:
              "Η διάλυση της ΕΣΣΔ περιλάμβανε το αποτυχημένο πραξικόπημα του Αυγούστου εναντίον του Γκορμπατσόφ, κηρύξεις ανεξαρτησίας πρώην σοβιετικών δημοκρατιών (συμπεριλαμβανομένων της Ουκρανίας, των κρατών της Βαλτικής και άλλων) και την επίσημη δημιουργία της Κοινοπολιτείας Ανεξαρτήτων Κρατών. Η καταστροφή του Τσερνόμπιλ συνέβη το 1986.",
          },
        },
        options: [
          {
            text: "The August Coup against Gorbachev",
            isCorrect: true,
            orderIndex: 0,
            translations: {
              el: {
                text: "Το πραξικόπημα του Αυγούστου εναντίον του Γκορμπατσόφ",
              },
            },
          },
          {
            text: "Independence declarations by Soviet republics",
            isCorrect: true,
            orderIndex: 1,
            translations: {
              el: {
                text: "Κηρύξεις ανεξαρτησίας σοβιετικών δημοκρατιών",
              },
            },
          },
          {
            text: "The Chernobyl nuclear disaster",
            isCorrect: false,
            orderIndex: 2,
            translations: {
              el: { text: "Η πυρηνική καταστροφή του Τσερνόμπιλ" },
            },
          },
          {
            text: "Formation of the Commonwealth of Independent States",
            isCorrect: true,
            orderIndex: 3,
            translations: {
              el: {
                text: "Ίδρυση της Κοινοπολιτείας Ανεξαρτήτων Κρατών",
              },
            },
          },
        ],
      },
      {
        text: "The Maastricht Treaty, signed in 1992, established which supranational entity?",
        explanation:
          "The Maastricht Treaty (formally the Treaty on European Union) was signed on February 7, 1992 and established the European Union, creating the framework for economic and monetary union and common foreign and security policy.",
        difficulty: Difficulty.EXPERT,
        orderIndex: 3,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Η Συνθήκη του Μάαστριχτ, που υπογράφηκε το 1992, ίδρυσε ποιον υπερεθνικό οργανισμό;",
            explanation:
              "Η Συνθήκη του Μάαστριχτ (επίσημα Συνθήκη για την Ευρωπαϊκή Ένωση) υπογράφηκε στις 7 Φεβρουαρίου 1992 και ίδρυσε την Ευρωπαϊκή Ένωση, δημιουργώντας το πλαίσιο για την οικονομική και νομισματική ένωση και την κοινή εξωτερική πολιτική και πολιτική ασφάλειας.",
          },
        },
        options: [
          {
            text: "The European Economic Community",
            isCorrect: false,
            orderIndex: 0,
            translations: {
              el: { text: "Η Ευρωπαϊκή Οικονομική Κοινότητα" },
            },
          },
          {
            text: "The European Union",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Η Ευρωπαϊκή Ένωση" } },
          },
          {
            text: "NATO",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "ΝΑΤΟ" } },
          },
          {
            text: "The World Trade Organization",
            isCorrect: false,
            orderIndex: 3,
            translations: {
              el: { text: "Ο Παγκόσμιος Οργανισμός Εμπορίου" },
            },
          },
        ],
      },
    ],
  },

  // ============================================================
  // 10. MIXED_GENERAL
  // ============================================================
  {
    title: "Mixed General History",
    description:
      "A cross-era challenge covering diverse topics from across all of human history.",
    era: Era.MIXED_GENERAL,
    translations: {
      el: {
        title: "Μεικτή Γενική Ιστορία",
        description:
          "Μια πρόκληση που καλύπτει ποικίλα θέματα από όλη την ανθρώπινη ιστορία.",
      },
    },
    questions: [
      {
        text: "Which ancient civilization built the Machu Picchu complex high in the Andes Mountains?",
        explanation:
          "Machu Picchu was built by the Inca Empire in the 15th century in present-day Peru. It is believed to have been a royal estate for the Inca emperor Pachacuti.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Ποιος αρχαίος πολιτισμός έχτισε το συγκρότημα του Μάτσου Πίτσου ψηλά στις Άνδεις;",
            explanation:
              "Το Μάτσου Πίτσου χτίστηκε από την Αυτοκρατορία των Ίνκας τον 15ο αιώνα στο σημερινό Περού. Πιστεύεται ότι ήταν βασιλική κατοικία του αυτοκράτορα Πατσακούτι των Ίνκας.",
          },
        },
        options: [
          {
            text: "Maya",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Μάγια" } },
          },
          {
            text: "Aztec",
            isCorrect: false,
            orderIndex: 1,
            translations: { el: { text: "Αζτέκοι" } },
          },
          {
            text: "Inca",
            isCorrect: true,
            orderIndex: 2,
            translations: { el: { text: "Ίνκας" } },
          },
          {
            text: "Olmec",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Ολμέκοι" } },
          },
        ],
      },
      {
        text: "The French Revolution began in 1789 with the storming of which fortress-prison?",
        explanation:
          "The storming of the Bastille on July 14, 1789 is considered the symbolic start of the French Revolution. The fortress held only seven prisoners at the time but represented royal authority.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Η Γαλλική Επανάσταση ξεκίνησε το 1789 με την κατάληψη ποιου φρουρίου-φυλακής;",
            explanation:
              "Η κατάληψη της Βαστίλης στις 14 Ιουλίου 1789 θεωρείται η συμβολική αρχή της Γαλλικής Επανάστασης. Το φρούριο κρατούσε μόνο επτά φυλακισμένους εκείνη τη στιγμή, αλλά αντιπροσώπευε τη βασιλική εξουσία.",
          },
        },
        options: [
          {
            text: "The Conciergerie",
            isCorrect: false,
            orderIndex: 0,
            translations: { el: { text: "Η Κονσιερζερί" } },
          },
          {
            text: "The Bastille",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Η Βαστίλη" } },
          },
          {
            text: "The Ch\u00e2teau d'If",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Το Σατό ντ' Ιφ" } },
          },
          {
            text: "The Tower of London",
            isCorrect: false,
            orderIndex: 3,
            translations: { el: { text: "Ο Πύργος του Λονδίνου" } },
          },
        ],
      },
      {
        text: "Which of the following empires existed, at least in part, during the 13th century?",
        explanation:
          "The Mongol Empire (1206-1368), the Byzantine Empire (330-1453), and the Holy Roman Empire (800/962-1806) all existed during the 13th century. The Ottoman Empire was not formally established until 1299, with most of its territorial expansion occurring in the 14th century and beyond.",
        difficulty: Difficulty.HARD,
        orderIndex: 2,
        multipleCorrect: true,
        translations: {
          el: {
            text: "Ποιες από τις παρακάτω αυτοκρατορίες υπήρχαν, τουλάχιστον εν μέρει, κατά τον 13ο αιώνα;",
            explanation:
              "Η Μογγολική Αυτοκρατορία (1206-1368), η Βυζαντινή Αυτοκρατορία (330-1453) και η Αγία Ρωμαϊκή Αυτοκρατορία (800/962-1806) υπήρχαν όλες κατά τον 13ο αιώνα. Η Οθωμανική Αυτοκρατορία δεν ιδρύθηκε επίσημα παρά μόνο το 1299, με το μεγαλύτερο μέρος της εδαφικής της επέκτασης να λαμβάνει χώρα τον 14ο αιώνα και μετά.",
          },
        },
        options: [
          {
            text: "Mongol Empire",
            isCorrect: true,
            orderIndex: 0,
            translations: { el: { text: "Μογγολική Αυτοκρατορία" } },
          },
          {
            text: "Byzantine Empire",
            isCorrect: true,
            orderIndex: 1,
            translations: { el: { text: "Βυζαντινή Αυτοκρατορία" } },
          },
          {
            text: "Ottoman Empire",
            isCorrect: false,
            orderIndex: 2,
            translations: { el: { text: "Οθωμανική Αυτοκρατορία" } },
          },
          {
            text: "Holy Roman Empire",
            isCorrect: true,
            orderIndex: 3,
            translations: {
              el: { text: "Αγία Ρωμαϊκή Αυτοκρατορία" },
            },
          },
        ],
      },
      {
        text: "The Treaty of Westphalia (1648) is considered foundational to modern international relations because it established what principle?",
        explanation:
          "The Peace of Westphalia ended the Thirty Years' War and established the principle of state sovereignty, meaning each state has exclusive authority over its territory without external interference. This became the bedrock of the modern international system.",
        difficulty: Difficulty.EXPERT,
        orderIndex: 3,
        multipleCorrect: false,
        translations: {
          el: {
            text: "Η Συνθήκη της Βεστφαλίας (1648) θεωρείται θεμελιώδης για τις σύγχρονες διεθνείς σχέσεις επειδή καθιέρωσε ποια αρχή;",
            explanation:
              "Η Ειρήνη της Βεστφαλίας τερμάτισε τον Τριακονταετή Πόλεμο και καθιέρωσε την αρχή της κρατικής κυριαρχίας, δηλαδή ότι κάθε κράτος έχει αποκλειστική εξουσία στο έδαφός του χωρίς εξωτερική παρέμβαση. Αυτό έγινε ο θεμέλιος λίθος του σύγχρονου διεθνούς συστήματος.",
          },
        },
        options: [
          {
            text: "Freedom of navigation on international waters",
            isCorrect: false,
            orderIndex: 0,
            translations: {
              el: {
                text: "Ελευθερία ναυσιπλοΐας σε διεθνή ύδατα",
              },
            },
          },
          {
            text: "State sovereignty and non-interference",
            isCorrect: true,
            orderIndex: 1,
            translations: {
              el: { text: "Κρατική κυριαρχία και μη επέμβαση" },
            },
          },
          {
            text: "Universal human rights",
            isCorrect: false,
            orderIndex: 2,
            translations: {
              el: { text: "Οικουμενικά ανθρώπινα δικαιώματα" },
            },
          },
          {
            text: "Collective security through alliances",
            isCorrect: false,
            orderIndex: 3,
            translations: {
              el: { text: "Συλλογική ασφάλεια μέσω συμμαχιών" },
            },
          },
        ],
      },
    ],
  },
]

async function main() {
  console.log("Seeding history quiz database...")

  // Clear existing data in the correct order (respecting foreign keys)
  console.log("Clearing existing data...")
  await prisma.userAnswer.deleteMany()
  console.log("  - Cleared userAnswers")
  await prisma.quizAttempt.deleteMany()
  console.log("  - Cleared quizAttempts")
  await prisma.option.deleteMany()
  console.log("  - Cleared options")
  await prisma.question.deleteMany()
  console.log("  - Cleared questions")
  await prisma.quiz.deleteMany()
  console.log("  - Cleared quizzes")

  // Seed quizzes with nested questions and options
  for (const quizData of quizzes) {
    const quiz = await prisma.quiz.create({
      data: {
        title: quizData.title,
        description: quizData.description,
        era: quizData.era,
        translations: quizData.translations,
        questions: {
          create: quizData.questions.map((q) => ({
            text: q.text,
            explanation: q.explanation,
            difficulty: q.difficulty,
            orderIndex: q.orderIndex,
            multipleCorrect: q.multipleCorrect,
            translations: q.translations,
            options: {
              create: q.options.map((o) => ({
                text: o.text,
                isCorrect: o.isCorrect,
                orderIndex: o.orderIndex,
                translations: o.translations,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: { options: true },
        },
      },
    })

    console.log(
      `Created quiz: "${quiz.title}" (${quiz.era}) with ${quiz.questions.length} questions`
    )
  }

  const totalQuizzes = await prisma.quiz.count()
  const totalQuestions = await prisma.question.count()
  const totalOptions = await prisma.option.count()

  console.log("\nSeed complete!")
  console.log(`  Quizzes:   ${totalQuizzes}`)
  console.log(`  Questions: ${totalQuestions}`)
  console.log(`  Options:   ${totalOptions}`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
