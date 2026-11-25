<div align="center">
# Astrit Veliu
 
**Android software engineer, based in Cologne, Germany.**
This repository is the source of my personal site and the tools I publish next to it.
 
[![Live site](https://img.shields.io/badge/live-astrit--veliu.github.io-0b2240?style=for-the-badge&labelColor=00c8a0)](https://astrit-veliu.github.io)
[![Veliu Labs](https://img.shields.io/badge/studio-Veliu%20Labs-0b2240?style=for-the-badge&labelColor=00c8a0)](https://astrit-veliu.github.io/labs/)
 
![Hosted on GitHub Pages](https://img.shields.io/badge/hosting-GitHub%20Pages-0b2240?style=flat-square)
![Vanilla JavaScript](https://img.shields.io/badge/stack-vanilla%20JS%20(ES%20modules)-0b2240?style=flat-square)
![No build step](https://img.shields.io/badge/build-none-0b2240?style=flat-square)
![Zero dependencies](https://img.shields.io/badge/runtime%20dependencies-0-0b2240?style=flat-square)
[![Watchers](https://img.shields.io/github/watchers/astrit-veliu/astrit-veliu.github.io.svg?style=flat-square&label=watchers)](https://github.com/astrit-veliu/astrit-veliu.github.io/watchers)
 
</div>
---
 
## What is in here
 
| Path | What it is |
| --- | --- |
| [`/`](https://astrit-veliu.github.io) | My portfolio, presented as an Android Studio project you can explore. |
| [`/labs`](https://astrit-veliu.github.io/labs/) | Veliu Labs, my Android studio: apps, tech stack and a contact form. |
| [`/code`](https://astrit-veliu.github.io/code/) | Barcode Studio: generate and decode QR codes and barcodes in the browser. |
| [`/mockup`](https://astrit-veliu.github.io/mockup/) | Play Store mockup generator for building store screenshots. |
| `/exel` | An Excel productivity guide. |
 
## The portfolio
 
The main page looks and behaves like an IDE. Pages are Kotlin files in a project tree, there is a running emulator, a build panel and a working terminal.
 
**Pages:** `AboutMe.kt`, `Skills.kt`, `Experience.kt`, `Projects.kt`, `Contact.kt`
 
**Keyboard shortcuts**
 
| Shortcut | Action |
| --- | --- |
| `Cmd/Ctrl + K` | Open the command palette |
| `Cmd/Ctrl + B` | Run the app |
| `Cmd/Ctrl + /` | About this portfolio |
| `Alt + F12` | Toggle the terminal |
| `Esc` | Close dialogs and menus |
 
**Terminal commands:** `apps`, `portfolio`, `run`, `git status`, `git log`, `ls`, `pwd`, `whoami`, `date`, `uname`, `clear`, `help`
 
## Veliu Labs
 
A focused one page site for the studio, with a horizontal project carousel, light and dark themes, and a contact form that opens your mail client. Project data is read from the same source as the portfolio, so an app is added once and shows up in both places.
 
## Barcode Studio
 
Generates QR codes, Data Matrix, Aztec, PDF417, Code 128, Code 39, EAN-13 and UPC-A, and decodes codes from an image. Everything runs locally in the browser and nothing is uploaded.
 
## Mockup generator
 
Builds Play Store screenshots from device frames, backgrounds, headlines and overlays. Exports a single screen or every screen as a ZIP, with checks against Play Store size requirements.
 
## Design notes
 
- No framework and no build step. What is in the repository is what gets served.
- Strict Content Security Policy on the portfolio and Labs pages, with scripts limited to the same origin.
- Templates escape all interpolated values by default, so content cannot inject markup.
- Responsive layouts are driven by window size classes set on the root element rather than scattered media queries.
- Respects reduced motion preferences.
## Get in touch
 
[![GitHub](https://img.shields.io/badge/GitHub-astrit--veliu-0b2240?style=flat-square&logo=github)](https://github.com/astrit-veliu/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-astrit--veliu-0b2240?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/astrit-veliu/)
[![Medium](https://img.shields.io/badge/Medium-%40astrit.veliu95-0b2240?style=flat-square&logo=medium)](https://medium.com/@astrit.veliu95)
 
Apps are published on Google Play under [Veliu Labs](https://play.google.com/store/apps/dev?id=9023809209412327612) and [Personal Apps](https://play.google.com/store/apps/dev?id=8902247989998999802).
 
---
 
<div align="center">
&copy; Astrit Veliu. Source is public for reference. Please ask before reusing the design or content.
 
</div>
 
