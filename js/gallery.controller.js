'use strict'

var gFilterBy = {
    keywords: ''
}

var gImgs = [
    { id: 1, url: "imgs/1.jpg", keywords: ["famous", "funny"] },
    { id: 2, url: "imgs/2.jpg", keywords: ["pets", "dog"] },
    { id: 3, url: "imgs/3.jpg", keywords: ["funny", "pets"] },
    { id: 4, url: "imgs/4.jpg", keywords: ["pets", "cat"] },
    { id: 5, url: "imgs/5.jpg", keywords: ["funny", "kids"] },
    { id: 6, url: "imgs/6.jpg", keywords: ["funny", "movie"] },
    { id: 7, url: "imgs/7.jpg", keywords: ["funny", "kids"] },
    { id: 8, url: "imgs/8.jpg", keywords: ["funny", "movie"] },
    { id: 9, url: "imgs/9.jpg", keywords: ["funny", "kids"] },
    { id: 10, url: "imgs/10.jpg", keywords: ["funny", "famous"] },
    { id: 11, url: "imgs/11.jpg", keywords: ["funny", "movie"] },
    { id: 12, url: "imgs/12.jpg", keywords: ["funny", "famous"] },
    { id: 13, url: "imgs/13.jpg", keywords: ["famous", "funny"] },
    { id: 14, url: "imgs/14.jpg", keywords: ["movie", "scary"] },
    { id: 15, url: "imgs/15.jpg", keywords: ["famous", "movie"] },
    { id: 16, url: "imgs/16.jpg", keywords: ["movie", "funny"] },
    { id: 17, url: "imgs/17.jpg", keywords: ["famous", "scary"] },
    { id: 18, url: "imgs/18.jpg", keywords: ["movie", "funny"] }
]

renderGallery()
function renderGallery() {
    const elGallery = document.querySelector('gallery-container')
    const imgs = getImg()

    const strHTML = imgs.map(img => {
        return `<img src=imgs/${img.id}.jpg id=${img.id} onclick="onSelectImg(id)" />`
    })
    elGallery.innerHTML = strHTML.join('')
}

function setFilterBy(filterBy){
    if(filterBy.keywords !== undefined) gFilterBy.keywords = filterBy.keywords
}

function getImg() {
    if (!gFilterBy) return gImgs

    const filterImgs = gImgs.filter( img => {
        img.toLowerCase().includes(gFilterBy.keywords.toLowerCase())
    })

    return filterImgs
}
