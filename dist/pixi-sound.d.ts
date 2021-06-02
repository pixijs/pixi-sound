import { BaseTexture } from '@pixi/core';
import { EventEmitter } from '@pixi/utils';
import { ILoaderPlugin } from '@pixi/loaders';
import { ILoaderResource } from '@pixi/loaders';

/**
 * Callback when sound is completed.
 * @ignore
 * @param {Sound} sound - The instance of sound.
 */
export declare type CompleteCallback = (sound: Sound) => void;

/**
 * Filter for adding adding delaynode.
 *
 * @class
 * @memberof filters
 */
declare class DistortionFilter extends Filter {
    /** The Wave shape node use to distort */
    private _distortion;
    /** The amount of distoration */
    private _amount;
    /** @param {number} [amount=0] - The amount of distoration from 0 to 1. */
    constructor(amount?: number);
    /** @type {number} */
    set amount(value: number);
    get amount(): number;
    destroy(): void;
}

/**
 * Filter for adding equalizer bands.
 *
 * @class
 * @memberof filters
 * @param {number} [f32=0] - Default gain for 32 Hz
 * @param {number} [f64=0] - Default gain for 64 Hz
 * @param {number} [f125=0] - Default gain for 125 Hz
 * @param {number} [f250=0] - Default gain for 250 Hz
 * @param {number} [f500=0] - Default gain for 500 Hz
 * @param {number} [f1k=0] - Default gain for 1000 Hz
 * @param {number} [f2k=0] - Default gain for 2000 Hz
 * @param {number} [f4k=0] - Default gain for 4000 Hz
 * @param {number} [f8k=0] - Default gain for 8000 Hz
 * @param {number} [f16k=0] - Default gain for 16000 Hz
 */
declare class EqualizerFilter extends Filter {
    /**
     * Band at 32 Hz
     * @readonly
     */
    static readonly F32: number;
    /**
     * Band at 64 Hz
     * @readonly
     */
    static readonly F64: number;
    /**
     * Band at 125 Hz
     * @readonly
     */
    static readonly F125: number;
    /**
     * Band at 250 Hz
     * @readonly
     */
    static readonly F250: number;
    /**
     * Band at 500 Hz
     * @readonly
     */
    static readonly F500: number;
    /**
     * Band at 1000 Hz
     * @readonly
     */
    static readonly F1K: number;
    /**
     * Band at 2000 Hz
     * @readonly
     */
    static readonly F2K: number;
    /**
     * Band at 4000 Hz
     * @readonly
     */
    static readonly F4K: number;
    /**
     * Band at 8000 Hz
     * @readonly
     */
    static readonly F8K: number;
    /**
     * Band at 16000 Hz
     * @readonly
     */
    static readonly F16K: number;
    /**
     * The list of bands
     * @readonly
     */
    readonly bands: BiquadFilterNode[];
    /**
     * The map of bands to frequency
     * @type {Object}
     * @readonly
     */
    readonly bandsMap: {
        [id: number]: BiquadFilterNode;
    };
    constructor(f32?: number, f64?: number, f125?: number, f250?: number, f500?: number, f1k?: number, f2k?: number, f4k?: number, f8k?: number, f16k?: number);
    /**
     * Set gain on a specific frequency.
     * @param {number} frequency - The frequency, see EqualizerFilter.F* for bands
     * @param {number} [gain=0] - Recommended -40 to 40.
     */
    setGain(frequency: number, gain?: number): void;
    /**
     * Get gain amount on a specific frequency.
     * @return The amount of gain set.
     */
    getGain(frequency: number): number;
    /**
     * Gain at 32 Hz frequencey.
     * @type {number}
     * @default 0
     */
    set f32(value: number);
    get f32(): number;
    /**
     * Gain at 64 Hz frequencey.
     * @type {number}
     * @default 0
     */
    set f64(value: number);
    get f64(): number;
    /**
     * Gain at 125 Hz frequencey.
     * @type {number}
     * @default 0
     */
    set f125(value: number);
    get f125(): number;
    /**
     * Gain at 250 Hz frequencey.
     * @type {number}
     * @default 0
     */
    set f250(value: number);
    get f250(): number;
    /**
     * Gain at 500 Hz frequencey.
     * @type {number}
     * @default 0
     */
    set f500(value: number);
    get f500(): number;
    /**
     * Gain at 1 KHz frequencey.
     * @type {number}
     * @default 0
     */
    set f1k(value: number);
    get f1k(): number;
    /**
     * Gain at 2 KHz frequencey.
     * @type {number}
     * @default 0
     */
    set f2k(value: number);
    get f2k(): number;
    /**
     * Gain at 4 KHz frequencey.
     * @type {number}
     * @default 0
     */
    set f4k(value: number);
    get f4k(): number;
    /**
     * Gain at 8 KHz frequencey.
     * @type {number}
     * @default 0
     */
    set f8k(value: number);
    get f8k(): number;
    /**
     * Gain at 16 KHz frequencey.
     * @type {number}
     * @default 0
     */
    set f16k(value: number);
    get f16k(): number;
    /** Reset all frequency bands to have gain of 0 */
    reset(): void;
    destroy(): void;
}

/**
 * Represents a single sound element. Can be used to play, pause, etc. sound instances.
 *
 * @class
 * @memberof filters
 */
export declare class Filter {
    /** The node to connect for the filter to the previous filter. */
    destination: AudioNode;
    /** The node to connect for the filter to the previous filter. */
    source: AudioNode;
    /**
     * @param {AudioNode} destination - The audio node to use as the destination for the input AudioNode
     * @param {AudioNode} [source] - Optional output node, defaults to destination node. This is useful
     *        when creating filters which contains multiple AudioNode elements chained together.
     */
    constructor(destination: AudioNode, source?: AudioNode);
    /** Reinitialize */
    protected init(destination: AudioNode, source?: AudioNode): void;
    /**
     * Connect to the destination.
     * @param {AudioNode} destination - The destination node to connect the output to
     */
    connect(destination: AudioNode): void;
    /** Completely disconnect filter from destination and source nodes. */
    disconnect(): void;
    /** Destroy the filter and don't use after this. */
    destroy(): void;
}

/**
 * Abstract class which SoundNodes and SoundContext
 * both extend. This provides the functionality for adding
 * dynamic filters.
 * @class
 */
export declare class Filterable {
    /** Get the gain node */
    private _input;
    /** The destination output audio node */
    private _output;
    /**
     * Collection of filters.
     * @type {filters.Filter[]}
     */
    private _filters;
    /**
     * @param {AudioNode} source - The source audio node
     * @param {AudioNode} destination - The output audio node
     */
    constructor(input: AudioNode, output: AudioNode);
    /** The destination output audio node */
    get destination(): AudioNode;
    /**
     * The collection of filters
     * @type {filters.Filter[]}
     */
    get filters(): Filter[];
    set filters(filters: Filter[]);
    /** Cleans up. */
    destroy(): void;
}

