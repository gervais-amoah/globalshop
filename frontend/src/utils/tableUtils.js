function shortenString(inputString, length = 10) {
  if (inputString.length > length) {
    return inputString.substring(0, length) + "...";
  }
  return inputString;
}

export { shortenString };
