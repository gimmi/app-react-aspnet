import React from 'react';

import { gapiAsync } from './gapi';

export class ExpensesComponent extends React.Component {
    constructor() {
        super()

        this.state = { expenses: [] }
    }

    componentDidMount() {
        gapiAsync().then(gapi => {
            return gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: '1LgBEV_wNPFfr-SjlncpPF1tCLdHXKQIhg83PidSUPfU',
                range: 'Spese!A2:E',
                majorDimension: 'ROWS',
                valueRenderOption: 'UNFORMATTED_VALUE'
            })
        }).then(ret => {
            const expenses = ret.result.values.map(row => ({
                date: this.toDateObj(Math.trunc(row[0])),
                amount: row[1],
                descr: row[4]
            }));

            this.setState({ expenses })
        })
    }

    toDateObj(value) {
        // See https://developers.google.com/sheets/api/reference/rest/v4/DateTimeRenderOption
    
        value -= 25569; // Difference in days between 30 December 1899 and 1 January 1970
        value *= 24*60; // Converted to minutes
        value += new Date().getTimezoneOffset(); // Normalized to UTC
        value *= 60*1000; // Converted to ms
        return new Date(value)
    }

    render() {
        const expenses = this.state.expenses
        return (
            <div className="content">
                <ul>
                    {expenses.map((x, i) => <li key={i}>{x.date.toJSON()}: {x.amount} {x.descr}</li>)}
                </ul>
            </div>
        )
    }
}