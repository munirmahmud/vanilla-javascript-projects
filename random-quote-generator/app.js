// Quote Variables
const quoteContainer = document.querySelector('#quote_container');
const quoteContent = quoteContainer.querySelector('#quote');
const authorName = quoteContainer.querySelector('#author');
const twitterBtn = quoteContainer.querySelector('#twitter');
const newQuote = quoteContainer.querySelector('#new-quote');
const loader = document.querySelector('#loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote() {
    showLoadingSpinner();

    // We need to use a Proxy URL to make our API call in order to avoid CORS Policy
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

        // Check if Author field is blank and replace it with Unknown
        if(data.quoteAuthor === "") {
            authorName.innerText = "Unknown";
        }

        authorName.innerText = data.quoteAuthor;

        // Stop loader and show quote
        removeLoadingSpinner();

        throw new Error('ooops');
    } catch (error) {
        console.log(`Whoops, no quote ${error}`);
        
        getQuote();
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

