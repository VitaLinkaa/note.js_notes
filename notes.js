const chalk = require('chalk'); // выводит сообщения в консолb
const fs = require('fs');
const path = require('path');

const notePath = path.join(__dirname, 'notes.json');

const getNotes = (callback) => {
    fs.readFile(notePath , 'utf-8', (err, content) => {
        if (err) {
            throw new Error(err);
        }

        try {
            callback(JSON.parse(content))
        } catch (e){
            callback([])
        }
    });
}

const saveNotes = (content) => {
    fs.writeFile(notePath, JSON.stringify(content), err => {
        if (err) {
            throw new Error(err);
        }
    })
}

const addNote = (title, text) => {
    getNotes((notes) => {
        const dublicateNote = notes.find(note => note.title === title);

        if (dublicateNote) {
            console.log(chalk.red.inverse('Dublicate'));
        } else {
            notes.push({title, text })
            saveNotes(notes)
            console.log(chalk.green.inverse('Note add'));
        }
    });
};

const listNotes = () => {
    getNotes(notes => {
        if (notes.length) {
            console.log(chalk.inverse('Yours notes:'));

            notes.forEach((note) => {
                console.log(note.title);
            });
        } else {
            console.log(chalk.blue('No notes. Add first'));
        }
    })
}

const readNote = (title) => {
    getNotes(notes => {
        const note = notes.find(n => n.title === title)

        if (note) {
            console.log(chalk.inverse(note.title))
            console.log(note.text)
        } else {
            console.log(chalk.red.inverse(`Note with title "${title}" not found`));
        }
    })

}

const removeNote = (title) => {
    getNotes(notes => {
        const updatedNotes = notes.filter(note => node.title !== title)

            if(updatedNotes.length !== notes.length ) {
                saveNotes(updatedNotes)
                console.log(chalk.green(`Note with title "${title}" was deleted`));
            } else {
                console.log(chalk.red.inverse(`Note with title "${title}" not found`));

            }
    })

}

module.exports = {
    addNote, listNotes, readNote, removeNote 
}