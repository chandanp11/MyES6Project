import icons from 'url:../../img/icons.svg'; // parcel 2
import View from './view';

class ResultsView extends View {
  _parenetEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!!';
  _message = '';

  _generateMarkup() {
    // console.log(this._data);

    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    console.log(id);

    return `
    <li class="preview">
        <a class="preview__link ${
          result.id === id ? 'preview__link--active' : ''
        }"  href="#${result.id}">
            <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
            </div>
            </div>
        </a>
    </li>
`;
  }
}

export default new ResultsView();