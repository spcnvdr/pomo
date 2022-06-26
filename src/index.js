import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Btn extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  resetTimer() {
    this.setState(state => ({
      seconds: 0
    }));
  }

  startTimer() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  stopTimer() {
    clearInterval(this.interval)
  }

  renderStartBtn = text => {
    return (
      <Btn value={text} onClick={() => this.startTimer()} />
    )
  }

  renderStopBtn = text => {
    return (
      <Btn value={text} onClick={() => this.stopTimer()} />
    )
  }

  renderResetBtn = text => {
    return (
      <Btn value={text} onClick={() => this.resetTimer()} />
    )
  }

  render() {
    return (
      <div>
        Seconds: {this.state.seconds}
        <div className='start-btn'>
          {this.renderStartBtn('Start')}
          {this.renderStopBtn("Stop")}
          {this.renderResetBtn("Reset")}
        </div>
      </div>
    );
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Timer />
  </React.StrictMode>
);

//root.render(<Timer />);