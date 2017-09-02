// Generated by CoffeeScript 1.12.6
var WDirectory,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

WDirectory = (function() {
  function WDirectory(wad) {
    this.wad = wad;
    this.write = bind(this.write, this);
  }

  WDirectory.prototype.write = function(bf) {
    var c, entry, i, j, k, len, len1, namecode, ref, results;
    i = 0;
    ref = this.wad.lumps;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      entry = ref[j];
      namecode = (entry.name + "\x00".repeat(Math.max(0, 8 - entry.name.length))).slice(0, 8);
      bf.writeUInt32LE(this.wad.lumps.slice(0, i + 1).map(function(x) {
        return x.getSize();
      }).reduce(function(a, b) {
        return a + b;
      })).writeUInt32LE(entry.getSize());
      for (k = 0, len1 = namecode.length; k < len1; k++) {
        c = namecode[k];
        bf.writeUInt8();
      }
      results.push(i++);
    }
    return results;
  };

  return WDirectory;

})();

module.exports = WDirectory;