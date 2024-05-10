// 1 krok - nastavenie premenných, riadky, stĺpce
var board;
var score = 0;
var rows = 4;
var columns = 4;

// 2 krok - spustenie funkcie pri otvorení
window.onload = function(){
    setGame();
}
// 3 krok - nastavenie hodnôt boardu
function setGame () {
    //8 - implementovanie logiky ako sa čísla tvoria
    // 21 vynulovaný boaard na začiatku
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]
    /*board = [
        [2, 2, 2, 2],
        [2, 2, 2, 2],
        [4, 4, 8, 8],
        [4, 4, 8, 8],
    ]*/
    for (let r = 0; r <rows; r++){
        for (let c = 0; c < columns; c++){
            // 4 krok vytvorenie tagu div kde id = "0-0"
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            // 5 krok musíme zakaždým updatovať tily pomocou funkcie - táto je naviazaná na funkciu nižšie - č6
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    //25 dávame sem funkciu dvakrát, pretože na začiatku potrebujeme aspoň dve dvojky
    setTwo();
    setTwo();
}
//24 pridáva sa funkcia prázdneho tilu a pridávame tam random tile
function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}
//22 - aby sme mohli začať hru, potrebujeme aspoň dva dvojkové tily
function setTwo() {
    //23 pridávame podmienku, keď už nebude prázdne miesto v políčkach
    if (!hasEmptyTile()) {
        return; //vracia ak nič nenájde a nespustí sa funkcia dole, ale tá, ktorú pridávam hore nad setTwo
    }

    let found = false;
    while (!found) {
        //random r, c value
        let r = Math.floor(Math.random() * rows) //0-1 x 4 --> číslo medzi 0 až 3 (pretože floor)
        let c = Math.floor(Math.random() * columns)

        if (board[r][c] === 0){
            board[r][c] = 2
            let tile =document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

// 6 clearovanie tilov potom, čo sa zmenia tily
function updateTile(tile, num) {
    tile.innerText = "";
    //7 čistíme classlist tile x2 x4 x8 atď.
    tile.classList.value = "";
    tile.classList.add("tile");
    if(num > 0) {
        tile.innerText = num;
        if(num <= 4096){
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}
//8 nastavujeme pohyb po stránke
document.addEventListener("keyup", (e) => {
    if(e.code == "ArrowLeft"){
        slideLeft();
        setTwo();//p27 ridávame dva tily vždy keď pohneme myšou do každej šípky
    }
    //17 kopírujeme funkciu vyššie a využívame ju pre pohyb vpravo
    else if(e.code == "ArrowRight"){
        slideRight();
        setTwo();
    } 
    else if(e.code == "ArrowUp"){
        slideUp();
        setTwo();
    }
    else if(e.code == "ArrowDown"){
        slideDown();
        setTwo();
    }
    //28 pridávame skóre
    document.getElementById("score").innerText = score;
})
//11funkcia ktorá vytvára prázdny - táto funkcia vytvára nové pole - riadok - a ráta so všetkými číslami, ktoré nie sú nulou
function filterZero(row) {
    return row.filter(num => num !=0);
}

//10 nastavujeme slide vo funkcii 
function slide(row){
    //[0, 2, 2, 2] filtrujeme row
    row - filterZero(row); //zbavuje sa núl

    //12 spojený so započítavaním
    for(let i =0; i < row.length; i++){
        //sledujeme všetky dvojky
        if(row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        } // 2+2+2 - 4 + 0 + 2
    }
    //13 odstraňujeme nulu
    row = filterZero(row);//4,2
    // 14  pridávame nulu
    while (row.length < columns){
        row.push(0); // 4,2,0,0
    }
    return row; 
    /*ideme cez rowslidujeme ho, dávame ho späť do board, modifikujeme board*/ 
}

//9 nastavujeme prepočet a rozpoznanie a presuny čísel, s ktorými hrá hráč
function slideLeft(){
    for(let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] =row;

        //15 columns
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
//16 kopírujeme funkciu hore a upravujeme ju na využitie napravo - pridávame funkciu reverse - obraciame tým poradie na dvoch miestach pri pohybe aj započítaní
function slideRight(){
    for(let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] =row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

// 18 ideme transportovať row zľava doprava a využiť ich pre stĺpce a pohyb zhora a nadol
function slideUp() {
    for(let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        //board[0][c] = row[0];
        //board[1][c] = row[1];
        //board[2][c] = row[2];
        //board[3][c] = row[3];
        //19 kopírujeme funkciu zhora a meníme columns za row
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

//20 duplikujeme funkciu hore a prerábame ju na funkciu nadol
function slideDown() {
    for(let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        //board[0][c] = row[0];
        //board[1][c] = row[1];
        //board[2][c] = row[2];
        //board[3][c] = row[3];
        //19 kopírujeme funkciu zhora a meníme columns za row
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}