export declare const filters: {
    Filter: typeof Filter;
    EqualizerFilter: typeof EqualizerFilter;
    DistortionFilter: typeof DistortionFilter;
    StereoFilter: typeof StereoFilter;
    ReverbFilter: typeof ReverbFilter;
    MonoFilter: typeof MonoFilter;
    TelephoneFilter: typeof TelephoneFilter;
};

export declare const htmlaudio: {
    HTMLAudioContext: typeof HTMLAudioContext;
    HTMLAudioMedia: typeof HTMLAudioMedia;
    HTMLAudioInstance: typeof HTMLAudioInstance;
};

/**
 * The fallback version of WebAudioContext which uses `<audio>` instead of WebAudio API.
 * @class
 * @extends PIXI.util.EventEmitter
 * @memberof htmlaudio
 */
declare class HTMLAudioContext extends EventEmitter implements IMediaContext {
    /** Current global speed from 0 to 1 */
    speed: number;
    /** Current muted status of the context */
    muted: boolean;
    /** Current volume from 0 to 1  */
    volume: number;
    /** Current paused status */
    paused: boolean;
    /** Internal trigger when volume, mute or speed changes */
    refresh(): void;
    /** Internal trigger paused changes */
    refreshPaused(): void;
    /**
     * HTML Audio does not support filters, this is non-functional API.
     * @type {Array<Filter>}
     */
    get filters(): Filter[];
    set filters(_filters: Filter[]);
    /**
     * HTML Audio does not support `audioContext`
     * @readonly
     * @type {AudioContext}
     */
    get audioContext(): AudioContext;
    /**
     * Toggles the muted state.
     * @return The current muted state.
     */
    toggleMute(): boolean;
    /**
     * Toggles the paused state.
     * @return The current paused state.
     */
    togglePause(): boolean;
    /** Destroy and don't use after this */
    destroy(): void;
}

/**
 * Instance which wraps the `<audio>` element playback.
 * @class
 * @memberof htmlaudio
 */
declare class HTMLAudioInstance extends EventEmitter implements IMediaInstance {
    /** Extra padding, in seconds, to deal with low-latecy of HTMLAudio. */
    static readonly PADDING: number;
    /** The current unique ID for this instance. */
    readonly id: number;
    /** The instance of the Audio element. */
    private _source;
    /** The instance of the Audio media element. */
    private _media;
    /** Playback rate, where 1 is 100%. */
    private _end;
    /** Current instance paused state. */
    private _paused;
    /** Current instance muted state. */
    private _muted;
    /** Current actual paused state. */
    private _pausedReal;
    /** Total length of the audio. */
    private _duration;
    /** Playback rate, where 1 is 100%. */
    private _start;
    /** `true` if the audio is actually playing. */
    private _playing;
    /** Volume for the instance. */
    private _volume;
    /** Speed for the instance. */
    private _speed;
    /** `true` for looping the playback */
    private _loop;
    /** @param parent - Parent element */
    constructor(parent: HTMLAudioMedia);
    /**
     * Set a property by name, this makes it easy to chain values
     * @param {string} name - - Values include: 'speed', 'volume', 'muted', 'loop', 'paused'
     * @param {number|boolean} value - - Value to set property to
     */
    set(name: 'speed' | 'volume' | 'muted' | 'loop' | 'paused', value: number | boolean): this;
    /** The current playback progress from 0 to 1. */
    get progress(): number;
    /** Pauses the sound. */
    get paused(): boolean;
    set paused(paused: boolean);
    /**
     * Reference: http://stackoverflow.com/a/40370077
     * @private
     */
    private _onPlay;
    /**
     * Reference: http://stackoverflow.com/a/40370077
     * @private
     */
    private _onPause;
    /**
     * Initialize the instance.
     * @param {htmlaudio.HTMLAudioMedia} media - Same as constructor
     */
    init(media: HTMLAudioMedia): void;
    /**
     * Stop the sound playing
     * @private
     */
    private _internalStop;
    /** Stop the sound playing */
    stop(): void;
    /** Set the instance speed from 0 to 1 */
    get speed(): number;
    set speed(speed: number);
    /**
     * Get the set the volume for this instance from 0 to 1
     * @type {number}
     */
    get volume(): number;
    set volume(volume: number);
    /**
     * If the sound instance should loop playback
     * @type {number}
     */
    get loop(): boolean;
    set loop(loop: boolean);
    /**
     * `true` if the sound is muted
     * @type {boolean}
     */
    get muted(): boolean;
    set muted(muted: boolean);
    /** Call whenever the loop, speed or volume changes */
    refresh(): void;
    /** Handle changes in paused state, either globally or sound or instance */
    refreshPaused(): void;
    /** Start playing the sound/ */
    play(options: PlayOptions): void;
    /**
     * Handle time update on sound.
     * @private
     */
    private _onUpdate;
    /**
     * Callback when completed.
     * @private
     */
    private _onComplete;
    /** Don't use after this. */
    destroy(): void;
    /**
     * To string method for instance.
     * @return The string representation of instance.
     */
    toString(): string;
}

/**
 * The fallback version of Sound which uses `<audio>` instead of WebAudio API.
 * @class
 * @memberof htmlaudio
 * @param {HTMLAudioElement|String|Object} options - Either the path or url to the source file.
 *        or the object of options to use. See {@link Sound.from}
 */
declare class HTMLAudioMedia extends EventEmitter implements IMedia {
    parent: Sound;
    private _source;
    init(parent: Sound): void;
    create(): HTMLAudioInstance;
    /**
     * @type {boolean}
     * @readonly
     */
    get isPlayable(): boolean;
    /**
     * @type {number}
     * @readonly
     */
    get duration(): number;
    /**
     * @type {HTMLAudioContext}
     * @readonly
     */
    get context(): HTMLAudioContext;
    /**
     * @type {Array<Filter>}
     */
    get filters(): Filter[];
    set filters(_filters: Filter[]);
    destroy(): void;
    /**
     * Get the audio source element.
     * @type {HTMLAudioElement}
     * @readonly
     */
    get source(): HTMLAudioElement;
    load(callback?: LoadedCallback): void;
}

/**
 * Interface represents either a WebAudio source or an HTML5 AudioElement source
 */
export declare interface IMedia {
    /**
     * Collection of global filters
     * @type {Filter[]}
     */
    filters: Filter[];
    /**
     * Reference to the context.
     * @readonly
     * @type {IMediaContext}
     */
    readonly context: IMediaContext;
    /**
     * Length of sound in seconds.
     * @readonly
     * @type {number}
     */
    readonly duration: number;
    /**
     * Flag to check if sound is currently playable (e.g., has been loaded/decoded).
     * @readonly
     * @type {boolean}
     */
    readonly isPlayable: boolean;
    create(): IMediaInstance;
    init(sound: Sound): void;
    load(callback?: LoadedCallback): void;
    destroy(): void;
}

