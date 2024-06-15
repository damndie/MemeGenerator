'use strict'

var gElCanvas
var gCtx
var gStartPos

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    resizeCanvas()
}

function checkClick(ev) {
    gStartPos = getEvPos(ev)
    const meme = onGetMeme()
    var lineSelected = false

    meme.lines.forEach((line, idx) => {

        const textMetrics = gCtx.measureText(line.txt)
        const textWidth = textMetrics.width
        const textHeight = line.size

        const centerX = textWidth / 2
        const centerY = textHeight / 2

        const left = line.x - (centerX)
        const right = line.x + (centerX)
        const top = line.y - (centerY)
        const bottom = line.y + (centerY)

        if (gStartPos.x >= left &&
            gStartPos.x <= right &&
            gStartPos.y >= top &&
            gStartPos.y <= bottom) {
            meme.selectedLineIdx = idx
            lineSelected = true
            renderText(line)
        }
    })

    if (lineSelected) {
        const elInput = document.querySelector('.text-input')
        elInput.value = meme.lines[meme.selectedLineIdx].txt
        document.body.style.cursor = 'grabbing'
        setLineDrag(lineSelected)
        elInput.value.focus()
    }
}

function onMove(ev) {
    const meme = getMeme()
    const isDrag = meme.lines[meme.selectedLineIdx].isDrag
    if (!isDrag) return

    const pos = getEvPos(ev)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(dx, dy)

    gStartPos = pos
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'default'
}

function renderMeme() {
    var imgs = onGetImgs()
    const meme = onGetMeme()
    if (meme.dataURL) meme.url = meme.dataURL
    else meme.url = imgs[meme.selectedImgId.id].url

    const img = new Image()
    img.src = meme.url
    img.onload = () => {
        coverCanvasWithImg(img)
        const dataURL = gElCanvas.toDataURL('image/jpeg')
        setDataURL(dataURL)
        meme.lines.forEach((line, idx) => {
            renderText(line)
            if (idx === meme.selectedLineIdx) {
                const textMetrics = gCtx.measureText(line.txt)
                const width =
                    Math.abs(textMetrics.actualBoundingBoxLeft) +
                    Math.abs(textMetrics.actualBoundingBoxRight)
                const height =
                    Math.abs(textMetrics.actualBoundingBoxAscent) +
                    Math.abs(textMetrics.actualBoundingBoxDescent)

                const bounds = {
                    top: line.y - textMetrics.actualBoundingBoxAscent,
                    right: line.x + textMetrics.actualBoundingBoxRight,
                    bottom: line.y + textMetrics.actualBoundingBoxDescent,
                    left: line.x - textMetrics.actualBoundingBoxLeft
                }
                line.boundingBox = bounds
                gCtx.strokeRect(bounds.left, bounds.top, width, height)
            }
        })
    }
}


function onMoveArrows(ev) {
    const line = getSelectedLine()
    if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') {
        const moveDirY = ev.key === 'ArrowUp' ? -1 : 1
        line.y += moveDirY * 5
    } else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
        const moveDirX = ev.key === 'ArrowLeft' ? -1 : 1
        line.x += moveDirX * 5
    }
    renderMeme()
}

function renderText(line) {
    gCtx.beginPath()
    var { size, txt, color, align, x, y, font, stroke } = line
    
    gCtx.fillStyle = color
    gCtx.strokeStyle = stroke
    gCtx.font = size + `px ${font}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function onSelectImg(elImg, imgUrl) {
    document.querySelector(".main-gallery").classList.add('hidden')
    document.querySelector(".main-saved").classList.add('hidden')
    document.querySelector(".main-editor").classList.remove('hidden')
    
    setImg(elImg, imgUrl)
    
    document.querySelector('.text-input').value = ''
    document.querySelector('.text-input').focus()
    
    resizeCanvas()
    renderMeme()
}

function onResetMeme() {
    resetMeme()
}

function onAlignLeft() {
    alignLeft()
    renderMeme()
}

function onAlignCenter() {
    alignCenter()
    renderMeme()
}

function onAlignRight() {
    alignRight()
    renderMeme()
}

function onChangeFont(elFont) {
    changeFont(elFont)
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
    document.querySelector('.text-input').value = ''
    document.querySelector('.text-input').focus()
}

function onGetImgs() {
    return getImgs()
}

function onGetSelectedLine() {
    getSelectedLine()
}

function onSaveMeme() {
    saveMeme()
}

function onDownloadMeme(elLink) {
    downloadImg(elLink)
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onIncreaseLineSize() {
    increaseLineSize()
    renderMeme()
}

function onDecreaseLineSize() {
    decreaseLineSize()
    renderMeme()
}

function onChangeLineColor(color) {
    changeLineColor(color)
    const elColorPicker = document.querySelector('.color-picker')
    elColorPicker.style.color = color
    renderMeme()
}

function onGetMeme() {
    return getMeme()
}

function onSetLineTxt(newTxt) {
    setLineText(newTxt)
    renderMeme()
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}