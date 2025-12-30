const container = document.getElementById('container');
let page = 0;

fetch('content.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('fortune-date').innerText = data.date;
    document.getElementById('music-date').innerText = data.date;

    document.getElementById('fortune-text').innerText = data.fortune;

    document.getElementById('song-info').innerText =
      `${data.music.title} – ${data.music.artist}`;

    document.getElementById('lyrics').innerText = data.music.lyrics;

    const videoId = extractYouTubeID(data.music.youtube);
    document.getElementById('youtube-thumb').src =
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    document.getElementById('music-link').href =
      data.music.youtube;
  });

document.addEventListener('click', () => {
  page = page === 0 ? 1 : 0;
  container.style.transform = `translateX(-${page * 100}vw)`;
});

function extractYouTubeID(url) {
  const reg = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
  const match = url.match(reg);
  return match ? match[1] : '';
}
