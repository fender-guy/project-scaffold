import utils from '../utils.js';
import breakPointsCSS from '-!raw!../globalStyles/breakPoints.scss';

/**
 * This is where you put the methods you want to share throughout the entire app.
 * AKA high order component.
 *
 */
class appHOC extends React.Component {
    constructor(props) {
        super(props);

        this.isRetina = window.devicePixelRatio > 1;

        this.windowWidth = window.innerWidth;

        this.useMatchMedia = window.matchMedia != null;

        this.createRespElement();

        this.getBreakPoints();

        // and array of all the breakpoint names
        this.breakNames = Object.keys(this.breakPoints);

        // builds the media query object from the breakpoint object so you only
        // need to update the breakpoint object
        this.mediaQueries = {};

        this.breakNames.map((name) => {
            this.mediaQueries[name] = '(min-width: ' + this.breakPoints[name] + 'px)';
        });

        this.currentBreak = null;

        // these must be called after load so that the force updates are called
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
                this.breakPoints[key.replace(/"/g, '')] = parseInt(values[i - 1].replace('min-width ', '').replace('px', ''));
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
            this.forceUpdate();
        }
    }

    getCurrentBreak() {
        let el = document.getElementById('resp-element');
        let currentBreak = window.getComputedStyle(el).getPropertyValue('content');

        this.currentBreak = currentBreak.replace(/"/g, '');

        this.forceUpdate();
    }

    bpLT(name) {
        //console.log(this.breakPoints, this.currentBreak);
        return this.breakPoints[this.currentBreak] < this.breakPoints[name];
    }

    bpLTE(name) {
        return this.breakPoints[this.currentBreak] <= this.breakPoints[name];
    }

    bpGT(name) {
        return this.breakPoints[this.currentBreak] > this.breakPoints[name];
    }

    bpGTE(name) {
        return this.breakPoints[this.currentBreak] >= this.breakPoints[name];
    }

    bpE(name) {
        return this.currentBreak === name;
    }

    updateWindowWidth() {
        this.windowWidth = window.innerWidth;
    }
}

export default appHOC;
