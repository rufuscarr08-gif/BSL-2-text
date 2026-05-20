# BSL Fingerspelling Translator

A browser-based prototype that uses a webcam to translate British Sign Language fingerspelling into text. It combines hand landmark tracking, local training samples, baseline BSL landmark data, vowel contact detection, and a first-pass movement recogniser for `J`.

## How To Use

Open `index.html` in a browser.

For camera access, run the project from a local web server instead of opening it directly as a `file://` URL:

```sh
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

Click **Start camera**, allow camera access, then train or test BSL fingerspelling letters from the interface.

## Technologies Used

- HTML
- JavaScript
- MediaPipe Hands
- Browser `localStorage`

## Prototype Note

This project was built as a prototype. It is intended for experimentation and learning rather than production use or accessibility-critical communication.
