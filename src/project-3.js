import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-button.js";
import "@lrnwebcomponents/simple-colors/simple-colors.js";
import { SimpleColors } from '@lrnwebcomponents/simple-colors/simple-colors.js';

const logo = new URL('../assets/open-wc-logo.svg', import.meta.url).href;

class Project3 extends SimpleColors {
  static get properties(){
    return{
      ...super.properties,
      source: { type: String, reflect: true},
      icon: { type: String},
    }
  }

  static get styles(){
    return [...super.styles, css`
    .container {
      display: inline-flex;
      align-items: center;
      border-radius: 4px;
      padding-right: 8px;
      padding-top: 1px;
      padding-bottom: 3px;
      background: var(--simple-colors-default-theme-grey-3);
      font-family: "Turnip RE",Georgia,"Times New Roman",Times,serif;
      font-size: inherit;
      color: #222;
    }
    .player {
      visibility: hidden;
    }
  `];
}

  constructor() {
    super();
    this.source = '';
    this.icon = "av:play-arrow";
  }

  handleProgress(){
    if(this.shadowRoot.querySelector(".player").ended){
      this.icon = "av:play-arrow";
    }
    if(!this.shadowRoot.querySelector(".player").paused){
      var duration = this.shadowRoot.querySelector(".player").duration;
      var watchTime = this.shadowRoot.querySelector(".player").currentTime + .2;
      var percentage = Math.ceil((watchTime/duration)*100);
      this.shadowRoot.querySelector(".container").style.background = `linear-gradient(90deg, var(--simple-colors-default-theme-accent-3) 0% ${percentage}%, var(--simple-colors-default-theme-grey-3) ${percentage}% 100%)`;
    }
  }

  handleClickEvent(){
    const audio = this.shadowRoot.querySelector('.player');
    if(audio.paused){
      audio.play();
      this.icon = "av:pause";
      }
    else{
      audio.pause();
      this.icon = "av:play-arrow";
      }
  }


  render() {
    return html`
        <div class="container" @click="${this.handleClickEvent}"> 
          <simple-icon-button class="icon" icon="${this.icon}" ></simple-icon-button>
          <slot></slot>
          <audio src="${this.source}" class="player" @timeupdate="${this.handleProgress}"></audio>
        </div>
    `;
  }
}

customElements.define('project-3', Project3);