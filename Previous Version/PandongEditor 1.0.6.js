/*본 스크립트의 저작권은 Pandong(joseph1999@naver.com)에게 있으며 무단 배포 및 수정은 엄금합니다.*/

ModPE.setItem(500, "axe", 0, "Wand");

var info={
name : "Pandong Editor",
version : "1.0.6",
maker : "Pandong"
};

var col="§";
var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

var options={
buttonX : 80,
buttonY : 0,
color : [255,50,50,50],
toString : function( ) {
return options.buttonX + ":" + options.buttonY + ":" + options.color[0] + ":" + options.color[1] + ":" + options.color[2] + ":" + options.color[3];
},
toOptions : function(string) {
var block=string.split(":");
options.buttonX = Number(block[0]);
options.buttonY = Number(block[1]);
options.color = [Number(block[2]), Number(block[3]), Number(block[4]), Number(block[5])];
}
};

var checkVer=false;
function checkVersion( ) {
if(download("/Pandong/ScriptInfo.txt", "https://www.dropbox.com/s/5rkq1g7b85z09qq/ScriptInfo.txt?dl=1")) {
var string=readFile("/Pandong/ScriptInfo.txt");
var blocks=string.split("\n\n");
var blocks2=new Array( );
var i;
var name, version, maker;
for(i=0; i<blocks.length; i++) {
name = blocks[i].split("\n")[0].split(" : ")[1];
version = blocks[i].split("\n")[1].split(" : ")[1];
maker = blocks[i].split("\n")[2].split(" : ")[1];
blocks2.push([name, version, maker]);
}
for(i=0; i<blocks2.length; i++) {
if(blocks2[i][0] == info.name) {
if(blocks2[i][1] == info.version && blocks2[i][2] == info.maker) {
print("최신 버전입니다");
} else
if(blocks2[i][1] == info.version) {
print("누가 마음대로 이름 바꿔놓으래. 이 스크립트는 팬동이 만든거라고.");
} else {
popup( );
}
}
}
}
}

function popup( ) {
var textView=makeTextView("최신 버전이 발견되었습니다. 팬동스크립트스튜디오로 이동할까요?\n(이동)을 누르면 팬동스크립트스튜디오로 이동됩니다.", 20, android.graphics.Color.WHITE, textParams.pop);
var popDialog = new android.app.AlertDialog.Builder(ctx).setTitle("알림").setView(textView);
popDialog.setPositiveButton("이동", new android.content.DialogInterface.OnClickListener({
onClick: function(dialog, which) {
try{
var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("http://m.blog.naver.com/PostList.nhn?blogId=joseph1999"));
ctx.startActivity(intent);
} catch(e) {
clientMessage(e);
}
}
}));
popDialog.setNegativeButton("취소", new android.content.DialogInterface.OnClickListener({
onClick: function(dialog, which) {
dialog.dismiss( );
}
}));

ctx.runOnUiThread(new java.lang.Runnable({
run : function( ) {
try{
popDialog.show();
} catch(error) {
clientMessage(error);
}
}
}
));
}

function download(name, fileURL) {
try {
var file=new java.io.File(android.os.Environment.getExternalStorageDirectory( ), name);
if (!file.getParentFile( ).exists( ))
file.getParentFile( ).mkdirs( );
var url=new java.net.URL(fileURL).openConnection( );
var bis=new java.io.BufferedInputStream(url.getInputStream( ));
var bos=new java.io.BufferedOutputStream(new java.io.FileOutputStream(file));
var read;
while(true) {
read = bis.read( );
if(read == -1)
break;
bos.write(read);
}
bis.close( );
bos.close( );
return true;
} catch(e) {
print("최신정보를 불러오지 못했습니다");
clientMessage(e);
return false;
}
}
var root="/Pandong/PDE/";
function readOptionFile( ) {
var content=readFile(root + "options.txt");
if(content) {
options.toOptions(content);
}
}
function saveOptionFile( ) {
fileOutput("sdcard" + root + "options.txt", options.toString( ))
}
function readFile(saveFilePath) {
if(!java.io.File(android.os.Environment.getExternalStorageDirectory( ), saveFilePath).exists( ))
return false;
var fr = new java.io.FileReader(android.os.Environment.getExternalStorageDirectory( )+saveFilePath);
var br = new java.io.BufferedReader(fr);
var str="";
var s="";
while((s=br.readLine( )) != null) {
str += s + "\n";
}
br.close( );
fr.close( );
return str;
}
function fileOutput(saveFilePath, str) {
var file = new java.io.File(saveFilePath);
if(!file.exists( )) {
file.getParentFile( ).mkdirs( );
}
var fw = new java.io.FileWriter(saveFilePath);
fw.write(str);
fw.close();
}
var windows={
openWindow : null,
mainWindow : null,
coordinateWindow : null,
progressWindow : null,
gpsWindow : null
};
var texts={
coordinateText : null,
gpsText : null
};

var textParams={
title : new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT),

maker : new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT),

subtitle : new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT),

hint : new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT),

pop : new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT)
};

textParams.title.setMargins(dip2px(5), dip2px(5), dip2px(5), 0);
textParams.maker.setMargins(dip2px(5), 0, 0, dip2px(5));
textParams.subtitle.setMargins(dip2px(5), dip2px(5), dip2px(5), dip2px(5));
textParams.hint.setMargins(dip2px(5), dip2px(5), dip2px(5), 0);
textParams.pop.setMargins(dip2px(10), dip2px(10), dip2px(10), dip2px(10));

var worldFunctions={
flying : {
functionName : "날기",
active : false,
checkedChangedEvent : function(toggle, isChecked) {
if(Player.isFlying( ) && !isChecked) {
toggle.setChecked(true);
clientMessage("착지 후 해제 해주세요");
return;
}
if(isChecked) {
Player.setCanFly(true);
worldFunctions.flying.active = true;
} else {
Player.setCanFly(false);
worldFunctions.flying.active = false;
}
}
},
instantBlock : {
functionName : "터치시 블럭제거",
active : false,
checkedChangedEvent : function(toggle, isChecked) {
if(isChecked)
worldFunctions.instantBlock.active = true;
else
worldFunctions.instantBlock.active = false;
}
},
removeEnt : {
functionName : "터치시 엔티티제거",
active : false,
checkedChangedEvent : function(toggle, isChecked) {
if(isChecked)
worldFunctions.removeEnt.active = true;
else
worldFunctions.removeEnt.active = false;
}
},
playerCoordinate : {
functionName : "실시간 플레이어 좌표",
active : false,
checkedChangedEvent : function(toggle, isChecked) {
if(isChecked) {
worldFunctions.playerCoordinate.openCoordWindow( );
worldFunctions.playerCoordinate.active = true;
} else {
worldFunctions.playerCoordinate.closeCoordWindow( );
worldFunctions.playerCoordinate.active = false;
}
},
openCoordWindow : function( ) {
windows.coordinateWindow = new android.widget.PopupWindow( );
texts.coordinateText = makeTextView("", 12, android.graphics.Color.WHITE, null);
setWindow(windows.coordinateWindow, texts.coordinateText, dip2px(150), dip2px(62), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(100,100,100,100)), false, [ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP,dip2px(0),dip2px(25)]);
},
closeCoordWindow : function( ) {
texts.coordinateText = null;
windows.coordinateWindow.dismiss( );
windows.coordinateWindow = null;
}
}
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

function getStartPos(pos1, pos2) {
var pos3=[ ];
if(pos1[0] <= pos2[0]) {
pos3.push(pos1[0]);
} else {
pos3.push(pos2[0]);
}
if(pos1[1] <= pos2[1]) {
pos3.push(pos1[1]);
} else {
pos3.push(pos2[1]);
}
if(pos1[2] <= pos2[2]) {
pos3.push(pos1[2]);
} else {
pos3.push(pos2[2]);
}
return pos3;
}

function getDist(pos1, pos2) {
return Math.sqrt(Math.pow(pos1[0]-pos2[0], 2)+Math.pow(pos1[1]-pos2[1], 2)+Math.pow(pos1[2]-pos2[2], 2));
}

var worldEditHelps=[
"좌표설정 도구로 블럭을 터치하면 첫번째 지점 좌표가 설정되고, 블럭을 길게 터치하면 두번째 지점 좌표가 설정됩니다",
"명령어를 입력할 때는 대괄호를 생략해주세요",
"[블럭]은 [블럭아이디:블럭데미지]로 입력하시면 되고, 만약 블럭데미지가 0이라면 [블럭아이디]로 입력하시면 됩니다",
"(pos1)는 첫번째 지점 좌표가, (pos1, pos2)는 첫번째와 두번째 지점 좌표가 필요합니다"
];

