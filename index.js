const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // aqui colocar a pagina que você quer obter os dados
  await page.goto('https://instagram.com/gczpic');

  // await page.screenshot({ path: 'print.png' });
  const imgList = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('article img');

    const imgArray = [...nodeList];

    const imgList = imgArray.map(img => ({ src: img.src }));

    return imgList;
  });

  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
    if (err) throw new Error('something went wrong');

    console.log('well done');
  });
  await browser.close();
})();