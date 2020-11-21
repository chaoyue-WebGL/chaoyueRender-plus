import { Environment } from "../utility/Environment";
import SetupWebGL      from "../resource/WebGLUtils";


export const defaultGLConfig = {
    isMobile: false,
    transparent: false,
    stencil: false,
    samples: 4
};

export interface ViewerConfigs {
    isMobile?: boolean;
    stencil?: boolean;
    samples?: number;
};


export abstract class Viewer {
    protected _container    : HTMLDivElement;
    protected _canvas       : any;

    public constructor (containerId: string, config: { isMobile?: boolean, devicePixelRatio?: number } = { isMobile: false }) {
        this._container = document.getElementById(containerId) as HTMLDivElement;
        this._canvas = document.createElement('canvas');
        this._canvas.id = "chaoyue_canvas";
        this._canvas.style.display = 'block';
        this._container.appendChild(this._canvas);
        // 禁止右键
        this._canvas.oncontextmenu = function() { 
            return false;
        };
        const width               = this._container.clientWidth;
        const height              = this._container.clientHeight;
        Environment.devicePixelRatio  = (window as any).devicePixelRatio;
        const width1             = Math.floor(width * Environment.devicePixelRatio);
        const height1            = Math.floor(height * Environment.devicePixelRatio);
        this._canvas.width        = width1;
        this._canvas.height       = height1;
        this._canvas.style.width  = width + 'px';
        this._canvas.style.height = height + 'px';

        const gl = this._setupGL({ ...defaultGLConfig, ...config });;
    }

    public resize(width:number, height:number) : void {
        width  = width || 1;
        height = height || 1;

        const actualWidth = Math.floor(width * Environment.devicePixelRatio);
        const actualHeight = Math.floor(height * Environment.devicePixelRatio);

        this._canvas.width        = actualWidth;
        this._canvas.height       = actualHeight;
        this._canvas.style.width  = width + 'px';
        this._canvas.style.height = height + 'px';
    }

    public destroy() : void {
        this._canvas.remove();
        this._canvas = null;
        delete this._canvas;

        this._container = null;
        delete this._container;
    }

    private _setupGL(config: ViewerConfigs) : any{
        const { isMobile, stencil, samples } = config;

        const gl = SetupWebGL(this._canvas, {
            depth: true,
            alpha: true,
            premultipliedAlpha: false,
            samples: samples,
            stencil: stencil,
            preserveDrawingBuffer: false,
            vao: true,
            instancing: true,
            webgl2: true
        });

        return gl;
    }


}