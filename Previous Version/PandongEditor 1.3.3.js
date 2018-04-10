/*
원작 : Pandong(joseph1999@naver.com)
수정 : Irenebode(kth020315@naver.com)
도움 : Indvel & Dark Tornado

※수정 및 공유가 허용되어 수정후 공유합니다.※
http://blog.naver.com/joseph1999/220493387620

ⓒ 2015-2016 Pandong & Irenebode All rights reserved.
*/

//ModPE.setItem(500, "axe", 0, "Wand");

ModPE.langEdit("menu.copyright", "PandongEditor by Pandong & Irenebode");

var isLogined = false;

var bx = 0;
var by = 0;
var bz = 0;

var sc = sendChat;
var cm = clientMessage;
var white = android.graphics.Color.WHITE;

var tttt = new Array();
var t = {x : [], y : [], z : [], s : [], t : 0};
var noEnt = false;
var timeLock = false;
var timeLockData = null;

var nf = {tf : false, s : undefined, t : 0, x : null, y : null, z : null, v : null};
var tf = false;

var playerTarget = null;
var ad = null;

var rideEnt = false;
var entName = "";

var mtxt;
var simple = false;
var mtxt2;
var itemView = false;

var inventorySave = (ModPE.readData("INVENTORY_SAVE") != "true") ? false : true;
var playerInventoryArray = new Array(35);
var isPlayerRespawned = false;
var IS =false;

var Height = 0;
var buildH = false;
var Down = 0;
var buildD = false;
var isRoadMakerOn = false;
var roadMakePos = new Array(3);
var deltaX = 0;
var deltaY = 0;
var deltaZ = 0;
var wl = false;
var jumpTo = false;
var Tr = false;

var dt = 0;
var adTer = false;
var ad = null;
var terrorLog = "";
var terer = false;
var terror = false;
var GD = false;
var noC = false;
var antiBlock = false;
var antiL = false;
var antiPotion = false;

var wvsa = [false, true, false, false, false];
var GUIWindow;
var AntiServer = false;

var info={
name : "Pandong Editor",
version : "1.3.3",
maker : "Pandong",
editor : "Irenebode",
helper : "Indvel & Dark Tornado"
};

Level.getWorldType = function(){
var world = "오버월드";
try {
if(Player.getDimension()==1)
world = "네더월드";
} catch(e) {
//null;
}
return world;
};

function getData(x, y, z) {
if(x != undefined && y != undefined && z != undefined) {
return net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetData(x, y, z);
}
}

function setTile(x, y, z, b, blockDmg) {
if(x != undefined && y != undefined && z != undefined && b != undefined) {
if (blockDmg == undefined) 
blockDmg=0;
net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSetTile(x, y, z, b, blockDmg);
}
}

function EntityAddInLength() {
var i = Entity.getAll();
for each(var e in i) {
if(Player.isPlayer(e)) {
if(p.indexOf(Player.getName(e))==-1) {
p.push(Player.getName(e));
ent.push(e)
players.push({name:Player.getName(e),ent:e,id:Entity.getUniqueId(e)});
sc(Player.getName(e)+"님께서 들어오셨습니다")
}
}
}
}

function server_Player(ent) {
if(Entity.getEntityTypeId(ent)!= 0) {
return true;
}
return false;
}

var col="§";
var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

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

/*
function sendChat(message) {
var name = Player.getName(getPlayerEnt());
Entity.setNameTag(getPlayerEnt(), "");
net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSendChat(message);
cm(message);
Entity.setNameTag(getPlayerEnt(), name);
}
*/

function toast(msg) {
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
var toast = android.widget.Toast.makeText(ctx, "[PDE] "+msg, android.widget.Toast.LENGTH_LONG);
toast.show();
}
}));
}

