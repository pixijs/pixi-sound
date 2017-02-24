import * as path from "path";
import Filter from "./filters/Filter";
import soundLibrary from "./index";
import SoundContext from "./SoundContext";
import SoundInstance from "./SoundInstance";
import SoundNodes from "./SoundNodes";
import SoundSprite from "./SoundSprite";
import {SoundSpriteData} from "./SoundSprite";

export interface Options {
    autoPlay?: boolean;
    preaload?: boolean;
    singleInstance?: boolean;
    volume?: number;
    speed?: number;
    complete?: CompleteCallback;
    loaded?: LoadedCallback;
    preload?: boolean;
    loop?: boolean;
    src?: string;
    srcBuffer?: ArrayBuffer;
    useXHR?: boolean;
    sprites?: {[id: string]: SoundSpriteData};
}

export type SoundSprites = {[id: string]: SoundSprite};

export interface PlayOptions {
    start?: number;
    end?: number;
    speed?: number;
    loop?: boolean;
    fadeIn?: number;
    fadeOut?: number;
    sprite?: string;
    complete?: CompleteCallback;
    loaded?: LoadedCallback;
}

/**
 * Callback when sound is loaded.
 * @callback PIXI.sound.Sound~loadedCallback
 * @param {Error} err The callback error.
 * @param {PIXI.sound.Sound} sound The instance of new sound.
 * @param {PIXI.sound.SoundInstance} instance The instance of auto-played sound.
 */
export declare type LoadedCallback = (err: Error, sound?: Sound, instance?: SoundInstance) => void;

/**
 * Callback when sound is completed.
 * @callback PIXI.sound.Sound~completeCallback
 * @param {PIXI.sound.Sound} sound The instance of sound.
 */
export declare type CompleteCallback = (sound: Sound) => void;

/**
 * Represents a single sound element. Can be used to play, pause, etc. sound instances.
 *
 * @class Sound
 * @memberof PIXI.sound
 * @example
 * const foo = PIXI.sound.Sound.from('foo.mp3');
 * foo.play();
 * @param {PIXI.sound.SoundContext} context The SoundContext instance.
 * @param {ArrayBuffer|String|Object} options Either the path or url to the source file.
 *        or the object of options to use. See {@link PIXI.sound.Sound.from}
 */
export default class Sound
{
    /**
     * `true` if the buffer is loaded.
     * @name PIXI.sound.Sound#isLoaded
     * @type {Boolean}
     * @default false
     */
    public isLoaded: boolean;

    /**
     * `true` if the sound is currently being played.
     * @name PIXI.sound.Sound#isPlaying
     * @type {Boolean}
     * @default false
     * @readOnly
     */
    public isPlaying: boolean;

    /**
     * true to start playing immediate after load.
     * @name PIXI.sound.Sound#autoPlay
     * @type {Boolean}
     * @private
     * @default false
     * @readOnly
     */
    public autoPlay: boolean;

    /**
     * `true` to disallow playing multiple layered instances at once.
     * @name PIXI.sound.Sound#singleInstance
     * @type {Boolean}
     * @default false
     */
    public singleInstance: boolean;

    /**
     * `true` to immediately start preloading.
     * @name PIXI.sound.Sound#preload
     * @type {Boolean}
     * @default false
     * @readOnly
     */
    public preload: boolean;

    /**
     * The file source to load.
     * @name PIXI.sound.Sound#src
     * @type {String}
     * @readOnly
     */
    public src: string;

    /**
     * The file buffer to load.
     * @name PIXI.sound.Sound#srcBuffer
     * @type {ArrayBuffer}
     * @readOnly
     */
    public srcBuffer: ArrayBuffer;

    /**
     * `true` to use XMLHttpRequest object to load.
     * Default is to use NodeJS's fs module to read the sound.
     * @name PIXI.sound.Sound#useXHR
     * @type {Boolean}
     * @default false
     */
    public useXHR: boolean;

