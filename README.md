# Matrix Tab

> Transform your New Tab into a small Matrix-inspired space, with a digital rain animation, useful shortcuts, and an interactive terminal.

<!-- GitHub badges -->
[![Version](https://img.shields.io/badge/version-1.0.0-00C853?style=for-the-badge)](https://github.com/N0N-glitch/matrix-tab)
[![License](https://img.shields.io/github/license/N0N-glitch/matrix-tab?style=for-the-badge)](LICENSE)
[![Stars](https://img.shields.io/github/stars/N0N-glitch/matrix-tab?style=for-the-badge)](https://github.com/N0N-glitch/matrix-tab/stargazers)
[![Issues](https://img.shields.io/github/issues/N0N-glitch/matrix-tab?style=for-the-badge)](https://github.com/N0N-glitch/matrix-tab/issues)

---

## Table of Contents

- [English](#english)
- [Português](#português)
- [Español](#español)

---

# English

## About

**Matrix Tab** is a small personal project that turns the browser's New Tab page into a Matrix-inspired environment.

I started this project because I wanted to create something with a cyberpunk look while also making my new tab a little more useful. It brings together a digital rain animation, a clock, quick links, and a built-in terminal.

This is an independent project that I develop and maintain on my own. It's still at an early stage, so there may be bugs, missing features, or things that don't work perfectly on every browser. I'm learning and improving it as I go.

## Features

- **Matrix Rain Animation:** A moving background inspired by the classic digital rain effect, created with HTML Canvas.
- **Live Clock:** Displays the current time, including hours, minutes, and seconds.
- **Dynamic Date:** Shows the current date with the weekday, month, and year.
- **Quick Shortcuts:** Direct links to GitHub, YouTube, ChatGPT, and Stack Overflow.
- **Interactive Terminal:** A built-in command line with a small collection of useful commands.
- **Minimal Cyberpunk Interface:** A dark visual style with green elements inspired by the Matrix aesthetic.

## Terminal Commands

The terminal currently supports these commands:

| Command | Description |
| --- | --- |
| `help` | Displays the available commands. |
| `clear` | Clears the terminal history. |
| `open [site]` | Opens a website in a new tab. |
| `echo [text]` | Displays a custom message in the terminal. |
| `date` | Displays the current date and time. |

Some examples:

```bash
help
date
echo Hello, Matrix!
open github
open youtube
open google
```

The `open` command recognizes some common websites and can also build a URL from a domain name.

## Installation

Matrix Tab is not currently published on the Chrome Web Store. You can try it by loading the project manually in a compatible Chromium-based browser.

1. Download or clone this repository.
2. Open your browser's extensions page by visiting `chrome://extensions/`.
3. Enable **Developer mode**.
4. Select **Load unpacked**.
5. Choose the folder containing the Matrix Tab files.
6. Open a new tab to see the extension in action.

The exact installation steps may vary depending on the browser and device.

## Compatibility

The project is built with HTML, CSS, and vanilla JavaScript, without a framework.

- **Tested:** Lemur Browser on Android.
- **Not fully verified:** Google Chrome, Microsoft Edge, Brave, and other Chromium-based browsers.
- **Mobile:** Mobile use is one of the things I care about, but the experience may vary between devices and browsers.

If you try it on another browser, feedback about how it works is very welcome.

## Privacy & Security

I want to keep this project simple and transparent.

- The extension runs locally in the browser.
- There is no project account system or backend server.
- I have not added analytics or telemetry to track users.
- The shortcuts and terminal's `open` command open external websites when requested.
- The current manifest declares the `storage` permission. The published code should be reviewed as the project evolves, and permissions may change in future versions.

I do my best to keep the project straightforward, but this is a personal project and I cannot make absolute security or privacy guarantees.

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

## Roadmap & Future Plans

There are a few things I'd like to explore as the project grows:

- Add more commands and possibilities to the terminal.
- Improve the mobile experience.
- Keep working on animation performance and overall stability.
- Test compatibility with more Chromium-based browsers.
- Explore visual customization options.
- Fix bugs and improve the documentation.

This roadmap is just a direction, not a promise or a fixed release schedule. Plans may change as I learn and find time to work on the project.

## Contributions & Community

Matrix Tab is a personal hobby project, and I'm currently the only person working on it.

If you find it interesting, have an idea, notice a bug, or simply want to share your thoughts, I'd genuinely appreciate hearing from you.

Contributions are welcome! You can open an Issue, suggest a feature, share feedback, or submit a Pull Request.

And if you enjoy the project, **consider giving it a star on GitHub**. It may seem like a small thing, but for a small independent project like this, every star helps with visibility and encourages me to keep improving it.

[⭐ Give Matrix Tab a star on GitHub](https://github.com/N0N-glitch/matrix-tab)

Thank you for taking the time to check out my project!

## Bug Reports

If something doesn't work as expected, feel free to open an Issue.

It helps a lot if you include:

- Browser name and version.
- Operating system and device.
- What you were trying to do.
- What happened and what you expected to happen.
- Steps to reproduce the problem, if possible.

Even a small report can help me understand what needs attention.

## Development Status & Disclaimer

Matrix Tab is still a young project, currently at version **1.0.0**.

I work on it independently, mainly using an Android phone for development and testing. Because of that, development happens in my free time and updates may be irregular.

I can't promise a fixed update schedule, that every bug will be fixed, or that every suggestion will become a feature. Some parts may change as the project develops.

This project is mainly a way for me to learn, experiment, and build something I enjoy. It is not a commercial product or professionally maintained software.

## Version History

### [1.0.0] — Initial Release

The first public version of Matrix Tab. It brings the basic experience together:

- Created the New Tab page with a Matrix-inspired visual style.
- Added the animated digital rain background using HTML Canvas.
- Added a live clock displaying hours, minutes, and seconds.
- Added a dynamic date display.
- Added quick shortcuts to GitHub, YouTube, ChatGPT, and Stack Overflow.
- Built the first interactive terminal.
- Added the `help`, `clear`, `open`, `echo`, and `date` commands.
- Set up the Chromium extension manifest using Manifest V3.

This is the starting point of the project. There's still plenty I'd like to improve, but I'm happy to have the first version out there.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

# Português

## Sobre o Projeto

**Matrix Tab** é um pequeno projeto pessoal que transforma a página de Nova Aba do navegador num ambiente inspirado no universo Matrix.

Comecei este projeto porque queria criar algo com uma estética cyberpunk e, ao mesmo tempo, tornar a minha nova aba um pouco mais útil. A ideia é juntar uma animação de chuva digital, um relógio, atalhos rápidos e um terminal integrado.

Este é um projeto independente, desenvolvido e mantido por mim. Ainda está numa fase inicial, por isso podem existir erros, funcionalidades por terminar ou comportamentos diferentes dependendo do navegador. Vou aprendendo e melhorando o projeto ao longo do caminho.

## Funcionalidades

- **Animação Matrix:** Fundo animado inspirado no clássico efeito de chuva digital, criado com HTML Canvas.
- **Relógio em Tempo Real:** Mostra as horas, minutos e segundos.
- **Data Dinâmica:** Apresenta o dia da semana, o mês e o ano.
- **Atalhos Rápidos:** Ligações diretas para GitHub, YouTube, ChatGPT e Stack Overflow.
- **Terminal Interativo:** Uma linha de comandos integrada com algumas funções úteis.
- **Interface Cyberpunk:** Visual escuro com elementos verdes, inspirado na estética de Matrix.

## Comandos do Terminal

Atualmente, o terminal suporta os seguintes comandos:

| Comando | Descrição |
| --- | --- |
| `help` | Mostra os comandos disponíveis. |
| `clear` | Limpa o histórico do terminal. |
| `open [site]` | Abre um site num novo separador. |
| `echo [texto]` | Exibe uma mensagem personalizada no terminal. |
| `date` | Mostra a data e a hora atuais. |

Alguns exemplos:

```bash
help
date
echo Olá, Matrix!
open github
open youtube
open google
```

O comando `open` reconhece alguns sites conhecidos e também consegue criar um endereço a partir de um domínio.

## Instalação

O Matrix Tab ainda não está publicado na Chrome Web Store. Por enquanto, é possível experimentar a extensão carregando o projeto manualmente num navegador compatível baseado em Chromium.

1. Descarrega ou clona este repositório.
2. Abre a página de extensões do navegador através de `chrome://extensions/`.
3. Ativa o **Modo de programador**.
4. Seleciona **Carregar sem compactação**.
5. Escolhe a pasta que contém os ficheiros do Matrix Tab.
6. Abre um novo separador para experimentar a extensão.

Os passos exatos podem variar conforme o navegador e o dispositivo.

## Compatibilidade

O projeto foi desenvolvido com HTML, CSS e JavaScript puro, sem recorrer a frameworks.

- **Testado:** Lemur Browser no Android.
- **Ainda não totalmente verificado:** Google Chrome, Microsoft Edge, Brave e outros navegadores baseados em Chromium.
- **Telemóveis:** A experiência em dispositivos móveis é uma das minhas prioridades, mas pode variar conforme o dispositivo e o navegador.

Se experimentares noutro navegador, qualquer feedback sobre o funcionamento será muito bem-vindo.

## Privacidade e Segurança

Quero manter este projeto simples e transparente.

- A extensão funciona localmente no navegador.
- Não existe sistema de contas nem servidor backend do projeto.
- Não adicionei ferramentas de análise ou telemetria para acompanhar os utilizadores.
- Os atalhos e o comando `open` do terminal abrem sites externos quando solicitado.
- O manifesto atual declara a permissão `storage`. O código publicado deve ser revisto à medida que o projeto evolui, e as permissões podem mudar em versões futuras.

Faço o possível para manter o projeto simples, mas trata-se de um projeto pessoal e não posso oferecer garantias absolutas de segurança ou privacidade.

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

Há algumas coisas que gostaria de explorar à medida que o projeto for crescendo:

- Adicionar mais comandos e possibilidades ao terminal.
- Melhorar a experiência em dispositivos móveis.
- Continuar a otimizar o desempenho das animações e a estabilidade geral.
- Testar a compatibilidade com mais navegadores baseados em Chromium.
- Explorar opções de personalização visual.
- Corrigir erros e melhorar a documentação.

Este roteiro é apenas uma orientação, não uma promessa nem um calendário fixo de lançamentos. Os planos podem mudar conforme vou aprendendo e encontrando tempo para trabalhar no projeto.

## Contribuições e Comunidade

O Matrix Tab é um projeto pessoal, desenvolvido como hobby, e atualmente sou a única pessoa a trabalhar nele.

Se achaste o projeto interessante, tiveste alguma ideia, encontraste um erro ou simplesmente queres partilhar a tua opinião, ficarei mesmo contente por saber.

Contribuições são bem-vindas! Podes abrir uma Issue, sugerir uma funcionalidade, enviar feedback ou criar um Pull Request.

E, se gostaste do projeto, **considera deixar uma estrela no GitHub**. Pode parecer um gesto pequeno, mas, num projeto independente e ainda pequeno como este, cada estrela ajuda a dar-lhe mais visibilidade e dá-me motivação para continuar a melhorá-lo.

[⭐ Dá uma estrela ao Matrix Tab no GitHub](https://github.com/N0N-glitch/matrix-tab)

Obrigado por tirares um pouco do teu tempo para conhecer o meu projeto!

## Como Reportar Problemas

Se alguma coisa não funcionar como esperado, podes abrir uma Issue.

Se possível, inclui:

- Nome e versão do navegador.
- Sistema operativo e dispositivo.
- O que estavas a tentar fazer.
- O que aconteceu e o que esperavas que acontecesse.
- Passos para reproduzir o problema, se possível.

Mesmo um pequeno relato pode ajudar-me a perceber o que precisa de atenção.

## Estado do Desenvolvimento e Aviso

O Matrix Tab ainda é um projeto recente e encontra-se atualmente na versão **1.0.0**.

Desenvolvo-o de forma independente, principalmente através de um telemóvel Android, que também utilizo para testar o projeto. Por isso, o desenvolvimento acontece no meu tempo livre e as atualizações podem ser irregulares.

Não posso prometer uma frequência fixa de atualizações, a correção de todos os erros ou a implementação de todas as sugestões. Algumas partes podem mudar à medida que o projeto evolui.

Este projeto é, acima de tudo, uma forma de aprender, experimentar e construir algo de que gosto. Não é um produto comercial nem um software mantido profissionalmente.

## Histórico de Versões

### [1.0.0] — Lançamento Inicial

A primeira versão pública do Matrix Tab. Esta versão reúne a experiência inicial do projeto:

- Criação da página de Nova Aba com um visual inspirado em Matrix.
- Adição do fundo animado de chuva digital com HTML Canvas.
- Implementação de um relógio em tempo real, com horas, minutos e segundos.
- Adição da apresentação dinâmica da data.
- Criação de atalhos rápidos para GitHub, YouTube, ChatGPT e Stack Overflow.
- Desenvolvimento do primeiro terminal interativo.
- Implementação dos comandos `help`, `clear`, `open`, `echo` e `date`.
- Configuração da extensão Chromium com Manifest V3.

Este é apenas o ponto de partida. Ainda há muita coisa que gostaria de melhorar, mas fico contente por finalmente ter a primeira versão disponível.

## Licença

Este projeto está licenciado sob a **Licença MIT**. Consulta o ficheiro [LICENSE](LICENSE) para mais detalhes.

---

# Español

## Acerca del Proyecto

**Matrix Tab** es un pequeño proyecto personal que transforma la página de Nueva Pestaña del navegador en un entorno inspirado en el universo Matrix.

Empecé este proyecto porque quería crear algo con una estética cyberpunk y, al mismo tiempo, hacer que mi nueva pestaña fuera un poco más útil. La idea es reunir una animación de lluvia digital, un reloj, accesos directos y una terminal integrada.

Este es un proyecto independiente, desarrollado y mantenido por mí. Todavía está en una etapa inicial, así que puede haber errores, funciones pendientes o comportamientos diferentes según el navegador. Voy aprendiendo y mejorándolo poco a poco.

## Funcionalidades

- **Animación Matrix:** Fondo animado inspirado en el clásico efecto de lluvia digital, creado con HTML Canvas.
- **Reloj en Tiempo Real:** Muestra las horas, los minutos y los segundos.
- **Fecha Dinámica:** Presenta el día de la semana, el mes y el año.
- **Accesos Directos:** Enlaces directos a GitHub, YouTube, ChatGPT y Stack Overflow.
- **Terminal Interactiva:** Una línea de comandos integrada con algunas funciones útiles.
- **Interfaz Cyberpunk:** Diseño oscuro con elementos verdes, inspirado en la estética de Matrix.

## Comandos de la Terminal

Actualmente, la terminal admite los siguientes comandos:

| Comando | Descripción |
| --- | --- |
| `help` | Muestra los comandos disponibles. |
| `clear` | Limpia el historial de la terminal. |
| `open [sitio]` | Abre un sitio web en una nueva pestaña. |
| `echo [texto]` | Muestra un mensaje personalizado en la terminal. |
| `date` | Muestra la fecha y la hora actuales. |

Algunos ejemplos:

```bash
help
date
echo ¡Hola, Matrix!
open github
open youtube
open google
```

El comando `open` reconoce algunos sitios conocidos y también puede crear una dirección a partir de un dominio.

## Instalación

Matrix Tab todavía no está publicado en Chrome Web Store. Por ahora, puedes probar la extensión cargando el proyecto manualmente en un navegador compatible basado en Chromium.

1. Descarga o clona este repositorio.
2. Abre la página de extensiones de tu navegador visitando `chrome://extensions/`.
3. Activa el **Modo de desarrollador**.
4. Selecciona **Cargar descomprimida**.
5. Elige la carpeta que contiene los archivos de Matrix Tab.
6. Abre una nueva pestaña para probar la extensión.

Los pasos exactos pueden variar según el navegador y el dispositivo.

## Compatibilidad

El proyecto está desarrollado con HTML, CSS y JavaScript puro, sin utilizar frameworks.

- **Probado:** Lemur Browser en Android.
- **Aún no verificado por completo:** Google Chrome, Microsoft Edge, Brave y otros navegadores basados en Chromium.
- **Móviles:** La experiencia en dispositivos móviles es una de mis prioridades, pero puede variar según el dispositivo y el navegador.

Si lo pruebas en otro navegador, cualquier comentario sobre su funcionamiento será bienvenido.

## Privacidad y Seguridad

Quiero mantener este proyecto sencillo y transparente.

- La extensión funciona localmente en el navegador.
- No existe un sistema de cuentas ni un servidor backend del proyecto.
- No he añadido herramientas de análisis ni telemetría para rastrear a los usuarios.
- Los accesos directos y el comando `open` de la terminal abren sitios externos cuando se solicita.
- El manifiesto actual declara el permiso `storage`. El código publicado debe revisarse a medida que el proyecto evoluciona, y los permisos pueden cambiar en futuras versiones.

Hago lo posible por mantener el proyecto sencillo, pero es un proyecto personal y no puedo ofrecer garantías absolutas de seguridad o privacidad.

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

Hay algunas cosas que me gustaría explorar a medida que el proyecto vaya creciendo:

- Añadir más comandos y posibilidades a la terminal.
- Mejorar la experiencia en dispositivos móviles.
- Seguir optimizando el rendimiento de las animaciones y la estabilidad general.
- Probar la compatibilidad con más navegadores basados en Chromium.
- Explorar opciones de personalización visual.
- Corregir errores y mejorar la documentación.

Esta hoja de ruta es solo una orientación, no una promesa ni un calendario fijo de lanzamientos. Los planes pueden cambiar según lo que vaya aprendiendo y el tiempo que tenga para trabajar en el proyecto.

## Contribuciones y Comunidad

Matrix Tab es un proyecto personal, desarrollado como hobby, y actualmente soy la única persona que trabaja en él.

Si te parece interesante, tienes alguna idea, encuentras un error o simplemente quieres compartir tu opinión, me alegrará mucho saberlo.

¡Las contribuciones son bienvenidas! Puedes abrir una Issue, sugerir una función, compartir comentarios o enviar un Pull Request.

Y si te gusta el proyecto, **considera darle una estrella en GitHub**. Puede parecer un gesto pequeño, pero en un proyecto independiente y todavía pequeño como este, cada estrella ayuda a darle más visibilidad y me anima a seguir mejorándolo.

[⭐ Dale una estrella a Matrix Tab en GitHub](https://github.com/N0N-glitch/matrix-tab)

¡Gracias por dedicar un poco de tu tiempo a conocer mi proyecto!

## Cómo Reportar Problemas

Si algo no funciona como debería, puedes abrir una Issue.

Si es posible, incluye:

- Nombre y versión del navegador.
- Sistema operativo y dispositivo.
- Qué estabas intentando hacer.
- Qué ocurrió y qué esperabas que ocurriera.
- Pasos para reproducir el problema, si es posible.

Incluso un informe pequeño puede ayudarme a entender qué necesita atención.

## Estado del Desarrollo y Aviso

Matrix Tab todavía es un proyecto reciente y actualmente se encuentra en la versión **1.0.0**.

Lo desarrollo de forma independiente, principalmente utilizando un teléfono Android, que también uso para probar el proyecto. Por eso, el desarrollo se realiza en mi tiempo libre y las actualizaciones pueden ser irregulares.

No puedo prometer una frecuencia fija de actualizaciones, que todos los errores se solucionen o que todas las sugerencias se conviertan en funciones. Algunas partes pueden cambiar a medida que el proyecto evoluciona.

Este proyecto es, sobre todo, una forma de aprender, experimentar y construir algo que me gusta. No es un producto comercial ni un software mantenido profesionalmente.

## Historial de Versiones

### [1.0.0] — Lanzamiento Inicial

La primera versión pública de Matrix Tab. Esta versión reúne la experiencia inicial del proyecto:

- Creación de la página de Nueva Pestaña con un diseño inspirado en Matrix.
- Incorporación del fondo animado de lluvia digital mediante HTML Canvas.
- Implementación de un reloj en tiempo real, con horas, minutos y segundos.
- Incorporación de la fecha dinámica.
- Creación de accesos directos a GitHub, YouTube, ChatGPT y Stack Overflow.
- Desarrollo de la primera terminal interactiva.
- Implementación de los comandos `help`, `clear`, `open`, `echo` y `date`.
- Configuración de la extensión Chromium con Manifest V3.

Este es solo el punto de partida. Todavía hay muchas cosas que me gustaría mejorar, pero me alegra tener por fin la primera versión disponible.

## Licencia

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo [LICENSE](LICENSE) para obtener más información.
