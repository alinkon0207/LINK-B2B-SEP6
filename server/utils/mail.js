import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
// import { converBase64ToImage } from 'convert-base64-to-image';
import fs from 'fs';

dotenv.config();
const apiKey = `${process.env.SENDGRID_API_KEY}`;
sgMail.setApiKey(apiKey);

///////////////////////////////////////////
// EMAIL TEMPLATE
//////////////////////////////////////////
export const LobstrDepositTransactionTemplate = ({
  transaction,
  reference,
  amount,
  fee,
  wallet_address,
  bank_name,
  account_number,
}) => {
  return `
    <!Doctype html>
    <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Buy Transaction Details</title>
      <meta name="description" content="Buy Transaction Email Template.">
      <style type="text/css">
        a:hover {text-decoration: underline !important;}
      </style>
    </head>
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <!--100% body table-->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                          <a href="https://ngnc.online" title="logo" target="_blank">
                                            <img width="60" src="https://uploads-ssl.webflow.com/60a70a1080cf2974d4b1595e/61961ce43c530394bcb05349_NGRC.png" title="logo" alt="logo">
                                          </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h4 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Lobstr Deposit Transaction</h4>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:10px 0 10px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <h3 style="color:#455056; font-size:15px;line-height:24px; margin: 0 0 12px 0;">
                                                Hello LINK,
                                            </h3>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin: 0 0 12px 0;">
                                                A ${transaction} transaction from NGNC Lobster has been initiated. Below are the details provided by the user for the transaction.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 3px;">
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin-bottom:3px; text-transform:capitalize;">
                                              ✅ Transaction type: ${transaction}
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                              ✅ Reference Code: ${reference}
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                              ✅ NGNC Amount to fund: ${Math.floor(
                                                amount - fee
                                              )}
                                            </p>  
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                              ✅ Transaction Fee: ${fee}
                                            </p>  
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin-bottom:3px; text-transform:capitalize;">
                                              ✅ Wallet Address: ${wallet_address} 
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin-bottom:3px; text-transform:capitalize;">
                                              ✅ Deposit Bank Name: ${bank_name}
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin-bottom:3px; text-transform:capitalize;">
                                              ✅ Deposit Account Number: ${account_number}
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy;<strong>ngnc.online</strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:60px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>
    </html>
  `;
};

export const LobstrWithdrawTransactionTemplate = ({
  transaction,
  reference,
  amount,
  fee,
  wallet_address,
  account_name,
  account_number,
  bank_name,
}) => {
  return `
    <!Doctype html>
    <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Buy Transaction Details</title>
      <meta name="description" content="Buy Transaction Email Template.">
      <style type="text/css">
        a:hover {text-decoration: underline !important;}
      </style>
    </head>
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <!--100% body table-->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                          <a href="https://ngnc.online" title="logo" target="_blank">
                                            <img width="60" src="https://uploads-ssl.webflow.com/60a70a1080cf2974d4b1595e/61961ce43c530394bcb05349_NGRC.png" title="logo" alt="logo">
                                          </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h4 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Withdraw Transaction Details</h4>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:10px 0 10px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <h3 style="color:#455056; font-size:15px;line-height:24px; margin: 0 0 12px 0;">
                                                Hello LINK,
                                            </h3>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin: 0 0 12px 0;">
                                                 A ${transaction} transaction from NGNC Lobster has been initiated. Below are the details provided by the user for the transaction.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 2rem;">
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin-bottom:3px; text-transform:capitalize;">
                                              ✅ Transaction type: ${transaction}
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin-bottom:3px; text-transform:capitalize;">
                                              ✅ Withdrawal wallet: ${wallet_address}
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin-bottom:3px;">
                                              ✅ Reference Code: ${reference}
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin-bottom:3px;">
                                              ✅ NGN to send: ${Math.floor(
                                                amount - fee
                                              )}
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                              ✅ Transaction Fee: ${fee}
                                            </p>  
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin-bottom:3px; text-transform:capitalize;">
                                              ✅ Withdrawal Account Name: ${account_name}
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin-bottom:3px; text-transform:capitalize;">
                                              ✅ Withdrawal Account Number: ${account_number}
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin-bottom:3px; text-transform:capitalize;">
                                              ✅ Withdrawal Account Bank: ${bank_name}
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy;<strong>ngnc.online</strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:60px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>
    </html>
  `;
};

