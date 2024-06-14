'use strict'

const MEME_DB = 'memeDB'

var gMeme = _createMeme()
var gSavedMemes = loadFromStorage(MEME_DB) || []

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

function getNextImgId() {
    return gImgs.length += 1
}

function getSavedMemes() {
    return gSavedMemes
}

function _createMeme() {
    gMeme = {
        id: makeId(),
        selectedImgId: 0,
        selectedLineIdx: 0,
        dataURL: '',
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                size: 40,
                color: 'white',
                x: 300,
                y: 300,
                isDrag: false,
                align: 'center',
                font: 'impact'
            }
        ]
    }
    return gMeme
}

function changeFont(elFont) {
    const line = getSelectedLine()
    line.font = elFont
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1
    }
    if (gMeme.selectedLineIdx < 0) {
        gMeme.selectedLineIdx = 0
    }
}

function addLine() {
    var txt = 'New Text'
    var size = 40
    var color = 'white'
    var font = 'impact'
    if (gMeme.lines.length > 0) {
        size = gMeme.lines[gMeme.selectedLineIdx].size
        color = gMeme.lines[gMeme.selectedLineIdx].color
        font = gMeme.lines[gMeme.selectedLineIdx].font
    }
    gMeme.lines.push({ txt: txt, size: size, color: color, x: 200, y: 200, font })
    if (gMeme.selectedLineIdx <= 1) gMeme.selectedLineIdx = 2
    else gMeme.selectedLineIdx++
}

function alignLeft() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'right'
}

function alignCenter() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'center'
}

function alignRight() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'left'
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveText(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
    gMeme.lines[gMeme.selectedLineIdx].y += dy
}

function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }
}

function setImg(elImg, imgUrl) {
    gMeme.selectedImgId = elImg
    if (imgUrl) {
        gMeme.dataURL = imgUrl
    } else {
        gMeme.dataURL = gImgs[elImg].url
    }
}

function getMeme() {
    return gMeme
}


function getImgs() {
    if (!gFilterBy.keywords) return gImgs

    return gImgs.filter(img => {
        return img.keywords.some(keyword => {
            return keyword.toLowerCase().includes(gFilterBy.keywords.toLowerCase())
        })
    })
}

function increaseLineSize() {
    gMeme.lines[gMeme.selectedLineIdx].size += 1
}

function decreaseLineSize() {
    if (gMeme.lines[gMeme.selectedLineIdx].size <= 0) {
        gMeme.lines[gMeme.selectedLineIdx].size += 1
    }
    gMeme.lines[gMeme.selectedLineIdx].size -= 1
}

function changeLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setLineText(newTxt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
}

function resetMeme() {
    _createMeme()
}

function setSavedMeme(memeId) {
    const savedMeme = gSavedMemes.find(savedMeme => savedMeme.id === memeId)
    gMeme = savedMeme
}

function saveMeme() {
    const previousMeme = gSavedMemes.find(savedMeme => savedMeme.id === gMeme.id)
    if (previousMeme) {
        previousMeme.dataURL = gMeme.dataURL
        _saveMemeToStorage()
    } else {
        gSavedMemes.push(gMeme)
        _saveMemeToStorage()
    }
}

function setDataURL(dataURL) {
    gMeme.dataURL = dataURL
}

function getRandomMeme() {
    const randMemeIdx = getRandomIntInclusive(0, gImgs.length)
    gMeme.selectedImgId = randMemeIdx
    return gImgs[randMemeIdx]
}

function setFilterBy(filterBy) {
    if (filterBy.keywords !== undefined) gFilterBy.keywords = filterBy.keywords
}

function _saveMemeToStorage() {
    saveToStorage(MEME_DB, gSavedMemes)
}
