const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Global variables
let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Show new quote
function newQuote() {
    showLoadingSpinner();
    //Pick a random quote form apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)] //get random int number between 0 and count of quotes
    
    //Check if Author field is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }

    //Check Quote length to determine styling
    if(quote.text.length >= 120) {
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get Quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        newQuote();
        console.log('Fetch quotes error:', error);
        //Catch Error Here
    }
}

//Tweet a Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank')
}

//Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();
complete();