export const bankTransferTransactionTemplate = ({
  userName,
  accNum,
  amount,
  value,
  walletAddress,
}) => {
  return `
    <!Doctype html>
    <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>NGN Transfer Request</title>
      <meta name="description" content="Buy Transaction Email Template.">
      <style type="text/css">
        a:hover {text-decoration: underline !important;}
      </style>
    </head>
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <!--100% body table-->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                          <a href="https://ngnc.online" title="logo" target="_blank">
                                            <img width="60" src="https://uploads-ssl.webflow.com/60a70a1080cf2974d4b1595e/61961ce43c530394bcb05349_NGRC.png" title="logo" alt="logo">
                                          </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h4 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Transfer NGN to NGNC WALLET</h4>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:10px 0 10px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <h3 style="color:#455056; font-size:15px;line-height:24px; margin: 0 0 12px 0;">
                                                Hello LINK,
                                            </h3>
                                            <p style="color:#455056; font-size:15px;line-height:20px; margin: 0 0 12px 0;">
                                                The user "${userName}" has just performed an transfer request to convert NGN from their naira account to their NGNC Wallet. Below are the details provided by the user for the transaction.
                                            </p>
                                        </td>
                                    </tr>    
                                    <tr>
                                        <td style="padding:0 3px;">
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0; text-transform:capitalize;">
                                                Account Name: ${userName}
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                Account Number: ${accNum}
                                            </p> 
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                Amount Debited: ${amount}
                                            </p> 
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0; text-transform:capitalize;">
                                                Fee Deducted: ${value}
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                Wallet Address: ${walletAddress}
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy;<strong>ngnc.online</strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:60px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>
    </html>
  `;
};

export const walletTransferTransactionTemplate = ({
  userName,
  account_name,
  account_number,
  bank_name,
  network,
  link_address,
  amount,
}) => {
  return `
    <!Doctype html>
    <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>NGNC Transfer Request</title>
      <meta name="description" content="Buy Transaction Email Template.">
      <style type="text/css">
        a:hover {text-decoration: underline !important;}
      </style>
    </head>
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <!--100% body table-->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                          <a href="https://ngnc.online" title="logo" target="_blank">
                                            <img width="60" src="https://uploads-ssl.webflow.com/60a70a1080cf2974d4b1595e/61961ce43c530394bcb05349_NGRC.png" title="logo" alt="logo">
                                          </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h4 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Transfer NGNC to NGN ACCOUNT</h4>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:10px 0 10px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <h3 style="color:#455056; font-size:15px;line-height:24px; margin: 0 0 12px 0;">
                                                Hello LINK,
                                            </h3>
                                            <p style="color:#455056; font-size:15px;line-height:20px; margin: 0 0 12px 0;">
                                                The user "${userName}" has just performed an transfer request to convert NGNC from their wallet to their NGN account. Below are the details provided by the user for the transaction.
                                            </p>
                                        </td>
                                    </tr>    
                                    <tr>
                                        <td style="padding:0 3px;">
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0; text-transform:capitalize;">
                                                Account Name: ${account_name}
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                Account Number: ${account_number}
                                            </p> 
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                Account Number: ${bank_name}
                                            </p> 
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                Amount to Debit Wallet: ${amount}
                                            </p> 
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0; text-transform:capitalize;">
                                                Asset Network: ${network}
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                Wallet Address: ${link_address}
                                            </p>
                                             <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                Amount to Credit account: ${
                                                  amount - 100
                                                }
                                            </p> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy;<strong>ngnc.online</strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:60px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>
    </html>
  `;
};

