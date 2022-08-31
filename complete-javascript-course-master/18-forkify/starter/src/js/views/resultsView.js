import icons from 'url:../../img/icons.svg'; // parcel 2
import View from './view';
import PreviewView from './previewView';

class ResultsView extends View {
  _parenetEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!!';
  _message = '';

  _generateMarkup() {
    // console.log(this._data);

    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join('');
  }
}

export default new ResultsView();
