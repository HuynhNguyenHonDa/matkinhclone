function scrollElementToCenter(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({
      block: "nearest",
      inline: "center",
    });
  }
}

export default scrollElementToCenter;
