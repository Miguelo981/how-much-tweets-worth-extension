const abbreviationMap: { [key: string]: number } = {
  mil: 1000,
  M: 1000000,
};

export function abbreviatedStringtoNumber(inputString: string): number {
  if (!inputString) return NaN;

  const parts = inputString.split(" ");

  if (parts.length < 3) {
    const [number, abbreviation] = parts;
    const parsedNumber = parseFloat(number.replace(",", "."));

    if (isNaN(parsedNumber)) return NaN;

    if (abbreviationMap.hasOwnProperty(abbreviation)) {
      return parsedNumber * abbreviationMap[abbreviation];
    }

    return parsedNumber;
  }

  return NaN;
}
