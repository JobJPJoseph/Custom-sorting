function ageSort(users) {
  // Your code here
  // We are going to use insertion sort
  // Node: each element is an object that is nested in an array
  let i = 0;

  while (i < users.length) {
    let engineer = users[i];
    let idx = i;

    while (idx > 0 && users[idx - 1].age > engineer.age) {
      users[idx] = users[idx - 1];
      idx--;
    }

    users[idx] = engineer;
    i++;
  }

  return users;
}

function oddEvenSort(arr) {
  // Your code here
  // We are going to use the built-in sort
  let callback = (a, b) => {
    if (a % 2 === 0 && b % 2 !== 0) return 1;
    if (a % 2 !== 0 && b % 2 === 0) return -1;
    return a - b; // sorts in acsending
  }

  return arr.sort(callback);
}

function validAnagrams(s, t) {
  // Your code here
  // This is not a sort!!!
  // We will use a Object
  let sObj = {};
  let tObj = {};
  if (s.length !== t.length) return false;

  for (let i = 0; i < s.length; i++) {
    let charS = s[i];
    let charT = t[i];

    if (sObj[charS] === undefined) {
      sObj[charS] = 1;
    } else {
      sObj[charS]++;
    }

    if (tObj[charT] === undefined) {
      tObj[charT] = 1;
    } else {
      tObj[charT]++;
    }

  }

  for (let i = 0; i < t.length; i++) {
    let tChar = t[i];

    if (sObj[tChar] !== tObj[tChar]) return false;
  }

  return true;
}

function reverseBaseSort(arr) {
  // Your code here
  // I'm going to safely assume its decimal value.
  // Base of 10
  // group them by there string length

  // Sort by their string.length
  // Using selection sort
  let findMax = function (arr) {
    let min = 0;
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
      let num = arr[i];

      if (num > max) {
        max = num;
        min = i;
      }
    }

    return min;
  }

  let result = [];

  while(arr.length) {
    let idx = findMax(arr);
    let num = arr.splice(idx, 1);
    result.push(...num);
  }

  // sort by value now in decsending
  // use insertion sort

  let i = 0;
  while (i < result.length) {
    let idx = i;
    let num = result[i];

    while (idx > 0 && String(result[idx - 1]).length === String(num).length && result[idx - 1] > num) {
      result[idx] = result[idx - 1];
      idx--;
    }

    result[idx] = num;

    i++;
  }

  return result;
}
function frequencySort(arr) {
  // Your code here
  // We are going to use a basic recursive sort
  // We need to get the frenquency of the  values
  let frequency = {};

  for (let i = 0; i < arr.length; i++) {
    let elem = arr[i];

    if (frequency[elem] === undefined) {
      frequency[elem] = 1;
    } else {
      frequency[elem]++;
    }

  }

  // Now that we got the frequency, we can sort them
  // We are not going to use recursive sort becuase the time complexity will be too high
  // We will use inserion sort

  let i = 0;

  while (i < arr.length) {
    let idx = i;
    let elem = arr[i];

    // There is an edge case here but we will come to that later.
    // Right now just focus
    // The are two distinct cases
      // When the frequencies are the same we sort them by value in decsending order
      // When the frequencies are not the same sort them by frequencies in acsending order
    // We are going to sort by frequency by defualt
    // If the frenquencies are the same test by value

    // while (idx > 0 && frequency[arr[idx - 1]] >= frequency[elem]) {
    //   if (frequency[arr[idx - 1]] === frequency[elem]) {
    //     if (arr[idx - 1] < arr[idx]) {
    //       arr[idx] = arr[idx - 1];
    //       idx--;
    //     }
    //   } else {
    //     arr[idx] = arr[idx - 1];
    //     idx--;
    //   }

    // }

    let exit = false;
    while(idx > 0 && !exit) {

      if (frequency[arr[idx - 1]] === frequency[elem]) {

        if (arr[idx - 1] < elem) {
          arr[idx] = arr[idx - 1];
          idx--;
        } else {
          exit = true;
        }

      } else if (frequency[arr[idx - 1]] > frequency[elem]) {
        arr[idx] = arr[idx - 1];
        idx--;
      } else {
        exit = true;
      }

    }

    arr[idx] = elem;
    i++;
  }

  return arr;
}

module.exports = [
  oddEvenSort,
  validAnagrams,
  reverseBaseSort,
  frequencySort,
  ageSort,
];