    /**
     * The options when auto-playing.
     * @name PIXI.sound.Sound#_autoPlayOptions
     * @type {PlayOptions}
     * @private
     */
    private _autoPlayOptions: PlayOptions;

    /**
     * The internal volume.
     * @name PIXI.sound.Sound#_volume
     * @type {Number}
     * @private
     */
    private _volume: number;

    /**
     * Reference to the sound context.
     * @name PIXI.sound.Sound#_context
     * @type {SoundContext}
     * @private
     */
    private _sprites: SoundSprites;

    /**
     * Reference to the sound context.
     * @name PIXI.sound.Sound#_context
     * @type {SoundContext}
     * @private
     */
    private _context: SoundContext;

    /**
     * Instance of the chain builder.
     * @name PIXI.sound.Sound#_nodes
     * @type {SoundNodes}
     * @private
     */
    private _nodes: SoundNodes;

    /**
     * Instance of the source node.
     * @name PIXI.sound.Sound#_source
     * @type {AudioBufferSourceNode}
     * @private
     */
    private _source: AudioBufferSourceNode;

    /**
     * The collection of instances being played.
     * @name PIXI.sound.Sound#_instances
     * @type {Array<SoundInstance>}
     * @private
     */
    private _instances: SoundInstance[];

    /**
     * Create a new sound instance from source.
     * @method PIXI.sound.Sound.from
     * @param {ArrayBuffer|String|Object} options Either the path or url to the source file.
     *        or the object of options to use.
     * @param {ArrayBuffer|String} [options.src] If `options` is an object, the source of file.
     * @param {Boolean} [options.autoPlay=false] true to play after loading.
     * @param {Boolean} [options.preload=false] true to immediately start preloading.
     * @param {Boolean} [options.singleInstance=false] `true` to disallow playing multiple layered instances at once.
     * @param {Number} [options.volume=1] The amount of volume 1 = 100%.
     * @param {Boolean} [options.useXHR=true] true to use XMLHttpRequest to load the sound. Default is false,
     *        loaded with NodeJS's `fs` module.
     * @param {Number} [options.speed=1] The playback rate where 1 is 100% speed.
     * @param {Object} [options.sprites] The map of sprite data. Where a sprite is an object
     *        with a `start` and `end`, which are the times in seconds. Optionally, can include
     *        a `speed` amount where 1 is 100% speed.
     * @param {PIXI.sound.Sound~completeCallback} [options.complete=null] Global complete callback
     *        when play is finished.
     * @param {PIXI.sound.Sound~loadedCallback} [options.loaded=null] Call when finished loading.
     * @param {Boolean} [options.loop=false] true to loop the audio playback.
     * @return {PIXI.sound.Sound} Created sound instance.
     */
    public static from(options: string|Options|ArrayBuffer): Sound
    {
        return new Sound(soundLibrary.context, options);
    }

    constructor(context: SoundContext, source: string|Options|ArrayBuffer)
    {
        let options: Options = {};

        if (typeof source === "string")
        {
            options.src = source as string;
        }
        else if (source instanceof ArrayBuffer)
        {
            options.srcBuffer = source as ArrayBuffer;
        }
        else
        {
            options = source;
        }

        // Default settings
        options = Object.assign({
            autoPlay: false,
            singleInstance: false,
            src: null,
            srcBuffer: null,
            preload: false,
            volume: 1,
            speed: 1,
            complete: null,
            loaded: null,
            loop: false,
            useXHR: true,
        }, options);

        this._context = context;
        this._nodes = new SoundNodes(this._context);
        this._source = this._nodes.bufferSource;
        this._instances = [];
        this._sprites = {};

        const complete = options.complete;
        this._autoPlayOptions = complete ? { complete } : null;

        this.isLoaded = false;
        this.isPlaying = false;
        this.autoPlay = options.autoPlay;
        this.singleInstance = options.singleInstance;
        this.preload = options.preload || this.autoPlay;
        this.src = options.src;
        this.srcBuffer = options.srcBuffer;
        this.useXHR = options.useXHR;
        this.volume = options.volume;
        this.loop = options.loop;
        this.speed = options.speed;

        if (options.sprites)
        {
            this.addSprites(options.sprites);
        }

        if (this.preload)
        {
            this._beginPreload(options.loaded);
        }
    }

