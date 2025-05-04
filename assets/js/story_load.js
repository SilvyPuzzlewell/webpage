function loadStory(path, list_name) {
    fetch(path)
      .then(response => {
        if (!response.ok) throw new Error("Failed to load story");
        return response.text();
      })

      .then(html => {
        // document.getElementById("main").style.display = "none";
        document.getElementById("main").innerHTML = 
        `
        <div class="story-content">
        ${html}
        </div>
        <p><a href="#" onclick="goBack('${list_name}')">← Back to story list</a></p>
        `;
      })
      .catch(error => {
        document.getElementById("main").innerHTML = "<p>Error loading story.</p>";
        console.error(error);
      });
  }

function goBack(list_name) {
    console.log(`<${list_name}></${list_name}>`)
    document.getElementById("main").innerHTML = `<${list_name}></${list_name}>`;
}
  