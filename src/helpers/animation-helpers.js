export const waitAnimation = (animationTime) =>
  new Promise((res) => {
    setTimeout(() => res(), animationTime);
  });