/**
 * Represents the audio context for playing back sounds. This can
 * represent either an HTML or WebAudio context.
 */
export declare interface IMediaContext {
    /**
     * `true` if all sounds are mute
     * @type {boolean}
     */
    muted: boolean;
    /**
     * Volume to apply to all sound
     * @type {number}
     */
    volume: number;
    /**
     * The speed of all sound
     * @type {number}
     */
    speed: number;
    /**
     * Set the paused state for all sound
     * @type {boolean}
     */
    paused: boolean;
    /**
     * Collection of global filter
     * @type {Filter[]}
     */
    filters: Filter[];
    /** Toggle mute for all sounds */
    toggleMute(): boolean;
    /** Toggle pause for all sounds */
    togglePause(): boolean;
    /** Dispatches event to refresh the paused state of playing instances. */
    refreshPaused(): void;
    /** Dispatch event to refresh all instances volume, mute, etc. */
    refresh(): void;
    /** Destroy the context and don't use after this. */
    destroy(): void;
    /** Reference to the Web Audio API AudioContext element, if Web Audio is available */
    audioContext: AudioContext;
}

/**
 * Interface for single instance return by a Sound play call. This can either
 * be a WebAudio or HTMLAudio instance.
 */
export declare interface IMediaInstance {
    /**
     * Auto-incrementing ID for the instance.
     * @type {number}
     * @readonly
     */
    readonly id: number;
    /**
     * Current progress of the sound from 0 to 1
     * @type {number}
     * @readonly
     */
    readonly progress: number;
    /**
     * If the instance is paused, if the sound or global context
     * is paused, this could still be false.
     * @type {boolean}
     */
    paused: boolean;
    /**
     * Current volume of the instance. This is not the actual volume
     * since it takes into account the global context and the sound volume.
     * @type {number}
     */
    volume: number;
    /**
     * Current speed of the instance. This is not the actual speed
     * since it takes into account the global context and the sound volume.
     * @type {number}
     */
    speed: number;
    /**
     * If the current instance is set to loop
     * @type {boolean}
     */
    loop: boolean;
    /**
     * Set the muted state of the instance
     * @type {boolean}
     */
    muted: boolean;
    /** Stop the current instance from playing. */
    stop(): void;
    /**
     * Fired when the sound finishes playing.
     * @event end
     */
    /**
     * Fired when the sound starts playing.
     * @event start
     */
    /**
     * The sound is stopped. Don't use after this is called.
     * @event stop
     */
    /**
     * Fired when the sound when progress updates.
     * @event progress
     * @param {number} progress - Playback progress from 0 to 1
     * @param {number} duration - The total number of seconds of audio
     */
    /**
     * Fired when paused state changes.
     * @event pause
     * @param {boolean} paused - If the current state is paused
     */
    /**
     * Fired when instance is paused.
     * @event paused
     */
    /**
     * Fired when instance is resumed.
     * @event resumed
     */
    refresh(): void;
    refreshPaused(): void;
    init(parent: IMedia): void;
    play(options: PlayOptions): void;
    destroy(): void;
    toString(): string;
    once(event: 'pause', fn: (paused: boolean) => void, context?: any): this;
    once(event: 'progress', fn: (progress: number, duration: number) => void, context?: any): this;
    once(event: 'resumed' | 'paused' | 'start' | 'end' | 'stop', fn: () => void, context?: any): this;
    on(event: 'pause', fn: (paused: boolean) => void, context?: any): this;
    on(event: 'progress', fn: (progress: number, duration: number) => void, context?: any): this;
    on(event: 'resumed' | 'paused' | 'start' | 'end' | 'stop', fn: () => void, context?: any): this;
    off(event: 'resumed' | 'paused' | 'start' | 'end' | 'progress' | 'pause' | 'stop', fn: Function, context?: any, once?: boolean): this;
    /**
     * Fired when the sound when progress updates.
     * @param {string} name - Name of property, like 'speed', 'volume', 'muted', 'loop', 'paused'
     * @param {number|boolean} value - The total number of seconds of audio
     * @example
     * import { sound } from '@pixi/sound';
     * sound.play('foo')
     *   .set('volume', 0.5)
     *   .set('speed', 0.8);
     */
    set(name: 'speed' | 'volume' | 'muted' | 'loop' | 'paused', value: number | boolean): this;
}

/**
 * Callback when sound is loaded.
 * @ignore
 * @param {Error} err - The callback error.
 * @param {Sound} sound - The instance of new sound.
 * @param {IMediaInstance} instance - The instance of auto-played sound.
 */
export declare type LoadedCallback = (err: Error, sound?: Sound, instance?: IMediaInstance) => void;

/**
 * Combine all channels into mono channel.
 *
 * @class
 * @memberof filters
 */
declare class MonoFilter extends Filter {
    /** Merger node */
    private _merger;
    constructor();
    destroy(): void;
}

/**
 * Options to use for creating sounds.
 */
export declare interface Options {
    /**
     * `true` to immediately start preloading.
     * @type {boolean}
     * @default false
     */
    autoPlay?: boolean;
    /**
     * `true` to disallow playing multiple layered instances at once.
     * @type {boolean}
     * @default false
     */
    singleInstance?: boolean;
    /**
     * The amount of volume 1 = 100%.
     * @type {number}
     * @default 1
     */
    volume?: number;
    /**
     * The playback rate where 1 is 100% speed.
     * @type {number}
     * @default 1
     */
    speed?: number;
    /**
     * Global complete callback when play is finished.
     * @type {Function}
     */
    complete?: CompleteCallback;
    /**
     * Call when finished loading.
     * @type {Function}
     */
    loaded?: LoadedCallback;
    /**
     * `true` to immediately start preloading if loading from `url`.
     * @type {boolean}
     */
    preload?: boolean;
    /**
     * Initial loop value, `true` is loop infinitely
     * @type {boolean}
     * @default false
     */
    loop?: boolean;
    /**
     * The source of the file being loaded
     * @type {string}
     */
    url?: string;
    /**
     * If sound is already preloaded, available.
     * @type {ArrayBuffer|HTMLAudioElement}
     */
    source?: ArrayBuffer | HTMLAudioElement;
    /**
     * The map of sprite data. Where a sprite is an object
     * with a `start` and `end`, which are the times in seconds. Optionally, can include
     * a `speed` amount where 1 is 100% speed.
     * @type {Object<string, SoundSpriteData>}
     */
    sprites?: {
        [id: string]: SoundSpriteData;
    };
}

/**
 * Create a new "Audio" stream based on given audio path and project uri; returns the audio object.
 * @static
 * @param fileName - Full path of the file to play.
 * @param {Function} callback - Callback when complete.
 * @return New audio element alias.
 */
