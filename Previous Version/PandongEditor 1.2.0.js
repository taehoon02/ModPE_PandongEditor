/*
원작 : Pandong(joseph1999@naver.com)
수정 : Irenebode(kth020315@naver.com)
도와주신분들 : Indvel & Dark Tornado & Yongwon & SY PlanP & Scripter & 0isback

※수정 및 공유가 허용되어 수정후 공유합니다.※
http://blog.naver.com/joseph1999/220493387620

ⓒ 2015-2016 Pandong & Irenebode All rights reserved.
*/

ModPE.setItem(500, "axe", 0, "Wand");

var bx = 0;
var by = 0;
var bz = 0;
var sc = sendChat;
var cm = clientMessage;
var terer = false;

var info={
name : "Pandong Editor",
version : "1.2.0",
maker : "Pandong"
};

var col="§";
var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
var tttt = new Array();
var t = {x : [], y : [], z : [], s : [], t : 0};
var alert = true;
info.editor = "Irenebode";
var noEnt = false;
var pass = false;
var timeLock = false;
var timeLockData = null;

var forder1 = new java.io.File(sdcard+"/Pandong/");
var forder2 = new java.io.File(sdcard+"/Pandong/Irenebode/");
var forder3 = new java.io.File(sdcard+"/Pandong/Irenebode/PandongEditor/");
forder1.mkdir();
forder2.mkdir();
forder3.mkdir();

function sendChat(message) {
var name = Player.getName(getPlayerEnt());
Entity.setNameTag(getPlayerEnt(),"");
net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSendChat(message);
Entity.setNameTag(getPlayerEnt(),name);
}

function toast(msg){
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
var toast = android.widget.Toast.makeText(ctx, "<PDE> "+msg, android.widget.Toast.LENGTH_LONG);
toast.show();
}
}));
}

