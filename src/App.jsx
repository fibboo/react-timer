import React from 'react';


export default class App extends React.Component {
  state = {
    count: 0,
    savedTimers: [],
    isCounting: false,
  }

  componentDidMount() {
    this.setState({
      count: parseInt(localStorage.getItem('count') || 0),
      savedTimers: JSON.parse(localStorage.getItem('savedTimers') || '[]')
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    localStorage.setItem('count', this.state.count);
  }

  componentWillUnmount() {
    clearInterval(this.stopWatch);
  }

  handleStart = () => {
    this.setState({isCounting: true});
    this.stopWatch = setInterval(() => {
      this.setState({count: this.state.count + 1, isCounting: true});
    }, 100);
  }

  handleStop = () => {
    clearInterval(this.stopWatch);
    this.setState({isCounting: false});
  }

  handleReset = () => {
    clearInterval(this.stopWatch);
    this.setState({count: 0, isCounting: false, savedTimers: []});
    localStorage.setItem('savedTimers', JSON.stringify([]));
  }

  handleLap = () => {
    this.setState({savedTimers: [this.state.count, ...this.state.savedTimers]});
    localStorage.setItem('savedTimers', JSON.stringify(this.state.savedTimers));
  }

  formatTime = (seconds) => {
    let hours = Math.floor(seconds / (60 * 60 * 10));
    if (hours < 10) {
      hours = `0${hours}`
    }
    let remainder = seconds % (60 * 60 * 10);

    let minutes = Math.floor(remainder / (60 * 10));
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    remainder %= (60 * 10);

    let sec = Math.floor(remainder / 10);
    if (sec < 10) {
      sec = `0${sec}`
    }
    remainder %= 10;
    if (remainder < 10) {
      remainder = `0${remainder}`
    }

    return `${hours}:${minutes}:${sec}.${remainder}`;
  }


  render() {
    return (
        <div className="App" style={{textAlign: 'center'}}>
          <h1>Stopwatch</h1>
          <h3>{this.formatTime(this.state.count)}</h3>
          {!this.state.isCounting ? (
              <button style={this.buttonStyle} onClick={this.handleStart}>Start</button>
          ) : (
              <button style={this.buttonStyle} onClick={this.handleStop}>Stop</button>
          )}
          {this.state.isCounting ? (
              <button style={this.buttonStyle} onClick={this.handleLap}>Lap</button>
          ) : null}

          <button style={this.buttonStyle} onClick={this.handleReset}>Reset</button>
          <h3>Laps</h3>
          {this.state.savedTimers.map((timer, i) => (
              <p key={i}>{this.formatTime(timer)}</p>
          ))}
        </div>
    )
  }

  buttonStyle = {margin: '0 0.5rem'}
}