function saveData(name, msg) {
try {
var file = new java.io.File(sdcard+"/Pandong/Irenebode/PandongEditor/"+name+".txt");
var fos = new java.io.FileOutputStream(file);
var str = new java.lang.String(msg);
fos.write(str.getBytes());
fos.close();
} catch(e) {
cm(e+", "+e.lineNumber);
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
while((line = br.readLine()) != null) {
str += "\n" + line;
}
fis.close();
isr.close();
br.close();
return str;
}
catch(e){
cm(e+", "+e.lineNumber);
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
var _0xe40f=["\x2F\x50\x61\x6E\x64\x6F\x6E\x67\x2F\x53\x63\x72\x69\x70\x74\x49\x6E\x66\x6F\x2E\x74\x78\x74","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x64\x72\x6F\x70\x62\x6F\x78\x2E\x63\x6F\x6D\x2F\x73\x2F\x74\x6E\x61\x7A\x68\x7A\x75\x7A\x36\x68\x6B\x65\x6C\x79\x7A\x2F\x53\x63\x72\x69\x70\x74\x49\x6E\x66\x6F\x2E\x74\x78\x74\x3F\x64\x6C\x3D\x31","\x0A\x0A","\x73\x70\x6C\x69\x74","\x6C\x65\x6E\x67\x74\x68","\x20\x3A\x20","\x0A","\x70\x75\x73\x68","\x6E\x61\x6D\x65","\x76\x65\x72\x73\x69\x6F\x6E","\x6D\x61\x6B\x65\x72","\x65\x64\x69\x74\x6F\x72","\uCD5C\uC2E0\x20\uBC84\uC804\uC785\uB2C8\uB2E4","\uC5B4\uB514\uC11C\x20\uC218\uC815\uC9C8\uC774\uC57C\x20\uC774\x20\uC30D\uB188\uC758\x20\uC0C8\uB07C\uC57C"];if(download(_0xe40f[0],_0xe40f[1])){var string=readFile(_0xe40f[0]);var blocks=string[_0xe40f[3]](_0xe40f[2]);var blocks2= new Array();var i;var name,version,maker,remaker;for(i=0;i<blocks[_0xe40f[4]];i++){name=blocks[i][_0xe40f[3]](_0xe40f[6])[0][_0xe40f[3]](_0xe40f[5])[1];version=blocks[i][_0xe40f[3]](_0xe40f[6])[1][_0xe40f[3]](_0xe40f[5])[1];maker=blocks[i][_0xe40f[3]](_0xe40f[6])[2][_0xe40f[3]](_0xe40f[5])[1];editor=blocks[i][_0xe40f[3]](_0xe40f[6])[3][_0xe40f[3]](_0xe40f[5])[1];blocks2[_0xe40f[7]]([name,version,maker,editor])};for(i=0;i<blocks2[_0xe40f[4]];i++){if(blocks2[i][0]==info[_0xe40f[8]]){if(blocks2[i][1]==info[_0xe40f[9]]&&blocks2[i][2]==info[_0xe40f[10]]&&blocks2[i][3]==info[_0xe40f[11]]){toast(_0xe40f[12])}else {if(blocks2[i][1]==info[_0xe40f[9]]){toast(_0xe40f[13])}else {popup()}}}}}
}

function popup( ) {
var textView=makeTextView("\n   최신 버전이 발견되었습니다. MCPE Korea로 이동할까요?\n   (이동)을 누르면 MCPE Korea로 이동됩니다.", 15, android.graphics.Color.WHITE, textParams.pop);
var popDialog = new android.app.AlertDialog.Builder(ctx).setTitle("알림").setView(textView);
popDialog.setPositiveButton("이동", new android.content.DialogInterface.OnClickListener({
onClick: function(dialog, which) {
try{
var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("http://cafe.naver.com/minecraftpe"));
ctx.startActivity(intent);
} catch(e) {
cm(e);
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
cm(error);
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
//toast("최신정보를 불러오지 못했습니다");
cm(e);
return false;
}
}

function downFile(url, path, fileName) {
ctx.runOnUiThread (new java.lang.Runnable ({
run : function (){
try {
var uri = new android.net.Uri.parse(url);
var request = new android.app.DownloadManager.Request(uri);
request.setTitle(fileName);
                    request.setDestinationInExternalPublicDir(path, fileName);
                    ctx.getSystemService(android.content.Context.DOWNLOAD_SERVICE).enqueue(request);
} catch(error) {
cm(e);
}
}
}));
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
} catch(error) {
toast("error : " + error);
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
toast("error : " + error);
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
cm("착지 후 해제 해주세요");
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
functionName : "터치시 블록제거",
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
"좌표설정 도구로 블록을 터치하면 첫번째 지점 좌표가 설정되고, 블록을 길게 터치하면 두번째 지점 좌표가 설정됩니다",
"명령어를 입력할 때는 대괄호를 생략해주세요",
"[블록]은 [블록아이디:블록데미지]로 입력하시면 되고, 만약 블록데미지가 0이라면 [블록아이디]로 입력하시면 됩니다",
"(pos1)는 첫번째 지점 좌표가, (pos1, pos2)는 첫번째와 두번째 지점 좌표가 필요합니다"
];

var worldEditCmds=[
{
cmd : "/wand",
kcmd : "/지팡이",
params : "",
help : "좌표설정 도구를 지급합니다",
func : function( ) {
Level.getGameMode( ) ? Entity.setCarriedItem(players[0], 271, 5, 0) : addItemInventory(271, 1, 0);
}
},{
cmd : "/long",
kcmd : "/원거리",
params : "",
help : "현재 바라보고있는 블록의 정보를 확인합니다",
func : function( ) {
var sin=-Math.sin(Entity.getYaw(players[0])/180*Math.PI);
var cos=Math.cos(Entity.getYaw(players[0])/180*Math.PI);
var psin=-Math.sin(Entity.getPitch(players[0])/180*Math.PI);
var pcos=Math.cos(Entity.getPitch(players[0])/180*Math.PI);
for(var i=0; i<271; i++) {
var lx=Math.floor(Entity.getX(players[0]) + i * sin * pcos);
var ly=Math.floor(Entity.getY(players[0]) + i * psin);
var lz=Math.floor(Entity.getZ(players[0]) + i * cos * pcos);
if(getTile(lx, ly, lz) != 0) {
id = Level.getTile(lx, ly, lz);
data = Level.getData(lx, ly, lz);
name = searchItemByIdAndData(id, data);
cm("x : " + lx + "\ny : " + ly + "\nz : " + lz + "\n" + name + "  " + id + (data ? ":" + data : ""));
break;
}
}
}
},{
cmd : "/pos1",
kcmd : "/좌표1",
params : "",
help: "첫번째 지점 좌표를 설정합니다",
func : function(x, y, z) {
worldEditMemory.pos1 = [parseInt(Player.getX()), parseInt(Player.getY())-1, parseInt(Player.getZ())];
cm("첫번째 지점이 (" + worldEditMemory.pos1 + ") 으로 설정 되었습니다");
}
},{
cmd : "/pos2",
kcmd : "/좌표2",
params : "",
help: "두번째 지점 좌표를 설정합니다",
func : function(x, y, z) {
worldEditMemory.pos2 = [parseInt(Player.getX()), parseInt(Player.getY())-1, parseInt(Player.getZ())];
cm("두번째 지점이 (" + worldEditMemory.pos2 + ") 으로 설정 되었습니다");
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
cm(count + "개의 블록이 변경 되었습니다");
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
cm(count + "개의 블록이 변경 되었습니다");
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
cm(count + "개의 블록이 복사 되었습니다");
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
cm(count + "개의 블록이 변경 되었습니다");
}
},{
cmd : "/set",
kcmd : "/채우기",
params : "[블록]",
help: "(pos1, pos2) 해당 지역을 모두 [블록]으로 채웁니다",
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
cm(count + "개의 블록이 변경 되었습니다");
}
},{
cmd : "/replace",
kcmd : "/교체",
params : "[블록] [바꿀블록]",
help: "(pos1, pos2) 해당 지역의 [블록]을 [바꿀블록]으로 바꿉니다",
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
cm(count + "개의 블록이 변경 되었습니다");
}
},{
cmd : "/walls",
kcmd : "/벽",
params : "[블록]",
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
cm(count + "개의 블록이 변경 되었습니다");
}
},{
cmd : "/circle",
kcmd : "/원",
params : "[반지름] [블록]",
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
cm(count + "개의 블록이 변경 되었습니다");
}
},{
cmd : "/hcircle",
kcmd : "/빈원",
params : "[반지름] [블록]",
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
cm(count + "개의 블록이 변경 되었습니다");
}
},{
cmd : "/sphere",
kcmd : "/구",
params : "[반지름] [블록]",
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
cm(count + "개의 블록이 변경 되었습니다");
}
},{
cmd : "/hsphere",
kcmd : "/빈구",
params : "[반지름] [블록]",
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
cm(count + "개의 블록이 변경 되었습니다");
}
},{
cmd : "/hemisphere",
kcmd : "/반구",
params : "[반지름] [블록]",
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
cm(count + "개의 블록이 변경 되었습니다");
}
},{
cmd : "/hhemisphere",
kcmd : "/빈반구",
params : "[반지름] [블록]",
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
cm(count + "개의 블록이 변경 되었습니다");
}
},{
cmd : "/cylinder",
kcmd : "/원통",
params : "[반지름] [높이] [블록]",
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
cm(count + "개의 블록이 변경 되었습니다");
}
},{
cmd : "/pyramid",
kcmd : "/피라미드",
params : "[높이] [블록]",
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
cm(count + "개의 블록이 변경 되었습니다");
}
},{
cmd : "/hpyramid",
kcmd : "/빈피라미드",
params : "[높이] [블록]",
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
cm(count + "개의 블록이 변경 되었습니다");
}
},{
cmd : "/up",
kcmd : "/높이",
params : "[거리]",
help : "(pos1) [거리]만큼 위로 이동합니다. 플레이어 발 아래에 유리 블록이 생성됩니다",
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
cm(error);
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
var c=cmd.split(" ");
if(c[0]=="/up") {
if(worldEditMemory.pos1[0] == null) {
cm("좌표를 설정 해주세요");
} else {
up(worldEditMemory.pos1[0],worldEditMemory.pos1[1],worldEditMemory.pos1[2],parseInt(c[1]));
}
}
if(c[0]=="/높이") {
if(worldEditMemory.pos1[0] == null) {
cm("좌표를 설정 해주세요");
} else {
up(worldEditMemory.pos1[0],worldEditMemory.pos1[1],worldEditMemory.pos1[2],parseInt(c[1]));
}
}
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
cm("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, worldEditMemory.pos2);
break;

case 7 :
if(worldEditMemory.pos1[0] == null) {
cm("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1);
break;

case 8 :
if(worldEditMemory.pos1[0] == null || worldEditMemory.pos2[0] == null) {
cm("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, worldEditMemory.pos2, splitColon(words[1]));
break;

case 9 :
if(worldEditMemory.pos1[0] == null || worldEditMemory.pos2[0] == null) {
cm("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, worldEditMemory.pos2, splitColon(words[1]), splitColon(words[2]));
break;

case 10 :
if(worldEditMemory.pos1[0] == null || worldEditMemory.pos2[0] == null) {
cm("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, worldEditMemory.pos2, splitColon(words[1]));
break;

case 11 :
if(worldEditMemory.pos1[0] == null) {
cm("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, Number(words[1]), splitColon(words[2]));
break;

case 12 :
if(worldEditMemory.pos1[0] == null) {
cm("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, Number(words[1]), splitColon(words[2]));
break;

case 13 :
if(worldEditMemory.pos1[0] == null) {
cm("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, Number(words[1]), splitColon(words[2]));
break;

case 14 :
if(worldEditMemory.pos1[0] == null) {
cm("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, Number(words[1]), splitColon(words[2]));
break;

case 15 :
if(worldEditMemory.pos1[0] == null) {
cm("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, Number(words[1]), splitColon(words[2]));
break;

case 16 :
if(worldEditMemory.pos1[0] == null) {
cm("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, Number(words[1]), splitColon(words[2]));
break;

case 17 :
if(worldEditMemory.pos1[0] == null) {
cm("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, Number(words[1]), Number(words[2]), splitColon(words[3]));
break;

case 18 :
if(worldEditMemory.pos1[0] == null) {
cm("좌표를 설정 해주세요");
break;
}
worldEditCmds[i].func(worldEditMemory.pos1, Number(words[1]), splitColon(words[2]));
break;

case 19 :
if(worldEditMemory.pos1[0] == null) {
cm("좌표를 설정 해주세요");
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
UUIDBanList : new Array( ),
whitelist : new Array( ),
pvp : true,



isBanned : function(player) {
var indexOfPlayer=serverManager.banList.indexOf(player); 
if(indexOfPlayer != -1) return true;
else return false;
},



checkUUID : function (player) {
	/* 
	* UUIDBanList 배열에 같은 UUID, 또는 닉네임이 있는지 살펴보는 함수입니다.
	* return :
	* true - 존재함
	* false - 존재하지 않음.
	*/
var UUIDBanList = serverManager.UUIDBanList;
var UUID = Entity.getUniqueId(getPlayerByName(player))
for(var i = 0; i <= UUIDBanList.length; i++) {
if(UUIDBanList[i].name==player||UUIDBanList[i].uuid==UUID) 
return true;
break;
}
if(i==UUIDBanList.length) return false;
},



pardon : function(player) {
var indexOfPlayer=serverManager.banList.indexOf(player);
if(indexOfPlayer != -1) 
serverManager.banList.splice(indexOfPlayer, 1);
},



pardonUUID : function (player) {
	/* 
	* UUID 밴을 pardon(취소) 시키는 함수입니다.
	* return :
	* 0 - 정상적으로 처리됨.
	* 1 - 밴 목록에 플레이어가 없음.
	*/
var UUIDBanList = serverManager.UUIDBanList;
var UUID = Entity.getUniqueId(getPlayerByName(player));
for(var i = 0; i <= UUIDBanList.length; i++) {
if(UUIDBanList[i].name==player||UUIDBanList[i].uuid==UUID) {
UUIDBanList.splice(i, 1);
return 0;
break;
}
if(i==UUIDBanList.length) {
return 1;
}
}
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



addWhitelist : function(nickname) {
var indexOfNick2=serverManager.indexOfName2(nickname.toString( ));
if(indexOfNick2 == -1) {
serverManager.whitelist.push(nickname.toString( ));
}
},



removeWhitelist : function(nickname) {
var indexOfNick2=serverManager.indexOfName2(nickname.toString( ));
if(indexOfNick2 != -1) {
serverManager.whitelist.splice(indexOfNick2, 1);
}
},



UUIDBan : function (nicknick) {
	/*
	* UUIDBan 추가 함수입니다.
	* return 0 : 정상적으로 추가되었음.
	* return 1 : 이미 추가되어있음.
	* return 2 : 존재하지 않는 플레이어임.
	*/
var UUID = Entity.getUniqueId(getPlayerByName(nicknick));
var UUIDBanList = serverManager.UUIDBanList;
if(UUID=="0") return 2;
for(var i = 0; i <= UUIDBanList.length; i++) {
if(UUIDBanList[i].name==nicknick||UUIDBanList[i].uuid==UUID) {
return 1;
break;
}
if(i==UUIDBanList.length) {
UUIDBanList.push({name: nicknick, uuid: UUID});
return 0;
}
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



indexOfName2 : function(nickname) {
var whitelistLength=serverManager.whitelist.length;
for(var i=0; i<whitelistLength; i++) {
if(serverManager.whitelist[i] == nickname)
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
},



whitelistToString : function( ) {
var whitelistLength=serverManager.whitelist.length;
var string="";
for(var i=0; i<whitelistLength; i++) {
string += serverManager.whitelist[i] + ","
}
return string;
},



stringTowhitelist : function(string) {
serverManager.whitelist = new Array( );
var blocks=string.split(",");
for(var i=0; i<blocks.length-1; i++) {
serverManager.whitelist.push(blocks[i]);
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
{name:"마녀", code:45},
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
{name:"작은 화염구", code:94},
{name:"카메라", code:95}
];

var enchantType = [
{name: "보호", code: Enchantment.PROTECTION},
{name: "화염으로부터 보호", code: Enchantment.FIRE_PROTECTION},
{name: "가벼운 착지", code: Enchantment.FEATHER_FALLING},
{name: "폭발로부터 보호", code: Enchantment.BLAST_PROTECTION},
{name: "원거리 보호", code: Enchantment.PROJECTILE_PROTECTION},
{name: "가시", code: Enchantment.THORNS},
{name: "호흡", code: Enchantment.RESPIRATION},
{name: "물갈퀴", code: Enchantment.AQUA_AFFINITY},
{name: "친수성", code: Enchantment.DEPTH_STRIDER},
{name: "날카로움", code: Enchantment.SHARPNESS},
{name: "강타", code: Enchantment.SMITE},
{name: "살충", code: Enchantment.BANE_OF_ARTHROPODS},
{name: "밀치기", code: Enchantment.KNOCKBACK},
{name: "화염", code: Enchantment.FIRE_ASPECT},
{name: "약탈", code: Enchantment.LOOTING},
{name: "섬세한 손길", code: Enchantment.SILK_TOUCH},
{name: "내구성", code: Enchantment.UNBREAKING},
{name: "효율", code: Enchantment.EFFICIENCY},
{name: "행운", code: Enchantment.FORTUNE},
{name: "힘", code: Enchantment.POWER},
{name: "때리기", code: Enchantment.PUNCH},
{name: "화염", code: Enchantment.FLAME},
{name: "무한", code: Enchantment.INFINITY},
{name: "바다의 행운", code: Enchantment.LUCK_OF_THE_SEA},
{name: "미끼", code: Enchantment.LURE}
];

var Effect=[
{name:"포화", effect:MobEffect.saturation},
{name:"흡수", effect:MobEffect.absorption},
{name:"체력신장", effect:MobEffect.healthBoost},
{name:"위더", effect:MobEffect.wither},
{name:"독", effect:MobEffect.poison},
{name:"나약함", effect:MobEffect.weakness},
{name:"허기", effect:MobEffect.hunger},
{name:"야간투시", effect:MobEffect.nightVision},
{name:"실명", effect:MobEffect.blindness},
{name:"투명화", effect:MobEffect.invisibility},
{name:"수중호흡", effect:MobEffect.waterBreathing},
{name:"화염저항", effect:MobEffect.fireResistance},
{name:"저항", effect:MobEffect.damageResistance},
{name:"재생", effect:MobEffect.regeneration},
{name:"멀미", effect:MobEffect.confusion},
{name:"점프강화", effect:MobEffect.jump},
{name:"즉시데미지", effect:MobEffect.harm},
{name:"즉시회복", effect:MobEffect.heal},
{name:"힘", effect:MobEffect.damageBoost},
{name:"피로", effect:MobEffect.digSlowdown},
{name:"성급함", effect:MobEffect.digSpeed},
{name:"구속", effect:MobEffect.movementSlowdown},
{name:"신속", effect:MobEffect.movementSpeed}
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
cm(e);
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
cm(e);
}
}}));
}}));
}

function makePDEbutton( ) {
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('E b=["\\f\\F\\e\\k\\C\\c\\k\\h\\f\\g","\\g\\c\\h\\r\\e\\d","\\G\\H\\1f","\\1e\\A\\A\\q\\p\\d\\f\\p\\d","\\j\\n\\q\\h","\\h\\c\\o\\1a\\c\\o\\o","\\u\\c\\e\\g","\\v\\c\\e\\g","\\18\\f\\x\\f\\l","\\r\\l\\j\\F\\Z\\c\\q\\o","\\h\\l\\j\\g\\j\\n\\x\\e","\\r\\e\\d\\H\\e\\q\\f\\l\\u\\c\\e\\g","\\r\\e\\d\\C\\c\\k\\h\\f\\g","\\Q\\P\\B\\N\\D","\\B\\l\\j\\v\\c\\d\\L","\\D\\K\\G","\\n\\p\\d\\d\\f\\k\\X","\\n\\p\\d\\d\\f\\k\\J"];m[b[0]]=t i[b[1]].M();E s=O(b[2],t i[b[7]][b[6]].R({S:T(a){U(V(b[3])==b[4]){W()}I{Y();m[b[0]][b[5]]();m[b[0]]=z}}}),z,w);19(m[b[0]],s,-2,-2,t i[b[9]][b[10]].1b(i[b[9]][b[8]].1c),w,[1d[b[12]]()[b[11]](),i[b[7]][b[14]][b[13]]|i[b[7]][b[14]][b[15]],y[b[16]],y[b[17]]]);1g(m[b[0]],s)',62,79,'|||||||||||_0x5ee6|x69|x74|x65|x6F|x77|x64|android|x61|x6E|x72|windows|x62|x73|x75|x63|x67|openButton|new|x56|x76|false|x6C|options|null|x33|x47|x57|x54|var|x70|x50|x44|else|x59|x4F|x79|PopupWindow|x48|makeButton|x49|x52|OnClickListener|onClick|function|if|readData|Shutdown|x58|main|x68|||||||||x43|setWindow|x6D|ColorDrawable|TRANSPARENT|ctx|x31|x45|setDragable'.split('|'),0,{}))
}

function newLevel() {
eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0 1=[];2(3()){4();5()}6{}',7,7,'var|_0xc46b|if|checkInternet|PDEdownload|NULdownload|else'.split('|'),0,{}))
dt = 76;

ctx.runOnUiThread(new java.lang.Thread(new java.lang.Runnable({
run : function (){
try {
var layout = new android.widget.LinearLayout(ctx);
mtxt=new android.widget.TextView(ctx);
mtxt.setTextColor(android.graphics.Color.WHITE);
layout.addView(mtxt);

GUIWindow = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth(), ctx.getWindowManager().getDefaultDisplay().getHeight(), false);

GUIWindow.setTouchable(false);
GUIWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
} catch (error) {
cm("error : " + error+""+error.lineNumber);
}
}
})));

ctx.runOnUiThread(new java.lang.Thread(new java.lang.Runnable({
run : function (){
try {
var layout = new android.widget.LinearLayout(ctx);
mtxt2=new android.widget.TextView(ctx);
mtxt2.setTextColor(android.graphics.Color.WHITE);
layout.addView(mtxt2);

GUIWindow2 = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth(), ctx.getWindowManager().getDefaultDisplay().getHeight(), false);

GUIWindow2.setTouchable(false);
GUIWindow2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
} catch (error) {
cm("error : " + error+""+error.lineNumber);
}
}
})));

readOptionFile( );
serverManager.stringToNicknameBanList(ModPE.readData("Ban List"));
serverManager.stringTowhitelist(ModPE.readData("whitelist"));

cm(col+"3"+info.name+" "+info.version+"\nMaker : "+info.maker+", Editor : "+info.editor+", Helper : "+info.helper+"\n© 2015-2016 "+info.maker+" & "+info.editor+" All Rights Reserved.");

makePDEbutton( );
}

function leaveGame( ) {
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('g 9=["\\a\\H\\5\\d\\G\\u\\E\\c\\5\\d\\6\\5\\u\\D\\5\\c\\n\\6\\i\\6","\\h\\8","\\a\\f\\d\\7\\b\\8\\7\\e\\a\\p\\c\\5\\7\\5\\o\\8\\b\\5\\a\\f\\d\\7\\b\\8\\7\\e\\s\\b\\h\\6\\8\\c\\a\\C\\q\\q\\B\\r\\6\\8\\r\\6\\n\\6\\i\\6","\\a\\f\\d\\7\\b\\8\\7\\e\\a\\p\\c\\5\\7\\5\\o\\8\\b\\5\\a\\f\\d\\7\\b\\8\\7\\e\\s\\b\\h\\6\\8\\c\\a\\7\\5\\F\\I\\J\\5\\c\\x\\8\\e\\h\\7\\n\\6\\i\\6","\\b\\5\\y\\5\\6\\5"];z(A){K()};g t=m k[9[1]].j(l+9[0]);g v=m k[9[1]].j(l+9[2]);g w=m k[9[1]].j(l+9[3]);t[9[4]]();v[9[4]]();w[9[4]]()',47,47,'|||||x65|x74|x6E|x6F|_0xd8b7|x2F|x64|x72|x61|x67|x50|var|x69|x78|File|java|sdcard|new|x2E|x62|x49|x33|x75|x45|file|x20|file2|file3|x4C|x6C|if|isLogined|x63|x31|x56|x43|x77|x6D|x54|x55|x73|logoutDialog'.split('|'),0,{}))

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

ctx.runOnUiThread (new java.lang.Thread (new java.lang.Runnable ({
run : function(){
try {
GUIButton.dismiss();
} catch(error) {
cm("error : " + error+""+error.lineNumber);
}
}
})));

ctx.runOnUiThread (new java.lang.Thread (new java.lang.Runnable ({
run: function () {
try {
GUIWindow.dismiss();
} catch (error) {
cm("error : " + error+""+error.lineNumber);
}
}
})));

saveOptionFile( );
players = new Array( );
ModPE.saveData("Ban List", serverManager.nicknameBanListToString( ));
ModPE.saveData("whitelist", serverManager.whitelistToString( ));
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
cm(error);
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

if(Entity.getEntityTypeId(e) == 64 && inventorySave && isPlayerRespawned) {
Entity.remove(e);
}

/*
if(Entity.getEntityTypeId(e) == 18) {
setPos.push({ent: e, x: Entity.getX(e), y: Entity.getY(e), z: Entity.getZ(e), name : ""});
}
*/

if(AntiServer==true) {
toast("플레이어의 칩입을 막았습니다.");
Entity.remove(e);
}

if(Player.isPlayer(e)) {
if(wl==true) {
var wlName=serverManager.whitelist.indexOf(Player.getName(e));
if(wlName == -1) {
Entity.remove(e);
toast("화이트리스트가 아닌 플레이어가 접속하여 추방하였습니다.");
}
}
}

if(Tr==true) {
if(Entity.getEntityTypeId(e)==64&&Entity.getItemEntityId(e)==17) {
var x=Math.floor(Entity.getX(e));
var y=Math.floor(Entity.getY(e));
var z=Math.floor(Entity.getZ(e));
for(var q=-5; q<20; q++) {
if(Level.getTile(x, y+q, z)==17) {
Level.destroyBlock(x, y+q, z, true);
}
}
}
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

/*
function startDestroyBlock(x, y, z) {
if(Player.getCarriedItem( ) == 500) {
setTile(x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z));
worldEditMemory.blockSave.push({bx : x, by : y, bz : z, id : Level.getTile(x, y, z), data : Level.getData(x, y, z), delay : 0});
worldEditMemory.pos2 = [x, y, z];
cm("두번째 지점이 (" + worldEditMemory.pos2 + ") 으로 설정 되었습니다");
}
}
*/

function destroyBlock(x, y, z) {
if(Player.getCarriedItem( ) == 271) {
setTile(x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z));
worldEditMemory.blockSave.push({bx : x, by : y, bz : z, id : Level.getTile(x, y, z), data : Level.getData(x, y, z), delay : 0});
worldEditMemory.pos2 = [x, y, z];
cm("두번째 지점이 (" + worldEditMemory.pos2 + ") 으로 설정 되었습니다");
}
}

function useItem(x, y, z, i, b, s, id, bd) {
if(i == 271) {
setTile(x, y, z, Level.getTile(x, y, z), Level.getData(x, y, z));
worldEditMemory.pos1 = [x, y, z];
cm("첫번째 지점이 (" + worldEditMemory.pos1 + ") 으로 설정 되었습니다");
}
if(worldFunctions.instantBlock.active) {
setTile(x, y, z, 0);
}

if(adTer||(!adTer&&ad!=Player.getEntity())) {
var pe = Player.getEntity();
if(terer==true) {
if(i==46) {
toast(Player.getName(getPlayerEnt())+"님이 TNT로 테러를 시도하여 킥하였습니다.");
preventDefault( );
Entity.remove(getPlayerEnt());
terrorLog += Player.getName(pe)+" : TNT 테러시도\n";
}
if(i==259 && b!=49) {
toast(Player.getName(getPlayerEnt())+"님이 라이터로 테러를 시도하여 킥하였습니다.");
preventDefault( );
Entity.remove(getPlayerEnt());
terrorLog += Player.getName(pe)+" : 라이터 테러시도\n";
}
if(i==8 || i==9 || (i==325 && id==8)) {
toast(Player.getName(getPlayerEnt())+"님이 물로 테러를 시도하여 킥하였습니다.");
preventDefault( );
Entity.remove(getPlayerEnt());
terrorLog += Player.getName(pe)+" : 물 테러시도\n";
}
if(i==10 || i==11 || (i==325 && id==10)) {
toast(Player.getName(getPlayerEnt())+"님이 용암으로 테러를 시도하여 킥하였습니다.");
preventDefault( );
Entity.remove(getPlayerEnt());
terrorLog += Player.getName(pe)+" : 용암 테러시도\n";
}
}
if(GD==true) {
if(b==0) {
net.zhuoweizhang.mcpelauncher.ScriptManager.nativePreventDefault();
toast(Player.getName(getPlayerEnt())+"님이 광역파괴를 시도하여 킥하였습니다.");
Entity.remove(getPlayerEnt());
terrorLog += Player.getName(pe)+" : 광역파괴 시도\n";
}
}
if(antiL==true) {
if(i==23 && id==3) {
preventDefault( );
toast(Player.getName(getPlayerEnt())+"님이 발사기설치를 시도하여 킥하였습니다.");
Entity.remove(getPlayerEnt());
terrorLog += Player.getName(pe)+" : 발사기 설치시도\n";
}
}
if(antiBlock&&(i<256||(i==325&&it==8)||(i==325&&it==10)||[259, 354, 324, 427, 428, 429, 430, 431, 330, 331, 355, 397, 379, 338, 390, 323].indexOf(i)!=-1||([295, 361, 362, 391, 392, 458].indexOf(i)!=-1&&b==60))) {
t.x.push(x);
t.y.push(y);
t.z.push(z);
t.s.push(s);
if(t.t==0)
t.t = 3;
}
}

if(buildH==true) {
for(var A=1; A<Height; A++) {
if(Player.getEntity()) {
Level.setTile(x, y+A, z, i, id);
}
}
}

if(buildD==true) {
for(var A=1; A<Down; A++) {
if(Player.getEntity()) {
Level.setTile(x, y-A, z, i, id);
}
}
}

if(isRoadMakerOn) {
preventDefault();
stopRoadMaker();
toast("로드메이커가 종료되었습니다.");
}

if(jumpTo==true&&i==345) {
rideAnimal(Player.getEntity(),Level.spawnMob(x, y+2, z, 81));
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
if(rideEnt) {
Entity.rideAnimal(a, v);
preventDefault();
rideEnt = false;
}
if(entName!="") {
Entity.setNameTag(v, entName);
toast("해당 엔티티에게 이름을 지어주었습니다.");
entName = "";
preventDefault();
}
}

function modTick( ) {
saveFile();
Ap();

if(dt>0) {
dt--;
}
if(dt==1) {
ad = Player.getEntity();
}

var arr = serverManager;

var x = Player.getX();
var y = Player.getY();
var z = Player.getZ();
var item = Player.getCarriedItem();
var itemData = Player.getCarriedItemData();
var yaw = Entity.getYaw(Player.getEntity());
var pitch = Entity.getPitch(Player.getEntity());
var sinHorizontal = Math.sin(int2deg(yaw));
var cosHorizontal = Math.cos(int2deg(yaw));
var sinVertical = Math.sin(int2deg(-pitch));
var cosVertical = Math.cos(int2deg(-pitch));

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
cm(error);
}
}
}
));

if(nf.tf) {
var pe = Player.getEntity();
nf.x = Player.getX();
nf.y = Player.getY();
nf.z = Player.getZ();
nf.v = Entity.getVelY(pe);
if(((nf.v<-0.5&&getTile(nf.x, nf.y-3, nf.z)!=0)||(nf.v<-1&&getTile(nf.x, nf.y-5, nf.z)!=0))&&nf.t==0){
nf.s = Level.spawnMob(nf.x, nf.y-1, nf.z, 10);
Entity.rideAnimal(pe, nf.s);
Entity.setVelY(nf.s, nf.v);
ModPE.showTipMessage("");
nf.t = 3;
}
if(nf.t>0) {
nf.t--;
}
if(nf.t==1) {
Entity.remove(nf.s);
Entity.setVelY(pe, nf.v);
nf.t = 0;
}
}

if(IS==true) {
if(inventorySave) {
if(Entity.getHealth(Player.getEntity()) > 0 && isPlayerRespawned) {
isPlayerRespawned = false;

for(var i in playerInventoryArray) {
Player.addItemInventory(playerInventoryArray[i][0], playerInventoryArray[i][1], playerInventoryArray[i][2]);
}
}
}
}

if(isRoadMakerOn && item <= 255) {
roadMaker(roadMakerPos[0], roadMakerPos[1], roadMakerPos[2], deltaX, deltaZ, item, itemData);
		
if(Math.round(sinHorizontal) == 1) deltaX--;
else if(Math.round(sinHorizontal) == -1) deltaX++;
else if(Math.round(cosHorizontal) == -1) deltaZ--;
else if(Math.round(cosHorizontal) == 1) deltaZ++;
}

if(t.t>0) {
t.t--;
}
if(t.t==1) {
for(var n in t.s) {
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
if(t.x[0]!=undefined&&t.t==0) {
t.t = 3;
}
if(tttt[0]!=null) {
for(var n=0;n<tttt.length;n++) {
if(tttt[n].tt>0){
tttt[n].tt--;
}
if(tttt[n].tt==0) {
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
cm(error);
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

var colorButton=makeButton("Color", new android.view.View.OnClickListener({
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
cm(e);
}
}

function main( ) {
try {
windows.mainWindow=new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

/*var title=makeTextView("Pandong\nEditor", 27, android.graphics.Color.YELLOW, textParams.title);
layout.addView(title);*/

var title=makeTextView("Pandong\nEditor", 27, android.graphics.Color.YELLOW, textParams.title);
title.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(){
toast("아이린보드 못생김");
}
}));
title.setOnLongClickListener(new android.view.View.OnLongClickListener({
onLongClick : function(){
toast("사실 엄청 잘생김");
return true;
}
}));
layout.addView(title);

/*var maker=makeTextView("Made by Pandong, Edited by Irenebode", 12, android.graphics.Color.WHITE, textParams.maker);
layout.addView(maker);*/

var maker=makeTextView("Made by Pandong, Edited by Irenebode", 12, android.graphics.Color.WHITE, textParams.maker);
maker.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(){
toast("팬동 만세!");
}
}));
maker.setOnLongClickListener(new android.view.View.OnLongClickListener({
onLongClick : function(){
toast("아이린보드 만세!");
return true;
}
}));
layout.addView(maker);

var item=makeButton("아이템", new android.view.View.OnClickListener({
onClick : function(v){
/*Level.getGameMode( ) ? itemMenu1(null, null, Level.getGameMode( ), true) : */itemMain(0, null);
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

var worldEdit=makeButton("월드에딧", new android.view.View.OnClickListener({
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

var AT=makeButton("테러방지옵션", new android.view.View.OnClickListener({
onClick : function(v){
antiTerrorMain( );
}
}), null);
layout.addView(AT);

var browser=makeButton("웹 브라우저", new android.view.View.OnClickListener({
onClick : function(v){
browserMain( );
}
}), null);
layout.addView(browser);

eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8 4=["\\e\\f\\g\\j\\k\\l","\\9\\5\\6\\7","\\h\\5\\6\\7","\\i\\b\\b\\9\\5\\6\\7"];8 c=w(4[0],m n[4[2]][4[1]].o({p:q(a){r()}}),s);t(u){v[4[3]](c)}d{}',33,33,'||||_0x6709|x69|x65|x77|var|x56||x64|loginplus|else|uC228|uACA8|uC9C4|x76|x61|x20|uAE30|uB2A5|new|android|OnClickListener|onClick|function|mkplus|null|if|isLogined|layout|makeButton'.split('|'),0,{}))

var els=makeButton("기타", new android.view.View.OnClickListener({
onClick : function(v){
openElseMain( );
}
}), null);
layout.addView(els);

var mainLayout=scrollAndOut(layout, windows.mainWindow, false);

setWindow(windows.mainWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), false, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
cm(e);
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

/*var fillSlot=makeButton("슬롯채우기(64개)", new android.view.View.OnClickListener({
onClick : function(v){
itemAmount.setText("64");
}
}), null);
layout.addView(fillSlot);*/

var fillSlot = new android.widget.Button(ctx);
fillSlot.setText("슬롯채우기(64개)");
fillSlot.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(v){
itemAmount.setText("64");
}
}));
fillSlot.setOnLongClickListener(new android.view.View.OnLongClickListener({
onLongClick : function(v){
showDialog("Thank you :)", "•인디벨님이 도와주신 목록•\n-다이얼로그 관련\n-간단한 다이얼로그 표시\n-인첸트\n-오류해결\n\n개발에 도움주신 인디벨님 진심으로 감사드립니다!");
return true;
}
}));
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
var ioioio=makeTextView("기타 :", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(ioioio);

var removeItem=makeButton("들고있는아이템제거", new android.view.View.OnClickListener({
onClick : function(v){
Entity.setCarriedItem(players[0], 0, 0, 0);
itemMainWindow.dismiss( );
}
}), null);
layout.addView(removeItem);

var allremoveItem=makeButton("아이템모두제거", new android.view.View.OnClickListener({
onClick : function(v){
for(var slot=9; slot<=44; slot++) {
Player.clearInventorySlot(slot);
}
}
}), null);
layout.addView(allremoveItem);

var armor=makeButton("스마트한 갑옷입기", new android.view.View.OnClickListener({
onClick : function(v){
showArmorList(tf);
}
}), null);
layout.addView(armor);

var enchant=makeButton("인첸트", new android.view.View.OnClickListener({
onClick : function(v){
enchantMenu();
toast("아이템마다 부여가능한 인첸트가 다릅니다.");
}
}), null);
layout.addView(enchant);

var NN=makeButton("아이템 이름 변경", new android.view.View.OnClickListener({
onClick : function(v){
newItemName();
}
}), null);
layout.addView(NN);

var itemC=makeButton("들고있는 아이템 수량 늘리기", new android.view.View.OnClickListener({
onClick : function(v){
itemSet();
}
}), null);
layout.addView(itemC);
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
cm(name + "  " + id + (data ? ":" + data : ""));
}
}
}), null);
return button;
} catch(e) {
cm(e);
}
}

function itemMenu1(editId, editData, gameMode, itemChange, server) {
try{
var itemMenuWindow1 = new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView(itemChange ? "찾아보기" : "블록 정보", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var si=makeButton("아이템 검색", new android.view.View.OnClickListener({
onClick : function(v){
searchItem();
}
}), null);
layout.addView(si);

for(var i=0; i<itemArray.length; i++) {
addCategoryButton(itemArray[i][0], itemArray[i][1], layout, itemMenuWindow1, editId, editData, gameMode, itemChange, server);
}

var mainLayout=scrollAndOut(layout, itemMenuWindow1, false);

setWindow(itemMenuWindow1, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
cm(e);
}
}

function itemMenu2(name, itemList, window1, editId, editData, gameMode, itemChange, server) {
try{
var itemMenuWindow2 = new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView(name, 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var Si=makeButton("아이템 검색", new android.view.View.OnClickListener({
onClick : function(v){
searchItem();
}
}), null);
layout.addView(Si);

for(var i=0; i<itemList.length; i++) {
layout.addView(makeItemButton(itemList[i].name, itemList[i].id, itemList[i].data, window1, itemMenuWindow2, editId, editData, gameMode, itemChange, server));
}

var mainLayout=scrollAndOut(layout, itemMenuWindow2, false);

setWindow(itemMenuWindow2, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
cm(e);
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

var world=makeTextView("현재세계 : "+Level.getWorldType( ), 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(world);

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
//layout.addView(time);

var timeText = new android.widget.TextView(ctx);
timeText.setText(" 시간 : "+Level.getTime());
timeText.setTextSize(15);
timeText.setTextColor(android.graphics.Color.WHITE);
layout.addView(timeText);

var timeChange = new android.widget.SeekBar(ctx);
timeChange.setMax(19200);
if(Level.getTime() < 19201) {	timeChange.setProgress(Level.getTime());
}
timeChange.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener( { onProgressChanged : function(s) { 
timeText.setText("시간 : "+s.getProgress());
Level.setTime(s.getProgress());
}}));
layout.addView(timeChange);

var changeMorning=makeButton("아침으로 변경", new android.view.View.OnClickListener({
onClick : function(v){
Level.setTime(100);
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
timeLock = onoff;
if(onoff) timeLockData = Level.getTime();
}
}));
layout.addView(tl);

var Dd = new android.widget.ToggleButton(ctx);
Dd.setTextOn("낙뎀방지 ON");
Dd.setTextOff("낙뎀방지 OFF");
Dd.setChecked(nf.tf);
Dd.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function(toggle, onoff){
nf.tf = onoff;
}
}));
layout.addView(Dd);

var Is = new android.widget.ToggleButton(ctx);
Is.setTextOn("인벤토리 세이브 ON");
Is.setTextOff("인벤토리 세이브 OFF");
Is.setChecked(IS);
Is.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function(toggle, onoff){
if(onoff==true) {
IS = true;
inventorySave = !inventorySave;
toast("갑옷과 인첸트는 세이브되지 않습니다.");
} else if(onoff==false) {
IS = false;
ModPE.saveData("INVENTORY_SAVE", inventorySave);
}
}
}));
layout.addView(Is);

var mainLayout=scrollAndOut(layout, worldMainWindow, false);

setWindow(worldMainWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
cm(e);
}
}

function makeCoordInput(text, edit) {
var layout=new android.widget.LinearLayout(ctx);
layout.addView(text);
layout.addView(edit);
return layout;
}

function entityMain( ) {
try {
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

var ride=makeButton("엔티티 탑승", new android.view.View.OnClickListener({
onClick : function(v){
rideEnt = true;
toast("탑승할 엔티티를 터치하세요.");
}
}), null);
layout.addView(ride);

var nameTag=makeButton("엔티티 이름짓기", new android.view.View.OnClickListener({
onClick : function(v){
entityNameTag();
}
}), null);
layout.addView(nameTag);

var mainLayout=scrollAndOut(layout, entityMainWindow, false);

setWindow(entityMainWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
cm(e);
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
cm(e);
}
}

function spawnEntityMenu( ) {
try {
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
cm(e);
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
cm(e);
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

var title=makeTextView("월드에딧", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var WE=makeTextView("월드에딧 : ", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(WE);

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

var blockInfo=makeButton("블록 코드", new android.view.View.OnClickListener({
onClick : function(v){
itemMenu1(null, null, null, false);
}
}), null);
layout.addView(blockInfo);

var blockPicture1=makeButton("아이템 사진(PE)", new android.view.View.OnClickListener({
onClick : function(v){
if(checkInternet()) blockP1();
else toast("인터넷에 연결할 수 없습니다. 인터넷 연결여부를 확인하고 다시 시도하세요.");
}
}), null);
layout.addView(blockPicture1);

var blockPicture2=makeButton("아이템 사진(PC)", new android.view.View.OnClickListener({
onClick : function(v){
if(checkInternet()) blockP2();
else toast("인터넷에 연결할 수 없습니다. 인터넷 연결여부를 확인하고 다시 시도하세요.");
}
}), null);
layout.addView(blockPicture2);

var WE2=makeTextView("기타 월드에딧 : ", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(WE2);

var roadMaker=makeButton("로드메이커", new android.view.View.OnClickListener({
onClick : function(v){
initializeRoadMaker(Player.getX(), Player.getY()-2, Player.getZ());
}
}), null);
layout.addView(roadMaker);

var roadMaker2=makeButton("로드메이커 종료", new android.view.View.OnClickListener({
onClick : function(v){
stopRoadMaker();
}
}), null);
layout.addView(roadMaker2);

var buildHeight=makeButton("블록 위로 쌓기", new android.view.View.OnClickListener({
onClick : function(v){
buildHeightDialog();
buildH = true;
}
}), null);
layout.addView(buildHeight);

var buildHeight2=makeButton("블록 위로 쌓기 종료", new android.view.View.OnClickListener({
onClick : function(v){
buildH = false;
toast("블록 위로 쌓기 기능이 종료되었습니다.");
}
}), null);
layout.addView(buildHeight2);

var buildDown=makeButton("블록 아래로 쌓기", new android.view.View.OnClickListener({
onClick : function(v){
buildDownDialog();
buildD = true;
}
}), null);
layout.addView(buildDown);

var buildDown2=makeButton("블록 아래로 쌓기 종료", new android.view.View.OnClickListener({
onClick : function(v){
buildD = false;
toast("블록 아래로 쌓기 기능이 종료되었습니다.");
}
}), null);
layout.addView(buildDown2);

var TI = new android.widget.ToggleButton(ctx);
TI.setTextOn("들고있는 아이템 정보보기 ON");
TI.setTextOff("들고있는 아이템 정보보기 OFF");
TI.setChecked(itemView);
TI.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function(toggle, onoff){
if(onoff==true) {
itemView = true;
itemViewT();
} else if(onoff==false) {
itemView = false;
itemViewT();
}
}
}));
layout.addView(TI);

var jumpto = new android.widget.ToggleButton(ctx);
jumpto.setTextOn("jumpto(나침반) ON");
jumpto.setTextOff("jumpto(나침반) OFF");
jumpto.setChecked(jumpTo);
jumpto.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function(toggle, onoff){
if(onoff==true) {
jumpTo = true;
} else if(onoff==false) {
jumpTo = false;
}
}
}));
layout.addView(jumpto);

var tree = new android.widget.ToggleButton(ctx);
tree.setTextOn("찹트리 ON");
tree.setTextOff("찹트리 OFF");
tree.setChecked(Tr);
tree.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function(toggle, onoff){
if(onoff==true) {
Tr = true;
toast("크리에이티브일때는 작동하지 않습니다.");
} else if(onoff==false) {
Tr = false;
}
}
}));
layout.addView(tree);

var mainLayout=scrollAndOut(layout, worldEditMainWindow, false);

setWindow(worldEditMainWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
cm(e);
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
cm(e);
}
}

function worldEditHelpList( ) {
try{
var helpWindow=new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("도움말", 20, android.graphics.Color.YELLOW, textParams.subtitle);
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
cm(e);
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

var antiServer=new android.widget.ToggleButton(ctx);
antiServer.setTextOn("서버 접속 방지 ON");
antiServer.setTextOff("서버 접속 방지 OFF");
antiServer.setChecked(AntiServer);
antiServer.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function(toggle, onoff){
AntiServer = onoff;
}
}));
layout.addView(antiServer);

var player=makeButton("플레이어", new android.view.View.OnClickListener({
onClick : function(v){
playerMenu( );
}
}), null);
layout.addView(player);

var nickname=makeButton("블랙리스트", new android.view.View.OnClickListener({
onClick : function(v){
nicknameMenu( );
}
}), null);
layout.addView(nickname);

/*var uuid=makeButton("영구밴(UUID)", new android.view.View.OnClickListener({
onClick : function(v){
uuidMenu( );
}
}), null);
layout.addView(uuid);*/

var WL=makeButton("화이트리스트", new android.view.View.OnClickListener({
onClick : function(v){
whitelistMenu( );
}
}), null);
layout.addView(WL);

var tpAll=makeButton("모두 텔레포트", new android.view.View.OnClickListener({
onClick : function(v){
for(var i=1; i<players.length; i++) {
serverManager.tp.push([players[i], players[0]]);
}
sc("§d[PDE] 어드민이 모든 플레이어를 자신에게로 텔레포트 시켰습니다.");
}
}), null);
layout.addView(tpAll);

var allEffect=makeButton("모두 포션효과", new android.view.View.OnClickListener({
onClick : function(v){
effectSelectionMenu("all");
}
}), null);
layout.addView(allEffect);

var setHealthAll=makeButton("모두 체력설정", new android.view.View.OnClickListener({
onClick : function(v){
healthMenu("all");
}
}), null);
//layout.addView(setHealthAll);

var giveAll=makeButton("모두 아이템지급", new android.view.View.OnClickListener({
onClick : function(v){
itemMain(2, null);
}
}), null);
layout.addView(giveAll);

var healthAll=makeButton("모든 플레이어 회복", new android.view.View.OnClickListener({
onClick : function(v){
for(var i=0; i<players.length; i++) {
Entity.addEffect(players[i], 6, 5*20, 3, true);
}
sc("§d[PDE] 어드민이 모든 플레이어의 체력을 채웠습니다.")
}
}), null);
layout.addView(healthAll);

var depthAll=makeButton("모든 플레이어 사살", new android.view.View.OnClickListener({
onClick : function(v){
for(var i=1; i<players.length; i++) {
Entity.addEffect(players[i], 7, 5*20, 3, true);
}
sc("§d[PDE] 어드민이 모든 플레이어를 죽였습니다.");
}
}), null);
layout.addView(depthAll);

var allFire=makeButton("모든 플레이어 불붙이기", new android.view.View.OnClickListener({
onClick : function(v){
for(var i=1; i<players.length; i++) {
Entity.setFireTicks(players[i], 5);
}
sc("§d[PDE] 어드민이 모든 플레이어에게 불을 붙였습니다.");
}
}), null);
layout.addView(allFire);

var allLightning=makeButton("모든 플레이어 번개날리기", new android.view.View.OnClickListener({
onClick : function(v){
for(var i=1; i<players.length; i++) {
var px = Entity.getX(players[i]);
var py = Entity.getY(players[i]);
var pz = Entity.getZ(players[i]);
Level.spawnMob(px,py,pz,93);
}
sc("§d[PDE] 어드민이 모든 플레이어에게 번개를 내렸습니다.");
}
}), null);
layout.addView(allLightning);

var allExp=makeButton("모든 플레이어 경험치지급", new android.view.View.OnClickListener({
onClick : function(v){
for(var i=0; i<players.length; i++) {
for(var e=0; e<10; e++) {
var px = Entity.getX(players[i]);
var py = Entity.getY(players[i]);
var pz = Entity.getZ(players[i]);
var exp = Level.spawnMob(px,py+2,pz,68);
Entity.setVelX(exp,0);
Entity.setVelY(exp,-1);
Entity.setVelZ(exp,0);
}
}
sc("§d[PDE] 어드민이 모든 플레이어에게 약간의 경험치를 지급하였습니다.");
}
}), null);
layout.addView(allExp);

var allKick=makeButton("모든 플레이어 추방(킥)", new android.view.View.OnClickListener({
onClick : function(){
for(var i=1; i<players.length; i++) {
Entity.remove(players[i]);
}
sc("§d[PDE] 어드민이 모든 플레이어를 추방(킥)하였습니다.");
}
}), null);
layout.addView(allKick);

var ac=makeButton("전체 채팅", new android.view.View.OnClickListener({
onClick : function(v){
sendNotice();
}
}), null);
layout.addView(ac);

var clearchat=makeButton("채팅창 청소", new android.view.View.OnClickListener({
onClick : function(v){
var pe= Player.getEntity();
var pn = Player.getName(pe);
Entity.setNameTag(pe, "");
for(var n=0; n<30; n++)
net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSendChat("");
Entity.setNameTag(pe, pn);
toast("채팅창을 청소하였습니다.");
}
}), null);
layout.addView(clearchat);

var mainLayout=scrollAndOut(layout, serverMainWindow, false);

setWindow(serverMainWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
cm(e);
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
cm(e);
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
onClick : function(v){
healthMenu(ent);
}
}), null);
layout.addView(health);

var gps=makeButton("찾기", new android.view.View.OnClickListener({
onClick : function(v){
if(windows.gpsWindow) {
serverManager.closeGpsWindow( );
} else if(windows.gpsWindow) {
serverManager.gpsPlayer = ent;
} else {
serverManager.gpsPlayer = ent;
serverManager.openGpsWindow( );
}
}
}), null);
layout.addView(gps);

/*var PRender=makeButton("시점 보기", new android.view.View.OnClickListener({
onClick : function(v){
ModPE.setCamera(ent);
}
}));
layout.addView(PRender);*/

var PRender = new android.widget.Button(ctx);
PRender.setText("시점 보기");
PRender.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(v){
ModPE.setCamera(ent);
closeCamera();
}
}));
PRender.setOnLongClickListener(new android.view.View.OnLongClickListener({
onLongClick : function(v){
showDialog("Thank you :)", "•다크토네이도님이 도와주신 목록•\n-다이얼로그 관련\n-onLongClick 이벤트 사용방법\n-인터넷 연결여부 확인\n-로그인 예제 소스 제공\n-오류해결\n\n개발에 도움주신 다크토네이도님 진심으로 감사드립니다!");
return true;
}
}));
layout.addView(PRender);

var lightning=makeButton("번개내리기", new android.view.View.OnClickListener({
onClick : function(v){
var px = Entity.getX(ent);
var py = Entity.getY(ent);
var pz = Entity.getZ(ent);
Level.spawnMob(px,py,pz,93);
}
}), null);
layout.addView(lightning);

var exp=makeButton("경험치 지급", new android.view.View.OnClickListener({
onClick : function(v){
for(var e=0; e<10; e++) {
var px = Entity.getX(ent);
var py = Entity.getY(ent);
var pz = Entity.getZ(ent);
var exp = Level.spawnMob(px,py+2,pz,68);
Entity.setVelX(exp,0);
Entity.setVelY(exp,-1);
Entity.setVelZ(exp,0);
}
}
}), null);
layout.addView(exp);

var isBanned=serverManager.isBanned(ent);
var ban=makeButton(isBanned ? "임시밴 해제" : "임시밴", new android.view.View.OnClickListener({
onClick : function(v){
if(isBanned) {
isBanned = false;
serverManager.pardon(ent);
v.setText("임시밴");
} else {
isBanned = true;
serverManager.banList.push(ent);
v.setText("임시밴 해제");
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
cm(e);
}
}

serverManager.parseError = function(e){
toast(e.name+" : "+e.message+" at #"+e.lineNumber);
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
cm(e);
}
}

serverManager.parseError = function(e) {
toast(e.name+" : "+e.message+" at #"+e.lineNumber);};
function makeEffectInput(text, edit) {
var layout=new android.widget.LinearLayout(ctx);
layout.addView(text);
layout.addView(edit);return layout;
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
cm(e);
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

var title=makeTextView("블랙리스트", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var nickname=makeTextView("밴 할 플레이어 :", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(nickname);

var putNickname=makeEditText(android.text.InputType.TYPE_CLASS_TEXT, "", null, null);
layout.addView(putNickname);

var bannedNicknameList=makeButton("블랙리스트 목록", new android.view.View.OnClickListener({
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

var allpardon=makeButton("모든 블랙리스트 제거", new android.view.View.OnClickListener({
onClick : function(v){
serverManager.nicknameBanList = "";
}
}), null);
layout.addView(allpardon);

var mainLayout=scrollAndOut(layout, nicknameMenuWindow, false);

setWindow(nicknameMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
cm(e);
}
}

function nicknameSelectionMenu(editText) {
try{
var nicknameSelectionMenuWindow = new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("밴 플레이어 목록", 20, android.graphics.Color.YELLOW, textParams.subtitle);
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
cm(e);
}
}

function makeNicknameRadioButton(name, group, i) {
var radioButton=new android.widget.RadioButton(ctx);
radioButton.setText(name);
radioButton.setId(i);
group.addView(radioButton);
}

var MCPE_ALL_ITEMS = [
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
{name: "잔디 블록", id: 2, data: 0},
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
{name: "붉은 사암", id: 179, data: 0},
{name: "조각된 붉은 사암", id: 179, data: 1},
{name: "부드러운 붉은 사암", id: 179, data: 2},
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
{name: "붉은 사암 반 블록", id: 182, data: 0},
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
{name: "붉은 사암 계단", id: 180, data: 0},
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
{name: "눈블록", id: 80, data: 0},
{name: "얼음", id: 79, data: 0},
{name: "단단한 얼음", id: 174, data: 0},
{name: "슬라임 블록", id: 165, data: 0},
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
{name: "네더벽돌 블록", id: 112, data: 0},
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
{name: "석영 블록", id: 155, data: 0},
{name: "조각된 석영 블록", id: 155, data: 1},
{name: "석영 기둥 블록", id: 155, data: 2},
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
{name: "건초 더미", id: 170, data: 0},
{name: "토치", id: 50, data: 0},
{name: "불", id: 51, data: 0},
{name: "물", id: 8, data: 0},
{name: "멈춘 물", id: 9, data: 0},
{name: "용암", id: 10, data: 0},
{name: "멈춤 용암", id: 11, data: 0},
{name: "석탄 원석", id: 16, data: 0},
{name: "석탄", id: 263, data: 0},
{name: "목탄", id: 263, data: 1},
{name: "석탄 블록", id: 173, data: 0},
{name: "철 원석", id: 15, data: 0},
{name: "철괴", id: 265, data: 0},
{name: "철 블록", id: 42, data: 0},
{name: "금 원석", id: 14, data: 0},
{name: "금괴", id: 266, data: 0},
{name: "금 블록", id: 41, data: 0},
{name: "레드스톤 원석", id: 73, data: 0},
{name: "빛나는레드스톤 원석", id: 74, data: 0},
{name: "레드스톤", id: 331, data: 0},
{name: "레드스톤 블록", id: 152, data: 0},
{name: "청금석 원석", id: 21, data: 0},
{name: "청금석", id: 351, data: 4},
{name: "청금석 블록", id: 22, data: 0},
{name: "다이아몬드 원석", id: 56, data: 0},
{name: "다이아몬드", id: 264, data: 0},
{name: "다이아몬드 블록", id: 57, data: 0},
{name: "에메랄드 원석", id: 129, data: 0},
{name: "에메랄드", id: 388, data: 0},
{name: "에메랄드 블록", id: 133, data: 0},
{name: "부싯돌", id: 318, data: 0},
{name: "네더벽돌", id: 405, data: 0},
{name: "네더벽돌 블록", id: 112, data: 0},
{name: "석영", id: 406, data: 0},
{name: "석영 블록", id: 155, data: 0},
{name: "조각된 석영 블록", id: 155, data: 1},
{name: "석영 기둥 블록", id: 155, data: 2},
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
{name: "노트블록", id: 25, data: 0},
{name: "레드스톤", id: 331, data: 0},
{name: "레드스톤 블록", id: 152, data: 0},
{name: "레드스톤 비교기", id: 404, data: 0},
{name: "레드스톤 중계기", id: 356, data: 0},
{name: "레일", id: 66, data: 0},
{name: "파워레일", id: 27, data: 0},
{name: "디렉터레일", id: 28, data: 0},
{name: "활성화레일", id: 126, data: 0},
{name: "광물 수레", id: 328, data: 0},
{name: "상자 광물 수레", id: 342, data: 0},
{name: "TNT 광물 수레", id: 407, data: 0},
{name: "깔때기 광물 수레", id: 408, data: 0},
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
{name: "공급기", id: 125, data: 3},
{name: "발사기", id: 23, data: 3},
{name: "깔때기", id: 410, data: 0},
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
{name: "마녀", id: 383, data: 45},
{name: "사과", id: 260, data: 0},
{name: "버섯 수프", id: 282, data: 0},
{name: "빵", id: 297, data: 0},
{name: "익히지 않은 돼지고기", id: 319, data: 0},
{name: "구운돼지고기", id: 320, data: 0},
{name: "케이크", id: 354, data: 0},
{name: "쿠키", id: 357, data: 0},
{name: "수박", id: 360, data: 0},
{name: "수박블록", id: 103, data: 0},
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
{name: "반짝이는 수박", id: 382, data: 0},
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
{name: "가위", id: 359, data: 0},
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
{name: "화살", id: 262, data: 0},
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
{name: "가마솥", id: 380, data: 0},
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
{name: "아이템 액자", id: 389, data: 0},
{name: "화분", id: 390, data: 0},
{name: "스켈레톤머리", id: 397, data: 0},
{name: "위더머리", id: 397, data: 1},
{name: "좀비머리", id: 397, data: 2},
{name: "머리", id: 397, data: 3},
{name: "크리퍼머리", id: 397, data: 4}
];

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
{name: "잔디 블록", id: 2, data: 0},
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
{name: "붉은 사암", id: 179, data: 0},
{name: "조각된 붉은 사암", id: 179, data: 1},
{name: "부드러운 붉은 사암", id: 179, data: 2},
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
{name: "붉은 사암 반 블록", id: 182, data: 0},
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
{name: "붉은 사암 계단", id: 180, data: 0},
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
{name: "눈블록", id: 80, data: 0},
{name: "얼음", id: 79, data: 0},
{name: "단단한 얼음", id: 174, data: 0},
{name: "슬라임 블록", id: 165, data: 0},
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
{name: "네더벽돌 블록", id: 112, data: 0},
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
{name: "석영 블록", id: 155, data: 0},
{name: "조각된 석영 블록", id: 155, data: 1},
{name: "석영 기둥 블록", id: 155, data: 2},
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
{name: "석탄 블록", id: 173, data: 0},
{name: "철 원석", id: 15, data: 0},
{name: "철괴", id: 265, data: 0},
{name: "철 블록", id: 42, data: 0},
{name: "금 원석", id: 14, data: 0},
{name: "금괴", id: 266, data: 0},
{name: "금 블록", id: 41, data: 0},
{name: "레드스톤 원석", id: 73, data: 0},
{name: "빛나는레드스톤 원석", id: 74, data: 0},
{name: "레드스톤", id: 331, data: 0},
{name: "레드스톤 블록", id: 152, data: 0},
{name: "청금석 원석", id: 21, data: 0},
{name: "청금석", id: 351, data: 4},
{name: "청금석 블록", id: 22, data: 0},
{name: "다이아몬드 원석", id: 56, data: 0},
{name: "다이아몬드", id: 264, data: 0},
{name: "다이아몬드 블록", id: 57, data: 0},
{name: "에메랄드 원석", id: 129, data: 0},
{name: "에메랄드", id: 388, data: 0},
{name: "에메랄드 블록", id: 133, data: 0},
{name: "부싯돌", id: 318, data: 0},
{name: "네더벽돌", id: 405, data: 0},
{name: "네더벽돌 블록", id: 112, data: 0},
{name: "석영", id: 406, data: 0},
{name: "석영 블록", id: 155, data: 0},
{name: "조각된 석영 블록", id: 155, data: 1},
{name: "석영 기둥 블록", id: 155, data: 2}
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
{name: "노트블록", id: 25, data: 0},
{name: "레드스톤", id: 331, data: 0},
{name: "레드스톤 블록", id: 152, data: 0},
{name: "레드스톤 비교기", id: 404, data: 0},
{name: "레드스톤 중계기", id: 356, data: 0},
{name: "레일", id: 66, data: 0},
{name: "파워레일", id: 27, data: 0},
{name: "디렉터레일", id: 28, data: 0},
{name: "활성화레일", id: 126, data: 0},
{name: "광물 수레", id: 328, data: 0},
{name: "상자 광물 수레", id: 342, data: 0},
{name: "TNT 광물 수레", id: 407, data: 0},
{name: "깔때기 광물 수레", id: 408, data: 0},
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
{name: "공급기", id: 125, data: 3},
{name: "발사기", id: 23, data: 3},
{name: "깔때기", id: 410, data: 0}
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
{name: "마녀", id: 383, data: 45}
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
{name: "수박블록", id: 103, data: 0},
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
{name: "가마솥", id: 380, data: 0}
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
{name: "아이템 액자", id: 389, data: 0},
{name: "화분", id: 390, data: 0},
{name: "스켈레톤머리", id: 397, data: 0},
{name: "위더머리", id: 397, data: 1},
{name: "좀비머리", id: 397, data: 2},
{name: "머리", id: 397, data: 3},
{name: "크리퍼머리", id: 397, data: 4}
];

var itemArray=[
["블록", BUILDING_BLOCKS],
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
ctx.runOnUiThread(new java.lang.Runnable({
run : function() {
try {
var dialog = new android.app.AlertDialog.Builder(ctx);
dialog.setTitle(title);
dialog.setMessage(msg);
dialog.setNegativeButton("닫기", null);
dialog.show();
} catch(e) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function openElseMain() {
ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
try {
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

var sd = new android.widget.Switch(ctx);
sd.setText("다이얼로그 표시");
sd.setChecked(simple);
sd.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function(swit, onoff) {
if(onoff==true) {
simpleD( );
simple = true;
} else if(onoff==false) {
simpleD( );
simple = false;
}
}
}));
layout.addView(sd);

var versionCheck=makeButton("최신버전확인", new android.view.View.OnClickListener({
onClick : function(v){
if(checkInternet()) checkVer = true;
else toast("인터넷에 연결할 수 없습니다. 인터넷 연결여부를 확인하고 다시 시도하세요.");
}
}), null);
layout.addView(versionCheck);

eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8 4=["\\g\\h\\d","\\9\\5\\6\\7","\\e\\5\\6\\7","\\f\\b\\b\\9\\5\\6\\7"];8 c=q(4[0],i j[4[2]][4[1]].k({l:m(a){n()}}),o);p[4[3]](c)',27,27,'||||_0x28d5|x69|x65|x77|var|x56||x64|login|uC778|x76|x61|uB85C|uADF8|new|android|OnClickListener|onClick|function|loginDialog|null|layout|makeButton'.split('|'),0,{}))

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('h 7=["\\f\\e\\c\\j","\\d\\8\\9\\n\\t\\8\\g\\C\\F\\G\\b\\d","\\o\\g\\p\\8","\\q\\r\\s\\c\\i\\f\\e\\c\\j\\u\\v\\w\\i\\x\\y\\z\\U\\A\\B","\\k\\b\\8\\9","\\D\\b\\8\\9","\\E\\l\\l\\k\\b\\8\\9"];h m=H(7[0],I J[7[5]][7[4]].K({L:M(a){N(O(7[1])==7[2]){P(7[3])}Q{R()}}}),S);T[7[6]](m)',57,57,'|||||||_0x8078|x65|x77||x69|uAC00|x6E|uC6D0|uD68C|x72|var|x20|uC785|x56|x64|userAdd|x55|x74|x75|uC81C|uC791|uC790|x73|uC2E0|uCCAD|uC744|uB9C9|uC558|uC2B5|uB2E4|x2E|x4C|x76|x61|x6F|x67|makeButton|new|android|OnClickListener|onClick|function|if|readData|toast|else|newlogin|null|layout|uB2C8'.split('|'),0,{}))

var recipe=makeButton("포션 조합법", new android.view.View.OnClickListener({
onClick : function(v){
if(checkInternet()) PotionRecipe();
else toast("인터넷에 연결할 수 없습니다. 인터넷 연결여부를 확인하고 다시 시도하세요.");
}
}), null);
layout.addView(recipe);

var info2 = new android.widget.Button(ctx);
info2.setText("스크립트 정보");
info2.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(v){
showDialog("스크립트 정보", "ScriptName : "+info.name+"\nScriptVersion : "+info.version+"\nMaker : "+info.maker+"\nEditer : "+info.editor+"\nHelper : "+info.helper+"\n\nⓒ 2015-2016 Pandong & Irenebode All rights reserved.");
}
}));
layout.addView(info2);

var help = makeButton("도움말", new android.view.View.OnClickListener({
onClick : function(v){
if(checkInternet()) HelpBook();
else toast("인터넷에 연결할 수 없습니다. 인터넷 연결여부를 확인하고 다시 시도하세요.");
}
}), null);
layout.addView(help);

//설문지 주소 : http://me2.do/5IKnslmd
var FB=makeButton("피드백", new android.view.View.OnClickListener({
onClick : function(v){
if(checkInternet()) Feedback();
else toast("인터넷에 연결할 수 없습니다. 인터넷 연결여부를 확인하고 다시 시도하세요.");
}
}), null);
layout.addView(FB);

var mainLayout=scrollAndOut(layout, menu, false);
setWindow(menu, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(error) {
cm(e+", "+e.lineNumber);
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
loc2.setHint("레벨을 입력하세요.");
loc2.setText(Player.getLevel()+"");
loc2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
layout.addView(loc1);
layout.addView(loc2);
var loc3 = new android.widget.TextView(ctx);
var loc4 = new android.widget.EditText(ctx);
loc3.setText("경험치 : ");
loc3.setTextSize(18);
loc4.setHint("경험치를 입력하세요.");
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
} catch(e) {
toast("블록런처의 버전이 낮아서 사용하실 수 없습니다.");
return;
cm(e+", "+e.lineNumber);
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
loc1.setText("비/눈 강도 : "+(txt1/100));
loc1.setTextSize(18);
loc3.setText("번개 강도 : "+(txt2/100));
loc3.setTextSize(18);
loc2.setMax(100);
loc4.setMax(100);
loc2.setProgress(txt1);
loc4.setProgress(txt2);
loc2.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
onProgressChanged : function(seek){
loc1.setText("비/눈 강도 : "+(seek.getProgress()/100));
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
} catch(e) {
toast("블록런처의 버전이 낮아서 사용하실 수 없습니다.");
return;
cm(e+", "+e.lineNumber);
}
}
}));
}

function simpleD() {
if(simple==false) {
ctx.runOnUiThread(new java.lang.Thread(new java.lang.Runnable({
run : function (){
try {
var layout = new android.widget.LinearLayout(ctx);
mtxt=new android.widget.TextView(ctx);
mtxt.setTextColor(android.graphics.Color.WHITE);
layout.addView(mtxt);

GUIWindow = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth(), ctx.getWindowManager().getDefaultDisplay().getHeight(), false);

GUIWindow.setTouchable(false);
GUIWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
} catch (error) {
cm("error : " + error+""+error.lineNumber);
}
}
})));

var thread = new java.lang.Thread({
run: function() {
while(true) {
thread.sleep(50);
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth()+1;
var day = date.getDate();
var hour = date.getHours();
var minute = date.getMinutes();
var second = date.getSeconds();
var batteryStatus = ctx.registerReceiver(null, new android.content.IntentFilter(android.content.Intent.ACTION_BATTERY_CHANGED));
var level = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_LEVEL, -1);
cm = ctx.getSystemService(ctx.CONNECTIVITY_SERVICE);
var wifi = cm.getNetworkInfo(android.net.ConnectivityManager.TYPE_WIFI);
var mobile = cm.getNetworkInfo(android.net.ConnectivityManager.TYPE_MOBILE);
var check;

if(wifi.isConnectedOrConnecting()) {
check="Wi-Fi";
} else if(mobile.isConnectedOrConnecting()) {
check="LTE/3G";
} else {
check="NONE";
}

if(hour == 0) {
hour = 12;
}

ctx.runOnUiThread(new java.lang.Thread(new java.lang.Runnable({
run : function (){
try {
mtxt.setText("                                                 "+year+"년 "+month+"월 "+day+"일"+" 배터리: "+level+"%"+"\n                                                     "+hour+"시 "+minute+"분 "+second+"초 "+check);
mtxt.setShadowLayer(7,3,3,android.graphics.Color.GRAY);
} catch (error) {
cm("error : " + error+""+error.lineNumber);
}
}
})));
}}
});

thread.start();

} else if(simple==true) {
ctx.runOnUiThread(new java.lang.Thread(new java.lang.Runnable({
run : function (){
try {
GUIWindow.dismiss();
} catch (error) {
cm("error : " + error+""+error.lineNumber);
}
}
})));
}
}

function sendNotice() {
ctx.runOnUiThread(new java.lang.Runnable({
run: function() {
try{
var menu = new android.widget.PopupWindow( );
var layout=new android.widget.LinearLayout(ctx);
var msg;
layout.setOrientation(1);

var title=makeTextView("전체 채팅", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var allchat1 = new android.widget.TextView(ctx);
var allchat2 = new android.widget.EditText(ctx);
allchat1.setText("내용 : ");
allchat1.setTextSize(18);
allchat2.setHint("내용을 입력하세요.");
layout.addView(allchat1);
layout.addView(allchat2);

var send=makeButton("보내기", new android.view.View.OnClickListener({
onClick : function(viewarg){
msg=allchat2.getText().toString();
sc("§d[PDE] "+msg);
hdCheck=allchat2.getText().toString();
allchat2.setText("");
}
}), null);
layout.addView(send);

var mainLayout=scrollAndOut(layout, menu, false);
setWindow(menu, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(error) {
cm("error : " + error+""+error.lineNumber);
}
}}));
}

function browserMain() {
ctx.runOnUiThread(new java.lang.Runnable({
run: function() {
try{
var menu = new android.widget.PopupWindow( );
var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("웹 브라우저", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var google=makeButton("구글", new android.view.View.OnClickListener({
onClick : function(v) {
if(checkInternet()) GOOGLE();
else toast("인터넷에 연결할 수 없습니다. 인터넷 연결여부를 확인하고 다시 시도하세요.");
}
}), null);
layout.addView(google);

var naver=makeButton("네이버", new android.view.View.OnClickListener({
onClick : function(v) {	
if(checkInternet()) NAVER();
else toast("인터넷에 연결할 수 없습니다. 인터넷 연결여부를 확인하고 다시 시도하세요.");
}
}), null);
layout.addView(naver);

var daum=makeButton("다음", new android.view.View.OnClickListener({
onClick : function(v) {
if(checkInternet()) DAUM();
else toast("인터넷에 연결할 수 없습니다. 인터넷 연결여부를 확인하고 다시 시도하세요.");
}
}), null);
layout.addView(daum);

var zum=makeButton("ZUM(줌)", new android.view.View.OnClickListener({
onClick : function(v) {
if(checkInternet()) ZUM();
else toast("인터넷에 연결할 수 없습니다. 인터넷 연결여부를 확인하고 다시 시도하세요.");
}
}), null);
layout.addView(zum);

var bing=makeButton("bing(마이크로소프트)", new android.view.View.OnClickListener({
onClick : function(v) {
if(checkInternet()) BING();
else toast("인터넷에 연결할 수 없습니다. 인터넷 연결여부를 확인하고 다시 시도하세요.");
}
}), null);
layout.addView(bing);

var mainLayout=scrollAndOut(layout, menu, false);
setWindow(menu, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(error) {
cm("error : " + error+""+error.lineNumber);
}
}}));
}


function PotionRecipe() {
ctx.runOnUiThread(new java.lang.Runnable({
run: function() {
try {
var dialog = new android.app.AlertDialog.Builder(ctx);
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var loadWeb = new android.webkit.WebView(ctx);
var webSet = loadWeb.getSettings();
webSet.setJavaScriptEnabled(false);
webSet.setBuiltInZoomControls(true);
webSet.setSaveFormData(false);
webSet.setSavePassword(false);
loadWeb.setWebChromeClient(new android.webkit.WebChromeClient());
loadWeb.setWebViewClient(new android.webkit.WebViewClient());
loadWeb.loadUrl("http://m1.daumcdn.net/thumb/R750x0/?fname=http%3A%2F%2Fcfile29.uf.tistory.com%2Fimage%2F2036994C500DE367362DA4");
layout.addView(loadWeb);
var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout);
dialog.setView(scroll);
dialog.setNegativeButton("닫기", null);
dialog.show();
} catch(e) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function GOOGLE() {
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var menu = new android.widget.PopupWindow();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var layout2 = new android.widget.LinearLayout(ctx);
layout2.setOrientation(1);

var loadWeb = new android.webkit.WebView(ctx);
var webSet = loadWeb.getSettings();

/*webSet.setJavaScriptEnabled(wvsa[1]);
webSet.setBuiltInZoomControls(wvsa[2]);
webSet.setSaveFormData(wvsa[3]);
webSet.setSavePassword(wvsa[4]);*/

loadWeb.setWebChromeClient(new android.webkit.WebChromeClient());
loadWeb.setWebViewClient(new android.webkit.WebViewClient());
loadWeb.loadUrl("http://www.google.co.kr");
layout2.addView(loadWeb);

var exit = makeButton("뒤로/닫기", new android.view.View.OnClickListener({
onClick : function(v){
if(loadWeb.canGoBack()) {
loadWeb.goBack();
} else {
if(menu!=null) {
menu.dismiss();
menu = null;
}
}
}
}), null);
layout.addView(exit);

var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout2);
layout.addView(scroll);
menu.setContentView(layout);
menu.setFocusable(true);

if(wvsa[0]){
menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth());
menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
} else {
menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*2/3);
menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight()*3/4);
}
menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(100, 100, 100, 100)));
menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER|android.view.Gravity.CENTER, 0, 0);
} catch(e) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function NAVER() {
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var menu = new android.widget.PopupWindow();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var layout2 = new android.widget.LinearLayout(ctx);
layout2.setOrientation(1);

var loadWeb = new android.webkit.WebView(ctx);
var webSet = loadWeb.getSettings();

/*webSet.setJavaScriptEnabled(wvsa[1]);
webSet.setBuiltInZoomControls(wvsa[2]);
webSet.setSaveFormData(wvsa[3]);
webSet.setSavePassword(wvsa[4]);*/

loadWeb.setWebChromeClient(new android.webkit.WebChromeClient());
loadWeb.setWebViewClient(new android.webkit.WebViewClient());
loadWeb.loadUrl("http://www.naver.com");
layout2.addView(loadWeb);

var exit = makeButton("뒤로/닫기", new android.view.View.OnClickListener({
onClick : function(v){
if(loadWeb.canGoBack()) {
loadWeb.goBack();
} else {
if(menu!=null) {
menu.dismiss();
menu = null;
}
}
}
}), null);
layout.addView(exit);

var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout2);
layout.addView(scroll);
menu.setContentView(layout);
menu.setFocusable(true);

if(wvsa[0]){
menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth());
menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
} else {
menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*2/3);
menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight()*3/4);
}
menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(100, 100, 100, 100)));
menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER|android.view.Gravity.CENTER, 0, 0);
} catch(e) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function DAUM() {
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var menu = new android.widget.PopupWindow();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var layout2 = new android.widget.LinearLayout(ctx);
layout2.setOrientation(1);

var loadWeb = new android.webkit.WebView(ctx);
var webSet = loadWeb.getSettings();

/*webSet.setJavaScriptEnabled(wvsa[1]);
webSet.setBuiltInZoomControls(wvsa[2]);
webSet.setSaveFormData(wvsa[3]);
webSet.setSavePassword(wvsa[4]);*/

loadWeb.setWebChromeClient(new android.webkit.WebChromeClient());
loadWeb.setWebViewClient(new android.webkit.WebViewClient());
loadWeb.loadUrl("http://www.daum.net");
layout2.addView(loadWeb);

var exit = makeButton("뒤로/닫기", new android.view.View.OnClickListener({
onClick : function(v){
if(loadWeb.canGoBack()) {
loadWeb.goBack();
} else {
if(menu!=null) {
menu.dismiss();
menu = null;
}
}
}
}), null);
layout.addView(exit);

var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout2);
layout.addView(scroll);
menu.setContentView(layout);
menu.setFocusable(true);

if(wvsa[0]){
menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth());
menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
} else {
menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*2/3);
menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight()*3/4);
}
menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(100, 100, 100, 100)));
menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER|android.view.Gravity.CENTER, 0, 0);
} catch(e) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function ZUM() {
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var menu = new android.widget.PopupWindow();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var layout2 = new android.widget.LinearLayout(ctx);
layout2.setOrientation(1);

var loadWeb = new android.webkit.WebView(ctx);
var webSet = loadWeb.getSettings();

/*webSet.setJavaScriptEnabled(wvsa[1]);
webSet.setBuiltInZoomControls(wvsa[2]);
webSet.setSaveFormData(wvsa[3]);
webSet.setSavePassword(wvsa[4]);*/

loadWeb.setWebChromeClient(new android.webkit.WebChromeClient());
loadWeb.setWebViewClient(new android.webkit.WebViewClient());
loadWeb.loadUrl("http://www.zum.com");
layout2.addView(loadWeb);

var exit = makeButton("뒤로/닫기", new android.view.View.OnClickListener({
onClick : function(v){
if(loadWeb.canGoBack()) {
loadWeb.goBack();
} else {
if(menu!=null) {
menu.dismiss();
menu = null;
}
}
}
}), null);
layout.addView(exit);

var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout2);
layout.addView(scroll);
menu.setContentView(layout);
menu.setFocusable(true);

