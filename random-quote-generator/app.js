// Quote Variables
const quoteContainer = document.querySelector('#quote_container');
const quoteContent = quoteContainer.querySelector('#quote');
const authorName = quoteContainer.querySelector('#author');
const twitterBtn = quoteContainer.querySelector('#twitter');
const newQuote = quoteContainer.querySelector('#new-quote');
const loader = document.querySelector('#loader');

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function hideLoading() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote() {
    loading();
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

        // Stop loader and show quote
        hideLoading();
    } catch (error) {
        getQuote();

        // console.log(`Whoops, no quote ${error}`);
    }
}

newQuote.addEventListener('click', getQuote);
getQuote();

// Share quote on Twitter
function shareQuoteOnTwitter() {
    const quote = quoteContent.innerText;
    const author = authorName.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet/?text=${quote} - ${author}`;

    window.open(twitterUrl);
}

twitterBtn.addEventListener('click', shareQuoteOnTwitter);

