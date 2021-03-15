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
	this.shape.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgUAAgmQAAgiAbgXQAbgXA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVASAAAhQAAAjgeAaQgdAag7AAQg0gBgfgVg");
	this.shape.setTransform(587.425,143.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEALQgNAmgcAUQgdATgrABQhCgBghgsgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_1.setTransform(560.0532,143.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARgBQAXAAAWAOIgVA7QgSgLgPAAQgOAAgKAIQgJAIgFAUQgHAWAABBIAABQg");
	this.shape_2.setTransform(538.6,142.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlgBQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6AAQgigBghgQgAgsg6QgSAVAAAlQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_3.setTransform(511.725,143.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhdCSQghgkAAhAQAAhCAgghQAegjAwAAQAqAAAgAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgWALQgVALgVAAQgtAAgfgkgAgngQQgRASAAAmQAAAqAMATQAQAbAegBQAXAAAQgTQARgVABgoQAAgsgRgTQgQgTgZAAQgXAAgRATg");
	this.shape_4.setTransform(480.5,138.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEALQgNAmgcAUQgdATgrABQhCgBghgsgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_5.setTransform(451.7032,143.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAyCFIAAiFQgBgpgEgMQgEgMgKgIQgKgGgOAAQgRAAgOAJQgOALgFAPQgGAQABArIAAB2IhFAAIAAkDIA/AAIAAAmQAigsAzAAQAXABASAHQAUAJAJANQAKAMADAQQAEARAAAdIAAChg");
	this.shape_6.setTransform(422.8,142.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEALQgNAmgcAUQgdATgrABQhCgBghgsgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_7.setTransform(393.3532,143.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgMAAgkIAAhwIgfAAIAAg3IAfAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfABAGQABAEAGAEQAEAEAHgBQAKAAARgGIAHA1QgZALgeAAQgSgBgOgFg");
	this.shape_8.setTransform(371.4,138.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgMgKgIQgKgGgOAAQgQAAgPAJQgOALgFAPQgGAQAAArIAAB2IhEAAIAAkDIBAAAIAAAmQAhgsAzAAQAXABASAHQATAJAKANQAJAMAFAQQADARAAAdIAAChg");
	this.shape_9.setTransform(347.8,142.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlgBQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6AAQgigBghgQgAgsg6QgSAVAAAlQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_10.setTransform(317.275,143.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhYBkQghgkAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgKQgNgLgTAAQgYABgQARQgPARAAAqQAAAuAQASQAPAUAZgBQAUAAAMgLQANgLAFgbIBDALQgKAvgeAYQgeAYgyAAQg4gBgigjg");
	this.shape_11.setTransform(288.425,143.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgMgKgIQgKgGgOAAQgQAAgPAJQgOALgFAPQgFAQgBArIAAB2IhEAAIAAkDIBAAAIAAAmQAhgsAzAAQAXABATAHQATAJAJANQAKAMADAQQAEARAAAdIAAChg");
	this.shape_12.setTransform(245,142.8);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEALQgNAmgcAUQgdATgrABQhCgBghgsgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_13.setTransform(215.5532,143.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlgBQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6AAQgigBghgQgAgsg6QgSAVAAAlQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_14.setTransform(172.775,143.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgUAAgmQAAgiAbgXQAbgXA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVASAAAhQAAAjgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_15.setTransform(128.975,143.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhiBxQgWgVAAgiQAAgWAKgQQALgSASgHQATgKAkgHQAvgJATgIIAAgHQAAgTgLgJQgJgIgaAAQgSAAgLAHQgKAIgHASIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAXAKAJARQAJAQAAAtIgBBPQAAAiADARQAEAQAJATIhEAAIgHgVIgCgIQgSASgUAIQgTAJgXAAQgoAAgXgXgAgBAPQgdAHgIAGQgOAJAAAOQAAAPAKAKQAMALAQAAQARAAARgMQANgJAEgOQADgJAAgYIAAgOQgNAFgcAFg");
	this.shape_16.setTransform(101.85,143.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgUAAgmQAAgiAbgXQAbgXA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVASAAAhQAAAjgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_17.setTransform(73.375,143.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_18.setTransform(53.225,138.15);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlgBQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6AAQgigBghgQgAgsg6QgSAVAAAlQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_19.setTransform(31.025,143.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgZCrQgVgMgQgVIAAAmIhAAAIAAllIBFAAIAACBQAggkAqAAQAvAAAgAjQAeAhAABAQABBCggAkQgfAkguAAQgVAAgWgLgAgpgQQgQARAAAnQAAApAMAUQASAbAcgBQAXAAARgSQAPgUAAgqQAAgtgQgSQgQgTgYAAQgZgBgQAUg");
	this.shape_20.setTransform(1.05,138.45);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AAxCEIAAiEQAAgpgEgMQgEgMgKgIQgKgGgOAAQgQAAgPAKQgOAJgFAQQgGARAAAqIAAB1IhEAAIAAkCIBAAAIAAAnQAhgtAzABQAXAAASAIQATAHAKAOQAJAMAFAQQADARAAAdIAACgg");
	this.shape_21.setTransform(1125.85,84.95);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAigkA0AAQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_22.setTransform(1096.4032,85.25);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhTCEIAAkCIBAAAIAAAlQAQgaAMgIQANgIARAAQAXAAAWAMIgVA8QgRgLgQAAQgOAAgKAIQgJAIgFAVQgHAUAABBIAABQg");
	this.shape_23.setTransform(1061.05,84.95);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAigkA0AAQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_24.setTransform(1035.2532,85.25);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AAyCEIAAiEQAAgpgFgMQgEgMgKgIQgKgGgOAAQgRAAgOAKQgOAJgFAQQgGARABAqIAAB1IhFAAIAAkCIA/AAIAAAnQAjgtAyABQAXAAASAIQAUAHAJAOQAKAMAEAQQADARAAAdIAACgg");
	this.shape_25.setTransform(1006.35,84.95);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaABQAbgBASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_26.setTransform(975.825,85.25);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("Ah+C2IAAllIBAAAIAAAmQANgTAVgNQAWgMAYAAQAuAAAfAkQAfAjAAA/QAABAgfAkQggAkgtAAQgVAAgRgIQgRgJgUgVIAACDgAgphrQgQATAAAmQAAAsAQAUQASAVAYAAQAYAAAQgTQAPgTAAgrQAAgpgQgUQgQgUgYAAQgZAAgQAUg");
	this.shape_27.setTransform(945.95,89.875);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgYQAbgWA4AAQA0gBAaASQAaARAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAFAAAJQAAAIAHAFQAJAGA2ANQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_28.setTransform(915.375,85.25);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_29.setTransform(895.225,80.3);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhdCSQghgkAAhBQAAhAAggiQAegjAwAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgWALQgVALgVAAQgtAAgfgkgAgngQQgRASABAnQgBApAMATQAQAbAdgBQAYAAARgUQAQgTABgpQAAgtgRgSQgQgUgZAAQgXAAgRAUg");
	this.shape_30.setTransform(872.35,80.6);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAigkA0AAQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_31.setTransform(829.6532,85.25);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AheCSQgfgkgBhBQABhAAfgiQAfgjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgWALQgVALgVAAQgtAAgggkgAgngQQgRASAAAnQAAApAMATQAQAbAegBQAXAAAQgUQARgTABgpQgBgtgQgSQgQgUgZAAQgYAAgQAUg");
	this.shape_32.setTransform(800.1,80.6);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAigkA0AAQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_33.setTransform(771.3032,85.25);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhOB5QgVgLgJgVQgJgVAAgkIAAikIBFAAIAAB4QAAA1ADANQAEAMAKAHQAKAHAQAAQAQAAAOgJQAOgKAFgOQAFgOAAg3IAAhuIBFAAIAAEDIhAAAIAAgnQgOAVgXAMQgXAMgZAAQgaAAgVgMg");
	this.shape_34.setTransform(742.3,85.525);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("Ah9C2IAAllIBAAAIAAAmQAMgTAVgNQAWgMAYAAQAtAAAgAkQAfAjABA/QAABAghAkQgfAkgtAAQgVAAgRgIQgRgJgUgVIAACDgAgphrQgRATAAAmQAAAsARAUQASAVAYAAQAYAAAPgTQAQgTABgrQgBgpgQgUQgQgUgYAAQgYAAgRAUg");
	this.shape_35.setTransform(712.55,89.875);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAigkA0AAQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_36.setTransform(668.5032,85.25);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgYQAbgWA4AAQA0gBAaASQAaARAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAFAAAJQAAAIAHAFQAJAGA2ANQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_37.setTransform(640.275,85.25);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAigkA0AAQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_38.setTransform(599.0032,85.25);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AheCSQgfgkAAhBQAAhAAegiQAfgjAwAAQArAAAfAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASgBAnQAAApAMATQAQAbAegBQAXAAAQgUQASgTgBgpQAAgtgQgSQgQgUgZAAQgXAAgRAUg");
	this.shape_39.setTransform(569.45,80.6);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AAyCEIAAiEQgBgpgEgMQgEgMgKgIQgKgGgOAAQgRAAgOAKQgOAJgFAQQgFARgBAqIAAB1IhEAAIAAkCIA/AAIAAAnQAjgtAyABQAXAAATAIQASAHAKAOQAKAMADAQQAEARAAAdIAACgg");
	this.shape_40.setTransform(539.55,84.95);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaABQAbgBASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_41.setTransform(509.025,85.25);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AhdCSQgggkgBhBQAAhAAggiQAegjAwAAQAqAAAgAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgWALQgVALgVAAQgtAAgfgkgAgngQQgRASAAAnQAAApAMATQAQAbAegBQAXAAAQgUQARgTABgpQAAgtgRgSQgQgUgZAAQgXAAgRAUg");
	this.shape_42.setTransform(477.8,80.6);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAigkA0AAQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_43.setTransform(435.1032,85.25);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhOB5QgUgLgKgVQgJgVAAgkIAAikIBEAAIAAB4QAAA1AFANQADAMAKAHQAKAHAPAAQARAAAOgJQAOgKAFgOQAFgOAAg3IAAhuIBFAAIAAEDIhAAAIAAgnQgOAVgXAMQgWAMgaAAQgaAAgVgMg");
	this.shape_44.setTransform(406.1,85.525);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AA6C2IAAiCQgOARgUAKQgUAKgXAAQgrAAgdghQgignAAhBQAAg/AggjQAggjAvAAQAYAAATALQATALAOAWIAAgmIBAAAIAAFlgAgmhrQgRATAAArQABArAQASQAPATAXAAQAYAAASgVQARgVABgqQgBgngQgUQgQgTgYAAQgYAAgRAUg");
	this.shape_45.setTransform(375.1,89.875);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgVALgRQAKgRAUgJQASgJAkgHQAvgJASgIIAAgGQAAgVgKgIQgJgIgaAAQgTAAgKAHQgKAHgHASIg+gLQALglAZgSQAagTAzABQAsAAAXALQAWAKAKARQAJARAAAsIgBBQQAAAiADAQQAEAQAIASIhDAAIgHgUIgCgIQgSASgUAIQgTAJgXAAQgnAAgXgXgAgBAPQgdAGgIAHQgOAJAAAOQAAAPAKAKQAMALAQAAQARAAARgMQANgKAEgNQACgJAAgYIAAgOQgNAEgbAGg");
	this.shape_46.setTransform(346.45,85.25);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("Ah9C2IAAllIBAAAIAAAmQAMgTAVgNQAVgMAZAAQAuAAAfAkQAfAjABA/QAABAghAkQgfAkgtAAQgVAAgRgIQgSgJgTgVIAACDgAgphrQgRATAAAmQAAAsARAUQASAVAYAAQAYAAAPgTQARgTgBgrQAAgpgQgUQgQgUgYAAQgZAAgQAUg");
	this.shape_47.setTransform(318,89.875);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AB6CEIAAiSQAAgngHgMQgJgOgVAAQgOAAgNAIQgMAKgGAQQgGASABAjIAAB8IhEAAIAAiNQAAglgDgLQgFgMgHgFQgIgFgNAAQgQAAgMAIQgNAJgFAQQgGAQAAAkIAAB+IhEAAIAAkCIA/AAIAAAjQAhgoAwAAQAYAAASAKQASAKAMAUQAQgUAVgKQATgKAWAAQAdAAAUALQAUAMAJAWQAIAQAAAmIAACkg");
	this.shape_48.setTransform(279.65,84.95);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAigkA0AAQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_49.setTransform(243.4032,85.25);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAigkA0AAQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_50.setTransform(201.7032,85.25);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AhdCSQghgkAAhBQAAhAAggiQAegjAwAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgWALQgVALgVAAQgtAAgfgkgAgngQQgRASAAAnQAAApAMATQAQAbAdgBQAYAAARgUQAQgTABgpQAAgtgRgSQgQgUgZAAQgXAAgRAUg");
	this.shape_51.setTransform(172.15,80.6);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgVALgRQALgRATgJQASgJAkgHQAvgJASgIIAAgGQABgVgKgIQgKgIgaAAQgTAAgJAHQgLAHgGASIg+gLQAKglAagSQAZgTAyABQAuAAAWALQAWAKAKARQAJARAAAsIgBBQQAAAiAEAQQACAQAJASIhDAAIgGgUIgDgIQgSASgUAIQgTAJgWAAQgpAAgWgXgAgCAPQgcAGgJAHQgNAJAAAOQAAAPALAKQALALAQAAQASAAARgMQAMgKAEgNQACgJAAgYIAAgOQgNAEgcAGg");
	this.shape_52.setTransform(129.7,85.25);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAigkA0AAQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_53.setTransform(101.6532,85.25);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AhTCEIAAkCIA/AAIAAAlQARgaAMgIQANgIARAAQAXAAAWAMIgVA8QgSgLgOAAQgPAAgKAIQgJAIgFAVQgHAUABBBIAABQg");
	this.shape_54.setTransform(80.2,84.95);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AhhCjQgYgVAAgiQAAgWALgRQAKgRAUgJQASgKAkgGQAvgJASgIIAAgHQABgTgLgIQgJgIgagBQgSAAgKAIQgLAHgGASIg+gMQAKglAZgSQAagSAyAAQAuAAAWALQAWALAKAQQAJARAAArIgBBRQAAAiAEARQADAQAIASIhDAAIgHgVIgCgIQgSASgUAIQgTAJgWAAQgpAAgWgWgAgCBBQgcAGgJAGQgNAJAAAPQAAAPAKAKQALALARAAQASgBARgLQAMgKAEgOQADgIgBgZIAAgNQgMAEgdAGgAgihvIAihJIBMAAIhDBJg");
	this.shape_55.setTransform(54.65,80.3);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_56.setTransform(19.925,80.3);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AhiBxQgXgVAAgiQAAgVALgRQAKgRAUgJQASgJAkgHQAvgJASgIIAAgGQAAgVgKgIQgJgIgaAAQgTAAgKAHQgKAHgHASIg+gLQALglAZgSQAagTAzABQAsAAAXALQAWAKAKARQAJARAAAsIgBBQQAAAiADAQQAEAQAIASIhDAAIgHgUIgCgIQgSASgUAIQgTAJgXAAQgnAAgYgXgAgBAPQgdAGgIAHQgOAJAAAOQAAAPAKAKQAMALAQAAQARAAARgMQANgKAEgNQACgJAAgYIAAgOQgNAEgbAGg");
	this.shape_57.setTransform(-0.95,85.25);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AhiByQgXgWABgiQgBgVALgSQALgQASgJQATgJAkgHQAvgJASgHIAAgHQAAgVgKgHQgJgJgaAAQgTAAgKAHQgKAIgHARIg+gLQALgmAZgRQAagSAzAAQAsgBAXALQAXALAJARQAJARAAAsIgBBQQAAAhADARQADAQAJASIhDAAIgHgUIgCgIQgSARgUAJQgTAIgXABQgogBgXgVgAgBAQQgdAGgIAFQgOAKAAAPQAAAOAKAKQAMALAQAAQARAAARgMQANgKAEgNQACgIAAgaIAAgNQgNAEgbAHg");
	this.shape_58.setTransform(1155.2,27.4);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgdCCIhpkDIBIAAIAxCEIANAsIAIgWIAHgWIAxiEIBHAAIhnEDg");
	this.shape_59.setTransform(1127.175,27.375);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAigkA0AAQA4gBAiAmQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgJQALgIAGgUIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_60.setTransform(1099.3532,27.4);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_61.setTransform(1078.775,22.45);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_62.setTransform(1064.875,22.45);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAigkA0AAQA4gBAiAmQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgJQALgIAGgUIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_63.setTransform(1029.8532,27.4);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgTgWgPQgfgTAAgmQAAghAbgYQAbgWA4AAQA0AAAaARQAaARAJAiIhAAMQgEgPgMgJQgMgHgUgBQgbAAgMAIQgIAGAAAIQAAAIAHAEQAJAIA2AMQA3AMAWATQAVARAAAgQAAAkgeAZQgdAag7ABQg0AAgfgWg");
	this.shape_64.setTransform(1001.625,27.4);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgTgWgPQgfgTAAgmQAAghAbgYQAbgWA4AAQA0AAAaARQAaARAJAiIhAAMQgEgPgMgJQgMgHgUgBQgbAAgMAIQgIAGAAAIQAAAIAHAEQAJAIA2AMQA3AMAWATQAVARAAAgQAAAkgeAZQgdAag7ABQg0AAgfgWg");
	this.shape_65.setTransform(959.925,27.4);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAigkA0AAQA4gBAiAmQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgJQALgIAGgUIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_66.setTransform(932.5532,27.4);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AAyCEIAAiEQAAgpgFgMQgEgMgKgIQgKgGgOAAQgQAAgPAKQgOAJgFARQgGAQABAqIAAB1IhFAAIAAkCIBAAAIAAAnQAigsAyAAQAXgBASAJQAUAHAJANQAJANAFAQQADAQAAAeIAACgg");
	this.shape_67.setTransform(903.65,27.1);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7gBAlAmQAmAnAAA6QAAA6gmAnQgmAmg6ABQgiAAghgRgAgsg6QgSAVAAAlQAAAmASAVQASAVAaAAQAbAAASgVQASgVAAgmQAAgmgSgUQgSgVgbAAQgaAAgSAVg");
	this.shape_68.setTransform(873.125,27.4);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhzIAAg/IBDAAIAAA/g");
	this.shape_69.setTransform(850.875,22.45);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AhYBjQghgkAAg/QAAg/AhgjQAiglA5ABQAwgBAcAVQAcAUAMAqIhEAMQgDgUgMgLQgNgKgTABQgYAAgQARQgPASAAApQAAAtAQAUQAPASAZABQAUgBAMgKQANgMAFgbIBDAMQgKAugeAXQgeAYgyABQg4AAgiglg");
	this.shape_70.setTransform(830.375,27.4);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AhhByQgYgWAAgiQAAgVALgSQAKgQAUgJQASgJAkgHQAvgJASgHIAAgHQAAgVgKgHQgJgJgaAAQgSAAgKAHQgLAIgGARIg/gLQALgmAZgRQAagSAzAAQAsgBAXALQAWALAKARQAJARAAAsIgBBQQAAAhADARQAEAQAIASIhDAAIgHgUIgCgIQgSARgUAJQgTAIgWABQgogBgXgVgAgBAQQgdAGgJAFQgNAKAAAPQAAAOAKAKQALALARAAQARAAARgMQANgKAEgNQADgIgBgaIAAgNQgNAEgbAHg");
	this.shape_71.setTransform(802.2,27.4);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AhYBjQghgkAAg/QAAg/AhgjQAiglA5ABQAwgBAcAVQAcAUAMAqIhEAMQgDgUgMgLQgNgKgTABQgYAAgQARQgPASAAApQAAAtAQAUQAPASAZABQAUgBAMgKQANgMAFgbIBDAMQgKAugeAXQgeAYgyABQg4AAgiglg");
	this.shape_72.setTransform(774.775,27.4);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhzIAAg/IBDAAIAAA/g");
	this.shape_73.setTransform(753.575,22.45);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AgwC2IAAjNIgmAAIAAg2IAmAAIAAgTQgBggAIgRQAHgPASgLQARgKAeAAQAdAAAbAJIgJAwQgQgFgPAAQgPAAgHAIQgGAHAAATIAAASIAzAAIAAA2IgzAAIAADNg");
	this.shape_74.setTransform(739.25,22.15);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhzIAAg/IBDAAIAAA/g");
	this.shape_75.setTransform(723.025,22.45);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AhYBjQghgkAAg/QAAg/AhgjQAiglA5ABQAwgBAcAVQAcAUAMAqIhEAMQgDgUgMgLQgNgKgTABQgYAAgQARQgPASAAApQAAAtAQAUQAPASAZABQAUgBAMgKQANgMAFgbIBDAMQgKAugeAXQgeAYgyABQg4AAgiglg");
	this.shape_76.setTransform(702.525,27.4);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAigkA0AAQA4gBAiAmQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgJQALgIAGgUIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_77.setTransform(674.1032,27.4);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("Ah+C2IAAllIBAAAIAAAmQANgTAVgNQAWgMAYAAQAuAAAfAkQAgAjgBA/QAABAgfAkQggAkguAAQgUAAgRgIQgRgJgUgVIAACDgAgphrQgQATAAAmQgBAsASAUQARAVAYAAQAYAAAQgTQAPgTAAgrQAAgpgQgUQgQgUgYAAQgZAAgQAUg");
	this.shape_78.setTransform(645.9,32.025);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgTgWgPQgfgTAAgmQAAghAbgYQAbgWA4AAQA0AAAaARQAaARAJAiIhAAMQgEgPgMgJQgMgHgUgBQgbAAgMAIQgIAGAAAIQAAAIAHAEQAJAIA2AMQA3AMAWATQAVARAAAgQAAAkgeAZQgdAag7ABQg0AAgfgWg");
	this.shape_79.setTransform(615.325,27.4);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAigkA0AAQA4gBAiAmQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgJQALgIAGgUIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_80.setTransform(587.9532,27.4);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AAxCEIAAiEQABgpgFgMQgEgMgKgIQgKgGgOAAQgRAAgOAKQgOAJgFARQgGAQAAAqIAAB1IhEAAIAAkCIBAAAIAAAnQAhgsAzAAQAXgBATAJQATAHAJANQAJANAEAQQAEAQAAAeIAACgg");
	this.shape_81.setTransform(545.15,27.1);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAigkA0AAQA4gBAiAmQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgJQALgIAGgUIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_82.setTransform(515.7032,27.4);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("AhiCjQgXgVAAgiQAAgWALgRQAKgRAUgJQASgJAkgHQAvgKASgHIAAgHQAAgTgKgIQgJgJgaAAQgTAAgKAHQgKAIgHASIg+gLQALgmAZgSQAagSAzAAQAsAAAXALQAWAKAKASQAJAQAAArIgBBRQAAAiADAQQAEAQAIATIhDAAIgHgUIgCgIQgSARgUAJQgTAIgXAAQgnAAgYgWgAgBBBQgdAGgIAGQgOAKAAAOQAAAPAKAKQAMAKAQAAQARABARgMQANgKAEgOQACgIAAgZIAAgOQgNAFgbAGgAgihvIAihJIBMAAIhDBJg");
	this.shape_83.setTransform(474.25,22.45);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#000000").s().p("AgKCsQgPgGgHgKQgHgKgCgQQgDgNAAgkIAAhwIgfAAIAAg3IAfAAIAAgzIBEgpIAABcIAvAAIAAA3IgvAAIAABnQAAAgABAFQABAGAGADQAEAEAHAAQAJAAASgHIAHA1QgZAKgeABQgSAAgOgHg");
	this.shape_84.setTransform(452.05,23.1);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgTgWgPQgfgTAAgmQAAghAbgYQAbgWA4AAQA0AAAaARQAaARAJAiIhAAMQgEgPgMgJQgMgHgUgBQgbAAgMAIQgIAGAAAIQAAAIAHAEQAJAIA2AMQA3AMAWATQAVARAAAgQAAAkgeAZQgdAag7ABQg0AAgfgWg");
	this.shape_85.setTransform(429.125,27.4);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAigkA0AAQA4gBAiAmQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgJQALgIAGgUIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_86.setTransform(401.7532,27.4);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_87.setTransform(367.275,22.45);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("AhiByQgWgWAAgiQAAgVAKgSQAKgQATgJQATgJAkgHQAvgJATgHIAAgHQgBgVgJgHQgKgJgaAAQgSAAgLAHQgKAIgGARIg+gLQAKgmAagRQAZgSAyAAQAugBAWALQAXALAJARQAJARAAAsIgBBQQAAAhAEARQACAQAKASIhEAAIgGgUIgDgIQgSARgUAJQgTAIgXABQgogBgXgVgAgCAQQgcAGgJAFQgNAKAAAPQAAAOALAKQAKALARAAQARAAASgMQAMgKAEgNQACgIABgaIAAgNQgOAEgcAHg");
	this.shape_88.setTransform(346.4,27.4);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#000000").s().p("AgKCsQgPgGgHgKQgHgKgDgQQgCgNAAgkIAAhwIggAAIAAg3IAgAAIAAgzIBEgpIAABcIAvAAIAAA3IgvAAIAABnQAAAgACAFQABAGAEADQAFAEAHAAQAJAAATgHIAFA1QgYAKgeABQgTAAgNgHg");
	this.shape_89.setTransform(324.2,23.1);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAigkA0AAQA4gBAiAmQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgJQALgIAGgUIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_90.setTransform(301.7032,27.4);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#000000").s().p("AB6CEIAAiSQAAgogHgLQgJgOgVAAQgOAAgNAJQgMAIgGASQgGAQABAkIAAB8IhEAAIAAiMQAAgmgDgMQgFgLgHgFQgIgFgNAAQgQAAgMAJQgNAIgFAQQgGAQAAAkIAAB+IhEAAIAAkCIA/AAIAAAjQAhgpAwABQAYgBASAKQASALAMAUQAQgUAVgLQATgKAWABQAdAAAUALQAUAMAJAWQAIARAAAlIAACkg");
	this.shape_91.setTransform(265.7,27.1);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_92.setTransform(222.775,22.45);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAigkA0AAQA4gBAiAmQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgJQALgIAGgUIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_93.setTransform(201.6532,27.4);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#000000").s().p("AhyCCIAAg2IBghuQAXgcAMgLIgeABIhcAAIAAg5IDVAAIAAAxIhjBxIgiAmIAigCIBqAAIAAA9g");
	this.shape_94.setTransform(161.45,27.375);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAigkA0AAQA4gBAiAmQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgJQALgIAGgUIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_95.setTransform(134.9532,27.4);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#000000").s().p("AgdCCIhpkDIBIAAIAxCEIANAsIAIgWIAHgWIAxiEIBHAAIhnEDg");
	this.shape_96.setTransform(107.175,27.375);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#000000").s().p("AhhByQgYgWAAgiQABgVAKgSQAKgQATgJQATgJAkgHQAvgJATgHIAAgHQAAgVgKgHQgKgJgaAAQgTAAgJAHQgLAIgGARIg+gLQAKgmAagRQAZgSAyAAQAugBAWALQAWALAKARQAJARAAAsIgBBQQAAAhAEARQACAQAJASIhDAAIgGgUIgDgIQgSARgUAJQgTAIgWABQgpgBgWgVgAgCAQQgcAGgJAFQgNAKAAAPQAAAOALAKQALALAQAAQASAAARgMQAMgKAEgNQACgIABgaIAAgNQgOAEgcAHg");
	this.shape_97.setTransform(65.7,27.4);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#000000").s().p("AAxCEIAAiEQAAgpgEgMQgEgMgKgIQgKgGgOAAQgQAAgPAKQgOAJgFARQgFAQgBAqIAAB1IhEAAIAAkCIBAAAIAAAnQAhgsAzAAQAXgBATAJQATAHAJANQAKANADAQQAEAQAAAeIAACgg");
	this.shape_98.setTransform(36.55,27.1);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#000000").s().p("AhJCqQgagMgQgSQgPgUgFgUQgHgfAAg8IAAi+IBIAAIAADBQAAAuADAOQAFAVARAOQASAOAdAAQAfAAAPgNQAQgNADgSQADgSAAgrIAAjFIBJAAIAAC7QAABBgGAaQgGAbgQASQgQATgaAKQgaALgrAAQgyAAgbgMg");
	this.shape_99.setTransform(2.975,22.75);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("EhY6AL4IAA3vMCx1AAAIAAXvg");
	this.shape_100.setTransform(596.4947,84.2177,1.116,1.2578);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.6,-11.4,1270.1999999999998,191.3);


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
	this.shape.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgTgWgPQgfgTAAgmQAAghAbgYQAbgWA4AAQA0AAAaARQAaARAJAiIhAAMQgEgPgMgJQgMgHgUgBQgbAAgMAIQgIAGAAAIQAAAIAHAEQAJAIA2AMQA3AMAWATQAVARAAAgQAAAkgeAZQgdAbg7AAQg0AAgfgWg");
	this.shape.setTransform(848.025,148);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhhByQgYgWAAgiQAAgWALgRQALgQATgJQASgJAkgHQAvgJASgHIAAgHQABgVgKgHQgKgJgaAAQgTAAgJAHQgLAIgGARIg+gLQAKgmAagRQAZgSAyAAQAugBAWALQAWALAKARQAJARAAAsIgBBQQAAAhAEARQACAQAJASIhDAAIgGgUIgDgIQgSARgUAJQgTAIgWABQgpgBgWgVgAgCAQQgcAGgJAGQgNAJAAAPQAAAOALAKQALALAQAAQASAAARgMQAMgKAEgNQACgIAAgaIAAgNQgNAEgcAHg");
	this.shape_1.setTransform(820.9,148);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgdCCIhpkDIBIAAIAxCEIANAsIAIgWIAHgWIAxiEIBHAAIhnEDg");
	this.shape_2.setTransform(792.875,147.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_3.setTransform(772.275,143.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7gBAlAmQAmAnAAA6QAAA6gmAnQgmAng6AAQgigBghgQgAgsg6QgSAVAAAlQAAAmASAVQASAVAaAAQAbAAASgVQASgVAAgmQAAgmgSgUQgSgVgbAAQgaAAgSAVg");
	this.shape_4.setTransform(750.075,148);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgKCsQgPgGgHgKQgHgKgDgQQgCgNAAgkIAAhwIgfAAIAAg3IAfAAIAAgzIBEgpIAABcIAvAAIAAA3IgvAAIAABnQAAAgABAFQABAGAGADQAEAEAHAAQAKAAARgHIAHA1QgZAKgeABQgTAAgNgHg");
	this.shape_5.setTransform(726.45,143.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAxCEIAAiEQAAgpgEgMQgEgMgKgIQgKgGgOAAQgRAAgOAKQgOAJgFARQgFAQgBAqIAAB1IhEAAIAAkCIA/AAIAAAnQAjgsAyAAQAXgBATAJQATAHAJANQAKANADAQQAEAQAAAeIAACgg");
	this.shape_6.setTransform(688.95,147.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAigkA0AAQA4gBAiAmQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgJQALgIAGgUIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_7.setTransform(659.5032,148);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgTgWgPQgfgTAAgmQAAghAbgYQAbgWA4AAQA0AAAaARQAaARAJAiIhAAMQgEgPgMgJQgMgHgUgBQgbAAgMAIQgIAGAAAIQAAAIAHAEQAJAIA2AMQA3AMAWATQAVARAAAgQAAAkgeAZQgdAbg7AAQg0AAgfgWg");
	this.shape_8.setTransform(617.375,148);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7gBAlAmQAmAnAAA6QAAA6gmAnQgmAng6AAQgigBghgQgAgsg6QgSAVAAAlQAAAmASAVQASAVAaAAQAbAAASgVQASgVAAgmQAAgmgSgUQgSgVgbAAQgaAAgSAVg");
	this.shape_9.setTransform(588.925,148);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhdCSQghgkAAhBQAAhAAggjQAegiAwAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgWALQgVALgVAAQgtAAgfgkgAgngQQgQASAAAnQAAAqALASQAQAaAdAAQAYABARgVQARgTAAgoQAAgugRgSQgQgUgZAAQgYAAgQAUg");
	this.shape_10.setTransform(557.7,143.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhiByQgXgWAAgiQAAgWALgRQAKgQAUgJQASgJAkgHQAvgJASgHIAAgHQAAgVgKgHQgJgJgaAAQgTAAgKAHQgKAIgHARIg+gLQALgmAZgRQAagSAzAAQAsgBAXALQAWALAKARQAJARAAAsIgBBQQAAAhADARQAEAQAIASIhDAAIgHgUIgCgIQgSARgUAJQgTAIgXABQgngBgYgVgAgBAQQgdAGgIAGQgOAJAAAPQAAAOAKAKQAMALAQAAQARAAARgMQANgKAEgNQACgIAAgaIAAgNQgNAEgbAHg");
	this.shape_11.setTransform(529.15,148);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AAyCEIAAiEQAAgpgFgMQgEgMgKgIQgKgGgOAAQgQAAgPAKQgOAJgFARQgGAQABAqIAAB1IhFAAIAAkCIA/AAIAAAnQAigsAzAAQAXgBASAJQAUAHAJANQAJANAFAQQADAQAAAeIAACgg");
	this.shape_12.setTransform(500,147.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAigkA0AAQA4gBAiAmQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgJQALgIAGgUIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_13.setTransform(470.5532,148);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhYBjQghgkAAg/QAAg/AhgjQAiglA5ABQAwgBAcAVQAcAUAMAqIhEAMQgDgUgMgLQgNgKgTABQgYAAgQARQgPASAAApQAAAtAQAUQAPASAZABQAUgBAMgKQANgMAFgbIBDAMQgKAugeAXQgeAYgyABQg4AAgiglg");
	this.shape_14.setTransform(443.375,148);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhhByQgYgWAAgiQAAgWALgRQAKgQAUgJQASgJAkgHQAvgJASgHIAAgHQABgVgLgHQgJgJgaAAQgSAAgKAHQgLAIgHARIg+gLQALgmAZgRQAagSAzAAQAsgBAXALQAXALAJARQAJARAAAsIgBBQQAAAhADARQAEAQAIASIhDAAIgHgUIgCgIQgSARgUAJQgTAIgWABQgogBgXgVgAgBAQQgdAGgJAGQgNAJAAAPQAAAOAKAKQALALARAAQASAAAQgMQANgKAEgNQADgIgBgaIAAgNQgNAEgbAHg");
	this.shape_15.setTransform(415.2,148);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AB6CEIAAiSQAAgogHgLQgJgOgUAAQgPAAgMAJQgNAIgGASQgFAQAAAkIAAB8IhEAAIAAiMQAAgmgDgMQgEgLgIgFQgHgFgOAAQgQAAgNAJQgMAIgGAQQgFAQAAAkIAAB+IhEAAIAAkCIA/AAIAAAjQAhgpAwABQAYgBATAKQARALAMAUQARgUATgLQAUgKAXABQAcAAAUALQAUAMAJAWQAIARgBAlIAACkg");
	this.shape_16.setTransform(378.95,147.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_17.setTransform(349.925,143.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhhByQgYgWAAgiQAAgWALgRQALgQATgJQASgJAkgHQAvgJATgHIAAgHQAAgVgKgHQgKgJgaAAQgTAAgJAHQgLAIgGARIg+gLQAKgmAagRQAZgSAyAAQAugBAWALQAWALAKARQAJARAAAsIgBBQQAAAhAEARQACAQAJASIhDAAIgGgUIgDgIQgSARgUAJQgTAIgWABQgpgBgWgVgAgCAQQgcAGgJAGQgNAJAAAPQAAAOALAKQALALAQAAQASAAARgMQAMgKAEgNQACgIABgaIAAgNQgOAEgcAHg");
	this.shape_18.setTransform(329.05,148);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhuCyIgGg1QAQADANAAQAYAAAMgOQALgOAGgWIhikDIBJAAIA9C3IA8i3IBHAAIhbD4IgRAuQgJAWgIAMQgIAMgKAIQgKAHgQAEQgPAEgUAAQgUAAgTgEg");
	this.shape_19.setTransform(287.075,153.225);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgTgWgPQgfgTAAgmQAAghAbgYQAbgWA4AAQA0AAAaARQAaARAJAiIhAAMQgEgPgMgJQgMgHgUgBQgbAAgMAIQgIAGAAAIQAAAIAHAEQAJAIA2AMQA3AMAWATQAVARAAAgQAAAkgeAZQgdAbg7AAQg0AAgfgWg");
	this.shape_20.setTransform(244.975,148);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7gBAlAmQAmAnAAA6QAAA6gmAnQgmAng6AAQgigBghgQgAgsg6QgSAVAAAlQAAAmASAVQASAVAaAAQAbAAASgVQASgVAAgmQAAgmgSgUQgSgVgbAAQgaAAgSAVg");
	this.shape_21.setTransform(216.525,148);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhdCSQgggkgBhBQAAhAAggjQAegiAwAAQAqAAAgAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgWALQgVALgVAAQgtAAgfgkgAgngQQgRASAAAnQAAAqAMASQAQAaAeAAQAXABAQgVQARgTABgoQAAgugRgSQgQgUgZAAQgXAAgRAUg");
	this.shape_22.setTransform(185.3,143.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhiByQgWgWAAgiQAAgWAKgRQALgQASgJQATgJAkgHQAvgJATgHIAAgHQAAgVgLgHQgJgJgaAAQgSAAgLAHQgKAIgHARIg+gLQALgmAZgRQAagSAzAAQAsgBAXALQAXALAJARQAJARAAAsIgBBQQAAAhADARQAEAQAJASIhEAAQgDgGgEgOIgCgIQgSARgUAJQgTAIgXABQgogBgXgVgAgBAQQgdAGgIAGQgOAJAAAPQAAAOAKAKQAMALAQAAQARAAARgMQANgKAEgNQADgIAAgaIAAgNQgNAEgcAHg");
	this.shape_23.setTransform(156.75,148);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhZCjQgbgXgBgiIAAgJIBPAKQACAOAHAFQAKAGATABQAbgBAOgHQAJgGAEgLQAEgJAAgXIAAgmQgfAqguAAQg0AAgegsQgZgjAAgzQABhBAfgjQAfgiAvAAQAvAAAfAqIAAgkIBAAAIAADoQAAAtgHAXQgIAXgNAMQgOAOgWAHQgYAHgjAAQhAAAgcgWgAgnhxQgQAUAAAnQAAApAQATQAQATAXAAQAYgBASgTQARgSAAgoQAAgogQgTQgRgUgaAAQgXABgQASg");
	this.shape_24.setTransform(126.95,152.95);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAigkA0AAQA4gBAiAmQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgJQALgIAGgUIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_25.setTransform(98.1532,148);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhTCEIAAkCIA/AAIAAAlQARgaAMgIQANgJARABQAXgBAWANIgVA8QgSgLgPAAQgOAAgKAIQgJAIgFAVQgHAVABBAIAABQg");
	this.shape_26.setTransform(76.7,147.7);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgKCsQgPgGgHgKQgHgKgDgQQgCgNAAgkIAAhwIgfAAIAAg3IAfAAIAAgzIBEgpIAABcIAvAAIAAA3IgvAAIAABnQAAAgACAFQAAAGAGADQAEAEAHAAQAKAAASgHIAGA1QgZAKgeABQgSAAgOgHg");
	this.shape_27.setTransform(56.75,143.7);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AAxCEIAAiEQABgpgFgMQgEgMgKgIQgKgGgOAAQgQAAgPAKQgOAJgFARQgGAQAAAqIAAB1IhEAAIAAkCIBAAAIAAAnQAhgsAzAAQAXgBATAJQASAHAKANQAJANAFAQQADAQAAAeIAACgg");
	this.shape_28.setTransform(33.15,147.7);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAigkA0AAQA4gBAiAmQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgJQALgIAGgUIBEALQgNAmgcAUQgdAUgrAAQhCAAghgtgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_29.setTransform(3.7032,148);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AAyCFIAAiFQAAgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAQQgGAQABAqIAAB2IhFAAIAAkDIBAAAIAAAnQAigsAygBQAXAAASAJQAUAIAJAMQAJANAFAQQADAQAAAfIAACgg");
	this.shape_30.setTransform(977.9,89.85);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7ABAlAlQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbgBQgaABgSAUg");
	this.shape_31.setTransform(947.375,90.15);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAFAAAJQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_32.setTransform(917.475,90.15);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAFAAAJQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_33.setTransform(875.775,90.15);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_34.setTransform(848.4032,90.15);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_35.setTransform(827.825,85.2);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhhByQgYgWAAghQAAgWALgSQALgQATgJQASgJAkgHQAvgJASgHIAAgIQABgUgKgHQgKgJgaAAQgTAAgJAHQgLAHgGATIg+gMQAKgmAagSQAZgRAygBQAuABAWAKQAWALAKARQAJAQAAAtIgBBPQAAAjAEAQQACAQAJATIhDAAIgGgVIgDgIQgSARgUAJQgTAIgWAAQgpAAgWgVgAgCAQQgcAFgJAGQgNAKAAAPQAAAOALALQALAKAQAAQASAAARgMQAMgKAEgNQACgIAAgaIAAgNQgNAFgcAGg");
	this.shape_36.setTransform(806.95,90.15);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AhOB5QgUgLgKgVQgJgVAAgkIAAikIBEAAIAAB4QAAA1AFANQADAMAKAHQAKAHAQAAQAQAAAOgJQAOgKAFgOQAFgOAAg3IAAhuIBFAAIAAEDIhAAAIAAgnQgOAVgXAMQgXAMgZAAQgaAAgVgMg");
	this.shape_37.setTransform(777.7,90.425);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigkA5AAQAwAAAcAVQAcAUAMAqIhEAMQgDgUgMgLQgNgKgTAAQgYAAgQASQgPASAAApQAAAtAQAUQAPASAZAAQAUABAMgLQANgMAFgbIBDAMQgKAugeAYQgeAXgyAAQg4ABgiglg");
	this.shape_38.setTransform(748.975,90.15);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAFAAAJQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_39.setTransform(706.225,90.15);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7ABAlAlQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbgBQgaABgSAUg");
	this.shape_40.setTransform(677.775,90.15);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_41.setTransform(655.525,85.2);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgkAuQAVgHAIgMQAIgMABgUIghAAIAAhEIBEAAIAAAxQAAAdgFARQgFARgOAOQgOANgWAIg");
	this.shape_42.setTransform(627.275,103.675);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_43.setTransform(613.825,85.2);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_44.setTransform(592.7032,90.15);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AhOB5QgVgLgJgVQgJgVAAgkIAAikIBEAAIAAB4QAAA1AFANQADAMAKAHQAKAHAPAAQARAAAOgJQAOgKAFgOQAFgOAAg3IAAhuIBFAAIAAEDIhAAAIAAgnQgOAVgXAMQgXAMgZAAQgaAAgVgMg");
	this.shape_45.setTransform(563.7,90.425);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AA6C2IAAiCQgOARgUAKQgUAKgXAAQgrAAgdghQgignAAhBQAAg/AggjQAggjAvAAQAYAAATALQATALAOAWIAAgmIBAAAIAAFlgAgmhrQgRATAAArQAAArAQASQAQATAXAAQAYAAARgVQASgVAAgqQAAgngQgUQgQgTgYAAQgYAAgRAUg");
	this.shape_46.setTransform(532.7,94.775);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AgxC2IAAkDIBDAAIAAEDgAg2hsIAhhJIBMAAIhCBJg");
	this.shape_47.setTransform(512.625,84.9);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AAxCFIAAiFQAAgpgEgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAQQgFAQgBAqIAAB2IhEAAIAAkDIBAAAIAAAnQAhgsAzgBQAXAAATAJQATAIAJAMQAKANADAQQAEAQAAAfIAACgg");
	this.shape_48.setTransform(488.8,89.85);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7ABAlAlQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbgBQgaABgSAUg");
	this.shape_49.setTransform(458.275,90.15);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgIQANgJARAAQAXABAWANIgWA7QgRgLgOAAQgPAAgKAIQgJAIgGAVQgFAVAABBIAABQg");
	this.shape_50.setTransform(435.15,89.85);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgIQANgJARAAQAXABAWANIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAVQgFAVAABBIAABQg");
	this.shape_51.setTransform(415.7,89.85);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_52.setTransform(389.9032,90.15);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AgwC2IAAjNIgmAAIAAg2IAmAAIAAgTQgBghAIgPQAHgRASgKQARgKAeAAQAcAAAcAJIgJAwQgQgEgPgBQgPAAgHAIQgGAGAAAUIAAASIAzAAIAAA2IgzAAIAADNg");
	this.shape_53.setTransform(368.9,84.9);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_54.setTransform(331.5532,90.15);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AhdCSQghgkABhAQgBhBAfgjQAggiAvAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgVALQgWALgVAAQgtAAgfgkgAgngQQgQASAAAmQAAArALASQARAbAcAAQAYAAARgVQARgTAAgoQgBgugQgSQgQgTgZgBQgYABgQATg");
	this.shape_55.setTransform(302,85.5);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAFAAAJQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_56.setTransform(258.875,90.15);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7ABAlAlQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbgBQgaABgSAUg");
	this.shape_57.setTransform(230.425,90.15);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_58.setTransform(208.175,85.2);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AhOB5QgUgLgKgVQgJgVAAgkIAAikIBEAAIAAB4QABA1ADANQAEAMAKAHQAKAHAQAAQAQAAAOgJQAOgKAFgOQAFgOAAg3IAAhuIBFAAIAAEDIhAAAIAAgnQgOAVgXAMQgXAMgZAAQgaAAgVgMg");
	this.shape_59.setTransform(185.85,90.425);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AAyCFIAAiFQAAgpgFgMQgEgNgKgGQgKgHgOAAQgRAAgOAJQgOALgFAQQgGAQABAqIAAB2IhFAAIAAkDIA/AAIAAAnQAjgsAygBQAXAAASAJQAUAIAJAMQAKANAEAQQADAQAAAfIAACgg");
	this.shape_60.setTransform(155.4,89.85);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AhhCjQgYgWAAghQAAgWALgRQAKgRAUgJQASgJAkgIQAvgJASgHIAAgHQABgTgLgIQgJgJgaAAQgSABgKAGQgLAIgGASIg+gLQAKgmAZgSQAagSAyAAQAuAAAWALQAWALAKARQAJAQAAAsIgBBQQAAAiAEAQQADAQAIATIhDAAIgHgUIgCgIQgSARgUAJQgTAIgWAAQgpAAgWgWgAgCBBQgcAGgJAGQgNAKAAAOQAAAOAKALQALAKARAAQASAAARgLQAMgKAEgOQADgIgBgZIAAgOQgMAFgdAGgAgihvIAihJIBMAAIhDBJg");
	this.shape_61.setTransform(126.2,85.2);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgIQANgJARAAQAXABAWANIgVA7QgSgLgPAAQgOAAgKAIQgJAIgFAVQgHAVABBBIAABQg");
	this.shape_62.setTransform(104.5,89.85);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AhZCjQgcgXAAgiIAAgJIBPAKQACAOAHAEQAJAIAVAAQAbAAANgJQAJgEAFgNQADgIAAgXIAAgmQgfAqguAAQg0AAgfgsQgYgjAAgzQAAhBAggjQAggiAuAAQAvAAAfAqIAAglIBBAAIAADoQAAAvgIAWQgHAXgPANQgNANgXAHQgXAHgiAAQhCAAgbgWgAgnhwQgQATAAAnQAAApAQATQAQASAXABQAZAAAQgUQASgSAAgoQAAgngRgUQgQgTgZgBQgYAAgQAUg");
	this.shape_63.setTransform(76.95,95.1);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAQQgGAQAAAqIAAB2IhEAAIAAkDIBAAAIAAAnQAhgsAzgBQAXAAATAJQASAIAKAMQAJANAFAQQADAQAAAfIAACgg");
	this.shape_64.setTransform(33.15,89.85);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_65.setTransform(3.7032,90.15);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_66.setTransform(1190.1532,32.3);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgQQgDgMAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfABAGQACAEAEAEQAFADAHAAQAJAAASgGIAGA1QgXALgfgBQgSAAgOgFg");
	this.shape_67.setTransform(1168.2,28);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AAyCFIAAiFQgBgpgEgMQgEgNgKgGQgKgHgOAAQgRAAgOAJQgOALgFAPQgGAQABArIAAB2IhFAAIAAkDIA/AAIAAAmQAigsAzAAQAXABASAHQAUAJAJANQAKAMADAQQAEAQAAAfIAACgg");
	this.shape_68.setTransform(1144.6,32);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_69.setTransform(1115.1532,32.3);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AB6CFIAAiUQAAgmgHgLQgJgPgVAAQgOAAgMAIQgNAKgGAQQgFASAAAjIAAB9IhEAAIAAiOQAAgmgDgKQgEgLgIgGQgHgFgOAAQgQAAgNAIQgMAJgGAQQgFAQAAAlIAAB+IhEAAIAAkDIA/AAIAAAkQAhgqAwAAQAYABATAJQARALALAVQASgVATgLQAUgJAXgBQAcAAAUAMQAUALAJAXQAHARAAAkIAACmg");
	this.shape_70.setTransform(1079.15,32);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AhiBxQgXgVABghQgBgXALgQQALgSASgHQATgKAkgHQAvgJASgHIAAgIQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjADAQQADAQAKATIhEAAQgDgIgEgNIgCgIQgSARgUAJQgTAJgXgBQgnABgYgXgAgBAPQgdAHgIAFQgOAKAAAOQAAAPAKALQAMAKAQAAQARAAARgMQANgJAEgOQACgJAAgZIAAgNQgNAFgbAFg");
	this.shape_71.setTransform(1043.15,32.3);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDAMQgKAugeAYQgeAYgygBQg4AAgigkg");
	this.shape_72.setTransform(1015.725,32.3);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhyIAAhAIBDAAIAABAg");
	this.shape_73.setTransform(994.525,27.35);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_74.setTransform(972.975,32.3);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AgxC2IAAkDIBDAAIAAEDgAg2hsIAhhJIBMAAIhCBJg");
	this.shape_75.setTransform(954.425,27.05);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AgwC2IAAjNIgmAAIAAg2IAmAAIAAgTQgBghAIgPQAGgQATgLQARgKAeAAQAdAAAcAJIgKAvQgQgDgPAAQgPgBgHAIQgGAGAAAUIAAASIAzAAIAAA2IgzAAIAADNg");
	this.shape_76.setTransform(938.5,27.05);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AhiBxQgXgVABghQgBgXALgQQALgSATgHQASgKAkgHQAvgJASgHIAAgIQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjADAQQADAQAKATIhEAAQgDgIgEgNIgCgIQgSARgUAJQgTAJgXgBQgnABgYgXgAgBAPQgdAHgIAFQgOAKAAAOQAAAPAKALQAMAKAQAAQARAAARgMQANgJAEgOQACgJAAgZIAAgNQgNAFgbAFg");
	this.shape_77.setTransform(901.4,32.3);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AB6CFIAAiUQAAgmgHgLQgKgPgTAAQgPAAgMAIQgNAKgGAQQgFASgBAjIAAB9IhDAAIAAiOQAAgmgEgKQgDgLgIgGQgHgFgOAAQgQAAgNAIQgMAJgGAQQgFAQAAAlIAAB+IhFAAIAAkDIA/AAIAAAkQAjgqAuAAQAZABATAJQARALALAVQARgVAUgLQAUgJAXgBQAcAAAUAMQAUALAKAXQAGARAAAkIAACmg");
	this.shape_78.setTransform(865.15,32);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARgBQAXAAAWAOIgVA7QgRgLgQAAQgOAAgKAIQgJAIgGAUQgFAWgBBBIAABQg");
	this.shape_79.setTransform(835.25,32);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_80.setTransform(808.375,32.3);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AgxC2IAAjNIglAAIAAg2IAlAAIAAgTQAAghAIgPQAGgQATgLQARgKAeAAQAcAAAcAJIgJAvQgQgDgPAAQgPgBgHAIQgGAGAAAUIAAASIAzAAIAAA2IgzAAIAADNg");
	this.shape_81.setTransform(785.7,27.05);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_82.setTransform(761.825,32.3);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAPQgGAQAAArIAAB2IhEAAIAAkDIBAAAIAAAmQAhgsAzAAQAXABATAHQASAJAKANQAJAMAFAQQADAQAAAfIAACgg");
	this.shape_83.setTransform(733.35,32);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#000000").s().p("AhiBxQgWgVAAghQAAgXAKgQQAKgSATgHQATgKAkgHQAvgJATgHIAAgIQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQACAQAKATIhEAAIgGgVIgDgIQgSARgUAJQgTAJgXgBQgoABgXgXgAgCAPQgcAHgIAFQgOAKAAAOQAAAPALALQAKAKARAAQARAAASgMQAMgJAEgOQACgJABgZIAAgNQgOAFgcAFg");
	this.shape_84.setTransform(704.15,32.3);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARgBQAXAAAWAOIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAUQgFAWAABBIAABQg");
	this.shape_85.setTransform(682.45,32);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgQQgDgMAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfABAGQABAEAFAEQAFADAHAAQAKAAARgGIAGA1QgYALgegBQgTAAgNgFg");
	this.shape_86.setTransform(662.5,28);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_87.setTransform(626.1032,32.3);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_88.setTransform(597.875,32.3);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_89.setTransform(555.525,32.3);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#000000").s().p("AhdCSQghgkAAhAQAAhCAfghQAggjAvAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgVALQgWALgVAAQgtAAgfgkgAgngQQgQASAAAmQAAAqALATQARAaAcABQAYgBARgTQARgVAAgoQgBgsgQgTQgQgTgZAAQgYAAgQATg");
	this.shape_90.setTransform(524.3,27.65);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgHIAAgIQABgTgLgJQgJgIgaAAQgSAAgKAHQgLAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQADAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAJgWgBQgoABgXgXgAgBAPQgdAHgJAFQgNAKAAAOQAAAPAKALQALAKARAAQASAAAQgMQANgJAEgOQADgJgBgZIAAgNQgNAFgbAFg");
	this.shape_91.setTransform(495.75,32.3);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAPQgGAQAAArIAAB2IhEAAIAAkDIBAAAIAAAmQAhgsAzAAQAXABATAHQASAJAKANQAJAMAFAQQADAQAAAfIAACgg");
	this.shape_92.setTransform(466.6,32);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhyIAAhAIBDAAIAABAg");
	this.shape_93.setTransform(444.375,27.35);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#000000").s().p("AgxC2IAAjNIgmAAIAAg2IAmAAIAAgTQABghAGgPQAIgQASgLQASgKAcAAQAdAAAdAJIgJAvQgRgDgPAAQgPgBgGAIQgHAGAAAUIAAASIA0AAIAAA2Ig0AAIAADNg");
	this.shape_94.setTransform(430.05,27.05);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_95.setTransform(406.6032,32.3);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARgBQAXAAAWAOIgVA7QgSgLgPAAQgOAAgKAIQgJAIgFAUQgHAWAABBIAABQg");
	this.shape_96.setTransform(385.15,32);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_97.setTransform(344.375,32.3);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAggjAvAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASAAAmQAAAqALATQARAaAcABQAYgBARgTQAQgVAAgoQAAgsgQgTQgQgTgZAAQgYAAgQATg");
	this.shape_98.setTransform(313.15,27.65);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhyIAAhAIBDAAIAABAg");
	this.shape_99.setTransform(291.575,27.35);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#000000").s().p("AhOB5QgVgLgJgVQgJgVAAgkIAAikIBFAAIAAB4QAAA1ADANQAEAMAKAHQAKAHAPAAQARAAAOgJQAOgKAFgOQAFgOAAg3IAAhuIBFAAIAAEDIhAAAIAAgnQgOAVgXAMQgWAMgaAAQgaAAgVgMg");
	this.shape_100.setTransform(269.25,32.575);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#000000").s().p("AA5C2IAAiCQgNARgUAKQgUAKgWAAQgtAAgcghQgignAAhBQAAg/AggjQAggjAuAAQAZAAATALQATALAPAWIAAgmIA/AAIAAFlgAgmhrQgQATAAArQAAArAPASQARATAWAAQAYAAARgVQATgVgBgqQAAgngPgUQgRgTgYAAQgZAAgQAUg");
	this.shape_101.setTransform(238.25,36.925);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#000000").s().p("AgxC2IAAkDIBDAAIAAEDgAg2hsIAhhJIBMAAIhCBJg");
	this.shape_102.setTransform(218.175,27.05);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_103.setTransform(202.675,27.35);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_104.setTransform(174.875,27.35);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQALgSATgHQASgKAkgHQAvgJASgHIAAgIQABgTgKgJQgKgIgaAAQgTAAgJAHQgLAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQACAQAJATIhDAAIgGgVIgDgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPALALQALAKAQAAQASAAARgMQAMgJAEgOQACgJAAgZIAAgNQgNAFgcAFg");
	this.shape_105.setTransform(154,32.3);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgQQgCgMAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfACAGQABAEAEAEQAFADAHAAQAJAAATgGIAFA1QgXALgfgBQgSAAgOgFg");
	this.shape_106.setTransform(131.8,28);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_107.setTransform(109.3032,32.3);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#000000").s().p("AB6CFIAAiUQAAgmgHgLQgJgPgVAAQgOAAgNAIQgMAKgGAQQgGASABAjIAAB9IhEAAIAAiOQAAgmgDgKQgFgLgHgGQgIgFgNAAQgQAAgMAIQgNAJgGAQQgFAQAAAlIAAB+IhEAAIAAkDIA/AAIAAAkQAhgqAwAAQAYABATAJQARALAMAVQARgVAUgLQATgJAXgBQAcAAAUAMQAUALAJAXQAIARgBAkIAACmg");
	this.shape_108.setTransform(73.3,32);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_109.setTransform(30.375,27.35);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#000000").s().p("AiHCzIAAllIEIAAIAAA8IjAAAIAABQICzAAIAAA8IizAAIAABhIDHAAIAAA8g");
	this.shape_110.setTransform(7.25,27.35);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("EhY6AL4IAA3vMCx1AAAIAAXvg");
	this.shape_111.setTransform(581.7947,93.1003,1.116,1.3745);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53.3,-11.4,1289.7,209);


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
	this.shape.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAFAAAJQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape.setTransform(1167.675,90.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhiByQgWgWAAghQAAgWAKgSQALgQASgJQATgJAkgHQAvgJATgHIAAgIQgBgUgJgHQgKgJgaAAQgSAAgLAHQgKAHgHATIg+gMQALgmAZgSQAagRAygBQAtABAXAKQAXALAJARQAJAQAAAtIgBBPQAAAjADAQQAEAQAJATIhEAAIgGgVIgDgIQgSARgUAJQgTAIgXAAQgoAAgXgVgAgCAQQgcAFgIAGQgOAKAAAPQAAAOALALQAKAKARAAQARAAARgMQANgKAEgNQADgIAAgaIAAgNQgOAFgcAGg");
	this.shape_1.setTransform(1140.55,90.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhdCSQghgkAAhAQAAhBAfgjQAfgiAwAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgWALQgVALgVAAQgtAAgfgkgAgngQQgQASAAAmQAAArALASQARAbAcAAQAYAAARgVQARgTAAgoQAAgugRgSQgQgTgZgBQgYABgQATg");
	this.shape_2.setTransform(1110.75,85.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhiByQgXgWAAghQAAgWALgSQAKgQAUgJQASgJAkgHQAvgJASgHIAAgIQAAgUgKgHQgJgJgaAAQgTAAgJAHQgLAHgHATIg+gMQALgmAZgSQAagRAzgBQAsABAXAKQAWALAKARQAJAQAAAtIgBBPQAAAjADAQQADAQAJATIhDAAIgHgVIgCgIQgSARgUAJQgTAIgWAAQgoAAgYgVgAgBAQQgdAFgIAGQgOAKAAAPQAAAOAKALQALAKARAAQARAAARgMQANgKAEgNQACgIAAgaIAAgNQgNAFgbAGg");
	this.shape_3.setTransform(1082.2,90.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_4.setTransform(1054.1532,90.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAFAAAJQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_5.setTransform(1025.925,90.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_6.setTransform(998.5532,90.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhdCSQghgkAAhAQAAhBAggjQAegiAwAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgWALQgVALgVAAQgtAAgfgkgAgngQQgQASAAAmQAAArALASQAQAbAdAAQAYAAARgVQARgTAAgoQAAgugRgSQgQgTgZgBQgYABgQATg");
	this.shape_7.setTransform(969,85.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7ABAlAlQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbgBQgaABgSAUg");
	this.shape_8.setTransform(925.225,90.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AAyCFIAAiFQAAgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAQQgGAQABAqIAAB2IhFAAIAAkDIBAAAIAAAnQAigsAygBQAXAAASAJQAUAIAJAMQAJANAFAQQADAQAAAfIAACgg");
	this.shape_9.setTransform(894.65,89.85);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAFAAAJQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_10.setTransform(850.875,90.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhiByQgWgWAAghQAAgWAKgSQALgQASgJQATgJAkgHQAvgJATgHIAAgIQgBgUgJgHQgKgJgaAAQgSAAgLAHQgKAHgHATIg9gMQAKgmAagSQAZgRAygBQAtABAXAKQAXALAJARQAJAQAAAtIgBBPQAAAjADAQQAEAQAJATIhEAAIgGgVIgDgIQgSARgUAJQgTAIgXAAQgoAAgXgVgAgCAQQgcAFgIAGQgOAKAAAPQAAAOALALQAKAKARAAQARAAASgMQAMgKAEgNQADgIAAgaIAAgNQgNAFgdAGg");
	this.shape_11.setTransform(823.75,90.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhzIAAg/IBDAAIAAA/g");
	this.shape_12.setTransform(802.925,85.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigkA5AAQAwAAAcAVQAcAUAMAqIhEAMQgDgUgMgLQgNgKgTAAQgYAAgQASQgPASAAApQAAAtAQAUQAPASAZAAQAUABAMgLQANgMAFgbIBDAMQgKAugeAYQgeAXgyAAQg4ABgiglg");
	this.shape_13.setTransform(782.425,90.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AAyCFIAAiFQAAgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAQQgGAQABAqIAAB2IhFAAIAAkDIBAAAIAAAnQAigsAygBQAXAAASAJQAUAIAJAMQAJANAFAQQADAQAAAfIAACgg");
	this.shape_14.setTransform(752.9,89.85);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhhByQgYgWAAghQAAgWALgSQALgQATgJQASgJAkgHQAvgJASgHIAAgIQABgUgKgHQgKgJgaAAQgTAAgJAHQgLAHgGATIg+gMQAKgmAagSQAZgRAygBQAuABAWAKQAWALAKARQAJAQAAAtIgBBPQAAAjAEAQQACAQAJATIhDAAIgGgVIgDgIQgSARgUAJQgTAIgWAAQgpAAgWgVgAgCAQQgcAFgJAGQgNAKAAAPQAAAOALALQALAKAQAAQASAAARgMQAMgKAEgNQACgIAAgaIAAgNQgNAFgcAGg");
	this.shape_15.setTransform(723.7,90.15);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgQQgCgMAAglIAAhwIggAAIAAg3IAgAAIAAgzIBEgoIAABbIAvAAIAAA3IgvAAIAABnQAAAgACAGQABAFAEADQAFADAHABQAJgBATgGIAFA1QgXAKgfAAQgSAAgOgFg");
	this.shape_16.setTransform(701.5,85.85);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAFAAAJQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_17.setTransform(678.575,90.15);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhOB5QgUgLgKgVQgJgVAAgkIAAikIBEAAIAAB4QAAA1AFANQADAMAKAHQAKAHAPAAQARAAAOgJQAOgKAFgOQAFgOAAg3IAAhuIBFAAIAAEDIhAAAIAAgnQgOAVgXAMQgXAMgZAAQgaAAgVgMg");
	this.shape_18.setTransform(650,90.425);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAFAAAJQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_19.setTransform(620.225,90.15);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_20.setTransform(578.9532,90.15);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhBAegjQAggiAvAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASAAAmQAAArALASQARAbAcAAQAYAAARgVQAQgTAAgoQAAgugQgSQgQgTgZgBQgYABgQATg");
	this.shape_21.setTransform(549.4,85.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAFAAAJQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_22.setTransform(506.275,90.15);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7ABAlAlQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbgBQgaABgSAUg");
	this.shape_23.setTransform(477.825,90.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgQQgCgMAAglIAAhwIgfAAIAAg3IAfAAIAAgzIBEgoIAABbIAvAAIAAA3IgvAAIAABnQAAAgABAGQABAFAGADQAEADAHABQAKgBARgGIAHA1QgZAKgeAAQgSAAgOgFg");
	this.shape_24.setTransform(454.2,85.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAFAAAJQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_25.setTransform(431.275,90.15);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_26.setTransform(403.9032,90.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgIQANgJARAAQAXABAWANIgVA7QgSgLgPAAQgOAAgKAIQgJAIgFAVQgHAVAABBIAABQg");
	this.shape_27.setTransform(382.45,89.85);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAFAAAJQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_28.setTransform(342.325,90.15);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7ABAlAlQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbgBQgaABgSAUg");
	this.shape_29.setTransform(313.875,90.15);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_30.setTransform(291.625,85.2);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AAyCFIAAiFQgBgpgEgMQgEgNgKgGQgKgHgOAAQgRAAgOAJQgOALgFAQQgFAQAAAqIAAB2IhFAAIAAkDIA/AAIAAAnQAjgsAygBQAXAAASAJQATAIAKAMQAKANADAQQAEAQAAAfIAACgg");
	this.shape_31.setTransform(255.5,89.85);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhiByQgXgWAAghQAAgWALgSQAKgQAUgJQASgJAkgHQAvgJASgHIAAgIQAAgUgKgHQgJgJgaAAQgTAAgKAHQgKAHgHATIg+gMQALgmAZgSQAagRAzgBQAsABAXAKQAWALAKARQAJAQAAAtIgBBPQAAAjADAQQAEAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAIgXAAQgnAAgYgVgAgBAQQgdAFgIAGQgOAKAAAPQAAAOAKALQAMAKAQAAQARAAARgMQANgKAEgNQACgIAAgaIAAgNQgNAFgbAGg");
	this.shape_32.setTransform(226.3,90.15);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgIQANgJARAAQAXABAWANIgVA7QgRgLgQAAQgOAAgKAIQgJAIgFAVQgHAVAABBIAABQg");
	this.shape_33.setTransform(204.6,89.85);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhzIAAg/IBDAAIAAA/g");
	this.shape_34.setTransform(186.025,85.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgQQgCgMAAglIAAhwIggAAIAAg3IAgAAIAAgzIBEgoIAABbIAvAAIAAA3IgvAAIAABnQAAAgACAGQABAFAEADQAFADAHABQAJgBATgGIAFA1QgYAKgeAAQgTAAgNgFg");
	this.shape_35.setTransform(170.75,85.85);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_36.setTransform(148.2532,90.15);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgIQANgJARAAQAXABAWANIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAVQgFAVAABBIAABQg");
	this.shape_37.setTransform(126.8,89.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_38.setTransform(87.1032,90.15);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_39.setTransform(66.525,85.2);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_40.setTransform(31.5032,90.15);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAFAAAJQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_41.setTransform(3.275,90.15);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgkAuQAVgHAIgMQAIgMABgUIghAAIAAhEIBEAAIAAAxQAAAdgFARQgFARgOAOQgOANgWAIg");
	this.shape_42.setTransform(994.125,45.825);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_43.setTransform(972.375,32.3);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAfgjAwAAQArAAAfAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASgBAmQAAAqAMATQAQAaAeABQAXgBAQgTQASgVgBgoQAAgsgQgTQgQgTgZAAQgYAAgQATg");
	this.shape_44.setTransform(941.15,27.65);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AhhBxQgXgVAAghQAAgXAKgQQAKgSATgHQATgKAkgHQAvgJATgHIAAgIQAAgTgKgJQgKgIgaAAQgTAAgJAHQgLAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQACAQAJATIhDAAIgGgVIgDgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPALALQALAKAQAAQARAAASgMQAMgJAEgOQACgJABgZIAAgNQgOAFgcAFg");
	this.shape_45.setTransform(912.6,32.3);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgQQgCgMAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfACAGQABAEAEAEQAFADAHAAQAJAAATgGIAFA1QgXALgfgBQgTAAgNgFg");
	this.shape_46.setTransform(890.4,28);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARgBQAXAAAWAOIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAUQgFAWAABBIAABQg");
	this.shape_47.setTransform(874.25,32);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_48.setTransform(847.375,32.3);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("Ah9C2IAAllIBAAAIAAAmQAMgTAVgNQAVgMAZAAQAuAAAfAkQAfAjABA/QAABAghAkQgfAkgtAAQgVAAgRgIQgSgJgTgVIAACDgAgphrQgRATAAAmQAAAsARAUQASAVAYAAQAYAAAPgTQAQgTAAgrQAAgpgQgUQgQgUgYAAQgZAAgQAUg");
	this.shape_49.setTransform(817.5,36.925);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_50.setTransform(786.925,32.3);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAPQgFAQgBArIAAB2IhEAAIAAkDIBAAAIAAAmQAhgsAzAAQAXABATAHQATAJAJANQAJAMAEAQQAEAQAAAfIAACgg");
	this.shape_51.setTransform(758.45,32);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AhiBxQgWgVAAghQAAgXAKgQQALgSASgHQATgKAkgHQAvgJATgHIAAgIQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAHgHATIg9gMQAKglAagTQAZgSAyAAQAtAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjADAQQAEAQAJATIhEAAIgGgVIgDgIQgSARgUAJQgTAJgXgBQgoABgXgXgAgCAPQgcAHgIAFQgOAKAAAOQAAAPALALQAKAKARAAQARAAASgMQAMgJAEgOQADgJAAgZIAAgNQgOAFgcAFg");
	this.shape_52.setTransform(729.25,32.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARgBQAXAAAWAOIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAUQgFAWgBBBIAABQg");
	this.shape_53.setTransform(707.55,32);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgQQgDgMAAglIAAhwIgfAAIAAg3IAfAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfABAGQACAEAEAEQAFADAHAAQAJAAASgGIAGA1QgXALgfgBQgSAAgOgFg");
	this.shape_54.setTransform(687.6,28);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AhuCyIgGg1QAQADANAAQAYAAAMgOQALgOAGgWIhikDIBJAAIA9C3IA8i3IBHAAIhbD4IgRAuQgJAWgIAMQgIAMgKAIQgKAHgQAEQgPAEgUAAQgUAAgTgEg");
	this.shape_55.setTransform(651.175,37.525);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_56.setTransform(608.425,32.3);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAggjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASAAAmQgBAqAMATQARAaAcABQAYgBAQgTQASgVgBgoQAAgsgQgTQgQgTgZAAQgXAAgRATg");
	this.shape_57.setTransform(577.2,27.65);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQALgSATgHQASgKAkgHQAvgJASgHIAAgIQABgTgKgJQgKgIgaAAQgTAAgJAHQgLAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQACAQAJATIhDAAIgGgVIgDgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPALALQALAKAQAAQASAAARgMQAMgJAEgOQACgJAAgZIAAgNQgNAFgcAFg");
	this.shape_58.setTransform(548.65,32.3);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_59.setTransform(527.825,27.35);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_60.setTransform(505.625,32.3);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDAMQgKAugeAYQgeAYgygBQg4AAgigkg");
	this.shape_61.setTransform(476.775,32.3);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_62.setTransform(434.025,32.3);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_63.setTransform(406.6532,32.3);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_64.setTransform(372.175,27.35);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgHIAAgIQABgTgLgJQgJgIgaAAQgTAAgJAHQgLAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjAEAQQADAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAJgWgBQgoABgXgXgAgBAPQgdAHgJAFQgNAKAAAOQAAAPAKALQALAKARAAQASAAAQgMQANgJAEgOQADgJgBgZIAAgNQgNAFgbAFg");
	this.shape_65.setTransform(351.3,32.3);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgQQgCgMAAglIAAhwIgfAAIAAg3IAfAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfABAGQABAEAGAEQAEADAHAAQAKAAARgGIAHA1QgZALgegBQgSAAgOgFg");
	this.shape_66.setTransform(329.1,28);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_67.setTransform(306.6032,32.3);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AB6CFIAAiUQAAgmgHgLQgJgPgUAAQgPAAgMAIQgNAKgGAQQgFASgBAjIAAB9IhDAAIAAiOQAAgmgDgKQgEgLgIgGQgHgFgOAAQgQAAgNAIQgMAJgGAQQgFAQAAAlIAAB+IhEAAIAAkDIA/AAIAAAkQAigqAuAAQAZABATAJQARALALAVQARgVAUgLQAUgJAXgBQAcAAAUAMQAUALAKAXQAGARAAAkIAACmg");
	this.shape_68.setTransform(270.6,32);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_69.setTransform(227.675,27.35);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_70.setTransform(206.5532,32.3);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AhyCCIAAg2IBhhuQAXgcALgLIgfABIhbAAIAAg5IDVAAIAAAxIhjBxIgiAmIAjgCIBqAAIAAA9g");
	this.shape_71.setTransform(166.35,32.275);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_72.setTransform(139.8532,32.3);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AgdCCIhpkDIBIAAIAxCEIANAsIAIgWIAHgWIAxiEIBHAAIhnEDg");
	this.shape_73.setTransform(112.075,32.275);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgHIAAgIQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAWAKAKARQAJARAAAsIgBBPQAAAjADAQQAEAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAJgXgBQgnABgXgXgAgBAPQgdAHgIAFQgOAKAAAOQAAAPAKALQAMAKAQAAQARAAARgMQANgJAEgOQACgJAAgZIAAgNQgNAFgbAFg");
	this.shape_74.setTransform(70.6,32.3);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AAyCFIAAiFQAAgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAPQgGAQABArIAAB2IhFAAIAAkDIA/AAIAAAmQAjgsAyAAQAXABASAHQAUAJAJANQAJAMAFAQQADAQAAAfIAACgg");
	this.shape_75.setTransform(41.45,32);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AhJCrQgagMgQgUQgPgSgFgVQgHgfAAg8IAAi+IBIAAIAADBQAAAuADAOQAFAWARANQASANAdAAQAfAAAPgMQAQgNADgSQADgTAAgqIAAjFIBJAAIAAC7QAABBgGAaQgGAbgQASQgQASgaAMQgaAKgrAAQgyAAgbgLg");
	this.shape_76.setTransform(7.875,27.65);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("EhY6AL4IAA3vMCx1AAAIAAXvg");
	this.shape_77.setTransform(577.849,55.1359,1.0949,0.8744);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45.3,-11.3,1281.7,132.9);


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
	this.shape.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape.setTransform(735.525,92.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_1.setTransform(707.075,92.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARgBQAXAAAWAOIgVA7QgSgLgPAAQgOAAgKAIQgJAIgFAUQgHAWAABBIAABQg");
	this.shape_2.setTransform(683.95,91.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_3.setTransform(658.1532,92.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAggjAvAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASAAAmQAAAqALATQARAaAcABQAYgBARgTQAQgVAAgnQAAgtgQgTQgQgTgZAAQgYAAgQATg");
	this.shape_4.setTransform(628.6,87.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgIIAAgHQABgTgKgJQgKgIgaAAQgSAAgKAHQgLAHgGATIg/gMQALglAagTQAZgSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQADAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPAKALQALAKARAAQASAAAQgMQANgJAEgOQADgJgBgZIAAgNQgMAFgdAFg");
	this.shape_5.setTransform(600.05,92.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgLAAglIAAhwIgfAAIAAg3IAfAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfACAGQAAAEAGAEQAEADAHAAQAKAAASgGIAGA1QgZALgegBQgSAAgOgFg");
	this.shape_6.setTransform(577.85,87.85);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_7.setTransform(554.275,92.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgZCrQgVgMgQgVIAAAmIhAAAIAAllIBFAAIAACBQAggkAqAAQAvAAAgAjQAeAhAABAQAABCgfAkQgfAkguAAQgVAAgWgLgAgpgQQgQARAAAnQAAApANAUQARAbAcAAQAXgBARgSQAPgUAAgqQAAgsgQgTQgQgTgYAAQgYgBgRAUg");
	this.shape_8.setTransform(524.3,87.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_9.setTransform(479.925,92.15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_10.setTransform(451.475,92.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_11.setTransform(429.225,87.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhiBxQgWgVAAghQAAgXAKgQQALgSASgHQATgKAkgHQAvgJATgIIAAgHQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAHgHATIg9gMQAKglAagTQAZgSAyAAQAtAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjADAQQAEAQAJATIhEAAIgGgVIgDgIQgSARgUAJQgTAJgXgBQgoABgXgXgAgCAPQgcAHgIAFQgOAKAAAOQAAAPALALQAKAKARAAQARAAASgMQAMgJAEgOQADgJAAgZIAAgNQgNAFgdAFg");
	this.shape_12.setTransform(394.45,92.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhiBxQgXgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAWAKAKARQAJARAAAsIgBBPQAAAjADAQQAEAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAJgXgBQgnABgYgXgAgBAPQgdAHgIAFQgOAKAAAOQAAAPAKALQAMAKAQAAQARAAARgMQANgJAEgOQACgJAAgZIAAgNQgNAFgbAFg");
	this.shape_13.setTransform(352.75,92.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAggjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASAAAmQgBAqAMATQARAaAdABQAXgBAQgTQASgVgBgnQAAgtgQgTQgQgTgZAAQgXAAgRATg");
	this.shape_14.setTransform(322.95,87.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQALgSATgHQASgKAkgHQAvgJATgIIAAgHQAAgTgKgJQgKgIgaAAQgTAAgJAHQgLAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQACAQAJATIhDAAIgGgVIgDgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPALALQALAKAQAAQASAAARgMQAMgJAEgOQACgJABgZIAAgNQgOAFgcAFg");
	this.shape_15.setTransform(294.4,92.15);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgdCCIhpkDIBIAAIAxCEIANAsIAIgWIAHgWIAxiEIBHAAIhnEDg");
	this.shape_16.setTransform(266.375,92.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_17.setTransform(238.5532,92.15);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_18.setTransform(217.975,87.2);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_19.setTransform(204.075,87.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhuCyIgGg1QAQADANAAQAYAAAMgOQALgOAGgWIhikDIBJAAIA9C3IA8i3IBHAAIhbD4IgRAuQgJAWgIAMQgIAMgKAIQgKAHgQAEQgPAEgUAAQgUAAgTgEg");
	this.shape_20.setTransform(169.025,97.375);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_21.setTransform(126.925,92.15);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_22.setTransform(98.475,92.15);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAPQgGAQAAArIAAB2IhEAAIAAkDIBAAAIAAAmQAhgsAzAAQAXABATAHQASAJAKANQAJAMAFAQQADAQAAAfIAACgg");
	this.shape_23.setTransform(67.9,91.85);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARgBQAXAAAWAOIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAUQgFAWAABBIAABQg");
	this.shape_24.setTransform(44.8,91.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_25.setTransform(17.925,92.15);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AAxCzIAAiJQAAgogEgLQgDgKgKgHQgKgHgPABQgQAAgOAIQgNAIgGAQQgHARAAAgIAACCIhEAAIAAllIBEAAIAACDQAigmAtAAQAYAAATAJQATAIAJAOQAKAOAEARQADAQAAAiIAACYg");
	this.shape_26.setTransform(-12.65,87.2);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_27.setTransform(641.125,34.3);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_28.setTransform(612.675,34.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_29.setTransform(590.425,29.35);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_30.setTransform(555.4032,34.3);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AhdCSQghgkAAhAQAAhCAgghQAegjAwAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgWALQgVALgVAAQgtAAgfgkgAgngQQgRASABAmQgBArAMASQAQAbAdgBQAYAAARgTQAQgVABgoQAAgsgRgTQgQgUgZABQgXgBgRAUg");
	this.shape_31.setTransform(525.85,29.65);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQALgRATgIQASgKAkgHQAvgJATgIIAAgHQAAgTgKgJQgKgIgaAAQgTAAgJAHQgLAIgGASIg+gMQAKgmAagRQAZgTAyABQAuAAAWALQAWAKAKARQAJARAAAsIgBBQQAAAhAEARQACAQAJATIhDAAIgGgVIgDgIQgSASgUAIQgTAJgWAAQgpAAgWgXgAgCAPQgcAGgJAHQgNAJAAAOQAAAPALAKQALALAQAAQASAAARgMQAMgJAEgOQACgIABgZIAAgOQgOAFgcAFg");
	this.shape_32.setTransform(483.4,34.3);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AheCSQgfgkgBhAQABhCAfghQAfgjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgWALQgVALgVAAQgtAAgggkgAgngQQgRASAAAmQAAArAMASQAQAbAegBQAXAAAQgTQARgVAAgoQAAgsgQgTQgQgUgZABQgYgBgQAUg");
	this.shape_33.setTransform(453.6,29.65);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhiBxQgWgVAAgiQAAgWAKgQQALgRASgIQATgKAkgHQAvgJATgIIAAgHQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAIgHASIg9gMQAKgmAagRQAZgTAyABQAtAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhADARQAEAQAJATIhEAAIgGgVIgDgIQgSASgUAIQgTAJgXAAQgoAAgXgXgAgCAPQgcAGgIAHQgOAJAAAOQAAAPALAKQAKALARAAQARAAASgMQAMgJAEgOQADgIAAgZIAAgOQgNAFgdAFg");
	this.shape_34.setTransform(425.05,34.3);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AAyCFIAAiFQgBgpgEgMQgEgMgKgIQgKgGgOAAQgRAAgOAJQgOAKgFAQQgFARAAAqIAAB2IhFAAIAAkDIA/AAIAAAmQAjgrAyAAQAXAAASAHQATAJAKANQAKAMADAQQAEARAAAdIAAChg");
	this.shape_35.setTransform(395.9,34);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_36.setTransform(366.4532,34.3);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARAAQAXAAAWAMIgVA8QgRgLgQAAQgOAAgKAIQgJAIgFAUQgHAVAABBIAABRg");
	this.shape_37.setTransform(345,34);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAfgjAwAAQArAAAfAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASgBAmQAAArAMASQAQAbAegBQAXAAAQgTQASgVgBgoQAAgsgQgTQgQgUgZABQgYgBgQAUg");
	this.shape_38.setTransform(317.45,29.65);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_39.setTransform(274.325,34.3);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_40.setTransform(246.9532,34.3);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQAKgRAUgIQASgKAkgHQAvgJASgIIAAgHQABgTgLgJQgJgIgaAAQgSAAgKAHQgLAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhADARQAEAQAIATIhDAAIgHgVIgCgIQgSASgUAIQgTAJgWAAQgoAAgXgXgAgBAPQgdAGgJAHQgNAJAAAOQAAAPAKAKQALALARAAQASAAAQgMQANgJAEgOQADgIgBgZIAAgOQgNAFgbAFg");
	this.shape_41.setTransform(205.5,34.3);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_42.setTransform(184.675,29.35);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARAAQAXAAAWAMIgWA8QgQgLgPAAQgPAAgKAIQgJAIgGAUQgFAVAABBIAABRg");
	this.shape_43.setTransform(169.9,34);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_44.setTransform(143.025,34.3);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AhYBkQghgkAAhAQAAg/AhgjQAigkA5AAQAwAAAcAUQAcAUAMAqIhEAMQgDgUgMgKQgNgKgTAAQgYAAgQARQgPARAAAqQAAAuAQASQAPAUAZgBQAUAAAMgLQANgLAFgbIBDALQgKAvgeAYQgeAYgyAAQg4gBgigjg");
	this.shape_45.setTransform(114.175,34.3);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_46.setTransform(85.325,34.3);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_47.setTransform(57.9532,34.3);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQAKgRAUgIQASgKAkgHQAvgJASgIIAAgHQABgTgLgJQgJgIgaAAQgTAAgJAHQgLAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhADARQAEAQAIATIhDAAIgHgVIgCgIQgSASgUAIQgTAJgWAAQgoAAgXgXgAgBAPQgdAGgJAHQgNAJAAAOQAAAPAKAKQALALARAAQASAAAQgMQANgJAEgOQADgIgBgZIAAgOQgNAFgbAFg");
	this.shape_48.setTransform(16.5,34.3);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("Ah9CyIAAliIBIAAIAAElICzAAIAAA9g");
	this.shape_49.setTransform(-11.55,29.5);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("EhY6AL4IAA3vMCx1AAAIAAXvg");
	this.shape_50.setTransform(364.4013,58.7479,0.7197,0.9206);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45.2,-11.2,819.2,140);


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
	this.shape.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape.setTransform(544.2032,150);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgQQgDgMAAglIAAhwIgfAAIAAg3IAfAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABnQAAAgABAGQABAFAGADQAEADAHABQAJgBASgGIAHA1QgZAKgeAAQgSAAgOgFg");
	this.shape_1.setTransform(522.25,145.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAyCFIAAiFQAAgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAQQgGAQABAqIAAB2IhFAAIAAkDIA/AAIAAAmQAjgrAygBQAXAAASAJQATAIAKAMQAJANAFAQQADAQAAAfIAACgg");
	this.shape_2.setTransform(498.65,149.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_3.setTransform(469.2032,150);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AB6CFIAAiUQAAgngHgKQgKgPgUAAQgOAAgNAJQgMAJgGARQgGARABAjIAAB9IhEAAIAAiNQAAgngDgLQgFgKgHgGQgIgFgNAAQgQAAgMAJQgNAIgFAQQgGAQAAAlIAAB+IhEAAIAAkDIA/AAIAAAkQAhgpAwgBQAYAAASAKQASALAMAVQAQgVAVgLQATgKAXAAQAcAAAUAMQAUAMAJAWQAIAQAAAlIAACmg");
	this.shape_4.setTransform(433.2,149.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhhByQgYgWAAghQAAgWALgSQAKgQAUgJQASgJAkgHQAvgJASgHIAAgIQABgUgLgHQgJgJgaAAQgTAAgJAHQgLAHgHATIg+gMQALgmAZgSQAagRAzgBQAsABAXAKQAXALAJARQAJAQAAAtIgBBPQAAAjADAQQAEAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAIgWAAQgoAAgXgVgAgBAQQgdAFgJAGQgNAKAAAPQAAAOAKALQALAKARAAQASAAAQgMQANgKAEgNQADgIgBgaIAAgNQgNAFgbAGg");
	this.shape_5.setTransform(397.2,150);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgQQgCgMAAglIAAhwIgfAAIAAg3IAfAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABnQAAAgABAGQABAFAGADQAEADAHABQAKgBARgGIAHA1QgZAKgeAAQgSAAgOgFg");
	this.shape_6.setTransform(375,145.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_7.setTransform(352.5032,150);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_8.setTransform(331.925,145.05);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("Ah+C2IAAllIBAAAIAAAmQANgTAVgNQAVgMAZAAQAtAAAgAkQAgAjgBA/QAABAgfAkQggAkguAAQgUAAgRgIQgSgJgTgVIAACDgAgphrQgQATAAAmQAAAsARAUQARAVAYAAQAYAAAQgTQAQgTAAgrQAAgpgRgUQgQgUgYAAQgZAAgQAUg");
	this.shape_9.setTransform(310.4,154.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AB6CFIAAiUQAAgngHgKQgKgPgTAAQgPAAgMAJQgNAJgGARQgFARgBAjIAAB9IhDAAIAAiNQAAgngEgLQgDgKgIgGQgHgFgOAAQgQAAgNAJQgMAIgGAQQgFAQAAAlIAAB+IhFAAIAAkDIA/AAIAAAkQAjgpAugBQAZAAATAKQARALALAVQARgVAUgLQAUgKAXAAQAcAAAUAMQAUAMAKAWQAGAQAAAlIAACmg");
	this.shape_10.setTransform(272.05,149.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7ABAlAlQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbgBQgaABgSAUg");
	this.shape_11.setTransform(234.725,150);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigkA5AAQAwAAAcAVQAcAUAMAqIhEAMQgDgUgMgLQgNgKgTAAQgYAAgQASQgPARAAAqQAAAtAQAUQAPASAZAAQAUABAMgLQANgMAFgbIBDAMQgKAugeAYQgeAXgyAAQg4ABgiglg");
	this.shape_12.setTransform(205.875,150);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_13.setTransform(163.5532,150);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigkA5AAQAwAAAcAVQAcAUAMAqIhEAMQgDgUgMgLQgNgKgTAAQgYAAgQASQgPARAAAqQAAAtAQAUQAPASAZAAQAUABAMgLQANgMAFgbIBDAMQgKAugeAYQgeAXgyAAQg4ABgiglg");
	this.shape_14.setTransform(136.375,150);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhOB5QgUgLgKgVQgJgVAAgkIAAikIBEAAIAAB4QAAA1AFANQADAMAKAHQAKAHAQAAQAQAAAOgJQAOgKAFgOQAFgOAAg3IAAhuIBFAAIAAEDIhAAAIAAgnQgOAVgXAMQgXAMgZAAQgaAAgVgMg");
	this.shape_15.setTransform(106.75,150.275);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhdCSQghgkAAhAQAAhBAfgjQAggiAvAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgVALQgWALgVAAQgtAAgfgkgAgngQQgQASAAAmQAAArALASQARAbAcAAQAYAAARgVQARgTAAgoQgBgugQgSQgQgTgZgBQgYABgQATg");
	this.shape_16.setTransform(75.65,145.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_17.setTransform(46.8532,150);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgIQANgJARAAQAXABAWANIgVA7QgSgLgPAAQgOAAgKAIQgJAIgFAVQgHAVABBBIAABQg");
	this.shape_18.setTransform(25.4,149.7);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhuCyIgGg1QAQADANAAQAYAAAMgOQALgOAGgWIhikDIBJAAIA9C3IA8i3IBHAAIhbD4IgRAuQgJAWgIAMQgIAMgKAIQgKAHgQAEQgPAEgUAAQgUAAgTgEg");
	this.shape_19.setTransform(-14.325,155.225);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_20.setTransform(647.0032,92.15);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhdCSQghgkAAhAQAAhCAfghQAggjAvAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgVALQgWALgVAAQgtAAgfgkgAgngQQgQASAAAmQAAAqALATQARAaAcABQAYgBARgTQARgVAAgnQgBgtgQgTQgQgTgZAAQgYAAgQATg");
	this.shape_21.setTransform(617.45,87.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAPQgGAQAAArIAAB2IhEAAIAAkDIBAAAIAAAmQAhgsAzAAQAXABATAHQASAJAKANQAJAMAFAQQADAQAAAfIAACgg");
	this.shape_22.setTransform(587.55,91.85);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhOB5QgVgLgJgVQgJgVAAgkIAAikIBFAAIAAB4QAAA1ADANQAEAMAKAHQAKAHAQAAQAQAAAOgJQAOgKAFgOQAFgOAAg3IAAhuIBFAAIAAEDIhAAAIAAgnQgOAVgXAMQgXAMgZAAQgaAAgVgMg");
	this.shape_23.setTransform(556.9,92.425);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgxC2IAAjNIgmAAIAAg2IAmAAIAAgTQAAghAHgPQAHgQATgLQASgKAcAAQAdAAAcAJIgJAvQgQgDgPAAQgPgBgGAIQgHAGAAAUIAAASIA0AAIAAA2Ig0AAIAADNg");
	this.shape_24.setTransform(534.35,86.9);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_25.setTransform(497.0032,92.15);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_26.setTransform(468.775,92.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_27.setTransform(427.5032,92.15);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AhdCSQghgkAAhAQAAhCAgghQAegjAwAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgWALQgVALgVAAQgtAAgfgkgAgngQQgQASAAAmQAAAqALATQAQAaAdABQAYgBARgTQARgVAAgnQAAgtgRgTQgQgTgZAAQgYAAgQATg");
	this.shape_28.setTransform(397.95,87.5);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAPQgGAQAAArIAAB2IhEAAIAAkDIBAAAIAAAmQAhgsAzAAQAXABASAHQATAJAKANQAJAMAFAQQADAQAAAfIAACgg");
	this.shape_29.setTransform(368.05,91.85);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_30.setTransform(337.525,92.15);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAggjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASAAAmQgBAqAMATQARAaAcABQAYgBAQgTQASgVgBgnQAAgtgQgTQgQgTgZAAQgXAAgRATg");
	this.shape_31.setTransform(306.3,87.5);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AAyCFIAAiFQAAgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAPQgGAQABArIAAB2IhFAAIAAkDIA/AAIAAAmQAjgsAyAAQAXABASAHQAUAJAJANQAKAMAEAQQADAQAAAfIAACgg");
	this.shape_32.setTransform(262.5,91.85);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_33.setTransform(233.0532,92.15);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_34.setTransform(190.925,92.15);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_35.setTransform(162.475,92.15);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_36.setTransform(133.625,92.15);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhyIAAhAIBDAAIAABAg");
	this.shape_37.setTransform(112.425,87.2);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARgBQAXAAAWAOIgWA7QgRgLgOAAQgPAAgKAIQgJAIgGAUQgFAWAABBIAABQg");
	this.shape_38.setTransform(97.65,91.85);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgLAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfACAGQABAEAEAEQAFADAHAAQAJAAATgGIAFA1QgXALgfgBQgTAAgNgFg");
	this.shape_39.setTransform(77.7,87.85);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_40.setTransform(55.825,92.15);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhfCMQgZgjAAg2QAAg/AhgkQAiglA0AAQA4AAAiAmQAhAmgBBOIirAAQABAfAQAQQAPASAXgBQAQAAALgIQALgJAGgUIBEAMQgNAlgcAVQgdATgrAAQhCAAghgtgAgigRQgPARAAAbIBmAAQgBgcgPgQQgOgPgVAAQgWAAgOAPgAgihvIAihJIBMAAIhDBJg");
	this.shape_41.setTransform(27.4032,87.2);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_42.setTransform(6.825,87.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_43.setTransform(-14.2968,92.15);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_44.setTransform(685.525,34.3);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_45.setTransform(657.075,34.3);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AAxCFIAAiFQAAgpgEgMQgEgMgKgIQgKgGgOAAQgQAAgPAJQgOAKgFAQQgFARgBAqIAAB2IhEAAIAAkDIBAAAIAAAmQAhgrAzAAQAXAAATAHQATAJAJANQAKAMADAQQAEARAAAdIAAChg");
	this.shape_46.setTransform(626.5,34);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARAAQAXAAAWAMIgVA8QgSgLgPAAQgOAAgKAIQgJAIgFAUQgHAVAABBIAABRg");
	this.shape_47.setTransform(603.4,34);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_48.setTransform(576.525,34.3);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AAxCzIAAiJQAAgpgDgJQgEgLgKgHQgKgGgPAAQgQgBgOAJQgNAIgGAQQgGAQgBAhIAACCIhEAAIAAllIBEAAIAACDQAigmAtAAQAYAAATAJQATAJAKANQAJAOAEARQADAQAAAiIAACYg");
	this.shape_49.setTransform(545.95,29.35);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_50.setTransform(502.175,34.3);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_51.setTransform(473.725,34.3);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_52.setTransform(451.475,29.35);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQAKgRATgIQATgKAkgHQAvgJATgIIAAgHQAAgTgKgJQgKgIgaAAQgTAAgJAHQgLAIgGASIg+gMQAKgmAagRQAZgTAyABQAuAAAWALQAWAKAKARQAJARAAAsIgBBQQAAAhAEARQACAQAKATIhEAAIgGgVIgDgIQgSASgUAIQgTAJgWAAQgpAAgWgXgAgCAPQgcAGgJAHQgNAJAAAOQAAAPALAKQALALAQAAQASAAARgMQAMgJAEgOQACgIABgZIAAgOQgOAFgcAFg");
	this.shape_53.setTransform(416.7,34.3);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgMAAgkIAAhwIggAAIAAg3IAgAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfACAGQABAEAEAEQAFAEAHgBQAJABATgHIAFA1QgXALgfAAQgTgBgNgFg");
	this.shape_54.setTransform(394.5,30);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AAxCFIAAiFQAAgpgEgMQgEgMgKgIQgKgGgOAAQgQAAgPAJQgOAKgFAQQgFARgBAqIAAB2IhEAAIAAkDIBAAAIAAAmQAhgrAzAAQAXAAATAHQATAJAJANQAKAMADAQQAEARAAAdIAAChg");
	this.shape_55.setTransform(370.9,34);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_56.setTransform(341.4532,34.3);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AB6CFIAAiTQAAgngHgMQgKgOgTAAQgPAAgMAIQgNAKgGAQQgFARgBAkIAAB9IhDAAIAAiOQAAglgEgLQgDgLgIgGQgHgFgOAAQgQAAgNAIQgMAJgGAQQgFAQAAAkIAAB/IhFAAIAAkDIA/AAIAAAjQAjgoAuAAQAZAAATAKQARAKALAUQASgUATgKQAUgKAWAAQAdgBAUAMQAUALAKAXQAGAQABAmIAAClg");
	this.shape_57.setTransform(305.45,34);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_58.setTransform(276.425,29.35);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_59.setTransform(262.525,29.35);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQAKgRATgIQATgKAkgHQAvgJATgIIAAgHQAAgTgKgJQgKgIgaAAQgTAAgJAHQgLAIgGASIg+gMQAKgmAagRQAZgTAyABQAuAAAWALQAWAKAKARQAJARAAAsIgBBQQAAAhAEARQACAQAKATIhEAAIgGgVIgDgIQgSASgUAIQgTAJgWAAQgpAAgWgXgAgCAPQgcAGgJAHQgNAJAAAOQAAAPALAKQALALAQAAQASAAARgMQAMgJAEgOQACgIABgZIAAgOQgOAFgcAFg");
	this.shape_60.setTransform(241.65,34.3);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AhiBxQgWgVAAgiQAAgWAKgQQALgRASgIQATgKAkgHQAvgJATgIIAAgHQAAgTgLgJQgJgIgaAAQgSAAgLAHQgKAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhADARQAEAQAJATIhEAAIgHgVIgCgIQgSASgUAIQgTAJgXAAQgoAAgXgXgAgBAPQgdAGgIAHQgOAJAAAOQAAAPAKAKQAMALAQAAQARAAARgMQANgJAEgOQADgIAAgZIAAgOQgNAFgcAFg");
	this.shape_61.setTransform(199.95,34.3);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AAyCFIAAiFQgBgpgEgMQgEgMgKgIQgKgGgOAAQgRAAgOAJQgOAKgFAQQgGARABAqIAAB2IhFAAIAAkDIA/AAIAAAmQAigrAzAAQAXAAASAHQAUAJAJANQAKAMADAQQAEARAAAdIAAChg");
	this.shape_62.setTransform(170.8,34);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_63.setTransform(148.575,29.35);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AhYBkQghgkAAhAQAAg/AhgjQAigkA5AAQAwAAAcAUQAcAUAMAqIhEAMQgDgUgMgKQgNgKgTAAQgYAAgQARQgPARAAAqQAAAuAQASQAPAUAZgBQAUAAAMgLQANgLAFgbIBDALQgKAvgeAYQgeAYgyAAQg4gBgigjg");
	this.shape_64.setTransform(128.075,34.3);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_65.setTransform(106.875,29.35);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AhiBxQgXgVABgiQgBgWALgQQALgRASgIQATgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhADARQADAQAKATIhEAAIgHgVIgCgIQgSASgUAIQgTAJgXAAQgnAAgYgXgAgBAPQgdAGgIAHQgOAJAAAOQAAAPAKAKQAMALAQAAQARAAARgMQANgJAEgOQACgIAAgZIAAgOQgNAFgbAFg");
	this.shape_66.setTransform(86,34.3);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AhYBkQghgkAAhAQAAg/AhgjQAigkA5AAQAwAAAcAUQAcAUAMAqIhEAMQgDgUgMgKQgNgKgTAAQgYAAgQARQgPARAAAqQAAAuAQASQAPAUAZgBQAUAAAMgLQANgLAFgbIBDALQgKAvgeAYQgeAYgyAAQg4gBgigjg");
	this.shape_67.setTransform(58.575,34.3);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQAKgRAUgIQASgKAkgHQAvgJASgIIAAgHQABgTgLgJQgJgIgaAAQgTAAgJAHQgLAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhADARQAEAQAIATIhDAAIgHgVIgCgIQgSASgUAIQgTAJgWAAQgoAAgXgXgAgBAPQgdAGgJAHQgNAJAAAOQAAAPAKAKQALALARAAQASAAAQgMQANgJAEgOQADgIgBgZIAAgOQgNAFgbAFg");
	this.shape_68.setTransform(16.5,34.3);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("Ah9CyIAAliIBIAAIAAElICzAAIAAA9g");
	this.shape_69.setTransform(-11.55,29.5);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("EhY6AL4IAA3vMCx1AAAIAAXvg");
	this.shape_70.setTransform(351.4013,88.2507,0.7197,1.2955);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.2,-10.2,819.2,197);


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
	this.shape.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAGAAAIQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape.setTransform(433.225,150);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhOB5QgUgLgKgVQgJgVAAgkIAAikIBEAAIAAB4QAAA1AFANQADAMAKAHQAKAHAQAAQAQAAAOgJQAOgKAFgOQAFgOAAg3IAAhuIBFAAIAAEDIhAAAIAAgnQgOAVgXAMQgXAMgZAAQgaAAgVgMg");
	this.shape_1.setTransform(404.65,150.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhzIAAg/IBDAAIAAA/g");
	this.shape_2.setTransform(382.525,145.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigkA5AAQAwAAAcAVQAcAUAMAqIhEAMQgDgUgMgLQgNgKgTAAQgYAAgQASQgPARAAAqQAAAtAQAUQAPASAZAAQAUABAMgLQANgMAFgbIBDAMQgKAugeAYQgeAXgyAAQg4ABgiglg");
	this.shape_3.setTransform(362.025,150);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_4.setTransform(340.825,145.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_5.setTransform(319.7032,150);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhtCIQgugwAAhVQAAhYAvgyQAugxBJAAQBDAAAoAnQAZAXAMAqIhIASQgGgcgUgQQgUgQgdAAQgnAAgYAdQgZAcAABAQgBBDAZAdQAZAdAmAAQAcAAAVgTQAVgTAJgnIBGAXQgQA6gmAdQglAcg5AAQhHAAgugxg");
	this.shape_6.setTransform(287.85,145.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAGAAAIQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_7.setTransform(241.475,150);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7ABAlAlQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbgBQgaABgSAUg");
	this.shape_8.setTransform(213.025,150);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AheCSQgfgkgBhAQABhBAfgjQAfgiAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgWALQgVALgVAAQgtAAgggkgAgngQQgRASAAAmQAAArAMASQAQAbAeAAQAXAAAQgVQARgTAAgoQAAgugQgSQgQgTgZgBQgYABgQATg");
	this.shape_9.setTransform(181.8,145.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhiByQgWgWAAghQAAgWAKgSQALgQASgJQATgJAkgHQAvgJATgHIAAgIQgBgUgJgHQgKgJgaAAQgSAAgLAHQgKAHgHATIg9gMQAKgmAagSQAZgRAygBQAtABAXAKQAXALAJARQAJAQAAAtIgBBPQAAAjADAQQAEAQAJATIhEAAIgGgVIgDgIQgSARgUAJQgTAIgXAAQgoAAgXgVgAgCAQQgcAFgIAGQgOAKAAAPQAAAOALALQAKAKARAAQARAAASgMQAMgKAEgNQADgIAAgaIAAgNQgNAFgdAGg");
	this.shape_10.setTransform(153.25,150);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgIQANgJARAAQAXABAWANIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAVQgFAVgBBBIAABQg");
	this.shape_11.setTransform(131.55,149.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhZCjQgbgXgBgiIAAgJIBPAJQACAPAHAEQAKAIATAAQAbAAAOgJQAJgEAEgNQAEgIAAgXIAAgmQgfAqguAAQg0AAgegsQgYgjgBgzQABhBAfgjQAfgiAvAAQAvAAAfAqIAAglIBAAAIAADoQAAAvgHAWQgIAXgNANQgOANgWAHQgYAHgjAAQhAAAgcgWgAgnhwQgQATAAAnQAAApAQATQAQASAXABQAYAAASgUQARgSAAgoQAAgngQgUQgRgTgagBQgXAAgQAUg");
	this.shape_12.setTransform(104,154.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhTCPQgggoAAhnQAAhlAjgsQAdglAzAAQA0AAAdAlQAjAsAABlQAABmgjAsQgdAlg0AAQgzAAgggogAgVh1QgKAIgFAVQgHAaAAA+QAAA/AGAYQAGAXAKAIQAKAIALAAQAMAAAKgIQAKgIAFgUQAHgbAAg/QAAg+gGgXQgGgYgKgIQgKgIgMAAQgLAAgKAIg");
	this.shape_13.setTransform(61.325,145.275);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhTCPQgggoAAhnQAAhlAjgsQAdglAzAAQA0AAAdAlQAjAsAABlQAABmgjAsQgdAlg0AAQgzAAgggogAgVh1QgKAIgFAVQgHAaAAA+QAAA/AGAYQAGAXAKAIQAKAIALAAQAMAAAKgIQAKgIAFgUQAHgbAAg/QAAg+gGgXQgGgYgKgIQgKgIgMAAQgLAAgKAIg");
	this.shape_14.setTransform(33.525,145.275);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhPCdQgmgeABg1QgBgdAOgYQAPgYAfgNQgbgLgMgTQgMgUABgXQAAgoAbgbQAcgaA0AAQAyAAAcAaQAcAbAAAoQAAAZgNATQgMATgYAKQAeAMAPAWQAPAXAAAfQAAAxgfAfQgfAfg1AAQgwAAghgagAgkAeQgNASAAATQAAAdAOAQQAPAPAUAAQAWABAOgQQANgPAAgcQAAgagNgPQgOgQgWAAQgYAAgMASgAgfh0QgMAMAAATQAAAVAMALQALAMAUAAQASAAAMgMQAMgMAAgUQAAgTgMgMQgMgLgSAAQgUAAgLALg");
	this.shape_15.setTransform(5.8,145.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_16.setTransform(822.325,92.15);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_17.setTransform(793.875,92.15);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_18.setTransform(771.625,87.2);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgIIAAgHQABgTgLgJQgJgIgaAAQgSAAgKAHQgLAHgGATIg/gMQALglAZgTQAagSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQADAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPAKALQALAKARAAQASAAAQgMQANgJAEgOQADgJgBgZIAAgNQgMAFgdAFg");
	this.shape_19.setTransform(736.85,92.15);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhiBxQgWgVAAghQAAgXAKgQQAKgSATgHQATgKAkgHQAvgJATgIIAAgHQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQACAQAKATIhEAAIgGgVIgDgIQgSARgUAJQgTAJgXgBQgoABgXgXgAgCAPQgcAHgIAFQgOAKAAAOQAAAPALALQAKAKARAAQARAAASgMQAMgJAEgOQACgJABgZIAAgNQgOAFgcAFg");
	this.shape_20.setTransform(695.15,92.15);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AAyCFIAAiFQgBgpgEgMQgEgNgKgGQgKgHgOAAQgRAAgOAJQgOALgFAPQgFAQgBArIAAB2IhEAAIAAkDIA/AAIAAAmQAjgsAyAAQAXABATAHQATAJAJANQAKAMADAQQAEAQAAAfIAACgg");
	this.shape_21.setTransform(666,91.85);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhiBxQgXgVABghQgBgXALgQQALgSASgHQATgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjADAQQADAQAKATIhEAAIgHgVIgCgIQgSARgUAJQgTAJgXgBQgnABgYgXgAgBAPQgdAHgIAFQgOAKAAAOQAAAPAKALQAMAKAQAAQARAAARgMQANgJAEgOQACgJAAgZIAAgNQgNAFgbAFg");
	this.shape_22.setTransform(636.8,92.15);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_23.setTransform(609.375,92.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARgBQAXAAAWAOIgWA7QgQgLgQAAQgOAAgKAIQgJAIgGAUQgFAWgBBBIAABQg");
	this.shape_24.setTransform(587.3,91.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_25.setTransform(561.5032,92.15);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_26.setTransform(534.325,92.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARgBQAXAAAWAOIgVA7QgSgLgPAAQgOAAgKAIQgJAIgFAUQgHAWAABBIAABQg");
	this.shape_27.setTransform(498.35,91.85);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgIIAAgHQABgTgLgJQgJgIgaAAQgTAAgJAHQgLAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjAEAQQADAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAJgWgBQgoABgXgXgAgBAPQgdAHgJAFQgNAKAAAOQAAAPAKALQALAKARAAQASAAAQgMQANgJAEgOQADgJgBgZIAAgNQgNAFgbAFg");
	this.shape_28.setTransform(472.8,92.15);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgLAAglIAAhwIgfAAIAAg3IAfAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfABAGQABAEAGAEQAEADAHAAQAKAAARgGIAHA1QgZALgegBQgSAAgOgFg");
	this.shape_29.setTransform(450.6,87.85);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_30.setTransform(427.675,92.15);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_31.setTransform(400.3032,92.15);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_32.setTransform(358.6032,92.15);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgYCrQgWgMgQgVIAAAmIhAAAIAAllIBFAAIAACBQAggkAqAAQAwAAAeAjQAfAhABBAQAABCggAkQggAkgtAAQgVAAgVgLgAgpgQQgRARAAAnQAAApANAUQASAbAdAAQAWgBARgSQAPgUABgqQAAgsgRgTQgQgTgYAAQgYgBgRAUg");
	this.shape_33.setTransform(330.3,87.5);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_34.setTransform(300.2532,92.15);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhdCSQghgkAAhAQAAhCAgghQAegjAwAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgWALQgVALgVAAQgtAAgfgkgAgngQQgRASAAAmQAAAqAMATQAQAaAdABQAYgBARgTQAQgVABgnQAAgtgRgTQgQgTgZAAQgXAAgRATg");
	this.shape_35.setTransform(270.7,87.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARgBQAXAAAWAOIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAUQgFAWAABBIAABQg");
	this.shape_36.setTransform(234.35,91.85);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_37.setTransform(207.475,92.15);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAggjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASAAAmQgBAqAMATQARAaAcABQAYgBAQgTQASgVgBgnQAAgtgQgTQgQgTgZAAQgXAAgRATg");
	this.shape_38.setTransform(176.25,87.5);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQALgSATgHQASgKAkgHQAvgJASgIIAAgHQABgTgKgJQgKgIgaAAQgTAAgJAHQgLAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQACAQAJATIhDAAIgGgVIgDgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPALALQALAKAQAAQASAAARgMQAMgJAEgOQACgJAAgZIAAgNQgNAFgcAFg");
	this.shape_39.setTransform(147.7,92.15);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAPQgFAQgBArIAAB2IhEAAIAAkDIBAAAIAAAmQAhgsAzAAQAXABATAHQATAJAJANQAKAMADAQQAEAQAAAfIAACgg");
	this.shape_40.setTransform(118.55,91.85);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhyIAAhAIBDAAIAABAg");
	this.shape_41.setTransform(96.325,87.2);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_42.setTransform(75.825,92.15);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_43.setTransform(54.625,87.2);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhhBxQgXgVAAghQAAgXAKgQQAKgSATgHQATgKAkgHQAvgJATgIIAAgHQAAgTgKgJQgKgIgaAAQgTAAgJAHQgLAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQACAQAJATIhDAAIgGgVIgDgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPALALQALAKAQAAQASAAARgMQAMgJAEgOQACgJABgZIAAgNQgOAFgcAFg");
	this.shape_44.setTransform(33.75,92.15);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_45.setTransform(6.325,92.15);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_46.setTransform(746.475,29.35);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_47.setTransform(725.3532,34.3);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAfghQAfgjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgWALQgVALgVAAQgtAAgggkgAgngQQgRASAAAmQAAArAMASQARAbAdgBQAXAAAQgTQARgVAAgoQAAgsgQgTQgQgUgZABQgYgBgQAUg");
	this.shape_48.setTransform(695.8,29.65);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARAAQAXAAAWAMIgVA8QgSgLgPAAQgOAAgKAIQgJAIgFAUQgHAVAABBIAABRg");
	this.shape_49.setTransform(659.45,34);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_50.setTransform(632.575,34.3);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_51.setTransform(610.325,29.35);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARAAQAXAAAWAMIgVA8QgSgLgPAAQgOAAgKAIQgJAIgFAUQgHAVABBBIAABRg");
	this.shape_52.setTransform(595.55,34);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_53.setTransform(569.7532,34.3);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgMAAgkIAAhwIgfAAIAAg3IAfAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfABAGQABAEAGAEQAEAEAHgBQAKABARgHIAHA1QgZALgeAAQgSgBgOgFg");
	this.shape_54.setTransform(547.8,30);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgMgKgIQgKgGgOAAQgQAAgPAJQgOAKgFAQQgGARAAAqIAAB2IhEAAIAAkDIBAAAIAAAmQAhgrAzAAQAXAAATAHQASAJAKANQAJAMAFAQQADARAAAdIAAChg");
	this.shape_55.setTransform(524.2,34);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_56.setTransform(501.975,29.35);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_57.setTransform(474.175,29.35);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_58.setTransform(453.0532,34.3);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgMgKgIQgKgGgOAAQgQAAgPAJQgOAKgFAQQgGARAAAqIAAB2IhEAAIAAkDIBAAAIAAAmQAhgrAzAAQAXAAATAHQASAJAKANQAJAMAFAQQADARAAAdIAAChg");
	this.shape_59.setTransform(410.25,34);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_60.setTransform(380.8032,34.3);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AhiBxQgXgVABgiQgBgWALgQQALgRASgIQATgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhADARQADAQAKATIhEAAQgDgIgEgNIgCgIQgSASgUAIQgTAJgXAAQgnAAgYgXgAgBAPQgdAGgIAHQgOAJAAAOQAAAPAKAKQAMALAQAAQARAAARgMQANgJAEgOQACgIAAgZIAAgOQgNAFgbAFg");
	this.shape_61.setTransform(339.35,34.3);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARAAQAXAAAWAMIgVA8QgSgLgPAAQgOAAgKAIQgJAIgFAUQgHAVAABBIAABRg");
	this.shape_62.setTransform(317.65,34);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AhOB5QgVgLgJgVQgJgVAAgkIAAikIBEAAIAAB4QABA1AEANQADAMAKAHQAKAHAPAAQARAAAOgJQAOgKAFgOQAFgOAAg3IAAhuIBFAAIAAEDIhAAAIAAgnQgOAVgXAMQgWAMgaAAQgaAAgVgMg");
	this.shape_63.setTransform(290.65,34.575);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgMAAgkIAAhwIggAAIAAg3IAgAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfACAGQABAEAEAEQAFAEAHgBQAJABATgHIAFA1QgXALgfAAQgTgBgNgFg");
	this.shape_64.setTransform(267.15,30);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQALgRATgIQASgKAkgHQAvgJASgIIAAgHQABgTgKgJQgKgIgaAAQgTAAgJAHQgLAIgGASIg+gMQAKgmAagRQAZgTAyABQAuAAAWALQAWAKAKARQAJARAAAsIgBBQQAAAhAEARQACAQAJATIhDAAIgGgVIgDgIQgSASgUAIQgTAJgWAAQgpAAgWgXgAgCAPQgcAGgJAHQgNAJAAAOQAAAPALAKQALALAQAAQASAAARgMQAMgJAEgOQACgIAAgZIAAgOQgNAFgcAFg");
	this.shape_65.setTransform(244.9,34.3);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARAAQAXAAAWAMIgWA8QgRgLgOAAQgPAAgKAIQgJAIgGAUQgFAVAABBIAABRg");
	this.shape_66.setTransform(223.2,34);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_67.setTransform(197.4032,34.3);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("Ah+C2IAAllIBBAAIAAAmQAMgTAVgNQAVgMAZAAQAtAAAgAkQAgAjAAA/QgBBAggAkQgfAkguAAQgUAAgRgIQgSgJgTgVIAACDgAgphrQgRATAAAmQABAsARAUQARAVAYAAQAYAAAQgTQAPgTABgrQAAgpgRgUQgQgUgYAAQgYAAgRAUg");
	this.shape_68.setTransform(169.2,38.925);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AB6CFIAAiTQAAgngHgMQgKgOgTAAQgPAAgMAIQgNAKgGAQQgFARgBAkIAAB9IhDAAIAAiOQAAglgEgLQgDgLgIgGQgHgFgOAAQgQAAgNAIQgMAJgGAQQgFAQAAAkIAAB/IhFAAIAAkDIA/AAIAAAjQAjgoAuAAQAZAAATAKQARAKALAUQASgUATgKQAUgKAWAAQAdgBAUAMQAUALAKAXQAGAQABAmIAAClg");
	this.shape_69.setTransform(130.85,34);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_70.setTransform(94.6032,34.3);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgRQgDgMAAgkIAAhwIggAAIAAg3IAgAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfACAGQABAEAEAEQAFAEAHgBQAJABATgHIAFA1QgYALgeAAQgTgBgNgFg");
	this.shape_71.setTransform(72.65,30);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AhiBxQgXgVABgiQgBgWALgQQALgRATgIQASgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhADARQADAQAKATIhEAAIgHgVIgCgIQgSASgUAIQgTAJgXAAQgnAAgYgXgAgBAPQgdAGgIAHQgOAJAAAOQAAAPAKAKQAMALAQAAQARAAARgMQANgJAEgOQACgIAAgZIAAgOQgNAFgbAFg");
	this.shape_72.setTransform(36.5,34.3);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("Ah9CyIAAliIBIAAIAAElICzAAIAAA9g");
	this.shape_73.setTransform(8.45,29.5);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("EhY6AL4IAA3vMCx1AAAIAAXvg");
	this.shape_74.setTransform(440.5258,86.2507,0.8445,1.2955);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-40.1,-12.2,961.3000000000001,197);


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
	this.shape.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQALgSATgHQASgKAkgHQAvgJATgIIAAgHQAAgTgKgJQgKgIgaAAQgTAAgJAHQgLAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQACAQAJATIhDAAIgGgVIgDgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPALALQALAKAQAAQASAAARgMQAMgJAEgOQACgJABgZIAAgNQgOAFgcAFg");
	this.shape.setTransform(587.8,92.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARgBQAXAAAWAOIgWA7QgRgLgOAAQgPAAgKAIQgJAIgGAUQgFAWAABBIAABQg");
	this.shape_1.setTransform(566.1,91.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_2.setTransform(539.225,92.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAyCzIAAiJQAAgogFgLQgDgKgKgHQgKgHgPABQgQAAgNAIQgOAIgGAQQgHARABAgIAACCIhFAAIAAllIBFAAIAACDQAhgmAtAAQAYAAATAJQATAIAJAOQAKAOAEARQADAQAAAiIAACYg");
	this.shape_3.setTransform(508.65,87.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARgBQAXAAAWAOIgWA7QgQgLgQAAQgOAAgKAIQgJAIgGAUQgFAWgBBBIAABQg");
	this.shape_4.setTransform(471.65,91.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_5.setTransform(444.775,92.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("Ah+C2IAAllIBBAAIAAAmQAMgTAVgNQAVgMAZAAQAtAAAgAkQAgAjAAA/QgBBAgfAkQggAkguAAQgUAAgRgIQgSgJgTgVIAACDgAgphrQgRATAAAmQABAsARAUQARAVAYAAQAYAAAPgTQAQgTABgrQAAgpgRgUQgQgUgYAAQgYAAgRAUg");
	this.shape_6.setTransform(414.9,96.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_7.setTransform(370.425,92.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhiBxQgXgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgJAHQgLAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAWAKAKARQAJARAAAsIgBBPQAAAjADAQQAEAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAJgWgBQgoABgYgXgAgBAPQgdAHgIAFQgOAKAAAOQAAAPAKALQAMAKAQAAQARAAARgMQANgJAEgOQACgJAAgZIAAgNQgNAFgbAFg");
	this.shape_8.setTransform(343.3,92.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAggjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASAAAmQgBAqAMATQARAaAcABQAYgBAQgTQASgVgBgnQAAgtgQgTQgQgTgZAAQgXAAgRATg");
	this.shape_9.setTransform(313.5,87.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQALgSATgHQASgKAkgHQAvgJASgIIAAgHQABgTgKgJQgKgIgaAAQgTAAgJAHQgLAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQACAQAJATIhDAAIgGgVIgDgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPALALQALAKAQAAQASAAARgMQAMgJAEgOQACgJAAgZIAAgNQgNAFgcAFg");
	this.shape_10.setTransform(284.95,92.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_11.setTransform(264.125,87.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_12.setTransform(243.0032,92.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AAyCFIAAiFQgBgpgEgMQgEgNgKgGQgKgHgOAAQgRAAgOAJQgOALgFAPQgFAQAAArIAAB2IhFAAIAAkDIA/AAIAAAmQAjgsAyAAQAXABASAHQATAJAKANQAKAMADAQQAEAQAAAfIAACgg");
	this.shape_13.setTransform(214.1,91.85);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_14.setTransform(183.575,92.15);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgLAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfACAGQABAEAEAEQAFADAHAAQAJAAATgGIAFA1QgYALgegBQgTAAgNgFg");
	this.shape_15.setTransform(159.95,87.85);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhSCZQgfgbgHgsIBFgHQADAWAPAOQAOANASAAQAVABAPgSQAPgRAAgjQAAgigPgQQgOgPgXgBQgeABgYAZIg3gIIAji5IC1AAIAABAIiBAAIgLA8QAYgLAXAAQAtAAAfAhQAhAhAAA0QgBAtgZAiQgjAvg9AAQgyAAgfgag");
	this.shape_16.setTransform(124.1,87.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhECxQAChLAdhNQAdhMAug9IiaAAIAAg/IDpAAIAAAxQgcAdgeA1QgfA1gQA8QgOA8AAAwg");
	this.shape_17.setTransform(95.9,87.45);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AAKC0IAAkCQglAjgzARIAAg+QAbgJAggYQAegZAMghIA4AAIAAFng");
	this.shape_18.setTransform(66.075,87.125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_19.setTransform(26.2532,92.15);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAggjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASAAAmQgBAqAMATQARAaAcABQAYgBAQgTQASgVgBgnQAAgtgQgTQgQgTgZAAQgXAAgRATg");
	this.shape_20.setTransform(-3.3,87.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhdCSQghgkAAhAQAAhCAfghQAggjAvAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgVALQgWALgVAAQgtAAgfgkgAgngQQgQASAAAmQAAArALASQARAbAcgBQAYAAARgTQARgVAAgoQgBgsgQgTQgQgUgZABQgYgBgQAUg");
	this.shape_21.setTransform(844.25,29.65);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQAKgRAUgIQASgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgSAAgKAHQgLAIgGASIg/gMQALgmAZgRQAagTAzABQAsAAAXALQAWAKAKARQAJARAAAsIgBBQQAAAhADARQAEAQAIATIhDAAIgHgVIgCgIQgSASgUAIQgTAJgWAAQgoAAgXgXgAgBAPQgdAGgJAHQgNAJAAAOQAAAPAKAKQALALARAAQARAAARgMQANgJAEgOQADgIgBgZIAAgOQgNAFgbAFg");
	this.shape_22.setTransform(815.7,34.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAfgjAwAAQArAAAfAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASgBAmQAAArAMASQAQAbAegBQAXAAAQgTQASgVgBgoQAAgsgQgTQgQgUgZABQgYgBgQAUg");
	this.shape_23.setTransform(785.9,29.65);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_24.setTransform(764.325,29.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhYBkQghgkAAhAQAAg/AhgjQAigkA5AAQAwAAAcAUQAcAUAMAqIhEAMQgDgUgMgKQgNgKgTAAQgYAAgQARQgPARAAAqQAAAuAQASQAPAUAZgBQAUAAAMgLQANgLAFgbIBDALQgKAvgeAYQgeAYgyAAQg4gBgigjg");
	this.shape_25.setTransform(743.825,34.3);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhiBxQgXgVABgiQAAgWAKgQQALgRASgIQATgKAkgHQAvgJATgIIAAgHQAAgTgLgJQgJgIgaAAQgSAAgLAHQgKAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhADARQAEAQAJATIhEAAIgHgVIgCgIQgSASgUAIQgTAJgXAAQgoAAgXgXgAgBAPQgdAGgIAHQgOAJAAAOQAAAPAKAKQAMALAQAAQARAAARgMQANgJAEgOQADgIAAgZIAAgOQgNAFgcAFg");
	this.shape_26.setTransform(715.65,34.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("Ah+C2IAAllIBAAAIAAAmQANgTAVgNQAWgMAYAAQAuAAAfAkQAfAjAAA/QAABAgfAkQggAkgtAAQgVAAgRgIQgRgJgUgVIAACDgAgphrQgQATAAAmQAAAsAQAUQASAVAYAAQAYAAAQgTQAPgTAAgrQAAgpgQgUQgQgUgYAAQgZAAgQAUg");
	this.shape_27.setTransform(687.2,38.925);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQAKgRAUgIQASgKAkgHQAvgJASgIIAAgHQABgTgLgJQgJgIgaAAQgTAAgJAHQgLAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhAEARQADAQAIATIhDAAIgHgVIgCgIQgSASgUAIQgTAJgWAAQgoAAgXgXgAgBAPQgdAGgJAHQgNAJAAAOQAAAPAKAKQALALARAAQARAAARgMQANgJAEgOQADgIgBgZIAAgOQgNAFgbAFg");
	this.shape_28.setTransform(657.3,34.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhYBkQghgkAAhAQAAg/AhgjQAigkA5AAQAwAAAcAUQAcAUAMAqIhEAMQgDgUgMgKQgNgKgTAAQgYAAgQARQgPARAAAqQAAAuAQASQAPAUAZgBQAUAAAMgLQANgLAFgbIBDALQgKAvgeAYQgeAYgyAAQg4gBgigjg");
	this.shape_29.setTransform(629.875,34.3);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQALgRATgIQASgKAkgHQAvgJATgIIAAgHQAAgTgKgJQgKgIgaAAQgTAAgJAHQgLAIgGASIg+gMQAKgmAagRQAZgTAyABQAuAAAWALQAWAKAKARQAJARAAAsIgBBQQAAAhAEARQACAQAJATIhDAAIgGgVIgDgIQgSASgUAIQgTAJgWAAQgpAAgWgXgAgCAPQgcAGgJAHQgNAJAAAOQAAAPALAKQALALAQAAQASAAARgMQAMgJAEgOQACgIABgZIAAgOQgOAFgcAFg");
	this.shape_30.setTransform(587.8,34.3);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgMgKgIQgKgGgOAAQgRAAgOAJQgOAKgFAQQgGARAAAqIAAB2IhEAAIAAkDIBAAAIAAAmQAhgrAzAAQAXAAATAHQATAJAJANQAJAMAEAQQAEARAAAdIAAChg");
	this.shape_31.setTransform(558.65,34);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhOB5QgVgLgJgVQgJgVAAgkIAAikIBFAAIAAB4QAAA1ADANQAEAMAKAHQAKAHAPAAQARAAAOgJQAOgKAFgOQAFgOAAg3IAAhuIBFAAIAAEDIhAAAIAAgnQgOAVgXAMQgWAMgaAAQgaAAgVgMg");
	this.shape_32.setTransform(528,34.575);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_33.setTransform(484.7532,34.3);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AAxCFIAAiFQAAgpgEgMQgEgMgKgIQgKgGgOAAQgRAAgOAJQgOAKgFAQQgFARgBAqIAAB2IhEAAIAAkDIA/AAIAAAmQAjgrAyAAQAXAAATAHQATAJAJANQAKAMADAQQAEARAAAdIAAChg");
	this.shape_34.setTransform(455.85,34);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_35.setTransform(426.4032,34.3);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_36.setTransform(405.825,29.35);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgMAAgkIAAhwIggAAIAAg3IAgAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfACAGQABAEAEAEQAFAEAHgBQAJABATgHIAFA1QgXALgfAAQgSgBgOgFg");
	this.shape_37.setTransform(390.55,30);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARAAQAXAAAWAMIgVA8QgRgLgQAAQgOAAgKAIQgJAIgGAUQgFAVgBBBIAABRg");
	this.shape_38.setTransform(360.5,34);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_39.setTransform(333.625,34.3);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AheCSQgfgkgBhAQABhCAfghQAfgjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgWALQgVALgVAAQgtAAgggkgAgngQQgRASAAAmQAAArAMASQAQAbAegBQAXAAAQgTQARgVABgoQAAgsgRgTQgQgUgZABQgYgBgQAUg");
	this.shape_40.setTransform(302.4,29.65);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhiBxQgWgVAAgiQAAgWAKgQQALgRASgIQATgKAkgHQAvgJATgIIAAgHQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAIgHASIg9gMQAKgmAagRQAZgTAzABQAsAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhADARQAEAQAJATIhEAAIgGgVIgDgIQgSASgUAIQgTAJgXAAQgoAAgXgXgAgBAPQgdAGgIAHQgOAJAAAOQAAAPALAKQAKALARAAQARAAASgMQAMgJAEgOQADgIAAgZIAAgOQgNAFgcAFg");
	this.shape_41.setTransform(273.85,34.3);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AAyCFIAAiFQgBgpgEgMQgEgMgKgIQgKgGgOAAQgRAAgOAJQgOAKgFAQQgFARAAAqIAAB2IhFAAIAAkDIA/AAIAAAmQAjgrAyAAQAXAAASAHQATAJAKANQAKAMADAQQAEARAAAdIAAChg");
	this.shape_42.setTransform(244.7,34);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_43.setTransform(222.475,29.35);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhYBkQghgkAAhAQAAg/AhgjQAigkA5AAQAwAAAcAUQAcAUAMAqIhEAMQgDgUgMgKQgNgKgTAAQgYAAgQARQgPARAAAqQAAAuAQASQAPAUAZgBQAUAAAMgLQANgLAFgbIBDALQgKAvgeAYQgeAYgyAAQg4gBgigjg");
	this.shape_44.setTransform(201.975,34.3);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_45.setTransform(180.775,29.35);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AhiBxQgWgVAAgiQAAgWAKgQQALgRASgIQATgKAkgHQAvgJATgIIAAgHQAAgTgLgJQgJgIgaAAQgSAAgLAHQgKAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhADARQAEAQAJATIhEAAIgHgVIgCgIQgSASgUAIQgTAJgXAAQgoAAgXgXgAgBAPQgdAGgIAHQgOAJAAAOQAAAPAKAKQAMALAQAAQARAAARgMQANgJAEgOQADgIAAgZIAAgOQgNAFgcAFg");
	this.shape_46.setTransform(159.9,34.3);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhYBkQghgkAAhAQAAg/AhgjQAigkA5AAQAwAAAcAUQAcAUAMAqIhEAMQgDgUgMgKQgNgKgTAAQgYAAgQARQgPARAAAqQAAAuAQASQAPAUAZgBQAUAAAMgLQANgLAFgbIBDALQgKAvgeAYQgeAYgyAAQg4gBgigjg");
	this.shape_47.setTransform(132.475,34.3);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AhiBxQgXgVAAgiQAAgWALgQQAKgRAUgIQASgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAWAKAKARQAJARAAAsIgBBQQAAAhADARQAEAQAIATIhDAAIgHgVIgCgIQgSASgUAIQgTAJgXAAQgnAAgYgXgAgBAPQgdAGgIAHQgOAJAAAOQAAAPAKAKQAMALAQAAQARAAARgMQANgJAEgOQACgIAAgZIAAgOQgNAFgbAFg");
	this.shape_48.setTransform(90.4,34.3);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAggjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASAAAmQgBArAMASQARAbAcgBQAYAAAQgTQASgVgBgoQAAgsgQgTQgQgUgZABQgXgBgRAUg");
	this.shape_49.setTransform(60.6,29.65);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQALgRATgIQASgKAkgHQAvgJATgIIAAgHQAAgTgKgJQgKgIgaAAQgTAAgJAHQgLAIgGASIg+gMQAKgmAagRQAZgTAyABQAuAAAWALQAWAKAKARQAJARAAAsIgBBQQAAAhAEARQACAQAJATIhDAAIgGgVIgDgIQgSASgUAIQgTAJgWAAQgpAAgWgXgAgCAPQgcAGgJAHQgNAJAAAOQAAAPALAKQALALAQAAQASAAARgMQAMgJAEgOQACgIABgZIAAgOQgOAFgcAFg");
	this.shape_50.setTransform(32.05,34.3);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AhtCJQgugxAAhVQAAhYAvgxQAugyBJAAQBCAAApAnQAZAXAMArIhIARQgGgcgUgQQgUgQgdAAQgnAAgYAcQgZAdAABAQgBBDAZAcQAZAdAmAAQAcAAAVgSQAVgTAJgmIBGAVQgQA7gmAdQglAcg5AAQhHAAgugwg");
	this.shape_51.setTransform(-0.05,29.35);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("EhY6AL4IAA3vMCx1AAAIAAXvg");
	this.shape_52.setTransform(429.0584,59.3311,0.8243,0.9404);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-40,-12.1,938.2,143);


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
	this.shape.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape.setTransform(779.425,92.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_1.setTransform(750.975,92.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_2.setTransform(722.125,92.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhyIAAhAIBDAAIAABAg");
	this.shape_3.setTransform(700.925,87.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_4.setTransform(687.025,87.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhiCjQgXgWABghQAAgWAKgRQALgRASgJQATgJAkgIQAvgIATgIIAAgHQAAgTgLgIQgJgJgaABQgSAAgLAGQgKAIgHASIg+gMQALglAZgSQAagSAzAAQAsAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAiADAQQAEARAJASIhEAAIgHgVIgCgIQgSASgUAIQgTAJgXAAQgoAAgXgWgAgBBBQgdAGgIAGQgOAJAAAPQAAAOAKALQAMALAQAAQARAAARgNQANgJAEgNQADgJAAgZIAAgOQgNAFgcAGgAgihvIAihJIBMAAIhEBJg");
	this.shape_5.setTransform(666.15,87.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgRQgDgLAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfABAGQACAEAEAEQAFADAHAAQAJAAASgGIAGA1QgXALgfgBQgSAAgOgFg");
	this.shape_6.setTransform(643.95,87.85);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_7.setTransform(621.4532,92.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AB6CFIAAiUQAAgngHgKQgKgPgUAAQgOAAgNAIQgMAKgGAQQgGASAAAjIAAB9IhDAAIAAiNQAAgngEgKQgEgLgHgGQgIgFgNAAQgQAAgMAIQgNAJgFAQQgGAQAAAlIAAB+IhFAAIAAkDIA/AAIAAAkQAjgqAuAAQAZABASAJQASALALAVQASgVAUgLQATgJAWgBQAdAAAUAMQAUALAKAXQAGARABAkIAACmg");
	this.shape_8.setTransform(585.45,91.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_9.setTransform(534.875,92.15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_10.setTransform(506.425,92.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AheCSQgfgkgBhAQABhCAfghQAfgjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgWALQgVALgVAAQgtAAgggkgAgngQQgRASAAAmQAAAqAMATQAQAaAeABQAXgBAQgTQARgVAAgnQAAgtgQgTQgQgTgZAAQgYAAgQATg");
	this.shape_11.setTransform(475.2,87.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhyIAAhAIBDAAIAABAg");
	this.shape_12.setTransform(453.625,87.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AAzCCIg0hRIg1BRIhQAAIBdiFIhZh+IBTAAIAuBIIAwhIIBQAAIhYB7IBgCIg");
	this.shape_13.setTransform(432.625,92.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhDCoQgggQgRgeQgRgfAAguQAAgiARgfQARgfAfgRQAfgRAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAoQgmAmg6AAQgiAAghgRgAgsgJQgSAUAAAnQAAAmASAUQASAVAaAAQAbAAASgVQASgUAAgnQAAgmgSgUQgSgUgbAAQgaAAgSAUgAgihvIAihJIBMAAIhDBJg");
	this.shape_14.setTransform(403.625,87.2);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_15.setTransform(359.825,92.15);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_16.setTransform(331.375,92.15);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_17.setTransform(309.125,87.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAPQgGAQAAArIAAB2IhEAAIAAkDIBAAAIAAAmQAhgsAzAAQAXABATAHQASAJAKANQAJAMAFAQQADAQAAAfIAACgg");
	this.shape_18.setTransform(273,91.85);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_19.setTransform(243.5532,92.15);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_20.setTransform(216.375,92.15);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhOB5QgUgLgKgVQgJgVAAgkIAAikIBFAAIAAB4QgBA1AEANQAEAMAKAHQAKAHAQAAQAQAAAOgJQAOgKAFgOQAFgOAAg3IAAhuIBFAAIAAEDIhAAAIAAgnQgOAVgXAMQgXAMgZAAQgaAAgVgMg");
	this.shape_21.setTransform(186.75,92.425);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAggjAvAAQArAAAfAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASAAAmQAAAqALATQARAaAcABQAYgBARgTQAQgVAAgnQAAgtgQgTQgQgTgZAAQgYAAgQATg");
	this.shape_22.setTransform(155.65,87.5);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_23.setTransform(126.8532,92.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARgBQAXAAAWAOIgVA7QgSgLgPAAQgOAAgKAIQgJAIgFAUQgHAWABBBIAABQg");
	this.shape_24.setTransform(105.4,91.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_25.setTransform(65.7032,92.15);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARgBQAXAAAWAOIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAUQgFAWgBBBIAABQg");
	this.shape_26.setTransform(44.25,91.85);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("Ah9C2IAAllIA/AAIAAAmQANgTAVgNQAWgMAYAAQAuAAAfAkQAfAjAAA/QAABAgfAkQggAkguAAQgUAAgRgIQgRgJgUgVIAACDgAgphrQgQATAAAmQAAAsAQAUQASAVAYAAQAYAAAQgTQAPgTAAgrQAAgpgQgUQgQgUgYAAQgZAAgQAUg");
	this.shape_27.setTransform(18.05,96.775);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_28.setTransform(649.2532,34.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_29.setTransform(621.025,34.3);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgMgKgIQgKgGgOAAQgQAAgPAJQgOAKgFAQQgGARAAAqIAAB2IhEAAIAAkDIBAAAIAAAmQAhgrAzAAQAXAAASAHQATAJAKANQAJAMAFAQQADARAAAdIAAChg");
	this.shape_30.setTransform(578.65,34);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AhfCMQgZgiAAg3QAAg/AhglQAigkA0AAQA4AAAiAmQAhAngBBNIirAAQABAeAQASQAPAQAXAAQAQABALgJQALgJAGgUIBEAMQgNAmgcATQgdAUgrAAQhCAAghgtgAgigQQgPAQAAAbIBmAAQgBgdgPgPQgOgPgVAAQgWgBgOARgAgihvIAihJIBMAAIhDBJg");
	this.shape_31.setTransform(549.2032,29.35);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_32.setTransform(528.625,29.35);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgYCrQgWgLgQgWIAAAmIg/AAIAAllIBEAAIAACBQAggkArAAQAuAAAfAjQAgAhAABAQgBBCgfAkQgfAkguAAQgVAAgVgLgAgpgRQgRATAAAmQAAApAOATQARAbAcAAQAYAAAPgSQAQgUAAgqQAAgtgQgSQgQgUgYABQgZAAgQASg");
	this.shape_33.setTransform(507,29.65);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AB6CFIAAiTQAAgngHgMQgKgOgUAAQgOAAgNAIQgMAKgGAQQgGARABAkIAAB9IhEAAIAAiOQAAglgDgLQgFgLgHgGQgIgFgNAAQgQAAgMAIQgNAJgFAQQgGAQAAAkIAAB/IhEAAIAAkDIA/AAIAAAjQAhgoAwAAQAYAAASAKQASAKAMAUQAQgUAVgKQATgKAXAAQAcgBAUAMQAUALAJAXQAIAQgBAmIAAClg");
	this.shape_34.setTransform(468.75,34);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQAKgRAUgIQASgKAkgHQAvgJASgIIAAgHQABgTgLgJQgJgIgaAAQgSAAgKAHQgLAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAWAKAKARQAJARAAAsIgBBQQAAAhADARQAEAQAIATIhDAAIgHgVIgCgIQgSASgUAIQgTAJgWAAQgoAAgXgXgAgBAPQgdAGgJAHQgNAJAAAOQAAAPAKAKQALALARAAQASAAAQgMQANgJAEgOQADgIgBgZIAAgOQgNAFgbAFg");
	this.shape_35.setTransform(432.75,34.3);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgMAAgkIAAhwIgfAAIAAg3IAfAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfACAGQAAAEAGAEQAEAEAHgBQAKABASgHIAGA1QgZALgeAAQgTgBgNgFg");
	this.shape_36.setTransform(410.55,30);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_37.setTransform(373.075,34.3);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_38.setTransform(343.175,34.3);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_39.setTransform(315.8032,34.3);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhYBkQghgkAAhAQAAg/AhgjQAigkA5AAQAwAAAcAUQAcAUAMAqIhEAMQgDgUgMgKQgNgKgTAAQgYAAgQARQgPARAAAqQAAAuAQASQAPAUAZgBQAUAAAMgLQANgLAFgbIBDALQgKAvgeAYQgeAYgyAAQg4gBgigjg");
	this.shape_40.setTransform(288.625,34.3);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_41.setTransform(259.125,34.3);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARAAQAXAAAWAMIgVA8QgSgLgPAAQgOAAgKAIQgJAIgFAUQgHAVAABBIAABRg");
	this.shape_42.setTransform(236,34);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("Ah9C2IAAllIBAAAIAAAmQAMgTAVgNQAVgMAZAAQAtAAAgAkQAgAjAAA/QgBBAggAkQgfAkgtAAQgVAAgRgIQgSgJgTgVIAACDgAgphrQgRATAAAmQABAsAQAUQASAVAYAAQAYAAAPgTQAQgTABgrQAAgpgRgUQgQgUgYAAQgYAAgRAUg");
	this.shape_43.setTransform(209.8,38.925);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_44.setTransform(165.7532,34.3);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgRQgDgMAAgkIAAhwIgfAAIAAg3IAfAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfABAGQABAEAGAEQAEAEAHgBQAJABASgHIAHA1QgZALgeAAQgSgBgOgFg");
	this.shape_45.setTransform(143.8,30);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_46.setTransform(120.875,34.3);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_47.setTransform(93.5032,34.3);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgMgKgIQgKgGgOAAQgQAAgPAJQgOAKgFAQQgGARAAAqIAAB2IhEAAIAAkDIBAAAIAAAmQAhgrAzAAQAXAAATAHQASAJAKANQAJAMAFAQQADARAAAdIAAChg");
	this.shape_48.setTransform(50.7,34);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AiHCzIAAllIEJAAIAAA8IjBAAIAABQICzAAIAAA7IizAAIAABiIDHAAIAAA8g");
	this.shape_49.setTransform(19.25,29.35);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("EhY6AL4IAA3vMCx1AAAIAAXvg");
	this.shape_50.setTransform(384.0821,59.3311,0.7628,0.9404);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-12.1,872.3,143);


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
	this.shape.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAGAAAIQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape.setTransform(559.825,150);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhiByQgWgWAAghQAAgWAKgSQAKgQATgJQATgJAkgHQAvgJATgHIAAgIQgBgUgJgHQgKgJgaAAQgSAAgLAHQgKAHgGATIg+gMQAKgmAagSQAZgRAygBQAtABAXAKQAXALAJARQAJAQAAAtIgBBPQAAAjAEAQQACAQAKATIhEAAIgGgVIgDgIQgSARgUAJQgTAIgXAAQgoAAgXgVgAgCAQQgcAFgJAGQgNAKAAAPQAAAOALALQAKAKARAAQARAAASgMQAMgKAEgNQACgIABgaIAAgNQgOAFgcAGg");
	this.shape_1.setTransform(532.7,150);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgIQANgJARAAQAXABAWANIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAVQgFAVAABBIAABQg");
	this.shape_2.setTransform(511,149.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7ABAlAlQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbgBQgaABgSAUg");
	this.shape_3.setTransform(484.125,150);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhBAegjQAfgiAwAAQArAAAfAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASgBAmQAAArAMASQAQAbAeAAQAXAAAQgVQASgTgBgoQAAgugQgSQgQgTgZgBQgXABgRATg");
	this.shape_4.setTransform(452.9,145.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhhByQgYgWAAghQAAgWALgSQAKgQATgJQATgJAkgHQAvgJATgHIAAgIQAAgUgKgHQgKgJgaAAQgTAAgJAHQgLAHgGATIg+gMQAKgmAagSQAZgRAygBQAuABAWAKQAWALAKARQAJAQAAAtIgBBPQAAAjAEAQQACAQAJATIhDAAIgGgVIgDgIQgSARgUAJQgTAIgWAAQgpAAgWgVgAgCAQQgcAFgJAGQgNAKAAAPQAAAOALALQALAKAQAAQASAAARgMQAMgKAEgNQACgIABgaIAAgNQgOAFgcAGg");
	this.shape_5.setTransform(424.35,150);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgQQgCgMAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABnQAAAgACAGQABAFAEADQAFADAHABQAJgBATgGIAFA1QgXAKgfAAQgTAAgNgFg");
	this.shape_6.setTransform(402.15,145.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgIQANgJARAAQAXABAWANIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAVQgFAVAABBIAABQg");
	this.shape_7.setTransform(386,149.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7ABAlAlQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbgBQgaABgSAUg");
	this.shape_8.setTransform(359.125,150);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("Ah9C2IAAllIBAAAIAAAmQAMgTAVgNQAVgMAZAAQAuAAAfAkQAfAjABA/QAABAghAkQgfAkgtAAQgVAAgRgIQgSgJgTgVIAACDgAgphrQgRATAAAmQAAAsARAUQASAVAYAAQAYAAAPgTQARgTgBgrQAAgpgQgUQgQgUgYAAQgZAAgQAUg");
	this.shape_9.setTransform(329.25,154.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAGAAAIQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_10.setTransform(298.675,150);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgNgKgGQgKgHgOAAQgRAAgOAJQgOALgFAQQgFAQgBAqIAAB2IhEAAIAAkDIBAAAIAAAmQAhgrAzgBQAXAAATAJQATAIAJAMQAJANAEAQQAEAQAAAfIAACgg");
	this.shape_11.setTransform(270.2,149.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhiByQgWgWAAghQAAgWAKgSQALgQASgJQATgJAkgHQAvgJATgHIAAgIQgBgUgJgHQgKgJgaAAQgSAAgLAHQgKAHgHATIg9gMQAKgmAagSQAZgRAygBQAtABAXAKQAXALAJARQAJAQAAAtIgBBPQAAAjADAQQAEAQAJATIhEAAIgGgVIgDgIQgSARgUAJQgTAIgXAAQgoAAgXgVgAgCAQQgcAFgIAGQgOAKAAAPQAAAOALALQAKAKARAAQARAAASgMQAMgKAEgNQADgIAAgaIAAgNQgNAFgdAGg");
	this.shape_12.setTransform(241,150);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgIQANgJARAAQAXABAWANIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAVQgFAVgBBBIAABQg");
	this.shape_13.setTransform(219.3,149.7);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgQQgDgMAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABnQAAAgABAGQACAFAFADQAEADAHABQAJgBASgGIAHA1QgYAKgfAAQgSAAgOgFg");
	this.shape_14.setTransform(199.35,145.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAGAAAIQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_15.setTransform(162.525,150);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhhByQgYgWAAghQAAgWALgSQAKgQAUgJQASgJAkgHQAvgJASgHIAAgIQAAgUgKgHQgJgJgaAAQgTAAgKAHQgKAHgHATIg+gMQALgmAZgSQAagRAzgBQAsABAXAKQAWALAKARQAJAQAAAtIgBBPQAAAjADAQQAEAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAIgXAAQgnAAgXgVgAgBAQQgdAFgIAGQgOAKAAAPQAAAOAKALQAMAKAQAAQARAAARgMQANgKAEgNQACgIAAgaIAAgNQgNAFgbAGg");
	this.shape_16.setTransform(135.4,150);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhBAegjQAggiAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASAAAmQgBArAMASQARAbAdAAQAXAAAQgVQASgTgBgoQAAgugQgSQgQgTgZgBQgXABgRATg");
	this.shape_17.setTransform(105.6,145.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AAxCFIAAiFQAAgpgEgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAQQgFAQgBAqIAAB2IhEAAIAAkDIBAAAIAAAmQAhgrAzgBQAXAAATAJQATAIAJAMQAKANADAQQAEAQAAAfIAACgg");
	this.shape_18.setTransform(75.7,149.7);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhiByQgWgWAAghQAAgWAKgSQALgQASgJQATgJAkgHQAvgJATgHIAAgIQAAgUgLgHQgJgJgaAAQgSAAgLAHQgKAHgHATIg+gMQALgmAZgSQAagRAzgBQAsABAXAKQAXALAJARQAJAQAAAtIgBBPQAAAjADAQQAEAQAJATIhEAAIgHgVIgCgIQgSARgUAJQgTAIgXAAQgoAAgXgVgAgBAQQgdAFgIAGQgOAKAAAPQAAAOAKALQAMAKAQAAQARAAARgMQANgKAEgNQADgIAAgaIAAgNQgNAFgcAGg");
	this.shape_19.setTransform(46.5,150);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgZCrQgVgLgQgWIAAAmIg/AAIAAllIBEAAIAACBQAggkArAAQAuAAAgAiQAeAjABA+QgBBDgfAkQgfAkguAAQgVAAgWgLgAgpgQQgQARgBAnQAAApAOAUQARAbAcAAQAYAAAPgTQARgUgBgqQAAgsgQgTQgQgTgYgBQgYAAgRAUg");
	this.shape_20.setTransform(17.95,145.35);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_21.setTransform(651.725,92.15);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhhBxQgXgVAAghQAAgXAKgQQAKgSATgHQATgKAkgHQAvgJATgIIAAgHQAAgTgKgJQgKgIgaAAQgTAAgJAHQgLAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQACAQAJATIhDAAIgGgVIgDgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPALALQALAKAQAAQARAAASgMQAMgJAEgOQACgJABgZIAAgNQgOAFgcAFg");
	this.shape_22.setTransform(624.6,92.15);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_23.setTransform(603.775,87.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_24.setTransform(568.7532,92.15);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAggjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgWALQgVALgVAAQgtAAgggkgAgngQQgRASAAAmQAAAqAMATQARAaAdABQAXgBAQgTQARgVAAgnQAAgtgQgTQgQgTgZAAQgYAAgQATg");
	this.shape_25.setTransform(539.2,87.5);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_26.setTransform(496.075,92.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhfCMQgZgjAAg2QAAg/AhgkQAiglA0AAQA4AAAiAmQAhAmgBBOIirAAQABAfAQAQQAPASAXgBQAQAAALgIQALgJAGgUIBEAMQgNAlgcAVQgdATgrAAQhCAAghgtgAgigRQgPARAAAbIBmAAQgBgcgPgQQgOgPgVAAQgWAAgOAPgAgihvIAihJIBMAAIhDBJg");
	this.shape_27.setTransform(468.7032,87.2);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgdCCIhpkDIBIAAIAxCEIANAsIAIgWIAHgWIAxiEIBHAAIhnEDg");
	this.shape_28.setTransform(440.925,92.125);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhiBxQgWgVAAghQAAgXAKgQQALgSASgHQATgKAkgHQAvgJATgIIAAgHQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAHgHATIg9gMQAKglAagTQAZgSAzAAQAsAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjADAQQAEAQAJATIhEAAIgGgVIgDgIQgSARgUAJQgTAJgXgBQgoABgXgXgAgBAPQgdAHgIAFQgOAKAAAOQAAAPALALQAKAKARAAQARAAASgMQAMgJAEgOQADgJAAgZIAAgNQgNAFgcAFg");
	this.shape_29.setTransform(413.35,92.15);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARgBQAXAAAWAOIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAUQgFAWgBBBIAABQg");
	this.shape_30.setTransform(391.65,91.85);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgRQgDgLAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfABAGQACAEAFAEQAEADAHAAQAJAAASgGIAHA1QgYALgfgBQgSAAgOgFg");
	this.shape_31.setTransform(371.7,87.85);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgIIAAgHQABgTgLgJQgJgIgaAAQgTAAgJAHQgLAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjAEAQQADAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAJgWgBQgoABgXgXgAgBAPQgdAHgJAFQgNAKAAAOQAAAPAKALQALAKARAAQASAAAQgMQANgJAEgOQADgJgBgZIAAgNQgNAFgbAFg");
	this.shape_32.setTransform(335.55,92.15);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_33.setTransform(293.175,92.15);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_34.setTransform(265.8032,92.15);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARgBQAXAAAWAOIgWA7QgRgLgOAAQgPAAgKAIQgJAIgGAUQgFAWAABBIAABQg");
	this.shape_35.setTransform(244.35,91.85);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_36.setTransform(217.475,92.15);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAggjAvAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASAAAmQAAAqALATQARAaAcABQAYgBARgTQAQgVAAgnQAAgtgQgTQgQgTgZAAQgYAAgQATg");
	this.shape_37.setTransform(186.25,87.5);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgIIAAgHQABgTgLgJQgJgIgaAAQgSAAgKAHQgLAHgGATIg+gMQAKglAZgTQAagSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQADAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPAKALQALAKARAAQASAAARgMQAMgJAEgOQADgJgBgZIAAgNQgMAFgdAFg");
	this.shape_38.setTransform(157.7,92.15);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAPQgGAQAAArIAAB2IhEAAIAAkDIBAAAIAAAmQAhgsAzAAQAXABATAHQASAJAKANQAJAMAFAQQADAQAAAfIAACgg");
	this.shape_39.setTransform(128.55,91.85);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhyIAAhAIBDAAIAABAg");
	this.shape_40.setTransform(106.325,87.2);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_41.setTransform(85.825,92.15);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_42.setTransform(64.625,87.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQALgSATgHQASgKAkgHQAvgJATgIIAAgHQAAgTgKgJQgKgIgaAAQgTAAgJAHQgLAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQACAQAJATIhDAAIgGgVIgDgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPALALQALAKAQAAQASAAARgMQAMgJAEgOQACgJABgZIAAgNQgOAFgcAFg");
	this.shape_43.setTransform(43.75,92.15);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_44.setTransform(16.325,92.15);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_45.setTransform(762.725,34.3);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_46.setTransform(734.275,34.3);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AAyCFIAAiFQgBgpgEgMQgEgMgKgIQgKgGgOAAQgRAAgOAJQgOAKgFAQQgFARAAAqIAAB2IhFAAIAAkDIA/AAIAAAmQAigrAzAAQAXAAASAHQATAJAKANQAKAMADAQQAEARAAAdIAAChg");
	this.shape_47.setTransform(703.7,34);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARAAQAXAAAWAMIgVA8QgSgLgPAAQgOAAgKAIQgJAIgFAUQgHAVAABBIAABRg");
	this.shape_48.setTransform(680.6,34);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_49.setTransform(653.725,34.3);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AAyCzIAAiJQAAgpgFgJQgDgLgKgHQgKgGgPAAQgQgBgNAJQgOAIgGAQQgGAQAAAhIAACCIhFAAIAAllIBFAAIAACDQAhgmAtAAQAYAAATAJQATAJAKANQAJAOAEARQADAQAAAiIAACYg");
	this.shape_50.setTransform(623.15,29.35);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_51.setTransform(579.375,34.3);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_52.setTransform(550.925,34.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_53.setTransform(528.675,29.35);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AhiBxQgWgVAAgiQAAgWAKgQQALgRASgIQATgKAkgHQAvgJATgIIAAgHQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAIgHASIg9gMQAKgmAagRQAZgTAyABQAtAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhADARQAEAQAJATIhEAAIgGgVIgDgIQgSASgUAIQgTAJgXAAQgoAAgXgXgAgCAPQgcAGgIAHQgOAJAAAOQAAAPALAKQAKALARAAQARAAASgMQAMgJAEgOQADgIAAgZIAAgOQgNAFgdAFg");
	this.shape_54.setTransform(493.9,34.3);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgMgKgIQgKgGgOAAQgQAAgPAJQgOAKgFAQQgGARAAAqIAAB2IhEAAIAAkDIBAAAIAAAmQAhgrAzAAQAXAAATAHQASAJAKANQAJAMAFAQQADARAAAdIAAChg");
	this.shape_55.setTransform(450.85,34);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AhhBxQgYgVABgiQAAgWAKgQQAKgRATgIQATgKAkgHQAvgJATgIIAAgHQAAgTgKgJQgKgIgaAAQgTAAgJAHQgLAIgGASIg+gMQAKgmAagRQAZgTAyABQAuAAAWALQAWAKAKARQAJARAAAsIgBBQQAAAhAEARQACAQAJATIhDAAIgGgVIgDgIQgSASgUAIQgTAJgWAAQgpAAgWgXgAgCAPQgcAGgJAHQgNAJAAAOQAAAPALAKQALALAQAAQASAAARgMQAMgJAEgOQACgIABgZIAAgOQgOAFgcAFg");
	this.shape_56.setTransform(421.65,34.3);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgMAAgkIAAhwIggAAIAAg3IAgAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfACAGQABAEAEAEQAFAEAHgBQAJABATgHIAFA1QgXALgfAAQgTgBgNgFg");
	this.shape_57.setTransform(399.45,30);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AAxCFIAAiFQAAgpgEgMQgEgMgKgIQgKgGgOAAQgQAAgPAJQgOAKgFAQQgFARgBAqIAAB2IhEAAIAAkDIBAAAIAAAmQAhgrAzAAQAXAAATAHQATAJAJANQAKAMADAQQAEARAAAdIAAChg");
	this.shape_58.setTransform(375.85,34);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_59.setTransform(346.4032,34.3);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AB6CFIAAiTQAAgngHgMQgKgOgTAAQgPAAgMAIQgNAKgGAQQgFARgBAkIAAB9IhDAAIAAiOQAAglgEgLQgDgLgIgGQgHgFgOAAQgQAAgNAIQgMAJgGAQQgFAQAAAkIAAB/IhFAAIAAkDIA/AAIAAAjQAjgoAuAAQAZAAASAKQASAKALAUQASgUATgKQAUgKAWAAQAdgBAUAMQAUALAKAXQAGAQABAmIAAClg");
	this.shape_60.setTransform(310.4,34);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_61.setTransform(281.375,29.35);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_62.setTransform(267.475,29.35);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQAKgRATgIQATgKAkgHQAvgJATgIIAAgHQAAgTgKgJQgKgIgaAAQgTAAgJAHQgLAIgGASIg+gMQAKgmAagRQAZgTAyABQAuAAAWALQAWAKAKARQAJARAAAsIgBBQQAAAhAEARQACAQAKATIhEAAIgGgVIgDgIQgSASgUAIQgTAJgWAAQgpAAgWgXgAgCAPQgcAGgJAHQgNAJAAAOQAAAPALAKQALALAQAAQASAAARgMQAMgJAEgOQACgIABgZIAAgOQgOAFgcAFg");
	this.shape_63.setTransform(246.6,34.3);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_64.setTransform(204.225,34.3);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_65.setTransform(175.775,34.3);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_66.setTransform(153.525,29.35);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_67.setTransform(139.625,29.35);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_68.setTransform(118.075,34.3);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_69.setTransform(76.375,34.3);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_70.setTransform(47.925,34.3);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("Ah9CyIAAliIBIAAIAAElICzAAIAAA9g");
	this.shape_71.setTransform(18.45,29.5);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("EhY6AL4IAA3vMCx1AAAIAAXvg");
	this.shape_72.setTransform(373.1006,87.3826,0.7435,1.3089);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-12.1,846.2,199);


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
	this.shape.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAGAAAIQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape.setTransform(579.375,150);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7ABAlAlQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbgBQgaABgSAUg");
	this.shape_1.setTransform(550.925,150);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_2.setTransform(528.675,145.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhzIAAg/IBDAAIAAA/g");
	this.shape_3.setTransform(514.775,145.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAGAAAIQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_4.setTransform(493.225,150);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAQQgGAQAAAqIAAB2IhEAAIAAkDIBAAAIAAAmQAhgrAzgBQAXAAATAJQASAIAKAMQAJANAFAQQADAQAAAfIAACgg");
	this.shape_5.setTransform(450.85,149.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_6.setTransform(421.4032,150);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7ABAlAlQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbgBQgaABgSAUg");
	this.shape_7.setTransform(378.625,150);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgQQgCgMAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABnQAAAgACAGQABAFAEADQAFADAHABQAJgBATgGIAFA1QgXAKgfAAQgSAAgOgFg");
	this.shape_8.setTransform(355,145.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAQQgFAQgBAqIAAB2IhEAAIAAkDIBAAAIAAAmQAhgrAzgBQAXAAATAJQATAIAJAMQAJANAEAQQAEAQAAAfIAACgg");
	this.shape_9.setTransform(331.4,149.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_10.setTransform(301.9532,150);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhzIAAg/IBDAAIAAA/g");
	this.shape_11.setTransform(281.375,145.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AB6CFIAAiUQAAgngHgKQgJgPgUAAQgPAAgMAJQgNAJgGARQgFARAAAjIAAB9IhEAAIAAiNQAAgngDgLQgEgKgIgGQgHgFgOAAQgQAAgNAJQgMAIgGAQQgFAQAAAlIAAB+IhEAAIAAkDIA/AAIAAAkQAhgpAwgBQAYAAATAKQARALALAVQASgVATgLQAUgKAXAAQAcAAAUAMQAUAMAJAWQAIAQgBAlIAACmg");
	this.shape_12.setTransform(252.05,149.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhiByQgXgWABghQgBgWALgSQALgQASgJQATgJAkgHQAvgJASgHIAAgIQAAgUgKgHQgJgJgaAAQgTAAgKAHQgKAHgHATIg+gMQALgmAZgSQAagRAzgBQAsABAXAKQAXALAJARQAJAQAAAtIgBBPQAAAjADAQQADAQAKATIhEAAIgHgVIgCgIQgSARgUAJQgTAIgXAAQgnAAgYgVgAgBAQQgdAFgIAGQgOAKAAAPQAAAOAKALQAMAKAQAAQARAAARgMQANgKAEgNQACgIAAgaIAAgNQgNAFgbAGg");
	this.shape_13.setTransform(216.05,150);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AAyCFIAAiFQAAgpgFgMQgEgNgKgGQgKgHgOAAQgRAAgOAJQgOALgFAQQgGAQABAqIAAB2IhFAAIAAkDIA/AAIAAAmQAjgrAygBQAXAAASAJQAUAIAJAMQAKANAEAQQADAQAAAfIAACgg");
	this.shape_14.setTransform(186.9,149.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_15.setTransform(157.4532,150);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigkA5AAQAwAAAcAVQAcAUAMAqIhEAMQgDgUgMgLQgNgKgTAAQgYAAgQASQgPARAAAqQAAAtAQAUQAPASAZAAQAUABAMgLQANgMAFgbIBDAMQgKAugeAYQgeAXgyAAQg4ABgiglg");
	this.shape_16.setTransform(130.275,150);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhhByQgYgWAAghQAAgWALgSQAKgQAUgJQASgJAkgHQAvgJASgHIAAgIQAAgUgKgHQgJgJgaAAQgTAAgKAHQgKAHgHATIg+gMQALgmAZgSQAagRAzgBQAsABAXAKQAWALAKARQAJAQAAAtIgBBPQAAAjADAQQAEAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAIgXAAQgnAAgXgVgAgBAQQgdAFgIAGQgOAKAAAPQAAAOAKALQAMAKAQAAQARAAARgMQANgKAEgNQACgIAAgaIAAgNQgNAFgbAGg");
	this.shape_17.setTransform(102.1,150);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AB6CFIAAiUQAAgngHgKQgJgPgUAAQgPAAgMAJQgNAJgGARQgFARgBAjIAAB9IhDAAIAAiNQAAgngEgLQgDgKgIgGQgHgFgOAAQgQAAgNAJQgMAIgGAQQgFAQAAAlIAAB+IhFAAIAAkDIA/AAIAAAkQAjgpAvgBQAYAAATAKQARALALAVQARgVAUgLQAUgKAXAAQAcAAAUAMQAUAMAKAWQAGAQAAAlIAACmg");
	this.shape_18.setTransform(65.85,149.7);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_19.setTransform(36.825,145.05);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhhByQgYgWAAghQAAgWALgSQAKgQAUgJQASgJAkgHQAvgJASgHIAAgIQABgUgLgHQgJgJgaAAQgSAAgKAHQgLAHgGATIg/gMQALgmAZgSQAagRAygBQAuABAWAKQAWALAKARQAJAQAAAtIgBBPQAAAjAEAQQADAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAIgWAAQgpAAgWgVgAgCAQQgcAFgJAGQgNAKAAAPQAAAOAKALQALAKARAAQASAAAQgMQANgKAEgNQADgIgBgaIAAgNQgMAFgdAGg");
	this.shape_20.setTransform(15.95,150);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhOB5QgUgLgKgVQgJgVAAgkIAAikIBEAAIAAB4QAAA1AEANQAEAMAKAHQAKAHAQAAQAQAAAOgJQAOgKAFgOQAFgOAAg3IAAhuIBFAAIAAEDIhAAAIAAgnQgOAVgXAMQgXAMgZAAQgaAAgVgMg");
	this.shape_21.setTransform(553.5,92.425);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_22.setTransform(523.725,92.15);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgIIAAgHQABgTgLgJQgJgIgaAAQgSAAgKAHQgLAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjADAQQAEAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAJgWgBQgoABgXgXgAgBAPQgdAHgJAFQgNAKAAAOQAAAPAKALQALAKARAAQASAAAQgMQANgJAEgOQADgJgBgZIAAgNQgNAFgbAFg");
	this.shape_23.setTransform(482.7,92.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgLAAglIAAhwIgfAAIAAg3IAfAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfABAGQABAEAGAEQAEADAHAAQAKAAARgGIAHA1QgZALgegBQgSAAgOgFg");
	this.shape_24.setTransform(460.5,87.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_25.setTransform(437.575,92.15);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhiBxQgXgVABghQgBgXALgQQALgSASgHQATgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjADAQQADAQAKATIhEAAQgDgIgEgNIgCgIQgSARgUAJQgTAJgXgBQgnABgYgXgAgBAPQgdAHgIAFQgOAKAAAOQAAAPAKALQAMAKAQAAQARAAARgMQANgJAEgOQACgJAAgZIAAgNQgNAFgbAFg");
	this.shape_26.setTransform(410.45,92.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AAyCzIAAiJQAAgogFgLQgDgKgKgHQgKgHgPABQgQAAgNAIQgOAIgGAQQgHARABAgIAACCIhFAAIAAllIBFAAIAACDQAhgmAtAAQAYAAATAJQATAIAJAOQAKAOAEARQADAQAAAiIAACYg");
	this.shape_27.setTransform(381.3,87.2);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_28.setTransform(336.875,92.15);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAfghQAfgjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgWALQgVALgVAAQgtAAgggkgAgngQQgRASAAAmQAAAqAMATQARAaAdABQAXgBAQgTQARgVAAgnQAAgtgQgTQgQgTgZAAQgYAAgQATg");
	this.shape_29.setTransform(305.65,87.5);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhiBxQgWgVAAghQAAgXAKgQQAKgSATgHQATgKAkgHQAvgJATgIIAAgHQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAXAKAJARQAJARAAAsIgBBPQAAAjAEAQQACAQAKATIhEAAIgGgVIgDgIQgSARgUAJQgTAJgXgBQgoABgXgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPALALQAKAKARAAQARAAASgMQAMgJAEgOQACgJABgZIAAgNQgOAFgcAFg");
	this.shape_30.setTransform(277.1,92.15);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgLAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfACAGQABAEAEAEQAFADAHAAQAJAAATgGIAFA1QgYALgegBQgTAAgNgFg");
	this.shape_31.setTransform(254.9,87.85);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARgBQAXAAAWAOIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAUQgFAWAABBIAABQg");
	this.shape_32.setTransform(238.75,91.85);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_33.setTransform(211.875,92.15);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("Ah9C2IAAllIBAAAIAAAmQAMgTAVgNQAWgMAYAAQAtAAAgAkQAfAjABA/QAABAghAkQgfAkgtAAQgVAAgRgIQgRgJgUgVIAACDgAgphrQgRATAAAmQABAsAQAUQASAVAYAAQAYAAAPgTQAQgTAAgrQAAgpgQgUQgQgUgYAAQgYAAgRAUg");
	this.shape_34.setTransform(182,96.775);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_35.setTransform(151.425,92.15);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AAxCFIAAiFQAAgpgEgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAPQgFAQgBArIAAB2IhEAAIAAkDIBAAAIAAAmQAhgsAzAAQAXABATAHQATAJAJANQAKAMADAQQAEAQAAAfIAACgg");
	this.shape_36.setTransform(122.95,91.85);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AhiBxQgWgVAAghQAAgXAKgQQALgSASgHQATgKAkgHQAvgJATgIIAAgHQAAgTgLgJQgJgIgaAAQgSAAgLAHQgKAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjADAQQAEAQAJATIhEAAIgHgVIgCgIQgSARgUAJQgTAJgXgBQgoABgXgXgAgBAPQgdAHgIAFQgOAKAAAOQAAAPAKALQAMAKAQAAQARAAARgMQANgJAEgOQADgJAAgZIAAgNQgNAFgcAFg");
	this.shape_37.setTransform(93.75,92.15);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARgBQAXAAAWAOIgWA7QgQgLgQAAQgOAAgKAIQgJAIgGAUQgFAWgBBBIAABQg");
	this.shape_38.setTransform(72.05,91.85);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgRQgDgLAAglIAAhwIgfAAIAAg3IAfAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfABAGQACAEAFAEQAEADAHAAQAJAAASgGIAHA1QgYALgfgBQgSAAgOgFg");
	this.shape_39.setTransform(52.1,87.85);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhuCyIgGg1QAQADANAAQAYAAAMgOQALgOAGgWIhikDIBJAAIA9C3IA8i3IBHAAIhbD4IgRAuQgJAWgIAMQgIAMgKAIQgKAHgQAEQgPAEgUAAQgUAAgTgEg");
	this.shape_40.setTransform(15.675,97.375);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_41.setTransform(623.175,34.3);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAfgjAwAAQArAAAfAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASgBAmQAAArAMASQAQAbAegBQAXAAAQgTQASgVgBgoQAAgsgQgTQgQgUgZABQgXgBgRAUg");
	this.shape_42.setTransform(591.95,29.65);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhhBxQgXgVAAgiQAAgWAKgQQAKgRATgIQATgKAkgHQAvgJATgIIAAgHQgBgTgJgJQgKgIgaAAQgTAAgJAHQgLAIgGASIg+gMQAKgmAagRQAZgTAyABQAuAAAWALQAWAKAKARQAJARAAAsIgBBQQAAAhAEARQACAQAJATIhDAAIgGgVIgDgIQgSASgUAIQgTAJgWAAQgpAAgWgXgAgCAPQgcAGgJAHQgNAJAAAOQAAAPALAKQALALAQAAQARAAASgMQAMgJAEgOQACgIABgZIAAgOQgOAFgcAFg");
	this.shape_43.setTransform(563.4,34.3);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARAAQAXAAAWAMIgWA8QgQgLgPAAQgPAAgKAIQgJAIgGAUQgFAVAABBIAABRg");
	this.shape_44.setTransform(541.7,34);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgMAAgkIAAhwIggAAIAAg3IAgAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfACAGQABAEAEAEQAFAEAHgBQAJABATgHIAFA1QgYALgeAAQgTgBgNgFg");
	this.shape_45.setTransform(521.75,30);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AAyCFIAAiFQgBgpgEgMQgEgMgKgIQgKgGgOAAQgRAAgOAJQgOAKgFAQQgFARgBAqIAAB2IhEAAIAAkDIA/AAIAAAmQAjgrAyAAQAXAAATAHQATAJAJANQAKAMADAQQAEARAAAdIAAChg");
	this.shape_46.setTransform(498.15,34);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_47.setTransform(468.7032,34.3);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AhYBkQghgkAAhAQAAg/AhgjQAigkA5AAQAwAAAcAUQAcAUAMAqIhEAMQgDgUgMgKQgNgKgTAAQgYAAgQARQgPARAAAqQAAAuAQASQAPAUAZgBQAUAAAMgLQANgLAFgbIBDALQgKAvgeAYQgeAYgyAAQg4gBgigjg");
	this.shape_48.setTransform(441.525,34.3);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AAyCFIAAiFQgBgpgEgMQgEgMgKgIQgKgGgOAAQgRAAgOAJQgOAKgFAQQgGARABAqIAAB2IhFAAIAAkDIA/AAIAAAmQAigrAzAAQAXAAASAHQAUAJAJANQAKAMADAQQAEARAAAdIAAChg");
	this.shape_49.setTransform(412,34);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_50.setTransform(381.475,34.3);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AhYBkQghgkAAhAQAAg/AhgjQAigkA5AAQAwAAAcAUQAcAUAMAqIhEAMQgDgUgMgKQgNgKgTAAQgYAAgQARQgPARAAAqQAAAuAQASQAPAUAZgBQAUAAAMgLQANgLAFgbIBDALQgKAvgeAYQgeAYgyAAQg4gBgigjg");
	this.shape_51.setTransform(352.625,34.3);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_52.setTransform(309.875,34.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_53.setTransform(282.5032,34.3);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_54.setTransform(248.025,29.35);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AhiBxQgWgVAAgiQAAgWAKgQQAKgRATgIQATgKAkgHQAvgJATgIIAAgHQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAIgGASIg+gMQAKgmAagRQAZgTAyABQAuAAAWALQAXAKAJARQAJARAAAsIgBBQQAAAhAEARQACAQAKATIhEAAIgGgVIgDgIQgSASgUAIQgTAJgXAAQgoAAgXgXgAgCAPQgcAGgJAHQgNAJAAAOQAAAPALAKQAKALARAAQARAAASgMQAMgJAEgOQACgIABgZIAAgOQgOAFgcAFg");
	this.shape_55.setTransform(227.15,34.3);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_56.setTransform(206.325,29.35);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARAAQAXAAAWAMIgVA8QgRgLgQAAQgOAAgKAIQgJAIgFAUQgHAVAABBIAABRg");
	this.shape_57.setTransform(191.55,34);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_58.setTransform(165.7532,34.3);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgRQgDgMAAgkIAAhwIgfAAIAAg3IAfAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfABAGQABAEAGAEQAEAEAHgBQAJABASgHIAHA1QgZALgeAAQgSgBgOgFg");
	this.shape_59.setTransform(143.8,30);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AhiBxQgXgVABgiQgBgWALgQQALgRATgIQASgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhADARQADAQAKATIhEAAIgHgVIgCgIQgSASgUAIQgTAJgXAAQgnAAgYgXgAgBAPQgdAGgIAHQgOAJAAAOQAAAPAKAKQAMALAQAAQARAAARgMQANgJAEgOQACgIAAgZIAAgOQgNAFgbAFg");
	this.shape_60.setTransform(121.55,34.3);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AB6CFIAAiTQAAgngHgMQgKgOgTAAQgPAAgMAIQgNAKgGAQQgFARgBAkIAAB9IhDAAIAAiOQAAglgEgLQgDgLgIgGQgHgFgOAAQgQAAgNAIQgMAJgGAQQgFAQAAAkIAAB/IhFAAIAAkDIA/AAIAAAjQAjgoAuAAQAZAAATAKQARAKALAUQARgUAUgKQAUgKAWAAQAdgBAUAMQAUALAKAXQAGAQAAAmIAAClg");
	this.shape_61.setTransform(85.3,34);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_62.setTransform(42.375,29.35);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AiHCzIAAllIEJAAIAAA8IjBAAIAABQICzAAIAAA7IizAAIAABiIDHAAIAAA8g");
	this.shape_63.setTransform(19.25,29.35);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("EhY6AL4IAA3vMCx1AAAIAAXvg");
	this.shape_64.setTransform(309.091,85.3826,0.6345,1.3089);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-52,-14.1,772,199);


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
	this.shape.graphics.f("#000000").s().p("AhhByQgYgWAAghQAAgWALgSQAKgQAUgJQASgJAkgHQAvgJASgHIAAgIQABgUgLgHQgJgJgaAAQgTAAgJAHQgLAHgHATIg+gMQALgmAZgSQAagRAzgBQAsABAXAKQAXALAJARQAJAQAAAtIgBBPQAAAjAEAQQADAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAIgWAAQgoAAgXgVgAgBAQQgdAFgJAGQgNAKAAAPQAAAOAKALQALAKARAAQARAAARgMQANgKAEgNQADgIgBgaIAAgNQgNAFgbAGg");
	this.shape.setTransform(607.8,150);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgIQANgJARAAQAXABAWANIgVA7QgSgLgPAAQgOAAgKAIQgJAIgFAVQgHAVAABBIAABQg");
	this.shape_1.setTransform(586.1,149.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7ABAlAlQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbgBQgaABgSAUg");
	this.shape_2.setTransform(559.225,150);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAyCzIAAiJQAAgpgFgKQgDgLgKgGQgKgHgPAAQgQABgNAHQgOAJgGAQQgGARAAAgIAACCIhFAAIAAllIBFAAIAACEQAhgnAtAAQAYAAATAJQATAIAKAOQAJAOAEAQQADARAAAiIAACYg");
	this.shape_3.setTransform(528.65,145.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgIQANgJARAAQAXABAWANIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAVQgFAVAABBIAABQg");
	this.shape_4.setTransform(491.65,149.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7ABAlAlQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbgBQgaABgSAUg");
	this.shape_5.setTransform(464.775,150);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("Ah9C2IAAllIBAAAIAAAmQAMgTAVgNQAWgMAYAAQAtAAAgAkQAfAjABA/QAABAghAkQgfAkgtAAQgVAAgRgIQgRgJgUgVIAACDgAgphrQgRATAAAmQABAsAQAUQASAVAYAAQAYAAAPgTQAQgTAAgrQAAgpgQgUQgQgUgYAAQgYAAgRAUg");
	this.shape_6.setTransform(434.9,154.625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAGAAAIQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_7.setTransform(390.425,150);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhiByQgXgWABghQAAgWAKgSQALgQASgJQATgJAkgHQAvgJATgHIAAgIQAAgUgLgHQgJgJgaAAQgSAAgLAHQgKAHgHATIg+gMQALgmAZgSQAagRAzgBQAsABAXAKQAXALAJARQAJAQAAAtIgBBPQAAAjADAQQAEAQAJATIhEAAIgHgVIgCgIQgSARgUAJQgTAIgXAAQgoAAgXgVgAgBAQQgdAFgIAGQgOAKAAAPQAAAOAKALQAMAKAQAAQARAAARgMQANgKAEgNQADgIAAgaIAAgNQgNAFgcAGg");
	this.shape_8.setTransform(363.3,150);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhdCSQghgkABhAQgBhBAfgjQAggiAvAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgVALQgWALgVAAQgtAAgfgkgAgngQQgQASAAAmQAAArALASQARAbAcAAQAYAAARgVQARgTAAgoQgBgugQgSQgQgTgZgBQgYABgQATg");
	this.shape_9.setTransform(333.5,145.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhhByQgYgWAAghQAAgWALgSQAKgQAUgJQASgJAkgHQAvgJASgHIAAgIQABgUgLgHQgJgJgaAAQgTAAgJAHQgLAHgHATIg+gMQALgmAZgSQAagRAzgBQAsABAXAKQAXALAJARQAJAQAAAtIgBBPQAAAjADAQQAEAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAIgWAAQgoAAgXgVgAgBAQQgdAFgJAGQgNAKAAAPQAAAOAKALQALAKARAAQASAAAQgMQANgKAEgNQADgIgBgaIAAgNQgNAFgbAGg");
	this.shape_10.setTransform(304.95,150);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_11.setTransform(284.125,145.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_12.setTransform(263.0032,150);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AAxCFIAAiFQAAgpgEgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAQQgFAQgBAqIAAB2IhEAAIAAkDIBAAAIAAAmQAhgrAzgBQAXAAATAJQATAIAJAMQAKANADAQQAEAQAAAfIAACgg");
	this.shape_13.setTransform(234.1,149.7);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7ABAlAlQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbgBQgaABgSAUg");
	this.shape_14.setTransform(203.575,150);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgQQgCgMAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABnQAAAgACAGQABAFAEADQAFADAHABQAJgBATgGIAFA1QgXAKgfAAQgSAAgOgFg");
	this.shape_15.setTransform(179.95,145.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhTCPQgggoAAhnQAAhlAjgsQAdglAzAAQA0AAAdAlQAjAsAABlQAABmgjAsQgdAlg0AAQgzAAgggogAgVh1QgKAIgFAVQgHAaAAA+QAAA/AGAYQAGAXAKAIQAKAIALAAQAMAAAKgIQAKgIAFgUQAHgbAAg/QAAg+gGgXQgGgYgKgIQgKgIgMAAQgLAAgKAIg");
	this.shape_16.setTransform(143.575,145.275);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhTCPQgggoAAhnQAAhlAjgsQAdglAzAAQA0AAAdAlQAjAsAABlQAABmgjAsQgdAlg0AAQgzAAgggogAgVh1QgKAIgFAVQgHAaAAA+QAAA/AGAYQAGAXAKAIQAKAIALAAQAMAAAKgIQAKgIAFgUQAHgbAAg/QAAg+gGgXQgGgYgKgIQgKgIgMAAQgLAAgKAIg");
	this.shape_17.setTransform(115.775,145.275);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhRCbQgggcgFgtIBCgIQAEAZAOAOQANANAUAAQAUAAAPgQQAPgQAAgcQAAgZgOgQQgOgPgUAAQgNAAgSAFIAIg3QAbABAOgMQAPgNAAgWQAAgSgLgKQgLgLgQAAQgSAAgMAMQgNAMgDAYIg/gLQAHghANgTQANgTAYgLQAYgMAeAAQAxAAAfAhQAZAaAAAhQAAAvg0AcQAfAHATAWQASAXAAAgQAAAvgjAiQgiAhgyAAQgxAAgggcg");
	this.shape_18.setTransform(88.025,145.275);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_19.setTransform(46.2532,150);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhdCSQghgkAAhAQAAhBAfgjQAggiAvAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgVALQgWALgVAAQgtAAgfgkgAgngQQgQASAAAmQAAArALASQARAbAcAAQAYAAARgVQARgTAAgoQgBgugQgSQgQgTgZgBQgYABgQATg");
	this.shape_20.setTransform(16.7,145.35);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhdCSQghgkAAhAQAAhCAgghQAegjAwAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgVALQgWALgVAAQgtAAgfgkgAgngQQgQASAAAmQAAAqALATQAQAaAdABQAYgBARgTQARgVAAgnQAAgtgRgTQgQgTgZAAQgYAAgQATg");
	this.shape_21.setTransform(828.15,87.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhiBxQgXgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAWAKAKARQAJARAAAsIgBBPQAAAjADAQQAEAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAJgXgBQgnABgYgXgAgBAPQgdAHgIAFQgOAKAAAOQAAAPAKALQAMAKAQAAQARAAARgMQANgJAEgOQACgJAAgZIAAgNQgNAFgbAFg");
	this.shape_22.setTransform(799.6,92.15);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAfgjAwAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASAAAmQgBAqAMATQARAaAdABQAXgBAQgTQASgVgBgnQAAgtgQgTQgQgTgZAAQgXAAgRATg");
	this.shape_23.setTransform(769.8,87.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhyIAAhAIBDAAIAABAg");
	this.shape_24.setTransform(748.225,87.2);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_25.setTransform(727.725,92.15);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhiBxQgWgVAAghQAAgXAKgQQALgSASgHQATgKAkgHQAvgJATgIIAAgHQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAHgHATIg9gMQAKglAagTQAZgSAyAAQAtAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjADAQQAEAQAJATIhEAAIgGgVIgDgIQgSARgUAJQgTAJgXgBQgoABgXgXgAgCAPQgcAHgIAFQgOAKAAAOQAAAPALALQAKAKARAAQARAAASgMQAMgJAEgOQADgJAAgZIAAgNQgNAFgdAFg");
	this.shape_26.setTransform(699.55,92.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("Ah+C2IAAllIBAAAIAAAmQANgTAVgNQAWgMAYAAQAtAAAgAkQAgAjgBA/QAABAgfAkQggAkguAAQgUAAgRgIQgRgJgUgVIAACDgAgphrQgQATAAAmQgBAsASAUQARAVAYAAQAYAAAQgTQAPgTAAgrQAAgpgQgUQgQgUgYAAQgZAAgQAUg");
	this.shape_27.setTransform(671.1,96.775);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AhiBxQgXgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAWAKAKARQAJARAAAsIgBBPQAAAjADAQQAEAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAJgXgBQgnABgYgXgAgBAPQgdAHgIAFQgOAKAAAOQAAAPAKALQAMAKAQAAQARAAARgMQANgJAEgOQACgJAAgZIAAgNQgNAFgbAFg");
	this.shape_28.setTransform(641.2,92.15);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_29.setTransform(613.775,92.15);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgNgKgGQgKgHgOAAQgRAAgOAJQgOALgFAPQgGAQAAArIAAB2IhEAAIAAkDIBAAAIAAAmQAhgsAzAAQAXABATAHQATAJAJANQAKAMADAQQAEAQAAAfIAACgg");
	this.shape_30.setTransform(570.35,91.85);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_31.setTransform(539.825,92.15);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_32.setTransform(510.975,92.15);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_33.setTransform(467.575,92.15);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AAyCFIAAiFQAAgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAPQgGAQABArIAAB2IhFAAIAAkDIA/AAIAAAmQAigsAzAAQAXABASAHQAUAJAJANQAJAMAFAQQADAQAAAfIAACgg");
	this.shape_34.setTransform(437,91.85);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhOB5QgUgLgKgVQgJgVAAgkIAAikIBEAAIAAB4QABA1ADANQAEAMAKAHQAKAHAQAAQAQAAAOgJQAOgKAFgOQAFgOAAg3IAAhuIBFAAIAAEDIhAAAIAAgnQgOAVgXAMQgXAMgZAAQgaAAgVgMg");
	this.shape_35.setTransform(406.35,92.425);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgIIAAgHQABgTgLgJQgJgIgaAAQgSAAgKAHQgLAHgGATIg/gMQALglAZgTQAagSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQADAQAIATIhDAAIgGgVIgDgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPALALQAKAKARAAQASAAAQgMQANgJAEgOQADgJgBgZIAAgNQgMAFgdAFg");
	this.shape_36.setTransform(363.35,92.15);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAfghQAfgjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgWALQgVALgVAAQgtAAgggkgAgngQQgRASAAAmQAAAqAMATQARAaAdABQAXgBAQgTQARgVAAgnQAAgtgQgTQgQgTgZAAQgYAAgQATg");
	this.shape_37.setTransform(333.55,87.5);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhiBxQgWgVAAghQAAgXAKgQQAKgSATgHQATgKAkgHQAvgJATgIIAAgHQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAXAKAJARQAJARAAAsIgBBPQAAAjAEAQQACAQAKATIhEAAIgGgVIgDgIQgSARgUAJQgTAJgXgBQgoABgXgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPALALQAKAKARAAQARAAASgMQAMgJAEgOQACgJABgZIAAgNQgOAFgcAFg");
	this.shape_38.setTransform(305,92.15);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_39.setTransform(277.575,92.15);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_40.setTransform(234.825,92.15);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_41.setTransform(207.4532,92.15);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARgBQAXAAAWAOIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAUQgFAWgBBBIAABQg");
	this.shape_42.setTransform(186,91.85);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_43.setTransform(159.125,92.15);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAggjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgWALQgVALgVAAQgtAAgggkgAgngQQgRASAAAmQAAAqAMATQARAaAdABQAXgBAQgTQARgVAAgnQAAgtgQgTQgQgTgZAAQgYAAgQATg");
	this.shape_44.setTransform(127.9,87.5);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AhiBxQgWgVAAghQAAgXAKgQQAKgSATgHQATgKAkgHQAvgJATgIIAAgHQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAXAKAJARQAJARAAAsIgBBPQAAAjAEAQQACAQAKATIhEAAIgGgVIgDgIQgSARgUAJQgTAJgXgBQgoABgXgXgAgCAPQgcAHgIAFQgOAKAAAOQAAAPALALQAKAKARAAQARAAASgMQAMgJAEgOQACgJABgZIAAgNQgOAFgcAFg");
	this.shape_45.setTransform(99.35,92.15);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_46.setTransform(71.925,92.15);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_47.setTransform(43.5032,92.15);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_48.setTransform(15.275,92.15);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_49.setTransform(848.875,34.3);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_50.setTransform(820.425,34.3);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_51.setTransform(798.175,29.35);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQAKgRAUgIQASgKAkgHQAvgJASgIIAAgHQABgTgLgJQgJgIgaAAQgTAAgJAHQgLAIgGASIg+gMQAKgmAZgRQAagTAyABQAuAAAWALQAWAKAKARQAJARAAAsIgBBQQAAAhAEARQADAQAIATIhDAAIgHgVIgCgIQgSASgUAIQgTAJgWAAQgpAAgWgXgAgCAPQgcAGgJAHQgNAJAAAOQAAAPAKAKQALALARAAQASAAARgMQAMgJAEgOQACgIAAgZIAAgOQgMAFgdAFg");
	this.shape_52.setTransform(763.4,34.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgMAAgkIAAhwIgfAAIAAg3IAfAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfACAGQAAAEAGAEQAEAEAHgBQAKABASgHIAGA1QgZALgeAAQgSgBgOgFg");
	this.shape_53.setTransform(741.2,30);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_54.setTransform(718.275,34.3);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AhiBxQgXgVAAgiQAAgWALgQQAKgRAUgIQASgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAWAKAKARQAJARAAAsIgBBQQAAAhADARQAEAQAIATIhDAAIgHgVIgCgIQgSASgUAIQgTAJgXAAQgnAAgYgXgAgBAPQgdAGgIAHQgOAJAAAOQAAAPAKAKQAMALAQAAQARAAARgMQANgJAEgOQACgIAAgZIAAgOQgNAFgbAFg");
	this.shape_55.setTransform(691.15,34.3);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AAyCzIAAiJQgBgpgEgJQgDgLgKgHQgKgGgPAAQgQgBgOAJQgNAIgGAQQgHAQABAhIAACCIhFAAIAAllIBFAAIAACDQAhgmAtAAQAYAAATAJQATAJAJANQAKAOAEARQADAQAAAiIAACYg");
	this.shape_56.setTransform(662,29.35);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_57.setTransform(617.575,34.3);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AheCSQgfgkgBhAQABhCAfghQAfgjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgWALQgVALgVAAQgtAAgggkgAgngQQgRASAAAmQAAArAMASQAQAbAegBQAXAAAQgTQARgVABgoQgBgsgQgTQgQgUgZABQgYgBgQAUg");
	this.shape_58.setTransform(586.35,29.65);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AhiBxQgWgVAAgiQAAgWAKgQQALgRASgIQATgKAkgHQAvgJATgIIAAgHQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAIgHASIg9gMQAKgmAagRQAZgTAyABQAtAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhADARQAEAQAJATIhEAAIgGgVIgDgIQgSASgUAIQgTAJgXAAQgoAAgXgXgAgCAPQgcAGgIAHQgOAJAAAOQAAAPALAKQAKALARAAQARAAASgMQAMgJAEgOQADgIAAgZIAAgOQgOAFgcAFg");
	this.shape_59.setTransform(557.8,34.3);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgRQgDgMAAgkIAAhwIggAAIAAg3IAgAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfABAGQACAEAEAEQAFAEAHgBQAKABARgHIAGA1QgYALgeAAQgTgBgNgFg");
	this.shape_60.setTransform(535.6,30);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARAAQAXAAAWAMIgWA8QgQgLgPAAQgPAAgKAIQgJAIgGAUQgFAVgBBBIAABRg");
	this.shape_61.setTransform(519.45,34);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_62.setTransform(492.575,34.3);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("Ah9C2IAAllIBAAAIAAAmQAMgTAVgNQAVgMAZAAQAtAAAgAkQAgAjAAA/QgBBAggAkQgfAkgtAAQgVAAgRgIQgSgJgTgVIAACDgAgphrQgRATAAAmQABAsAQAUQASAVAYAAQAYAAAPgTQAQgTABgrQAAgpgRgUQgQgUgYAAQgYAAgRAUg");
	this.shape_63.setTransform(462.7,38.925);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_64.setTransform(432.125,34.3);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AAyCFIAAiFQgBgpgEgMQgEgMgKgIQgKgGgOAAQgRAAgOAJQgOAKgFAQQgFARgBAqIAAB2IhEAAIAAkDIA/AAIAAAmQAjgrAyAAQAXAAATAHQATAJAJANQAKAMADAQQAEARAAAdIAAChg");
	this.shape_65.setTransform(403.65,34);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AhiBxQgXgVABgiQgBgWALgQQALgRASgIQATgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhADARQADAQAKATIhEAAQgDgIgEgNIgCgIQgSASgUAIQgTAJgXAAQgnAAgYgXgAgBAPQgdAGgIAHQgOAJAAAOQAAAPAKAKQAMALAQAAQARAAARgMQANgJAEgOQACgIAAgZIAAgOQgNAFgbAFg");
	this.shape_66.setTransform(374.45,34.3);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARAAQAXAAAWAMIgVA8QgRgLgQAAQgOAAgKAIQgJAIgFAUQgHAVAABBIAABRg");
	this.shape_67.setTransform(352.75,34);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgRQgDgMAAgkIAAhwIgfAAIAAg3IAfAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfABAGQABAEAGAEQAEAEAHgBQAJABASgHIAHA1QgZALgeAAQgSgBgOgFg");
	this.shape_68.setTransform(332.8,30);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_69.setTransform(295.975,34.3);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_70.setTransform(268.6032,34.3);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_71.setTransform(234.125,29.35);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AhiBxQgXgVAAgiQAAgWALgQQAKgRAUgIQASgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAWAKAKARQAJARAAAsIgBBQQAAAhADARQAEAQAIATIhDAAIgHgVIgCgIQgSASgUAIQgTAJgXAAQgnAAgYgXgAgBAPQgdAGgIAHQgOAJAAAOQAAAPAKAKQAMALAQAAQARAAARgMQANgJAEgOQACgIAAgZIAAgOQgNAFgbAFg");
	this.shape_72.setTransform(213.25,34.3);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARAAQAXAAAWAMIgVA8QgRgLgQAAQgOAAgKAIQgJAIgFAUQgHAVAABBIAABRg");
	this.shape_73.setTransform(191.55,34);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_74.setTransform(165.7532,34.3);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AAyCFIAAiFQAAgpgFgMQgEgMgKgIQgKgGgOAAQgQAAgPAJQgOAKgFAQQgGARABAqIAAB2IhFAAIAAkDIA/AAIAAAmQAjgrAyAAQAXAAASAHQAUAJAJANQAJAMAFAQQADARAAAdIAAChg");
	this.shape_75.setTransform(136.85,34);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_76.setTransform(114.625,29.35);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AB6CFIAAiTQAAgngHgMQgKgOgTAAQgPAAgMAIQgNAKgGAQQgFARgBAkIAAB9IhDAAIAAiOQAAglgEgLQgDgLgIgGQgHgFgOAAQgQAAgNAIQgMAJgGAQQgFAQAAAkIAAB/IhFAAIAAkDIA/AAIAAAjQAjgoAuAAQAZAAATAKQARAKALAUQARgUAUgKQAUgKAWAAQAdgBAUAMQAUALAKAXQAGAQAAAmIAAClg");
	this.shape_77.setTransform(85.3,34);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_78.setTransform(42.375,29.35);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AiHCzIAAllIEJAAIAAA8IjBAAIAABQICzAAIAAA7IizAAIAABiIDHAAIAAA8g");
	this.shape_79.setTransform(19.25,29.35);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("EhY6AL4IAA3vMCx1AAAIAAXvg");
	this.shape_80.setTransform(414.606,90.4768,0.8199,1.3749);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-52,-14,943,209);


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
	this.shape.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape.setTransform(832.325,92.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhiBxQgXgVABghQAAgXAKgQQALgSASgHQATgKAkgHQAvgJATgIIAAgHQAAgTgLgJQgJgIgaAAQgTAAgKAHQgKAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjADAQQAEAQAJATIhEAAIgHgVIgCgIQgSARgUAJQgTAJgXgBQgoABgXgXgAgBAPQgdAHgIAFQgOAKAAAOQAAAPAKALQAMAKAQAAQARAAARgMQANgJAEgOQADgJAAgZIAAgNQgNAFgcAFg");
	this.shape_1.setTransform(805.2,92.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhdCSQghgkABhAQAAhCAeghQAggjAvAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgVALQgWALgVAAQgtAAgfgkgAgngQQgQASAAAmQAAAqALATQARAaAcABQAYgBARgTQARgVAAgnQgBgtgQgTQgQgTgZAAQgYAAgQATg");
	this.shape_2.setTransform(775.4,87.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgIIAAgHQABgTgLgJQgJgIgaAAQgTAAgJAHQgLAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAWAKAKARQAJARAAAsIgBBPQAAAjADAQQAEAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAJgWgBQgoABgXgXgAgBAPQgdAHgJAFQgNAKAAAOQAAAPAKALQALAKARAAQASAAAQgMQANgJAEgOQADgJgBgZIAAgNQgNAFgbAFg");
	this.shape_3.setTransform(746.85,92.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_4.setTransform(726.025,87.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_5.setTransform(704.9032,92.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAxCFIAAiFQAAgpgEgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAPQgFAQgBArIAAB2IhEAAIAAkDIBAAAIAAAmQAhgsAzAAQAXABATAHQATAJAJANQAKAMADAQQAEAQAAAfIAACgg");
	this.shape_6.setTransform(676,91.85);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_7.setTransform(645.475,92.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgLAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfACAGQABAEAEAEQAFADAHAAQAJAAATgGIAFA1QgXALgfgBQgTAAgNgFg");
	this.shape_8.setTransform(621.85,87.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhTCPQgggoAAhnQAAhlAjgsQAdglAzAAQA0AAAdAlQAjAsAABlQAABmgjAsQgdAlg0AAQgzAAgggogAgVh1QgKAIgFAVQgHAaAAA+QAAA/AGAYQAGAXAKAIQAKAIALAAQAMAAAKgIQAKgIAFgUQAHgbAAg/QAAg+gGgXQgGgYgKgIQgKgIgMAAQgLAAgKAIg");
	this.shape_9.setTransform(585.475,87.425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhTCPQgggoAAhnQAAhlAjgsQAdglAzAAQA0AAAdAlQAjAsAABlQAABmgjAsQgdAlg0AAQgzAAgggogAgVh1QgKAIgFAVQgHAaAAA+QAAA/AGAYQAGAXAKAIQAKAIALAAQAMAAAKgIQAKgIAFgUQAHgbAAg/QAAg+gGgXQgGgYgKgIQgKgIgMAAQgLAAgKAIg");
	this.shape_10.setTransform(557.675,87.425);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhTCPQgggoAAhnQAAhlAjgsQAdglAzAAQA0AAAdAlQAjAsAABlQAABmgjAsQgdAlg0AAQgzAAgggogAgVh1QgKAIgFAVQgHAaAAA+QAAA/AGAYQAGAXAKAIQAKAIALAAQAMAAAKgIQAKgIAFgUQAHgbAAg/QAAg+gGgXQgGgYgKgIQgKgIgMAAQgLAAgKAIg");
	this.shape_11.setTransform(529.875,87.425);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AghAiIAAhDIBDAAIAABDg");
	this.shape_12.setTransform(509.275,101.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhTCPQgggoAAhnQAAhlAjgsQAdglAzAAQA0AAAdAlQAjAsAABlQAABmgjAsQgdAlg0AAQgzAAgggogAgVh1QgKAIgFAVQgHAaAAA+QAAA/AGAYQAGAXAKAIQAKAIALAAQAMAAAKgIQAKgIAFgUQAHgbAAg/QAAg+gGgXQgGgYgKgIQgKgIgMAAQgLAAgKAIg");
	this.shape_13.setTransform(488.175,87.425);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhSCZQgfgbgHgsIBFgHQADAWAPAOQAOANASAAQAVABAPgSQAPgRAAgjQAAgigPgQQgOgPgYgBQgdABgYAZIg3gIIAji5IC0AAIAABAIiAAAIgKA8QAWgLAYAAQAtAAAfAhQAhAhgBA0QABAtgaAiQgjAvg9AAQgyAAgfgag");
	this.shape_14.setTransform(460.9,87.75);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AAKC0IAAkCQglAjgzARIAAg+QAbgJAggYQAegZAMghIA4AAIAAFng");
	this.shape_15.setTransform(430.675,87.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_16.setTransform(390.8532,92.15);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAggjAvAAQArAAAfAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASAAAmQAAAqALATQARAaAcABQAYgBARgTQAQgVAAgnQAAgtgQgTQgQgTgZAAQgYAAgQATg");
	this.shape_17.setTransform(361.3,87.5);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhiBxQgWgVAAghQAAgXAKgQQALgSASgHQATgKAkgHQAvgJATgIIAAgHQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAHgHATIg9gMQAKglAagTQAZgSAzAAQAsAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjADAQQAEAQAJATIhEAAIgGgVIgDgIQgSARgUAJQgTAJgXgBQgoABgXgXgAgBAPQgdAHgIAFQgOAKAAAOQAAAPALALQAKAKARAAQARAAASgMQAMgJAEgOQADgJAAgZIAAgNQgNAFgcAFg");
	this.shape_18.setTransform(318.85,92.15);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgRQgDgLAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfABAGQACAEAEAEQAFADAHAAQAKAAARgGIAGA1QgYALgegBQgTAAgNgFg");
	this.shape_19.setTransform(296.65,87.85);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_20.setTransform(273.725,92.15);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQAKgSATgHQATgKAkgHQAvgJATgIIAAgHQAAgTgKgJQgKgIgaAAQgTAAgJAHQgLAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQACAQAKATIhEAAIgGgVIgDgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPALALQALAKAQAAQASAAARgMQAMgJAEgOQACgJABgZIAAgNQgOAFgcAFg");
	this.shape_21.setTransform(246.6,92.15);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AAxCzIAAiJQAAgogDgLQgEgKgKgHQgKgHgPABQgQAAgOAIQgNAIgGAQQgGARgBAgIAACCIhEAAIAAllIBEAAIAACDQAigmAtAAQAYAAATAJQATAIAKAOQAJAOAEARQADAQAAAiIAACYg");
	this.shape_22.setTransform(217.45,87.2);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_23.setTransform(173.675,92.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgIIAAgHQABgTgLgJQgJgIgaAAQgTAAgJAHQgLAHgGATIg/gMQALglAZgTQAagSAzAAQAsAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjADAQQAEAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAJgWgBQgoABgXgXgAgBAPQgdAHgJAFQgNAKAAAOQAAAPAKALQALAKARAAQASAAAQgMQANgJAEgOQADgJgBgZIAAgNQgNAFgbAFg");
	this.shape_24.setTransform(146.55,92.15);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_25.setTransform(125.725,87.2);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhyIAAhAIBDAAIAABAg");
	this.shape_26.setTransform(111.825,87.2);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("Ah9C2IAAllIBAAAIAAAmQAMgTAVgNQAVgMAZAAQAuAAAfAkQAfAjABA/QAABAghAkQgfAkgtAAQgVAAgRgIQgSgJgTgVIAACDgAgphrQgRATAAAmQAAAsARAUQASAVAYAAQAYAAAPgTQARgTgBgrQAAgpgQgUQgQgUgYAAQgZAAgQAUg");
	this.shape_27.setTransform(90.3,96.775);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AAyCFIAAiFQAAgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAPQgGAQABArIAAB2IhFAAIAAkDIA/AAIAAAmQAjgsAyAAQAXABASAHQAUAJAJANQAKAMAEAQQADAQAAAfIAACgg");
	this.shape_28.setTransform(45.15,91.85);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_29.setTransform(15.7032,92.15);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQAKgRAUgIQASgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgJAHQgLAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAWAKAKARQAJARAAAsIgBBQQAAAhADARQAEAQAIATIhDAAIgHgVIgCgIQgSASgUAIQgTAJgWAAQgoAAgXgXgAgBAPQgdAGgIAHQgOAJAAAOQAAAPAKAKQAMALAQAAQARAAARgMQANgJAEgOQACgIAAgZIAAgOQgNAFgbAFg");
	this.shape_30.setTransform(944.05,34.3);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AhzCCIAAg2IBihuQAWgcAMgLIgfABIhbAAIAAg5IDVAAIAAAxIhjBxIgiAmIAjgCIBqAAIAAA9g");
	this.shape_31.setTransform(917.5,34.275);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_32.setTransform(898.225,29.35);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgMgKgIQgKgGgOAAQgQAAgPAJQgOAKgFAQQgGARAAAqIAAB2IhEAAIAAkDIBAAAIAAAmQAhgrAzAAQAXAAATAHQASAJAKANQAJAMAFAQQADARAAAdIAAChg");
	this.shape_33.setTransform(876,34);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_34.setTransform(846.5532,34.3);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhZCjQgbgXgBgjIAAgIIBPAJQACAOAHAGQAKAGATAAQAbAAAOgIQAJgFAEgLQAEgJAAgXIAAgmQgfAqguAAQg0AAgegsQgZgjAAgzQABhBAfgiQAggjAuAAQAvAAAfAqIAAgkIBAAAIAADoQABAtgIAXQgIAWgOANQgNANgXAIQgXAHgiAAQhBAAgcgWgAgnhxQgQATAAAoQAAAqAQARQAQAUAXgBQAZAAARgTQARgSAAgnQAAgogQgUQgRgUgaABQgXAAgQASg");
	this.shape_35.setTransform(817,39.25);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_36.setTransform(787.125,34.3);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AB6CFIAAiTQAAgngHgMQgJgOgVAAQgOAAgNAIQgMAKgGAQQgGARABAkIAAB9IhEAAIAAiOQAAglgDgLQgFgLgHgGQgIgFgNAAQgQAAgMAIQgNAJgFAQQgGAQAAAkIAAB/IhEAAIAAkDIA/AAIAAAjQAhgoAwAAQAYAAASAKQASAKAMAUQAQgUAVgKQATgKAWAAQAdgBAUAMQAUALAJAXQAIAQAAAmIAAClg");
	this.shape_37.setTransform(749.45,34);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_38.setTransform(712.125,34.3);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AAyCzIAAiJQAAgpgFgJQgDgLgKgHQgKgGgPAAQgQgBgNAJQgOAIgGAQQgHAQABAhIAACCIhFAAIAAllIBFAAIAACDQAhgmAtAAQAYAAATAJQATAJAKANQAJAOAEARQADAQAAAiIAACYg");
	this.shape_39.setTransform(681.55,29.35);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_40.setTransform(638.2032,34.3);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_41.setTransform(609.975,34.3);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AhuCyIgGg1QAQADANAAQAYAAAMgOQALgOAGgWIhikDIBJAAIA9C3IA8i3IBHAAIhbD4IgRAuQgJAWgIAMQgIAMgKAIQgKAHgQAEQgPAEgUAAQgUAAgTgEg");
	this.shape_42.setTransform(568.675,39.525);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQAKgRAUgIQASgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgJAHQgLAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhAEARQADAQAIATIhDAAIgHgVIgCgIQgSASgUAIQgTAJgWAAQgoAAgXgXgAgBAPQgdAGgJAHQgNAJAAAOQAAAPAKAKQALALARAAQASAAAQgMQANgJAEgOQADgIgBgZIAAgOQgNAFgbAFg");
	this.shape_43.setTransform(527.25,34.3);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARAAQAXAAAWAMIgVA8QgSgLgPAAQgOAAgKAIQgJAIgFAUQgHAVAABBIAABRg");
	this.shape_44.setTransform(505.55,34);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AhOB5QgUgLgKgVQgJgVAAgkIAAikIBEAAIAAB4QAAA1AFANQADAMAKAHQAKAHAPAAQARAAAOgJQAOgKAFgOQAFgOAAg3IAAhuIBFAAIAAEDIhAAAIAAgnQgOAVgXAMQgXAMgZAAQgaAAgVgMg");
	this.shape_45.setTransform(478.55,34.575);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgRQgDgMAAgkIAAhwIggAAIAAg3IAgAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfABAGQABAEAFAEQAFAEAHgBQAKABARgHIAGA1QgYALgeAAQgTgBgNgFg");
	this.shape_46.setTransform(455.05,30);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_47.setTransform(439.775,29.35);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARAAQAXAAAWAMIgVA8QgSgLgPAAQgOAAgKAIQgJAIgFAUQgHAVAABBIAABRg");
	this.shape_48.setTransform(425,34);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgMAAgkIAAhwIgfAAIAAg3IAfAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfACAGQAAAEAGAEQAEAEAHgBQAKABASgHIAGA1QgZALgeAAQgSgBgOgFg");
	this.shape_49.setTransform(405.05,30);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_50.setTransform(368.6532,34.3);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_51.setTransform(340.425,34.3);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_52.setTransform(306.375,29.35);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQAKgRAUgIQASgKAkgHQAvgJASgIIAAgHQABgTgLgJQgJgIgaAAQgSAAgKAHQgLAIgGASIg/gMQALgmAZgRQAagTAyABQAuAAAWALQAWAKAKARQAJARAAAsIgBBQQAAAhAEARQADAQAIATIhDAAIgGgVIgDgIQgSASgUAIQgTAJgWAAQgpAAgWgXgAgCAPQgcAGgJAHQgNAJAAAOQAAAPAKAKQALALARAAQASAAAQgMQANgJAEgOQADgIgBgZIAAgOQgMAFgdAFg");
	this.shape_53.setTransform(285.5,34.3);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_54.setTransform(264.675,29.35);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARAAQAXAAAWAMIgWA8QgQgLgPAAQgPAAgKAIQgJAIgGAUQgFAVgBBBIAABRg");
	this.shape_55.setTransform(249.9,34);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_56.setTransform(224.1032,34.3);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgRQgDgMAAgkIAAhwIggAAIAAg3IAgAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfABAGQACAEAEAEQAFAEAHgBQAKABARgHIAGA1QgYALgeAAQgTgBgNgFg");
	this.shape_57.setTransform(202.15,30);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AhiBxQgWgVAAgiQAAgWAKgQQAKgRATgIQATgKAkgHQAvgJATgIIAAgHQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAIgGASIg+gMQAKgmAagRQAZgTAyABQAuAAAWALQAXAKAJARQAJARAAAsIgBBQQAAAhAEARQACAQAKATIhEAAIgGgVIgDgIQgSASgUAIQgTAJgXAAQgoAAgXgXgAgCAPQgcAGgJAHQgNAJAAAOQAAAPALAKQAKALARAAQARAAASgMQAMgJAEgOQACgIABgZIAAgOQgOAFgcAFg");
	this.shape_58.setTransform(179.9,34.3);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AB6CFIAAiTQAAgngHgMQgJgOgVAAQgOAAgNAIQgMAKgGAQQgGARAAAkIAAB9IhDAAIAAiOQAAglgEgLQgEgLgHgGQgIgFgNAAQgQAAgMAIQgNAJgFAQQgGAQAAAkIAAB/IhFAAIAAkDIA/AAIAAAjQAjgoAuAAQAZAAASAKQASAKAMAUQAQgUAVgKQATgKAWAAQAdgBAUAMQAUALAKAXQAHAQAAAmIAAClg");
	this.shape_59.setTransform(143.65,34);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_60.setTransform(93.5032,34.3);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgRQgDgMAAgkIAAhwIgfAAIAAg3IAfAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfABAGQACAEAEAEQAFAEAHgBQAJABASgHIAGA1QgXALgfAAQgSgBgOgFg");
	this.shape_61.setTransform(71.55,30);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_62.setTransform(48.625,34.3);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AiHCzIAAllIEJAAIAAA8IjBAAIAABQICzAAIAAA7IizAAIAABiIDHAAIAAA8g");
	this.shape_63.setTransform(19.25,29.35);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("EhY6AL4IAA3vMCx1AAAIAAXvg");
	this.shape_64.setTransform(465.1328,62.025,0.9086,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-52,-14,1034.3,152.1);


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

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape.setTransform(846.175,92.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhiBxQgXgVABghQgBgXALgQQALgSASgHQATgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjADAQQADAQAKATIhEAAIgHgVIgCgIQgSARgUAJQgTAJgXgBQgnABgYgXgAgBAPQgdAHgIAFQgOAKAAAOQAAAPAKALQAMAKAQAAQARAAARgMQANgJAEgOQACgJAAgZIAAgNQgNAFgbAFg");
	this.shape_1.setTransform(819.05,92.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_2.setTransform(791.625,92.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhyIAAhAIBDAAIAABAg");
	this.shape_3.setTransform(770.425,87.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_4.setTransform(756.525,87.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhOB5QgVgLgJgVQgJgVAAgkIAAikIBFAAIAAB4QAAA1ADANQAEAMAKAHQAKAHAQAAQAQAAAOgJQAOgKAFgOQAFgOAAg3IAAhuIBFAAIAAEDIhAAAIAAgnQgOAVgXAMQgXAMgZAAQgaAAgVgMg");
	this.shape_5.setTransform(734.2,92.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhiCjQgXgWAAghQAAgWALgRQAKgRAUgJQASgJAkgIQAvgIASgIIAAgHQAAgTgKgIQgJgJgaABQgTAAgKAGQgKAIgHASIg+gMQALglAZgSQAagSAzAAQAsAAAXALQAWAKAKARQAJARAAAsIgBBQQAAAiADAQQAEARAIASIhDAAIgHgVIgCgIQgSASgUAIQgTAJgXAAQgnAAgYgWgAgBBBQgdAGgIAGQgOAJAAAPQAAAOAKALQAMALAQAAQARAAARgNQANgJAEgNQACgJAAgZIAAgOQgNAFgbAGgAgihvIAihJIBMAAIhDBJg");
	this.shape_6.setTransform(705.1,87.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARgBQAXAAAWAOIgVA7QgSgLgPAAQgOAAgKAIQgJAIgFAUQgHAWAABBIAABQg");
	this.shape_7.setTransform(683.4,91.85);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhCAeghQAfgjAwAAQArAAAfAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASgBAmQAAAqAMATQAQAaAeABQAXgBAQgTQASgVgBgnQAAgtgQgTQgQgTgZAAQgYAAgQATg");
	this.shape_8.setTransform(655.85,87.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhyIAAhAIBDAAIAABAg");
	this.shape_9.setTransform(634.275,87.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AAyCzIAAiJQgBgogEgLQgDgKgKgHQgKgHgPABQgQAAgOAIQgNAIgGAQQgHARABAgIAACCIhFAAIAAllIBFAAIAACDQAhgmAtAAQAYAAATAJQATAIAJAOQAKAOAEARQADAQAAAiIAACYg");
	this.shape_10.setTransform(612.05,87.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_11.setTransform(568.275,92.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhiBxQgWgVAAghQAAgXAKgQQALgSASgHQATgKAkgHQAvgJATgIIAAgHQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAHgHATIg9gMQAKglAagTQAZgSAyAAQAtAAAXAMQAXAKAJARQAJARAAAsIgBBPQAAAjADAQQAEAQAJATIhEAAIgGgVIgDgIQgSARgUAJQgTAJgXgBQgoABgXgXgAgCAPQgcAHgIAFQgOAKAAAOQAAAPALALQAKAKARAAQARAAASgMQAMgJAEgOQADgJAAgZIAAgNQgNAFgdAFg");
	this.shape_12.setTransform(541.15,92.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_13.setTransform(520.325,87.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgIIAAgHQAAgTgKgJQgJgIgaAAQgTAAgKAHQgKAHgHATIg+gMQALglAZgTQAagSAzAAQAsAAAXAMQAWAKAKARQAJARAAAsIgBBPQAAAjADAQQAEAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAJgXgBQgnABgXgXgAgBAPQgdAHgIAFQgOAKAAAOQAAAPAKALQAMAKAQAAQARAAARgMQANgJAEgOQACgJAAgZIAAgNQgNAFgbAFg");
	this.shape_14.setTransform(499.45,92.15);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("Ah9C2IAAllIBAAAIAAAmQAMgTAVgNQAWgMAYAAQAuAAAfAkQAfAjABA/QAABAghAkQgfAkgtAAQgVAAgRgIQgSgJgTgVIAACDgAgphrQgRATAAAmQAAAsARAUQASAVAYAAQAYAAAPgTQARgTgBgrQAAgpgQgUQgQgUgYAAQgZAAgQAUg");
	this.shape_15.setTransform(471,96.775);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AAyCFIAAiFQAAgpgFgMQgEgNgKgGQgKgHgOAAQgRAAgOAJQgOALgFAPQgGAQABArIAAB2IhFAAIAAkDIA/AAIAAAmQAjgsAyAAQAXABASAHQAUAJAJANQAKAMAEAQQADAQAAAfIAACgg");
	this.shape_16.setTransform(425.85,91.85);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_17.setTransform(395.325,92.15);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_18.setTransform(366.475,92.15);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_19.setTransform(323.075,92.15);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgLAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfACAGQABAEAEAEQAFADAHAAQAJAAATgGIAFA1QgYALgegBQgTAAgNgFg");
	this.shape_20.setTransform(299.45,87.85);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARgBQAXAAAWAOIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAUQgFAWAABBIAABQg");
	this.shape_21.setTransform(283.3,91.85);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_22.setTransform(257.5032,92.15);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhyIAAhAIBDAAIAABAg");
	this.shape_23.setTransform(236.925,87.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgYCrQgWgMgQgVIAAAmIg/AAIAAllIBEAAIAACBQAggkArAAQAuAAAfAjQAgAhAABAQgBBCgfAkQggAkgtAAQgVAAgVgLgAgpgQQgRARAAAnQABApANAUQARAbAdAAQAXgBAPgSQAQgUAAgqQABgsgRgTQgQgTgYAAQgZgBgQAUg");
	this.shape_24.setTransform(215.3,87.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQALgSATgHQASgKAkgHQAvgJASgIIAAgHQABgTgKgJQgKgIgaAAQgTAAgJAHQgLAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQACAQAJATIhDAAIgGgVIgDgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPALALQALAKAQAAQASAAARgMQAMgJAEgOQACgJAAgZIAAgNQgNAFgcAFg");
	this.shape_25.setTransform(185.5,92.15);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_26.setTransform(142.475,92.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_27.setTransform(120.225,87.2);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_28.setTransform(99.1032,92.15);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhyIAAhAIBDAAIAABAg");
	this.shape_29.setTransform(78.525,87.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigjA5gBQAwABAcAUQAcAUAMAqIhEAMQgDgUgMgLQgNgJgTgBQgYAAgQASQgPARAAAqQAAAuAQASQAPAUAZgBQAUABAMgMQANgLAFgbIBDALQgKAvgeAYQgeAYgygBQg4AAgigkg");
	this.shape_30.setTransform(58.025,92.15);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQAKgSAUgHQASgKAkgHQAvgJASgIIAAgHQABgTgLgJQgJgIgaAAQgSAAgKAHQgLAHgGATIg/gMQALglAZgTQAagSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQADAQAIATIhDAAIgHgVIgCgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPAKALQALAKARAAQASAAAQgMQANgJAEgOQADgJgBgZIAAgNQgMAFgdAFg");
	this.shape_31.setTransform(15.95,92.15);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhiBxQgWgVAAgiQAAgWAKgQQALgRASgIQATgKAkgHQAvgJATgIIAAgHQAAgTgLgJQgJgIgaAAQgSAAgLAHQgKAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhADARQAEAQAJATIhEAAIgHgVIgCgIQgSASgUAIQgTAJgXAAQgoAAgXgXgAgBAPQgdAGgIAHQgOAJAAAOQAAAPAKAKQAMALAQAAQARAAARgMQANgJAEgOQADgIAAgZIAAgOQgNAFgcAFg");
	this.shape_32.setTransform(916.35,34.3);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgxC2IAAkCIBDAAIAAECgAg2hsIAhhJIBMAAIhCBJg");
	this.shape_33.setTransform(897.125,29.05);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARAAQAXAAAWAMIgVA8QgSgLgPAAQgOAAgKAIQgJAIgFAUQgHAVABBBIAABRg");
	this.shape_34.setTransform(880.75,34);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_35.setTransform(854.9532,34.3);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgMgKgIQgKgGgOAAQgQAAgPAJQgOAKgFAQQgGARAAAqIAAB2IhEAAIAAkDIBAAAIAAAmQAhgrAzAAQAXAAATAHQASAJAKANQAJAMAFAQQADARAAAdIAAChg");
	this.shape_36.setTransform(826.05,34);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_37.setTransform(803.825,29.35);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AB6CFIAAiTQAAgngHgMQgJgOgUAAQgPAAgMAIQgNAKgGAQQgFARAAAkIAAB9IhEAAIAAiOQAAglgDgLQgEgLgIgGQgHgFgOAAQgQAAgNAIQgMAJgGAQQgFAQAAAkIAAB/IhEAAIAAkDIA/AAIAAAjQAhgoAwAAQAYAAATAKQARAKALAUQASgUATgKQAUgKAXAAQAcgBAUAMQAUALAJAXQAIAQgBAmIAAClg");
	this.shape_38.setTransform(774.5,34);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_39.setTransform(724.3532,34.3);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AheCSQgfgkgBhAQABhCAfghQAfgjAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgWALQgVALgVAAQgtAAgggkgAgngQQgRASAAAmQAAArAMASQAQAbAegBQAXAAAQgTQARgVAAgoQAAgsgQgTQgQgUgZABQgYgBgQAUg");
	this.shape_40.setTransform(694.8,29.65);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhQByQgfgVgJglIBFgLQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAgiAbgXQAbgXA4ABQA0AAAaAQQAaASAJAiIhAAMQgEgPgMgIQgMgJgUAAQgbABgMAHQgIAGAAAIQAAAHAHAGQAJAHA2AMQA3AMAWASQAVASAAAgQAAAkgeAaQgdAag7AAQg0gBgfgVg");
	this.shape_41.setTransform(651.675,34.3);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AhfCMQgZgiAAg3QAAg/AhglQAigkA0AAQA4AAAiAmQAhAngBBNIirAAQABAeAQASQAPAQAXAAQAQABALgJQALgJAGgUIBEAMQgNAmgcATQgdAUgrAAQhCAAghgtgAgigQQgPAQAAAbIBmAAQgBgdgPgPQgOgPgVAAQgWgBgOARgAgihvIAihJIBMAAIhDBJg");
	this.shape_42.setTransform(624.3032,29.35);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgdCCIhpkDIBIAAIAxCEIANAsIAIgWIAHgWIAxiEIBHAAIhnEDg");
	this.shape_43.setTransform(596.525,34.275);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhiBxQgXgVABgiQAAgWAKgQQALgRASgIQATgKAkgHQAvgJATgIIAAgHQAAgTgLgJQgJgIgaAAQgTAAgKAHQgKAIgHASIg+gMQALgmAZgRQAagTAzABQAsAAAXALQAXAKAJARQAJARAAAsIgBBQQAAAhADARQAEAQAJATIhEAAIgHgVIgCgIQgSASgUAIQgTAJgXAAQgoAAgXgXgAgBAPQgdAGgIAHQgOAJAAAOQAAAPAKAKQAMALAQAAQARAAARgMQANgJAEgOQADgIAAgZIAAgOQgNAFgcAFg");
	this.shape_44.setTransform(568.95,34.3);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARAAQAXAAAWAMIgVA8QgRgLgQAAQgOAAgKAIQgJAIgGAUQgFAVgBBBIAABRg");
	this.shape_45.setTransform(547.25,34);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgRQgDgMAAgkIAAhwIgfAAIAAg3IAfAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfABAGQABAEAGAEQAEAEAHgBQAJABASgHIAHA1QgYALgfAAQgSgBgOgFg");
	this.shape_46.setTransform(527.3,30);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQAKgRAUgIQASgKAkgHQAvgJASgIIAAgHQABgTgKgJQgKgIgaAAQgSAAgKAHQgLAIgGASIg/gMQALgmAZgRQAagTAyABQAuAAAWALQAWAKAKARQAJARAAAsIgBBQQAAAhAEARQADAQAIATIhDAAIgHgVIgCgIQgSASgUAIQgTAJgWAAQgpAAgWgXgAgCAPQgcAGgJAHQgNAJAAAOQAAAPAKAKQALALARAAQASAAAQgMQANgJAEgOQADgIgBgZIAAgOQgMAFgdAFg");
	this.shape_47.setTransform(491.15,34.3);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AgkAuQAVgHAIgMQAIgMABgUIghAAIAAhEIBEAAIAAAxQAAAdgFARQgFARgOAOQgOANgWAIg");
	this.shape_48.setTransform(455.975,47.825);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_49.setTransform(442.525,29.35);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AhhBxQgYgVABgiQAAgWAKgQQAKgRATgIQATgKAkgHQAvgJATgIIAAgHQAAgTgKgJQgKgIgaAAQgTAAgJAHQgLAIgGASIg+gMQAKgmAagRQAZgTAyABQAuAAAWALQAWAKAKARQAJARAAAsIgBBQQAAAhAEARQACAQAJATIhDAAIgGgVIgDgIQgSASgUAIQgTAJgWAAQgpAAgWgXgAgCAPQgcAGgJAHQgNAJAAAOQAAAPALAKQALALAQAAQASAAARgMQAMgJAEgOQACgIABgZIAAgOQgOAFgcAFg");
	this.shape_50.setTransform(421.65,34.3);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARAAQAXAAAWAMIgWA8QgQgLgPAAQgPAAgKAIQgJAIgGAUQgFAVAABBIAABRg");
	this.shape_51.setTransform(399.95,34);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_52.setTransform(374.1532,34.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AAxCFIAAiFQAAgpgEgMQgEgMgKgIQgKgGgOAAQgQAAgPAJQgOAKgFAQQgFARgBAqIAAB2IhEAAIAAkDIBAAAIAAAmQAhgrAzAAQAXAAATAHQATAJAJANQAKAMADAQQAEARAAAdIAAChg");
	this.shape_53.setTransform(345.25,34);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AghCzIAAkCIBDAAIAAECgAghhyIAAhAIBDAAIAABAg");
	this.shape_54.setTransform(323.025,29.35);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AB6CFIAAiTQAAgngHgMQgKgOgUAAQgOAAgNAIQgMAKgGAQQgGARABAkIAAB9IhEAAIAAiOQAAglgDgLQgFgLgHgGQgIgFgNAAQgQAAgMAIQgNAJgFAQQgGAQAAAkIAAB/IhEAAIAAkDIA/AAIAAAjQAhgoAwAAQAYAAASAKQASAKAMAUQAQgUAVgKQATgKAXAAQAcgBAUAMQAUALAJAXQAIAQAAAmIAAClg");
	this.shape_55.setTransform(293.7,34);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_56.setTransform(250.775,29.35);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0ABQA4AAAiAmQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgJQALgJAGgTIBEALQgNAmgcAUQgdATgrABQhCAAghgtgAgihCQgPARAAAbIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_57.setTransform(229.6532,34.3);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARAAQAXAAAWAMIgWA8QgQgLgPAAQgPAAgKAIQgJAIgGAUQgFAVAABBIAABRg");
	this.shape_58.setTransform(194.3,34);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AhhBxQgYgVAAgiQAAgWALgQQAKgRATgIQATgKAkgHQAvgJATgIIAAgHQAAgTgKgJQgKgIgaAAQgTAAgJAHQgLAIgGASIg+gMQAKgmAagRQAZgTAyABQAuAAAWALQAWAKAKARQAJARAAAsIgBBQQAAAhAEARQACAQAJATIhDAAIgGgVIgDgIQgSASgUAIQgTAJgWAAQgpAAgWgXgAgCAPQgcAGgJAHQgNAJAAAOQAAAPALAKQALALAQAAQASAAARgMQAMgJAEgOQACgIABgZIAAgOQgOAFgcAFg");
	this.shape_59.setTransform(168.75,34.3);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgMAAgkIAAhwIggAAIAAg3IAgAAIAAg0IBEgoIAABcIAvAAIAAA3IgvAAIAABoQAAAfACAGQABAEAEAEQAFAEAHgBQAJABATgHIAFA1QgXALgfAAQgTgBgNgFg");
	this.shape_60.setTransform(146.55,30);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7AAAlAmQAmAmAAA6QAAA6gmAnQgmAng6AAQgiAAghgRgAgsg6QgSAUAAAmQAAAmASAVQASAUAaAAQAbAAASgUQASgVAAgmQAAgmgSgUQgSgVgbABQgagBgSAVg");
	this.shape_61.setTransform(122.975,34.3);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_62.setTransform(100.725,29.35);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("Ah+C2IAAllIBBAAIAAAmQAMgTAVgNQAVgMAZAAQAtAAAgAkQAgAjAAA/QgBBAgfAkQggAkguAAQgUAAgRgIQgSgJgTgVIAACDgAgphrQgRATAAAmQABAsARAUQARAVAYAAQAYAAAQgTQAPgTABgrQAAgpgRgUQgQgUgYAAQgYAAgRAUg");
	this.shape_63.setTransform(79.2,38.925);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AAzCCIg0hRIg1BRIhQAAIBdiFIhZh+IBTAAIAuBIIAwhIIBQAAIhYB7IBgCIg");
	this.shape_64.setTransform(49.175,34.275);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AiHCzIAAllIEJAAIAAA8IjBAAIAABQICzAAIAAA7IizAAIAABiIDHAAIAAA8g");
	this.shape_65.setTransform(19.25,29.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,956.3,117.7);


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
	this.shape.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOAKQANALAXAAQAbAAANgKQAJgHAAgMQAAgHgFgFQgFgFgSgEQhSgTgWgPQgfgTAAgmQAAghAbgYQAbgWA4AAQA0AAAaARQAaARAJAiIhAAMQgEgPgMgJQgMgHgUgBQgbAAgMAIQgIAGAAAIQAAAIAHAEQAJAIA2AMQA3AMAWATQAVARAAAgQAAAkgeAZQgdAag7AAQg0ABgfgWg");
	this.shape.setTransform(1190.775,212.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhiByQgXgWAAgiQAAgVALgSQAKgQAUgJQASgJAkgHQAvgJASgHIAAgHQAAgVgKgHQgJgJgaAAQgTAAgKAHQgKAIgHARIg+gLQALgmAZgRQAagSAzAAQAsgBAXALQAWALAKARQAJARAAAsIgBBQQAAAhADARQAEAQAIASIhDAAIgHgUIgCgIQgSARgUAJQgTAIgXAAQgnAAgYgVgAgBAQQgdAGgJAGQgNAJAAAPQAAAOAKAKQAMALAQAAQARAAARgMQANgKAEgNQADgIgBgaIAAgNQgNAEgbAHg");
	this.shape_1.setTransform(1163.65,212.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AheCSQgfgkAAhBQAAhBAegiQAggiAvAAQAqAAAgAkIAAiBIBFAAIAAFlIhAAAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgRASAAAnQAAAqAMASQAQAaAeAAQAXABAQgVQASgTgBgoQAAgugQgSQgQgUgZAAQgXAAgRAUg");
	this.shape_2.setTransform(1133.85,208.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhhByQgYgWAAgiQAAgVALgSQALgQATgJQASgJAkgHQAvgJASgHIAAgHQABgVgKgHQgKgJgaAAQgTAAgJAHQgLAIgGARIg+gLQAKgmAagRQAZgSAyAAQAugBAWALQAWALAKARQAJARAAAsIgBBQQAAAhAEARQACAQAJASIhDAAIgGgUIgDgIQgSARgUAJQgTAIgWAAQgpAAgWgVgAgCAQQgcAGgJAGQgNAJAAAPQAAAOALAKQALALAQAAQASAAARgMQAMgKAEgNQACgIAAgaIAAgNQgNAEgcAHg");
	this.shape_3.setTransform(1105.3,212.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AghCzIAAllIBDAAIAAFlg");
	this.shape_4.setTransform(1084.475,207.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAigkA0AAQA4gBAiAmQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgJQALgIAGgUIBEALQgNAmgcAUQgdAUgrgBQhCAAghgsgAgihCQgPAQAAAcIBmAAQgBgdgPgQQgOgPgVAAQgWAAgOAQg");
	this.shape_5.setTransform(1063.3532,212.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAyCEIAAiEQgBgpgEgMQgEgMgKgIQgKgGgOAAQgRAAgOAKQgOAJgFARQgFAQAAAqIAAB1IhFAAIAAkCIA/AAIAAAnQAjgsAyAAQAXgBASAJQATAHAKANQAKANADAQQAEAQAAAeIAACgg");
	this.shape_6.setTransform(1034.45,212.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgQAlAAQA7gBAlAmQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAmASAVQASAVAaAAQAbAAASgVQASgVAAgmQAAgmgSgUQgSgVgbAAQgaAAgSAVg");
	this.shape_7.setTransform(1003.925,212.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgKCsQgPgGgHgKQgHgKgDgQQgCgNAAgkIAAhwIggAAIAAg3IAgAAIAAgzIBEgpIAABcIAvAAIAAA3IgvAAIAABnQAAAgACAFQABAGAEADQAFAEAHAAQAJAAATgHIAFA1QgYAKgeAAQgTABgNgHg");
	this.shape_8.setTransform(980.3,208.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhTCPQgggoAAhnQAAhlAjgsQAdglAzAAQA0AAAdAlQAjAsAABlQAABmgjAsQgdAlg0AAQgzAAgggogAgVh1QgKAIgFAVQgHAaAAA+QAAA/AGAYQAGAXAKAIQAKAIALAAQAMAAAKgIQAKgIAFgUQAHgbAAg/QAAg+gGgXQgGgYgKgIQgKgIgMAAQgLAAgKAIg");
	this.shape_9.setTransform(943.925,208.075);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhTCPQgggoAAhnQAAhlAjgsQAdglAzAAQA0AAAdAlQAjAsAABlQAABmgjAsQgdAlg0AAQgzAAgggogAgVh1QgKAIgFAVQgHAaAAA+QAAA/AGAYQAGAXAKAIQAKAIALAAQAMAAAKgIQAKgIAFgUQAHgbAAg/QAAg+gGgXQgGgYgKgIQgKgIgMAAQgLAAgKAIg");
	this.shape_10.setTransform(916.125,208.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAKC0IAAkCQglAjgzARIAAg+QAbgJAggYQAegZAMghIA4AAIAAFng");
	this.shape_11.setTransform(886.425,207.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhDCpQgggRgRgfQgRgfAAgtQAAgiARgeQARghAfgRQAfgQAlAAQA7AAAlAmQAmAnAAA4QAAA8gmAmQgmAng6AAQgiAAghgQgAgsgIQgSATAAAmQAAAnASAUQASAVAaAAQAbAAASgVQASgUAAgnQAAgmgSgTQgSgVgbAAQgaAAgSAVgAgihvIAihJIBMAAIhDBJg");
	this.shape_12.setTransform(845.525,207.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhSCZQgfgagHguIBFgGQADAWAPAOQAOANASAAQAVAAAPgRQAPgRAAgkQAAgggPgQQgOgQgYgBQgdAAgYAaIg3gIIAji6IC0AAIAABAIiAAAIgKA9QAWgLAYAAQAtAAAfAhQAhAhgBA0QAAAsgZAjQgjAwg9gBQgyABgfgbg");
	this.shape_13.setTransform(1189,150.55);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhSCZQgfgagHguIBFgGQADAWAPAOQAOANATAAQAUAAAPgRQAPgRAAgkQAAgggPgQQgPgQgXgBQgdAAgYAaIg3gIIAji6IC0AAIAABAIiAAAIgKA9QAWgLAXAAQAuAAAgAhQAfAhAAA0QABAsgaAjQgjAwg9gBQgyABgfgbg");
	this.shape_14.setTransform(1161.2,150.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_15.setTransform(1118.9532,154.95);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AheCSQgfgkAAhAQAAhBAegjQAggiAvAAQAqAAAgAkIAAiBIBEAAIAAFlIg/AAIAAgmQgQAWgVALQgWALgVAAQgtAAgggkgAgngQQgQASAAAmQAAArALASQARAbAcAAQAYAAARgVQAQgTAAgoQAAgugQgSQgQgTgZgBQgYABgQATg");
	this.shape_16.setTransform(1089.4,150.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhQByQgfgVgJgmIBFgKQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgQQgfgTAAgmQAAgiAbgWQAbgYA4AAQA0ABAaAQQAaASAJAiIhAAMQgEgPgMgJQgMgHgUAAQgbgBgMAIQgIAFAAAJQAAAIAHAEQAJAIA2AMQA3ANAWASQAVAQAAAiQAAAjgeAZQgdAag7AAQg0ABgfgWg");
	this.shape_17.setTransform(1046.275,154.95);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAhAAhgkQAiglA0AAQA4ABAiAlQAhAngBBNIirAAQABAfAQARQAPARAXAAQAQAAALgIQALgKAGgTIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPAQAAAdIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_18.setTransform(1018.9032,154.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AAyCFIAAiFQgBgpgEgMQgEgNgKgGQgKgHgOAAQgRAAgOAJQgOALgFAQQgFAQgBAqIAAB2IhEAAIAAkDIA/AAIAAAnQAjgsAygBQAXAAATAIQATAJAJAMQAKANADAQQAEAQAAAfIAACgg");
	this.shape_19.setTransform(990,154.65);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7ABAlAlQAmAnAAA6QAAA6gmAnQgmAmg6AAQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbgBQgaABgSAUg");
	this.shape_20.setTransform(959.475,154.95);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AghCzIAAkDIBDAAIAAEDgAghhzIAAg/IBDAAIAAA/g");
	this.shape_21.setTransform(937.225,150);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AB6CFIAAiUQAAgngHgKQgKgPgTAAQgPAAgMAJQgNAJgGARQgFARgBAjIAAB9IhDAAIAAiNQAAgngEgLQgDgKgIgGQgHgFgOAAQgQAAgNAJQgMAIgGAQQgFAQAAAlIAAB+IhFAAIAAkDIA/AAIAAAkQAjgpAugBQAZAAATAKQARALALAVQARgVAUgLQAUgKAXAAQAcAAAUAMQAUAMAKAWQAGAQAAAlIAACmg");
	this.shape_22.setTransform(907.9,154.65);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhiByQgWgWAAghQAAgWAKgSQALgQASgJQATgJAkgHQAvgJATgHIAAgHQgBgVgJgHQgKgJgaAAQgSAAgLAHQgKAHgHATIg9gMQAKgmAagSQAZgRAygBQAtABAXAKQAXALAJARQAJAQAAAtIgBBPQAAAjADAQQAEAQAJATIhEAAIgGgVIgDgIQgSARgUAJQgTAIgXAAQgoAAgXgVgAgCAQQgcAFgIAGQgOAKAAAPQAAAOALALQAKAKARAAQARAAASgMQAMgKAEgNQADgIAAgaIAAgNQgNAFgdAGg");
	this.shape_23.setTransform(871.9,154.95);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhYBjQghgjAAhAQAAg/AhgkQAigkA5AAQAwAAAcAVQAcAUAMAqIhEAMQgDgUgMgLQgNgKgTAAQgYAAgQASQgPARAAAqQAAAtAQAUQAPASAZAAQAUABAMgLQANgMAFgbIBDAMQgKAugeAYQgeAXgyAAQg4ABgiglg");
	this.shape_24.setTransform(844.475,154.95);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AAyCFIAAiFQgBgpgEgMQgEgNgKgGQgKgHgOAAQgRAAgOAJQgOALgFAPQgGAQABArIAAB2IhFAAIAAkDIA/AAIAAAmQAigsAzAAQAXABASAHQATAJAKANQAKAMADAQQAEAQAAAfIAACgg");
	this.shape_25.setTransform(1209.5,96.8);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_26.setTransform(1180.0532,97.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhhBxQgYgVAAghQAAgXALgQQAKgSATgHQATgKAkgHQAvgJASgHIAAgIQABgTgKgJQgKgIgaAAQgTAAgJAHQgLAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAWAKAKARQAJARAAAsIgBBPQAAAjAEAQQACAQAJATIhDAAIgGgVIgDgIQgSARgUAJQgTAJgWgBQgpABgWgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPALALQALAKAQAAQASAAARgMQAMgJAEgOQACgJAAgZIAAgNQgNAFgcAFg");
	this.shape_27.setTransform(1138.6,97.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgDgRQgCgLAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfACAGQABAEAEAEQAFADAHAAQAJAAATgGIAFA1QgXALgfgBQgSAAgOgFg");
	this.shape_28.setTransform(1116.4,92.8);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhTCFIAAkDIA/AAIAAAlQARgaAMgJQANgHARgBQAXAAAWAOIgWA7QgRgLgOAAQgPAAgKAIQgJAIgGAUQgFAWAABBIAABQg");
	this.shape_29.setTransform(1100.25,96.8);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhDB3QgggQgRgfQgRgfAAgsQAAgiARggQARggAfgRQAfgRAlAAQA7AAAlAnQAmAmAAA6QAAA6gmAnQgmAng6gBQgiAAghgQgAgsg6QgSAVAAAlQAAAnASAUQASAVAagBQAbABASgVQASgUAAgnQAAglgSgVQgSgUgbAAQgaAAgSAUg");
	this.shape_30.setTransform(1073.375,97.1);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("Ah9C2IAAllIA/AAIAAAmQANgTAVgNQAWgMAYAAQAuAAAfAkQAfAjABA/QAABAghAkQgfAkgtAAQgVAAgRgIQgSgJgTgVIAACDgAgphrQgRATAAAmQAAAsARAUQASAVAYAAQAYAAAPgTQARgTgBgrQAAgpgQgUQgQgUgYAAQgZAAgQAUg");
	this.shape_31.setTransform(1043.5,101.725);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhQByQgfgWgJgkIBFgLQAEAUAOALQANAKAXAAQAbAAANgKQAJgHAAgLQAAgIgFgFQgFgFgSgEQhSgSgWgPQgfgVAAglQAAghAbgXQAbgYA4AAQA0AAAaARQAaASAJAiIhAAMQgEgPgMgIQgMgJgUABQgbAAgMAHQgIAGAAAIQAAAHAHAGQAJAGA2ANQA3ANAWARQAVARAAAiQAAAjgeAaQgdAZg7AAQg0AAgfgVg");
	this.shape_32.setTransform(1012.925,97.1);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AAxCFIAAiFQABgpgFgMQgEgNgKgGQgKgHgOAAQgQAAgPAJQgOALgFAPQgGAQAAArIAAB2IhEAAIAAkDIBAAAIAAAmQAhgsAzAAQAXABATAHQASAJAKANQAJAMAFAQQADAQAAAfIAACgg");
	this.shape_33.setTransform(984.45,96.8);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhiBxQgWgVAAghQAAgXAKgQQAKgSATgHQATgKAkgHQAvgJATgHIAAgIQgBgTgJgJQgKgIgaAAQgSAAgLAHQgKAHgGATIg+gMQAKglAagTQAZgSAyAAQAuAAAWAMQAXAKAJARQAJARAAAsIgBBPQAAAjAEAQQACAQAKATIhEAAIgGgVIgDgIQgSARgUAJQgTAJgXgBQgoABgXgXgAgCAPQgcAHgJAFQgNAKAAAOQAAAPALALQAKAKARAAQARAAASgMQAMgJAEgOQACgJABgZIAAgNQgOAFgcAFg");
	this.shape_34.setTransform(955.25,97.1);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhTCFIAAkDIBAAAIAAAlQAQgaAMgJQANgHARgBQAXAAAWAOIgWA7QgQgLgPAAQgPAAgKAIQgJAIgGAUQgFAWAABBIAABQg");
	this.shape_35.setTransform(933.55,96.8);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgKCtQgPgHgHgKQgHgKgCgRQgDgLAAglIAAhwIggAAIAAg3IAgAAIAAg0IBEgnIAABbIAvAAIAAA3IgvAAIAABoQAAAfABAGQACAEAEAEQAFADAHAAQAKAAARgGIAGA1QgYALgegBQgTAAgNgFg");
	this.shape_36.setTransform(913.6,92.8);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AhfBbQgZgjAAg2QAAg/AhglQAiglA0AAQA4AAAiAnQAhAmgBBOIirAAQABAeAQARQAPARAXAAQAQAAALgIQALgJAGgUIBEAMQgNAlgcAUQgdATgrAAQhCAAghgsgAgihCQgPARAAAcIBmAAQgBgegPgPQgOgQgVAAQgWAAgOAQg");
	this.shape_37.setTransform(877.2032,97.1);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhlCaQglgggGg8IBGgHQAGAkAUAQQATARAgAAQAjAAARgPQATgOgBgUQAAgNgHgJQgIgJgSgGQgNgFgsgLQg6gOgYgUQgggegBgqQAAgcAQgXQAPgYAegNQAdgMApAAQBDAAAhAdQAjAeABAxIhIADQgFgbgOgMQgQgMgdAAQggAAgSAMQgMAJAAAOQAAAMALAJQAOAMA0AMQA0ANAaANQAZANAPAXQAOAXgBAiQABAegSAbQgQAbggANQgfANgvAAQhDAAgkgfg");
	this.shape_38.setTransform(846.5,92.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Capa_1
	this.instance = new lib.f2();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1280,725);


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
	this.shape_29.graphics.lf(["#B983A5","#835873"],[0,1],7.7,-9.2,32.3,65.7).s().p("APkJ2QADjnhgjRQiTlAkyiuQk4ixliAoQlnApkFD2Qj9Dtg+FVIgMgBQAYiPA5iHQBtj/DaiqQEjjkFxgWIAAhiIAsABQFhAWEnDDQEgC+CbE1QB/EAgEEdg");
	this.shape_29.setTransform(125.8933,202.3975,1.08,1.08,180);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.lf(["#B983A5","#835873"],[0,1],7.7,-9.2,32.3,65.7).s().p("APkJ2QADjnhgjRQiTlAkyiuQk4ixliAoQlnApkFD2Qj9Dtg+FVIgMgBQAYiPA5iHQBtj/DaiqQEjjkFxgWIAAhiIAsABQFhAWEnDDQEgC+CbE1QB/EAgEEdg");
	this.shape_30.setTransform(143.65,67.9,1.08,1.08,0,0,0,0.3,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_18}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,269,270.4);


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
	this.shape_34.graphics.lf(["#EAB0A6","#C76E5F"],[0,1],7.4,-9.2,32.1,65.7).s().p("APkJ2QADjnhgjRQiTlAkyiuQk4ixliAoQlnApkFD2Qj9Dtg+FVIgMgBQAYiPA5iHQBtj/DaiqQEjjkFxgWIAAhiIAsABQFhAWEnDDQEgC+CbE1QB/EAgEEdg");
	this.shape_34.setTransform(125.9,203.95,1.08,1.08,180,0,0,-0.3,-0.1);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.lf(["#EAB0A6","#C76E5F"],[0,1],7.4,-9.2,32.1,65.7).s().p("APkJ2QADjnhgjRQiTlAkyiuQk4ixliAoQlnApkFD2Qj9Dtg+FVIgMgBQAYiPA5iHQBtj/DaiqQEjjkFxgWIAAhiIAsABQFhAWEnDDQEgC+CbE1QB/EAgEEdg");
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
	this.shape_21.graphics.lf(["#9F948F","#605956"],[0,1],30.8,-30,55.4,44.9).s().p("AA0J0QlhgWknjDQkgi+iak1QiAkAAEkdICnAAQgDDnBgDRQCTFAEzCuQE3CxFigoQFngpEGj2QD8jtA+lWIAMACQgYCPg5CHQhtD/jaCqQkjDklxAWIAABiIgsgBg");
	this.shape_21.setTransform(125.6,202.15,1.08,1.08,0,0,0,0,-0.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.lf(["#9F948F","#605956"],[0,1],7.4,-9.2,32.1,65.7).s().p("APkJ2QADjnhgjRQiTlAkziuQk3ixliAoQlnApkGD2Qj8Dtg+FVIgMgBQAYiPA5iHQBtj/DaiqQEjjkFxgWIAAhiIAsABQFhAWEnDDQEgC+CaE1QCAEAgEEdg");
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
	this.shape_23.graphics.lf(["#DEAE81","#B46C29"],[0,1],25.1,-25,62.4,44.4).s().p("AA0JzQlhgVknjDQkgi+ibk1Qh/kAAEkcICnAAQgDDmBgDSQCTE/EyCvQE4CwFigoQFngoEFj3QD9jtA+lVIAMABQgYCQg5CGQhtD/jaCqQkjDjlxAYIAABiIgsgDg");
	this.shape_23.setTransform(125.65,202.2,1.08,1.08,0,0,0,0.2,-0.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.lf(["#DEAE81","#B46C29"],[0,1],7.7,-9.2,32.3,65.7).s().p("APkJ1QADjmhgjSQiTk/kyivQk4iwliAoQlnAokFD3Qj9Dtg+FWIgMgCQAYiQA5iFQBtkADaiqQEjjjFxgYIAAhiIAsADQFhAUEnDEQEgC+CbE1QB/EAgEEcg");
	this.shape_24.setTransform(143.4065,67.9707,1.08,1.08);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_12}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.2,0,269.3,270.4);


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
	this.shape_33.graphics.lf(["#829F93","#414C41"],[0,1],14.7,-67.3,94.9,38.7).s().p("ABXQjQpTgjnylKQnnlBkEoKQjXmvAGnhIEaAAQgGGFCjFiQD4IcIFElQINEqJXhDQJdhEG6mgQGqmRBopAIAUADQgoDxhgDjQi4GvlwEfQnrGApuAnIAAClIhLgDg");
	this.shape_33.setTransform(125.6685,203.4085,0.64,0.64);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.lf(["#829F93","#414C41"],[0,1],12.6,-15.5,54.2,110.9).s().p("AaRQmQAGmFijliQj4ocoFklQoNkqpXBDQpdBEm6GgQmqGRhoJAIgUgDQAojxBgjjQC4mvFwkfQHrmAJugnIAAilIBLADQJTAjHyFKQHnFBEEIKQDXGvgGHhg");
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
	this.shape_31.graphics.lf(["#8682CE","#49467A"],[0,1],43.7,-52.9,85.3,73.5).s().p("ABXQjQpTgjnylKQnnlBkEoKQjXmvAGnhIEaAAQgGGFCjFiQD4IcIFElQINEqJXhDQJdhEG6mgQGqmRBopAIAUADQgoDxhgDjQi4GvlwEfQnrGApuAnIAAClIhLgDg");
	this.shape_31.setTransform(125.6846,202.4085,0.64,0.64);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.lf(["#8682CE","#49467A"],[0,1],12.5,-15.5,54.1,110.9).s().p("AaRQmQAGmFijliQj4ocoFklQoNkqpXBDQpdBEm6GgQmqGRhoJAIgUgDQAojxBgjjQC4mvFwkfQHrmAJugnIAAilIBLADQJTAjHyFKQHnFBEEIKQDXGvgGHhg");
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
	this.shape.graphics.f("#000000").s().p("ABLCzIg1hOQgbgqgKgLQgKgKgMgFQgLgDgZgBIgOAAIAACWIhJAAIAAllICYAAQA4AAAbAKQAaAJAPAZQAQAZAAAfQAAApgYAaQgYAZguAHQAXAOAPAQQAPAQAaAqIAsBGgAhXgaIA1AAQAzAAANgFQANgFAHgKQAIgLAAgQQAAgSgKgLQgKgLgRgDQgJgBgrAAIg4AAg");
	this.shape.setTransform(205.55,46.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AiHCzIAAllIEIAAIAAA9IjAAAIAABPICzAAIAAA7IizAAIAABiIDHAAIAAA8g");
	this.shape_1.setTransform(169.7,46.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgmCzIiAllIBPAAIBZEIIBYkIIBMAAIiAFlg");
	this.shape_2.setTransform(135.75,46.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("Ah9CxIAAlhIBIAAIAAElICzAAIAAA8g");
	this.shape_3.setTransform(108.7,46.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("Ah9CJQgwgxAAhWQAAg1ARglQAMgcAVgWQAVgVAZgLQAigOArAAQBPAAAvAxQAwAxAABXQAABWgvAyQgwAwhOAAQhPAAgvgwgAhHhcQgbAfAAA9QAAA9AcAfQAcAgAqgBQAsAAAbgfQAcgfAAg9QAAg9gbgfQgbgegtAAQgrAAgcAeg");
	this.shape_4.setTransform(72.875,46.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgmCzIiAllIBPAAIBZEIIBYkIIBMAAIh/Flg");
	this.shape_5.setTransform(36.65,46.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CCCCCC").s().p("Aw3HgQjHAAiNiMQiNiNAAjHIAAAAQAAjGCNiNQCNiMDHAAMAhwAAAQDGAACNCMQCMCNAADGIAAAAQAADHiMCNQiNCMjGAAg");
	this.shape_6.setTransform(126.0407,46.017,0.8078,0.9583);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_6}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,252.1,92.1);


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
(lib.prod_ferroniquel = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {home:604,pag1:606,pag2:996,pag3:1716,pag4:2453,pag5:2872,pag6:3532};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,263,265,605,664,994,1043,1714,1768,2451,2494,2870,2928,3245,3247,3248,3530,3587,3870];
	this.streamSoundSymbolsList[1043] = [{id:"a4",startFrame:1043,endFrame:1714,loop:1,offset:0}];
	this.streamSoundSymbolsList[1768] = [{id:"a5",startFrame:1768,endFrame:2451,loop:1,offset:0}];
	this.streamSoundSymbolsList[2494] = [{id:"a6",startFrame:2494,endFrame:2869,loop:1,offset:0}];
	this.streamSoundSymbolsList[2928] = [{id:"a7",startFrame:2928,endFrame:3245,loop:1,offset:0}];
	this.streamSoundSymbolsList[3248] = [{id:"a8",startFrame:3248,endFrame:3530,loop:1,offset:0}];
	this.streamSoundSymbolsList[3587] = [{id:"a9",startFrame:3587,endFrame:3872,loop:1,offset:0}];
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
		playSound("a2");
	}
	this.frame_605 = function() {
		this.stop();
		ocultavid1();ocultavid2();ocultavid3();
		
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
		playSound("a3");
	}
	this.frame_994 = function() {
		this.stop();
		
		function gohome(){
			this.gotoAndPlay("home");
		}
		this.btn_back.addEventListener("click", gohome.bind(this));
	}
	this.frame_1043 = function() {
		var soundInstance = playSound("a4",0);
		this.InsertIntoSoundStreamData(soundInstance,1043,1714,1);
	}
	this.frame_1714 = function() {
		this.stop();
		
		function gohome(){
			this.gotoAndPlay("home");
		}
		this.btn_back.addEventListener("click", gohome.bind(this));
	}
	this.frame_1768 = function() {
		var soundInstance = playSound("a5",0);
		this.InsertIntoSoundStreamData(soundInstance,1768,2451,1);
	}
	this.frame_2451 = function() {
		this.stop();
		
		function gohome(){
			this.gotoAndPlay("home");
		}
		this.btn_back.addEventListener("click", gohome.bind(this));
	}
	this.frame_2494 = function() {
		var soundInstance = playSound("a6",0);
		this.InsertIntoSoundStreamData(soundInstance,2494,2869,1);
	}
	this.frame_2870 = function() {
		this.stop();
		
		function gohome(){
			this.gotoAndPlay("home");
		}
		this.btn_back.addEventListener("click", gohome.bind(this));
	}
	this.frame_2928 = function() {
		var soundInstance = playSound("a7",0);
		this.InsertIntoSoundStreamData(soundInstance,2928,3245,1);
		muestravid2();
	}
	this.frame_3245 = function() {
		ocultavid2();
	}
	this.frame_3247 = function() {
		muestravid3();
	}
	this.frame_3248 = function() {
		var soundInstance = playSound("a8",0);
		this.InsertIntoSoundStreamData(soundInstance,3248,3530,1);
	}
	this.frame_3530 = function() {
		this.stop();
		
		function gohome(){
			this.gotoAndPlay("home");
		}
		this.btn_back.addEventListener("click", gohome.bind(this));
	}
	this.frame_3587 = function() {
		var soundInstance = playSound("a9",0);
		this.InsertIntoSoundStreamData(soundInstance,3587,3872,1);
	}
	this.frame_3870 = function() {
		this.stop();
		
		function gohome(){
			this.gotoAndPlay("home");
		}
		this.btn_back.addEventListener("click", gohome.bind(this));
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(262).call(this.frame_263).wait(2).call(this.frame_265).wait(340).call(this.frame_605).wait(59).call(this.frame_664).wait(330).call(this.frame_994).wait(49).call(this.frame_1043).wait(671).call(this.frame_1714).wait(54).call(this.frame_1768).wait(683).call(this.frame_2451).wait(43).call(this.frame_2494).wait(376).call(this.frame_2870).wait(58).call(this.frame_2928).wait(317).call(this.frame_3245).wait(2).call(this.frame_3247).wait(1).call(this.frame_3248).wait(282).call(this.frame_3530).wait(57).call(this.frame_3587).wait(283).call(this.frame_3870).wait(2));

	// flash0_ai
	this.btn_play = new lib.btnplay();
	this.btn_play.name = "btn_play";
	this.btn_play.setTransform(640,310,1,1,0,0,0,126,126);
	new cjs.ButtonHelper(this.btn_play, 0, 1, 2, false, new lib.btnplay(), 3);

	this.timeline.addTween(cjs.Tween.get(this.btn_play).to({_off:true},2).wait(3870));

	// btn_volver
	this.btn_back = new lib.btnvolver();
	this.btn_back.name = "btn_back";
	this.btn_back.setTransform(1124.25,548.15,1,1,0,0,0,126,46);
	this.btn_back._off = true;
	new cjs.ButtonHelper(this.btn_back, 0, 1, 2, false, new lib.btnvolver(), 3);

	this.timeline.addTween(cjs.Tween.get(this.btn_back).wait(994).to({_off:false},0).to({_off:true},1).wait(719).to({_off:false},0).to({_off:true},1).wait(736).to({_off:false,x:164.25},0).to({_off:true},1).wait(418).to({_off:false,x:1124.25},0).to({_off:true},1).wait(659).to({_off:false,y:84.05},0).to({_off:true},1).wait(339).to({_off:false,x:148,y:74.05},0).wait(2));

	// textos
	this.instance = new lib.t3("synched",0);
	this.instance.setTransform(-476.1,519.05,1,1,0,0,0,522.1,58.9);
	this.instance._off = true;

	this.instance_1 = new lib.t4("synched",0);
	this.instance_1.setTransform(-390.1,455.05,1,1,0,0,0,522.1,58.9);
	this.instance_1._off = true;

	this.instance_2 = new lib.t5("synched",0);
	this.instance_2.setTransform(-418.15,510.1,1,1,0,0,0,334,85.4);
	this.instance_2._off = true;

	this.instance_3 = new lib.t6("synched",0);
	this.instance_3.setTransform(-490.15,130.05,1,1,0,0,0,334,85.4);
	this.instance_3._off = true;

	this.instance_4 = new lib.t7("synched",0);
	this.instance_4.setTransform(-516.15,130.05,1,1,0,0,0,334,85.4);
	this.instance_4._off = true;

	this.instance_5 = new lib.t8("synched",0);
	this.instance_5.setTransform(1676.35,534.55,1,1,0,0,0,334,85.4);
	this.instance_5._off = true;

	this.instance_6 = new lib.t9("synched",0);
	this.instance_6.setTransform(1666.45,494.55,1,1,0,0,0,334,85.4);
	this.instance_6._off = true;

	this.instance_7 = new lib.t10("synched",0);
	this.instance_7.setTransform(1684.55,140.5,1,1,0,0,0,334,85.4);
	this.instance_7._off = true;

	this.instance_8 = new lib.t11("synched",0);
	this.instance_8.setTransform(1671.55,140.5,1,1,0,0,0,334,85.4);
	this.instance_8._off = true;

	this.instance_9 = new lib.t12("synched",0);
	this.instance_9.setTransform(-880.3,566.55,1,1,0,0,0,334,85.4);
	this.instance_9._off = true;

	this.instance_10 = new lib.t13("synched",0);
	this.instance_10.setTransform(-910.3,478.55,1,1,0,0,0,334,85.4);
	this.instance_10._off = true;

	this.instance_11 = new lib.t14("synched",0);
	this.instance_11.setTransform(1850.75,542.05,0.9,0.9,0,0,0,581.8,93.2);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1066).to({_off:false},0).to({x:548.15},21).wait(111).to({startPosition:0},0).to({x:-488.1},16).to({_off:true},1).wait(2657));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1284).to({_off:false},0).to({x:554.15},21).wait(136).to({startPosition:0},0).to({x:-726.15},14).to({_off:true},1).wait(2416));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1570).to({_off:false},0).to({x:362.05},16).to({_off:true},129).wait(2157));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1790).to({_off:false},0).to({x:364.05},22).wait(180).to({startPosition:0},0).to({x:-496.15},21).to({_off:true},1).wait(1858));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(2015).to({_off:false},0).to({x:364.05},20).wait(73).to({startPosition:0},0).to({x:-495.95},18).to({_off:true},1).wait(1745));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(2129).to({_off:false},0).to({x:734.15},22).wait(133).to({startPosition:0},0).to({x:1666.4},18).to({_off:true},1).wait(1569));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(2304).to({_off:false},0).to({x:754.15},18).to({_off:true},130).wait(1420));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(2521).to({_off:false},0).to({x:890.15},20).wait(184).to({startPosition:0},0).to({x:1684.55},15).to({_off:true},1).wait(1131));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(2742).to({_off:false},0).to({x:846.15},17).to({_off:true},112).wait(1001));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(2956).to({_off:false},0).to({x:358},23).wait(224).to({startPosition:0},0).to({x:-878.3},17).to({_off:true},1).wait(651));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(3257).to({_off:false},0).to({x:362},21).wait(218).to({startPosition:0},0).to({x:-910.35},19).to({_off:true},1).wait(356));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(3608).to({_off:false},0).to({x:734.15,y:536.25},19).wait(245));

	// Capa_3
	this.instance_12 = new lib.f10_1("synched",0);
	this.instance_12.setTransform(1804.35,188,1,1,0,0,0,512,288);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(3581).to({_off:false},0).to({x:514.05},21).wait(270));

	// Capa_9
	this.instance_13 = new lib.f8_1("synched",0);
	this.instance_13.setTransform(1922,310.1,1,1,0,0,0,640,362.5);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(2725).to({_off:false},0).to({x:640},15).to({_off:true},131).wait(1001));

	// Capa_2
	this.instance_14 = new lib.f7_1("synched",0);
	this.instance_14.setTransform(1932.35,310.1,1,1,0,0,0,640,362.5);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(2492).to({_off:false},0).to({x:640},24).wait(209).to({startPosition:0},0).to({x:-642},15).to({_off:true},1).wait(1131));

	// Capa_15
	this.instance_15 = new lib.f6_1("synched",0);
	this.instance_15.setTransform(1922,310.1,1,1,0,0,0,640,362.5);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(2108).to({_off:false},0).to({x:640},18).to({_off:true},326).wait(1420));

	// Capa_14
	this.instance_16 = new lib.f5_1("synched",0);
	this.instance_16.setTransform(1942.5,310.1,1,1,0,0,0,640,362.5);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1762).to({_off:false},0).to({x:640},28).wait(318).to({startPosition:0},0).to({x:-640},18).to({_off:true},1).wait(1745));

	// Capa_12
	this.instance_17 = new lib.f4_1("synched",0);
	this.instance_17.setTransform(1922.05,264.1,1,1,0,0,0,640,362.5);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1441).to({_off:false},0).to({x:640.05},14).to({_off:true},260).wait(2157));

	// Capa_10
	this.instance_18 = new lib.f3_1("synched",0);
	this.instance_18.setTransform(1926.35,264.1,1,1,0,0,0,640,362.5);
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1035).to({_off:false},0).to({x:640.05},23).wait(383).to({startPosition:0},0).to({x:-641.95},14).to({_off:true},1).wait(2416));

	// Capa_8
	this.instance_19 = new lib.f2_1("synched",0);
	this.instance_19.setTransform(1920.3,324.55,1,1,0,0,0,640,362.5);
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(876).to({_off:false},0).to({x:640},15).to({_off:true},104).wait(2877));

	// Capa_7
	this.instance_20 = new lib.t2("synched",0);
	this.instance_20.setTransform(-478.15,93.5,1,1,0,0,0,478.1,58.9);
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(719).to({_off:false},0).to({x:518.15},24).wait(133).to({startPosition:0},0).to({x:-808.15},15).to({_off:true},1).wait(2980));

	// Capa_6
	this.instance_21 = new lib.f1_1("synched",0);
	this.instance_21.setTransform(1932.35,274.5,1,1,0,0,0,640,362.5);
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(657).to({_off:false},0).to({x:640},20).wait(199).to({startPosition:0},0).to({x:-640.3,y:267.7},15).to({_off:true},1).wait(2980));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.btn1},{t:this.btn2},{t:this.btn3},{t:this.btn4},{t:this.btn5},{t:this.btn6},{t:this.instr}]},604).to({state:[]},2).wait(3266));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.v1},{t:this.v2},{t:this.v3},{t:this.v4},{t:this.v5},{t:this.v6}]},605).to({state:[]},1).wait(3266));

	// btn6
	this.instance_22 = new lib.btn6("single",0);
	this.instance_22.setTransform(1073.45,478.5,0.1,0.1,0,0,0,150,150.5);
	this.instance_22._off = true;

	this.btn6_1 = new lib.btn6("single",0);
	this.btn6_1.name = "btn6_1";
	this.btn6_1.setTransform(1073.45,490.5,0.9,0.9,0,0,0,149.6,150.2);
	this.btn6_1._off = true;

	this.btn1_1 = new lib.btn6("single",0);
	this.btn1_1.name = "btn1_1";
	this.btn1_1.setTransform(669.95,342.5,2,2,0,0,0,149.6,150.2);
	this.btn1_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(540).to({_off:false},0).to({_off:true,regX:149.6,regY:150.2,scaleX:0.9,scaleY:0.9,y:490.5},16,cjs.Ease.backOut).wait(3316));
	this.timeline.addTween(cjs.Tween.get(this.btn6_1).wait(540).to({_off:false},16,cjs.Ease.backOut).to({_off:true},48).wait(2).to({_off:false},0).to({scaleX:1,scaleY:1,y:478.5,alpha:0},13).to({_off:true},1).wait(376).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.5,alpha:1},0).to({scaleX:1,scaleY:1,y:478.5,alpha:0},13).to({_off:true},1).wait(706).to({_off:false,regX:149.7,regY:150.3,scaleX:0.9,scaleY:0.9,x:1073.5,y:490.5,alpha:1},0).to({regX:149.6,regY:150.2,scaleX:1,scaleY:1,x:1073.45,y:478.5,alpha:0},13).to({_off:true},1).wait(723).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.5,alpha:1},0).to({scaleX:1,scaleY:1,y:478.5,alpha:0},13).to({_off:true},1).wait(405).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.5,alpha:1},0).to({scaleX:1,scaleY:1,y:478.5,alpha:0},13).to({_off:true},1).wait(646).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.5,alpha:1},0).to({_off:true,scaleX:2,scaleY:2,x:669.95,y:342.5},14).wait(326));
	this.timeline.addTween(cjs.Tween.get(this.btn1_1).wait(3532).to({_off:false},14).wait(26).to({startPosition:0},0).to({x:-292.25},15).to({_off:true},1).wait(284));

	// btn5
	this.instance_23 = new lib.btn5("single",0);
	this.instance_23.setTransform(654.95,478.6,0.1,0.1,0,0,0,150,151);
	this.instance_23._off = true;

	this.btn5_1 = new lib.btn5("single",0);
	this.btn5_1.name = "btn5_1";
	this.btn5_1.setTransform(654.95,490.6,0.9,0.9,0,0,0,149.6,151.1);
	this.btn5_1._off = true;

	this.btn1_2 = new lib.btn5("single",0);
	this.btn1_2.name = "btn1_2";
	this.btn1_2.setTransform(669.95,342.5,2,2,0,0,0,149.6,150.2);
	this.btn1_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(485).to({_off:false},0).to({_off:true,regX:149.6,regY:151.1,scaleX:0.9,scaleY:0.9,y:490.6},14,cjs.Ease.backOut).wait(3373));
	this.timeline.addTween(cjs.Tween.get(this.btn5_1).wait(485).to({_off:false},14,cjs.Ease.backOut).to({_off:true},105).wait(2).to({_off:false},0).to({scaleX:1,scaleY:1,y:478.65,alpha:0},13).to({_off:true},1).wait(376).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.6,alpha:1},0).to({scaleX:1,scaleY:1,y:478.65,alpha:0},13).to({_off:true},1).wait(706).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.6,alpha:1},0).to({scaleX:1,scaleY:1,y:478.65,alpha:0},13).to({_off:true},1).wait(723).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.6,alpha:1},0).to({scaleX:1,scaleY:1,y:478.65,alpha:0},13).to({_off:true},1).wait(405).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.6,alpha:1},0).to({_off:true,regY:150.2,scaleX:2,scaleY:2,x:669.95,y:342.5},14).wait(646).to({_off:false,regY:151.1,scaleX:0.9,scaleY:0.9,x:654.95,y:490.6},0).to({scaleX:1,scaleY:1,y:478.65,alpha:0},13).to({_off:true},1).wait(326));
	this.timeline.addTween(cjs.Tween.get(this.btn1_2).wait(2872).to({_off:false},14).wait(26).to({startPosition:0},0).to({x:-292.25},15).to({_off:true},1).wait(944));

	// btn4
	this.instance_24 = new lib.btn4("single",0);
	this.instance_24.setTransform(238.9,478.55,0.1,0.1,0,0,0,150,150.5);
	this.instance_24._off = true;

	this.btn4_1 = new lib.btn4("single",0);
	this.btn4_1.name = "btn4_1";
	this.btn4_1.setTransform(238.95,490.55,0.9,0.9,0,0,0,149.6,150.3);
	this.btn4_1._off = true;

	this.btn1_3 = new lib.btn4("single",0);
	this.btn1_3.name = "btn1_3";
	this.btn1_3.setTransform(669.95,342.5,2,2,0,0,0,149.6,150.2);
	this.btn1_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(457).to({_off:false},0).to({_off:true,regX:149.6,regY:150.3,scaleX:0.9,scaleY:0.9,x:238.95,y:490.55},13,cjs.Ease.backOut).wait(3402));
	this.timeline.addTween(cjs.Tween.get(this.btn4_1).wait(457).to({_off:false},13,cjs.Ease.backOut).to({_off:true},134).wait(2).to({_off:false},0).to({scaleX:1,scaleY:1,y:478.6,alpha:0},13).to({_off:true},1).wait(376).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.55,alpha:1},0).to({scaleX:1,scaleY:1,y:478.6,alpha:0},13).to({_off:true},1).wait(706).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.55,alpha:1},0).to({scaleX:1,scaleY:1,y:478.6,alpha:0},13).to({_off:true},1).wait(723).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.55,alpha:1},0).to({_off:true,regY:150.2,scaleX:2,scaleY:2,x:669.95,y:342.5},14).wait(405).to({_off:false,regY:150.3,scaleX:0.9,scaleY:0.9,x:238.95,y:490.55},0).to({scaleX:1,scaleY:1,y:478.6,alpha:0},13).to({_off:true},1).wait(646).to({_off:false,scaleX:0.9,scaleY:0.9,y:490.55,alpha:1},0).to({scaleX:1,scaleY:1,y:478.6,alpha:0},13).to({_off:true},1).wait(326));
	this.timeline.addTween(cjs.Tween.get(this.btn1_3).wait(2453).to({_off:false},14).wait(26).to({startPosition:0},0).to({x:-292.25},15).to({_off:true},1).wait(1363));

	// btn3
	this.instance_25 = new lib.btn3("single",0);
	this.instance_25.setTransform(1073.45,176.5,0.1,0.1,0,0,0,150,150.5);
	this.instance_25._off = true;

	this.btn3_1 = new lib.btn3("single",0);
	this.btn3_1.name = "btn3_1";
	this.btn3_1.setTransform(1073.45,164.5,0.9,0.9,0,0,0,149.6,150.3);
	this.btn3_1._off = true;

	this.btn1_4 = new lib.btn3("single",0);
	this.btn1_4.name = "btn1_4";
	this.btn1_4.setTransform(669.95,342.5,2,2,0,0,0,149.6,150.2);
	this.btn1_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(428).to({_off:false},0).to({_off:true,regX:149.6,regY:150.3,scaleX:0.9,scaleY:0.9,y:164.5},14,cjs.Ease.backOut).wait(3430));
	this.timeline.addTween(cjs.Tween.get(this.btn3_1).wait(428).to({_off:false},14,cjs.Ease.backOut).to({_off:true},162).wait(2).to({_off:false},0).to({scaleX:1,scaleY:1,y:176.55,alpha:0},13).to({_off:true},1).wait(376).to({_off:false,scaleX:0.9,scaleY:0.9,y:164.5,alpha:1},0).to({scaleX:1,scaleY:1,y:176.55,alpha:0},13).to({_off:true},1).wait(706).to({_off:false,scaleX:0.9,scaleY:0.9,y:164.5,alpha:1},0).to({_off:true,regY:150.2,scaleX:2,scaleY:2,x:669.95,y:342.5},14).wait(723).to({_off:false,regY:150.3,scaleX:0.9,scaleY:0.9,x:1073.45,y:162.5},0).to({scaleX:1,scaleY:1,y:176.55,alpha:0},13).to({_off:true},1).wait(405).to({_off:false,scaleX:0.9,scaleY:0.9,y:164.5,alpha:1},0).to({scaleX:1,scaleY:1,y:176.55,alpha:0},13).to({_off:true},1).wait(646).to({_off:false,scaleX:0.9,scaleY:0.9,y:164.5,alpha:1},0).to({scaleX:1,scaleY:1,y:176.55,alpha:0},13).to({_off:true},1).wait(326));
	this.timeline.addTween(cjs.Tween.get(this.btn1_4).wait(1716).to({_off:false},14).wait(26).to({startPosition:0},0).to({x:-292.25},15).to({_off:true},1).wait(2100));

	// btn2
	this.instance_26 = new lib.btn2("single",0);
	this.instance_26.setTransform(654.95,176.5,0.1,0.1,0,0,0,150,151);
	this.instance_26._off = true;

	this.btn2_1 = new lib.btn2("single",0);
	this.btn2_1.name = "btn2_1";
	this.btn2_1.setTransform(655,164.5,0.9,0.9,0,0,0,149.6,150.8);
	this.btn2_1._off = true;

	this.btn1_5 = new lib.btn2("single",0);
	this.btn1_5.name = "btn1_5";
	this.btn1_5.setTransform(669.95,342.5,2,2,0,0,0,149.6,150.2);
	this.btn1_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(385).to({_off:false},0).to({_off:true,regX:149.6,regY:150.8,scaleX:0.9,scaleY:0.9,x:655,y:164.5},13,cjs.Ease.backOut).wait(3474));
	this.timeline.addTween(cjs.Tween.get(this.btn2_1).wait(385).to({_off:false},13,cjs.Ease.backOut).to({_off:true},206).wait(2).to({_off:false},0).to({scaleX:1,scaleY:1,y:176.55,alpha:0},13).to({_off:true},1).wait(376).to({_off:false,scaleX:0.9,scaleY:0.9,y:164.5,alpha:1},0).to({_off:true,regY:150.2,scaleX:2,scaleY:2,x:669.95,y:342.5},13).wait(707).to({_off:false,regY:150.8,scaleX:0.9,scaleY:0.9,x:655,y:164.5},0).to({scaleX:1,scaleY:1,y:176.55,alpha:0},13).to({_off:true},1).wait(723).to({_off:false,scaleX:0.9,scaleY:0.9,y:162.5,alpha:1},0).to({scaleX:1,scaleY:1,y:176.55,alpha:0},13).to({_off:true},1).wait(405).to({_off:false,scaleX:0.9,scaleY:0.9,y:164.5,alpha:1},0).to({scaleX:1,scaleY:1,y:176.55,alpha:0},13).to({_off:true},1).wait(646).to({_off:false,scaleX:0.9,scaleY:0.9,y:164.5,alpha:1},0).to({scaleX:1,scaleY:1,y:176.55,alpha:0},13).to({_off:true},1).wait(326));
	this.timeline.addTween(cjs.Tween.get(this.btn1_5).wait(996).to({_off:false},13).wait(26).to({startPosition:0},0).to({x:-276.25},16).to({_off:true},1).wait(2820));

	// btn1
	this.instance_27 = new lib.btn1("single",0);
	this.instance_27.setTransform(238.9,176.45,0.1,0.1,0,0,0,149.6,150.6);
	this.instance_27._off = true;

	this.btn1_6 = new lib.btn1("single",0);
	this.btn1_6.name = "btn1_6";
	this.btn1_6.setTransform(238.95,164.45,0.9,0.9,0,0,0,149.6,150.2);
	this.btn1_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(342).to({_off:false},0).to({_off:true,regY:150.2,scaleX:0.9,scaleY:0.9,x:238.95,y:164.45},16,cjs.Ease.backOut).wait(3514));
	this.timeline.addTween(cjs.Tween.get(this.btn1_6).wait(342).to({_off:false},16,cjs.Ease.backOut).to({_off:true},246).wait(2).to({_off:false},0).to({scaleX:2,scaleY:2,x:669.95,y:342.5},14).wait(26).to({startPosition:0},0).to({x:-292.25},15).to({_off:true},1).wait(334).to({_off:false,scaleX:0.9,scaleY:0.9,x:238.95,y:164.45},0).to({scaleX:1,scaleY:1,y:176.45,alpha:0},13).to({_off:true},1).wait(706).to({_off:false,scaleX:0.9,scaleY:0.9,y:164.45,alpha:1},0).to({scaleX:1,scaleY:1,y:176.45,alpha:0},13).to({_off:true},1).wait(723).to({_off:false,scaleX:0.9,scaleY:0.9,y:162.45,alpha:1},0).to({scaleX:1,scaleY:1,y:176.45,alpha:0},13).to({_off:true},1).wait(405).to({_off:false,scaleX:0.9,scaleY:0.9,y:164.45,alpha:1},0).to({scaleX:1,scaleY:1,y:176.45,alpha:0},13).to({_off:true},1).wait(646).to({_off:false,scaleX:0.9,scaleY:0.9,y:164.45,alpha:1},0).to({scaleX:1,scaleY:1,y:176.45,alpha:0},13).to({_off:true},1).wait(326));

	// Capa_5
	this.instance_28 = new lib.t1("synched",0);
	this.instance_28.setTransform(640,318.95,0.1,0.1,0,0,0,502.6,52.5);
	this.instance_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(264).to({_off:false},0).to({regX:502.3,regY:52.3,scaleX:1,scaleY:1,x:640.05,y:319},14).wait(52).to({startPosition:0},0).wait(11).to({regX:502.6,regY:52.5,scaleX:0.1,scaleY:0.1,x:640,y:318.95},0).to({_off:true},1).wait(3530));

	// fondos
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#ABB7C0","#54585A"],[0,1],-21.9,182.1,-21.9,382.1).s().p("EhlaAyBMAAAhkBMDK1AAAMAAABkBg");
	this.shape.setTransform(643.2,310.125);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(264).to({_off:false},0).to({_off:true},2664).wait(604).to({_off:false},0).wait(340));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-660.2,0,3242.7,687.1);
// library properties:
lib.properties = {
	id: '0424E10375B62B4EBDF31C772543B51F',
	width: 1280,
	height: 620,
	fps: 24,
	color: "#CCCCCC",
	opacity: 0.00,
	manifest: [
		{src:"images/f1.jpg", id:"f1"},
		{src:"images/f10.jpg", id:"f10"},
		{src:"images/f2.jpg", id:"f2"},
		{src:"images/f3.jpg", id:"f3"},
		{src:"images/f4.jpg", id:"f4"},
		{src:"images/f5.jpg", id:"f5"},
		{src:"images/f6.jpg", id:"f6"},
		{src:"images/f7.jpg", id:"f7"},
		{src:"images/f8.jpg", id:"f8"},
		{src:"sounds/a2.mp3", id:"a2"},
		{src:"sounds/a3.mp3", id:"a3"},
		{src:"sounds/a4.mp3", id:"a4"},
		{src:"sounds/a5.mp3", id:"a5"},
		{src:"sounds/a6.mp3", id:"a6"},
		{src:"sounds/a7.mp3", id:"a7"},
		{src:"sounds/a8.mp3", id:"a8"},
		{src:"sounds/a9.mp3", id:"a9"}
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