if(wvsa[0]){
menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth());
menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
} else {
menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*2/3);
menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight()*3/4);
}
menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(100, 100, 100, 100)));
menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER|android.view.Gravity.CENTER, 0, 0);
} catch(e) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function BING() {
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var menu = new android.widget.PopupWindow();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var layout2 = new android.widget.LinearLayout(ctx);
layout2.setOrientation(1);

var loadWeb = new android.webkit.WebView(ctx);
var webSet = loadWeb.getSettings();

/*webSet.setJavaScriptEnabled(wvsa[1]);
webSet.setBuiltInZoomControls(wvsa[2]);
webSet.setSaveFormData(wvsa[3]);
webSet.setSavePassword(wvsa[4]);*/

loadWeb.setWebChromeClient(new android.webkit.WebChromeClient());
loadWeb.setWebViewClient(new android.webkit.WebViewClient());
loadWeb.loadUrl("http://www.bing.com");
layout2.addView(loadWeb);

var exit = makeButton("뒤로/닫기", new android.view.View.OnClickListener({
onClick : function(v){
if(loadWeb.canGoBack()) {
loadWeb.goBack();
} else {
if(menu!=null) {
menu.dismiss();
menu = null;
}
}
}
}), null);
layout.addView(exit);

var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout2);
layout.addView(scroll);
menu.setContentView(layout);
menu.setFocusable(true);

