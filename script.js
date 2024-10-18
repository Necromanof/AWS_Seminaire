//Download function

async function downloadImage(imageSrc) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
  
    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'image file name here'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
//Search bar

  const searchInput = document.getElementById('searchInput');
  const cards = document.querySelectorAll('.card');

const searchItems = () => {
    let query = searchInput.value.toLowerCase(); 
    cards.forEach(card => {
        let cardTitle = card.querySelector('h3').textContent.toLowerCase(); 
        if (cardTitle.includes(query)) {
            card.style.display = 'block'; 
        } else {
            card.style.display = 'none'; 
        }
    });
};
searchInput.addEventListener("input", searchItems);