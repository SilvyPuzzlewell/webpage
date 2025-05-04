class StoryPreview extends HTMLElement {
	static get observedAttributes() {
		return ['title', 'date', 'link', 'list_name'];
	  }

	connectedCallback() {
		this.render();
	  }
	
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'title' || name === 'link' || name === 'date') {
			this.render();
		}
	}
	
	render() {
		const title = this.getAttribute('title')
        const link = this.getAttribute('link')
        const date = this.getAttribute('date')
		const list_name = this.getAttribute('list_name')

		let result = `
							<article>

								<header>
									<span class="date">${date}</span>
									<h2 onclick="loadStory('stories/${link}', '${list_name}')" class="clickable-heading">${title}</h2>
								</header>
								
								<!--
								<header>
									<span class="date">${date}</span>
									<h2><a href="#">${title}<br />
									</h2>
								</header>
								<p>Donec eget ex magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque venenatis dolor imperdiet dolor mattis sagittis magna etiam.</p>
								<ul class="actions special">
									<li><a href="#" class="button" onclick="lalaLala('stories/${link}', '${list_name}')">Full Story</a></li>
								</ul>
								-->

							</article>`;
		this.innerHTML = result;
	}
  }
  customElements.define('story-preview', StoryPreview);

class StoryListCzech extends HTMLElement {
    
	connectedCallback() {
		this.innerHTML = `
        <div id="main">
        <story-preview title="zlaté české ručičky" date="april 24, 2021" link="rucicky.html" list_name="story-list-czech"></story-preview>
        <story-preview title="duchové minulosti ravu" date="april 24, 2021" link="duchove.html" list_name="story-list-czech"></story-preview>
		<story-preview title="loud places" date="november 16, 2019" link="loud_places_cz.html" list_name="story-list-czech"></story-preview>
        </div>
        `;
	  }
  }

  class StoryListEnglish extends HTMLElement {
    
	connectedCallback() {
		this.innerHTML = `
        <div id="main">
        <story-preview title="czech ingenuity" date="april 24, 2021" link="czech_ingenuity.html" list_name="story-list-english"></story-preview>
		<story-preview title="loud places" date="november 16, 2019" link="loud_places_en.html" list_name="story-list-english"></story-preview>
        </div>
        `;
	  }
  }

customElements.define('story-list-czech', StoryListCzech);
customElements.define('story-list-english', StoryListEnglish);