if(wvsa[0]){
menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth());
menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
} else {
menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*2/3);
menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight()*3/4);
}
menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(100, 100, 100, 100)));
menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER|android.view.Gravity.CENTER, 0, 0);
} catch(e) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function checkInternet() {
try {
var ctxm = ctx.getSystemService(android.content.Context.CONNECTIVITY_SERVICE);
var mobile = ctxm.getNetworkInfo(ctxm.TYPE_MOBILE);
var wifi = ctxm.getNetworkInfo(ctxm.TYPE_WIFI);
if(mobile.isConnected()||wifi.isConnected()) {
return true;
} else {
return false;
}
} catch(error) {
try {
if(wifi.isConnected()) {
return true;
}
} catch(error) {
cm(e+", "+e.lineNumber);
}
}
}

function showArmorList(tf) {
ctx.runOnUiThread(new java.lang.Runnable({
run: function() {
try {
var dialog = new android.app.AlertDialog.Builder(ctx);
var menus = ["가죽갑옷 세트", "사슬갑옷 세트", "철갑옷 세트", "금갑옷 세트", "다이아몬드갑옷 세트"];
dialog.setItems(menus, new android.content.DialogInterface.OnClickListener({
onClick: function(m, w){
if(tf){
switch(w){
case 0 : 
addItemInventory(298, 1, 0);
addItemInventory(299, 1, 0);
addItemInventory(300, 1, 0);
addItemInventory(301, 1, 0);
break;
case 1 : 
addItemInventory(302, 1, 0);
addItemInventory(303, 1, 0);
addItemInventory(304, 1, 0);
addItemInventory(305, 1, 0);
break;
case 2 : 
addItemInventory(306, 1, 0);
addItemInventory(307, 1, 0);
addItemInventory(308, 1, 0);
addItemInventory(309, 1, 0);
break;
case 3 : 
addItemInventory(314, 1, 0);
addItemInventory(315, 1, 0);
addItemInventory(316, 1, 0);
addItemInventory(317, 1, 0);
break;
case 4 : 
addItemInventory(310, 1, 0);
addItemInventory(311, 1, 0);
addItemInventory(312, 1, 0);
addItemInventory(313, 1, 0);
break;
}
toast(menus[w]+"이(가) 지급되었습니다.");
} else {
switch(w){
case 0 : 
Player.setArmorSlot(0, 298, 0);
Player.setArmorSlot(1, 299, 0);
Player.setArmorSlot(2, 300, 0);
Player.setArmorSlot(3, 301, 0);
break;
case 1 : 
Player.setArmorSlot(0, 302, 0);
Player.setArmorSlot(1, 303, 0);
Player.setArmorSlot(2, 304, 0);
Player.setArmorSlot(3, 305, 0);
break;
case 2 : 
Player.setArmorSlot(0, 306, 0);
Player.setArmorSlot(1, 307, 0);
Player.setArmorSlot(2, 308, 0);
Player.setArmorSlot(3, 309, 0);
break;
case 3 : 
Player.setArmorSlot(0, 314, 0);
Player.setArmorSlot(1, 315, 0);
Player.setArmorSlot(2, 316, 0);
Player.setArmorSlot(3, 317, 0);
break;
case 4 : 
Player.setArmorSlot(0, 310, 0);
Player.setArmorSlot(1, 311, 0);
Player.setArmorSlot(2, 312, 0);
Player.setArmorSlot(3, 313, 0);
break;
}
toast(menus[w]+"을(를) 착용하였습니다.");
}
}
}));
dialog.setTitle("갑옷 종류 선택");
dialog.setNegativeButton("취소", null);
dialog.show();
} catch(e) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function deathHook(murderer, victim) {
if(IS==true) {
if(inventorySave) {
if(Entity.getEntityTypeId(victim) != 63) return;
isPlayerRespawned = true;

for(var i = 9; i <= 44; i++) {
playerInventoryArray[i - 9] = new Array(3);
playerInventoryArray[i - 9][0] = Player.getInventorySlot(i);
playerInventoryArray[i - 9][1] = Player.getInventorySlotCount(i);
playerInventoryArray[i - 9][2] = Player.getInventorySlotData(i);
}
}
}
}

function HelpBook() {
ctx.runOnUiThread(new java.lang.Runnable({
run : function() {
try {
var dialog = new android.app.AlertDialog.Builder(ctx);
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var loadWeb = new android.webkit.WebView(ctx);
loadWeb.setWebChromeClient(new android.webkit.WebChromeClient());
loadWeb.setWebViewClient(new android.webkit.WebViewClient());
loadWeb.loadUrl("http://m.cafe.naver.com/minecraftpe/2423499");
layout.addView(loadWeb);
var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout);
dialog.setView(scroll);
dialog.setNegativeButton("닫기", null);
dialog.show();
} catch(error) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function searchItem() {
ctx.runOnUiThread(new java.lang.Runnable({
run : function() {
try {
var layout = new android.widget.LinearLayout(ctx);
Window = new android.widget.PopupWindow(ctx);
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("아이템 검색", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var search = new android.widget.EditText(ctx);
search.setHint("아이템 이름");
search.setHintTextColor(android.graphics.Color.DKGRAY);
layout.addView(search);
		
var data = new Array();
for(var i=0; i<MCPE_ALL_ITEMS.length; i++) {
data.push(MCPE_ALL_ITEMS[i].name+"  아이디: "+MCPE_ALL_ITEMS[i].id+"  데미지: "+MCPE_ALL_ITEMS[i].data);
}
		
var Adapter = new android.widget.ArrayAdapter( ctx,android.R.layout.simple_list_item_1,data );
var list = new android.widget.ListView(ctx);
list.setAdapter(Adapter);
list.setTextFilterEnabled(true);
		
var ad = list.getAdapter();
search.setImeOptions( android.view.inputmethod.EditorInfo.IME_FLAG_NO_FULLSCREEN);
search.addTextChangedListener(new android.text.TextWatcher({
beforeTextChanged: function(s,start,count,after) {
},

onTextChanged : function(s,start,before,count) {
try {
ad.getFilter().filter(s.toString());
} catch(error) {
cm(e+", "+e.lineNumber);
}},
	
afterTextChanged : function(s) {
try {
if(search.getText().length == 0) {
ad.getFilter().filter(null);
}
} catch(error) {
cm(e+", "+e.lineNumber);
}
}
}));
layout.addView(list);
		
Window.setContentView(layout);
Window.setWidth(dip2px( ctx.getWindowManager().getDefaultDisplay().getWidth()*21/100));
Window.setHeight(dip2px( ctx.getWindowManager().getDefaultDisplay().getHeight()));
Window.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])));
Window.setFocusable(true);
Window.setOutsideTouchable(false);
Window.showAtLocation( ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0));
} catch(error) {
cm("error : \n"+error+" line:"+error.lineNumber);
}}}));
}

function blockP1() {
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try {
var dialog = new android.app.AlertDialog.Builder(ctx);
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var loadWeb = new android.webkit.WebView(ctx);
var webSet = loadWeb.getSettings();
webSet.setJavaScriptEnabled(false);
webSet.setBuiltInZoomControls(true);
webSet.setSaveFormData(false);
webSet.setSavePassword(false);
loadWeb.setWebChromeClient(new android.webkit.WebChromeClient());
loadWeb.setWebViewClient(new android.webkit.WebViewClient());
loadWeb.loadUrl("http://hydra-media.cursecdn.com/minecraft.gamepedia.com/c/c6/DataValuesPE.png");
layout.addView(loadWeb);

var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout);
dialog.setView(scroll);
dialog.setNegativeButton("닫기", null);
dialog.show();
} catch(error) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function blockP2() {
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try {
var dialog = new android.app.AlertDialog.Builder(ctx);
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var loadWeb = new android.webkit.WebView(ctx);
var webSet = loadWeb.getSettings();
webSet.setJavaScriptEnabled(false);
webSet.setBuiltInZoomControls(true);
webSet.setSaveFormData(false);
webSet.setSavePassword(false);
loadWeb.setWebChromeClient(new android.webkit.WebChromeClient());
loadWeb.setWebViewClient(new android.webkit.WebViewClient());
loadWeb.loadUrl("http://hydra-media.cursecdn.com/minecraft.gamepedia.com/d/d1/DataValues.svg");
layout.addView(loadWeb);

var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout);
dialog.setView(scroll);
dialog.setNegativeButton("닫기", null);
dialog.show();
} catch(error) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function entityNameTag() {
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try {
var dialog = new android.app.AlertDialog.Builder(ctx);
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
layout.setGravity(android.view.Gravity.CENTER);
var loc20 = new android.widget.EditText(ctx);
loc20.setHint("이름을 입력하세요.");
layout.addView(loc20);
var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout);
dialog.setView(scroll);
dialog.setTitle("엔티티 이름짓기");
dialog.setNegativeButton("취소", null);
dialog.setPositiveButton("확인", new android.content.DialogInterface.OnClickListener({
onClick : function(v){
entName = loc20.getText()+"";
toast("이름을 부여할 엔티티를 터치하세요.");
}
}));
dialog.show();
} catch(error) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function buildHeightDialog() {
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try {
var dialog = new android.app.AlertDialog.Builder(ctx);
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
layout.setGravity(android.view.Gravity.CENTER);
var loc21 = new android.widget.EditText(ctx);
loc21.setHint("높이를 설정하세요.");
layout.addView(loc21);
var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout);
dialog.setView(scroll);
dialog.setTitle("블록 위로 쌓기");
dialog.setNegativeButton("취소", null);
dialog.setPositiveButton("확인", new android.content.DialogInterface.OnClickListener({
onClick : function(v){
Height = loc21.getText()+"";
toast("블록 위로 쌓기 기능이 켜졌습니다.");
}
}));
dialog.show();
} catch(error) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function buildDownDialog() {
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try {
var dialog = new android.app.AlertDialog.Builder(ctx);
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
layout.setGravity(android.view.Gravity.CENTER);
var loc22 = new android.widget.EditText(ctx);
loc22.setHint("높이를 설정하세요.");
layout.addView(loc22);
var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout);
dialog.setView(scroll);
dialog.setTitle("블록 아래로 쌓기");
dialog.setNegativeButton("취소", null);
dialog.setPositiveButton("확인", new android.content.DialogInterface.OnClickListener({
onClick : function(v){
Down = loc22.getText()+"";
toast("블록 아래로 쌓기 기능이 켜졌습니다.");
}
}));
dialog.show();
} catch(error) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function up(x,y,z,he) {
Level.setTile(x,y+he,z,20);
Entity.setPosition(Player.getEntity(), x, y+he+5, z);
}

function newItemName() {
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try {
var dialog = new android.app.AlertDialog.Builder(ctx);
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
layout.setGravity(android.view.Gravity.CENTER);
var name = new android.widget.TextView(ctx);
name.setText("아이템 이름 : ");
name.setTextSize(18);
name.setTextColor(white);
var name2 = new android.widget.EditText(ctx);
name2.setHint("아이템의 새로운 이름을 입력하세요.");
name2.setTextColor(white);
layout.addView(name);
layout.addView(name2);
var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout);
dialog.setView(scroll);
dialog.setTitle("아이템 이름 변경");
dialog.setNegativeButton("원래대로", new android.content.DialogInterface.OnClickListener({
onClick : function(v){
var Fname=Item.getName(getCarriedItem(Player.getEntity()));
Player.setItemCustomName(Player.getSelectedSlotId(), Fname);
toast("아이템의 이름을 원래대로 변경하였습니다.");
}
}));
dialog.setPositiveButton("확인", new android.content.DialogInterface.OnClickListener({
onClick : function(v){
Player.setItemCustomName(Player.getSelectedSlotId(), name2.getText().toString());
toast("아이템의 이름을 "+name2.getText()+"(으)로 변경하였습니다.");
}
}));
dialog.show();
} catch(e) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function enchantMenu() {
try {
var enchantMenuWindow = new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("인첸트", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var enc = new Array();
var picker = new android.widget.NumberPicker(ctx);
var select;
var slot;

for(var i=0; i < enchantType.length; i++) {
enc.push(enchantType[i].name);
}

picker.setMinValue(0);
picker.setMaxValue(24);
picker.setDisplayedValues(enc);
layout.addView(picker);

var settings=makeTextView("세부설정 : ", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(settings);

var enchantParams=new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);

var level=makeTextView("강도 : ", 15, android.graphics.Color.WHITE, textParams.hint);

var editLevel=makeEditText(android.text.InputType.TYPE_CLASS_NUMBER | android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL | android.text.InputType.TYPE_NUMBER_FLAG_SIGNED, null, null, enchantParams);

layout.addView(makeEffectInput(level, editLevel));

var Ok=makeButton("확인", new android.view.View.OnClickListener({
onClick : function(v){
for(var e=0; e<enchantType.length; e++) {
if(enchantType[e].name == enc[picker.getValue()]) {
select = enchantType[e].code;
break;
}
}
Player.enchant(Player.getSelectedSlotId(),select,editLevel.getText().toString());
}
}), null);
layout.addView(Ok);

var del=makeButton("인첸트 해제", new android.view.View.OnClickListener({
onClick : function(v){
var itemName = Player.getItemCustomName(Player.getSelectedSlotId());
Entity.setCarriedItem(Player.getEntity(), getCarriedItem(), Player.getCarriedItemCount(), Player.getCarriedItemData());
if(itemName!=null) Player.setItemCustomName(Player.getSelectedSlotId(), itemName);
return true;
}
}), null);
layout.addView(del);

var mainLayout=scrollAndOut(layout, enchantMenuWindow, false);
setWindow(enchantMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
cm(e+", "+e.lineNumber);
}
}

function antiTerrorMain() {
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try {
var antiTerrorMainWindow = new android.widget.PopupWindow( );

var menu = new android.widget.PopupWindow( );
var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("테러방지옵션", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var prt=new android.widget.ToggleButton(ctx);
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
sc("§d[PDE] 테러방지가 활성화 되었습니다.");
} else if(!prt.isChecked() && terer==true) {
terer=false;
sc("§d[PDE] 테러방지가 비활성화 되었습니다.");
}
}}));
layout.addView(prt);

var prt2=new android.widget.ToggleButton(ctx);
prt2.setTextOn("폭발방지 ON");
prt2.setTextOff("폭발방지 OFF");
if(terror==true) {
prt2.setChecked(true);
} else if(terror==false) {
prt2.setChecked(false);
}
prt2.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function( ) {
if(prt2.isChecked() && terror==false) {
terror=true;
sc("§d[PDE] 폭발방지가 활성화 되었습니다.");
} else if(!prt2.isChecked() && terror==true) {
terror=false;
sc("§d[PDE] 폭발방지가 비활성화 되었습니다.");
}
}}));
layout.addView(prt2);

var prt3=new android.widget.ToggleButton(ctx);
prt3.setTextOn("광역파괴방지 ON");
prt3.setTextOff("광역파괴방지 OFF");
if(GD==true) {
prt3.setChecked(true);
} else if(GD==false) {
prt3.setChecked(false);
}
prt3.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function( ) {
if(prt3.isChecked() && GD==false) {
GD=true;
sc("§d[PDE] 광역파괴방지가 활성화 되었습니다.");
} else if(!prt3.isChecked() && GD==true) {
GD=false;
sc("§d[PDE] 광역파괴방지가 비활성화 되었습니다.");
}
}}));
layout.addView(prt3);