var worldEditCmds=[
{
cmd : "wand",
kcmd : "지팡이",
params : "",
help : "좌표설정 도구를 지급합니다",
func : function( ) {
Level.getGameMode( ) ? Entity.setCarriedItem(players[0], 500, 5, 0) : addItemInventory(500, 1, 0);
}
},{
cmd : "long",
kcmd : "원거리",
params : "",
help: "현재 바라보고있는 블럭의 정보를 확인합니다",
func : function( ) {
var sin=-Math.sin(Entity.getYaw(players[0])/180*Math.PI);
var cos=Math.cos(Entity.getYaw(players[0])/180*Math.PI);
var psin=-Math.sin(Entity.getPitch(players[0])/180*Math.PI);
var pcos=Math.cos(Entity.getPitch(players[0])/180*Math.PI);
for(var i=0; i<500; i++) {
var lx=Math.floor(Entity.getX(players[0]) + i * sin * pcos);
var ly=Math.floor(Entity.getY(players[0]) + i * psin);
var lz=Math.floor(Entity.getZ(players[0]) + i * cos * pcos);
if(getTile(lx, ly, lz) != 0) {
id = Level.getTile(lx, ly, lz);
data = Level.getData(lx, ly, lz);
name = searchItemByIdAndData(id, data);
clientMessage("x : " + lx + "\ny : " + ly + "\nz : " + lz + "\n" + name + "  " + id + (data ? ":" + data : ""));
break;
}
}
}
},{
cmd : "pos1",
kcmd : "좌표1",
params : "[x] [y] [z]",
help: "첫번째 지점 좌표를 설정합니다",
func : function(x, y, z) {
worldEditMemory.pos1 = [x, y, z];
clientMessage("첫번째 지점이 (" + worldEditMemory.pos1 + ") 으로 설정 되었습니다");
}
},{
cmd : "pos2",
kcmd : "좌표2",
params : "[x] [y] [z]",
help: "두번째 지점 좌표를 설정합니다",
func : function(x, y, z) {
worldEditMemory.pos2 = [x, y, z];
clientMessage("두번째 지점이 (" + worldEditMemory.pos2 + ") 으로 설정 되었습니다");
}
},{
cmd : "undo",
kcmd : "되돌리기",
params : "",
help: "최근에 했던 작업을 되돌리기 합니다",
func : function( ) {
var changedBlocks = worldEditMemory.lastWorkSavings.changedBlocks;
var changedBlocksLength = changedBlocks.length;
if(!changedBlocksLength) {
return;
}
var count=0;
for(var i=0; i<changedBlocksLength; i++) {
worldEditMemory.lastUndoSavings.changedBlocks.push([changedBlocks[i][0], changedBlocks[i][1], changedBlocks[i][2], Level.getTile(changedBlocks[i][0], changedBlocks[i][1], changedBlocks[i][2]), Level.getData(changedBlocks[i][0], changedBlocks[i][1], changedBlocks[i][2])]);
setTile(changedBlocks[i][0], changedBlocks[i][1], changedBlocks[i][2], changedBlocks[i][3], changedBlocks[i][4]);
count++;
}
worldEditMemory.lastWorkSavings.changedBlocks = new Array( );
clientMessage(count + "개의 블럭이 변경 되었습니다");
}
},{
cmd : "redo",
kcmd : "다시하기",
params : "",
help: "최근에 되돌리기 했던 지형을 복구 합니다",
func : function( ) {
var changedBlocks = worldEditMemory.lastUndoSavings.changedBlocks;
var changedBlocksLength = changedBlocks.length;
if(!changedBlocksLength) {
return;
}
var count=0;
for(var i=0; i<changedBlocksLength; i++) {
worldEditMemory.lastWorkSavings.changedBlocks.push([changedBlocks[i][0], changedBlocks[i][1], changedBlocks[i][2], Level.getTile(changedBlocks[i][0], changedBlocks[i][1], changedBlocks[i][2]), Level.getData(changedBlocks[i][0], changedBlocks[i][1], changedBlocks[i][2])]);
setTile(changedBlocks[i][0], changedBlocks[i][1], changedBlocks[i][2], changedBlocks[i][3], changedBlocks[i][4]);
count++;
}
worldEditMemory.lastUndoSavings.changedBlocks = new Array( );
clientMessage(count + "개의 블럭이 변경 되었습니다");
}
},{
cmd : "copy",
kcmd : "복사",
params : "",
help: "(pos1, pos2) 해당 지역을 복사 합니다",
func : function(pos1, pos2) {
var count=0;
worldEditMemory.copy.copiedBlocks = new Array( );
var copiedBlocks = worldEditMemory.copy.copiedBlocks;
var startPos = getStartPos(pos1, pos2);
var width=Math.abs(pos1[0] - pos2[0]) + 1;
var height=Math.abs(pos1[1] - pos2[1]) + 1;
var length=Math.abs(pos1[2] - pos2[2]) + 1;
copiedBlocks.push([width, height, length]);
for(var x=startPos[0]; x<startPos[0]+width; x++) {
for(var y=startPos[1]; y<startPos[1]+height; y++) {
for(var z=startPos[2]; z<startPos[2]+length; z++) {
copiedBlocks.push([Level.getTile(x, y, z), Level.getData(x, y, z)]);
count++;
}
}
}
clientMessage(count + "개의 블럭이 복사 되었습니다");
}
},{
cmd : "paste",
kcmd : "붙여넣기",
params : "",
help: "(pos1) 복사한 지형을 붙여넣기 합니다",
func : function(pos1) {
worldEditMemory.lastWorkSavings.changedBlocks = new Array( );
var copiedBlocks = worldEditMemory.copy.copiedBlocks;
var copiedBlocksLength = copiedBlocks.length;
if(!copiedBlocksLength)
return;
var count=0;
var width=copiedBlocks[0][0];
var height=copiedBlocks[0][1];
var length=copiedBlocks[0][2];
var c=1;
for(var x=pos1[0]; x<pos1[0]+width; x++) {
for(var y=pos1[1]; y<pos1[1]+height; y++) {
for(var z=pos1[2]; z<pos1[2]+length; z++) {
worldEditMemory.lastWorkSavings.changedBlocks.push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
setTile(x, y, z, copiedBlocks[c][0], copiedBlocks[c][1]);
c++;
count++;
}
}
}
clientMessage(count + "개의 블럭이 변경 되었습니다");
}
},{
cmd : "set",
kcmd : "채우기",
params : "[블럭]",
help: "(pos1, pos2) 해당 지역을 모두 [블럭]으로 채웁니다",
func : function(pos1, pos2, block) {
var count=0;
worldEditMemory.lastWorkSavings.changedBlocks = new Array( );
var startPos = getStartPos(pos1, pos2);
var width=Math.abs(pos1[0] - pos2[0]) + 1;
var height=Math.abs(pos1[1] - pos2[1]) + 1;
var length=Math.abs(pos1[2] - pos2[2]) + 1;
for(var x=startPos[0]; x<startPos[0]+width; x++) {
for(var y=startPos[1]; y<startPos[1]+height; y++) {
for(var z=startPos[2]; z<startPos[2]+length; z++) {
worldEditMemory.lastWorkSavings.changedBlocks.push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
setTile(x, y, z, block[0], block[1]);
count++;
}
}
}
clientMessage(count + "개의 블럭이 변경 되었습니다");
}
},{
cmd : "replace",
kcmd : "교체",
params : "[블럭] [바꿀블럭]",
help: "(pos1, pos2) 해당 지역의 [블럭]을 [바꿀블럭]으로 바꿉니다",
func : function(pos1, pos2, block, block2) {
var count=0;
worldEditMemory.lastWorkSavings.changedBlocks = new Array( );
var startPos = getStartPos(pos1, pos2);
var width=Math.abs(pos1[0] - pos2[0]) + 1;
var height=Math.abs(pos1[1] - pos2[1]) + 1;
var length=Math.abs(pos1[2] - pos2[2]) + 1;
for(var x=startPos[0]; x<startPos[0]+width; x++) {
for(var y=startPos[1]; y<startPos[1]+height; y++) {
for(var z=startPos[2]; z<startPos[2]+length; z++) {
if(Level.getTile(x, y, z) == block[0] && Level.getData(x, y, z) == block[1]) {
worldEditMemory.lastWorkSavings.changedBlocks.push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
setTile(x, y, z, block2[0], block2[1]);
count++;
}
}
}
}
clientMessage(count + "개의 블럭이 변경 되었습니다");
}
},{
cmd : "wall",
kcmd : "벽",
params : "[블럭]",
help: "(pos1, pos2) 해당 지역에 벽을 생성 합니다",
func : function(pos1, pos2, block) {
var count=0;
worldEditMemory.lastWorkSavings.changedBlocks = new Array( );
var startPos = getStartPos(pos1, pos2);
var width=Math.abs(pos1[0] - pos2[0]) + 1;
var height=Math.abs(pos1[1] - pos2[1]) + 1;
var length=Math.abs(pos1[2] - pos2[2]) + 1;
for(var x=startPos[0]; x<startPos[0]+width; x++) {
for(var y=startPos[1]; y<startPos[1]+height; y++) {
for(var z=startPos[2]; z<startPos[2]+length; z++) {
if(x == startPos[0] || x == startPos[0] + width - 1 || z == startPos[2] || z == startPos[2] + length - 1) {
worldEditMemory.lastWorkSavings.changedBlocks.push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
setTile(x, y, z, block[0], block[1]);
count++;
}
}
}
}
clientMessage(count + "개의 블럭이 변경 되었습니다");
}
},{
cmd : "circle",
kcmd : "원",
params : "[반지름] [블럭]",
help: "(pos1) 해당 지역에 원을 생성 합니다",
func : function(pos1, radious, block) {
var count=0;
worldEditMemory.lastWorkSavings.changedBlocks = new Array( );
var startPos=[pos1[0]-radious, pos1[1], pos1[2]-radious];
var width=radious*2+1;
var length=radious*2+1;
for(var x=startPos[0]; x<startPos[0]+width; x++) {
for(var z=startPos[2]; z<startPos[2]+length; z++) {
if(Math.floor(getDist(pos1, [x, startPos[1], z])) <= radious) {
worldEditMemory.lastWorkSavings.changedBlocks.push([x, startPos[1], z, Level.getTile(x, startPos[1], z), Level.getData(x, startPos[1], z)]);
setTile(x, startPos[1], z, block[0], block[1]);
count++;
}
}
}
clientMessage(count + "개의 블럭이 변경 되었습니다");
}
},{
cmd : "hcircle",
kcmd : "빈원",
params : "[반지름] [블럭]",
help: "(pos1) 해당 지역에 빈 원을 생성 합니다",
func : function(pos1, radious, block) {
var count=0;
worldEditMemory.lastWorkSavings.changedBlocks = new Array( );
var startPos=[pos1[0]-radious, pos1[1], pos1[2]-radious];
var width=radious*2+1;
var length=radious*2+1;
for(var x=startPos[0]; x<startPos[0]+width; x++) {
for(var z=startPos[2]; z<startPos[2]+length; z++) {
if(Math.floor(getDist(pos1, [x, startPos[1], z])) == radious) {
worldEditMemory.lastWorkSavings.changedBlocks.push([x, startPos[1], z, Level.getTile(x, startPos[1], z), Level.getData(x, startPos[1], z)]);
setTile(x, startPos[1], z, block[0], block[1]);
count++;
}
}
}
clientMessage(count + "개의 블럭이 변경 되었습니다");
}
},{
cmd : "sphere",
kcmd : "구",
params : "[반지름] [블럭]",
help: "(pos1) 해당 지역에 구를 생성 합니다",
func : function(pos1, radious, block) {
var count=0;
worldEditMemory.lastWorkSavings.changedBlocks = new Array( );
var startPos=[pos1[0]-radious, pos1[1]-radious, pos1[2]-radious];
var width=radious*2+1;
var height=radious*2+1;
var length=radious*2+1;
for(var x=startPos[0]; x<startPos[0]+width; x++) {
for(var y=startPos[1]; y<startPos[1]+height; y++) {
for(var z=startPos[2]; z<startPos[2]+length; z++) {
if(Math.floor(getDist(pos1, [x, y, z])) <= radious) {
worldEditMemory.lastWorkSavings.changedBlocks.push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
setTile(x, y, z, block[0], block[1]);
count++;
}
}
}
}
clientMessage(count + "개의 블럭이 변경 되었습니다");
}
},{
cmd : "hsphere",
kcmd : "빈구",
params : "[반지름] [블럭]",
help: "(pos1) 해당 지역에 빈 구를 생성 합니다",
func : function(pos1, radious, block) {
var count=0;
worldEditMemory.lastWorkSavings.changedBlocks = new Array( );
var startPos=[pos1[0]-radious, pos1[1]-radious, pos1[2]-radious];
var width=radious*2+1;
var height=radious*2+1;
var length=radious*2+1;
for(var x=startPos[0]; x<startPos[0]+width; x++) {
for(var y=startPos[1]; y<startPos[1]+height; y++) {
for(var z=startPos[2]; z<startPos[2]+length; z++) {
if(Math.floor(getDist(pos1, [x, y, z])) == radious) {
worldEditMemory.lastWorkSavings.changedBlocks.push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
setTile(x, y, z, block[0], block[1]);
count++;
}
}
}
}
clientMessage(count + "개의 블럭이 변경 되었습니다");
}
},{
cmd : "hemisphere",
kcmd : "반구",
params : "[반지름] [블럭]",
help: "(pos1) 해당 지역에 반구를 생성 합니다",
func : function(pos1, radious, block) {
var count=0;
worldEditMemory.lastWorkSavings.changedBlocks = new Array( );
var startPos=[pos1[0]-radious, pos1[1], pos1[2]-radious];
var width=radious*2+1;
var height=radious+1;
var length=radious*2+1;
for(var x=startPos[0]; x<startPos[0]+width; x++) {
for(var y=startPos[1]; y<startPos[1]+height; y++) {
for(var z=startPos[2]; z<startPos[2]+length; z++) {
if(Math.floor(getDist(pos1, [x, y, z])) <= radious) {
worldEditMemory.lastWorkSavings.changedBlocks.push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
setTile(x, y, z, block[0], block[1]);
count++;
}
}
}
}
clientMessage(count + "개의 블럭이 변경 되었습니다");
}
},{
cmd : "hhemisphere",
kcmd : "빈반구",
params : "[반지름] [블럭]",
help: "(pos1) 해당 지역에 빈 반구를 생성 합니다",
func : function(pos1, radious, block) {
var count=0;
worldEditMemory.lastWorkSavings.changedBlocks = new Array( );
var startPos=[pos1[0]-radious, pos1[1], pos1[2]-radious];
var width=radious*2+1;
var height=radious+1;
var length=radious*2+1;
for(var x=startPos[0]; x<startPos[0]+width; x++) {
for(var y=startPos[1]; y<startPos[1]+height; y++) {
for(var z=startPos[2]; z<startPos[2]+length; z++) {
if(Math.floor(getDist(pos1, [x, y, z])) == radious) {
worldEditMemory.lastWorkSavings.changedBlocks.push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
setTile(x, y, z, block[0], block[1]);
count++;
}
}
}
}
clientMessage(count + "개의 블럭이 변경 되었습니다");
}
},{
cmd : "cylinder",
kcmd : "원통",
params : "[반지름] [높이] [블럭]",
help: "(pos1) 해당 지역에 원기둥을 생성 합니다",
func : function(pos1, radious, height, block) {
var count=0;
worldEditMemory.lastWorkSavings.changedBlocks = new Array( );
var startPos=[pos1[0]-radious, pos1[1], pos1[2]-radious];
var width=radious*2+1;
var length=radious*2+1;
for(var x=startPos[0]; x<startPos[0]+width; x++) {
for(var y=startPos[1]; y<startPos[1]+height; y++) {
for(var z=startPos[2]; z<startPos[2]+length; z++) {
if(Math.floor(getDist([pos1[0], y, pos1[2]], [x, y, z])) == radious) {
worldEditMemory.lastWorkSavings.changedBlocks.push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
setTile(x, y, z, block[0], block[1]);
count++;
}
}
}
}
clientMessage(count + "개의 블럭이 변경 되었습니다");
}
},{
cmd : "pyramid",
kcmd : "피라미드",
params : "[높이] [블럭]",
help: "(pos1) 해당 지역에 피라미드를 생성 합니다",
func : function(pos1, height, block) {
var count=0;
worldEditMemory.lastWorkSavings.changedBlocks = new Array( );
var startPos=[pos1[0], pos1[1]+height-1, pos1[2]];
var layer=0;
for(var y=startPos[1]; y>startPos[1]-height; y--) {
layer++;
for(var x=startPos[0]-layer+1; x<startPos[0]+layer; x++) {
for(var z=startPos[2]-layer+1; z<startPos[2]+layer; z++) {
worldEditMemory.lastWorkSavings.changedBlocks.push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
setTile(x, y, z, block[0], block[1]);
count++;
}
}
}
clientMessage(count + "개의 블럭이 변경 되었습니다");
}
},{
cmd : "hpyramid",
kcmd : "빈피라미드",
params : "[높이] [블럭]",
help: "(pos1) 해당 지역에 빈 피라미드를 생성 합니다",
func : function(pos1, height, block) {
var count=0;
worldEditMemory.lastWorkSavings.changedBlocks = new Array( );
var startPos=[pos1[0], pos1[1]+height-1, pos1[2]];
var layer=0;
for(var y=startPos[1]; y>startPos[1]-height; y--) {
layer++;
for(var x=startPos[0]-layer+1; x<startPos[0]+layer; x++) {
for(var z=startPos[2]-layer+1; z<startPos[2]+layer; z++) {
if(x == startPos[0]-layer+1 || x == startPos[0] + layer - 1 || z == startPos[2]-layer+1 || z == startPos[2] + layer - 1) {
worldEditMemory.lastWorkSavings.changedBlocks.push([x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z)]);
setTile(x, y, z, block[0], block[1]);
count++;
}
}
}
}
clientMessage(count + "개의 블럭이 변경 되었습니다");
}
}];

