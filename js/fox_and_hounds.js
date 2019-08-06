document.addEventListener('DOMContentLoaded', () => {

  const board = document.querySelector('.board');

  const players = ['fox', 'hounds'];
  const foxFirstPositionIdentifiers = [0, 2, 4, 6];
  const foxFirstPositions = [];
  const foxSecondPositionIdentifiers = [1, 3, 5, 7];
  const foxSecondPositions = [];
  foxPosition = null;
  currentPiece = null;
  hounds = [];
  movableHounds = [];
  spacesMoveToable = [];

  addBoard();
  addHounds();
  // addPiece('fox', document.querySelector('#space12'));
  // addPiece('fox', document.querySelector('#space14'));
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

  function addHounds() {
    const hounds = [1, 3, 5, 7];
    for (i=0; i<hounds.length; i++) {
      const hound = document.createElement('div');
      hound.className = 'hound';
      document.querySelector(`#space0${hounds[i]}`).appendChild(hound);
    }
  }

  function addPiece(kind, location) {
    const piece = document.createElement('div');
    piece.className = kind;
    location.appendChild(piece);
    // document.querySelector('#space74').appendChild(fox);
  }

  function instruct(instruction) {
    document.querySelector('.instruction').textContent = instruction;
  }

  function makeInitialFoxPositionsClickable() {
    makeFoxFirstPositionsClickable();
    makeFoxSecondPositionsClickable();
  }

  function makeFoxFirstPositionsClickable() {
    for (i=0; i<foxFirstPositionIdentifiers.length; i++) {
      foxFirstPositions.push(document.querySelector(`#space7${foxFirstPositionIdentifiers[i]}`));
      foxFirstPositions[i].addEventListener('click', addFoxToFirstPosition);
    }
  }

  function makeFoxFirstPositionsUnclickable() {
    for (i=0; i<foxFirstPositions.length; i++) {
      foxFirstPositions[i].removeEventListener('click', addFoxToFirstPosition);
    }
  }

  function addFoxToFirstPosition() {
    const space = this;
    makeFoxFirstPositionsUnclickable();
    makeFoxSecondPositionsUnclickable();
    addPiece('fox', space);
    currentPiece = space.firstChild;
    showSelected(currentPiece);
    instruct('Fox, make your move!');
    enableFoxMove();
  }

  function makeFoxSecondPositionsClickable() {
    for (i=0; i<foxSecondPositionIdentifiers.length; i++) {
      foxSecondPositions.push(document.querySelector(`#space6${foxSecondPositionIdentifiers[i]}`));
      foxSecondPositions[i].addEventListener('click', addFoxToSecondPosition);
    }
  }

  function makeFoxSecondPositionsUnclickable() {
    for (i=0; i<foxSecondPositions.length; i++) {
      foxSecondPositions[i].removeEventListener('click', addFoxToSecondPosition);
    }
  }

  function addFoxToSecondPosition() {
    makeFoxFirstPositionsUnclickable();
    makeFoxSecondPositionsUnclickable();
    addPiece('fox', this);
    enableHoundMove();
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

  function showUnselected(piece) {
    piece.parentNode.style.border = 0;
  }

  function showFoxTurn() {
    const markerSpace = document.querySelector('.marker');
    markerSpace.innerHTML = '';
    const foxMarker = document.createElement('div');
    foxMarker.className = 'foxMarker';
    foxMarker.style.height = '10.6875vh';
    foxMarker.style.width = '10.6875vh';
    markerSpace.appendChild(foxMarker);
  }

  function enableFoxMove() {
    identifySpacesMoveToable();
    // console.log(spacesMoveToable);
    makeSpacesMoveToableMoveToable();
  }

  function identifySpacesMoveToable() {
    const row = parseInt(currentPiece.parentNode.id[5]);
    const space = parseInt(currentPiece.parentNode.id[6]);
    if (currentPiece.className == 'fox') {
      if (row-1 > 0 && space-1 > 0 && document.querySelector(`#space${row-1}${space-1}`).firstChild == null) { spacesMoveToable.push(document.querySelector(`#space${row-1}${space-1}`)); }
      if (row-1 > 0 && space+1 < 8 && document.querySelector(`#space${row-1}${space+1}`).firstChild == null) { spacesMoveToable.push(document.querySelector(`#space${row-1}${space+1}`)); }
    }
    if (row+1 < 8 && space-1 > 0 && document.querySelector(`#space${row+1}${space-1}`).firstChild == null) { spacesMoveToable.push(document.querySelector(`#space${row+1}${space-1}`)); }
    if (row+1 < 8 && space+1 < 8 && document.querySelector(`#space${row+1}${space+1}`).firstChild == null) { spacesMoveToable.push(document.querySelector(`#space${row+1}${space+1}`)); }
  }

  function makeSpacesMoveToableMoveToable() {
    for (i=0; i<spacesMoveToable.length; i++) {
      spacesMoveToable[i].addEventListener('click', move);
    }
  }

  function move() {
    makeSpacesNotMoveToable();
    emptySpacesMoveToable();
    const spaceMovingTo = this;
    addPiece(currentPiece.className, spaceMovingTo);
    showUnselected(currentPiece);
    removePiece(currentPiece.parentNode);
    switchPlayers();
  }

  function makeSpacesNotMoveToable() {
    for (i=0; i<spacesMoveToable.length; i++) {
      spacesMoveToable[i].removeEventListener('click', move);
    }
  }

  function emptySpacesMoveToable() {
    spacesMoveToable = [];
  }

  function removePiece(space) {
    space.removeChild(currentPiece);
  }

  function switchPlayers() {
    players.splice(0, 0, players.pop());
    if (players[0] == 'fox') { enableFoxMove(); }
    else if (players[0] == 'hounds' ) { enableHoundMove(); }
  }

  function showHoundsTurn() {
    const markerSpace = document.querySelector('.marker');
    markerSpace.innerHTML = '';
    for (i=0; i<4; i++) {
      const houndMarker = document.createElement('div');
      houndMarker.className = 'houndMarker';
      houndMarker.style.height = '10.6875vh';
      houndMarker.style.width = '10.6875vh';
      houndMarker.style.margin = '2vh';
      markerSpace.appendChild(houndMarker);
    }
  }

  function enableHoundMove() {
    showHoundsTurn();
    instruct('Hounds, select a hound to move!');
    findHounds();
    findMovableHounds();
  }

  function findHounds() {
    hounds = document.querySelectorAll('.hound');
  }

  function findMovableHounds() {
    for (i=0; i<hounds.length; i++) {
      if (houndIsMovable(hounds[i])) {
        movableHounds.push(hounds[i]);
      }
    }
    // console.log(movableHounds);
  }

  function foxIsMovable(fox) {
    const row = parseInt(fox.parentNode.id[5]);
    const space = parseInt(fox.parentNode.id[6]);
    return (document.querySelector(`#space${row+1}${space-1}`).firstChild == null || document.querySelector(`#space${row+1}${space+1}`).firstChild == null || document.querySelector(`#space${row-1}${space-1}`).firstChild == null || document.querySelector(`#space${row-1}${space+1}`).firstChild == null);
  }

  function houndIsMovable(hound) {
    const row = parseInt(hound.parentNode.id[5]);
    const space = parseInt(hound.parentNode.id[6]);
    if (row == 7) { return false; };
    return (document.querySelector(`#space${row+1}${space-1}`).firstChild == null || document.querySelector(`#space${row+1}${space+1}`).firstChild == null);
  }



})
