/* eslint-env node */
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Config from 'app/conf/config';
import {getNoteContent} from 'app/server/evernoteService';
import {parse} from 'app/server/parser';
import Home from 'app/shared/components/home';

const app = express();

app.set('views', './src/views');
app.set('view engine', 'jade');

app.use(Config.baseJsPath, express.static('lib/static/js'));
app.use(Config.baseImagePath, express.static('lib/static/img'));

app.get('/', (req, res) => {
  getNoteContent().then(noteContent => {
    const data = parse(noteContent);
    const content = ReactDOMServer.renderToString((
      <Home
        data={data}
      />
    ));
    res.render('index', {
      content,
      baseCssUrl: Config.baseCssUrl,
      baseJsUrl: Config.baseJsUrl,
      data: JSON.stringify(data),
    });
  }).catch(err => {
    console.error('Error fetching note content', err);
    res.status(500).set('Content-type', 'text/plain').send('' + err + '\n' + err.stack);
  });
});

const server = app.listen(Config.appPort, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});