export const OtcTransactionRequestTemplateUN = ({
  fullName,
  settlementType,
  network,
  token,
  tokenNetwork,
  linkAddress,
}) => {
  return `
    <!Doctype html>
    <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>NGNC- OTC Request</title>
      <meta name="description" content="OTC request Template.">
      <style type="text/css">
        a:hover {text-decoration: underline !important;}
      </style>
    </head>
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <!--100% body table-->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                          <a href="https://ngnc.online" title="logo" target="_blank">
                                            <img width="60" src="https://uploads-ssl.webflow.com/60a70a1080cf2974d4b1595e/61961ce43c530394bcb05349_NGRC.png" title="logo" alt="logo">
                                          </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h4 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Transfer ${token} to NGNC</h4>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:10px 0 10px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <h3 style="color:#455056; font-size:15px;line-height:24px; margin: 0 0 12px 0;">
                                                Hello LINK,
                                            </h3>
                                            <p style="color:#455056; font-size:15px;line-height:20px; margin: 0 0 12px 0;">
                                                The user "${fullName}" has just performed an OTC request to convert NGNC from their wallet to their  ${token}. Below are the details provided by the user for the transaction.
                                            </p>
                                        </td>
                                    </tr>    
                                    <tr>
                                        <td style="padding:0 3px;">
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0; text-transform:capitalize;">
                                                Settlement Type: ${settlementType}
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                NGNC Network: ${network}
                                            </p> 
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                Payment Token: ${token}
                                            </p> 
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                Payment Token Network: ${tokenNetwork}
                                            </p> 
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0; text-transform:capitalize;">
                                               LINK Address: ${linkAddress}
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy;<strong>ngnc.online</strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:60px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>
    </html>
  `;
};

export const OtcTransactionRequestTemplateNU = ({
  fullName,
  ngncNetwork,
  token,
  tokenNetwork,
  linkAddress,
  walletAddress,
  settlementType,
}) => {
  return `
    <!Doctype html>
    <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>NGNC- OTC Request</title>
      <meta name="description" content="OTC request Template.">
      <style type="text/css">
        a:hover {text-decoration: underline !important;}
      </style>
    </head>
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <!--100% body table-->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                          <a href="https://ngnc.online" title="logo" target="_blank">
                                            <img width="60" src="https://uploads-ssl.webflow.com/60a70a1080cf2974d4b1595e/61961ce43c530394bcb05349_NGRC.png" title="logo" alt="logo">
                                          </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h4 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Transfer NGNC to ${token}</h4>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:10px 0 10px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <h3 style="color:#455056; font-size:15px;line-height:24px; margin: 0 0 12px 0;">
                                                Hello LINK,
                                            </h3>
                                            <p style="color:#455056; font-size:15px;line-height:20px; margin: 0 0 12px 0;">
                                                The user "${fullName}" has just performed an OTC request to convert NGNC from their wallet to their  ${token}. Below are the details provided by the user for the transaction.
                                            </p>
                                        </td>
                                    </tr>    
                                    <tr>
                                        <td style="padding:0 3px;">
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0; text-transform:capitalize;">
                                                Settlement Type: ${settlementType}
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                NGNC Network: ${ngncNetwork}
                                            </p> 
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                Payment Token: ${token}
                                            </p> 
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                Payment Token Network: ${tokenNetwork}
                                            </p> 
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0; text-transform:capitalize;">
                                               Payment Address: ${walletAddress}
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0; text-transform:capitalize;">
                                               LINK Address: ${linkAddress}
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy;<strong>ngnc.online</strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:60px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>
    </html>
  `;
};

export const passwordResetTemplate = (url, email) => {
  return ` 
        <!Doctype html>
        <html lang="en-US">
        <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>Reset Password Email Template</title>
          <meta name="description" content="Reset Password Email Template.">
          <style type="text/css">
            a:hover {text-decoration: underline !important;}
          </style>
        </head>
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
          <!--100% body table-->
          <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                        <td style="text-align:center;">
                                          <a href="https://ngnc.online" title="logo" target="_blank">
                                            <img width="60" src="https://uploads-ssl.webflow.com/60a70a1080cf2974d4b1595e/61961ce43c530394bcb05349_NGRC.png" title="logo" alt="logo">
                                          </a>
                                        </td>
                                        </tr>
                                        <tr>
                                            <td style="height:20px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                    requested to reset your password</h1>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0; text-transform:capitalize">
                                                    Hello ${email},
                                                    we cannot simply send you your old password. A unique link to reset your
                                                    password has been generated for you. To reset your password, click the
                                                    following link and follow the instructions.
                                                </p>
                                                <a href="${url}"
                                                    style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                    Password</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy;<strong>ngnc.online</strong></p>
                            </tr>
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>
        </html>
     `;
};

