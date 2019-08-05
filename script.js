const yargs = require('yargs');
const package = require('./package.json');
const notes = require('./notes');

yargs.version(package.version);

yargs.command({
    command: 'add',
    describe: 'add new note',
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Note Title'
        },
        text: {
            type: 'string',
            demandOption: true,
            describe: 'Note Text'
        }
    },
    handler({ title, text }) {
        notes.addNote(title, text)
    }
})

yargs.command({
    command: 'list',
    describe: 'show notes list',
    handler() {
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'show content of selected note',
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Note Title'
        },
    },
    handler({title}) {
        notes.readNote(title)
    }
})


yargs.command({
    command: 'remove',
    describe: 'remove note',
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Note Title'
        },
    },
    handler({title}) {
            notes.removeNote(title)
    }
})

yargs.parse();