import { LINKS } from './constants.js';

class Header extends HTMLElement {
	static get observedAttributes() {
		return ['active_position'];
	  }

	connectedCallback() {
		this.render();
	  }
	
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'active_position') {
			this.render();
		}
	}

	create_links(links, active_position) {
		let ret = []
		links.forEach(function (item, index) {
			if (index === active_position) {
				ret.push(item.replace(/<li(?![^>]*\bclass=)/, '<li class="active"'));
			}
			else {
				ret.push(item);
			}
		  });
		ret = ret.join("\n");
		return ret;
	}
	
	render() {
		const active_position = parseInt(this.getAttribute('active_position')) || 0;
		let links = this.create_links(LINKS, active_position);
		
		let result = `
			<header id="header">
				<!-- <a href="index.html" class="logo">Massively</a>-->
			</header>
			<nav id="nav">
				<ul class="links">
					${links}
				</ul>
			</nav>`;
		
		console.log(result);
		this.innerHTML = result;
	}
  }
  customElements.define('page-header', Header);