function saveData(name, msg){
try{
var file = new java.io.File(sdcard+"/Pandong/Irenebode/PandongEditor/"+name+".txt");
var fos = new java.io.FileOutputStream(file);
var str = new java.lang.String(msg);
fos.write(str.getBytes());
fos.close();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}

function readData(name){
try{
var file = new java.io.File(sdcard+"/Pandong/Irenebode/PandongEditor/"+name+".txt");
if(!(file.exists())) return "";
var fis = new java.io.FileInputStream(file);
var isr = new java.io.InputStreamReader(fis);
var br = new java.io.BufferedReader(isr);
var str = br.readLine();
var line = "";
while((line = br.readLine()) != null){
str += "\n" + line;
}
fis.close();
isr.close();
br.close();
return str;
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}

if(readData("theme")=="true") ctx.setTheme(android.R.style.Theme_Holo_NoActionBar_Fullscreen);

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
var content=readFile("/sdcard" + root + "options.txt");
if(content) {
options.toOptions(content);
}
}

function saveOptionFile( ) {
fileOutput("/sdcard" + root + "options.txt", options.toString( ));
}

function readFile(path) {
try {
	
var file = new java.io.File(path);
if(!(file.exists())) return "";

var fis = new java.io.FileInputStream(file);
var isr = new java.io.InputStreamReader(fis);
var br = new java.io.BufferedReader(isr);

var str = br.readLine();

var read = "";

while((read = br.readLine()) != null) str += "\n" + read;

fis.close();
isr.close();
br.close();

return str;

}catch(error) {
print("error : " + error);
}
}

function fileOutput(path, message) {
try {
var file = new java.io.File(path);
if(file.exists()) file.delete();
var stream = new java.io.FileOutputStream(file);
var string = new java.lang.String(message);

stream.write(string.getBytes());
stream.close();
}catch(error) {
print("error : " + error);
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
functionName : "비행",
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
cmd : "/wand",
kcmd : "/지팡이",
params : "",
help : "좌표설정 도구를 지급합니다",
func : function( ) {
Level.getGameMode( ) ? Entity.setCarriedItem(players[0], 500, 5, 0) : addItemInventory(500, 1, 0);
}
},{
cmd : "/long",
kcmd : "/원거리",
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
cmd : "/pos1",
kcmd : "/좌표1",
params : "[x] [y] [z]",
help: "첫번째 지점 좌표를 설정합니다",
func : function(x, y, z) {
worldEditMemory.pos1 = [x, y, z];
clientMessage("첫번째 지점이 (" + worldEditMemory.pos1 + ") 으로 설정 되었습니다");
}
},{
cmd : "/pos2",
kcmd : "/좌표2",
params : "[x] [y] [z]",
help: "두번째 지점 좌표를 설정합니다",
func : function(x, y, z) {
worldEditMemory.pos2 = [x, y, z];
clientMessage("두번째 지점이 (" + worldEditMemory.pos2 + ") 으로 설정 되었습니다");
}
},{
cmd : "/undo",
kcmd : "/되돌리기",
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
cmd : "/redo",
kcmd : "/다시하기",
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
cmd : "/copy",
kcmd : "/복사",
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
cmd : "/paste",
kcmd : "/붙여넣기",
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
cmd : "/set",
kcmd : "/채우기",
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
cmd : "/replace",
kcmd : "/교체",
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
cmd : "/walls",
kcmd : "/벽",
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
cmd : "/circle",
kcmd : "/원",
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
cmd : "/hcircle",
kcmd : "/빈원",
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
cmd : "/sphere",
kcmd : "/구",
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
cmd : "/hsphere",
kcmd : "/빈구",
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
cmd : "/hemisphere",
kcmd : "/반구",
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
cmd : "/hhemisphere",
kcmd : "/빈반구",
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
cmd : "/cylinder",
kcmd : "/원통",
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
cmd : "/pyramid",
kcmd : "/피라미드",
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
cmd : "/hpyramid",
kcmd : "/빈피라미드",
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
effect : new Array( ),
removeEffect : new Array( ),
removeAllEffects : new Array( ),
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
{name:"닭", code:10},
{name:"소", code:11},
{name:"돼지", code:12},
{name:"양", code:13},
{name:"늑대", code:14},
{name:"주민", code:15},
{name:"버섯소", code:16},
{name:"오징어", code:17},
{name:"토끼", code:18},
{name:"박쥐", code:19},
{name:"철 골렘", code:20},
{name:"눈사람", code:21},
{name:"오셀롯", code:22},
{name:"좀비", code:32},
{name:"크리퍼", code:33},
{name:"스켈레톤", code:34},
{name:"거미", code:35},
{name:"피그좀비", code:36},
{name:"슬라임", code:37},
{name:"엔더맨", code:38},
{name:"좀벌레", code:39},
{name:"동굴거미", code:40},
{name:"가스트", code:41},
{name:"마그마 큐브", code:42},
{name:"블레이즈", code:43},
{name:"주민좀비", code:44},
{name:"드롭된 아이템", code:64},
{name:"활성화 된 TNT", code:65},
{name:"떨어지는 아이템", code:66},
{name:"인첸트 병", code:68},
{name:"경험치", code:69},
{name:"낚시 찌", code:77},
{name:"화살", code:80},
{name:"눈덩이", code:81},
{name:"달걀", code:82},
{name:"그림", code:83},
{name:"마인카트", code:84},
{name:"화염구", code:85},
{name:"던져진 인첸트 병", code:86},
{name:"보트", code:90},
{name:"번개", code:93},
{name:"작은 화염구", code:94}
];

var Effect = [
{name:"포화", effect:MobEffect.saturation},
{name:"흡수",effect:MobEffect.absorption},
{name:"체력신장",effect:MobEffect.healthBoost},
{name:"위더",effect:MobEffect.wither},
{name:"독",effect:MobEffect.poison},
{name:"나약함",effect:MobEffect.weakness},
{name:"허기",effect:MobEffect.hunger},
{name:"야간투시",effect:MobEffect.nightVision},
{name:"실명",effect:MobEffect.blindness},
{name:"투명화",effect:MobEffect.invisibility},
{name:"수중호흡",effect:MobEffect.waterBreathing},
{name:"화염저항",effect:MobEffect.fireResistance},
{name:"저항",effect:MobEffect.damageResistance},
{name:"재생",effect:MobEffect.regeneration},
{name:"멀미",effect:MobEffect.confusion},
{name:"점프강화",effect:MobEffect.jump},
{name:"즉시데미지",effect:MobEffect.harm},
{name:"즉시회복",effect:MobEffect.heal},
{name:"힘",effect:MobEffect.damageBoost},
{name:"피로",effect:MobEffect.digSlowdown},
{name:"성급함",effect:MobEffect.digSpeed},
{name:"구속",effect:MobEffect.movementSlowdown},
{name:"신속",effect:MobEffect.movementSpeed}
];

Effect = Effect.sort(function(a, b){
return a.effect - b.effect;
});

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

clientMessage(col+"3"+info.name+" "+info.version+"\nMaker : "+info.maker+", Editor : "+info.editor+"\n© "+info.maker+" & "+info.editor+" All Rights Reserved.");

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

Array.prototype.ind = function(str) {
for(i in this) {
if(str.toString().equals(this[i].toString())) {
return i;
}
}
return -1;
}

function entityAddedHook(e) {
if(Player.isPlayer(e) && players.ind(e) == -1) {
players.push(e);} else {
entities.push(e);
}
if(noEnt&&!Player.isPlayer(e)&&Entity.getEntityTypeId(e)!=83){
Entity.remove(e);
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
if(terer==true) {
if(i==46) {
sc("§a[PDE] §6"+Player.getName(getPlayerEnt())+"§b님이 §cTNT§b로 테러를 시도하여 킥하였습니다.");
preventDefault( );
Entity.remove(getPlayerEnt());
}
if(i==259 && b!=49) {
sc("§a[PDE] §6"+Player.getName(getPlayerEnt())+"§b님이 §c라이터§b으로 테러를 시도하여 킥하였습니다.");
preventDefault( );
Entity.remove(getPlayerEnt());
}
if(i==8) {
sc("§a[PDE] §6"+Player.getName(getPlayerEnt())+"§b님이 §c물§b로 테러를 시도하여 킥하였습니다.");
preventDefault( );
Entity.remove(getPlayerEnt());
}
if(i==9) {
sc("§a[PDE] §6"+Player.getName(getPlayerEnt())+"§b님이 §c물§b로 테러를 시도하여 킥하였습니다.");
preventDefault( );
Entity.remove(getPlayerEnt());
}
if(i==10) {
sc("§a[PDE] §6"+Player.getName(getPlayerEnt())+"§b님이 §c용암§b으로 테러를 시도하여 킥하였습니다.");
preventDefault( );
Entity.remove(getPlayerEnt());
}
if(i==11) {
sc("§a[PDE] §6"+Player.getName(getPlayerEnt())+"§b님이 §c용암§b으로 테러를 시도하여 킥하였습니다.");
preventDefault( );
Entity.remove(getPlayerEnt());
}
if(i==325 && id==8) {
sc("§a[PDE] §6"+Player.getName(getPlayerEnt())+"§b님이 §c물§b로 테러를 시도하여 킥하였습니다.");
preventDefault( );
Entity.remove(getPlayerEnt());
}
if(i==325 && id==10) {
sc("§a[PDE] §6"+Player.getName(getPlayerEnt())+"§b님이 §c용암§b으로 테러를 시도하여 킥하였습니다.");
preventDefault( );
Entity.remove(getPlayerEnt());
}
if(i==95) {
sc("§a[PDE] §6"+Player.getName(getPlayerEnt())+"§b님이 §c보이지않는베드락§b으로 테러를 시도하여 킥하였습니다.");
preventDefault( );
Entity.remove(getPlayerEnt());
}
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
var arr = serverManager;
if(checkVer) {
checkVersion( );
checkVer = false;
}
var blockSaveLength=worldEditMemory.blockSave.length;
for(var bi=0; bi<blockSaveLength; bi++) {
if(worldEditMemory.blockSave[bi].delay==0) {
setTile(worldEditMemory.blockSave[bi].bx, worldEditMemory.blockSave[bi].by, worldEditMemory.blockSave[bi].bz, worldEditMemory.blockSave[bi].id, worldEditMemory.blockSave[bi].data);worldEditMemory.blockSave.splice(bi, 1);
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
entityManager.spawn.splice(i, 1);spawnLength--;
i--;
}
var removeLength=entityManager.remove.length;for(i=0; 
i<removeLength; i++) {
entityManager.removeEntity(entityManager.remove[i]);
entityManager.remove.splice(i, 1);removeLength--;
i--;
}
var tpLength=serverManager.tp.length;
for(i=0; i<tpLength; i++) {
movePlayer(serverManager.tp[i][0], serverManager.tp[i][1]);
serverManager.tp.splice(i, 1);tpLength--;
i--;
}
var effectLength=serverManager.effect.length;
for(i=0; i<effectLength; i++) {
var ef = serverManager.effect[i];Entity.removeEffect(ef.ent, ef.effect);
Entity.addEffect(ef.ent, ef.effect, ef.time*20, ef.level, false, true);
serverManager.effect.splice(i, 1);effectLength--;
i--;
}
var removeEffectLength=serverManager.removeEffect.length;
for(i=0; i<removeEffectLength; i++) {
var ef = serverManager.removeEffect[i];
Entity.removeEffect(ef.ent, ef.effect);
serverManager.removeEffect.splice(i, 1);
removeEffectLength--;
i--;
}
var removeAllEffectsLength=serverManager.removeAllEffects.length;
for(i=0; i<removeAllEffectsLength; i++) {
var ef = serverManager.removeAllEffects[i];
Entity.removeAllEffects(ef);
serverManager.removeAllEffects.splice(i, 1);
removeAllEffectsLength--;
i--;
}
var giveLength=serverManager.give.length;
for(i=0; i<giveLength; i++) {
Level.dropItem(Entity.getX(serverManager.give[i][0]), Entity.getY(serverManager.give[i][0]), Entity.getZ(serverManager.give[i][0]), 0, serverManager.give[i][1], serverManager.give[i][2], serverManager.give[i][3]);
serverManager.give.splice(i, 1);giveLength--;
i--;
}
var healthLength=serverManager.health.length;
for(i=0; i<healthLength; i++) {
Entity.setHealth(serverManager.health[i][0], serverManager.health[i][1]);
if(serverManager.health[i][2])Entity.setFireTicks(serverManager.health[i][0], 5);
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
if(texts.coordinateText)texts.coordinateText.setText(" x : "+Entity.getX(players[0]).toFixed(5)+"\n"+" y : "+Entity.getY(players[0]).toFixed(5)+"\n"+" z : "+Entity.getZ(players[0]).toFixed(5)+"\n"+" b : " +Level.getBiomeName(Entity.getX(players[0]), Entity.getZ(players[0])));
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

if(t.t>0){
t.t--;
}
if(t.t==1){
for(var n in t.s){
if(t.s[n]==0) setTile(t.x[n], t.y[n]-1, t.z[n], 0);
if(t.s[n]==1) setTile(t.x[n], t.y[n]+1, t.z[n], 0);
if(t.s[n]==2) setTile(t.x[n], t.y[n], t.z[n]-1, 0);
if(t.s[n]==3) setTile(t.x[n], t.y[n], t.z[n]+1, 0);
if(t.s[n]==4) setTile(t.x[n]-1, t.y[n], t.z[n], 0);
if(t.s[n]==5) setTile(t.x[n]+1, t.y[n], t.z[n], 0);
}
t.x = [];
t.y = [];
t.z = [];
t.s = [];
}
if(t.x[0]!=undefined&&t.t==0){
t.t = 3;
}
if(tttt[0]!=null){
for(var n=0;n<tttt.length;n++){
if(tttt[n].tt>0){
tttt[n].tt--;
}
if(tttt[n].tt==0){
Entity.remove(tttt[n].tp);
tttt.splice(n, 1);
}
}
}
if(timeLock) Level.setTime(timeLockData);
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

var maker=makeTextView("Made by Pandong, Edited by Irene_bode", 12, android.graphics.Color.WHITE, textParams.maker);
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
//layout.addView(versionCheck);

var els = new android.widget.Button(ctx);
els.setText("기타");
els.setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(v){
openElse();
}
});
layout.addView(els);

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

var title=makeTextView(server ? "아이템지급" : "아이템 추가", 20, android.graphics.Color.YELLOW, textParams.subtitle);
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
Level.setTime(19200);
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

var HG=makeTextView("허기 : ", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(HG);

var Hunger=makeButton("0(최소)", new android.view.View.OnClickListener({
onClick : function(v){
Player.setHunger(0);
}
}), null);
layout.addView(Hunger);

var maxHunger=makeButton("20(최대)", new android.view.View.OnClickListener({
onClick : function(v){
Player.setHunger(20);
}
}), null);
layout.addView(maxHunger);

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

var spawnspawn=makeTextView("스폰 : ", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(spawnspawn);

var spawn=makeButton("스폰 설정", new android.view.View.OnClickListener({
onClick : function(){
Level.setSpawn(Player.getX(), Player.getY(), Player.getZ());
ModPE.saveData("spawnx", Player.getX());
ModPE.saveData("spawny", Player.getY());
ModPE.saveData("spawnz", Player.getZ());
ModPE.saveData("spawn", 1);
toast("플레이어의 위치를 스폰으로 설정하였습니다.");
}
}), null);
layout.addView(spawn);

var spawntp=makeButton("스폰 이동", new android.view.View.OnClickListener({
onClick : function(){
ModPE.readData("spawn") == 1
bx = Player.getX();
by = Player.getY();
bz = Player.getZ();
back = true;
sx = ModPE.readData("spawnx");
sy = ModPE.readData("spawny");
sz = ModPE.readData("spawnz");
Entity.setPosition(Player.getEntity(), sx, sy, sz);
toast("스폰설정한 위치로 이동하였습니다.");
}
}), null);
layout.addView(spawntp);

var qwer=makeTextView("기타 : ", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(qwer);

var le = new android.widget.Button(ctx);
le.setText("레벨/경험치 설정");
le.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(v){
setLevelExp();
}
}));
layout.addView(le);
var ws = new android.widget.Button(ctx);
ws.setText("날씨 설정");
ws.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(v){
weatherSet();
}
}));
layout.addView(ws);

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
toggle.setTextOn(worldFunctions[i].functionName+" ON");
toggle.setTextOff(worldFunctions[i].functionName+" OFF");
toggle.setChecked(worldFunctions[i].active);
toggle.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : worldFunctions[i].checkedChangedEvent
}));
layout.addView(toggle);
}