export const successResetTemplate = (url, email, lastName) => {
  return ` 
        <!Doctype html>
        <html lang="en-US">
        <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>Reset Password Email Template</title>
          <meta name="description" content="Reset Password Email Template.">
          <style type="text/css">
            a:hover {text-decoration: underline !important;}
          </style>
        </head>
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
          <!--100% body table-->
          <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="text-align:center;">
                                              <a href="https://ngnc.online" title="logo" target="_blank">
                                                <img width="60" src="https://uploads-ssl.webflow.com/60a70a1080cf2974d4b1595e/61961ce43c530394bcb05349_NGRC.png" title="logo" alt="logo">
                                              </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:20px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Password Reset Successful</h1>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    Hello ${email},
                                                    Your password has been reset successfully.
                                                    You can now log in with your new password
                                                </p>
                                                <a href="${url}"
                                                    style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">LOGIN</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy;<strong>ngnc.online</strong></p>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>
        </html>
     `;
};

export const BusinessKYBTemplate = ({ businessName, contactMail }) => {
  return `
    <!Doctype html>
    <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Buy Transaction Details</title>
      <meta name="description" content="Buy Transaction Email Template.">
      <style type="text/css">
        a:hover {text-decoration: underline !important;}
      </style>
    </head>
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <!--100% body table-->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                          <a href="https://ngnc.online" title="logo" target="_blank">
                                            <img width="60" src="https://uploads-ssl.webflow.com/60a70a1080cf2974d4b1595e/61961ce43c530394bcb05349_NGRC.png" title="logo" alt="logo">
                                          </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h2 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;"Business KYB Details</h2>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:10px 0 10px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <h2 style="color:#455056; font-size:15px;line-height:24px; margin: 0 0 12px 0;">
                                                Hello LINK,
                                            </h2>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin: 0 0 12px 0;">
                                                KYB Information of new signup Partner.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 3px;">
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0; text-transform:capitalize;">
                                                Business Name: ${businessName}
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                Business Email: ${contactMail}
                                            </p> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy;<strong>ngnc.online</strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>
    </html>
  `;
};

///////////////////////////////////////////
// EMAIL function
//////////////////////////////////////////
export const LobstrDepositTransaction = ({
  transaction,
  reference,
  amount,
  fee,
  wallet_address,
  account_number,
  bank_name,
}) => {
  const msg = {
    to: [
      'engremmanuelec@gmail.com',
      'ngnc.sep24@gmail.com',
      'veeqtour@gmail.com',
      'ultemabrand@gmail.com',
    ], // Change to your recipient
    from: 'support@linkio.africa', // Change to your verified sender
    subject: 'Lobstr Deposit Transaction',
    html: LobstrDepositTransactionTemplate({
      transaction,
      reference,
      amount,
      fee,
      wallet_address,
      account_number,
      bank_name,
    }),
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('SendGrid Mail has been sent');
    })
    .catch((error) => {
      console.error('Mail not been sent', error.message);
    });
};

export const LobstrWithdrawTransaction = ({
  transaction,
  reference,
  amount,
  fee,
  wallet_address,
  account_name,
  account_number,
  bank_name,
}) => {
  const msg = {
    to: [
      'engremmanuelec@gmail.com',
      'ngnc.sep24@gmail.com',
      'veeqtour@gmail.com',
      'ultemabrand@gmail.com',
    ], // Change to your recipient
    from: 'support@linkio.africa', // Change to your verified sender
    subject: 'Lobstr Withdraw Transaction',
    html: LobstrWithdrawTransactionTemplate({
      transaction,
      reference,
      amount,
      fee,
      wallet_address,
      account_name,
      account_number,
      bank_name,
    }),
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('SendGrid Mail has been sent');
    })
    .catch((error) => {
      console.error('Mail not been sent', error.message);
    });
};