var prt4=new android.widget.ToggleButton(ctx);
prt4.setTextOn("채팅방지 ON");
prt4.setTextOff("채팅방지 OFF");
if(noC==true) {
prt4.setChecked(true);
} else if(noC==false) {
prt4.setChecked(false);
}
prt4.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function( ) {
if(prt4.isChecked() && noC==false) {
sc("§d[PDE] 채팅방지가 활성화 되었습니다.");
noC=true;
} else if(!prt4.isChecked() && noC==true) {
noC=false;
sc("§d[PDE] 채팅방지가 비활성화 되었습니다.");
}
}}));
layout.addView(prt4);

var prt7=new android.widget.ToggleButton(ctx);
prt7.setTextOn("포션방지 ON");
prt7.setTextOff("포션방지 OFF");
if(antiPotion==true) {
prt7.setChecked(true);
} else if(antiPotion==false) {
prt7.setChecked(false);
}
prt7.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function( ) {
if(prt7.isChecked() && antiPotion==false) {
sc("§d[PDE] 포션방지가 활성화 되었습니다.");
antiPotion=true;
} else if(!prt7.isChecked() && antiPotion==true) {
antiPotion=false;
sc("§d[PDE] 포션방지가 비활성화 되었습니다.");
}
}}));
layout.addView(prt7);

