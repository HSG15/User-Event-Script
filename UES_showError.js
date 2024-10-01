/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search', 'N/error'],
    (record, search, error) => {

        const beforeSubmit = (scriptContext) => {
            log.debug('beforeSubmit triggered ✅');
            // var current_record = scriptContext.newRecord;
            // var some_field = current_record.getValue({
            //     fieldId: 'memo'
            // });

            if (scriptContext.type === scriptContext.UserEventType.CREATE ||
                scriptContext.type === scriptContext.UserEventType.EDIT) {
                log.debug('Error is showing');
                throw error.create({
                    name: 'MY_ERROR_CODE',
                    message: 'This is my error details.',
                    notifyOff: true
                });
            }

            // if (!some_field) {
            //     log.debug('Error is showing');
            //     error.create({
            //         name: 'MY_ERROR_CODE',
            //         message: 'This is my error details.'
            //     });
            // } 
            else {
                log.debug('Error is not showing');
            }
            // var custom_error = error.CREATE({
            //     name: 'MY_ERROR_CODE',
            //     message: 'This is my error details.'
            // });

        }

        return {
            beforeSubmit: beforeSubmit
        };
    }
);