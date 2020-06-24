/** Functionality related to chatting. */

// Room is an abstraction of a chat channel
const Room = require('./Room');
const { default: Axios } = require('axios');

/** ChatUser is a individual connection from client -> server to chat. */

class ChatUser {
  /** make chat: store connection-device, rooom */

  constructor(send, roomName) {
    this._send = send; // "send" function for this user
    this.room = Room.get(roomName); // room user will be in
    this.name = null; // becomes the username of the visitor

    console.log(`created chat in ${this.room.name}`);
  }

  /** send msgs to this client using underlying connection-send-function */

  send(data) {
    try {
      this._send(data);
    } catch {
      // If trying to send to a user fails, ignore it
    }
  }

  /** handle joining: add to room members, announce join */

  handleJoin(name) {
    this.name = name;
    this.room.join(this);
    this.room.broadcast({
      type: 'note',
      text: `${this.name} joined "${this.room.name}".`
    });
  }

  /** handle a chat: broadcast to room. */

  handleChat(text, user=null) {
    let targetUser

    this.room.members.forEach((member) => {
      if (member.name === user) targetUser = member
    })

    if (user !== null) {
      this.room.private(this, targetUser, {
        source: this.name,
        target: user,
        type: 'private',
        text: text
      })
    }
    else {
      this.room.broadcast({
        name: this.name,
        type: 'chat',
        text: text
      });
    }
  }

  handleSelf(text) {
    this.room.unicast(this, {
      type: "note",
      text: text
    })
  }

  /** fetch a random joke from icanhazdajokes API */
  
  async fetchJoke() {
    let resp = await Axios.get(`https://icanhazdadjoke.com/`, { 'headers': { 'Accept': 'application/json'} } )
    this.handleSelf(resp.data.joke)
  }

  /** list all members in the room */

  listMembers() {
    let members = this.room.members
    let out = []

    members.forEach((member) => out.push(member.name)) 
    this.handleSelf(`Currently in the room: ${out.join(', ')}`)
  }

  /** Handle messages from client:
   *
   * - {type: "join", name: username} : join
   * - {type: "chat", text: msg }     : chat
   * - {type: "joke"}                 : joke
   * - {type: "members"}              : members
   */

  async handleMessage(jsonData) {
    let msg = JSON.parse(jsonData);

    switch (msg.type) {
      case 'join':
        this.handleJoin(msg.name);
        break;
      case 'chat':
        this.handleChat(msg.text);
        break;
      case 'joke':
        await this.fetchJoke();
        break;
      case 'members':
        this.listMembers();
        break;
      case 'private':
        this.handleChat(msg.text, msg.target)
        break
      default:
        throw new Error(`bad message: ${msg.type}`);
    }

    // if (msg.type === 'join') this.handleJoin(msg.name);
    // else if (msg.type === 'chat') this.handleChat(msg.text);
    // else if (msg.type === 'joke') await this.fetchJoke();
    // else if (msg.type === 'members') this.listMembers();
    // else throw new Error(`bad message: ${msg.type}`);
  }

  /** Connection was closed: leave room, announce exit to others */

  handleClose() {
    this.room.leave(this);
    this.room.broadcast({
      type: 'note',
      text: `${this.name} left ${this.room.name}.`
    });
  }
}

module.exports = ChatUser;
