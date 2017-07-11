const ogIt = it;

// 😂
export const itThatWeWantToThrow = (desc, func) => {
  ogIt(desc, () => {
    expect(() => func()).toThrow();
  });
};
