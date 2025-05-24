class MainPageLoader {
    constructor(renderFunction = null) {
        this.pathParts = window.location.pathname.split('/');
        this.filename = this.pathParts[this.pathParts.length - 1];
        this.params = new URLSearchParams(window.location.search);
        this.writing = this.params.get('writing');
        this.mainElement = document.getElementById('main');
        // Use provided render function or fall back to default
        this.renderFunction = renderFunction || this.defaultRender.bind(this);
    }

    async loadMainPage() {
        try {
            this.render();
        } catch (error) {
            this.showError(`Error loading story: ${error.message}`);
        }
    }

    async render() {
        const [templateHtml, storyHtml] = await Promise.all([
            fetch(this.filename).then(res => res.text()),
            fetch(`stories/${this.writing}.html`).then(res => {
                if (!res.ok) throw new Error("Story not found");
                return res.text();
            })
        ]);

        this.renderFunction(storyHtml, this.mainElement);
    }

    defaultRender(storyHtml, element) {
        const combinedHtml = `
        <div class="story-content">
        ${storyHtml}
        </div>
        <p><a href="#" onclick="history.back()">← Back to story list</a></p>
      `;
        element.innerHTML = combinedHtml;
    }

    showError(message) {
        this.mainElement.innerHTML = `<p>${message}</p>`;
    }
}
export class WritingMainPageLoader extends MainPageLoader {
  constructor(renderStoryFn = null, renderFallbackFn = null) {
    super();
    this.renderStoryFn = renderStoryFn || this.defaultRenderStory.bind(this);
    this.renderFallbackFn = renderFallbackFn || this.defaultRenderFallback.bind(this);
  }

  async render() {
    console.log(this.params)
    console.log(this.load_story)
    if (this.params.get('writing') !== null) {
      await this.renderStoryFn(this);
    } else {
      await this.renderFallbackFn(this);
    }
  }

  async defaultRenderStory() {
    if (!this.writing) {
        this.showError("No story specified.");
        return;
    }
    const [templateHtml, storyHtml] = await Promise.all([
      fetch(this.filename).then(res => res.text()),
      fetch(`stories/${this.params.get('writing')}.html`).then(res => {
        if (!res.ok) throw new Error("Story not found");
        return res.text();
      })
    ]);

    this.mainElement.innerHTML = `
      <div class="story-content">
      ${storyHtml}
      </div>
      <p><a href="#" onclick="history.back()">← Back to story list</a></p>
    `;
  }

  async defaultRenderFallback(loader) {
    throw new Error("defaultRenderFallback must be implemented or provided in constructor");
  }
}

export function loadMain(list_name) {
    const mainLoader = new WritingMainPageLoader(
        null,  // Use default story renderer
        async (loader) => {
          loader.mainElement.innerHTML = `
            <${list_name}></${list_name}>
          `;
        }
      );
      mainLoader.loadMainPage();
}



