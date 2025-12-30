let pages = document.querySelectorAll('.page');
let current = 0;
let startX = 0;

/* 날짜 */
function setDate() {
  const today = new Date();
  const text =
    today.getFullYear() +
    '.' +
    (today.getMonth() + 1) +
    '.' +
    today.getDate();

  document.getElementById('fortune-date').innerText = text;
  document.getElementById('music-date').innerText = text;
}

/* 콘텐츠 로드 */
fetch('./content.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('fortune-text').innerText = data.fortune;

    document.getElementById('music-link').href = data.music.youtube;
    document.getElementById('music-thumb').src =
      `https://img.youtube.com/vi/${data.music.youtubeId}/hqdefault.jpg`;

    document.getElementById('song-info').innerText =
      `${data.music.title} – ${data.music.artist}`;

    document.getElementById('lyrics').innerText = data.music.lyrics;
  });

setDate();

/* 스와이프 */
function goNext() {
  const next = (current + 1) % pages.length;

  pages[current].classList.remove('active');
  pages[current].classList.add('prev');

  pages[next].classList.remove('prev');
  pages[next].classList.add('active');

  current = next;
}

document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) goNext();
});