var prt6=new android.widget.ToggleButton(ctx);
prt6.setTextOn("발사기설치방지 ON");
prt6.setTextOff("발사기설치방지 OFF");
if(antiL==true) {
prt6.setChecked(true);
} else if(antiL==false) {
prt6.setChecked(false);
}
prt6.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function( ) {
if(prt6.isChecked() && antiL==false) {
sc("§d[PDE] 발사기설치방지가 활성화 되었습니다.");
antiL=true;
} else if(!prt6.isChecked() && antiL==true) {
antiL=false;
sc("§d[PDE] 발사기설치방지가 비활성화 되었습니다.");
}
}}));
layout.addView(prt6);

var prt5=new android.widget.ToggleButton(ctx);
prt5.setTextOn("블록설치방지 ON");
prt5.setTextOff("블록설치방지 OFF");
if(antiBlock==true) {
prt5.setChecked(true);
} else if(antiBlock==false) {
prt5.setChecked(false);
}
prt5.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function( ) {
if(prt5.isChecked() && antiBlock==false) {
sc("§d[PDE] 블록설치방지가 활성화 되었습니다.");
antiBlock=true;
} else if(!prt5.isChecked() && antiBlock==true) {
antiBlock=false;
sc("§d[PDE] 블록설치방지가 비활성화 되었습니다.");
}
}}));
layout.addView(prt5);

var at=new android.widget.ToggleButton(ctx);
at.setTextOn("서버장 포함 ON");
at.setTextOff("서버장 포함 OFF");
at.setChecked(adTer);
at.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function(toggle, onoff){
if(onoff==true) {
adTer = true;
toast("이제부터 모든 테러방지에 서버장도 포함됩니다.");
} else if(onoff==false) {
adTer = false;
toast("이제부터 모든 테러방지에 서버장은 포함되지 않습니다.");
}
}
}));
layout.addView(at);

var terL=new android.widget.Button(ctx);
terL.setText("테러기록");
terL.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(v){
showDialog("테러기록", terrorLog);
toast("폭발방지와 채팅방지는 기록되지 않습니다.");
}
}));
terL.setOnLongClickListener(new android.view.View.OnLongClickListener({
onLongClick : function(v){
terrorLog = "";
toast("테러기록이 초기화되었습니다.");
return true;
}
}));
layout.addView(terL);

var terH=new android.widget.Button(ctx);
terH.setText("도움말");
terH.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(v){
showDialog("도움말", "테러방지 목록 : TNT, 라이터, 물(양동이), 용암(양동이)\n폭발방지 목록 : TNT의 폭발, 크리퍼의 폭발, explode함수의 폭발\n광역파괴방지 : 광역파괴를 방지합니다.\n채팅방지 : 채팅을 사용할수 없게 됩니다.\n서버장 포함 ON/OFF : 테러방지와 폭발방지에 서버장을 포함시킬지 포함시키지않을지 결정합니다.\n테러기록 : 테러기록을 볼 수 있습니다. 이 버튼을 길게 누르면 테러기록이 초기화됩니다.");
}
}));
layout.addView(terH);

var mainLayout=scrollAndOut(layout, antiTerrorMainWindow, false);

setWindow(antiTerrorMainWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
cm(e);
}
}
}));
}

function itemViewT() {
if(itemView==true) {
ctx.runOnUiThread(new java.lang.Thread(new java.lang.Runnable({
run : function (){
try {
var layout = new android.widget.LinearLayout(ctx);
mtxt2=new android.widget.TextView(ctx);
mtxt2.setTextColor(android.graphics.Color.WHITE);
layout.addView(mtxt2);

GUIWindow2 = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth(), ctx.getWindowManager().getDefaultDisplay().getHeight(), false);

GUIWindow2.setTouchable(false);
GUIWindow2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
} catch (error) {
cm("error : " + error+""+error.lineNumber);
}
}
})));

var thread = new java.lang.Thread({
run : function(){
while(true) {
thread.sleep(50);

var cri=Player.getCarriedItem();
var crd=Player.getCarriedItemData();
var crn=Item.getName(cri, crd);

ctx.runOnUiThread(new java.lang.Thread(new java.lang.Runnable({
run : function(){
try {
mtxt2.setText("들고있는 아이템: "+crn+" | 아이디: "+cri+" | 데미지: "+crd);
mtxt2.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(100, 100, 100, 100)));
} catch(error) {
cm("error : " + error+""+error.lineNumber);
}
}
})));
}}
});

thread.start();

} else if(itemView==false) {
ctx.runOnUiThread(new java.lang.Thread(new java.lang.Runnable({
run : function(){
try {
GUIWindow2.dismiss();
} catch(error) {
cm("error : " + error+""+error.lineNumber);
}
}
})));
}
}

function initializeRoadMaker(x, y, z) {
roadMakerPos = [gauss(x), y, gauss(z)];
deltaX = 0;
deltaZ = 0;
isRoadMakerOn = true;
}

function roadMaker(x, y, z, deltaX, deltaZ, block, blockData) {
if(Level.getTile(x + deltaX, y, z + deltaZ) != 0 && (deltaX != 0 || deltaZ != 0)) {
stopRoadMaker();
toast("진행방향에 블록이 있어 로드메이커 기능이 종료되었습니다.");
return;
}
Level.setTile(x + deltaX, y, z + deltaZ, block, blockData);
}

function stopRoadMaker() {
isRoadMakerOn = false;
deltaX = 0;
deltaZ = 0;
toast("로드메이커 기능을 종료되었습니다.");
}

