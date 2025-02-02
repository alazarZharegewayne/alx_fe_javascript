let quotes = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Inspiration",
  },
  {
    text: "Do what you can, with what you have, where you are.",
    category: "Motivation",
  },
  {
    text: "Strive not to be a success, but rather to be of value.",
    category: "Success",
  },
];

function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available. Add a new quote!";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<strong>${randomQuote.text}</strong><br><em>Category: ${randomQuote.category}</em>`;
}

function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText.trim() === "" || newQuoteCategory.trim() === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  const newQuote = {
    text: newQuoteText,
    category: newQuoteCategory,
  };

  quotes.push(newQuote);
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added successfully!");
  showRandomQuote();
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);
window.onload = showRandomQuote;
