/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
 define(['N/record', 'N/search', 'N/log'], function(record, search, log) {

    function beforeLoad(scriptContext) {
        var rec = scriptContext.record;
        if(scriptContext.type === scriptContext.UserEventType.CREATE) {
            var form = scriptContext.form; // 
            form.addButton({
                id: 'custpage_buttonid',  //remember, custpage_ is mandatory to add before the buttonid 
                label: 'Click Me'
            });
        }
    }

    function beforeSubmit(scriptContext) {
        // Code to execute before the record is submitted
    }

    function afterSubmit(scriptContext) {
        // Code to execute after the record is submitted
    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
});
