import { TweenMax, Bounce } from 'gsap';
import $ from 'jquery';

class Header{
  constructor(){
    this.header = $('.text');
    this.setter();
    this.event();
  }

  setter(){
    TweenMax.set(this.header, {className: "+=text--visible"});
  }

  event(){
    this.fadeHeader();
  }

  fadeHeader(){
    setTimeout(() => {
      TweenMax.to(this.header, 0, {className: "-=text--visible"});
    },3000);
    this.header.hover(() => {
      TweenMax.to(this.header, 1, {scale: 0})
    }, () => {
      TweenMax.to(this.header, 1, {scale: 1})
    });
  }
}

export default Header;