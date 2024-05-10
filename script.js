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
    //8 - implementovanie logiky ako s čísla tvoria
    board = [
        [2, 2, 2, 2],
        [2, 2, 2, 2],
        [4, 4, 8, 8],
        [4, 4, 8, 8],
    ]
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
document.addEventListener("keyup", (e) =>{
    if(e.code == "ArrowLedt"){
        slideLeft();
    }
})
//11funkcia ktorá vytvára prázdny - táto funkcia vytvára nové pole - riadok - a ráta so všetkými číslami, ktoré nie sú nulou
function filterZero(row) {
    return row.filter(num => num !=0);
}

//10 nastavujeme slide vo funkcii 
function slide(){
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
    //13 vraciame nulu späť
    row = filterZero(row);

}

//9 nastavujeme prepočet a rozpoznanie a presuny čísel, s ktorými hrá hráč
function slideLeft(){
    for(let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] =row;
    }
}