/**eslint: no-console: "off" */
import { getNumberOfTank, format, read, compile } from './utils';
import _ from 'lodash';
import moment from 'moment';
import csv from 'csvtojson';

const headers = ['Date', 'Time', 'T.ID', 'GP.Vol', 'NP.Vol', 'Wat.Vol', 'GT.Vol', 'NT.Vol', 'Prd.Lvl', 'Wat.Lvl', 'Ullage', 'Avg.Tmp', 'Prd.Wgt', 'Prd.Dens'];
const HOURLY = 1;
const DAILY = 2;

export default (pathOrText, { isPath, useHeader, downloadType }) => {
    let data = [];
    let text = '';
    if (isPath)
        text = read(pathOrText);
    else
        text = pathOrText;
    return new Promise((resolve, reject) => {
        csv()
            .fromString(text)
            .on('csv', (csvRow) => {
                if (csvRow.length !== 0) {
                    if (csvRow.length < 5) {
                        let timeStr = csvRow[0].substring(1, csvRow[0].length - 1);
                        if(Date.parse(timeStr)) {
                            data.push(csvRow);
                        }
                    }else {
                        data.push(csvRow);
                    }
                }

            })
            .on('done', () => {
                let numberOfTank = getNumberOfTank(data);
                let formatted = format(numberOfTank, data);
                let filter = getFilter(downloadType);
                formatted = _.filter(formatted, filter);
                resolve(compile(formatted, { headers: useHeader ? headers : false }));
            });
    });

};

const getFilter = (downloadType) => {
    if(downloadType === HOURLY) {
        return (row, i) => {
            let timeStr = row[1];
            let time = moment(timeStr, 'HH:mm:ss');
            if(!time.isValid()) return false;
            return time.minute() === 0;
        };
    }else if(downloadType === DAILY) {
        return row => {
            let timeStr = row[1];
            let time = moment(timeStr, 'HH:mm:ss');
            if(!time.isValid()) return false;
            return time.hour() === 0 && time.minute() === 0;
        };
    }
};