var tl = new android.widget.ToggleButton(ctx);
tl.setTextOn("시간고정 ON");
tl.setTextOff("시간고정 OFF");
tl.setChecked(timeLock);
tl.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function(toggle, onoff){
timeLock =onoff;
if(onoff) timeLockData = Level.getTime();
}
}));
layout.addView(tl);

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

var noEntity = new android.widget.ToggleButton(ctx);
noEntity.setTextOn("엔티티 스폰 방지 ON");
noEntity.setTextOff("엔티티 스폰 방지 OFF");
noEntity.setChecked(noEnt);
noEntity.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function(toggle, onoff){
if(onoff) toast("플레이어와 그림은 예외입니다.");
noEnt = onoff;
}
}));
layout.addView(noEntity);

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
string += "/" + worldEditCmds[i].cmd + "(/" + worldEditCmds[i].kcmd + ") " + worldEditCmds[i].params + "\n: " + worldEditCmds[i].help + "\n\n";
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
}

function movePlayer(p1, p2) {
var snowBall=Level.spawnMob(Entity.getX(p2), Entity.getY(p2), Entity.getZ(p2), 81);
Entity.rideAnimal(p1, snowBall);
}

function serverMain( ) {
try{
refreshPlayers( );

var serverMainWindow=new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("서버관리", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var pvp=new android.widget.ToggleButton(ctx);
pvp.setTextOn("PVP ON");
pvp.setTextOff("PVP OFF");
pvp.setChecked(serverManager.pvp);
pvp.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function( ) {
serverManager.pvp = !serverManager.pvp;
}
}));
layout.addView(pvp);

var prt = new android.widget.ToggleButton(ctx);
prt.setTextOn("테러방지 ON");
prt.setTextOff("테러방지 OFF");
if(terer==true) {
prt.setChecked(true);
} else if(terer==false) {
prt.setChecked(false);
}
prt.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function( ) {
if(prt.isChecked() && terer==false) {
terer=true;
} else if(!prt.isChecked() && terer==true) {
terer=false;
}
}}));
layout.addView(prt);

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

var giveAll=makeButton("모두 아이템지급", new android.view.View.OnClickListener({
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
onClick : function(v){playerSelectionMenu(ent);
}
}), null);
layout.addView(tp);

var effect=makeButton("포션효과", new android.view.View.OnClickListener({
onClick : function(v){
effectSelectionMenu(ent);
}
}), null);
layout.addView(effect);

var give=makeButton("아이템지급", new android.view.View.OnClickListener({
onClick : function(v){
itemMain(1, ent);
}
}), null);
layout.addView(give);

var health=makeButton("체력", new android.view.View.OnClickListener({
onClick : function(v){healthMenu(ent);
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

var kick = new android.widget.Button(ctx);
kick.setText("플레이어 추방(킥)");
kick.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(v){
Entity.remove(ent);
toast(name+"(을)를 추방하였습니다.");
}
}));
layout.addView(kick);

var mainLayout=scrollAndOut(layout, playerFunctionMenuWindow, false);
setWindow(playerFunctionMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}

serverManager.parseError = function(e) {
print(e.name+" : "+e.message+" at #"+e.lineNumber);};

function makeEffectInput(text, edit) {
var layout=new android.widget.LinearLayout(ctx);
layout.addView(text);
layout.addView(edit);
return layout;
}

function effectSelectionMenu(ent) {
try{
var effectSelectionMenuWindow = new android.widget.PopupWindow( );
var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var title=makeTextView("포션효과", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);
var arr = Effect;
var radioButton = [];
for(i in arr) {
radioButton[i] = new android.widget.radioButton(ctx);
radioButton[i].setText(arr[i].name);
layout.addView(checkButton[i]);
}

var settings=makeTextView("세부설정 : ", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(settings);

var effectParams=new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);

var time=makeTextView("시간 : ", 15, android.graphics.Color.WHITE, textParams.hint);

var editTime=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED, null, null, effectParams);
layout.addView(makeEffectInput(time, editTime));

var level=makeTextView("레벨 : ", 15, android.graphics.Color.WHITE, textParams.hint);

var editLevel=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED, null, null, effectParams);
layout.addView(makeEffectInput(level, editLevel));

var Ok=makeButton("확인", new android.view.View.OnClickListener({
onClick : function(v){
if(ent == "all") {
for(var i = 0; i < players.length; i++) {
if(players[i] == getPlayerEnt()) continue;
for(u in Effect) {
if(radioButton[u].isChecked( )) {
if(Entity.getEntityTypeId(players[i]) != 63) continue;serverManager.effect.push({
ent:players[i], effect:Effect[u].effect, time:editTime.getText( ), level:editLevel.getText( )});
}
}
}
} else {
for(i in Effect) {
if(radioButton[i].isChecked( )) {
if(Entity.getEntityTypeId(ent) != 63) continue;serverManager.effect.push({
ent:ent, effect:Effect[i].effect, time:editTime.getText( ), level:editLevel.getText( )});
}
}
}
}
}), null);
layout.addView(Ok);

var del=makeButton("효과 제거", new android.view.View.OnClickListener({
onClick : function(v){
if(ent == "all") {
for(var i = 0; i < players.length; i++) {
if(players[i] == getPlayerEnt()) continue;
for(u in Effect) {
if(radioButton[u].isChecked( )) {
if(Entity.getEntityTypeId(players[i]) != 63) continue;
serverManager.removeEffect.push({ent:players[i], effect:Effect[u].effect});
}
}
}
} else {
for(u in Effect) {
if(radioButton[u].isChecked( )) {
if(Entity.getEntityTypeId(ent) != 63) continue;serverManager.removeEffect.push({
ent:ent, effect:Effect[u].effect});
}
}
}
}
}), null);
layout.addView(del);

var allDelete=makeButton("효과 모두 제거", new android.view.View.OnClickListener({
onClick : function(v){
if(ent == "all") {
for(var i = 0; i < players.length; i++) {
if(players[i] == getPlayerEnt()) continue;
if(Entity.getEntityTypeId(players[i]) != 63) continue;
serverManager.removeAllEffects.push(players[i]);
}
} else {
if(Entity.getEntityTypeId(ent) != 63) return;
serverManager.removeAllEffects.push(ent);
}
}
}), null);
layout.addView(allDelete);

var mainLayout=scrollAndOut(layout, effectSelectionMenuWindow, false);

setWindow(effectSelectionMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
serverManager.parseError(e);
}
}

serverManager.parseError = function(e){
print(e.name+" : "+e.message+" at #"+e.lineNumber);
};

