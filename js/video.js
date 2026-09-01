const audios = document.querySelectorAll("audio");

audios.forEach((audio) => {
  audio.volume = 0.8; // 🔊 

  audio.addEventListener("play", () => {
    audios.forEach((otherAudio) => {
      if (otherAudio !== audio) {
        otherAudio.pause();
        otherAudio.currentTime = 0;
      }
    });
  });
});

document.querySelectorAll(".only-vid").forEach((container) => {
  const preview = container.querySelector(".video-preview");
  const button = container.querySelector(".play-button .play");

  if (!preview || !button) return;

  const src = preview.dataset.video;
  let video = null;

  button.addEventListener("click", () => {
    // 🔊 Alle Audios stoppen
    audios.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0; // optional
    });

    // 🔴 Alle anderen Videos pausieren
    document.querySelectorAll("video").forEach((v) => {
      if (v !== video) {
        v.pause();
        const btn = v.closest(".only-vid")?.querySelector(".play");
        if (btn) btn.textContent = "▶";
      }
    });

    // ▶️ Erstes Play
    if (!video) {
      video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";

      preview.innerHTML = "";
      preview.appendChild(video);

      video.play();
      button.textContent = "⏸";

      // ⏹️ Wenn Video endet → zurück zu Play
      video.addEventListener("ended", () => {
        button.textContent = "▶";
      });

      return;
    }

    // ⏸️ Pause
    if (!video.paused) {
      video.pause();
      button.textContent = "▶";
    }
    // ▶️ Weiter abspielen
    else {
      video.play();
      button.textContent = "⏸";
    }
  });
});
