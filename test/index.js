// Require pixi
require('pixi.js');

// Import the library
const library = require(global.__libraryPath);
const path = require('path');

// Global reference to the resources
global.__resources = path.join(__dirname, 'resources');

const manifest = {
    "alert-4": path.join(__resources, "alert-4.mp3"),
    "alert-7": path.join(__resources, "alert-7.mp3"),
    "alert-12": path.join(__resources, "alert-12.mp3"),
    "musical-11": path.join(__resources, "musical-11.mp3"),
    "silence": path.join(__resources, "silence.mp3")
};

describe('PIXI.sound', function()
{
    before(function()
    {
        this.library = library.default;
    });

    after(function()
    {
        this.library.removeAll();
        delete this.library;
    });

    it('should have the correct classes', function()
    {
        expect(PIXI.sound).to.be.a.function;
        expect(PIXI.sound.Sound).to.be.a.function;
        expect(PIXI.sound.SoundUtils).to.be.a.function;
        expect(PIXI.sound.SoundInstance).to.be.a.function;
        expect(PIXI.sound.SoundLibrary).to.be.a.function;
        expect(PIXI.sound).to.be.instanceof(PIXI.sound.SoundLibrary);
        expect(library.default).to.equal(PIXI.sound);
    });

    it('should load file with Node\'s filesystem', function(done)
    {
        this.library.add('silence',
        {
            preload: true,
            src: manifest.silence,
            useXHR: false,
            loaded: (err, sound) => {
                expect(sound.isLoaded).to.be.true;
                expect(sound.isPlayable).to.be.true;
                expect(sound.autoPlay).to.be.false;
                expect(sound.loop).to.be.false;
                expect(sound.preload).to.be.true;
                expect(sound).to.be.instanceof(this.library.Sound);
                this.library.removeAll();
                done();
            }
        });
    });

    it('should load a manifest', function(done)
    {
        this.slow(200);
        let counter = 0;
        this.library.addMap(manifest, {
            preload: true,
            loaded: (err, sound) => {
                expect(sound.isLoaded).to.be.true;
                expect(sound.isPlayable).to.be.true;
                expect(sound.autoPlay).to.be.false;
                expect(sound.loop).to.be.false;
                expect(sound.preload).to.be.true;
                expect(sound).to.be.instanceof(this.library.Sound);
                counter++;
                if (counter === Object.keys(manifest).length)
                {
                    done();
                }
            }
        });
    });

    it('should get a reference by alias', function()
    {
        const sound = this.library.find('alert-7');
        expect(sound).to.not.be.undefined;
        expect(sound).to.be.instanceof(this.library.Sound);
    });

    it('should play multiple at once', function()
    {
        const sound = this.library.find('alert-12');
        sound.play();
        sound.play();
        sound.play();
        sound.play();
        expect(sound.instances.length).to.equal(4);
        sound.stop();
        expect(sound.instances.length).to.equal(0);
    });

    it('should play with blocking', function()
    {
        const sound = this.library.find('alert-4');
        sound.block = true;
        sound.play();
        sound.play();
        sound.play();
        sound.play();
        expect(sound.instances.length).to.equal(1);
        sound.stop();
        expect(sound.instances.length).to.equal(0);
        sound.block = false;
    });

    it('should play with stopping single instance', function()
    {
        const sound = this.library.find('alert-4');
        sound.play();
        sound.play();
        sound.play();
        const instance = sound.play();
        instance.stop();
        expect(sound.instances.length).to.equal(3);
        sound.stop();
        expect(sound.instances.length).to.equal(0);
    });

    it('should play a sound by alias', function(done)
    {
        this.library.play('silence', {
            complete: function()
            {
                done();
            }
        });
    });

    it('should remove all sounds', function()
    {
        this.library.removeAll();
        expect(Object.keys(this.library._sounds).length).to.equal(0);
    });

    it('should load a sound file', function(done)
    {
        const alias = 'silence';
        const sound = this.library.add(alias, {
            src: manifest[alias],
            volume: 0,
            preload: true,
            loaded: (err, instance) =>
            {
                expect(err).to.be.null;
                expect(instance).to.equal(sound);
                expect(instance.isPlayable).to.be.true;
                expect(this.library.exists(alias)).to.be.true;
                this.library.remove(alias);
                expect(this.library.exists(alias)).to.be.false;
                done();
            }
        });
        expect(sound.isLoaded).to.be.false;
        expect(sound.isPlayable).to.be.false;
    });

    it('should play a file', function(done)
    {
        const alias = 'silence';
        const sound = this.library.add(alias, {
            src: manifest[alias],
            preload: true,
            loaded: () =>
            {
                expect(this.library.volume(alias)).to.equal(1);
                this.library.volume(alias, 0);
                expect(this.library.volume(alias)).to.equal(0);
                expect(sound.volume).to.equal(0);

                const instance = this.library.play(alias, () =>
                {
                    expect(instance.progress).to.equal(1);
                    this.library.remove(alias);
                    done();
                });

                expect(instance.progress).to.equal(0);

                // Pause
                this.library.pause(alias);
                expect(sound.isPlaying).to.be.false;

                // Resume
                this.library.resume(alias);
                expect(sound.isPlaying).to.be.true;
            }
        });
    });

    it('sound play once a file', function(done)
    {
        const alias = this.library.SoundUtils.playOnce(manifest.silence, (err) =>
        {
            expect(alias).to.be.ok;
            expect(this.library.exists(alias)).to.be.false;
            expect(err).to.be.null;
            done();
        });
    });

    it('should play a sine tone', function(done)
    {
        this.slow(300);
        const sound = this.library.SoundUtils.sineTone(200, 0.1);
        sound.volume = 0;
        sound.play(() => {
            done();
        });
        expect(sound.isPlaying);
    });
});

describe('PIXI.loader', function()
{
    afterEach(function()
    {
        library.default.removeAll();
    });

    it('should load files with the PIXI.loader', function(done)
    {
        this.slow(200);
        for (const name in manifest)
        {
            PIXI.loader.add(name, manifest[name]);
        }
        PIXI.loader.load((loader, resources) =>
        {
            expect(Object.keys(resources).length).to.equal(5);
            for (const name in resources)
            {
                expect(resources[name]).to.be.ok;
                expect(resources[name].data).to.be.instanceof(ArrayBuffer);
                expect(resources[name].sound).to.be.ok;
                const sound = resources[name].sound;
                expect(sound).to.be.instanceof(library.default.Sound);
                expect(sound.isLoaded).to.be.true;
                expect(sound.isPlayable).to.be.true;
            }
            done();
        });
    });
});
