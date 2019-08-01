document.addEventListener('DOMContentLoaded', () => {

  const board = document.querySelector('.board');

  addBoard();
  addPieces();
  // showFoxTurn();
  showHoundsTurn();

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
    const fox = document.createElement('div');
    fox.className = 'fox';
    document.querySelector('#space74').appendChild(fox);
  }

  function showFoxTurn() {
    const markerSpace = document.querySelector('.marker');
    const foxMarker = document.createElement('div');
    foxMarker.className = 'fox';
    foxMarker.style.height = '10.6875vh';
    foxMarker.style.width = '10.6875vh';
    markerSpace.appendChild(foxMarker);
  }

  function showHoundsTurn() {
    const markerSpace = document.querySelector('.marker');
    for (i=0; i<4; i++) {
      const houndMarker = document.createElement('div');
      houndMarker.className = 'hound';
      houndMarker.style.height = '10.6875vh';
      houndMarker.style.width = '10.6875vh';
      houndMarker.style.margin = '2vh';
      markerSpace.appendChild(houndMarker);
    }
  }

})
