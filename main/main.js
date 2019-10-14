'use strict';


var fixtureList = require("../fixtures/loadAllItems");


function printReceipt(tags){
    decodeTags(tags);
}

function decodeTags(tags){
    let decodedTags = [];

    tags.forEach(function(eachTag){
        if(decodedTags.find(decodeTag => decodeTag.barcode == eachTag)){
            
        }else{
            decodedTags.push({
                barcode : eachTag,
                count : checkForDash(barcode)
            })
        }
    });

    function checkForDash(barcode){
        return barcode.includes()
    }
}











modules.export = printReceipt;