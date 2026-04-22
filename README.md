# BHP Starter

Startowy frontend pod system BHP zrobiony w React + TypeScript + Vite.

## Co jest w środku

- React
- TypeScript
- Vite
- React Router
- przykładowe ekrany:
  - logowanie
  - dashboard
  - szkolenia
  - testy

## Wymagania

Zainstaluj Node.js w wersji zgodnej z aktualnymi wymaganiami Vite. Obecnie dokumentacja Vite podaje Node.js 20.19+ lub 22.12+, a Node.js udostępnia aktualne wydania LTS na oficjalnej stronie. citeturn826828search0turn826828search1

## Jak uruchomić lokalnie

1. Rozpakuj projekt.
2. Otwórz folder projektu w Visual Studio Code.
3. Otwórz terminal w folderze projektu.
4. Wpisz:

```bash
npm install
npm run dev
```

5. Otwórz adres pokazany w terminalu, zwykle `http://localhost:5173`.

## Build produkcyjny

```bash
npm run build
```

Po buildzie powstanie folder `dist`.

## Gdzie pisać kod

Najwygodniej:

- **Visual Studio Code** — do frontendu React/TypeScript
- **Android Studio** — nie jest potrzebne do tej strony internetowej

Android Studio przydaje Ci się do Fluttera i aplikacji mobilnych, ale do tego projektu webowego lepszy będzie VS Code.

## Jak wrzucić na GitHub

W terminalu, będąc w folderze projektu:

```bash
git init
git add .
git commit -m "start projektu BHP"
```

Potem utwórz nowe repo na GitHub i podepnij je:

```bash
git remote add origin https://github.com/TWOJ_LOGIN/bhp-starter.git
git branch -M main
git push -u origin main
```

## Tymczasowy hosting

Ten starter ma ustawione `base: './'` w `vite.config.ts`, więc łatwiej go później wystawić jako statyczny frontend.

## Co dalej

Następne sensowne kroki:

1. dodać prawdziwy layout i branding,
2. zrobić formularz logowania,
3. dodać mock API,
4. podpiąć backend,
5. przenieść hosting z GitHub Pages na lepszy serwer.
