import breakPointsCSS from 'raw-loader!../globalStyles/breakPoints.scss';
import utils from './../utils';

/**
* Class to pass the responsive state passed through the props
*/
class RespState {
  constructor(updateCallback) {

    this.updateCallback = updateCallback;
    this.isRetina = window.devicePixelRatio > 1;

    this.windowWidth = window.innerWidth;

    this.useMatchMedia = window.matchMedia !== null;

    this.createRespElement();

    this.getBreakPoints();

    // An array of all the breakpoint names
    this.breakNames = Object.keys(this.breakPoints);

    // Builds the media query object from the breakpoint object so you only
    // need to update the breakpoint object
    this.mediaQueries = {};

    this.breakNames.map((name) => {
      this.mediaQueries[name] = '(min-width: ' + this.breakPoints[name] + 'px)';
    });

    this.currentBreak = null;

    // These must be called after load so that the force updates are called
    // after the component is mounted.
    window.addEventListener('load', () => {
      this.getCurrentBreak();
      this.getOrientation();
    }, false);

    if(this.useMatchMedia) {
      this.breakNames.map((name) => {
        window.matchMedia(this.mediaQueries[name]).addListener(this.getCurrentBreak.bind(this));
      });
    } else {
      window.addEventListener('resize', () => {
        utils.debounce(() => {
          this.getCurrentBreak();
        }, 250)();
      }, false);
    }

    if ( 'onorientationchange' in window ) {
      window.addEventListener('orientationchange', this.getOrientation.bind(this), false);
    }

    // public methods
    this.bpLT = this._bpLT;
    this.bpLTE = this._bpLTE;
    this.bpGT = this._bpGT;
    this.bpGTE = this._bpGTE;
    this.bpE = this._bpE;
  }

  createRespElement() {
    var el = document.createElement('div');
    el.id = 'resp-element';
    document.body.appendChild(el);
  }

  getBreakPoints() {
    let keys = breakPointsCSS.match(/"(.*)"/g);
    let values = breakPointsCSS.match(/min-width(.*?)px/g);

    this.breakPoints = {};

    keys.map((key, i) => {
      if(i === 0) {
        this.breakPoints[key.replace(/"/g, '')] = 0;
      } else {
        this.breakPoints[key.replace(/"/g, '')] = parseInt(values[i].replace('min-width ', '').replace('px', ''));
      }
    });
  }

  getOrientation() {
    let cachedOrientation = this.currentOrientation ? this.currentOrientation : null;

    if(window.innerWidth > window.innerHeight) {
      this.currentOrientation = 'LANDSCAPE';
    } else {
      this.currentOrientation = 'PORTRAIT';
    }

    // forces an update if the orientation has changed
    if(cachedOrientation !== this.currentOrientation) {
      if(this.updateCallback) {
        this.updateCallback();
      }
    }
  }

  getCurrentBreak() {
    let el = document.getElementById('resp-element');
    let currentBreak = window.getComputedStyle(el).getPropertyValue('content');

    this.currentBreak = currentBreak.replace(/"/g, '');

    if(this.updateCallback) {
      this.updateCallback();
    }
  }

  _bpLT(name) {
    return this.breakPoints[this.currentBreak] < this.breakPoints[name];
  }

  _bpLTE(name) {
    return this.breakPoints[this.currentBreak] <= this.breakPoints[name];
  }

  _bpGT(name) {
    return this.breakPoints[this.currentBreak] > this.breakPoints[name];
  }

  _bpGTE(name) {
    return this.breakPoints[this.currentBreak] >= this.breakPoints[name];
  }

  _bpE(name) {
    return this.currentBreak === name;
  }

  updateWindowWidth() {
    this.windowWidth = window.innerWidth;
  }
}

RespState.displayName = 'respState';


export default RespState;
