class State {
    constructor() {
        this.state = {}
    }
    setState(nextState) {
        this.willStateUpdate(nextState)
        const update = this.shouldStateUpdate(nextState);
        if (update) {
            const preState = this.state
            this.state = {
                ...preState,
                ...nextState
            }
            this.didStateUpdate(preState);
        }
    }
    didStateUpdate() {
        // 默认啥也不做
    }

    willStateUpdate() {
        // 默认啥也不做
    }
    shouldStateUpdate() {
        // 默认返回true，一直都是更新
        return true;
    }
}

class User extends State {
    constructor(name) {
        super()
        this.state = name
    }
    willStateUpdate(nextState) {
        console.log('willStateUpdate', nextState)
    }
    shouldStateUpdate(nextState) {
        console.log('shouldStateUpdate', nextState);
        if (nextState.name === this.state.name) {
            return false;
        }
        return true;
    }
    didStateUpdate(prevState) {
        console.log('didStateUpdate', prevState);
    }
}

const user = new User('deepred');

user.setState({ name: 'hentai' });
user.setState({ age: 10 });

user.setState({ name: 'tc', age: 11 });