declare function playOnce(url: string, callback?: (err?: Error) => void): string;

/**
 * Options used for sound playback.
 */
export declare interface PlayOptions {
    /**
     * Start time offset in seconds.
     * @type {number}
     * @default 0
     */
    start?: number;
    /**
     * End time in seconds.
     * @type {number}
     */
    end?: number;
    /**
     * Override default speed, default to the Sound's speed setting.
     * @type {number}
     */
    speed?: number;
    /**
    * Override default loop, default to the Sound's loop setting.
    * @type {number}
    */
    loop?: boolean;
    /**
     * Override default volume, default to the Sound's volume setting.
     * @type {number}
     */
    volume?: number;
    /**
     * The sprite to play.
     * @type {string}
     */
    sprite?: string;
    /**
     * If sound instance is muted by default.
     * @type {boolean}
     * @default false
     */
    muted?: boolean;
    /**
     * When completed.
     * @type {Function}
     */
    complete?: CompleteCallback;
    /**
     * If not already preloaded, callback when finishes load.
     * @type {Function}
     */
    loaded?: LoadedCallback;
}

/**
 * Render image as Texture. **Only supported with WebAudio**
 * @static
 * @param {Sound} sound - Instance of sound to render
 * @param {Object} [options] - Custom rendering options
 * @param {number} [options.width=512] - Width of the render
 * @param {number} [options.height=128] - Height of the render
 * @param {string|CanvasPattern|CanvasGradient} [options.fill='black'] - Fill style for waveform
 * @return Result texture
 */
declare function render(sound: Sound, options?: RenderOptions): BaseTexture;

declare interface RenderOptions {
    width?: number;
    height?: number;
    fill?: string | CanvasPattern | CanvasGradient;
}

/**
 * Resolve a URL with different formats in glob pattern to
 * a path based on the supported browser format. For instance:
 * "sounds/music.{ogg,mp3}", would resolve to "sounds/music.ogg"
 * if "ogg" support is found, otherwise, fallback to "sounds.music.mp3"
 * @static
 * @param {string|PIXI.LoaderResource} source - - Path to resolve or Resource, if
 *        a Resource object is provided, automatically updates the extension and url
 *        of that object.
 * @return The format to resolve to
 */
declare function resolveUrl(source: string | ILoaderResource): string;

/**
 * Filter for adding reverb. Refactored from
 * https://github.com/web-audio-components/simple-reverb/
 *
 * @class
 * @memberof filters
 */
declare class ReverbFilter extends Filter {
    private _seconds;
    private _decay;
    private _reverse;
    /**
     * @param seconds - Seconds for reverb
     * @param decay - The decay length
     * @param reverse - Reverse reverb
     */
    constructor(seconds?: number, decay?: number, reverse?: boolean);
    /**
     * Clamp a value
     * @param {number} value
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @return Clamped number
     */
    private _clamp;
    /**
     * Length of reverb in seconds from 1 to 50
     * @default 3
     */
    get seconds(): number;
    set seconds(seconds: number);
    /**
     * Decay value from 0 to 100
     * @default 2
     */
    get decay(): number;
    set decay(decay: number);
    /**
     * Reverse value from 0 to 1
     * @default false
     */
    get reverse(): boolean;
    set reverse(reverse: boolean);
    /**
     * Utility function for building an impulse response
     * from the module parameters.
     */
    private _rebuild;
}

/**
 * Create a new sound for a sine wave-based tone.  **Only supported with WebAudio**
 * @static
 * @param {number} [hertz=200] - Frequency of sound.
 * @param {number} [seconds=1] - Duration of sound in seconds.
 * @return New sound.
 */
declare function sineTone(hertz?: number, seconds?: number): Sound;

/**
 * Sound represents a single piece of loaded media. When playing a sound {@link IMediaInstance} objects
 * are created. Properties such a `volume`, `pause`, `mute`, `speed`, etc will have an effect on all instances.
 * @class
 */
