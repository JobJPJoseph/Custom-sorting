function ageSort(users) {
  // Your code here
  if (users.length <= 1) return users;

  let findMax = function (arr) {
    let idx = 0;
    let max = arr[0].age;

    for (let i = 1; i < arr.length; i++) {
      let num = arr[i].age;

      if (num > max) {
        idx = i;
        max = num;
      }

    }

    return idx;
  }

  let engineer = users.splice(findMax(users), 1);

  let result = ageSort(users);

  result.push(...engineer);

  return result;
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
  // let sObj = {};
  // let tObj = {};
  if (s.length !== t.length) return false;

  // for (let i = 0; i < s.length; i++) {
  //   let charS = s[i];
  //   let charT = t[i];

  //   if (sObj[charS] === undefined) {
  //     sObj[charS] = 1;
  //   } else {
  //     sObj[charS]++;
  //   }

  //   if (tObj[charT] === undefined) {
  //     tObj[charT] = 1;
  //   } else {
  //     tObj[charT]++;
  //   }

  // }

  // for (let i = 0; i < t.length; i++) {
  //   let tChar = t[i];

  //   if (sObj[tChar] !== tObj[tChar]) return false;
  // }

  // return true; // => O(2n)

  /*
  We are going to use quicksort for this problem because strings are immutable
  // We could have just sorted them in alphabetical order
  */

  let quicksort = (unsorted) => {
    // Does not matter if its a string or array
    if (unsorted.length <= 1) return unsorted;

    let pivot = unsorted[0];

    let left = quicksort(function () {
      let arr = [];

      for (let i = 1; i < unsorted.length; i++) {
        let char = unsorted[i];

        if (char < pivot) {
          arr.push(char);
        }

      }

      return arr;
    }());

    let right = quicksort(function () {
      let arr = [];

      for (let i = 1; i < unsorted.length; i++) {
        let char = unsorted[i];

        if (char >= pivot) {
          arr.push(char);
        }

      }

      return arr;
    }());

    return [...left, pivot, ...right];
  }

  let result1 = quicksort(t).join();
  let result2 = quicksort(s).join();

  return (result1 === result2); // => O(2n log n)
}

function reverseBaseSort(arr) {
  // Your code here
  // I'm going to safely assume its decimal value.
  // Base of 10
  // group them by there string length

  // Sort by their string.length
  // Using selection sort
  // let findMax = function (arr) {
  //   let min = 0;
  //   let max = arr[0];

  //   for (let i = 1; i < arr.length; i++) {
  //     let num = arr[i];

  //     if (num > max) {
  //       max = num;
  //       min = i;
  //     }
  //   }

  //   return min;
  // }

  // let result = [];

  // while(arr.length) {
  //   let idx = findMax(arr);
  //   let num = arr.splice(idx, 1);
  //   result.push(...num);
  // }

  // // sort by value now in decsending
  // // use insertion sort

  // let i = 0;
  // while (i < result.length) {
  //   let idx = i;
  //   let num = result[i];

  //   while (idx > 0 && String(result[idx - 1]).length === String(num).length && result[idx - 1] > num) {
  //     result[idx] = result[idx - 1];
  //     idx--;
  //   }

  //   result[idx] = num;

  //   i++;
  // }

  // return result;

  /*
  We need to nest an algorithm within another
  We defualt goal is to sort it in decsending order
  The base is refering to the number of digits
  During our sorting process if the bases are the same, sorted them in decsending.
    Make sure to keep another pointer that stops when it detects a difference in base
  */

  let equalBase = function (arg1, arg2) {
    return (String(arg1).length === String(arg2).length);
  }

  let i = 0;

  while (i < arr.length) {
    let idx = i;
    let num = arr[i];
    let exit = false;

    // sort in decsending
    while (!exit) {

      if (idx === 0) {
        exit = true;
        continue;
      }

      if (equalBase(arr[idx - 1], num)) {

        if (arr[idx - 1] > num) { // => [101, 11, 1, 1, 100] => 11 > 10
          arr[idx] = arr[idx - 1];
          idx--;
        } else {
          exit = true;
          continue;
        }

      } else {

        if (arr[idx - 1] < num) {
          arr[idx] = arr[idx - 1];
          idx--;
        } else {
          exit = true;
          continue;
        }

      }


    }

    arr[idx] = num;
    i++;
  }

  return arr;
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
