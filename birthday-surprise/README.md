# A Little Birthday Surprise ♡

A beginner-friendly, responsive birthday surprise made with HTML, CSS, and vanilla JavaScript. No backend or database is required.

## Project structure

```text
birthday-surprise/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── photos/   # Add photo1.jpg through photo6.jpg here
    └── music/    # Optional: add birthday-song.mp3 here
```

## Personalize it

Open `script.js` and edit the `CONFIG` object near the top:
- `friendName`: recipient's name
- `message`: birthday letter (use `\n\n` to start a new paragraph)
- `signature`: your name or nickname
- `photos`: photo paths and captions

Keep image names and file paths in sync. For example, `./assets/photos/photo1.jpg` must point to that exact file. JPG, PNG, or WebP can be used if you update the matching path in `script.js`.

For music, add an MP3 at `assets/music/birthday-song.mp3`. Music does not autoplay; the visitor must press Play.

## Preview locally

1. Extract the ZIP.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in a browser, or use VS Code's Live Server extension.
4. Test the journey: welcome → envelope → letter → photo gallery → final wish.
5. Test on a narrow/mobile viewport. Missing personal photos or music are optional and will not stop the main experience.

The Google Fonts import requires an internet connection; the page uses fallback fonts if it is unavailable.

## Publish free with Netlify Drop

1. Visit https://app.netlify.com/drop and sign in if requested.
2. Drag the extracted `birthday-surprise` folder (not just `index.html`) into the upload area.
3. Wait for Netlify to publish the site and provide a public URL.
4. Open that URL on a phone and another browser to check it.
5. To update it, edit the files locally and drag the updated project folder into the site's Deploys area, following Netlify's current prompts.

Anyone with the public URL can view the site. Do not add private information or photos unless you're comfortable sharing them with anyone who has the link.


## Personalised for Halimatun 💗
The birthday message and signature are set to Halimatun and Limah. The letter mentions your friendship from Form 1 until degree in a warm Malay-English style. You can edit `CONFIG` near the top of `script.js`.

## Add your photos and videos
- Put up to six photos in `assets/photos/` named `photo1.jpg` through `photo6.jpg`.
- Create `assets/videos/` and add optional MP4 clips named `video1.mp4` and `video2.mp4`. The page shows friendly placeholders if you have not added the files yet.
- Keep videos short and compressed for faster loading on mobile. Videos do not autoplay; visitors use the built-in controls.
- Optional background music: put `birthday-song.mp3` in `assets/music/`. It only plays after the visitor presses Play.
