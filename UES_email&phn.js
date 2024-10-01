/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search'],
    (record, search) => {

        const beforeLoad = (scriptContext) => {
            log.debug('beforeLoad triggered ✅');

            var current_record = scriptContext.newRecord;  // Get the current record. i.e. invoice

            // var customerId = current_record.getValue({ // Get the customer
            //     fieldId: 'entity'  // 'entity' is the field where the customer is stored
            // });

            var customerId = 1126;

            log.debug('Customer ID:', customerId);

            if (customerId) {
                log.debug('Customer found ✅', customerId);

                var fields = search.lookupFields({
                    type: search.Type.CUSTOMER,
                    id: customerId,
                    columns: ['email', 'phone']  // Fetch email and phone, it returns an object 
                });

                log.debug('Customer Fields (Email and Phone):', fields);  // Log the returned fields for email and phone

                // Set the email in the custom field
                current_record.setValue({
                    fieldId: 'custbody3',
                    value: fields.email || ''  // if email is availabel then set, else set empty string 
                });

                // Set the phone number in the custom field
                current_record.setValue({
                    fieldId: 'custbody7',
                    value: fields.phone || ''
                });
            } else {
                log.debug('Customer not found ❌');
            }
        }

        const beforeSubmit = (scriptContext) => {
            log.debug('beforeSubmit triggered ✅');
            var current_record = scriptContext.newRecord;
            var some_field = current_record.getValue({
                fieldId: 'memo'
            });

            if(scriptContext.type === scriptContext.UserEventType.CREATE &&
                scriptContext.type === scriptContext.UserEventType.EDIT){
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

        const afterSubmit = (scriptContext) => {
            if (scriptContext.type !== scriptContext.UserEventType.CREATE &&
                scriptContext.type !== scriptContext.UserEventType.EDIT) {
                return;
            }

            log.debug('afterSubmit triggered ✅');

            var current_record = scriptContext.newRecord;  // Get the current transaction record (e.g. Invoice)


            var customerId = current_record.getValue({  // Fetch the customer ID from the 'entity' field (the customer on the transaction)
                fieldId: 'entity'  // 'entity' is the field that holds the customer
            });

            log.debug('Customer ID:', customerId);

            if (customerId) {  // Checking if a customer is selected or not
                log.debug('Customer found ✅', customerId);

                // Lookup customer's email and phone using the customer ID
                var fields = search.lookupFields({
                    type: search.Type.CUSTOMER,  // Customer record type
                    id: customerId,  // Use the dynamically fetched customerId
                    columns: ['email', 'phone']  // Fetch email and phone
                });

                log.debug('Customer Fields (Email and Phone):', fields);

                record.submitFields({    // Update the transaction with the customer's email and phone
                    type: current_record.type,  // The type of the current transaction (e.g., Sales Order or Invoice)
                    id: current_record.id,  // The internal ID of the current transaction
                    values: {
                        custbody3: fields.email || '',
                        custbody7: fields.phone || ''
                    }
                });

                log.debug('Email and Phone updated ✅');
            } else {
                log.debug('No customer found ❌');
            }
        };

        return {
            //beforeLoad: beforeLoad
            beforeSubmit: beforeSubmit
            //afterSubmit: afterSubmit
        };
    }
);