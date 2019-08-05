document.addEventListener('DOMContentLoaded', () => {

  const board = document.querySelector('.board');

  const players = ['fox', 'hounds'];
  const foxFirstPositionIdentifiers = [0, 2, 4, 6];
  const foxFirstPositions = [];
  foxPosition = null;
  currentPiece = null;

  addBoard();
  addPieces();
  showFoxTurn();
  instruct('Fox, take your position!');
  makeInitialFoxPositionsClickable();
  // showHoundsTurn();
  // makePiecesClickable();

  function addBoard() {
    addRows();
    addSpaces();
  }

  function addRows() {
    for (i=0; i<8; i++) {
      addRow(i);
    }
  }

  function addRow(i) {
    const row = document.createElement('div');
    row.className = 'row';
    row.id = `row${i}`;
    row.style.height = `${100/8}%`;
    board.appendChild(row);
  }

  function addSpaces() {
    for (i=0; i<8; i++) {
      const row = document.querySelector(`#row${i}`);
      for (j=0; j<8; j++) {
        const space = document.createElement('div');
        space.className = 'space';
        space.id = `space${i}${j}`;
        space.style.width = `${100/8}%`;
        row.appendChild(space);
        if ((i+j)%2 == 0) { space.style.backgroundColor = 'red'; }
        else if ((i+j)%2 == 1) { space.style.backgroundColor = 'black'; }
      }
    }
  }

  function addPieces() {
    const hounds = [1, 3, 5, 7];
    for (i=0; i<hounds.length; i++) {
      const hound = document.createElement('div');
      hound.className = 'hound';
      document.querySelector(`#space0${hounds[i]}`).appendChild(hound);
    }
  }

  function addFox(location) {
    const fox = document.createElement('div');
    fox.className = 'fox';
    location.appendChild(fox);
    // document.querySelector('#space74').appendChild(fox);
  }

  function instruct(instruction) {
    document.querySelector('.instructions').textContent = instruction;
  }

  function makeInitialFoxPositionsClickable() {
    makeFoxFirstPositionsClickable();
    makeFoxSecondPositionsClickable();
  }

  function makeFoxFirstPositionsClickable() {
    for (i=0; i<foxFirstPositionIdentifiers.length; i++) {
      foxFirstPositions.push(document.querySelector(`#space7${foxFirstPositionIdentifiers[i]}`));
      // foxFirstPositions[i].addEventListener('click', (event) => {
      //   addFox(event.path[0]);
      // })
      foxFirstPositions[i].addEventListener('click', addFoxToFirstPosition);
    }
  }

  function addFoxToFirstPosition() {
    for (j=0; j<foxFirstPositions.length; j++) {
      foxFirstPositions[j].removeEventListener('click', addFoxToFirstPosition);
    }
    addFox(this);
  }

  function makeFoxSecondPositionsClickable() {

  }

  function makePiecesClickable() {
    if (players[0] = 'fox') {
      currentPiece = document.querySelector('.fox');
    }
    currentPiece.addEventListener('click', () => {
      console.log(currentPiece);
      showSelected(currentPiece);
    });
  }

  function showSelected(piece) {
    piece.parentNode.style.border = '0.52vh solid gold';
    piece.style.height = '10.6875vh';
    piece.style.width = '10.6875vh';
  }

  function showFoxTurn() {
    const markerSpace = document.querySelector('.marker');
    const foxMarker = document.createElement('div');
    foxMarker.className = 'foxMarker';
    foxMarker.style.height = '10.6875vh';
    foxMarker.style.width = '10.6875vh';
    markerSpace.appendChild(foxMarker);
  }

  function showHoundsTurn() {
    const markerSpace = document.querySelector('.marker');
    for (i=0; i<4; i++) {
      const houndMarker = document.createElement('div');
      houndMarker.className = 'houndMarker';
      houndMarker.style.height = '10.6875vh';
      houndMarker.style.width = '10.6875vh';
      houndMarker.style.margin = '2vh';
      markerSpace.appendChild(houndMarker);
    }
  }

})