    /**
     * Destructor, safer to use `SoundLibrary.remove(alias)` to remove this sound.
     * @private
     * @method PIXI.sound.Sound#destroy
     */
    public destroy(): void
    {
        // destroy this._nodes
        this._nodes.destroy();
        this._nodes = null;
        this._context = null;
        this._source = null;

        this.removeSprites();
        this._sprites = null;

        this.srcBuffer = null;

        this._removeInstances();
        this._instances = null;
    }

    /**
     * If the current sound is playable (loaded).
     * @name PIXI.sound.Sound#isPlayable
     * @type {Boolean}
     * @readOnly
     */
    public get isPlayable(): boolean
    {
        return this.isLoaded && !!this._source && !!this._source.buffer;
    }

    /**
     * The current current sound being played in.
     * @name PIXI.sound.Sound#context
     * @type {PIXI.sound.SoundContext}
     * @readOnly
     */
    public get context(): SoundContext
    {
        return this._context;
    }

    /**
     * Gets and sets the volume.
     * @name PIXI.sound.Sound#volume
     * @type {Number}
     */
    public get volume(): number
    {
        return this._volume;
    }
    public set volume(volume: number)
    {
        this._volume = this._nodes.gain.gain.value = volume;
    }

    /**
     * Gets and sets the looping.
     * @name PIXI.sound.Sound#loop
     * @type {Boolean}
     */
    public get loop(): boolean
    {
        return this._source.loop;
    }
    public set loop(loop: boolean)
    {
        this._source.loop = !!loop;
    }

    /**
     * Gets and sets the buffer.
     * @name PIXI.sound.Sound#buffer
     * @type {AudioBuffer}
     */
    public get buffer(): AudioBuffer
    {
        return this._source.buffer;
    }
    public set buffer(buffer: AudioBuffer)
    {
        this._source.buffer = buffer;
    }

    /**
     * Get the duration in seconds.
     * @name PIXI.sound.Sound#duration
     * @type {number}
     */
    public get duration(): number
    {
        // @if DEBUG
        console.assert(this.isPlayable, "Sound not yet playable, no duration");
        // @endif
        return this._source.buffer.duration;
    }

    /**
     * Get the current chained nodes object
     * @private
     * @name PIXI.sound.Sound#nodes
     * @type {PIXI.sound.SoundNodes}
     */
    public get nodes(): SoundNodes
    {
        return this._nodes;
    }

    /**
     * Push the collection of filteres
     * @name PIXI.sound.Sound#filters
     * @type {PIXI.sound.SoundNodes}
     */
    public get filters(): Filter[]
    {
        return this._nodes.filters;
    }
    public set filters(filters: Filter[])
    {
        this._nodes.filters = filters;
    }

    /**
     * The playback rate where 1 is 100%
     * @name PIXI.sound.Sound#speed
     * @type {Number}
     * @default 1
     */
    public get speed(): number
    {
        return this._source.playbackRate.value;
    }
    public set speed(value: number)
    {
        this._source.playbackRate.value = value;
    }

    /**
     * Gets the list of instances that are currently being played of this sound.
     * @name PIXI.sound.Sound#instances
     * @type {Array<SoundInstance>}
     * @readOnly
     */
    public get instances(): SoundInstance[]
    {
        return this._instances;
    }

    /**
     * Get the map of sprites.
     * @name PIXI.sound.Sound#sprites
     * @type {Object}
     * @readOnly
     */
    public get sprites(): SoundSprites
    {
        return this._sprites;
    }

