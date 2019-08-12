document.addEventListener('DOMContentLoaded', () => {

  const board = document.querySelector('.board');

  players = ['fox', 'hounds'];
  const foxFirstPositionIdentifiers = [0, 2, 4, 6];
  const foxFirstPositions = [];
  const foxSecondPositionIdentifiers = [1, 3, 5, 7];
  const foxSecondPositions = [];
  foxPosition = null;
  currentPiece = null;
  hounds = [];
  movableHounds = [];
  spacesMoveToable = [];
  // foxLocations = [];
  // houndDepartures = [];
  // houndArrivals = [];
  firstPositionPlayed = null;
  departures = ['x'];
  arrivals = [];

  addBoard();
  addHounds();
  linkToRules();
  enableNewGame();
  showFoxTurn();
  instruct('Fox, take your position!');
  makeInitialFoxPositionsClickable();

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
      hound.className = 'hounds';
      document.querySelector(`#space0${hounds[i]}`).appendChild(hound);
    }
  }

  function linkToRules() {
    
  }

  function enableNewGame() {
    document.querySelector('.new').addEventListener('click', () => {
      location.reload();
    })
  }

  function addPiece(kind, location) {
    const piece = document.createElement('div');
    piece.className = kind;
    location.appendChild(piece);
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
    firstPositionPlayed = true;
    arrivals.push(space);
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
    firstPositionPlayed = false;
    arrivals.push(this);
    switchPlayers();
    // enableHoundMove();
  }

  function makeHoundsSelectable() {
    // console.log(movableHounds);
    for (i=0; i<movableHounds.length; i++) {
      movableHounds[i].addEventListener('click', makeHoundClickable);
    }
  }

  function makeHoundClickable() {
    const piece = this;
    const space = this.parentNode;
    // console.log(space.id);
    if (currentPiece == null) {
      currentPiece = piece;
      makeSelected(currentPiece);
    } else if (currentPiece == this) {
      makeSpacesNotMoveToable();
      showUnselected(currentPiece);
      instruct('Hounds, select a hound to move!');
      currentPiece = null;
    } else {
      makeSpacesNotMoveToable();
      showUnselected(currentPiece);
      currentPiece = piece;
      makeSelected(currentPiece);
    }
  }

  function makeSelected(piece) {
    showSelected(piece);
    instruct('Hound, make your move!');
    identifySpacesMoveToable();
    makeSpacesMoveToableMoveToable();
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
    instruct('Fox, make your move!');
  }

  function enableFoxMove() {
    currentPiece = document.querySelector('.fox');
    identifySpacesMoveToable();
    if (spacesMoveToable.length == 0) {
      declareWinner('hounds');
    } else {
      showFoxTurn();
      showSelected(currentPiece);
      makeSpacesMoveToableMoveToable();
    }
  }

  function identifySpacesMoveToable() {
    const row = parseInt(currentPiece.parentNode.id[5]);
    const space = parseInt(currentPiece.parentNode.id[6]);
    if (currentPiece.className == 'fox') {
      if (row > 0 && space > 0 && document.querySelector(`#space${row-1}${space-1}`).firstChild == null) { spacesMoveToable.push(document.querySelector(`#space${row-1}${space-1}`)); }
      if (row > 0 && space < 7 && document.querySelector(`#space${row-1}${space+1}`).firstChild == null) { spacesMoveToable.push(document.querySelector(`#space${row-1}${space+1}`)); }
    }
    if (row < 7 && space > 0 && document.querySelector(`#space${row+1}${space-1}`).firstChild == null) { spacesMoveToable.push(document.querySelector(`#space${row+1}${space-1}`)); }
    if (row < 7 && space < 7 && document.querySelector(`#space${row+1}${space+1}`).firstChild == null) { spacesMoveToable.push(document.querySelector(`#space${row+1}${space+1}`)); }
  }

  function makeSpacesMoveToableMoveToable() {
    for (i=0; i<spacesMoveToable.length; i++) {
      spacesMoveToable[i].addEventListener('click', move);
    }
  }

  function move() {
    makeHoundsUnmovable();
    makeSpacesNotMoveToable();
    emptySpacesMoveToable();
    const spaceMovingTo = this;
    departures.push(currentPiece.parentNode);
    arrivals.push(spaceMovingTo);
    // if (players[0] == 'fox') {
    //   departures.push(currentPiece.parentNode);
    //   arrivals.push(spaceMovingTo);
    // } else if (players[0] == 'hounds') {
    //   houndDepartures.push(currentPiece.parentNode);
    //   houndArrivals.push(spaceMovingTo);
    // }
    addPiece(currentPiece.className, spaceMovingTo);
    showUnselected(currentPiece);
    removePiece(currentPiece.parentNode);
    if (foxReachesFarSide()) {
      declareWinner('fox');
    } else {
      switchPlayers();
    }
    // console.log('f', foxLocations);
    // console.log('h d', houndDepartures);
    // console.log('h a', houndArrivals);
  }

  function foxReachesFarSide() {
    return (document.querySelector('.fox').parentNode.id[5] == 0);
  }

  function declareWinner(winner) {
    if (winner == 'fox') {
      instruct('Fox wins!');
    } else if (winner == 'hounds') {
      instruct('Hounds win!');
    }
    // setTimeout(enableReplay, 500);
    enableReplay();
  }

  function enableReplay() {
    const replayButton = document.createElement('button');
    replayButton.className = 'replay';
    replayButton.textContent = 'Replay';
    document.querySelector('.replayButtonSpace').appendChild(replayButton);
    replayButton.addEventListener('click', () => {
      // replayButton.style.animationName = '';
      // console.log('clicked');
      removeReplayButton();
      setTimeout(removePieces, 500);
      setTimeout(addHounds, 1000);
      setTimeout(replayGame, 1000);
    })
  }

  function removeReplayButton() {
    const replayButtonSpace = document.querySelector('.replayButtonSpace');
    replayButtonSpace.removeChild(replayButtonSpace.childNodes[0]);
    replayButtonSpace.innerHTML = '';
  }

  function replayGame() {
    console.log('replaying...');
    const players = ['fox', 'hounds'];
    move = 0;
    replayMoves = setInterval(replayMove, 500);
    // console.log(arrivals.length*500);
    // setTimeout(endReplay, arrivals.length*500);
    // foxReplays = setInterval(replayFox, 1000);
    // houndsReplays = setInterval(replayHounds, 1000);
    // for (i=0; i<foxLocations.length; i++) {
    //   // foxLocations[i].style.backgroundColor = 'blue';
    // }
    // console.log('fox', foxLocations);
    // console.log('hounds leave', houndDepartures);
    // console.log('hounds arrive', houndArrivals);
  }

  function replayMove() {
    console.log('player', players[0]);
    console.log('arrival', arrivals[move]);
    console.log('departure', departures[move]);
    console.log('move', move);
    if (move < arrivals.length) {
      if (move == 1 && firstPositionPlayed == true) {
        players.splice(0, 0, players.pop());
      }
      addPiece(players[0], arrivals[move]);
      if (departures[move] != 'x') {
        removePiece(departures[move]);
      }
      move ++;
      players.splice(0, 0, players.pop());
    } else {
      clearInterval(replayMoves);
    }
  }

  // function endReplay() {
  //   clearInterval(replayMove);
  // }

  // function delayHounds() {
  //
  // }

  // function replayFox() {
  //   if (move < foxLocations.length) {
  //     addPiece('fox', foxLocations[move]);
  //     if (move>0) {
  //       removePiece(foxLocations[move-1]);
  //     }
  //     move ++;
  //     // console.log(move);
  //   }
  // }
  //
  // function replayHounds() {
  //   // console.log(houndDepartures);
  //   if (move < houndDepartures.length) {
  //     addPiece('hound', houndArrivals[move]);
  //     if (move>0) {
  //       removePiece(houndDepartures[move-1]);
  //     }
  //     move ++;
  //   }
  // }

  function removePieces() {
    const foxTBR = document.querySelector('.fox');
    removePiece(foxTBR.parentNode);
    const houndsTBR = document.querySelectorAll('.hounds');
    for (i=0; i<houndsTBR.length; i++) {
      removePiece(houndsTBR[i].parentNode);
    }
  }

  function makeHoundsUnmovable() {
    if (hounds.length > 0) {
      for (i=0; i<hounds.length; i++) {
        hounds[i].removeEventListener('click', makeHoundClickable);
      }
    }
    hounds = [];
    movableHounds = [];
  }

  function makeSpacesNotMoveToable() {
    for (i=0; i<spacesMoveToable.length; i++) {
      spacesMoveToable[i].removeEventListener('click', move);
    }
    spacesMoveToable = [];
  }

  function emptySpacesMoveToable() {
    spacesMoveToable = [];
  }

  function removePiece(space) {
    space.removeChild(space.childNodes[0]);
  }

  function switchPlayers() {
    currentPiece = null;
    players.splice(0, 0, players.pop());
    // console.log(players);
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
    findHounds();
    findMovableHounds();
    if (movableHounds.length == 0) {
      declareWinner('fox');
    } else if (movableHounds.length == 1) {
      currentPiece = movableHounds[0];
      makeSelected(currentPiece);
    } else {
      instruct('Hounds, select a hound to move!');
      makeHoundsSelectable();
    }
  }

  function findHounds() {
    hounds = document.querySelectorAll('.hounds');
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
    return (
      ((document.querySelector(`#space${row+1}${space-1}`) != null) && (document.querySelector(`#space${row+1}${space-1}`).firstChild == null)) ||
      ((document.querySelector(`#space${row+1}${space+1}`) != null) && (document.querySelector(`#space${row+1}${space+1}`).firstChild == null))
    );
  }

})
