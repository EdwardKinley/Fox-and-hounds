document.addEventListener('DOMContentLoaded', () => {

  const board = document.querySelector('.board');
  addBoard();

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

})
