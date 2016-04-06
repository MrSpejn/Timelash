export default function leftPad(currentNumber, destLength, fillWith){
  let n = destLength - Math.floor(currentNumber / 10);
  let padded = currentNumber;
  while(n > 1) {
    padded = fillWith.toString() + padded;
    n--;
  }
  return padded;
}