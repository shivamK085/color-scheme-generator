
const colorPicker = document.getElementById('color-picker')
const schemeSelect = document.getElementById('scheme-select')
const colorBoxes = document.querySelectorAll(".color")

document.addEventListener('click', copyColorHexToClipboard)

function copyColorHexToClipboard(e) {
    if (e.target.dataset.hex) {
        // console.log("Clicked on button", e.target.dataset.hex)
        const color = e.target.dataset.hex
        navigator.clipboard.writeText(color)
            .then(() => {
                alert(`Copied Color: ${color}`)
            })
    }
}


function renderColors(data) {

    // const colorBoxes = document.querySelectorAll(".color")

    const hexLabels = document.querySelectorAll(".color-hex p")

    for (let i = 0; i < data.colors.length; i++) {
        colorBoxes[i].style.backgroundColor = `${data.colors[i].hex.value}`
        colorBoxes[i].dataset.hex = data.colors[i].hex.value
        hexLabels[i].textContent = `${data.colors[i].hex.value}`
        hexLabels[i].dataset.hex = data.colors[i].hex.value
    }
}


async function fetchScheme(hex, mode) {

    const res = await fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=5`)
    const data = await res.json()
    console.log(data)
    renderColors(data)
}


fetchScheme("F55A5A", "monochrome")


document.getElementById('inputForm').addEventListener('submit', function (e) {
    e.preventDefault()

    const colorHex = colorPicker.value.slice(1)

    let mode = schemeSelect.value.toLowerCase()

    fetchScheme(colorHex, mode)

})