function int2deg(int) {
return (int * Math.PI/180);
}

function gauss(num) {
if(num >= 0)
return parseInt(num);
else if(num < 0)
return parseInt(num - 1);
}

function explodeHook(e, x, y, z, p, f) {
if(adTer||(!adTer&&ad!=Player.getEntity())) {
if(terror==true) {
preventDefault();
if(Entity.getEntityTypeId(e)==0)
toast("TNT의 폭발을 막았습니다.");
if(Entity.getEntityTypeId(e)==33)
toast("크리퍼의 폭발을 막았습니다.");
if(Entity.getEntityTypeId(e)==63)
toast("explode 함수의 폭발을 막았습니다.");
}
}
}

/*
function uuidMenu( ) {
try {
var uuidMenuWindow = new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("영구밴(UUID)", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var nickname=makeTextView("영구밴 할 플레이어 :", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(nickname);

var player=makeEditText(android.text.InputType.TYPE_CLASS_TEXT, "", null, null);
layout.addView(player);

var banneduuidList=makeButton("영구밴 목록", new android.view.View.OnClickListener({
onClick : function(v){
if(serverManager.UUIDBanList.length)
uuidSelectionMenu(player);
}
}), null);
layout.addView(banneduuidList);

var ban=makeButton("영구밴", new android.view.View.OnClickListener({
onClick : function(v){
serverManager.UUIDBan(player.getText());
}
}), null);
layout.addView(ban);

var pardon=makeButton("영구밴 해제", new android.view.View.OnClickListener({
onClick : function(v){
serverManager.pardonUUID(player.getText());
}
}), null);
layout.addView(pardon);

var mainLayout=scrollAndOut(layout, uuidMenuWindow, false);

setWindow(uuidMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
cm(e+", "+e.lineNumber);
}
}

function uuidSelectionMenu(editText) {
try {
var uuidSelectionMenuWindow = new android.widget.PopupWindow( );

var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("영구밴 플레이어 목록", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var uuidRadioGroup=new android.widget.RadioGroup(ctx);
uuidRadioGroup.setOrientation(1);
uuidRadioGroup.setGravity(android.view.Gravity.LEFT|android.view.Gravity.TOP);

for(var i=0; i<serverManager.UUIDBanList.length; i++) {
makeuuidRadioButton(serverManager.UUIDBanList[i], uuidRadioGroup, i);
}

uuidRadioGroup.check(0);
layout.addView(uuidRadioGroup);

var Ok=makeButton("확인", new android.view.View.OnClickListener({
onClick : function(v){
editText.setText(serverManager.UUIDBanList[uuidRadioGroup.getCheckedRadioButtonId( )]);
uuidSelectionMenuWindow.dismiss( );
}
}), null);
layout.addView(Ok);

var mainLayout=scrollAndOut(layout, uuidSelectionMenuWindow, false);

setWindow(uuidSelectionMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
cm(e+", "+e.lineNumber);
}
}
*/

function whitelistMenu( ) {
try {
var whitelistMenuWindow = new android.widget.PopupWindow( );
var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("화이트리스트", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var nickname=makeTextView("화이트리스트에\n추가 할 플레이어 :", 15, android.graphics.Color.WHITE, textParams.hint);
layout.addView(nickname);

var putNickname=makeEditText(android.text.InputType.TYPE_CLASS_TEXT, "", null, null);
layout.addView(putNickname);

var wlonoff = new android.widget.ToggleButton(ctx);
wlonoff.setTextOn("화이트리스트 ON");
wlonoff.setTextOff("화이트리스트 OFF");
wlonoff.setChecked(wl);
wlonoff.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function(toggle, onoff){
if(onoff==true) {
wl = true;
toast("화이트리스트가 활성화 되었습니다.");
} else if(onoff==false) {
wl = false;
toast("화이트리스트가 비활성화 되었습니다.");
}
}
}));
layout.addView(wlonoff);

var whiteList=makeButton("화이트리스트 목록", new android.view.View.OnClickListener({
onClick : function(v){
if(serverManager.whitelist.length)
whitelistSelectionMenu(putNickname);
}
}), null);
layout.addView(whiteList);

var addWl=makeButton("화이트리스트 추가", new android.view.View.OnClickListener({
onClick : function(v){
if(wl==false) {
toast("화이트리스트를 활성화 해주세요.");
} else if(wl==true) {
serverManager.addWhitelist(putNickname.getText( ));
}
}
}), null);
layout.addView(addWl);

var removeWl=makeButton("화이트리스트 제거", new android.view.View.OnClickListener({
onClick : function(v){
if(wl==false) {
toast("화이트리스트를 활성화 해주세요.");
} else if(wl==true) {
serverManager.removeWhitelist(putNickname.getText( ));
}
}
}), null);
layout.addView(removeWl);

var removeallWl=makeButton("모든 화이트리스트 제거", new android.view.View.OnClickListener({
onClick : function(v){
if(wl==false) {
toast("화이트리스트를 활성화 해주세요.");
} else if(wl==true) {
serverManager.whitelist = "";
}
}
}), null);
layout.addView(removeallWl);

var mainLayout=scrollAndOut(layout, whitelistMenuWindow, false);

setWindow(whitelistMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
cm(e+", "+e.lineNumber);
}
}

function whitelistSelectionMenu( ) {
try {
var whitelistSelectionMenuWindow = new android.widget.PopupWindow( );
var layout=new android.widget.LinearLayout(ctx);
layout.setOrientation(1);

var title=makeTextView("화이트리스트 목록", 20, android.graphics.Color.YELLOW, textParams.subtitle);
layout.addView(title);

var whitelistRadioGroup=new android.widget.RadioGroup(ctx);
whitelistRadioGroup.setOrientation(1);
whitelistRadioGroup.setGravity(android.view.Gravity.LEFT|android.view.Gravity.TOP);

for(var i=0; i<serverManager.whitelist.length; i++) {
makeNicknameRadioButton(serverManager.whitelist[i], whitelistRadioGroup, i);
}

whitelistRadioGroup.check(0);
layout.addView(whitelistRadioGroup);

var Ok=makeButton("확인", new android.view.View.OnClickListener({
onClick : function(v){
//editText.setText(serverManager.whitelist[whitelistRadioGroup.getCheckedRadioButtonId( )]);
whitelistSelectionMenuWindow.dismiss( );
}
}), null);
layout.addView(Ok);

var mainLayout=scrollAndOut(layout, whitelistSelectionMenuWindow, false);

setWindow(whitelistSelectionMenuWindow, mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()*3/7, ctx.getWindowManager().getDefaultDisplay().getHeight(), new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(options.color[0], options.color[1], options.color[2], options.color[3])), true, [ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,dip2px(0),dip2px(0)]);
} catch(e) {
cm(e+", "+e.lineNumber);
}
}

function saveFile(msg) {
try {
var file = new java.io.File(sdcard+"/Team Create Ver.txt");
var fos = new java.io.FileOutputStream(file);
var str = new java.lang.String(msg);
fos.write(str.getBytes());
fos.close();
} catch(e) {
cm(e+", "+e.lineNumber);
}
}



function closeCamera() {
ctx.runOnUiThread(new java.lang.Thread(new java.lang.Runnable({
run : function(){
try {
var layout = new android.widget.LinearLayout(ctx);
var close = new android.widget.Button(ctx);

close.setText("해제");
close.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(v) {
ModPE.setCamera(getPlayerEnt());
GUIWindow.dismiss();
}
}));
layout.addView(close);

GUIWindow = new android.widget.PopupWindow(layout, dip2px(200),dip2px(50),false);
GUIWindow.setTouchable(true);
GUIWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.LEFT, 0,0);
} catch(e) {
cm(e+", "+e.lineNumber);
}
}
})));
}

function chatReceiveHook(str,sender) {
if(adTer||(!adTer&&ad!=Player.getEntity())) {
if(noC==true) {
preventDefault();
}
}
}

function itemSet() {
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try {
var dialog = new android.app.AlertDialog.Builder(ctx);
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
layout.setGravity(android.view.Gravity.CENTER);
var name = new android.widget.TextView(ctx);
name.setText("아이템 수량 : ");
name.setTextSize(18);
name.setTextColor(white);
var set = new android.widget.EditText(ctx);
set.setHint("추가로 지급할 수량을 입력하세요..");
layout.addView(name);
layout.addView(set);
var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout);
dialog.setView(scroll);
dialog.setTitle("아이템 수량 늘리기");
dialog.setNegativeButton("취소", null);
dialog.setPositiveButton("확인", new android.content.DialogInterface.OnClickListener({
onClick : function(v){
Player.addItemInventory(getCarriedItem(),+set.getText());
toast(set.getText()+"개만큼 추가 지급하였습니다.");
}
}));
dialog.show();
} catch(e) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function Feedback() {
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try {
var dialog = new android.app.AlertDialog.Builder(ctx);
dialog.setTitle("피드백");
dialog.setMessage("이동을 누르시면 피드백 사이트로 이동합니다.");
dialog.setNegativeButton("취소", null);
dialog.setPositiveButton("이동", new android.content.DialogInterface.OnClickListener({
onClick : function(v){
var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("http://me2.do/5IKnslmd"));
ctx.startActivity(intent);
}
}));
dialog.show();
} catch(e) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function NULdownload() {
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('E c=["\\j\\f\\p\\g\\f","\\j\\n\\b\\b\\u","\\P\\C\\g\\b\\p\\k","\\n\\p\\d\\l","\\i\\w\\p\\d\\k\\h\\d\\l\\i\\F\\g\\b\\d\\b\\r\\h\\k\\b\\i\\w\\p\\d\\k\\h\\d\\l\\Z\\k\\m\\f\\h\\g\\i\\d\\b\\o\\z\\j\\b\\g\\x\\h\\l\\m\\d\\s\\f\\q\\f","\\m\\h","\\b\\q\\m\\j\\f\\j","\\k\\b\\n\\b\\f\\b","\\C\\f\\f\\u\\j\\N\\i\\i\\o\\o\\o\\s\\k\\g\\h\\u\\r\\h\\q\\s\\O\\h\\v\\i\\j\\i\\V\\Y\\g\\l\\B\\q\\13\\y\\r\\b\\v\\B\\g\\15\\y\\i\\d\\b\\o\\z\\j\\b\\g\\x\\h\\l\\m\\d\\s\\f\\q\\f\\G\\k\\n\\H\\I","\\J\\K","\\n\\m\\d\\b\\L\\M\\v\\r\\b\\g"];A t[c[3]].Q({R:S(){t[c[3]][c[2]][c[1]](T);U{E a=A t[c[5]].W(X+c[4]);D(a[c[6]]()){a[c[7]]()};D(11(c[4],c[8])){}}12(e){14(e+c[9]+e[c[10]])}}})[c[0]]()',62,68,'|||||||||||x65|_0x5208|x6E||x74|x72|x6F|x2F|x73|x64|x67|x69|x6C|x77|x61|x78|x62|x2E|java|x70|x6D|x50|x4C|x79|x55|new|x37|x68|if|var|x49|x3F|x3D|x31|x2C|x20|x4E|x75|x3A|x63|x54|Thread|run|function|1000|try|x32|File|sdcard|x7A|x45||download|catch|x35|cm|x6A'.split('|'),0,{}))
}

function PDEdownload() {
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('F c=["\\l\\b\\n\\k\\b","\\l\\o\\d\\d\\w","\\I\\E\\k\\d\\n\\g","\\o\\n\\j\\u","\\h\\D\\n\\j\\g\\f\\j\\u\\h\\U\\k\\d\\j\\d\\q\\f\\g\\d\\h\\D\\n\\j\\g\\f\\j\\u\\O\\g\\v\\b\\f\\k\\h\\s\\i\\i\\r\\m\\b\\f\\m\\b\\t\\b\\p\\b","\\v\\f","\\d\\p\\v\\l\\b\\l","\\g\\d\\o\\d\\b\\d","\\E\\b\\b\\w\\l\\N\\h\\h\\x\\x\\x\\t\\g\\k\\f\\w\\q\\f\\p\\t\\r\\f\\C\\h\\l\\h\\s\\i\\A\\k\\X\\d\\l\\u\\A\\f\\b\\i\\p\\q\\Y\\h\\s\\i\\i\\17\\G\\H\\r\\m\\b\\f\\m\\b\\t\\b\\p\\b\\19\\g\\o\\J\\s","\\s\\i\\i\\r\\m\\b\\f\\m\\b","\\n\\q\\r\\g","\\K\\L","\\o\\v\\j\\d\\M\\m\\C\\q\\d\\k"];B y[c[3]].P({Q:R(){y[c[3]][c[2]][c[1]](S);T{F a=B y[c[5]].V(W+c[4]);z(a[c[6]]()){a[c[7]]()};z(Z(c[4],c[8])){z(13(c[9])==c[10]){14()}15{}}}16(e){18(e+c[11]+e[c[12]])}}})[c[0]]()',62,72,'|||||||||||x74|_0xabad|x65||x6F|x64|x2F|x33|x6E|x72|x73|x75|x61|x6C|x78|x62|x63|x31|x2E|x67|x69|x70|x77|java|if|x38|new|x6D|x50|x68|var|x32|x30|x54|x3D|x2C|x20|x4E|x3A|x45|Thread|run|function|1000|try|x49|File|sdcard|x76|x66|download||||readData|Shutdown|else|catch|x25|cm|x3F'.split('|'),0,{}))
}

function Shutdown() {
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try {
var dialog = new android.app.AlertDialog.Builder(ctx);
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var text = new android.widget.TextView(ctx);
text.setText("\n PandongEditor "+info.version+"은/는 제작자가 원격으로 작동을 차단하여 작동하지 않습니다.\n MCPE Korea에서 최신버전을 받아주세요.");
text.setTextSize(17);
text.setTextColor(white);
layout.addView(text);
var maker = new android.widget.TextView(ctx);
maker.setText("\n © 2015-2016 Pandong & Irenebode, All rights reserved.\n");
maker.setTextSize(11);
maker.setTextColor(white);
maker.setGravity(android.view.Gravity.CENTER);
layout.addView(maker);
var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout);
dialog.setView(scroll);
dialog.setTitle("PandongEditor 경고");
dialog.setNegativeButton("확인", null);
dialog.setNeutralButton("차단 이유", new android.content.DialogInterface.OnClickListener({
onClick : function(v){
reason();
}
}));
dialog.setPositiveButton("제작자 카페 메인", new android.content.DialogInterface.OnClickListener({
onClick: function(v){
var uri = new android.net.Uri.parse("http://m.cafe.naver.com/CafeMemberProfile.nhn?cafeId=23683173&memberId=kth020315");
var link = new android.content.Intent(android.content.Intent.ACTION_VIEW, uri);
ctx.startActivity(link);
}
}));
dialog.show();
var noti = new android.app.Notification.Builder(ctx);
noti.setSmallIcon(android.R.drawable.ic_menu_info_details);
noti.setContentTitle("PandongEditor 경고");
noti.setContentText("이 버전의 PandongEditor는 더 이상 작동하지 않습니다.");
noti.setContentInfo("PandongEditor "+info.version);
noti.setOngoing(false);
ctx.getSystemService(android.content.Context.NOTIFICATION_SERVICE).notify(1, noti.getNotification());
} catch(e) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function reason() {
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try{
var dialog = new android.app.AlertDialog.Builder(ctx);
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var loadWeb = new android.webkit.WebView(ctx);
loadWeb.setWebChromeClient(new android.webkit.WebChromeClient());
loadWeb.setWebViewClient(new android.webkit.WebViewClient());
loadWeb.loadUrl("http://ib1694.dothome.co.kr/PandongEditor/reason.htm");
layout.addView(loadWeb);
var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout);
dialog.setView(scroll);
dialog.setTitle("PandongEditor "+info.version+" 차단 이유");
dialog.setNegativeButton("닫기", null);
dialog.show();
} catch(e) {
cm(e+", "+e.lineNumber);
}
}
}));
}

function Ap() {
try {
if(adTer||(!adTer&&ad!=Player.getEntity())) {
if(antiPotion==true) {
var i = Entity.getAll();
for each(e in i)
if(Player.isPlayer(e)) {
Entity.removeAllEffects(e);
}
} else {
//null
}
}
} catch(e) {
//null
}
}