function makeEffectInput(text, edit){
var layout=new android.widget.LinearLayout(ctx);
layout.addView(text);
layout.addView(edit);
return layout;
}

function effectSelectionMenu(ent) {
try{
var effectSelectionMenuWindow = new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("포션효과", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var arr = Effect;
var radioButton = [];

for(i in arr){
radioButton[i] = new android.widget.CheckBox(ctx);
radioButton[i].setText(arr[i].name);
layout.addView(radioButton[i]);
}

var settings=makeTextView("세부설정 : ", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(settings);

var effectParams=new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);

var time=makeTextView("시간 : ", 15, android.graphics.Color.WHITE, textParams.hint);

var editTime=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED, null, null, effectParams);

layout.addView(makeEffectInput(time, editTime));

var level=makeTextView("레벨 : ", 15, android.graphics.Color.WHITE, textParams.hint);

var editLevel=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED, null, null, effectParams);

layout.addView(makeEffectInput(level, editLevel));

var Ok=makeButton("확인", new android.view.View.OnClickListener({
onClick : function(v){
if(ent == "all"){
for(var i = 0; i < players.length; i++){
if(players[i] == getPlayerEnt()) continue;
for(u in Effect){
if(radioButton[u].isChecked( )) {
if(Entity.getEntityTypeId(players[i]) != 63) continue;
serverManager.effect.push({ent:players[i], effect:Effect[u].effect, time:editTime.getText( ), level:editLevel.getText( )});
}
}
}
} else {
for(i in Effect){
if(radioButton[i].isChecked( )) {
if(Entity.getEntityTypeId(ent) != 63) continue;
serverManager.effect.push({ent:ent, effect:Effect[i].effect, time:editTime.getText( ), level:editLevel.getText( )});
}
}
}
}
}), null);
layout.addView(Ok);

var del=makeButton("효과 제거", new android.view.View.OnClickListener({
onClick : function(v){
if(ent == "all"){
for(var i = 0; i < players.length; i++){
if(players[i] == getPlayerEnt()) continue;
for(u in Effect){
if(radioButton[u].isChecked( )){
if(Entity.getEntityTypeId(players[i]) != 63) continue;
serverManager.removeEffect.push({ent:players[i], effect:Effect[u].effect});
}
}
}
} else {
for(u in Effect){
if(radioButton[u].isChecked( )){
if(Entity.getEntityTypeId(ent) != 63) continue;
serverManager.removeEffect.push({ent:ent, effect:Effect[u].effect});
}
}
}
}
}), null);
layout.addView(del);

var allDelete=makeButton("효과 모두 제거", new android.view.View.OnClickListener({
onClick : function(v){
if(ent == "all"){
for(var i = 0; i < players.length; i++){
if(players[i] == getPlayerEnt()) continue;
if(Entity.getEntityTypeId(players[i]) != 63) continue;
serverManager.removeAllEffects.push(players[i]);
}
} else {
if(Entity.getEntityTypeId(ent) != 63) return;
serverManager.removeAllEffects.push(ent);
}
}
}), null);layout.addView(allDelete);

var mainLayout=scrollAndOut(layout, effectSelectionMenuWindow, false);
setWindow(effectSelectionMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
serverManager.parseError(e);
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
var arr1 = players.filter(function(a) {
return Entity.getEntityTypeId(a) != 0;});
for(var u = 0; u < arr1.length; u++) {
makePlayerRadioButton(u, Player.getName(arr1[u]), playerRadioGroup);
}
playerRadioGroup.check(0);
layout.addView(playerRadioGroup);
var Ok=makeButton("확인", new android.view.View.OnClickListener({
onClick : function(v){
var c = playerRadioGroup.getCheckedRadioButtonId( );
serverManager.tp.push([ent, arr1[c]]);
}
}), null);
layout.addView(Ok);

var mainLayout=scrollAndOut(layout, playerSelectionMenuWindow, false);
setWindow(playerSelectionMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
clientMessage(e);
}
}
serverManager.parseError = function(e) {
print(e.name+" : "+e.message+" at #"+e.lineNumber);};
function makeEffectInput(text, edit) {
var layout=new android.widget.LinearLayout(ctx);
layout.addView(text);
layout.addView(edit);return layout;
}

function effectSelectionMenu(ent) {
try{
var effectSelectionMenuWindow = new android.widget.PopupWindow( );
var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("포션효과", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);
var checkBox = [];for(var i = 0; i < Effect.length; i++) {
checkBox[i] = new android.widget.CheckBox(ctx);
checkBox[i].setText(Effect[i].name);
layout.addView(checkBox[i]);
}
var settings=makeTextView("세부설정 : ", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(settings);
var effectParams=new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);

var time=makeTextView("시간 : ", 15, android.graphics.Color.WHITE, textParams.hint);
var editTime=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED, null, null, effectParams);
layout.addView(makeEffectInput(time, editTime));
var level=makeTextView("레벨 : ", 15, android.graphics.Color.WHITE, textParams.hint);
var editLevel=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED, null, null, effectParams);
layout.addView(makeEffectInput(level, editLevel));

var Ok=makeButton("확인", new android.view.View.OnClickListener({
onClick : function(v){
if(ent == "all") {
for(var i = 0; i < players.length; i++) {
if(players[i] == getPlayerEnt()) continue;
for(u in Effect) {
if(checkBox[u].isChecked( )) {
if(Entity.getEntityTypeId(players[i]) != 63) continue;
serverManager.effect.push({
ent:players[i], effect:Effect[u].effect, time:editTime.getText( ), level:editLevel.getText( )});
}
}
}
} else {
for(var i = 0; i < checkBox.length; i++) {
if(checkBox[i].isChecked( )) {
if(Entity.getEntityTypeId(ent) != 63) continue;
serverManager.effect.push({
ent:ent, effect:Effect[i].effect, time:editTime.getText( ), level:editLevel.getText( )});
}
}
}
}
}), null);
layout.addView(Ok);
var del=makeButton("효과 제거", new android.view.View.OnClickListener({onClick : function(v){if(ent == "all") {
for(var i = 0; i < players.length; i++) {
if(players[i] == getPlayerEnt()) continue;
for(u in Effect) {
if(checkBox[u].isChecked( )) {
if(Entity.getEntityTypeId(players[i]) != 63) continue;
serverManager.removeEffect.push(
{
ent:players[i], effect:Effect[u].effect});
}
}
}
} else {
for(var u = 0; u < checkBox.length; u++) {
if(checkBox[u].isChecked( )) {
if(Entity.getEntityTypeId(ent) != 63) continue;
serverManager.removeEffect.push({
ent:ent, effect:Effect[u].effect});
}
}
}
}
}), null);
layout.addView(del);

var allDelete=makeButton("효과 모두 제거", new android.view.View.OnClickListener({
onClick : function(v){
if(ent == "all") {
for(var i = 0; i < players.length; i++) {
if(players[i] == getPlayerEnt()) continue;
if(Entity.getEntityTypeId(players[i]) != 63) continue;
serverManager.removeAllEffects.push(players[i]);
}
} else {
if(Entity.getEntityTypeId(ent) != 63) return;
serverManager.removeAllEffects.push(ent);
}
}
}), null);
layout.addView(allDelete);

var mainLayout=scrollAndOut(layout, effectSelectionMenuWindow, false);
setWindow(effectSelectionMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
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

var bannedNicknameList=makeButton("밴 목록", new android.view.View.OnClickListener({
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

var BUILDING_BLOCKS = [
{name: "공기", id: 0, data: 0},
{name: "돌", id: 1, data: 0},
{name: "이끼 낀 돌", id: 48, data: 0},
{name: "화강암", id: 1, data: 1},
{name: "부드러운 화강암", id: 1, data: 2},
{name: "섬록암", id: 1, data: 3},
{name: "부드러운 섬록암", id: 1, data: 4},
{name: "안산암", id: 1, data: 5},
{name: "부드러운 안산암", id: 1, data: 6},
{name: "석재벽돌", id: 98, data: 0},
{name: "이끼 낀 석재벽돌", id: 98, data: 1},
{name: "금 간 석재벽돌", id: 98, data: 2},
{name: "조각된 석재벽돌", id: 98, data: 3},
{name: "잔디 블럭", id: 2, data: 0},
{name: "흙", id: 3, data: 0},
{name: "회백토", id: 243, data: 0},
{name: "균사체", id: 110, data: 0},
{name: "조약돌", id: 4, data: 0},
{name: "참나무 목재", id: 5, data: 0},
{name: "가문비나무 목재", id: 5, data: 1},
{name: "자작나무 목재", id: 5, data: 2},
{name: "정글나무 목재", id: 5, data: 3},
{name: "아카시아나무 목재", id: 5, data: 4},
{name: "짙은참나무 목재", id: 5, data: 5},
{name: "배드락", id: 7, data: 0},
{name: "보이지않는 배드락", id: 95, data: 0},
{name: "모래", id: 12, data: 0},
{name: "색모래", id: 12, data: 1},
{name: "자갈", id: 13, data: 0},
{name: "참나무", id: 17, data: 0},
{name: "가문비나무", id: 17, data: 1},
{name: "자작나무", id: 17, data: 2},
{name: "정글나무", id: 17, data: 3},
{name: "아카시아나무", id: 162, data: 0},
{name: "짙은참나무", id: 162, data: 1},
{name: "참나무 잎", id: 18, data: 0},
{name: "가문비나무 잎", id: 18, data: 1},
{name: "자작나무 잎", id: 18, data: 2},
{name: "정글나무 잎", id: 18, data: 3},
{name: "아카시아나무 잎", id: 161, data: 0},
{name: "짙은참나무 잎", id: 161, data: 1},
{name: "스펀지", id: 19, data: 0},
{name: "유리", id: 20, data: 0},
{name: "유리판", id: 102, data: 0},
{name: "사암", id: 24, data: 0},
{name: "조각된 사암", id: 24, data: 1},
{name: "부드러운 사암", id: 24, data: 2},
{name: "양털", id: 35, data: 0},
{name: "주황색 양털", id: 35, data: 1},
{name: "자홍색 양털", id: 35, data: 2},
{name: "하늘색 양털", id: 35, data: 3},
{name: "노란색 양털", id: 35, data: 4},
{name: "연두색 양털", id: 35, data: 5},
{name: "분홍색 양털", id: 35, data: 6},
{name: "회색 양털", id: 35, data: 7},
{name: "밝은회색 양털", id: 35, data: 8},
{name: "청록색 양털", id: 35, data: 9},
{name: "보라색 양털", id: 35, data: 10},
{name: "파랑색 양털", id: 35, data: 11},
{name: "갈색 양털", id: 35, data: 12},
{name: "초록색 양털", id: 35, data: 13},
{name: "빨강색 양털", id: 35, data: 14},
{name: "검은색 양털", id: 35, data: 15},
{name: "돌 반 블록", id: 44, data: 0},
{name: "사암 반 블록", id: 44, data: 1},
{name: "석재 반 블록", id: 44, data: 3},
{name: "벽돌 반 블록", id: 44, data: 4},
{name: "석재벽돌 반 블록", id: 44, data: 5},
{name: "석영 반 블록", id: 44, data: 6},
{name: "네더벽돌 반 블록", id: 44, data: 7},
{name: "참나무 목재 반 블록", id: 158, data: 0},
{name: "가문비나무 목재 반 블록", id: 158, data: 1},
{name: "자작나무 목재 반 블록", id: 158, data: 2},
{name: "정글나무 목재 반 블록", id: 158, data: 3},
{name: "아카시아나무 목재 반 블록", id: 158, data: 4},
{name: "짙은참나무 목재 반 블록", id: 158, data: 5},
{name: "벽돌", id: 45, data: 0},
{name: "책장", id: 47, data: 0},
{name: "흑요석", id: 49, data: 0},
{name: "참나무 계단", id: 53, data: 0},
{name: "가문비나무 계단", id: 134, data: 0},
{name: "자작나무 계단", id: 135, data: 0},
{name: "정글나무 계단", id: 136, data: 0},
{name: "아카시아나무 계단", id: 163, data: 0},
{name: "짙은참나무 계단", id: 164, data: 0},
{name: "석재 계단", id: 67, data: 0},
{name: "사암 계단", id: 128, data: 0},
{name: "벽돌 계단", id: 108, data: 0},
{name: "석재벽돌 계단", id: 109, data: 0},
{name: "석영 계단", id: 156, data: 0},
{name: "네더벽돌 계단", id: 114, data: 0},
{name: "네더 석영 원석", id: 153, data: 0},
{name: "상자", id: 54, data: 0},
{name: "조합대", id: 58, data: 0},
{name: "화로", id: 61, data: 0},
{name: "돌 절단기", id: 245, data: 0},
{name: "사다리", id: 65, data: 0},
{name: "눈", id: 78, data: 0},
{name: "눈블럭", id: 80, data: 0},
{name: "얼음", id: 79, data: 0},
{name: "단단한 얼음", id: 174, data: 0},
{name: "선인장", id: 81, data: 0},
{name: "점토", id: 82, data: 0},
{name: "울타리", id: 85, data: 0},
{name: "가문비나무 울타리", id: 85, data: 1},
{name: "자작나무 울타리", id: 85, data: 2},
{name: "정글나무 울타리", id: 85, data: 3},
{name: "아카시아나무 울타리", id: 85, data: 4},
{name: "짙은참나무 울타리", id: 85, data: 5},
{name: "네더벽돌 울타리", id: 113, data: 0},
{name: "울타리 문", id: 107, data: 0},
{name: "가문비나무 울타리 문", id: 183, data: 0},
{name: "자작나무 울타리 문", id: 184, data: 0},
{name: "정글나무 울타리 문", id: 185, data: 0},
{name: "아카시아나무 울타리 문", id: 186, data: 0},
{name: "짙은참나무 울타리 문", id: 187, data: 0},
{name: "다락문", id: 96, data: 0},
{name: "호박", id: 86, data: 0},
{name: "네더랙", id: 87, data: 0},
{name: "소울샌드", id: 88, data: 0},
{name: "네더벽돌 블럭", id: 112, data: 0},
{name: "발광석", id: 89, data: 0},
{name: "포탈", id: 90, data: 0},
{name: "잭오랜턴", id: 91, data: 0},
{name: "철장", id: 101, data: 0},
{name: "덩굴", id: 106, data: 0},
{name: "연꽃", id: 111, data: 0},
{name: "엔더 포탈", id: 120, data: 0},
{name: "엔드 스톤", id: 121, data: 0},
{name: "조약돌 담장", id: 139, data: 0},
{name: "이끼 낀 조약돌 담장", id: 139, data: 1},
{name: "석영 블럭", id: 155, data: 0},
{name: "조각된 석영 블럭", id: 155, data: 1},
{name: "석영 기둥 블럭", id: 155, data: 2},
{name: "굳은 점토", id: 172, data: 0},
{name: "흰색 염색된 점토", id: 159, data: 0},
{name: "주황색 염색된 점토", id: 159, data: 1},
{name: "자홍색 염색된 점토", id: 159, data: 2},
{name: "하늘색 염색된 점토", id: 159, data: 3},
{name: "노란색 염색된 점토", id: 159, data: 4},
{name: "연두색 염색된 점토", id: 159, data: 5},
{name: "분홍색 염색된 점토", id: 159, data: 6},
{name: "회색 염색된 점토", id: 159, data: 7},
{name: "밝은 회색 염색된 점토", id: 159, data: 8},
{name: "청록색 염색된 점토", id: 159, data: 9},
{name: "보라색 염색된 점토", id: 159, data: 10},
{name: "파랑색 염색된 점토", id: 159, data: 11},
{name: "갈색 염색된 점토", id: 159, data: 12},
{name: "초록색 염색된 점토", id: 159, data: 13},
{name: "빨강색 염색된 점토", id: 159, data: 14},
{name: "검은색 염색된 점토", id: 159, data: 15},
{name: "카펫", id: 171, data: 0},
{name: "주황색 카펫", id: 171, data: 1},
{name: "자홍색 카펫", id: 171, data: 2},
{name: "하늘색 카펫", id: 171, data: 3},
{name: "노란색 카펫", id: 171, data: 4},
{name: "연두색 카펫", id: 171, data: 5},
{name: "분홍색 카펫", id: 171, data: 6},
{name: "회색 카펫", id: 171, data: 7},
{name: "밝은 회색 카펫", id: 171, data: 8},
{name: "청록색 카펫", id: 171, data: 9},
{name: "보라색 카펫", id: 171, data: 10},
{name: "파랑색 카펫", id: 171, data: 11},
{name: "갈색 카펫", id: 171, data: 12},
{name: "초록색 카펫", id: 171, data: 13},
{name: "빨강색 카펫", id: 171, data: 14},
{name: "검은색 카펫", id: 171, data: 15},
{name: "건초 더미", id: 170, data: 0}
];

var MINE_ITEMS = [
{name: "토치", id: 50, data: 0},
{name: "불", id: 51, data: 0},
{name: "물", id: 8, data: 0},
{name: "멈춘 물", id: 9, data: 0},
{name: "용암", id: 10, data: 0},
{name: "멈춤 용암", id: 11, data: 0},
{name: "석탄 원석", id: 16, data: 0},
{name: "석탄", id: 263, data: 0},
{name: "목탄", id: 263, data: 1},
{name: "석탄 블럭", id: 173, data: 0},
{name: "철 원석", id: 15, data: 0},
{name: "철괴", id: 265, data: 0},
{name: "철 블럭", id: 42, data: 0},
{name: "금 원석", id: 14, data: 0},
{name: "금괴", id: 266, data: 0},
{name: "금 블럭", id: 41, data: 0},
{name: "레드스톤 원석", id: 73, data: 0},
{name: "빛나는레드스톤 원석", id: 74, data: 0},
{name: "레드스톤", id: 331, data: 0},
{name: "레드스톤 블럭", id: 152, data: 0},
{name: "청금석 원석", id: 21, data: 0},
{name: "청금석", id: 351, data: 4},
{name: "청금석 블럭", id: 22, data: 0},
{name: "다이아몬드 원석", id: 56, data: 0},
{name: "다이아몬드", id: 264, data: 0},
{name: "다이아몬드 블럭", id: 57, data: 0},
{name: "에메랄드 원석", id: 129, data: 0},
{name: "에메랄드", id: 388, data: 0},
{name: "에메랄드 블럭", id: 133, data: 0},
{name: "부싯돌", id: 318, data: 0},
{name: "네더벽돌", id: 405, data: 0},
{name: "네더벽돌 블럭", id: 112, data: 0},
{name: "석영", id: 406, data: 0},
{name: "석영 블럭", id: 155, data: 0},
{name: "조각된 석영 블럭", id: 155, data: 1},
{name: "석영 기둥 블럭", id: 155, data: 2}
];

var REDSTONE_ITEMS = [
{name: "TNT", id: 46, data: 0},
{name: "다락문", id: 96, data: 0},
{name: "철 다락문", id: 167, data: 0},
{name: "울타리 문", id: 107, data: 0},
{name: "참나무 문", id: 324, data: 0},
{name: "가문비나무 문", id: 427, data: 0},
{name: "자작나무 문", id: 428, data: 0},
{name: "정글나무 문", id: 429, data: 0},
{name: "아카시아나무 문", id: 430, data: 0},
{name: "짙은참나무 문", id: 431, data: 0},
{name: "철문", id: 330, data: 0},
{name: "덫 상자", id: 146, data: 0},
{name: "노트블럭", id: 25, data: 0},
{name: "레드스톤", id: 331, data: 0},
{name: "레드스톤 블럭", id: 152, data: 0},
{name: "레일", id: 66, data: 0},
{name: "파워레일", id: 27, data: 0},
{name: "디렉터레일", id: 28, data: 0},
{name: "활성화레일", id: 126, data: 0},
{name: "마인카트", id: 328, data: 0},
{name: "레버", id: 69, data: 0},
{name: "레드스톤 조명", id: 123, data: 0},
{name: "레드스톤 횃불", id: 76, data: 0},
{name: "나무 갑압판", id: 72, data: 0},
{name: "돌 갑압판", id: 70, data: 0},
{name: "무게 갑압판 (경형)", id: 147, data: 0},
{name: "무게 갑압판 (중형)", id: 148, data: 0},
{name: "버튼", id: 143, data: 0},
{name: "단추", id: 77, data: 0},
{name: "햇빛 감지기", id: 151, data: 0},
{name: "철사덫 갈고리", id: 131, data: 0},
{name: "실", id: 287, data: 0},
];

var EGGS_ITEMS = [
{name: "마을주민", id: 383, data: 15},
{name: "닭", id: 383, data: 10},
{name: "소", id: 383, data: 11},
{name: "돼지", id: 383, data: 12},
{name: "양", id: 383, data: 13},
{name: "늑대", id: 383, data: 14},
{name: "오셀롯", id: 383, data: 22},
{name: "토끼", id: 383, data: 18},
{name: "버섯소", id: 383, data: 16},
{name: "오징어", id: 383, data: 17},
{name: "박쥐", id: 383, data: 19},
{name: "좀비", id: 383, data: 32},
{name: "크리퍼", id: 383, data: 33},
{name: "스켈레톤", id: 383, data: 34},
{name: "거미", id: 383, data: 35},
{name: "좀비 피그맨", id: 383, data: 36},
{name: "슬라임", id: 383, data: 37},
{name: "엔더맨", id: 383, data: 38},
{name: "좀벌레", id: 383, data: 39},
{name: "동굴거미", id: 383, data: 40},
{name: "가스트", id: 383, data: 41},
{name: "마그마큐브", id: 383, data: 42},
{name: "블레이즈", id: 383, data: 43},
];

var FOOD_ITEMS = [
{name: "사과", id: 260, data: 0},
{name: "버섯 수프", id: 282, data: 0},
{name: "빵", id: 297, data: 0},
{name: "익히지 않은 돼지고기", id: 319, data: 0},
{name: "구운돼지고기", id: 320, data: 0},
{name: "케이크", id: 354, data: 0},
{name: "쿠키", id: 357, data: 0},
{name: "수박", id: 360, data: 0},
{name: "수박블럭", id: 103, data: 0},
{name: "익히지 않은 소고기", id: 363, data: 0},
{name: "스테이크", id: 364, data: 0},
{name: "익히지 않은 닭고기", id: 365, data: 0},
{name: "구운닭고기", id: 366, data: 0},
{name: "익히지 않은 토끼고기", id: 411, data: 0},
{name: "구운 토끼고기", id: 412, data: 0},
{name: "토끼 스튜", id: 413, data: 0},
{name: "당근", id: 391, data: 0},
{name: "감자", id: 392, data: 0},
{name: "구운감자", id: 393, data: 0},
{name: "독이 든 감자", id: 394, data: 0},
{name: "호박파이", id: 400, data: 0},
{name: "사탕무 수프", id: 459, data: 0},
{name: "썩은고기", id: 367, data: 0},
{name: "날 생선", id: 349, data: 0},
{name: "날 연어", id: 349, data: 1},
{name: "흰동가리", id: 349, data: 2},
{name: "복어", id: 349, data: 3},
{name: "익힌 생선", id: 350, data: 0},
{name: "익힌 연어", id: 350, data: 1},
{name: "황금 사과", id: 322, data: 0},
{name: "황금 사과", id: 466, data: 0},
{name: "황금 당근", id: 396, data: 0},
{name: "반짝이는 수박", id: 382, data: 0}
];

var INSTRUMENT_ITEMS = [
{name: "나무 삽", id: 269, data: 0},
{name: "나무 곡괭이", id: 270, data: 0},
{name: "나무 도끼", id: 271, data: 0},
{name: "나무 괭이", id: 290, data: 0},
{name: "돌 삽", id: 273, data: 0},
{name: "돌 곡괭이", id: 274, data: 0},
{name: "돌 도끼", id: 275, data: 0},
{name: "돌 괭이", id: 291, data: 0},
{name: "철 삽", id: 256, data: 0},
{name: "철 곡괭이", id: 257, data: 0},
{name: "철 도끼", id: 258, data: 0},
{name: "철 괭이", id: 292, data: 0},
{name: "금 삽", id: 284, data: 0},
{name: "금 곡괭이", id: 285, data: 0},
{name: "금 도끼", id: 286, data: 0},
{name: "금 괭이", id: 294, data: 0},
{name: "다이아 삽", id: 277, data: 0},
{name: "다이아 곡괭이", id: 278, data: 0},
{name: "다이아 도끼", id: 279, data: 0},
{name: "다이아 괭이", id: 293, data: 0},
{name: "라이터", id: 259, data: 0},
{name: "시계", id: 347, data: 0},
{name: "나침반", id: 345, data: 0},
{name: "가위", id: 359, data: 0}
];

var FIGHTING_ITEMS = [
{name: "가죽 모자", id: 298, data: 0},
{name: "가죽 튜닉", id: 299, data: 0},
{name: "가죽 바지", id: 300, data: 0},
{name: "가죽 장화", id: 301, data: 0},
{name: "사슬 투구", id: 302, data: 0},
{name: "사슬 갑옷", id: 303, data: 0},
{name: "사슬 레깅스", id: 304, data: 0},
{name: "사슬 부츠", id: 305, data: 0},
{name: "철 투구", id: 306, data: 0},
{name: "철 갑옷", id: 307, data: 0},
{name: "철 레깅스", id: 308, data: 0},
{name: "철 부츠", id: 309, data: 0},
{name: "금 투구", id: 314, data: 0},
{name: "금 갑옷", id: 315, data: 0},
{name: "금 레깅스", id: 316, data: 0},
{name: "금 부츠", id: 317, data: 0},
{name: "다이아 투구", id: 310, data: 0},
{name: "다이아 갑옷", id: 311, data: 0},
{name: "다이아 레깅스", id: 312, data: 0},
{name: "다이아 부츠", id: 313, data: 0},
{name: "나무 칼", id: 268, data: 0},
{name: "돌 칼", id: 272, data: 0},
{name: "철 칼", id: 267, data: 0},
{name: "금 칼", id: 283, data: 0},
{name: "다이아몬드 칼", id: 276, data: 0},
{name: "활", id: 261, data: 0},
{name: "화살", id: 262, data: 0}
];

var PE_ITEMS = [
{name: "양조기", id: 379, data: 0},
{name: "마그마 크림", id: 378, data: 0},
{name: "블레이즈의 막대", id: 369, data: 0},
{name: "금 조각", id: 371, data: 0},
{name: "황금 당근", id: 396, data: 0},
{name: "반짝이는 수박", id: 382, data: 0},
{name: "토끼의 발", id: 414, data: 0},
{name: "가스트의 눈물", id: 370, data: 0},
{name: "슬라임 볼", id: 341, data: 0},
{name: "블레이즈 가루", id: 377, data: 0},
{name: "네더 와트", id: 372, data: 0},
{name: "화약", id: 289, data: 0},
{name: "발광석 가루", id: 348, data: 0},
{name: "거미 눈", id: 375, data: 0},
{name: "발효된 거미 눈", ib: 376, data: 0},
{name: "유리병", id: 374, data: 0},
{name: "물병", id: 373, data: 0},
{name: "평범한 포션", id: 373, data: 1},
{name: "진한 포션", id: 373, data: 3},
{name: "이상한 포션", id: 373, data: 4},
{name: "야간투시 3분", id: 373, data: 5},
{name: "야간투시 8분", id: 373, data: 6},
{name: "투명화 3분", id: 373, data: 7},
{name: "투명화 8분", id: 373, data: 8},
{name: "점프강화 3분", id: 373, data: 9},
{name: "점프강화 8분", id: 373, data: 10},
{name: "점프강화2 1분30초", id: 373, data: 11},
{name: "화염저항 3분", id: 373, data: 12},
{name: "화염저항 8분", id: 373, data: 13},
{name: "신속 3분", id: 373, data: 14},
{name: "신속 8분", id: 373, data: 15},
{name: "신속2 1분30초", id: 373, data: 16},
{name: "구속 1분30초", id: 373, data: 17},
{name: "구속 4분", id: 373, data: 18},
{name: "수중호흡 3분", id: 373, data: 19},
{name: "수중호흡 8분", id: 373, data: 20},
{name: "즉시회복", id: 373, data: 21},
{name: "즉시회복2", id: 373, data: 22},
{name: "즉시데미지", id: 373, data: 23},
{name: "즉시데미지2", id: 373, data: 24},
{name: "독 45초", id: 373, data: 25},
{name: "독 2분", id: 373, data: 26},
{name: "독2 22초", id: 373, data: 27},
{name: "재생 45초", id: 373, data: 28},
{name: "재생 2분", id: 373, data: 29},
{name: "재생2 22초", id: 373, data: 30},
{name: "힘 3분", id: 373, data: 31},
{name: "힘 8분", id: 373, data: 32},
{name: "힘2 1분30초", id: 373, data: 33},
{name: "나약함 1분30초", id: 373, data: 34},
{name: "나약함 4분", id: 373, data: 35},
{name: "투척용 물병", id: 438, data: 0},
{name: "투척용 평범한 포션", id: 438, data: 1},
{name: "투척용 진한 포션", id: 438, data: 3},
{name: "투척용 이상한 포션", id: 438, data: 4},
{name: "투척용 야간투시 2분15초", id: 438, data: 5},
{name: "투척용 야간투시 6분", id: 438, data: 6},
{name: "투척용 투명화 2분15초", id: 438, data: 7},
{name: "투척용 투명화 6분", id: 438, data: 8},
{name: "투척용 점프강화 2분15초", id: 438, data: 9},
{name: "투척용 점프강화 6분", id: 438, data: 10},
{name: "투척용 점프강화2 1분7초", id: 438, data: 11},
{name: "투척용 화염저항 2분15초", id: 438, data: 12},
{name: "투척용 화염저항 6분", id: 438, data: 13},
{name: "투척용 신속 2분15초", id: 438, data: 14},
{name: "투척용 신속 6분", id: 438, data: 15},
{name: "투척용 신속2 1분7초", id: 438, data: 16},
{name: "투척용 구속 1분7초", id: 438, data: 17},
{name: "투척용 구속 3분", id: 438, data: 18},
{name: "투척용 수중호흡 2분15초", id: 438, data: 19},
{name: "투척용 수중호흡 6분", id: 438, data: 20},
{name: "투척용 즉시회복", id: 438, data: 21},
{name: "투척용 즉시회복2", id: 438, data: 22},
{name: "투척용 즉시데미지", id: 438, data: 23},
{name: "투척용 즉시데미지2", id: 438, data: 24},
{name: "투척용 독 33초", id: 438, data: 25},
{name: "투척용 독 1분30초", id: 438, data: 26},
{name: "투척용 독2 16초", id: 438, data: 27},
{name: "투척용 재생 33초", id: 438, data: 28},
{name: "투척용 재생 1분30초", id: 438, data: 29},
{name: "투척용 재생2 16초", id: 438, data: 30},
{name: "투척용 힘 2분15초", id: 438, data: 31},
{name: "투척용 힘 6분", id: 438, data: 32},
{name: "투척용 힘2 1분7초", id: 438, data: 33},
{name: "투척용 나약함 1분7초", id: 438, data: 34},
{name: "투척용 나약함 3분", id: 438, data: 35},
{name: "인첸트 병", id: 384, data: 0},
{name: "마법부여대", id: 116, data: 0},
{name: "모루", id: 145, data: 0},
{name: "약간 손상된 모루", id: 145, data: 1},
{name: "심각하게 손상된 모루", id: 145, data: 2},
{name: "책", id: 340, data: 0},
{name: "마법부여된 책", id: 403, data: 0},
];                     

var ETC_ITEMS = [
{name: "거미줄", id: 30, data: 0},      
{name: "잔디", id: 31, data: 1},
{name: "큰 잔디", id: 175, data: 2},
{name: "고사리", id: 31, data: 2},
{name: "큰 고사리", id: 175, data: 3},
{name: "마른 덤불", id: 32, data: 0},
{name: "민들레", id: 37, data: 0},
{name: "양귀비", id: 38, data: 0},
{name: "파란 난초", id: 38, data: 1},
{name: "파꽃", id: 38, data: 2},
{name: "푸른 삼백초", id: 38, data: 3},
{name: "빨간색 튤립", id: 38, data: 4},
{name: "주황색 튤립", id: 38, data: 5},
{name: "하얀색 튤립", id: 38, data: 6},
{name: "분홍색 튤립", id: 38, data: 7},
{name: "데이지", id: 38, data: 8},
{name: "갈색 버섯", id: 39, data: 0},
{name: "빨간 버섯", id: 40, data: 0},
{name: "해바라기", id: 175, data: 0},
{name: "라일락", id: 175, data: 1},
{name: "장미 덤불", id: 175, data: 4},
{name: "모란", id: 175, data: 5},
{name: "막대기", id: 280, data: 0},
{name: "접시", id: 281, data: 0},
{name: "실", id: 287, data: 0},
{name: "깃털", id: 288, data: 0},
{name: "씨앗", id: 295, data: 0},
{name: "밀", id: 296, data: 0},
{name: "그림", id: 321, data: 0},
{name: "표지판", id: 323, data: 0},
{name: "침대", id: 355, data: 0},
{name: "양동이", id: 325, data: 0},
{name: "물 양동이", id: 325, data: 8},
{name: "용암 양동이", id: 325, data: 10},
{name: "우유", id: 325, data: 1},
{name: "안장", id: 329, data: 0},
{name: "눈덩이", id: 332, data: 0},
{name: "참나무 보트", id: 333, data: 0},
{name: "가문비나무 보트", id: 333, data: 1},
{name: "자작나무 보트", id: 333, data: 2},
{name: "정글나무 보트", id: 333, data: 3},
{name: "아카시아나무 보트", id: 333, data: 4},
{name: "짙은참나무 보트", id: 333, data: 5},
{name: "가죽", id: 334, data: 0},
{name: "벽돌", id: 336, data: 0},
{name: "점토", id: 337, data: 0},
{name: "사탕수수", id: 338, data: 0},
{name: "종이", id: 339, data: 0},
{name: "낚시대", id: 346, data: 0},
{name: "먹물", id: 351, data: 0},
{name: "붉은장미 염료", id: 351, data: 1},
{name: "초록선인장 염료", id: 351, data: 2},
{name: "코코아콩", id: 351, data: 3},
{name: "보라색 염료", id: 351, data: 5},
{name: "청록색 염료", id: 351, data: 6},
{name: "밝은회색 염료", id: 351, data: 7},
{name: "회색 염료", id: 351, data: 8},
{name: "분홍색 염료", id: 351, data: 9},
{name: "연두색 염료", id: 351, data: 10},
{name: "노랑민들레 염료", id: 351, data: 11},
{name: "하늘색 염료", id: 351, data: 12},
{name: "자홍색 염료", id: 351, data: 13},
{name: "주황색 염료", id: 351, data: 14},
{name: "뼛가루", id: 351, data: 15},
{name: "뼈", id: 352, data: 0},
{name: "설탕", id: 353, data: 0},
{name: "호박씨", id: 361, data: 0},
{name: "수박씨", id: 362, data: 0},
{name: "화분", id: 390, data: 0},
{name: "스켈레톤머리", id: 397, data: 0},
{name: "위더머리", id: 397, data: 1},
{name: "좀비머리", id: 397, data: 2},
{name: "스티브머리", id: 397, data: 3},
{name: "크리퍼머리", id: 397, data: 4}
];

var itemArray=[
["블럭", BUILDING_BLOCKS],
["광산", MINE_ITEMS],
["레드스톤", REDSTONE_ITEMS],
["스폰알", EGGS_ITEMS],
["식료품", FOOD_ITEMS],
["도구", INSTRUMENT_ITEMS],
["전투", FIGHTING_ITEMS],
["포션/인첸트", PE_ITEMS],
["기타", ETC_ITEMS]
];

function searchItemByIdAndData(id, data) {
var end, start;
for(var i=0; i<itemArray.length; i++) {
end=itemArray[i][1].length;
start=0;
var name=binarySearch(itemArray[i][1], id, data, start, end);
if(name != -1)
return name;
}
return -1
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

function showDialog(title, msg){
ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
try{
var dialog = new android.app.AlertDialog.Builder(ctx);
dialog.setTitle(title);
dialog.setMessage(msg);
dialog.setNegativeButton("닫기", null);
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}

function openElse(){
ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
try{
var menu = new android.widget.PopupWindow( );
var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var title=makeTextView("기타", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var holo = new android.widget.Switch(ctx);
holo.setText("테마를 HOLO로 변경");
if(readData("theme")=="true") holo.setChecked(true);
else holo.setChecked(false);
holo.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function(swit, onoff){
saveData("theme", onoff);
}
}));
layout.addView(holo);

var info2 = new android.widget.Button(ctx);
info2.setText("스크립트 정보");
info2.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(v){
showDialog("스크립트 정보", "ScriptName : "+info.name+"\nScriptVersion : "+info.version+"\nMaker : "+info.maker+"\nEditer : "+info.editor+"\n\nⓒ 2015 Pandong & Irenebode All rights reserved.");
}
}));
layout.addView(info2);

var help = new android.widget.Button(ctx);
help.setText("도움말");
help.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(v){
showDialog("도움말", "아이템 : 해당아이템을 지급합니다.\n월드 : 해당 월드를 관리합니다.\n엔티티 : 엔티티를 관리합니다.\n지형 : 월드에딧 사용법을 알려줍니다.\n서버 : 서버를 관리합니다.\n기타 : 테마설정, 스크립트정보를 알 수 있습니다.\nHOLO : 이 테마는 LG G3 beat와 같은 폰들의 테마이며, 적용 시 블록런처를 다시 시작해야됩니다.");
}
}));
layout.addView(help);

var mainLayout=scrollAndOut(layout, menu, false);
setWindow(menu, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}

function setLevelExp(){
ctx.runOnUiThread(new java.lang.Runnable({
run: function() {
try{
var menu = new android.widget.PopupWindow( );
var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var title=makeTextView("레벨/경험치 설정", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var loc1 = new android.widget.TextView(ctx);
var loc2 = new android.widget.EditText(ctx);
loc1.setText("레벨 : ");
loc1.setTextSize(18);
loc2.setHint("레벨을 입력하세요...");
loc2.setText(Player.getLevel()+"");
loc2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
layout.addView(loc1);
layout.addView(loc2);
var loc3 = new android.widget.TextView(ctx);
var loc4 = new android.widget.EditText(ctx);
loc3.setText("경험치 : ");
loc3.setTextSize(18);
loc4.setHint("경험치를 입력하세요...");
loc4.setText(Player.getExp()+"");
loc4.setInputType(android.text.InputType.TYPE_CLASS_NUMBER|android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL);
layout.addView(loc3);
layout.addView(loc4);
var loc5 = new android.widget.TextView(ctx);
loc5.setText("\n경험치는 0~1 사이로 입력해주세요.\n");
loc5.setTextSize(15);
layout.addView(loc5);
var set = new android.widget.Button(ctx);
set.setText("확인");
set.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(v){
Player.setLevel(loc2.getText());
Player.setExp(loc4.getText());
toast("설정되었습니다.");
}
}));
layout.addView(set);

var mainLayout=scrollAndOut(layout, menu, false);
setWindow(menu, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
}
catch(e){
toast("블록런처의 버전이 낮아서 사용하실 수 없습니다.");
return;
clientMessage(e+", "+e.lineNumber);
}
}
}));
}

