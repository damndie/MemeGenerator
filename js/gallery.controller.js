'use strict'

var gFilterBy = {
    keywords: ''
}

function renderGallery() {
    const imgs = getImgs()

    const galleryHTML = imgs.map(img => `
        <img id="${img.id}" 
        src="${img.url}" 
        onclick="onSelectImg(this, '${img.url}')">
        `)

    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = galleryHTML.join('')
}

function switchToGallery() {
    document.querySelector(".main-editor").classList.add('hidden')
    document.querySelector(".main-gallery").classList.remove('hidden')
    document.querySelector(".main-saved").classList.add('hidden')
    onResetMeme()
}

function onSetFilterBy(filterBy) {
    setFilterBy(filterBy)
    renderGallery()
}

function onRandomMeme() {
    getRandomMeme()

    document.querySelector(".main-gallery").classList.add('hidden')
    document.querySelector(".main-editor").classList.remove('hidden')
    document.querySelector(".main-saved").classList.add('hidden')

    setImg(gMeme.selectedImgId)
    renderMeme()
}

function onImgInput(ev) {
    loadImageFromInput(ev, addUserImg)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = ev => {
        let img = new Image()
        img.src = ev.target.result
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function addUserImg(img) {
    const newImg = {
        id: getNextImgId(),
        url: img.src,
        keywords: ['funny', 'custom']
    }
    gImgs.push(newImg)
    renderGallery()
}