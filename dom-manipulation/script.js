let quotes = JSON.parse(localStorage.getItem("quotes")) || [
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

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available. Add a new quote!";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<strong>${randomQuote.text}</strong><br><em>Category: ${randomQuote.category}</em>`;
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
}

function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;

  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
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
  saveQuotes();
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added successfully!");
  showRandomQuote();
}

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
    showRandomQuote();
  };
  fileReader.readAsText(event.target.files[0]);
}

function createExportImportButtons() {
  const exportButton = document.createElement("button");
  exportButton.textContent = "Export Quotes to JSON";
  exportButton.onclick = exportToJsonFile;

  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.id = "importFile";
  importInput.accept = ".json";
  importInput.onchange = importFromJsonFile;

  const importLabel = document.createElement("label");
  importLabel.textContent = "Import Quotes from JSON";
  importLabel.htmlFor = "importFile";

  document.body.appendChild(exportButton);
  document.body.appendChild(importLabel);
  document.body.appendChild(importInput);
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);
window.onload = function () {
  showRandomQuote();
  createAddQuoteForm();
  createExportImportButtons();
};
