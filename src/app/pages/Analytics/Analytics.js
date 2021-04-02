import Plot from 'react-plotly.js';
import React from "react"
import { firestore } from "../../firebase.js"

export class Analytics extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }


    async componentDidMount() {

        var xValues = []
        var numConnections = []
        var numLogins = []
        var numTables = []
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

            if (doc.data().numTablesCreated) {
                numTables.push(doc.data().numTablesCreated);
            } else {
                numTables.push(0);
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
                color: '#444444'
            }
        }

        this.setState({ data: [trace, trace2, trace3] });

    }

    render() {
        return (

            this.state.data ?
                <Plot
                    data={this.state.data}
                    layout={{ width: 1200, height: 600, title: 'Analytics Dashboard' }}
                />
                :
                <div></div>
        );
    }
}



