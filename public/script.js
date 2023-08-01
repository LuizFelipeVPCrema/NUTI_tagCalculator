
async function countTags() {
    const urlInput = document.getElementById('urlInput');
  
    const urlList = urlInput.value.split(',').map(url => url.trim());
  
    try {
      const response = await fetch('http://localhost:3000/count-tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ urls: urlList })
      });
  
      if (!response.ok) {
        throw new Error('Erro na requisição.');
      }
  
      const tagCounts = await response.json();
  
      const tagTableBody = document.getElementById('tagTableBody');
      tagTableBody.innerHTML = '';
  
      for (const tag in tagCounts) {
        const row = document.createElement('tr');
        const tagNameCell = document.createElement('td');
        const tagCountCell = document.createElement('td');
  
        tagNameCell.textContent = tag;
        tagCountCell.textContent = tagCounts[tag];
  
        row.appendChild(tagNameCell);
        row.appendChild(tagCountCell);
        tagTableBody.appendChild(row);
      }
    } catch (error) {
      console.error('Erro na requisição:', error.message);
      // Tratar o erro conforme necessário
    }
  }
  


  const countButton = document.getElementById('countButton');
  countButton.onclick = countTags;