export declare class Sound {
    /**
     * Pool of instances
     * @type {Array<IMediaInstance>}
     */
    private static _pool;
    /**
     * `true` if the buffer is loaded.
     * @type {boolean}
     * @default false
     */
    isLoaded: boolean;
    /**
     * `true` if the sound is currently being played.
     * @type {boolean}
     * @default false
     * @readonly
     */
    isPlaying: boolean;
    /**
     * true to start playing immediate after load.
     * @type {boolean}
     * @default false
     * @readonly
     */
    autoPlay: boolean;
    /**
     * `true` to disallow playing multiple layered instances at once.
     * @type {boolean}
     * @default false
     */
    singleInstance: boolean;
    /**
     * `true` to immediately start preloading.
     * @type {boolean}
     * @default false
     * @readonly
     */
    preload: boolean;
    /**
     * The file source to load.
     * @type {String}
     * @readonly
     */
    url: string;
    /**
     * The constructor options.
     * @type {Object}
     * @readonly
     */
    options: Options;
    /**
     * The audio source
     * @type {IMedia}
     */
    media: IMedia;
    /**
     * The collection of instances being played.
     * @type {Array<IMediaInstance>}
     */
    private _instances;
    /**
     * Reference to the sound context.
     * @type {SoundContext}
     */
    private _sprites;
    /**
     * The options when auto-playing.
     * @type {PlayOptions}
     */
    private _autoPlayOptions;
    /**
     * The internal volume.
     * @type {number}
     */
    private _volume;
    /**
     * The internal paused state.
     * @type {boolean}
     */
    private _paused;
    /**
     * The internal muted state.
     * @type {boolean}
     */
    private _muted;
    /**
     * The internal volume.
     * @type {boolean}
     */
    private _loop;
    /**
     * The internal playbackRate
     * @type {number}
     */
    private _speed;
    /**
     * Create a new sound instance from source.
     * @param {ArrayBuffer|String|Options|HTMLAudioElement} options - Either the path or url to the source file.
     *        or the object of options to use.
     * @return Created sound instance.
     */
    static from(source: string | Options | ArrayBuffer | HTMLAudioElement): Sound;
    /**
     * Use `Sound.from`
     * @ignore
     */
    constructor(media: IMedia, options: Options);
    /**
     * Instance of the media context
     * @type {IMediaContext}
     */
    get context(): IMediaContext;
    /**
     * Stops all the instances of this sound from playing.
     * @return Instance of this sound.
     */
    pause(): this;
    /**
     * Resuming all the instances of this sound from playing
     * @return Instance of this sound.
     */
    resume(): this;
    /** Stops all the instances of this sound from playing. */
    get paused(): boolean;
    set paused(paused: boolean);
    /** The playback rate */
    get speed(): number;
    set speed(speed: number);
    /**
     * Set the filters. Only supported with WebAudio.
     * @type {Array<filters.Filter>}
     */
    get filters(): Filter[];
    set filters(filters: Filter[]);
    /**
     * Add a sound sprite, which is a saved instance of a longer sound.
     * Similar to an image spritesheet.
     * @param {String} alias - The unique name of the sound sprite.
     * @param {object} data - Either completed function or play options.
     * @param {number} data.start - Time when to play the sound in seconds.
     * @param {number} data.end - Time to end playing in seconds.
     * @param {number} data.speed - Override default speed, default to the Sound's speed setting.
     * @return Sound sprite result.
     */
    addSprites(alias: string, data: SoundSpriteData): SoundSprite;
    /**
     * Convenience method to add more than one sprite add a time.
     * @param {Object} data - Map of sounds to add where the key is the alias,
     *        and the data are configuration options, see {@link Sound#addSprite} for info on data.
     * @return The map of sound sprites added.
     */
    addSprites(sprites: SoundSpriteDataMap): SoundSprites;
    /** Destructor, safer to use `SoundLibrary.remove(alias)` to remove this sound. */
    destroy(): void;
    /**
     * Remove a sound sprite.
     * @param {String} alias - The unique name of the sound sprite, if alias is omitted, removes all sprites.
     * @return Sound instance for chaining.
     */
    removeSprites(alias?: string): Sound;
    /** If the current sound is playable (loaded). */
    get isPlayable(): boolean;
    /**
     * Stops all the instances of this sound from playing.
     * @return Instance of this sound.
     */
    stop(): this;
    /**
     * Play a sound sprite, which is a saved instance of a longer sound.
     * Similar to an image spritesheet.
     * @method play
     * @instance
     * @param alias - The unique name of the sound sprite.
     * @param {Function} callback - Callback when completed.
     * @return The sound instance,
     *        this cannot be reused after it is done playing. Returns a Promise if the sound
     *        has not yet loaded.
     */
    play(alias: string, callback?: CompleteCallback): IMediaInstance | Promise<IMediaInstance>;
    /**
     * Plays the sound.
     * @method play
     * @instance
     * @param {Function|PlayOptions} options - Either completed function or play options.
     * @return The sound instance,
     *        this cannot be reused after it is done playing. Returns a Promise if the sound
     *        has not yet loaded.
     */
    play(source?: string | PlayOptions | CompleteCallback, callback?: CompleteCallback): IMediaInstance | Promise<IMediaInstance>;
    /** Internal only, speed, loop, volume change occured. */
    refresh(): void;
    /** Handle changes in paused state. Internal only. */
    refreshPaused(): void;
    /** Gets and sets the volume. */
    get volume(): number;
    set volume(volume: number);
    /** Gets and sets the muted flag. */
    get muted(): boolean;
    set muted(muted: boolean);
    /** Gets and sets the looping. */
    get loop(): boolean;
    set loop(loop: boolean);
    /**
     * Starts the preloading of sound.
     * @private
     */
    private _preload;
    /**
     * Gets the list of instances that are currently being played of this sound.
     * @type {Array<IMediaInstance>}
     */
    get instances(): IMediaInstance[];
    /**
     * Get the map of sprites.
     * @type {Object}
     */
    get sprites(): SoundSprites;
    /** Get the duration of the audio in seconds. */
    get duration(): number;
    /** Auto play the first instance. */
    autoPlayStart(): IMediaInstance;
    /**
     * Removes all instances.
     * @private
     */
    private _removeInstances;
    /**
     * Sound instance completed.
     * @private
     * @param {IMediaInstance} instance
     */
    private _onComplete;
    /**
     * Create a new instance.
     * @private
     * @return New instance to use
     */
    private _createInstance;
    /**
     * Destroy/recycling the instance object.
     * @private
     * @param instance - - Instance to recycle
     */
    private _poolInstance;
}

export declare const sound: SoundLibrary;

/**
 * Manages the playback of sounds. This is the main class for PixiJS Sound. If you're
 * using the browser-based bundled this is `PIXI.sound`. Otherwise, you can do this:
 * @example
 * import { sound } from '@pixi/sound';
 *
 * // sound is an instance of SoundLibrary
 * sound.add('my-sound', 'path/to/file.mp3');
 * sound.play('my-sound');
 * @class
 */
