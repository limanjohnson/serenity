export default function zenQuoteGeneration() {

  fetch("https://api.api-ninjas.com/v1/quotes", {
    headers: { 'X-Api-Key': 'HYxb1vFrQ+tuJikz00Tzxw==B1eqButmcRGi31gf' }
  })
    .then(response => response.json())
    .then(data => console.log(`${data[0].quote} — ${data[0].author}`));
}
