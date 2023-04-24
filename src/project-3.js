import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-button.js";
import "@lrnwebcomponents/simple-colors/simple-colors.js";

const logo = new URL('../assets/open-wc-logo.svg', import.meta.url).href;

class Project3 extends LitElement {
  static get properties(){
    return{
      source: { type: String, reflect: true},
      icon: { type: String},
      playing: { type: Boolean, reflect: true},
    }
  }

  static styles = css`
    .container {
      display: inline-flex;
      align-items: center;
      border-radius: 4px;
      padding-right: 6px;
      border: 4px;
      background: var(--simple-colors-default-theme-grey-3);
    }
  `;

  constructor() {
    super();
    this.source = '';
    this.icon = "av:play-arrow";
    this.playing = false;
  }

  audioLoad(source) {
    const audioFile = this.shadowRoot.querySelector('.player');
    audioFile.src = source;
    audioFile.load();
  }

  handleProgress(){
    if(this.shadowRoot.querySelector(".player").ended){
      this.audioController(false);
    }
    if(!this.shadowRoot.querySelector(".player").paused){
      var audioDuration = this.shadowRoot.querySelector(".player").duration;
      var audioCurrentTime = this.shadowRoot.querySelector(".player").currentTime;
      var progressPercentage = (audioCurrentTime / audioDuration)*100;
      this.shadowRoot.querySelector(".container").style.background = `linear-gradient(90deg, var(--simple-colors-default-theme-accent-3) 0% ${progressPercentage}%, var(--simple-colors-default-theme-grey-3) ${progressPercentage}% 100%)`;
    }
  }


  audioController(playState){
    const audio = this.shadowRoot.querySelector('.player');
    if(playState){
      audio.play();
      this.playing = true;
      this.icon = "av:pause";
    }
    else{
      audio.pause();
      this.playing = false;
      this.icon = "av:play-arrow";
    }
  }

  handleClickEvent(){
    const audio = this.shadowRoot.querySelector('.player');
    if(!audio.hasAttribute("src")){
      this.audioLoad(this.source);
    } 

    if(audio.paused){
        this.audioController(true);
      }
    else{
        this.audioController(false);
      }
  }


  render() {
    return html`
      <simple-colors accent-color="blue">
        <div class="container" @click="${this.handleClickEvent}"> 
          <simple-icon-button class="icon" icon="${this.icon}" ></simple-icon-button>
          <slot></slot>
          <audio class="player" @timeupdate="${this.handleProgress}"></audio>
        </div>
      </simple-colors>
    `;
  }
}


customElements.define('project-3', Project3);