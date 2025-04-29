
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, nextRef?: React.RefObject<HTMLInputElement | null>, prevRef?: React.RefObject<HTMLInputElement| null>) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter') {
      e.preventDefault();
      nextRef?.current?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      prevRef?.current?.focus();
    }
  }

export{
    handleKeyDown
}