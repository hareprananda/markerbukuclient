export const autoGrow = (e) => {
  e.target.style.height = "5px";
  e.target.style.height = e.target.scrollHeight + "px";
};