function weatherSet(){
ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
try{
var menu = new android.widget.PopupWindow( );
var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var title=makeTextView("날씨 설정", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var loc1 = new android.widget.TextView(ctx);
var loc2 = new android.widget.SeekBar(ctx);
var loc3 = new android.widget.TextView(ctx);
var loc4 = new android.widget.SeekBar(ctx);
var txt1 =  Math.round(Level.getRainLevel()*100);
var txt2 =  Math.round(Level.getLightningLevel()*100);
loc1.setText("비 강도 : "+(txt1/100));
loc1.setTextSize(18);
loc3.setText("번개 강도 : "+(txt2/100));
loc3.setTextSize(18);
loc2.setMax(100);
loc4.setMax(100);
loc2.setProgress(txt1);
loc4.setProgress(txt2);
loc2.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
onProgressChanged : function(seek){
loc1.setText("비 강도 : "+(seek.getProgress()/100));
txt1 = seek.getProgress();
}
}));
loc4.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
onProgressChanged : function(seek){
loc3.setText("번개 강도 : "+(seek.getProgress()/100));
txt2 = seek.getProgress();
}
}));
layout.addView(loc1);
layout.addView(loc2);
layout.addView(loc3);
layout.addView(loc4);

var set = new android.widget.Button(ctx);
set.setText("확인");
set.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(v){
Level.setRainLevel(txt1/100);
Level.setLightningLevel(txt2/100);
toast("설정되었습니다.");
}
}));
layout.addView(set);

var mainLayout=scrollAndOut(layout, menu, false);
setWindow(menu, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
}
catch(e){
toast("블록런처의 버전이 낮아서 사용하실 수 없습니다.");
return;
clientMessage(e+", "+e.lineNumber);
}
}
}));
}