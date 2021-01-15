// Quote Variables
const quoteContainer = document.querySelector('#quote_container');
const quoteContent = quoteContainer.querySelector('#quote');
const authorName = quoteContainer.querySelector('#author');
const twitterBtn = quoteContainer.querySelector('#twitter');
const newQuote = quoteContainer.querySelector('#new-quote');


// Get Quote From API
async function getQuote() {
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const url = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const res = await fetch(proxy + url);
        const data = await res.json();
        quoteContent.innerText = data.quoteText;

        // Reduce font size for long quote
        if(data.quoteText.length > 50) {
            quoteContent.classList.add('long-quote');
        } else {
            quoteContent.classList.remove('long-quote');
        }

        if(data.quoteAuthor === "") {
            authorName.innerText = "Unknown";
        }

        authorName.innerText = data.quoteAuthor;
    } catch (error) {
        getQuote();

        console.log(`Whoops, no quote ${error}`);
    }
}

newQuote.addEventListener('click', getQuote);
getQuote();





