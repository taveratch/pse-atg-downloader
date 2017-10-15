/*eslint no-undef: "off"*/
import $ from 'jquery';
import _ from 'lodash';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import 'babel-core/register';
import 'babel-polyfill';
import csv from 'csvtojson';

import fileFormatter from 'src/js/file-formatter/src/formatter';

let proxyPrefix = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : '';
const headers = ['Date', 'Time', 'T.ID', 'GP.Vol', 'NP.Vol', 'Wat.Vol', 'GT.Vol', 'NT.Vol', 'Prd.Lvl', 'Wat.Lvl', 'Ullage', 'Avg.Tmp', 'Prd.Wgt', 'Prd.Dens'];

let services = {
    getInventoryList: (url) => {
        return new Promise((resolve, reject) => {
            let options = {
                headers: {
                    'Authorization': 'Basic dXNlcjpwYXNz'
                }
            };
            fetch(proxyPrefix + '/proxy?q=' + urlValidator(url), options)
                .then(json => json.text())
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },

    downloadAllInventories: async (inventories, dispatcher = () => { }, { downloadType, startDate, endDate }) => {
        var zip = new JSZip();
        let result = '';
        for (let i = 0; i < inventories.length; i++) {
            let item = inventories[i];
            if(item.date.isBefore(startDate)) continue;
            if(item.date.isAfter(endDate)) continue;
            let res = await downloadInventory(item.url, { useHeader: i === 0, downloadType });
            result += res;
            $(`#loading-${item.name.replace('.','')}`).addClass('hidden');
            // zip.file(item.name, res);
            dispatcher({ type: 'downloaded_inventory', data: item.name });
        }
        zip.file('inventories.csv', result);
        zip.generateAsync({ type: 'blob' })
            .then(function (content) {
                $('.loading-spin').addClass('hidden');
                FileSaver.saveAs(content, 'inventories.zip');
            });
    }
};

export const downloadInventory = (url, { useHeader, downloadType }) => {
    return new Promise((resolve, reject) => {
        let options = {
            headers: {
                'Authorization': 'Basic dXNlcjpwYXNz'
            }
        };
        fetch(proxyPrefix + '/proxy?q=' + url, options)
            .then(json => json.text())
            .then((res) => {
                let formatted = fileFormatter(res, { useHeader, downloadType });
                resolve(formatted);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};

const urlValidator = (url) => {
    let validatedUrl = '';
    if (url.endsWith('/')) {
        url = url.substring(0, url.length - 1);
    }
    if (url.indexOf('http://') === 0) {
        validatedUrl = `http://${url.substring(7)}/inventory/filesrecord.txt`;
    } else {
        validatedUrl = `http://${url.substring(0)}/inventory/filesrecord.txt`;
    }
    return validatedUrl;
};

services.urlValidator = urlValidator;

export default services;
