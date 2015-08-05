import utils from '../utils.js';

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

        this.breakPoints = {
            PHONE   : 0,
            TABLET  : 768,
            DESKTOP : 980
        };

        this.breakNames = Object.keys(this.breakPoints);

        this.currentBreak = null;

        // these must be called after load so that the force updates are called
        // after the component is mounted.
        window.addEventListener('load', () => {
            this.getCurrentBreak();
            this.getOrientation();
        }, false);

        window.addEventListener('resize', () => {
            utils.debounce(() => {
                this.getCurrentBreak();
            }, 250)();
        }, false);

        if ( 'onorientationchange' in window ) {
            window.addEventListener('orientationchange', this.getOrientation.bind(this), false);
        }
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
        let cachedBreak = this.currentBreak ? this.currentBreak : null;

        this.updateWindowWidth();

        this.currentBreak = this.breakNames[this.breakNames.length - 1];

        for(let bp in this.breakPoints) {
            if(this.breakPoints[bp] <= this.windowWidth) {
                this.currentBreak = bp;
            }
        }

        // forces an update if the breakpoint has changed
        if(cachedBreak !== this.currentBreak) {
            this.forceUpdate();
        }
    }

    bpLT(name) {
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
        let index = this.breakNames.indexOf(name);
        if(index === this.breakNames.length - 1) {
            return this.breakPoints[this.currentBreak] >= this.breakPoints[name];
        } else {
            return this.breakPoints[this.currentBreak] >= this.breakPoints[name]
                && this.breakPoints[this.currentBreak] < this.breakPoints[this.breakNames[index + 1]];
        }
    }

    updateWindowWidth() {
        this.windowWidth = window.innerWidth;
    }
}

export default appHOC;
