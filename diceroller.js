// Takes the currently selected dice and add it to the 'total' field
function useDice(dice) {
  let total = document.getElementById('total')
  total.innerHTML = total.innerHTML.trim()
  let invalidCustom = false

  if (dice === 'customButton') {
    let customValue = document.getElementById('customDice').value

    if (/^\d+$/.test(customValue)) {
      dice = 'd' + customValue
    }
    else {
      invalidCustom = true
    }
  }

  if (total.innerHTML === '' && invalidCustom === false) {
    total.innerHTML = dice
  }
  else if (invalidCustom === false) {
    total.innerHTML += ' + ' + dice
  }
}

// Takes the user entered mod and adds it to the total field
function useMod() {
  let total = document.getElementById('total')
  total.innerHTML = total.innerHTML.trim()
  let mod = document.getElementById('modText').value
  mod = mod.trim()

  if (total.innerHTML != '' && /^\d+$/.test(mod)) {
    total.innerHTML += '+' + mod
  }

  document.getElementById('modText').value = ''
}

// Takes the dice number and finds a random number between 1 and that
function rollDice(diceNum) {
  return Math.floor(Math.random() * ((diceNum - 1) + 1) + 1)
}

// Takes all configurations in the 'total' field and calculates a result
function rollAllDice() {
  let allDice = document.getElementById('total').innerHTML
  document.getElementById('result').innerHTML = ''
  document.getElementById('breakdown').innerHTML = ''

  if (allDice.trim() != '') {
    let diceArray = allDice.split('d')
    diceArray.shift()
    let diceRolled = []
    let result = 0

    diceArray.forEach((str, index) => {
      str = str.replace(/\s\+\s/g, '')
      str = str.trim()
      arr = str.split('+')

      if (arr.length === 1) {
        let num = parseInt(arr[0])
        let roll = rollDice(num)
        diceRolled.push('<p>d' + num + ' (' + roll + ')</p>')
        result += roll
      }
      else if (arr.length >= 2) {
        let num = parseInt(arr[0])
        arr.shift()
        let modString = ''
        let modValue = 0

        arr.forEach((item) => {
          modString += '+' + item
          modValue += parseInt(item)
        })

        let roll = rollDice(num)
        diceRolled.push('<p>d' + num + modString + ' (' + roll + modString + ')</p>')
        result += roll + modValue
      }
    })

    document.getElementById('result').innerHTML = '<h1>' + result + '</h1>'
    diceRolled.forEach((roll) => {
      document.getElementById('breakdown').innerHTML += roll
    })
  }
  else {
    document.getElementById('result').innerHTML = 'You can\'t roll without selecting dice!'
  }
}

// Removes the latest entry in the total field
function backspaceTotal() {
  let total = document.getElementById('total')
  total.innerHTML = total.innerHTML.trim()

  if (total.innerHTML != '') {
    let totalArray = total.innerHTML.split('+')
    let newTotal = total.innerHTML

    if (totalArray.length != 1) {
      totalArray.pop()

      totalArray.forEach((dice, index) => {
        if (index === 0) {
          newTotal = dice
        }
        else {
          newTotal += '+' + dice
        }
      })
    }
    else {
      newTotal = ''
    }

    total.innerHTML = newTotal
  }
}
