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
}

type QuestionData = {
  text: string
  explanation: string
  difficulty: Difficulty
  orderIndex: number
  multipleCorrect: boolean
  options: OptionData[]
}

type QuizData = {
  title: string
  description: string
  era: Era
  questions: QuestionData[]
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
    questions: [
      {
        text: "What river valley is widely considered the cradle of Mesopotamian civilization?",
        explanation:
          "The Tigris and Euphrates rivers formed the fertile crescent of Mesopotamia, where Sumer, Akkad, and Babylon flourished.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        options: [
          { text: "Nile River Valley", isCorrect: false, orderIndex: 0 },
          {
            text: "Tigris-Euphrates River Valley",
            isCorrect: true,
            orderIndex: 1,
          },
          { text: "Indus River Valley", isCorrect: false, orderIndex: 2 },
          { text: "Yellow River Valley", isCorrect: false, orderIndex: 3 },
        ],
      },
      {
        text: "Which ancient Greek city-state is known for its militaristic society and the Battle of Thermopylae?",
        explanation:
          "Sparta was renowned for its warrior culture. In 480 BCE, King Leonidas I led 300 Spartans in a famous last stand against the Persian army at Thermopylae.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        options: [
          { text: "Athens", isCorrect: false, orderIndex: 0 },
          { text: "Corinth", isCorrect: false, orderIndex: 1 },
          { text: "Sparta", isCorrect: true, orderIndex: 2 },
          { text: "Thebes", isCorrect: false, orderIndex: 3 },
        ],
      },
      {
        text: "Which of the following were among the Seven Wonders of the Ancient World?",
        explanation:
          "The Great Pyramid of Giza, the Lighthouse of Alexandria, and the Colossus of Rhodes were all part of the classical Seven Wonders. The Parthenon, though remarkable, was not on the list.",
        difficulty: Difficulty.HARD,
        orderIndex: 2,
        multipleCorrect: true,
        options: [
          {
            text: "Great Pyramid of Giza",
            isCorrect: true,
            orderIndex: 0,
          },
          { text: "The Parthenon", isCorrect: false, orderIndex: 1 },
          {
            text: "Lighthouse of Alexandria",
            isCorrect: true,
            orderIndex: 2,
          },
          {
            text: "Colossus of Rhodes",
            isCorrect: true,
            orderIndex: 3,
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
        options: [
          {
            text: "Hieroglyphic, Demotic, and Ancient Greek",
            isCorrect: true,
            orderIndex: 0,
          },
          {
            text: "Hieroglyphic, Coptic, and Latin",
            isCorrect: false,
            orderIndex: 1,
          },
          {
            text: "Cuneiform, Demotic, and Ancient Greek",
            isCorrect: false,
            orderIndex: 2,
          },
          {
            text: "Hieroglyphic, Aramaic, and Ancient Greek",
            isCorrect: false,
            orderIndex: 3,
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
    questions: [
      {
        text: "What system of land ownership and loyalty defined much of medieval European society?",
        explanation:
          "Feudalism was a hierarchical system where lords granted land (fiefs) to vassals in exchange for military service and loyalty.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        options: [
          { text: "Democracy", isCorrect: false, orderIndex: 0 },
          { text: "Feudalism", isCorrect: true, orderIndex: 1 },
          { text: "Mercantilism", isCorrect: false, orderIndex: 2 },
          { text: "Communism", isCorrect: false, orderIndex: 3 },
        ],
      },
      {
        text: "The Magna Carta, signed in 1215, primarily limited the power of which English king?",
        explanation:
          "King John of England was forced by rebellious barons to sign the Magna Carta at Runnymede, establishing that the monarch was subject to law.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        options: [
          { text: "Henry II", isCorrect: false, orderIndex: 0 },
          { text: "Richard I", isCorrect: false, orderIndex: 1 },
          { text: "King John", isCorrect: true, orderIndex: 2 },
          { text: "Edward I", isCorrect: false, orderIndex: 3 },
        ],
      },
      {
        text: "Which of the following were direct consequences of the Black Death in Europe?",
        explanation:
          "The Black Death (1347-1351) killed roughly one-third of Europe's population, leading to severe labor shortages, the collapse of the feudal serf system, and widespread persecution of Jewish communities who were falsely blamed.",
        difficulty: Difficulty.HARD,
        orderIndex: 2,
        multipleCorrect: true,
        options: [
          { text: "Severe labor shortages", isCorrect: true, orderIndex: 0 },
          {
            text: "Decline of the feudal serf system",
            isCorrect: true,
            orderIndex: 1,
          },
          {
            text: "The start of the Hundred Years' War",
            isCorrect: false,
            orderIndex: 2,
          },
          {
            text: "Persecution of Jewish communities",
            isCorrect: true,
            orderIndex: 3,
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
        options: [
          { text: "Rome", isCorrect: false, orderIndex: 0 },
          { text: "Constantinople", isCorrect: true, orderIndex: 1 },
          { text: "Antioch", isCorrect: false, orderIndex: 2 },
          { text: "Alexandria", isCorrect: false, orderIndex: 3 },
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
    questions: [
      {
        text: "Which Italian city is widely considered the birthplace of the Renaissance?",
        explanation:
          "Florence, under the patronage of the Medici family, became the epicenter of the Renaissance, nurturing artists like Leonardo da Vinci and Michelangelo.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        options: [
          { text: "Venice", isCorrect: false, orderIndex: 0 },
          { text: "Rome", isCorrect: false, orderIndex: 1 },
          { text: "Florence", isCorrect: true, orderIndex: 2 },
          { text: "Milan", isCorrect: false, orderIndex: 3 },
        ],
      },
      {
        text: "Who painted the ceiling of the Sistine Chapel?",
        explanation:
          "Michelangelo painted the Sistine Chapel ceiling between 1508 and 1512, commissioned by Pope Julius II. The work includes the iconic scene of the Creation of Adam.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        options: [
          { text: "Leonardo da Vinci", isCorrect: false, orderIndex: 0 },
          { text: "Raphael", isCorrect: false, orderIndex: 1 },
          { text: "Michelangelo", isCorrect: true, orderIndex: 2 },
          { text: "Botticelli", isCorrect: false, orderIndex: 3 },
        ],
      },
      {
        text: "Which of the following innovations are attributed to the Renaissance period?",
        explanation:
          "Gutenberg's printing press (c. 1440), linear perspective in painting (developed by Brunelleschi), and double-entry bookkeeping (formalized by Luca Pacioli) all emerged during the Renaissance. The steam engine was an 18th-century invention.",
        difficulty: Difficulty.HARD,
        orderIndex: 2,
        multipleCorrect: true,
        options: [
          {
            text: "Gutenberg's printing press",
            isCorrect: true,
            orderIndex: 0,
          },
          {
            text: "Linear perspective in painting",
            isCorrect: true,
            orderIndex: 1,
          },
          { text: "The steam engine", isCorrect: false, orderIndex: 2 },
          {
            text: "Double-entry bookkeeping",
            isCorrect: true,
            orderIndex: 3,
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
        options: [
          {
            text: "Cosimo de' Medici",
            isCorrect: false,
            orderIndex: 0,
          },
          {
            text: "Lorenzo the Magnificent",
            isCorrect: false,
            orderIndex: 1,
          },
          {
            text: "Lorenzo de' Medici, Duke of Urbino",
            isCorrect: true,
            orderIndex: 2,
          },
          {
            text: "Giovanni de' Medici (Pope Leo X)",
            isCorrect: false,
            orderIndex: 3,
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
    questions: [
      {
        text: "In 1492, Christopher Columbus sailed across the Atlantic under the flag of which country?",
        explanation:
          "Columbus's expedition was sponsored by King Ferdinand II and Queen Isabella I of Spain. He landed in the Bahamas, believing he had reached Asia.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        options: [
          { text: "Portugal", isCorrect: false, orderIndex: 0 },
          { text: "Spain", isCorrect: true, orderIndex: 1 },
          { text: "England", isCorrect: false, orderIndex: 2 },
          { text: "Italy", isCorrect: false, orderIndex: 3 },
        ],
      },
      {
        text: "Which Portuguese explorer led the first expedition to sail around the southern tip of Africa?",
        explanation:
          "Bartolomeu Dias rounded the Cape of Good Hope in 1488, proving a sea route to the Indian Ocean was possible. Vasco da Gama later completed the voyage to India in 1498.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        options: [
          { text: "Vasco da Gama", isCorrect: false, orderIndex: 0 },
          { text: "Bartolomeu Dias", isCorrect: true, orderIndex: 1 },
          {
            text: "Ferdinand Magellan",
            isCorrect: false,
            orderIndex: 2,
          },
          { text: "Prince Henry", isCorrect: false, orderIndex: 3 },
        ],
      },
      {
        text: "Which of the following were provisions of the Treaty of Tordesillas (1494)?",
        explanation:
          "The Treaty of Tordesillas divided newly discovered lands between Spain and Portugal along a meridian roughly 370 leagues west of the Cape Verde islands. It was sanctioned by Pope Alexander VI and gave Portugal claim to Brazil.",
        difficulty: Difficulty.HARD,
        orderIndex: 2,
        multipleCorrect: true,
        options: [
          {
            text: "Division of new lands between Spain and Portugal",
            isCorrect: true,
            orderIndex: 0,
          },
          {
            text: "A demarcation line west of the Cape Verde islands",
            isCorrect: true,
            orderIndex: 1,
          },
          {
            text: "England received rights to North America",
            isCorrect: false,
            orderIndex: 2,
          },
          {
            text: "Portugal's eventual claim to Brazil",
            isCorrect: true,
            orderIndex: 3,
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
        options: [
          { text: "Guam", isCorrect: false, orderIndex: 0 },
          { text: "Mactan", isCorrect: true, orderIndex: 1 },
          { text: "Cebu", isCorrect: false, orderIndex: 2 },
          { text: "Borneo", isCorrect: false, orderIndex: 3 },
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
    questions: [
      {
        text: "In which country did the Industrial Revolution begin?",
        explanation:
          "The Industrial Revolution began in Great Britain in the mid-18th century, driven by innovations in textile manufacturing, steam power, and iron production.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        options: [
          { text: "France", isCorrect: false, orderIndex: 0 },
          { text: "Germany", isCorrect: false, orderIndex: 1 },
          { text: "Great Britain", isCorrect: true, orderIndex: 2 },
          { text: "United States", isCorrect: false, orderIndex: 3 },
        ],
      },
      {
        text: "Who is credited with significantly improving the steam engine in the 1760s-1770s?",
        explanation:
          "James Watt made critical improvements to the Newcomen steam engine, including a separate condenser that dramatically increased efficiency. His work powered the Industrial Revolution.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        options: [
          { text: "Thomas Newcomen", isCorrect: false, orderIndex: 0 },
          { text: "James Watt", isCorrect: true, orderIndex: 1 },
          { text: "George Stephenson", isCorrect: false, orderIndex: 2 },
          { text: "Richard Arkwright", isCorrect: false, orderIndex: 3 },
        ],
      },
      {
        text: "Which of the following were key social consequences of the Industrial Revolution?",
        explanation:
          "The Industrial Revolution caused massive urbanization as workers moved to factory cities, gave rise to child labor in factories and mines, and spurred the growth of organized labor movements. The decline of the monarchy was not a direct consequence.",
        difficulty: Difficulty.HARD,
        orderIndex: 2,
        multipleCorrect: true,
        options: [
          {
            text: "Rapid urbanization",
            isCorrect: true,
            orderIndex: 0,
          },
          {
            text: "Widespread child labor",
            isCorrect: true,
            orderIndex: 1,
          },
          {
            text: "Decline of European monarchies",
            isCorrect: false,
            orderIndex: 2,
          },
          {
            text: "Growth of labor unions",
            isCorrect: true,
            orderIndex: 3,
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
        options: [
          {
            text: "High food prices caused by the Corn Laws",
            isCorrect: false,
            orderIndex: 0,
          },
          {
            text: "Labor-saving textile machinery",
            isCorrect: true,
            orderIndex: 1,
          },
          {
            text: "Railway construction through farmland",
            isCorrect: false,
            orderIndex: 2,
          },
          {
            text: "The expansion of coal mining",
            isCorrect: false,
            orderIndex: 3,
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
    questions: [
      {
        text: "The assassination of which figure in 1914 is widely considered the immediate trigger for World War I?",
        explanation:
          "Archduke Franz Ferdinand of Austria-Hungary was assassinated in Sarajevo on June 28, 1914 by Gavrilo Princip, setting off a chain of alliance activations that led to war.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        options: [
          {
            text: "Kaiser Wilhelm II",
            isCorrect: false,
            orderIndex: 0,
          },
          {
            text: "Archduke Franz Ferdinand",
            isCorrect: true,
            orderIndex: 1,
          },
          { text: "Tsar Nicholas II", isCorrect: false, orderIndex: 2 },
          {
            text: "King George V",
            isCorrect: false,
            orderIndex: 3,
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
        options: [
          { text: "Battle of Verdun", isCorrect: false, orderIndex: 0 },
          {
            text: "Battle of the Somme",
            isCorrect: true,
            orderIndex: 1,
          },
          {
            text: "Battle of Gallipoli",
            isCorrect: false,
            orderIndex: 2,
          },
          {
            text: "Battle of Passchendaele",
            isCorrect: false,
            orderIndex: 3,
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
        options: [
          {
            text: "Germany accepted sole war guilt (Article 231)",
            isCorrect: true,
            orderIndex: 0,
          },
          {
            text: "Germany paid reparations",
            isCorrect: true,
            orderIndex: 1,
          },
          {
            text: "Germany was divided into occupation zones",
            isCorrect: false,
            orderIndex: 2,
          },
          {
            text: "Germany's military was severely restricted",
            isCorrect: true,
            orderIndex: 3,
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
        options: [
          {
            text: "Britain and Russia",
            isCorrect: false,
            orderIndex: 0,
          },
          {
            text: "Britain and France",
            isCorrect: true,
            orderIndex: 1,
          },
          {
            text: "France and Italy",
            isCorrect: false,
            orderIndex: 2,
          },
          {
            text: "Britain and Italy",
            isCorrect: false,
            orderIndex: 3,
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
    questions: [
      {
        text: "Germany's invasion of which country on September 1, 1939 triggered the start of World War II in Europe?",
        explanation:
          "Nazi Germany invaded Poland on September 1, 1939. Britain and France declared war on Germany two days later, beginning World War II in Europe.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        options: [
          { text: "Czechoslovakia", isCorrect: false, orderIndex: 0 },
          { text: "Austria", isCorrect: false, orderIndex: 1 },
          { text: "Poland", isCorrect: true, orderIndex: 2 },
          { text: "France", isCorrect: false, orderIndex: 3 },
        ],
      },
      {
        text: "What was the codename of the Allied invasion of Normandy on June 6, 1944?",
        explanation:
          "Operation Overlord was the codename for the Battle of Normandy, with D-Day (June 6, 1944) marking the largest seaborne invasion in history. Over 156,000 troops landed on five beaches.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        options: [
          {
            text: "Operation Barbarossa",
            isCorrect: false,
            orderIndex: 0,
          },
          {
            text: "Operation Overlord",
            isCorrect: true,
            orderIndex: 1,
          },
          {
            text: "Operation Market Garden",
            isCorrect: false,
            orderIndex: 2,
          },
          {
            text: "Operation Torch",
            isCorrect: false,
            orderIndex: 3,
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
        options: [
          {
            text: "Battle of Stalingrad",
            isCorrect: true,
            orderIndex: 0,
          },
          {
            text: "Battle of Midway",
            isCorrect: true,
            orderIndex: 1,
          },
          {
            text: "Battle of the Bulge",
            isCorrect: false,
            orderIndex: 2,
          },
          {
            text: "Battle of El Alamein",
            isCorrect: true,
            orderIndex: 3,
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
        options: [
          {
            text: "Operation Tube Alloys",
            isCorrect: false,
            orderIndex: 0,
          },
          {
            text: "The Manhattan Project",
            isCorrect: true,
            orderIndex: 1,
          },
          {
            text: "Project Silverplate",
            isCorrect: false,
            orderIndex: 2,
          },
          { text: "Operation Epsilon", isCorrect: false, orderIndex: 3 },
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
    questions: [
      {
        text: "What physical structure became the most iconic symbol of the Cold War divide in Europe?",
        explanation:
          "The Berlin Wall, built in 1961 by East Germany, physically divided Berlin and became the foremost symbol of the Iron Curtain separating East and West.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        options: [
          {
            text: "The Iron Curtain fence",
            isCorrect: false,
            orderIndex: 0,
          },
          { text: "The Berlin Wall", isCorrect: true, orderIndex: 1 },
          {
            text: "The Maginot Line",
            isCorrect: false,
            orderIndex: 2,
          },
          {
            text: "Checkpoint Charlie",
            isCorrect: false,
            orderIndex: 3,
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
        options: [
          {
            text: "The US pledged not to invade Cuba",
            isCorrect: true,
            orderIndex: 0,
          },
          {
            text: "The US gave up West Berlin",
            isCorrect: false,
            orderIndex: 1,
          },
          {
            text: "The US ended the Korean War",
            isCorrect: false,
            orderIndex: 2,
          },
          {
            text: "The US recognized Castro's government",
            isCorrect: false,
            orderIndex: 3,
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
        options: [
          { text: "Korean War", isCorrect: true, orderIndex: 0 },
          { text: "Vietnam War", isCorrect: true, orderIndex: 1 },
          { text: "Falklands War", isCorrect: false, orderIndex: 2 },
          {
            text: "Soviet-Afghan War",
            isCorrect: true,
            orderIndex: 3,
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
        options: [
          { text: "The Marshall Plan", isCorrect: false, orderIndex: 0 },
          {
            text: "The Truman Doctrine",
            isCorrect: true,
            orderIndex: 1,
          },
          {
            text: "The Eisenhower Doctrine",
            isCorrect: false,
            orderIndex: 2,
          },
          { text: "Containment Policy", isCorrect: false, orderIndex: 3 },
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
    questions: [
      {
        text: "In what year did the Berlin Wall fall, symbolizing the end of the Cold War era?",
        explanation:
          "The Berlin Wall fell on November 9, 1989, when the East German government opened the borders. Crowds of citizens dismantled the wall, paving the way for German reunification in 1990.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        options: [
          { text: "1987", isCorrect: false, orderIndex: 0 },
          { text: "1989", isCorrect: true, orderIndex: 1 },
          { text: "1991", isCorrect: false, orderIndex: 2 },
          { text: "1993", isCorrect: false, orderIndex: 3 },
        ],
      },
      {
        text: "Which international agreement, adopted in 1992, aimed to combat climate change by stabilizing greenhouse gas emissions?",
        explanation:
          "The United Nations Framework Convention on Climate Change (UNFCCC) was adopted at the Earth Summit in Rio de Janeiro in 1992. It laid the foundation for later agreements like the Kyoto Protocol and the Paris Agreement.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        options: [
          { text: "Kyoto Protocol", isCorrect: false, orderIndex: 0 },
          { text: "Paris Agreement", isCorrect: false, orderIndex: 1 },
          {
            text: "UN Framework Convention on Climate Change",
            isCorrect: true,
            orderIndex: 2,
          },
          {
            text: "Montreal Protocol",
            isCorrect: false,
            orderIndex: 3,
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
        options: [
          {
            text: "The August Coup against Gorbachev",
            isCorrect: true,
            orderIndex: 0,
          },
          {
            text: "Independence declarations by Soviet republics",
            isCorrect: true,
            orderIndex: 1,
          },
          {
            text: "The Chernobyl nuclear disaster",
            isCorrect: false,
            orderIndex: 2,
          },
          {
            text: "Formation of the Commonwealth of Independent States",
            isCorrect: true,
            orderIndex: 3,
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
        options: [
          {
            text: "The European Economic Community",
            isCorrect: false,
            orderIndex: 0,
          },
          { text: "The European Union", isCorrect: true, orderIndex: 1 },
          { text: "NATO", isCorrect: false, orderIndex: 2 },
          {
            text: "The World Trade Organization",
            isCorrect: false,
            orderIndex: 3,
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
    questions: [
      {
        text: "Which ancient civilization built the Machu Picchu complex high in the Andes Mountains?",
        explanation:
          "Machu Picchu was built by the Inca Empire in the 15th century in present-day Peru. It is believed to have been a royal estate for the Inca emperor Pachacuti.",
        difficulty: Difficulty.EASY,
        orderIndex: 0,
        multipleCorrect: false,
        options: [
          { text: "Maya", isCorrect: false, orderIndex: 0 },
          { text: "Aztec", isCorrect: false, orderIndex: 1 },
          { text: "Inca", isCorrect: true, orderIndex: 2 },
          { text: "Olmec", isCorrect: false, orderIndex: 3 },
        ],
      },
      {
        text: "The French Revolution began in 1789 with the storming of which fortress-prison?",
        explanation:
          "The storming of the Bastille on July 14, 1789 is considered the symbolic start of the French Revolution. The fortress held only seven prisoners at the time but represented royal authority.",
        difficulty: Difficulty.MEDIUM,
        orderIndex: 1,
        multipleCorrect: false,
        options: [
          {
            text: "The Conciergerie",
            isCorrect: false,
            orderIndex: 0,
          },
          { text: "The Bastille", isCorrect: true, orderIndex: 1 },
          {
            text: "The Ch\u00e2teau d'If",
            isCorrect: false,
            orderIndex: 2,
          },
          {
            text: "The Tower of London",
            isCorrect: false,
            orderIndex: 3,
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
        options: [
          { text: "Mongol Empire", isCorrect: true, orderIndex: 0 },
          { text: "Byzantine Empire", isCorrect: true, orderIndex: 1 },
          { text: "Ottoman Empire", isCorrect: false, orderIndex: 2 },
          {
            text: "Holy Roman Empire",
            isCorrect: true,
            orderIndex: 3,
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
        options: [
          {
            text: "Freedom of navigation on international waters",
            isCorrect: false,
            orderIndex: 0,
          },
          {
            text: "State sovereignty and non-interference",
            isCorrect: true,
            orderIndex: 1,
          },
          {
            text: "Universal human rights",
            isCorrect: false,
            orderIndex: 2,
          },
          {
            text: "Collective security through alliances",
            isCorrect: false,
            orderIndex: 3,
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
        questions: {
          create: quizData.questions.map((q) => ({
            text: q.text,
            explanation: q.explanation,
            difficulty: q.difficulty,
            orderIndex: q.orderIndex,
            multipleCorrect: q.multipleCorrect,
            options: {
              create: q.options.map((o) => ({
                text: o.text,
                isCorrect: o.isCorrect,
                orderIndex: o.orderIndex,
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
