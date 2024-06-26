const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    
    e.preventDefault();
    
    const name = document.getElementById("name");
    const files = document.getElementById("files");
    const formData = new FormData();
    

    formData.append("name", name.value);
    // Appending value of text input
    for(let i =0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
    }
    
    // Post data to server:
    fetch('http://127.0.0.1:5000/api', {
        method: 'POST',
        body: formData, 
        
    })
    
    .then(res => res.json())
    .then(data => console.log(data));
    alert("File Uploaded and Digitally signed")
})