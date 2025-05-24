class StoryPreview extends HTMLElement {
	static get observedAttributes() {
		return ['title', 'date', 'link_story', 'link_template', 'list_name'];
	  }

	connectedCallback() {
		this.render();
	  }
	
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'title' || name === 'link' || name === 'date' || name === 'link_template' || name === 'link_story') {
			this.render();
		}
	}
	
	render() {
		const title = this.getAttribute('title')
        const link_story = this.getAttribute('link_story')
        const link_template = this.getAttribute('link_template')
        const date = this.getAttribute('date')
		const list_name = this.getAttribute('list_name')

		let result = `
							<article>
								<header>
									<span class="date">${date}</span>
									<h2 onclick="window.location.href='${link_template}?writing=${link_story}'" 
									class="clickable-heading">${title}</h2>
								</header>
							</article>`;
		this.innerHTML = result;
	}
  }
  customElements.define('story-preview', StoryPreview);

class StoryListCzech extends HTMLElement {
    
	connectedCallback() {
		this.innerHTML = `
        <div id="main">
        <story-preview title="zlaté české ručičky" date="april 24, 2021" link_story="rucicky" link_template="czech.html" list_name="story-list-czech"></story-preview>
		<story-preview title="loud places" date="november 16, 2019" link_story="loud_places_cz" link_template="czech.html" list_name="story-list-czech"></story-preview>
		<story-preview title="bitva na tursku" date="march 13, 2025" link_story="bitva" link_template="czech.html" list_name="story-list-czech"></story-preview>
		<story-preview title="duchové minulosti ravu" date="april 24, 2021" link_story="duchove" link_template="czech.html" list_name="story-list-czech"></story-preview>
		<story-preview title="můžeš prostě dělat věci" date="november 15, 2024" link_story="veci" link_template="czech.html" list_name="story-list-czech"></story-preview>
        </div>
        `;
	  }
  }

  class StoryListEnglish extends HTMLElement {
    
	connectedCallback() {
		this.innerHTML = `
        <div id="main">
        <story-preview title="czech ingenuity" date="april 24, 2021" link_story="czech_ingenuity" link_template="english.html" list_name="story-list-english"></story-preview>
		<story-preview title="loud places" date="november 16, 2019" link_story="loud_places_en" link_template="english.html" list_name="story-list-english"></story-preview>
        </div>
        `;
	  }
  }

customElements.define('story-list-czech', StoryListCzech);
customElements.define('story-list-english', StoryListEnglish);