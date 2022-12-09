
const Data = require('$database')

const logError = require('$core-services/logFunctionFactory').getErrorLogger()
const logWarn = require('$core-services/logFunctionFactory').getWarnLogger()
const logDebug = require('$core-services/logFunctionFactory').getDebugLogger()



let addWallet = async function(wallet)
{
   try{

        let updated = await Data.saveWalletMySQL(wallet);
        return updated;
    }
    catch(ex){
        console.log('Error adding wallet to db ', ex)
        throw ex;
    }
}




module.exports = {  addWallet };