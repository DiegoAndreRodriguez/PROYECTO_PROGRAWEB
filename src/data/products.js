export const categories = [
  "Físicos",
  "Mentales",
  "Elementales",
  "Tecnológicos",
  "Místicos",
  "Curativos"
];

export const products = [
  
  { id: 1, name: "Superfuerza", category: "Físicos", price: 300, description: "Incrementa tu fuerza física hasta levantar tanques y abrir caminos imposibles.", image:"/imagenes/superfuerza.png", sold: 230, createdAt: Date.now() - 1000000 },
  { id: 2, name: "Volar", category: "Físicos", price: 350, description: "Surca los cielos con total libertad y velocidad, dejando atrás los límites del suelo.", image: "/imagenes/volar.png", sold: 180, createdAt: Date.now() - 2000000 },
  { id: 3, name: "Velocidad Sobrehumana", category: "Físicos", price: 280, description: "Corre tan rápido que el mundo parece detenerse a tu alrededor.", image: "/imagenes/velocidad_sobrehumana.png", sold: 150, createdAt: Date.now() - 3000000 },
  { id: 4, name: "Invulnerabilidad", category: "Físicos", price: 400, description: "Tu cuerpo se vuelve indestructible frente a armas, fuego o impactos extremos.", image: "/imagenes/invulnerabilidad.png", sold: 90, createdAt: Date.now() - 4000000 },
  { id: 5, name: "Reflejos Felinos", category: "Físicos", price: 220, description: "Reacciona con la agilidad de un felino, esquivando cualquier ataque en milisegundos.", image: "/imagenes/reflejos.png", sold: 130, createdAt: Date.now() - 5000000 },
  { id: 6, name: "Resistencia Infinita", category: "Físicos", price: 310, description: "Corre, pelea o trabaja sin cansarte jamás, tu energía parece inagotable.", image: "/imagenes/resistencia_infinita.png", sold: 175, createdAt: Date.now() - 6000000 },
  { id: 7, name: "Salto Gigante", category: "Físicos", price: 190, description: "Alcanza la cima de edificios o cruza ríos de un solo salto monumental.", image: "/imagenes/salto.png", sold: 80, createdAt: Date.now() - 7000000 },
  { id: 8, name: "Elasticidad Corporal", category: "Físicos", price: 270, description: "Estira tu cuerpo como goma, atravesando rendijas y alcanzando cualquier objeto.", image: "/imagenes/elasticidad.png", sold: 60, createdAt: Date.now() - 8000000 },

  
  { id: 9, name: "Telepatía", category: "Mentales", price: 320, description: "Lee y comunica pensamientos con otras personas sin necesidad de palabras.", image: "/imagenes/telepatia.png", sold: 120, createdAt: Date.now() - 9000000 },
  { id: 10, name: "Telequinesis", category: "Mentales", price: 360, description: "Mueve objetos con tu mente, desde una pluma hasta automóviles enteros.", image:"/imagenes/telequinesis.png", sold: 200, createdAt: Date.now() - 10000000 },
  { id: 11, name: "Clarividencia", category: "Mentales", price: 270, description: "Anticípate al futuro cercano y cambia tu destino con decisiones inteligentes.", image: "/imagenes/clarividencia.png", sold: 75, createdAt: Date.now() - 11000000 },
  { id: 12, name: "Control Mental", category: "Mentales", price: 500, description: "Influye en la voluntad de otros y guía sus acciones a tu favor.", image: "/imagenes/control_mental.png", sold: 50, createdAt: Date.now() - 12000000 },
  { id: 13, name: "Empatía Total", category: "Mentales", price: 210, description: "Percibe las emociones ajenas como si fueran tuyas, comprendiendo a todos profundamente.", image: "/imagenes/empatia.png", sold: 60, createdAt: Date.now() - 13000000 },
  { id: 14, name: "Ilusiones Mentales", category: "Mentales", price: 330, description: "Crea escenarios falsos en la mente de tus enemigos para confundirlos.", image: "/imagenes/ilusiones.png", sold: 110, createdAt: Date.now() - 14000000 },
  { id: 15, name: "Lenguas Universales", category: "Mentales", price: 260, description: "Comprende y habla cualquier idioma humano o alienígena instantáneamente.", image: "/imagenes/lenguas.png", sold: 85, createdAt: Date.now() - 15000000 },
  { id: 16, name: "Memoria Absoluta", category: "Mentales", price: 300, description: "Recuerda cada detalle de tu vida y aprende cualquier cosa con solo leerla una vez.", image:"/imagenes/memoria.png", sold: 145, createdAt: Date.now() - 16000000 },

 
  { id: 17, name: "Control del Fuego", category: "Elementales", price: 310, description: "Genera y manipula llamas a tu antojo, desde una chispa hasta un incendio.", image: "/imagenes/control_fuego.png", sold: 210, createdAt: Date.now() - 17000000 },
  { id: 18, name: "Control del Agua", category: "Elementales", price: 300, description: "Manipula corrientes, mares y gotas de agua con un solo gesto.", image: "/imagenes/control_agua.png", sold: 140, createdAt: Date.now() - 18000000 },
  { id: 19, name: "Control de la Tierra", category: "Elementales", price: 330, description: "Levanta muros de roca, abre grietas en el suelo y domina montañas enteras.", image: "/imagenes/control_tierra.png", sold: 110, createdAt: Date.now() - 19000000 },
  { id: 20, name: "Control del Aire", category: "Elementales", price: 280, description: "Crea ráfagas de viento capaces de derribar edificios o volar enemigos.", image: "/imagenes/control_aire.png", sold: 160, createdAt: Date.now() - 20000000 },
  { id: 21, name: "Tormenta Eléctrica", category: "Elementales", price: 350, description: "Invoca rayos y tormentas que arrasan con todo a su paso.", image: "/imagenes/tormenta_electrica.png", sold: 190, createdAt: Date.now() - 21000000 },
  { id: 22, name: "Gélido Invierno", category: "Elementales", price: 290, description: "Congela ríos, crea ventiscas y paraliza a tus enemigos con hielo.", image: "/imagenes/gelido_invierno.png", sold: 170, createdAt: Date.now() - 22000000 },
  { id: 23, name: "Luz Radiante", category: "Elementales", price: 260, description: "Proyecta haces de luz cegadores que purifican la oscuridad.", image: "/imagenes/luz.png", sold: 140, createdAt: Date.now() - 23000000 },
  { id: 24, name: "Oscuridad Absoluta", category: "Elementales", price: 320, description: "Sumérgelo todo en tinieblas, anulando la visión de tus enemigos.", image: "/imagenes/oscuridad.png", sold: 90, createdAt: Date.now() - 24000000 },

  
  { id: 25, name: "Visión de Rayos X", category: "Tecnológicos", price: 270, description: "Mira a través de paredes, objetos o cuerpos con claridad total.", image: "/imagenes/rayos_x.png", sold: 160, createdAt: Date.now() - 25000000 },
  { id: 26, name: "Camuflaje", category: "Tecnológicos", price: 330, description: "Vuelve tu cuerpo invisible gracias a la manipulación de la luz.", image: "/imagenes/camuflaje.png", sold: 200, createdAt: Date.now() - 26000000 },
  { id: 27, name: "Nanorregeneración", category: "Tecnológicos", price: 400, description: "Miles de nanobots reparan tu cuerpo en segundos ante cualquier herida.", image: "/imagenes/nano.png", sold: 70, createdAt: Date.now() - 27000000 },
  { id: 28, name: "Armadura Energética", category: "Tecnológicos", price: 420, description: "Una armadura tecnológica que amplifica fuerza, velocidad y protección.", image: "/imagenes/armadura.png", sold: 100, createdAt: Date.now() - 28000000 },
  { id: 29, name: "Dron de Combate", category: "Tecnológicos", price: 310, description: "Un dron personal que te asiste en batallas, exploración o vigilancia.", image: "/imagenes/dron.png", sold: 50, createdAt: Date.now() - 29000000 },
  { id: 30, name: "Arsenal Digital", category: "Tecnológicos", price: 290, description: "Convoca armas digitales a partir de energía pura.", image: "/imagenes/arsenal.png", sold: 85, createdAt: Date.now() - 30000000 },
  { id: 31, name: "Interfaz Cibernética", category: "Tecnológicos", price: 250, description: "Conéctate con cualquier máquina, hackeando sistemas al instante.", image: "/imagenes/interfaz.png", sold: 120, createdAt: Date.now() - 31000000 },
  { id: 32, name: "Exoesqueleto Avanzado", category: "Tecnológicos", price: 370, description: "Un traje robótico que multiplica tu fuerza y resistencia.", image: "/imagenes/esqueleto.png", sold: 60, createdAt: Date.now() - 32000000 },

  { id: 33, name: "Invisibilidad", category: "Místicos", price: 310, description: "Hazte invisible a voluntad y muévete sin ser detectado.", image: "/imagenes/invi.png", sold: 140, createdAt: Date.now() - 33000000 },
  { id: 34, name: "Invocación de Espíritus", category: "Místicos", price: 340, description: "Llama a entidades del más allá para que luchen a tu lado.", image: "/imagenes/invocar.png", sold: 70, createdAt: Date.now() - 34000000 },
  { id: 35, name: "Magia Oscura", category: "Místicos", price: 400, description: "Canaliza energías prohibidas para desatar hechizos devastadores.", image: "/imagenes/magia.png", sold: 90, createdAt: Date.now() - 35000000 },
  { id: 36, name: "Teletransportación", category: "Místicos", price: 380, description: "Desaparece en un lugar y aparece instantáneamente en otro.", image: "/imagenes/teleport.png", sold: 160, createdAt: Date.now() - 36000000 },
  { id: 37, name: "Encantamientos", category: "Místicos", price: 260, description: "Imbuye objetos con magia para potenciar sus habilidades.", image: "/imagenes/encantamiento.png", sold: 130, createdAt: Date.now() - 37000000 },
  { id: 38, name: "Viaje Astral", category: "Místicos", price: 290, description: "Proyecta tu espíritu fuera del cuerpo y explora otras dimensiones.", image: "/imagenes/viaje.png", sold: 110, createdAt: Date.now() - 38000000 },
  { id: 39, name: "Manipulación del Tiempo", category: "Místicos", price: 500, description: "Detén, acelera o retrocede el tiempo a tu voluntad.", image: "/imagenes/tiempo.png", sold: 40, createdAt: Date.now() - 39000000 },
  { id: 40, name: "Alquimia", category: "Místicos", price: 280, description: "Transmuta metales, crea pociones y altera la materia misma.", image: "/imagenes/alquimia.png", sold: 100, createdAt: Date.now() - 40000000 },

 
  { id: 41, name: "Regeneración Rápida", category: "Curativos", price: 310, description: "Sana cortes, golpes y fracturas en segundos.", image: "/imagenes/regeneracion_rapida.png", sold: 180, createdAt: Date.now() - 41000000 },
  { id: 42, name: "Curación Celular", category: "Curativos", price: 330, description: "Tus células se regeneran constantemente, evitando enfermedades.", image: "/imagenes/curacion_celular.png", sold: 160, createdAt: Date.now() - 42000000 },
  { id: 43, name: "Inmunidad Absoluta", category: "Curativos", price: 280, description: "Vuelve tu cuerpo inmune a cualquier virus, bacteria o veneno.", image: "/imagenes/inmunidad_absoluta.png", sold: 150, createdAt: Date.now() - 43000000 },
  { id: 44, name: "Aura Sanadora", category: "Curativos", price: 350, description: "Emite un aura que cura a los que te rodean.", image: "/imagenes/aura_sanadora.png", sold: 200, createdAt: Date.now() - 44000000 },
  { id: 45, name: "Resurrección", category: "Curativos", price: 500, description: "Devuelve la vida a quienes han caído en combate.", image:"/imagenes/revivir.png", sold: 30, createdAt: Date.now() - 45000000 },
  { id: 46, name: "Purificación", category: "Curativos", price: 260, description: "Elimina toxinas, maldiciones y energías negativas.", image: "/imagenes/purificar.png", sold: 90, createdAt: Date.now() - 46000000 },
  { id: 47, name: "Longevidad", category: "Curativos", price: 400, description: "Extiende tu esperanza de vida durante siglos sin envejecer.", image: "/imagenes/longevidad.png", sold: 70, createdAt: Date.now() - 47000000 },
  { id: 48, name: "Reanimación", category: "Curativos", price: 370, description: "Recupera a los heridos en estado crítico con un toque.", image: "/imagenes/reanimar.png", sold: 110, createdAt: Date.now() - 48000000 },
  { id: 49, name: "Escudo Vital", category: "Curativos", price: 310, description: "Crea un campo de energía que absorbe daño y lo transforma en curación.", image: "/imagenes/escudo.png", sold: 130, createdAt: Date.now() - 49000000 },
  { id: 50, name: "Manos de Luz", category: "Curativos", price: 290, description: "Canaliza energía sanadora directamente desde tus manos.", image: "/imagenes/manos_luz.png", sold: 175, createdAt: Date.now() - 50000000 }
];
