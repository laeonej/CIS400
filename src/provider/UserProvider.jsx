import { React, createContext, Component } from 'react'
import { auth, generateUserDocument } from '../app/firebase.js'

export const UserContext = createContext({ user: null })

export default class UserProvider extends Component {
    state = {
        user: null
    }

    componentDidMount() {
        auth.onAuthStateChanged(async userAuth => {
            console.log(userAuth)
            const user = await generateUserDocument(userAuth)
            this.setState({ user: user })
        })
    }

    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}
