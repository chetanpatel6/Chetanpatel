var Imap = require('imap'),
    inspect = require('util').inspect,
    parser = require('addressparser'),
    config = require('./config.json');
    const MailParser = require('mailparser').MailParser;
var nodemailer = require('nodemailer');
const simpleParser = require('mailparser').simpleParser;
// var Categories = require("Categories/categories.js");

Test();

// function handleMail(categories, account, imap, mail) {
//     categories.init(account.categoryID, mail, function (statusObj) {
//         if (statusObj.status) {
//             categories.newMail(account.categoryID, mail, function (statusObj) {
//                 if (statusObj.status) {
//                     categories.reply(account.categoryID, mail, function (statusObj) {
//                         if (statusObj.status) {
//                             // Use node mailer to send reply
//                         }
//                     })
//                 }
//             });
//         }
//     })
// }

function Test() {
    // let categories = new Categories(null, null, null);
    // categories.initialize();

    for (account in config.emailAccounts) {
        //(imap,newMails)
        fetchNewMails(account, (imap, newMails) => {
            // for (var i = 0;i<newMails.length;i++) {
            //     handleMail(categories, account, imap, newMails[i])
     
            // }
            console.log(newMails);
            // console.log(newMails[0].mail.subject);
            // sendMails(account, newMails, (response) => {
            //     console.log(response);
            // });


            // let processed=0;
            // for (var i = 0; i< newMails.length; i++) {
            //     processMail(account, newMails[i], (mailObj) => {
            //         processed++;
            //         if(processed==newMails.length) {
            //             imap.end();
            //         }
            //         console.log(mailObj.subject);
            //         console.log(mailObj.name);
            //         console.log(mailObj.email);
            //         console.log(mailObj.date);
            //         console.log(mailObj.text);

            //         // These extracted  attributes need to be passed back to a hook that is pass ed to ur function
            //     });
            // }
            // if(processed==newMails.length) {
            //     imap.end();
            // }
        });
    }
}


function fetchNewMails(account, callback) {
    // console.log(config.emailAccounts[account].user);


    var imap = new Imap({
        user: config.emailAccounts[account].user,
        password: config.emailAccounts[account].password,
        host: config.emailAccounts[account].host,
        port: config.emailAccounts[account].port,
        tls: config.emailAccounts[account].tls
    });

    function openInbox(cb) {
        imap.openBox('INBOX', false, cb);
    }
    imap.once('ready', function () {
        openInbox(function (err, box) {
            if (err) throw err;
            console.log(box.messages.total + ' message(s) found!');

            // search
            imap.search(['UNSEEN'], function (err, results) {
                if (err) throw err;
                var f = imap.fetch(results, { bodies: '', markSeen: false });
                var newMails = [];
                var msgsToProcess=0;
                var allDone = false;

                f.on('message', function (msg, seqno) {
                    msg.on('body', function (stream, info) {
                        let parserr = new MailParser();
                        parserr.on('headers', headers => {
                            console.log('header',headers.get('subject'));
                        });
                        msgsToProcess++;
                        // console.log("Found Body: ", seqno, info)
                        simpleParser(stream, (err, mail) => {
                            // console.log("Text: ", mail.text)
                            var mailFields = {
                                subject: "",
                                date: "",
                                name: "",
                                email: "",
                                text: ""
                            }
                            // console.log("Parsed Body: ", seqno, info)
                            var from = mail.from.text;
                            var address = parser(from);
                            mailFields.subject = mail.subject;
                            mailFields.date = mail.date;
                            mailFields.name = address[0].name;
                            mailFields.email = address[0].address;
                            mailFields.text = mail.text;
                            newMails.push({
                                mail: mailFields,
                                // seqNo: seqno
                            });
                            if (msgsToProcess==newMails.length && allDone) {
                                callback(imap, newMails);
                            }
                        });
                        // or, write to file
                        //stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
                    });
                    msg.once('attributes', function (attrs) {
                        //console.log('Attributes: %s', inspect(attrs, false, 8));
                        console.log('UID: %s', attrs.uid);
                        console.log('Flags:%s', attrs.flags);
                    });
                    msg.once('end', function () {

                        console.log('Finished');
                    });
                });

                f.once('error', function (err) {
                    // callback(imap, newMails);
                    callback(imap, newMails);
                    console.log('Fetch error:' + err);
                });
                f.once('end', function () {
                    allDone = true;
                    // callback(imap, newMails);
                    if (msgsToProcess==newMails.length && allDone) {
                        callback(imap, newMails);
                    }
                    console.log('Done fetching all messages!');
                    imap.end();
                });
            });
        });
    });

    imap.once('error', function (err) {
        console.log(err);
    });

    imap.once('end', function () {
        console.log('Connection ended');
    });
    imap.connect();
}

// function sendMails(account, newMails, callback) {
//     var transporter = nodemailer.createTransport({
//         service: 'outlook',
//         auth: {
//             user: config.emailAccounts[account].user,
//             pass: config.emailAccounts[account].password
//         }
//     });
    
//     var d=new Date(newMails[0].mail.date);
//     d.setDate(d.getDate() + 2);
//     // console.log(d.getDay());
//     if (d.getDay() == 6 || d.getDay() == 0) {
//         d.setDate(d.getDate() + 2)
//     } else if (d.getDay() == 1) {
//         d.setDate(d.getDate() + 1)
//     }
//     var n = d.toDateString();
//     console.log(n);

//     var text = 'Hi ' + newMails[0].mail.name + ',\n\nThank you for your email. We would love to help solve your issue.\nWe will get back to you in 2 days i.e., ('+ n +').';

//     var mailOptions = {
//         from: config.emailAccounts[account].user,
//         to: newMails[0].mail.email,
//         subject: 'Sending Email using Node.js',
//         text: text
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             callback(info.response);
//             // console.log('Email sent: ' + info.response);
//         }
//     });
// }


//-------------Function processMail-------------//

// function processMail(emailAccount, mail, callback) {

//     var msg = mail.msg;
//     // let imap=config.emailAccounts[account].type;

//     var mailFields = {

//         subject: "",
//         date: "",
//         name: "",
//         email: "",
//         text: ""
//     }
//     console.log("working");

//     msg.on('body', function (stream, info) {
//         simpleParser(stream, (err, mail) => {
//             var from = mail.from.text;
//             var address = parser(from);
//             console.log(mail.subject);
//             mailFields.subject = mail.subject;
//             mailFields.date = mail.date;
//             mailFields.name = address[0].name;
//             mailFields.email = address[0].address;
//             mailFields.text = mail.text;
//             callback(mailFields)
//         });

//         // or, write to file
//         //stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
//     });
//     msg.once('attributes', function (attrs) {
//         console.log('Attributes: %s', inspect(attrs, false, 8));
//         console.log('UID: %s', attrs.uid);
//     });
//     msg.once("error", function () {
//         console.log("Got an error");
//     })
//     msg.once('end', function () {
//         console.log('Finished');
//     });
//     console.log("Reached here");
// }
