(async function() {
    // Load the BibTeX file
    const response = await fetch('http://samkelson.github.io/assets/bibliography.bib');
    const bibtexText = await response.text();
  
    // Load the BibTeX parser library dynamically
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/bibtex-parse@2.1.0/bibtex-parse.min.js";
    script.onload = () => {
      const parsed = BibtexParser.parse(bibtexText);
      
      // Create a container for the bibliography
      const container = document.createElement('div');
      container.style.fontFamily = 'Arial, sans-serif';
      container.style.padding = '10px';
      container.style.border = '1px solid #ddd';
      container.style.backgroundColor = '#f9f9f9';
  
      const heading = document.createElement('h3');
      heading.innerText = 'Bibliography';
      container.appendChild(heading);
  
      // Loop through entries and display them
      parsed.entries.forEach(entry => {
        const title = entry.Fields.title || "Untitled";
        const author = entry.Fields.author || "Unknown Author";
        const year = entry.Fields.year || "Unknown Year";
        const link = entry.Fields.url || "#";
  
        const entryElement = document.createElement('p');
        entryElement.innerHTML = `<strong><a href="${link}" target="_blank">${title}</a></strong> by ${author} (${year})`;
        container.appendChild(entryElement);
      });
  
      // Insert the bibliography into the page
      document.currentScript.parentNode.insertBefore(container, document.currentScript);
    };
  
    document.head.appendChild(script);
  })(); 