export declare class SoundLibrary {
    /**
     * For legacy approach for Audio. Instead of using WebAudio API
     * for playback of sounds, it will use HTML5 `<audio>` element.
     */
    private _useLegacy;
    /** The global context to use. */
    private _context;
    /** The WebAudio specific context */
    private _webAudioContext;
    /** The HTML Audio (legacy) context. */
    private _htmlAudioContext;
    /** The map of all sounds by alias. */
    private _sounds;
    constructor();
    /**
     * Re-initialize the sound library, this will
     * recreate the AudioContext. If there's a hardware-failure
     * call `close` and then `init`.
     * @return Sound instance
     */
    init(): this;
    /**
     * The global context to use.
     * @type {IMediaContext}
     * @readonly
     */
    get context(): IMediaContext;
    /**
     * Apply filters to all sounds. Can be useful
     * for setting global planning or global effects.
     * **Only supported with WebAudio.**
     * @example
     * import { sound, filters } from '@pixi/sound';
     * // Adds a filter to pan all output left
     * sound.filtersAll = [
     *     new filters.StereoFilter(-1)
     * ];
     * @type {filters.Filter[]}
     */
    get filtersAll(): Filter[];
    set filtersAll(filtersAll: Filter[]);
    /**
     * `true` if WebAudio is supported on the current browser.
     * @readonly
     * @type {boolean}
     */
    get supported(): boolean;
    /**
     * Register an existing sound with the library cache.
     * @method add
     * @instance
     * @param {string} alias - The sound alias reference.
     * @param {Sound} sound - Sound reference to use.
     * @return {Sound} Instance of the Sound object.
     */
    /**
     * Adds a new sound by alias.
     * @param alias - The sound alias reference.
     * @param {ArrayBuffer|String|Options|HTMLAudioElement} options - Either the path or url to the source file.
     *        or the object of options to use.
     * @return Instance of the Sound object.
     */
    add(alias: string, options: Options | string | ArrayBuffer | HTMLAudioElement | Sound): Sound;
    /**
     * Adds multiple sounds at once.
     * @param map - Map of sounds to add, the key is the alias, the value is the
     *        `string`, `ArrayBuffer`, `HTMLAudioElement` or the list of options
     *        (see {@link Options} for full options).
     * @param globalOptions - The default options for all sounds.
     *        if a property is defined, it will use the local property instead.
     * @return Instance to the Sound object.
     */
    add(map: SoundSourceMap, globalOptions?: Options): SoundMap;
    /**
     * Internal methods for getting the options object
     * @private
     * @param source - The source options
     * @param overrides - Override default options
     * @return The construction options
     */
    private _getOptions;
    /**
     * Do not use WebAudio, force the use of legacy. This **must** be called before loading any files.
     * @type {boolean}
     */
    get useLegacy(): boolean;
    set useLegacy(legacy: boolean);
    /**
     * Removes a sound by alias.
     * @param alias - The sound alias reference.
     * @return Instance for chaining.
     */
    remove(alias: string): this;
    /**
     * Set the global volume for all sounds. To set per-sound volume see {@link SoundLibrary#volume}.
     * @type {number}
     */
    get volumeAll(): number;
    set volumeAll(volume: number);
    /**
     * Set the global speed for all sounds. To set per-sound speed see {@link SoundLibrary#speed}.
     * @type {number}
     */
    get speedAll(): number;
    set speedAll(speed: number);
    /**
     * Toggle paused property for all sounds.
     * @return `true` if all sounds are paused.
     */
    togglePauseAll(): boolean;
    /**
     * Pauses any playing sounds.
     * @return Instance for chaining.
     */
    pauseAll(): this;
    /**
     * Resumes any sounds.
     * @return Instance for chaining.
     */
    resumeAll(): this;
    /**
     * Toggle muted property for all sounds.
     * @return `true` if all sounds are muted.
     */
    toggleMuteAll(): boolean;
    /**
     * Mutes all playing sounds.
     * @return Instance for chaining.
     */
    muteAll(): this;
    /**
     * Unmutes all playing sounds.
     * @return Instance for chaining.
     */
    unmuteAll(): this;
    /**
     * Stops and removes all sounds. They cannot be used after this.
     * @return Instance for chaining.
     */
    removeAll(): this;
    /**
     * Stops all sounds.
     * @return Instance for chaining.
     */
    stopAll(): this;
    /**
     * Checks if a sound by alias exists.
     * @param alias - Check for alias.
     * @return true if the sound exists.
     */
    exists(alias: string, assert?: boolean): boolean;
    /**
     * Find a sound by alias.
     * @param alias - The sound alias reference.
     * @return Sound object.
     */
    find(alias: string): Sound;
    /**
     * Plays a sound.
     * @method play
     * @instance
     * @param {string} alias - The sound alias reference.
     * @param {string} sprite - The alias of the sprite to play.
     * @return {IMediaInstance|null} The sound instance, this cannot be reused
     *         after it is done playing. Returns `null` if the sound has not yet loaded.
     */
    /**
     * Plays a sound.
     * @param alias - The sound alias reference.
     * @param {PlayOptions|Function} options - The options or callback when done.
     * @return The sound instance,
     *        this cannot be reused after it is done playing. Returns a Promise if the sound
     *        has not yet loaded.
     */
    play(alias: string, options?: PlayOptions | CompleteCallback | string): IMediaInstance | Promise<IMediaInstance>;
    /**
     * Stops a sound.
     * @param alias - The sound alias reference.
     * @return Sound object.
     */
    stop(alias: string): Sound;
    /**
     * Pauses a sound.
     * @param alias - The sound alias reference.
     * @return Sound object.
     */
    pause(alias: string): Sound;
    /**
     * Resumes a sound.
     * @param alias - The sound alias reference.
     * @return Instance for chaining.
     */
    resume(alias: string): Sound;
    /**
     * Get or set the volume for a sound.
     * @param alias - The sound alias reference.
     * @param volume - Optional current volume to set.
     * @return The current volume.
     */
    volume(alias: string, volume?: number): number;
    /**
     * Get or set the speed for a sound.
     * @param alias - The sound alias reference.
     * @param speed - Optional current speed to set.
     * @return The current speed.
     */
    speed(alias: string, speed?: number): number;
    /**
     * Get the length of a sound in seconds.
     * @param alias - The sound alias reference.
     * @return The current duration in seconds.
     */
    duration(alias: string): number;
    /**
     * Closes the sound library. This will release/destroy
     * the AudioContext(s). Can be used safely if you want to
     * initialize the sound library later. Use `init` method.
     */
    close(): this;
}

/**
 * Sound middleware installation utilities for PIXI.Loader
 * @class
 */
export declare class SoundLoader implements ILoaderPlugin {
    /** Install the middleware */
    static add(): void;
    /**
     * Set the legacy mode
     * @param legacy - Non-webaudio environments
     */
    static setLegacy(legacy: boolean): void;
    /** Handle the preprocessing of file paths */
    static pre(resource: ILoaderResource, next: () => void): void;
    /** Actual resource-loader middleware for sound class */
    static use(resource: ILoaderResource, next: () => void): void;
}

export declare type SoundMap = {
    [id: string]: Sound;
};

export declare type SoundSourceMap = {
    [id: string]: Options | string | ArrayBuffer | HTMLAudioElement;
};

/**
 * Object that represents a single Sound's sprite. To add sound sprites
 * use the {@link Sound#addSprites} method.
 * @class
 * @example
 * import { sound } from '@pixi/sound';
 * sound.add('alias', {
 *   url: 'path/to/file.ogg',
 *   sprites: {
 *     blast: { start: 0, end: 0.2 },
 *     boom: { start: 0.3, end: 0.5 },
 *   },
 *   loaded() {
 *     sound.play('alias', 'blast');
 *   }
 * );
 *
 */
export declare class SoundSprite {
    /**
     * The reference sound
     * @readonly
     */
    parent: Sound;
    /**
     * The starting location in seconds.
     * @readonly
     */
    start: number;
    /**
     * The ending location in seconds
     * @readonly
     */
    end: number;
    /**
     * The speed override where 1 is 100% speed playback.
     * @readonly
     */
    speed: number;
    /**
     * The duration of the sound in seconds.
     * @readonly
     */
    duration: number;
    /**
     * Whether to loop the sound sprite.
     * @readonly
     */
    loop: boolean;
    /**
     * @param parent - The parent sound
     * @param options - Data associated with object.
     */
    constructor(parent: Sound, options: SoundSpriteData);
    /**
     * Play the sound sprite.
     * @param {Function} [complete] - Function call when complete
     * @return Sound instance being played.
     */
    play(complete?: CompleteCallback): IMediaInstance | Promise<IMediaInstance>;
    /** Destroy and don't use after this */
    destroy(): void;
}

/**
 * Data for adding new sound sprites.
 */
export declare interface SoundSpriteData {
    /**
     * The start time in seconds.
     * @type {number}
     */
    start: number;
    /**
     * The end time in seconds.
     * @type {number}
     */
    end: number;
    /**
     * The optional speed, if not speed, uses the default speed of the parent.
     * @type {number}
     */
    speed?: number;
}

export declare type SoundSpriteDataMap = {
    [id: string]: SoundSpriteData;
};

export declare type SoundSprites = {
    [id: string]: SoundSprite;
};

/**
 * Output for cloning source node.
 */
