import BoardPresenter from './presenter/board-presenter';

const bodyElement = document.querySelector('body');
const boardPresenterElement = new BoardPresenter({boardContainer: bodyElement});

boardPresenterElement.init();