    /**
     * Add a sound sprite, which is a saved instance of a longer sound.
     * Similar to an image spritesheet.
     * @method PIXI.sound.Sound#addSprites
     * @param {String} alias The unique name of the sound sprite.
     * @param {object} data Either completed function or play options.
     * @param {Number} data.start Time when to play the sound in seconds.
     * @param {Number} data.end Time to end playing in seconds.
     * @param {Number} [data.speed] Override default speed, default to the Sound's speed setting.
     * @return {PIXI.sound.SoundSprite} Sound sprite result.
     */
    public addSprites(alias: string, data: SoundSpriteData): SoundSprite;

    /**
     * Convenience method to add more than one sprite add a time.
     * @method PIXI.sound.Sound#addSprites
     * @param {Object} data Map of sounds to add where the key is the alias,
     *        and the data are configuration options, see {@PIXI.sound.Sound#addSprite} for info on data.
     * @return {Object} The map of sound sprites added.
     */
    public addSprites(sprites: {[id: string]: SoundSpriteData}): SoundSprites;

    // Actual implementation
    public addSprites(source: string|{[id: string]: SoundSpriteData}, data?: SoundSpriteData): SoundSprite|SoundSprites
    {
        if (typeof source === "object")
        {
            const results: SoundSprites = {};
            for (const alias in source)
            {
                results[alias] = this.addSprites(alias, source[alias]);
            }
            return results;
        }
        else if (typeof source === "string")
        {
            console.assert(!this._sprites[source], `Alias ${source} is already taken`);
            const sprite = new SoundSprite(this, data);
            this._sprites[source] = sprite;
            return sprite;
        }
    }

    /**
     * Remove all sound sprites.
     * @method PIXI.sound.Sound#removeSprites
     * @return {PIXI.sound.Sound} Sound instance for chaining.
     */

    /**
     * Remove a sound sprite.
     * @method PIXI.sound.Sound#removeSprites
     * @param {String} alias The unique name of the sound sprite.
     * @return {PIXI.sound.Sound} Sound instance for chaining.
     */
    public removeSprites(alias?: string): Sound
    {
        if (!alias)
        {
            for (const name in this._sprites)
            {
                this.removeSprites(name);
            }
        }
        else
        {
            const sprite: SoundSprite = this._sprites[alias];

            if (sprite !== undefined)
            {
                sprite.destroy();
                delete this._sprites[alias];
            }
        }
        return this;
    }

    /**
     * Play a sound sprite, which is a saved instance of a longer sound.
     * Similar to an image spritesheet.
     * @method PIXI.sound.Sound#play
     * @param {String} alias The unique name of the sound sprite.
     * @param {object} data Either completed function or play options.
     * @param {Number} data.start Time when to play the sound in seconds.
     * @param {Number} data.end Time to end playing in seconds.
     * @param {Number} [data.speed] Override default speed, default to the Sound's speed setting.
     * @param {PIXI.sound.Sound~completeCallback} [callback] Callback when completed.
     * @return {PIXI.sound.SoundInstance|Promise<PIXI.sound.SoundInstance>} The sound instance,
     *        this cannot be reused after it is done playing. Returns a Promise if the sound
     *        has not yet loaded.
     */
    public play(alias: string, callback?: CompleteCallback): SoundInstance|Promise<SoundInstance>;

    /**
     * Plays the sound.
     * @method PIXI.sound.Sound#play
     * @param {PIXI.sound.Sound~completeCallback|object} options Either completed function or play options.
     * @param {Number} [options.start=0] Time when to play the sound in seconds.
     * @param {Number} [options.end] Time to end playing in seconds.
     * @param {String} [options.sprite] Play a named sprite. Will override end, start and speed options.
     * @param {Number} [options.fadeIn] Amount of time to fade in volume. If less than 10,
     *        considered seconds or else milliseconds.
     * @param {Number} [options.fadeOut] Amount of time to fade out volume. If less than 10,
     *        considered seconds or else milliseconds.
     * @param {Number} [options.speed] Override default speed, default to the Sound's speed setting.
     * @param {Boolean} [options.loop] Override default loop, default to the Sound's loop setting.
     * @param {PIXI.sound.Sound~completeCallback} [options.complete] Callback when complete.
     * @param {PIXI.sound.Sound~loadedCallback} [options.loaded] If the sound isn't already preloaded, callback when
     *        the audio has completely finished loading and decoded.
     * @return {PIXI.sound.SoundInstance|Promise<PIXI.sound.SoundInstance>} The sound instance,
     *        this cannot be reused after it is done playing. Returns a Promise if the sound
     *        has not yet loaded.
     */
    public play(source?: PlayOptions|CompleteCallback,
                callback?: CompleteCallback): SoundInstance|Promise<SoundInstance>;

