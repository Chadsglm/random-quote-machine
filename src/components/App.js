import React, { Component} from 'react';
import '../style/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResult: null,
      author: '',
      text: '',
      isLoaded: false,
      quotesArrayLength: 1,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(function(state, props) {
      return {
        numberOfClicks: state.numberOfClicks + 1
      };
    });
    this.generateQuote();
  }

  componentDidMount() {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json', {
      headers: {
        Accept: "application/json",
      }
    })
    .then(response => response.json())
    .then((responseData) => {
      this.setState({
        apiResult: responseData.quotes,
        isLoaded: true,
        author: responseData.quotes[0].author,
        text: responseData.quotes[0].quote,
        quotesArrayLength: responseData.quotes.length,
      });
    })
    .catch(error => this.setState({ error }));
  }

  generateQuote = () => {
    const chosenQuote = [];
    const quotes = this.state.apiResult;
    let randomNumber = Math.floor((Math.random() * this.state.apiResult.length) + 1);

    quotes.forEach(function(element, index) {
      if(index === randomNumber) {
        chosenQuote.push(element)
      }
    })
    this.setState({
      text:chosenQuote[0].quote,
      author:chosenQuote[0].author,
    })
  }

  render() {
    // console.log(this.state.quotesArrayLength);
    // console.log(this.state.randomNumber);
    return (
      <div id="wrapper">
        <div id="quote-box">
          <div className="quote-text">
            <span id="text">"{this.state.text}"</span>
          </div>
          <div className="quote-author">
            - <span id="author">{this.state.author}</span>
          </div>
          <div className="buttons">
            <button className="button" id="new-quote" onClick={this.handleClick}>New quote</button>
          </div>
        </div>
        <div className="footer"> by Chad</div>
      </div>
    );
  }
}

export default App;
