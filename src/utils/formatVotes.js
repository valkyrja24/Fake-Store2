export const formatVotes = (count) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return `${count} голос`;
    } else if (
      [2, 3, 4].includes(lastDigit) && 
      ![12, 13, 14].includes(lastTwoDigits)
    ) {
      return `${count} голоси`;
    } else {
      return `${count} голосів`;
    }
  };