    // Overloaded function
    public play(source?: any, complete?: CompleteCallback): SoundInstance|Promise<SoundInstance>
    {
        let options: PlayOptions;

        if (typeof source === "string")
        {
            const sprite: string = source as string;
            options = { sprite, complete };
        }
        else if (typeof source === "function")
        {
            options = {};
            options.complete = source as CompleteCallback;
        }
        else
        {
            options = source as PlayOptions;
        }

        options = Object.assign({
            complete: null,
            loaded: null,
            sprite: null,
            start: 0,
            fadeIn: 0,
            fadeOut: 0,
        }, options || {});

        // A sprite is specified, add the options
        if (options.sprite)
        {
            const alias: string = options.sprite;
            // @if DEBUG
            console.assert(!!this._sprites[alias], `Alias ${alias} is not available`);
            // @endif
            const sprite: SoundSprite = this._sprites[alias];
            options.start = sprite.start;
            options.end = sprite.end;
            options.speed = sprite.speed;
            delete options.sprite;
        }

        // @deprecated offset option
        if ((options as any).offset) {
            options.start = (options as any).offset as number;
        }

        // if not yet playable, ignore
        // - usefull when the sound download isnt yet completed
        if (!this.isLoaded)
        {
            return new Promise<SoundInstance>((resolve, reject) =>
            {
                this.autoPlay = true;
                this._autoPlayOptions = options;
                this._beginPreload((err: Error, sound: Sound, instance: SoundInstance) =>
                {
                    if (err)
                    {
                        reject(err);
                    }
                    else
                    {
                        if (options.loaded)
                        {
                            options.loaded(err, sound, instance);
                        }
                        resolve(instance);
                    }
                });
            });
        }

        // Stop all sounds
        if (this.singleInstance)
        {
            this._removeInstances();
        }

        // clone the bufferSource
        const instance = SoundInstance.create(this);
        this._instances.push(instance);
        this.isPlaying = true;
        instance.once("end", () => {
            if (options.complete)
            {
                options.complete(this);
            }
            this._onComplete(instance);
        });
        instance.once("stop", () => {
            this._onComplete(instance);
        });

        instance.play(
            options.start,
            options.end,
            options.speed,
            options.loop,
            options.fadeIn,
            options.fadeOut,
        );
        return instance;
    }

    /**
     * Stops all the instances of this sound from playing.
     * @method PIXI.sound.Sound#stop
     * @return {PIXI.sound.Sound} Instance of this sound.
     */
    public stop(): Sound
    {
        if (!this.isPlayable)
        {
            this.autoPlay = false;
            this._autoPlayOptions = null;
            return this;
        }
        this.isPlaying = false;

        // Go in reverse order so we don't skip items
        for (let i = this._instances.length - 1; i >= 0; i--)
        {
            this._instances[i].stop();
        }
        return this;
    }

    /**
     * Stops all the instances of this sound from playing.
     * @method PIXI.sound.Sound#pause
     * @return {PIXI.sound.Sound} Instance of this sound.
     */
    public pause(): Sound
    {
        for (let i = this._instances.length - 1; i >= 0; i--)
        {
            this._instances[i].paused = true;
        }
        this.isPlaying = false;
        return this;
    };

