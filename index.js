const addbtn = document.querySelector('.addnote');
const main = document.querySelector('#main')

const saveNotes = () => {
    const notes = document.querySelectorAll('.note textarea');
    console.log(notes)
    const data = [];
    notes.forEach((note) => {
        data.push(note.value);
        console.log(note.value)
    })
    if (data.length == 0) {
        localStorage.removeItem('notes')
    }
    else {
        localStorage.setItem('notes', JSON.stringify(data))
    }
}

addbtn.addEventListener('click', () => {
    addnote();
})

const addnote = (text = "") => {
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
    <div class="tool">
        <i class="save fa-solid fa-floppy-disk"></i>
        <i class="trash fa-solid fa-trash"></i>
    </div>
    <textarea>${text}</textarea>
    `
    note.querySelector('.trash').addEventListener('click', () => {
        note.remove()
        saveNotes()
    })

    note.querySelector('.save').addEventListener('click', () => {
        saveNotes()
    })
    note.querySelector('textarea').addEventListener('focusout', () => [
        saveNotes()
    ])
    main.appendChild(note)
    saveNotes()
}

(() => {
    const lsnotes = JSON.parse(localStorage.getItem('notes'));
    if (lsnotes == null) {
        addnote()
    }
    else {
        console.log(lsnotes)
        lsnotes.forEach((lsnotes) => {
            addnote(lsnotes);
        })
    }
})()

