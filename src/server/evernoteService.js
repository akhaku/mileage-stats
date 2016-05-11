import {Evernote} from 'evernote';

import Config from 'app/conf/config';

const getEvernoteClient = () => {
  return new Evernote.Client({token: Config.evernoteDeveloperToken, sandbox: false});
};

const getNoteContent = () => {
  return new Promise((resolve, reject) => {
    getEvernoteClient().getNoteStore().getNoteContent(Config.noteGuid, (err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

export {
  getNoteContent,
};