    /**
     * Resuming all the instances of this sound from playing
     * @method PIXI.sound.Sound#resume
     * @return {PIXI.sound.Sound} Instance of this sound.
     */
    public resume(): Sound
    {
        for (let i = this._instances.length - 1; i >= 0; i--)
        {
            this._instances[i].paused = false;
        }
        this.isPlaying = this._instances.length > 0;
        return this;
    }

    /**
     * Starts the preloading of sound.
     * @method PIXI.sound.Sound#_beginPreload
     * @private
     */
    private _beginPreload(callback?: LoadedCallback): void
    {
        // Load from the file path
        if (this.src)
        {
            this.useXHR ? this._loadUrl(callback) : this._loadPath(callback);
        }
        // Load from the arraybuffer, incase it was loaded outside
        else if (this.srcBuffer)
        {
            this._decode(this.srcBuffer, callback);
        }
        else if (callback)
        {
            callback(new Error("sound.src or sound.srcBuffer must be set"));
        }
        else
        {
            console.error("sound.src or sound.srcBuffer must be set");
        }
    }

    /**
     * Sound instance completed.
     * @method PIXI.sound.Sound#_onComplete
     * @private
     * @param {PIXI.sound.SoundInstance} instance
     */
    private _onComplete(instance: SoundInstance): void
    {
        if (this._instances)
        {
            const index = this._instances.indexOf(instance);
            if (index > -1)
            {
                this._instances.splice(index, 1);
            }
            this.isPlaying = this._instances.length > 0;
        }
        instance.destroy();
    }

    /**
     * Removes all instances.
     * @method PIXI.sound.Sound#_removeInstances
     * @private
     */
    private _removeInstances(): void
    {
        // destroying also stops
        for (let i = this._instances.length - 1; i >= 0; i--)
        {
            this._instances[i].destroy();
        }
        this._instances.length = 0;
    }

    /**
     * Loads a sound using XHMLHttpRequest object.
     * @method PIXI.sound.Sound#_loadUrl
     * @private
     */
    private _loadUrl(callback?: LoadedCallback): void
    {
        const request = new XMLHttpRequest();
        const src: string = this.src;
        request.open("GET", src, true);
        request.responseType = "arraybuffer";

        // Decode asynchronously
        request.onload = () => {
            this.srcBuffer = request.response as ArrayBuffer;
            this._decode(request.response, callback);
        };

        // actually start the request
        request.send();
    }

    /**
     * Loads using the file system (NodeJS's fs module).
     * @method PIXI.sound.Sound#_loadPath
     * @private
     */
    private _loadPath(callback?: LoadedCallback)
    {
        const fs = require("fs");
        const src: string = this.src;
        fs.readFile(src, (err: Error, data: Buffer) => {
            if (err)
            {
                // @if DEBUG
                console.error(err);
                // @endif
                if (callback)
                {
                    callback(new Error(`File not found ${this.src}`));
                }
                return;
            }
            const arrayBuffer = new ArrayBuffer(data.length);
            const view = new Uint8Array(arrayBuffer);
            for (let i = 0; i < data.length; ++i)
            {
                view[i] = data[i];
            }
            this.srcBuffer = arrayBuffer;
            this._decode(arrayBuffer, callback);
        });
    }

    /**
     * Decodes the array buffer.
     * @method PIXI.sound.Sound#decode
     * @param {ArrayBuffer} arrayBuffer From load.
     * @private
     */
    private _decode(arrayBuffer: ArrayBuffer, callback?: LoadedCallback): void
    {
        this._context.decode(arrayBuffer, (err: Error, buffer: AudioBuffer) =>
        {
                if (err)
                {
                    if (callback)
                    {
                        callback(err);
                    }
                }
                else
                {
                    this.isLoaded = true;
                    this.buffer = buffer;
                    let instance: SoundInstance;
                    if (this.autoPlay)
                    {
                        instance = this.play(this._autoPlayOptions) as SoundInstance;
                    }
                    if (callback)
                    {
                        callback(null, this, instance);
                    }
                }
            },
        );
    }
}
