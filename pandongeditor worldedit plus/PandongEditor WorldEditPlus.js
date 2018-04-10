//PandongEditor WorldEditPlus.
//ⓒ 2015-2016 Pandong & Irenebode All rights reserved.

const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

var cm = clientMessage;

var Pos = {
start : [0, 0, 0],
end : [0, 0, 0]
};

var board = {
rotate : [],
flip : []
};

var worldEditMemory={
pos1 : [null, null, null],
pos2 : [null, null, null],
blockSave : new Array( ),
lastWorkSavings : {
changedBlocks : new Array( )
},
lastUndoSavings : {
changedBlocks : new Array( )
},
copy : {
copiedBlocks : new Array( )
}
}

function procCmd(cmd) {
var file = new java.io.File(sdcard+"/WorldEditPlus.txt");
if(file.exists()) {
var str = cmd.toLowerCase().split(" ");
switch(str[0]) {
case "/rotate" :
case "/회전" :
if(Pos.start == null || Pos.end == null) {
cm("좌표를 설정 해주세요");
break;
}
plus.rotate(parseInt(str[1]), [Player.getX(), Player.getY(), Player.getZ()], str[2]);
break;

case "/flip" :
case "/반전" :
if(Pos.start == null || Pos.end == null) {
cm("좌표를 설정 해주세요");
break;
}
plus.flip(str[1]);
break;
}
file.delete();
}
}

function useItem(x, y, z, i, b, s, id, bd) {
var file = new java.io.File(sdcard+"/WorldEditPlus.txt");
if(file.exists()) {
if(i == 271) {
setTile(x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z));
Pos.start = [x, y, z];
//cm("첫번째 지점이 (" + worldEditMemory.pos2 + ") 으로 설정 되었습니다");
}
}
file.delete();
}

/*
function startDestroyBlock(x, y, z) {
var file = new java.io.File(sdcard+"/WorldEditPlus.txt");
if(file.exists()) {
if(Player.getCarriedItem( ) == 271) {
setTile(x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z));
worldEditMemory.blockSave.push({bx : x, by : y, bz : z, id : Level.getTile(x, y, z), data : Level.getData(x, y, z), delay : 0});
Pos.end = [x, y, z];
}
}
file.delete();
}
*/

function destroyBlock(x, y, z) {
var file = new java.io.File(sdcard+"/WorldEditPlus.txt");
if(file.exists()) {
if(Player.getCarriedItem( ) == 271) {
setTile(x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z));
worldEditMemory.blockSave.push({bx : x, by : y, bz : z, id : Level.getTile(x, y, z), data : Level.getData(x, y, z), delay : 0});
Pos.end = [x, y, z];
//cm("두번째 지점이 (" + worldEditMemory.pos2 + ") 으로 설정 되었습니다");
}
}
file.delete();
}

var plus = {
rotate : function(degree, pos) {
var sx = (Pos.start[0] < Pos.end[0]? Pos.start[0] : Pos.end[0]);
var sy = (Pos.start[1] < Pos.end[1]? Pos.start[1] : Pos.end[1]);
var sz = (Pos.start[2] < Pos.end[2]? Pos.start[2] : Pos.end[2]);

var ex = (Pos.start[0] > Pos.end[0]? Pos.start[0] : Pos.end[0]);
var ey = (Pos.start[1] > Pos.end[1]? Pos.start[1] : Pos.end[1]);
var ez = (Pos.start[2] > Pos.end[2]? Pos.start[2] : Pos.end[2]);

var count = 0;
board.rotate = [];
		
for(var x = 0; x < ex - sx + 1; x ++) {
board.rotate[x] = [];
for(var y = 0; y < ey - sy + 1; y ++) {
board.rotate[x][y] = [];
for(var z = 0; z < ez - sz + 1; z ++) {
board.rotate[x][y][z] = { 
id : getTile(sx + x, sy + y, sz + z), 
data : getData(sx + x, sy + y, sz + z) 
};
count++;
}
}
}
		
if(degree%90 != 0 || degree > 360 || degree < 0 || degree == NaN) {
cm("각도를 읽을 수 없습니다.");
return;
}

switch(degree) {
case 0 :
case 360 :
break;

case 90 :
pos = [Player.getX(), Player.getY(), Player.getZ()];
for(var xx = 0; xx < board.rotate.length; xx ++) for(var yy = 0; yy < board.rotate[0].length; yy ++) for(var zz = 0; zz < board.rotate[0][0].length; zz ++) {
setTile(pos[0] - zz + board.rotate[0][0].length - 1, pos[1] + yy, pos[2] + xx, board.rotate[xx][yy][zz].id, board.rotate[xx][yy][zz].data);
}
break;

case 180 :
pos = [Player.getX(), Player.getY(), Player.getZ()];
for(var xx = 0; xx < board.rotate.length; xx ++) for(var yy = 0; yy < board.rotate[0].length; yy ++) for(var zz = 0; zz < board.rotate[0][0].length; zz ++) {
setTile(pos[0] - xx + board.rotate[0][0].length - 1, pos[1] + yy, pos[2] - zz, board.rotate[xx][yy][zz].id, board.rotate[xx][yy][zz].data);
}
break;

case 270 :
pos = [Player.getX(), Player.getY(), Player.getZ()];
for(var xx = 0; xx < board.rotate.length; xx ++) for(var yy = 0; yy < board.rotate[0].length; yy ++) for(var zz = 0; zz < board.rotate[0][0].length; zz ++) {
setTile(pos[0] + zz + board.rotate[0][0].length - 1, pos[1] + yy, pos[2] + -xx, board.rotate[xx][yy][zz].id, board.rotate[xx][yy][zz].data);
}
break;
}
cm(count + "개의 블럭을 " + degree + "도만큼 회전하였습니다.");
},

flip : function() {
var sx = (Pos.start[0] < Pos.end[0]? Pos.start[0] : Pos.end[0]);
var sy = (Pos.start[1] < Pos.end[1]? Pos.start[1] : Pos.end[1]);
var sz = (Pos.start[2] < Pos.end[2]? Pos.start[2] : Pos.end[2]);

var ex = (Pos.start[0] > Pos.end[0]? Pos.start[0] : Pos.end[0]);
var ey = (Pos.start[1] > Pos.end[1]? Pos.start[1] : Pos.end[1]);
var ez = (Pos.start[2] > Pos.end[2]? Pos.start[2] : Pos.end[2]);

var count = 0;
board.flip = [];
		
for(var x = 0; x < ex - sx + 1; x ++) {
board.flip[x] = [];
for(var y = 0; y < ey - sy + 1; y ++) {
board.flip[x][y] = [];
for(var z = 0; z < ez - sz + 1; z ++) {
board.flip[x][y][z] = { 
id : getTile(sx + x, sy + y, sz + z), 
data : getData(sx + x, sy + y, sz + z) 
};
}
}
}

for(var xx = 0; xx < board.flip.length; xx ++) for(var yy = 0; yy < board.flip[0].length; yy ++) for(var zz = 0; zz < board.flip[0][0].length; zz ++) {
setTile(sx + xx, board.flip[0].length - 1 - yy + sy, sz + zz, board.flip[xx][yy][zz].id, board.flip[xx][yy][zz].data);
count++;
}
cm(count + "개의 블럭을 반전시켰습니다.");
}
}

function getData(x, y, z) {
var file = new java.io.File(sdcard+"/WorldEditPlus.txt");
if(file.exists()) {
if (x != undefined && y != undefined && z != undefined) {
return net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetData(x, y, z);
}
file.delete();
}
}

//ⓒ 2015-2016 Pandong & Irenebode All rights reserved.