export const transferWithdrawTransaction = ({
  userName,
  accNum,
  amount,
  value,
  walletAddress,
}) => {
  const msg = {
    to: [
      'linkio.operations@gmail.com',
      'ultemabrand@gmail.com',
      'veeqtour@gmail.com',
    ],
    from: 'support@linkio.africa',
    subject: 'Bank Withdraw Transaction',
    html: bankTransferTransactionTemplate({
      userName,
      accNum,
      amount,
      value,
      walletAddress,
    }),
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('SendGrid Mail has been sent');
    })
    .catch((error) => {
      console.error('Mail not been sent', error.message);
    });
};

export const transferWalletTransaction = ({
  userName,
  account_name,
  account_number,
  bank_name,
  network,
  link_address,
  amount,
}) => {
  const msg = {
    to: [
      'linkio.operations@gmail.com',
      'ultemabrand@gmail.com',
      'veeqtour@gmail.com',
    ],
    from: 'support@linkio.africa',
    subject: 'Wallet Transfer Transaction',
    html: walletTransferTransactionTemplate({
      userName,
      account_name,
      account_number,
      bank_name,
      network,
      link_address,
      amount,
    }),
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('SendGrid Mail has been sent');
    })
    .catch((error) => {
      console.error('Mail not been sent', error.message);
    });
};

export const OtcTransactionRequestUN = ({
  fullName,
  network,
  token,
  tokenNetwork,
  settlementType,
  linkAddress,
}) => {
  const msg = {
    to: [
      'linkio.operations@gmail.com',
      'ultemabrand@gmail.com',
      'veeqtour@gmail.com',
    ],
    from: 'support@linkio.africa',
    subject: 'OTC Request Transaction to NGNC',
    html: OtcTransactionRequestTemplateUN({
      fullName,
      network,
      token,
      tokenNetwork,
      settlementType,
      linkAddress,
    }),
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('SendGrid Mail has been sent');
    })
    .catch((error) => {
      console.error('Mail not been sent', error.message);
    });
};

export const OtcTransactionRequestNU = ({
  fullName,
  ngncNetwork,
  token,
  tokenNetwork,
  linkAddress,
  walletAddress,
  settlementType,
  proofOfPayment,
}) => {
  // const imageName = `${Date.now()}.png`;
  // const imagePath = `./public/${imageName}`;
  // converBase64ToImage(proofOfPayment, imagePath);

  // let attachment = fs.readFileSync(`${imagePath}`).toString('base64');

  const msg = {
    to: [
      'linkio.operations@gmail.com',
      'ultemabrand@gmail.com',
      'veeqtour@gmail.com',
    ],
    from: 'support@linkio.africa',
    subject: `OTC Request Transaction to ${token}`,
    html: OtcTransactionRequestTemplateNU({
      fullName,
      ngncNetwork,
      token,
      tokenNetwork,
      linkAddress,
      walletAddress,
      settlementType,
    }),
    // attachments: [
    //   {
    //     content: attachment,
    //     filename: imageName,
    //     type: 'image/*',
    //     disposition: 'attachment',
    //   },
    // ],
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('SendGrid Mail has been sent');
    })
    .catch((error) => {
      console.error('Mail not been sent', error.message);
    });
};

export const userResetPassword = (url, email) => {
  const msg = {
    to: email,
    from: 'support@linkio.africa',
    subject: 'Reset Password Link',
    html: passwordResetTemplate(url, email),
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('SendGrid Mail has been sent');
    })
    .catch((error) => {
      console.error('Mail not been sent', error.message);
    });
};

export const userResetPasswordSuccessful = (url, email) => {
  const msg = {
    to: email,
    from: 'support@linkio.africa',
    subject: 'Reset Password Link',
    html: successResetTemplate(url, email),
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('SendGrid Mail has been sent');
    })
    .catch((error) => {
      console.error('Mail not been sent', error.message);
    });
};

export const businessKyb = ({ businessName, contactMail }) => {
  const msg = {
    to: ['linkio.operations@gmail.com', 'ultemabrand@gmail.com'],
    from: 'support@linkio.africa',
    subject: 'Business KYB',
    html: BusinessKYBTemplate({
      businessName,
      contactMail,
    }),
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('SendGrid Mail has been sent');
    })
    .catch((error) => {
      console.error('Mail not been sent', error.message);
    });
};
