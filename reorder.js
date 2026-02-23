const fs = require('fs');
const content = fs.readFileSync('openapi.yaml', 'utf8');

// 1. Reorder Paths
const pathsRegex = /^paths:\r?\n([\s\S]*?)^components:\r?\n/m;
const match = content.match(pathsRegex);
if (match) {
    const pathsStr = match[1];
    const pathBlocks = pathsStr.split(/^(?=  \/)/m).filter(Boolean);
    const pathMap = {};
    pathBlocks.forEach(b => {
        const nameMatch = b.match(/^  (\/[^:]+):/);
        if (nameMatch) {
            pathMap[nameMatch[1]] = b;
        }
    });

    const targetPaths = [
        '/pay_link.jsp',
        '/pay_external.jsp',
        '/pay_direct3ds.jsp',
        '/qr_link.jsp',
        '/pay_request.jsp',
        '/pay_3ds_status_check.jsp'
    ];

    let newPathsStr = '';
    targetPaths.forEach(p => {
        if (pathMap[p]) {
            newPathsStr += pathMap[p];
        } else {
            console.log('Missing path:', p);
        }
    });

    if (newPathsStr) {
        // preserve the newline
        newContent = content.replace(pathsRegex, 'paths:\n' + newPathsStr + 'components:\n');
    }
} else {
    console.log('paths block not found');
    process.exit(1);
}

// 2. Reorder Schemas
const schemasRegex = /^(    # ======================\r?\n    # Request Schemas\r?\n    # ======================\r?\n)([\s\S]*?)^(    # ======================\r?\n    # Response Schemas)/m;
const smatch = newContent.match(schemasRegex);
if (smatch) {
    const schemasHeader = smatch[1];
    const schemasStr = smatch[2];
    const schemasFooter = smatch[3];
    
    // Each schema starts with 4 spaces and a name followed by a colon
    const schemaBlocks = schemasStr.split(/^(?=    [A-Za-z0-9_]+:)/m).filter(Boolean);

    const schemaMap = {};
    schemaBlocks.forEach(b => {
        const nameMatch = b.match(/^    ([A-Za-z0-9_]+):/);
        if (nameMatch) {
            schemaMap[nameMatch[1]] = b;
        }
    });

    const targetSchemas = [
        'CreditCardUIRequest',
        'CreditCertificationUIRequest',
        'ExternalUIRequest',
        'Direct3DSRequest',
        'QRPaymentUIRequest',
        'CreditCardNonUIRequest',
        'SpeedPaymentNonUIRequest',
        'RefundRequest',
        'TransactionInquiryRequest',
        'PaymentNotificationRequest'
    ];

    let newSchemasStr = '';
    targetSchemas.forEach(s => {
        if (schemaMap[s]) {
            newSchemasStr += schemaMap[s];
        } else {
            console.log('Missing schema:', s);
        }
    });

    if (newSchemasStr) {
        newContent = newContent.replace(schemasRegex, schemasHeader + newSchemasStr + schemasFooter);
    }
} else {
    console.log('schemas block not found');
}

fs.writeFileSync('openapi.yaml', newContent);
console.log('Reorder completed successfully');
