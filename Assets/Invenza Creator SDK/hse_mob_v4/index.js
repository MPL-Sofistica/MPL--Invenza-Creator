(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.f1 = function() {
	this.initialize(img.f1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,725);


(lib.f10 = function() {
	this.initialize(img.f10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,720);


(lib.f12 = function() {
	this.initialize(img.f12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,720);


(lib.f13 = function() {
	this.initialize(img.f13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,720);


(lib.f14 = function() {
	this.initialize(img.f14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,720);


(lib.f15 = function() {
	this.initialize(img.f15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,725);


(lib.f2 = function() {
	this.initialize(img.f2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,725);


(lib.f3 = function() {
	this.initialize(img.f3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,725);


(lib.f4 = function() {
	this.initialize(img.f4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,720);


(lib.f5 = function() {
	this.initialize(img.f5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,725);


(lib.f6 = function() {
	this.initialize(img.f6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,725);


(lib.f7 = function() {
	this.initialize(img.f7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,725);


(lib.f8 = function() {
	this.initialize(img.f8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,720);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.visitado = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#009900").ss(5,1,1).p("AOYAAQAAF9kNEOQkNENl+AAQl9AAkNkNQkNkOAAl9QAAl9ENkNQENkOF9AAQF+AAENEOQENENAAF9g");
	this.shape.setTransform(96.6486,96.6481,1.05,1.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.visitado, new cjs.Rectangle(-2.5,-2.5,198.3,198.3), null);


(lib.t14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape.setTransform(699.175,118.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_1.setTransform(677.3018,118.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAJgGQALgHANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_2.setTransform(660.15,118);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQgBAeQABAfAOAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_3.setTransform(638.65,118.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjgBgagcgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXgBQATABANgRQAOgQAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_4.setTransform(613.675,114.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_5.setTransform(590.6518,118.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAoBqIAAhqQgBgggDgKQgDgKgJgGQgHgFgMAAQgMAAgMAHQgMAJgDANQgFANAAAhIAABeIg3AAIAAjPIA0AAIAAAfQAagjAoAAQATAAAPAHQAPAGAIAKQAIALADAMQACANAAAYIAACAg");
	this.shape_6.setTransform(567.55,118);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_7.setTransform(544.0018,118.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgsIAZAAIAAgoIA2ghIAABJIAmAAIAAAsIgmAAIAABTQAAAZABAFQABADAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYAAQgPgBgLgEg");
	this.shape_8.setTransform(526.475,114.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AAoBqIAAhqQgBgggDgKQgDgKgJgGQgHgFgMAAQgMAAgMAHQgLAJgEANQgFANAAAhIAABeIg3AAIAAjPIA0AAIAAAfQAbgjAnAAQATAAAPAHQAPAGAHAKQAIALAEAMQACANAAAYIAACAg");
	this.shape_9.setTransform(507.6,118);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_10.setTransform(483.15,118.225);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAbgcAtAAQAmAAAWAQQAXAQAJAiIg2AJQgDgQgJgIQgKgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgJAmgYASQgXATgoAAQgtAAgagcg");
	this.shape_11.setTransform(460.1,118.225);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AAoBqIAAhqQAAgggEgKQgEgKgHgGQgJgFgKAAQgNAAgMAHQgLAJgFANQgEANAAAhIAABeIg2AAIAAjPIAyAAIAAAfQAbgjApAAQASAAAPAHQAPAGAHAKQAJALACAMQAEANAAAYIAACAg");
	this.shape_12.setTransform(425.4,118);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_13.setTransform(401.8518,118.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgVAAgOARg");
	this.shape_14.setTransform(367.65,118.225);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_15.setTransform(332.675,118.225);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_16.setTransform(311.025,118.225);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_17.setTransform(288.275,118.225);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_18.setTransform(272.15,114.275);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_19.setTransform(254.4,118.225);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgUCJQgRgJgMgRIAAAeIgzAAIAAkdIA3AAIAABnQAZgdAiAAQAmAAAYAcQAZAbAAAyQAAA1gZAdQgZAcglABQgQAAgSgJgAghgNQgNAPAAAfQAAAgAKAQQAPAVAWAAQASAAANgPQANgPAAgiQAAgjgNgQQgNgPgTAAQgUAAgNAPg");
	this.shape_20.setTransform(230.425,114.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AAnBqIAAhqQAAgggDgKQgEgKgHgGQgJgFgKAAQgNAAgMAHQgMAJgEANQgEANAAAhIAABeIg3AAIAAjPIAzAAIAAAfQAbgjApAAQASAAAPAHQAPAGAHAKQAJALACAMQADANABAYIAACAg");
	this.shape_21.setTransform(1129.55,71.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_22.setTransform(1106.0018,71.525);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAJgGQALgHANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_23.setTransform(1077.75,71.3);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_24.setTransform(1057.1518,71.525);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AAnBqIAAhqQABgggEgKQgEgKgHgGQgJgFgKAAQgOAAgLAHQgMAJgDANQgFANAAAhIAABeIg3AAIAAjPIAzAAIAAAfQAcgjAoAAQASAAAPAHQAPAGAIAKQAHALADAMQADANAAAYIAACAg");
	this.shape_25.setTransform(1034.05,71.3);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_26.setTransform(1009.6,71.525);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhkCSIAAkeIAzAAIAAAeQAKgPARgKQARgKAUAAQAkAAAZAdQAZAcAAAyQAAAzgZAdQgaAdgkAAQgQAAgOgGQgOgIgPgQIAABpgAghhWQgNAQAAAeQAAAjAOAQQAOARATAAQATAAANgPQAMgPAAgjQAAghgNgQQgNgPgTAAQgTAAgOAPg");
	this.shape_27.setTransform(985.675,75.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_28.setTransform(961.275,71.525);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_29.setTransform(945.15,67.575);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMASgSAJQgRAIgRAAQgjAAgagcgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXgBQATABANgRQAOgQAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_30.setTransform(926.875,67.8);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_31.setTransform(892.7518,71.525);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMASgSAJQgRAIgRAAQgjAAgagcgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXgBQATABANgRQAOgQAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_32.setTransform(869.125,67.8);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_33.setTransform(846.1018,71.525);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("Ag+BhQgQgJgIgRQgHgQAAgdIAAiDIA3AAIAABgQAAAqADAKQADAKAIAFQAIAHAMAAQANgBALgHQALgIAEgLQAFgMAAgrIAAhYIA2AAIAADPIgzAAIAAgfQgLAQgSAJQgSAKgUAAQgVAAgRgJg");
	this.shape_34.setTransform(822.875,71.75);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhkCSIAAkeIAzAAIAAAeQAKgPARgKQARgKAUAAQAkAAAZAdQAZAcAAAyQAAAzgZAdQgaAdgkAAQgQAAgOgGQgOgIgPgQIAABpgAghhWQgNAQAAAeQAAAjAOAQQAOARATAAQATAAANgPQAMgPAAgjQAAghgNgQQgNgPgTAAQgTAAgOAPg");
	this.shape_35.setTransform(799.075,75.25);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_36.setTransform(763.9018,71.525);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_37.setTransform(741.375,71.525);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_38.setTransform(708.4018,71.525);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMASgSAJQgRAIgRAAQgjAAgagcgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXgBQATABANgRQAOgQAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_39.setTransform(684.775,67.8);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AAoBqIAAhqQAAgggEgKQgDgKgJgGQgIgFgKAAQgOAAgLAHQgLAJgFANQgEANAAAhIAABeIg2AAIAAjPIAyAAIAAAfQAbgjAoAAQATAAAPAHQAPAGAHAKQAJALACAMQAEANAAAYIAACAg");
	this.shape_40.setTransform(660.85,71.3);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQgBAeQABAfAOAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_41.setTransform(636.4,71.525);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMASgSAJQgRAIgRAAQgjAAgagcgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXgBQATABANgRQAOgQAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_42.setTransform(611.425,67.8);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_43.setTransform(577.3018,71.525);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("Ag+BhQgQgJgIgRQgHgQAAgdIAAiDIA3AAIAABgQAAAqADAKQADAKAIAFQAIAHAMAAQANgBALgHQALgIAEgLQAFgMAAgrIAAhYIA2AAIAADPIgzAAIAAgfQgLAQgSAJQgSAKgUAAQgVAAgRgJg");
	this.shape_44.setTransform(554.075,71.75);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AAuCSIAAhpQgLAOgQAIQgQAIgRAAQgkAAgXgaQgbggAAg0QAAgxAZgcQAagdAlAAQAUAAAPAJQAPAJAMARIAAgeIAzAAIAAEegAgehWQgNAQAAAjQAAAhAMAPQANAPASAAQATAAAOgRQAOgQABgiQgBgfgNgQQgNgQgTAAQgTAAgNAQg");
	this.shape_45.setTransform(529.3,75.25);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_46.setTransform(506.425,71.525);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhkCSIAAkeIAzAAIAAAeQAKgPARgKQARgKAUAAQAkAAAZAdQAZAcAAAyQAAAzgZAdQgaAdgkAAQgQAAgOgGQgOgIgPgQIAABpgAghhWQgNAQAAAeQAAAjAOAQQAOARATAAQATAAANgPQAMgPAAgjQAAghgNgQQgNgPgTAAQgTAAgOAPg");
	this.shape_47.setTransform(483.625,75.25);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("ABiBqIAAh2QAAgegGgJQgIgMgPAAQgMAAgKAHQgKAHgEAOQgFANAAAcIAABkIg2AAIAAhwQAAgfgDgIQgDgKgGgEQgGgEgLAAQgNAAgJAGQgKAIgFANQgFANAAAcIAABlIg3AAIAAjPIAzAAIAAAdQAbghAmAAQAUAAAOAIQAOAJAKAQQANgQAQgJQAQgIASAAQAWAAAQAJQAQAKAIARQAGAOgBAeIAACDg");
	this.shape_48.setTransform(452.95,71.3);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_49.setTransform(424.0018,71.525);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_50.setTransform(390.7018,71.525);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMASgSAJQgRAIgRAAQgjAAgagcgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXgBQATABANgRQAOgQAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_51.setTransform(367.075,67.8);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_52.setTransform(333.175,71.525);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_53.setTransform(310.7518,71.525);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAKgGQAKgHANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_54.setTransform(293.6,71.3);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AhOCDQgSgSAAgaQAAgSAIgOQAIgOAQgHQAPgHAcgGQAmgHAOgGIAAgGQAAgOgHgHQgIgHgVAAQgPAAgIAGQgIAGgFAOIgygJQAJgeAUgOQAVgPAoAAQAkAAASAJQASAJAHANQAHANAAAjIAABAQAAAbACAOQADAMAHAPIg2AAIgFgQIgCgGQgOANgQAHQgPAHgTAAQggAAgSgRgAgBA0QgXAFgHAFQgLAHAAAMQAAALAJAJQAJAIANAAQAOAAANgJQAKgIADgLQACgHAAgTIAAgLQgKADgWAFgAgbhZIAbg6IA9AAIg2A6g");
	this.shape_55.setTransform(273.225,67.575);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_56.setTransform(245.45,67.575);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_57.setTransform(228.825,71.525);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_58.setTransform(1152.525,24.825);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgXBoIhUjPIA6AAIAnBpIAKAkIAGgSIAGgSIAnhpIA5AAIhTDPg");
	this.shape_59.setTransform(1130.125,24.825);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_60.setTransform(1107.9018,24.825);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_61.setTransform(1091.45,20.875);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_62.setTransform(1080.35,20.875);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_63.setTransform(1052.4018,24.825);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_64.setTransform(1029.875,24.825);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_65.setTransform(996.575,24.825);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_66.setTransform(974.7018,24.825);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AAnBqIAAhqQABghgEgJQgEgKgHgGQgJgFgLAAQgNAAgLAIQgMAHgDAOQgFAMAAAiIAABeIg3AAIAAjOIA0AAIAAAeQAagjApAAQASAAAPAHQAPAGAIAKQAHALAEAMQACANAAAYIAACAg");
	this.shape_67.setTransform(951.6,24.6);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_68.setTransform(927.15,24.825);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_69.setTransform(909.35,20.875);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAbgcAtAAQAmAAAWAQQAXAQAJAiIg2AJQgDgQgJgIQgKgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgJAmgYASQgXATgoAAQgtAAgagcg");
	this.shape_70.setTransform(893,24.825);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_71.setTransform(870.525,24.825);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAagcAuAAQAlAAAXAQQAXAQAJAiIg2AJQgDgQgJgIQgKgIgPAAQgUAAgMAOQgMAOAAAhQAAAkAMAPQAMAQAVAAQAPAAAKgJQAKgJAEgWIA2AJQgJAmgXASQgYATgoAAQgtAAgagcg");
	this.shape_72.setTransform(848.6,24.825);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_73.setTransform(831.65,20.875);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AgnCRIAAijIgeAAIAAgrIAeAAIAAgQQAAgaAGgNQAGgNAPgHQANgJAXABQAYgBAWAIIgHAmQgNgDgMgBQgMAAgFAGQgGAFAAAQIAAAPIApAAIAAArIgpAAIAACjg");
	this.shape_74.setTransform(820.225,20.65);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AgaCPIAAjOIA2AAIAADOgAgahbIAAgzIA2AAIAAAzg");
	this.shape_75.setTransform(807.25,20.875);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AhGBQQgbgdAAgzQAAgyAbgdQAbgcAuAAQAlAAAXAQQAWAQAKAiIg2AJQgDgQgKgIQgJgIgPAAQgUAAgMAOQgMAOAAAhQAAAkAMAPQAMAQAVAAQAPAAAKgJQAKgJAEgWIA2AJQgJAmgXASQgYATgpAAQgsAAgbgcg");
	this.shape_76.setTransform(790.9,24.825);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_77.setTransform(768.2018,24.825);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AhkCSIAAkeIAzAAIAAAeQAKgPARgKQARgKAUABQAkAAAZAcQAZAcAAAyQAAAzgZAdQgaAdgkAAQgQAAgOgGQgOgIgPgQIAABpgAghhWQgNAQAAAeQAAAjAOAQQAOARATAAQATgBANgPQAMgOAAgjQAAgggNgRQgNgPgTAAQgTAAgOAPg");
	this.shape_78.setTransform(745.625,28.55);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_79.setTransform(721.225,24.825);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_80.setTransform(699.3518,24.825);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AAnBqIAAhqQAAghgDgJQgEgKgHgGQgJgFgKAAQgNAAgMAIQgMAHgEAOQgEAMAAAiIAABeIg2AAIAAjOIAyAAIAAAeQAcgjAoAAQASAAAPAHQAPAGAIAKQAIALACAMQADANABAYIAACAg");
	this.shape_81.setTransform(665.15,24.6);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_82.setTransform(641.6018,24.825);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("AhOCDQgSgSAAgaQAAgSAIgOQAIgOAQgHQAPgHAcgGQAmgHAOgGIAAgGQAAgOgHgHQgIgHgVAAQgPAAgIAGQgIAGgFAOIgygJQAJgeAUgOQAVgPAoAAQAkAAASAJQASAJAHANQAHANAAAjIAABAQAAAbACAOQADAMAHAPIg2AAIgFgQIgCgGQgOANgQAHQgPAHgTAAQggAAgSgRgAgBA0QgXAFgHAFQgLAHAAAMQAAALAJAJQAJAIANAAQAOAAANgJQAKgIADgLQACgHAAgTIAAgLQgKADgWAFgAgbhZIAbg6IA9AAIg2A6g");
	this.shape_83.setTransform(608.525,20.875);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgrIAZAAIAAgqIA2ggIAABKIAmAAIAAArIgmAAIAABTQAAAaABADQABAFAEADQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPAAgLgEg");
	this.shape_84.setTransform(590.775,21.4);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_85.setTransform(572.475,24.825);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_86.setTransform(550.6018,24.825);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_87.setTransform(523.05,20.875);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_88.setTransform(506.425,24.825);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgrIAZAAIAAgqIA2ggIAABKIAmAAIAAArIgmAAIAABTQAAAaABADQABAFAEADQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPAAgLgEg");
	this.shape_89.setTransform(488.675,21.4);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_90.setTransform(470.7018,24.825);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#000000").s().p("ABiBqIAAh2QAAgegGgJQgHgMgRAAQgLAAgKAHQgKAHgFAOQgEANAAAdIAABjIg2AAIAAhwQAAgfgDgIQgDgKgGgEQgGgEgLAAQgMAAgKAGQgLAIgEANQgFANABAcIAABlIg3AAIAAjOIAyAAIAAAcQAcghAlAAQAUAAAOAIQAOAJAKAQQANgQAQgJQAQgIASAAQAXAAAPAJQAQAKAIARQAGAOgBAeIAACDg");
	this.shape_91.setTransform(441.9,24.6);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_92.setTransform(407.6,20.875);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_93.setTransform(390.7518,24.825);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#000000").s().p("AhcBoIAAgrIBOhYIAbgfIgYAAIhJABIAAguICqAAIAAAnIhPBbIgbAeIAcgBIBVAAIAAAwg");
	this.shape_94.setTransform(358.625,24.825);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_95.setTransform(337.4518,24.825);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#000000").s().p("AgXBoIhUjPIA6AAIAnBpIAKAkIAGgSIAGgSIAnhpIA5AAIhTDPg");
	this.shape_96.setTransform(315.275,24.825);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_97.setTransform(282.175,24.825);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#000000").s().p("AAnBqIAAhqQAAghgDgJQgDgKgJgGQgHgFgMAAQgMAAgMAIQgMAHgDAOQgFAMAAAiIAABeIg3AAIAAjOIA0AAIAAAeQAagjAoAAQATAAAPAHQAPAGAIAKQAIALADAMQACANAAAYIAACAg");
	this.shape_98.setTransform(258.85,24.6);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#000000").s().p("Ag6CIQgVgJgMgPQgMgQgEgQQgGgZAAgwIAAiYIA6AAIAACbQAAAkACALQAEASAOALQAOAKAXAAQAYAAANgKQAMgKADgPQACgOAAgiIAAieIA6AAIAACWQAAAzgEAWQgFAVgNAPQgMAOgVAJQgVAJgiAAQgoAAgWgKg");
	this.shape_99.setTransform(231.925,21.125);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("EhQeAImIAAxLMCg9AAAIycRLg");
	this.shape_100.setTransform(741.139,67.1505,1.3645,1.3645,0,0,180);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("rgba(102,102,102,0.396)").s().p("EhQCAJAQgQAAgMgMQgMgMAAgQIAAwxQAAgRAMgLQAMgMAQAAMCgFAAOQAMAAAKAHQAKAHAFAMQAEALgCAMQgDAMgJAJIx0QlQgMAKgPAAgEhQXgIuQgJAIAAANIAAQxQAAAMAJAJQAJAJAMAAMCORAACQALAAAJgIIR0wlQAHgGACgJQACgJgDgJQgEgIgIgFQgHgGgJAAMigFgAOIAAAAQgMAAgJAJg");
	this.shape_101.setTransform(740.3956,69.9937,1.3645,1.3645,0,0,180);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("rgba(102,102,102,0.796)").s().p("EA+PAIuMiORgACQgIAAgGgGQgGgGAAgIIAAwxQAAgJAGgGQAGgFAIAAMCgFAAOQAGAAAFAEQAFADACAGQADAGgCAGQgBAGgEAEIx0QlQgGAFgIAAIAAAAgEhQJgIgQgDADAAAEIAAQxQAAAEADADQADADAEAAMCORAACQAEAAADgDIR0wlQACgCABgCQAAgEgBgDQgBgCgDgCQgCgCgDAAMigFgAOQgEAAgDADg");
	this.shape_102.setTransform(740.4005,69.9937,1.3645,1.3645,0,0,180);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("rgba(102,102,102,0.596)").s().p("EA+PAI4MiORgACQgMAAgJgJQgJgJAAgMIAAwxQAAgNAJgIQAJgJAMAAMCgFAAOQAJAAAHAGQAIAFAEAIQADAJgCAJQgCAJgHAGIx0QlQgJAIgLAAIAAAAgEhQQgIoQgGAGAAAJIAAQxQAAAIAGAGQAGAGAIAAMCORAACQAIAAAFgFIR0wlQAFgEABgGQACgGgDgGQgCgGgFgDQgFgEgGAAMigFgAOIAAAAQgIAAgGAFg");
	this.shape_103.setTransform(740.3949,69.9937,1.3645,1.3645,0,0,180);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("rgba(102,102,102,0.196)").s().p("EhQCAJKQgUAAgPgPQgPgPAAgUIAAwxQAAgVAPgPQAPgOAUAAMCgFAAOQAPAAANAJQANAJAFAOQAGAOgEAPQgDAPgLALIx0QlQgPANgTAAgEhQegI1QgMALAAARIAAQxQAAAQAMAMQAMAMAQAAMCORAACQAPAAAMgKIR0wlQAJgJADgMQACgMgEgLQgFgMgKgHQgKgHgMAAMigFgAOIAAAAQgQAAgMAMg");
	this.shape_104.setTransform(740.3965,69.9936,1.3645,1.3645,0,0,180);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#666666").s().p("EhQCAIiQgEAAgDgDQgDgDAAgEIAAwxQAAgEADgDQADgDAEAAMCgFAAOQADAAACACQADACABACQABADAAAEQgBACgCACIx0QlQgDADgEAAg");
	this.shape_105.setTransform(740.3997,69.9937,1.3645,1.3645,0,0,180);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#829F93").s().p("EhQyAImIAAxLMChlAAAIycRLg");
	this.shape_106.setTransform(737.76,80.8849,1.3645,1.3645,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(32.2,-10.2,1414.1,166.2);


(lib.t13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape.setTransform(695.275,158.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_1.setTransform(673.625,158.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgXBoIhUjPIA6AAIAnBpIAKAkIAGgSIAGgSIAnhpIA5AAIhTDPg");
	this.shape_2.setTransform(651.225,158.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_3.setTransform(634.75,154.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgUAAgPARg");
	this.shape_4.setTransform(617,158.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgICKQgMgFgFgIQgGgIgCgOQgCgJAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAaABADQABAFAEACQAEADAFAAQAIAAAOgFIAFArQgTAHgYABQgPAAgLgFg");
	this.shape_5.setTransform(598.125,155);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAoBqIAAhqQAAghgEgJQgEgKgIgFQgIgGgKAAQgOAAgLAIQgLAIgFAMQgEAOAAAhIAABeIg2AAIAAjOIAyAAIAAAeQAbgjAoAAQATAAAPAGQAPAHAHAKQAJAKACANQAEANAAAYIAACAg");
	this.shape_6.setTransform(568.15,158.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_7.setTransform(544.6018,158.425);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_8.setTransform(510.975,158.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgUAAgPARg");
	this.shape_9.setTransform(488.2,158.425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMARgSAJQgRAJgRAAQgjAAgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXABQATgBANgQQAOgQAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_10.setTransform(463.225,154.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_11.setTransform(440.425,158.425);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AAnBqIAAhqQABghgEgJQgEgKgHgFQgJgGgKAAQgNAAgMAIQgMAIgEAMQgEAOAAAhIAABeIg3AAIAAjOIAzAAIAAAeQAcgjAoAAQASAAAPAGQAPAHAIAKQAHAKADANQADANAAAYIAACAg");
	this.shape_12.setTransform(417.1,158.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_13.setTransform(393.5518,158.425);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhGBQQgbgdAAgzQAAgyAbgdQAbgcAtAAQAmAAAXAQQAXAQAJAiIg2AJQgDgQgKgIQgJgIgPAAQgUAAgMAOQgMAOAAAhQAAAkAMAPQAMAQAVAAQAPAAAKgJQAKgJAEgWIA2AJQgJAmgYASQgXATgpAAQgsAAgbgcg");
	this.shape_14.setTransform(371.85,158.425);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_15.setTransform(349.375,158.425);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("ABiBqIAAh1QAAgfgGgKQgIgLgPAAQgMAAgKAHQgKAHgEANQgFAOAAAcIAABkIg2AAIAAhxQAAgegDgJQgDgJgGgEQgGgEgKAAQgNAAgLAHQgKAGgEANQgEANgBAdIAABlIg2AAIAAjOIAyAAIAAAcQAcghAlAAQAUAAAPAIQANAIAJARQAOgRAQgIQAQgIARAAQAXAAARAKQAPAIAIATQAFANABAdIAACEg");
	this.shape_16.setTransform(320.35,158.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_17.setTransform(297.15,154.475);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_18.setTransform(280.525,158.425);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhXCPIgFgrQANACAKAAQATAAAJgLQAKgLAEgSIhPjPIA7AAIAwCTIAxiTIA5AAIhJDHIgOAkQgHASgGAKQgHAJgHAGQgJAGgMAEQgNADgPAAQgQAAgPgDg");
	this.shape_19.setTransform(246.975,162.625);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_20.setTransform(213.375,158.425);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_21.setTransform(190.6,158.425);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMARgSAJQgRAJgRAAQgjAAgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXABQATgBANgQQAOgQAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_22.setTransform(165.625,154.7);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_23.setTransform(142.825,158.425);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhHCCQgWgSAAgcIAAgGIA/AHQABALAGAEQAIAGAPAAQAWAAALgHQAHgDAEgKQACgHAAgSIAAgfQgYAiglAAQgqAAgYgkQgTgbAAgpQAAg0AZgbQAZgcAlAAQAmAAAZAhIAAgcIAzAAIAAC5QAAAkgGATQgGASgLAKQgLAKgSAHQgTAFgbAAQg0AAgWgSgAgfhZQgNAOAAAgQAAAhANAOQAMAQATgBQATAAAOgPQAOgPAAgfQAAgggNgPQgNgQgVAAQgTAAgMAQg");
	this.shape_24.setTransform(118.975,162.4);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_25.setTransform(95.9518,158.425);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAKgHQAKgGANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAHQgHAGgFAQQgEARAAA0IAABAg");
	this.shape_26.setTransform(78.8,158.2);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgICKQgMgFgFgIQgGgIgCgOQgCgJAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAaABADQABAFAEACQAEADAFAAQAIAAAOgFIAFArQgTAHgYABQgPAAgLgFg");
	this.shape_27.setTransform(62.875,155);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AAoBqIAAhqQgBghgDgJQgDgKgJgFQgHgGgMAAQgMAAgMAIQgLAIgFAMQgEAOAAAhIAABeIg2AAIAAjOIAzAAIAAAeQAbgjAnAAQATAAAPAGQAPAHAHAKQAIAKAEANQADANAAAYIAACAg");
	this.shape_28.setTransform(44,158.2);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_29.setTransform(20.4518,158.425);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AAoBqIAAhqQgBghgDgJQgDgKgJgFQgHgGgMAAQgMAAgMAHQgLAIgEANQgFAOAAAhIAABeIg3AAIAAjPIA0AAIAAAfQAbgjAnAAQATAAAPAGQAPAHAHAKQAIAKAEANQACANAAAYIAACAg");
	this.shape_30.setTransform(799.2,111.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_31.setTransform(774.75,111.725);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_32.setTransform(750.875,111.725);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_33.setTransform(717.575,111.725);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_34.setTransform(695.7018,111.725);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_35.setTransform(679.25,107.775);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_36.setTransform(662.625,111.725);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("Ag+BhQgQgJgIgRQgHgQAAgeIAAiCIA3AAIAABfQAAArADAKQADAKAIAGQAIAFAMABQANAAALgIQALgIAEgLQAFgMAAgsIAAhXIA2AAIAADPIgzAAIAAggQgLARgSAJQgSAKgUAAQgVAAgRgJg");
	this.shape_37.setTransform(639.175,111.95);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAbgcAtAAQAmAAAWAQQAXAQAJAiIg2AJQgDgQgJgIQgKgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgJAmgYASQgXATgoAAQgtAAgagcg");
	this.shape_38.setTransform(616.25,111.725);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_39.setTransform(582.125,111.725);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgVAAgOARg");
	this.shape_40.setTransform(559.35,111.725);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_41.setTransform(541.55,107.775);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgcAkQAQgFAHgJQAGgKAAgPIgZAAIAAg3IA1AAIAAAnQAAAWgEAOQgDAOgMALQgLALgRAHg");
	this.shape_42.setTransform(519,122.55);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_43.setTransform(508.25,107.775);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_44.setTransform(491.4018,111.725);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("Ag+BhQgQgJgIgRQgHgQAAgeIAAiCIA3AAIAABfQAAArADAKQADAKAIAGQAIAFAMABQANAAALgIQALgIAEgLQAFgMAAgsIAAhXIA2AAIAADPIgzAAIAAggQgLARgSAJQgSAKgUAAQgVAAgRgJg");
	this.shape_45.setTransform(468.175,111.95);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AAuCRIAAhoQgLAOgQAIQgQAIgSAAQgjAAgXgbQgbgeABg0QgBgzAagcQAZgcAmAAQATAAAQAJQAOAJAMASIAAgfIAyAAIAAEdgAgehWQgOAQAAAiQAAAjANAOQANAPASAAQATAAAPgRQANgQAAghQAAgggMgQQgOgPgTAAQgTAAgNAPg");
	this.shape_46.setTransform(443.4,115.45);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AgnCSIAAjPIA2AAIAADPgAgrhWIAbg7IA8AAIg0A7g");
	this.shape_47.setTransform(427.325,107.55);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AAoBqIAAhqQAAghgEgJQgEgKgHgFQgIgGgLAAQgNAAgMAHQgLAIgFANQgEAOAAAhIAABeIg2AAIAAjPIAyAAIAAAfQAbgjApAAQASAAAPAGQAPAHAHAKQAJAKACANQAEANAAAYIAACAg");
	this.shape_48.setTransform(408.3,111.5);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgVAAgOARg");
	this.shape_49.setTransform(383.85,111.725);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAKgHQAKgGANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAHQgHAGgFAQQgEARAAA0IAABAg");
	this.shape_50.setTransform(365.35,111.5);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAJgHQALgGANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAHQgHAGgFAQQgEARAAA0IAABAg");
	this.shape_51.setTransform(349.8,111.5);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_52.setTransform(329.2018,111.725);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AgnCSIAAikIgeAAIAAgrIAeAAIAAgPQAAgaAGgNQAGgNAPgJQANgHAXgBQAYABAWAGIgHAmQgNgDgMAAQgMABgFAFQgGAGAAAQIAAAOIApAAIAAArIgpAAIAACkg");
	this.shape_53.setTransform(312.425,107.55);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_54.setTransform(282.6018,111.725);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjAAgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAWAXAAQATgBANgQQAOgQAAggQAAgjgNgPQgNgQgUAAQgTAAgNAQg");
	this.shape_55.setTransform(258.975,108);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_56.setTransform(224.525,111.725);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_57.setTransform(201.75,111.725);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_58.setTransform(183.95,107.775);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("Ag+BhQgQgJgIgRQgHgQAAgeIAAiCIA3AAIAABfQAAArADAKQADAKAIAGQAIAFAMABQANAAALgIQALgIAEgLQAFgMAAgsIAAhXIA2AAIAADPIgzAAIAAggQgLARgSAJQgSAKgUAAQgVAAgRgJg");
	this.shape_59.setTransform(166.075,111.95);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AAoBqIAAhqQgBghgDgJQgDgKgJgFQgHgGgMAAQgMAAgMAHQgMAIgDANQgFAOAAAhIAABeIg2AAIAAjPIAzAAIAAAfQAbgjAnAAQATAAAPAGQAPAHAHAKQAIAKAEANQACANAAAYIAACAg");
	this.shape_60.setTransform(141.75,111.5);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AhOCDQgSgSAAgaQAAgSAIgOQAIgOAQgHQAPgHAcgGQAmgHAOgGIAAgGQAAgOgHgHQgIgHgVAAQgPAAgIAGQgIAGgFAOIgygJQAJgeAUgOQAVgPAoAAQAkAAASAJQASAJAHANQAHANAAAjIAABAQAAAbACAOQADAMAHAPIg2AAIgFgQIgCgGQgOANgQAHQgPAHgTAAQggAAgSgRgAgBA0QgXAFgHAFQgLAHAAAMQAAALAJAJQAJAIANAAQAOAAANgJQAKgIADgLQACgHAAgTIAAgLQgKADgWAFgAgbhZIAbg6IA9AAIg2A6g");
	this.shape_61.setTransform(118.425,107.775);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAJgHQALgGANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAHQgHAGgFAQQgEARAAA0IAABAg");
	this.shape_62.setTransform(101.05,111.5);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AhHCCQgWgSAAgcIAAgGIA/AIQABAKAGAEQAIAGAPAAQAWAAALgHQAHgDAEgKQACgHAAgSIAAgfQgYAiglAAQgqAAgYgkQgTgcAAgoQAAg0AZgbQAZgcAlAAQAmAAAZAhIAAgdIAzAAIAAC6QAAAlgGASQgGASgLAKQgLAKgSAHQgTAFgbAAQg0AAgWgSgAgfhZQgNAOAAAgQAAAhANAPQAMAPATgBQATAAAOgPQAOgPAAgfQAAgggNgPQgNgQgVAAQgTAAgMAQg");
	this.shape_63.setTransform(79.025,115.7);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AAoBqIAAhqQgBghgDgJQgDgKgJgFQgHgGgMAAQgMAAgMAHQgLAIgFANQgEAOAAAhIAABeIg2AAIAAjPIAzAAIAAAfQAbgjAnAAQATAAAPAGQAPAHAHAKQAIAKAEANQADANAAAYIAACAg");
	this.shape_64.setTransform(44,111.5);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_65.setTransform(20.4518,111.725);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_66.setTransform(968.7518,65.025);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgOQgCgJAAgdIAAhaIgZAAIAAgsIAZAAIAAgoIA2ghIAABJIAmAAIAAAsIgmAAIAABTQAAAZABAFQABADAEADQAEADAFAAQAIAAAOgFIAFArQgTAHgYABQgPgBgLgEg");
	this.shape_67.setTransform(951.225,61.6);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AAnBqIAAhqQABgggEgKQgEgKgHgFQgJgGgKAAQgNAAgMAHQgMAJgEANQgEANAAAhIAABeIg3AAIAAjPIAzAAIAAAfQAcgjAoAAQASAAAPAGQAPAHAIAKQAHALADAMQADANAAAYIAACAg");
	this.shape_68.setTransform(932.35,64.8);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_69.setTransform(908.8018,65.025);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("ABiBqIAAh2QAAgfgGgIQgIgMgPAAQgMAAgKAHQgKAHgEANQgFAOAAAcIAABkIg2AAIAAhwQAAgfgDgJQgDgIgGgFQgGgEgLAAQgNAAgJAGQgKAIgFAMQgFANAAAdIAABlIg3AAIAAjPIAzAAIAAAdQAbghAmAAQAUAAAOAIQAOAJAKAQQANgQAQgJQAQgIASAAQAWAAAQAKQAQAIAIATQAFAMAAAfIAACDg");
	this.shape_70.setTransform(880,64.8);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_71.setTransform(851.275,65.025);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAagcAuAAQAlAAAXAQQAXAQAJAiIg2AJQgDgQgJgIQgKgIgPAAQgUAAgMAOQgMAOAAAhQAAAkAMAPQAMAQAUAAQAQAAAKgJQAKgJAEgWIA2AJQgIAmgYASQgYATgoAAQgtAAgagcg");
	this.shape_72.setTransform(829.35,65.025);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_73.setTransform(812.4,61.075);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_74.setTransform(795.225,65.025);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AgnCSIAAjPIA2AAIAADPgAgrhWIAbg7IA8AAIg0A7g");
	this.shape_75.setTransform(780.375,60.85);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AgnCSIAAikIgeAAIAAgrIAeAAIAAgQQAAgZAGgNQAGgNAPgJQANgHAXgBQAYABAWAGIgHAmQgNgDgMAAQgMABgFAFQgGAGAAAPIAAAPIApAAIAAArIgpAAIAACkg");
	this.shape_76.setTransform(767.675,60.85);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_77.setTransform(738.075,65.025);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("ABiBqIAAh2QAAgfgGgIQgHgMgRAAQgLAAgKAHQgKAHgFANQgEAOAAAcIAABkIg2AAIAAhwQAAgfgDgJQgDgIgGgFQgGgEgKAAQgNAAgLAGQgKAIgEAMQgEANgBAdIAABlIg2AAIAAjPIAyAAIAAAdQAbghAmAAQAUAAAPAIQANAJAJAQQAOgQAQgJQAQgIARAAQAXAAARAKQAPAIAIATQAFAMABAfIAACDg");
	this.shape_78.setTransform(709.05,64.8);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAJgHQALgGANAAQATAAARAKIgQAwQgOgJgNAAQgLAAgIAHQgHAGgFAQQgEARAAA0IAABAg");
	this.shape_79.setTransform(685.15,64.8);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAOgQABgfQgBgegOgQQgPgRgVAAQgVAAgOARg");
	this.shape_80.setTransform(663.65,65.025);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AgnCSIAAikIgeAAIAAgrIAeAAIAAgQQAAgZAGgNQAGgNAPgJQANgHAXgBQAYABAWAGIgHAmQgNgDgMAAQgMABgFAFQgGAGAAAPIAAAPIApAAIAAArIgpAAIAACkg");
	this.shape_81.setTransform(645.525,60.85);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_82.setTransform(626.475,65.025);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("AAoBqIAAhqQAAgggEgKQgEgKgIgFQgIgGgKAAQgOAAgLAHQgLAJgFANQgEANAAAhIAABeIg2AAIAAjPIAyAAIAAAfQAbgjAoAAQATAAAPAGQAPAHAHAKQAJALACAMQAEANAAAYIAACAg");
	this.shape_83.setTransform(603.7,64.8);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_84.setTransform(580.375,65.025);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAKgHQAKgGANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAHQgHAGgFAQQgEARAAA0IAABAg");
	this.shape_85.setTransform(563,64.8);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgOQgCgJAAgdIAAhaIgZAAIAAgsIAZAAIAAgoIA2ghIAABJIAmAAIAAAsIgmAAIAABTQAAAZABAFQABADAEADQAEADAFAAQAIAAAOgFIAFArQgTAHgYABQgPgBgLgEg");
	this.shape_86.setTransform(547.075,61.6);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_87.setTransform(518.0018,65.025);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_88.setTransform(495.475,65.025);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAOgQAAgfQAAgegOgQQgPgRgVAAQgVAAgOARg");
	this.shape_89.setTransform(461.6,65.025);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjgBgagcgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXgBQATAAANgQQAOgQAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_90.setTransform(436.625,61.3);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_91.setTransform(413.825,65.025);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#000000").s().p("AAoBqIAAhqQgBgggDgKQgDgKgJgFQgIgGgLAAQgMAAgMAHQgLAJgFANQgEANAAAhIAABeIg2AAIAAjPIAzAAIAAAfQAbgjAnAAQATAAAPAGQAPAHAHAKQAIALAEAMQADANAAAYIAACAg");
	this.shape_92.setTransform(390.5,64.8);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#000000").s().p("AgaCPIAAjOIA2AAIAADOgAgahbIAAgzIA2AAIAAAzg");
	this.shape_93.setTransform(372.7,61.075);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#000000").s().p("AgnCSIAAikIgeAAIAAgrIAeAAIAAgQQAAgZAGgNQAGgNAPgJQANgHAXgBQAYABAWAGIgHAmQgNgDgMAAQgMABgFAFQgGAGAAAPIAAAPIApAAIAAArIgpAAIAACkg");
	this.shape_94.setTransform(361.275,60.85);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_95.setTransform(342.5518,65.025);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAKgHQAKgGANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAHQgHAGgFAQQgEARAAA0IAABAg");
	this.shape_96.setTransform(325.4,64.8);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_97.setTransform(292.8,65.025);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjgBgagcgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXgBQATAAANgQQAOgQAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_98.setTransform(267.825,61.3);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_99.setTransform(250.55,61.075);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#000000").s().p("Ag+BhQgQgJgIgRQgHgRAAgdIAAiCIA3AAIAABfQAAArADAKQADAKAIAFQAIAGAMABQANAAALgIQALgIAEgLQAFgMAAgsIAAhXIA2AAIAADPIgzAAIAAggQgLARgSAJQgSAKgUAAQgVAAgRgJg");
	this.shape_100.setTransform(232.675,65.25);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#000000").s().p("AAuCSIAAhpQgLAOgQAIQgQAIgRAAQgkAAgXgbQgbgeAAg1QAAgyAZgcQAagcAlAAQAUAAAPAJQAPAJAMARIAAgeIAzAAIAAEegAgehWQgNAQAAAiQAAAjAMAOQANAPASAAQATAAAOgRQAOgQABgiQgBgfgNgQQgMgQgUAAQgTAAgNAQg");
	this.shape_101.setTransform(207.9,68.75);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#000000").s().p("AgnCSIAAjPIA2AAIAADPgAgrhWIAbg7IA8AAIg0A7g");
	this.shape_102.setTransform(191.825,60.85);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_103.setTransform(179.45,61.075);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_104.setTransform(157.25,61.075);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_105.setTransform(140.625,65.025);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgOQgCgJAAgdIAAhaIgZAAIAAgsIAZAAIAAgoIA2ghIAABJIAmAAIAAAsIgmAAIAABTQAAAZABAFQABADAEADQAEADAFAAQAIAAAOgFIAFArQgTAHgYABQgPgBgLgEg");
	this.shape_106.setTransform(122.875,61.6);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_107.setTransform(104.9018,65.025);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#000000").s().p("ABiBqIAAh2QAAgfgGgIQgIgMgPAAQgMAAgKAHQgKAHgEANQgFAOAAAcIAABkIg2AAIAAhwQAAgfgDgJQgDgIgGgFQgGgEgKAAQgNAAgLAGQgJAIgFAMQgEANgBAdIAABlIg3AAIAAjPIAzAAIAAAdQAcghAlAAQAUAAAPAIQANAJAJAQQAOgQAQgJQAQgIARAAQAYAAAQAKQAPAIAIATQAFAMAAAfIAACDg");
	this.shape_108.setTransform(76.1,64.8);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#000000").s().p("AgaCPIAAkdIA1AAIAAEdg");
	this.shape_109.setTransform(41.8,61.075);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#000000").s().p("AhsCPIAAkdIDUAAIAAAwIiaAAIAABAICPAAIAAAvIiPAAIAABOICfAAIAAAwg");
	this.shape_110.setTransform(23.3,61.075);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("EhQeAImIAAxLMCg9AAAIycRLg");
	this.shape_111.setTransform(345.4585,110.897,1.4633,1.4633);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("rgba(102,102,102,0.396)").s().p("EhQCAJAQgQAAgMgMQgMgMAAgQIAAwxQAAgRAMgLQAMgMAQAAMCgFAAOQAMAAAKAHQAKAHAFAMQAEALgCAMQgDAMgJAJIx0QlQgMAKgPAAgEhQXgIuQgJAIAAANIAAQxQAAAMAJAJQAJAJAMAAMCORAACQALAAAJgIIR0wlQAHgGACgJQACgJgDgJQgEgIgIgFQgHgGgJAAMigFgAOIAAAAQgMAAgJAJg");
	this.shape_112.setTransform(346.254,113.9962,1.4633,1.4633);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("rgba(102,102,102,0.796)").s().p("EA+PAIuMiORgACQgIAAgGgGQgGgGAAgIIAAwxQAAgJAGgGQAGgFAIAAMCgFAAOQAGAAAFAEQAFADACAGQADAGgCAGQgBAGgEAEIx0QlQgGAFgIAAIAAAAgEhQJgIgQgDADAAAEIAAQxQAAAEADADQADADAEAAMCORAACQAEAAADgDIR0wlQACgCABgCQAAgEgBgDQgBgCgDgCQgCgCgDAAMigFgAOQgEAAgDADg");
	this.shape_113.setTransform(346.2488,113.9962,1.4633,1.4633);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("rgba(102,102,102,0.596)").s().p("EA+PAI4MiORgACQgMAAgJgJQgJgJAAgMIAAwxQAAgNAJgIQAJgJAMAAMCgFAAOQAJAAAHAGQAIAFAEAIQADAJgCAJQgCAJgHAGIx0QlQgJAIgLAAIAAAAgEhQQgIoQgGAGAAAJIAAQxQAAAIAGAGQAGAGAIAAMCORAACQAIAAAFgFIR0wlQAFgEABgGQACgGgDgGQgCgGgFgDQgFgEgGAAMigFgAOIAAAAQgIAAgGAFg");
	this.shape_114.setTransform(346.2548,113.9962,1.4633,1.4633);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("rgba(102,102,102,0.196)").s().p("EhQCAJKQgUAAgPgPQgPgPAAgUIAAwxQAAgVAPgPQAPgOAUAAMCgFAAOQAPAAANAJQANAJAFAOQAGAOgEAPQgDAPgLALIx0QlQgPANgTAAgEhQegI1QgMALAAARIAAQxQAAAQAMAMQAMAMAQAAMCORAACQAPAAAMgKIR0wlQAJgJADgMQACgMgEgLQgFgMgKgHQgKgHgMAAMigFgAOIAAAAQgQAAgMAMg");
	this.shape_115.setTransform(346.2532,113.9961,1.4633,1.4633);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#666666").s().p("EhQCAIiQgEAAgDgDQgDgDAAgEIAAwxQAAgEADgDQADgDAEAAMCgFAAOQADAAACACQADACABACQABADAAAEQgBACgCACIx0QlQgDADgEAAg");
	this.shape_116.setTransform(346.2497,113.9962,1.4633,1.4633);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#829F93").s().p("EhQyAImIAAxLMChlAAAIycRLg");
	this.shape_117.setTransform(348.4851,121.7763,1.4633,1.4633);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-410.6,27.9,1515.8000000000002,174.4);


(lib.t12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape.setTransform(695.725,2.775);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_1.setTransform(674.075,2.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAIgRAAQgjABgagdgAgfgNQgNAPAAAfQAAAhAJAPQANAVAXAAQATAAANgPQAOgRAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_2.setTransform(650.225,-0.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_3.setTransform(627.425,2.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_4.setTransform(605.0018,2.775);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_5.setTransform(582.475,2.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_6.setTransform(560.6018,2.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAIgRAAQgjABgagdgAgfgNQgNAPAAAfQAAAhAJAPQANAVAXAAQATAAANgPQAOgRAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_7.setTransform(536.975,-0.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_8.setTransform(501.95,2.775);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AAnBqIAAhqQAAghgDgJQgEgKgHgGQgJgFgKAAQgNAAgMAIQgMAHgEAOQgEAMAAAiIAABeIg2AAIAAjOIAyAAIAAAeQAcgjAoAAQASAAAPAHQAPAGAHAKQAJALACAMQADANABAYIAACAg");
	this.shape_9.setTransform(477.5,2.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_10.setTransform(442.525,2.775);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_11.setTransform(420.875,2.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgaCPIAAjOIA2AAIAADOgAgahbIAAgzIA2AAIAAAzg");
	this.shape_12.setTransform(404.2,-1.175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhGBQQgbgdAAgzQAAgyAbgdQAcgcAsAAQAnAAAWAQQAWAQAKAiIg2AJQgDgQgKgIQgJgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgIAmgZASQgXATgpAAQgsAAgbgcg");
	this.shape_13.setTransform(387.85,2.775);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AAnBqIAAhqQAAghgDgJQgDgKgJgGQgHgFgMAAQgNAAgLAIQgMAHgDAOQgFAMAAAiIAABeIg3AAIAAjOIA0AAIAAAeQAagjAoAAQATAAAPAHQAPAGAIAKQAHALAEAMQACANAAAYIAACAg");
	this.shape_14.setTransform(364.25,2.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_15.setTransform(340.925,2.775);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgICKQgMgFgFgIQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgrIAZAAIAAgqIA2ggIAABKIAmAAIAAArIgmAAIAABTQAAAaABADQABAFAEADQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPAAgLgEg");
	this.shape_16.setTransform(323.175,-0.65);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_17.setTransform(304.875,2.775);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("Ag+BhQgQgJgIgRQgHgQAAgdIAAiDIA3AAIAABgQAAAqADAKQADAKAIAFQAIAHAMgBQANAAALgHQALgIAEgLQAFgMAAgrIAAhYIA2AAIAADOIgzAAIAAgeQgLAQgSAKQgSAJgUAAQgVAAgRgJg");
	this.shape_18.setTransform(281.975,3);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_19.setTransform(258.225,2.775);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_20.setTransform(225.2518,2.775);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAIgRAAQgjABgagdgAgfgNQgNAPAAAfQAAAhAJAPQANAVAXAAQATAAANgPQAOgRAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_21.setTransform(201.625,-0.95);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_22.setTransform(167.175,2.775);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgUAAgPARg");
	this.shape_23.setTransform(144.4,2.775);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgICKQgMgFgFgIQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgrIAZAAIAAgqIA2ggIAABKIAmAAIAAArIgmAAIAABTQAAAaABADQABAFAEADQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPAAgLgEg");
	this.shape_24.setTransform(125.525,-0.65);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_25.setTransform(107.225,2.775);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_26.setTransform(85.3518,2.775);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAJgGQALgHANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAGQgHAHgFARQgEAQAAA0IAABAg");
	this.shape_27.setTransform(68.2,2.55);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_28.setTransform(36.175,2.775);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAOgQAAgfQAAgegOgQQgPgRgVAAQgVAAgOARg");
	this.shape_29.setTransform(13.4,2.775);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_30.setTransform(-4.4,-1.175);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AAnBqIAAhqQAAghgDgJQgDgKgJgGQgHgFgMAAQgMAAgMAIQgMAHgDANQgFANAAAiIAABeIg3AAIAAjOIA0AAIAAAeQAagjAoAAQATAAAPAHQAPAGAIAKQAIALADAMQACANAAAYIAACAg");
	this.shape_31.setTransform(1021.6,-44.15);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_32.setTransform(998.275,-43.925);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAJgGQALgHANAAQATAAARAKIgQAwQgOgJgNAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_33.setTransform(980.9,-44.15);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_34.setTransform(966.05,-47.875);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAaABADQABAEAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPABgLgFg");
	this.shape_35.setTransform(953.875,-47.35);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_36.setTransform(935.9018,-43.925);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAKgGQAKgHANAAQATAAARAKIgRAwQgOgJgLAAQgMAAgIAGQgHAHgFARQgEAQAAA0IAABAg");
	this.shape_37.setTransform(918.75,-44.15);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_38.setTransform(887.0518,-43.925);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_39.setTransform(870.6,-47.875);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_40.setTransform(842.6518,-43.925);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_41.setTransform(820.125,-43.925);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgdAlQARgGAHgKQAGgJABgQIgaAAIAAg3IA2AAIAAAoQAAAXgFAOQgEANgLALQgLALgRAGg");
	this.shape_42.setTransform(792.55,-33.1);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_43.setTransform(775.15,-43.925);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAIgRAAQgjABgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXAAQATAAANgPQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_44.setTransform(750.175,-47.65);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_45.setTransform(727.375,-43.925);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAaABADQABAEAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPABgLgFg");
	this.shape_46.setTransform(709.625,-47.35);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAJgGQALgHANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_47.setTransform(696.7,-44.15);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_48.setTransform(675.2,-43.925);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AhkCRIAAkdIAzAAIAAAfQAKgQARgKQARgJAUAAQAkAAAZAcQAZAcAAAzQAAAygZAeQgaAcgkAAQgQAAgOgHQgOgHgPgQIAABogAghhWQgNAQAAAeQAAAjAOAQQAOARATAAQATgBANgPQAMgOAAgjQAAghgNgQQgNgPgTAAQgTAAgOAPg");
	this.shape_49.setTransform(651.275,-40.2);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_50.setTransform(626.875,-43.925);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AAnBqIAAhqQAAghgDgJQgDgKgJgGQgHgFgMAAQgNAAgLAIQgMAHgDANQgFANAAAiIAABeIg3AAIAAjOIA0AAIAAAeQAagjAoAAQATAAAPAHQAPAGAIAKQAHALAEAMQACANAAAYIAACAg");
	this.shape_51.setTransform(604.1,-44.15);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_52.setTransform(580.775,-43.925);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAJgGQALgHANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_53.setTransform(563.4,-44.15);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAaABADQABAEAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPABgLgFg");
	this.shape_54.setTransform(547.475,-47.35);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AhXCPIgFgrQANACAKAAQATAAAJgLQAKgLAEgSIhPjPIA7AAIAwCTIAxiTIA5AAIhJDHIgOAkQgHASgGAKQgHAJgHAGQgJAGgMAEQgNADgPAAQgQAAgPgDg");
	this.shape_55.setTransform(518.375,-39.725);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgVAAgOARg");
	this.shape_56.setTransform(484.2,-43.925);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAIgRAAQgjABgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXAAQATAAANgPQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_57.setTransform(459.225,-47.65);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_58.setTransform(436.425,-43.925);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_59.setTransform(419.75,-47.875);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_60.setTransform(402,-43.925);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AhGBQQgbgdAAgzQAAgyAbgdQAcgcAsAAQAmAAAXAQQAWAQAKAiIg2AJQgDgQgKgIQgJgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQAMAQAVAAQAPAAAKgJQAKgJAEgWIA2AJQgIAmgZASQgXATgpAAQgsAAgbgcg");
	this.shape_61.setTransform(378.95,-43.925);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_62.setTransform(344.825,-43.925);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_63.setTransform(322.9518,-43.925);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_64.setTransform(295.4,-47.875);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_65.setTransform(278.775,-43.925);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAaABADQABAEAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPABgLgFg");
	this.shape_66.setTransform(261.025,-47.35);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_67.setTransform(243.0518,-43.925);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("ABiBqIAAh1QAAgggGgJQgIgLgPAAQgMAAgKAHQgKAHgEAOQgFANAAAdIAABjIg2AAIAAhxQAAgegDgIQgDgKgGgEQgGgEgKAAQgNAAgLAHQgJAGgFAOQgEANgBAcIAABlIg3AAIAAjOIAzAAIAAAcQAcghAlAAQAUAAAPAIQANAIAJARQAOgRAQgIQAQgIARAAQAYAAAQAJQAPAKAIARQAFAOABAdIAACEg");
	this.shape_68.setTransform(214.25,-44.15);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AgaCPIAAkdIA1AAIAAEdg");
	this.shape_69.setTransform(179.95,-47.875);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_70.setTransform(163.1018,-43.925);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AhcBoIAAgrIBOhYIAbgfIgYAAIhJABIAAguICqAAIAAAnIhPBbIgbAeIAcgBIBVAAIAAAwg");
	this.shape_71.setTransform(130.975,-43.925);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_72.setTransform(109.8018,-43.925);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AgXBoIhUjPIA6AAIAnBpIAKAkIAGgSIAGgSIAnhpIA5AAIhTDPg");
	this.shape_73.setTransform(87.625,-43.925);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_74.setTransform(54.525,-43.925);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AAoBqIAAhqQAAghgEgJQgEgKgHgGQgJgFgKAAQgNAAgMAIQgLAHgFANQgEANAAAiIAABeIg2AAIAAjOIAyAAIAAAeQAbgjApAAQASAAAPAHQAPAGAHAKQAJALACAMQAEANAAAYIAACAg");
	this.shape_75.setTransform(31.2,-44.15);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("Ag6CIQgVgJgMgPQgMgQgEgQQgGgZAAgwIAAiYIA6AAIAACbQAAAkACALQAEASAOALQAOAKAXAAQAYAAANgKQAMgKADgPQACgOAAgiIAAieIA6AAIAACWQAAAzgEAWQgFAVgNAPQgMAOgVAJQgVAJgiAAQgoAAgWgKg");
	this.shape_76.setTransform(4.275,-47.625);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("EhQeAImIAAxLMCg9AAAIycRLg");
	this.shape_77.setTransform(483.1517,-23.2487,1.2106,1.119);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("rgba(102,102,102,0.396)").s().p("EhQCAJAQgQAAgMgMQgMgMAAgQIAAwxQAAgRAMgLQAMgMAQAAMCgFAAOQAMAAAKAHQAKAHAFAMQAEALgCAMQgDAMgJAJIx0QlQgMAKgPAAgEhQXgIuQgJAIAAANIAAQxQAAAMAJAJQAJAJAMAAMCORAACQALAAAJgIIR0wlQAHgGACgJQACgJgDgJQgEgIgIgFQgHgGgJAAMigFgAOIAAAAQgMAAgJAJg");
	this.shape_78.setTransform(483.7874,-20.9136,1.2106,1.119);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("rgba(102,102,102,0.796)").s().p("EA+PAIuMiORgACQgIAAgGgGQgGgGAAgIIAAwxQAAgJAGgGQAGgFAIAAMCgFAAOQAGAAAFAEQAFADACAGQADAGgCAGQgBAGgEAEIx0QlQgGAFgIAAIAAAAgEhQJgIgQgDADAAAEIAAQxQAAAEADADQADADAEAAMCORAACQAEAAADgDIR0wlQACgCABgCQAAgEgBgDQgBgCgDgCQgCgCgDAAMigFgAOQgEAAgDADg");
	this.shape_79.setTransform(483.7831,-20.9136,1.2106,1.119);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("rgba(102,102,102,0.596)").s().p("EA+PAI4MiORgACQgMAAgJgJQgJgJAAgMIAAwxQAAgNAJgIQAJgJAMAAMCgFAAOQAJAAAHAGQAIAFAEAIQADAJgCAJQgCAJgHAGIx0QlQgJAIgLAAIAAAAgEhQQgIoQgGAGAAAJIAAQxQAAAIAGAGQAGAGAIAAMCORAACQAIAAAFgFIR0wlQAFgEABgGQACgGgDgGQgCgGgFgDQgFgEgGAAMigFgAOIAAAAQgIAAgGAFg");
	this.shape_80.setTransform(483.788,-20.9136,1.2106,1.119);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("rgba(102,102,102,0.196)").s().p("EhQCAJKQgUAAgPgPQgPgPAAgUIAAwxQAAgVAPgPQAPgOAUAAMCgFAAOQAPAAANAJQANAJAFAOQAGAOgEAPQgDAPgLALIx0QlQgPANgTAAgEhQegI1QgMALAAARIAAQxQAAAQAMAMQAMAMAQAAMCORAACQAPAAAMgKIR0wlQAJgJADgMQACgMgEgLQgFgMgKgHQgKgHgMAAMigFgAOIAAAAQgQAAgMAMg");
	this.shape_81.setTransform(483.7866,-20.9137,1.2106,1.119);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#666666").s().p("EhQCAIiQgEAAgDgDQgDgDAAgEIAAwxQAAgEADgDQADgDAEAAMCgFAAOQADAAACACQADACABACQABADAAAEQgBACgCACIx0QlQgDADgEAAg");
	this.shape_82.setTransform(483.7838,-20.9136,1.2106,1.119);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#829F93").s().p("EhQyAImIAAxLMChlAAAIycRLg");
	this.shape_83.setTransform(490.4729,-11.9904,1.2106,1.119);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-142.4,-86.7,1258.9,136.3);


(lib.t11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape.setTransform(509.475,87.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_1.setTransform(486.7,87.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAKgHQAKgGANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_2.setTransform(468.2,86.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_3.setTransform(447.6018,87.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgfQgMATgSAIQgRAJgRgBQgjAAgagcgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXABQATAAANgQQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_4.setTransform(423.975,83.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_5.setTransform(401.175,87.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgOQgCgJAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAZABAEQABAFAEADQAEACAFAAQAIAAAOgFIAFAqQgTAIgYAAQgPABgLgFg");
	this.shape_6.setTransform(383.425,83.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgUAAgPARg");
	this.shape_7.setTransform(364.55,87.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgUCJQgRgJgMgSIAAAfIgzAAIAAkeIA3AAIAABoQAZgdAiAAQAmAAAYAbQAZAcAAAyQAAA2gZAcQgZAcglAAQgQABgSgJgAghgMQgNAOAAAfQAAAgAKAPQAPAXAWAAQASgBANgPQANgQAAghQAAgkgNgOQgNgQgTAAQgUAAgNAQg");
	this.shape_8.setTransform(340.575,83.4);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_9.setTransform(305.125,87.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_10.setTransform(282.35,87.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgaCPIAAkdIA1AAIAAEdg");
	this.shape_11.setTransform(264.55,83.175);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_12.setTransform(236.825,87.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_13.setTransform(203.525,87.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgfQgMATgSAIQgRAJgRgBQgjAAgagcgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXABQATAAANgQQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_14.setTransform(179.675,83.4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_15.setTransform(156.875,87.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgXBoIhUjPIA6AAIAnBpIAKAkIAGgSIAGgSIAnhpIA5AAIhTDPg");
	this.shape_16.setTransform(134.475,87.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_17.setTransform(112.2518,87.125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgaCPIAAkdIA1AAIAAEdg");
	this.shape_18.setTransform(95.8,83.175);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_19.setTransform(84.7,83.175);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhXCPIgFgrQANACAKAAQATAAAJgLQAKgLAEgSIhPjPIA7AAIAwCTIAxiTIA5AAIhJDHIgOAkQgHASgGAKQgHAJgHAGQgJAGgMAEQgNADgPAAQgQAAgPgDg");
	this.shape_20.setTransform(56.725,91.325);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_21.setTransform(727.225,40.425);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_22.setTransform(704.45,40.425);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AAnBqIAAhqQAAgggDgKQgEgKgHgFQgJgGgKAAQgNAAgMAIQgMAHgEANQgEANAAAiIAABeIg2AAIAAjOIAyAAIAAAeQAbgjApAAQASAAAPAGQAPAHAHAKQAJAKACANQADANABAYIAACAg");
	this.shape_23.setTransform(680,40.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAJgHQALgGANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAHQgHAGgEAQQgFARAAA0IAABAg");
	this.shape_24.setTransform(661.5,40.2);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgPAQABAeQgBAfAPAQQAOARAVAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgVAAgOARg");
	this.shape_25.setTransform(640,40.425);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AAnCPIAAhtQAAghgCgIQgEgJgHgFQgJgFgLAAQgNAAgLAHQgKAGgGANQgEANAAAaIAABoIg4AAIAAkdIA4AAIAABpQAagfAkAAQATAAAPAHQAQAHAHALQAIALACANQADAOAAAbIAAB5g");
	this.shape_26.setTransform(615.55,36.475);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_27.setTransform(580.575,40.425);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_28.setTransform(557.8,40.425);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgbCPIAAkdIA3AAIAAEdg");
	this.shape_29.setTransform(540,36.475);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_30.setTransform(512.0518,40.425);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMARgSAJQgRAJgRgBQgjAAgagcgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXABQATAAANgQQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_31.setTransform(488.425,36.7);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_32.setTransform(454.525,40.425);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMARgSAJQgRAJgRgBQgjAAgagcgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXABQATAAANgQQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_33.setTransform(430.675,36.7);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_34.setTransform(407.875,40.425);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AAoBqIAAhqQAAgggEgKQgEgKgIgFQgIgGgKAAQgOAAgLAIQgLAHgFANQgEANAAAiIAABeIg2AAIAAjOIAyAAIAAAeQAbgjAoAAQATAAAPAGQAPAHAHAKQAJAKACANQAEANAAAYIAACAg");
	this.shape_35.setTransform(384.55,40.2);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_36.setTransform(361.0018,40.425);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAKgHQAKgGANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAHQgHAGgFAQQgEARAAA0IAABAg");
	this.shape_37.setTransform(343.85,40.2);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMARgSAJQgRAJgRgBQgjAAgagcgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXABQATAAANgQQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_38.setTransform(321.825,36.7);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_39.setTransform(287.375,40.425);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_40.setTransform(265.5018,40.425);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_41.setTransform(232.425,40.425);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgaCPIAAjOIA2AAIAADOgAgahbIAAgzIA2AAIAAAzg");
	this.shape_42.setTransform(215.75,36.475);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAJgHQALgGANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAHQgHAGgEAQQgFARAAA0IAABAg");
	this.shape_43.setTransform(203.95,40.2);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_44.setTransform(182.45,40.425);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAagcAuAAQAlAAAXAQQAXAQAJAiIg2AJQgDgQgJgIQgKgIgPAAQgUAAgMAOQgMAOAAAhQAAAkAMAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgJAmgXASQgYATgoAAQgtAAgagcg");
	this.shape_45.setTransform(159.4,40.425);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_46.setTransform(136.375,40.425);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_47.setTransform(114.5018,40.425);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_48.setTransform(81.425,40.425);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AhkCOIAAkbIA6AAIAADrICPAAIAAAwg");
	this.shape_49.setTransform(58.925,36.6);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("EhQeAImIAAxLMCg9AAAIycRLg");
	this.shape_50.setTransform(456.3277,60.7412,1.071,1.071,0,0,180);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("rgba(102,102,102,0.396)").s().p("EhQCAJAQgQAAgMgMQgMgMAAgQIAAwxQAAgRAMgLQAMgMAQAAMCgFAAOQAMAAAKAHQAKAHAFAMQAEALgCAMQgDAMgJAJIx0QlQgMAKgPAAgEhQXgIuQgJAIAAANIAAQxQAAAMAJAJQAJAJAMAAMCORAACQALAAAJgIIR0wlQAHgGACgJQACgJgDgJQgEgIgIgFQgHgGgJAAMigFgAOIAAAAQgMAAgJAJg");
	this.shape_51.setTransform(455.7504,62.9802,1.071,1.071,0,0,180);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("rgba(102,102,102,0.796)").s().p("EA+PAIuMiORgACQgIAAgGgGQgGgGAAgIIAAwxQAAgJAGgGQAGgFAIAAMCgFAAOQAGAAAFAEQAFADACAGQADAGgCAGQgBAGgEAEIx0QlQgGAFgIAAIAAAAgEhQJgIgQgDADAAAEIAAQxQAAAEADADQADADAEAAMCORAACQAEAAADgDIR0wlQACgCABgCQAAgEgBgDQgBgCgDgCQgCgCgDAAMigFgAOQgEAAgDADg");
	this.shape_52.setTransform(455.7542,62.9802,1.071,1.071,0,0,180);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("rgba(102,102,102,0.596)").s().p("EA+PAI4MiORgACQgMAAgJgJQgJgJAAgMIAAwxQAAgNAJgIQAJgJAMAAMCgFAAOQAJAAAHAGQAIAFAEAIQADAJgCAJQgCAJgHAGIx0QlQgJAIgLAAIAAAAgEhQQgIoQgGAGAAAJIAAQxQAAAIAGAGQAGAGAIAAMCORAACQAIAAAFgFIR0wlQAFgEABgGQACgGgDgGQgCgGgFgDQgFgEgGAAMigFgAOIAAAAQgIAAgGAFg");
	this.shape_53.setTransform(455.7498,62.9802,1.071,1.071,0,0,180);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("rgba(102,102,102,0.196)").s().p("EhQCAJKQgUAAgPgPQgPgPAAgUIAAwxQAAgVAPgPQAPgOAUAAMCgFAAOQAPAAANAJQANAJAFAOQAGAOgEAPQgDAPgLALIx0QlQgPANgTAAgEhQegI1QgMALAAARIAAQxQAAAQAMAMQAMAMAQAAMCORAACQAPAAAMgKIR0wlQAJgJADgMQACgMgEgLQgFgMgKgHQgKgHgMAAMigFgAOIAAAAQgQAAgMAMg");
	this.shape_54.setTransform(455.7511,62.9801,1.071,1.071,0,0,180);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#666666").s().p("EhQCAIiQgEAAgDgDQgDgDAAgEIAAwxQAAgEADgDQADgDAEAAMCgFAAOQADAAACACQADACABACQABADAAAEQgBACgCACIx0QlQgDADgEAAg");
	this.shape_55.setTransform(455.7536,62.9802,1.071,1.071,0,0,180);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#829F93").s().p("EhQyAImIAAxLMChlAAAIycRLg");
	this.shape_56.setTransform(449.8357,71.5129,1.071,1.071,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-104,0,1113.8,130.4);


(lib.t10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape.setTransform(699.6518,211.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAaABADQABAEAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPABgLgFg");
	this.shape_1.setTransform(682.125,207.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAnBqIAAhqQABghgEgJQgEgKgHgGQgJgFgKAAQgOAAgLAIQgMAHgDANQgFANAAAiIAABeIg3AAIAAjOIAzAAIAAAeQAcgjAoAAQASAAAPAHQAPAGAIAKQAHALADAMQADANAAAYIAACAg");
	this.shape_2.setTransform(663.25,211);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_3.setTransform(639.7018,211.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("ABiBqIAAh1QAAgggGgJQgIgLgPAAQgMAAgKAHQgKAHgEAOQgFANAAAdIAABjIg2AAIAAhxQAAgegDgIQgDgKgGgEQgGgEgLAAQgNAAgJAHQgKAGgFAOQgFANAAAcIAABlIg3AAIAAjOIAzAAIAAAcQAbghAmAAQAUAAAOAIQAOAIAKARQANgRAQgIQAQgIASAAQAWAAARAJQAPAKAIARQAGAOgBAdIAACEg");
	this.shape_4.setTransform(610.9,211);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_5.setTransform(582.175,211.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAaABADQABAEAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPABgLgFg");
	this.shape_6.setTransform(564.425,207.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_7.setTransform(546.4518,211.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_8.setTransform(530,207.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhkCSIAAkeIAzAAIAAAfQAKgQARgKQARgJAUAAQAkAAAZAcQAZAcAAAzQAAAygZAeQgaAcgkAAQgQAAgOgHQgOgHgPgQIAABpgAghhWQgNAQAAAeQAAAjAOAQQAOARATAAQATgBANgPQAMgOAAgjQAAghgNgQQgNgPgTAAQgTAAgOAPg");
	this.shape_9.setTransform(512.775,214.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("ABiBqIAAh1QAAgggGgJQgIgLgPAAQgMAAgKAHQgKAHgEAOQgFANAAAdIAABjIg2AAIAAhxQAAgegDgIQgDgKgGgEQgGgEgLAAQgNAAgKAHQgJAGgFAOQgFANAAAcIAABlIg3AAIAAjOIAzAAIAAAcQAbghAmAAQAUAAAPAIQANAIAKARQANgRAQgIQAQgIASAAQAWAAARAJQAPAKAIARQAFAOAAAdIAACEg");
	this.shape_10.setTransform(482.1,211);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgVAAgOARg");
	this.shape_11.setTransform(452.25,211.225);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAagcAuAAQAlAAAXAQQAXAQAJAiIg2AJQgDgQgJgIQgKgIgPAAQgUAAgMAOQgMAOAAAhQAAAkAMAPQAMAQAVAAQAPAAAKgJQAKgJAEgWIA2AJQgJAmgXASQgYATgoAAQgtAAgagcg");
	this.shape_12.setTransform(429.2,211.225);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_13.setTransform(395.4018,211.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAbgcAsAAQAnAAAWAQQAXAQAJAiIg2AJQgDgQgJgIQgKgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgJAmgXASQgYATgoAAQgtAAgagcg");
	this.shape_14.setTransform(373.7,211.225);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("Ag+BhQgQgJgIgRQgHgRAAgcIAAiDIA3AAIAABgQAAAqADAKQADAKAIAFQAIAHAMgBQANAAALgHQALgIAEgMQAFgLAAgrIAAhYIA2AAIAADOIgzAAIAAgeQgLAQgSAKQgSAJgUAAQgVAAgRgJg");
	this.shape_15.setTransform(349.975,211.45);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAIgRAAQgjABgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXAAQATAAANgPQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_16.setTransform(325.125,207.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_17.setTransform(302.1018,211.225);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAJgGQALgHANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_18.setTransform(284.95,211);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhXCPIgFgrQANACAKAAQATAAAJgLQAKgLAEgSIhPjPIA7AAIAwCTIAxiTIA5AAIhJDHIgOAkQgHASgGAKQgHAJgHAGQgJAGgMAEQgNADgPAAQgQAAgPgDg");
	this.shape_19.setTransform(253.225,215.425);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_20.setTransform(219.9518,211.225);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAIgRAAQgjABgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXAAQATAAANgPQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_21.setTransform(196.325,207.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AAnBqIAAhqQAAghgDgJQgEgKgHgGQgJgFgKAAQgNAAgMAIQgMAHgEANQgEANAAAiIAABeIg2AAIAAjOIAyAAIAAAeQAcgjAoAAQASAAAPAHQAPAGAHAKQAJALACAMQADANABAYIAACAg");
	this.shape_22.setTransform(172.4,211);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("Ag+BhQgQgJgIgRQgHgRAAgcIAAiDIA3AAIAABgQAAAqADAKQADAKAIAFQAIAHAMgBQANAAALgHQALgIAEgMQAFgLAAgrIAAhYIA2AAIAADOIgzAAIAAgeQgLAQgSAKQgSAJgUAAQgVAAgRgJg");
	this.shape_23.setTransform(147.825,211.45);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgnCRIAAijIgeAAIAAgrIAeAAIAAgQQAAgZAGgOQAGgNAPgHQANgJAXABQAYgBAWAIIgHAmQgNgDgMAAQgMgBgFAGQgGAFAAARIAAAOIApAAIAAArIgpAAIAACjg");
	this.shape_24.setTransform(129.825,207.05);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_25.setTransform(100.0018,211.225);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_26.setTransform(77.475,211.225);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_27.setTransform(44.5018,211.225);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAIgRAAQgjABgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXAAQATAAANgPQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_28.setTransform(20.875,207.5);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AAnBqIAAhqQAAghgDgJQgDgKgJgGQgHgFgMAAQgMAAgMAIQgMAHgDANQgFANAAAiIAABeIg3AAIAAjOIA0AAIAAAeQAagjAoAAQATAAAPAHQAPAGAIAKQAIALADAMQACANAAAYIAACAg");
	this.shape_29.setTransform(-3.05,211);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgUAAgPARg");
	this.shape_30.setTransform(-27.5,211.225);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAIgRAAQgjABgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXAAQATAAANgPQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_31.setTransform(-52.475,207.5);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AAoBqIAAhqQAAghgEgJQgDgKgJgGQgIgFgKAAQgOAAgLAIQgLAHgFANQgEANAAAiIAABeIg2AAIAAjOIAyAAIAAAeQAbgjAoAAQATAAAPAHQAPAGAHAKQAJALACAMQAEANAAAYIAACAg");
	this.shape_32.setTransform(-87.5,211);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_33.setTransform(-111.0482,211.225);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_34.setTransform(645.925,164.525);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAOgQABgfQgBgegOgQQgPgRgVAAQgVAAgOARg");
	this.shape_35.setTransform(623.15,164.525);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhGBQQgbgdAAgzQAAgyAbgdQAbgcAuAAQAlAAAXAQQAWAQAKAiIg2AJQgDgQgKgIQgJgIgPAAQgUAAgMAOQgMAOAAAhQAAAkAMAPQAMAQAVAAQAPAAAKgJQAKgJAEgWIA2AJQgJAmgXASQgYATgpAAQgsAAgbgcg");
	this.shape_36.setTransform(600.1,164.525);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgaCPIAAjOIA1AAIAADOgAgahbIAAgzIA1AAIAAAzg");
	this.shape_37.setTransform(583.15,160.575);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAKgHQAKgGANAAQATAAARAKIgRAwQgOgJgLAAQgMAAgIAGQgHAHgFARQgEAQAAA0IAABAg");
	this.shape_38.setTransform(571.35,164.3);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgOQgCgJAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAZABAEQABAFAEADQAEACAFAAQAIAAAOgFIAFAqQgTAIgYAAQgPABgLgFg");
	this.shape_39.setTransform(555.425,161.1);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAbgcAtAAQAmAAAWAQQAWAQAKAiIg2AJQgDgQgJgIQgKgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgJAmgYASQgXATgoAAQgtAAgagcg");
	this.shape_40.setTransform(537.95,164.525);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhMBxQgUgdAAgrQAAgyAbgeQAbgdApAAQAtAAAbAfQAbAegBA+IiJAAQABAZAMANQANAOASAAQANAAAJgHQAJgHAEgQIA3AJQgLAegWAQQgXAQgiAAQg2AAgagjgAgbgNQgMANAAAWIBRAAQAAgXgMgMQgMgNgRAAQgRAAgLANgAgbhZIAbg6IA9AAIg2A6g");
	this.shape_41.setTransform(515.2518,160.575);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_42.setTransform(498.8,160.575);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_43.setTransform(481.9518,164.525);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_44.setTransform(448.325,164.525);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_45.setTransform(425.55,164.525);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AAoBqIAAhqQAAghgEgJQgEgKgHgFQgJgGgKAAQgNAAgMAIQgLAHgFANQgEANAAAiIAABeIg2AAIAAjOIAyAAIAAAeQAbgjApAAQASAAAPAGQAPAHAHAKQAJAKACANQAEANAAAYIAACAg");
	this.shape_46.setTransform(401.1,164.3);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAJgHQALgGANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_47.setTransform(382.6,164.3);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_48.setTransform(361.1,164.525);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AAnCPIAAhtQAAghgDgIQgDgJgHgFQgJgFgLAAQgNAAgLAHQgKAGgGANQgEANAAAaIAABoIg3AAIAAkdIA3AAIAABpQAagfAkAAQATAAAPAHQAPAHAIALQAHALADANQADAOABAbIAAB5g");
	this.shape_49.setTransform(336.65,160.575);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_50.setTransform(301.675,164.525);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAOgQAAgfQAAgegOgQQgPgRgVAAQgVAAgOARg");
	this.shape_51.setTransform(278.9,164.525);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_52.setTransform(261.1,160.575);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_53.setTransform(233.375,164.525);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgOQgCgJAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAZABAEQABAFAEADQAEACAFAAQAIAAAOgFIAFAqQgTAIgYAAQgPABgLgFg");
	this.shape_54.setTransform(215.625,161.1);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AAnBqIAAhqQAAghgDgJQgDgKgJgFQgHgGgMAAQgMAAgMAIQgMAHgDANQgFANAAAiIAABeIg3AAIAAjOIA0AAIAAAeQAagjAoAAQATAAAPAGQAPAHAIAKQAIAKADANQACANAAAYIAACAg");
	this.shape_55.setTransform(196.75,164.3);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_56.setTransform(173.2018,164.525);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("ABiBqIAAh1QAAgggGgJQgIgLgPAAQgMAAgKAHQgKAHgEANQgFAOAAAdIAABjIg2AAIAAhxQAAgegDgIQgDgKgGgEQgGgEgKAAQgNAAgLAHQgKAGgEAOQgEANgBAcIAABlIg3AAIAAjOIAzAAIAAAcQAcghAlAAQAUAAAPAIQANAIAJARQAOgRAQgIQAQgIARAAQAXAAARAJQAPAKAIARQAFANABAeIAACEg");
	this.shape_57.setTransform(144.4,164.3);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_58.setTransform(121.2,160.575);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_59.setTransform(110.1,160.575);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_60.setTransform(93.475,164.525);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_61.setTransform(60.175,164.525);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AAnBqIAAhqQABghgEgJQgEgKgHgFQgJgGgKAAQgNAAgMAIQgMAHgEANQgEANAAAiIAABeIg3AAIAAjOIAzAAIAAAeQAcgjAoAAQASAAAPAGQAPAHAIAKQAHAKADANQADANAAAYIAACAg");
	this.shape_62.setTransform(36.85,164.3);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_63.setTransform(19.05,160.575);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAagcAuAAQAlAAAXAQQAXAQAJAiIg2AJQgDgQgJgIQgKgIgPAAQgUAAgMAOQgMAOAAAhQAAAkAMAPQAMAQAUAAQAQAAAKgJQAKgJAEgWIA2AJQgIAmgYASQgYATgoAAQgtAAgagcg");
	this.shape_64.setTransform(2.7,164.525);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_65.setTransform(-14.25,160.575);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_66.setTransform(-30.875,164.525);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AhGBQQgbgdAAgzQAAgyAbgdQAcgcAsAAQAnAAAWAQQAWAQAKAiIg2AJQgDgQgKgIQgJgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgIAmgZASQgXATgpAAQgsAAgbgcg");
	this.shape_67.setTransform(-52.8,164.525);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_68.setTransform(-86.375,164.525);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AhkCOIAAkbIA6AAIAADrICPAAIAAAwg");
	this.shape_69.setTransform(-108.875,160.7);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("EhQeAImIAAxLMCg9AAAIycRLg");
	this.shape_70.setTransform(312.5277,187.5912,1.071,1.071,0,0,180);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("rgba(102,102,102,0.396)").s().p("EhQCAJAQgQAAgMgMQgMgMAAgQIAAwxQAAgRAMgLQAMgMAQAAMCgFAAOQAMAAAKAHQAKAHAFAMQAEALgCAMQgDAMgJAJIx0QlQgMAKgPAAgEhQXgIuQgJAIAAANIAAQxQAAAMAJAJQAJAJAMAAMCORAACQALAAAJgIIR0wlQAHgGACgJQACgJgDgJQgEgIgIgFQgHgGgJAAMigFgAOIAAAAQgMAAgJAJg");
	this.shape_71.setTransform(311.9504,189.8302,1.071,1.071,0,0,180);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("rgba(102,102,102,0.796)").s().p("EA+PAIuMiORgACQgIAAgGgGQgGgGAAgIIAAwxQAAgJAGgGQAGgFAIAAMCgFAAOQAGAAAFAEQAFADACAGQADAGgCAGQgBAGgEAEIx0QlQgGAFgIAAIAAAAgEhQJgIgQgDADAAAEIAAQxQAAAEADADQADADAEAAMCORAACQAEAAADgDIR0wlQACgCABgCQAAgEgBgDQgBgCgDgCQgCgCgDAAMigFgAOQgEAAgDADg");
	this.shape_72.setTransform(311.9542,189.8302,1.071,1.071,0,0,180);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("rgba(102,102,102,0.596)").s().p("EA+PAI4MiORgACQgMAAgJgJQgJgJAAgMIAAwxQAAgNAJgIQAJgJAMAAMCgFAAOQAJAAAHAGQAIAFAEAIQADAJgCAJQgCAJgHAGIx0QlQgJAIgLAAIAAAAgEhQQgIoQgGAGAAAJIAAQxQAAAIAGAGQAGAGAIAAMCORAACQAIAAAFgFIR0wlQAFgEABgGQACgGgDgGQgCgGgFgDQgFgEgGAAMigFgAOIAAAAQgIAAgGAFg");
	this.shape_73.setTransform(311.9498,189.8302,1.071,1.071,0,0,180);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("rgba(102,102,102,0.196)").s().p("EhQCAJKQgUAAgPgPQgPgPAAgUIAAwxQAAgVAPgPQAPgOAUAAMCgFAAOQAPAAANAJQANAJAFAOQAGAOgEAPQgDAPgLALIx0QlQgPANgTAAgEhQegI1QgMALAAARIAAQxQAAAQAMAMQAMAMAQAAMCORAACQAPAAAMgKIR0wlQAJgJADgMQACgMgEgLQgFgMgKgHQgKgHgMAAMigFgAOIAAAAQgQAAgMAMg");
	this.shape_74.setTransform(311.9511,189.8301,1.071,1.071,0,0,180);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#666666").s().p("EhQCAIiQgEAAgDgDQgDgDAAgEIAAwxQAAgEADgDQADgDAEAAMCgFAAOQADAAACACQADACABACQABADAAAEQgBACgCACIx0QlQgDADgEAAg");
	this.shape_75.setTransform(311.9536,189.8302,1.071,1.071,0,0,180);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#829F93").s().p("EhQyAImIAAxLMChlAAAIycRLg");
	this.shape_76.setTransform(306.0357,198.3629,1.071,1.071,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-247.8,126.9,1113.8,130.4);


(lib.t9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape.setTransform(829.875,145.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ag+BhQgQgJgIgRQgHgRAAgcIAAiDIA3AAIAABgQAAAqADAKQADAKAIAFQAIAHAMgBQANAAALgHQALgIAEgMQAFgLAAgrIAAhYIA2AAIAADOIgzAAIAAgeQgLAQgSAKQgSAJgUAAQgVAAgRgJg");
	this.shape_1.setTransform(806.975,146.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgbCPIAAjOIA3AAIAADOgAgbhbIAAgzIA3AAIAAAzg");
	this.shape_2.setTransform(789.3,142.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhGBQQgbgdAAgzQAAgyAbgdQAcgcAsAAQAnAAAWAQQAWAQAKAiIg2AJQgDgQgKgIQgJgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgIAmgZASQgXATgpAAQgsAAgbgcg");
	this.shape_3.setTransform(772.95,145.975);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgbCPIAAkdIA3AAIAAEdg");
	this.shape_4.setTransform(756,142.025);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_5.setTransform(739.1518,145.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhXBtQglgnAAhEQAAhGAlgnQAlgoA7AAQA1AAAhAfQATASAKAjIg5ANQgFgWgQgNQgRgNgXAAQgfAAgTAXQgUAXAAAzQAAA2ATAWQAUAYAeAAQAXAAARgPQAQgPAIgfIA4ARQgNAwgeAWQgeAXguAAQg4AAglgng");
	this.shape_6.setTransform(713.675,142.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_7.setTransform(676.625,145.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgVAAgOARg");
	this.shape_8.setTransform(653.85,145.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAIgRAAQgjABgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXAAQATAAANgPQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_9.setTransform(628.875,142.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_10.setTransform(606.075,145.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAJgGQALgHANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_11.setTransform(588.7,145.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhHCCQgWgSAAgcIAAgHIA/AIQABALAGAFQAIAFAPAAQAWAAALgGQAHgFAEgJQACgHAAgTIAAgdQgYAhglAAQgqAAgYgjQgTgcAAgpQAAg0AZgcQAZgbAlAAQAmAAAZAiIAAgdIAzAAIAAC4QAAAmgGARQgGATgLAKQgLALgSAFQgTAGgbAAQg0AAgWgSgAgfhZQgNAPAAAfQAAAhANAOQAMAPATABQATAAAOgQQAOgPAAgeQAAghgNgPQgNgQgVAAQgTAAgMAQg");
	this.shape_12.setTransform(566.675,149.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhCByQgaggAAhSQAAhQAcgkQAXgdApAAQAqAAAXAdQAcAkAABQQAABRgcAkQgXAdgqAAQgpAAgZgggAgRhdQgIAGgEAQQgGAWAAAxQAAAyAGATQAFATAHAGQAIAHAJAAQAKAAAIgHQAIgGAEgQQAGgWAAgyQAAgxgGgTQgFgTgHgGQgIgHgKAAQgJAAgIAHg");
	this.shape_13.setTransform(532.575,142.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhCByQgaggAAhSQAAhQAcgkQAXgdApAAQAqAAAXAdQAcAkAABQQAABRgcAkQgXAdgqAAQgpAAgZgggAgRhdQgIAGgEAQQgGAWAAAxQAAAyAGATQAFATAHAGQAIAHAJAAQAKAAAIgHQAIgGAEgQQAGgWAAgyQAAgxgGgTQgFgTgHgGQgIgHgKAAQgJAAgIAHg");
	this.shape_14.setTransform(510.375,142.225);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("Ag+B+QgfgYAAgrQAAgXALgTQAMgTAZgKQgVgJgKgQQgKgQAAgSQAAggAXgVQAWgVApAAQAoAAAXAVQAWAVAAAgQAAAUgKAPQgLAQgSAIQAXAJANASQAMASAAAYQAAAogZAZQgZAYgqAAQgmAAgagUgAgdAYQgKAOAAAQQAAAXAMAMQALANARAAQARAAALgMQALgMAAgXQAAgUgLgMQgMgNgRAAQgTAAgKAOgAgYhcQgKAJAAAPQAAARAKAJQAJAJAPAAQAPAAAJgJQAKgJAAgRQAAgPgKgJQgJgKgPAAQgPAAgJAKg");
	this.shape_15.setTransform(488.225,142.225);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_16.setTransform(454.525,145.975);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_17.setTransform(431.75,145.975);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgaCPIAAkdIA1AAIAAEdg");
	this.shape_18.setTransform(413.95,142.025);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_19.setTransform(386.225,145.975);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_20.setTransform(352.925,145.975);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AAnBqIAAhqQAAghgDgJQgDgKgJgGQgHgFgMAAQgNAAgLAIQgMAHgDANQgFANAAAiIAABeIg3AAIAAjOIA0AAIAAAeQAagjAoAAQATAAAPAHQAPAGAIAKQAHALAEAMQACANAAAYIAACAg");
	this.shape_21.setTransform(329.6,145.75);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_22.setTransform(306.275,145.975);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhGBQQgbgdAAgzQAAgyAbgdQAcgcAsAAQAnAAAWAQQAWAQAKAiIg2AJQgDgQgKgIQgJgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgIAmgZASQgXATgpAAQgsAAgbgcg");
	this.shape_23.setTransform(284.35,145.975);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAKgGQAKgHANAAQATAAARAKIgRAwQgOgJgLAAQgMAAgIAGQgHAHgFARQgEAQAAA0IAABAg");
	this.shape_24.setTransform(266.7,145.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_25.setTransform(246.1018,145.975);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhGBQQgbgdAAgzQAAgyAbgdQAcgcAsAAQAnAAAWAQQAWAQAKAiIg2AJQgDgQgJgIQgKgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgIAmgZASQgXATgoAAQgtAAgbgcg");
	this.shape_26.setTransform(224.4,145.975);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAJgGQALgHANAAQATAAARAKIgRAwQgNgJgNAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_27.setTransform(195.65,145.75);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_28.setTransform(175.275,145.975);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAaABADQABAEAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPABgLgFg");
	this.shape_29.setTransform(157.525,142.55);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_30.setTransform(139.225,145.975);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_31.setTransform(117.3518,145.975);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_32.setTransform(84.0518,145.975);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgUCJQgRgJgMgSIAAAfIgzAAIAAkdIA3AAIAABnQAZgdAiAAQAmAAAYAbQAZAcAAAyQAAA1gZAdQgZAdglgBQgQAAgSgIgAghgMQgNAOAAAfQAAAgAKAQQAPAWAWgBQASAAANgPQANgQAAghQAAgkgNgOQgNgQgTAAQgUAAgNAQg");
	this.shape_33.setTransform(61.425,142.25);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_34.setTransform(37.4018,145.975);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAIgRAAQgjABgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXAAQATAAANgPQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_35.setTransform(13.775,142.25);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAJgHQALgGANAAQATAAARAKIgRAwQgNgJgNAAQgLAAgIAGQgHAHgEAQQgFARAAA0IAABAg");
	this.shape_36.setTransform(815.3,99.05);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgVAAgOARg");
	this.shape_37.setTransform(793.8,99.275);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAJgRgBQgjAAgagcgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXABQATAAANgQQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_38.setTransform(768.825,95.55);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_39.setTransform(746.025,99.275);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AAoBqIAAhqQgBghgDgJQgDgKgJgFQgHgGgMAAQgMAAgMAIQgLAHgEANQgFANAAAiIAABeIg3AAIAAjOIA0AAIAAAeQAbgjAnAAQATAAAPAGQAPAHAHAKQAIAKAEANQACANAAAYIAACAg");
	this.shape_40.setTransform(722.7,99.05);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgaCPIAAjOIA2AAIAADOgAgahbIAAgzIA2AAIAAAzg");
	this.shape_41.setTransform(704.9,95.325);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AhGBQQgbgdAAgzQAAgyAbgdQAcgcAsAAQAmAAAXAQQAWAQAKAiIg2AJQgDgQgKgIQgJgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQAMAQAVAAQAPAAAKgJQAKgJAEgWIA2AJQgIAmgZASQgXATgpAAQgsAAgbgcg");
	this.shape_42.setTransform(688.55,99.275);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_43.setTransform(671.6,95.325);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_44.setTransform(654.975,99.275);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAagcAuAAQAlAAAXAQQAXAQAJAiIg2AJQgDgQgJgIQgKgIgPAAQgUAAgMAOQgMAOAAAhQAAAkAMAPQAMAQAVAAQAPAAAKgJQAKgJAEgWIA2AJQgJAmgXASQgYATgoAAQgtAAgagcg");
	this.shape_45.setTransform(633.05,99.275);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_46.setTransform(605,95.325);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_47.setTransform(588.1518,99.275);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAJgRgBQgjAAgagcgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXABQATAAANgQQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_48.setTransform(564.525,95.55);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAKgHQAKgGANAAQATAAARAKIgQAwQgPgJgLAAQgMAAgIAGQgHAHgFAQQgEARAAA0IAABAg");
	this.shape_49.setTransform(535.45,99.05);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgUAAgPARg");
	this.shape_50.setTransform(513.95,99.275);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_51.setTransform(496.15,95.325);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAKgHQAKgGANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAGQgHAHgFAQQgEARAAA0IAABAg");
	this.shape_52.setTransform(484.35,99.05);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_53.setTransform(463.7518,99.275);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgOQgCgJAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAZABAEQABAFAEACQAEADAFAAQAIAAAOgFIAFAqQgTAIgYAAQgPABgLgFg");
	this.shape_54.setTransform(446.225,95.85);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AAnBqIAAhqQABghgEgJQgEgKgHgFQgJgGgLAAQgNAAgLAIQgMAHgDANQgFANAAAiIAABeIg3AAIAAjOIAzAAIAAAeQAcgjAoAAQASAAAPAGQAPAHAIAKQAHAKADANQADANAAAYIAACAg");
	this.shape_55.setTransform(427.35,99.05);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_56.setTransform(409.55,95.325);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_57.setTransform(387.35,95.325);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_58.setTransform(370.5018,99.275);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AAoBqIAAhqQAAghgEgJQgEgKgHgFQgJgGgKAAQgNAAgMAIQgLAHgFANQgEANAAAiIAABeIg2AAIAAjOIAyAAIAAAeQAbgjApAAQASAAAPAGQAPAHAHAKQAJAKACANQAEANAAAYIAACAg");
	this.shape_59.setTransform(336.3,99.05);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_60.setTransform(312.7518,99.275);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_61.setTransform(279.675,99.275);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAKgHQAKgGANAAQATAAARAKIgQAwQgPgJgLAAQgMAAgIAGQgHAHgFAQQgEARAAA0IAABAg");
	this.shape_62.setTransform(262.3,99.05);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("Ag+BhQgQgJgIgRQgHgRAAgcIAAiDIA3AAIAABgQAAAqADAKQADAKAIAGQAIAFAMAAQANAAALgHQALgIAEgMQAFgLAAgrIAAhYIA2AAIAADOIgzAAIAAgeQgLAQgSAKQgSAJgUAAQgVAAgRgJg");
	this.shape_63.setTransform(240.675,99.5);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgOQgCgJAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAZABAEQABAFAEACQAEADAFAAQAIAAAOgFIAFAqQgTAIgYAAQgPABgLgFg");
	this.shape_64.setTransform(221.925,95.85);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_65.setTransform(204.175,99.275);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAKgHQAKgGANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAGQgHAHgFAQQgEARAAA0IAABAg");
	this.shape_66.setTransform(186.8,99.05);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_67.setTransform(166.2018,99.275);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AhkCRIAAkdIAzAAIAAAfQAKgQARgKQARgJAUAAQAkAAAZAcQAZAcAAAzQAAAzgZAdQgaAcgkAAQgQAAgOgHQgOgGgPgRIAABogAghhWQgNAQAAAeQAAAjAOAQQAOAQATABQATgBANgPQAMgOAAgjQAAgggNgRQgNgPgTAAQgTAAgOAPg");
	this.shape_68.setTransform(143.625,103);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("ABiBqIAAh1QAAgggGgJQgHgLgRAAQgLAAgKAHQgKAHgFAOQgEANAAAdIAABjIg2AAIAAhxQAAgegDgIQgDgKgGgEQgGgEgLAAQgMAAgKAHQgLAGgEAOQgFANABAcIAABlIg3AAIAAjOIAyAAIAAAcQAcghAlAAQAUAAAOAIQAOAIAKARQANgRAQgIQAQgIASAAQAXAAAPAJQAQAKAIARQAGANgBAeIAACEg");
	this.shape_69.setTransform(112.95,99.05);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_70.setTransform(84.0018,99.275);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgOQgCgJAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAZABAEQABAFAEACQAEADAFAAQAIAAAOgFIAFAqQgTAIgYAAQgPABgLgFg");
	this.shape_71.setTransform(66.475,95.85);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_72.setTransform(37.625,99.275);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AhkCOIAAkbIA6AAIAADrICPAAIAAAwg");
	this.shape_73.setTransform(15.125,95.45);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("EhQeAImIAAxLMCg9AAAIycRLg");
	this.shape_74.setTransform(414.5777,119.5912,1.071,1.071,0,0,180);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("rgba(102,102,102,0.396)").s().p("EhQCAJAQgQAAgMgMQgMgMAAgQIAAwxQAAgRAMgLQAMgMAQAAMCgFAAOQAMAAAKAHQAKAHAFAMQAEALgCAMQgDAMgJAJIx0QlQgMAKgPAAgEhQXgIuQgJAIAAANIAAQxQAAAMAJAJQAJAJAMAAMCORAACQALAAAJgIIR0wlQAHgGACgJQACgJgDgJQgEgIgIgFQgHgGgJAAMigFgAOIAAAAQgMAAgJAJg");
	this.shape_75.setTransform(414.0004,121.8302,1.071,1.071,0,0,180);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("rgba(102,102,102,0.796)").s().p("EA+PAIuMiORgACQgIAAgGgGQgGgGAAgIIAAwxQAAgJAGgGQAGgFAIAAMCgFAAOQAGAAAFAEQAFADACAGQADAGgCAGQgBAGgEAEIx0QlQgGAFgIAAIAAAAgEhQJgIgQgDADAAAEIAAQxQAAAEADADQADADAEAAMCORAACQAEAAADgDIR0wlQACgCABgCQAAgEgBgDQgBgCgDgCQgCgCgDAAMigFgAOQgEAAgDADg");
	this.shape_76.setTransform(414.0042,121.8302,1.071,1.071,0,0,180);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("rgba(102,102,102,0.596)").s().p("EA+PAI4MiORgACQgMAAgJgJQgJgJAAgMIAAwxQAAgNAJgIQAJgJAMAAMCgFAAOQAJAAAHAGQAIAFAEAIQADAJgCAJQgCAJgHAGIx0QlQgJAIgLAAIAAAAgEhQQgIoQgGAGAAAJIAAQxQAAAIAGAGQAGAGAIAAMCORAACQAIAAAFgFIR0wlQAFgEABgGQACgGgDgGQgCgGgFgDQgFgEgGAAMigFgAOIAAAAQgIAAgGAFg");
	this.shape_77.setTransform(413.9998,121.8302,1.071,1.071,0,0,180);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("rgba(102,102,102,0.196)").s().p("EhQCAJKQgUAAgPgPQgPgPAAgUIAAwxQAAgVAPgPQAPgOAUAAMCgFAAOQAPAAANAJQANAJAFAOQAGAOgEAPQgDAPgLALIx0QlQgPANgTAAgEhQegI1QgMALAAARIAAQxQAAAQAMAMQAMAMAQAAMCORAACQAPAAAMgKIR0wlQAJgJADgMQACgMgEgLQgFgMgKgHQgKgHgMAAMigFgAOIAAAAQgQAAgMAMg");
	this.shape_78.setTransform(414.0011,121.8301,1.071,1.071,0,0,180);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#666666").s().p("EhQCAIiQgEAAgDgDQgDgDAAgEIAAwxQAAgEADgDQADgDAEAAMCgFAAOQADAAACACQADACABACQABADAAAEQgBACgCACIx0QlQgDADgEAAg");
	this.shape_79.setTransform(414.0036,121.8302,1.071,1.071,0,0,180);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#829F93").s().p("EhQyAImIAAxLMChlAAAIycRLg");
	this.shape_80.setTransform(408.0857,130.3629,1.071,1.071,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-145.7,58.9,1113.7,130.4);


(lib.t8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape.setTransform(632.375,103.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAKgHQAKgGANAAQATAAARAKIgRAwQgOgJgLAAQgMAAgIAHQgHAGgFAQQgEARAAA0IAABAg");
	this.shape_1.setTransform(615,103.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAVAAAPgRQAOgQABgfQgBgegOgQQgPgRgVAAQgVAAgOARg");
	this.shape_2.setTransform(593.5,103.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAoCPIAAhtQAAghgEgIQgCgJgJgFQgIgFgLAAQgNAAgLAHQgKAGgGANQgEANAAAaIAABoIg3AAIAAkdIA3AAIAABpQAagfAkAAQATAAAPAHQAPAHAIALQAHALADANQAEAOAAAbIAAB5g");
	this.shape_3.setTransform(569.05,100.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAJgHQALgGANAAQATAAARAKIgRAwQgNgJgNAAQgLAAgIAHQgHAGgEAQQgFARAAA0IAABAg");
	this.shape_4.setTransform(539.45,103.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgVAAgOARg");
	this.shape_5.setTransform(517.95,103.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhkCRIAAkdIAzAAIAAAfQAKgQARgKQARgKAUABQAkgBAZAcQAZAdAAAzQAAAzgZAdQgaAcgkAAQgQAAgOgHQgOgHgPgQIAABogAghhVQgNAPAAAfQAAAiAOAQQAOAQATAAQATABANgPQAMgPAAgjQAAgggNgQQgNgQgTAAQgTAAgOAQg");
	this.shape_6.setTransform(494.025,107.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_7.setTransform(458.525,103.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_8.setTransform(436.875,103.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMARgSAJQgRAJgRAAQgjAAgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXABQATgBANgPQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_9.setTransform(413.025,100.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_10.setTransform(390.225,103.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_11.setTransform(373.55,100.025);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_12.setTransform(356.7018,103.975);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AAoBqIAAhqQAAghgEgJQgEgKgHgFQgJgGgKAAQgNAAgMAHQgLAJgFAMQgEAOAAAhIAABeIg2AAIAAjPIAyAAIAAAfQAbgjApAAQASAAAPAGQAPAHAHAKQAJAKACANQAEANAAAYIAACAg");
	this.shape_13.setTransform(333.6,103.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgVAAgOARg");
	this.shape_14.setTransform(309.15,103.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgICKQgMgFgFgIQgGgIgCgOQgCgJAAgdIAAhZIgZAAIAAgtIAZAAIAAgpIA2gfIAABIIAmAAIAAAtIgmAAIAABSQAAAaABADQABAFAEACQAEADAFAAQAIAAAOgFIAFArQgTAHgYABQgPAAgLgFg");
	this.shape_15.setTransform(290.275,100.55);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhCB6QgZgVgEgkIA2gGQADATALALQAMALAPAAQAQAAAMgOQAMgOAAgcQAAgbgMgNQgMgMgSAAQgYAAgSAUIgtgHIAciUICQAAIAAA0IhmAAIgJAwQATgJASAAQAkAAAaAbQAZAZAAArQAAAjgUAcQgcAmgxAAQgoAAgZgWg");
	this.shape_16.setTransform(261.675,100.475);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("Ag2CNQABg7AXg+QAXg9AmgwIh8AAIAAgzIC7AAIAAAoQgXAXgYAqQgYAqgNAwQgMAwABAmg");
	this.shape_17.setTransform(239.125,100.225);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AAICQIAAjOQgdAcgpAOIAAgyQAWgHAZgUQAYgUAKgaIAsAAIAAEfg");
	this.shape_18.setTransform(215.3,99.975);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_19.setTransform(183.5018,103.975);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMARgSAJQgRAJgRAAQgjAAgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXABQATgBANgPQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_20.setTransform(159.875,100.25);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjAAgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAWAXAAQATgBANgQQAOgQAAggQAAgjgNgPQgNgQgUAAQgTAAgNAQg");
	this.shape_21.setTransform(837.275,53.55);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_22.setTransform(814.475,57.275);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjAAgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAWAXAAQATgBANgQQAOgQAAggQAAgjgNgPQgNgQgUAAQgTAAgNAQg");
	this.shape_23.setTransform(790.625,53.55);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_24.setTransform(773.35,53.325);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAagcAuAAQAlAAAXAQQAXAQAJAiIg2AJQgDgQgJgIQgKgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgJAmgXASQgYATgoAAQgtAAgagcg");
	this.shape_25.setTransform(757,57.275);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_26.setTransform(734.525,57.275);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhkCRIAAkdIAzAAIAAAfQAKgQARgKQARgKAUAAQAkAAAZAcQAZAdAAAyQAAA0gZAdQgaAcgkAAQgQAAgOgHQgOgGgPgRIAABogAghhVQgNAPAAAfQAAAiAOAQQAOAQATAAQATAAANgOQAMgPAAgjQAAghgNgPQgNgQgTAAQgTAAgOAQg");
	this.shape_27.setTransform(711.725,61);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_28.setTransform(687.875,57.275);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhGBQQgbgdAAgzQAAgyAbgdQAcgcAsAAQAnAAAWAQQAWAQAKAiIg2AJQgDgQgKgIQgJgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgIAmgZASQgXATgpAAQgsAAgbgcg");
	this.shape_29.setTransform(665.95,57.275);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_30.setTransform(632.375,57.275);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AAnBqIAAhqQAAghgDgJQgDgKgJgFQgHgGgMAAQgNAAgLAHQgMAIgDANQgFAOAAAhIAABeIg3AAIAAjPIA0AAIAAAfQAagjAoAAQATAAAPAGQAPAHAIAKQAHAKAEANQACANAAAYIAACAg");
	this.shape_31.setTransform(609.05,57.05);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("Ag+BhQgQgJgIgRQgHgQAAgeIAAiCIA3AAIAABfQAAArADAKQADAKAIAGQAIAFAMABQANAAALgIQALgIAEgLQAFgMAAgsIAAhXIA2AAIAADPIgzAAIAAggQgLARgSAJQgSAKgUAAQgVAAgRgJg");
	this.shape_32.setTransform(584.475,57.5);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_33.setTransform(549.9518,57.275);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AAoBqIAAhqQgBghgDgJQgDgKgJgFQgIgGgLAAQgNAAgLAHQgLAIgFANQgEAOAAAhIAABeIg2AAIAAjPIAzAAIAAAfQAbgjAnAAQATAAAPAGQAPAHAHAKQAIAKAEANQADANAAAYIAACAg");
	this.shape_34.setTransform(526.85,57.05);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_35.setTransform(503.3018,57.275);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgaCPIAAjOIA2AAIAADOgAgahbIAAgzIA2AAIAAAzg");
	this.shape_36.setTransform(486.85,53.325);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgOQgCgJAAgdIAAhaIgZAAIAAgsIAZAAIAAgoIA2ghIAABJIAmAAIAAAsIgmAAIAABTQAAAZABAFQABADAEADQAEADAFAAQAIAAAOgFIAFArQgTAHgYABQgPAAgLgFg");
	this.shape_37.setTransform(474.675,53.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAKgHQAKgGANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAHQgHAGgEAQQgFARAAA0IAABAg");
	this.shape_38.setTransform(450.65,57.05);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_39.setTransform(429.15,57.275);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjAAgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAWAXAAQATgBANgQQAOgQAAggQAAgjgNgPQgNgQgUAAQgTAAgNAQg");
	this.shape_40.setTransform(404.175,53.55);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_41.setTransform(381.375,57.275);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AAnBqIAAhqQABghgEgJQgEgKgHgFQgJgGgLAAQgNAAgLAHQgMAIgDANQgFAOAAAhIAABeIg3AAIAAjPIAzAAIAAAfQAcgjAoAAQASAAAPAGQAPAHAIAKQAHAKADANQADANAAAYIAACAg");
	this.shape_42.setTransform(358.05,57.05);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_43.setTransform(340.25,53.325);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAagcAuAAQAlAAAXAQQAXAQAJAiIg2AJQgDgQgJgIQgKgIgPAAQgUAAgMAOQgMAOAAAhQAAAkAMAPQAMAQAVAAQAPAAAKgJQAKgJAEgWIA2AJQgJAmgXASQgYATgoAAQgtAAgagcg");
	this.shape_44.setTransform(323.9,57.275);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_45.setTransform(306.95,53.325);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_46.setTransform(290.325,57.275);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAbgcAsAAQAnAAAWAQQAXAQAJAiIg2AJQgDgQgJgIQgKgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgJAmgYASQgXATgoAAQgtAAgagcg");
	this.shape_47.setTransform(268.4,57.275);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_48.setTransform(234.825,57.275);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjAAgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAWAXAAQATgBANgQQAOgQAAggQAAgjgNgPQgNgQgUAAQgTAAgNAQg");
	this.shape_49.setTransform(210.975,53.55);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_50.setTransform(188.175,57.275);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AhXBtQglgnAAhDQAAhHAlgoQAlgnA7AAQA1AAAhAfQATASAKAiIg5APQgFgXgQgNQgRgNgXAAQgfAAgTAXQgUAXAAAzQAAA2ATAXQAUAWAeAAQAXAAARgOQAQgPAIggIA4ASQgNAwgeAWQgeAXguAAQg4AAglgng");
	this.shape_51.setTransform(162.475,53.35);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("EhQeAImIAAxLMCg9AAAIycRLg");
	this.shape_52.setTransform(558.5777,79.5912,1.071,1.071,0,0,180);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("rgba(102,102,102,0.396)").s().p("EhQCAJAQgQAAgMgMQgMgMAAgQIAAwxQAAgRAMgLQAMgMAQAAMCgFAAOQAMAAAKAHQAKAHAFAMQAEALgCAMQgDAMgJAJIx0QlQgMAKgPAAgEhQXgIuQgJAIAAANIAAQxQAAAMAJAJQAJAJAMAAMCORAACQALAAAJgIIR0wlQAHgGACgJQACgJgDgJQgEgIgIgFQgHgGgJAAMigFgAOIAAAAQgMAAgJAJg");
	this.shape_53.setTransform(558.0004,81.8302,1.071,1.071,0,0,180);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("rgba(102,102,102,0.796)").s().p("EA+PAIuMiORgACQgIAAgGgGQgGgGAAgIIAAwxQAAgJAGgGQAGgFAIAAMCgFAAOQAGAAAFAEQAFADACAGQADAGgCAGQgBAGgEAEIx0QlQgGAFgIAAIAAAAgEhQJgIgQgDADAAAEIAAQxQAAAEADADQADADAEAAMCORAACQAEAAADgDIR0wlQACgCABgCQAAgEgBgDQgBgCgDgCQgCgCgDAAMigFgAOQgEAAgDADg");
	this.shape_54.setTransform(558.0042,81.8302,1.071,1.071,0,0,180);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("rgba(102,102,102,0.596)").s().p("EA+PAI4MiORgACQgMAAgJgJQgJgJAAgMIAAwxQAAgNAJgIQAJgJAMAAMCgFAAOQAJAAAHAGQAIAFAEAIQADAJgCAJQgCAJgHAGIx0QlQgJAIgLAAIAAAAgEhQQgIoQgGAGAAAJIAAQxQAAAIAGAGQAGAGAIAAMCORAACQAIAAAFgFIR0wlQAFgEABgGQACgGgDgGQgCgGgFgDQgFgEgGAAMigFgAOIAAAAQgIAAgGAFg");
	this.shape_55.setTransform(557.9998,81.8302,1.071,1.071,0,0,180);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("rgba(102,102,102,0.196)").s().p("EhQCAJKQgUAAgPgPQgPgPAAgUIAAwxQAAgVAPgPQAPgOAUAAMCgFAAOQAPAAANAJQANAJAFAOQAGAOgEAPQgDAPgLALIx0QlQgPANgTAAgEhQegI1QgMALAAARIAAQxQAAAQAMAMQAMAMAQAAMCORAACQAPAAAMgKIR0wlQAJgJADgMQACgMgEgLQgFgMgKgHQgKgHgMAAMigFgAOIAAAAQgQAAgMAMg");
	this.shape_56.setTransform(558.0011,81.8301,1.071,1.071,0,0,180);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#666666").s().p("EhQCAIiQgEAAgDgDQgDgDAAgEIAAwxQAAgEADgDQADgDAEAAMCgFAAOQADAAACACQADACABACQABADAAAEQgBACgCACIx0QlQgDADgEAAg");
	this.shape_57.setTransform(558.0036,81.8302,1.071,1.071,0,0,180);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#829F93").s().p("EhQyAImIAAxLMChlAAAIycRLg");
	this.shape_58.setTransform(552.0857,90.3629,1.071,1.071,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.7,18.9,1113.7,130.4);


(lib.t7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape.setTransform(439.525,82.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgUAAgPARg");
	this.shape_1.setTransform(416.75,82.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhGBQQgbgdAAgzQAAgyAbgdQAcgcAsAAQAnAAAWAQQAWAQAKAiIg2AJQgDgQgKgIQgJgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgIAmgZASQgXATgpAAQgsAAgbgcg");
	this.shape_2.setTransform(393.7,82.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgaCPIAAjOIA2AAIAADOgAgahbIAAgzIA2AAIAAAzg");
	this.shape_3.setTransform(376.75,78.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_4.setTransform(365.65,78.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhOCDQgSgSAAgaQAAgSAIgOQAIgOAQgHQAPgHAcgGQAmgHAOgGIAAgGQAAgOgHgHQgIgHgVAAQgPAAgIAGQgIAGgFAOIgygJQAJgeAUgOQAVgPAoAAQAkAAASAJQASAJAHANQAHANAAAjIAABAQAAAbACAOQADAMAHAPIg2AAIgFgQIgCgGQgOANgQAHQgPAHgTAAQggAAgSgRgAgBA0QgXAFgHAFQgLAHAAAMQAAALAJAJQAJAIANAAQAOAAANgJQAKgIADgLQACgHAAgTIAAgLQgKADgWAFgAgbhZIAbg6IA9AAIg2A6g");
	this.shape_5.setTransform(349.025,78.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAaABADQABAEAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPABgLgFg");
	this.shape_6.setTransform(331.275,79.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_7.setTransform(313.3018,82.525);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("ABiBqIAAh1QAAgggGgJQgIgLgQAAQgLAAgKAHQgKAHgFAOQgEANAAAdIAABjIg2AAIAAhxQAAgegDgIQgDgKgGgEQgGgEgLAAQgNAAgJAHQgLAGgEAOQgFANABAcIAABlIg3AAIAAjOIAyAAIAAAcQAbghAmAAQAUAAAOAIQAOAIAJARQAOgRAQgIQAQgIARAAQAYAAAPAJQAQAKAIARQAGAOAAAeIAACDg");
	this.shape_8.setTransform(284.5,82.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_9.setTransform(244.125,82.525);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgUAAgPARg");
	this.shape_10.setTransform(221.35,82.525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAIgRAAQgjABgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXAAQATAAANgPQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_11.setTransform(196.375,78.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgbCPIAAjOIA3AAIAADOgAgbhbIAAgzIA3AAIAAAzg");
	this.shape_12.setTransform(179.1,78.575);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AApBoIgqhBIgqBBIhAAAIBKhqIhHhlIBDAAIAkA5IAmg5IBBAAIhHBjIBNBsg");
	this.shape_13.setTransform(162.375,82.525);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("Ag1CHQgagNgOgZQgNgZAAgjQAAgcANgYQAOgaAZgNQAZgOAdAAQAvAAAeAfQAeAeAAAuQAAAvgeAfQgfAfguAAQgbAAgagNgAgjgHQgPAQAAAfQAAAeAPARQAPAQAUAAQAWAAAOgQQAOgRAAgfQAAgegOgQQgOgQgWAAQgUAAgPAQgAgahZIAag6IA9AAIg2A6g");
	this.shape_14.setTransform(139.15,78.575);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_15.setTransform(104.175,82.525);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgUAAgPARg");
	this.shape_16.setTransform(81.4,82.525);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_17.setTransform(63.6,78.575);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AAnBqIAAhqQABghgEgJQgEgKgHgFQgJgGgLAAQgNAAgLAIQgMAHgDANQgFANAAAiIAABeIg3AAIAAjOIA0AAIAAAeQAagjApAAQASAAAPAGQAPAHAIAKQAHAKAEANQACANAAAYIAACAg");
	this.shape_18.setTransform(814.35,35.6);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_19.setTransform(790.8018,35.825);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhGBQQgbgdAAgzQAAgyAbgdQAcgcAsAAQAmAAAXAQQAWAQAKAiIg2AJQgDgQgKgIQgJgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQAMAQAVAAQAPAAAKgJQAKgJAEgWIA2AJQgIAmgZASQgXATgpAAQgsAAgbgcg");
	this.shape_20.setTransform(769.1,35.825);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("Ag+BhQgQgJgIgRQgHgRAAgcIAAiDIA3AAIAABgQAAAqADAKQADAKAIAGQAIAFAMAAQANAAALgHQALgIAEgMQAFgLAAgrIAAhYIA2AAIAADOIgzAAIAAgeQgLAQgSAKQgSAJgUAAQgVAAgRgJg");
	this.shape_21.setTransform(745.375,36.05);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgfQgMATgSAIQgRAJgRgBQgjAAgagcgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXABQATAAANgQQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_22.setTransform(720.525,32.1);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_23.setTransform(697.5018,35.825);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAKgHQAKgGANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAGQgHAHgFAQQgEARAAA0IAABAg");
	this.shape_24.setTransform(680.35,35.6);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_25.setTransform(648.6518,35.825);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAKgHQAKgGANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAGQgHAHgFAQQgEARAAA0IAABAg");
	this.shape_26.setTransform(631.5,35.6);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhkCRIAAkdIAzAAIAAAfQAKgQARgKQARgJAUAAQAkAAAZAcQAZAcAAAzQAAAzgZAdQgaAcgkAAQgQAAgOgHQgOgGgPgRIAABogAghhWQgNAQAAAeQAAAjAOAQQAOAQATAAQATAAANgPQAMgOAAgjQAAgggNgRQgNgPgTAAQgTAAgOAPg");
	this.shape_27.setTransform(610.525,39.55);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_28.setTransform(575.3518,35.825);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_29.setTransform(552.825,35.825);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AAnBqIAAhqQAAghgDgJQgDgKgJgFQgHgGgMAAQgMAAgMAIQgMAHgDANQgFANAAAiIAABeIg3AAIAAjOIA0AAIAAAeQAagjAoAAQATAAAPAGQAPAHAIAKQAIAKADANQACANAAAYIAACAg");
	this.shape_30.setTransform(518.95,35.6);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AhMBxQgUgdAAgrQAAgyAbgeQAbgdApAAQAtAAAbAfQAbAegBA+IiJAAQABAZAMANQANAOASAAQANAAAJgHQAJgHAEgQIA3AJQgLAegWAQQgXAQgiAAQg2AAgagjgAgbgNQgMANAAAWIBRAAQAAgXgMgMQgMgNgRAAQgRAAgLANgAgbhZIAbg6IA9AAIg2A6g");
	this.shape_31.setTransform(495.4018,31.875);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_32.setTransform(478.95,31.875);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgUCJQgRgJgMgSIAAAfIgzAAIAAkeIA3AAIAABoQAZgdAiAAQAmAAAYAbQAZAcAAAyQAAA2gZAcQgZAcglAAQgQABgSgJgAghgMQgNAOAAAfQAAAgAKAPQAPAXAWAAQASgBANgPQANgQAAghQAAgkgNgOQgNgQgTAAQgUAAgNAQg");
	this.shape_33.setTransform(461.675,32.1);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("ABiBqIAAh1QAAgggGgJQgIgLgPAAQgMAAgKAHQgKAHgEAOQgFANAAAdIAABjIg2AAIAAhxQAAgegDgIQgDgKgGgEQgGgEgKAAQgNAAgLAHQgKAGgEAOQgEANgBAcIAABlIg3AAIAAjOIAzAAIAAAcQAcghAlAAQAUAAAPAIQANAIAJARQAOgRAQgIQAQgIARAAQAXAAARAJQAPAKAIARQAFANABAeIAACEg");
	this.shape_34.setTransform(431.05,35.6);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_35.setTransform(402.325,35.825);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAZABAEQABAFAEACQAEADAFAAQAIAAAOgFIAFAqQgTAIgYAAQgPABgLgFg");
	this.shape_36.setTransform(384.575,32.4);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgVAAgOARg");
	this.shape_37.setTransform(354.6,35.825);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_38.setTransform(330.725,35.825);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_39.setTransform(308.8518,35.825);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhGBQQgbgdAAgzQAAgyAbgdQAcgcAsAAQAmAAAXAQQAWAQAKAiIg2AJQgDgQgKgIQgJgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQAMAQAVAAQAPAAAKgJQAKgJAEgWIA2AJQgIAmgZASQgXATgpAAQgsAAgbgcg");
	this.shape_40.setTransform(287.15,35.825);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_41.setTransform(263.55,35.825);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAJgHQALgGANAAQATAAARAKIgQAwQgOgJgNAAQgLAAgIAGQgHAHgFAQQgEARAAA0IAABAg");
	this.shape_42.setTransform(245.05,35.6);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhkCRIAAkdIAzAAIAAAfQAKgQARgKQARgJAUAAQAkAAAZAcQAZAcAAAzQAAAzgZAdQgaAcgkAAQgQAAgOgHQgOgGgPgRIAABogAghhWQgNAQAAAeQAAAjAOAQQAOAQATAAQATAAANgPQAMgOAAgjQAAgggNgRQgNgPgTAAQgTAAgOAPg");
	this.shape_43.setTransform(224.075,39.55);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_44.setTransform(188.9018,35.825);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAZABAEQABAFAEACQAEADAFAAQAIAAAOgFIAFAqQgTAIgYAAQgPABgLgFg");
	this.shape_45.setTransform(171.375,32.4);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_46.setTransform(153.075,35.825);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_47.setTransform(131.2018,35.825);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AAoBqIAAhqQAAghgEgJQgDgKgJgFQgIgGgKAAQgOAAgLAIQgLAHgFANQgEANAAAiIAABeIg2AAIAAjOIAyAAIAAAeQAbgjAoAAQATAAAPAGQAPAHAHAKQAJAKACANQAEANAAAYIAACAg");
	this.shape_48.setTransform(97,35.6);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AhsCPIAAkdIDUAAIAAAwIiaAAIAABAICPAAIAAAvIiPAAIAABOICfAAIAAAwg");
	this.shape_49.setTransform(71.8,31.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Capa_2
	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("EhQeAImIAAxLMCg9AAAIycRLg");
	this.shape_50.setTransform(382.9723,56.7412,1.071,1.071);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("rgba(102,102,102,0.396)").s().p("EhQCAJAQgQAAgMgMQgMgMAAgQIAAwxQAAgRAMgLQAMgMAQAAMCgFAAOQAMAAAKAHQAKAHAFAMQAEALgCAMQgDAMgJAJIx0QlQgMAKgPAAgEhQXgIuQgJAIAAANIAAQxQAAAMAJAJQAJAJAMAAMCORAACQALAAAJgIIR0wlQAHgGACgJQACgJgDgJQgEgIgIgFQgHgGgJAAMigFgAOIAAAAQgMAAgJAJg");
	this.shape_51.setTransform(383.5496,58.9802,1.071,1.071);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("rgba(102,102,102,0.796)").s().p("EA+PAIuMiORgACQgIAAgGgGQgGgGAAgIIAAwxQAAgJAGgGQAGgFAIAAMCgFAAOQAGAAAFAEQAFADACAGQADAGgCAGQgBAGgEAEIx0QlQgGAFgIAAIAAAAgEhQJgIgQgDADAAAEIAAQxQAAAEADADQADADAEAAMCORAACQAEAAADgDIR0wlQACgCABgCQAAgEgBgDQgBgCgDgCQgCgCgDAAMigFgAOQgEAAgDADg");
	this.shape_52.setTransform(383.5458,58.9802,1.071,1.071);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("rgba(102,102,102,0.596)").s().p("EA+PAI4MiORgACQgMAAgJgJQgJgJAAgMIAAwxQAAgNAJgIQAJgJAMAAMCgFAAOQAJAAAHAGQAIAFAEAIQADAJgCAJQgCAJgHAGIx0QlQgJAIgLAAIAAAAgEhQQgIoQgGAGAAAJIAAQxQAAAIAGAGQAGAGAIAAMCORAACQAIAAAFgFIR0wlQAFgEABgGQACgGgDgGQgCgGgFgDQgFgEgGAAMigFgAOIAAAAQgIAAgGAFg");
	this.shape_53.setTransform(383.5502,58.9802,1.071,1.071);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("rgba(102,102,102,0.196)").s().p("EhQCAJKQgUAAgPgPQgPgPAAgUIAAwxQAAgVAPgPQAPgOAUAAMCgFAAOQAPAAANAJQANAJAFAOQAGAOgEAPQgDAPgLALIx0QlQgPANgTAAgEhQegI1QgMALAAARIAAQxQAAAQAMAMQAMAMAQAAMCORAACQAPAAAMgKIR0wlQAJgJADgMQACgMgEgLQgFgMgKgHQgKgHgMAAMigFgAOIAAAAQgQAAgMAMg");
	this.shape_54.setTransform(383.5489,58.9801,1.071,1.071);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#666666").s().p("EhQCAIiQgEAAgDgDQgDgDAAgEIAAwxQAAgEADgDQADgDAEAAMCgFAAOQADAAACACQADACABACQABADAAAEQgBACgCACIx0QlQgDADgEAAg");
	this.shape_55.setTransform(383.5464,58.9802,1.071,1.071);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#829F93").s().p("EhQyAImIAAxLMChlAAAIycRLg");
	this.shape_56.setTransform(389.4643,67.5129,1.071,1.071);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.4,-4,1113.7,130.4);


(lib.t6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape.setTransform(718.325,503.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_1.setTransform(696.675,503.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAJgGQALgHANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAGQgHAHgFARQgEAQAAA0IAABAg");
	this.shape_2.setTransform(679.3,503.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAOgQAAgfQAAgegOgQQgPgRgVAAQgVAAgOARg");
	this.shape_3.setTransform(657.8,503.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjgBgagcgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXgBQATAAANgQQAOgQAAggQAAgkgNgPQgNgPgUAAQgTAAgNAPg");
	this.shape_4.setTransform(632.825,499.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_5.setTransform(610.025,503.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgsIAZAAIAAgoIA2ghIAABJIAmAAIAAAsIgmAAIAABTQAAAZABAFQABADAEAEQAEACAFAAQAIAAAOgFIAFArQgTAIgYAAQgPgBgLgEg");
	this.shape_6.setTransform(592.275,500);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAKgGQAKgHANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_7.setTransform(579.35,503.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_8.setTransform(557.85,503.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhkCSIAAkeIAzAAIAAAeQAKgPARgKQARgKAUAAQAkAAAZAcQAZAdAAAyQAAAzgZAdQgaAdgkAAQgQAAgOgGQgOgIgPgQIAABpgAghhVQgNAPAAAfQAAAiAOAQQAOAQATABQATAAANgPQAMgPAAgjQAAghgNgPQgNgQgTAAQgTAAgOAQg");
	this.shape_9.setTransform(533.925,507.15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_10.setTransform(509.525,503.425);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAnBqIAAhqQABgggEgKQgEgKgHgGQgJgFgLAAQgNAAgLAHQgMAJgDANQgFANAAAhIAABeIg3AAIAAjPIAzAAIAAAfQAcgjAoAAQASAAAPAHQAPAGAIAKQAHALADAMQADANAAAYIAACAg");
	this.shape_11.setTransform(486.75,503.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_12.setTransform(463.425,503.425);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAJgGQALgHANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_13.setTransform(446.05,503.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgsIAZAAIAAgoIA2ghIAABJIAmAAIAAAsIgmAAIAABTQAAAZABAFQABADAEAEQAEACAFAAQAIAAAOgFIAFArQgTAIgYAAQgPgBgLgEg");
	this.shape_14.setTransform(430.125,500);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_15.setTransform(400.725,503.425);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_16.setTransform(379.075,503.425);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjgBgagcgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXgBQATAAANgQQAOgQAAggQAAgkgNgPQgNgPgUAAQgTAAgNAPg");
	this.shape_17.setTransform(355.225,499.7);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AAnBqIAAhqQAAgggDgKQgDgKgJgGQgHgFgMAAQgMAAgMAHQgMAJgDANQgFANAAAhIAABeIg3AAIAAjPIA0AAIAAAfQAagjAoAAQATAAAPAHQAPAGAIAKQAIALADAMQACANAAAYIAACAg");
	this.shape_18.setTransform(331.3,503.2);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_19.setTransform(307.975,503.425);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgUCJQgRgJgMgRIAAAeIgzAAIAAkdIA3AAIAABnQAZgdAiAAQAmAAAYAcQAZAbAAAyQAAA1gZAdQgZAcglABQgQAAgSgJgAghgNQgNAPAAAfQAAAgAKAQQAPAVAWAAQASAAANgPQANgPAAgiQAAgkgNgPQgNgPgTAAQgUAAgNAPg");
	this.shape_20.setTransform(285.125,499.7);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_21.setTransform(249.675,503.425);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_22.setTransform(228.025,503.425);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_23.setTransform(211.35,499.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_24.setTransform(183.4018,503.425);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjgBgagcgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXgBQATAAANgQQAOgQAAggQAAgkgNgPQgNgPgUAAQgTAAgNAPg");
	this.shape_25.setTransform(159.775,499.7);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_26.setTransform(125.325,503.425);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhMBxQgUgdAAgrQAAgyAbgeQAbgdApAAQAtAAAbAfQAbAegBA+IiJAAQABAZAMANQANAOASAAQANAAAJgHQAJgHAEgQIA3AJQgLAegWAQQgXAQgiAAQg2AAgagjgAgbgNQgMANAAAWIBRAAQAAgXgMgMQgMgNgRAAQgRAAgLANgAgbhZIAbg6IA9AAIg2A6g");
	this.shape_27.setTransform(103.4518,499.475);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgXBoIhUjPIA6AAIAnBpIAKAkIAGgSIAGgSIAnhpIA5AAIhTDPg");
	this.shape_28.setTransform(81.275,503.425);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_29.setTransform(59.275,503.425);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAKgGQAKgHANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAGQgHAHgFARQgEAQAAA0IAABAg");
	this.shape_30.setTransform(41.9,503.2);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgsIAZAAIAAgoIA2ghIAABJIAmAAIAAAsIgmAAIAABTQAAAZABAFQABADAEAEQAEACAFAAQAIAAAOgFIAFArQgTAIgYAAQgPgBgLgEg");
	this.shape_31.setTransform(25.975,500);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_32.setTransform(-2.875,503.425);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_33.setTransform(849.475,456.725);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_34.setTransform(827.6018,456.725);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAJgGQALgHANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_35.setTransform(810.45,456.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgPAQAAAeQAAAfAPAQQAOARAVAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgVAAgOARg");
	this.shape_36.setTransform(788.95,456.725);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMASgSAJQgRAIgRAAQgjAAgagcgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXgBQATABANgRQAOgQAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_37.setTransform(763.975,453);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_38.setTransform(741.175,456.725);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AAnBqIAAhqQAAgggDgKQgDgKgJgGQgHgFgMAAQgMAAgMAHQgMAJgDANQgFANAAAhIAABeIg3AAIAAjPIA0AAIAAAfQAagjAoAAQATAAAPAHQAPAGAIAKQAIALADAMQACANAAAYIAACAg");
	this.shape_39.setTransform(717.85,456.5);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgaCPIAAjOIA2AAIAADOgAgahbIAAgzIA2AAIAAAzg");
	this.shape_40.setTransform(700.05,452.775);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhGBQQgbgdAAgzQAAgyAbgdQAbgcAtAAQAmAAAXAQQAWAQAKAiIg2AJQgDgQgKgIQgJgIgPAAQgUAAgMAOQgMAOAAAhQAAAkAMAPQAMAQAVAAQAPAAAKgJQAKgJAEgWIA2AJQgJAmgYASQgXATgpAAQgsAAgbgcg");
	this.shape_41.setTransform(683.7,456.725);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_42.setTransform(666.75,452.775);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_43.setTransform(650.125,456.725);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAagcAuAAQAlAAAXAQQAXAQAJAiIg2AJQgDgQgJgIQgKgIgPAAQgUAAgMAOQgMAOAAAhQAAAkAMAPQAMAQAUAAQAQAAAKgJQAKgJAEgWIA2AJQgIAmgYASQgYATgoAAQgtAAgagcg");
	this.shape_44.setTransform(628.2,456.725);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_45.setTransform(594.075,456.725);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_46.setTransform(571.3,456.725);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AAnBqIAAhqQAAgggDgKQgDgKgJgGQgHgFgMAAQgMAAgMAHQgMAJgDANQgFANAAAhIAABeIg3AAIAAjPIA0AAIAAAfQAagjAoAAQATAAAPAHQAPAGAIAKQAHALAEAMQACANAAAYIAACAg");
	this.shape_47.setTransform(546.85,456.5);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAKgGQAKgHANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAGQgHAHgFARQgEAQAAA0IAABAg");
	this.shape_48.setTransform(528.35,456.5);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_49.setTransform(506.85,456.725);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AAoCPIAAhtQAAghgDgIQgEgJgIgFQgHgFgNAAQgMAAgLAHQgLAGgEANQgGANAAAaIAABoIg3AAIAAkdIA3AAIAABpQAbgfAkAAQATAAAPAHQAQAHAHALQAHALAEANQACAOABAbIAAB5g");
	this.shape_50.setTransform(482.4,452.775);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_51.setTransform(447.425,456.725);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_52.setTransform(424.65,456.725);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AgaCPIAAkdIA1AAIAAEdg");
	this.shape_53.setTransform(406.85,452.775);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_54.setTransform(379.125,456.725);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AAoBqIAAhqQgBgggDgKQgDgKgJgGQgHgFgMAAQgMAAgMAHQgMAJgDANQgFANAAAhIAABeIg2AAIAAjPIAzAAIAAAfQAbgjAnAAQATAAAPAHQAPAGAHAKQAIALAEAMQACANAAAYIAACAg");
	this.shape_55.setTransform(344.7,456.5);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_56.setTransform(321.375,456.725);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgICKQgMgFgFgIQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgsIAZAAIAAgoIA2ghIAABJIAmAAIAAAsIgmAAIAABTQAAAaABAEQABADAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPAAgLgEg");
	this.shape_57.setTransform(303.625,453.3);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AAoBqIAAhqQgBgggDgKQgDgKgJgGQgIgFgLAAQgMAAgMAHQgLAJgFANQgEANAAAhIAABeIg2AAIAAjPIAzAAIAAAfQAbgjAnAAQATAAAPAHQAPAGAHAKQAIALAEAMQADANAAAYIAACAg");
	this.shape_58.setTransform(284.75,456.5);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_59.setTransform(261.2018,456.725);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("ABiBqIAAh2QAAgegGgJQgHgMgRAAQgLAAgKAHQgKAHgFAOQgEANAAAcIAABkIg2AAIAAhwQAAgfgDgIQgDgKgGgEQgGgEgKAAQgNAAgKAGQgLAIgEANQgEANAAAcIAABlIg3AAIAAjPIAyAAIAAAdQAbghAmAAQAUAAAOAIQAOAJAJAQQAOgQAQgJQAQgIARAAQAYAAAPAKQAQAJAIARQAGAOAAAeIAACDg");
	this.shape_60.setTransform(232.4,456.5);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AgaCPIAAjOIA1AAIAADOgAgahbIAAgzIA1AAIAAAzg");
	this.shape_61.setTransform(209.2,452.775);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_62.setTransform(198.1,452.775);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_63.setTransform(181.475,456.725);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_64.setTransform(147.625,456.725);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_65.setTransform(124.85,456.725);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AgaCPIAAkdIA1AAIAAEdg");
	this.shape_66.setTransform(107.05,452.775);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgaCPIAAjOIA2AAIAADOgAgahbIAAgzIA2AAIAAAzg");
	this.shape_67.setTransform(95.95,452.775);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_68.setTransform(78.775,456.725);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_69.setTransform(45.475,456.725);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_70.setTransform(22.7,456.725);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AhkCOIAAkbIA6AAIAADrICPAAIAAAwg");
	this.shape_71.setTransform(-0.925,452.9);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("EhQeAImIAAxLMCg9AAAIycRLg");
	this.shape_72.setTransform(382.9723,478.4412,1.071,1.071);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("rgba(102,102,102,0.396)").s().p("EhQCAJAQgQAAgMgMQgMgMAAgQIAAwxQAAgRAMgLQAMgMAQAAMCgFAAOQAMAAAKAHQAKAHAFAMQAEALgCAMQgDAMgJAJIx0QlQgMAKgPAAgEhQXgIuQgJAIAAANIAAQxQAAAMAJAJQAJAJAMAAMCORAACQALAAAJgIIR0wlQAHgGACgJQACgJgDgJQgEgIgIgFQgHgGgJAAMigFgAOIAAAAQgMAAgJAJg");
	this.shape_73.setTransform(383.5496,480.6802,1.071,1.071);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("rgba(102,102,102,0.796)").s().p("EA+PAIuMiORgACQgIAAgGgGQgGgGAAgIIAAwxQAAgJAGgGQAGgFAIAAMCgFAAOQAGAAAFAEQAFADACAGQADAGgCAGQgBAGgEAEIx0QlQgGAFgIAAIAAAAgEhQJgIgQgDADAAAEIAAQxQAAAEADADQADADAEAAMCORAACQAEAAADgDIR0wlQACgCABgCQAAgEgBgDQgBgCgDgCQgCgCgDAAMigFgAOQgEAAgDADg");
	this.shape_74.setTransform(383.5458,480.6802,1.071,1.071);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("rgba(102,102,102,0.596)").s().p("EA+PAI4MiORgACQgMAAgJgJQgJgJAAgMIAAwxQAAgNAJgIQAJgJAMAAMCgFAAOQAJAAAHAGQAIAFAEAIQADAJgCAJQgCAJgHAGIx0QlQgJAIgLAAIAAAAgEhQQgIoQgGAGAAAJIAAQxQAAAIAGAGQAGAGAIAAMCORAACQAIAAAFgFIR0wlQAFgEABgGQACgGgDgGQgCgGgFgDQgFgEgGAAMigFgAOIAAAAQgIAAgGAFg");
	this.shape_75.setTransform(383.5502,480.6802,1.071,1.071);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("rgba(102,102,102,0.196)").s().p("EhQCAJKQgUAAgPgPQgPgPAAgUIAAwxQAAgVAPgPQAPgOAUAAMCgFAAOQAPAAANAJQANAJAFAOQAGAOgEAPQgDAPgLALIx0QlQgPANgTAAgEhQegI1QgMALAAARIAAQxQAAAQAMAMQAMAMAQAAMCORAACQAPAAAMgKIR0wlQAJgJADgMQACgMgEgLQgFgMgKgHQgKgHgMAAMigFgAOIAAAAQgQAAgMAMg");
	this.shape_76.setTransform(383.5489,480.6801,1.071,1.071);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#666666").s().p("EhQCAIiQgEAAgDgDQgDgDAAgEIAAwxQAAgEADgDQADgDAEAAMCgFAAOQADAAACACQADACABACQABADAAAEQgBACgCACIx0QlQgDADgEAAg");
	this.shape_77.setTransform(383.5464,480.6802,1.071,1.071);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#829F93").s().p("EhQyAImIAAxLMChlAAAIycRLg");
	this.shape_78.setTransform(389.4643,489.2129,1.071,1.071);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.4,417.7,1113.7,130.40000000000003);


(lib.t5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhABcQgZgRgIgeIA4gJQADARALAIQALAIATAAQAVAAALgHQAHgGAAgJQAAgHgEgEQgEgEgOgDQhCgPgSgMQgZgQAAgeQAAgbAVgTQAWgSAtAAQAqAAAVAOQAVAOAIAbIg0AKQgEgNgJgGQgKgHgQAAQgWAAgJAGQgHAFAAAHQAAAGAGAEQAHAFAsAKQAsAKASAPQARAOAAAaQAAAdgYAVQgYAUgvAAQgqAAgZgRg");
	this.shape.setTransform(1073.475,142.675);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ag2BgQgagNgNgZQgOgZAAgjQAAgcAOgZQANgaAZgOQAZgNAeAAQAvAAAfAeQAeAfAAAvQAAAvgeAfQgfAfgvAAQgcAAgagNgAgjgvQgPARAAAeQAAAfAPARQAOAQAVAAQAWAAAPgQQAOgRAAgfQAAgegOgRQgPgQgWAAQgVAAgOAQg");
	this.shape_1.setTransform(1050.475,142.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgbCRIAAkgIA3AAIAAEgg");
	this.shape_2.setTransform(1032.525,138.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgbCRIAAjRIA3AAIAADRgAgbhdIAAgyIA3AAIAAAyg");
	this.shape_3.setTransform(1021.325,138.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhABcQgZgRgIgeIA4gJQADARALAIQALAIATAAQAVAAALgHQAHgGAAgJQAAgHgEgEQgEgEgOgDQhCgPgSgMQgZgQAAgeQAAgbAVgTQAWgSAtAAQAqAAAVAOQAVAOAIAbIg0AKQgEgNgJgGQgKgHgQAAQgWAAgJAGQgHAFAAAHQAAAGAGAEQAHAFAsAKQAsAKASAPQARAOAAAaQAAAdgYAVQgYAUgvAAQgqAAgZgRg");
	this.shape_4.setTransform(1003.925,142.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAoBrIAAhrQAAghgEgKQgDgKgIgFQgIgGgLAAQgNAAgMAIQgMAIgEANQgEANAAAiIAABfIg4AAIAAjQIA0AAIAAAeQAcgjAoAAQATAAAOAGQAQAHAHAKQAJALACANQADAMABAZIAACBg");
	this.shape_5.setTransform(969.7,142.45);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhMBKQgVgdAAgrQAAgzAbgeQAcgdApAAQAuAAAbAeQAbAfgBA/IiKAAQAAAZANANQANAOASAAQANAAAJgHQAJgHAFgQIA3AJQgLAfgXAQQgXAPgiAAQg2AAgagjgAgbg1QgMANAAAXIBSAAQgBgYgMgMQgMgNgRAAQgRAAgLANg");
	this.shape_6.setTransform(945.9268,142.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("Ag2BgQgagNgNgZQgOgZAAgjQAAgcAOgZQANgaAZgOQAZgNAeAAQAvAAAfAeQAeAfAAAvQAAAvgeAfQgfAfgvAAQgcAAgagNgAgjgvQgPARAAAeQAAAfAPARQAOAQAVAAQAWAAAPgQQAOgRAAgfQAAgegOgRQgPgQgWAAQgVAAgOAQg");
	this.shape_7.setTransform(911.375,142.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgICMQgMgGgGgIQgFgIgCgNQgCgKAAgeIAAhaIgaAAIAAgsIAaAAIAAgpIA2ghIAABKIAmAAIAAAsIgmAAIAABUQAAAaACAEQABAEAEADQADACAGAAQAIAAAOgFIAFArQgTAIgZAAQgPAAgLgEg");
	this.shape_8.setTransform(892.275,139.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AAoBrIAAhrQAAghgDgKQgEgKgIgFQgIgGgLAAQgNAAgMAIQgMAIgDANQgFANAAAiIAABfIg4AAIAAjQIA0AAIAAAeQAbgjApAAQASAAAPAGQAQAHAIAKQAHALAEANQACAMAAAZIAACBg");
	this.shape_9.setTransform(873.2,142.45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhMBKQgVgdAAgrQAAgzAbgeQAcgdApAAQAuAAAbAeQAbAfgBA/IiKAAQAAAZANANQANAOASAAQANAAAJgHQAJgHAFgQIA3AJQgLAfgXAQQgXAPgiAAQg2AAgagjgAgbg1QgMANAAAXIBSAAQgBgYgMgMQgMgNgRAAQgRAAgLANg");
	this.shape_10.setTransform(849.4268,142.675);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgbCRIAAjRIA3AAIAADRgAgbhdIAAgyIA3AAIAAAyg");
	this.shape_11.setTransform(832.825,138.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("ABjBrIAAh2QgBgggFgJQgIgMgQAAQgMAAgKAIQgKAGgEAOQgFAOAAAcIAABlIg3AAIAAhyQAAgegCgKQgEgIgFgEQgHgFgKAAQgNAAgLAHQgKAHgEANQgEANgBAdIAABmIg3AAIAAjQIAzAAIAAAcQAcghAlAAQAVAAAOAIQAOAIAJARQAOgRAQgIQAQgIATAAQAWAAARAJQAPAKAJARQAFAOAAAeIAACFg");
	this.shape_12.setTransform(809.15,142.45);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhPBcQgSgSAAgaQAAgSAIgOQAJgOAPgGQAPgIAdgFQAmgIAPgGIAAgFQAAgQgIgHQgIgHgVAAQgPAAgIAGQgIAGgFAOIgzgJQAJgeAVgPQAUgOApAAQAkAAASAIQASAJAIAOQAHANAAAkIAABAQAAAcACANQADANAHAPIg3AAIgFgRIgCgGQgOAOgQAHQgPAGgTAAQggAAgTgRgAgBANQgXAFgHAEQgLAIAAAMQAAALAJAJQAIAIAOAAQAOAAANgJQALgIADgLQACgHAAgUIAAgLQgLAEgWAFg");
	this.shape_13.setTransform(780.075,142.675);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AAoBrIAAhrQAAghgEgKQgDgKgIgFQgIgGgLAAQgOAAgLAIQgMAIgEANQgEANAAAiIAABfIg4AAIAAjQIA0AAIAAAeQAcgjAoAAQASAAAQAGQAPAHAHAKQAJALACANQAEAMAAAZIAACBg");
	this.shape_14.setTransform(756.5,142.45);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhMBKQgVgdAAgrQAAgzAbgeQAcgdApAAQAuAAAbAeQAbAfgBA/IiKAAQAAAZANANQANAOASAAQANAAAJgHQAJgHAFgQIA3AJQgLAfgXAQQgXAPgiAAQg2AAgagjgAgbg1QgMANAAAXIBSAAQgBgYgMgMQgMgNgRAAQgRAAgLANg");
	this.shape_15.setTransform(732.7268,142.675);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhHBQQgbgdAAgzQAAgzAbgcQAcgdAuAAQAmAAAXAQQAWAQAKAiIg3AKQgCgQgKgJQgKgIgQAAQgTAAgNAPQgMAOAAAhQAAAlANAPQAMAPAUAAQAQAAAKgJQAKgJAEgWIA3AKQgJAlgYATQgYATgoAAQgtAAgcgdg");
	this.shape_16.setTransform(710.775,142.675);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhPBcQgSgSAAgaQAAgSAIgOQAJgOAPgGQAPgIAdgFQAmgIAPgGIAAgFQAAgQgIgHQgIgHgVAAQgPAAgIAGQgIAGgFAOIgzgJQAJgeAVgPQAUgOApAAQAkAAASAIQASAJAIAOQAHANAAAkIAABAQAAAcACANQADANAHAPIg3AAIgFgRIgCgGQgOAOgQAHQgPAGgTAAQggAAgTgRgAgBANQgXAFgHAEQgLAIAAAMQAAALAJAJQAIAIAOAAQAOAAANgJQALgIADgLQACgHAAgUIAAgLQgLAEgWAFg");
	this.shape_17.setTransform(688.025,142.675);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("ABjBrIAAh2QgBgggFgJQgIgMgQAAQgMAAgKAIQgKAGgEAOQgFAOAAAcIAABlIg2AAIAAhyQAAgegDgKQgEgIgFgEQgHgFgKAAQgNAAgLAHQgKAHgEANQgEANgBAdIAABmIg3AAIAAjQIAzAAIAAAcQAbghAmAAQAVAAAOAIQAOAIAJARQAOgRAQgIQAQgIASAAQAYAAAQAJQAQAKAHARQAGAOAAAeIAACFg");
	this.shape_18.setTransform(658.75,142.45);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgbCRIAAkgIA3AAIAAEgg");
	this.shape_19.setTransform(635.325,138.7);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhPBcQgSgSAAgaQAAgSAIgOQAJgOAPgGQAPgIAdgFQAmgIAPgGIAAgFQAAgQgIgHQgIgHgVAAQgPAAgIAGQgIAGgFAOIgzgJQAJgeAVgPQAUgOApAAQAkAAASAIQASAJAIAOQAHANAAAkIAABAQAAAcACANQADANAHAPIg3AAIgFgRIgCgGQgOAOgQAHQgPAGgTAAQggAAgTgRgAgBANQgXAFgHAEQgLAIAAAMQAAALAJAJQAIAIAOAAQAOAAANgJQALgIADgLQACgHAAgUIAAgLQgLAEgWAFg");
	this.shape_20.setTransform(618.475,142.675);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("Ag/BiQgQgKgIgQQgHgRAAgeIAAiDIA3AAIAABgQAAArADAKQADAKAIAHQAIAFANAAQANAAALgHQALgJAFgLQAEgLAAgtIAAhYIA3AAIAADRIgzAAIAAggQgMARgSAJQgSAKgVAAQgVAAgRgJg");
	this.shape_21.setTransform(583.625,142.9);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhABcQgZgRgIgeIA4gJQADARALAIQALAIATAAQAVAAALgHQAHgGAAgJQAAgHgEgEQgEgEgOgDQhCgPgSgMQgZgQAAgeQAAgbAVgTQAWgSAtAAQAqAAAVAOQAVAOAIAbIg0AKQgEgNgJgGQgKgHgQAAQgWAAgJAGQgHAFAAAHQAAAGAGAEQAHAFAsAKQAsAKASAPQARAOAAAaQAAAdgYAVQgYAUgvAAQgqAAgZgRg");
	this.shape_22.setTransform(559.575,142.675);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhPBcQgSgSAAgaQAAgSAIgOQAJgOAPgGQAPgIAdgFQAmgIAPgGIAAgFQAAgQgIgHQgIgHgVAAQgPAAgIAGQgIAGgFAOIgzgJQAJgeAVgPQAUgOApAAQAkAAASAIQASAJAIAOQAHANAAAkIAABAQAAAcACANQADANAHAPIg3AAIgFgRIgCgGQgOAOgQAHQgPAGgTAAQggAAgTgRgAgBANQgXAFgHAEQgLAIAAAMQAAALAJAJQAIAIAOAAQAOAAANgJQALgIADgLQACgHAAgUIAAgLQgLAEgWAFg");
	this.shape_23.setTransform(526.475,142.675);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgICMQgMgGgGgIQgFgIgCgNQgCgKAAgeIAAhaIgaAAIAAgsIAaAAIAAgpIA2ghIAABKIAmAAIAAAsIgmAAIAABUQAAAaACAEQABAEAEADQADACAGAAQAIAAAOgFIAFArQgTAIgZAAQgPAAgLgEg");
	this.shape_24.setTransform(508.525,139.2);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhABcQgZgRgIgeIA4gJQADARALAIQALAIATAAQAVAAALgHQAHgGAAgJQAAgHgEgEQgEgEgOgDQhCgPgSgMQgZgQAAgeQAAgbAVgTQAWgSAtAAQAqAAAVAOQAVAOAIAbIg0AKQgEgNgJgGQgKgHgQAAQgWAAgJAGQgHAFAAAHQAAAGAGAEQAHAFAsAKQAsAKASAPQARAOAAAaQAAAdgYAVQgYAUgvAAQgqAAgZgRg");
	this.shape_25.setTransform(490.025,142.675);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhPBcQgSgSAAgaQAAgSAIgOQAJgOAPgGQAPgIAdgFQAmgIAPgGIAAgFQAAgQgIgHQgIgHgVAAQgPAAgIAGQgIAGgFAOIgzgJQAJgeAVgPQAUgOApAAQAkAAASAIQASAJAIAOQAHANAAAkIAABAQAAAcACANQADANAHAPIg3AAIgFgRIgCgGQgOAOgQAHQgPAGgTAAQggAAgTgRgAgBANQgXAFgHAEQgLAIAAAMQAAALAJAJQAIAIAOAAQAOAAANgJQALgIADgLQACgHAAgUIAAgLQgLAEgWAFg");
	this.shape_26.setTransform(468.125,142.675);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AAoCRIAAhvQAAghgDgIQgDgJgIgFQgIgGgMABQgNAAgLAGQgLAHgFANQgFANAAAaIAABqIg3AAIAAkgIA3AAIAABpQAbgeAkAAQATgBAQAIQAPAGAIAMQAIAKADAOQACAOAAAaIAAB8g");
	this.shape_27.setTransform(444.575,138.7);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("Ag2BgQgagNgNgZQgOgZAAgjQAAgcAOgZQANgaAZgOQAZgNAeAAQAvAAAfAeQAeAfAAAvQAAAvgeAfQgfAfgvAAQgcAAgagNgAgjgvQgPARAAAeQAAAfAPARQAOAQAVAAQAWAAAPgQQAOgRAAgfQAAgegOgRQgPgQgWAAQgVAAgOAQg");
	this.shape_28.setTransform(1227.775,95.575);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhLB2QgagdAAg0QAAg1AZgbQAZgcAmAAQAiAAAaAdIAAhoIA3AAIAAEgIgzAAIAAgfQgNASgRAJQgSAJgRAAQgkAAgZgdgAgfgNQgOAPAAAfQAAAiAKAOQANAWAXAAQATAAAOgQQANgQAAghQAAgkgNgPQgNgQgUAAQgTAAgNAQg");
	this.shape_29.setTransform(1202.525,91.825);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhPBcQgSgSAAgaQAAgSAIgOQAJgOAPgGQAPgIAdgFQAmgIAPgGIAAgFQAAgQgIgHQgIgHgVAAQgPAAgIAGQgIAGgFAOIgzgJQAJgeAVgPQAUgOApAAQAkAAASAIQASAJAIAOQAHANAAAkIAABAQAAAcACANQADANAHAPIg3AAIgFgRIgCgGQgOAOgQAHQgPAGgTAAQggAAgTgRgAgBANQgXAFgHAEQgLAIAAAMQAAALAJAJQAIAIAOAAQAOAAANgJQALgIADgLQACgHAAgUIAAgLQgLAEgWAFg");
	this.shape_30.setTransform(1179.475,95.575);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgICLQgMgFgGgHQgFgJgCgOQgCgJAAgeIAAhaIgaAAIAAgsIAaAAIAAgqIA2ggIAABKIAmAAIAAAsIgmAAIAABTQAAAaACAFQABADAEADQADAEAGAAQAIgBAOgFIAFArQgTAIgZAAQgPAAgLgFg");
	this.shape_31.setTransform(1161.525,92.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhDBrIAAjQIA0AAIAAAeQANgWAJgGQALgHANAAQATAAASAKIgSAxQgOgJgMAAQgLgBgIAHQgHAGgEARQgGARAAA1IAABAg");
	this.shape_32.setTransform(1148.5,95.35);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("Ag2BgQgagNgNgZQgOgZAAgjQAAgcAOgZQANgaAZgOQAZgNAeAAQAvAAAfAeQAeAfAAAvQAAAvgeAfQgfAfgvAAQgcAAgagNgAgjgvQgPARAAAeQAAAfAPARQAOAQAVAAQAWAAAPgQQAOgRAAgfQAAgegOgRQgPgQgWAAQgVAAgOAQg");
	this.shape_33.setTransform(1126.775,95.575);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhlCTIAAkgIAzAAIAAAfQAKgQASgKQARgKAUAAQAkAAAaAdQAZAcAAAzQAAA0gaAdQgZAdglAAQgQAAgOgHQgOgHgQgRIAABqgAghhWQgNAPAAAfQAAAjAOAQQAOARATAAQATAAANgPQANgPAAgjQAAghgOgQQgNgQgTAAQgUAAgNAQg");
	this.shape_34.setTransform(1102.625,99.325);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhABcQgZgRgIgeIA4gJQADARALAIQALAIATAAQAVAAALgHQAHgGAAgJQAAgHgEgEQgEgEgOgDQhCgPgSgMQgZgQAAgeQAAgbAVgTQAWgSAtAAQAqAAAVAOQAVAOAIAbIg0AKQgEgNgJgGQgKgHgQAAQgWAAgJAGQgHAFAAAHQAAAGAGAEQAHAFAsAKQAsAKASAPQARAOAAAaQAAAdgYAVQgYAUgvAAQgqAAgZgRg");
	this.shape_35.setTransform(1077.925,95.575);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AAoBrIAAhrQAAghgDgKQgEgKgIgGQgIgFgLAAQgNAAgMAIQgMAIgDANQgFANAAAiIAABfIg4AAIAAjQIA0AAIAAAeQAbgjApAAQASAAAPAHQAQAGAIAKQAHAKAEANQACANAAAZIAACBg");
	this.shape_36.setTransform(1054.9,95.35);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AhPBcQgSgSAAgaQAAgSAIgOQAJgOAPgGQAPgIAdgFQAmgIAPgGIAAgFQAAgQgIgHQgIgHgVAAQgPAAgIAGQgIAGgFAOIgzgJQAJgeAVgPQAUgOApAAQAkAAASAIQASAJAIAOQAHANAAAkIAABAQAAAcACANQADANAHAPIg3AAIgFgRIgCgGQgOAOgQAHQgPAGgTAAQggAAgTgRgAgBANQgXAFgHAEQgLAIAAAMQAAALAJAJQAIAIAOAAQAOAAANgJQALgIADgLQACgHAAgUIAAgLQgLAEgWAFg");
	this.shape_37.setTransform(1031.325,95.575);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhDBrIAAjQIAzAAIAAAeQAOgWAKgGQAKgHANAAQAUAAARAKIgRAxQgOgJgMAAQgMgBgIAHQgHAGgFARQgEARAAA1IAABAg");
	this.shape_38.setTransform(1013.8,95.35);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgICLQgMgFgGgHQgFgJgCgOQgCgJAAgeIAAhaIgaAAIAAgsIAaAAIAAgqIA2ggIAABKIAmAAIAAAsIgmAAIAABTQAAAaACAFQABADAEADQADAEAGAAQAIgBAOgFIAFArQgTAIgZAAQgPAAgLgFg");
	this.shape_39.setTransform(997.675,92.1);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhZCQIgEgrQAMACALAAQAUAAAJgLQAJgMAFgRIhQjRIA7AAIAyCTIAwiTIA5AAIhKDIIgMAlQgIASgHAKQgGAKgIAGQgIAGgNADQgMADgQAAQgQAAgQgDg");
	this.shape_40.setTransform(968.3,99.825);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("Ag2BgQgagNgNgZQgOgZAAgjQAAgcAOgZQANgaAZgOQAZgNAeAAQAvAAAfAeQAeAfAAAvQAAAvgeAfQgfAfgvAAQgcAAgagNgAgjgvQgPARAAAeQAAAfAPARQAOAQAVAAQAWAAAPgQQAOgRAAgfQAAgegOgRQgPgQgWAAQgVAAgOAQg");
	this.shape_41.setTransform(933.775,95.575);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AhLB2QgagdAAg0QAAg1AZgbQAZgcAmAAQAiAAAaAdIAAhoIA3AAIAAEgIgzAAIAAgfQgNASgRAJQgSAJgRAAQgkAAgZgdgAgfgNQgOAPAAAfQAAAiAKAOQANAWAXAAQATAAAOgQQANgQAAghQAAgkgNgPQgNgQgUAAQgTAAgNAQg");
	this.shape_42.setTransform(908.525,91.825);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhPBcQgSgSAAgaQAAgSAIgOQAJgOAPgGQAPgIAdgFQAmgIAPgGIAAgFQAAgQgIgHQgIgHgVAAQgPAAgIAGQgIAGgFAOIgzgJQAJgeAVgPQAUgOApAAQAkAAASAIQASAJAIAOQAHANAAAkIAABAQAAAcACANQADANAHAPIg3AAIgFgRIgCgGQgOAOgQAHQgPAGgTAAQggAAgTgRgAgBANQgXAFgHAEQgLAIAAAMQAAALAJAJQAIAIAOAAQAOAAANgJQALgIADgLQACgHAAgUIAAgLQgLAEgWAFg");
	this.shape_43.setTransform(885.475,95.575);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhDBrIAAjQIA0AAIAAAeQANgWAJgGQALgHAOAAQASAAASAKIgSAxQgNgJgNAAQgLgBgIAHQgHAGgEARQgGARABA1IAABAg");
	this.shape_44.setTransform(867.95,95.35);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgICLQgMgFgGgHQgFgJgCgOQgCgJAAgeIAAhaIgaAAIAAgsIAaAAIAAgqIA2ggIAABKIAmAAIAAAsIgmAAIAABTQAAAaACAFQABADAEADQADAEAGAAQAIgBAOgFIAFArQgTAIgZAAQgPAAgLgFg");
	this.shape_45.setTransform(851.825,92.1);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AAoBrIAAhrQAAghgEgKQgDgKgIgGQgIgFgLAAQgOAAgLAIQgLAIgFANQgEANAAAiIAABfIg3AAIAAjQIAzAAIAAAeQAbgjApAAQATAAAPAHQAPAGAHAKQAIAKAEANQADANAAAZIAACBg");
	this.shape_46.setTransform(832.75,95.35);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhMBKQgVgdAAgrQAAgzAbgeQAcgdApAAQAuAAAbAeQAbAfgBA/IiKAAQAAAZANANQANAOASAAQANAAAJgHQAJgHAFgQIA3AJQgLAfgXAQQgXAPgiAAQg2AAgagjgAgbg1QgMANAAAXIBSAAQgBgYgMgMQgMgNgRAAQgRAAgLANg");
	this.shape_47.setTransform(808.9768,95.575);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AhHBQQgbgdAAgzQAAgzAbgcQAcgdAuAAQAmAAAXAQQAWAQAKAiIg3AKQgCgQgKgJQgKgIgQAAQgTAAgNAPQgMAOAAAhQAAAlANAPQAMAPAUAAQAQAAAKgJQAKgJAEgWIA3AKQgJAlgYATQgYATgoAAQgtAAgcgdg");
	this.shape_48.setTransform(787.025,95.575);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AAoBrIAAhrQAAghgEgKQgDgKgIgGQgIgFgLAAQgOAAgLAIQgMAIgEANQgEANAAAiIAABfIg4AAIAAjQIA0AAIAAAeQAcgjAoAAQATAAAOAHQAQAGAHAKQAJAKACANQADANABAZIAACBg");
	this.shape_49.setTransform(763.15,95.35);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("Ag2BgQgagNgNgZQgOgZAAgjQAAgcAOgZQANgaAZgOQAZgNAeAAQAvAAAfAeQAeAfAAAvQAAAvgeAfQgfAfgvAAQgcAAgagNgAgjgvQgPARAAAeQAAAfAPARQAOAQAVAAQAWAAAPgQQAOgRAAgfQAAgegOgRQgPgQgWAAQgVAAgOAQg");
	this.shape_50.setTransform(738.475,95.575);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AhHBQQgbgdAAgzQAAgzAbgcQAcgdAuAAQAmAAAXAQQAWAQAKAiIg3AKQgCgQgKgJQgKgIgQAAQgTAAgNAPQgMAOAAAhQAAAlANAPQAMAPAUAAQAQAAAKgJQAKgJAEgWIA3AKQgJAlgYATQgYATgoAAQgtAAgcgdg");
	this.shape_51.setTransform(715.175,95.575);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AhABcQgZgRgIgeIA4gJQADARALAIQALAIATAAQAVAAALgHQAHgGAAgJQAAgHgEgEQgEgEgOgDQhCgPgSgMQgZgQAAgeQAAgbAVgTQAWgSAtAAQAqAAAVAOQAVAOAIAbIg0AKQgEgNgJgGQgKgHgQAAQgWAAgJAGQgHAFAAAHQAAAGAGAEQAHAFAsAKQAsAKASAPQARAOAAAaQAAAdgYAVQgYAUgvAAQgqAAgZgRg");
	this.shape_52.setTransform(680.675,95.575);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AhMBKQgVgdAAgrQAAgzAbgeQAcgdApAAQAuAAAbAeQAbAfgBA/IiKAAQAAAZANANQANAOASAAQANAAAJgHQAJgHAFgQIA3AJQgLAfgXAQQgXAPgiAAQg2AAgagjgAgbg1QgMANAAAXIBSAAQgBgYgMgMQgMgNgRAAQgRAAgLANg");
	this.shape_53.setTransform(658.5768,95.575);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgbCQIAAkgIA3AAIAAEgg");
	this.shape_54.setTransform(630.775,91.6);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AhPBcQgSgSAAgaQAAgSAIgOQAJgOAPgGQAPgIAdgFQAmgIAPgGIAAgFQAAgQgIgHQgIgHgVAAQgPAAgIAGQgIAGgFAOIgzgJQAJgeAVgPQAUgOApAAQAkAAASAIQASAJAIAOQAHANAAAkIAABAQAAAcACANQADANAHAPIg3AAIgFgRIgCgGQgOAOgQAHQgPAGgTAAQggAAgTgRgAgBANQgXAFgHAEQgLAIAAAMQAAALAJAJQAIAIAOAAQAOAAANgJQALgIADgLQACgHAAgUIAAgLQgLAEgWAFg");
	this.shape_55.setTransform(613.925,95.575);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgbCQIAAjQIA3AAIAADQgAgbhcIAAg0IA3AAIAAA0g");
	this.shape_56.setTransform(597.125,91.6);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AhDBrIAAjQIA0AAIAAAeQANgWAKgGQAKgHANAAQATAAASAKIgSAxQgOgJgMAAQgLgBgIAHQgHAGgEARQgFARgBA1IAABAg");
	this.shape_57.setTransform(585.2,95.35);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AhMBKQgVgdAAgrQAAgzAbgeQAcgdApAAQAuAAAbAeQAbAfgBA/IiKAAQAAAZANANQANAOASAAQANAAAJgHQAJgHAFgQIA3AJQgLAfgXAQQgXAPgiAAQg2AAgagjgAgbg1QgMANAAAXIBSAAQgBgYgMgMQgMgNgRAAQgRAAgLANg");
	this.shape_58.setTransform(564.3768,95.575);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgICLQgMgFgGgHQgFgJgCgOQgCgJAAgeIAAhaIgaAAIAAgsIAaAAIAAgqIA2ggIAABKIAmAAIAAAsIgmAAIAABTQAAAaACAFQABADAEADQADAEAGAAQAIgBAOgFIAFArQgTAIgZAAQgPAAgLgFg");
	this.shape_59.setTransform(546.625,92.1);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AhPBcQgSgSAAgaQAAgSAIgOQAJgOAPgGQAPgIAdgFQAmgIAPgGIAAgFQAAgQgIgHQgIgHgVAAQgPAAgIAGQgIAGgFAOIgzgJQAJgeAVgPQAUgOApAAQAkAAASAIQASAJAIAOQAHANAAAkIAABAQAAAcACANQADANAHAPIg3AAIgFgRIgCgGQgOAOgQAHQgPAGgTAAQggAAgTgRgAgBANQgXAFgHAEQgLAIAAAMQAAALAJAJQAIAIAOAAQAOAAANgJQALgIADgLQACgHAAgUIAAgLQgLAEgWAFg");
	this.shape_60.setTransform(528.675,95.575);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("ABiBrIAAh2QABgggGgJQgIgMgQAAQgMAAgJAIQgLAGgFAOQgEAOAAAdIAABkIg3AAIAAhyQAAgfgCgIQgEgJgGgFQgGgEgLAAQgNAAgJAHQgLAHgEANQgFANAAAdIAABmIg3AAIAAjQIAzAAIAAAcQAbghAmAAQAUAAAPAIQAOAJAKAQQANgQAQgJQAQgIATAAQAXAAAPAJQAQAJAJASQAFAOAAAeIAACFg");
	this.shape_61.setTransform(499.4,95.35);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AgbCQIAAkgIA3AAIAAEgg");
	this.shape_62.setTransform(464.775,91.6);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AhtCQIAAkgIDWAAIAAAxIicAAIAABBICRAAIAAAvIiRAAIAABPIChAAIAAAwg");
	this.shape_63.setTransform(446.1,91.6);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("EhQeAImIAAxLMCg9AAAIycRLg");
	this.shape_64.setTransform(841.7135,116.3217,1.0462,1.0462,0,0,180);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("rgba(102,102,102,0.396)").s().p("EhQCAJAQgQAAgMgMQgMgMAAgQIAAwxQAAgRAMgLQAMgMAQAAMCgFAAOQAMAAAKAHQAKAHAFAMQAEALgCAMQgDAMgJAJIx0QlQgMAKgPAAgEhQXgIuQgJAIAAANIAAQxQAAAMAJAJQAJAJAMAAMCORAACQALAAAJgIIR0wlQAHgGACgJQACgJgDgJQgEgIgIgFQgHgGgJAAMigFgAOIAAAAQgMAAgJAJg");
	this.shape_65.setTransform(841.1986,118.5333,1.0462,1.0462,0,0,180);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("rgba(102,102,102,0.796)").s().p("EA+PAIuMiORgACQgIAAgGgGQgGgGAAgIIAAwxQAAgJAGgGQAGgFAIAAMCgFAAOQAGAAAFAEQAFADACAGQADAGgCAGQgBAGgEAEIx0QlQgGAFgIAAIAAAAgEhQJgIgQgDADAAAEIAAQxQAAAEADADQADADAEAAMCORAACQAEAAADgDIR0wlQACgCABgCQAAgEgBgDQgBgCgDgCQgCgCgDAAMigFgAOQgEAAgDADg");
	this.shape_66.setTransform(841.2023,118.5333,1.0462,1.0462,0,0,180);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("rgba(102,102,102,0.596)").s().p("EA+PAI4MiORgACQgMAAgJgJQgJgJAAgMIAAwxQAAgNAJgIQAJgJAMAAMCgFAAOQAJAAAHAGQAIAFAEAIQADAJgCAJQgCAJgHAGIx0QlQgJAIgLAAIAAAAgEhQQgIoQgGAGAAAJIAAQxQAAAIAGAGQAGAGAIAAMCORAACQAIAAAFgFIR0wlQAFgEABgGQACgGgDgGQgCgGgFgDQgFgEgGAAMigFgAOIAAAAQgIAAgGAFg");
	this.shape_67.setTransform(841.198,118.5333,1.0462,1.0462,0,0,180);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("rgba(102,102,102,0.196)").s().p("EhQCAJKQgUAAgPgPQgPgPAAgUIAAwxQAAgVAPgPQAPgOAUAAMCgFAAOQAPAAANAJQANAJAFAOQAGAOgEAPQgDAPgLALIx0QlQgPANgTAAgEhQegI1QgMALAAARIAAQxQAAAQAMAMQAMAMAQAAMCORAACQAPAAAMgKIR0wlQAJgJADgMQACgMgEgLQgFgMgKgHQgKgHgMAAMigFgAOIAAAAQgQAAgMAMg");
	this.shape_68.setTransform(841.1992,118.5332,1.0462,1.0462,0,0,180);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#666666").s().p("EhQCAIiQgEAAgDgDQgDgDAAgEIAAwxQAAgEADgDQADgDAEAAMCgFAAOQADAAACACQADACABACQABADAAAEQgBACgCACIx0QlQgDADgEAAg");
	this.shape_69.setTransform(841.2017,118.5333,1.0462,1.0462,0,0,180);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#829F93").s().p("EhQyAImIAAxLMChlAAAIycRLg");
	this.shape_70.setTransform(835.4211,126.8433,1.0462,1.0462,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(294.5,57,1093.9,127.4);


(lib.t4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape.setTransform(953.625,159.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAJgHQALgGANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAHQgHAGgFAQQgEARAAA0IAABAg");
	this.shape_1.setTransform(936.25,159.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQgBgfQABgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_2.setTransform(914.75,159.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAnCPIAAhtQAAghgCgIQgDgJgIgFQgJgFgMAAQgMAAgLAHQgLAGgEANQgGANAAAaIAABoIg3AAIAAkdIA3AAIAABpQAbgfAkAAQATAAAPAHQAQAHAHALQAIALADANQACAOAAAbIAAB5g");
	this.shape_3.setTransform(890.3,155.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAKgHQAKgGANAAQATAAARAKIgRAwQgOgJgLAAQgMAAgIAHQgHAGgEAQQgFARAAA0IAABAg");
	this.shape_4.setTransform(860.7,159.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAOARAVAAQAVAAAPgRQAOgQABgfQgBgegOgQQgPgRgVAAQgVAAgOARg");
	this.shape_5.setTransform(839.2,159.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhkCRIAAkdIAzAAIAAAeQAKgPARgKQARgKAUAAQAkAAAZAcQAZAdAAAzQAAAzgZAcQgaAdgkAAQgQAAgOgHQgOgGgPgRIAABogAghhVQgNAPAAAfQAAAiAOAQQAOAQATAAQATAAANgOQAMgPAAgjQAAghgNgPQgNgQgTAAQgTAAgOAQg");
	this.shape_6.setTransform(815.275,163.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_7.setTransform(779.775,159.425);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_8.setTransform(758.125,159.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjAAgagdgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXAAQATgBANgQQAOgQAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_9.setTransform(734.275,155.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_10.setTransform(711.475,159.425);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgbCPIAAkdIA3AAIAAEdg");
	this.shape_11.setTransform(694.8,155.475);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_12.setTransform(677.9518,159.425);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AAnBqIAAhqQAAghgDgJQgDgKgJgFQgHgGgMAAQgMAAgMAHQgMAJgDAMQgFAOAAAhIAABeIg3AAIAAjPIA0AAIAAAfQAagjAoAAQATAAAPAGQAPAHAIAKQAIAKADANQACANAAAYIAACAg");
	this.shape_13.setTransform(654.85,159.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_14.setTransform(630.4,159.425);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgOQgCgJAAgdIAAhaIgZAAIAAgsIAZAAIAAgoIA2ghIAABJIAmAAIAAAsIgmAAIAABTQAAAZABAFQABADAEADQAEADAFAAQAIAAAOgFIAFArQgTAHgYABQgPAAgLgFg");
	this.shape_15.setTransform(611.525,156);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhCByQgaggAAhSQAAhQAcgkQAXgdApAAQAqAAAXAdQAcAkAABQQAABRgcAkQgXAdgqAAQgpAAgZgggAgRhdQgIAGgEAQQgGAWAAAxQAAAyAGATQAFATAHAGQAIAHAJAAQAKAAAIgHQAIgGAEgQQAGgWAAgyQAAgxgGgTQgFgTgHgGQgIgHgKAAQgJAAgIAHg");
	this.shape_16.setTransform(582.475,155.675);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhCByQgaggAAhSQAAhQAcgkQAXgdApAAQAqAAAXAdQAcAkAABQQAABRgcAkQgXAdgqAAQgpAAgZgggAgRhdQgIAGgEAQQgGAWAAAxQAAAyAGATQAFATAHAGQAIAHAJAAQAKAAAIgHQAIgGAEgQQAGgWAAgyQAAgxgGgTQgFgTgHgGQgIgHgKAAQgJAAgIAHg");
	this.shape_17.setTransform(560.275,155.675);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhBB8QgZgXgEgkIA1gGQACAUAMALQALALAQAAQAQAAALgNQAMgNAAgWQAAgVgLgMQgLgMgRAAQgJAAgPAEIAGgsQAWABALgKQAMgKAAgRQAAgPgJgJQgIgIgNAAQgOAAgKAKQgKAJgDATIgygIQAFgaALgQQAKgPAUgJQATgJAXAAQAoAAAYAaQAUAVAAAaQAAAmgpAWQAZAGAOARQAPASAAAaQAAAmgcAbQgbAagoAAQgnAAgagWg");
	this.shape_18.setTransform(538.125,155.675);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_19.setTransform(504.7518,159.425);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjAAgagdgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXAAQATgBANgQQAOgQAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_20.setTransform(481.125,155.7);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjAAgagdgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXAAQATgBANgQQAOgQAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_21.setTransform(445.575,155.7);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_22.setTransform(422.775,159.425);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjAAgagdgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXAAQATgBANgQQAOgQAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_23.setTransform(398.925,155.7);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_24.setTransform(381.65,155.475);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAagcAuAAQAlAAAXAQQAXAQAJAiIg2AJQgDgQgJgIQgKgIgPAAQgUAAgMAOQgMAOAAAhQAAAkAMAPQAMAQAVAAQAPAAAKgJQAKgJAEgWIA2AJQgJAmgXASQgYATgoAAQgtAAgagcg");
	this.shape_25.setTransform(365.3,159.425);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_26.setTransform(342.825,159.425);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhkCRIAAkdIAzAAIAAAeQAKgPARgKQARgKAUAAQAkAAAZAcQAZAdAAAzQAAAzgZAcQgaAdgkAAQgQAAgOgHQgOgGgPgRIAABogAghhVQgNAPAAAfQAAAiAOAQQAOAQATAAQATAAANgOQAMgPAAgjQAAghgNgPQgNgQgTAAQgTAAgOAQg");
	this.shape_27.setTransform(320.025,163.15);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_28.setTransform(296.175,159.425);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAbgcAtAAQAmAAAWAQQAWAQAKAiIg2AJQgDgQgJgIQgKgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgJAmgYASQgXATgoAAQgtAAgagcg");
	this.shape_29.setTransform(274.25,159.425);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AAoBqIAAhqQAAghgEgJQgEgKgHgFQgJgGgKAAQgNAAgMAHQgLAJgFAMQgEAOAAAhIAABeIg2AAIAAjPIAyAAIAAAfQAbgjApAAQASAAAPAGQAPAHAHAKQAJAKACANQAEANAAAYIAACAg");
	this.shape_30.setTransform(239.55,159.2);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgVAAgOARg");
	this.shape_31.setTransform(215.1,159.425);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAagcAuAAQAlAAAXAQQAXAQAJAiIg2AJQgDgQgJgIQgKgIgPAAQgUAAgMAOQgMAOAAAhQAAAkAMAPQAMAQAVAAQAPAAAKgJQAKgJAEgWIA2AJQgJAmgXASQgYATgoAAQgtAAgagcg");
	this.shape_32.setTransform(192.05,159.425);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_33.setTransform(157.35,159.425);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AAoBqIAAhqQAAghgEgJQgEgKgHgFQgJgGgKAAQgNAAgMAHQgLAJgFAMQgEAOAAAhIAABeIg2AAIAAjPIAyAAIAAAfQAbgjApAAQASAAAPAGQAPAHAHAKQAJAKACANQAEANAAAYIAACAg");
	this.shape_34.setTransform(132.9,159.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("Ag+BhQgQgJgIgRQgHgQAAgeIAAiCIA3AAIAABfQAAArADAKQADAKAIAGQAIAFAMABQANAAALgIQALgIAEgLQAFgMAAgsIAAhXIA2AAIAADPIgzAAIAAggQgLARgSAJQgSAKgUAAQgVAAgRgJg");
	this.shape_35.setTransform(108.325,159.65);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_36.setTransform(74.025,159.425);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjAAgagdgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXAAQATgBANgQQAOgQAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_37.setTransform(50.175,155.7);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_38.setTransform(27.375,159.425);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AhGBQQgbgdAAgzQAAgyAbgdQAcgcAsAAQAmAAAXAQQAWAQAKAiIg2AJQgDgQgKgIQgJgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQAMAQAVAAQAPAAAKgJQAKgJAEgWIA2AJQgIAmgZASQgXATgpAAQgsAAgbgcg");
	this.shape_39.setTransform(5.45,159.425);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_40.setTransform(879.675,112.725);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_41.setTransform(857.8018,112.725);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAKgHQAKgGANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAHQgHAGgFAQQgEARAAA0IAABAg");
	this.shape_42.setTransform(840.65,112.5);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_43.setTransform(819.15,112.725);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjgBgagcgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXAAQATgBANgQQAOgQAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_44.setTransform(794.175,109);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_45.setTransform(771.375,112.725);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAbgcAtAAQAmAAAWAQQAWAQAKAiIg2AJQgDgQgJgIQgKgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgJAmgYASQgXATgoAAQgtAAgagcg");
	this.shape_46.setTransform(749.45,112.725);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_47.setTransform(726.7518,112.725);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_48.setTransform(704.225,112.725);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_49.setTransform(670.925,112.725);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_50.setTransform(648.15,112.725);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_51.setTransform(630.35,108.775);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_52.setTransform(602.625,112.725);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgOQgCgJAAgdIAAhaIgZAAIAAgsIAZAAIAAgoIA2ghIAABJIAmAAIAAAsIgmAAIAABTQAAAZABAFQABADAEADQAEADAFAAQAIAAAOgFIAFArQgTAHgYABQgPgBgLgEg");
	this.shape_53.setTransform(584.875,109.3);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_54.setTransform(566.575,112.725);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_55.setTransform(544.925,112.725);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AAnCPIAAhtQAAghgDgIQgDgJgHgFQgJgFgLAAQgNAAgLAHQgKAGgGANQgEANAAAaIAABoIg3AAIAAkdIA3AAIAABpQAagfAkAAQATAAAPAHQAPAHAIALQAHALADANQADAOABAbIAAB5g");
	this.shape_56.setTransform(521.6,108.775);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgUAAgPARg");
	this.shape_57.setTransform(486.05,112.725);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgbQAZgcAmAAQAiAAAZAdIAAhoIA3AAIAAEeIgzAAIAAgeQgMASgSAIQgRAJgRAAQgjgBgagcgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXAAQATgBANgQQAOgQAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_58.setTransform(461.075,109);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_59.setTransform(438.275,112.725);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgOQgCgJAAgdIAAhaIgZAAIAAgsIAZAAIAAgoIA2ghIAABJIAmAAIAAAsIgmAAIAABTQAAAZABAFQABADAEADQAEADAFAAQAIAAAOgFIAFArQgTAHgYABQgPgBgLgEg");
	this.shape_60.setTransform(420.525,109.3);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAJgHQALgGANAAQATAAARAKIgRAwQgNgJgNAAQgLAAgIAHQgHAGgEAQQgFARAAA0IAABAg");
	this.shape_61.setTransform(407.6,112.5);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgVAAgOARg");
	this.shape_62.setTransform(386.1,112.725);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AhkCSIAAkeIAzAAIAAAeQAKgPARgKQARgKAUAAQAkAAAZAcQAZAdAAAyQAAA0gZAcQgaAdgkAAQgQAAgOgGQgOgHgPgRIAABpgAghhVQgNAPAAAfQAAAiAOAQQAOAQATAAQATAAANgOQAMgPAAgjQAAghgNgPQgNgQgTAAQgTAAgOAQg");
	this.shape_63.setTransform(362.175,116.45);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_64.setTransform(337.775,112.725);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AAoBqIAAhqQgBgggDgKQgDgKgJgFQgHgGgMAAQgMAAgMAHQgLAJgEANQgFANAAAhIAABeIg3AAIAAjPIA0AAIAAAfQAbgjAnAAQATAAAPAGQAPAHAHAKQAIALAEAMQACANAAAYIAACAg");
	this.shape_65.setTransform(315,112.5);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_66.setTransform(291.675,112.725);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAJgHQALgGANAAQATAAARAKIgQAwQgOgJgNAAQgLAAgIAHQgHAGgFAQQgEARAAA0IAABAg");
	this.shape_67.setTransform(274.3,112.5);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgOQgCgJAAgdIAAhaIgZAAIAAgsIAZAAIAAgoIA2ghIAABJIAmAAIAAAsIgmAAIAABTQAAAZABAFQABADAEADQAEADAFAAQAIAAAOgFIAFArQgTAHgYABQgPgBgLgEg");
	this.shape_68.setTransform(258.375,109.3);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_69.setTransform(228.975,112.725);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_70.setTransform(207.1018,112.725);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AgbCPIAAkdIA3AAIAAEdg");
	this.shape_71.setTransform(179.55,108.775);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_72.setTransform(162.925,112.725);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAKgHQAKgGANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAHQgHAGgEAQQgFARAAA0IAABAg");
	this.shape_73.setTransform(145.55,112.5);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_74.setTransform(124.9518,112.725);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AAoBqIAAhqQAAgggEgKQgEgKgHgFQgJgGgKAAQgNAAgMAHQgLAJgFANQgEANAAAhIAABeIg2AAIAAjPIAyAAIAAAfQAbgjApAAQASAAAPAGQAPAHAHAKQAJALACAMQAEANAAAYIAACAg");
	this.shape_75.setTransform(101.85,112.5);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_76.setTransform(84.05,108.775);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("ABiBqIAAh2QAAgfgGgIQgHgMgRAAQgLAAgKAHQgKAHgFANQgEAOAAAcIAABkIg2AAIAAhwQAAgfgDgJQgDgIgGgFQgGgEgKAAQgNAAgLAGQgKAIgEAMQgEANgBAdIAABlIg2AAIAAjPIAyAAIAAAdQAbghAmAAQAUAAAPAIQANAJAJAQQAOgQAQgJQAQgIARAAQAXAAARAKQAPAIAIATQAFAMABAfIAACDg");
	this.shape_77.setTransform(60.6,112.5);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_78.setTransform(26.3,108.775);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AhsCPIAAkdIDUAAIAAAwIiaAAIAABAICOAAIAAAvIiOAAIAABOICfAAIAAAwg");
	this.shape_79.setTransform(7.8,108.775);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("EhZ2AImIAAxLMCztAAAIycRLg");
	this.shape_80.setTransform(452.714,131.4771,1.1015,1.1015);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("rgba(102,102,102,0.396)").s().p("EhLYAJ6IAAABI5egBQgTAAgMgMQgNgOAAgSIAAyeQAAgSANgNQAMgNATAAIZdADIAAgDMCwQAAQQAOAAALAIQALAHAGANQAFANgEANQgCANgKAKIzoSQQgNAMgRAAgEBRQAJyQAMAAAKgJIToyRQAHgHADgJQACgLgEgJQgEgJgIgGQgJgGgKAAMiwQgAQIAAADI5dgDQgOAAgKAKQgJAJAAAOIAASeQAAAOAJAKQAKAJAOAAIZeABIAAgBg");
	this.shape_81.setTransform(438.1471,133.825);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("rgba(102,102,102,0.796)").s().p("EhLYAJkIAAABI5egBQgKAAgGgGQgGgHAAgJIAAyeQAAgJAGgGQAHgHAJAAIZdADIAAgDMCwQAAQQAHAAAGAEQAGAEACAGQACAGgBAHQgCAHgEAFIzoSQQgHAGgIAAgEBRQAJcQAEAAADgDIToyRIADgFQABgEgBgDQgCgDgDgCQgCgCgEAAMiwQgAQIAAADI5dgDQgFAAgDADQgDAEAAAEIAASeQAAAFADADQADADAFAAIZeABIAAgBg");
	this.shape_82.setTransform(438.1281,133.825);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("rgba(102,102,102,0.596)").s().p("EhLYAJvIAAABI5egBQgOAAgKgJQgJgKAAgOIAAyeQAAgOAJgJQAKgKAOAAIZdADIAAgDMCwQAAQQAKAAAJAGQAIAGAEAJQAEAJgCALQgDAJgHAHIzoSRQgKAJgMAAgEBRQAJnQAIAAAHgGIToyQQAEgFACgHQABgHgCgGQgCgGgGgEQgGgEgHAAMiwQgAQIAAADI5dgDQgJAAgHAHQgGAGAAAJIAASeQAAAJAGAHQAGAGAKAAIZeABIAAgBg");
	this.shape_83.setTransform(438.1481,133.825);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("rgba(102,102,102,0.196)").s().p("EhLYAKGIAAAAI5eAAQgXgBgQgQQgQgQAAgWIAAyfQAAgXAQgQQAQgQAXAAIZIACQAIgCAJAAMCwUAAQQARAAAOAKQAPAJAGARQAGAPgEAQQgEARgMAMIzoSRQgQAOgVAAgEBRQAJ9QARAAANgLIToyRQAKgKACgNQAEgNgFgNQgGgNgLgHQgLgIgOAAMiwQgAQIAAADI5dgDQgTAAgMAOQgNAMAAASIAASfQAAARANAOQAMANATAAIZeAAIAAAAg");
	this.shape_84.setTransform(438.1395,133.8);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#666666").s().p("EhLYAJZIAAABI5egBQgFAAgDgDQgDgDAAgFIAAyeQAAgEADgEQADgDAFAAIZdADIAAgDMCwQAAQQAEAAACACQADACACADQABADgBAEIgDAFIzoSRQgDADgEAAg");
	this.shape_85.setTransform(438.1333,133.825);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#829F93").s().p("EhlVAJeIAAy7MDKrAAAI0US7g");
	this.shape_86.setTransform(446.45,142.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-212.9,69,1308,134.2);


(lib.t3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape.setTransform(665.475,74.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_1.setTransform(643.825,74.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAJgRgBQgjAAgagcgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXABQATAAANgQQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_2.setTransform(619.975,70.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_3.setTransform(597.175,74.525);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgbCPIAAkdIA3AAIAAEdg");
	this.shape_4.setTransform(580.5,70.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_5.setTransform(563.6518,74.525);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAoBqIAAhqQgBghgDgJQgDgKgJgFQgHgGgMAAQgMAAgMAIQgMAHgDANQgFANAAAiIAABeIg3AAIAAjOIA0AAIAAAeQAagjAoAAQATAAAPAGQAPAHAIAKQAIAKADANQACANAAAYIAACAg");
	this.shape_6.setTransform(540.55,74.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgUAAgPARg");
	this.shape_7.setTransform(516.1,74.525);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgOQgCgJAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAZABAEQABAFAEACQAEADAFAAQAIAAAOgFIAFAqQgTAIgYAAQgPABgLgFg");
	this.shape_8.setTransform(497.225,71.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhCByQgaggAAhSQAAhQAcgkQAXgdApAAQAqAAAXAdQAcAkAABQQAABRgcAkQgXAdgqAAQgpAAgZgggAgRhdQgIAGgEAQQgGAWAAAxQAAAyAGATQAFATAHAGQAIAHAJAAQAKAAAIgHQAIgGAEgQQAGgWAAgyQAAgxgGgTQgFgTgHgGQgIgHgKAAQgJAAgIAHg");
	this.shape_9.setTransform(468.175,70.775);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhCByQgaggAAhSQAAhQAcgkQAXgdApAAQAqAAAXAdQAcAkAABQQAABRgcAkQgXAdgqAAQgpAAgZgggAgRhdQgIAGgEAQQgGAWAAAxQAAAyAGATQAFATAHAGQAIAHAJAAQAKAAAIgHQAIgGAEgQQAGgWAAgyQAAgxgGgTQgFgTgHgGQgIgHgKAAQgJAAgIAHg");
	this.shape_10.setTransform(445.975,70.775);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhCByQgaggAAhSQAAhQAcgkQAXgdApAAQAqAAAXAdQAcAkAABQQAABRgcAkQgXAdgqAAQgpAAgZgggAgRhdQgIAGgEAQQgGAWAAAxQAAAyAGATQAFATAHAGQAIAHAJAAQAKAAAIgHQAIgGAEgQQAGgWAAgyQAAgxgGgTQgFgTgHgGQgIgHgKAAQgJAAgIAHg");
	this.shape_11.setTransform(423.775,70.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgbAbIAAg2IA2AAIAAA2g");
	this.shape_12.setTransform(407.3,82.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhCByQgaggAAhSQAAhQAcgkQAXgdApAAQAqAAAXAdQAcAkAABQQAABRgcAkQgXAdgqAAQgpAAgZgggAgRhdQgIAGgEAQQgGAWAAAxQAAAyAGATQAFATAHAGQAIAHAJAAQAKAAAIgHQAIgGAEgQQAGgWAAgyQAAgxgGgTQgFgTgHgGQgIgHgKAAQgJAAgIAHg");
	this.shape_13.setTransform(390.475,70.775);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhCB6QgZgVgEgkIA2gGQADATALALQAMALAPAAQAQAAAMgOQAMgOAAgcQAAgbgMgNQgMgMgSAAQgYAAgSAUIgtgHIAciUICQAAIAAA0IhmAAIgJAwQATgJASAAQAkAAAaAbQAZAZAAArQAAAjgUAcQgcAmgxAAQgoAAgZgWg");
	this.shape_14.setTransform(368.725,71.025);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AAICQIAAjOQgdAcgpAOIAAgyQAWgHAZgUQAYgUAKgaIAsAAIAAEfg");
	this.shape_15.setTransform(344.55,70.525);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_16.setTransform(312.7518,74.525);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAJgRgBQgjAAgagcgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXABQATAAANgQQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_17.setTransform(289.125,70.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_18.setTransform(255.225,74.525);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgOQgCgJAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAZABAEQABAFAEACQAEADAFAAQAIAAAOgFIAFAqQgTAIgYAAQgPABgLgFg");
	this.shape_19.setTransform(237.475,71.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_20.setTransform(219.175,74.525);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_21.setTransform(197.525,74.525);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AAnCPIAAhtQAAghgDgIQgDgJgHgFQgIgFgMAAQgNAAgLAHQgKAGgGANQgEANAAAaIAABoIg3AAIAAkdIA3AAIAABpQAagfAkAAQATAAAPAHQAPAHAIALQAHALADANQADAOABAbIAAB5g");
	this.shape_22.setTransform(174.2,70.575);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_23.setTransform(139.225,74.525);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_24.setTransform(117.575,74.525);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_25.setTransform(100.9,70.575);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_26.setTransform(89.8,70.575);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhkCRIAAkdIAzAAIAAAfQAKgQARgKQARgJAUAAQAkAAAZAcQAZAcAAAzQAAAzgZAdQgaAcgkAAQgQAAgOgHQgOgGgPgRIAABogAghhWQgNAQAAAeQAAAjAOAQQAOAQATABQATgBANgPQAMgOAAgjQAAgggNgRQgNgPgTAAQgTAAgOAPg");
	this.shape_27.setTransform(72.575,78.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AAnBqIAAhqQAAghgDgJQgEgKgHgFQgJgGgKAAQgNAAgMAIQgMAHgEANQgEANAAAiIAABeIg2AAIAAjOIAyAAIAAAeQAcgjAoAAQASAAAPAGQAPAHAHAKQAJAKACANQADANABAYIAACAg");
	this.shape_28.setTransform(36.5,74.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_29.setTransform(12.9518,74.525);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_30.setTransform(754.925,27.825);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AhcBoIAAgrIBOhYIAbgfIgYAAIhJABIAAguICqAAIAAAnIhPBbIgbAeIAcgBIBVAAIAAAwg");
	this.shape_31.setTransform(733.675,27.825);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_32.setTransform(718.25,23.875);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AAnBqIAAhqQABgggEgKQgEgKgHgFQgJgGgLAAQgNAAgLAIQgMAHgDANQgFANAAAiIAABeIg3AAIAAjOIAzAAIAAAeQAcgjAoAAQASAAAPAGQAPAHAIAKQAHAKADANQADANAAAYIAACAg");
	this.shape_33.setTransform(700.5,27.6);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_34.setTransform(676.9518,27.825);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhHCCQgWgSAAgcIAAgHIA/AIQABALAGAEQAIAGAPAAQAWAAALgGQAHgEAEgKQACgHAAgSIAAgfQgYAiglAAQgqAAgYgkQgTgbAAgpQAAg0AZgcQAZgbAlAAQAmAAAZAhIAAgcIAzAAIAAC5QAAAkgGATQgGASgLAKQgLAKgSAHQgTAFgbAAQg0AAgWgSgAgfhZQgNAPAAAfQAAAhANAOQAMAPATAAQATAAAOgPQAOgPAAgfQAAgggNgPQgNgQgVAAQgTAAgMAQg");
	this.shape_35.setTransform(653.325,31.8);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_36.setTransform(629.4,27.825);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("ABiBqIAAh1QAAgggGgJQgHgLgRAAQgLAAgKAHQgKAHgFANQgEAOAAAdIAABjIg2AAIAAhxQAAgegDgJQgDgJgGgEQgGgEgKAAQgNAAgLAHQgKAGgEAOQgEANgBAcIAABlIg2AAIAAjOIAyAAIAAAcQAbghAmAAQAUAAAPAIQANAIAJARQAOgRAQgIQAQgIARAAQAXAAARAJQAPAKAIARQAFANABAeIAACEg");
	this.shape_37.setTransform(599.25,27.6);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_38.setTransform(569.4,27.825);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AAoCPIAAhtQAAghgDgIQgEgJgIgFQgHgFgNAAQgMAAgLAHQgLAGgEANQgGANAAAaIAABoIg3AAIAAkdIA3AAIAABpQAbgfAkAAQATAAAPAHQAQAHAHALQAHALAEANQACAOAAAbIAAB5g");
	this.shape_39.setTransform(544.95,23.875);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_40.setTransform(510.3018,27.825);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_41.setTransform(487.775,27.825);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AhXCPIgFgrQANACAKAAQATAAAJgLQAKgLAEgSIhPjPIA7AAIAwCTIAxiTIA5AAIhJDHIgOAkQgHASgGAKQgHAJgHAGQgJAGgMAEQgNADgPAAQgQAAgPgDg");
	this.shape_42.setTransform(454.775,32.025);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_43.setTransform(421.725,27.825);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAJgHQALgGANAAQATAAARAKIgQAwQgOgJgNAAQgLAAgIAHQgHAGgFAQQgEARAAA0IAABAg");
	this.shape_44.setTransform(404.35,27.6);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("Ag+BhQgQgJgIgRQgHgRAAgcIAAiDIA3AAIAABgQAAAqADAKQADAKAIAGQAIAFAMAAQANABALgIQALgIAEgMQAFgLAAgsIAAhXIA2AAIAADOIgzAAIAAgfQgLARgSAKQgSAJgUAAQgVAAgRgJg");
	this.shape_45.setTransform(382.725,28.05);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgICKQgMgFgFgIQgGgIgCgOQgCgJAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAZABAEQABAFAEACQAEADAFAAQAIAAAOgFIAFArQgTAHgYAAQgPABgLgFg");
	this.shape_46.setTransform(363.975,24.4);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AgaCPIAAjOIA2AAIAADOgAgahbIAAgzIA2AAIAAAzg");
	this.shape_47.setTransform(351.75,23.875);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAKgHQAKgGANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAHQgHAGgEAQQgFARAAA0IAABAg");
	this.shape_48.setTransform(339.95,27.6);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AgICKQgMgFgFgIQgGgIgCgOQgCgJAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAZABAEQABAFAEACQAEADAFAAQAIAAAOgFIAFArQgTAHgYAAQgPABgLgFg");
	this.shape_49.setTransform(324.025,24.4);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_50.setTransform(294.9518,27.825);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_51.setTransform(272.425,27.825);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AgaCPIAAkdIA1AAIAAEdg");
	this.shape_52.setTransform(245.2,23.875);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_53.setTransform(228.575,27.825);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgaCPIAAjOIA1AAIAADOgAgahbIAAgzIA1AAIAAAzg");
	this.shape_54.setTransform(211.9,23.875);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAKgHQAKgGANAAQATAAARAKIgRAwQgOgJgLAAQgMAAgIAHQgHAGgFAQQgEARAAA0IAABAg");
	this.shape_55.setTransform(200.1,27.6);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_56.setTransform(179.5018,27.825);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgICKQgMgFgFgIQgGgIgCgOQgCgJAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAZABAEQABAFAEACQAEADAFAAQAIAAAOgFIAFArQgTAHgYAAQgPABgLgFg");
	this.shape_57.setTransform(161.975,24.4);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_58.setTransform(144.225,27.825);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("ABiBqIAAh1QAAgggGgJQgHgLgRAAQgLAAgKAHQgKAHgFANQgEAOAAAdIAABjIg2AAIAAhxQAAgegDgJQgDgJgGgEQgGgEgLAAQgMAAgKAHQgLAGgEAOQgFANABAcIAABlIg3AAIAAjOIAyAAIAAAcQAcghAlAAQAUAAAOAIQAOAIAKARQANgRAQgIQAQgIASAAQAXAAAPAJQAQAKAIARQAGANgBAeIAACEg");
	this.shape_59.setTransform(115.2,27.6);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_60.setTransform(75.1518,27.825);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AgICKQgMgFgFgIQgGgIgCgOQgCgJAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAZABAEQABAFAEACQAEADAFAAQAIAAAOgFIAFArQgTAHgYAAQgPABgLgFg");
	this.shape_61.setTransform(57.625,24.4);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_62.setTransform(39.325,27.825);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AhsCPIAAkdIDUAAIAAAwIiaAAIAABAICOAAIAAAvIiOAAIAABOICfAAIAAAwg");
	this.shape_63.setTransform(15.8,23.875);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("EhQeAImIAAxLMCg9AAAIycRLg");
	this.shape_64.setTransform(347.95,48.7);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("rgba(102,102,102,0.396)").s().p("EhQCAJAQgQAAgMgMQgMgMAAgQIAAwxQAAgRAMgLQAMgMAQAAMCgFAAOQAMAAAKAHQAKAHAFAMQAEALgCAMQgDAMgJAJIx0QlQgMAKgPAAgEhQXgIuQgJAIAAANIAAQxQAAAMAJAJQAJAJAMAAMCORAACQALAAAJgIIR0wlQAHgGACgJQACgJgDgJQgEgIgIgFQgHgGgJAAMigFgAOIAAAAQgMAAgJAJg");
	this.shape_65.setTransform(348.4274,50.825);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("rgba(102,102,102,0.796)").s().p("EA+PAIuMiORgACQgIAAgGgGQgGgGAAgIIAAwxQAAgJAGgGQAGgFAIAAMCgFAAOQAGAAAFAEQAFADACAGQADAGgCAGQgBAGgEAEIx0QlQgGAFgIAAIAAAAgEhQJgIgQgDADAAAEIAAQxQAAAEADADQADADAEAAMCORAACQAEAAADgDIR0wlQACgCABgCQAAgEgBgDQgBgCgDgCQgCgCgDAAMigFgAOQgEAAgDADg");
	this.shape_66.setTransform(348.4239,50.825);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("rgba(102,102,102,0.596)").s().p("EA+PAI4MiORgACQgMAAgJgJQgJgJAAgMIAAwxQAAgNAJgIQAJgJAMAAMCgFAAOQAJAAAHAGQAIAFAEAIQADAJgCAJQgCAJgHAGIx0QlQgJAIgLAAIAAAAgEhQQgIoQgGAGAAAJIAAQxQAAAIAGAGQAGAGAIAAMCORAACQAIAAAFgFIR0wlQAFgEABgGQACgGgDgGQgCgGgFgDQgFgEgGAAMigFgAOIAAAAQgIAAgGAFg");
	this.shape_67.setTransform(348.428,50.825);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("rgba(102,102,102,0.196)").s().p("EhQCAJKQgUAAgPgPQgPgPAAgUIAAwxQAAgVAPgPQAPgOAUAAMCgFAAOQAPAAANAJQANAJAFAOQAGAOgEAPQgDAPgLALIx0QlQgPANgTAAgEhQegI1QgMALAAARIAAQxQAAAQAMAMQAMAMAQAAMCORAACQAPAAAMgKIR0wlQAJgJADgMQACgMgEgLQgFgMgKgHQgKgHgMAAMigFgAOIAAAAQgQAAgMAMg");
	this.shape_68.setTransform(348.4268,50.825);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#666666").s().p("EhQCAIiQgEAAgDgDQgDgDAAgEIAAwxQAAgEADgDQADgDAEAAMCgFAAOQADAAACACQADACABACQABADAAAEQgBACgCACIx0QlQgDADgEAAg");
	this.shape_69.setTransform(348.4245,50.825);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#829F93").s().p("EhQyAImIAAxLMChlAAAIycRLg");
	this.shape_70.setTransform(353.95,58.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-168.8,-8,1039.9,121.8);


(lib.t2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape.setTransform(546.2,45.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_1.setTransform(529.575,49.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAJgGQALgHANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_2.setTransform(512.2,49.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_3.setTransform(491.6018,49.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAnBqIAAhqQAAgggDgKQgEgKgHgGQgJgFgKAAQgNAAgMAHQgMAJgEANQgEANAAAhIAABeIg2AAIAAjPIAyAAIAAAfQAcgjAoAAQASAAAPAHQAPAGAHAKQAJALACAMQADANABAYIAACAg");
	this.shape_4.setTransform(468.5,49.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_5.setTransform(450.7,45.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("ABiBqIAAh2QAAgfgGgIQgIgMgQAAQgLAAgKAHQgKAHgFAOQgEANAAAcIAABkIg2AAIAAhwQAAgfgDgJQgDgIgGgFQgGgEgKAAQgNAAgLAGQgKAHgEANQgEANAAAdIAABlIg3AAIAAjPIAyAAIAAAdQAbghAmAAQAUAAAOAIQAOAJAJAQQAOgQAQgJQAQgIARAAQAYAAAPAKQAQAJAIASQAGAMAAAfIAACDg");
	this.shape_6.setTransform(427.25,49.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_7.setTransform(392.95,45.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_8.setTransform(376.1018,49.825);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAJgGQALgHANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_9.setTransform(347.85,49.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_10.setTransform(327.475,49.825);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgsIAZAAIAAgoIA2ghIAABJIAmAAIAAAsIgmAAIAABTQAAAZABAFQABADAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYAAQgPgBgLgEg");
	this.shape_11.setTransform(309.725,46.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_12.setTransform(290.85,49.825);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_13.setTransform(273.05,45.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhkCSIAAkeIAzAAIAAAeQAKgPARgKQARgKAUAAQAkAAAZAcQAZAdAAAyQAAAzgZAdQgaAdgkAAQgQAAgOgGQgOgIgPgQIAABpgAghhVQgNAPAAAfQAAAiAOAQQAOAQATABQATAAANgPQAMgPAAgjQAAghgNgPQgNgQgTAAQgTAAgOAQg");
	this.shape_14.setTransform(255.825,53.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AApBoIgqhBIgqBBIhAAAIBKhqIhHhlIBDAAIAkA5IAmg5IBBAAIhHBjIBNBsg");
	this.shape_15.setTransform(231.875,49.825);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_16.setTransform(209.5518,49.825);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhXCPIgFgrQANACAKAAQATAAAJgLQAKgLAEgSIhPjPIA7AAIAwCTIAxiTIA5AAIhJDHIgOAkQgHASgGAKQgHAJgHAGQgJAGgMAEQgNADgPAAQgQAAgPgDg");
	this.shape_17.setTransform(176.225,54.025);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAKgGQAKgHANAAQATAAARAKIgQAwQgOgJgMAAQgMAAgIAGQgHAHgFARQgEAQAAA0IAABAg");
	this.shape_18.setTransform(148,49.6);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_19.setTransform(127.625,49.825);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhCBqIAAjPIAzAAIAAAeQANgVAJgGQALgHANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_20.setTransform(110.25,49.6);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_21.setTransform(88.75,49.825);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_22.setTransform(70.95,45.875);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhkCSIAAkeIAzAAIAAAeQAKgPARgKQARgKAUAAQAkAAAZAcQAZAdAAAyQAAAzgZAdQgaAdgkAAQgQAAgOgGQgOgIgPgQIAABpgAghhVQgNAPAAAfQAAAiAOAQQAOAQATABQATAAANgPQAMgPAAgjQAAghgNgPQgNgQgTAAQgTAAgOAQg");
	this.shape_23.setTransform(53.725,53.55);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AApBoIgqhBIgqBBIhAAAIBKhqIhHhlIBDAAIAkA5IAmg5IBBAAIhHBjIBNBsg");
	this.shape_24.setTransform(29.775,49.825);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhsCPIAAkdIDTAAIAAAwIiZAAIAABAICOAAIAAAvIiOAAIAABOICfAAIAAAwg");
	this.shape_25.setTransform(5.8,45.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Capa_2
	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("EhQeAImIAAxLMCg9AAAIycRLg");
	this.shape_26.setTransform(162.8401,47.05,1.0577,1);

	this.timeline.addTween(cjs.Tween.get(this.shape_26).wait(1));

	// Capa_4
	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(102,102,102,0.396)").s().p("EhQCAJAQgQAAgMgMQgMgMAAgQIAAwxQAAgRAMgLQAMgMAQAAMCgFAAOQAMAAAKAHQAKAHAFAMQAEALgCAMQgDAMgJAJIx0QlQgMAKgPAAgEhQXgIuQgJAIAAANIAAQxQAAAMAJAJQAJAJAMAAMCORAACQALAAAJgIIR0wlQAHgGACgJQACgJgDgJQgEgIgIgFQgHgGgJAAMigFgAOIAAAAQgMAAgJAJg");
	this.shape_27.setTransform(163.3644,49.175,1.0577,1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("rgba(102,102,102,0.796)").s().p("EA+PAIuMiORgACQgIAAgGgGQgGgGAAgIIAAwxQAAgJAGgGQAGgFAIAAMCgFAAOQAGAAAFAEQAFADACAGQADAGgCAGQgBAGgEAEIx0QlQgGAFgIAAIAAAAgEhQJgIgQgDADAAAEIAAQxQAAAEADADQADADAEAAMCORAACQAEAAADgDIR0wlQACgCABgCQAAgEgBgDQgBgCgDgCQgCgCgDAAMigFgAOQgEAAgDADg");
	this.shape_28.setTransform(163.3606,49.175,1.0577,1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("rgba(102,102,102,0.596)").s().p("EA+PAI4MiORgACQgMAAgJgJQgJgJAAgMIAAwxQAAgNAJgIQAJgJAMAAMCgFAAOQAJAAAHAGQAIAFAEAIQADAJgCAJQgCAJgHAGIx0QlQgJAIgLAAIAAAAgEhQQgIoQgGAGAAAJIAAQxQAAAIAGAGQAGAGAIAAMCORAACQAIAAAFgFIR0wlQAFgEABgGQACgGgDgGQgCgGgFgDQgFgEgGAAMigFgAOIAAAAQgIAAgGAFg");
	this.shape_29.setTransform(163.365,49.175,1.0577,1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(102,102,102,0.196)").s().p("EhQCAJKQgUAAgPgPQgPgPAAgUIAAwxQAAgVAPgPQAPgOAUAAMCgFAAOQAPAAANAJQANAJAFAOQAGAOgEAPQgDAPgLALIx0QlQgPANgTAAgEhQegI1QgMALAAARIAAQxQAAAQAMAMQAMAMAQAAMCORAACQAPAAAMgKIR0wlQAJgJADgMQACgMgEgLQgFgMgKgHQgKgHgMAAMigFgAOIAAAAQgQAAgMAMg");
	this.shape_30.setTransform(163.3638,49.175,1.0577,1);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#666666").s().p("EhQCAIiQgEAAgDgDQgDgDAAgEIAAwxQAAgEADgDQADgDAEAAMCgFAAOQADAAACACQADACABACQABADAAAEQgBACgCACIx0QlQgDADgEAAg");
	this.shape_31.setTransform(163.3613,49.175,1.0577,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27}]}).wait(1));

	// Capa_1
	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#829F93").s().p("EhQyAImIAAxLMChlAAAIycRLg");
	this.shape_32.setTransform(169.2055,57.1,1.0577,1);

	this.timeline.addTween(cjs.Tween.get(this.shape_32).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-383.7,-9.6,1099.9,121.69999999999999);


(lib.t1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ABZDuIAAjtQAAhMgIgVQgHgXgSgMQgSgMgZAAQgfgBgaATQgZARgJAdQgKAdAABNIAADTIh8AAIAAnRIBzAAIAABEQA9hPBcAAQApAAAiAPQAiAOARAYQARAXAHAdQAHAcAAA3IAAEgg");
	this.shape.setTransform(975.025,59.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ah5EwQg6gdgeg4Qgfg4AAhRQAAg9Afg5QAeg5A4gfQA3geBEAAQBqAABDBFQBEBFAABoQAABphEBGQhFBGhnAAQhAAAg6gdgAhQgQQghAjAABGQAABFAhAlQAhAlAvAAQAwAAAhglQAhglAAhGQAAhFghgjQghglgwAAQgvAAghAlgAg9jJIA8iDICKAAIh5CDg");
	this.shape_1.setTransform(920.075,51.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ag9FCIAAnRIB7AAIAAHRgAg9jPIAAhyIB7AAIAAByg");
	this.shape_2.setTransform(880.025,51.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AieCzQg9hAAAhzQAAhyA9hAQA9hBBnAAQBWAAAyAlQAyAkAWBMIh5AWQgHglgWgSQgWgTgiAAQgtAAgcAgQgbAgAABLQAABSAcAiQAcAiAtAAQAkAAAXgUQAVgUAKgxIB5AVQgSBUg2AqQg2ArhaAAQhlAAg9hBg");
	this.shape_3.setTransform(843.1,60.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AieCzQg9hAAAhzQAAhyA9hAQA9hBBnAAQBWAAAyAlQAyAkAWBMIh6AWQgGglgWgSQgVgTgjAAQgtAAgbAgQgcAgAABLQAABSAcAiQAbAiAuAAQAkAAAXgUQAVgUAKgxIB5AVQgSBUg2AqQg2ArhaAAQhmAAg8hBg");
	this.shape_4.setTransform(793.05,60.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AiNDaQglgVgRglQgQglAAhCIAAkmIB7AAIAADWQAABhAHAWQAHAXASANQASAMAcAAQAeAAAZgQQAZgSAKgZQAJgaAAhkIAAjEIB7AAIAAHRIhyAAIAAhGQgaAlgpAWQgpAWguAAQgvAAgmgVg");
	this.shape_5.setTransform(739.725,60.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AipEHQg6hBAAh0QAAh2A4g+QA4g9BVAAQBNAAA5BBIAAjoIB8AAIAAKDIhzAAIAAhFQgcAognAUQgnATgnAAQhQAAg5hAgAhHgeQgeAiAABFQAABLAVAhQAeAxA0AAQArAAAegkQAeglAAhIQAAhQgdgiQgdgkgtAAQgrAAgeAjg");
	this.shape_6.setTransform(683.775,51.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("Ah5DXQg6gdgeg4Qgfg4AAhQQAAg9Afg6QAeg5A4gfQA3geBEAAQBqAABDBFQBEBFAABpQAABohEBGQhFBGhnAAQhAAAg6gdgAhQhpQghAkAABFQAABFAhAlQAhAlAvAAQAwAAAhglQAhglAAhFQAAhFghgkQghglgwAAQgvAAghAlg");
	this.shape_7.setTransform(629.975,60.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AiWDuIAAnRIBzAAIAABCQAdgvAXgPQAXgPAeAAQAqAAAnAYIgmBrQgggUgaAAQgaAAgSAOQgRAPgKAlQgKAlAAB2IAACQg");
	this.shape_8.setTransform(588.35,59.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AjjFHIAAqDIBzAAIAABFQAXgkAmgWQAmgVAuAAQBRAAA5A/QA5BAAAByQAAB0g6BBQg5BAhRAAQgmAAgfgPQgfgPgjgmIAADrgAhLjCQgdAjAABEQAABPAfAlQAfAlAsAAQArAAAcgiQAdgiAAhOQAAhKgegjQgdgkgrAAQgtAAgeAjg");
	this.shape_9.setTransform(541.175,68.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AirCkQgug/AAhiQAAhzA8hBQA9hCBdAAQBnAAA8BFQA8BFgCCMIk1AAQACA3AcAfQAdAfApAAQAdAAAUgQQAUgQAKgjIB7AUQgYBEgzAkQgzAjhNAAQh5AAg6hQgAg+h3QgbAdABAzIC3AAQgBg2gbgbQgagdgmAAQgnAAgaAeg");
	this.shape_10.setTransform(461.905,60.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AipEHQg6hBAAh0QAAh2A4g+QA4g9BVAAQBNAAA5BBIAAjoIB8AAIAAKDIhzAAIAAhFQgcAognAUQgnATgnAAQhQAAg5hAgAhHgeQgeAiAABFQAABLAVAhQAeAxA0AAQArAAAegkQAeglAAhIQAAhQgdgiQgdgkgtAAQgrAAgeAjg");
	this.shape_11.setTransform(408.725,51.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ah5DXQg6gdgeg4Qgfg4AAhQQAAg9Afg6QAeg5A4gfQA3geBEAAQBqAABDBFQBEBFAABpQAABohEBGQhFBGhnAAQhAAAg6gdgAhQhpQghAkAABFQAABFAhAlQAhAlAvAAQAwAAAhglQAhglAAhFQAAhFghgkQghglgwAAQgvAAghAlg");
	this.shape_12.setTransform(329.925,60.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AiQDNQg4gngRhCIB8gTQAIAkAYATQAZATAqAAQAwAAAYgSQAQgMAAgVQAAgOgIgJQgKgJgggHQiUghgpgcQg3gkAAhEQAAg8AwgqQAwgpBlAAQBfAAAuAfQAvAfARA9Ih0AWQgIgbgUgPQgWgOglAAQgxAAgVANQgOAKAAAPQAAAOAMAJQARAMBiAXQBiAWAnAhQAnAfAAA7QAABBg1AuQg2AuhpAAQhfAAg3gng");
	this.shape_13.setTransform(276.1,60.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AirCkQgug/AAhiQAAhzA8hBQA9hCBdAAQBnAAA8BFQA8BFgCCMIk1AAQACA3AcAfQAdAfApAAQAdAAAUgQQAUgQAKgjIB7AUQgYBEgzAkQgzAjhNAAQh5AAg6hQgAg+h3QgbAdABAzIC3AAQgBg2gbgbQgagdgmAAQgnAAgaAeg");
	this.shape_14.setTransform(226.805,60.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AieCzQg9hAAAhzQAAhyA9hAQA9hBBnAAQBVAAAzAlQAyAkAWBMIh5AWQgHglgVgSQgWgTgjAAQgtAAgcAgQgbAgAABLQAABSAcAiQAbAiAvAAQAjAAAWgUQAWgUAKgxIB5AVQgTBUg2AqQg1ArhaAAQhlAAg9hBg");
	this.shape_15.setTransform(177.85,60.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("Ah5DXQg6gdgeg4Qgfg4AAhQQAAg9Afg6QAeg5A4gfQA3geBEAAQBqAABDBFQBEBFAABpQAABohEBGQhFBGhnAAQhAAAg6gdgAhQhpQghAkAABFQAABFAhAlQAhAlAvAAQAwAAAhglQAhglAAhFQAAhFghgkQghglgwAAQgvAAghAlg");
	this.shape_16.setTransform(124.775,60.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AiWDuIAAnRIByAAIAABCQAegvAWgPQAYgPAeAAQAqAAAnAYIgmBrQgfgUgbAAQgaAAgSAOQgRAPgKAlQgLAlAAB2IAACQg");
	this.shape_17.setTransform(83.15,59.6);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("Aj2FCIAAqDIDRAAQB2AAAkAJQA3APAlAwQAmAxAABNQAAA7gWAoQgVAoghAXQgiAYgiAHQgvAJhXAAIhVAAIAADzgAh0gdIBHAAQBMAAAagLQAagJAPgWQAPgWAAgdQAAgigVgXQgVgXgfgGQgYgEhFgBIg/AAg");
	this.shape_18.setTransform(33.275,51.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1004.5,104.5);


(lib.instruccion = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAiBdIAAhdQAAgcgCgJQgEgJgGgEQgIgFgJAAQgMAAgJAHQgKAHgEALQgEALABAeIAABSIgxAAIAAi1IAtAAIAAAbQAXgfAkAAQAQAAANAGQANAGAGAIQAIAJACAMQADALAAAVIAABwg");
	this.shape.setTransform(953.55,26.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AguB3QgXgMgMgWQgMgVAAggQAAgYAMgVQAMgXAWgMQAVgLAaAAQApAAAaAaQAbAcAAAnQAAApgbAbQgbAbgoAAQgYABgWgLgAgfgFQgNANAAAbQAAAbANAOQANAPASAAQATAAANgPQAMgOAAgbQAAgbgMgNQgNgPgTAAQgSAAgNAPgAgXhNIAXg0IA1AAIgvA0g");
	this.shape_1.setTransform(932.175,23.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgXB9IAAi0IAvAAIAAC0gAgXhQIAAgsIAvAAIAAAsg");
	this.shape_2.setTransform(916.6,23.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("Ag9BGQgYgZAAgtQAAgsAYgZQAYgZAnAAQAhAAAUAPQAUAOAIAdIgvAIQgDgOgIgHQgJgHgNAAQgRAAgLAMQgKANAAAdQAAAfALANQAKAOASAAQANAAAJgIQAJgIADgTIAwAIQgIAhgVAQQgVARgjAAQgmAAgYgZg");
	this.shape_3.setTransform(902.275,26.625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhEBQQgQgQAAgXQAAgPAHgMQAHgMAOgGQANgGAZgFQAhgGANgGIAAgEQAAgOgHgGQgHgGgSAAQgNAAgHAFQgHAFgFANIgrgIQAHgbASgMQASgNAjAAQAfAAAQAIQAQAHAGAMQAHAMAAAfIgBA3QAAAYADALQACAMAGANIgvAAIgFgOIgCgGQgMAMgOAGQgNAGgQAAQgcAAgQgPgAgBALQgUAEgGAEQgJAHAAAKQAAAKAHAIQAIAHALAAQAMAAAMgJQAJgGADgJQACgHAAgRIAAgJIgdAHg");
	this.shape_4.setTransform(882.575,26.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("ABVBdIAAhnQAAgbgEgIQgHgKgOAAQgKAAgJAGQgJAGgEAMQgEAMABAZIAABXIgwAAIAAhjQAAgagDgIQgCgIgFgDQgGgEgJAAQgLAAgJAGQgJAGgDALQgEALgBAaIAABYIgwAAIAAi1IAtAAIAAAZQAXgdAhAAQASAAANAHQALAIAIAOQANgOAOgIQANgHAQAAQAUAAAOAIQAOAIAGAQQAGAMAAAaIAABzg");
	this.shape_5.setTransform(857.2,26.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("Ag6BdIAAi1IAtAAIAAAaQALgSAJgGQAJgGALAAQARAAAPAJIgPAqQgMgIgLAAQgKAAgHAGQgGAFgEAPQgEAOAAAuIAAA4g");
	this.shape_6.setTransform(836.275,26.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AguBUQgXgMgMgVQgMgWAAgfQAAgXAMgXQAMgWAWgMQAVgMAaAAQApAAAaAbQAbAbAAAoQAAApgbAbQgbAbgoAAQgYAAgWgLgAgfgoQgNAOAAAaQAAAbANAOQANAPASAAQATAAANgPQAMgOAAgbQAAgagMgOQgNgPgTAAQgSAAgNAPg");
	this.shape_7.setTransform(817.475,26.625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgiCAIAAiPIgbAAIAAgmIAbAAIAAgOQAAgWAFgMQAFgLANgHQAMgIAUAAQAUAAAUAHIgGAiQgMgDgKgBQgKABgFAEQgFAFABAOIAAANIAjAAIAAAmIgjAAIAACPg");
	this.shape_8.setTransform(801.6,22.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AAjBdIAAhdQAAgcgDgJQgEgJgHgEQgGgFgKAAQgMAAgKAHQgKAHgDALQgEALAAAeIAABSIgvAAIAAi1IAsAAIAAAbQAYgfAiAAQARAAANAGQANAGAHAIQAGAJADAMQADALgBAVIAABwg");
	this.shape_9.setTransform(784.4,26.425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgXB9IAAi0IAvAAIAAC0gAgXhQIAAgsIAvAAIAAAsg");
	this.shape_10.setTransform(768.85,23.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhEBQQgQgQAAgXQAAgPAHgMQAHgMAOgGQANgGAZgFQAhgGANgGIAAgEQAAgOgHgGQgHgGgSAAQgNAAgHAFQgHAFgFANIgrgIQAHgbASgMQASgNAjAAQAfAAAQAIQAQAHAGAMQAHAMAAAfIgBA3QAAAYADALQACAMAGANIgvAAIgFgOIgCgGQgMAMgOAGQgNAGgQAAQgcAAgQgPgAgBALQgUAEgGAEQgJAHAAAKQAAAKAHAIQAIAHALAAQAMAAAMgJQAJgGADgJQACgHAAgRIAAgJIgdAHg");
	this.shape_11.setTransform(744.575,26.625);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgXB9IAAj5IAvAAIAAD5g");
	this.shape_12.setTransform(730,23.175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("Ag6BdIAAi1IAtAAIAAAaQALgSAJgGQAJgGALAAQARAAAPAJIgPAqQgMgIgLAAQgKAAgHAGQgGAFgEAPQgEAOAAAuIAAA4g");
	this.shape_13.setTransform(709.975,26.425);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhEBQQgQgQAAgXQAAgPAHgMQAHgMAOgGQANgGAZgFQAhgGANgGIAAgEQAAgOgHgGQgHgGgSAAQgNAAgHAFQgHAFgFANIgrgIQAHgbASgMQASgNAjAAQAfAAAQAIQAQAHAGAMQAHAMAAAfIgBA3QAAAYADALQACAMAGANIgvAAIgFgOIgCgGQgMAMgOAGQgNAGgQAAQgcAAgQgPgAgBALQgUAEgGAEQgJAHAAAKQAAAKAHAIQAIAHALAAQAMAAAMgJQAJgGADgJQACgHAAgRIAAgJIgdAHg");
	this.shape_14.setTransform(692.125,26.625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgXB9IAAi0IAvAAIAAC0gAgXhQIAAgsIAvAAIAAAsg");
	this.shape_15.setTransform(677.55,23.175);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgXB9IAAj5IAvAAIAAD5g");
	this.shape_16.setTransform(667.85,23.175);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhXB/IAAj5IAsAAIAAAaQAIgNAQgJQAPgIAQAAQAgAAAWAYQAXAZAAAsQgBAtgWAZQgWAZggAAQgOAAgMgGQgMgGgOgOIAABbgAgchLQgMAOAAAaQAAAfAMAOQAMAOARAAQAQAAALgNQAMgNgBgeQAAgdgLgOQgLgNgRAAQgRAAgLANg");
	this.shape_17.setTransform(652.8,29.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("ABVBdIAAhnQABgbgGgIQgGgKgOAAQgKAAgJAGQgJAGgEAMQgDAMgBAZIAABXIguAAIAAhjQAAgagDgIQgDgIgFgDQgGgEgJAAQgLAAgJAGQgJAGgEALQgEALAAAaIAABYIgvAAIAAi1IAsAAIAAAZQAXgdAiAAQARAAAMAHQAMAIAJAOQALgOAOgIQAOgHAQAAQAUAAAOAIQANAIAIAQQAEAMAAAaIAABzg");
	this.shape_18.setTransform(625.95,26.425);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhEBQQgQgQAAgXQAAgPAHgMQAHgMAOgGQANgGAZgFQAhgGANgGIAAgEQAAgOgHgGQgHgGgSAAQgNAAgHAFQgHAFgFANIgrgIQAHgbASgMQASgNAjAAQAfAAAQAIQAQAHAGAMQAHAMAAAfIgBA3QAAAYADALQACAMAGANIgvAAIgFgOIgCgGQgMAMgOAGQgNAGgQAAQgcAAgQgPgAgBALQgUAEgGAEQgJAHAAAKQAAAKAHAIQAIAHALAAQAMAAAMgJQAJgGADgJQACgHAAgRIAAgJIgdAHg");
	this.shape_19.setTransform(600.775,26.625);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhEBQQgQgQAAgXQAAgPAHgMQAHgMAOgGQANgGAZgFQAhgGANgGIAAgEQAAgOgHgGQgHgGgSAAQgNAAgHAFQgHAFgFANIgrgIQAHgbASgMQASgNAjAAQAfAAAQAIQAQAHAGAMQAHAMAAAfIgBA3QAAAYADALQACAMAGANIgvAAIgFgOIgCgGQgMAMgOAGQgNAGgQAAQgcAAgQgPgAgBALQgUAEgGAEQgJAHAAAKQAAAKAHAIQAIAHALAAQAMAAAMgJQAJgGADgJQACgHAAgRIAAgJIgdAHg");
	this.shape_20.setTransform(571.625,26.625);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("Ag6BdIAAi1IAtAAIAAAaQALgSAJgGQAJgGALAAQARAAAPAJIgPAqQgMgIgLAAQgKAAgHAGQgGAFgEAPQgEAOAAAuIAAA4g");
	this.shape_21.setTransform(556.425,26.425);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhEBQQgQgQAAgXQAAgPAHgMQAHgMAOgGQANgGAZgFQAhgGANgGIAAgEQAAgOgHgGQgHgGgSAAQgNAAgHAFQgHAFgFANIgrgIQAHgbASgMQASgNAjAAQAfAAAQAIQAQAHAGAMQAHAMAAAfIgBA3QAAAYADALQACAMAGANIgvAAIgFgOIgCgGQgMAMgOAGQgNAGgQAAQgcAAgQgPgAgBALQgUAEgGAEQgJAHAAAKQAAAKAHAIQAIAHALAAQAMAAAMgJQAJgGADgJQACgHAAgRIAAgJIgdAHg");
	this.shape_22.setTransform(538.575,26.625);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhYB/IAAj5IAtAAIAAAaQAIgNAPgJQAPgIASAAQAfAAAXAYQAVAZAAAsQABAtgXAZQgWAZgfAAQgPAAgMgGQgMgGgNgOIAABbgAgchLQgMAOAAAaQAAAfAMAOQAMAOAQAAQARAAALgNQAMgNAAgeQAAgdgMgOQgMgNgQAAQgRAAgLANg");
	this.shape_23.setTransform(518.65,29.875);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AAiBdIAAhdQAAgcgCgJQgEgJgGgEQgIgFgJAAQgMAAgKAHQgKAHgDALQgEALAAAeIAABSIgwAAIAAi1IAtAAIAAAbQAXgfAkAAQAPAAAOAGQANAGAHAIQAGAJADAMQACALAAAVIAABwg");
	this.shape_24.setTransform(487.05,26.425);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AguB3QgXgMgMgWQgMgVAAggQAAgYAMgVQAMgXAWgMQAVgLAaAAQApAAAaAaQAbAcAAAnQAAApgbAbQgbAbgoAAQgYABgWgLgAgfgFQgNANAAAbQAAAbANAOQANAPASAAQATAAANgPQAMgOAAgbQAAgbgMgNQgNgPgTAAQgSAAgNAPgAgXhNIAXg0IA1AAIgvA0g");
	this.shape_25.setTransform(465.675,23.15);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgHB5QgKgFgGgHQgEgHgCgLQgBgJAAgZIAAhOIgXAAIAAgnIAXAAIAAgkIAvgcIAABAIAhAAIAAAnIghAAIAABIQAAAWAAAEQACADADADQADACAFAAQAGAAANgFIAFAmQgSAHgUAAQgOAAgJgEg");
	this.shape_26.setTransform(449.15,23.625);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AguBUQgXgMgMgVQgMgWAAgfQAAgXAMgXQAMgWAWgMQAVgMAaAAQApAAAaAbQAbAbAAAoQAAApgbAbQgbAbgoAAQgYAAgWgLgAgfgoQgNAOAAAaQAAAbANAOQANAPASAAQATAAANgPQAMgOAAgbQAAgagMgOQgNgPgTAAQgSAAgNAPg");
	this.shape_27.setTransform(432.625,26.625);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgRB4QgPgIgLgPIAAAaIgtAAIAAj5IAwAAIAABaQAXgZAdAAQAhAAAWAYQAWAYAAAsQAAAugXAZQgWAZgfAAQgPAAgPgHgAgdgLQgLAMAAAcQAAAcAJANQAMATAUAAQAQAAALgNQALgOAAgdQAAgfgLgNQgLgOgRAAQgRAAgMAOg");
	this.shape_28.setTransform(411.625,23.375);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhEBQQgQgQAAgXQAAgPAHgMQAHgMAOgGQANgGAZgFQAhgGANgGIAAgEQAAgOgHgGQgHgGgSAAQgNAAgHAFQgHAFgFANIgrgIQAHgbASgMQASgNAjAAQAfAAAQAIQAQAHAGAMQAHAMAAAfIgBA3QAAAYADALQACAMAGANIgvAAIgFgOIgCgGQgMAMgOAGQgNAGgQAAQgcAAgQgPgAgBALQgUAEgGAEQgJAHAAAKQAAAKAHAIQAIAHALAAQAMAAAMgJQAJgGADgJQACgHAAgRIAAgJIgdAHg");
	this.shape_29.setTransform(381.075,26.625);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhCBmQgVgZAAgtQgBgtAWgYQAWgYAhAAQAeAAAVAZIAAhaIAxAAIAAD5IgtAAIAAgaQgLAPgPAIQgQAHgOAAQgfAAgXgZgAgbgLQgMANAAAbQABAdAHANQAMASAUAAQARAAALgOQALgOAAgcQABgfgMgNQgLgOgRAAQgQAAgMAOg");
	this.shape_30.setTransform(360.2,23.375);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AhEBQQgQgQAAgXQAAgPAHgMQAHgMAOgGQANgGAZgFQAhgGANgGIAAgEQAAgOgHgGQgHgGgSAAQgNAAgHAFQgHAFgFANIgrgIQAHgbASgMQASgNAjAAQAfAAAQAIQAQAHAGAMQAHAMAAAfIgBA3QAAAYADALQACAMAGANIgvAAIgFgOIgCgGQgMAMgOAGQgNAGgQAAQgcAAgQgPgAgBALQgUAEgGAEQgJAHAAAKQAAAKAHAIQAIAHALAAQAMAAAMgJQAJgGADgJQACgHAAgRIAAgJIgdAHg");
	this.shape_31.setTransform(340.225,26.625);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("Ag9BGQgYgZAAgtQAAgsAYgZQAYgZAnAAQAhAAAUAPQAUAOAIAdIgvAIQgDgOgIgHQgJgHgNAAQgRAAgLAMQgKANAAAdQAAAfALANQAKAOASAAQANAAAJgIQAJgIADgTIAwAIQgIAhgVAQQgVARgjAAQgmAAgYgZg");
	this.shape_32.setTransform(321.025,26.625);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhCBAQgSgZAAgmQAAgsAYgZQAYgaAkAAQAnAAAYAbQAXAbgBA2Ih3AAQAAAVALAMQALAMAQAAQALAAAIgGQAIgGADgOIAwAIQgJAagUAOQgUAOgeAAQguAAgXgfgAgXguQgLAMAAATIBHAAQAAgUgLgLQgKgLgPAAQgOAAgKALg");
	this.shape_33.setTransform(291.4271,26.625);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("Ag6BdIAAi1IAtAAIAAAaQALgSAJgGQAJgGALAAQARAAAPAJIgPAqQgMgIgLAAQgKAAgHAGQgGAFgEAPQgEAOAAAuIAAA4g");
	this.shape_34.setTransform(276.425,26.425);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgRB4QgPgIgLgPIAAAaIgtAAIAAj5IAwAAIAABaQAXgZAdAAQAhAAAWAYQAWAYAAAsQAAAugXAZQgWAZgfAAQgPAAgPgHgAgdgLQgLAMAAAcQAAAcAJANQAMATAUAAQAQAAALgNQALgOAAgdQAAgfgLgNQgLgOgRAAQgRAAgMAOg");
	this.shape_35.setTransform(258.025,23.375);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AguBUQgXgMgMgVQgMgWAAgfQAAgXAMgXQAMgWAWgMQAVgMAaAAQApAAAaAbQAbAbAAAoQAAApgbAbQgbAbgoAAQgYAAgWgLgAgfgoQgNAOAAAaQAAAbANAOQANAPASAAQATAAANgPQAMgOAAgbQAAgagMgOQgNgPgTAAQgSAAgNAPg");
	this.shape_36.setTransform(236.225,26.625);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("Ag3BQQgWgPgHgaIAxgHQADAOAJAHQAKAHAPAAQATAAAJgHQAHgEAAgIQAAgGgEgEQgDgDgNgDQg5gNgPgKQgWgOAAgaQAAgYATgQQASgQAoAAQAkAAASAMQASAMAHAYIgtAJQgDgLgIgGQgJgFgOAAQgTAAgIAFQgFAEAAAGQAAAFAFADQAGAFAlAJQAnAJAPAMQAPAMAAAXQAAAZgVASQgVASgpAAQgkAAgVgPg");
	this.shape_37.setTransform(215.275,26.625);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("Ag9BGQgYgZAAgtQAAgsAYgZQAYgZAnAAQAhAAAUAPQAUAOAIAdIgvAIQgDgOgIgHQgJgHgNAAQgRAAgLAMQgKANAAAdQAAAfALANQAKAOASAAQANAAAJgIQAJgIADgTIAwAIQgIAhgVAQQgVARgjAAQgmAAgYgZg");
	this.shape_38.setTransform(186.875,26.625);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgXB9IAAi0IAvAAIAAC0gAgXhQIAAgsIAvAAIAAAsg");
	this.shape_39.setTransform(172.05,23.175);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgXB9IAAj5IAvAAIAAD5g");
	this.shape_40.setTransform(162.35,23.175);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("Ag9BGQgYgZAAgtQAAgsAYgZQAYgZAnAAQAhAAAUAPQAUAOAIAdIgvAIQgDgOgIgHQgJgHgNAAQgRAAgLAMQgKANAAAdQAAAfALANQAKAOASAAQANAAAJgIQAJgIADgTIAwAIQgIAhgVAQQgVARgjAAQgmAAgYgZg");
	this.shape_41.setTransform(148.025,26.625);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AhQBbIAAgmIBEhNIAYgbIgWABIhAAAIAAgoICWAAIAAAiIhGBPIgYAbIAZgBIBKAAIAAAqg");
	this.shape_42.setTransform(119.5,26.625);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhEBQQgQgQAAgXQAAgPAHgMQAHgMAOgGQANgGAZgFQAhgGANgGIAAgEQAAgOgHgGQgHgGgSAAQgNAAgHAFQgHAFgFANIgrgIQAHgbASgMQASgNAjAAQAfAAAQAIQAQAHAGAMQAHAMAAAfIgBA3QAAAYADALQACAMAGANIgvAAIgFgOIgCgGQgMAMgOAGQgNAGgQAAQgcAAgQgPgAgBALQgUAEgGAEQgJAHAAAKQAAAKAHAIQAIAHALAAQAMAAAMgJQAJgGADgJQACgHAAgRIAAgJIgdAHg");
	this.shape_43.setTransform(101.125,26.625);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AAyB9IAAhtIhjAAIAABtIgyAAIAAj5IAyAAIAABiIBjAAIAAhiIAyAAIAAD5g");
	this.shape_44.setTransform(78.675,23.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.instruccion, new cjs.Rectangle(64,2,902.3,43.1), null);


(lib.f15_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape.setTransform(678.725,597.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_1.setTransform(657.075,597.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMASgSAJQgRAIgRABQgjgBgagcgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXgBQATABANgRQAOgQAAggQAAgkgNgPQgNgPgUAAQgTAAgNAPg");
	this.shape_2.setTransform(633.225,593.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_3.setTransform(610.425,597.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_4.setTransform(593.75,593.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_5.setTransform(576.9018,597.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAnBqIAAhqQABgggEgKQgEgKgHgGQgJgFgLAAQgNAAgLAHQgMAJgDANQgFAMAAAiIAABeIg3AAIAAjPIA0AAIAAAfQAagjApAAQASAAAPAHQAPAGAIAKQAHALAEAMQACANAAAYIAACAg");
	this.shape_6.setTransform(553.8,596.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_7.setTransform(529.35,597.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgICKQgMgFgFgIQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgsIAZAAIAAgoIA2ghIAABJIAmAAIAAAsIgmAAIAABTQAAAaABAEQABADAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYAAQgPgBgLgEg");
	this.shape_8.setTransform(510.475,593.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhCByQgaggAAhSQAAhQAcgkQAXgdApAAQAqAAAXAdQAcAkAABQQAABRgcAkQgXAdgqAAQgpAAgZgggAgRhdQgIAGgEAQQgGAWAAAxQAAAyAGATQAFATAHAGQAIAHAJAAQAKAAAIgHQAIgGAEgQQAGgWAAgyQAAgxgGgTQgFgTgHgGQgIgHgKAAQgJAAgIAHg");
	this.shape_9.setTransform(481.425,593.375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhCByQgaggAAhSQAAhQAcgkQAXgdApAAQAqAAAXAdQAcAkAABQQAABRgcAkQgXAdgqAAQgpAAgZgggAgRhdQgIAGgEAQQgGAWAAAxQAAAyAGATQAFATAHAGQAIAHAJAAQAKAAAIgHQAIgGAEgQQAGgWAAgyQAAgxgGgTQgFgTgHgGQgIgHgKAAQgJAAgIAHg");
	this.shape_10.setTransform(459.225,593.375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAICQIAAjOQgdAcgpAOIAAgyQAVgHAagUQAYgUAJgaIAtAAIAAEfg");
	this.shape_11.setTransform(435.5,593.125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("Ag1CHQgagNgNgZQgOgZAAgjQAAgcAOgYQANgaAZgNQAYgOAeAAQAvAAAeAfQAeAeAAAuQAAAvgeAfQgeAfgvAAQgcAAgZgNgAgjgHQgPAQAAAfQAAAeAPARQAPAQAUAAQAVAAAPgQQAPgRAAgfQAAgegPgQQgPgQgVAAQgUAAgPAQgAgbhZIAbg6IA9AAIg2A6g");
	this.shape_12.setTransform(402.8,593.175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhCB6QgZgVgEgkIA2gGQADATALALQAMALAPAAQAQAAAMgOQAMgOAAgcQAAgbgMgNQgMgMgSAAQgYAAgSAUIgtgHIAciUICQAAIAAA0IhmAAIgJAwQATgJASAAQAkAAAaAbQAZAZAAArQAAAjgUAcQgcAmgxAAQgoAAgZgWg");
	this.shape_13.setTransform(368.625,593.625);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhCB6QgZgVgEgkIA2gGQADATALALQAMALAPAAQAQAAAMgOQAMgOAAgcQAAgbgMgNQgMgMgSAAQgYAAgSAUIgtgHIAciUICQAAIAAA0IhmAAIgJAwQATgJASAAQAkAAAaAbQAZAZAAArQAAAjgUAcQgcAmgxAAQgoAAgZgWg");
	this.shape_14.setTransform(346.425,593.625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_15.setTransform(312.6518,597.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhLB1QgZgdAAgzQAAg0AYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMASgSAJQgRAIgRABQgjgBgagcgAgfgNQgNAPAAAfQAAAhAJAPQANAWAXgBQATABANgRQAOgQAAggQAAgkgNgPQgNgPgUAAQgTAAgNAPg");
	this.shape_16.setTransform(289.025,593.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_17.setTransform(254.575,597.125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_18.setTransform(232.7018,597.125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AAoBqIAAhqQgBgggDgKQgDgKgJgGQgHgFgMAAQgMAAgMAHQgLAJgFANQgEAMAAAiIAABeIg2AAIAAjPIAzAAIAAAfQAbgjAnAAQATAAAPAHQAPAGAHAKQAIALAEAMQADANAAAYIAACAg");
	this.shape_19.setTransform(209.6,596.9);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_20.setTransform(185.15,597.125);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgaCPIAAjOIA1AAIAADOgAgahbIAAgzIA1AAIAAAzg");
	this.shape_21.setTransform(167.35,593.175);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("ABiBqIAAh2QAAgegGgJQgHgMgRAAQgLAAgKAHQgKAHgFAOQgEANAAAcIAABkIg2AAIAAhwQAAgfgDgIQgDgKgGgEQgGgEgLAAQgNAAgJAGQgLAIgEANQgFAMABAdIAABlIg4AAIAAjPIAzAAIAAAdQAcghAlAAQAUAAAOAIQAOAJAKAQQANgQAQgJQAQgIASAAQAWAAAQAKQAQAJAIASQAGANgBAeIAACDg");
	this.shape_22.setTransform(143.9,596.9);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_23.setTransform(115.175,597.125);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhFBQQgcgdAAgzQAAgyAcgdQAagcAuAAQAlAAAXAQQAXAQAJAiIg2AJQgDgQgJgIQgKgIgQAAQgTAAgMAOQgMAOgBAhQABAkAMAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgJAmgXASQgYATgoAAQgtAAgagcg");
	this.shape_24.setTransform(93.25,597.125);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AAnBqIAAhqQAAgggDgKQgEgKgHgGQgJgFgKAAQgNAAgMAHQgMAJgEANQgEAMAAAiIAABeIg2AAIAAjPIAyAAIAAAfQAcgjAoAAQASAAAPAHQAPAGAHAKQAJALACAMQADANABAYIAACAg");
	this.shape_25.setTransform(58.55,596.9);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_26.setTransform(35.0018,597.125);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAWAAAOgRQAOgQAAgfQAAgegOgQQgOgRgWAAQgUAAgPARg");
	this.shape_27.setTransform(906.95,550.425);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgaCPIAAjOIA1AAIAADOgAgahbIAAgzIA1AAIAAAzg");
	this.shape_28.setTransform(889.15,546.475);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhkCSIAAkeIAzAAIAAAeQAKgPARgKQARgKAUABQAkAAAZAcQAZAcAAAyQAAAzgZAdQgaAdgkAAQgQAAgOgGQgOgIgPgQIAABpgAghhWQgNAQAAAeQAAAjAOAQQAOARATAAQATgBANgPQAMgOAAgjQAAgggNgRQgNgPgTAAQgTAAgOAPg");
	this.shape_29.setTransform(871.925,554.15);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgUAAgPARg");
	this.shape_30.setTransform(846.95,550.425);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AhGBQQgbgdAAgzQAAgyAbgdQAcgcAsAAQAnAAAWAQQAWAQAKAiIg2AJQgDgQgKgIQgJgIgQAAQgTAAgMAOQgNAOAAAhQAAAkANAPQANAQATAAQAQAAAKgJQAKgJAEgWIA2AJQgIAmgZASQgXATgpAAQgsAAgbgcg");
	this.shape_31.setTransform(823.9,550.425);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_32.setTransform(801.425,550.425);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_33.setTransform(767.9018,550.425);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAIgRAAQgjABgagdgAgfgNQgNAPAAAfQAAAhAJAPQANAVAXAAQATAAANgPQAOgRAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_34.setTransform(744.275,546.7);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_35.setTransform(709.825,550.425);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAZgNAdAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAOgQAAgfQAAgegOgQQgPgRgVAAQgVAAgOARg");
	this.shape_36.setTransform(687.05,550.425);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgaCPIAAjOIA2AAIAADOgAgahbIAAgzIA2AAIAAAzg");
	this.shape_37.setTransform(669.25,546.475);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgrIAZAAIAAgpIA2ghIAABKIAmAAIAAArIgmAAIAABTQAAAaABAEQABADAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPAAgLgEg");
	this.shape_38.setTransform(657.075,547);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_39.setTransform(639.325,550.425);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhkCSIAAkeIAzAAIAAAeQAKgPARgKQARgKAUABQAkAAAZAcQAZAcAAAyQAAAzgZAdQgaAdgkAAQgQAAgOgGQgOgIgPgQIAABpgAghhWQgNAQAAAeQAAAjAOAQQAOARATAAQATgBANgPQAMgOAAgjQAAgggNgRQgNgPgTAAQgTAAgOAPg");
	this.shape_40.setTransform(616.525,554.15);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_41.setTransform(581.025,550.425);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_42.setTransform(558.25,550.425);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgbCPIAAkdIA3AAIAAEdg");
	this.shape_43.setTransform(540.45,546.475);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_44.setTransform(512.725,550.425);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgrIAZAAIAAgpIA2ghIAABKIAmAAIAAArIgmAAIAABTQAAAaABAEQABADAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPAAgLgEg");
	this.shape_45.setTransform(494.975,547);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_46.setTransform(476.675,550.425);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_47.setTransform(455.025,550.425);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AAoCPIAAhtQgBghgDgIQgCgJgIgFQgJgFgLAAQgNAAgLAHQgKAGgGANQgEANAAAaIAABoIg3AAIAAkdIA3AAIAABpQAagfAkAAQATAAAPAHQAPAHAIALQAHALADANQAEAOAAAbIAAB5g");
	this.shape_48.setTransform(431.7,546.475);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_49.setTransform(397.275,550.425);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgrIAZAAIAAgpIA2ghIAABKIAmAAIAAArIgmAAIAABTQAAAaABAEQABADAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPAAgLgEg");
	this.shape_50.setTransform(379.525,547);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAKgGQAKgHANAAQATAAARAKIgRAwQgOgJgLAAQgMAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_51.setTransform(366.6,550.2);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAVAAAPgRQAOgQABgfQgBgegOgQQgPgRgVAAQgUAAgPARg");
	this.shape_52.setTransform(345.1,550.425);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AhkCSIAAkeIAzAAIAAAeQAKgPARgKQARgKAUABQAkAAAZAcQAZAcAAAyQAAAzgZAdQgaAdgkAAQgQAAgOgGQgOgIgPgQIAABpgAghhWQgNAQAAAeQAAAjAOAQQAOARATAAQATgBANgPQAMgOAAgjQAAgggNgRQgNgPgTAAQgTAAgOAPg");
	this.shape_53.setTransform(321.175,554.15);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_54.setTransform(296.775,550.425);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AAnBqIAAhqQABghgEgJQgEgKgHgGQgJgFgKAAQgNAAgMAIQgMAHgEAOQgEAMAAAiIAABeIg3AAIAAjOIAzAAIAAAeQAcgjAoAAQASAAAPAHQAPAGAIAKQAHALADAMQADANAAAYIAACAg");
	this.shape_55.setTransform(274,550.2);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_56.setTransform(250.675,550.425);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAKgGQAKgHANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_57.setTransform(233.3,550.2);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgrIAZAAIAAgpIA2ghIAABKIAmAAIAAArIgmAAIAABTQAAAaABAEQABADAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPAAgLgEg");
	this.shape_58.setTransform(217.375,547);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_59.setTransform(188.3018,550.425);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_60.setTransform(165.775,550.425);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAPARAUAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgUAAgPARg");
	this.shape_61.setTransform(131.9,550.425);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AhHCCQgWgSAAgbIAAgIIA/AJQABAKAGAFQAIAFAPAAQAWAAALgGQAHgFAEgJQACgHAAgTIAAgdQgYAhglAAQgqAAgYgjQgTgdAAgoQAAg0AZgcQAZgbAlAAQAmAAAZAiIAAgdIAzAAIAAC4QAAAmgGARQgGATgLAKQgLALgSAFQgTAGgbAAQg0AAgWgSgAgfhaQgNAQAAAfQAAAhANAOQAMAQATAAQATAAAOgQQAOgPAAgeQAAghgNgQQgNgPgVAAQgTAAgMAPg");
	this.shape_62.setTransform(106.925,554.4);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_63.setTransform(83.9018,550.425);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("Ag+BhQgQgJgIgRQgHgQAAgdIAAiDIA3AAIAABgQAAAqADAKQADAKAIAFQAIAHAMgBQANAAALgHQALgIAEgMQAFgLAAgrIAAhYIA2AAIAADOIgzAAIAAgeQgLAQgSAKQgSAJgUAAQgVAAgRgJg");
	this.shape_64.setTransform(60.675,550.65);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AhkCOIAAkbIA6AAIAADrICPAAIAAAwg");
	this.shape_65.setTransform(37.175,546.6);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("EhQeAImIAAxLMCg9AAAIycRLg");
	this.shape_66.setTransform(505.95,572);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("rgba(102,102,102,0.396)").s().p("EhQCAJAQgQAAgMgMQgMgMAAgQIAAwxQAAgRAMgLQAMgMAQAAMCgFAAOQAMAAAKAHQAKAHAFAMQAEALgCAMQgDAMgJAJIx0QlQgMAKgPAAgEhQXgIuQgJAIAAANIAAQxQAAAMAJAJQAJAJAMAAMCORAACQALAAAJgIIR0wlQAHgGACgJQACgJgDgJQgEgIgIgFQgHgGgJAAMigFgAOIAAAAQgMAAgJAJg");
	this.shape_67.setTransform(506.4274,574.125);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("rgba(102,102,102,0.796)").s().p("EA+PAIuMiORgACQgIAAgGgGQgGgGAAgIIAAwxQAAgJAGgGQAGgFAIAAMCgFAAOQAGAAAFAEQAFADACAGQADAGgCAGQgBAGgEAEIx0QlQgGAFgIAAIAAAAgEhQJgIgQgDADAAAEIAAQxQAAAEADADQADADAEAAMCORAACQAEAAADgDIR0wlQACgCABgCQAAgEgBgDQgBgCgDgCQgCgCgDAAMigFgAOQgEAAgDADg");
	this.shape_68.setTransform(506.4239,574.125);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("rgba(102,102,102,0.596)").s().p("EA+PAI4MiORgACQgMAAgJgJQgJgJAAgMIAAwxQAAgNAJgIQAJgJAMAAMCgFAAOQAJAAAHAGQAIAFAEAIQADAJgCAJQgCAJgHAGIx0QlQgJAIgLAAIAAAAgEhQQgIoQgGAGAAAJIAAQxQAAAIAGAGQAGAGAIAAMCORAACQAIAAAFgFIR0wlQAFgEABgGQACgGgDgGQgCgGgFgDQgFgEgGAAMigFgAOIAAAAQgIAAgGAFg");
	this.shape_69.setTransform(506.428,574.125);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("rgba(102,102,102,0.196)").s().p("EhQCAJKQgUAAgPgPQgPgPAAgUIAAwxQAAgVAPgPQAPgOAUAAMCgFAAOQAPAAANAJQANAJAFAOQAGAOgEAPQgDAPgLALIx0QlQgPANgTAAgEhQegI1QgMALAAARIAAQxQAAAQAMAMQAMAMAQAAMCORAACQAPAAAMgKIR0wlQAJgJADgMQACgMgEgLQgFgMgKgHQgKgHgMAAMigFgAOIAAAAQgQAAgMAMg");
	this.shape_70.setTransform(506.4268,574.125);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#666666").s().p("EhQCAIiQgEAAgDgDQgDgDAAgEIAAwxQAAgEADgDQADgDAEAAMCgFAAOQADAAACACQADACABACQABADAAAEQgBACgCACIx0QlQgDADgEAAg");
	this.shape_71.setTransform(506.4245,574.125);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#829F93").s().p("EhQyAImIAAxLMChlAAAIycRLg");
	this.shape_72.setTransform(511.95,582.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Capa_1
	this.instance = new lib.f15();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.8,0,1290.8,725);


(lib.f14_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.f14();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1280,720);


(lib.f13_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.f13();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1280,720);


(lib.f12_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.f12();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1280,720);


(lib.f10_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.f10();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1280,720);


(lib.f8_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.f8();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1280,720);


(lib.f7_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.f7();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1280,725);


(lib.f6_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.f6();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1280,725);


(lib.f5_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.f5();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1280,725);


(lib.f4_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.f4();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1280,720);


(lib.f3_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.f3();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1280,725);


(lib.f2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape.setTransform(1234.625,599.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_1.setTransform(1212.7518,599.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgaCPIAAkdIA2AAIAAEdg");
	this.shape_2.setTransform(1196.3,595.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_3.setTransform(1179.675,599.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgaCPIAAjOIA2AAIAADOgAgahbIAAgzIA2AAIAAAzg");
	this.shape_4.setTransform(1163,595.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAJgGQALgHANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_5.setTransform(1151.2,599.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_6.setTransform(1130.6018,599.475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgrIAZAAIAAgpIA2ghIAABKIAmAAIAAArIgmAAIAABTQAAAaABADQABAFAEADQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPAAgLgEg");
	this.shape_7.setTransform(1113.075,596.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_8.setTransform(1095.325,599.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("ABiBqIAAh2QAAgegGgKQgIgLgPAAQgMAAgKAHQgKAHgEAOQgFANAAAdIAABjIg2AAIAAhxQAAgegDgIQgDgKgGgEQgGgEgLAAQgNAAgKAGQgJAIgFANQgFANAAAcIAABlIg3AAIAAjOIAzAAIAAAcQAbghAmAAQAUAAAOAIQAOAJAKAQQANgQAQgJQAQgIASAAQAWAAARAJQAPAKAIARQAGAOgBAeIAACDg");
	this.shape_9.setTransform(1066.3,599.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_10.setTransform(1026.2518,599.475);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAIgRAAQgjABgagdgAgfgNQgNAPAAAfQAAAhAJAPQANAVAXAAQATAAANgPQAOgRAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_11.setTransform(1002.625,595.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_12.setTransform(968.175,599.475);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_13.setTransform(945.4,599.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhkCSIAAkeIAzAAIAAAeQAKgPARgKQARgKAUABQAkAAAZAcQAZAcAAAyQAAAzgZAdQgaAdgkAAQgQAAgOgGQgOgIgPgQIAABpgAghhWQgNAQAAAeQAAAjAOAQQAOARATAAQATgBANgPQAMgOAAgjQAAgggNgRQgNgPgTAAQgTAAgOAPg");
	this.shape_14.setTransform(921.475,603.2);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgbCPIAAjOIA3AAIAADOgAgbhbIAAgzIA3AAIAAAzg");
	this.shape_15.setTransform(903.15,595.525);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgrIAZAAIAAgpIA2ghIAABKIAmAAIAAArIgmAAIAABTQAAAaABADQABAFAEADQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPAAgLgEg");
	this.shape_16.setTransform(890.975,596.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_17.setTransform(861.575,599.475);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_18.setTransform(839.7018,599.475);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhaIgZAAIAAgrIAZAAIAAgpIA2ghIAABKIAmAAIAAArIgmAAIAABTQAAAaABADQABAFAEADQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPAAgLgEg");
	this.shape_19.setTransform(822.175,596.05);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AAnBqIAAhqQAAghgDgJQgEgKgHgGQgJgFgKAAQgNAAgMAIQgMAHgEAOQgEAMAAAiIAABeIg2AAIAAjOIAyAAIAAAeQAcgjAoAAQASAAAPAHQAPAGAHAKQAJALACAMQADANABAYIAACAg");
	this.shape_20.setTransform(803.3,599.25);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_21.setTransform(779.7518,599.475);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAKgGQAKgHANAAQATAAARAKIgRAwQgOgJgLAAQgMAAgIAGQgHAHgFARQgEAQAAA0IAABAg");
	this.shape_22.setTransform(762.6,599.25);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_23.setTransform(742.0018,599.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgnCRIAAijIgeAAIAAgrIAeAAIAAgQQAAgaAGgNQAGgNAPgHQANgJAXABQAYgBAWAIIgHAmQgNgDgMgBQgMAAgFAGQgGAFAAAQIAAAPIApAAIAAArIgpAAIAACjg");
	this.shape_24.setTransform(725.225,595.3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_25.setTransform(712.25,595.525);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAIgRAAQgjABgagdgAgfgNQgNAPAAAfQAAAhAJAPQANAVAXAAQATAAANgPQAOgRAAggQAAgjgNgQQgNgPgUAAQgTAAgNAPg");
	this.shape_26.setTransform(693.975,595.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_27.setTransform(1123.725,552.775);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("Ag1BgQgagNgNgZQgOgZAAgjQAAgbAOgaQANgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgfAeguAAQgbAAgagMgAgjguQgOAQAAAeQAAAfAOAQQAOARAVAAQAVAAAPgRQAPgQAAgfQAAgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_28.setTransform(1100.95,552.775);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgbCPIAAkdIA3AAIAAEdg");
	this.shape_29.setTransform(1083.15,548.825);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("Ag1BgQgagNgOgZQgNgZAAgjQAAgbANgaQAOgZAZgOQAYgNAeAAQAvAAAeAeQAeAfAAAuQAAAvgeAfQgeAegvAAQgcAAgZgMgAgjguQgPAQAAAeQAAAfAPAQQAOARAVAAQAVAAAPgRQAPgQgBgfQABgegPgQQgPgRgVAAQgVAAgOARg");
	this.shape_30.setTransform(1054.3,552.775);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAaABADQABAEAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPABgLgFg");
	this.shape_31.setTransform(1035.425,549.35);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgbCPIAAjOIA2AAIAADOgAgbhbIAAgzIA2AAIAAAzg");
	this.shape_32.setTransform(1023.2,548.825);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("Ag/BbQgZgRgIgdIA3gJQAEAQAKAJQALAIATAAQAVAAALgIQAHgFAAgKQAAgGgEgEQgEgEgOgDQhCgPgSgMQgYgQAAgeQAAgbAVgSQAVgSAtAAQAqAAAUAOQAVANAIAcIg0AJQgDgMgJgGQgKgHgQAAQgWAAgJAGQgGAEAAAHQAAAGAFAEQAIAGArAKQArAKASAOQARAOAAAaQAAAcgYAVQgYAUguAAQgqAAgYgRg");
	this.shape_33.setTransform(1006.025,552.775);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("Ag1CHQgagNgOgZQgNgZAAgjQAAgcANgYQAOgaAZgNQAZgOAdAAQAvAAAeAfQAeAeAAAuQAAAvgeAfQgfAfguAAQgbAAgagNgAgjgHQgOAQAAAfQAAAeAOARQAOAQAVAAQAWAAAOgQQAOgRAAgfQAAgegOgQQgOgQgWAAQgVAAgOAQgAgbhZIAbg6IA9AAIg2A6g");
	this.shape_34.setTransform(983.25,548.825);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhkCRIAAkdIAzAAIAAAfQAKgQARgKQARgKAUABQAkAAAZAcQAZAcAAAzQAAAygZAeQgaAcgkAAQgQAAgOgGQgOgIgPgQIAABogAghhWQgNAQAAAeQAAAjAOAQQAOARATAAQATgBANgPQAMgOAAgjQAAghgNgQQgNgPgTAAQgTAAgOAPg");
	this.shape_35.setTransform(959.325,556.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_36.setTransform(935.2518,552.775);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAIgRAAQgjABgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXAAQATAAANgPQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_37.setTransform(911.625,549.05);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AgbCPIAAkdIA2AAIAAEdg");
	this.shape_38.setTransform(883.25,548.825);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_39.setTransform(866.4018,552.775);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhLB1QgZgdAAg0QAAgzAYgcQAZgbAmAAQAiAAAZAdIAAhnIA3AAIAAEdIgzAAIAAgfQgMATgSAIQgRAIgRAAQgjABgagdgAgfgMQgNAOAAAfQAAAhAJAPQANAVAXAAQATAAANgPQAOgRAAggQAAgkgNgOQgNgQgUAAQgTAAgNAQg");
	this.shape_40.setTransform(842.775,549.05);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAJgGQALgHANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_41.setTransform(813.7,552.55);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AhMBJQgUgcAAgrQAAgzAbgdQAbgdApAAQAtAAAbAeQAbAfgBA+IiJAAQABAYAMAOQANANASAAQANAAAJgHQAJgHAEgPIA3AJQgLAegWAQQgXAPgiAAQg2AAgagjgAgbg0QgMANAAAWIBRAAQAAgYgMgMQgMgMgRAAQgRAAgLANg");
	this.shape_42.setTransform(793.1018,552.775);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhOBbQgSgRAAgbQAAgRAIgOQAIgOAQgGQAPgIAcgFQAmgHAOgHIAAgFQAAgQgHgHQgIgGgVAAQgPAAgIAFQgIAGgFAPIgygJQAJgeAUgPQAVgOAoAAQAkAAASAIQASAJAHAOQAHANAAAkIAAA/QAAAbACANQADANAHAPIg2AAIgFgQIgCgHQgOAOgQAHQgPAGgTAAQggAAgSgRgAgBANQgXAEgHAFQgLAIAAALQAAAMAJAIQAJAJANAAQAOAAANgKQAKgHADgLQACgHAAgUIAAgLQgKAEgWAFg");
	this.shape_43.setTransform(771.125,552.775);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhCBqIAAjOIAzAAIAAAdQANgVAJgGQALgHANAAQATAAARAKIgRAwQgOgJgMAAQgLAAgIAGQgHAHgEARQgFAQAAA0IAABAg");
	this.shape_44.setTransform(753.75,552.55);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgICKQgMgGgFgHQgGgIgCgNQgCgKAAgdIAAhZIgZAAIAAgsIAZAAIAAgqIA2gfIAABJIAmAAIAAAsIgmAAIAABSQAAAaABADQABAEAEAEQAEACAFAAQAIAAAOgFIAFAqQgTAJgYgBQgPABgLgFg");
	this.shape_45.setTransform(737.825,549.35);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AApBoIgqhBIgqBBIhAAAIBKhqIhHhlIBDAAIAkA5IAmg5IBBAAIhHBjIBNBsg");
	this.shape_46.setTransform(719.975,552.775);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhsCPIAAkdIDTAAIAAAwIiZAAIAABAICOAAIAAAvIiOAAIAABOICfAAIAAAwg");
	this.shape_47.setTransform(696,548.825);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("EhQeAImIAAxLMCg9AAAIycRLg");
	this.shape_48.setTransform(1068.4,572,1,1,0,0,180);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("rgba(102,102,102,0.396)").s().p("EhQCAJAQgQAAgMgMQgMgMAAgQIAAwxQAAgRAMgLQAMgMAQAAMCgFAAOQAMAAAKAHQAKAHAFAMQAEALgCAMQgDAMgJAJIx0QlQgMAKgPAAgEhQXgIuQgJAIAAANIAAQxQAAAMAJAJQAJAJAMAAMCORAACQALAAAJgIIR0wlQAHgGACgJQACgJgDgJQgEgIgIgFQgHgGgJAAMigFgAOIAAAAQgMAAgJAJg");
	this.shape_49.setTransform(1067.9226,574.125,1,1,0,0,180);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("rgba(102,102,102,0.796)").s().p("EA+PAIuMiORgACQgIAAgGgGQgGgGAAgIIAAwxQAAgJAGgGQAGgFAIAAMCgFAAOQAGAAAFAEQAFADACAGQADAGgCAGQgBAGgEAEIx0QlQgGAFgIAAIAAAAgEhQJgIgQgDADAAAEIAAQxQAAAEADADQADADAEAAMCORAACQAEAAADgDIR0wlQACgCABgCQAAgEgBgDQgBgCgDgCQgCgCgDAAMigFgAOQgEAAgDADg");
	this.shape_50.setTransform(1067.9261,574.125,1,1,0,0,180);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("rgba(102,102,102,0.596)").s().p("EA+PAI4MiORgACQgMAAgJgJQgJgJAAgMIAAwxQAAgNAJgIQAJgJAMAAMCgFAAOQAJAAAHAGQAIAFAEAIQADAJgCAJQgCAJgHAGIx0QlQgJAIgLAAIAAAAgEhQQgIoQgGAGAAAJIAAQxQAAAIAGAGQAGAGAIAAMCORAACQAIAAAFgFIR0wlQAFgEABgGQACgGgDgGQgCgGgFgDQgFgEgGAAMigFgAOIAAAAQgIAAgGAFg");
	this.shape_51.setTransform(1067.922,574.125,1,1,0,0,180);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("rgba(102,102,102,0.196)").s().p("EhQCAJKQgUAAgPgPQgPgPAAgUIAAwxQAAgVAPgPQAPgOAUAAMCgFAAOQAPAAANAJQANAJAFAOQAGAOgEAPQgDAPgLALIx0QlQgPANgTAAgEhQegI1QgMALAAARIAAQxQAAAQAMAMQAMAMAQAAMCORAACQAPAAAMgKIR0wlQAJgJADgMQACgMgEgLQgFgMgKgHQgKgHgMAAMigFgAOIAAAAQgQAAgMAMg");
	this.shape_52.setTransform(1067.9232,574.125,1,1,0,0,180);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#666666").s().p("EhQCAIiQgEAAgDgDQgDgDAAgEIAAwxQAAgEADgDQADgDAEAAMCgFAAOQADAAACACQADACABACQABADAAAEQgBACgCACIx0QlQgDADgEAAg");
	this.shape_53.setTransform(1067.9255,574.125,1,1,0,0,180);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#829F93").s().p("EhQyAImIAAxLMChlAAAIycRLg");
	this.shape_54.setTransform(1062.4,582.05,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Capa_1
	this.instance = new lib.f2();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1585.2,725);


(lib.f1_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.f1();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1280,725);


(lib.btn6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("AghA8QgQgIgJgQQgJgPABgWQgBgRAJgQQAJgQAPgJQAPgIATAAQAeAAASATQAUATAAAdQAAAdgUAUQgTATgdAAQgRAAgQgIgAgVgdQgKAKAAATQAAATAKALQAIAKANAAQANAAAKgKQAJgLAAgTQAAgTgJgKQgKgKgNAAQgNAAgIAKg");
	this.shape.setTransform(186.8,151.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AgvBKQgQgTAAggQAAggAQgSQAPgRAYAAQAVAAAQASIAAhBIAjAAIAAC0IggAAIAAgTQgIALgLAFQgLAGgKAAQgXAAgQgSgAgTgIQgJAJAAAUQAAAVAGAJQAJANAOAAQALAAAJgKQAIgKAAgUQAAgXgIgIQgIgKgNAAQgLAAgIAJg");
	this.shape_1.setTransform(171.125,148.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AgxA5QgLgLAAgQQAAgMAFgIQAFgJAKgDQAJgFASgEQAYgEAJgEIAAgDQAAgKgFgFQgFgEgNAAQgJAAgFAEQgFADgDAJIgggFQAGgTANgJQAMgJAaAAQAWAAALAFQAMAGAEAIQAFAIAAAXIAAAnQAAASABAIQACAIAEAJIgiAAIgDgKIgBgEQgJAJgKAEQgJAEgMAAQgUAAgMgLgAAAAIQgOADgFADQgHAFAAAHQAAAHAGAGQAFAFAJAAQAIAAAIgGQAHgFACgHIABgRIAAgHQgHADgNADg");
	this.shape_2.setTransform(156.775,151.075);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AAZBDIAAhDQAAgUgDgGQgCgHgEgDQgGgDgHAAQgHAAgHAFQgIAEgDAJQgCAIAAAVIAAA7IgjAAIAAiCIAhAAIAAATQAQgWAaAAQALAAAKAEQAJAEAFAHQAEAGACAIQACAIABAQIAABQg");
	this.shape_3.setTransform(142.15,150.925);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AgQBaIAAiBIAhAAIAACBgAgQg5IAAggIAhAAIAAAgg");
	this.shape_4.setTransform(130.875,148.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("AA9BDIAAhKQABgTgEgGQgFgHgKAAQgHAAgGAEQgHAEgCAJQgDAJgBARIAAA/IghAAIAAhHQAAgTgCgFQgBgGgEgDQgFgCgGAAQgIAAgGAEQgHAEgCAIQgDAIAAASIAABAIgjAAIAAiCIAgAAIAAASQARgVAYAAQAMAAAJAFQAJAFAFALQAJgLAKgFQAKgFALAAQAPAAAJAGQAKAGAGALQADAJAAASIAABTg");
	this.shape_5.setTransform(116.1,150.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("AgpBDIAAiCIAfAAIAAATQAJgOAGgEQAGgEAIAAQAMAAALAHIgKAeQgJgGgIAAQgHAAgFAEQgEAEgDALQgDAKAAAgIAAApg");
	this.shape_6.setTransform(101.05,150.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#333333").s().p("AgvAuQgNgSAAgbQAAggARgSQARgSAaAAQAcAAARATQARATgBAnIhWAAQABAPAIAJQAIAIAKAAQAJAAAFgEQAGgEADgKIAiAFQgHATgOAKQgOAKgWAAQghAAgQgWgAgRghQgHAJAAAOIAyAAQAAgPgHgIQgIgIgKAAQgLAAgHAIg");
	this.shape_7.setTransform(88.0528,151.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("AgFBXQgIgDgDgFQgEgGgBgIQgBgGAAgSIAAg4IgQAAIAAgcIAQAAIAAgaIAigUIAAAuIAYAAIAAAcIgYAAIAAA0IAAASQABADACACQADACADAAQAFgBAKgDIADAbQgNAFgPAAQgJAAgHgDg");
	this.shape_8.setTransform(77.05,148.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#333333").s().p("AghA8QgRgIgIgQQgJgPAAgWQAAgRAJgQQAIgQAQgJQAQgIASAAQAeAAASATQAUATgBAdQABAdgUAUQgTATgdAAQgRAAgQgIgAgWgdQgJAKAAATQAAATAJALQAJAKANAAQANAAAKgKQAJgLAAgTQAAgTgJgKQgKgKgNAAQgNAAgJAKg");
	this.shape_9.setTransform(181.2,121.075);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#333333").s().p("AgFBXQgIgDgDgFQgEgGgBgIQgBgGAAgSIAAg4IgQAAIAAgbIAQAAIAAgaIAigVIAAAvIAYAAIAAAbIgYAAIAAA0IABATQAAAAAAABQAAAAAAABQABAAAAABQABAAAAAAQADACADAAQAFAAAKgDIADAbQgNAFgPAAQgJAAgHgDg");
	this.shape_10.setTransform(169.3,118.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#333333").s().p("AgsAyQgQgSAAggQAAgfAQgSQASgSAcAAQAYAAAOAKQAOAKAGAVIgiAGQgCgKgGgFQgGgFgJAAQgNAAgHAJQgIAJAAAVQAAAWAIAJQAHAKANAAQAKAAAGgGQAGgFADgOIAhAGQgEAXgQAMQgOAMgaAAQgbAAgSgSg");
	this.shape_11.setTransform(158.3,121.075);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#333333").s().p("AgnA9QgKgGgFgKQgEgLAAgSIAAhSIAiAAIAAA8QAAAbACAGQACAGAFAEQAFADAIAAQAIAAAHgEQAHgFACgHQADgIAAgbIAAg3IAiAAIAACCIggAAIAAgUQgHALgLAGQgLAGgNAAQgNAAgLgGg");
	this.shape_12.setTransform(143.425,121.225);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#333333").s().p("AgvBKQgQgTAAggQAAggAQgSQAPgRAYAAQAVAAAQASIAAhBIAjAAIAAC0IggAAIAAgTQgIALgLAFQgLAGgKAAQgXAAgQgSgAgTgIQgJAJAAAUQAAAVAGAJQAJANAOAAQALAAAJgKQAIgKAAgUQAAgXgIgIQgIgKgNAAQgLAAgIAJg");
	this.shape_13.setTransform(127.825,118.725);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#333333").s().p("AghA8QgRgIgIgQQgJgPAAgWQAAgRAJgQQAIgQAQgJQAQgIASAAQAeAAASATQAUATgBAdQABAdgUAUQgTATgdAAQgRAAgQgIgAgWgdQgJAKAAATQAAATAJALQAJAKANAAQANAAAKgKQAJgLAAgTQAAgTgJgKQgKgKgNAAQgNAAgJAKg");
	this.shape_14.setTransform(112.8,121.075);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#333333").s().p("AgpBDIAAiCIAfAAIAAATQAJgOAGgEQAGgEAJAAQALAAALAHIgKAeQgJgGgIAAQgHAAgFAEQgEAEgDALQgDAKAAAgIAAApg");
	this.shape_15.setTransform(101.15,120.925);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#333333").s().p("AhEBaIAAizIA7AAQAgAAAJADQAQAEAKANQALAOAAAVQAAARgGALQgGALgKAGQgJAHgJACQgNACgYAAIgYAAIAABEgAgggHIAUAAQAUAAAIgDQAHgDAFgGQADgGAAgIQAAgKgFgGQgGgHgJgBQgHgCgSAAIgSAAg");
	this.shape_16.setTransform(87.15,118.575);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#835873").s().p("AhbCYQglguAAhnQAAhpAngvQAngvA/AAQArAAAeAYQAcAZAIAvIhIAIQgDgWgKgLQgMgKgRAAQgWAAgRAVQgQAVgEBCQAbggAoAAQAvAAAhAjQAhAiAAA4QAAA8gjAjQgjAkg2AAQg6AAgmgtgAgeALQgPARAAAgQAAAlAQATQARAUAUAAQAVAAAOgQQAOgQAAglQAAgmgPgRQgPgRgWAAQgUAAgPAQg");
	this.shape_17.setTransform(32.4,31.925);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AnhMVQkHkHgBl1QAAhPANhKQAijVCEitQgRgfgcgcQhJhIhlgFIgHAAIgDAAIgHAAQgygCgqgTQgsgTgmgmQhOhNAAhuQAAhuBOhOQAlglAtgTQAwgVA6AAQBtAABOBNQBOBOgBBuIAAARQgHAagCAeIAAARQgBBuBOBNIACACQDDi2D+gqQBMgOBTAAQF1AAEHEIQEJEHgBF0QABF1kJEHQkHEIl1AAQlzAAkIkIg");
	this.shape_18.setTransform(117.2,116.5,1.08,1.08,0,0,0,0.1,0.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(153,153,153,0.796)").s().p("AnlMZQkJkJABl3QAAhQAMhJQAijWCDisQgQgegagZQhIhHhigFIgCAAIgGAAIgDAAIgGAAIgBAAQhngFhLhKQhPhPAAhwQAAhwBPhPQBQhPBvAAQBxAABPBPQBOBPAABwIAAAPIgBAGQgHAZgBAbIAAAAIgBARQAABrBLBLQDDi0D8gqQBOgOBTAAQF3AAEJEJQEJEJABF2QgBF3kJEJQkJEJl3AAQl2AAkJkJgAvMvLQhNBMAABsQAABsBNBMQBHBHBjAFIABAAIAGAAIADAAIAHAAIABAAQBnAFBJBKQAdAcASAgIABADIgBACQiECsgjDTQgMBKABBPQgBFzEHEGQEFEGFyAAQFzAAEGkGQEGkGABlzQgBlykGkGQkGkGlzAAQhTAAhMAOQj8AqjBC1QgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAIgBgCQhQhPAAhwIABgRIAAgBQACgcAGgZIABgEIAAgPQAAhshLhMQhNhMhsAAQhrAAhMBMg");
	this.shape_19.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#999999").s().p("AnWMLQkDkEAAluQgBhOAMhJQAijRCCipIAAgBQADgDABgFQAAgEgCgEQgUghgcgdQhNhNhqgFIgBAAIgIAAIgDAAIgGAAIAAAAQhggFhEhEQhJhKAAhnQAAhoBJhJQBJhJBnAAQBoAABJBJQBJBJAABoIAAAOIAAACQgHAagCAeIAAASQgBB0BSBSIACACQAFAEAFAAIABAAQAGAAAFgEQC/izD5gpQBMgOBRAAQFuAAEEEEQEDEDABFtQgBFukDEEQkEEDluAAQltAAkDkDg");
	this.shape_20.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(153,153,153,0.898)").s().p("AndMSQkHkGABlzQgBhPAMhKQAjjTCEisIABgCIgBgDQgSgggdgcQhJhKhngFIgBAAIgHAAIgDAAIgGAAIgBAAQhjgFhHhHQhNhMAAhsQAAhsBNhMQBMhMBrAAQBsAABNBMQBLBMAABsIAAAPIgBAEQgGAZgCAcIAAABIgBARQAABwBQBPIABACQABAAAAAAQAAABABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABgBQAAAAABAAQDBi1D8gqQBMgOBTAAQFzAAEGEGQEGEGABFyQgBFzkGEGQkGEGlzAAQlyAAkFkGgAvFvEQhJBJAABoQAABnBJBKQBEBEBgAFIAAAAIAGAAIADAAIAIAAIABAAQBqAFBNBNQAcAdAUAhQACAEAAAEQgBAFgDADIAAABQiCCpgiDRQgMBJABBOQAAFuEDEEQEDEDFtAAQFuAAEEkDQEDkEABluQgBltkDkDQkEkEluAAQhRAAhMAOQj5Api/CzQgFAEgGAAIgBAAQgFAAgFgEIgCgCQhShSABh0IAAgSQACgeAHgaIAAgCIAAgOQAAhohJhJQhJhJhoAAQhnAAhJBJg");
	this.shape_21.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(153,153,153,0.094)").s().p("AoWNKQkdkdAAmUQgBhVANhQQAijMBziqIgGgGQgzgzhJgEIgGAAIgBAAIgGAAIgFAAQiBgGheheQhjhjAAiNQAAiNBjhkQBjhjCNAAQCNAABkBjQBjBkAACNIAAAAIAAAUIgDATQgFASgBAUIAAAAIAAANQAAArARAlQC8iWDrgnIAAAAQBTgPBZAAQGUAAEeEeQEeEdAAGTQAAGUkeEdQkeEemUAAQmTAAkdkegAqGmCQh2CqghDOQgNBOAABVQABGQEaEaQEbEbGOAAQGQAAEakbQEbkaAAmQQAAmPkbkaQkakbmQAAQhZAAhSAPIABAAQjvAoi+CaQgYgrABg0IAAgOQABgVAFgSIADgRIABgUIAAAAQgBiJhghgIAAgBQhhhgiJAAQiIAAhhBgIAAABQhgBgAACJQAACJBgBgIAAAAQBbBbB+AGIAEAAIAGAAIACAAIAGAAQBMAEA2A2IAAAAIALANg");
	this.shape_22.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(153,153,153,0.498)").s().p("An5MuQkTkSAAmDQAAhSANhMQAijSB9isQgMgRgQgQQg+g/hXgEIgFAAIgCAAIgDAAIgGAAIgCAAQhzgFhShTQhZhYAAh8QAAh9BZhXQBXhYB8AAQB9AABYBYQBYBXAAB9IAAAAIgBASIgCALQgGAVgBAZIAAAPQgBBQAwA8QDBipD3gpIAAABQBPgPBWAAQGDAAETESQERESAAGCQAAGDkRESQkTESmDAAQmCAAkRkSgApTmDQiACsgiDTQgNBMAABRQAAF/EQEPQEOEPF+AAQF/AAEPkPIABAAQEOkPAAl/QAAl+kPkPQkOkPmAAAQhVAAhOAOQj6AqjBCsQg4hBgBhZIABgQQACgZAFgXIACgJIABgRIAAAAQgBh5hVhUQhUhVh5AAQh4AAhUBVQhWBUAAB5QAAB4BWBVQBPBQBvAFIACAAIAGAAIADAAIADAAIAEAAQBbAFBBBBIAAAAQAUATAOAVg");
	this.shape_23.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(153,153,153,0.396)").s().p("AoBM1QkVkVAAmHQABhTANhNQAhjRB6irQgKgOgLgMQg9g8hTgEIgFAAIgBAAIgDAAIgGAAIgDAAQh3gFhUhWQhchbABiAQgBiBBchaQBahbCAAAQCBAABbBbQBbBaAACBIAAAAIgBASIgCANQgFAVgCAXIAAAPQAABHAmA2QDBikD1goIgBAAQBQgPBXAAQGIAAEUEVQEWEVgBGGQABGHkWEVQkUEVmIAAQmGAAkVkVgAvovnQhZBXAAB9QAAB8BZBYQBSBTBzAFIACAAIAGAAIADAAIACAAIAFAAQBXAEA+A/QAQAQAMARQh9CsgiDSQgNBMAABSQAAGDETESQERESGCAAQGDAAETkSQERkSAAmDQAAmCkRkSQkTkSmDAAQhWAAhPAPIAAgBQj3ApjBCpQgwg8ABhQIAAgPQABgZAGgVIACgLIABgSIAAAAQAAh9hYhXQhYhYh9AAQh8AAhXBYg");
	this.shape_24.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(153,153,153,0.698)").s().p("AnsMgQkMkMABl7QAAhQAMhLQAijUCBitQgPgZgWgWQhFhEhfgFIgDAAIgEAAIgDAAIgGAAIgBAAQhrgFhOhNQhShSAAh0QAAh0BShSQBThSBzAAQB1AABRBSQBSBSAAB0IAAAQIgBAIQgHAXgBAbIgBAQQAABiBCBHQDCixD7gqIAAAAQBNgOBVAAQF7AAEMEMQEMEMABF6QgBF7kMEMQkMEMl7AAQl6AAkMkMgAvUvSQhPBPAABwQAABwBPBPQBLBKBnAFIABAAIAGAAIADAAIAGAAIACAAQBiAFBIBHQAaAZAQAeQiDCsgiDWQgMBJAABQQgBF3EJEJQEJEJF2AAQF3AAEJkJQEJkJABl3QgBl2kJkJQkJkJl3AAQhTAAhOAOQj8AqjDC0QhLhLAAhrIABgRIAAAAQABgbAHgZIABgGIAAgPQAAhwhOhPQhPhPhxAAQhvAAhQBPg");
	this.shape_25.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(153,153,153,0.596)").s().p("AnyMnQkQkPAAl/QAAhRANhMQAijTCAisQgOgVgUgTIAAAAQhBhBhbgFIgEAAIgDAAIgDAAIgGAAIgCAAQhvgFhPhQQhWhVAAh4QAAh5BWhUQBUhVB4AAQB5AABUBVQBVBUABB5IAAAAIgBARIgCAJQgFAXgCAZIgBAQQABBZA4BBQDBisD6gqQBOgOBVAAQGAAAEOEPQEPEPAAF+QAAF/kOEPIgBAAQkPEPl/AAQl+AAkOkPgAvbvZQhSBSAAB0QAAB0BSBSQBOBNBrAFIABAAIAGAAIADAAIAEAAIADAAQBfAFBFBEQAWAWAPAZQiBCtgiDUQgMBLAABQQgBF7EMEMQEMEMF6AAQF7AAEMkMQEMkMABl7QgBl6kMkMQkMkMl7AAQhVAAhNAOIAAAAQj7AqjCCxQhChHAAhiIABgQQABgbAHgXIABgIIAAgQQAAh0hShSQhRhSh1AAQhzAAhTBSg");
	this.shape_26.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(153,153,153,0.294)").s().p("AoIM8IAAAAQkYkYAAmLQABhUANhNQAhjQB5irIgRgTQg6g5hPgEIgGAAIAAAAIgDAAIgGAAIgDAAQh6gGhZhYQheheABiEQgBiFBehdQBeheCEAAQCFAABeBeQBeBdAACFIAAAAIgBATIgCAPQgGAUgBAWIAAAOQAAA+AeAxQDAigDxgoIAAAAQBRgPBYAAQGLAAEYEYIAAAAQEYEXAAGLQAAGLkYEYQkYEYmLAAQmLAAkXkYgAvvvuQhcBaABCBQgBCABcBbQBUBWB3AFIADAAIAGAAIADAAIABAAIAFAAQBTAEA9A8QALAMAKAOQh6CrghDRQgNBNgBBTQAAGHEVEVQEVEVGGAAQGIAAEUkVQEWkVgBmHQABmGkWkVQkUkVmIAAQhXAAhQAPIABAAQj1AojBCkQgmg2AAhHIAAgPQACgXAFgVIACgNIABgSIAAAAQAAiBhbhaQhbhbiBAAQiAAAhaBbg");
	this.shape_27.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("rgba(153,153,153,0.196)").s().p("AoPNDQkakagBmQQAAhVANhOQAhjOB2iqIgLgNIAAAAQg2g2hMgEIgGAAIgCAAIgGAAIgEAAQh+gGhbhbIAAAAQhghgAAiJQAAiJBghgIAAgBQBhhgCIAAQCJAABhBgIAAABQBgBgABCJIAAAAIgBAUIgDARQgFASgBAVIAAAOQgBA0AYArQC+iaDvgoIgBAAQBSgPBZAAQGQAAEaEbQEbEaAAGPQAAGQkbEaQkaEbmQAAQmOAAkbkbgACaRUQGLAAEYkYQEYkYAAmLQAAmLkYkXIAAAAQkYkYmLAAQhYAAhRAPIAAAAQjxAojACgQgegxAAg+IAAgOQABgWAGgUIACgPIABgTIAAAAQAAiFhehdQheheiFAAQiEAAheBeQheBdABCFQgBCEBeBeQBZBYB6AGIADAAIAGAAIADAAIAAAAIAGAAQBPAEA6A5IARATQh5CrghDQQgNBNgBBUQAAGLEYEYIAAAAQEXEYGLAAg");
	this.shape_28.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.lf(["#B983A5","#835873"],[0,1],7.7,-9.2,32.3,65.6).s().p("APkJ2QADjnhgjRQiTlAkyiuQk4ixliAoQlnApkFD2Qj9Dtg+FVIgMgBQAYiPA5iHQBtj/DaiqQEjjkFxgWIAAhiIAsABQFhAWEnDDQEgC+CbE1QB/EAgEEdg");
	this.shape_29.setTransform(126.0013,202.3975,1.08,1.08,180);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.lf(["#B983A5","#835873"],[0,1],7.7,-9.2,32.3,65.6).s().p("APkJ2QADjnhgjRQiTlAkyiuQk4ixliAoQlnApkFD2Qj9Dtg+FVIgMgBQAYiPA5iHQBtj/DaiqQEjjkFxgWIAAhiIAsABQFhAWEnDDQEgC+CbE1QB/EAgEEdg");
	this.shape_30.setTransform(143.65,67.9,1.08,1.08,0,0,0,0.4,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_18}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,268.9,270.4);


(lib.btn5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("AAZBDIAAhDQAAgUgDgGQgCgHgEgDQgGgDgHAAQgHAAgIAFQgHAEgDAJQgCAIAAAVIAAA7IgjAAIAAiCIAhAAIAAATQARgWAZAAQALAAAKAEQAJAEAFAHQAEAGACAIQACAIAAAQIAABQg");
	this.shape.setTransform(194.7,152.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AghBVQgQgIgJgQQgIgPAAgXQAAgRAIgPQAJgQAPgJQAPgIATAAQAdAAAUATQASATABAdQgBAdgSAUQgUATgdAAQgRAAgQgIgAgVgEQgKAJAAAUQAAATAKALQAIAKANAAQAOAAAJgKQAJgLAAgTQAAgUgJgJQgJgKgOAAQgNAAgIAKgAgRg3IARglIAnAAIgiAlg");
	this.shape_1.setTransform(179.35,150.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AgQBaIAAiBIAhAAIAACBgAgQg5IAAggIAhAAIAAAgg");
	this.shape_2.setTransform(168.125,150.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AgrAyQgRgSgBggQABgfARgSQAQgSAdAAQAXAAAPAKQAOAKAGAVIgiAGQgCgKgGgFQgGgFgKAAQgLAAgIAJQgIAJAAAVQAAAWAIAJQAIAKAMAAQAJAAAHgGQAGgFADgOIAiAGQgFAXgQAMQgPAMgZAAQgcAAgQgSg");
	this.shape_3.setTransform(157.8,152.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AgxA5QgLgLAAgQQAAgMAFgIQAFgJAKgDQAJgFASgEQAYgEAJgEIAAgDQAAgKgFgFQgFgEgNAAQgJAAgFAEQgFADgDAJIgggFQAGgTANgJQAMgJAaAAQAWAAALAFQAMAGAEAIQAFAIAAAXIAAAnQAAASABAIQACAIAEAJIgiAAIgDgKIgBgEQgJAJgKAEQgJAEgMAAQgUAAgMgLgAAAAIQgOADgFADQgHAFAAAHQAAAHAGAGQAFAFAJAAQAIAAAIgGQAHgFACgHIABgRIAAgHQgHADgNADg");
	this.shape_4.setTransform(143.625,152.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("AgQBaIAAizIAhAAIAACzg");
	this.shape_5.setTransform(133.125,150.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("AgnA9QgKgGgFgKQgEgLAAgSIAAhSIAiAAIAAA8QAAAbACAGQACAGAFAEQAFADAIAAQAIAAAHgEQAHgFACgHQADgIAAgbIAAg3IAiAAIAACCIggAAIAAgUQgHALgLAGQgLAGgNAAQgNAAgLgGg");
	this.shape_6.setTransform(121.925,152.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#333333").s().p("AAZBDIAAhDQAAgUgCgGQgCgHgGgDQgFgDgGAAQgIAAgIAFQgHAEgCAJQgDAIAAAVIAAA7IgiAAIAAiCIAfAAIAAATQASgWAYAAQAMAAAKAEQAJAEAFAHQAFAGACAIQABAIAAAQIAABQg");
	this.shape_7.setTransform(106.65,152.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("AgxA5QgLgLAAgQQAAgMAFgIQAFgJAKgDQAJgFASgEQAYgEAJgEIAAgDQAAgKgFgFQgFgEgNAAQgJAAgFAEQgFADgDAJIgggFQAGgTANgJQAMgJAaAAQAWAAALAFQAMAGAEAIQAFAIAAAXIAAAnQAAASABAIQACAIAEAJIgiAAIgDgKIgBgEQgJAJgKAEQgJAEgMAAQgUAAgMgLgAAAAIQgOADgFADQgHAFAAAHQAAAHAGAGQAFAFAJAAQAIAAAIgGQAHgFACgHIABgRIAAgHQgHADgNADg");
	this.shape_8.setTransform(91.925,152.725);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#333333").s().p("AgpBDIAAiCIAfAAIAAATQAJgOAFgEQAHgEAJAAQALAAALAHIgKAeQgJgGgIAAQgHAAgFAEQgEAEgDALQgDAKAAAgIAAApg");
	this.shape_9.setTransform(81,152.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#333333").s().p("AgtBSQgNgLAAgSIAAgEIAnAFQABAHAEACQAFAEAJAAQAOAAAGgEQAFgDACgGQACgEAAgMIAAgTQgQAVgWAAQgaAAgQgWQgMgSAAgZQAAghAQgRQAQgRAXAAQAXAAAQAVIAAgSIAhAAIAAB0QAAAXgEALQgEAMgHAGQgHAHgLAEQgMADgRAAQghAAgOgLgAgTg4QgIAJAAAUQAAAVAIAJQAIAJALAAQAMAAAJgKQAJgIAAgUQAAgUgJgKQgIgKgNAAQgLAAgIAKg");
	this.shape_10.setTransform(67.175,155.225);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#333333").s().p("Ag3BaIgDgbIAPABQAMAAAGgHQAGgHADgLIgyiCIAlAAIAeBcIAfhcIAjAAIguB9IgIAXQgFALgEAGQgEAGgEAEQgGAEgHACQgIACgKAAQgKAAgKgCg");
	this.shape_11.setTransform(198.725,125.375);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#333333").s().p("AAZBDIAAhDQAAgUgDgGQgCgHgEgDQgGgDgHAAQgHAAgHAFQgIAEgDAJQgCAIAAAVIAAA7IgjAAIAAiCIAhAAIAAATQAQgWAaAAQALAAAJAEQAKAEAFAHQAEAGACAIQACAIABAQIAABQg");
	this.shape_12.setTransform(177.25,122.575);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#333333").s().p("AghBVQgQgIgJgQQgIgPAAgXQAAgRAIgPQAJgQAPgJQAPgIATAAQAdAAAUATQASATABAdQgBAdgSAUQgUATgdAAQgRAAgQgIgAgVgEQgKAJAAAUQAAATAKALQAJAKAMAAQAOAAAJgKQAJgLAAgTQAAgUgJgJQgJgKgOAAQgMAAgJAKgAgRg3IARglIAnAAIgiAlg");
	this.shape_13.setTransform(161.9,120.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#333333").s().p("AgQBaIAAiBIAhAAIAACBgAgQg5IAAggIAhAAIAAAgg");
	this.shape_14.setTransform(150.675,120.225);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#333333").s().p("AgsAyQgQgSgBggQABgfAQgSQARgSAdAAQAXAAAPAKQAOAKAGAVIgiAGQgCgKgGgFQgGgFgKAAQgMAAgHAJQgIAJAAAVQAAAWAIAJQAIAKAMAAQAJAAAHgGQAGgFADgOIAiAGQgGAXgOAMQgQAMgZAAQgcAAgRgSg");
	this.shape_15.setTransform(140.35,122.725);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#333333").s().p("AgxA5QgLgLAAgQQAAgMAFgIQAFgJAKgDQAJgFASgEQAYgEAJgEIAAgDQAAgKgFgFQgFgEgNAAQgJAAgFAEQgFADgDAJIgggFQAGgTANgJQAMgJAaAAQAWAAALAFQAMAGAEAIQAFAIAAAXIAAAnQAAASABAIQACAIAEAJIgiAAIgDgKIgBgEQgJAJgKAEQgJAEgMAAQgUAAgMgLgAAAAIQgOADgFADQgHAFAAAHQAAAHAGAGQAFAFAJAAQAIAAAIgGQAHgFACgHIABgRIAAgHQgHADgNADg");
	this.shape_16.setTransform(126.175,122.725);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#333333").s().p("AAZBDIAAhDQAAgUgDgGQgCgHgEgDQgGgDgHAAQgHAAgHAFQgIAEgDAJQgCAIAAAVIAAA7IgjAAIAAiCIAhAAIAAATQAQgWAaAAQALAAAJAEQAKAEAFAHQAEAGACAIQACAIABAQIAABQg");
	this.shape_17.setTransform(111.55,122.575);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#333333").s().p("AgQBaIAAiBIAhAAIAACBgAgQg5IAAggIAhAAIAAAgg");
	this.shape_18.setTransform(100.325,120.225);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#333333").s().p("AgYBcIAAhnIgTAAIAAgbIATAAIAAgKQAAgQADgIQAEgIAJgGQAJgFAOAAQAPAAAOAFIgFAYQgIgCgIAAQgHAAgDADQgEAEAAAKIAAAJIAaAAIAAAbIgaAAIAABng");
	this.shape_19.setTransform(93.125,120.075);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#333333").s().p("AgvAuQgNgSAAgbQAAggARgSQARgSAaAAQAcAAARATQARATgBAnIhWAAQABAPAIAJQAIAIAKAAQAJAAAFgEQAGgEADgKIAiAFQgHATgOAKQgOAKgWAAQghAAgQgWgAgRghQgHAJAAAOIAyAAQAAgPgHgIQgIgIgKAAQgLAAgHAIg");
	this.shape_20.setTransform(81.3028,122.725);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#333333").s().p("AAlBaIgagnQgNgVgFgFQgFgGgGgCQgGgCgMAAIgIAAIAABLIgkAAIAAizIBNAAQAbAAANAFQANAFAJAMQAHAMAAAQQAAAVgMANQgMAMgXAEQAMAHAHAIQAIAIANAVIAWAjgAgsgNIAbAAQAaAAAGgCQAHgCAEgGQADgFAAgIQAAgJgFgGQgFgGgJgBQgEgBgVAAIgdAAg");
	this.shape_21.setTransform(66.2,120.225);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#C76E5F").s().p("AhYClQgjgcgGgxIBKgHQADAZAQAOQAPAPAVAAQAVAAARgTQAQgTAAgmQAAgkgQgRQgQgRgZAAQggAAgZAbIg8gIIAmjJIDDAAIAABFIiLAAIgMBCQAagMAYAAQAxAAAiAkQAjAjAAA5QAAAvgcAmQgmAzhCAAQg1AAghgdg");
	this.shape_22.setTransform(32.6,32.25);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AnhMVQkHkHgBl1QAAhPANhKQAijVCEitQgRgfgcgcQhJhIhlgFIgHAAIgDAAIgHAAQgygCgqgTQgsgTgmgmQhOhNAAhuQAAhuBOhOQAlglAtgTQAwgVA6AAQBtAABOBNQBOBOgBBuIAAARQgHAagCAeIAAARQgBBuBOBNIACACQDDi2D+gqQBMgOBTAAQF1AAEHEIQEJEHgBF0QABF1kJEHQkHEIl1AAQlzAAkIkIg");
	this.shape_23.setTransform(117.1283,116.4289,1.08,1.08);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(153,153,153,0.796)").s().p("AnlMZQkJkJABl3QAAhQAMhJQAijWCDisQgQgegagZQhIhHhigFIgCAAIgGAAIgDAAIgGAAIgBAAQhngFhLhKQhPhPAAhwQAAhwBPhPQBQhPBvAAQBxAABPBPQBOBPAABwIAAAPIgBAGQgHAZgBAbIAAAAIgBARQAABrBLBLQDDi0D8gqQBOgOBTAAQF3AAEJEJQEJEJABF2QgBF3kJEJQkJEJl3AAQl2AAkJkJgAvMvLQhNBMAABsQAABsBNBMQBHBHBjAFIABAAIAGAAIADAAIAHAAIABAAQBnAFBJBKQAdAcASAgIABADIgBACQiECsgjDTQgMBKABBPQgBFzEHEGQEFEGFyAAQFzAAEGkGQEGkGABlzQgBlykGkGQkGkGlzAAQhTAAhMAOQj8AqjBC1QgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAIgBgCQhQhPAAhwIABgRIAAgBQACgcAGgZIABgEIAAgPQAAhshLhMQhNhMhsAAQhrAAhMBMg");
	this.shape_24.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#999999").s().p("AnWMLQkDkEAAluQgBhOAMhJQAijRCCipIAAgBQADgDABgFQAAgEgCgEQgUghgcgdQhNhNhqgFIgBAAIgIAAIgDAAIgGAAIAAAAQhggFhEhEQhJhKAAhnQAAhoBJhJQBJhJBnAAQBoAABJBJQBJBJAABoIAAAOIAAACQgHAagCAeIAAASQgBB0BSBSIACACQAFAEAFAAIABAAQAGAAAFgEQC/izD5gpQBMgOBRAAQFuAAEEEEQEDEDABFtQgBFukDEEQkEEDluAAQltAAkDkDg");
	this.shape_25.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(153,153,153,0.898)").s().p("AndMSQkHkGABlzQgBhPAMhKQAjjTCEisIABgCIgBgDQgSgggdgcQhJhKhngFIgBAAIgHAAIgDAAIgGAAIgBAAQhjgFhHhHQhNhMAAhsQAAhsBNhMQBMhMBrAAQBsAABNBMQBLBMAABsIAAAPIgBAEQgGAZgCAcIAAABIgBARQAABwBQBPIABACQABAAAAAAQAAABABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABgBQAAAAABAAQDBi1D8gqQBMgOBTAAQFzAAEGEGQEGEGABFyQgBFzkGEGQkGEGlzAAQlyAAkFkGgAvFvEQhJBJAABoQAABnBJBKQBEBEBgAFIAAAAIAGAAIADAAIAIAAIABAAQBqAFBNBNQAcAdAUAhQACAEAAAEQgBAFgDADIAAABQiCCpgiDRQgMBJABBOQAAFuEDEEQEDEDFtAAQFuAAEEkDQEDkEABluQgBltkDkDQkEkEluAAQhRAAhMAOQj5Api/CzQgFAEgGAAIgBAAQgFAAgFgEIgCgCQhShSABh0IAAgSQACgeAHgaIAAgCIAAgOQAAhohJhJQhJhJhoAAQhnAAhJBJg");
	this.shape_26.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(153,153,153,0.094)").s().p("AoWNKQkdkdAAmUQgBhVANhQQAijMBziqIgGgGQgzgzhJgEIgGAAIgBAAIgGAAIgFAAQiBgGheheQhjhjAAiNQAAiNBjhkQBjhjCNAAQCNAABkBjQBjBkAACNIAAAAIAAAUIgDATQgFASgBAUIAAAAIAAANQAAArARAlQC8iWDrgnIAAAAQBTgPBZAAQGUAAEeEeQEeEdAAGTQAAGUkeEdQkeEemUAAQmTAAkdkegAqGmCQh2CqghDOQgNBOAABVQABGQEaEaQEbEbGOAAQGQAAEakbQEbkaAAmQQAAmPkbkaQkakbmQAAQhZAAhSAPIABAAQjvAoi+CaQgYgrABg0IAAgOQABgVAFgSIADgRIABgUIAAAAQgBiJhghgIAAgBQhhhgiJAAQiIAAhhBgIAAABQhgBgAACJQAACJBgBgIAAAAQBbBbB+AGIAEAAIAGAAIACAAIAGAAQBMAEA2A2IAAAAIALANg");
	this.shape_27.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("rgba(153,153,153,0.498)").s().p("An5MuQkTkSAAmDQAAhSANhMQAijSB9isQgMgRgQgQQg+g/hXgEIgFAAIgCAAIgDAAIgGAAIgCAAQhzgFhShTQhZhYAAh8QAAh9BZhXQBXhYB8AAQB9AABYBYQBYBXAAB9IAAAAIgBASIgCALQgGAVgBAZIAAAPQgBBQAwA8QDBipD3gpIAAABQBPgPBWAAQGDAAETESQERESAAGCQAAGDkRESQkTESmDAAQmCAAkRkSgApTmDQiACsgiDTQgNBMAABRQAAF/EQEPQEOEPF+AAQF/AAEPkPIABAAQEOkPAAl/QAAl+kPkPQkOkPmAAAQhVAAhOAOQj6AqjBCsQg4hBgBhZIABgQQACgZAFgXIACgJIABgRIAAAAQgBh5hVhUQhUhVh5AAQh4AAhUBVQhWBUAAB5QAAB4BWBVQBPBQBvAFIACAAIAGAAIADAAIADAAIAEAAQBbAFBBBBIAAAAQAUATAOAVg");
	this.shape_28.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("rgba(153,153,153,0.396)").s().p("AoBM1QkVkVAAmHQABhTANhNQAhjRB6irQgKgOgLgMQg9g8hTgEIgFAAIgBAAIgDAAIgGAAIgDAAQh3gFhUhWQhchbABiAQgBiBBchaQBahbCAAAQCBAABbBbQBbBaAACBIAAAAIgBASIgCANQgFAVgCAXIAAAPQAABHAmA2QDBikD1goIgBAAQBQgPBXAAQGIAAEUEVQEWEVgBGGQABGHkWEVQkUEVmIAAQmGAAkVkVgAvovnQhZBXAAB9QAAB8BZBYQBSBTBzAFIACAAIAGAAIADAAIACAAIAFAAQBXAEA+A/QAQAQAMARQh9CsgiDSQgNBMAABSQAAGDETESQERESGCAAQGDAAETkSQERkSAAmDQAAmCkRkSQkTkSmDAAQhWAAhPAPIAAgBQj3ApjBCpQgwg8ABhQIAAgPQABgZAGgVIACgLIABgSIAAAAQAAh9hYhXQhYhYh9AAQh8AAhXBYg");
	this.shape_29.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(153,153,153,0.698)").s().p("AnsMgQkMkMABl7QAAhQAMhLQAijUCBitQgPgZgWgWQhFhEhfgFIgDAAIgEAAIgDAAIgGAAIgBAAQhrgFhOhNQhShSAAh0QAAh0BShSQBThSBzAAQB1AABRBSQBSBSAAB0IAAAQIgBAIQgHAXgBAbIgBAQQAABiBCBHQDCixD7gqIAAAAQBNgOBVAAQF7AAEMEMQEMEMABF6QgBF7kMEMQkMEMl7AAQl6AAkMkMgAvUvSQhPBPAABwQAABwBPBPQBLBKBnAFIABAAIAGAAIADAAIAGAAIACAAQBiAFBIBHQAaAZAQAeQiDCsgiDWQgMBJAABQQgBF3EJEJQEJEJF2AAQF3AAEJkJQEJkJABl3QgBl2kJkJQkJkJl3AAQhTAAhOAOQj8AqjDC0QhLhLAAhrIABgRIAAAAQABgbAHgZIABgGIAAgPQAAhwhOhPQhPhPhxAAQhvAAhQBPg");
	this.shape_30.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("rgba(153,153,153,0.596)").s().p("AnyMnQkQkPAAl/QAAhRANhMQAijTCAisQgOgVgUgTIAAAAQhBhBhbgFIgEAAIgDAAIgDAAIgGAAIgCAAQhvgFhPhQQhWhVAAh4QAAh5BWhUQBUhVB4AAQB5AABUBVQBVBUABB5IAAAAIgBARIgCAJQgFAXgCAZIgBAQQABBZA4BBQDBisD6gqQBOgOBVAAQGAAAEOEPQEPEPAAF+QAAF/kOEPIgBAAQkPEPl/AAQl+AAkOkPgAvbvZQhSBSAAB0QAAB0BSBSQBOBNBrAFIABAAIAGAAIADAAIAEAAIADAAQBfAFBFBEQAWAWAPAZQiBCtgiDUQgMBLAABQQgBF7EMEMQEMEMF6AAQF7AAEMkMQEMkMABl7QgBl6kMkMQkMkMl7AAQhVAAhNAOIAAAAQj7AqjCCxQhChHAAhiIABgQQABgbAHgXIABgIIAAgQQAAh0hShSQhRhSh1AAQhzAAhTBSg");
	this.shape_31.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(153,153,153,0.294)").s().p("AoIM8IAAAAQkYkYAAmLQABhUANhNQAhjQB5irIgRgTQg6g5hPgEIgGAAIAAAAIgDAAIgGAAIgDAAQh6gGhZhYQheheABiEQgBiFBehdQBeheCEAAQCFAABeBeQBeBdAACFIAAAAIgBATIgCAPQgGAUgBAWIAAAOQAAA+AeAxQDAigDxgoIAAAAQBRgPBYAAQGLAAEYEYIAAAAQEYEXAAGLQAAGLkYEYQkYEYmLAAQmLAAkXkYgAvvvuQhcBaABCBQgBCABcBbQBUBWB3AFIADAAIAGAAIADAAIABAAIAFAAQBTAEA9A8QALAMAKAOQh6CrghDRQgNBNgBBTQAAGHEVEVQEVEVGGAAQGIAAEUkVQEWkVgBmHQABmGkWkVQkUkVmIAAQhXAAhQAPIABAAQj1AojBCkQgmg2AAhHIAAgPQACgXAFgVIACgNIABgSIAAAAQAAiBhbhaQhbhbiBAAQiAAAhaBbg");
	this.shape_32.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("rgba(153,153,153,0.196)").s().p("AoPNDQkakagBmQQAAhVANhOQAhjOB2iqIgLgNIAAAAQg2g2hMgEIgGAAIgCAAIgGAAIgEAAQh+gGhbhbIAAAAQhghgAAiJQAAiJBghgIAAgBQBhhgCIAAQCJAABhBgIAAABQBgBgABCJIAAAAIgBAUIgDARQgFASgBAVIAAAOQgBA0AYArQC+iaDvgoIgBAAQBSgPBZAAQGQAAEaEbQEbEaAAGPQAAGQkbEaQkaEbmQAAQmOAAkbkbgACaRUQGLAAEYkYQEYkYAAmLQAAmLkYkXIAAAAQkYkYmLAAQhYAAhRAPIAAAAQjxAojACgQgegxAAg+IAAgOQABgWAGgUIACgPIABgTIAAAAQAAiFhehdQheheiFAAQiEAAheBeQheBdABCFQgBCEBeBeQBZBYB6AGIADAAIAGAAIADAAIAAAAIAGAAQBPAEA6A5IARATQh5CrghDQQgNBNgBBUQAAGLEYEYIAAAAQEXEYGLAAg");
	this.shape_33.setTransform(119.8467,119.7467,1.0611,1.0611);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.lf(["#EAB0A6","#C76E5F"],[0,1],7.3,-9.2,31.9,65.6).s().p("APkJ2QADjnhgjRQiTlAkyiuQk4ixliAoQlnApkFD2Qj9Dtg+FVIgMgBQAYiPA5iHQBtj/DaiqQEjjkFxgWIAAhiIAsABQFhAWEnDDQEgC+CbE1QB/EAgEEdg");
	this.shape_34.setTransform(125.9,203.95,1.08,1.08,180,0,0,-0.3,-0.1);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.lf(["#EAB0A6","#C76E5F"],[0,1],7.3,-9.2,31.9,65.6).s().p("APkJ2QADjnhgjRQiTlAkyiuQk4ixliAoQlnApkFD2Qj9Dtg+FVIgMgBQAYiPA5iHQBtj/DaiqQEjjkFxgWIAAhiIAsABQFhAWEnDDQEgC+CbE1QB/EAgEEdg");
	this.shape_35.setTransform(143.45,67.9,1.08,1.08,0,0,0,-0.2,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_23}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,269.3,271.9);


(lib.btn4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("AAZBDIAAhDQAAgUgDgGQgBgHgGgDQgFgDgGAAQgIAAgIAFQgHAEgDAJQgCAIAAAVIAAA7IgiAAIAAiCIAfAAIAAATQASgWAYAAQAMAAAKAEQAJAEAFAHQAFAGACAIQABAIAAAQIAABQg");
	this.shape.setTransform(185.85,139.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AghBVQgRgIgIgQQgJgPAAgXQAAgRAJgPQAIgQAQgJQAQgIASAAQAeAAASATQAUATgBAdQABAdgUAUQgTATgdAAQgRAAgQgIgAgWgEQgJAJAAAUQAAATAJALQAJAKANAAQANAAAKgKQAJgLAAgTQAAgUgJgJQgKgKgNAAQgNAAgJAKgAgRg3IARglIAmAAIgiAlg");
	this.shape_1.setTransform(170.5,136.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AgQBaIAAiBIAhAAIAACBgAgQg5IAAggIAhAAIAAAgg");
	this.shape_2.setTransform(159.275,136.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AgrAyQgSgSABggQgBgfASgSQARgSAcAAQAXAAAPAKQAOAKAGAVIgiAGQgCgKgGgFQgGgFgJAAQgMAAgIAJQgIAJAAAVQAAAWAIAJQAIAKAMAAQAKAAAGgGQAGgFADgOIAhAGQgFAXgPAMQgOAMgaAAQgbAAgRgSg");
	this.shape_3.setTransform(148.95,139.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AgQBaIAAiBIAhAAIAACBgAgQg5IAAggIAhAAIAAAgg");
	this.shape_4.setTransform(138.225,136.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("AgvBKQgQgTAAggQAAggAQgSQAPgRAYAAQAVAAAQASIAAhBIAjAAIAAC0IggAAIAAgTQgIALgLAFQgLAGgKAAQgXAAgQgSgAgTgIQgJAJAAAUQAAAVAGAJQAJANAOAAQALAAAJgKQAIgKAAgUQAAgXgIgIQgIgKgNAAQgLAAgIAJg");
	this.shape_5.setTransform(126.825,137.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("AAZBDIAAhDQAAgUgDgGQgBgHgGgDQgEgDgIAAQgIAAgHAFQgHAEgDAJQgCAIAAAVIAAA7IgjAAIAAiCIAhAAIAAATQARgWAYAAQAMAAAKAEQAJAEAFAHQAEAGACAIQACAIAAAQIAABQg");
	this.shape_6.setTransform(111.8,139.325);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#333333").s().p("AgnA9QgKgGgFgKQgEgLAAgSIAAhSIAiAAIAAA8QAAAbACAGQACAGAFAEQAFADAIAAQAIAAAHgEQAHgFACgHQADgIAAgbIAAg3IAiAAIAACCIggAAIAAgUQgHALgLAGQgLAGgNAAQgNAAgLgGg");
	this.shape_7.setTransform(96.375,139.625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("Ag9BaIAAizIB7AAIAAAeIhWAAIAAArIBKAAIAAAeIhKAAIAABMg");
	this.shape_8.setTransform(81.375,136.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#9F948F").s().p("AATDCIAAhOIidAAIAAhBICmj0IA/AAIAAD0IAwAAIAABBIgwAAIAABOgAhEAzIBXAAIAAiDg");
	this.shape_9.setTransform(29.05,31.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AnhMVQkHkHgBl1QAAhPANhKQAijVCEitQgRgfgcgcQhJhIhlgFIgHAAIgDAAIgHAAQgygCgqgTQgsgTgmgmQhOhNAAhuQAAhuBOhOQAlglAtgTQAwgVA6AAQBtAABOBNQBOBOgBBuIAAARQgHAagCAeIAAARQgBBuBOBNIACACQDDi2D+gqQBMgOBTAAQF1AAEHEIQEJEHgBF0QABF1kJEHQkHEIl1AAQlzAAkIkIg");
	this.shape_10.setTransform(117.0783,117.5289,1.08,1.08);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(153,153,153,0.796)").s().p("AnlMZQkJkJABl3QAAhQAMhJQAijWCDisQgQgegagZQhIhHhigFIgCAAIgGAAIgDAAIgGAAIgBAAQhngFhLhKQhPhPAAhwQAAhwBPhPQBQhPBvAAQBxAABPBPQBOBPAABwIAAAPIgBAGQgHAZgBAbIAAAAIgBARQAABrBLBLQDDi0D8gqQBOgOBTAAQF3AAEJEJQEJEJABF2QgBF3kJEJQkJEJl3AAQl2AAkJkJgAvMvLQhNBMAABsQAABsBNBMQBHBHBjAFIABAAIAGAAIADAAIAHAAIABAAQBnAFBJBKQAdAcASAgIABADIgBACQiECsgjDTQgMBKABBPQgBFzEHEGQEFEGFyAAQFzAAEGkGQEGkGABlzQgBlykGkGQkGkGlzAAQhTAAhMAOQj8AqjBC1QgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAIgBgCQhQhPAAhwIABgRIAAgBQACgcAGgZIABgEIAAgPQAAhshLhMQhNhMhsAAQhrAAhMBMg");
	this.shape_11.setTransform(119.8467,120.7467,1.0611,1.0611);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#999999").s().p("AnWMLQkDkEAAluQgBhOAMhJQAijRCCipIAAgBQADgDABgFQAAgEgCgEQgUghgcgdQhNhNhqgFIgBAAIgIAAIgDAAIgGAAIAAAAQhggFhEhEQhJhKAAhnQAAhoBJhJQBJhJBnAAQBoAABJBJQBJBJAABoIAAAOIAAACQgHAagCAeIAAASQgBB0BSBSIACACQAFAEAFAAIABAAQAGAAAFgEQC/izD5gpQBMgOBRAAQFuAAEEEEQEDEDABFtQgBFukDEEQkEEDluAAQltAAkDkDg");
	this.shape_12.setTransform(119.8467,120.7467,1.0611,1.0611);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(153,153,153,0.898)").s().p("AndMSQkHkGABlzQgBhPAMhKQAjjTCEisIABgCIgBgDQgSgggdgcQhJhKhngFIgBAAIgHAAIgDAAIgGAAIgBAAQhjgFhHhHQhNhMAAhsQAAhsBNhMQBMhMBrAAQBsAABNBMQBLBMAABsIAAAPIgBAEQgGAZgCAcIAAABIgBARQAABwBQBPIABACQABAAAAAAQAAABABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABgBQAAAAABAAQDBi1D8gqQBMgOBTAAQFzAAEGEGQEGEGABFyQgBFzkGEGQkGEGlzAAQlyAAkFkGgAvFvEQhJBJAABoQAABnBJBKQBEBEBgAFIAAAAIAGAAIADAAIAIAAIABAAQBqAFBNBNQAcAdAUAhQACAEAAAEQgBAFgDADIAAABQiCCpgiDRQgMBJABBOQAAFuEDEEQEDEDFtAAQFuAAEEkDQEDkEABluQgBltkDkDQkEkEluAAQhRAAhMAOQj5Api/CzQgFAEgGAAIgBAAQgFAAgFgEIgCgCQhShSABh0IAAgSQACgeAHgaIAAgCIAAgOQAAhohJhJQhJhJhoAAQhnAAhJBJg");
	this.shape_13.setTransform(119.8467,120.7467,1.0611,1.0611);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(153,153,153,0.094)").s().p("AoWNKQkdkdAAmUQgBhVANhQQAijMBziqIgGgGQgzgzhJgEIgGAAIgBAAIgGAAIgFAAQiBgGheheQhjhjAAiNQAAiNBjhkQBjhjCNAAQCNAABkBjQBjBkAACNIAAAAIAAAUIgDATQgFASgBAUIAAAAIAAANQAAArARAlQC8iWDrgnIAAAAQBTgPBZAAQGUAAEeEeQEeEdAAGTQAAGUkeEdQkeEemUAAQmTAAkdkegAqGmCQh2CqghDOQgNBOAABVQABGQEaEaQEbEbGOAAQGQAAEakbQEbkaAAmQQAAmPkbkaQkakbmQAAQhZAAhSAPIABAAQjvAoi+CaQgYgrABg0IAAgOQABgVAFgSIADgRIABgUIAAAAQgBiJhghgIAAgBQhhhgiJAAQiIAAhhBgIAAABQhgBgAACJQAACJBgBgIAAAAQBbBbB+AGIAEAAIAGAAIACAAIAGAAQBMAEA2A2IAAAAIALANg");
	this.shape_14.setTransform(119.8467,120.7467,1.0611,1.0611);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(153,153,153,0.498)").s().p("An5MuQkTkSAAmDQAAhSANhMQAijSB9isQgMgRgQgQQg+g/hXgEIgFAAIgCAAIgDAAIgGAAIgCAAQhzgFhShTQhZhYAAh8QAAh9BZhXQBXhYB8AAQB9AABYBYQBYBXAAB9IAAAAIgBASIgCALQgGAVgBAZIAAAPQgBBQAwA8QDBipD3gpIAAABQBPgPBWAAQGDAAETESQERESAAGCQAAGDkRESQkTESmDAAQmCAAkRkSgApTmDQiACsgiDTQgNBMAABRQAAF/EQEPQEOEPF+AAQF/AAEPkPIABAAQEOkPAAl/QAAl+kPkPQkOkPmAAAQhVAAhOAOQj6AqjBCsQg4hBgBhZIABgQQACgZAFgXIACgJIABgRIAAAAQgBh5hVhUQhUhVh5AAQh4AAhUBVQhWBUAAB5QAAB4BWBVQBPBQBvAFIACAAIAGAAIADAAIADAAIAEAAQBbAFBBBBIAAAAQAUATAOAVg");
	this.shape_15.setTransform(119.8467,120.7467,1.0611,1.0611);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(153,153,153,0.396)").s().p("AoBM1QkVkVAAmHQABhTANhNQAhjRB6irQgKgOgLgMQg9g8hTgEIgFAAIgBAAIgDAAIgGAAIgDAAQh3gFhUhWQhchbABiAQgBiBBchaQBahbCAAAQCBAABbBbQBbBaAACBIAAAAIgBASIgCANQgFAVgCAXIAAAPQAABHAmA2QDBikD1goIgBAAQBQgPBXAAQGIAAEUEVQEWEVgBGGQABGHkWEVQkUEVmIAAQmGAAkVkVgAvovnQhZBXAAB9QAAB8BZBYQBSBTBzAFIACAAIAGAAIADAAIACAAIAFAAQBXAEA+A/QAQAQAMARQh9CsgiDSQgNBMAABSQAAGDETESQERESGCAAQGDAAETkSQERkSAAmDQAAmCkRkSQkTkSmDAAQhWAAhPAPIAAgBQj3ApjBCpQgwg8ABhQIAAgPQABgZAGgVIACgLIABgSIAAAAQAAh9hYhXQhYhYh9AAQh8AAhXBYg");
	this.shape_16.setTransform(119.8467,120.7467,1.0611,1.0611);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(153,153,153,0.698)").s().p("AnsMgQkMkMABl7QAAhQAMhLQAijUCBitQgPgZgWgWQhFhEhfgFIgDAAIgEAAIgDAAIgGAAIgBAAQhrgFhOhNQhShSAAh0QAAh0BShSQBThSBzAAQB1AABRBSQBSBSAAB0IAAAQIgBAIQgHAXgBAbIgBAQQAABiBCBHQDCixD7gqIAAAAQBNgOBVAAQF7AAEMEMQEMEMABF6QgBF7kMEMQkMEMl7AAQl6AAkMkMgAvUvSQhPBPAABwQAABwBPBPQBLBKBnAFIABAAIAGAAIADAAIAGAAIACAAQBiAFBIBHQAaAZAQAeQiDCsgiDWQgMBJAABQQgBF3EJEJQEJEJF2AAQF3AAEJkJQEJkJABl3QgBl2kJkJQkJkJl3AAQhTAAhOAOQj8AqjDC0QhLhLAAhrIABgRIAAAAQABgbAHgZIABgGIAAgPQAAhwhOhPQhPhPhxAAQhvAAhQBPg");
	this.shape_17.setTransform(119.8467,120.7467,1.0611,1.0611);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(153,153,153,0.596)").s().p("AnyMnQkQkPAAl/QAAhRANhMQAijTCAisQgOgVgUgTIAAAAQhBhBhbgFIgEAAIgDAAIgDAAIgGAAIgCAAQhvgFhPhQQhWhVAAh4QAAh5BWhUQBUhVB4AAQB5AABUBVQBVBUABB5IAAAAIgBARIgCAJQgFAXgCAZIgBAQQABBZA4BBQDBisD6gqQBOgOBVAAQGAAAEOEPQEPEPAAF+QAAF/kOEPIgBAAQkPEPl/AAQl+AAkOkPgAvbvZQhSBSAAB0QAAB0BSBSQBOBNBrAFIABAAIAGAAIADAAIAEAAIADAAQBfAFBFBEQAWAWAPAZQiBCtgiDUQgMBLAABQQgBF7EMEMQEMEMF6AAQF7AAEMkMQEMkMABl7QgBl6kMkMQkMkMl7AAQhVAAhNAOIAAAAQj7AqjCCxQhChHAAhiIABgQQABgbAHgXIABgIIAAgQQAAh0hShSQhRhSh1AAQhzAAhTBSg");
	this.shape_18.setTransform(119.8467,120.7467,1.0611,1.0611);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(153,153,153,0.294)").s().p("AoIM8IAAAAQkYkYAAmLQABhUANhNQAhjQB5irIgRgTQg6g5hPgEIgGAAIAAAAIgDAAIgGAAIgDAAQh6gGhZhYQheheABiEQgBiFBehdQBeheCEAAQCFAABeBeQBeBdAACFIAAAAIgBATIgCAPQgGAUgBAWIAAAOQAAA+AeAxQDAigDxgoIAAAAQBRgPBYAAQGLAAEYEYIAAAAQEYEXAAGLQAAGLkYEYQkYEYmLAAQmLAAkXkYgAvvvuQhcBaABCBQgBCABcBbQBUBWB3AFIADAAIAGAAIADAAIABAAIAFAAQBTAEA9A8QALAMAKAOQh6CrghDRQgNBNgBBTQAAGHEVEVQEVEVGGAAQGIAAEUkVQEWkVgBmHQABmGkWkVQkUkVmIAAQhXAAhQAPIABAAQj1AojBCkQgmg2AAhHIAAgPQACgXAFgVIACgNIABgSIAAAAQAAiBhbhaQhbhbiBAAQiAAAhaBbg");
	this.shape_19.setTransform(119.8467,120.7467,1.0611,1.0611);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(153,153,153,0.196)").s().p("AoPNDQkakagBmQQAAhVANhOQAhjOB2iqIgLgNIAAAAQg2g2hMgEIgGAAIgCAAIgGAAIgEAAQh+gGhbhbIAAAAQhghgAAiJQAAiJBghgIAAgBQBhhgCIAAQCJAABhBgIAAABQBgBgABCJIAAAAIgBAUIgDARQgFASgBAVIAAAOQgBA0AYArQC+iaDvgoIgBAAQBSgPBZAAQGQAAEaEbQEbEaAAGPQAAGQkbEaQkaEbmQAAQmOAAkbkbgACaRUQGLAAEYkYQEYkYAAmLQAAmLkYkXIAAAAQkYkYmLAAQhYAAhRAPIAAAAQjxAojACgQgegxAAg+IAAgOQABgWAGgUIACgPIABgTIAAAAQAAiFhehdQheheiFAAQiEAAheBeQheBdABCFQgBCEBeBeQBZBYB6AGIADAAIAGAAIADAAIAAAAIAGAAQBPAEA6A5IARATQh5CrghDQQgNBNgBBUQAAGLEYEYIAAAAQEXEYGLAAg");
	this.shape_20.setTransform(119.8467,120.7467,1.0611,1.0611);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.lf(["#9F948F","#605956"],[0,1],30.7,-30,55.3,44.8).s().p("AA0J0QlhgWknjDQkgi+iak1QiAkAAEkdICnAAQgDDnBgDRQCTFAEzCuQE3CxFigoQFngpEGj2QD8jtA+lWIAMACQgYCPg5CHQhtD/jaCqQkjDklxAWIAABiIgsgBg");
	this.shape_21.setTransform(125.6,202.25,1.08,1.08,0,0,0,0,-0.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.lf(["#9F948F","#605956"],[0,1],7.3,-9.2,31.9,65.6).s().p("APkJ2QADjnhgjRQiTlAkziuQk3ixliAoQlnApkGD2Qj8Dtg+FVIgMgBQAYiPA5iHQBtj/DaiqQEjjkFxgWIAAhiIAsABQFhAWEnDDQEgC+CaE1QCAEAgEEdg");
	this.shape_22.setTransform(143.45,67.9,1.08,1.08,0,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_10}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,269.2,270.5);


(lib.btn3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("AAZBDIAAhDQAAgUgDgGQgCgHgEgDQgFgDgIAAQgHAAgIAFQgHAEgDAJQgCAIAAAVIAAA7IgjAAIAAiCIAhAAIAAATQARgWAZAAQALAAAKAEQAJAEAFAHQAEAGACAIQACAIAAAQIAABQg");
	this.shape.setTransform(197.4,137.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AghBVQgQgIgJgQQgIgPAAgXQAAgRAIgPQAJgQAPgJQAPgIATAAQAdAAAUATQASATABAdQgBAdgSAUQgUATgdAAQgRAAgQgIgAgVgEQgKAJAAAUQAAATAKALQAIAKANAAQAOAAAJgKQAJgLAAgTQAAgUgJgJQgJgKgOAAQgNAAgIAKgAgRg3IARglIAnAAIgiAlg");
	this.shape_1.setTransform(182.05,134.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AgQBaIAAiBIAhAAIAACBgAgQg5IAAggIAhAAIAAAgg");
	this.shape_2.setTransform(170.775,134.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AgsAyQgRgSAAggQAAgfARgSQASgSAcAAQAYAAAOAKQAOAKAGAVIgiAGQgCgKgGgFQgGgFgJAAQgNAAgHAJQgIAJAAAVQAAAWAIAJQAHAKANAAQAJAAAHgGQAGgFADgOIAhAGQgEAXgPAMQgPAMgaAAQgbAAgSgSg");
	this.shape_3.setTransform(160.45,137.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AgxA5QgLgLAAgQQAAgMAFgIQAFgJAKgDQAJgFASgEQAYgEAJgEIAAgDQAAgKgFgFQgFgEgNAAQgJAAgFAEQgFADgDAJIgggFQAGgTANgJQAMgJAaAAQAWAAALAFQAMAGAEAIQAFAIAAAXIAAAnQAAASABAIQACAIAEAJIgiAAIgDgKIgBgEQgJAJgKAEQgJAEgMAAQgUAAgMgLgAAAAIQgOADgFADQgHAFAAAHQAAAHAGAGQAFAFAJAAQAIAAAIgGQAHgFACgHIABgRIAAgHQgHADgNADg");
	this.shape_4.setTransform(146.275,137.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("AAZBDIAAhDQAAgUgDgGQgCgHgEgDQgGgDgHAAQgHAAgIAFQgHAEgDAJQgCAIAAAVIAAA7IgjAAIAAiCIAhAAIAAATQARgWAZAAQALAAAKAEQAJAEAFAHQAEAGACAIQACAIAAAQIAABQg");
	this.shape_5.setTransform(131.7,137.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("AgQBaIAAiBIAhAAIAACBgAgQg5IAAggIAhAAIAAAgg");
	this.shape_6.setTransform(120.425,134.975);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#333333").s().p("AgrAyQgRgSgBggQABgfARgSQAQgSAdAAQAXAAAPAKQAOAKAGAVIgiAGQgCgKgGgFQgGgFgKAAQgLAAgIAJQgIAJAAAVQAAAWAIAJQAIAKAMAAQAJAAAHgGQAGgFADgOIAiAGQgFAXgQAMQgPAMgZAAQgcAAgQgSg");
	this.shape_7.setTransform(110.1,137.475);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("AgQBaIAAizIAhAAIAACzg");
	this.shape_8.setTransform(99.425,134.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#333333").s().p("AgxA5QgLgLAAgQQAAgMAFgIQAFgJAKgDQAJgFASgEQAYgEAJgEIAAgDQAAgKgFgFQgFgEgNAAQgJAAgFAEQgFADgDAJIgggFQAGgTANgJQAMgJAaAAQAWAAALAFQAMAGAEAIQAFAIAAAXIAAAnQAAASABAIQACAIAEAJIgiAAIgDgKIgBgEQgJAJgKAEQgJAEgMAAQgUAAgMgLgAAAAIQgOADgFADQgHAFAAAHQAAAHAGAGQAFAFAJAAQAIAAAIgGQAHgFACgHIABgRIAAgHQgHADgNADg");
	this.shape_9.setTransform(88.925,137.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#333333").s().p("Ag2BFQgYgZAAgqQAAgsAYgZQAXgZAlAAQAhAAAUATQANAMAGAWIgkAIQgDgOgLgIQgKgIgOAAQgTAAgMAOQgNAPAAAgQAAAhANAPQAMAOASAAQAPAAAKgJQALgJAEgUIAkALQgJAegSAOQgUAOgdAAQgiAAgXgYg");
	this.shape_10.setTransform(72.75,134.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#DEAE81").s().p("AhXCnQgjgegFgxIBHgJQAEAcAPAOQAPAPAVAAQAWAAAQgRQAPgSAAgdQAAgcgPgRQgPgQgVAAQgNAAgUAFIAIg7QAdABAQgOQAQgOAAgXQAAgTgMgMQgMgLgSAAQgTAAgNANQgOANgDAZIhEgLQAHgjAPgVQAOgVAagMQAZgMAgAAQA2AAAhAiQAbAdAAAkQAAAzg4AeQAiAHAUAYQATAZAAAjQAAAzglAjQglAkg2AAQg1AAgigeg");
	this.shape_11.setTransform(32.075,32.375);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AnhMVQkHkHgBl1QAAhPANhKQAijVCEitQgRgfgcgcQhJhIhlgFIgHAAIgDAAIgHAAQgygCgqgTQgsgTgmgmQhOhNAAhuQAAhuBOhOQAlglAtgTQAwgVA6AAQBtAABOBNQBOBOgBBuIAAARQgHAagCAeIAAARQgBBuBOBNIACACQDDi2D+gqQBMgOBTAAQF1AAEHEIQEJEHgBF0QABF1kJEHQkHEIl1AAQlzAAkIkIg");
	this.shape_12.setTransform(117.2,117.1,1.08,1.08,0,0,0,0.1,0.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(153,153,153,0.796)").s().p("AnlMZQkJkJABl3QAAhQAMhJQAijWCDisQgQgegagZQhIhHhigFIgCAAIgGAAIgDAAIgGAAIgBAAQhngFhLhKQhPhPAAhwQAAhwBPhPQBQhPBvAAQBxAABPBPQBOBPAABwIAAAPIgBAGQgHAZgBAbIAAAAIgBARQAABrBLBLQDDi0D8gqQBOgOBTAAQF3AAEJEJQEJEJABF2QgBF3kJEJQkJEJl3AAQl2AAkJkJgAvMvLQhNBMAABsQAABsBNBMQBHBHBjAFIABAAIAGAAIADAAIAHAAIABAAQBnAFBJBKQAdAcASAgIABADIgBACQiECsgjDTQgMBKABBPQgBFzEHEGQEFEGFyAAQFzAAEGkGQEGkGABlzQgBlykGkGQkGkGlzAAQhTAAhMAOQj8AqjBC1QgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAIgBgCQhQhPAAhwIABgRIAAgBQACgcAGgZIABgEIAAgPQAAhshLhMQhNhMhsAAQhrAAhMBMg");
	this.shape_13.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#999999").s().p("AnWMLQkDkEAAluQgBhOAMhJQAijRCCipIAAgBQADgDABgFQAAgEgCgEQgUghgcgdQhNhNhqgFIgBAAIgIAAIgDAAIgGAAIAAAAQhggFhEhEQhJhKAAhnQAAhoBJhJQBJhJBnAAQBoAABJBJQBJBJAABoIAAAOIAAACQgHAagCAeIAAASQgBB0BSBSIACACQAFAEAFAAIABAAQAGAAAFgEQC/izD5gpQBMgOBRAAQFuAAEEEEQEDEDABFtQgBFukDEEQkEEDluAAQltAAkDkDg");
	this.shape_14.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(153,153,153,0.898)").s().p("AndMSQkHkGABlzQgBhPAMhKQAjjTCEisIABgCIgBgDQgSgggdgcQhJhKhngFIgBAAIgHAAIgDAAIgGAAIgBAAQhjgFhHhHQhNhMAAhsQAAhsBNhMQBMhMBrAAQBsAABNBMQBLBMAABsIAAAPIgBAEQgGAZgCAcIAAABIgBARQAABwBQBPIABACQABAAAAAAQAAABABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABgBQAAAAABAAQDBi1D8gqQBMgOBTAAQFzAAEGEGQEGEGABFyQgBFzkGEGQkGEGlzAAQlyAAkFkGgAvFvEQhJBJAABoQAABnBJBKQBEBEBgAFIAAAAIAGAAIADAAIAIAAIABAAQBqAFBNBNQAcAdAUAhQACAEAAAEQgBAFgDADIAAABQiCCpgiDRQgMBJABBOQAAFuEDEEQEDEDFtAAQFuAAEEkDQEDkEABluQgBltkDkDQkEkEluAAQhRAAhMAOQj5Api/CzQgFAEgGAAIgBAAQgFAAgFgEIgCgCQhShSABh0IAAgSQACgeAHgaIAAgCIAAgOQAAhohJhJQhJhJhoAAQhnAAhJBJg");
	this.shape_15.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(153,153,153,0.094)").s().p("AoWNKQkdkdAAmUQgBhVANhQQAijMBziqIgGgGQgzgzhJgEIgGAAIgBAAIgGAAIgFAAQiBgGheheQhjhjAAiNQAAiNBjhkQBjhjCNAAQCNAABkBjQBjBkAACNIAAAAIAAAUIgDATQgFASgBAUIAAAAIAAANQAAArARAlQC8iWDrgnIAAAAQBTgPBZAAQGUAAEeEeQEeEdAAGTQAAGUkeEdQkeEemUAAQmTAAkdkegAqGmCQh2CqghDOQgNBOAABVQABGQEaEaQEbEbGOAAQGQAAEakbQEbkaAAmQQAAmPkbkaQkakbmQAAQhZAAhSAPIABAAQjvAoi+CaQgYgrABg0IAAgOQABgVAFgSIADgRIABgUIAAAAQgBiJhghgIAAgBQhhhgiJAAQiIAAhhBgIAAABQhgBgAACJQAACJBgBgIAAAAQBbBbB+AGIAEAAIAGAAIACAAIAGAAQBMAEA2A2IAAAAIALANg");
	this.shape_16.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(153,153,153,0.498)").s().p("An5MuQkTkSAAmDQAAhSANhMQAijSB9isQgMgRgQgQQg+g/hXgEIgFAAIgCAAIgDAAIgGAAIgCAAQhzgFhShTQhZhYAAh8QAAh9BZhXQBXhYB8AAQB9AABYBYQBYBXAAB9IAAAAIgBASIgCALQgGAVgBAZIAAAPQgBBQAwA8QDBipD3gpIAAABQBPgPBWAAQGDAAETESQERESAAGCQAAGDkRESQkTESmDAAQmCAAkRkSgApTmDQiACsgiDTQgNBMAABRQAAF/EQEPQEOEPF+AAQF/AAEPkPIABAAQEOkPAAl/QAAl+kPkPQkOkPmAAAQhVAAhOAOQj6AqjBCsQg4hBgBhZIABgQQACgZAFgXIACgJIABgRIAAAAQgBh5hVhUQhUhVh5AAQh4AAhUBVQhWBUAAB5QAAB4BWBVQBPBQBvAFIACAAIAGAAIADAAIADAAIAEAAQBbAFBBBBIAAAAQAUATAOAVg");
	this.shape_17.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(153,153,153,0.396)").s().p("AoBM1QkVkVAAmHQABhTANhNQAhjRB6irQgKgOgLgMQg9g8hTgEIgFAAIgBAAIgDAAIgGAAIgDAAQh3gFhUhWQhchbABiAQgBiBBchaQBahbCAAAQCBAABbBbQBbBaAACBIAAAAIgBASIgCANQgFAVgCAXIAAAPQAABHAmA2QDBikD1goIgBAAQBQgPBXAAQGIAAEUEVQEWEVgBGGQABGHkWEVQkUEVmIAAQmGAAkVkVgAvovnQhZBXAAB9QAAB8BZBYQBSBTBzAFIACAAIAGAAIADAAIACAAIAFAAQBXAEA+A/QAQAQAMARQh9CsgiDSQgNBMAABSQAAGDETESQERESGCAAQGDAAETkSQERkSAAmDQAAmCkRkSQkTkSmDAAQhWAAhPAPIAAgBQj3ApjBCpQgwg8ABhQIAAgPQABgZAGgVIACgLIABgSIAAAAQAAh9hYhXQhYhYh9AAQh8AAhXBYg");
	this.shape_18.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(153,153,153,0.698)").s().p("AnsMgQkMkMABl7QAAhQAMhLQAijUCBitQgPgZgWgWQhFhEhfgFIgDAAIgEAAIgDAAIgGAAIgBAAQhrgFhOhNQhShSAAh0QAAh0BShSQBThSBzAAQB1AABRBSQBSBSAAB0IAAAQIgBAIQgHAXgBAbIgBAQQAABiBCBHQDCixD7gqIAAAAQBNgOBVAAQF7AAEMEMQEMEMABF6QgBF7kMEMQkMEMl7AAQl6AAkMkMgAvUvSQhPBPAABwQAABwBPBPQBLBKBnAFIABAAIAGAAIADAAIAGAAIACAAQBiAFBIBHQAaAZAQAeQiDCsgiDWQgMBJAABQQgBF3EJEJQEJEJF2AAQF3AAEJkJQEJkJABl3QgBl2kJkJQkJkJl3AAQhTAAhOAOQj8AqjDC0QhLhLAAhrIABgRIAAAAQABgbAHgZIABgGIAAgPQAAhwhOhPQhPhPhxAAQhvAAhQBPg");
	this.shape_19.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(153,153,153,0.596)").s().p("AnyMnQkQkPAAl/QAAhRANhMQAijTCAisQgOgVgUgTIAAAAQhBhBhbgFIgEAAIgDAAIgDAAIgGAAIgCAAQhvgFhPhQQhWhVAAh4QAAh5BWhUQBUhVB4AAQB5AABUBVQBVBUABB5IAAAAIgBARIgCAJQgFAXgCAZIgBAQQABBZA4BBQDBisD6gqQBOgOBVAAQGAAAEOEPQEPEPAAF+QAAF/kOEPIgBAAQkPEPl/AAQl+AAkOkPgAvbvZQhSBSAAB0QAAB0BSBSQBOBNBrAFIABAAIAGAAIADAAIAEAAIADAAQBfAFBFBEQAWAWAPAZQiBCtgiDUQgMBLAABQQgBF7EMEMQEMEMF6AAQF7AAEMkMQEMkMABl7QgBl6kMkMQkMkMl7AAQhVAAhNAOIAAAAQj7AqjCCxQhChHAAhiIABgQQABgbAHgXIABgIIAAgQQAAh0hShSQhRhSh1AAQhzAAhTBSg");
	this.shape_20.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(153,153,153,0.294)").s().p("AoIM8IAAAAQkYkYAAmLQABhUANhNQAhjQB5irIgRgTQg6g5hPgEIgGAAIAAAAIgDAAIgGAAIgDAAQh6gGhZhYQheheABiEQgBiFBehdQBeheCEAAQCFAABeBeQBeBdAACFIAAAAIgBATIgCAPQgGAUgBAWIAAAOQAAA+AeAxQDAigDxgoIAAAAQBRgPBYAAQGLAAEYEYIAAAAQEYEXAAGLQAAGLkYEYQkYEYmLAAQmLAAkXkYgAvvvuQhcBaABCBQgBCABcBbQBUBWB3AFIADAAIAGAAIADAAIABAAIAFAAQBTAEA9A8QALAMAKAOQh6CrghDRQgNBNgBBTQAAGHEVEVQEVEVGGAAQGIAAEUkVQEWkVgBmHQABmGkWkVQkUkVmIAAQhXAAhQAPIABAAQj1AojBCkQgmg2AAhHIAAgPQACgXAFgVIACgNIABgSIAAAAQAAiBhbhaQhbhbiBAAQiAAAhaBbg");
	this.shape_21.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(153,153,153,0.196)").s().p("AoPNDQkakagBmQQAAhVANhOQAhjOB2iqIgLgNIAAAAQg2g2hMgEIgGAAIgCAAIgGAAIgEAAQh+gGhbhbIAAAAQhghgAAiJQAAiJBghgIAAgBQBhhgCIAAQCJAABhBgIAAABQBgBgABCJIAAAAIgBAUIgDARQgFASgBAVIAAAOQgBA0AYArQC+iaDvgoIgBAAQBSgPBZAAQGQAAEaEbQEbEaAAGPQAAGQkbEaQkaEbmQAAQmOAAkbkbgACaRUQGLAAEYkYQEYkYAAmLQAAmLkYkXIAAAAQkYkYmLAAQhYAAhRAPIAAAAQjxAojACgQgegxAAg+IAAgOQABgWAGgUIACgPIABgTIAAAAQAAiFhehdQheheiFAAQiEAAheBeQheBdABCFQgBCEBeBeQBZBYB6AGIADAAIAGAAIADAAIAAAAIAGAAQBPAEA6A5IARATQh5CrghDQQgNBNgBBUQAAGLEYEYIAAAAQEXEYGLAAg");
	this.shape_22.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.lf(["#DEAE81","#B46C29"],[0,1],25.1,-25.1,62.4,44.2).s().p("AA0JzQlhgVknjDQkgi+ibk1Qh/kAAEkcICnAAQgDDmBgDSQCTE/EyCvQE4CwFigoQFngoEFj3QD9jtA+lVIAMABQgYCQg5CGQhtD/jaCqQkjDjlxAYIAABiIgsgDg");
	this.shape_23.setTransform(125.65,202.2,1.08,1.08,0,0,0,0.3,-0.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.lf(["#DEAE81","#B46C29"],[0,1],7.7,-9.2,32.3,65.6).s().p("APkJ1QADjmhgjSQiTk/kyivQk4iwliAoQlnAokFD3Qj9Dtg+FWIgMgCQAYiQA5iFQBtkADaiqQEjjjFxgYIAAhiIAsADQFhAUEnDEQEgC+CbE1QB/EAgEEcg");
	this.shape_24.setTransform(143.35,67.85,1.08,1.08,0,0,0,0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_12}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.3,0,269.3,270.4);


(lib.btn2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("AgdA2QgPgHgIgOQgHgPAAgSQAAgQAHgOQAIgPAOgHQAOgIAQAAQAaAAARARQARARAAAaQAAAbgRARQgRARgaAAQgPAAgOgHgAgTgaQgJAKAAAQQAAASAJAJQAIAJALAAQAMAAAIgJQAIgJAAgSQAAgQgIgKQgIgJgMAAQgLAAgIAJg");
	this.shape.setTransform(175.325,155.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AgqBCQgOgRAAgdQAAgcAOgQQAOgPAVAAQATAAAOAQIAAg6IAfAAIAACgIgdAAIAAgRQgGAKgLAFQgJAFgJAAQgUAAgPgQgAgRgHQgHAIAAARQAAATAFAIQAIAMAMAAQALAAAHgJQAHgJAAgSQAAgUgHgIQgHgIgMAAQgKAAgHAIg");
	this.shape_1.setTransform(161.25,153.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AgrA0QgLgLAAgPQAAgJAFgIQAFgHAIgEQAJgEAQgDQAUgEAJgEIAAgCQAAgJgFgFQgEgDgLAAQgIAAgFADQgFADgDAJIgcgGQAFgQAMgJQALgIAXAAQAUAAAKAFQAKAFAEAHQAEAIAAAUIAAAjQAAAQABAHQACAHAEAJIgfAAIgDgJIgBgEQgIAHgJAEQgIAEgKAAQgSAAgKgJgAAAAHQgNADgEACQgGAFAAAHQAAAGAFAFQAFAEAHAAQAIABAHgGQAGgFACgFIABgQIAAgGIgSAFg");
	this.shape_2.setTransform(148.425,155.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AgnAtQgPgQAAgdQAAgcAPgQQAPgQAaAAQAUAAAOAJQAMAKAGASIgfAGQgCgKgFgEQgFgEgJgBQgKAAgHAJQgIAHAAATQAAAUAIAIQAGAJALAAQAJAAAGgFQAFgFACgMIAfAFQgFAVgNALQgOAKgWAAQgZAAgPgQg");
	this.shape_3.setTransform(136.1,155.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AgqAqQgMgRAAgYQAAgcAQgRQAPgQAXAAQAZAAAPARQAPARgBAjIhMAAQAAAOAHAHQAIAIAJAAQAIAAAEgEQAFgEADgJIAfAFQgGARgNAKQgNAIgTAAQgdAAgPgTgAgPgdQgHAIABAMIAtAAQgBgNgGgHQgHgHgJAAQgJAAgHAHg");
	this.shape_4.setTransform(123.253,155.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("AgjA0QgOgKgEgRIAfgFQABAKAHAEQAGAFAJAAQAMAAAGgEQAFgDAAgGQAAgEgDgCQgCgCgIgBQgkgJgKgHQgOgIAAgRQAAgPAMgLQAMgKAZAAQAXAAAMAIQALAIAFAPIgeAFQgBgGgGgEQgFgEgJABQgMgBgFAEQgEACAAAEQAAAEAEABQAEAEAXAFQAZAGAKAIQAJAIAAAOQAAAQgNAMQgNALgbAAQgWAAgOgJg");
	this.shape_5.setTransform(110.575,155.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("AgxBQIgCgYIAMABQAMAAAEgGQAFgHADgJIgsh0IAhAAIAbBSIAbhSIAgAAIgpBvIgHAUQgEAKgEAGQgEAFgEAEQgFADgGACQgIACgJAAQgIAAgJgCg");
	this.shape_6.setTransform(92,158.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#333333").s().p("AAWA8IAAg8QAAgSgCgFQgCgGgEgDQgFgDgGAAQgHAAgGAEQgHAFgCAHQgCAHAAATIAAA1IgfAAIAAh0IAcAAIAAARQAQgUAWAAQAKAAAIAEQAJAEAEAGQAFAFABAHQACAIAAANIAABIg");
	this.shape_7.setTransform(217.125,128.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("AgdBMQgPgHgIgOQgHgOAAgUQAAgQAHgNQAIgOAOgIQAOgIAQAAQAaAAARASQARARAAAZQAAAbgRARQgRARgaAAQgPAAgOgHgAgTgDQgJAIAAARQAAASAJAJQAIAJALAAQAMAAAIgJQAIgJAAgSQAAgRgIgIQgIgJgMAAQgLAAgIAJgAgPgxIAPghIAiAAIgeAhg");
	this.shape_8.setTransform(203.425,126.575);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#333333").s().p("AgOBQIAAhzIAdAAIAABzgAgOgzIAAgdIAdAAIAAAdg");
	this.shape_9.setTransform(193.4,126.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#333333").s().p("AgnAtQgPgQAAgcQAAgcAPgQQAPgRAZAAQAWAAAMAKQANAJAFASIgeAGQgBgKgGgEQgFgFgJABQgKAAgIAHQgGAJAAASQAAAUAGAJQAIAIAKAAQAJAAAFgFQAGgFADgMIAeAFQgFAVgNAKQgOALgWAAQgZAAgPgQg");
	this.shape_10.setTransform(184.2,128.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#333333").s().p("AgrAzQgLgJAAgPQAAgKAFgIQAFgHAIgEQAJgEAQgDQAUgEAJgDIAAgEQAAgIgFgEQgEgEgLAAQgIAAgFADQgFAEgDAHIgcgEQAFgSAMgHQALgJAXAAQAUAAAKAFQAKAFAEAIQAEAHAAAUIAAAjQAAAPABAIQACAHAEAIIgfAAIgDgJIgBgDQgIAIgJAEQgIADgKAAQgSAAgKgKgAAAAHQgNADgEADQgGAEAAAGQAAAHAFAEQAFAGAHgBQAIAAAHgFQAGgEACgHIABgOIAAgGIgSAEg");
	this.shape_11.setTransform(171.525,128.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#333333").s().p("AgzA6IAAgYIAsgxIAPgRIgOAAIgpAAIAAgZIBgAAIAAAVIgtAzIgPARIAPgBIAwAAIAAAbg");
	this.shape_12.setTransform(159.575,128.825);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#333333").s().p("AgOBQIAAhzIAdAAIAABzgAgOgzIAAgdIAdAAIAAAdg");
	this.shape_13.setTransform(150.85,126.6);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#333333").s().p("AAWA8IAAg8QAAgSgCgFQgCgGgEgDQgFgDgGAAQgHAAgGAEQgHAFgCAHQgCAHAAATIAAA1IgfAAIAAh0IAcAAIAAARQAQgUAWAAQAKAAAIAEQAJAEAEAGQAFAFABAHQACAIAAANIAABIg");
	this.shape_14.setTransform(140.925,128.675);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#333333").s().p("AgqApQgMgPAAgZQAAgcAQgQQAPgRAXAAQAZAAAPASQAPAQgBAjIhMAAQAAAOAHAHQAIAIAJAAQAIAAAEgEQAFgEADgJIAfAGQgGARgNAIQgNAJgTAAQgdAAgPgUgAgPgdQgHAHABANIAtAAQgBgNgGgHQgHgHgJAAQgJAAgHAHg");
	this.shape_15.setTransform(127.653,128.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#333333").s().p("AgnBJQgNgKAAgPIAAgFIAjAFQABAGAEADQAEACAIAAQANABAFgEQAEgDADgFQABgDAAgLIAAgRQgOATgUAAQgYAAgNgUQgLgQAAgWQAAgeAOgPQAPgQAUAAQAVAAAOATIAAgPIAdAAIAABnQAAAUgEALQgDAKgGAGQgGAGgLADQgKADgQABQgcAAgMgLgAgRgyQgHAJAAARQAAATAHAIQAHAIAKAAQALAAAIgIQAHgIABgSQgBgSgHgJQgHgIgMgBQgKABgHAIg");
	this.shape_16.setTransform(114.35,131.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#333333").s().p("AgdA2QgPgHgIgPQgHgNAAgUQAAgPAHgPQAIgNAOgIQAOgIAQAAQAaAAARASQARAQAAAaQAAAbgRARQgRARgaAAQgPAAgOgHgAgTgZQgJAJAAAQQAAARAJAKQAIAJALAAQAMAAAIgJQAIgKAAgRQAAgQgIgJQgIgJgMAAQgLAAgIAJg");
	this.shape_17.setTransform(100.975,128.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#333333").s().p("AA3A8IAAhCQAAgRgDgFQgFgHgJAAQgGAAgGAEQgFAEgDAIQgDAHAAAQIAAA4IgdAAIAAg/QAAgRgCgFQgCgFgDgDQgEgCgGAAQgHAAgFAEQgGAEgDAHQgCAHAAAQIAAA5IgfAAIAAh0IAdAAIAAAQQAPgTAVAAQALAAAIAFQAIAFAFAJQAIgJAIgFQAJgFAKAAQANAAAJAGQAJAFAFAKQADAHAAARIAABKg");
	this.shape_18.setTransform(83.975,128.675);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#333333").s().p("AgdA2QgPgHgIgPQgHgNAAgUQAAgPAHgPQAIgNAOgIQAOgIAQAAQAaAAARASQARAQAAAaQAAAbgRARQgRARgaAAQgPAAgOgHgAgTgZQgJAJAAAQQAAARAJAKQAIAJALAAQAMAAAIgJQAIgKAAgRQAAgQgIgJQgIgJgMAAQgLAAgIAJg");
	this.shape_19.setTransform(67.225,128.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#333333").s().p("AAgBQIAAhGIg/AAIAABGIggAAIAAigIAgAAIAABAIA/AAIAAhAIAgAAIAACgg");
	this.shape_20.setTransform(52.125,126.6);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#829F93").s().p("AiBDCQAEgnAWgjQAVgjA+g5QAxgvALgQQAQgXAAgWQAAgZgOgNQgNgNgYAAQgWgBgNAOQgOAOgCAhIhKgHQAGg+AjgbQAjgaAzAAQA6AAAgAeQAhAgAAAtQAAAbgJAYQgKAXgUAYQgOASgjAgQgjAggIAKQgJALgGAKICSAAIAABFg");
	this.shape_21.setTransform(31.525,31.6);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AnhMVQkHkHgBl1QAAhPANhKQAijVCEitQgRgfgcgcQhJhIhlgFIgHAAIgDAAIgHAAQgygCgqgTQgsgTgmgmQhOhNAAhuQAAhuBOhOQAlglAtgTQAwgVA6AAQBtAABOBNQBOBOgBBuIAAARQgHAagCAeIAAARQgBBuBOBNIACACQDDi2D+gqQBMgOBTAAQF1AAEHEIQEJEHgBF0QABF1kJEHQkHEIl1AAQlzAAkIkIg");
	this.shape_22.setTransform(117.1283,117.9789,1.08,1.08);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(153,153,153,0.796)").s().p("AnlMZQkJkJABl3QAAhQAMhJQAijWCDisQgQgegagZQhIhHhigFIgCAAIgGAAIgDAAIgGAAIgBAAQhngFhLhKQhPhPAAhwQAAhwBPhPQBQhPBvAAQBxAABPBPQBOBPAABwIAAAPIgBAGQgHAZgBAbIAAAAIgBARQAABrBLBLQDDi0D8gqQBOgOBTAAQF3AAEJEJQEJEJABF2QgBF3kJEJQkJEJl3AAQl2AAkJkJgAvMvLQhNBMAABsQAABsBNBMQBHBHBjAFIABAAIAGAAIADAAIAHAAIABAAQBnAFBJBKQAdAcASAgIABADIgBACQiECsgjDTQgMBKABBPQgBFzEHEGQEFEGFyAAQFzAAEGkGQEGkGABlzQgBlykGkGQkGkGlzAAQhTAAhMAOQj8AqjBC1QgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAIgBgCQhQhPAAhwIABgRIAAgBQACgcAGgZIABgEIAAgPQAAhshLhMQhNhMhsAAQhrAAhMBMg");
	this.shape_23.setTransform(119.8467,121.2467,1.0611,1.0611);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#999999").s().p("AnWMLQkDkEAAluQgBhOAMhJQAijRCCipIAAgBQADgDABgFQAAgEgCgEQgUghgcgdQhNhNhqgFIgBAAIgIAAIgDAAIgGAAIAAAAQhggFhEhEQhJhKAAhnQAAhoBJhJQBJhJBnAAQBoAABJBJQBJBJAABoIAAAOIAAACQgHAagCAeIAAASQgBB0BSBSIACACQAFAEAFAAIABAAQAGAAAFgEQC/izD5gpQBMgOBRAAQFuAAEEEEQEDEDABFtQgBFukDEEQkEEDluAAQltAAkDkDg");
	this.shape_24.setTransform(119.8467,121.2467,1.0611,1.0611);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(153,153,153,0.898)").s().p("AndMSQkHkGABlzQgBhPAMhKQAjjTCEisIABgCIgBgDQgSgggdgcQhJhKhngFIgBAAIgHAAIgDAAIgGAAIgBAAQhjgFhHhHQhNhMAAhsQAAhsBNhMQBMhMBrAAQBsAABNBMQBLBMAABsIAAAPIgBAEQgGAZgCAcIAAABIgBARQAABwBQBPIABACQABAAAAAAQAAABABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABgBQAAAAABAAQDBi1D8gqQBMgOBTAAQFzAAEGEGQEGEGABFyQgBFzkGEGQkGEGlzAAQlyAAkFkGgAvFvEQhJBJAABoQAABnBJBKQBEBEBgAFIAAAAIAGAAIADAAIAIAAIABAAQBqAFBNBNQAcAdAUAhQACAEAAAEQgBAFgDADIAAABQiCCpgiDRQgMBJABBOQAAFuEDEEQEDEDFtAAQFuAAEEkDQEDkEABluQgBltkDkDQkEkEluAAQhRAAhMAOQj5Api/CzQgFAEgGAAIgBAAQgFAAgFgEIgCgCQhShSABh0IAAgSQACgeAHgaIAAgCIAAgOQAAhohJhJQhJhJhoAAQhnAAhJBJg");
	this.shape_25.setTransform(119.8467,121.2467,1.0611,1.0611);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(153,153,153,0.094)").s().p("AoWNKQkdkdAAmUQgBhVANhQQAijMBziqIgGgGQgzgzhJgEIgGAAIgBAAIgGAAIgFAAQiBgGheheQhjhjAAiNQAAiNBjhkQBjhjCNAAQCNAABkBjQBjBkAACNIAAAAIAAAUIgDATQgFASgBAUIAAAAIAAANQAAArARAlQC8iWDrgnIAAAAQBTgPBZAAQGUAAEeEeQEeEdAAGTQAAGUkeEdQkeEemUAAQmTAAkdkegAqGmCQh2CqghDOQgNBOAABVQABGQEaEaQEbEbGOAAQGQAAEakbQEbkaAAmQQAAmPkbkaQkakbmQAAQhZAAhSAPIABAAQjvAoi+CaQgYgrABg0IAAgOQABgVAFgSIADgRIABgUIAAAAQgBiJhghgIAAgBQhhhgiJAAQiIAAhhBgIAAABQhgBgAACJQAACJBgBgIAAAAQBbBbB+AGIAEAAIAGAAIACAAIAGAAQBMAEA2A2IAAAAIALANg");
	this.shape_26.setTransform(119.8467,121.2467,1.0611,1.0611);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(153,153,153,0.498)").s().p("An5MuQkTkSAAmDQAAhSANhMQAijSB9isQgMgRgQgQQg+g/hXgEIgFAAIgCAAIgDAAIgGAAIgCAAQhzgFhShTQhZhYAAh8QAAh9BZhXQBXhYB8AAQB9AABYBYQBYBXAAB9IAAAAIgBASIgCALQgGAVgBAZIAAAPQgBBQAwA8QDBipD3gpIAAABQBPgPBWAAQGDAAETESQERESAAGCQAAGDkRESQkTESmDAAQmCAAkRkSgApTmDQiACsgiDTQgNBMAABRQAAF/EQEPQEOEPF+AAQF/AAEPkPIABAAQEOkPAAl/QAAl+kPkPQkOkPmAAAQhVAAhOAOQj6AqjBCsQg4hBgBhZIABgQQACgZAFgXIACgJIABgRIAAAAQgBh5hVhUQhUhVh5AAQh4AAhUBVQhWBUAAB5QAAB4BWBVQBPBQBvAFIACAAIAGAAIADAAIADAAIAEAAQBbAFBBBBIAAAAQAUATAOAVg");
	this.shape_27.setTransform(119.8467,121.2467,1.0611,1.0611);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("rgba(153,153,153,0.396)").s().p("AoBM1QkVkVAAmHQABhTANhNQAhjRB6irQgKgOgLgMQg9g8hTgEIgFAAIgBAAIgDAAIgGAAIgDAAQh3gFhUhWQhchbABiAQgBiBBchaQBahbCAAAQCBAABbBbQBbBaAACBIAAAAIgBASIgCANQgFAVgCAXIAAAPQAABHAmA2QDBikD1goIgBAAQBQgPBXAAQGIAAEUEVQEWEVgBGGQABGHkWEVQkUEVmIAAQmGAAkVkVgAvovnQhZBXAAB9QAAB8BZBYQBSBTBzAFIACAAIAGAAIADAAIACAAIAFAAQBXAEA+A/QAQAQAMARQh9CsgiDSQgNBMAABSQAAGDETESQERESGCAAQGDAAETkSQERkSAAmDQAAmCkRkSQkTkSmDAAQhWAAhPAPIAAgBQj3ApjBCpQgwg8ABhQIAAgPQABgZAGgVIACgLIABgSIAAAAQAAh9hYhXQhYhYh9AAQh8AAhXBYg");
	this.shape_28.setTransform(119.8467,121.2467,1.0611,1.0611);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("rgba(153,153,153,0.698)").s().p("AnsMgQkMkMABl7QAAhQAMhLQAijUCBitQgPgZgWgWQhFhEhfgFIgDAAIgEAAIgDAAIgGAAIgBAAQhrgFhOhNQhShSAAh0QAAh0BShSQBThSBzAAQB1AABRBSQBSBSAAB0IAAAQIgBAIQgHAXgBAbIgBAQQAABiBCBHQDCixD7gqIAAAAQBNgOBVAAQF7AAEMEMQEMEMABF6QgBF7kMEMQkMEMl7AAQl6AAkMkMgAvUvSQhPBPAABwQAABwBPBPQBLBKBnAFIABAAIAGAAIADAAIAGAAIACAAQBiAFBIBHQAaAZAQAeQiDCsgiDWQgMBJAABQQgBF3EJEJQEJEJF2AAQF3AAEJkJQEJkJABl3QgBl2kJkJQkJkJl3AAQhTAAhOAOQj8AqjDC0QhLhLAAhrIABgRIAAAAQABgbAHgZIABgGIAAgPQAAhwhOhPQhPhPhxAAQhvAAhQBPg");
	this.shape_29.setTransform(119.8467,121.2467,1.0611,1.0611);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(153,153,153,0.596)").s().p("AnyMnQkQkPAAl/QAAhRANhMQAijTCAisQgOgVgUgTIAAAAQhBhBhbgFIgEAAIgDAAIgDAAIgGAAIgCAAQhvgFhPhQQhWhVAAh4QAAh5BWhUQBUhVB4AAQB5AABUBVQBVBUABB5IAAAAIgBARIgCAJQgFAXgCAZIgBAQQABBZA4BBQDBisD6gqQBOgOBVAAQGAAAEOEPQEPEPAAF+QAAF/kOEPIgBAAQkPEPl/AAQl+AAkOkPgAvbvZQhSBSAAB0QAAB0BSBSQBOBNBrAFIABAAIAGAAIADAAIAEAAIADAAQBfAFBFBEQAWAWAPAZQiBCtgiDUQgMBLAABQQgBF7EMEMQEMEMF6AAQF7AAEMkMQEMkMABl7QgBl6kMkMQkMkMl7AAQhVAAhNAOIAAAAQj7AqjCCxQhChHAAhiIABgQQABgbAHgXIABgIIAAgQQAAh0hShSQhRhSh1AAQhzAAhTBSg");
	this.shape_30.setTransform(119.8467,121.2467,1.0611,1.0611);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("rgba(153,153,153,0.294)").s().p("AoIM8IAAAAQkYkYAAmLQABhUANhNQAhjQB5irIgRgTQg6g5hPgEIgGAAIAAAAIgDAAIgGAAIgDAAQh6gGhZhYQheheABiEQgBiFBehdQBeheCEAAQCFAABeBeQBeBdAACFIAAAAIgBATIgCAPQgGAUgBAWIAAAOQAAA+AeAxQDAigDxgoIAAAAQBRgPBYAAQGLAAEYEYIAAAAQEYEXAAGLQAAGLkYEYQkYEYmLAAQmLAAkXkYgAvvvuQhcBaABCBQgBCABcBbQBUBWB3AFIADAAIAGAAIADAAIABAAIAFAAQBTAEA9A8QALAMAKAOQh6CrghDRQgNBNgBBTQAAGHEVEVQEVEVGGAAQGIAAEUkVQEWkVgBmHQABmGkWkVQkUkVmIAAQhXAAhQAPIABAAQj1AojBCkQgmg2AAhHIAAgPQACgXAFgVIACgNIABgSIAAAAQAAiBhbhaQhbhbiBAAQiAAAhaBbg");
	this.shape_31.setTransform(119.8467,121.2467,1.0611,1.0611);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(153,153,153,0.196)").s().p("AoPNDQkakagBmQQAAhVANhOQAhjOB2iqIgLgNIAAAAQg2g2hMgEIgGAAIgCAAIgGAAIgEAAQh+gGhbhbIAAAAQhghgAAiJQAAiJBghgIAAgBQBhhgCIAAQCJAABhBgIAAABQBgBgABCJIAAAAIgBAUIgDARQgFASgBAVIAAAOQgBA0AYArQC+iaDvgoIgBAAQBSgPBZAAQGQAAEaEbQEbEaAAGPQAAGQkbEaQkaEbmQAAQmOAAkbkbgACaRUQGLAAEYkYQEYkYAAmLQAAmLkYkXIAAAAQkYkYmLAAQhYAAhRAPIAAAAQjxAojACgQgegxAAg+IAAgOQABgWAGgUIACgPIABgTIAAAAQAAiFhehdQheheiFAAQiEAAheBeQheBdABCFQgBCEBeBeQBZBYB6AGIADAAIAGAAIADAAIAAAAIAGAAQBPAEA6A5IARATQh5CrghDQQgNBNgBBUQAAGLEYEYIAAAAQEXEYGLAAg");
	this.shape_32.setTransform(119.8467,121.2467,1.0611,1.0611);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.lf(["#829F93","#414C41"],[0,1],14.7,-67.4,94.8,38.6).s().p("ABXQjQpTgjnylKQnnlBkEoKQjXmvAGnhIEaAAQgGGFCjFiQD4IcIFElQINEqJXhDQJdhEG6mgQGqmRBopAIAUADQgoDxhgDjQi4GvlwEfQnrGApuAnIAAClIhLgDg");
	this.shape_33.setTransform(125.6685,203.4085,0.64,0.64);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.lf(["#829F93","#414C41"],[0,1],12.5,-15.6,54.1,110.8).s().p("AaRQmQAGmFijliQj4ocoFklQoNkqpXBDQpdBEm6GgQmqGRhoJAIgUgDQAojxBgjjQC4mvFwkfQHrmAJugnIAAilIBLADQJTAjHyFKQHnFBEEIKQDXGvgGHhg");
	this.shape_34.setTransform(143.55,68.9,0.64,0.64,0,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_22}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,269.3,271.4);


(lib.btn1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("AgxA5QgLgLAAgQQAAgMAFgIQAFgJAKgDQAJgFASgEQAYgEAJgEIAAgDQAAgKgFgFQgFgEgNAAQgJAAgFAEQgFADgDAJIgggFQAGgTANgJQAMgJAaAAQAWAAALAFQAMAGAEAIQAFAIAAAXIAAAnQAAASABAIQACAIAEAJIgiAAIgDgKIgBgEQgJAJgKAEQgJAEgMAAQgUAAgMgLgAAAAIQgOADgFADQgHAFAAAHQAAAHAGAGQAFAFAJAAQAIAAAIgGQAHgFACgHIABgRIAAgHQgHADgNADg");
	this.shape.setTransform(182.925,153.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AgYBcIAAiCIAhAAIAACCgAgbg2IARglIAmAAIghAlg");
	this.shape_1.setTransform(173.175,150.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AgpBDIAAiCIAfAAIAAATQAJgOAGgEQAGgEAIAAQAMAAALAHIgKAeQgJgGgHAAQgIAAgFAEQgEAEgDALQgDAKAAAgIAAApg");
	this.shape_2.setTransform(164.95,153.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AgvAuQgNgSAAgbQAAggARgSQARgSAaAAQAcAAARATQARATgBAnIhWAAQABAPAIAJQAIAIAKAAQAJAAAFgEQAGgEADgKIAiAFQgHATgOAKQgOAKgWAAQghAAgQgWgAgRghQgHAJAAAOIAyAAQAAgPgHgIQgIgIgKAAQgLAAgHAIg");
	this.shape_3.setTransform(151.9528,153.625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AAZBDIAAhDQAAgUgDgGQgBgHgGgDQgEgDgIAAQgIAAgHAFQgHAEgDAJQgCAIAAAVIAAA7IgjAAIAAiCIAhAAIAAATQARgWAYAAQAMAAAKAEQAJAEAFAHQAEAGACAIQACAIAAAQIAABQg");
	this.shape_4.setTransform(137.45,153.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("AgQBaIAAiBIAhAAIAACBgAgQg5IAAggIAhAAIAAAgg");
	this.shape_5.setTransform(126.225,151.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("AA+BDIAAhKQAAgTgEgGQgFgHgJAAQgIAAgHAEQgGAEgDAJQgCAJAAARIAAA/IgiAAIAAhHQAAgTgCgFQgCgGgEgDQgDgCgHAAQgIAAgHAEQgGAEgDAIQgDAIAAASIAABAIgiAAIAAiCIAgAAIAAASQARgVAXAAQANAAAKAFQAHAFAGALQAJgLAKgFQAKgFAMAAQAOAAAJAGQALAGAEALQAEAJAAASIAABTg");
	this.shape_6.setTransform(111.45,153.475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#333333").s().p("Ag3BaIgDgbIAPABQAMAAAGgHQAGgHADgLIgyiCIAlAAIAeBcIAfhcIAjAAIguB9IgIAXQgFALgEAGQgEAGgEAEQgGAEgHACQgIACgKAAQgKAAgKgCg");
	this.shape_7.setTransform(86.125,156.275);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("AAZBDIAAhDQAAgUgDgGQgBgHgGgDQgEgDgIAAQgHAAgIAFQgHAEgDAJQgCAIAAAVIAAA7IgiAAIAAiCIAgAAIAAATQAQgWAZAAQAMAAAKAEQAJAEAFAHQAEAGADAIQABAIAAAQIAABQg");
	this.shape_8.setTransform(199,123.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#333333").s().p("AghBVQgRgIgIgQQgJgPAAgXQAAgRAJgPQAIgQAQgJQAQgIASAAQAeAAATATQASATAAAdQAAAdgSAUQgUATgdAAQgRAAgQgIgAgWgEQgJAJAAAUQAAATAJALQAKAKAMAAQANAAAKgKQAJgLAAgTQAAgUgJgJQgKgKgNAAQgMAAgKAKgAgQg3IAQglIAnAAIgjAlg");
	this.shape_9.setTransform(183.7,121.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#333333").s().p("AgQBaIAAiBIAhAAIAACBgAgQg5IAAggIAhAAIAAAgg");
	this.shape_10.setTransform(172.425,121.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#333333").s().p("AgrAyQgSgSABggQgBgfASgSQAQgSAdAAQAXAAAPAKQAOAKAGAVIgiAGQgCgKgGgFQgGgFgJAAQgMAAgIAJQgIAJAAAVQAAAWAIAJQAIAKAMAAQAKAAAGgGQAGgFADgOIAhAGQgFAXgPAMQgPAMgZAAQgcAAgQgSg");
	this.shape_11.setTransform(162.1,123.625);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#333333").s().p("AgxA5QgLgLAAgQQAAgMAFgIQAFgJAKgDQAJgFASgEQAYgEAJgEIAAgDQAAgKgFgFQgFgEgNAAQgJAAgFAEQgFADgDAJIgggFQAGgTANgJQAMgJAaAAQAWAAALAFQAMAGAEAIQAFAIAAAXIAAAnQAAASABAIQACAIAEAJIgiAAIgDgKIgBgEQgJAJgKAEQgJAEgMAAQgUAAgMgLgAAAAIQgOADgFADQgHAFAAAHQAAAHAGAGQAFAFAJAAQAIAAAIgGQAHgFACgHIABgRIAAgHQgHADgNADg");
	this.shape_12.setTransform(147.925,123.625);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#333333").s().p("AgqBDIAAiCIAhAAIAAATQAIgOAFgEQAHgEAJAAQAMAAAKAHIgLAeQgIgGgIAAQgHAAgFAEQgEAEgDALQgDAKAAAgIAAApg");
	this.shape_13.setTransform(137,123.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#333333").s().p("AghA8QgRgIgIgQQgJgPAAgWQAAgRAJgQQAIgQAQgJQAPgIATAAQAeAAASATQAUATgBAdQABAdgUAUQgTATgdAAQgRAAgQgIgAgWgdQgJAKAAATQAAATAJALQAKAKAMAAQANAAAKgKQAJgLAAgTQAAgTgJgKQgKgKgNAAQgMAAgKAKg");
	this.shape_14.setTransform(123.5,123.625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#333333").s().p("AgQBaIAAizIAhAAIAACzg");
	this.shape_15.setTransform(112.275,121.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#333333").s().p("Ag/BbIAAizIAhAAIAAATQAGgKALgGQAKgFAMAAQAXAAAQARQAQASAAAgQAAAfgQATQgQASgXAAQgKAAgIgFQgJgEgKgKIAABBgAgUg1QgIAKAAASQAAAWAIAKQAJALAMAAQAMAAAIgKQAIgJAAgWQAAgVgJgJQgIgLgMABQgMgBgIALg");
	this.shape_16.setTransform(101.475,125.95);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#333333").s().p("AAaBBIgagoIgbAoIgoAAIAvhCIgtg/IAqAAIAXAkIAXgkIApAAIgsA9IAwBEg");
	this.shape_17.setTransform(86.375,123.625);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#333333").s().p("AhDBaIAAizICEAAIAAAeIhgAAIAAAoIBaAAIAAAeIhaAAIAAAxIBkAAIAAAeg");
	this.shape_18.setTransform(71.25,121.125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#49467A").s().p("AALDCIAAkWQgoAlg3ATIAAhDQAdgKAigaQAhgbANgjIA8AAIAAGDg");
	this.shape_19.setTransform(27.15,32.05);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AnhMVQkHkHgBl1QAAhPANhKQAijVCEitQgRgfgcgcQhJhIhlgFIgHAAIgDAAIgHAAQgygCgqgTQgsgTgmgmQhOhNAAhuQAAhuBOhOQAlglAtgTQAwgVA6AAQBtAABOBNQBOBOgBBuIAAARQgHAagCAeIAAARQgBBuBOBNIACACQDDi2D+gqQBMgOBTAAQF1AAEHEIQEJEHgBF0QABF1kJEHQkHEIl1AAQlzAAkIkIg");
	this.shape_20.setTransform(117.15,117.1,1.08,1.08,0,0,0,0.1,0.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(153,153,153,0.796)").s().p("AnlMZQkJkJABl3QAAhQAMhJQAijWCDisQgQgegagZQhIhHhigFIgCAAIgGAAIgDAAIgGAAIgBAAQhngFhLhKQhPhPAAhwQAAhwBPhPQBQhPBvAAQBxAABPBPQBOBPAABwIAAAPIgBAGQgHAZgBAbIAAAAIgBARQAABrBLBLQDDi0D8gqQBOgOBTAAQF3AAEJEJQEJEJABF2QgBF3kJEJQkJEJl3AAQl2AAkJkJgAvMvLQhNBMAABsQAABsBNBMQBHBHBjAFIABAAIAGAAIADAAIAHAAIABAAQBnAFBJBKQAdAcASAgIABADIgBACQiECsgjDTQgMBKABBPQgBFzEHEGQEFEGFyAAQFzAAEGkGQEGkGABlzQgBlykGkGQkGkGlzAAQhTAAhMAOQj8AqjBC1QgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAIgBgCQhQhPAAhwIABgRIAAgBQACgcAGgZIABgEIAAgPQAAhshLhMQhNhMhsAAQhrAAhMBMg");
	this.shape_21.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#999999").s().p("AnWMLQkDkEAAluQgBhOAMhJQAijRCCipIAAgBQADgDABgFQAAgEgCgEQgUghgcgdQhNhNhqgFIgBAAIgIAAIgDAAIgGAAIAAAAQhggFhEhEQhJhKAAhnQAAhoBJhJQBJhJBnAAQBoAABJBJQBJBJAABoIAAAOIAAACQgHAagCAeIAAASQgBB0BSBSIACACQAFAEAFAAIABAAQAGAAAFgEQC/izD5gpQBMgOBRAAQFuAAEEEEQEDEDABFtQgBFukDEEQkEEDluAAQltAAkDkDg");
	this.shape_22.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(153,153,153,0.898)").s().p("AndMSQkHkGABlzQgBhPAMhKQAjjTCEisIABgCIgBgDQgSgggdgcQhJhKhngFIgBAAIgHAAIgDAAIgGAAIgBAAQhjgFhHhHQhNhMAAhsQAAhsBNhMQBMhMBrAAQBsAABNBMQBLBMAABsIAAAPIgBAEQgGAZgCAcIAAABIgBARQAABwBQBPIABACQABAAAAAAQAAABABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABgBQAAAAABAAQDBi1D8gqQBMgOBTAAQFzAAEGEGQEGEGABFyQgBFzkGEGQkGEGlzAAQlyAAkFkGgAvFvEQhJBJAABoQAABnBJBKQBEBEBgAFIAAAAIAGAAIADAAIAIAAIABAAQBqAFBNBNQAcAdAUAhQACAEAAAEQgBAFgDADIAAABQiCCpgiDRQgMBJABBOQAAFuEDEEQEDEDFtAAQFuAAEEkDQEDkEABluQgBltkDkDQkEkEluAAQhRAAhMAOQj5Api/CzQgFAEgGAAIgBAAQgFAAgFgEIgCgCQhShSABh0IAAgSQACgeAHgaIAAgCIAAgOQAAhohJhJQhJhJhoAAQhnAAhJBJg");
	this.shape_23.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(153,153,153,0.094)").s().p("AoWNKQkdkdAAmUQgBhVANhQQAijMBziqIgGgGQgzgzhJgEIgGAAIgBAAIgGAAIgFAAQiBgGheheQhjhjAAiNQAAiNBjhkQBjhjCNAAQCNAABkBjQBjBkAACNIAAAAIAAAUIgDATQgFASgBAUIAAAAIAAANQAAArARAlQC8iWDrgnIAAAAQBTgPBZAAQGUAAEeEeQEeEdAAGTQAAGUkeEdQkeEemUAAQmTAAkdkegAqGmCQh2CqghDOQgNBOAABVQABGQEaEaQEbEbGOAAQGQAAEakbQEbkaAAmQQAAmPkbkaQkakbmQAAQhZAAhSAPIABAAQjvAoi+CaQgYgrABg0IAAgOQABgVAFgSIADgRIABgUIAAAAQgBiJhghgIAAgBQhhhgiJAAQiIAAhhBgIAAABQhgBgAACJQAACJBgBgIAAAAQBbBbB+AGIAEAAIAGAAIACAAIAGAAQBMAEA2A2IAAAAIALANg");
	this.shape_24.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(153,153,153,0.498)").s().p("An5MuQkTkSAAmDQAAhSANhMQAijSB9isQgMgRgQgQQg+g/hXgEIgFAAIgCAAIgDAAIgGAAIgCAAQhzgFhShTQhZhYAAh8QAAh9BZhXQBXhYB8AAQB9AABYBYQBYBXAAB9IAAAAIgBASIgCALQgGAVgBAZIAAAPQgBBQAwA8QDBipD3gpIAAABQBPgPBWAAQGDAAETESQERESAAGCQAAGDkRESQkTESmDAAQmCAAkRkSgApTmDQiACsgiDTQgNBMAABRQAAF/EQEPQEOEPF+AAQF/AAEPkPIABAAQEOkPAAl/QAAl+kPkPQkOkPmAAAQhVAAhOAOQj6AqjBCsQg4hBgBhZIABgQQACgZAFgXIACgJIABgRIAAAAQgBh5hVhUQhUhVh5AAQh4AAhUBVQhWBUAAB5QAAB4BWBVQBPBQBvAFIACAAIAGAAIADAAIADAAIAEAAQBbAFBBBBIAAAAQAUATAOAVg");
	this.shape_25.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(153,153,153,0.396)").s().p("AoBM1QkVkVAAmHQABhTANhNQAhjRB6irQgKgOgLgMQg9g8hTgEIgFAAIgBAAIgDAAIgGAAIgDAAQh3gFhUhWQhchbABiAQgBiBBchaQBahbCAAAQCBAABbBbQBbBaAACBIAAAAIgBASIgCANQgFAVgCAXIAAAPQAABHAmA2QDBikD1goIgBAAQBQgPBXAAQGIAAEUEVQEWEVgBGGQABGHkWEVQkUEVmIAAQmGAAkVkVgAvovnQhZBXAAB9QAAB8BZBYQBSBTBzAFIACAAIAGAAIADAAIACAAIAFAAQBXAEA+A/QAQAQAMARQh9CsgiDSQgNBMAABSQAAGDETESQERESGCAAQGDAAETkSQERkSAAmDQAAmCkRkSQkTkSmDAAQhWAAhPAPIAAgBQj3ApjBCpQgwg8ABhQIAAgPQABgZAGgVIACgLIABgSIAAAAQAAh9hYhXQhYhYh9AAQh8AAhXBYg");
	this.shape_26.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(153,153,153,0.698)").s().p("AnsMgQkMkMABl7QAAhQAMhLQAijUCBitQgPgZgWgWQhFhEhfgFIgDAAIgEAAIgDAAIgGAAIgBAAQhrgFhOhNQhShSAAh0QAAh0BShSQBThSBzAAQB1AABRBSQBSBSAAB0IAAAQIgBAIQgHAXgBAbIgBAQQAABiBCBHQDCixD7gqIAAAAQBNgOBVAAQF7AAEMEMQEMEMABF6QgBF7kMEMQkMEMl7AAQl6AAkMkMgAvUvSQhPBPAABwQAABwBPBPQBLBKBnAFIABAAIAGAAIADAAIAGAAIACAAQBiAFBIBHQAaAZAQAeQiDCsgiDWQgMBJAABQQgBF3EJEJQEJEJF2AAQF3AAEJkJQEJkJABl3QgBl2kJkJQkJkJl3AAQhTAAhOAOQj8AqjDC0QhLhLAAhrIABgRIAAAAQABgbAHgZIABgGIAAgPQAAhwhOhPQhPhPhxAAQhvAAhQBPg");
	this.shape_27.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("rgba(153,153,153,0.596)").s().p("AnyMnQkQkPAAl/QAAhRANhMQAijTCAisQgOgVgUgTIAAAAQhBhBhbgFIgEAAIgDAAIgDAAIgGAAIgCAAQhvgFhPhQQhWhVAAh4QAAh5BWhUQBUhVB4AAQB5AABUBVQBVBUABB5IAAAAIgBARIgCAJQgFAXgCAZIgBAQQABBZA4BBQDBisD6gqQBOgOBVAAQGAAAEOEPQEPEPAAF+QAAF/kOEPIgBAAQkPEPl/AAQl+AAkOkPgAvbvZQhSBSAAB0QAAB0BSBSQBOBNBrAFIABAAIAGAAIADAAIAEAAIADAAQBfAFBFBEQAWAWAPAZQiBCtgiDUQgMBLAABQQgBF7EMEMQEMEMF6AAQF7AAEMkMQEMkMABl7QgBl6kMkMQkMkMl7AAQhVAAhNAOIAAAAQj7AqjCCxQhChHAAhiIABgQQABgbAHgXIABgIIAAgQQAAh0hShSQhRhSh1AAQhzAAhTBSg");
	this.shape_28.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("rgba(153,153,153,0.294)").s().p("AoIM8IAAAAQkYkYAAmLQABhUANhNQAhjQB5irIgRgTQg6g5hPgEIgGAAIAAAAIgDAAIgGAAIgDAAQh6gGhZhYQheheABiEQgBiFBehdQBeheCEAAQCFAABeBeQBeBdAACFIAAAAIgBATIgCAPQgGAUgBAWIAAAOQAAA+AeAxQDAigDxgoIAAAAQBRgPBYAAQGLAAEYEYIAAAAQEYEXAAGLQAAGLkYEYQkYEYmLAAQmLAAkXkYgAvvvuQhcBaABCBQgBCABcBbQBUBWB3AFIADAAIAGAAIADAAIABAAIAFAAQBTAEA9A8QALAMAKAOQh6CrghDRQgNBNgBBTQAAGHEVEVQEVEVGGAAQGIAAEUkVQEWkVgBmHQABmGkWkVQkUkVmIAAQhXAAhQAPIABAAQj1AojBCkQgmg2AAhHIAAgPQACgXAFgVIACgNIABgSIAAAAQAAiBhbhaQhbhbiBAAQiAAAhaBbg");
	this.shape_29.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(153,153,153,0.196)").s().p("AoPNDQkakagBmQQAAhVANhOQAhjOB2iqIgLgNIAAAAQg2g2hMgEIgGAAIgCAAIgGAAIgEAAQh+gGhbhbIAAAAQhghgAAiJQAAiJBghgIAAgBQBhhgCIAAQCJAABhBgIAAABQBgBgABCJIAAAAIgBAUIgDARQgFASgBAVIAAAOQgBA0AYArQC+iaDvgoIgBAAQBSgPBZAAQGQAAEaEbQEbEaAAGPQAAGQkbEaQkaEbmQAAQmOAAkbkbgACaRUQGLAAEYkYQEYkYAAmLQAAmLkYkXIAAAAQkYkYmLAAQhYAAhRAPIAAAAQjxAojACgQgegxAAg+IAAgOQABgWAGgUIACgPIABgTIAAAAQAAiFhehdQheheiFAAQiEAAheBeQheBdABCFQgBCEBeBeQBZBYB6AGIADAAIAGAAIADAAIAAAAIAGAAQBPAEA6A5IARATQh5CrghDQQgNBNgBBUQAAGLEYEYIAAAAQEXEYGLAAg");
	this.shape_30.setTransform(119.8467,120.1967,1.0611,1.0611);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.lf(["#8682CE","#49467A"],[0,1],43.6,-52.9,85.2,73.4).s().p("ABXQjQpTgjnylKQnnlBkEoKQjXmvAGnhIEaAAQgGGFCjFiQD4IcIFElQINEqJXhDQJdhEG6mgQGqmRBopAIAUADQgoDxhgDjQi4GvlwEfQnrGApuAnIAAClIhLgDg");
	this.shape_31.setTransform(125.6846,202.4085,0.64,0.64);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.lf(["#8682CE","#49467A"],[0,1],12.4,-15.6,54,110.8).s().p("AaRQmQAGmFijliQj4ocoFklQoNkqpXBDQpdBEm6GgQmqGRhoJAIgUgDQAojxBgjjQC4mvFwkfQHrmAJugnIAAilIBLADQJTAjHyFKQHnFBEEIKQDXGvgGHhg");
	this.shape_32.setTransform(143.6,67.9,0.64,0.64,0,0,0,0,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_20}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,269.3,270.4);


(lib.btnvolver = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ABLCzIg1hOQgagqgLgLQgKgKgMgFQgLgDgZgBIgOAAIAACWIhJAAIAAllICYAAQA4AAAbAKQAaAJAPAZQAQAZAAAfQAAApgYAaQgYAZguAHQAXAOAPAQQAPAQAaAqIAsBGgAhXgaIA1AAQAzAAANgFQAMgFAIgKQAHgLABgQQAAgSgKgLQgKgLgRgDQgKgBgqAAIg4AAg");
	this.shape.setTransform(207.55,46.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AiHCzIAAllIEJAAIAAA9IjBAAIAABPICzAAIAAA7IizAAIAABiIDHAAIAAA8g");
	this.shape_1.setTransform(171.7,46.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgmCzIh/llIBNAAIBaEIIBYkIIBNAAIiBFlg");
	this.shape_2.setTransform(137.75,46.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("Ah9CxIAAlhIBIAAIAAElICzAAIAAA8g");
	this.shape_3.setTransform(110.7,46.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("Ah9CJQgwgxAAhWQAAg1ARglQAMgcAVgWQAVgVAZgLQAigOArAAQBPAAAvAxQAwAxAABXQAABWgvAyQgwAwhOAAQhPAAgvgwgAhHhcQgbAfAAA9QAAA9AcAfQAcAgAqgBQAsAAAbgfQAcgfAAg9QAAg9gbgfQgbgegtAAQgrAAgcAeg");
	this.shape_4.setTransform(74.875,46.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgmCzIiAllIBOAAIBaEIIBYkIIBMAAIiAFlg");
	this.shape_5.setTransform(38.65,46.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("A0yHMIAAuXMAplAAAIAAOXg");
	this.shape_6.setTransform(123.9908,42.1032,0.9365,1.0364,0,28.2331,0);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#835873").s().p("A0yHMIAAuXMAplAAAIAAOXg");
	this.shape_7.setTransform(127.9908,50.7532,0.9365,1.0364,0,28.2331,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.1,0.1,298.3,92.7);


(lib.btnplay = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AknF0QgzgeAAg7IAAo1QAAg7AzgdQAzgdAzAdIHpEbQAzAeAAA5QAAA7gzAdInpEbQgaAPgZAAQgaAAgZgOg");
	this.shape.setTransform(129.9801,125.9784,2,2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(8).p("Ar3zrIXvAAQDPAACTCSQCSCTAADPIAAXvQAADPiSCTQiTCSjPAAI3vAAQjPAAiTiSQiSiTAAjPIAA3vQAAjPCSiTQCTiSDPAAg");
	this.shape_1.setTransform(126.025,126.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,255,255,0.498)").s().p("Ar3TsQjPAAiTiSQiSiTAAjPIAA3vQAAjPCSiTQCTiSDPAAIXvAAQDPAACTCSQCSCTAADPIAAXvQAADPiSCTQiTCSjPAAg");
	this.shape_2.setTransform(126.025,126.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("Ar3UUQjgAAieieQieieAAjgIAA3vQAAjgCeieQCeieDgAAIXvAAQDgAACeCeQCeCeAADgIAAXvQAADgieCeQieCejgAAg");
	this.shape_3.setTransform(126.025,126.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-4,260.1,260.1);


// stage content:
(lib.prod_ferroniquel_v4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {home:604,pag1:606,pag2:1154,pag3:1874,pag4:2611,pag5:3030,pag6:3688};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,263,265,605,664,1152,1201,1872,1926,2609,2652,3028,3087,3403,3686,3743,4026];
	this.streamSoundSymbolsList[265] = [{id:"a2",startFrame:265,endFrame:603,loop:1,offset:0}];
	this.streamSoundSymbolsList[664] = [{id:"a3",startFrame:664,endFrame:1151,loop:1,offset:0}];
	this.streamSoundSymbolsList[1201] = [{id:"a4",startFrame:1201,endFrame:1872,loop:1,offset:0}];
	this.streamSoundSymbolsList[1926] = [{id:"a5",startFrame:1926,endFrame:2609,loop:1,offset:0}];
	this.streamSoundSymbolsList[2652] = [{id:"a6",startFrame:2652,endFrame:3010,loop:1,offset:0}];
	this.streamSoundSymbolsList[3087] = [{id:"a7",startFrame:3087,endFrame:3402,loop:1,offset:0}];
	this.streamSoundSymbolsList[3403] = [{id:"a8",startFrame:3403,endFrame:3684,loop:1,offset:0}];
	this.streamSoundSymbolsList[3743] = [{id:"a9",startFrame:3743,endFrame:4028,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_1 = function() {
		this.stop();
		v1=false;v2=false;v3=false;v4=false;v5=false;v6=false;
		
		function inicia(){
			this.btn_play.visible=false;
			arrancavid1();
			this.play();
		}
		this.btn_play.addEventListener("click", inicia.bind(this));
	}
	this.frame_263 = function() {
		ocultavid1();
	}
	this.frame_265 = function() {
		var soundInstance = playSound("a2",0);
		this.InsertIntoSoundStreamData(soundInstance,265,603,1);
	}
	this.frame_605 = function() {
		this.stop();
		ocultavid1();
		
		if(v1==true){
			this.v1.visible=true;
		} else {this.v1.visible=false};
		
		if(v2==true){
			this.v2.visible=true;
		} else {this.v2.visible=false};
		
		if(v3==true){
			this.v3.visible=true;
		} else {this.v3.visible=false};
		
		if(v4==true){
			this.v4.visible=true;
		} else {this.v4.visible=false};
		
		if(v5==true){
			this.v5.visible=true;
		} else {this.v5.visible=false};
		
		if(v6==true){
			this.v6.visible=true;
		} else {this.v6.visible=false};
		
		
		function go1(){
			v1=true;
			this.instr.visible=false;
			this.gotoAndPlay("pag1");
		}
		this.btn1.addEventListener("click", go1.bind(this));
		
		function go2(){
			v2=true;
			this.instr.visible=false;
			this.gotoAndPlay("pag2");
		}
		this.btn2.addEventListener("click", go2.bind(this));
		
		function go3(){
			v3=true;
			this.instr.visible=false;
			this.gotoAndPlay("pag3");
		}
		this.btn3.addEventListener("click", go3.bind(this));
		
		function go4(){
			v4=true;
			this.instr.visible=false;
			this.gotoAndPlay("pag4");
		}
		this.btn4.addEventListener("click", go4.bind(this));
		
		function go5(){
			v5=true;
			this.instr.visible=false;
			this.gotoAndPlay("pag5");
		}
		this.btn5.addEventListener("click", go5.bind(this));
		
		function go6(){
			v6=true;
			this.instr.visible=false;
			this.gotoAndPlay("pag6");
		}
		this.btn6.addEventListener("click", go6.bind(this));
	}
	this.frame_664 = function() {
		var soundInstance = playSound("a3",0);
		this.InsertIntoSoundStreamData(soundInstance,664,1151,1);
	}
	this.frame_1152 = function() {
		this.stop();
		
		function gohome(){
			this.gotoAndPlay("home");
		}
		this.btn_back.addEventListener("click", gohome.bind(this));
	}
	this.frame_1201 = function() {
		var soundInstance = playSound("a4",0);
		this.InsertIntoSoundStreamData(soundInstance,1201,1872,1);
	}
	this.frame_1872 = function() {
		this.stop();
		
		function gohome(){
			this.gotoAndPlay("home");
		}
		this.btn_back.addEventListener("click", gohome.bind(this));
	}
	this.frame_1926 = function() {
		var soundInstance = playSound("a5",0);
		this.InsertIntoSoundStreamData(soundInstance,1926,2609,1);
	}
	this.frame_2609 = function() {
		this.stop();
		
		function gohome(){
			this.gotoAndPlay("home");
		}
		this.btn_back.addEventListener("click", gohome.bind(this));
	}
	this.frame_2652 = function() {
		var soundInstance = playSound("a6",0);
		this.InsertIntoSoundStreamData(soundInstance,2652,3010,1);
	}
	this.frame_3028 = function() {
		this.stop();
		
		function gohome(){
			this.gotoAndPlay("home");
		}
		this.btn_back.addEventListener("click", gohome.bind(this));
	}
	this.frame_3087 = function() {
		var soundInstance = playSound("a7",0);
		this.InsertIntoSoundStreamData(soundInstance,3087,3402,1);
	}
	this.frame_3403 = function() {
		var soundInstance = playSound("a8",0);
		this.InsertIntoSoundStreamData(soundInstance,3403,3684,1);
	}
	this.frame_3686 = function() {
		this.stop();
		
		function gohome(){
			this.gotoAndPlay("home");
		}
		this.btn_back.addEventListener("click", gohome.bind(this));
	}
	this.frame_3743 = function() {
		var soundInstance = playSound("a9",0);
		this.InsertIntoSoundStreamData(soundInstance,3743,4028,1);
	}
	this.frame_4026 = function() {
		this.stop();
		
		function gohome(){
			this.gotoAndPlay("home");
		}
		this.btn_back.addEventListener("click", gohome.bind(this));
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(262).call(this.frame_263).wait(2).call(this.frame_265).wait(340).call(this.frame_605).wait(59).call(this.frame_664).wait(488).call(this.frame_1152).wait(49).call(this.frame_1201).wait(671).call(this.frame_1872).wait(54).call(this.frame_1926).wait(683).call(this.frame_2609).wait(43).call(this.frame_2652).wait(376).call(this.frame_3028).wait(59).call(this.frame_3087).wait(316).call(this.frame_3403).wait(283).call(this.frame_3686).wait(57).call(this.frame_3743).wait(283).call(this.frame_4026).wait(20));

	// flash0_ai
	this.btn_play = new lib.btnplay();
	this.btn_play.name = "btn_play";
	this.btn_play.setTransform(640,310,1,1,0,0,0,126,126);
	new cjs.ButtonHelper(this.btn_play, 0, 1, 2, false, new lib.btnplay(), 3);

	this.timeline.addTween(cjs.Tween.get(this.btn_play).to({_off:true},2).wait(4044));

	// btn_volver
	this.btn_back = new lib.btnvolver();
	this.btn_back.name = "btn_back";
	this.btn_back.setTransform(1111.55,67.7,1,1,0,0,0,126,46);
	this.btn_back._off = true;
	new cjs.ButtonHelper(this.btn_back, 0, 1, 2, false, new lib.btnvolver(), 3);

	this.timeline.addTween(cjs.Tween.get(this.btn_back).wait(1152).to({_off:false},0).to({_off:true},1).wait(719).to({_off:false,x:1120.25,y:60},0).to({_off:true},1).wait(736).to({_off:false,x:1114.6,y:69.7},0).to({_off:true},1).wait(418).to({_off:false,x:1118.4,y:513.05},0).to({_off:true},1).wait(657).to({_off:false,x:1116.45,y:72.35},0).to({_off:true},1).wait(339).to({_off:false,x:1117.75,y:74.05},0).to({_off:true},2).wait(18));

	// textos
	this.instance = new lib.t3("synched",0);
	this.instance.setTransform(-476.1,559.05,1,1,0,0,0,522.1,58.9);
	this.instance._off = true;

	this.instance_1 = new lib.t4("synched",0);
	this.instance_1.setTransform(-590.1,468.9,1,1,0,0,0,522.1,58.9);
	this.instance_1._off = true;

	this.instance_2 = new lib.t5("synched",0);
	this.instance_2.setTransform(1341.85,510.1,1,1,0,0,0,334,85.4);
	this.instance_2._off = true;

	this.instance_3 = new lib.t6("synched",0);
	this.instance_3.setTransform(-610.15,135.4,1,1,0,0,0,334,85.4);
	this.instance_3._off = true;

	this.instance_4 = new lib.t7("synched",0);
	this.instance_4.setTransform(-637.95,554.15,1,1,0,0,0,334,85.4);
	this.instance_4._off = true;

	this.instance_5 = new lib.t8("synched",0);
	this.instance_5.setTransform(1676.35,534.55,1,1,0,0,0,334,85.4);
	this.instance_5._off = true;

	this.instance_6 = new lib.t9("synched",0);
	this.instance_6.setTransform(1786.45,494.55,1,1,0,0,0,334,85.4);
	this.instance_6._off = true;

	this.instance_7 = new lib.t10("synched",0);
	this.instance_7.setTransform(1888.35,28.5,1,1,0,0,0,334,85.4);
	this.instance_7._off = true;

	this.instance_8 = new lib.t11("synched",0);
	this.instance_8.setTransform(1750.15,142.4,1,1,0,0,0,334,85.4);
	this.instance_8._off = true;

	this.instance_9 = new lib.t12("synched",0);
	this.instance_9.setTransform(-812,631.25,1,1,0,0,0,334,85.4);
	this.instance_9._off = true;

	this.instance_10 = new lib.t13("synched",0);
	this.instance_10.setTransform(-812.8,478.55,1,1,0,0,0,334,85.4);
	this.instance_10._off = true;

	this.instance_11 = new lib.t14("synched",0);
	this.instance_11.setTransform(1831.25,542.05,0.9,0.9,0,0,0,581.8,93.2);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1224).to({_off:false},0).to({x:548.15},21,cjs.Ease.backOut).wait(111).to({startPosition:0},0).to({x:-488.1},16).to({_off:true},1).wait(2673));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1442).to({_off:false},0).to({x:550.15},21,cjs.Ease.backOut).wait(136).to({x:554.15},0).to({x:-726.15},14).to({_off:true},1).wait(2432));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1728).to({_off:false},0).to({x:362.05},16,cjs.Ease.backOut).to({_off:true},129).wait(2173));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1948).to({_off:false},0).to({x:364.05},22,cjs.Ease.backOut).wait(180).to({startPosition:0},0).to({x:-628.15},21).to({_off:true},1).wait(1874));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(2173).to({_off:false},0).to({x:322.05},18,cjs.Ease.backOut).wait(75).to({startPosition:0},0).to({x:-969.95},18).to({_off:true},1).wait(1761));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(2287).to({_off:false},0).to({x:734.15},22,cjs.Ease.backOut).wait(133).to({startPosition:0},0).to({x:1666.4},18).to({_off:true},1).wait(1585));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(2462).to({_off:false},0).to({x:754.15},18,cjs.Ease.backOut).to({_off:true},130).wait(1436));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(2679).to({_off:false},0).to({x:878.15,y:28.4},20,cjs.Ease.backOut).wait(184).to({y:28.5},0).to({x:-537.9},15).to({_off:true},1).wait(1147));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(2900).to({_off:false},0).to({x:850.15},17,cjs.Ease.backOut).to({_off:true},112).wait(1017));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(3114).to({_off:false},0).to({x:358},23,cjs.Ease.backOut).wait(243).to({startPosition:0},0).to({x:-805},17).to({_off:true},1).wait(648));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(3412).to({_off:false},0).to({x:362},21).wait(233).to({startPosition:0},0).to({x:-812.85},19).to({_off:true},1).wait(360));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(3764).to({_off:false},0).to({x:734.15,y:540.15},19,cjs.Ease.backOut).to({_off:true},245).wait(18));

	// Capa_13
	this.instance_12 = new lib.f14_1("synched",0);
	this.instance_12.setTransform(1918.3,310.1,1,1,0,0,0,640,362.5);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(3576).to({_off:false},0).to({x:620},16).to({_off:true},95).wait(359));

	// Capa_11
	this.instance_13 = new lib.f13_1("synched",0);
	this.instance_13.setTransform(1920,310.1,1,1,0,0,0,640,362.5);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(3380).to({_off:false},0).to({x:620},22).wait(174).to({startPosition:0},0).to({x:-662},16).to({_off:true},1).wait(453));

	// Capa_4
	this.instance_14 = new lib.f12_1("synched",0);
	this.instance_14.setTransform(1932.35,310.1,1,1,0,0,0,640,362.5);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(3086).to({_off:false},0).to({x:640},24).wait(270).to({startPosition:0},0).to({x:-660},22).to({_off:true},1).wait(643));

	// Capa_3
	this.instance_15 = new lib.f10_1("synched",0);
	this.instance_15.setTransform(1804.35,188,1,1,0,0,0,512,288);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(3737).to({_off:false},0).to({x:514.05},21).to({_off:true},270).wait(18));

	// Capa_9
	this.instance_16 = new lib.f8_1("synched",0);
	this.instance_16.setTransform(1922,310.1,1,1,0,0,0,640,362.5);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(2883).to({_off:false},0).to({x:640},15).to({_off:true},131).wait(1017));

	// Capa_2
	this.instance_17 = new lib.f7_1("synched",0);
	this.instance_17.setTransform(1932.35,310.1,1,1,0,0,0,640,362.5);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(2650).to({_off:false},0).to({x:640},24).wait(209).to({startPosition:0},0).to({x:-642},15).to({_off:true},1).wait(1147));

	// Capa_15
	this.instance_18 = new lib.f6_1("synched",0);
	this.instance_18.setTransform(1922,310.1,1,1,0,0,0,640,362.5);
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(2266).to({_off:false},0).to({x:640},18).to({_off:true},326).wait(1436));

	// Capa_14
	this.instance_19 = new lib.f5_1("synched",0);
	this.instance_19.setTransform(1942.5,310.1,1,1,0,0,0,640,362.5);
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1920).to({_off:false},0).to({x:640},28).wait(318).to({startPosition:0},0).to({x:-640},18).to({_off:true},1).wait(1761));

	// Capa_12
	this.instance_20 = new lib.f4_1("synched",0);
	this.instance_20.setTransform(1922.05,264.1,1,1,0,0,0,640,362.5);
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1599).to({_off:false},0).to({x:640.05},14).to({_off:true},260).wait(2173));

	// Capa_10
	this.instance_21 = new lib.f3_1("synched",0);
	this.instance_21.setTransform(1926.35,264.1,1,1,0,0,0,640,362.5);
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(1193).to({_off:false},0).to({x:640.05},23).wait(383).to({startPosition:0},0).to({x:-641.95},14).to({_off:true},1).wait(2432));

	// Capa_16
	this.instance_22 = new lib.f15_1("synched",0);
	this.instance_22.setTransform(1920,324.55,1,1,0,0,0,640,362.5);
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(976).to({_off:false},0).to({x:640},16).to({_off:true},161).wait(2893));

	// Capa_8
	this.instance_23 = new lib.f2_1("synched",0);
	this.instance_23.setTransform(1920.3,324.55,1,1,0,0,0,640,362.5);
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(818).to({_off:false},0).to({x:640},14).wait(144).to({startPosition:0},0).to({x:-640},16).to({_off:true},1).wait(3053));

	// Capa_7
	this.instance_24 = new lib.t2("synched",0);
	this.instance_24.setTransform(-358.15,93.5,1,1,0,0,0,478.1,58.9);
	this.instance_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(719).to({_off:false},0).to({x:518.15},24,cjs.Ease.backOut).wait(75).to({startPosition:0},0).to({x:-808.15},14).to({_off:true},1).wait(3213));

	// Capa_6
	this.instance_25 = new lib.f1_1("synched",0);
	this.instance_25.setTransform(1932.35,274.5,1,1,0,0,0,640,362.5);
	this.instance_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(657).to({_off:false},0).to({x:640},20).wait(141).to({startPosition:0},0).to({x:-640.3,y:267.7},14).to({_off:true},1).wait(3213));

	// bootones
	this.instr = new lib.instruccion();
	this.instr.name = "instr";
	this.instr.setTransform(639.95,310.05,1,1,0,0,0,515.1,24.4);

	this.btn6 = new lib.btn6();
	this.btn6.name = "btn6";
	this.btn6.setTransform(1073.45,490.5,0.9,0.9,0,0,0,149.6,150.2);
	new cjs.ButtonHelper(this.btn6, 0, 1, 2, false, new lib.btn6(), 3);

	this.btn5 = new lib.btn5();
	this.btn5.name = "btn5";
	this.btn5.setTransform(654.95,490.6,0.9,0.9,0,0,0,149.6,151.1);
	new cjs.ButtonHelper(this.btn5, 0, 1, 2, false, new lib.btn5(), 3);

	this.btn4 = new lib.btn4();
	this.btn4.name = "btn4";
	this.btn4.setTransform(238.95,490.55,0.9,0.9,0,0,0,149.6,150.3);
	new cjs.ButtonHelper(this.btn4, 0, 1, 2, false, new lib.btn4(), 3);

	this.btn3 = new lib.btn3();
	this.btn3.name = "btn3";
	this.btn3.setTransform(1073.45,164.5,0.9,0.9,0,0,0,149.6,150.3);
	new cjs.ButtonHelper(this.btn3, 0, 1, 2, false, new lib.btn3(), 3);

	this.btn2 = new lib.btn2();
	this.btn2.name = "btn2";
	this.btn2.setTransform(655,164.5,0.9,0.9,0,0,0,149.6,150.8);
	new cjs.ButtonHelper(this.btn2, 0, 1, 2, false, new lib.btn2(), 3);

	this.btn1 = new lib.btn1();
	this.btn1.name = "btn1";
	this.btn1.setTransform(238.95,164.45,0.9,0.9,0,0,0,149.6,150.2);
	new cjs.ButtonHelper(this.btn1, 0, 1, 2, false, new lib.btn1(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.btn1},{t:this.btn2},{t:this.btn3},{t:this.btn4},{t:this.btn5},{t:this.btn6},{t:this.instr}]},604).to({state:[]},2).to({state:[]},3422).wait(18));

	// visitado
	this.v6 = new lib.visitado();
	this.v6.name = "v6";
	this.v6.setTransform(1059.4,476.3,1,1,0,0,0,96.7,96.7);

	this.v5 = new lib.visitado();
	this.v5.name = "v5";
	this.v5.setTransform(641.3,476.3,1,1,0,0,0,96.7,96.7);

	this.v4 = new lib.visitado();
	this.v4.name = "v4";
	this.v4.setTransform(224.2,476.3,1,1,0,0,0,96.7,96.7);

	this.v3 = new lib.visitado();
	this.v3.name = "v3";
	this.v3.setTransform(1059.4,150.2,1,1,0,0,0,96.7,96.7);

	this.v2 = new lib.visitado();
	this.v2.name = "v2";
	this.v2.setTransform(641.3,150.2,1,1,0,0,0,96.7,96.7);

	this.v1 = new lib.visitado();
	this.v1.name = "v1";
	this.v1.setTransform(224.2,150.2,1,1,0,0,0,96.7,96.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.v1},{t:this.v2},{t:this.v3},{t:this.v4},{t:this.v5},{t:this.v6}]},605).to({state:[]},1).to({state:[]},3422).wait(18));

	// btn6
	this.instance_26 = new lib.btn6("single",0);
	this.instance_26.setTransform(1073.45,478.5,0.1,0.1,0,0,0,150,150.5);
	this.instance_26._off = true;

	this.btn6_1 = new lib.btn6("single",0);
	this.btn6_1.name = "btn6_1";
	this.btn6_1.setTransform(1073.45,490.5,0.9,0.9,0,0,0,149.6,150.2);
	this.btn6_1._off = true;

	this.btn1_1 = new lib.btn6("single",0);
	this.btn1_1.name = "btn1_1";
	this.btn1_1.setTransform(669.95,342.5,2,2,0,0,0,149.6,150.2);
	this.btn1_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(540).to({_off:false},0).to({_off:true,regX:149.6,regY:150.2,scaleX:0.9,scaleY:0.9,y:490.5},16,cjs.Ease.backOut).wait(3490));
	this.timeline.addTween(cjs.Tween.get(this.btn6_1).wait(540).to({_off:false},16,cjs.Ease.backOut).to({_off:true},48).wait(2).to({_off:false},0).to({scaleX:1,scaleY:1,y:478.5,alpha:0},13).to({_off:true},1).wait(534).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.5,alpha:1},0).to({scaleX:1,scaleY:1,y:478.5,alpha:0},13).to({_off:true},1).wait(706).to({_off:false,regX:149.7,regY:150.3,scaleX:0.9,scaleY:0.9,x:1073.5,y:490.5,alpha:1},0).to({regX:149.6,regY:150.2,scaleX:1,scaleY:1,x:1073.45,y:478.5,alpha:0},13).to({_off:true},1).wait(723).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.5,alpha:1},0).to({scaleX:1,scaleY:1,y:478.5,alpha:0},13).to({_off:true},1).wait(405).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.5,alpha:1},0).to({scaleX:1,scaleY:1,y:478.5,alpha:0},13).to({_off:true},1).wait(644).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.5,alpha:1},0).to({_off:true,scaleX:2,scaleY:2,x:669.95,y:342.5},14).wait(344));
	this.timeline.addTween(cjs.Tween.get(this.btn1_1).wait(3688).to({_off:false},14).wait(26).to({startPosition:0},0).to({x:-292.25},15).to({_off:true},1).wait(302));

	// btn5
	this.instance_27 = new lib.btn5("single",0);
	this.instance_27.setTransform(654.95,478.6,0.1,0.1,0,0,0,150,151);
	this.instance_27._off = true;

	this.btn5_1 = new lib.btn5("single",0);
	this.btn5_1.name = "btn5_1";
	this.btn5_1.setTransform(654.95,490.6,0.9,0.9,0,0,0,149.6,151.1);
	this.btn5_1._off = true;

	this.btn1_2 = new lib.btn5("single",0);
	this.btn1_2.name = "btn1_2";
	this.btn1_2.setTransform(669.95,342.5,2,2,0,0,0,149.6,150.2);
	this.btn1_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(485).to({_off:false},0).to({_off:true,regX:149.6,regY:151.1,scaleX:0.9,scaleY:0.9,y:490.6},14,cjs.Ease.backOut).wait(3547));
	this.timeline.addTween(cjs.Tween.get(this.btn5_1).wait(485).to({_off:false},14,cjs.Ease.backOut).to({_off:true},105).wait(2).to({_off:false},0).to({scaleX:1,scaleY:1,y:478.65,alpha:0},13).to({_off:true},1).wait(534).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.6,alpha:1},0).to({scaleX:1,scaleY:1,y:478.65,alpha:0},13).to({_off:true},1).wait(706).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.6,alpha:1},0).to({scaleX:1,scaleY:1,y:478.65,alpha:0},13).to({_off:true},1).wait(723).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.6,alpha:1},0).to({scaleX:1,scaleY:1,y:478.65,alpha:0},13).to({_off:true},1).wait(405).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.6,alpha:1},0).to({_off:true,regY:150.2,scaleX:2,scaleY:2,x:669.95,y:342.5},13).wait(645).to({_off:false,regY:151.1,scaleX:0.9,scaleY:0.9,x:654.95,y:490.6},0).to({scaleX:1,scaleY:1,y:478.65,alpha:0},13).to({_off:true},1).wait(344));
	this.timeline.addTween(cjs.Tween.get(this.btn1_2).wait(3030).to({_off:false},13).wait(27).to({startPosition:0},0).to({x:-292.25},15).to({_off:true},1).wait(960));

	// btn4
	this.instance_28 = new lib.btn4("single",0);
	this.instance_28.setTransform(238.9,478.55,0.1,0.1,0,0,0,150,150.5);
	this.instance_28._off = true;

	this.btn4_1 = new lib.btn4("single",0);
	this.btn4_1.name = "btn4_1";
	this.btn4_1.setTransform(238.95,490.55,0.9,0.9,0,0,0,149.6,150.3);
	this.btn4_1._off = true;

	this.btn1_3 = new lib.btn4("single",0);
	this.btn1_3.name = "btn1_3";
	this.btn1_3.setTransform(669.95,342.5,2,2,0,0,0,149.6,150.2);
	this.btn1_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(457).to({_off:false},0).to({_off:true,regX:149.6,regY:150.3,scaleX:0.9,scaleY:0.9,x:238.95,y:490.55},13,cjs.Ease.backOut).wait(3576));
	this.timeline.addTween(cjs.Tween.get(this.btn4_1).wait(457).to({_off:false},13,cjs.Ease.backOut).to({_off:true},134).wait(2).to({_off:false},0).to({regY:150.2,scaleX:1,scaleY:1,y:478.5,alpha:0},13).to({_off:true},1).wait(534).to({_off:false,regY:150.3,scaleX:0.9,scaleY:0.9,y:490.55,alpha:1},0).to({regY:150.2,scaleX:1,scaleY:1,y:478.5,alpha:0},13).to({_off:true},1).wait(706).to({_off:false,regY:150.3,scaleX:0.9,scaleY:0.9,y:490.55,alpha:1},0).to({regY:150.2,scaleX:1,scaleY:1,y:478.5,alpha:0},13).to({_off:true},1).wait(723).to({_off:false,regY:150.3,scaleX:0.9,scaleY:0.9,y:490.55,alpha:1},0).to({_off:true,regY:150.2,scaleX:2,scaleY:2,x:669.95,y:342.5},14).wait(405).to({_off:false,regY:150.3,scaleX:0.9,scaleY:0.9,x:238.95,y:490.55},0).to({alpha:0},13).to({_off:true},1).wait(644).to({_off:false,alpha:1},0).to({regY:150.2,scaleX:1,scaleY:1,y:478.5,alpha:0},13).to({_off:true},1).wait(344));
	this.timeline.addTween(cjs.Tween.get(this.btn1_3).wait(2611).to({_off:false},14).wait(26).to({startPosition:0},0).to({x:-292.25},15).to({_off:true},1).wait(1379));

	// btn3
	this.instance_29 = new lib.btn3("single",0);
	this.instance_29.setTransform(1073.45,176.5,0.1,0.1,0,0,0,150,150.5);
	this.instance_29._off = true;

	this.btn3_1 = new lib.btn3("single",0);
	this.btn3_1.name = "btn3_1";
	this.btn3_1.setTransform(1073.45,164.5,0.9,0.9,0,0,0,149.6,150.3);
	this.btn3_1._off = true;

	this.btn1_4 = new lib.btn3("single",0);
	this.btn1_4.name = "btn1_4";
	this.btn1_4.setTransform(669.95,342.5,2,2,0,0,0,149.6,150.2);
	this.btn1_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(428).to({_off:false},0).to({_off:true,regX:149.6,regY:150.3,scaleX:0.9,scaleY:0.9,y:164.5},14,cjs.Ease.backOut).wait(3604));
	this.timeline.addTween(cjs.Tween.get(this.btn3_1).wait(428).to({_off:false},14,cjs.Ease.backOut).to({_off:true},162).wait(2).to({_off:false},0).to({regY:150.2,scaleX:1,scaleY:1,y:176.45,alpha:0},13).to({_off:true},1).wait(534).to({_off:false,regY:150.3,scaleX:0.9,scaleY:0.9,y:164.5,alpha:1},0).to({regY:150.2,scaleX:1,scaleY:1,y:176.45,alpha:0},13).to({_off:true},1).wait(706).to({_off:false,regY:150.3,scaleX:0.9,scaleY:0.9,y:164.5,alpha:1},0).to({_off:true,regY:150.2,scaleX:2,scaleY:2,x:669.95,y:342.5},14).wait(723).to({_off:false,regY:150.3,scaleX:0.9,scaleY:0.9,x:1073.45,y:162.5},0).to({regY:150.2,scaleX:1,scaleY:1,y:176.45,alpha:0},13).to({_off:true},1).wait(405).to({_off:false,regY:150.3,scaleX:0.9,scaleY:0.9,y:162.5,alpha:1},0).to({regY:150.2,scaleX:1,scaleY:1,y:176.45,alpha:0},13).to({_off:true},1).wait(644).to({_off:false,regY:150.3,scaleX:0.9,scaleY:0.9,y:164.5,alpha:1},0).to({regY:150.2,scaleX:1,scaleY:1,y:176.45,alpha:0},13).to({_off:true},1).wait(344));
	this.timeline.addTween(cjs.Tween.get(this.btn1_4).wait(1874).to({_off:false},14).wait(26).to({startPosition:0},0).to({x:-292.25},15).to({_off:true},1).wait(2116));

	// btn2
	this.instance_30 = new lib.btn2("single",0);
	this.instance_30.setTransform(654.95,176.5,0.1,0.1,0,0,0,150,151);
	this.instance_30._off = true;

	this.btn2_1 = new lib.btn2("single",0);
	this.btn2_1.name = "btn2_1";
	this.btn2_1.setTransform(655,164.5,0.9,0.9,0,0,0,149.6,150.8);
	this.btn2_1._off = true;

	this.btn1_5 = new lib.btn2("single",0);
	this.btn1_5.name = "btn1_5";
	this.btn1_5.setTransform(669.95,342.5,2,2,0,0,0,149.6,150.2);
	this.btn1_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(385).to({_off:false},0).to({_off:true,regX:149.6,regY:150.8,scaleX:0.9,scaleY:0.9,x:655,y:164.5},13,cjs.Ease.backOut).wait(3648));
	this.timeline.addTween(cjs.Tween.get(this.btn2_1).wait(385).to({_off:false},13,cjs.Ease.backOut).to({_off:true},206).wait(2).to({_off:false},0).to({scaleX:1,scaleY:1,y:176.55,alpha:0},13).to({_off:true},1).wait(534).to({_off:false,scaleX:0.9,scaleY:0.9,y:164.5,alpha:1},0).to({_off:true,regY:150.2,scaleX:2,scaleY:2,x:669.95,y:342.5},13).wait(707).to({_off:false,regY:150.8,scaleX:0.9,scaleY:0.9,x:655,y:164.5},0).to({scaleX:1,scaleY:1,y:176.55,alpha:0},13).to({_off:true},1).wait(723).to({_off:false,scaleX:0.9,scaleY:0.9,y:162.5,alpha:1},0).to({scaleX:1,scaleY:1,y:176.55,alpha:0},13).to({_off:true},1).wait(405).to({_off:false,scaleX:0.9,scaleY:0.9,y:162.5,alpha:1},0).to({scaleX:1,scaleY:1,y:176.55,alpha:0},13).to({_off:true},1).wait(644).to({_off:false,scaleX:0.9,scaleY:0.9,y:164.5,alpha:1},0).to({scaleX:1,scaleY:1,y:176.55,alpha:0},13).to({_off:true},1).wait(344));
	this.timeline.addTween(cjs.Tween.get(this.btn1_5).wait(1154).to({_off:false},13).wait(26).to({startPosition:0},0).to({x:-276.25},16).to({_off:true},1).wait(2836));

	// btn1
	this.instance_31 = new lib.btn1("single",0);
	this.instance_31.setTransform(238.9,176.45,0.1,0.1,0,0,0,149.6,150.6);
	this.instance_31._off = true;

	this.btn1_6 = new lib.btn1("single",0);
	this.btn1_6.name = "btn1_6";
	this.btn1_6.setTransform(238.95,164.45,0.9,0.9,0,0,0,149.6,150.2);
	this.btn1_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(342).to({_off:false},0).to({_off:true,regY:150.2,scaleX:0.9,scaleY:0.9,x:238.95,y:164.45},16,cjs.Ease.backOut).wait(3688));
	this.timeline.addTween(cjs.Tween.get(this.btn1_6).wait(342).to({_off:false},16,cjs.Ease.backOut).to({_off:true},246).wait(2).to({_off:false},0).to({scaleX:2,scaleY:2,x:669.95,y:342.5},14).wait(26).to({startPosition:0},0).to({x:-292.25},15).to({_off:true},1).wait(492).to({_off:false,scaleX:0.9,scaleY:0.9,x:238.95,y:164.45},0).to({scaleX:1,scaleY:1,y:176.45,alpha:0},13).to({_off:true},1).wait(706).to({_off:false,scaleX:0.9,scaleY:0.9,y:164.45,alpha:1},0).to({scaleX:1,scaleY:1,y:176.45,alpha:0},13).to({_off:true},1).wait(723).to({_off:false,scaleX:0.9,scaleY:0.9,y:162.45,alpha:1},0).to({scaleX:1,scaleY:1,y:176.45,alpha:0},13).to({_off:true},1).wait(405).to({_off:false,scaleX:0.9,scaleY:0.9,y:162.45,alpha:1},0).to({scaleX:1,scaleY:1,y:176.45,alpha:0},13).to({_off:true},1).wait(644).to({_off:false,scaleX:0.9,scaleY:0.9,y:164.45,alpha:1},0).to({scaleX:1,scaleY:1,y:176.45,alpha:0},13).to({_off:true},1).wait(344));

	// Capa_5
	this.instance_32 = new lib.t1("synched",0);
	this.instance_32.setTransform(640,318.95,0.1,0.1,0,0,0,502.6,52.5);
	this.instance_32._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(264).to({_off:false},0).to({regX:502.2,regY:52.2,scaleX:1,scaleY:1,x:639.95,y:318.9},14).wait(52).to({startPosition:0},0).wait(11).to({regX:502.6,regY:52.5,scaleX:0.1,scaleY:0.1,x:640,y:318.95},0).to({_off:true},1).wait(3704));

	// fondos
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#ABB7C0","#54585A"],[0,1],-21.9,182.1,-21.9,382.1).s().p("EhlaAyBMAAAhkBMDK1AAAMAAABkBg");
	this.shape.setTransform(643.2,310.125);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(264).to({_off:false},0).wait(3424).to({_off:true},340).wait(18));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-1030,0,3895.5,687.1);
// library properties:
lib.properties = {
	id: '0424E10375B62B4EBDF31C772543B51F',
	width: 1280,
	height: 620,
	fps: 24,
	color: "#CCCCCC",
	opacity: 0.00,
	manifest: [
		{src:"images/f1.jpg?1618253045451", id:"f1"},
		{src:"images/f10.jpg?1618253045451", id:"f10"},
		{src:"images/f12.jpg?1618253045451", id:"f12"},
		{src:"images/f13.jpg?1618253045451", id:"f13"},
		{src:"images/f14.jpg?1618253045451", id:"f14"},
		{src:"images/f15.jpg?1618253045451", id:"f15"},
		{src:"images/f2.jpg?1618253045451", id:"f2"},
		{src:"images/f3.jpg?1618253045451", id:"f3"},
		{src:"images/f4.jpg?1618253045451", id:"f4"},
		{src:"images/f5.jpg?1618253045451", id:"f5"},
		{src:"images/f6.jpg?1618253045451", id:"f6"},
		{src:"images/f7.jpg?1618253045451", id:"f7"},
		{src:"images/f8.jpg?1618253045451", id:"f8"},
		{src:"sounds/a2.mp3?1618253045451", id:"a2"},
		{src:"sounds/a3.mp3?1618253045451", id:"a3"},
		{src:"sounds/a4.mp3?1618253045451", id:"a4"},
		{src:"sounds/a5.mp3?1618253045451", id:"a5"},
		{src:"sounds/a6.mp3?1618253045451", id:"a6"},
		{src:"sounds/a7.mp3?1618253045451", id:"a7"},
		{src:"sounds/a8.mp3?1618253045451", id:"a8"},
		{src:"sounds/a9.mp3?1618253045451", id:"a9"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['0424E10375B62B4EBDF31C772543B51F'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;