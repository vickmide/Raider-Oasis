# RAIDER OASIS
## Descripción general
Juego multijugador online de aventura y rol. Ambientación basada en la exploración de ruinas egipcias donde el jugador deberá colaborar o competir con otros jugadores para derrotar a enemigos y conseguir valiosos tesoros.
##Mécanicas
Mecánica centrada en la exploración de mazmorras. El objetivo principal del jugador será recolectar tesoros a medida que derrota a enemigos o resuelve pequeños puzles que se le puedan presentar por el camino. Las mazmorras estarán definidas por diversas plantas, cada una compuesta por un número finito de salas que se generarán de forma aleatoria.

#### Sistema de Combate
Combate basado en la acción. El jugador podra realizar diferentes ataques a través del trazado de formas con el ratón sobre los enemigos, atacando cuerpo a cuerpo, o bien creando ataques mágicos u otros efectos especiales. Asimismo, también se podrá desplazar, y por tanto, esquivar, a través de clicks de ratón.

#### Sistema de progreso
El jugador prodrá progresar en el juego a través de la obtención de experiencia. Dicha experiencia es obtenible a partir de:
- Derrota de enimgos
- Hazañas y tesoros descubiertos

Complementariamente, también se podrán cambiar el equipamiento y armas del jugador, para así cambiar las estadísticas de combate. Más detalles de la economía del juego serán detallados en el documento de diseño de la Fase 2 del proyecto.

#### Sistema de modos de juego

Partiendo de está mécanica como base, podemos diferenciar dos modos principales de juego:
- Modo co-operativo "A por el jefe": modo en el que los jugadores co-operarán para conseguir avanzar por la mazmorra con el fin de acabar derrotando conjuntamente a un enemigo final. A pesar de que en este modo no se prioriza la competitividad, cada jugador tendrá su propia puntuación y ganará experiencia diferente según su destreza de juego.

- Modo competitivo "Cazatesoros": modo de juego más competitivo, donde el objetivo principal es conseguir la máxima puntuación al finalizar la partida. La principal fuente de puntuación consistirá en la obtención de tesoros escondidos por  la mazmorra, aunque los enemigos derrotados de forma adicional también serán añadidos a la puntuación final.

#### Sistema de interacción On-line
Los jugadores además de poder jugar unos contra otros a través de la red en los modos propuestos, podrán comunicarse entre ellos apartir de una pequeña interfaz con mensajes predeterminados que contenga: mensajes de animo, de estrategia, de ayuda, etc. Su objetivo es crear una via rápida y segura de comunicación que se centre solo en la comunicación necesaria para el juego.
Por otro lado, las partidas se organizarán en diferentes salas de jugadores, donde podrá haber desde un mínimo de dos, hasta un máximo de cuatro de ellos.

## Funcionalidades básicas del sistema
- Al iniciar una partida, el jugador deberá crear un usuario en caso de que no exista, donde el sistema deberá almacenar dicho usuario junto a sus datos para un uso posterior.
- Los datos de usuario contendrán datos como: avatar, nick, nivel, puntuación, equipamiento y objetos. El sistema podrá manipularlos de forma correcta y eficiente.
- El sistema contará con un chat con frases predeterminadas  para la comunicación entre jugadores.
- El sistema deberá sincronizar los datos entre los diversos jugadores, estando entre ellos la posición de estos, su avatar, vida, etc.
- El sistema soportará la existencia de diferentes salas para alojar partidas de jugadores. Dichas salas podrán ser tanto privadas (con un nombre y contraseña) como publicas, donde los jugadores se eligen de forma aleatoria.
- El sistema será capaz de responder a los diferentes tipos de navegares, adaptandose al dispositivo (responsive).
- Resto de requisitos necesarios para el desarrollo correcto de una partida como la descrita en este documento. Enfásis posterior de dichas carácterísticas en el documento de diseño de la Fase 2 del proyecto.