declare interface SourceClone {
    /**
     * Cloned audio buffer source
     * @type {AudioBufferSourceNode}
     */
    source: AudioBufferSourceNode;
    /**
     * Independent volume control
     * @type {GainNode}
     */
    gain: GainNode;
}

/**
 * Filter for adding Stereo panning.
 *
 * @class
 * @memberof filters
 */
declare class StereoFilter extends Filter {
    /** The stereo panning node */
    private _stereo;
    /** The stereo panning node */
    private _panner;
    /** The amount of panning, -1 is left, 1 is right, 0 is centered */
    private _pan;
    /** @param {number} pan - The amount of panning, -1 is left, 1 is right, 0 is centered. */
    constructor(pan?: number);
    /** Set the amount of panning, where -1 is left, 1 is right, and 0 is centered */
    set pan(value: number);
    get pan(): number;
    destroy(): void;
}

/**
 * Creates a telephone-sound filter.
 *
 * @class
 * @memberof filters
 */
declare class TelephoneFilter extends Filter {
    constructor();
}

export declare const utils: {
    playOnce: typeof playOnce;
    render: typeof render;
    resolveUrl: typeof resolveUrl;
    sineTone: typeof sineTone;
    supported: {
        [key: string]: boolean;
    };
    extensions: string[];
    validateFormats: typeof validateFormats;
};

/**
 * Function to validate file type formats. This is called when the library initializes, but can
 * be called again if you need to recognize a format not listed in `utils.extensions` at
 * initialization.
 * @static
 * @param {object} typeOverrides - - Dictionary of type overrides (inputs for
 *                                 AudioElement.canPlayType()), keyed by extension from the
 *                                 utils.extensions array.
 */
declare function validateFormats(typeOverrides?: {
    [key: string]: string;
}): void;

export declare const webaudio: {
    WebAudioMedia: typeof WebAudioMedia;
    WebAudioInstance: typeof WebAudioInstance;
    WebAudioNodes: typeof WebAudioNodes;
    WebAudioContext: typeof WebAudioContext;
    WebAudioUtils: typeof WebAudioUtils;
};

/**
 * Main class to handle WebAudio API. There's a simple chain
 * of AudioNode elements: analyser > compressor > context.destination.
 * any filters that are added are inserted between the analyser and compressor nodes
 * @class
 * @memberof webaudio
 */
declare class WebAudioContext extends Filterable implements IMediaContext {
    /**
     * Context Compressor node
     * @readonly
     */
    compressor: DynamicsCompressorNode;
    /**
     * Context Analyser node
     * @readonly
     */
    analyser: AnalyserNode;
    /**
     * Global speed of all sounds
     * @readonly
     */
    speed: number;
    /**
     * Sets the muted state.
     * @default false
     */
    muted: boolean;
    /**
     * Sets the volume from 0 to 1.
     * @default 1
     */
    volume: number;
    /**
     * Handle global events
     * @type {PIXI.utils.EventEmitter}
     */
    events: EventEmitter;
    /** The instance of the AudioContext for WebAudio API. */
    private _ctx;
    /** The instance of the OfflineAudioContext for fast decoding audio. */
    private _offlineCtx;
    /** Current paused status */
    private _paused;
    /**
     * Indicated whether audio on iOS has been unlocked, which requires a touchend/mousedown event that plays an
     * empty sound.
     * @type {boolean}
     */
    private _unlocked;
    constructor();
    /**
     * Try to unlock audio on iOS. This is triggered from either WebAudio plugin setup (which will work if inside of
     * a `mousedown` or `touchend` event stack), or the first document touchend/mousedown event. If it fails (touchend
     * will fail if the user presses for too long, indicating a scroll event instead of a click event.
     *
     * Note that earlier versions of iOS supported `touchstart` for this, but iOS9 removed this functionality. Adding
     * a `touchstart` event to support older platforms may preclude a `mousedown` even from getting fired on iOS9, so we
     * stick with `mousedown` and `touchend`.
     */
    private _unlock;
    /**
     * Plays an empty sound in the web audio context.  This is used to enable web audio on iOS devices, as they
     * require the first sound to be played inside of a user initiated event (touch/click).
     */
    playEmptySound(): void;
    /**
     * Get AudioContext class, if not supported returns `null`
     * @readonly
     * @type {AudioContext}
     */
    static get AudioContext(): typeof AudioContext;
    /**
     * Get OfflineAudioContext class, if not supported returns `null`
     * @type {OfflineAudioContext}
     * @readonly
     */
    static get OfflineAudioContext(): typeof OfflineAudioContext;
    /** Destroy this context. */
    destroy(): void;
    /**
     * The WebAudio API AudioContext object.
     * @readonly
     * @type {AudioContext}
     */
    get audioContext(): AudioContext;
    /**
     * The WebAudio API OfflineAudioContext object.
     * @readonly
     * @type {OfflineAudioContext}
     */
    get offlineContext(): OfflineAudioContext;
    /**
     * Pauses all sounds, even though we handle this at the instance
     * level, we'll also pause the audioContext so that the
     * time used to compute progress isn't messed up.
     * @type {boolean}
     * @default false
     */
    set paused(paused: boolean);
    get paused(): boolean;
    /** Emit event when muted, volume or speed changes */
    refresh(): void;
    /** Emit event when muted, volume or speed changes */
    refreshPaused(): void;
    /**
     * Toggles the muted state.
     * @return The current muted state.
     */
    toggleMute(): boolean;
    /**
     * Toggles the paused state.
     * @return The current muted state.
     */
    togglePause(): boolean;
    /**
     * Decode the audio data
     * @param {ArrayBuffer} arrayBuffer - Buffer from loader
     * @param {Function} callback - When completed, error and audioBuffer are parameters.
     */
    decode(arrayBuffer: ArrayBuffer, callback: (err?: Error, buffer?: AudioBuffer) => void): void;
}

/**
 * A single play instance that handles the AudioBufferSourceNode.
 * @class
 * @memberof webaudio
 * @param {SoundNodes} source - Reference to the SoundNodes.
 */
