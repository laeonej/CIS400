import Plot from 'react-plotly.js';
import React from "react"
import { firestore } from "../../firebase.js"

export class Analytics extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userdata: null,
            tabledata: null
        }
    }


    async componentDidMount() {

        var xValues = []
        var numConnections = []
        var numLogins = []
        var numSignUps = []
        var numTables = []
        var numTablesJoined = []

        const snapshot = await firestore.collection('analytics').get()
        const names = snapshot.docs.forEach((doc) => {
            xValues.push(doc.id);

            if (doc.data().numConnections) {
                numConnections.push(doc.data().numConnections);
            } else {
                numConnections.push(0);
            }

            if (doc.data().numLogins) {
                numLogins.push(doc.data().numLogins);
            } else {
                numLogins.push(0);
            }

            if (doc.data().numSignUps) {
                numSignUps.push(doc.data().numSignUps);
            } else {
                numSignUps.push(0);
            }

            if (doc.data().numTablesCreated) {
                numTables.push(doc.data().numTablesCreated);
            } else {
                numTables.push(0);
            }

            if (doc.data().numTablesJoined) {
                numTablesJoined.push(doc.data().numTablesJoined);
            } else {
                numTablesJoined.push(0);
            }
        });


        var trace = {
            type: "scatter",
            mode: "lines",
            name: 'Number of Connected Users',
            x: xValues,
            y: numConnections,
            line: {
                color: '#7F7F7F'
            }
        }

        var trace2 = {
            type: "scatter",
            mode: "lines",
            name: 'Number of Logged In Users',
            x: xValues,
            y: numLogins,
            line: {
                color: '#444444'
            }
        }

        var trace3 = {
            type: "scatter",
            mode: "lines",
            name: 'Number of Tables Created',
            x: xValues,
            y: numTables,
            line: {
                color: '#111111'
            }
        }

        var trace4 = {
            type: "scatter",
            mode: "lines",
            name: 'Number of Tables Joined',
            x: xValues,
            y: numTablesJoined,
            line: {
                color: '#ff0000'
            }
        }

        var trace5 = {
            type: "scatter",
            mode: "lines",
            name: 'Number of Sign Ups',
            x: xValues,
            y: numSignUps,
            line: {
                color: '#ff0000'
            }
        }

        this.setState({ userdata: [trace, trace2, trace5] });
        this.setState({ tabledata: [trace3, trace4] });

    }

    render() {
        return (
            <div>
                <div>
                    <Plot
                        data={this.state.userdata}
                        layout={{ width: 1200, height: 600, title: 'User Connections/Logins/Sign Ups' }}
                    />

                </div>
                <div>
                    <Plot
                        data={this.state.tabledata}
                        layout={{ width: 1200, height: 600, title: 'Table Creations and Joins' }}
                    />

                </div>
            </div>

        );
    }
}



