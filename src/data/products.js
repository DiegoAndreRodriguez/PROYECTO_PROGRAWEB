export const categories = [
  "Físicos",
  "Mentales",
  "Elementales",
  "Tecnológicos",
  "Místicos",
  "Curativos"
];

export const products = [
  
  { id: 1, name: "Superfuerza", category: "Físicos", price: 300, description: "Incrementa tu fuerza física hasta levantar tanques y abrir caminos imposibles.", image:"/imagenes/fuerza.png", sold: 230, createdAt: Date.now() - 1000000 },
  { id: 2, name: "Volar", category: "Físicos", price: 350, description: "Surca los cielos con total libertad y velocidad, dejando atrás los límites del suelo.", image: null, sold: 180, createdAt: Date.now() - 2000000 },
  { id: 3, name: "Velocidad Sobrehumana", category: "Físicos", price: 280, description: "Corre tan rápido que el mundo parece detenerse a tu alrededor.", image: null, sold: 150, createdAt: Date.now() - 3000000 },
  { id: 4, name: "Invulnerabilidad", category: "Físicos", price: 400, description: "Tu cuerpo se vuelve indestructible frente a armas, fuego o impactos extremos.", image: null, sold: 90, createdAt: Date.now() - 4000000 },
  { id: 5, name: "Reflejos Felinos", category: "Físicos", price: 220, description: "Reacciona con la agilidad de un felino, esquivando cualquier ataque en milisegundos.", image: null, sold: 130, createdAt: Date.now() - 5000000 },
  { id: 6, name: "Resistencia Infinita", category: "Físicos", price: 310, description: "Corre, pelea o trabaja sin cansarte jamás, tu energía parece inagotable.", image: null, sold: 175, createdAt: Date.now() - 6000000 },
  { id: 7, name: "Salto Gigante", category: "Físicos", price: 190, description: "Alcanza la cima de edificios o cruza ríos de un solo salto monumental.", image: null, sold: 80, createdAt: Date.now() - 7000000 },
  { id: 8, name: "Elasticidad Corporal", category: "Físicos", price: 270, description: "Estira tu cuerpo como goma, atravesando rendijas y alcanzando cualquier objeto.", image: null, sold: 60, createdAt: Date.now() - 8000000 },

  
  { id: 9, name: "Telepatía", category: "Mentales", price: 320, description: "Lee y comunica pensamientos con otras personas sin necesidad de palabras.", image: null, sold: 120, createdAt: Date.now() - 9000000 },
  { id: 10, name: "Telequinesis", category: "Mentales", price: 360, description: "Mueve objetos con tu mente, desde una pluma hasta automóviles enteros.", image: null, sold: 200, createdAt: Date.now() - 10000000 },
  { id: 11, name: "Clarividencia", category: "Mentales", price: 270, description: "Anticípate al futuro cercano y cambia tu destino con decisiones inteligentes.", image: null, sold: 75, createdAt: Date.now() - 11000000 },
  { id: 12, name: "Control Mental", category: "Mentales", price: 500, description: "Influye en la voluntad de otros y guía sus acciones a tu favor.", image: null, sold: 50, createdAt: Date.now() - 12000000 },
  { id: 13, name: "Empatía Total", category: "Mentales", price: 210, description: "Percibe las emociones ajenas como si fueran tuyas, comprendiendo a todos profundamente.", image: null, sold: 60, createdAt: Date.now() - 13000000 },
  { id: 14, name: "Ilusiones Mentales", category: "Mentales", price: 330, description: "Crea escenarios falsos en la mente de tus enemigos para confundirlos.", image: null, sold: 110, createdAt: Date.now() - 14000000 },
  { id: 15, name: "Lenguas Universales", category: "Mentales", price: 260, description: "Comprende y habla cualquier idioma humano o alienígena instantáneamente.", image: null, sold: 85, createdAt: Date.now() - 15000000 },
  { id: 16, name: "Memoria Absoluta", category: "Mentales", price: 300, description: "Recuerda cada detalle de tu vida y aprende cualquier cosa con solo leerla una vez.", image: null, sold: 145, createdAt: Date.now() - 16000000 },

 
  { id: 17, name: "Control del Fuego", category: "Elementales", price: 310, description: "Genera y manipula llamas a tu antojo, desde una chispa hasta un incendio.", image: null, sold: 210, createdAt: Date.now() - 17000000 },
  { id: 18, name: "Control del Agua", category: "Elementales", price: 300, description: "Manipula corrientes, mares y gotas de agua con un solo gesto.", image: null, sold: 140, createdAt: Date.now() - 18000000 },
  { id: 19, name: "Control de la Tierra", category: "Elementales", price: 330, description: "Levanta muros de roca, abre grietas en el suelo y domina montañas enteras.", image: null, sold: 110, createdAt: Date.now() - 19000000 },
  { id: 20, name: "Control del Aire", category: "Elementales", price: 280, description: "Crea ráfagas de viento capaces de derribar edificios o volar enemigos.", image: null, sold: 160, createdAt: Date.now() - 20000000 },
  { id: 21, name: "Tormenta Eléctrica", category: "Elementales", price: 350, description: "Invoca rayos y tormentas que arrasan con todo a su paso.", image: null, sold: 190, createdAt: Date.now() - 21000000 },
  { id: 22, name: "Gélido Invierno", category: "Elementales", price: 290, description: "Congela ríos, crea ventiscas y paraliza a tus enemigos con hielo.", image: null, sold: 170, createdAt: Date.now() - 22000000 },
  { id: 23, name: "Luz Radiante", category: "Elementales", price: 260, description: "Proyecta haces de luz cegadores que purifican la oscuridad.", image: null, sold: 140, createdAt: Date.now() - 23000000 },
  { id: 24, name: "Oscuridad Absoluta", category: "Elementales", price: 320, description: "Sumérgelo todo en tinieblas, anulando la visión de tus enemigos.", image: null, sold: 90, createdAt: Date.now() - 24000000 },

  
  { id: 25, name: "Visión de Rayos X", category: "Tecnológicos", price: 270, description: "Mira a través de paredes, objetos o cuerpos con claridad total.", image: null, sold: 160, createdAt: Date.now() - 25000000 },
  { id: 26, name: "Camuflaje Óptico", category: "Tecnológicos", price: 330, description: "Vuelve tu cuerpo invisible gracias a la manipulación de la luz.", image: null, sold: 200, createdAt: Date.now() - 26000000 },
  { id: 27, name: "Nanorregeneración", category: "Tecnológicos", price: 400, description: "Miles de nanobots reparan tu cuerpo en segundos ante cualquier herida.", image: null, sold: 70, createdAt: Date.now() - 27000000 },
  { id: 28, name: "Armadura Energética", category: "Tecnológicos", price: 420, description: "Una armadura tecnológica que amplifica fuerza, velocidad y protección.", image: null, sold: 100, createdAt: Date.now() - 28000000 },
  { id: 29, name: "Dron de Combate", category: "Tecnológicos", price: 310, description: "Un dron personal que te asiste en batallas, exploración o vigilancia.", image: null, sold: 50, createdAt: Date.now() - 29000000 },
  { id: 30, name: "Arsenal Digital", category: "Tecnológicos", price: 290, description: "Convoca armas digitales a partir de energía pura.", image: null, sold: 85, createdAt: Date.now() - 30000000 },
  { id: 31, name: "Interfaz Cibernética", category: "Tecnológicos", price: 250, description: "Conéctate con cualquier máquina, hackeando sistemas al instante.", image: null, sold: 120, createdAt: Date.now() - 31000000 },
  { id: 32, name: "Exoesqueleto Avanzado", category: "Tecnológicos", price: 370, description: "Un traje robótico que multiplica tu fuerza y resistencia.", image: null, sold: 60, createdAt: Date.now() - 32000000 },

  { id: 33, name: "Invisibilidad", category: "Místicos", price: 310, description: "Hazte invisible a voluntad y muévete sin ser detectado.", image: null, sold: 140, createdAt: Date.now() - 33000000 },
  { id: 34, name: "Invocación de Espíritus", category: "Místicos", price: 340, description: "Llama a entidades del más allá para que luchen a tu lado.", image: null, sold: 70, createdAt: Date.now() - 34000000 },
  { id: 35, name: "Magia Oscura", category: "Místicos", price: 400, description: "Canaliza energías prohibidas para desatar hechizos devastadores.", image: null, sold: 90, createdAt: Date.now() - 35000000 },
  { id: 36, name: "Teletransportación", category: "Místicos", price: 380, description: "Desaparece en un lugar y aparece instantáneamente en otro.", image: null, sold: 160, createdAt: Date.now() - 36000000 },
  { id: 37, name: "Encantamientos", category: "Místicos", price: 260, description: "Imbuye objetos con magia para potenciar sus habilidades.", image: null, sold: 130, createdAt: Date.now() - 37000000 },
  { id: 38, name: "Viaje Astral", category: "Místicos", price: 290, description: "Proyecta tu espíritu fuera del cuerpo y explora otras dimensiones.", image: null, sold: 110, createdAt: Date.now() - 38000000 },
  { id: 39, name: "Manipulación del Tiempo", category: "Místicos", price: 500, description: "Detén, acelera o retrocede el tiempo a tu voluntad.", image: null, sold: 40, createdAt: Date.now() - 39000000 },
  { id: 40, name: "Alquimia", category: "Místicos", price: 280, description: "Transmuta metales, crea pociones y altera la materia misma.", image: null, sold: 100, createdAt: Date.now() - 40000000 },

 
  { id: 41, name: "Regeneración Rápida", category: "Curativos", price: 310, description: "Sana cortes, golpes y fracturas en segundos.", image: null, sold: 180, createdAt: Date.now() - 41000000 },
  { id: 42, name: "Curación Celular", category: "Curativos", price: 330, description: "Tus células se regeneran constantemente, evitando enfermedades.", image: null, sold: 160, createdAt: Date.now() - 42000000 },
  { id: 43, name: "Inmunidad Absoluta", category: "Curativos", price: 280, description: "Vuelve tu cuerpo inmune a cualquier virus, bacteria o veneno.", image: null, sold: 150, createdAt: Date.now() - 43000000 },
  { id: 44, name: "Aura Sanadora", category: "Curativos", price: 350, description: "Emite un aura que cura a los que te rodean.", image: null, sold: 200, createdAt: Date.now() - 44000000 },
  { id: 45, name: "Resurrección", category: "Curativos", price: 500, description: "Devuelve la vida a quienes han caído en combate.", image: null, sold: 30, createdAt: Date.now() - 45000000 },
  { id: 46, name: "Purificación", category: "Curativos", price: 260, description: "Elimina toxinas, maldiciones y energías negativas.", image: null, sold: 90, createdAt: Date.now() - 46000000 },
  { id: 47, name: "Longevidad", category: "Curativos", price: 400, description: "Extiende tu esperanza de vida durante siglos sin envejecer.", image: null, sold: 70, createdAt: Date.now() - 47000000 },
  { id: 48, name: "Reanimación", category: "Curativos", price: 370, description: "Recupera a los heridos en estado crítico con un toque.", image: null, sold: 110, createdAt: Date.now() - 48000000 },
  { id: 49, name: "Escudo Vital", category: "Curativos", price: 310, description: "Crea un campo de energía que absorbe daño y lo transforma en curación.", image: null, sold: 130, createdAt: Date.now() - 49000000 },
  { id: 50, name: "Manos de Luz", category: "Curativos", price: 290, description: "Canaliza energía sanadora directamente desde tus manos.", image: null, sold: 175, createdAt: Date.now() - 50000000 }
];