declare class WebAudioInstance extends EventEmitter implements IMediaInstance {
    /**
     * The current unique ID for this instance.
     * @readonly
     */
    readonly id: number;
    /**
     * The source Sound.
     * @type {webaudio.WebAudioMedia}
     */
    private _media;
    /**
     * true if paused.
     * @type {boolean}
     */
    private _paused;
    /**
     * true if muted.
     * @type {boolean}
     */
    private _muted;
    /**
     * true if paused.
     * @type {boolean}
     */
    private _pausedReal;
    /**
     * The instance volume
     * @type {number}
     */
    private _volume;
    /**
     * Last update frame number.
     * @type {number}
     */
    private _lastUpdate;
    /**
     * The total number of seconds elapsed in playback.
     * @type {number}
     */
    private _elapsed;
    /**
     * Playback rate, where 1 is 100%.
     * @type {number}
     */
    private _speed;
    /**
     * Playback rate, where 1 is 100%.
     * @type {number}
     */
    private _end;
    /**
     * `true` if should be looping.
     * @type {boolean}
     */
    private _loop;
    /**
     * Gain node for controlling volume of instance
     * @type {GainNode}
     */
    private _gain;
    /**
     * Length of the sound in seconds.
     * @type {number}
     */
    private _duration;
    /**
     * The progress of the sound from 0 to 1.
     * @type {number}
     */
    private _progress;
    /**
     * Audio buffer source clone from Sound object.
     * @type {AudioBufferSourceNode}
     */
    private _source;
    constructor(media: WebAudioMedia);
    /**
     * Set a property by name, this makes it easy to chain values
     * @param {string} name - - Values include: 'speed', 'volume', 'muted', 'loop', 'paused'
     * @param {number|boolean} value - - Value to set property to
     */
    set(name: 'speed' | 'volume' | 'muted' | 'loop' | 'paused', value: number | boolean): this;
    /** Stops the instance, don't use after this. */
    stop(): void;
    /** Set the instance speed from 0 to 1 */
    get speed(): number;
    set speed(speed: number);
    /** Get the set the volume for this instance from 0 to 1 */
    get volume(): number;
    set volume(volume: number);
    /** `true` if the sound is muted */
    get muted(): boolean;
    set muted(muted: boolean);
    /** If the sound instance should loop playback */
    get loop(): boolean;
    set loop(loop: boolean);
    /** Refresh loop, volume and speed based on changes to parent */
    refresh(): void;
    /** Handle changes in paused state, either globally or sound or instance */
    refreshPaused(): void;
    /**
     * Plays the sound.
     * @param {Object} options - Play options
     * @param {number} options.start - The position to start playing, in seconds.
     * @param {number} options.end - The ending position in seconds.
     * @param {number} options.speed - Speed for the instance
     * @param {boolean} options.loop - If the instance is looping, defaults to sound loop
     * @param {number} options.volume - Volume of the instance
     * @param {boolean} options.muted - Muted state of instance
     */
    play(options: PlayOptions): void;
    /**
     * Start the update progress.
     * @type {boolean}
     */
    private enableTicker;
    /**
     * The current playback progress from 0 to 1.
     * @type {number}
     */
    get progress(): number;
    /**
     * Pauses the sound.
     * @type {boolean}
     */
    get paused(): boolean;
    set paused(paused: boolean);
    /** Don't use after this. */
    destroy(): void;
    /**
     * To string method for instance.
     * @return The string representation of instance.
     */
    toString(): string;
    /**
     * Get the current time in seconds.
     * @return Seconds since start of context
     */
    private _now;
    /**
     * Callback for update listener
     * @type {Function}
     */
    private _updateListener;
    /** Internal update the progress. */
    private _update;
    /** Initializes the instance. */
    init(media: WebAudioMedia): void;
    /** Stops the instance. */
    private _internalStop;
    /** Callback when completed. */
    private _onComplete;
}

/**
 * Represents a single sound element. Can be used to play, pause, etc. sound instances.
 * @class
 * @memberof webaudio
 */
declare class WebAudioMedia implements IMedia {
    /**
     * Reference to the parent Sound container.
     * @type {Sound}
     * @readonly
     */
    parent: Sound;
    /**
     * The file buffer to load.
     * @readonly
     */
    source: ArrayBuffer;
    /**
     * Instance of the chain builder.
     * @type {webaudio.WebAudioNodes}
     */
    private _nodes;
    /** Instance of the source node. */
    private _source;
    /**
     * Re-initialize without constructing.
     * @param {Sound} parent - - Instance of parent Sound container
     */
    init(parent: Sound): void;
    /** Destructor, safer to use `SoundLibrary.remove(alias)` to remove this sound. */
    destroy(): void;
    create(): WebAudioInstance;
    get context(): WebAudioContext;
    get isPlayable(): boolean;
    get filters(): Filter[];
    set filters(filters: Filter[]);
    get duration(): number;
    /** Gets and sets the buffer. */
    get buffer(): AudioBuffer;
    set buffer(buffer: AudioBuffer);
    /**
     * Get the current chained nodes object
     * @type {webaudio.WebAudioNodes}
     */
    get nodes(): WebAudioNodes;
    load(callback?: LoadedCallback): void;
    /** Loads a sound using XHMLHttpRequest object. */
    private _loadUrl;
    /**
     * Decodes the array buffer.
     * @param arrayBuffer - From load.
     * @param {Function} callback - Callback optional
     */
    private _decode;
}

/**
 * @class
 * @memberof webaudio
 */
declare class WebAudioNodes extends Filterable {
    /**
     * The buffer size for script processor, default is `0` which auto-detects. If you plan to use
     * script node on iOS, you'll need to provide a non-zero amount.
     * @type {number}
     * @default 0
     */
    static BUFFER_SIZE: number;
    /**
     * Get the buffer source node
     * @type {AudioBufferSourceNode}
     * @readonly
     */
    bufferSource: AudioBufferSourceNode;
    /**
     * Get the gain node
     * @type {GainNode}
     * @readonly
     */
    gain: GainNode;
    /**
     * Get the analyser node
     * @type {AnalyserNode}
     * @readonly
     */
    analyser: AnalyserNode;
    /**
     * Reference to the SoundContext
     * @type {webaudio.WebAudioContext}
     * @readonly
     */
    context: WebAudioContext;
    /**
     * Private reference to the script processor node.
     * @type {ScriptProcessorNode}
     */
    private _script;
    /**
     * @param {webaudio.WebAudioContext} audioContext - The audio context.
     */
    constructor(context: WebAudioContext);
    /**
     * Get the script processor node.
     * @readonly
     * @type {ScriptProcessorNode}
     */
    get script(): ScriptProcessorNode;
    /** Cleans up. */
    destroy(): void;
    /**
     * Clones the bufferSource. Used just before playing a sound.
     * @returns {SourceClone} The clone AudioBufferSourceNode.
     */
    cloneBufferSource(): SourceClone;
    /**
     * Get buffer size of `ScriptProcessorNode`.
     * @readonly
     * @type {number}
     */
    get bufferSize(): number;
}

/**
 * Internal class for Web Audio abstractions and convenience methods.
 * @class
 * @memberof webaudio
 */
declare class WebAudioUtils {
    /**
     * Dezippering is removed in the future Web Audio API, instead
     * we use the `setValueAtTime` method, however, this is not available
     * in all environments (e.g., Android webview), so we fallback to the `value` setter.
     * @param param - AudioNode parameter object
     * @param value - Value to set
     * @return The value set
     */
    static setParamValue(param: AudioParam, value: number): number;
}

export { }
