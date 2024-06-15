'use strict'

function renderSavedMemes() {
    const savedMemes = getSavedMemes()

    const savedHTML = savedMemes.map(savedMeme => {
        return `<img id="makeId()"
     src="${savedMeme.dataURL}" 
     alt="${savedMeme.id}" 
     onclick="onEditSavedMeme('${savedMeme.id}')">`
    })

    const elSavedMemes = document.querySelector('.saved-container')
    elSavedMemes.innerHTML = savedHTML.join('')
}

function onEditSavedMeme(memeId) {
    setSavedMeme(memeId)
    document.querySelector(".main-editor").classList.remove('hidden')
    document.querySelector(".main-gallery").classList.add('hidden')
    document.querySelector(".main-saved").classList.add('hidden')
    renderMeme()
}

function switchToSaved() {
    document.querySelector(".main-editor").classList.add('hidden')
    document.querySelector(".main-gallery").classList.add('hidden')
    document.querySelector(".main-saved").classList.remove('hidden')
    renderSavedMemes()
}