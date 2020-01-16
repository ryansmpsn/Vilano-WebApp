import React from 'react';
import Send from './components/send';

export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  onChange = (e) => { 
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = async () => {
    await Send.post('/Login', this.state)
    .then(res => {
      console.log(res);
      sessionStorage.setItem('SessionID', res.data.SessionID);
    })
    .catch(err => {
      console.log(err)
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="username" //The name must match state property
          placeholder="Username"
          onChange={e => this.onChange(e)}
          value={this.state.username} />
        <input
          type="password"
          name="password" //The name must match state property
          placeholder="Password"
          onChange={e => this.onChange(e)}
          value={this.state.password}
          enabled="true" />
        <button onClick={() => this.onSubmit()} type="primary">Submit</button>
      </div>
    );
  }
}
