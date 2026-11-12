
# Matrix Tab

> A small Matrix-inspired New Tab project, with digital rain, quick shortcuts, search, and an interactive terminal.

---

## Table of Contents

- [English](#english)
- [Português](#português)
- [Español](#español)

---

# English

## About

**Matrix Tab** is a small personal project that turns the browser's New Tab page into a space inspired by the Matrix universe.

I started this project because I wanted to create something with a cyberpunk look while making my new tab a little more useful. It brings together a digital rain animation, a clock, search, shortcuts, and a built-in terminal.

This is an independent project that I develop on my own. I'm still learning, experimenting, and improving things as I go. It may have bugs or unfinished parts, and that's part of the process.

## Features

- **Matrix Rain:** Animated background created with HTML Canvas.
- **Live Clock:** Displays the current time, including seconds.
- **Dynamic Date:** Shows the current day, month, and year.
- **Quick Search:** Search the web using Google or open a website address directly.
- **Default Shortcuts:** Quick links to GitHub, YouTube, ChatGPT, and Stack Overflow.
- **Custom Shortcuts:** Add your own website shortcuts.
- **Shortcut Removal:** Remove shortcuts using right-click or a long press on mobile.
- **Interactive Terminal:** A small command line with its own set of commands.
- **Draggable Terminal:** Move the terminal around the screen.
- **Terminal Controls:** Close, minimize, expand, and restore the terminal.
- **Saved Position:** The terminal remembers its last position.
- **Mobile Support:** The layout and interactions are designed with mobile devices in mind.

## Terminal Commands

The terminal currently supports these commands:

| Command | Description |
| --- | --- |
| `help` | Shows the available commands. |
| `clear` | Clears the terminal history. |
| `limpar` | Also clears the terminal history. |
| `date` | Displays the current date. |
| `time` | Displays the current time. |
| `whoami` | Displays the simulated user name. |
| `about` | Shows the project name and version. |

Some examples:

```bash
help
date
time
whoami
about
clear
```

The terminal is still simple. I'd like to add more commands and possibilities in the future.

## Installation

Matrix Tab is not currently published on the Chrome Web Store. You can try it by loading the project manually in a compatible Chromium-based browser.

1. Download or clone this repository.
2. Open your browser's extensions page by visiting `chrome://extensions/`.
3. Enable **Developer mode**.
4. Select **Load unpacked**.
5. Choose the folder containing the Matrix Tab files.
6. Open a new tab to see the extension.

The exact steps may vary depending on your browser and device.

## Compatibility

The project is built with HTML, CSS, and vanilla JavaScript, without a framework.

- **Tested:** Lemur Browser on Android.
- **Not fully verified:** Google Chrome, Microsoft Edge, Brave, and other Chromium-based browsers.
- **Mobile:** Improving the mobile experience is one of my priorities, but behavior may vary between devices.

If you try it on another browser, feedback is welcome.

## Privacy

I want to keep this project simple and transparent.

- The extension runs locally in the browser.
- There is no project account system or backend server.
- I have not added analytics or telemetry to track users.
- Custom shortcuts and the terminal position are saved in the browser's local storage.
- Search requests and website shortcuts may open external websites.

The project currently declares the `storage` permission in its manifest. Permissions and behavior may change as development continues.

This is a personal project, so I cannot make absolute security or privacy guarantees.

## Project Structure

```text
matrix-tab/
│
├── LICENSE
├── README.md
├── index.html
├── manifest.json
├── script.js
└── style.css
```

## Roadmap

There are a few things I'd like to work on as the project grows:

- Add more terminal commands.
- Improve mobile usability and stability.
- Continue improving animation performance.
- Test the extension on more Chromium-based browsers.
- Explore visual customization options.
- Fix bugs and improve existing features.

This is just a list of ideas, not a fixed schedule. Things may change as I learn and find time to work on the project.

## Contributions

Matrix Tab is a personal hobby project, and I'm currently the only person working on it.

If you find a bug, have an idea, or simply want to share your opinion, I'd be happy to hear from you.

Contributions are welcome. You can open an Issue, suggest a feature, share feedback, or submit a Pull Request.

And if you enjoy the project, consider giving it a star on GitHub. It helps other people discover this little project and encourages me to keep working on it.

[⭐ Give Matrix Tab a star on GitHub](https://github.com/N0N-glitch/matrix-tab)

Thanks for taking the time to check it out!

## Bug Reports

If something doesn't work as expected, feel free to open an Issue.

If possible, include:

- Browser name and version.
- Operating system and device.
- What you were trying to do.
- What happened and what you expected.
- Steps to reproduce the problem.

Even a small report can help me understand what needs attention.

## Development Status

Matrix Tab is currently at version **1.0.0**.

I develop it independently, mainly using an Android phone for development and testing. I work on it in my free time, so updates may be irregular.

I can't promise a fixed update schedule, that every bug will be fixed, or that every suggestion will become a feature.

This project is mainly a way for me to learn, experiment, and build something I enjoy. It's not a commercial product or professionally maintained software.

## Version History

### [1.0.0] — Initial Release

The first public version of Matrix Tab includes:

- Matrix-inspired New Tab page.
- Animated digital rain background.
- Live clock and dynamic date.
- Quick shortcuts to GitHub, YouTube, ChatGPT, and Stack Overflow.
- Google search and direct website address handling.
- Custom shortcuts.
- Interactive terminal with basic commands.
- Draggable terminal with window controls.
- Manifest V3 extension setup.

This is just the beginning. There's still plenty I'd like to improve.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

# Português

## Sobre o Projeto

**Matrix Tab** é um pequeno projeto pessoal que transforma a página de Nova Aba do navegador num ambiente inspirado no universo Matrix.

Comecei este projeto porque queria criar algo com uma estética cyberpunk e, ao mesmo tempo, tornar a minha nova aba um pouco mais útil. A ideia é reunir uma animação de chuva digital, um relógio, pesquisa, atalhos e um terminal integrado.

Este é um projeto independente, desenvolvido por mim. Ainda estou aprendendo, experimentando e melhorando as coisas aos poucos. Podem existir erros ou partes por terminar, e isso faz parte do processo.

## Funcionalidades

- **Chuva Matrix:** Fundo animado criado com HTML Canvas.
- **Relógio em Tempo Real:** Mostra as horas, incluindo os segundos.
- **Data Dinâmica:** Apresenta o dia, o mês e o ano.
- **Pesquisa Rápida:** Pesquisa na internet pelo Google ou abre diretamente um endereço de site.
- **Atalhos Padrão:** Acesso rápido ao GitHub, YouTube, ChatGPT e Stack Overflow.
- **Atalhos Personalizados:** Permite adicionar os teus próprios sites.
- **Remoção de Atalhos:** Remove atalhos com clique direito ou toque prolongado no telemóvel.
- **Terminal Interativo:** Uma pequena linha de comandos com funções próprias.
- **Terminal Arrastável:** Permite mover o terminal pela tela.
- **Controles do Terminal:** Fechar, minimizar, expandir e restaurar a janela.
- **Posição Salva:** O terminal guarda a sua última posição.
- **Suporte para Telemóveis:** A interface e as interações também são pensadas para dispositivos móveis.

## Comandos do Terminal

Atualmente, o terminal suporta estes comandos:

| Comando | Descrição |
| --- | --- |
| `help` | Mostra os comandos disponíveis. |
| `clear` | Limpa o histórico do terminal. |
| `limpar` | Também limpa o histórico do terminal. |
| `date` | Mostra a data atual. |
| `time` | Mostra a hora atual. |
| `whoami` | Mostra um nome de utilizador simulado. |
| `about` | Mostra o nome e a versão do projeto. |

Alguns exemplos:

```bash
help
date
time
whoami
about
clear
```

O terminal ainda é simples. Gostaria de adicionar mais comandos e possibilidades no futuro.

## Instalação

O Matrix Tab ainda não está publicado na Chrome Web Store. Por enquanto, podes experimentar a extensão carregando o projeto manualmente num navegador compatível baseado em Chromium.

1. Descarrega ou clona este repositório.
2. Abre a página de extensões do navegador através de `chrome://extensions/`.
3. Ativa o **Modo de programador**.
4. Seleciona **Carregar sem compactação**.
5. Escolhe a pasta que contém os ficheiros do Matrix Tab.
6. Abre um novo separador para experimentar a extensão.

Os passos podem variar conforme o navegador e o dispositivo.

## Compatibilidade

O projeto foi desenvolvido com HTML, CSS e JavaScript puro, sem utilizar frameworks.

- **Testado:** Lemur Browser no Android.
- **Ainda não totalmente verificado:** Google Chrome, Microsoft Edge, Brave e outros navegadores baseados em Chromium.
- **Telemóveis:** Melhorar a experiência em dispositivos móveis é uma das minhas prioridades, mas o funcionamento pode variar conforme o dispositivo.

Se experimentares noutro navegador, qualquer feedback será bem-vindo.

## Privacidade

Quero manter este projeto simples e transparente.

- A extensão funciona localmente no navegador.
- Não existe sistema de contas nem servidor backend do projeto.
- Não adicionei ferramentas de análise ou telemetria para acompanhar os utilizadores.
- Os atalhos personalizados e a posição do terminal são guardados no armazenamento local do navegador.
- As pesquisas e os atalhos podem abrir sites externos.

O projeto declara atualmente a permissão `storage` no manifesto. As permissões e o funcionamento podem mudar à medida que o desenvolvimento continua.

Por ser um projeto pessoal, não posso oferecer garantias absolutas de segurança ou privacidade.

## Estrutura do Projeto

```text
matrix-tab/
│
├── LICENSE
├── README.md
├── index.html
├── manifest.json
├── script.js
└── style.css
```

## Planos Futuros

Há algumas coisas que gostaria de melhorar à medida que o projeto for crescendo:

- Adicionar mais comandos ao terminal.
- Melhorar a experiência e a estabilidade em dispositivos móveis.
- Continuar a otimizar o desempenho das animações.
- Testar a extensão em mais navegadores baseados em Chromium.
- Explorar opções de personalização visual.
- Corrigir erros e melhorar as funcionalidades existentes.

Esta lista é apenas um conjunto de ideias, não um calendário fixo. Os planos podem mudar conforme vou aprendendo e encontrando tempo para trabalhar no projeto.

## Contribuições

O Matrix Tab é um projeto pessoal, desenvolvido como hobby, e atualmente sou a única pessoa a trabalhar nele.

Se encontrares algum erro, tiveres uma ideia ou simplesmente quiseres partilhar a tua opinião, ficarei contente por saber.

Contribuições são bem-vindas. Podes abrir uma Issue, sugerir uma funcionalidade, enviar feedback ou criar um Pull Request.

E, se gostaste do projeto, considera deixar uma estrela no GitHub. Isso ajuda outras pessoas a descobrirem este pequeno projeto e dá-me motivação para continuar a trabalhar nele.

[⭐ Dá uma estrela ao Matrix Tab no GitHub](https://github.com/N0N-glitch/matrix-tab)

Obrigado por tirares um pouco do teu tempo para conhecer o projeto!

## Como Reportar Problemas

Se alguma coisa não funcionar como esperado, podes abrir uma Issue.

Se possível, inclui:

- Nome e versão do navegador.
- Sistema operativo e dispositivo.
- O que estavas a tentar fazer.
- O que aconteceu e o que esperavas que acontecesse.
- Passos para reproduzir o problema.

Mesmo um pequeno relato pode ajudar a perceber o que precisa de atenção.

## Estado do Desenvolvimento

O Matrix Tab encontra-se atualmente na versão **1.0.0**.

Desenvolvo o projeto de forma independente, principalmente através de um telemóvel Android, que também utilizo para testar. Por isso, trabalho nele no meu tempo livre e as atualizações podem ser irregulares.

Não posso prometer uma frequência fixa de atualizações, a correção de todos os erros ou a implementação de todas as sugestões.

Este projeto é, acima de tudo, uma forma de aprender, experimentar e construir algo de que gosto. Não é um produto comercial nem um software mantido profissionalmente.

## Histórico de Versões

### [1.0.0] — Lançamento Inicial

A primeira versão pública do Matrix Tab inclui:

- Página de Nova Aba inspirada em Matrix.
- Fundo animado de chuva digital.
- Relógio em tempo real e data dinâmica.
- Atalhos para GitHub, YouTube, ChatGPT e Stack Overflow.
- Pesquisa pelo Google e abertura direta de endereços.
- Atalhos personalizados.
- Terminal interativo com comandos básicos.
- Terminal arrastável com controles de janela.
- Configuração da extensão com Manifest V3.

Este é apenas o começo. Ainda há muita coisa que gostaria de melhorar.

## Licença

Este projeto está licenciado sob a **Licença MIT**. Consulta o ficheiro [LICENSE](LICENSE) para mais detalhes.

---

# Español

## Acerca del Proyecto

**Matrix Tab** es un pequeño proyecto personal que transforma la página de Nueva Pestaña del navegador en un entorno inspirado en el universo Matrix.

Empecé este proyecto porque quería crear algo con una estética cyberpunk y, al mismo tiempo, hacer que mi nueva pestaña fuera un poco más útil. La idea es reunir una animación de lluvia digital, un reloj, búsqueda, accesos directos y una terminal integrada.

Este es un proyecto independiente, desarrollado por mí. Todavía estoy aprendiendo, experimentando y mejorando las cosas poco a poco. Puede haber errores o partes sin terminar, y eso también forma parte del proceso.

## Funcionalidades

- **Lluvia Matrix:** Fondo animado creado con HTML Canvas.
- **Reloj en Tiempo Real:** Muestra la hora, incluidos los segundos.
- **Fecha Dinámica:** Muestra el día, el mes y el año.
- **Búsqueda Rápida:** Busca en Internet mediante Google o abre directamente una dirección web.
- **Accesos Directos Predeterminados:** Enlaces rápidos a GitHub, YouTube, ChatGPT y Stack Overflow.
- **Accesos Personalizados:** Permite añadir tus propios sitios web.
- **Eliminación de Accesos:** Permite eliminar accesos con clic derecho o una pulsación larga en el móvil.
- **Terminal Interactiva:** Una pequeña línea de comandos con funciones propias.
- **Terminal Desplazable:** Permite mover la terminal por la pantalla.
- **Controles de la Terminal:** Cerrar, minimizar, ampliar y restaurar la ventana.
- **Posición Guardada:** La terminal recuerda su última posición.
- **Soporte para Móviles:** La interfaz y las interacciones también están pensadas para dispositivos móviles.

## Comandos de la Terminal

Actualmente, la terminal admite estos comandos:

| Comando | Descripción |
| --- | --- |
| `help` | Muestra los comandos disponibles. |
| `clear` | Limpia el historial de la terminal. |
| `limpar` | También limpia el historial de la terminal. |
| `date` | Muestra la fecha actual. |
| `time` | Muestra la hora actual. |
| `whoami` | Muestra un nombre de usuario simulado. |
| `about` | Muestra el nombre y la versión del proyecto. |

Algunos ejemplos:

```bash
help
date
time
whoami
about
clear
```

La terminal todavía es sencilla. Me gustaría añadir más comandos y posibilidades en el futuro.

## Instalación

Matrix Tab todavía no está publicado en Chrome Web Store. Por ahora, puedes probar la extensión cargando el proyecto manualmente en un navegador compatible basado en Chromium.

1. Descarga o clona este repositorio.
2. Abre la página de extensiones de tu navegador visitando `chrome://extensions/`.
3. Activa el **Modo de desarrollador**.
4. Selecciona **Cargar descomprimida**.
5. Elige la carpeta que contiene los archivos de Matrix Tab.
6. Abre una nueva pestaña para probar la extensión.

Los pasos pueden variar según el navegador y el dispositivo.

## Compatibilidad

El proyecto está desarrollado con HTML, CSS y JavaScript puro, sin utilizar frameworks.

- **Probado:** Lemur Browser en Android.
- **Aún no verificado por completo:** Google Chrome, Microsoft Edge, Brave y otros navegadores basados en Chromium.
- **Móviles:** Mejorar la experiencia en dispositivos móviles es una de mis prioridades, pero el funcionamiento puede variar según el dispositivo.

Si lo pruebas en otro navegador, cualquier comentario será bienvenido.

## Privacidad

Quiero mantener este proyecto sencillo y transparente.

- La extensión funciona localmente en el navegador.
- No existe un sistema de cuentas ni un servidor backend del proyecto.
- No he añadido herramientas de análisis ni telemetría para rastrear a los usuarios.
- Los accesos personalizados y la posición de la terminal se guardan en el almacenamiento local del navegador.
- Las búsquedas y los accesos directos pueden abrir sitios externos.

El proyecto declara actualmente el permiso `storage` en el manifiesto. Los permisos y el funcionamiento pueden cambiar a medida que continúa el desarrollo.

Al ser un proyecto personal, no puedo ofrecer garantías absolutas de seguridad o privacidad.

## Estructura del Proyecto

```text
matrix-tab/
│
├── LICENSE
├── README.md
├── index.html
├── manifest.json
├── script.js
└── style.css
```

## Planes Futuros

Hay algunas cosas que me gustaría mejorar a medida que el proyecto vaya creciendo:

- Añadir más comandos a la terminal.
- Mejorar la experiencia y la estabilidad en dispositivos móviles.
- Seguir optimizando el rendimiento de las animaciones.
- Probar la extensión en más navegadores basados en Chromium.
- Explorar opciones de personalización visual.
- Corregir errores y mejorar las funciones existentes.

Esta lista es solo un conjunto de ideas, no un calendario fijo. Los planes pueden cambiar según lo que vaya aprendiendo y el tiempo que tenga para trabajar en el proyecto.

## Contribuciones

Matrix Tab es un proyecto personal, desarrollado como hobby, y actualmente soy la única persona que trabaja en él.

Si encuentras algún error, tienes una idea o simplemente quieres compartir tu opinión, me alegrará saberlo.

Las contribuciones son bienvenidas. Puedes abrir una Issue, sugerir una función, compartir comentarios o enviar un Pull Request.

Y si te gusta el proyecto, considera darle una estrella en GitHub. Eso ayuda a que otras personas descubran este pequeño proyecto y me anima a seguir trabajando en él.

[⭐ Dale una estrella a Matrix Tab en GitHub](https://github.com/N0N-glitch/matrix-tab)

¡Gracias por dedicar un poco de tu tiempo a conocer el proyecto!

## Cómo Reportar Problemas

Si algo no funciona como debería, puedes abrir una Issue.

Si es posible, incluye:

- Nombre y versión del navegador.
- Sistema operativo y dispositivo.
- Qué estabas intentando hacer.
- Qué ocurrió y qué esperabas que ocurriera.
- Pasos para reproducir el problema.

Incluso un informe pequeño puede ayudar a entender qué necesita atención.

## Estado del Desarrollo

Matrix Tab se encuentra actualmente en la versión **1.0.0**.

Desarrollo el proyecto de forma independiente, principalmente utilizando un teléfono Android, que también uso para probarlo. Por eso, trabajo en él en mi tiempo libre y las actualizaciones pueden ser irregulares.

No puedo prometer una frecuencia fija de actualizaciones, que todos los errores se solucionen o que todas las sugerencias se conviertan en funciones.

Este proyecto es, sobre todo, una forma de aprender, experimentar y construir algo que me gusta. No es un producto comercial ni un software mantenido profesionalmente.

## Historial de Versiones

### [1.0.0] — Lanzamiento Inicial

La primera versión pública de Matrix Tab incluye:

- Página de Nueva Pestaña inspirada en Matrix.
- Fondo animado de lluvia digital.
- Reloj en tiempo real y fecha dinámica.
- Accesos directos a GitHub, YouTube, ChatGPT y Stack Overflow.
- Búsqueda mediante Google y apertura directa de direcciones web.
- Accesos personalizados.
- Terminal interactiva con comandos básicos.
- Terminal desplazable con controles de ventana.
- Configuración de la extensión mediante Manifest V3.

Este es solo el comienzo. Todavía hay muchas cosas que me gustaría mejorar.

## Licencia

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo [LICENSE](LICENSE) para obtener más información.
