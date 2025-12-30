const fortunePage = document.getElementById('fortune');
const musicPage = document.getElementById('music');

let current = 'fortune';

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
  if (current === 'fortune') {
    fortunePage.classList.remove('active');
    musicPage.classList.add('active');
    current = 'music';
  } else {
    musicPage.classList.remove('active');
    fortunePage.classList.add('active');
    current = 'fortune';
  }
});

function extractYouTubeID(url) {
  const reg = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
  const match = url.match(reg);
  return match ? match[1] : '';
}