function progressShow( ) {
windows.progressWindow = new android.widget.PopupWindow();

var progressBar = new android.widget.ProgressBar(ctx, null, android.R.attr.progressBarStyleLarge);

setWindow(windows.progressWindow, progressBar, dip2px(100), dip2px(100), new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT), false, [ctx.getWindow().getDecorView(),android.view.Gravity.CENTER | android.view.Gravity.CENTER, dip2px(0), dip2px(0)]);
}

function progressDismiss( ) {
ctx.runOnUiThread(new java.lang.Runnable({
run : function( ) {
try{
windows.progressWindow.dismiss( );
windows.progressWindow = null;
} catch(error) {
clientMessage(error);
}
}
}
));
}

function splitColon(string) {
if(string) {
var joint=string.split(":");
return [Number(joint[0]), joint[1] ? Number(joint[1]) : 0];
} else {
return [0, 0];
}
}


function procCmd(cmd) {
var words=cmd.split(' ');
for(var i=0; i<worldEditCmds.length; i++) {
if(words[0] == worldEditCmds[i].cmd || words[0] == worldEditCmds[i].kcmd) {
progressShow( );
switch(i) {
case 0 :
worldEditCmds[i].func( );
break;

case 1 :
worldEditCmds[i].func( );
break;

case 2 :
worldEditCmds[i].func(Number(words[1]), Number(words[2]), Number(words[3]));
break;

case 3 :
worldEditCmds[i].func(Number(words[1]), Number(words[2]), Number(words[3]));
break;

case 4 :
worldEditCmds[i].func( );
break;

case 5 :
worldEditCmds[i].func( );
break;

case 6 :
if(worldEditMemory.pos1[0] == null || worldEditMemory.pos2[0] == null) {
clientMessage("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, worldEditMemory.pos2);
break;

case 7 :
if(worldEditMemory.pos1[0] == null) {
clientMessage("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1);
break;

case 8 :
if(worldEditMemory.pos1[0] == null || worldEditMemory.pos2[0] == null) {
clientMessage("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, worldEditMemory.pos2, splitColon(words[1]));
break;

case 9 :
if(worldEditMemory.pos1[0] == null || worldEditMemory.pos2[0] == null) {
clientMessage("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, worldEditMemory.pos2, splitColon(words[1]), splitColon(words[2]));
break;

case 10 :
if(worldEditMemory.pos1[0] == null || worldEditMemory.pos2[0] == null) {
clientMessage("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, worldEditMemory.pos2, splitColon(words[1]));
break;

case 11 :
if(worldEditMemory.pos1[0] == null) {
clientMessage("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, Number(words[1]), splitColon(words[2]));
break;

case 12 :
if(worldEditMemory.pos1[0] == null) {
clientMessage("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, Number(words[1]), splitColon(words[2]));
break;

case 13 :
if(worldEditMemory.pos1[0] == null) {
clientMessage("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, Number(words[1]), splitColon(words[2]));
break;

case 14 :
if(worldEditMemory.pos1[0] == null) {
clientMessage("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, Number(words[1]), splitColon(words[2]));
break;

case 15 :
if(worldEditMemory.pos1[0] == null) {
clientMessage("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, Number(words[1]), splitColon(words[2]));
break;

case 16 :
if(worldEditMemory.pos1[0] == null) {
clientMessage("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, Number(words[1]), splitColon(words[2]));
break;

case 17 :
if(worldEditMemory.pos1[0] == null) {
clientMessage("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, Number(words[1]), Number(words[2]), splitColon(words[3]));
break;

case 18 :
if(worldEditMemory.pos1[0] == null) {
clientMessage("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, Number(words[1]), splitColon(words[2]));
break;

case 19 :
if(worldEditMemory.pos1[0] == null) {
clientMessage("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, Number(words[1]), splitColon(words[2]));
break;
}
progressDismiss( );
}
}
}

var serverManager={
tp : new Array( ),
give : new Array( ),
health : new Array( ),
banList : new Array( ),
nicknameBanList : new Array( ),
pvp : true,
isBanned : function(player) {
var indexOfPlayer=serverManager.banList.indexOf(player); 
if(indexOfPlayer != -1)
return true;
else
return false;
},
pardon : function(player) {
var indexOfPlayer=serverManager.banList.indexOf(player);
if(indexOfPlayer != -1)
serverManager.banList.splice(indexOfPlayer, 1);
},
gpsPlayer : null,
openGpsWindow : function( ) {
windows.gpsWindow = new android.widget.PopupWindow( );
texts.gpsText = makeTextView("", 12, android.graphics.Color.WHITE, null);
setWindow(windows.gpsWindow, texts.gpsText, dip2px(150), dip2px(62), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(100,100,100,100)), false, [ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP,dip2px(0),dip2px(87)]);
},
closeGpsWindow : function( ) {
texts.gpsText = null;
windows.gpsWindow.dismiss( );
windows.gpsWindow = null;
},
nicknameBan : function(nickname) {
var indexOfNickname=serverManager.indexOfName(nickname.toString( ));
if(indexOfNickname == -1) {
serverManager.nicknameBanList.push(nickname.toString( ));
}
},
nicknamePardon : function(nickname) {
var indexOfNickname=serverManager.indexOfName(nickname.toString( ));
if(indexOfNickname != -1)
serverManager.nicknameBanList.splice(indexOfNickname, 1);
},
indexOfName : function(nickname) {
var nicknameBanListLength=serverManager.nicknameBanList.length;
for(var i=0; i<nicknameBanListLength; i++) {
if(serverManager.nicknameBanList[i] == nickname)
return i;
}
return -1;
},
nicknameBanListToString : function( ) {
var nicknameBanListLength=serverManager.nicknameBanList.length;
var string="";
for(var i=0; i<nicknameBanListLength; i++) {
string += serverManager.nicknameBanList[i] + ","
}
return string;
},
stringToNicknameBanList : function(string) {
serverManager.nicknameBanList = new Array( );
var blocks=string.split(",");
for(var i=0; i<blocks.length-1; i++) {
serverManager.nicknameBanList.push(blocks[i]);
}
}
};

var players=new Array( );
var entities=new Array( );
var currentGameSpeed=20;

var entityInfo=[
{name: "닭", code: 10},
{name: "소", code: 11},
{name: "돼지", code: 12},
{name: "양", code: 13},
{name: "늑대", code: 14},
{name: "주민", code: 15},
{name: "버섯소", code: 16},
{name: "좀비", code: 32},
{name: "크리퍼", code: 33},
{name: "스켈레톤", code: 34},
{name: "거미", code: 35},
{name: "피그좀비", code: 36},
{name: "슬라임", code: 37},
{name: "엔더맨", code: 38},
{name: "좀벌레", code: 39},
{name: "드롭된 아이템", code: 64},
{name: "활성화된 TNT", code: 65},
{name: "떨어지는 모래", code: 66},
{name: "화살", code: 80},
{name: "눈덩이", code: 81},
{name: "달걀", code: 82},
{name: "그림", code: 83},
{name: "마인카트", code: 84}
];

var entityManager={
spawn : new Array( ),
remove : new Array( ),
getEntityAmounts : function( ) {
var entitiesLength=entities.length;
var amounts=new Array(22);
for(var i=0; i<entityInfo.length; i++) {
amounts[i] = new Object( );
amounts[i].name = entityInfo[i].name;
amounts[i].amount = 0;
for(var i2=0; i2<entitiesLength; i2++) {
if(entityInfo[i].code == Entity.getEntityTypeId(entities[i2])) {
amounts[i].amount++;
}
}
}
return amounts;
},
removeEntity : function(code) {
var entitiesLength=entities.length;
for(var i=0; i<entitiesLength; i++) {
if(code == -1) {
Entity.remove(entities[i]);
} else
if(Entity.getEntityTypeId(entities[i]) == code) {
Entity.remove(entities[i]);
}
}
}
};

function dip2px(dips){
return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function setDragable(window, view) {
ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
var viewX;
var viewY;
var screenX;
var screenY;
var longCheck=false;
view.setOnLongClickListener(new android.view.View.OnLongClickListener({ onLongClick: function(v) {
try{
longCheck = true;
return true;
}catch(e){
clientMessage(e);
}
}}));
view.setOnTouchListener(new android.view.View.OnTouchListener({ onTouch: function(v, event) {
try{
switch(event.action) {
case android.view.MotionEvent.ACTION_DOWN:
viewX = event.getX() - v.getWidth();
viewY = event.getY() - v.getHeight();
break;
case android.view.MotionEvent.ACTION_MOVE:
if(longCheck) {
screenX = ctx.getWindowManager().getDefaultDisplay().getWidth()-event.getRawX();
screenY = event.getRawY();
window.update(viewX+screenX, viewY+screenY, -2, -2, true);
}
break;
case android.view.MotionEvent.ACTION_UP:
if(longCheck) {
longCheck = false;
options.buttonX = viewX+screenX;
options.buttonY = viewY+screenY;
}
break;
}
return false;
}catch(e){
clientMessage(e);
}
}}));
}}));
}

function makePDEbutton( ) {
windows.openWindow=new android.widget.PopupWindow( );

var openButton=makeButton("PDE", new android.view.View.OnClickListener({
onClick : function(v){
main( );
windows.openWindow.dismiss( );
windows.openWindow = null;
}
}), null, false);

setWindow(windows.openWindow, openButton, -2, -2, new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT), false, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,options.buttonX,options.buttonY]);
setDragable(windows.openWindow, openButton);
}

function newLevel() {
readOptionFile( );
serverManager.stringToNicknameBanList(ModPE.readData("Ban List"));

clientMessage(col+"3"+info.name+" "+info.version+"\nMaker : "+info.maker+"\nCopyrightⓒ. All Rights Reserved");

makePDEbutton( );
}

function leaveGame( ) {
saveOptionFile( );
players = new Array( );
ModPE.saveData("Ban List", serverManager.nicknameBanListToString( ));
if(texts.coordinateText) {
texts.coordinateText = null;
worldFunctions.playerCoordinate.active = false;
}
if(texts.gpsText) {
texts.gpsText = null;
}
currentGameSpeed = 20;
ctx.runOnUiThread(new java.lang.Runnable({
run : function( ) {
try{
for(var i in windows) {
if(windows[i] != null)
windows[i].dismiss( );
}
} catch(error) {
clientMessage(error);
}
}
}
));
}

function entityAddedHook(e) {
if(Player.isPlayer(e)) {
players.push(e);
} else {
entities.push(e);
}
}

function entityRemovedHook(e) {
if(Player.isPlayer(e)) {
//players.splice(players.indexOf(e), 1);
} else {
entities.splice(entities.indexOf(e), 1);
}
}

function refreshPlayers( ) {
var playersLength=players.length;
for(var i=0; i<playersLength; i++) {
if(Entity.getX(players[i])==0 && Entity.getY(players[i])==0 && Entity.getZ(players[i])==0) {
players.splice(i, 1);
playersLength--;
i--;
}
}
}

function startDestroyBlock(x, y, z) {
if(Player.getCarriedItem( ) == 500) {
setTile(x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z));
worldEditMemory.blockSave.push({bx : x, by : y, bz : z, id : Level.getTile(x, y, z), data : Level.getData(x, y, z), delay : 0});
worldEditMemory.pos2 = [x, y, z];
clientMessage("두번째 지점이 (" + worldEditMemory.pos2 + ") 으로 설정 되었습니다");
}
}

function useItem(x, y, z, i, b, s, id, bd) {
if(i == 500) {
setTile(x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z));
worldEditMemory.pos1 = [x, y, z];
clientMessage("첫번째 지점이 (" + worldEditMemory.pos1 + ") 으로 설정 되었습니다");
}
if(worldFunctions.instantBlock.active) {
setTile(x, y, z, 0);
}
}

function attackHook(a, v) {
if(Player.isPlayer(a) && checkPlayerIndex(a) == -1) {
players.push(a);
}
if(Player.isPlayer(v) && checkPlayerIndex(v) == -1) {
players.push(v);
}
if(worldFunctions.removeEnt.active) {
Entity.remove(v);
}
if(!serverManager.pvp && Player.isPlayer(v)) {
preventDefault( );
}
}

function modTick( ) {
if(checkVer) {
checkVersion( );
checkVer = false;
}
var blockSaveLength=worldEditMemory.blockSave.length;
for(var bi=0; bi<blockSaveLength; bi++) {
if(worldEditMemory.blockSave[bi].delay==0) {
setTile(worldEditMemory.blockSave[bi].bx, worldEditMemory.blockSave[bi].by, worldEditMemory.blockSave[bi].bz, worldEditMemory.blockSave[bi].id, worldEditMemory.blockSave[bi].data);
worldEditMemory.blockSave.splice(bi, 1);
blockSaveLength--;
i--;
} else {
worldEditMemory.blockSave[bi].delay--;
}
}
var playersLength=players.length;
for(var i=0; i<playersLength; i++) {
if(serverManager.indexOfName(Player.getName(players[i])) != -1) {
movePlayerToJail(players[i]);
}
}
if(Player.canFly( ) && !worldFunctions.flying.active) {
worldFunctions.flying.active = true;
}
var i;
var spawnLength=entityManager.spawn.length;
for(i=0; i<spawnLength; i++) {
for(var i2=0; i2<entityManager.spawn[i][4]; i2++) {
Level.spawnMob(entityManager.spawn[i][1], entityManager.spawn[i][2], entityManager.spawn[i][3], entityManager.spawn[i][0]);
}
entityManager.spawn.splice(i, 1);
spawnLength--;
i--;
}
var removeLength=entityManager.remove.length;
for(i=0; i<removeLength; i++) {
entityManager.removeEntity(entityManager.remove[i]);
entityManager.remove.splice(i, 1);
removeLength--;
i--;
}
var tpLength=serverManager.tp.length;
for(i=0; i<tpLength; i++) {
movePlayer(serverManager.tp[i][0], serverManager.tp[i][1]);
serverManager.tp.splice(i, 1);
tpLength--;
i--;
}
var giveLength=serverManager.give.length;
for(i=0; i<giveLength; i++) {
Level.dropItem(Entity.getX(serverManager.give[i][0]), Entity.getY(serverManager.give[i][0]), Entity.getZ(serverManager.give[i][0]), 0, serverManager.give[i][1], serverManager.give[i][2], serverManager.give[i][3]);
serverManager.give.splice(i, 1);
giveLength--;
i--;
}
var healthLength=serverManager.health.length;
for(i=0; i<healthLength; i++) {
Entity.setHealth(serverManager.health[i][0], serverManager.health[i][1]);
if(serverManager.health[i][2])
Entity.setFireTicks(serverManager.health[i][0], 5);
serverManager.health.splice(i, 1);
healthLength--;
i--;
}
var banLength=serverManager.banList.length;
for(i=0; i<banLength; i++) {
if(checkPlayerIndex(serverManager.banList[i]) == -1) {
serverManager.banList.splice(i, 1);
banLength--;
i--;
} else {
movePlayerToJail(serverManager.banList[i]);
}
}
ctx.runOnUiThread(new java.lang.Runnable({
run : function( ) {
try{
if(texts.coordinateText)
texts.coordinateText.setText(" x : "+Entity.getX(players[0]).toFixed(5)+"\n"+" y : "+Entity.getY(players[0]).toFixed(5)+"\n"+" z : "+Entity.getZ(players[0]).toFixed(5)+"\n"+" b : " +Level.getBiomeName(Entity.getX(players[0]), Entity.getZ(players[0])));
if(texts.gpsText) {
var gpsPlayer = serverManager.gpsPlayer;
if(checkPlayerIndex(gpsPlayer) == -1) {
serverManager.closeGpsWindow( );
} else {
texts.gpsText.setText(" name : "+Player.getName(gpsPlayer)+"\n"+" x : "+(Entity.getX(gpsPlayer)-Entity.getX(players[0])).toFixed(5)+"\n"+" y : "+(Entity.getY(gpsPlayer)-Entity.getY(players[0])).toFixed(5)+"\n"+" z : "+(Entity.getZ(gpsPlayer)-Entity.getZ(players[0])).toFixed(5));
}
}
} catch(error) {
clientMessage(error);
}
}
}
));
}

function checkPlayerIndex(player) {
return players.indexOf(player);
}

function setWindow(targetWindow, contentView, width, height, drawable, focusable, location) {
targetWindow.setContentView(contentView);
targetWindow.setWidth(width);
targetWindow.setHeight(height);
targetWindow.setBackgroundDrawable(drawable);
targetWindow.setFocusable(focusable);

ctx.runOnUiThread(new java.lang.Runnable({
run : function( ) {
try{
targetWindow.showAtLocation(location[0], location[1], location[2], location[3]);
} catch(error) {
clientMessage(error);
}
}
}
));
}

function makeButton(text, onClickListener, layoutParams) {
var button=new android.widget.Button(ctx);
button.setText(text);
button.setOnClickListener(onClickListener);
if(layoutParams)
button.setLayoutParams(layoutParams);
return button;
}

function makeTextView(text, size, color, layoutParams) {
var textView=new android.widget.TextView(ctx);
textView.setText(text);
textView.setTextSize(size);
textView.setTextColor(color);
if(layoutParams)
textView.setLayoutParams(layoutParams);
return textView;
}

function makeEditText(inputType, text, hint, layoutParams) {
var editText=new android.widget.EditText(ctx);
editText.setInputType(inputType);
if(text)
editText.setText(text);
if(hint)
editText.setHint(hint);
if(layoutParams)
editText.setLayoutParams(layoutParams);
return editText;
}

function scrollAndOut(layout, targetWindow, isColorWindow){
var frameLayout = new android.widget.RelativeLayout(ctx);

var buttonParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
buttonParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
buttonParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);

var subLayout=new android.widget.LinearLayout(ctx);

var colorButton=makeButton("Colour", new android.view.View.OnClickListener({
onClick : function(v){
colorMain( );
}
}), null);

var xButton=makeButton("X", new android.view.View.OnClickListener({
onClick : function(v){
if(targetWindow) {
targetWindow.dismiss( );
if(!windows.mainWindow.isShowing( )) {
makePDEbutton( );
}
}
}
}), null);

if(!isColorWindow)
subLayout.addView(colorButton);
subLayout.addView(xButton);
subLayout.setLayoutParams(buttonParams);

var scrollParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.FILL_PARENT, android.widget.RelativeLayout.LayoutParams.FILL_PARENT);

var scrollView = new android.widget.ScrollView(ctx);
var pad = dip2px(5);
scrollView.setPadding(pad, pad, pad, pad);
scrollView.setLayoutParams(scrollParams);
scrollView.addView(layout);

frameLayout.addView(scrollView);
frameLayout.addView(subLayout);
return frameLayout;
}

function colorMain( ) {
try{
var colorMainWindow=new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("색 설정", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var ah=makeTextView("불투명도 : ", 15, android.graphics.Color.WHITE, textParams.hint);
var a=new android.widget.SeekBar(ctx);
a.setProgress(options.color[0]*100/255);
var rh=makeTextView("빨강 : ", 15, android.graphics.Color.WHITE, textParams.hint);
var r=new android.widget.SeekBar(ctx);
r.setProgress(options.color[1]*100/255);
var gh=makeTextView("초록 : ", 15, android.graphics.Color.WHITE, textParams.hint);
var g=new android.widget.SeekBar(ctx);
g.setProgress(options.color[2]*100/255);
var bh=makeTextView("파랑 : ", 15, android.graphics.Color.WHITE, textParams.hint);
var b=new android.widget.SeekBar(ctx);
b.setProgress(options.color[3]*100/255);
var ok=makeButton("적용", new android.view.View.OnClickListener({
onClick : function(v){
options.color = [
a.getProgress( )*255/100,
r.getProgress( )*255/100,
g.getProgress( )*255/100,
b.getProgress( )*255/100
];
}
}), null);

layout.addView(ah);
layout.addView(a);
layout.addView(rh);
layout.addView(r);
layout.addView(gh);
layout.addView(g);
layout.addView(bh);
layout.addView(b);
layout.addView(ok);

var mainLayout=scrollAndOut(layout, colorMainWindow, true);

setWindow(colorMainWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function main( ) {
try{
windows.mainWindow=new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("Pandong\nEditor", 27, android.graphics.Color.YELLOW, textParams.title);
layout.addView(title);

var maker=makeTextView("made by Pandong", 12, android.graphics.Color.WHITE, textParams.maker);
layout.addView(maker);

var item=makeButton("아이템", new android.view.View.OnClickListener({
onClick : function(v){
Level.getGameMode( ) ? itemMenu1(null, null, Level.getGameMode( ), true) : itemMain(0, null);
}
}), null);
layout.addView(item);

var world=makeButton("월드", new android.view.View.OnClickListener({
onClick : function(v){
worldMain( );
}
}), null);
layout.addView(world);

var entity=makeButton("엔티티", new android.view.View.OnClickListener({
onClick : function(v){
entityMain( );
}
}), null);
layout.addView(entity);

var worldEdit=makeButton("지형", new android.view.View.OnClickListener({
onClick : function(v){
worldEditMain( );
}
}), null);
layout.addView(worldEdit);

var server=makeButton("서버", new android.view.View.OnClickListener({
onClick : function(v){
serverMain( );
}
}), null);
layout.addView(server);

var versionCheck=makeButton("최신버전확인", new android.view.View.OnClickListener({
onClick : function(v){
checkVer = true;
}
}), null);
layout.addView(versionCheck);

var mainLayout=scrollAndOut(layout, windows.mainWindow, false);

setWindow(windows.mainWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), false, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function itemMain(server, player) {
var itemMainWindow=new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView(server ? "주기" : "아이템 추가", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var itemIdHint=makeTextView("아이템 ID :", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(itemIdHint);

var itemId=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER, "0", null, null);
layout.addView(itemId);

var itemDataHint=makeTextView("아이템 데미지 :", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(itemDataHint);

var itemData=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER, "0", null, null);
layout.addView(itemData);

var find=makeButton("찾아보기", new android.view.View.OnClickListener({
onClick : function(v){
itemMenu1(itemId, itemData, Level.getGameMode( ), true, server);
}
}), null);
layout.addView(find);

var itemAmountHint=makeTextView("수량 :", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(itemAmountHint);

var itemAmount=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER, "1", null, null);
layout.addView(itemAmount);

var fillSlot=makeButton("슬롯채우기(64개)", new android.view.View.OnClickListener({
onClick : function(v){
itemAmount.setText("64");
}
}), null);
layout.addView(fillSlot);

var Ok=makeButton("확인", new android.view.View.OnClickListener({
onClick : function(v){
if(!server) {
addItemInventory(itemId.getText( ), itemAmount.getText( ), itemData.getText( ));
itemMainWindow.dismiss( );
} else
if(server == 1){
serverManager.give.push([player, itemId.getText( ), itemAmount.getText( ), itemData.getText( )]);
} else
if(server == 2){
for(var i=0; i<players.length; i++) {
serverManager.give.push([players[i], itemId.getText( ), itemAmount.getText( ), itemData.getText( )]);
}
}
}
}), null);
layout.addView(Ok);

if(!server) {
var removeItem=makeButton("들고있는아이템제거", new android.view.View.OnClickListener({
onClick : function(v){
Entity.setCarriedItem(players[0], 0, 0, 0);
itemMainWindow.dismiss( );
}
}), null);
layout.addView(removeItem);
}

var mainLayout=scrollAndOut(layout, itemMainWindow, false);

setWindow(itemMainWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
}

function addCategoryButton(name, list, layout, window1, editId, editData, gameMode, itemChange, server) {
layout.addView(makeButton(name, new android.view.View.OnClickListener({
onClick : function(v){
itemMenu2(name, list, window1, editId, editData, gameMode, itemChange, server);
}
}), null));
}

function makeItemButton(name, id, data, window1, window2, editId, editData, gameMode, itemChange, server) {
try{
button = makeButton(name, new android.view.View.OnClickListener({
onClick : function(v){
if(itemChange) {
if(!gameMode || server) {
editId.setText(id+"");
editData.setText(data+"");
} else {
Entity.setCarriedItem(players[0], id, 5, data);
}
window1.dismiss( );
window2.dismiss( );
} else {
clientMessage(name + "  " + id + (data ? ":" + data : ""));
}
}
}), null);
return button;
} catch(e) {
clientMessage(e);
}
}

function itemMenu1(editId, editData, gameMode, itemChange, server) {
try{
var itemMenuWindow1 = new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView(itemChange ? "찾아보기" : "블럭 정보", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

for(var i=0; i<itemArray.length; i++) {
addCategoryButton(itemArray[i][0], itemArray[i][1], layout, itemMenuWindow1, editId, editData, gameMode, itemChange, server);
}

var mainLayout=scrollAndOut(layout, itemMenuWindow1, false);

setWindow(itemMenuWindow1, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function itemMenu2(name, itemList, window1, editId, editData, gameMode, itemChange, server) {
try{
var itemMenuWindow2 = new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView(name, 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

for(var i=0; i<itemList.length; i++) {
layout.addView(makeItemButton(itemList[i].name, itemList[i].id, itemList[i].data, window1, itemMenuWindow2, editId, editData, gameMode, itemChange, server));
}

var mainLayout=scrollAndOut(layout, itemMenuWindow2, false);

setWindow(itemMenuWindow2, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function worldMain( ) {
try{
var worldMainWindow=new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var worldName=makeTextView(Level.getWorldName( ), 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(worldName);

var worldDir=makeTextView("폴더이름 : "+Level.getWorldDir( ), 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(worldDir);

var gameMode=makeTextView("게임모드 : ", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(gameMode);

var gameModeRadioGroup=new android.widget.RadioGroup(ctx);
gameModeRadioGroup.setOrientation(1);
gameModeRadioGroup.setGravity(android.view.Gravity.LEFT|android.view.Gravity.TOP);

var survivalRadioButton=new android.widget.RadioButton(ctx);
survivalRadioButton.setText("Survival");
survivalRadioButton.setId(0);
gameModeRadioGroup.addView(survivalRadioButton);

var creativeRadioButton=new android.widget.RadioButton(ctx);
creativeRadioButton.setText("Creative");
creativeRadioButton.setId(1);
gameModeRadioGroup.addView(creativeRadioButton);

gameModeRadioGroup.check(Level.getGameMode());
gameModeRadioGroup.setOnCheckedChangeListener(new android.widget.RadioGroup.OnCheckedChangeListener({
onCheckedChanged : function(group, checkedId){
Level.setGameMode(checkedId);
}
}));
layout.addView(gameModeRadioGroup);

var time=makeTextView("시간 : ", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(time);

var changeMorning=makeButton("아침으로 변경", new android.view.View.OnClickListener({
onClick : function(v){
Level.setTime(0);
}
}), null);
layout.addView(changeMorning);

var changeNight=makeButton("밤으로 변경", new android.view.View.OnClickListener({
onClick : function(v){
Level.setTime(12500);
}
}), null);
layout.addView(changeNight);

var health=makeTextView("체력 : ", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(health);

var maxHealth=makeButton("0(최소)", new android.view.View.OnClickListener({
onClick : function(v){
Entity.setHealth(players[0], 0);
}
}), null);
layout.addView(maxHealth);

var maxHealth=makeButton("20(최대)", new android.view.View.OnClickListener({
onClick : function(v){
Entity.setHealth(players[0], 20);
}
}), null);
layout.addView(maxHealth);

var infiniteHealth=makeButton("32767(반무한)", new android.view.View.OnClickListener({
onClick : function(v){
Entity.setHealth(players[0], 32767);
}
}), null);
layout.addView(infiniteHealth);

var position=makeTextView("좌표 : ", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(position);

var posParams=new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);

var x=makeTextView("x : ", 15, android.graphics.Color.WHITE, textParams.hint);

var editX=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED, Entity.getX(players[0]).toFixed(2)+"", null, posParams);

layout.addView(makeCoordInput(x, editX));

var y=makeTextView("y : ", 15, android.graphics.Color.WHITE, textParams.hint);

var editY=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED, Entity.getY(players[0]).toFixed(2)+"", null, posParams);

layout.addView(makeCoordInput(y, editY));

var z=makeTextView("z : ", 15, android.graphics.Color.WHITE, textParams.hint);

var editZ=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED, Entity.getZ(players[0]).toFixed(2)+"", null, posParams);

layout.addView(makeCoordInput(z, editZ));

var setPos=makeButton("이동", new android.view.View.OnClickListener({
onClick : function(v){
Entity.setPosition(players[0], editX.getText( ), editY.getText( ), editZ.getText( ));
}
}), null);
layout.addView(setPos);

var gameSpeed=makeTextView("게임속도 : ", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(gameSpeed);

var gameSpeedSeekBar=new android.widget.SeekBar(ctx);
gameSpeedSeekBar.setProgress(currentGameSpeed*100/(20*4));
gameSpeedSeekBar.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
onProgressChanged: function(seekbar, progress, fromUser){
ModPE.setGameSpeed(progress*20*4/100);
currentGameSpeed = progress*20*4/100;
currentGameSpeedText.setText(currentGameSpeed*5+"%");
}
}));
layout.addView(gameSpeedSeekBar);

var currentGameSpeedText=makeTextView(currentGameSpeed*5+"%", 12, android.graphics.Color.WHITE, null);
currentGameSpeedText.setGravity(android.view.Gravity.CENTER);
layout.addView(currentGameSpeedText);

for(var i in worldFunctions) {
var toggle=new android.widget.ToggleButton(ctx);
toggle.setTextOn(worldFunctions[i].functionName+" On");
toggle.setTextOff(worldFunctions[i].functionName+" Off");
toggle.setChecked(worldFunctions[i].active);
toggle.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : worldFunctions[i].checkedChangedEvent
}));
layout.addView(toggle);
}

var mainLayout=scrollAndOut(layout, worldMainWindow, false);

setWindow(worldMainWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function makeCoordInput(text, edit) {
var layout=new android.widget.LinearLayout(ctx);
layout.addView(text);
layout.addView(edit);
return layout;
}

function entityMain( ) {
try{
var entityMainWindow=new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("엔티티 관리", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var currentEntity=makeButton("현재 엔티티", new android.view.View.OnClickListener({
onClick : function(v){
currentEntityMenu( );
}
}), null);
layout.addView(currentEntity);

var spawnEntity=makeButton("엔티티 소환", new android.view.View.OnClickListener({
onClick : function(v){
spawnEntityMenu( );
}
}), null);
layout.addView(spawnEntity);

var removeEntity=makeButton("엔티티 제거", new android.view.View.OnClickListener({
onClick : function(v){
removeEntityMenu( );
}
}), null);
layout.addView(removeEntity);

var removeEntireEntity=makeButton("모든 엔티티 제거", new android.view.View.OnClickListener({
onClick : function(v){
entityManager.remove.push(-1);
}
}), null);
layout.addView(removeEntireEntity);

var mainLayout=scrollAndOut(layout, entityMainWindow, false);

setWindow(entityMainWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function currentEntityMenu( ) {
try{
var currentEntityMenuWindow=new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("현재 엔티티", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var amounts=entityManager.getEntityAmounts( );
var string="";
for(var i=0; i<amounts.length; i++) {
if(amounts[i].amount != 0) {
string += amounts[i].name + " : " + amounts[i].amount + "\n";
}
}

var entityText=makeTextView(string, 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(entityText);

var mainLayout=scrollAndOut(layout, currentEntityMenuWindow, false);

setWindow(currentEntityMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function spawnEntityMenu( ) {
try{
var spawnEntityMenuWindow=new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("엔티티 소환", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var type=makeTextView("종류 : ", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(type);

var group=makeEntityRadioGroup(true);
layout.addView(group);

var position=makeTextView("좌표 : ", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(position);

var posParams=new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);

var x=makeTextView("x : ", 15, android.graphics.Color.WHITE, textParams.hint);

var editX=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED, Entity.getX(players[0]).toFixed(2)+"", null, posParams);

layout.addView(makeCoordInput(x, editX));

var y=makeTextView("y : ", 15, android.graphics.Color.WHITE, textParams.hint);

var editY=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED, Entity.getY(players[0]).toFixed(2)+"", null, posParams);

layout.addView(makeCoordInput(y, editY));

var z=makeTextView("z : ", 15, android.graphics.Color.WHITE, textParams.hint);

var editZ=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED, Entity.getZ(players[0]).toFixed(2)+"", null, posParams);

layout.addView(makeCoordInput(z, editZ));

var amount=makeTextView("수량 : ", 15, android.graphics.Color.WHITE, textParams.hint);

var editAmount=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER, "1", null, posParams);

layout.addView(makeCoordInput(amount, editAmount));

var Ok=makeButton("확인", new android.view.View.OnClickListener({
onClick : function(v){
entityManager.spawn.push([group.getCheckedRadioButtonId( ), editX.getText( ), editY.getText( ), editZ.getText( ), editAmount.getText( )]);
}
}), null);
layout.addView(Ok);

var mainLayout=scrollAndOut(layout, spawnEntityMenuWindow, false);

setWindow(spawnEntityMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function removeEntityMenu( ) {
try{
var removeEntityMenuWindow=new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("엔티티 제거", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var type=makeTextView("종류 : ", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(type);

var group=makeEntityRadioGroup(false);
layout.addView(group);

var Ok=makeButton("확인", new android.view.View.OnClickListener({
onClick : function(v){
entityManager.remove.push(group.getCheckedRadioButtonId( ));
removeEntityMenuWindow.dismiss( );
}
}), null);
layout.addView(Ok);

var mainLayout=scrollAndOut(layout, removeEntityMenuWindow, false);

setWindow(removeEntityMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function makeEntityRadioGroup(spawnable) {
var group=new android.widget.RadioGroup(ctx);
group.setOrientation(1);
group.setGravity(android.view.Gravity.LEFT|android.view.Gravity.TOP);

for(var i=0; i<entityInfo.length; i++) {
if(spawnable) {
if(entityInfo[i].code == 64 || entityInfo[i].code == 66 || entityInfo[i].code == 83)
continue;
}
var radioButton=new android.widget.RadioButton(ctx);
radioButton.setText(entityInfo[i].name);
radioButton.setId(entityInfo[i].code);
group.addView(radioButton);
}

group.check(10);
return group;
}

function worldEditMain( ) {
try{
var worldEditMainWindow=new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("지형 수정", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var help=makeButton("도움말", new android.view.View.OnClickListener({
onClick : function(v){
worldEditHelpList( );
}
}), null);
layout.addView(help);

var command=makeButton("명령어", new android.view.View.OnClickListener({
onClick : function(v){
worldEditCommandList( );
}
}), null);
layout.addView(command);

var blockInfo=makeButton("블럭 코드", new android.view.View.OnClickListener({
onClick : function(v){
itemMenu1(null, null, null, false);
}
}), null);
layout.addView(blockInfo);

var mainLayout=scrollAndOut(layout, worldEditMainWindow, false);

setWindow(worldEditMainWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function worldEditCommandList( ) {
try{
var commandWindow=new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("명령어", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var string="";
for(var i=0; i<worldEditCmds.length; i++) {
string += "/" + worldEditCmds[i].cmd + "(" + worldEditCmds[i].kcmd + ") " + worldEditCmds[i].params + "\n: " + worldEditCmds[i].help + "\n\n";
}

var list=makeTextView(string, 12, android.graphics.Color.WHITE, textParams.hint);

layout.addView(list);

var mainLayout=scrollAndOut(layout, commandWindow, false);

setWindow(commandWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function worldEditHelpList( ) {
try{
var helpWindow=new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("명령어", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var string="";
for(var i=0; i<worldEditHelps.length; i++) {
string += worldEditHelps[i] + "\n\n";
}

var list=makeTextView(string, 12, android.graphics.Color.WHITE, textParams.hint);

layout.addView(list);

var mainLayout=scrollAndOut(layout, helpWindow, false);

setWindow(helpWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function movePlayerToJail(player) {
var snowBall=Level.spawnMob(Entity.getX(players[0]), -2, Entity.getZ(players[0]), 81);
Entity.rideAnimal(player, snowBall);
Entity.remove(snowBall);
}

function movePlayer(p1, p2) {
var snowBall=Level.spawnMob(Entity.getX(p2), Entity.getY(p2), Entity.getZ(p2), 81);
Entity.rideAnimal(p1, snowBall);
Entity.remove(snowBall);
}

function serverMain( ) {
try{
refreshPlayers( );

var serverMainWindow=new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("서버 관리", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var pvp=new android.widget.ToggleButton(ctx);
pvp.setTextOn("PvP On");
pvp.setTextOff("PvP Off");
pvp.setChecked(serverManager.pvp);
pvp.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function( ) {
serverManager.pvp = !serverManager.pvp;
}
}));
layout.addView(pvp);

var player=makeButton("플레이어", new android.view.View.OnClickListener({
onClick : function(v){
playerMenu( );
}
}), null);
layout.addView(player);

var nickname=makeButton("닉네임", new android.view.View.OnClickListener({
onClick : function(v){
nicknameMenu( );
}
}), null);
layout.addView(nickname);

var tpAll=makeButton("모두 텔레포트", new android.view.View.OnClickListener({
onClick : function(v){
for(var i=1; i<players.length; i++) {
serverManager.tp.push([players[i], players[0]]);
}
}
}), null);
layout.addView(tpAll);

var giveAll=makeButton("모두 주기", new android.view.View.OnClickListener({
onClick : function(v){
itemMain(2, null);
}
}), null);
layout.addView(giveAll);

var mainLayout=scrollAndOut(layout, serverMainWindow, false);

setWindow(serverMainWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function makePlayerButton(ent, name) {
var button=makeButton("name : "+name+"\n"+"x : "+Entity.getX(ent).toFixed(1)+"\n"+"y : "+Entity.getY(ent).toFixed(1)+"\n"+"z : "+Entity.getZ(ent).toFixed(1), new android.view.View.OnClickListener({
onClick : function(v){
playerFunctionMenu(ent, name);
}
}), null);
return button;
}

function playerMenu( ) {
try{
var playerMenuWindow = new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("플레이어", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

for(var i=0; i<players.length; i++) {
layout.addView(makePlayerButton(players[i], Player.getName(players[i])));
}

var mainLayout=scrollAndOut(layout, playerMenuWindow, false);

setWindow(playerMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function playerFunctionMenu(ent, name) {
try{
var playerFunctionMenuWindow = new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView(name, 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var tp=makeButton("텔레포트", new android.view.View.OnClickListener({
onClick : function(v){
playerSelectionMenu(ent);
}
}), null);
layout.addView(tp);

var give=makeButton("주기", new android.view.View.OnClickListener({
onClick : function(v){
itemMain(1, ent);
}
}), null);
layout.addView(give);

var health=makeButton("체력", new android.view.View.OnClickListener({
onClick : function(v){
healthMenu(ent);
}
}), null);
layout.addView(health);

var gps=makeButton("찾기", new android.view.View.OnClickListener({
onClick : function(v){
if(windows.gpsWindow) {
serverManager.closeGpsWindow( );
} else
if(windows.gpsWindow) {
serverManager.gpsPlayer = ent;
} else {
serverManager.gpsPlayer = ent;
serverManager.openGpsWindow( );
}
}
}), null);
layout.addView(gps);

var isBanned=serverManager.isBanned(ent);

var ban=makeButton(isBanned ? "밴 해제" : "밴", new android.view.View.OnClickListener({
onClick : function(v){
if(isBanned) {
isBanned = false;
serverManager.pardon(ent);
v.setText("밴");
} else {
isBanned = true;
serverManager.banList.push(ent);
v.setText("밴 해제");
}
}
}), null);
layout.addView(ban);

var mainLayout=scrollAndOut(layout, playerFunctionMenuWindow, false);

setWindow(playerFunctionMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function playerSelectionMenu(ent) {
try{
var playerSelectionMenuWindow = new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("텔레포트", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var playerRadioGroup=new android.widget.RadioGroup(ctx);
playerRadioGroup.setOrientation(1);
playerRadioGroup.setGravity(android.view.Gravity.LEFT|android.view.Gravity.TOP);

for(var i=0; i<players.length; i++) {
makePlayerRadioButton(players[i], Player.getName(players[i]), playerRadioGroup);
}

playerRadioGroup.check(players[0]);
layout.addView(playerRadioGroup);

var Ok=makeButton("확인", new android.view.View.OnClickListener({
onClick : function(v){
serverManager.tp.push([ent, playerRadioGroup.getCheckedRadioButtonId( )]);
}
}), null);
layout.addView(Ok);

var mainLayout=scrollAndOut(layout, playerSelectionMenuWindow, false);

setWindow(playerSelectionMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function healthMenu(ent) {
try{
var healthMenuWindow = new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("체력", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var health=makeTextView("체력 :", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(health);

var editHealth=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER, Entity.getHealth(ent)+"", null, null);
layout.addView(editHealth);

var fire=new android.widget.CheckBox(ctx);
fire.setText("화염");
layout.addView(fire);

var Ok=makeButton("확인", new android.view.View.OnClickListener({
onClick : function(v){
serverManager.health.push([ent, editHealth.getText( ), fire.isChecked( )]);
}
}), null);
layout.addView(Ok);

var mainLayout=scrollAndOut(layout, healthMenuWindow, false);

setWindow(healthMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function makePlayerRadioButton(ent, name, group) {
var radioButton=new android.widget.RadioButton(ctx);
radioButton.setText(name);
radioButton.setId(ent);
group.addView(radioButton);
}

function nicknameMenu( ) {
try{
var nicknameMenuWindow = new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("닉네임", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var nickname=makeTextView("닉네임 :", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(nickname);

var putNickname=makeEditText(android.text.InputType.TYPE_CLASS_TEXT, "", null, null);
layout.addView(putNickname);

var bannedNicknameList=makeButton("밴 닉네임 목록", new android.view.View.OnClickListener({
onClick : function(v){
if(serverManager.nicknameBanList.length)
nicknameSelectionMenu(putNickname);
}
}), null);
layout.addView(bannedNicknameList);

var ban=makeButton("밴", new android.view.View.OnClickListener({
onClick : function(v){
serverManager.nicknameBan(putNickname.getText( ));
}
}), null);
layout.addView(ban);

var pardon=makeButton("밴 해제", new android.view.View.OnClickListener({
onClick : function(v){
serverManager.nicknamePardon(putNickname.getText( ));
}
}), null);
layout.addView(pardon);

var mainLayout=scrollAndOut(layout, nicknameMenuWindow, false);

setWindow(nicknameMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function nicknameSelectionMenu(editText) {
try{
var nicknameSelectionMenuWindow = new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("밴 닉네임 목록", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var nicknameRadioGroup=new android.widget.RadioGroup(ctx);
nicknameRadioGroup.setOrientation(1);
nicknameRadioGroup.setGravity(android.view.Gravity.LEFT|android.view.Gravity.TOP);

for(var i=0; i<serverManager.nicknameBanList.length; i++) {
makeNicknameRadioButton(serverManager.nicknameBanList[i], nicknameRadioGroup, i);
}

nicknameRadioGroup.check(0);
layout.addView(nicknameRadioGroup);

var Ok=makeButton("확인", new android.view.View.OnClickListener({
onClick : function(v){
editText.setText(serverManager.nicknameBanList[nicknameRadioGroup.getCheckedRadioButtonId( )]);
nicknameSelectionMenuWindow.dismiss( );
}
}), null);
layout.addView(Ok);

var mainLayout=scrollAndOut(layout, nicknameSelectionMenuWindow, false);

setWindow(nicknameSelectionMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

function makeNicknameRadioButton(name, group, i) {
var radioButton=new android.widget.RadioButton(ctx);
radioButton.setText(name);
radioButton.setId(i);
group.addView(radioButton);
}



function searchItemByIdAndData(id, data) {
var end, start;
for(var i=0; i<itemArray.length; i++) {
end=itemArray[i][1].length;
start=0;
var name=binarySearch(itemArray[i][1], id, data, start, end);
if(name != -1)
return name;
}
return -1;
}

function binarySearch(arr, id, data, start, end) {
var index = Math.floor(start + ((end-start)/2));
if(id == arr[index].id) {
if(arr[index].data == data)
return arr[index].name;
var sameIds=[arr[index].name];
var index2=index;
while(index2 > 0) {
index2--;
if(arr[index2].id != id)
break;
if(arr[index2].data == data)
return arr[index2].name;
sameIds.unshift(arr[index2].name);
}
index2 = index;
while(index2 < (end - 1)) {
index2++;
if(arr[index2].id != id)
break;
if(arr[index2].data == data)
return arr[index2].name;
sameIds.push(arr[index2].name);
}
return sameIds[0];
} else {
if((end - start) == 1) {
return -1;
}
if(id > arr[index].id) {
start = index;
return binarySearch(arr, id, data, start, end);
} else
if(id < arr[index].id) {
end = index;
return binarySearch(arr, id, data, start, end);
}
}
}