function loginDialog() {
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('x j=["\\1N\\z\\k\\v\\l\\1d\\m\\q\\z\\r\\A","\\q\\1c\\1c","\\C\\m\\E\\A\\k\\l","\\p\\k\\l\\Y\\v\\m\\k\\n\\l\\q\\l\\m\\r\\n","\\F\\M\\1j\\o\\1s\\o","\\p\\k\\l\\B\\k\\G\\l","\\p\\k\\l\\B\\k\\G\\l\\1O\\m\\1S\\k","\\F\\M\\1j\\H\\o\\D\\1n\\1m\\1l\\1k\\s\\s\\s","\\p\\k\\l\\1P\\m\\n\\l","\\q\\E\\E\\1h\\m\\k\\C","\\1f\\1e\\1b\\1a\\o\\1s\\o","\\1f\\1e\\1b\\1a\\H\\o\\D\\1n\\1m\\1l\\1k\\s\\s\\s","\\p\\k\\l\\1h\\m\\k\\C","\\Z\\1Z\\W","\\p\\k\\l\\B\\m\\l\\z\\k","\\2l\\1v","\\p\\k\\l\\J\\k\\A\\q\\l\\m\\P\\k\\L\\y\\l\\l\\r\\n","\\O\\1g\\K\\D","\\n\\k\\C\\Q\\p\\k\\v\\1x\\r\\A\\m\\n","\\l\\v\\y\\k","\\1C\\1E\\1F\\K\\o\\O\\1g\\K\\D\\1G\\1I\\1J\\o\\1L\\1M\\R\\S\\T\\s","\\1d\\m\\q\\z\\r\\A\\1Q\\n\\l\\k\\v\\1R\\q\\U\\k","\\U\\r\\n\\l\\k\\n\\l","\\p\\k\\l\\J\\k\\y\\l\\v\\q\\z\\L\\y\\l\\l\\r\\n","\\1T\\W","\\1U\\1V\\Z\\1W\\V\\o\\2a\\M\\V\\H\\o\\2b\\F\\2p\\2d\\o\\2g\\R\\S\\T\\s\\s\\s","\\A\\k\\l\\B\\k\\G\\l","\\p\\k\\l\\2k\\r\\p\\m\\l\\m\\P\\k\\L\\y\\l\\l\\r\\n","\\p\\X\\r\\C","\\2n\\o","\\z\\m\\n\\k\\J\\y\\1t\\1u\\k\\v","\\z\\q\\n\\A","\\v\\y\\n\\Y\\n\\Q\\m\\B\\X\\v\\k\\q\\E"];w[j[1w]](u 1y[j[1z]].1A({1B:I(){1D{x b=u t[j[1]][j[0]].1H(w);x c=u t[j[2]].1K(w);c[j[3]](1);x d=u t[j[2]].N(w);x f=u t[j[2]].1i(w);d[j[5]](j[4]);d[j[6]](18);f[j[8]](j[7]);c[j[9]](d);c[j[9]](f);x g=u t[j[2]].N(w);x h=u t[j[2]].1i(w);g[j[5]](j[10]);g[j[6]](18);h[j[8]](j[11]);c[j[9]](g);c[j[9]](h);x i=t[j[2]].1X(w);i[j[9]](c);b[j[12]](i);b[j[14]](j[13]);b[j[16]](j[15],1Y);b[j[23]](j[17],u t[j[22]][j[21]].1o({1p:I(a){2e(2f(j[18])==j[19]){1q(j[20])}2h{2i()}}}));b[j[27]](j[24],u t[j[22]][j[21]].1o({1p:I(a){1q(j[25]);2j(f[j[26]]().1r(),h[j[26]]().1r())}}));b[j[28]]()}2m(e){2o(e+j[29]+e[j[2c]])}}}))',62,150,'|||||||||||||||||||_0xec08|x65|x74|x69|x6E|x20|x73|x61|x6F|x2E|android|new|x72|ctx|var|x75|x6C|x67|x54|x77|uC785|x64|uC544|x78|uB97C|function|x4E|uAC00|x42|uC774|TextView|uD68C|x76|x55|uC2B5|uB2C8|uB2E4|x63|uD130|uC778|x68|x4F|uB85C|||||||||||uD638|uBC88|x70|x44|uBC00|uBE44|uC6D0|x56|EditText|uB514|uC694|uC138|uD558|uB825|OnClickListener|onClick|toast|toString|x3A|x6D|x62|uC18C|32|x4C|java|31|Runnable|run|uC81C|try|uC791|uC790|uC2E0|Builder|uCCAD|uC744|LinearLayout|uB9C9|uC558|x41|x53|x48|x49|x66|x7A|uD655|uC11C|uBC84|uBD80|ScrollView|null|uADF8|||||||||||uB370|uBC1B|30|uACE0|if|readData|uC788|else|newlogin|login|x50|uCDE8|catch|x2C|cm|uC624'.split('|'),0,{}))
}

function login(userId, password) {
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8 7=["\\j\\f\\k\\E\\f","\\R","\\j\\X\\m\\12\\f","\\g\\g","\\M\\P\\Q\\9\\U\\W\\l\\h\\i\\13","\\q\\r\\s\\t\\9\\u\\v\\w\\x\\y\\9\\z\\A\\B\\C\\9\\D\\l\\h\\i","\\m\\k\\18\\F"];G H[7[6]].I({J:K(){L{8 a=N().O()[7[2]](7[1]);8 b=S;T(8 c V a){8 d=a[c][7[2]](7[3]);n(d[0]==Z){n(d[1]==10){11=o;p(7[4])}14{p(7[5]);15()};b=o;16}}}17(e){Y()}}})[7[0]]()',62,71,'|||||||_0x17dc|var|x20||||||x74|x3A|uB2C8|uB2E4|x73|x61|uC2B5|x6C|if|true|toast|uC544|uC774|uB514|uC640|uBE44|uBC00|uBC88|uD638|uAC00|uC77C|uCE58|uD558|uC9C0|uC54A|x72|x67|new|java|Thread|run|function|try|uB85C|getLoginData|toString|uADF8|uC778|x0A|false|for|uB418|in|uC5C8|x70|UserX|userId|password|isLogined|x69|x2E|else|loginDialog|break|catch|x6E'.split('|'),0,{}))
}

function getLoginData() {
try {
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('h b=["\\g\\j\\c\\p","\\o\\d\\d\\k\\f\\J\\n\\n\\s\\s\\s\\w\\q\\v\\e\\k\\K\\e\\G\\w\\i\\e\\z\\n\\f\\n\\g\\s\\c\\T\\p\\o\\a\\I\\a\\j\\o\\g\\v\\o\\p\\n\\g\\e\\p\\l\\c\\r\\g\\j\\f\\f\\w\\d\\G\\d\\M\\q\\g\\O\\P","\\c\\a\\d","\\e\\k\\a\\c\\r\\e\\c\\c\\a\\i\\d\\l\\e\\c","\\f\\a\\d\\r\\e\\c\\c\\a\\i\\d\\Q\\l\\z\\a\\e\\C\\d","\\f\\a\\d\\U\\f\\a\\r\\j\\i\\o\\a\\f","\\p\\a\\d\\W\\c\\k\\C\\d\\13\\d\\v\\a\\j\\z","\\l\\e","\\v\\a\\j\\q\\15\\l\\c\\a","\\H","\\j\\k\\k\\a\\c\\q","\\i\\g\\e\\f\\a","\\q\\l\\f\\i\\e\\c\\c\\a\\i\\d"];h A=t u[b[0]].L();h B=t u[b[2]].N(b[1]);h m=B[b[3]]();D(m!=E){m[b[4]](R);m[b[5]](S);h F=t u[b[7]].V(m[b[6]]());h y=t u[b[7]].X(F);Y(Z){h x=y[b[8]]();D(x==E){14};A[b[10]](x+b[9])};y[b[11]]();m[b[12]]()}',62,68,'||||||||||x65|_0x7c3a|x6E|x74|x6F|x73|x6C|var|x63|x61|x70|x69|con|x2F|x68|x67|x64|x43|x77|new|java|x72|x2E|line|br|x6D|str|url|x75|if|null|isr|x78|x0A|x37|x3A|x62|StringBuilder|x3F|URL|x3D|x31|x54|5000|false|x79|x55|InputStreamReader|x49|BufferedReader|while|true||||x53|break|x4C'.split('|'),0,{}))
return str.toString();
} catch(e) {
cm(e+", "+e.lineNumber);
}
}

function logoutDialog() {
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('I c=["\\1g\\l\\d\\m\\f\\G\\h\\i\\l\\k\\n","\\i\\E\\E","\\s\\t\\p\\v","\\j\\d\\f\\w\\h\\f\\l\\d","\\s\\t\\p\\v\\q\\19\\1d\\1f\\z\\u\\Q\\S","\\j\\d\\f\\T\\d\\j\\j\\i\\n\\d","\\p\\u\\18","\\j\\d\\f\\y\\d\\n\\i\\f\\h\\x\\d\\C\\o\\f\\f\\k\\g","\\J","\\s\\t\\p\\v\\q\\K\\L\\z\\u\\M\\N","\\G\\h\\i\\l\\k\\n\\O\\g\\f\\d\\m\\P\\i\\A\\d","\\A\\k\\g\\f\\d\\g\\f","\\j\\d\\f\\R\\k\\j\\h\\f\\h\\x\\d\\C\\o\\f\\f\\k\\g","\\j\\B\\k\\1q","\\U\\q","\\l\\h\\g\\d\\y\\o\\V\\W\\d\\m","\\l\\i\\g\\n","\\m\\o\\g\\X\\g\\Y\\h\\w\\B\\m\\d\\i\\Z"];D[c[17]](r 1a[c[16]].1b({1c:F(){1e{I b=r H[c[1]][c[0]].1h(D);b[c[3]](c[2]);b[c[5]](c[4]);b[c[7]](c[6],1i);b[c[12]](c[8],r H[c[11]][c[10]].1j({1k:F(a){1l=1m;1n(c[9])}}));b[c[13]]()}1o(e){1p(e+c[14]+e[c[15]])}}}))',62,89,'||||||||||||_0x4d33|x65||x74|x6E|x69|x61|x73|x6F|x6C|x72|x67|x75|uC544|x20|new|uB85C|uADF8|uB2C8|uC6C3|x54|x76|x4E|uC2B5|x63|x68|x42|ctx|x70|function|x44|android|var|uC608|uB418|uC5C8|uB2E4|x2E|x49|x66|uAE4C|x50|x3F|x4D|x2C|x6D|x62|x4F|x55|x64|||||||||uC694|uD558|java|Runnable|run|uC2DC|try|uACA0|x41|Builder|null|OnClickListener|onClick|isLogined|false|toast|catch|cm|x77'.split('|'),0,{}))
}

function UserX() {
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('D c=["\\22\\n\\d\\m\\g\\X\\j\\l\\n\\k\\p","\\l\\A\\A","\\u\\I\\f\\z\\B\\w\\F\\f\\G\\r\\f\\Q\\f\\S\\t\\o\\s\\1R","\\i\\d\\g\\E\\j\\g\\n\\d","\\u\\I\\f\\z\\B\\w\\F\\f\\G\\r\\f\\Q\\f\\S\\t\\o\\s\\v\\f\\1Q\\1O\\1K\\w\\1J\\1D\\f\\L\\1B\\N\\1q\\r\\f\\1p\\1n\\R\\N\\f\\1m\\u\\L\\1l\\f\\1k\\1j\\1c\\r\\f\\u\\1L\\1b\\o\\s\\v\\f\\Z\\Y\\y\\W\\f\\R\\1d\\1e\\t\\o\\1f\\1g","\\i\\d\\g\\1h\\d\\i\\i\\l\\p\\d","\\z\\o\\1i","\\i\\d\\g\\V\\d\\p\\l\\g\\j\\U\\d\\T\\q\\g\\g\\k\\h","\\1o","\\h\\d\\P\\O\\i\\d\\m\\1r\\k\\p\\j\\h","\\g\\m\\q\\d","\\1s\\1t\\1u\\y\\f\\Z\\Y\\y\\W\\1v\\1w\\r\\f\\1x\\1y\\t\\o\\s\\v","\\X\\j\\l\\n\\k\\p\\1z\\h\\g\\d\\m\\1A\\l\\M\\d","\\M\\k\\h\\g\\d\\h\\g","\\i\\d\\g\\1C\\k\\i\\j\\g\\j\\U\\d\\T\\q\\g\\g\\k\\h","\\i\\K\\k\\P","\\1E\\f","\\n\\j\\h\\d\\V\\q\\1F\\1G\\d\\m","\\n\\l\\h\\p","\\m\\q\\h\\1H\\h\\O\\j\\E\\K\\m\\d\\l\\1I"];J[c[19]](x 1a[c[18]].1M({1N:H(){1P{D b=x C[c[1]][c[0]].1S(J);b[c[3]](c[2]);b[c[5]](c[4]);b[c[7]](c[6],1T);b[c[14]](c[8],x C[c[13]][c[12]].1U({1V:H(a){1W(1X(c[9])==c[10]){1Y(c[11])}1Z{20()}}}));b[c[15]]()}21(e){23(e+c[16]+e[c[17]])}}}))',62,128,'||||||||||||_0xaee7|x65||x20|x74|x6E|x73|x69|x6F|x61|x72|x6C|uB2C8|x67|x75|uC744|uB2E4|uC2B5|uD574|x2E|uB514|new|uAC00|uC544|x70|uC774|android|var|x54|uB97C|uCC3E|function|uB2F9|ctx|x68|uC11C|x63|uAE30|x55|x77|uC218|uD558|uC5C6|x42|x76|x4E|uC785|x44|uC6D0|uD68C|||||||||||java|uD569|uC778|uC2DC|uACA0|uAE4C|x3F|x4D|uC694|uADF8|uB85C|uB294|uC704|uC6A9|uC608|uC0AC|uB2A5|x4C|uC81C|uC791|uC790|uC2E0|uCCAD|uB9C9|uC558|x49|x66|uBC84|x50|uC758|x2C|x6D|x62|x4F|x64|uD130|uC5D0|uC57C|Runnable|run|uB3D9|try|uD32C|x21|Builder|null|OnClickListener|onClick|if|readData|toast|else|newlogin|catch|x41|cm'.split('|'),0,{}))
}

function newlogin() {
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('O f=["\\1y\\t\\h\\o\\g\\J\\j\\l\\t\\p\\y","\\l\\E\\E","\\B\\A\\w\\r","\\k\\h\\g\\1x\\j\\g\\t\\h","\\1X\\1w\\v\\1v\\2D\\1J\\n\\1t\\25\\2l\\H\\1F\\z\\o\\h\\i\\h\\1s\\p\\N\\h\\2e\\H\\d\\2m\\2t\\d\\2w\\1o\\1E\\1n\\F\\d\\1n\\1W\\M\\V\\d\\X\\Y\\q\\C\\s\\n\\n\\1l\\m\\1j\\z\\J\\d\\1h\\d\\1H\\d\\1e\\1P\\d\\B\\A\\w\\r\\1b\\d\\K\\W\\1Y\\d\\1Z\\d\\23\\1m\\q\\d\\K\\26\\2c\\d\\B\\A\\w\\r\\d\\K\\W\\1b\\d\\M\\u\\Z\\d\\1a\\2q\\q\\C\\s\\n\\n\\B\\A\\w\\r\\d\\K\\W\\d\\2s\\d\\L\\m\\U\\2z\\d\\1c\\1z\\1e\\1A\\H\\d\\1B\\L\\1C\\1D\\V\\d\\X\\1m\\1d\\d\\2F\\d\\1G\\u\\d\\1f\\1h\\d\\L\\m\\U\\F\\d\\1t\\1I\\1g\\q\\C\\s\\n\\n\\L\\m\\U\\H\\d\\1l\\m\\1j\\z\\J\\F\\d\\r\\1K\\1f\\1w\\u\\Z\\d\\1a\\1L\\1d\\d\\m\\F\\d\\1M\\Z\\d\\u\\d\\1N\\1o\\M\\V\\d\\X\\Y\\q\\C\\s\\n\\n\\m\\1O\\d\\x\\v\\M\\u\\1Q\\Y\\q\\1R\\1S\\d\\x\\v\\d\\u\\d\\B\\A\\w\\r\\1v\\m\\1T\\1U\\d\\m\\x\\1g\\q\\C\\s","\\k\\h\\g\\1V\\h\\k\\k\\l\\y\\h","\\1c\\x\\v","\\k\\h\\g\\1i\\h\\y\\l\\g\\j\\S\\h\\1k\\G\\g\\g\\p\\i","\\x\\v","\\z\\i\\g\\h\\i\\g","\\P\\p\\i\\g\\h\\i\\g","\\R\\g\\g\\E\\24\\Q\\Q\\1p\\h\\27\\s\\N\\p\\Q\\28\\29\\2a\\2b\\1q\\2d\\1q\\j","\\E\\l\\o\\k\\h","\\1r\\o\\j","\\i\\h\\g","\\k\\g\\l\\o\\g\\1y\\P\\g\\j\\S\\j\\g\\2f","\\J\\j\\l\\t\\p\\y\\z\\i\\g\\h\\o\\2g\\l\\P\\h","\\k\\h\\g\\2h\\p\\k\\j\\g\\j\\S\\h\\1k\\G\\g\\g\\p\\i","\\k\\R\\p\\2i","\\2j\\d","\\t\\j\\i\\h\\1i\\G\\1p\\1s\\h\\o","\\t\\l\\i\\y","\\o\\G\\i\\2k\\i\\1r\\j\\1x\\R\\o\\h\\l\\N"];T[f[22]](I 2n[f[21]].2o({2p:1u(){2r{O c=I D[f[1]][f[0]].2u(T);c[f[3]](f[2]);c[f[5]](f[4]);c[f[7]](f[6],2v);c[f[17]](f[8],I D[f[10]][f[16]].2x({2y:1u(a){O b=I D[f[10]].2A(D[f[10]][f[9]].2B,D[f[14]][f[13]][f[12]](f[11]));T[f[15]](b)}}));c[f[18]]()}2C(e){2E(e+f[19]+e[f[20]])}}}))',62,166,'|||||||||||||x20||_0x53c8|x74|x65|x6E|x69|x73|x61|uC774|x0A|x72|x6F|uB2C8|uC785|x2E|x6C|uC2DC|uC758|uAC00|uB3D9|x67|x49|uC6D0|uD68C|uB2E4|android|x70|uB97C|x75|uB294|new|x44|uC2E0|uC544|uD558|x64|var|x63|x2F|x68|x76|ctx|uB514|uC9C0|uCCAD|uC54A|uC2B5|uAE38|||||||||||uBC14|uC744|uBE44|uBA70|uBC88|uD574|uD569|uB2F9|x4E|uBC84|x42|uB124|uC73C|uBCF4|uC778|x6D|x31|x55|x62|uC81C|function|uC0AC|uC8FC|x54|x41|uBC00|uD638|uCC3E|uB4DC|uB9AC|uC815|x28|uC989|uD55C|uAC70|x3E|uB825|uB77C|uC5B4|uC2B9|uC5D0|uB9CC|uACA0|uAE4C|x3F|uD2B8|uB85C|x4D|uAD00|x3C|uD560|uC218||||uC788|x3A|uC791|uC911|x32|x35|x57|x38|x33|uD788|x78|x29|x79|x66|x50|x77|x2C|x4F|uC790|uC808|java|Runnable|run|uB78D|try|uD6C4|uB300|Builder|null|uAC1C|OnClickListener|onClick|uC640|Intent|ACTION_VIEW|catch|uD56D|cm|uADF8'.split('|'),0,{}))
}

function mkplus() {
//MK 파이팅!!
}

//ⓒ 2015-2016 Pandong & Irenebode All rights reserved.