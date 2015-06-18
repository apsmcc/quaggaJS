// Type definitions for QuaggaJS v2015.05.20
// Project: http://serratus.github.io/quaggaJS/
// Definitions by: Cam Birch, Peter Horwood aka Madman Pierre

declare var Quagga: QuaggaJSStatic;

interface QuaggaJSStatic {
	/**
	 * This method initializes the library for a given configuration config (see below) and invokes the callback
	 * when Quagga is ready to start. The initialization process also requests for camera access if real-time
	 * detection is configured.
	 */
	init(config: QuaggaJSConfigObject, callback?: () => void): void;
	/**
	 * When the library is initialized, the start() method starts the video-stream and begins locating and decoding
	 * the images.
	 */
	start(): void;
	/**
	 * If the decoder is currently running, after calling stop() the decoder does not process any more images. 
	 * Additionally, if a camera-stream was requested upon initialization, this operation also disconnects the 
	 * camera.
	 */
	stop(): void;

	/**
	 * Only declared in source....
	 */
	pause(): void;

	/**
	 * This method registers a callback(data) function that is called for each frame after the processing is done. 
	 * The data object contains detailed information about the success/failure of the operation. The output varies, 
	 * depending whether the detection and/or decoding were successful or not.
	 */
	onProcessed(callback: QuaggaJSResultCallbackFunction): void;
	/**
	 * Registers a callback(data) function which is triggered whenever a barcode- pattern has been located and 
	 * decoded successfully. The passed data object contains information about the decoding process including the 
	 * detected code which can be obtained by calling data.codeResult.code.
	 */
	onDetected(callback: QuaggaJSResultCallbackFunction): void;

	/**
	 * Only declared in source....
	 */
	setReaders(readers: any): void;

	/**
	 * In contrast to the calls described above, this method does not rely on getUserMedia and operates on a single
	 * image instead. The provided callback is the same as in onDetected and contains the result data object.
	 */
	decodeSingle(config: QuaggaJSConfigObject, resultCallback: QuaggaJSResultCallbackFunction): void;
	/**
	* I have not figured ImageDebug out fully yet
	*/
	ImageDebug: {
		drawPath: QuaggaJSDebugDrawPath;
		drawRect: QuaggaJSDebugDrawRect;
	};
	/**
	* an object Quagga uses for drawing and processing, useful for calling code when debugging
	*/
	canvas: {
		ctx: {
			image: CanvasRenderingContext2D;
			overlay: CanvasRenderingContext2D
		};
		dom: {
			image: HTMLCanvasElement;
			overlay: HTMLCanvasElement
		}
	}; 

}

/**
 * Called whenever an item is detected or a process step has been completed.
 */
interface QuaggaJSResultCallbackFunction {
    (data: QuaggaJSResultObject): void;
}

/**
* Called to draw debugging path
*/
declare function QuaggaJSDebugDrawPath ( path: any, def: any, ctx: CanvasRenderingContext2D, style: any )
/**
* Called to draw debugging Rectangle
*/
declare function QuaggaJSDebugDrawRect ( pos: any, size: any, ctx: CanvasRenderingContext2D, style: any )


/**
 * The callbacks passed into onProcessed, onDetected and decodeSingle receive a data object upon execution. 
 * The data object contains the following information. Depending on the success, some fields may be 
 * undefined or just empty.
 */
interface QuaggaJSResultObject {
    codeResult: QuaggaJSResultObject_CodeResult;
    line: {
        x: number;
        y: number;
    }[];
    angle: number;
    pattern: number[];
    box: number[][];
    boxes: number[][][];
}
interface QuaggaJSResultObject_CodeResult {
    code: string;
    start: number;
    end: number;
    codeset: number;
    startInfo: {
        error: number;
        code: number;
        start: number;
        end: number;
    };
    decodedCodes: {
        error?: number;
        code: number;
        start: number;
        end: number;
    }[];
    endInfo: {
        error: number;
        code: number;
        start: number;
        end: number;
    };
	direction: number;
	format: string;
}

interface QuaggaJSConfigObject {
    /**
     * The image path to load from, or a data url
     * Ex: '/test/fixtures/code_128/image-001.jpg'
     * or: 'data:image/jpg;base64,' + data
     */
    src?: string;

    inputStream?: {
        /**
         * @default "Live"
         */
        name?: string;
        /**
         * @default "LiveStream"
         */
        type?: string;
        constraints?: {
            /**
             * @default 640
             */
            width?: number;
            /**
             * @default 480
             */
            height?: number;
            /**
             * @default "environment"
             */
            facing?: string;
        };
    };
    /**
     * @default false
     */
    tracking?: boolean;
    /**
     * @default false
     */
    debug?: boolean;
    /**
     * @default false
     */
    controls?: boolean;
    /**
     * @default true
     */
    locate?: boolean;
    /**
     * @default 4
     */
    numOfWorkers?: number;
    visual?: {
        /**
         * @default true
         */
        show?: boolean;
    };
    decoder?: {
        /**
         * @default false
         */
        drawBoundingBox?: boolean;
        /**
         * @default false
         */
        showFrequency?: boolean;
        /**
         * @default true
         */
        drawScanline?: boolean;
        /**
         * @default false
         */
        showPattern?: boolean;
        /**
         * @default [ "code_128_reader" ]
         */
        readers?: string[];
    };
    locator?: {
        /**
         * @default true
         */
        halfSample?: boolean;
        /**
         * @default "medium"
         * Available values: x-small, small, medium, large, x-large
         */
        patchSize?: string;
        /**
         * @default false
         */
        showCanvas?: boolean;
        /**
         * @default false
         */
        showPatches?: boolean;
        /**
         * @default false
         */
        showFoundPatches?: boolean;
        /**
         * @default false
         */
        showSkeleton?: boolean;
        /**
         * @default false
         */
        showLabels?: boolean;
        /**
         * @default false
         */
        showPatchLabels?: boolean;
        /**
         * @default false
         */
        showRemainingPatchLabels?: boolean;
        boxFromPatches?: {
            /**
             * @default false
             */
            showTransformed?: boolean;
            /**
             * @default false
             */
            showTransformedBox?: boolean;
            /**
             * @default false
             */
            showBB?: boolean;
        };
    };
}
