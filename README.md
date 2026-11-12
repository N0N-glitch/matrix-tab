
# Matrix Tab

> Give your browser's New Tab a new identity with a refined Matrix-inspired interface, digital rain, quick shortcuts, and an interactive terminal.

[![Version](https://img.shields.io/badge/version-2.0.0-00C853?style=for-the-badge)](https://github.com/N0N-glitch/matrix-tab)
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

**Matrix Tab** is a browser New Tab extension that transforms an ordinary new tab into a clean, interactive environment inspired by the Matrix universe.

Version 2.0 brings a more polished interface, improved navigation, a dedicated Normal Mode, and a more organized shortcut system while keeping the project lightweight and built with vanilla web technologies.

This is an independent project, developed and maintained as a personal learning experience.

## What's New in 2.0

- **Refined Interface:** Improved spacing, visual hierarchy, cards, controls, and responsive behavior.
- **Two Display Modes:** Switch between Matrix Mode and Normal Mode directly through the terminal.
- **Normal Mode:** Replaces the clock and date with a neutral MATRIX wordmark and removes the green Matrix aesthetic.
- **Digital Rain:** Animated Matrix background rendered with HTML Canvas.
- **Live Clock and Date:** Visible in Matrix Mode.
- **Quick Shortcuts:** Four shortcuts per page, with pagination and smooth transitions.
- **Shortcut Management:** Add and remove custom website shortcuts.
- **Search Bar:** Search the web or enter a website address.
- **Voice Search:** Available in browsers that support the Web Speech API.
- **Interactive Terminal:** Draggable terminal window with minimize and maximize controls.
- **Responsive Layout:** Improved support for smaller screens and mobile devices.
- **Reduced Motion Support:** Respects the operating system's reduced-motion preference.

## Terminal Commands

| Command | Description |
| --- | --- |
| `help` | Displays available commands. |
| `clear` | Clears terminal history. |
| `date` | Displays the current date. |
| `time` | Displays the current time. |
| `about` | Displays project information. |
| `echo [text]` | Prints a message in the terminal. |
| `open [site]` | Opens a website in a new tab. |
| `disable-matrix` or `dm` | Switches to Normal Mode. |
| `enable-matrix` or `em` | Returns to Matrix Mode. |

Examples:

```bash
help
about
date
time
echo Hello, Matrix!
open github
open youtube
dm
em
```

## Installation

Matrix Tab is not currently distributed through the Chrome Web Store. You can install it manually in a compatible Chromium-based browser.

1. Download or clone this repository.
2. Open your browser's extensions page at `chrome://extensions/`.
3. Enable **Developer mode**.
4. Select **Load unpacked**.
5. Choose the Matrix Tab project folder.
6. Open a new tab.

Installation steps may vary depending on the browser and device.

## Compatibility

Matrix Tab is built with HTML, CSS, and vanilla JavaScript. It does not require a framework or external JavaScript library.

- **Browser engine:** Designed for Chromium-based browsers.
- **Mobile:** The interface is designed to adapt to smaller screens.
- **Voice Search:** Depends on browser support for the Web Speech API.
- **Reduced Motion:** The Matrix animation respects the system accessibility preference.

Compatibility should be tested on each target browser and device. Behavior may vary.

## Privacy

- The extension runs locally in the browser.
- It does not use a project account system or backend server.
- It does not include analytics or telemetry.
- Shortcuts and terminal website commands open external websites when requested.
- Shortcut and display-mode preferences are stored locally in the browser.

The project aims to remain simple and transparent. No absolute privacy or security guarantees are made.

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

## Version History

### 2.0.0 — Interface and Experience Update

- Refined the overall interface and visual presentation.
- Added a dedicated Normal Mode with neutral colors.
- Replaced the clock and date with a MATRIX wordmark in Normal Mode.
- Improved the Matrix rain animation lifecycle.
- Added four-shortcut pagination.
- Added page navigation controls and indicators.
- Improved shortcut management and validation.
- Added voice search when supported by the browser.
- Improved responsive behavior and accessibility.
- Updated the terminal interface and command documentation.

### 1.0.0 — Initial Release

- Created the first Matrix-inspired New Tab page.
- Added the digital rain animation using HTML Canvas.
- Added a live clock and dynamic date.
- Added quick website shortcuts.
- Created the first interactive terminal.
- Configured the Chromium extension with Manifest V3.

## Contributions

Suggestions, bug reports, and contributions are welcome.

You can open an Issue to report a problem or suggest an improvement. Pull Requests are also welcome.

[⭐ Visit Matrix Tab on GitHub](https://github.com/N0N-glitch/matrix-tab)

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

# Português

## Sobre o Projeto

**Matrix Tab** é uma extensão para a página de Nova Aba do navegador que transforma uma página comum num ambiente interativo inspirado no universo Matrix.

A versão 2.0 traz uma interface mais refinada, navegação aprimorada, um Modo Normal dedicado e um sistema de atalhos mais organizado, mantendo o projeto leve e desenvolvido com tecnologias web nativas.

Este é um projeto independente, desenvolvido e mantido como uma experiência pessoal de aprendizagem.

## Novidades da Versão 2.0

- **Interface Refinada:** Melhorias nos espaçamentos, hierarquia visual, cartões, controles e adaptação a diferentes telas.
- **Dois Modos de Exibição:** Alternância entre o Modo Matrix e o Modo Normal através do terminal.
- **Modo Normal:** Substitui o relógio e a data pela palavra MATRIX em estilo neutro, sem a estética verde do Matrix.
- **Chuva Digital:** Fundo animado inspirado no Matrix, renderizado com HTML Canvas.
- **Relógio e Data:** Visíveis no Modo Matrix.
- **Atalhos Rápidos:** Quatro atalhos por página, com paginação e transições suaves.
- **Gestão de Atalhos:** Adição e remoção de atalhos personalizados.
- **Barra de Pesquisa:** Pesquisa na internet ou acesso direto a um endereço.
- **Pesquisa por Voz:** Disponível em navegadores compatíveis com a Web Speech API.
- **Terminal Interativo:** Janela arrastável, com opções para minimizar e maximizar.
- **Interface Responsiva:** Melhor adaptação a ecrãs pequenos e dispositivos móveis.
- **Acessibilidade:** Respeita a preferência do sistema para movimento reduzido.

## Comandos do Terminal

| Comando | Descrição |
| --- | --- |
| `help` | Mostra os comandos disponíveis. |
| `clear` | Limpa o histórico do terminal. |
| `date` | Mostra a data atual. |
| `time` | Mostra a hora atual. |
| `about` | Mostra informações do projeto. |
| `echo [texto]` | Exibe uma mensagem no terminal. |
| `open [site]` | Abre um site num novo separador. |
| `disable-matrix` ou `dm` | Ativa o Modo Normal. |
| `enable-matrix` ou `em` | Retorna ao Modo Matrix. |

Exemplos:

```bash
help
about
date
time
echo Olá, Matrix!
open github
open youtube
dm
em
```

## Instalação

O Matrix Tab ainda não está disponível na Chrome Web Store. É possível instalá-lo manualmente num navegador compatível baseado em Chromium.

1. Descarrega ou clona este repositório.
2. Abre a página de extensões do navegador em `chrome://extensions/`.
3. Ativa o **Modo de programador**.
4. Seleciona **Carregar sem compactação**.
5. Escolhe a pasta do projeto Matrix Tab.
6. Abre um novo separador.

Os passos podem variar conforme o navegador e o dispositivo.

## Compatibilidade

O Matrix Tab foi desenvolvido com HTML, CSS e JavaScript puro, sem necessidade de frameworks ou bibliotecas JavaScript externas.

- **Motor do navegador:** Desenvolvido para navegadores baseados em Chromium.
- **Telemóveis:** A interface foi concebida para se adaptar a ecrãs pequenos.
- **Pesquisa por Voz:** Depende do suporte do navegador à Web Speech API.
- **Movimento Reduzido:** A animação Matrix respeita a preferência de acessibilidade do sistema.

A compatibilidade deve ser testada em cada navegador e dispositivo. O comportamento pode variar.

## Privacidade

- A extensão funciona localmente no navegador.
- Não utiliza sistema de contas nem servidor backend.
- Não inclui ferramentas de análise ou telemetria.
- Os atalhos e os comandos de sites do terminal abrem páginas externas quando solicitado.
- As preferências de atalhos e de modo de exibição são guardadas localmente no navegador.

O objetivo é manter o projeto simples e transparente. Não são oferecidas garantias absolutas de privacidade ou segurança.

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

## Histórico de Versões

### 2.0.0 — Atualização da Interface e da Experiência

- Refinamento da interface e da apresentação visual.
- Adição de um Modo Normal com cores neutras.
- Substituição do relógio e da data pela palavra MATRIX no Modo Normal.
- Melhorias no funcionamento da animação Matrix.
- Paginação com quatro atalhos por página.
- Adição de controlos e indicadores de navegação.
- Melhorias na gestão e validação dos atalhos.
- Pesquisa por voz quando suportada pelo navegador.
- Melhorias na adaptação a diferentes ecrãs e na acessibilidade.
- Atualização da interface e da documentação dos comandos do terminal.

### 1.0.0 — Lançamento Inicial

- Criação da primeira página de Nova Aba inspirada no Matrix.
- Adição da animação de chuva digital com HTML Canvas.
- Implementação de relógio e data dinâmicos.
- Adição de atalhos rápidos para sites.
- Criação do primeiro terminal interativo.
- Configuração da extensão Chromium com Manifest V3.

## Contribuições

Sugestões, relatos de erros e contribuições são bem-vindos.

Podes abrir uma Issue para comunicar um problema ou sugerir uma melhoria. Pull Requests também são bem-vindos.

[⭐ Visita o Matrix Tab no GitHub](https://github.com/N0N-glitch/matrix-tab)

## Licença

Este projeto está licenciado sob a **Licença MIT**. Consulta o ficheiro [LICENSE](LICENSE) para mais detalhes.

---

# Español

## Acerca del Proyecto

**Matrix Tab** es una extensión para la página de Nueva Pestaña del navegador que transforma una página común en un entorno interactivo inspirado en el universo Matrix.

La versión 2.0 incorpora una interfaz más refinada, navegación mejorada, un Modo Normal dedicado y un sistema de accesos directos más organizado, manteniendo el proyecto ligero y desarrollado con tecnologías web nativas.

Este es un proyecto independiente, desarrollado y mantenido como una experiencia personal de aprendizaje.

## Novedades de la Versión 2.0

- **Interfaz Refinada:** Mejoras en los espacios, la jerarquía visual, las tarjetas, los controles y la adaptación a diferentes pantallas.
- **Dos Modos de Visualización:** Alternancia entre el Modo Matrix y el Modo Normal mediante la terminal.
- **Modo Normal:** Sustituye el reloj y la fecha por la palabra MATRIX con un estilo neutro, sin la estética verde de Matrix.
- **Lluvia Digital:** Fondo animado inspirado en Matrix, renderizado con HTML Canvas.
- **Reloj y Fecha:** Visibles en el Modo Matrix.
- **Accesos Directos:** Cuatro accesos por página, con paginación y transiciones suaves.
- **Gestión de Accesos:** Posibilidad de añadir y eliminar accesos personalizados.
- **Barra de Búsqueda:** Permite buscar en Internet o acceder directamente a una dirección.
- **Búsqueda por Voz:** Disponible en navegadores compatibles con Web Speech API.
- **Terminal Interactiva:** Ventana arrastrable con opciones para minimizar y maximizar.
- **Diseño Adaptable:** Mejor adaptación a pantallas pequeñas y dispositivos móviles.
- **Accesibilidad:** Respeta la preferencia del sistema para reducir el movimiento.

## Comandos de la Terminal

| Comando | Descripción |
| --- | --- |
| `help` | Muestra los comandos disponibles. |
| `clear` | Limpia el historial de la terminal. |
| `date` | Muestra la fecha actual. |
| `time` | Muestra la hora actual. |
| `about` | Muestra información del proyecto. |
| `echo [texto]` | Imprime un mensaje en la terminal. |
| `open [sitio]` | Abre un sitio web en una nueva pestaña. |
| `disable-matrix` o `dm` | Activa el Modo Normal. |
| `enable-matrix` o `em` | Vuelve al Modo Matrix. |

Ejemplos:

```bash
help
about
date
time
echo ¡Hola, Matrix!
open github
open youtube
dm
em
```

## Instalación

Matrix Tab todavía no está disponible en Chrome Web Store. Puedes instalarlo manualmente en un navegador compatible basado en Chromium.

1. Descarga o clona este repositorio.
2. Abre la página de extensiones del navegador en `chrome://extensions/`.
3. Activa el **Modo de desarrollador**.
4. Selecciona **Cargar descomprimida**.
5. Elige la carpeta del proyecto Matrix Tab.
6. Abre una nueva pestaña.

Los pasos pueden variar según el navegador y el dispositivo.

## Compatibilidad

Matrix Tab está desarrollado con HTML, CSS y JavaScript puro, sin necesidad de frameworks ni bibliotecas JavaScript externas.

- **Motor del navegador:** Diseñado para navegadores basados en Chromium.
- **Móviles:** La interfaz está diseñada para adaptarse a pantallas pequeñas.
- **Búsqueda por Voz:** Depende del soporte del navegador para Web Speech API.
- **Movimiento Reducido:** La animación Matrix respeta la preferencia de accesibilidad del sistema.

La compatibilidad debe probarse en cada navegador y dispositivo. El comportamiento puede variar.

## Privacidad

- La extensión funciona localmente en el navegador.
- No utiliza un sistema de cuentas ni un servidor backend.
- No incluye herramientas de análisis ni telemetría.
- Los accesos directos y los comandos de sitios de la terminal abren páginas externas cuando se solicita.
- Las preferencias de accesos y del modo de visualización se guardan localmente en el navegador.

El objetivo es mantener el proyecto sencillo y transparente. No se ofrecen garantías absolutas de privacidad o seguridad.

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

## Historial de Versiones

### 2.0.0 — Actualización de la Interfaz y la Experiencia

- Refinamiento de la interfaz y de la presentación visual.
- Incorporación de un Modo Normal con colores neutros.
- Sustitución del reloj y la fecha por la palabra MATRIX en el Modo Normal.
- Mejoras en el funcionamiento de la animación Matrix.
- Paginación con cuatro accesos directos por página.
- Incorporación de controles e indicadores de navegación.
- Mejoras en la gestión y validación de accesos directos.
- Búsqueda por voz cuando el navegador la admite.
- Mejoras de adaptación a diferentes pantallas y de accesibilidad.
- Actualización de la interfaz y de la documentación de los comandos de la terminal.

### 1.0.0 — Lanzamiento Inicial

- Creación de la primera página de Nueva Pestaña inspirada en Matrix.
- Incorporación de la animación de lluvia digital mediante HTML Canvas.
- Implementación de reloj y fecha dinámicos.
- Incorporación de accesos directos a sitios web.
- Creación de la primera terminal interactiva.
- Configuración de la extensión Chromium con Manifest V3.

## Contribuciones

Las sugerencias, los informes de errores y las contribuciones son bienvenidos.

Puedes abrir una Issue para informar de un problema o proponer una mejora. Los Pull Requests también son bienvenidos.

[⭐ Visita Matrix Tab en GitHub](https://github.com/N0N-glitch/matrix-tab)

## Licencia

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo [LICENSE](LICENSE) para obtener más información.
